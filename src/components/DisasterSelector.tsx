import React from 'react';
import type { DisasterScenario, ScenarioId } from '../types';
import { Compass } from 'lucide-react';

interface DisasterSelectorProps {
  scenarios: DisasterScenario[];
  activeScenarioId: ScenarioId;
  onSelectScenario: (scenario: DisasterScenario) => void;
}

export const DisasterSelector: React.FC<DisasterSelectorProps> = ({
  scenarios,
  activeScenarioId,
  onSelectScenario,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Disaster Scenario Selection</span>
        </h2>
        <span className="text-[11px] text-slate-400 dark:text-slate-500">Preset emergency configurations</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {scenarios.map((scenario) => {
          const isActive = scenario.id === activeScenarioId;
          return (
            <button
              key={scenario.id}
              onClick={() => onSelectScenario(scenario)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border text-left transition-all cursor-pointer relative ${
                isActive
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 text-blue-950 dark:text-white font-semibold shadow-xs'
                  : 'bg-slate-50/60 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-600 dark:bg-blue-500 rounded-bl-sm"></div>
              )}
              <div className="text-xl mb-1">{scenario.icon}</div>
              <div className="text-xs font-semibold text-center">{scenario.name}</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-mono mt-0.5">
                Cap: {scenario.defaultCapacity} kg
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
