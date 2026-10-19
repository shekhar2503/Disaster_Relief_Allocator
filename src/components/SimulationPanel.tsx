import React, { useState, useEffect } from 'react';
import type { DisasterScenario, Resource, KnapsackResult } from '../types';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  X,
  AlertTriangle,
  Boxes,
  Truck,
  Scale,
  Cpu,
  Table,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { ScenarioIcon } from './ScenarioIcon';

interface SimulationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: DisasterScenario;
  resources: Resource[];
  capacity: number;
  result: KnapsackResult;
}

const SIMULATION_STEPS = [
  {
    id: 1,
    title: 'DISASTER DETECTED',
    icon: AlertTriangle,
    iconColor: 'text-rose-500',
    desc: 'Emergency command center receives alert notification.',
  },
  {
    id: 2,
    title: 'RELIEF RESOURCES IDENTIFIED',
    icon: Boxes,
    iconColor: 'text-blue-500',
    desc: 'Available emergency supplies cataloged and weighed.',
  },
  {
    id: 3,
    title: 'TRUCK CAPACITY SET',
    icon: Truck,
    iconColor: 'text-amber-500',
    desc: 'Relief transport truck weight limit established.',
  },
  {
    id: 4,
    title: 'PRIORITIES ANALYZED',
    icon: Scale,
    iconColor: 'text-purple-500',
    desc: 'Utility and emergency priority coefficients weighted.',
  },
  {
    id: 5,
    title: 'DYNAMIC PROGRAMMING STARTED',
    icon: Cpu,
    iconColor: 'text-indigo-500',
    desc: 'Bottom-Up 0/1 Knapsack matrix computation initialized.',
  },
  {
    id: 6,
    title: 'DP TABLE GENERATED',
    icon: Table,
    iconColor: 'text-sky-500',
    desc: 'All subproblem optimal values computed in O(n×W).',
  },
  {
    id: 7,
    title: 'OPTIMAL RESOURCES SELECTED',
    icon: CheckCircle2,
    iconColor: 'text-emerald-500',
    desc: 'Solution reconstructed via backtracking path.',
  },
  {
    id: 8,
    title: 'TRUCK DISPATCH READY',
    icon: Navigation,
    iconColor: 'text-emerald-600',
    desc: 'Relief payload verified and authorized for immediate dispatch!',
  },
];

export const SimulationPanel: React.FC<SimulationPanelProps> = ({
  isOpen,
  onClose,
  scenario,
  capacity,
  result,
}) => {
  const [currentSimStep, setCurrentSimStep] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setCurrentSimStep(1);
      return;
    }

    if (isAutoPlay && currentSimStep < SIMULATION_STEPS.length) {
      const timer = setTimeout(() => {
        setCurrentSimStep((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (currentSimStep === SIMULATION_STEPS.length) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen, currentSimStep, isAutoPlay]);

  if (!isOpen) return null;

  const stepInfo = SIMULATION_STEPS[currentSimStep - 1];
  const StepIcon = stepInfo.icon;

  return (
    <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-xl relative text-slate-900 dark:text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 rounded-lg border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-base font-extrabold tracking-tight uppercase text-slate-900 dark:text-white">
              Command Center Disaster Simulator
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>Scenario:</span>
              <strong className="text-blue-700 dark:text-blue-300 inline-flex items-center gap-1 font-semibold">
                <ScenarioIcon scenarioId={scenario.id} className="w-3.5 h-3.5" />
                <span>{scenario.name}</span>
              </strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-1.5 my-5">
          {SIMULATION_STEPS.map((s) => (
            <div
              key={s.id}
              className={`h-2 rounded-full transition-all ${
                s.id === currentSimStep
                  ? 'bg-blue-600 dark:bg-blue-400 scale-105'
                  : s.id < currentSimStep
                  ? 'bg-emerald-600 dark:bg-emerald-500'
                  : 'bg-slate-200 dark:bg-slate-800'
              }`}
            ></div>
          ))}
        </div>

        <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden mb-5">
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <StepIcon className={`w-7 h-7 ${stepInfo.iconColor}`} />
          </div>
          <div className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest mb-1">
            STEP {stepInfo.id} OF 8
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            {stepInfo.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            {stepInfo.desc}
          </p>

          {currentSimStep >= 7 && (
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center gap-4 text-xs font-mono">
              <span className="text-slate-500 dark:text-slate-400">Total Weight: <strong className="text-slate-900 dark:text-white">{result.totalWeight} / {capacity}kg</strong></span>
              <span className="text-slate-500 dark:text-slate-400">Max Utility: <strong className="text-blue-700 dark:text-blue-400">{result.maxUtility} pts</strong></span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              isAutoPlay
                ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            {isAutoPlay ? 'Auto Playing...' : 'Paused'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSimStep((prev) => Math.max(1, prev - 1))}
              disabled={currentSimStep === 1}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>

            {currentSimStep < SIMULATION_STEPS.length ? (
              <button
                onClick={() => setCurrentSimStep((prev) => Math.min(SIMULATION_STEPS.length, prev + 1))}
                className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
              >
                Close &amp; Inspect Model
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
