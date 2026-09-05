import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Key, Copy, Check, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';


// Web Crypto API in-browser AES-256-GCM encryption & decryption
export const CryptoPlayground: React.FC<{ theme?: string }> = ({ theme }) => {
  const [plaintext, setPlaintext] = useState('Secret Grand Line Coordinates: 35.6895° N, 139.6917° E');
  const [password, setPassword] = useState('one-piece-aes-256');
  const [ciphertext, setCiphertext] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'encrypt' | 'decrypt'>('encrypt');

  // Key derivation using PBKDF2
  const getKey = async (pass: string, salt: Uint8Array): Promise<CryptoKey> => {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(pass),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );
    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  };

  const handleEncrypt = async () => {
    if (!plaintext.trim() || !password.trim()) return;
    setIsEncrypting(true);
    try {
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const key = await getKey(password, salt);
      const encodedText = new TextEncoder().encode(plaintext);

      const encryptedBuffer = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        encodedText
      );

      // Combine salt + iv + ciphertext into base64 payload
      const combined = new Uint8Array(salt.length + iv.length + encryptedBuffer.byteLength);
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(encryptedBuffer), salt.length + iv.length);

      let binary = '';
      for (let i = 0; i < combined.byteLength; i++) {
        binary += String.fromCharCode(combined[i]);
      }
      const b64 = btoa(binary);
      setCiphertext(b64);
      setDecryptedText('');
    } catch (err) {
      console.error('Encryption failed:', err);
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleDecrypt = async () => {
    if (!ciphertext.trim() || !password.trim()) return;
    setIsDecrypting(true);
    try {
      const binary = atob(ciphertext.trim());
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      if (bytes.length < 28) throw new Error('Ciphertext payload too short');

      const salt = bytes.slice(0, 16);
      const iv = bytes.slice(16, 28);
      const data = bytes.slice(28);

      const key = await getKey(password, salt);
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        data
      );

      const decoded = new TextDecoder().decode(decryptedBuffer);
      setDecryptedText(decoded);
    } catch (err) {
      setDecryptedText('❌ Decryption Failed: Invalid Password or Corrupted Payload');
    } finally {
      setIsDecrypting(false);
    }
  };

  const handleCopyCiphertext = () => {
    if (!ciphertext) return;
    navigator.clipboard.writeText(ciphertext);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="scrim-card rounded-2xl p-6 sm:p-7 border border-op-gold/30 shadow-xl my-10 relative overflow-hidden">
      {/* Subtle Glow backdrop */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-op-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-op-gold/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-op-gold/20 border border-op-gold/50 flex items-center justify-center text-op-gold">
            <Lock size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-cinzel font-bold text-lg sm:text-xl text-op-cream">
                Live In-Browser AES-256 Engine
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 font-mono text-[10px] font-semibold flex items-center gap-1">
                <ShieldCheck size={11} /> 100% Client-Side
              </span>
            </div>
            <p className="text-xs font-mono text-op-gold/80">
              Interactive demonstration of zero-knowledge client cryptography (Web Crypto API)
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="inline-flex p-1 rounded-full bg-[#0b132b] border border-op-gold/30">
          <button
            onClick={() => setActiveTab('encrypt')}
            className={`px-3.5 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'encrypt'
                ? 'bg-op-gold text-op-ink shadow-sm'
                : 'text-op-cream/70 hover:text-op-gold'
            }`}
          >
            <Lock size={12} /> Encrypt
          </button>
          <button
            onClick={() => setActiveTab('decrypt')}
            className={`px-3.5 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'decrypt'
                ? 'bg-op-gold text-op-ink shadow-sm'
                : 'text-op-cream/70 hover:text-op-gold'
            }`}
          >
            <Unlock size={12} /> Decrypt
          </button>
        </div>
      </div>

      {/* Interactive Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block font-mono text-xs uppercase text-op-gold mb-1.5 flex items-center gap-1.5">
              <Key size={13} /> Secret Encryption Key / Passphrase
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter secret passphrase..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-op-cream text-xs font-mono outline-none shadow-inner"
            />
          </div>

          {activeTab === 'encrypt' ? (
            <div>
              <label className="block font-mono text-xs uppercase text-op-gold mb-1.5">
                Plaintext Payload
              </label>
              <textarea
                rows={3}
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                placeholder="Type your secret message..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-op-cream text-xs font-mono outline-none resize-none shadow-inner"
              />
            </div>
          ) : (
            <div>
              <label className="block font-mono text-xs uppercase text-op-gold mb-1.5">
                Encrypted Base64 Payload
              </label>
              <textarea
                rows={3}
                value={ciphertext}
                onChange={(e) => setCiphertext(e.target.value)}
                placeholder="Paste base64 ciphertext payload here..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-op-cream text-xs font-mono outline-none resize-none shadow-inner font-mono"
              />
            </div>
          )}

          <div className="flex gap-2">
            {activeTab === 'encrypt' ? (
              <button
                onClick={handleEncrypt}
                disabled={isEncrypting}
                className="flex-1 py-2.5 rounded-xl bg-op-gold hover:bg-op-goldLight text-op-ink font-cinzel font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles size={14} />
                <span>{isEncrypting ? 'Encrypting (PBKDF2+AES-GCM)...' : 'Execute AES-256 Encryption'}</span>
              </button>
            ) : (
              <button
                onClick={handleDecrypt}
                disabled={isDecrypting}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-op-ink font-cinzel font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Unlock size={14} />
                <span>{isDecrypting ? 'Decrypting...' : 'Execute AES-256 Decryption'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Output Terminal */}
        <div className="rounded-xl bg-[#070c18] border border-op-gold/30 p-4 flex flex-col justify-between font-mono">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-op-gold/20 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
                <span className="text-[11px] text-op-gold/80 ml-2">crypto-terminal.sh</span>
              </div>
              {ciphertext && (
                <button
                  onClick={handleCopyCiphertext}
                  className="px-2 py-0.5 rounded bg-[#0b132b] border border-op-gold/30 text-op-gold hover:bg-op-gold hover:text-op-ink text-[10px] flex items-center gap-1 transition-all cursor-pointer"
                  title="Copy ciphertext"
                >
                  {copied ? <Check size={11} /> : <Copy size={11} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>

            <div className="space-y-2 text-xs">
              <div className="text-op-slate/70 text-[11px]">
                # Cipher: AES-GCM-256 • KDF: PBKDF2 (100,000 rounds) • Zero Server Leakage
              </div>

              {ciphertext && (
                <div className="p-2.5 rounded bg-[#0b132b]/80 border border-op-gold/20 break-all text-[11px] text-emerald-400">
                  <div className="text-[9px] uppercase text-op-gold mb-1 font-bold">Encrypted Payload (Base64):</div>
                  {ciphertext}
                </div>
              )}

              {decryptedText && (
                <div className="p-2.5 rounded bg-[#0b132b]/80 border border-emerald-500/40 break-all text-[11px] text-op-cream">
                  <div className="text-[9px] uppercase text-emerald-400 mb-1 font-bold">Decrypted Plaintext:</div>
                  {decryptedText}
                </div>
              )}

              {!ciphertext && !decryptedText && (
                <div className="py-6 text-center text-op-cream/40 text-xs italic">
                  Press "Execute AES-256 Encryption" to generate cryptographic payload in client memory...
                </div>
              )}
            </div>
          </div>

          <div className="text-[10px] text-op-gold/60 pt-3 border-t border-op-gold/15 flex items-center justify-between">
            <span>Client RAM Execution</span>
            <span>WebCrypto Web Standard</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoPlayground;
