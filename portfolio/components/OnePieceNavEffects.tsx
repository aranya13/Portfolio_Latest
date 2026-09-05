import React, { useEffect } from 'react';

export type AnimeEffectType = 'luffy' | 'zoro' | 'brook' | 'nami' | null;

interface OnePieceNavEffectsProps {
  activeEffect: AnimeEffectType;
  onEffectComplete: () => void;
}

export const OnePieceNavEffects: React.FC<OnePieceNavEffectsProps> = ({
  activeEffect,
  onEffectComplete,
}) => {
  useEffect(() => {
    if (!activeEffect) return;

    let targetSectionId = '';
    switch (activeEffect) {
      case 'luffy':
        targetSectionId = 'skills';
        break;
      case 'zoro':
        targetSectionId = 'projects';
        break;
      case 'brook':
        targetSectionId = 'experience';
        break;
      case 'nami':
        targetSectionId = 'contact';
        break;
    }

    const el = document.getElementById(targetSectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    onEffectComplete();
  }, [activeEffect, onEffectComplete]);

  return null;
};

export default OnePieceNavEffects;
