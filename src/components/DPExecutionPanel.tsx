import React from 'react';
import { Play, Pause, SkipForward, RotateCcw, Zap, Sliders } from 'lucide-react';

interface DPExecutionPanelProps {
  currentStepIndex: number;
  totalSteps: number;
  isRunning: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNextStep: () => void;
  onReset: () => void;
  onRunAll: () => void;
  speedMs: number;
  onChangeSpeed: (ms: number) => void;
}

export const DPExecutionPanel: React.FC<DPExecutionPanelProps> = ({
  currentStepIndex,
  totalSteps,
  isRunning,
  onPlay,
  onPause,
  onNextStep,
  onReset,
  onRunAll,
  speedMs,
  onChangeSpeed,
}) => {
  const isComplete = currentStepIndex >= totalSteps;
  const progressPercent = totalSteps > 0 ? Math.min(100, Math.round((currentStepIndex / totalSteps) * 100)) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs mb-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Step Progress Tracker */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-sans font-medium">Step: </span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">{currentStepIndex}</span>
            <span className="text-slate-400 dark:text-slate-500"> / {totalSteps}</span>
          </div>

          <div className="flex-1 md:w-44 bg-slate-100 dark:bg-slate-950 rounded-full h-2 p-0.5 border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap justify-center w-full md:w-auto">
          {!isRunning ? (
            <button
              onClick={onPlay}
              disabled={isComplete}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs disabled:opacity-40 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>RUN OPTIMIZATION</span>
            </button>
          ) : (
            <button
              onClick={onPause}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-bold text-xs bg-amber-600 hover:bg-amber-700 text-white transition-colors shadow-xs cursor-pointer"
            >
              <Pause className="w-4 h-4 fill-white" />
              <span>PAUSE</span>
            </button>
          )}

          <button
            onClick={onNextStep}
            disabled={isRunning || isComplete}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors disabled:opacity-40 cursor-pointer"
            title="Execute exactly one DP state transition step"
          >
            <SkipForward className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>NEXT STEP</span>
          </button>

          <button
            onClick={onRunAll}
            disabled={isRunning || isComplete}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors disabled:opacity-40 cursor-pointer"
            title="Complete remaining DP table instantly"
          >
            <Zap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>RUN ALL</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>RESET</span>
          </button>
        </div>

        {/* Speed Adjustment Controls */}
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 w-full md:w-auto justify-between md:justify-start">
          <Sliders className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-medium">Speed:</span>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={1050 - speedMs}
            onChange={(e) => onChangeSpeed(1050 - Number(e.target.value))}
            className="w-16 accent-blue-600 cursor-pointer"
          />
          <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold w-10 text-right">
            {speedMs}ms
          </span>
        </div>
      </div>
    </div>
  );
};
