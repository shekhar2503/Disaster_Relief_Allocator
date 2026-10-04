import React from 'react';
import type { Resource } from '../types';
import { solveGreedyKnapsack } from '../utils/calculations';
import { Scale } from 'lucide-react';

interface GreedyVsDPComparisonProps {
  resources: Resource[];
  capacity: number;
  dpMaxUtility: number;
}

export const GreedyVsDPComparison: React.FC<GreedyVsDPComparisonProps> = ({
  resources,
  capacity,
  dpMaxUtility,
}) => {
  const greedyResult = solveGreedyKnapsack(resources, capacity, dpMaxUtility);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl my-6">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-400" />
          <h2 className="text-xs uppercase font-extrabold tracking-wider text-slate-200">
            GREEDY ALGORITHM VS 0/1 KNAPSACK DYNAMIC PROGRAMMING
          </h2>
        </div>
        <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
          DAA Algorithmic Comparison
        </span>
      </div>

      <p className="text-xs text-slate-300 mb-4 leading-relaxed font-sans">
        A common misconception is that sorting items by <strong className="text-amber-300 font-mono">Utility / Weight Ratio</strong> (Greedy strategy) produces the optimal solution for 0/1 Knapsack. Because items cannot be broken into fractions, Greedy can get stuck in sub-optimal local choices. Dynamic Programming guarantees finding the global maximum utility.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                GREEDY HEURISTIC SELECTION
              </span>
              {!greedyResult.isOptimal ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  SUB-OPTIMAL
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  MATCHES DP
                </span>
              )}
            </div>

            <div className="text-xs font-mono space-y-1.5 text-slate-300 mb-3">
              <div className="flex justify-between">
                <span>Strategy:</span> <span>Sort by (Utility / Weight) ratio</span>
              </div>
              <div className="flex justify-between">
                <span>Greedy Utility:</span> <span className="font-bold text-amber-400">{greedyResult.totalUtility} pts</span>
              </div>
              <div className="flex justify-between">
                <span>Total Weight:</span> <span>{greedyResult.totalWeight} / {capacity} kg</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] font-sans text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800">
            Selected Items ({greedyResult.selectedItems.length}):{' '}
            <span className="text-slate-200 font-mono">
              {greedyResult.selectedItems.map((i) => i.name).join(', ') || 'None'}
            </span>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                0/1 KNAPSACK DYNAMIC PROGRAMMING
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500 text-slate-950 uppercase">
                GUARANTEED OPTIMAL
              </span>
            </div>

            <div className="text-xs font-mono space-y-1.5 text-slate-300 mb-3">
              <div className="flex justify-between">
                <span>Strategy:</span> <span>Explore state space dp[i][w]</span>
              </div>
              <div className="flex justify-between">
                <span>Optimal Utility:</span> <span className="font-bold text-emerald-400">{dpMaxUtility} pts</span>
              </div>
              <div className="flex justify-between">
                <span>Utility Gain over Greedy:</span>{' '}
                <span className="font-bold text-emerald-300">
                  +{dpMaxUtility - greedyResult.totalUtility} pts
                </span>
              </div>
            </div>
          </div>

          <div className="text-[11px] font-sans text-slate-400 bg-emerald-500/10 p-2.5 rounded border border-emerald-500/30">
            DP explores combinations considering overall capacity fit rather than local individual ratios.
          </div>
        </div>
      </div>
    </div>
  );
};
