import React, { useState } from 'react';
import type { DisasterScenario, Resource, KnapsackResult } from '../types';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScenarioIcon } from './ScenarioIcon';
import { ResourceIcon } from './ResourceIcon';

interface PresentationModeProps {
  scenario: DisasterScenario;
  resources: Resource[];
  capacity: number;
  result: KnapsackResult;
  onExit: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  scenario,
  resources,
  capacity,
  result,
  onExit,
}) => {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: '1. PROBLEM STATEMENT & REAL-WORLD CONTEXT',
      subtitle: 'Emergency Disaster Relief Optimization',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm">
          <p>
            Following a disaster (<strong className="text-blue-700 dark:text-blue-300 inline-flex items-center gap-1 font-semibold"><ScenarioIcon scenarioId={scenario.id} className="w-4 h-4" />{scenario.name}</strong>), emergency response teams face strict vehicle weight limits.
          </p>
          <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs">
            <div>Truck Capacity Limit (W): <strong className="text-blue-700 dark:text-blue-400">{capacity} kg</strong></div>
            <div>Emergency Resources Available (n): <strong className="text-blue-700 dark:text-blue-400">{resources.length} items</strong></div>
          </div>
          <p>
            Objective: Select a subset of emergency resources to load into the truck to <strong className="text-emerald-700 dark:text-emerald-400">maximize total priority/utility</strong> without exceeding capacity <strong className="text-blue-700 dark:text-blue-400 font-mono">W</strong>.
          </p>
        </div>
      ),
    },
    {
      title: '2. DYNAMIC PROGRAMMING STATE & RECURRENCE',
      subtitle: 'Mathematical Formalism',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm font-mono">
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-blue-700 dark:text-blue-400 font-bold text-xs mb-1">DP State Definition:</div>
            <p className="text-slate-700 dark:text-slate-300 text-xs font-sans">
              <strong className="text-blue-700 dark:text-blue-300">dp[i][w]</strong> represents the maximum emergency utility attainable using a subset of the first <strong className="text-slate-900 dark:text-white">i</strong> items with a maximum truck capacity of <strong className="text-slate-900 dark:text-white">w</strong> kg.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div className="text-emerald-700 dark:text-emerald-400 font-bold">Recurrence Relation:</div>
            <div className="text-slate-800 dark:text-slate-200">
              If weight[i] &lt;= w:
            </div>
            <div className="text-blue-700 dark:text-blue-300 pl-4 font-bold">
              dp[i][w] = max( dp[i-1][w], utility[i] + dp[i-1][w - weight[i]] )
            </div>
            <div className="text-slate-800 dark:text-slate-200">
              Else:
            </div>
            <div className="text-purple-700 dark:text-purple-300 pl-4 font-bold">
              dp[i][w] = dp[i-1][w]
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '3. OPTIMAL PAYLOAD SOLUTION RESULT',
      subtitle: 'Computed via Bottom-Up DP & Backtracking',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Optimal Utility</div>
              <div className="text-2xl font-mono font-extrabold text-blue-700 dark:text-blue-400 mt-1">{result.maxUtility}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Total Payload</div>
              <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100 mt-1">{result.totalWeight} / {capacity} kg</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Remaining</div>
              <div className="text-2xl font-mono font-extrabold text-emerald-700 dark:text-emerald-400 mt-1">{result.remainingCapacity} kg</div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 font-mono uppercase">Selected Items:</div>
            <div className="flex flex-wrap gap-2">
              {result.selectedItems.map((item) => (
                <span key={item.id} className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-300 text-xs font-medium flex items-center gap-1.5">
                  <ResourceIcon icon={item.icon} name={item.name} className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{item.name}</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">({item.weight}kg, {item.utility}pts)</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '4. ASYMPTOTIC COMPLEXITY ANALYSIS',
      subtitle: 'Efficiency Verification',
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">Time Complexity:</div>
            <div className="text-xl font-mono font-extrabold text-slate-900 dark:text-white mb-2">O(n × W)</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
              Evaluates exactly n × (W + 1) states. Each state transition takes O(1) time.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold text-purple-700 dark:text-purple-400 mb-1">Space Complexity:</div>
            <div className="text-xl font-mono font-extrabold text-slate-900 dark:text-white mb-2">O(n × W)</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
              2D matrix table preserves all subproblem decisions for backtracking.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const currSlide = slides[slide];

  return (
    <div className="fixed inset-0 bg-white dark:bg-slate-950 z-50 flex flex-col justify-between p-6 text-slate-900 dark:text-slate-100">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">FA2 Faculty Presentation View</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Design and Analysis of Algorithms (DAA)</p>
          </div>
        </div>

        <button
          onClick={onExit}
          className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold cursor-pointer border border-slate-200 dark:border-slate-700"
        >
          Exit Presentation View
        </button>
      </div>

      <div className="max-w-4xl mx-auto w-full bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/60 rounded-2xl p-8 shadow-xl my-auto">
        <div className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1">
          SLIDE {slide + 1} OF {slides.length}
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
          {currSlide.title}
        </h2>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">{currSlide.subtitle}</p>

        {currSlide.content}
      </div>

      <div className="flex items-center justify-between max-w-4xl mx-auto w-full pt-4">
        <button
          onClick={() => setSlide((prev) => Math.max(0, prev - 1))}
          disabled={slide === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 disabled:opacity-40 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Slide</span>
        </button>

        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                idx === slide ? 'bg-purple-600 dark:bg-purple-500 scale-125' : 'bg-slate-200 dark:bg-slate-800'
              }`}
            ></button>
          ))}
        </div>

        <button
          onClick={() => setSlide((prev) => Math.min(slides.length - 1, prev + 1))}
          disabled={slide === slides.length - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-40 cursor-pointer shadow-xs"
        >
          <span>Next Slide</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
