import React, { useState } from 'react';
import { Code2, Clock, Database } from 'lucide-react';

export const ComplexityPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'complexity' | 'pseudocode'>('complexity');

  const pseudocodeString = `KNAPSACK(items, capacity):
    n = number of items
    W = capacity

    // Create 2D DP matrix initialized to 0
    create dp[n+1][W+1] initialized with 0

    // Fill DP table row by row (Bottom-Up)
    for i = 1 to n:
        for w = 1 to W:
            if weight[i] <= w:
                include = utility[i] + dp[i-1][w - weight[i]]
                exclude = dp[i-1][w]
                dp[i][w] = max(include, exclude)
            else:
                dp[i][w] = dp[i-1][w]

    // Backtrack to reconstruct selected items payload
    currW = W
    selectedItems = []
    for i = n down to 1:
        if dp[i][currW] != dp[i-1][currW]:
            selectedItems.append(items[i])
            currW = currW - weight[i]

    return dp[n][W], selectedItems`;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs my-4">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300">
            Algorithm Complexity &amp; Pseudocode
          </h2>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('complexity')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'complexity'
                ? 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 shadow-2xs border border-slate-200 dark:border-slate-700'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Complexity Analysis
          </button>
          <button
            onClick={() => setActiveTab('pseudocode')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'pseudocode'
                ? 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 shadow-2xs border border-slate-200 dark:border-slate-700'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Formal Pseudocode
          </button>
        </div>
      </div>

      {activeTab === 'complexity' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Time Complexity */}
          <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-bold text-xs uppercase mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Time Complexity: O(n × W)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-2">
              There are <strong className="text-slate-900 dark:text-white font-mono">n</strong> items and <strong className="text-slate-900 dark:text-white font-mono">W</strong> capacity columns. Matrix iteration evaluates exactly <strong className="text-blue-700 dark:text-blue-400 font-mono">n × (W + 1)</strong> cells in <strong className="font-mono">O(1)</strong> step time.
            </p>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
              Note: Pseudo-polynomial time bound dependent on numeric capacity value W.
            </div>
          </div>

          {/* Space Complexity */}
          <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-400 font-bold text-xs uppercase mb-1">
              <Database className="w-3.5 h-3.5" />
              <span>Space Complexity: O(n × W)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-2">
              The 2D state matrix requires <strong className="text-slate-900 dark:text-white font-mono">(n + 1) × (W + 1)</strong> table cells to preserve step transitions and solution backtracking path.
            </p>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
              Space Note: 1D array space reduction possible, but 2D grid required for step visualization.
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-amber-300 overflow-x-auto leading-relaxed">
          <pre>{pseudocodeString}</pre>
        </div>
      )}
    </div>
  );
};
