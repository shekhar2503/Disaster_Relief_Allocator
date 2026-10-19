import type { Resource, PriorityModeInfo } from '../types';

/**
 * Calculates adjusted resource utilities based on selected priority mode multipliers.
 */
export function applyPriorityMode(items: Resource[], modeInfo: PriorityModeInfo): Resource[] {
  if (!modeInfo || Object.keys(modeInfo.multipliers).length === 0) {
    return items;
  }

  return items.map(item => {
    let multiplier = 1.0;
    const lowerName = item.name.toLowerCase();

    for (const [key, mult] of Object.entries(modeInfo.multipliers)) {
      if (lowerName.includes(key.toLowerCase())) {
        multiplier = mult;
        break;
      }
    }

    return {
      ...item,
      utility: Math.round(item.utility * multiplier)
    };
  });
}

/**
 * Solves Knapsack using a Greedy Heuristic (sorting by utility-to-weight ratio).
 * Used strictly for educational comparison against DP!
 */
export interface GreedyResult {
  selectedItems: Resource[];
  totalWeight: number;
  totalUtility: number;
  remainingCapacity: number;
  isOptimal: boolean;
}

export function solveGreedyKnapsack(items: Resource[], capacity: number, dpMaxUtility: number): GreedyResult {
  const sorted = [...items].sort((a, b) => (b.utility / b.weight) - (a.utility / a.weight));
  
  const selectedItems: Resource[] = [];
  let currentWeight = 0;
  let totalUtility = 0;

  for (const item of sorted) {
    if (currentWeight + item.weight <= capacity) {
      selectedItems.push(item);
      currentWeight += item.weight;
      totalUtility += item.utility;
    }
  }

  return {
    selectedItems,
    totalWeight: currentWeight,
    totalUtility,
    remainingCapacity: capacity - currentWeight,
    isOptimal: totalUtility === dpMaxUtility
  };
}

/**
 * Generates a random set of emergency resources with realistic weights & utilities.
 */
export function generateRandomDataset(count: number = 5): { items: Resource[]; capacity: number } {
  const icons = ['water', 'medicine', 'food', 'shelter', 'light', 'tools', 'radio', 'shield', 'tent', 'fuel'];
  const names = [
    'Pure Water Jugs',
    'Emergency First Aid',
    'High Energy Rations',
    'Thermal Blankets',
    'Solar Flashlight',
    'Rescue Crowbar',
    'Satellite Phone',
    'Protective Masks',
    'Inflatable Shelter',
    'Fuel Canister'
  ];

  const items: Resource[] = [];
  const usedIndices = new Set<number>();

  while (items.length < count) {
    const idx = Math.floor(Math.random() * names.length);
    if (!usedIndices.has(idx)) {
      usedIndices.add(idx);
      const weight = Math.floor(Math.random() * 8) + 2;
      const utility = Math.floor(Math.random() * 70) + 30;
      items.push({
        id: `rnd-${Date.now()}-${items.length}`,
        name: names[idx],
        weight,
        utility,
        icon: icons[idx % icons.length]
      });
    }
  }

  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  const capacity = Math.max(10, Math.floor(totalWeight * 0.6));

  return { items, capacity };
}
