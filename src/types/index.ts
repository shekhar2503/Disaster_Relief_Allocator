export interface Resource {
  id: string;
  name: string;
  weight: number;
  utility: number; // Priority value
  icon: string;
}

export type ScenarioId = 'flood' | 'earthquake' | 'wildfire' | 'cyclone';

export interface DisasterScenario {
  id: ScenarioId;
  name: string;
  icon: string;
  description: string;
  resources: Resource[];
  defaultCapacity: number;
}

export type PriorityMode = 'balanced' | 'life_critical' | 'basic_survival' | 'medical_emergency';

export interface PriorityModeInfo {
  id: PriorityMode;
  name: string;
  description: string;
  multipliers: Record<string, number>; // maps resource name keyword or icon to multiplier
}

export type DecisionType = 'INCLUDE' | 'EXCLUDE' | 'NOT_ENOUGH_CAPACITY' | 'BASE_CASE';

export interface DPStep {
  stepIndex: number;
  totalSteps: number;
  i: number; // 1-indexed item
  w: number; // capacity
  item: Resource | null;
  itemWeight: number;
  itemUtility: number;
  excludeValue: number; // dp[i-1][w]
  includeValue: number | null; // utility + dp[i-1][w-weight]
  includePrevCellVal: number | null; // dp[i-1][w-weight]
  selectedValue: number;
  decision: DecisionType;
  explanation: string;
  dpTableSnapshot: number[][];
  highlightCells: {
    current: [number, number];
    exclude?: [number, number];
    include?: [number, number];
  };
}

export interface ReconstructionStep {
  stepIndex: number;
  i: number; // 1-indexed item
  w: number;
  item: Resource;
  dpCurrent: number;
  dpPrevRow: number;
  included: boolean;
  nextW: number;
  explanation: string;
}

export interface KnapsackResult {
  dpTable: number[][];
  maxUtility: number;
  selectedItems: Resource[];
  unselectedItems: Resource[];
  totalWeight: number;
  remainingCapacity: number;
  executionSteps: DPStep[];
  reconstructionSteps: ReconstructionStep[];
  reconstructedPath: [number, number][]; // coordinates of backtracking path
  timeTakenMs: number;
}

export interface TestCaseResult {
  id: string;
  name: string;
  description: string;
  capacity: number;
  items: Resource[];
  expectedUtility: number;
  expectedSelectedCount: number;
  actualUtility: number;
  actualSelectedCount: number;
  passed: boolean;
}
