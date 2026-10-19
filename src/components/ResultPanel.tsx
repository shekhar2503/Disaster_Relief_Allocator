import React from 'react';
import type { Resource } from '../types';
import { Trophy, Scale, ShieldCheck, Zap } from 'lucide-react';
import { ResourceIcon } from './ResourceIcon';

interface ResultPanelProps {
  selectedItems: Resource[];
  maxUtility: number;
  totalWeight: number;
  capacity: number;
  remainingCapacity: number;
  timeTakenMs: number;
  isComplete: boolean;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({
  selectedItems,
  maxUtility,
  totalWeight,
  capacity,
  remainingCapacity,
  timeTakenMs,
  isComplete,
}) => {
  if (!isComplete) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500/60 dark:border-emerald-500/50 rounded-xl p-5 shadow-xs mb-4 transition-colors duration-150">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
        {/* Left: Solution Summary */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-emerald-100 dark:bg-emerald-950/60 rounded-lg text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <Trophy className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                  Optimal Emergency Relief Load
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white uppercase tracking-wide">
                  OPTIMAL
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                0/1 Knapsack DP algorithm solved in <strong className="text-emerald-700 dark:text-emerald-400 font-mono">{timeTakenMs} ms</strong>
              </p>
            </div>
          </div>

          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Loaded Payload:</span>
            {selectedItems.map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-300 text-xs font-medium"
              >
                <ResourceIcon icon={item.icon} name={item.name} className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{item.name}</span>
                <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">({item.weight}kg)</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right: Key Metric Indicators */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-slate-100 dark:border-slate-800 pt-3 lg:pt-0">
          <div className="bg-slate-50 dark:bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-center min-w-[95px]">
            <div className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Utility
            </div>
            <div className="text-lg font-mono font-bold text-amber-700 dark:text-amber-400 mt-0.5">
              {maxUtility}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-center min-w-[95px]">
            <div className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
              <Scale className="w-3 h-3 text-blue-600 dark:text-blue-400" /> Payload
            </div>
            <div className="text-lg font-mono font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {totalWeight} <span className="text-xs text-slate-400 font-normal">/ {capacity}k</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-center min-w-[95px]">
            <div className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Unused
            </div>
            <div className="text-lg font-mono font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
              {remainingCapacity} <span className="text-xs text-slate-400 font-normal">kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
