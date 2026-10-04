import type { DisasterScenario, PriorityModeInfo } from '../types';

export const DEFAULT_SCENARIOS: DisasterScenario[] = [
  {
    id: 'flood',
    name: 'Flood Emergency',
    icon: '🌊',
    description: 'Severe flooding has cut off access. Drinking water, medical packs, and high-energy food are critical.',
    defaultCapacity: 20,
    resources: [
      { id: 'fl-1', name: 'Water (Clean)', weight: 6, utility: 100, icon: '💧' },
      { id: 'fl-2', name: 'Medicine Kit', weight: 3, utility: 95, icon: '💊' },
      { id: 'fl-3', name: 'Rations Pack', weight: 8, utility: 90, icon: '🍱' },
      { id: 'fl-4', name: 'Blankets', weight: 5, utility: 60, icon: '🛏' },
      { id: 'fl-5', name: 'Torch & Batteries', weight: 2, utility: 30, icon: '🔦' },
      { id: 'fl-6', name: 'Heavy Duty Tools', weight: 7, utility: 50, icon: '🛠' }
    ]
  },
  {
    id: 'earthquake',
    name: 'Earthquake Relief',
    icon: '🌎',
    description: 'Infrastructure collapses. Trauma medicine, rescue equipment, and structural tools are vital.',
    defaultCapacity: 20,
    resources: [
      { id: 'eq-1', name: 'Trauma Medicine', weight: 3, utility: 110, icon: '💊' },
      { id: 'eq-2', name: 'Rescue Tools', weight: 7, utility: 85, icon: '🛠' },
      { id: 'eq-3', name: 'Water Supplies', weight: 6, utility: 90, icon: '💧' },
      { id: 'eq-4', name: 'Food Packs', weight: 8, utility: 80, icon: '🍱' },
      { id: 'eq-5', name: 'Thermal Blankets', weight: 5, utility: 65, icon: '🛏' },
      { id: 'eq-6', name: 'High-Power Torch', weight: 2, utility: 40, icon: '🔦' }
    ]
  },
  {
    id: 'wildfire',
    name: 'Wildfire Defense',
    icon: '🔥',
    description: 'High heat and toxic smoke. Hydration, burn treatment, and respirators take precedence.',
    defaultCapacity: 20,
    resources: [
      { id: 'wf-1', name: 'Water Tanks', weight: 6, utility: 105, icon: '💧' },
      { id: 'wf-2', name: 'Burn First Aid', weight: 3, utility: 100, icon: '💊' },
      { id: 'wf-3', name: 'Protective Gear', weight: 6, utility: 85, icon: '🛡' },
      { id: 'wf-4', name: 'Respirators', weight: 2, utility: 75, icon: '😷' },
      { id: 'wf-5', name: 'Food Rations', weight: 8, utility: 70, icon: '🍱' },
      { id: 'wf-6', name: 'Fire Blankets', weight: 4, utility: 60, icon: '🛏' }
    ]
  },
  {
    id: 'cyclone',
    name: 'Cyclone Disaster',
    icon: '🌪',
    description: 'High winds and power outages. Temporary shelter, communications, and emergency light are essential.',
    defaultCapacity: 20,
    resources: [
      { id: 'cy-1', name: 'Emergency Tent', weight: 9, utility: 95, icon: '🎪' },
      { id: 'cy-2', name: 'Water Cans', weight: 6, utility: 100, icon: '💧' },
      { id: 'cy-3', name: 'Medical Supplies', weight: 3, utility: 90, icon: '💊' },
      { id: 'cy-4', name: 'Satellite Radio', weight: 3, utility: 80, icon: '📻' },
      { id: 'cy-5', name: 'Energy Rations', weight: 8, utility: 75, icon: '🍱' },
      { id: 'cy-6', name: 'LED Searchlight', weight: 2, utility: 50, icon: '🔦' }
    ]
  }
];

export const PRIORITY_MODES: PriorityModeInfo[] = [
  {
    id: 'balanced',
    name: 'Balanced Priority',
    description: 'Standard utility values as defined per scenario.',
    multipliers: {}
  },
  {
    id: 'life_critical',
    name: 'Life-Critical First',
    description: '+30% priority for Water and Medical supplies.',
    multipliers: {
      'water': 1.3,
      'medicine': 1.3,
      'first aid': 1.3,
      'trauma': 1.3,
      'respirator': 1.3
    }
  },
  {
    id: 'basic_survival',
    name: 'Basic Survival',
    description: '+30% priority for Food, Water, and Shelter.',
    multipliers: {
      'water': 1.3,
      'food': 1.3,
      'ration': 1.3,
      'tent': 1.3,
      'blanket': 1.3
    }
  },
  {
    id: 'medical_emergency',
    name: 'Medical Emergency Focus',
    description: '+50% priority for all Medical and Trauma kits.',
    multipliers: {
      'medicine': 1.5,
      'first aid': 1.5,
      'trauma': 1.5,
      'burn': 1.5
    }
  }
];
