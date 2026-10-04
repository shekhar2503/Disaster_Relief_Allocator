import React from 'react';
import type { Resource, DPStep } from '../types';
import { Table, CheckCircle } from 'lucide-react';

interface DPTableProps {
  resources: Resource[];
  capacity: number;
  currentStep: DPStep | null;
  fullDPTable: number[][];
  reconstructedPath: [number, number][];
  isComplete: boolean;
}

export const DPTable: React.FC<DPTableProps> = ({
  resources,
  capacity,
  currentStep,
  fullDPTable,
  reconstructedPath,
  isComplete,
}) => {
  const W = Math.max(0, Math.floor(capacity));

  const activeTable = currentStep ? currentStep.dpTableSnapshot : fullDPTable;

  const pathSet = new Set<string>();
  if (isComplete && reconstructedPath) {
    reconstructedPath.forEach(([r, c]) => pathSet.add(`${r}-${c}`));
  }

  const activeCell = currentStep?.highlightCells.current;
  const excludeCell = currentStep?.highlightCells.exclude;
  const includeCell = currentStep?.highlightCells.include;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs overflow-hidden">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Table className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300">
            2D Dynamic Programming State Matrix (dp[i][w])
          </h2>
        </div>

        {/* Cell Highlighting Legend */}
        <div className="flex items-center gap-3 text-[11px] font-mono flex-wrap">
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded bg-amber-400 border border-amber-600"></span>
            Current Cell
          </span>
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded bg-blue-300 dark:bg-blue-600 border border-blue-500"></span>
            Exclude Cell
          </span>
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded bg-emerald-300 dark:bg-emerald-600 border border-emerald-500"></span>
            Include Cell
          </span>
          {isComplete && (
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold font-sans">
              <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              Optimal Path
            </span>
          )}
        </div>
      </div>

      {/* Grid Container with Horizontal Scroll */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2">
        <table className="w-full text-center border-collapse text-xs font-mono">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <th className="py-2 px-3 text-left font-sans text-[11px] font-bold tracking-wider text-slate-600 dark:text-slate-400 sticky left-0 bg-slate-100 dark:bg-slate-900 z-10 border-r border-slate-200 dark:border-slate-800 min-w-[170px]">
                Resource \ Capacity (w)
              </th>
              {Array.from({ length: W + 1 }, (_, w) => (
                <th key={w} className="py-2 px-2 text-center text-slate-600 dark:text-slate-400 min-w-[38px] font-semibold">
                  {w}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
            {/* Row 0: Base Case */}
            <tr className="hover:bg-slate-100/50 dark:hover:bg-slate-900/30">
              <td className="py-2 px-3 text-left font-sans text-xs text-slate-500 dark:text-slate-400 font-medium sticky left-0 bg-slate-50 dark:bg-slate-950 z-10 border-r border-slate-200 dark:border-slate-800">
                0: Base (No Items)
              </td>
              {Array.from({ length: W + 1 }, (_, w) => {
                const isPath = isComplete && pathSet.has(`0-${w}`);
                const isCurrent = activeCell && activeCell[0] === 0 && activeCell[1] === w;
                return (
                  <td
                    key={w}
                    className={`py-1.5 px-2 border border-slate-200/60 dark:border-slate-800/40 text-slate-400 dark:text-slate-500 ${
                      isCurrent
                        ? 'bg-amber-200 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 border-2 border-amber-500 font-bold scale-105'
                        : isPath
                        ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-700'
                        : ''
                    }`}
                  >
                    0
                  </td>
                );
              })}
            </tr>

            {/* Rows 1 to n */}
            {resources.map((res, idx) => {
              const r = idx + 1;
              return (
                <tr key={res.id} className="hover:bg-slate-100/50 dark:hover:bg-slate-900/30">
                  <td className="py-2 px-3 text-left font-sans text-xs text-slate-800 dark:text-slate-200 font-medium sticky left-0 bg-slate-50 dark:bg-slate-950 z-10 border-r border-slate-200 dark:border-slate-800 flex items-center justify-between gap-1 min-w-[170px]">
                    <span className="flex items-center gap-1.5 truncate">
                      <span>{res.icon}</span>
                      <span className="truncate">{res.name}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono flex-shrink-0">
                      ({res.weight}k,{res.utility}p)
                    </span>
                  </td>

                  {Array.from({ length: W + 1 }, (_, w) => {
                    const cellVal = activeTable && activeTable[r] ? activeTable[r][w] : 0;
                    
                    const isCurrent = activeCell && activeCell[0] === r && activeCell[1] === w;
                    const isExclude = excludeCell && excludeCell[0] === r && excludeCell[1] === w;
                    const isInclude = includeCell && includeCell[0] === r && includeCell[1] === w;
                    const isPath = isComplete && pathSet.has(`${r}-${w}`);

                    let cellStyle = 'text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-950/40';

                    if (isCurrent) {
                      cellStyle = 'bg-amber-200 dark:bg-amber-900/80 text-amber-950 dark:text-amber-100 border-2 border-amber-500 font-bold scale-105 z-20 animate-highlight';
                    } else if (isExclude) {
                      cellStyle = 'bg-blue-100 dark:bg-blue-900/60 text-blue-950 dark:text-blue-200 border-2 border-blue-400 font-semibold z-10';
                    } else if (isInclude) {
                      cellStyle = 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-950 dark:text-emerald-200 border-2 border-emerald-400 font-semibold z-10';
                    } else if (isPath) {
                      cellStyle = 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-700';
                    }

                    return (
                      <td
                        key={w}
                        className={`py-1.5 px-2 border border-slate-200 dark:border-slate-800/40 transition-all text-center relative ${cellStyle}`}
                        title={`dp[${r}][${w}] = ${cellVal}`}
                      >
                        {cellVal}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
