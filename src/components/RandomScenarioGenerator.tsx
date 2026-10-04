import React from 'react';
import { generateRandomDataset } from '../utils/calculations';
import type { Resource } from '../types';
import { Dices, Sparkles } from 'lucide-react';

interface RandomScenarioGeneratorProps {
  onGenerate: (items: Resource[], capacity: number) => void;
}

export const RandomScenarioGenerator: React.FC<RandomScenarioGeneratorProps> = ({ onGenerate }) => {
  const handleRandom = () => {
    const { items, capacity } = generateRandomDataset(6);
    onGenerate(items, capacity);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex items-center justify-between flex-wrap gap-3 my-4">
      <div className="flex items-center gap-2">
        <Dices className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <div>
          <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
            Random Emergency Dataset Generator
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Generate bounded random emergency items and truck capacity to test DP algorithm resilience.
          </p>
        </div>
      </div>

      <button
        onClick={handleRandom}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Generate Random Dataset</span>
      </button>
    </div>
  );
};
