import React from 'react';
import { Truck, CheckCircle2, Award, TestTube, Sparkles, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  systemStatus: 'READY' | 'RUNNING' | 'PAUSED' | 'DISPATCHED';
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenSimulation: () => void;
  onOpenTestCases: () => void;
  isPresentationMode: boolean;
  onTogglePresentationMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  systemStatus,
  theme,
  onToggleTheme,
  onOpenSimulation,
  onOpenTestCases,
  isPresentationMode,
  onTogglePresentationMode,
}) => {
  const getStatusBadge = () => {
    switch (systemStatus) {
      case 'RUNNING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            DP Running
          </span>
        );
      case 'PAUSED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/60">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
            Paused
          </span>
        );
      case 'DISPATCHED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Truck Dispatched
          </span>
        );
      case 'READY':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            System Ready
          </span>
        );
    }
  };

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-40 px-4 lg:px-8 py-3 transition-colors duration-150 shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Title & Subtitle Branding */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 dark:bg-blue-600 rounded-lg text-white shadow-xs">
              <Truck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Disaster Relief Allocator
                </h1>
                <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/60">
                  FA2 Academic Model
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Dynamic Programming Based Emergency Resource Optimization
              </p>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            {getStatusBadge()}
          </div>
        </div>

        {/* Action Controls & Theme Toggle */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-wrap">
          <div className="hidden md:block mr-1">{getStatusBadge()}</div>

          {/* Segmented Theme Switcher Control */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium">
            <button
              onClick={theme === 'dark' ? onToggleTheme : undefined}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Light</span>
            </button>
            <button
              onClick={theme === 'light' ? onToggleTheme : undefined}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-800 text-white font-semibold shadow-2xs border border-slate-700'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-blue-400" />
              <span>Dark</span>
            </button>
          </div>

          {/* Disaster Simulation Trigger */}
          <button
            onClick={onOpenSimulation}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs"
            title="Launch step-by-step disaster command center simulation"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulation</span>
          </button>

          {/* Test Suite Runner Button */}
          <button
            onClick={onOpenTestCases}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            title="Execute built-in test suite for academic verification"
          >
            <TestTube className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Test Suite</span>
          </button>

          {/* Presentation Mode Toggle */}
          <button
            onClick={onTogglePresentationMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              isPresentationMode
                ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60'
            }`}
            title="Toggle simplified mode for faculty presentation"
          >
            <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>{isPresentationMode ? 'Exit Presentation' : 'Faculty View'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
