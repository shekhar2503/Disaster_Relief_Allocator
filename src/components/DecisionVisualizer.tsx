import React from 'react';
import type { DPStep } from '../types';
import { GitFork, Check, X } from 'lucide-react';
import { ResourceIcon } from './ResourceIcon';

interface DecisionVisualizerProps {
  currentStep: DPStep | null;
}

export const DecisionVisualizer: React.FC<DecisionVisualizerProps> = ({ currentStep }) => {
  if (!currentStep || !currentStep.item) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-center items-center h-full text-slate-400 dark:text-slate-500 min-h-[200px]">
        <GitFork className="w-6 h-6 stroke-1 mb-2 text-slate-300 dark:text-slate-600" />
        <p className="text-xs text-center font-sans">Click &quot;NEXT STEP&quot; or &quot;RUN OPTIMIZATION&quot; to inspect DP decision tree.</p>
      </div>
    );
  }

  const { item, itemWeight, itemUtility, w, excludeValue, includeValue, includePrevCellVal, decision } = currentStep;

  const isIncludeSelected = decision === 'INCLUDE';
  const isExcludeSelected = decision === 'EXCLUDE' || decision === 'NOT_ENOUGH_CAPACITY';
  const notEnoughCap = decision === 'NOT_ENOUGH_CAPACITY';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <GitFork className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span>DP Decision Tree Branch</span>
        </h2>
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
          Capacity: {w} kg
        </span>
      </div>

      <div className="flex flex-col items-center py-1">
        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 px-3 py-1.5 rounded-lg text-center mb-2 shadow-2xs">
          <span className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 justify-center">
            <ResourceIcon icon={item.icon} name={item.name} className="w-4 h-4 flex-shrink-0" />
            <span>{item.name}</span>
          </span>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block">
            Wt: {itemWeight}kg | Utility: {itemUtility}pts
          </span>
        </div>

        <div className="w-full flex items-center justify-center gap-8 relative my-1">
          <div className="w-1/2 border-t-2 border-slate-300 dark:border-slate-700 relative"></div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          {/* INCLUDE OPTION */}
          <div
            className={`border rounded-lg p-2.5 flex flex-col items-center justify-between transition-all ${
              isIncludeSelected
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-xs'
                : 'bg-slate-50/60 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 opacity-60 text-slate-500 dark:text-slate-400'
            }`}
          >
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
              <Check className="w-3.5 h-3.5" />
              <span>OPTION 1: INCLUDE</span>
            </div>

            {notEnoughCap ? (
              <p className="text-[10px] text-rose-600 dark:text-rose-400 text-center font-mono">
                Item wt ({itemWeight}kg) &gt; {w}kg
              </p>
            ) : (
              <div className="text-center font-mono text-[11px]">
                <div className="text-slate-700 dark:text-slate-300">
                  {itemUtility} + dp[prev][{w - itemWeight}]
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[10px]">
                  ({itemUtility} + {includePrevCellVal})
                </div>
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mt-0.5">
                  = {includeValue} pts
                </div>
              </div>
            )}

            {isIncludeSelected && (
              <span className="mt-1.5 text-[9px] font-bold uppercase bg-emerald-600 text-white px-2 py-0.5 rounded">
                SELECTED (MAX)
              </span>
            )}
          </div>

          {/* EXCLUDE OPTION */}
          <div
            className={`border rounded-lg p-2.5 flex flex-col items-center justify-between transition-all ${
              isExcludeSelected
                ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-950 dark:text-blue-100 shadow-xs'
                : 'bg-slate-50/60 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 opacity-60 text-slate-500 dark:text-slate-400'
            }`}
          >
            <div className="flex items-center gap-1 text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">
              <X className="w-3.5 h-3.5" />
              <span>OPTION 2: EXCLUDE</span>
            </div>

            <div className="text-center font-mono text-[11px]">
              <div className="text-slate-700 dark:text-slate-300">dp[prev][{w}]</div>
              <div className="text-slate-500 dark:text-slate-400 text-[10px]">Inherit previous row</div>
              <div className="text-xs font-bold text-blue-700 dark:text-blue-300 mt-0.5">
                = {excludeValue} pts
              </div>
            </div>

            {isExcludeSelected && (
              <span className="mt-1.5 text-[9px] font-bold uppercase bg-blue-600 text-white px-2 py-0.5 rounded">
                {notEnoughCap ? 'FORCED EXCLUDE' : 'SELECTED (MAX)'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
