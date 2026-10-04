import React from 'react';
import type { ReconstructionStep, Resource } from '../types';
import { Network, CheckCircle2, XCircle } from 'lucide-react';

interface SolutionReconstructionProps {
  reconstructionSteps: ReconstructionStep[];
  selectedItems: Resource[];
  unselectedItems: Resource[];
  isComplete: boolean;
}

export const SolutionReconstruction: React.FC<SolutionReconstructionProps> = ({
  reconstructionSteps,
  selectedItems,
  unselectedItems,
  isComplete,
}) => {
  if (!isComplete) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs text-center text-slate-400 dark:text-slate-500 min-h-[140px] flex flex-col justify-center items-center">
        <Network className="w-6 h-6 stroke-1 text-slate-300 dark:text-slate-600 mb-1.5" />
        <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">Solution Reconstruction (Backtracking)</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Complete the DP matrix computation to view backtracking analysis.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Network className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Solution Reconstruction (Backtracking Trace)</span>
        </h2>
        <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
          From dp[n][W] down to dp[0][0]
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left: Step-by-Step Backtracking Log */}
        <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
          <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 font-mono uppercase">
            Backtracking Step Log:
          </h3>

          <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
            {reconstructionSteps.map((step) => (
              <div
                key={step.stepIndex}
                className={`p-2 rounded border text-xs font-mono transition-colors ${
                  step.included
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between font-semibold mb-0.5">
                  <span className="flex items-center gap-1">
                    {step.included ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    )}
                    <span>{step.item.icon} {step.item.name}</span>
                  </span>
                  <span className={step.included ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}>
                    {step.included ? 'INCLUDED' : 'EXCLUDED'}
                  </span>
                </div>
                <p className="text-[10px] font-sans text-slate-600 dark:text-slate-400 leading-snug">{step.explanation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Selected vs Excluded Summary Checklist */}
        <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 font-mono uppercase">
              Payload Allocation Checklist:
            </h3>

            <div className="space-y-1 font-mono text-xs">
              {selectedItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-1.5 rounded bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-300">
                  <span className="flex items-center gap-1.5 font-sans font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>{item.icon} {item.name}</span>
                  </span>
                  <span className="text-[11px] font-semibold">{item.weight}kg | {item.utility}pts</span>
                </div>
              ))}

              {unselectedItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500">
                  <span className="flex items-center gap-1.5 font-sans">
                    <XCircle className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 flex-shrink-0" />
                    <span>{item.icon} {item.name}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">{item.weight}kg | {item.utility}pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
