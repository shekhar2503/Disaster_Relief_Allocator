import React from 'react';
import { Truck, Plus, Minus, AlertTriangle } from 'lucide-react';
import { validateCapacity } from '../utils/validation';

interface TruckCapacityProps {
  capacity: number;
  currentWeight: number;
  onChangeCapacity: (cap: number) => void;
}

export const TruckCapacity: React.FC<TruckCapacityProps> = ({
  capacity,
  currentWeight,
  onChangeCapacity,
}) => {
  const percentage = capacity > 0 ? Math.min(100, Math.round((currentWeight / capacity) * 100)) : 0;
  const validation = validateCapacity(capacity);

  const handleIncrement = (amount: number) => {
    const next = Math.max(0, capacity + amount);
    if (validateCapacity(next).isValid) {
      onChangeCapacity(next);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Truck Payload Capacity</span>
          </h2>
          <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{capacity} kg</span>
        </div>

        {/* Stepper Control */}
        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 mb-3">
          <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">Weight Limit:</span>
          
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleIncrement(-1)}
              className="p-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title="Decrease by 1 kg"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            
            <input
              type="number"
              min="0"
              max="60"
              value={capacity}
              onChange={(e) => onChangeCapacity(Number(e.target.value))}
              className="w-14 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded py-1 text-center text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
            />
            <span className="text-xs font-mono text-slate-400">kg</span>

            <button
              onClick={() => handleIncrement(1)}
              className="p-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title="Increase by 1 kg"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center justify-between gap-1 mb-3">
          {[10, 15, 20, 25, 30, 40].map((preset) => (
            <button
              key={preset}
              onClick={() => onChangeCapacity(preset)}
              className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                capacity === preset
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {preset}k
            </button>
          ))}
        </div>

        {!validation.isValid && (
          <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            {validation.error}
          </p>
        )}
      </div>

      {/* Dynamic Load Meter */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
          <span className="text-slate-500 dark:text-slate-400 font-sans font-medium text-[11px]">Current Load:</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {currentWeight} / <span className="text-blue-600 dark:text-blue-400">{capacity} kg</span> ({percentage}%)
          </span>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-950 rounded-full h-2.5 p-0.5 border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              percentage === 100
                ? 'bg-amber-500'
                : percentage > 80
                ? 'bg-blue-600'
                : 'bg-emerald-600'
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
