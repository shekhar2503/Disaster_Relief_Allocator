import React, { useState } from 'react';
import type { Resource } from '../types';
import { ResourceForm } from './ResourceForm';
import { Plus, Edit2, Trash2, RotateCcw, PackageCheck } from 'lucide-react';
import { ResourceIcon } from './ResourceIcon';

interface ResourceTableProps {
  resources: Resource[];
  selectedItemIds: Set<string>;
  onAddResource: (resource: Omit<Resource, 'id'>) => void;
  onEditResource: (id: string, resource: Omit<Resource, 'id'>) => void;
  onDeleteResource: (id: string) => void;
  onResetDefaults: () => void;
}

export const ResourceTable: React.FC<ResourceTableProps> = ({
  resources,
  selectedItemIds,
  onAddResource,
  onEditResource,
  onDeleteResource,
  onResetDefaults,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  const handleOpenAdd = () => {
    setEditingResource(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (res: Resource) => {
    setEditingResource(res);
    setIsFormOpen(true);
  };

  const handleSave = (resData: Omit<Resource, 'id'>, id?: string) => {
    if (id) {
      onEditResource(id, resData);
    } else {
      onAddResource(resData);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
              Emergency Supplies ({resources.length} Items)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetDefaults}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title="Reset dataset to default scenario values"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Resource</span>
            </button>
          </div>
        </div>

        {/* Professional Data Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <th className="py-2 px-3 font-semibold">Item Name</th>
                <th className="py-2 px-3 text-center font-semibold">Weight</th>
                <th className="py-2 px-3 text-center font-semibold">Priority</th>
                <th className="py-2 px-3 text-center font-semibold">Status</th>
                <th className="py-2 px-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {resources.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 dark:text-slate-500 font-sans text-xs">
                    No emergency resources added yet. Click &quot;Add Resource&quot; to populate.
                  </td>
                </tr>
              ) : (
                resources.map((item) => {
                  const isSelected = selectedItemIds.has(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors ${
                        isSelected
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                          : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="py-2 px-3 font-sans font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <ResourceIcon icon={item.icon} name={item.name} className="w-4 h-4 flex-shrink-0" />
                        <span>{item.name}</span>
                      </td>
                      <td className="py-2 px-3 text-center text-slate-700 dark:text-slate-300 font-mono">
                        {item.weight} <span className="text-[10px] text-slate-400">kg</span>
                      </td>
                      <td className="py-2 px-3 text-center font-semibold font-mono text-amber-700 dark:text-amber-400">
                        {item.utility}
                      </td>
                      <td className="py-2 px-3 text-center font-sans">
                        {isSelected ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60">
                            <PackageCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            LOADED
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                            EXCLUDED
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-right font-sans">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Edit Resource"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteResource(item.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Delete Resource"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ResourceForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        editingResource={editingResource}
      />
    </div>
  );
};
