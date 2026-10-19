import React from 'react';
import { Waves, Mountain, Flame, Wind, Compass } from 'lucide-react';
import type { ScenarioId } from '../types';

interface ScenarioIconProps {
  scenarioId?: ScenarioId | string;
  className?: string;
}

export const ScenarioIcon: React.FC<ScenarioIconProps> = ({ scenarioId = '', className }) => {
  const idLower = scenarioId.toLowerCase().trim();

  if (idLower.includes('flood') || idLower.includes('\u{1F30A}')) {
    return <Waves className={className || 'w-5 h-5 text-blue-600 dark:text-blue-400'} />;
  }

  if (idLower.includes('earthquake') || idLower.includes('quake') || idLower.includes('\u{1F30E}')) {
    return <Mountain className={className || 'w-5 h-5 text-amber-600 dark:text-amber-400'} />;
  }

  if (idLower.includes('wildfire') || idLower.includes('fire') || idLower.includes('\u{1F525}')) {
    return <Flame className={className || 'w-5 h-5 text-rose-600 dark:text-rose-400'} />;
  }

  if (idLower.includes('cyclone') || idLower.includes('wind') || idLower.includes('storm') || idLower.includes('\u{1F32A}')) {
    return <Wind className={className || 'w-5 h-5 text-teal-600 dark:text-teal-400'} />;
  }

  return <Compass className={className || 'w-5 h-5 text-blue-600 dark:text-blue-400'} />;
};
