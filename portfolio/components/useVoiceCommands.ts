import { useState, useEffect, useCallback, useRef } from 'react';
import {
  VoicePermissionState,
  RecognizedCommand,
  matchVoiceCommand,
  playVoiceAcknowledgeAudio,
} from './VoiceCommandManager';

export interface UseVoiceCommandsOptions {
  onCommandRecognized?: (command: RecognizedCommand) => void;
  isHakiActive: boolean;
}

export function useVoiceCommands({ onCommandRecognized, isHakiActive }: UseVoiceCommandsOptions) {
  const [permissionState, setPermissionState] = useState<VoicePermissionState>('idle');
  const [isListening, setIsListening] = useState(false);
  const [activePopup, setActivePopup] = useState<RecognizedCommand | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [transcriptLive, setTranscriptLive] = useState<string>('');

  const recognitionRef = useRef<any>(null);
  const isListeningIntentRef = useRef<boolean>(false);
  const onCommandRef = useRef(onCommandRecognized);
  onCommandRef.current = onCommandRecognized;

  const isHakiActiveRef = useRef(isHakiActive);
  isHakiActiveRef.current = isHakiActive;

  const lastProcessedTextRef = useRef<string>('');
  const throttleTimeoutRef = useRef<any>(null);

  // Initialize Speech Recognition instance
  const initSpeechRecognition = useCallback(() => {
    if (typeof window === 'undefined') return null;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setPermissionState('unsupported');
      setErrorMessage(
        'Voice control is not supported in this browser. You can continue using normal navigation.'
      );
      return null;
    }

    if (recognitionRef.current) return recognitionRef.current;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 2;

    recognition.onstart = () => {
      setIsListening(true);
      setPermissionState('listening');
      setErrorMessage(null);
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        const text = result[0].transcript;
        if (result.isFinal) {
          finalTranscript += text + ' ';
        } else {
          interimTranscript += text + ' ';
        }
      }

      const raw = (finalTranscript || interimTranscript).trim();
      if (!raw || raw === lastProcessedTextRef.current) return;

      // Update live caption gently
      if (raw.length <= 40) {
        setTranscriptLive(raw);
      }

      // Check for voice command match
      const matched = matchVoiceCommand(raw, isHakiActiveRef.current);
      if (matched) {
        lastProcessedTextRef.current = raw;
        playVoiceAcknowledgeAudio();
        setActivePopup(matched);

        // Auto-hide popup after 2.4s
        if (throttleTimeoutRef.current) clearTimeout(throttleTimeoutRef.current);
        throttleTimeoutRef.current = setTimeout(() => {
          setActivePopup(null);
        }, 2400);

        if (onCommandRef.current) {
          onCommandRef.current(matched);
        }
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setPermissionState('denied');
        setIsListening(false);
        isListeningIntentRef.current = false;
        setErrorMessage('Microphone access is required for voice control. Please allow microphone permissions.');
      } else if (event.error === 'no-speech') {
        // Normal silence timeout — keep listening
      } else if (event.error === 'audio-capture') {
        setPermissionState('denied');
        setIsListening(false);
        isListeningIntentRef.current = false;
        setErrorMessage('No microphone detected. Please connect an audio input device.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      // Automatically restart recognition if user intended to remain listening
      if (isListeningIntentRef.current) {
        try {
          recognition.start();
        } catch (e) {
          // Already active or temporarily waiting
        }
      } else {
        setPermissionState('idle');
      }
    };

    recognitionRef.current = recognition;
    return recognition;
  }, []);

  // Request Mic Permission & Start Listening
  const startVoiceControl = useCallback(async () => {
    setErrorMessage(null);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        setPermissionState('prompting');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
        setPermissionState('listening');
      } catch (err: any) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setPermissionState('denied');
          setErrorMessage('Microphone access is required for voice control. Please enable microphone permissions in your browser.');
          return;
        }
      }
    }

    const recognition = initSpeechRecognition();
    if (!recognition) return;

    isListeningIntentRef.current = true;
    try {
      recognition.start();
    } catch (e) {
      // Already active
    }
  }, [initSpeechRecognition]);

  // Stop Listening
  const stopVoiceControl = useCallback(() => {
    isListeningIntentRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
    setPermissionState('idle');
    setTranscriptLive('');
    lastProcessedTextRef.current = '';
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      isListeningIntentRef.current = false;
      if (throttleTimeoutRef.current) clearTimeout(throttleTimeoutRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  return {
    permissionState,
    isListening,
    activePopup,
    errorMessage,
    transcriptLive,
    startVoiceControl,
    stopVoiceControl,
    dismissPopup: () => setActivePopup(null),
    dismissError: () => setErrorMessage(null),
  };
}
