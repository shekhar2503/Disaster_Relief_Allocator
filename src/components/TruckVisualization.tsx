import React from 'react';
import type { Resource } from '../types';
import { Truck, Package, ShieldCheck, Zap, Scale } from 'lucide-react';

interface TruckVisualizationProps {
  selectedItems: Resource[];
  totalWeight: number;
  totalUtility: number;
  capacity: number;
  remainingCapacity: number;
}

export const TruckVisualization: React.FC<TruckVisualizationProps> = ({
  selectedItems,
  totalWeight,
  totalUtility,
  capacity,
  remainingCapacity,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300">
            Relief Truck Payload Bay
          </h2>
        </div>
        <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/60">
          Optimal Allocation Payload
        </span>
      </div>

      {/* Graphical Truck Container View */}
      <div className="bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-3 mb-3">
        <div className="flex items-stretch gap-2 min-h-[120px]">
          {/* Cargo Bay */}
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 p-3 flex flex-wrap gap-2 items-center align-content-start relative min-h-[110px]">
            <div className="absolute top-2 right-3 text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider pointer-events-none">
              CARGO BAY ({totalWeight} / {capacity} KG)
            </div>

            {selectedItems.length === 0 ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 py-4">
                <Package className="w-6 h-6 stroke-1 mb-1 text-slate-300 dark:text-slate-600" />
                <p className="text-xs">Cargo bay empty. Execute algorithm to populate payload.</p>
              </div>
            ) : (
              selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md px-2.5 py-1.5 flex items-center gap-2 shadow-2xs"
                >
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-100">{item.name}</div>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <span className="text-blue-700 dark:text-blue-300 font-medium">{item.weight} kg</span>
                      <span>•</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{item.utility} pts</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Truck Front Cabin Graphic */}
          <div className="w-16 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-r-xl flex flex-col items-center justify-center p-2 text-center">
            <div className="w-9 h-6 bg-slate-300 dark:bg-slate-700 rounded-md mb-1"></div>
            <div className="text-xl">🚚</div>
            <span className="text-[9px] font-mono font-semibold text-slate-500 dark:text-slate-400 mt-0.5 uppercase">DISPATCH</span>
          </div>
        </div>
      </div>

      {/* Key Metric Indicators */}
      <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
        <div className="bg-slate-50 dark:bg-slate-950 p-2 rounded-md border border-slate-200 dark:border-slate-800">
          <div className="text-[10px] font-sans font-medium text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
            <Scale className="w-3 h-3 text-blue-600 dark:text-blue-400" /> Total Payload
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
            {totalWeight} <span className="text-xs text-slate-400 font-normal">/ {capacity} kg</span>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950 p-2 rounded-md border border-slate-200 dark:border-slate-800">
          <div className="text-[10px] font-sans font-medium text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
            <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Total Utility
          </div>
          <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
            {totalUtility} <span className="text-xs text-slate-400 font-normal">pts</span>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950 p-2 rounded-md border border-slate-200 dark:border-slate-800">
          <div className="text-[10px] font-sans font-medium text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-slate-600 dark:text-slate-400" /> Remaining
          </div>
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-0.5">
            {remainingCapacity} <span className="text-xs text-slate-400 font-normal">kg</span>
          </div>
        </div>
      </div>
    </div>
  );
};
