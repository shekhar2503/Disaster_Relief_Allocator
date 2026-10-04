import type { Resource, DPStep, ReconstructionStep, KnapsackResult, DecisionType } from '../types';

/**
 * Solves the 0/1 Knapsack problem using Bottom-Up Dynamic Programming.
 * Generates full execution steps for animation and visual backtracking details.
 *
 * @param items List of emergency resources (1-indexed in DP matrix)
 * @param capacity Truck capacity (W)
 * @returns KnapsackResult containing DP table, optimal solution, and step-by-step trace
 */
export function solve01Knapsack(items: Resource[], capacity: number): KnapsackResult {
  const startTime = performance.now();
  const n = items.length;
  const W = Math.max(0, Math.floor(capacity));

  const dpTable: number[][] = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));
  const executionSteps: DPStep[] = [];

  let stepIndex = 0;
  const totalSteps = n * (W + 1);

  for (let i = 1; i <= n; i++) {
    const item = items[i - 1];
    const wt = item.weight;
    const val = item.utility;

    for (let w = 0; w <= W; w++) {
      stepIndex++;
      
      const excludeVal = dpTable[i - 1][w];
      let includeVal: number | null = null;
      let includePrevCellVal: number | null = null;
      let decision: DecisionType = 'EXCLUDE';
      let explanation = '';

      if (wt <= w) {
        includePrevCellVal = dpTable[i - 1][w - wt];
        includeVal = val + includePrevCellVal;

        if (includeVal > excludeVal) {
          dpTable[i][w] = includeVal;
          decision = 'INCLUDE';
          explanation = `Item '${item.name}' (Wt: ${wt}kg, Utility: ${val}) fits in capacity ${w}kg. Including it yields ${val} + dp[${i-1}][${w-wt}] (${includePrevCellVal}) = ${includeVal}, which is greater than excluding it (${excludeVal}). Decision: INCLUDE.`;
        } else {
          dpTable[i][w] = excludeVal;
          decision = 'EXCLUDE';
          explanation = `Item '${item.name}' (Wt: ${wt}kg, Utility: ${val}) fits in capacity ${w}kg. However, including it yields ${val} + dp[${i-1}][${w-wt}] (${includePrevCellVal}) = ${includeVal}, which does NOT exceed excluding it (${excludeVal}). Decision: EXCLUDE.`;
        }
      } else {
        dpTable[i][w] = excludeVal;
        decision = 'NOT_ENOUGH_CAPACITY';
        explanation = `Item '${item.name}' weight (${wt}kg) exceeds current truck capacity limit (${w}kg). It cannot be loaded. Value inherited from dp[${i-1}][${w}] = ${excludeVal}.`;
      }

      const dpSnapshot = dpTable.map(row => [...row]);

      executionSteps.push({
        stepIndex,
        totalSteps,
        i,
        w,
        item,
        itemWeight: wt,
        itemUtility: val,
        excludeValue: excludeVal,
        includeValue: includeVal,
        includePrevCellVal,
        selectedValue: dpTable[i][w],
        decision,
        explanation,
        dpTableSnapshot: dpSnapshot,
        highlightCells: {
          current: [i, w],
          exclude: [i - 1, w],
          include: wt <= w ? [i - 1, w - wt] : undefined
        }
      });
    }
  }

  const selectedItems: Resource[] = [];
  const unselectedItems: Resource[] = [];
  const reconstructionSteps: ReconstructionStep[] = [];
  const reconstructedPath: [number, number][] = [[n, W]];

  let currW = W;
  let reconStepIdx = 1;

  for (let i = n; i > 0; i--) {
    const item = items[i - 1];
    const dpCurr = dpTable[i][currW];
    const dpPrev = dpTable[i - 1][currW];

    if (dpCurr !== dpPrev) {
      selectedItems.push(item);
      const nextW = currW - item.weight;
      
      reconstructionSteps.push({
        stepIndex: reconStepIdx++,
        i,
        w: currW,
        item,
        dpCurrent: dpCurr,
        dpPrevRow: dpPrev,
        included: true,
        nextW,
        explanation: `Cell dp[${i}][${currW}] (${dpCurr}) != dp[${i-1}][${currW}] (${dpPrev}). This proves '${item.name}' WAS INCLUDED in the optimal load. Subtract item weight (${item.weight}kg) -> New capacity: ${nextW}kg.`
      });

      currW = nextW;
      reconstructedPath.push([i - 1, currW]);
    } else {
      unselectedItems.push(item);

      reconstructionSteps.push({
        stepIndex: reconStepIdx++,
        i,
        w: currW,
        item,
        dpCurrent: dpCurr,
        dpPrevRow: dpPrev,
        included: false,
        nextW: currW,
        explanation: `Cell dp[${i}][${currW}] (${dpCurr}) == dp[${i-1}][${currW}] (${dpPrev}). Value is identical to the row above. '${item.name}' WAS EXCLUDED from the optimal load.`
      });

      reconstructedPath.push([i - 1, currW]);
    }
  }

  selectedItems.reverse();
  unselectedItems.reverse();

  const totalWeight = selectedItems.reduce((acc, item) => acc + item.weight, 0);
  const maxUtility = dpTable[n][W];
  const remainingCapacity = Math.max(0, W - totalWeight);
  const endTime = performance.now();

  return {
    dpTable,
    maxUtility,
    selectedItems,
    unselectedItems,
    totalWeight,
    remainingCapacity,
    executionSteps,
    reconstructionSteps,
    reconstructedPath,
    timeTakenMs: Math.round((endTime - startTime) * 100) / 100
  };
}
