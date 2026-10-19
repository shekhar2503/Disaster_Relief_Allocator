import React, { useState, useEffect } from 'react';
import type { Resource } from '../types';
import { validateResource } from '../utils/validation';
import {
  X,
  AlertCircle,
  Droplets,
  HeartPulse,
  Utensils,
  Bed,
  Flashlight,
  Wrench,
  Shield,
  Activity,
  Tent,
  Radio,
  Zap,
  Fuel,
} from 'lucide-react';

interface ResourceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (resource: Omit<Resource, 'id'>, id?: string) => void;
  editingResource?: Resource | null;
}

const AVAILABLE_ICONS = [
  { id: 'water', label: 'Water', icon: Droplets, color: 'text-sky-500' },
  { id: 'medicine', label: 'Medical', icon: HeartPulse, color: 'text-rose-500' },
  { id: 'food', label: 'Food', icon: Utensils, color: 'text-amber-500' },
  { id: 'shelter', label: 'Blanket', icon: Bed, color: 'text-indigo-500' },
  { id: 'light', label: 'Torch', icon: Flashlight, color: 'text-yellow-500' },
  { id: 'tools', label: 'Tools', icon: Wrench, color: 'text-slate-500' },
  { id: 'shield', label: 'Gear', icon: Shield, color: 'text-emerald-500' },
  { id: 'mask', label: 'Mask', icon: Activity, color: 'text-teal-500' },
  { id: 'tent', label: 'Tent', icon: Tent, color: 'text-orange-500' },
  { id: 'radio', label: 'Radio', icon: Radio, color: 'text-purple-500' },
  { id: 'power', label: 'Power', icon: Zap, color: 'text-amber-400' },
  { id: 'fuel', label: 'Fuel', icon: Fuel, color: 'text-red-500' },
];

export const ResourceForm: React.FC<ResourceFormProps> = ({
  isOpen,
  onClose,
  onSave,
  editingResource,
}) => {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState(5);
  const [utility, setUtility] = useState(50);
  const [icon, setIcon] = useState('package');
  const [errors, setErrors] = useState<{ name?: string; weight?: string; utility?: string }>({});

  useEffect(() => {
    if (editingResource) {
      setName(editingResource.name);
      setWeight(editingResource.weight);
      setUtility(editingResource.utility);
      setIcon(editingResource.icon || 'package');
    } else {
      setName('');
      setWeight(5);
      setUtility(50);
      setIcon('package');
    }
    setErrors({});
  }, [editingResource, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateResource(name, Number(weight), Number(utility));
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSave(
      {
        name: name.trim(),
        weight: Number(weight),
        utility: Number(utility),
        icon,
      },
      editingResource?.id
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md w-full p-5 shadow-xl relative text-slate-900 dark:text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
          {editingResource ? 'Edit Relief Resource' : 'Add New Emergency Resource'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Resource Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Clean Water Jugs"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 font-medium"
            />
            {errors.name && (
              <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Select Category</label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 bg-slate-50 dark:bg-slate-950 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
              {AVAILABLE_ICONS.map((item) => {
                const IconComp = item.icon;
                const isSelected = icon === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setIcon(item.id)}
                    className={`py-1.5 px-1 rounded flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-900 dark:text-blue-200 font-semibold shadow-2xs'
                        : 'border-transparent hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                    title={item.label}
                  >
                    <IconComp className={`w-3.5 h-3.5 ${item.color}`} />
                    <span className="text-[10px] leading-none">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Weight (kg) <span className="text-blue-600 dark:text-blue-400 font-mono">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 font-mono"
              />
              {errors.weight && (
                <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">{errors.weight}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Utility / Priority <span className="text-blue-600 dark:text-blue-400 font-mono">*</span>
              </label>
              <input
                type="number"
                min="0"
                max="1000"
                value={utility}
                onChange={(e) => setUtility(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 font-mono"
              />
              {errors.utility && (
                <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">{errors.utility}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              {editingResource ? 'Save Changes' : 'Add Resource'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
