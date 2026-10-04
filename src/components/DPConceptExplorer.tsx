import React from 'react';
import { BookOpen, Layers, Cpu } from 'lucide-react';

export const DPConceptExplorer: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs my-4">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300">
            Theoretical Principles: Why Dynamic Programming?
          </h2>
        </div>
        <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800/60">
          Core DAA Theory
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Concept 1: Optimal Substructure */}
        <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5 text-blue-700 dark:text-blue-400 font-bold text-xs uppercase tracking-wide">
              <Layers className="w-3.5 h-3.5" />
              <span>1. Optimal Substructure</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-3">
              An optimal solution to a 0/1 Knapsack problem of capacity <strong className="text-slate-900 dark:text-white">W</strong> containing <strong className="text-slate-900 dark:text-white">n</strong> items contains within it optimal solutions to smaller subproblems (capacity <strong className="text-blue-700 dark:text-blue-300 font-mono">w &lt; W</strong> and items <strong className="text-blue-700 dark:text-blue-300 font-mono">i &lt; n</strong>).
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">
            <span className="text-blue-700 dark:text-blue-300 font-bold block mb-0.5">Recurrence Definition:</span>
            dp[i][w] = max( dp[i-1][w], val[i] + dp[i-1][w - wt[i]] )
          </div>
        </div>

        {/* Concept 2: Overlapping Subproblems */}
        <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5 text-purple-700 dark:text-purple-400 font-bold text-xs uppercase tracking-wide">
              <Cpu className="w-3.5 h-3.5" />
              <span>2. Overlapping Subproblems</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-3">
              Naive recursive solution solves the same capacity subproblems repeatedly, exploding into <strong className="text-rose-600 dark:text-rose-400 font-mono">O(2ⁿ)</strong> time. DP memoizes subproblem solutions in a <strong className="text-emerald-700 dark:text-emerald-400 font-mono">2D Matrix</strong>, evaluating each subproblem in <strong className="text-emerald-700 dark:text-emerald-400 font-mono">O(n × W)</strong>.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">
            <div className="flex justify-between text-rose-600 dark:text-rose-400 mb-0.5">
              <span>Naive Recursion:</span> <span>O(2ⁿ) exponential</span>
            </div>
            <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-bold">
              <span>Bottom-Up DP:</span> <span>O(n × W) pseudo-polynomial</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
