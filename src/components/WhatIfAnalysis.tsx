import React, { useState } from 'react';
import type { Resource } from '../types';
import { solve01Knapsack } from '../algorithms/knapsack';
import { GitCompare } from 'lucide-react';

interface WhatIfAnalysisProps {
  currentItems: Resource[];
  currentCapacity: number;
  currentMaxUtility: number;
  currentTotalWeight: number;
}

export const WhatIfAnalysis: React.FC<WhatIfAnalysisProps> = ({
  currentItems,
  currentCapacity,
  currentMaxUtility,
  currentTotalWeight,
}) => {
  const [modifiedCapacity, setModifiedCapacity] = useState(currentCapacity);
  const [boostItemIdx, setBoostItemIdx] = useState<number | null>(null);

  const boostAmount = 20;

  const afterItems = currentItems.map((item, idx) => {
    if (idx === boostItemIdx) {
      return { ...item, utility: item.utility + boostAmount };
    }
    return item;
  });

  const afterResult = solve01Knapsack(afterItems, modifiedCapacity);

  const utilityDiff = afterResult.maxUtility - currentMaxUtility;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs my-4">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <GitCompare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300">
            What-If Sensitivity Analysis
          </h2>
        </div>
        <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800/60">
          Comparative DP Re-Evaluation
        </span>
      </div>

      {/* Simulator Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 mb-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Simulate Truck Weight Capacity:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="5"
              max="45"
              value={modifiedCapacity}
              onChange={(e) => setModifiedCapacity(Number(e.target.value))}
              className="flex-1 accent-blue-600 cursor-pointer"
            />
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 w-12 text-right">
              {modifiedCapacity} kg
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Simulate Item Priority Boost:
          </label>
          <select
            value={boostItemIdx ?? ''}
            onChange={(e) => setBoostItemIdx(e.target.value === '' ? null : Number(e.target.value))}
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-600 font-medium"
          >
            <option value="">-- Select Item to Boost --</option>
            {currentItems.map((item, idx) => (
              <option key={item.id} value={idx}>
                {item.name} (+20 pts priority)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* BEFORE */}
        <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2 tracking-wider flex items-center justify-between">
            <span>BEFORE CONFIGURATION</span>
            <span className="text-[10px] font-mono text-slate-400">Baseline</span>
          </div>
          <div className="space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Truck Capacity:</span>
              <span className="font-semibold">{currentCapacity} kg</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Optimal Utility:</span>
              <span className="font-bold text-amber-700 dark:text-amber-400">{currentMaxUtility} pts</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Loaded Weight:</span>
              <span className="font-semibold">{currentTotalWeight} kg</span>
            </div>
          </div>
        </div>

        {/* AFTER */}
        <div className="bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800/60">
          <div className="text-xs font-bold uppercase text-blue-700 dark:text-blue-400 mb-2 tracking-wider flex items-center justify-between">
            <span>AFTER CONFIGURATION</span>
            <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400">Recomputed DP</span>
          </div>
          <div className="space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Truck Capacity:</span>
              <span className="font-semibold text-blue-700 dark:text-blue-300">{modifiedCapacity} kg</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Optimal Utility:</span>
              <span className="font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1">
                {afterResult.maxUtility} pts
                {utilityDiff !== 0 && (
                  <span className={`text-[10px] font-bold flex items-center ${utilityDiff > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    ({utilityDiff > 0 ? '+' : ''}{utilityDiff})
                  </span>
                )}
              </span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Loaded Weight:</span>
              <span className="font-semibold">{afterResult.totalWeight} kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
