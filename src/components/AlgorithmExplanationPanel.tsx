import React from 'react';
import type { DPStep } from '../types';
import { HelpCircle, Calculator } from 'lucide-react';

interface AlgorithmExplanationPanelProps {
  currentStep: DPStep | null;
}

export const AlgorithmExplanationPanel: React.FC<AlgorithmExplanationPanelProps> = ({
  currentStep,
}) => {
  if (!currentStep) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-center items-center h-full text-slate-400 dark:text-slate-500 min-h-[200px]">
        <HelpCircle className="w-6 h-6 stroke-1 mb-2 text-slate-300 dark:text-slate-600" />
        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Algorithm Recurrence Evaluation</h3>
        <p className="text-xs text-center mt-1 font-sans">Press &quot;NEXT STEP&quot; or &quot;RUN OPTIMIZATION&quot; to view live state formula evaluation.</p>
      </div>
    );
  }

  const { i, w, item, itemWeight, itemUtility, excludeValue, includeValue, includePrevCellVal, selectedValue, explanation } = currentStep;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Algorithm Execution State</span>
          </h2>
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
            Evaluating dp[{i}][{w}]
          </span>
        </div>

        {/* Narrative Rationale */}
        <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2.5">
          <p className="font-sans">{explanation}</p>
        </div>

        {/* Compact Hierarchy Formula Breakdown */}
        <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-[11px] space-y-1.5">
          <div className="text-slate-500 dark:text-slate-400 font-sans font-semibold text-[10px] uppercase tracking-wider mb-0.5">
            Calculation Rationale:
          </div>

          <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
            <span>Item: <strong className="text-slate-900 dark:text-white font-sans">{item?.name}</strong></span>
            <span>Wt: {itemWeight}kg | Utility: {itemUtility}</span>
          </div>

          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
            <span>Option 1 (Exclude):</span>
            <span className="text-blue-700 dark:text-blue-300 font-semibold">dp[{i-1}][{w}] = {excludeValue}</span>
          </div>

          {itemWeight <= w ? (
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span>Option 2 (Include):</span>
              <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
                {itemUtility} + dp[{i-1}][{w-itemWeight}] ({includePrevCellVal}) = {includeValue}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 text-[10px]">
              <span>Option 2 (Include):</span>
              <span>Cannot fit ({itemWeight}kg &gt; {w}kg)</span>
            </div>
          )}

          <div className="border-t border-slate-200 dark:border-slate-800 pt-1 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
            <span>Cell Result dp[{i}][{w}]:</span>
            <span className="text-blue-600 dark:text-blue-400 text-sm font-mono">{selectedValue} pts</span>
          </div>
        </div>
      </div>
    </div>
  );
};
