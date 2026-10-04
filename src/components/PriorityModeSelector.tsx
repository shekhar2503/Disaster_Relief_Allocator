import React from 'react';
import type { PriorityModeInfo, PriorityMode } from '../types';
import { ShieldCheck } from 'lucide-react';

interface PriorityModeSelectorProps {
  modes: PriorityModeInfo[];
  activeModeId: PriorityMode;
  onSelectMode: (mode: PriorityModeInfo) => void;
}

export const PriorityModeSelector: React.FC<PriorityModeSelectorProps> = ({
  modes,
  activeModeId,
  onSelectMode,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Resource Priority Weighting</span>
        </h2>
        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">Dynamic Utility Multiplier</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {modes.map((mode) => {
          const isActive = mode.id === activeModeId;
          return (
            <button
              key={mode.id}
              onClick={() => onSelectMode(mode)}
              className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-600 dark:border-emerald-500 text-emerald-950 dark:text-white shadow-xs font-semibold'
                  : 'bg-slate-50/60 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                  <span>{mode.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-snug">
                  {mode.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
