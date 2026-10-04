import { solve01Knapsack } from '../algorithms/knapsack';
import type { TestCaseResult, Resource } from '../types';

export function runAllTestCases(): TestCaseResult[] {
  const results: TestCaseResult[] = [];

  // TEST 1: Standard Normal Disaster
  const items1: Resource[] = [
    { id: 't1-1', name: 'Water', weight: 6, utility: 100, icon: '💧' },
    { id: 't1-2', name: 'Medicine', weight: 3, utility: 95, icon: '💊' },
    { id: 't1-3', name: 'Food', weight: 8, utility: 90, icon: '🍱' },
    { id: 't1-4', name: 'Blanket', weight: 5, utility: 60, icon: '🛏' },
    { id: 't1-5', name: 'Torch', weight: 2, utility: 30, icon: '🔦' }
  ];
  const cap1 = 20;
  const res1 = solve01Knapsack(items1, cap1);
  results.push({
    id: 'test-1',
    name: 'TEST 1: Normal Disaster Allocation',
    description: 'Multiple items with varied weight/utility at 20kg truck capacity.',
    capacity: cap1,
    items: items1,
    expectedUtility: 315,
    expectedSelectedCount: 4,
    actualUtility: res1.maxUtility,
    actualSelectedCount: res1.selectedItems.length,
    passed: res1.maxUtility === 315 && res1.selectedItems.length === 4
  });

  // TEST 2: Zero Capacity
  const res2 = solve01Knapsack(items1, 0);
  results.push({
    id: 'test-2',
    name: 'TEST 2: Zero Truck Capacity (W = 0)',
    description: 'Verify algorithm handles W=0 correctly without errors.',
    capacity: 0,
    items: items1,
    expectedUtility: 0,
    expectedSelectedCount: 0,
    actualUtility: res2.maxUtility,
    actualSelectedCount: res2.selectedItems.length,
    passed: res2.maxUtility === 0 && res2.selectedItems.length === 0
  });

  // TEST 3: Capacity Smaller Than Every Item
  const items3: Resource[] = [
    { id: 't3-1', name: 'Heavy Generator', weight: 25, utility: 200, icon: '⚡' },
    { id: 't3-2', name: 'Large Tent', weight: 30, utility: 180, icon: '🎪' }
  ];
  const cap3 = 20;
  const res3 = solve01Knapsack(items3, cap3);
  results.push({
    id: 'test-3',
    name: 'TEST 3: Capacity Smaller Than All Items',
    description: 'All items exceed capacity. Expected: 0 utility, 0 selected.',
    capacity: cap3,
    items: items3,
    expectedUtility: 0,
    expectedSelectedCount: 0,
    actualUtility: res3.maxUtility,
    actualSelectedCount: res3.selectedItems.length,
    passed: res3.maxUtility === 0 && res3.selectedItems.length === 0
  });

  // TEST 4: Single Item (Fits)
  const items4: Resource[] = [
    { id: 't4-1', name: 'Medical Kit', weight: 5, utility: 100, icon: '💊' }
  ];
  const cap4 = 10;
  const res4 = solve01Knapsack(items4, cap4);
  results.push({
    id: 'test-4',
    name: 'TEST 4: Single Item That Fits',
    description: 'Single resource fits into capacity easily.',
    capacity: cap4,
    items: items4,
    expectedUtility: 100,
    expectedSelectedCount: 1,
    actualUtility: res4.maxUtility,
    actualSelectedCount: res4.selectedItems.length,
    passed: res4.maxUtility === 100 && res4.selectedItems.length === 1
  });

  // TEST 5: Duplicate Utilities (Same Utility, Different Weights)
  const items5: Resource[] = [
    { id: 't5-1', name: 'Heavy Blanket', weight: 10, utility: 80, icon: '🛏' },
    { id: 't5-2', name: 'Light Blanket', weight: 4, utility: 80, icon: '🛏' }
  ];
  const cap5 = 10;
  const res5 = solve01Knapsack(items5, cap5);
  results.push({
    id: 'test-5',
    name: 'TEST 5: Duplicate Utilities (Efficiency Preference)',
    description: 'Two items have utility 80. DP must select the lighter item.',
    capacity: cap5,
    items: items5,
    expectedUtility: 80,
    expectedSelectedCount: 1,
    actualUtility: res5.maxUtility,
    actualSelectedCount: res5.selectedItems.length,
    passed: res5.maxUtility === 80 && res5.selectedItems.length === 1 && res5.selectedItems[0].id === 't5-2'
  });

  // TEST 6: Changing Truck Capacity Dynamically
  const cap6 = 10;
  const res6 = solve01Knapsack(items1, cap6);
  results.push({
    id: 'test-6',
    name: 'TEST 6: Reduced Truck Capacity (Cap = 10kg)',
    description: 'Dynamic capacity reduction recalculates optimal utility.',
    capacity: cap6,
    items: items1,
    expectedUtility: 195,
    expectedSelectedCount: 2,
    actualUtility: res6.maxUtility,
    actualSelectedCount: res6.selectedItems.length,
    passed: res6.maxUtility === 195 && res6.selectedItems.length === 2
  });

  // TEST 7: Priority Mutation Verification
  const items7: Resource[] = items1.map(it => it.id === 't1-5' ? { ...it, utility: 150 } : it);
  const res7 = solve01Knapsack(items7, cap1);
  results.push({
    id: 'test-7',
    name: 'TEST 7: Priority Boost Re-Evaluation',
    description: 'Torch utility increased to 150. DP must automatically incorporate Torch.',
    capacity: cap1,
    items: items7,
    expectedUtility: 435,
    expectedSelectedCount: 4,
    actualUtility: res7.maxUtility,
    actualSelectedCount: res7.selectedItems.length,
    passed: res7.maxUtility === 435 && res7.selectedItems.some(i => i.id === 't1-5')
  });

  return results;
}
