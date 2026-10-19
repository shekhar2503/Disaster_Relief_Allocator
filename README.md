# Disaster Relief Allocator
### Dynamic Programming Based Emergency Resource Optimization
**Subject:** Design and Analysis of Algorithms (DAA) — Formative Assessment 2 (FA2) Project  

---

## 1. Project Title & Subtitle
* **Title:** Disaster Relief Allocator
* **Subtitle:** Dynamic Programming Based Emergency Resource Optimization
* **Domain:** Disaster Management Command Center & Resource Logistics
* **Technique:** Dynamic Programming (0/1 Knapsack Problem)

---

## 2. Problem Statement
Following a major disaster such as a flood, earthquake, wildfire, or cyclone, emergency response teams need to dispatch relief supplies using transport vehicles (relief trucks) with strict weight capacity limits ($W$).

Given a set of $n$ emergency resources, where each resource $i$ has:
- **Weight ($w_i$)** in kilograms (kg)
- **Utility / Priority value ($v_i$)** representing emergency importance
- **0/1 Constraint:** Each resource can either be completely loaded (1) or excluded (0). Supplies cannot be split into arbitrary fractions.

The goal is to determine the exact subset of resources to load into the relief truck to **maximize total utility value** without exceeding the truck's weight capacity $W$.

---

## 3. Real-World Motivation
During emergency response:
- Transportation payload capacity is constrained by vehicle axle limits and road conditions.
- Critical supplies have vastly different priority levels (e.g., clean water and trauma medicine take precedence over general tools).
- Choosing resources arbitrarily or using simple greedy ratios can leave truck capacity underutilized or miss life-saving combinations.
- A deterministic, mathematically proven algorithm ensures optimal resource deployment.

---

## 4. Objective
1. Visually demonstrate how **Dynamic Programming (DP)** solves the **0/1 Knapsack problem**.
2. Make DP state definitions, recurrence relations, bottom-up matrix generation, and backtracking solution reconstruction transparent and interactive.
3. Provide step-by-step stepper controls (`RUN`, `PAUSE`, `NEXT STEP`, `RESET`, `RUN ALL`) to inspect every single state transition.
4. Provide comparative tools such as **What-If Analysis**, **Greedy vs DP Comparison**, **Disaster Priority Modes**, and **Automated Test Cases**.

---

## 5. Algorithmic Strategy: Dynamic Programming
The selected algorithmic technique is **Bottom-Up Dynamic Programming**.

### Why Dynamic Programming?
1. **Optimal Substructure:** An optimal solution to a knapsack of capacity $W$ containing $n$ items contains optimal solutions to smaller capacities $w \le W$ with $i \le n$ items.
2. **Overlapping Subproblems:** Simple recursion evaluates identical subproblems repeatedly ($O(2^n)$ exponential time). Dynamic Programming memoizes intermediate values in a 2D matrix, guaranteeing pseudo-polynomial time $O(n \times W)$.

---

## 6. Mathematical Model & DP State

### DP State Definition
Let $dp[i][w]$ be the maximum utility achievable using a subset of the first $i$ items ($0 \le i \le n$) under a truck capacity limit of $w$ ($0 \le w \le W$).

### Base Cases
$$dp[0][w] = 0 \quad \text{for all } 0 \le w \le W$$
$$dp[i][0] = 0 \quad \text{for all } 0 \le i \le n$$

### Recurrence Relation
For item $i$ with weight $w_i$ and utility $v_i$:

$$\text{If } w_i \le w: \quad dp[i][w] = \max\left( dp[i-1][w], \ v_i + dp[i-1][w - w_i] \right)$$

$$\text{If } w_i > w: \quad dp[i][w] = dp[i-1][w]$$

---

## 7. Pseudocode

```text
KNAPSACK(items, capacity):
    n = number of items
    W = capacity

    // Step 1: Create (n+1) x (W+1) matrix initialized to 0
    create dp[n+1][W+1] initialized to 0

    // Step 2: Bottom-Up Matrix Filling
    for i = 1 to n:
        for w = 1 to W:
            if weight[i] <= w:
                include_val = utility[i] + dp[i-1][w - weight[i]]
                exclude_val = dp[i-1][w]
                dp[i][w] = max(include_val, exclude_val)
            else:
                dp[i][w] = dp[i-1][w]

    // Step 3: Backtracking / Solution Reconstruction
    currW = W
    selectedItems = []
    for i = n down to 1:
        if dp[i][currW] != dp[i-1][currW]:
            selectedItems.append(items[i])
            currW = currW - weight[i]

    return dp[n][W], selectedItems
```

---

## 8. Solution Reconstruction (Backtracking)
After the 2D DP matrix $dp[n][W]$ is complete:
1. Start at cell $(n, W)$.
2. Compare $dp[i][w]$ with $dp[i-1][w]$:
   - If **$dp[i][w] \neq dp[i-1][w]$**: Item $i$ **was included**. Add item $i$ to selected list, and update capacity $w = w - w_i$.
   - If **$dp[i][w] == dp[i-1][w]$**: Item $i$ **was excluded**. Move to row $i-1$ at same capacity $w$.
3. Repeat until row $0$ is reached.

---

## 9. Complexity Analysis

| Complexity Metric | Bound | Justification |
|---|---|---|
| **Time Complexity** | $O(n \times W)$ | Matrix contains $(n+1) \times (W+1)$ cells; each cell computed in $O(1)$ constant time. |
| **Space Complexity** | $O(n \times W)$ | 2D matrix required for full step-by-step state inspection and backtracking path reconstruction. |

---

## 10. System Architecture

```text
src/
├── types/
│   └── index.ts                 # TypeScript interfaces (Resource, DPStep, KnapsackResult, Scenario)
├── data/
│   └── scenarios.ts             # Preset disaster scenarios (Flood, Earthquake, Wildfire, Cyclone) & modes
├── algorithms/
│   └── knapsack.ts              # Pure manual 0/1 Knapsack DP engine & step trace generator
├── utils/
│   ├── validation.ts            # Input validation routines (weight > 0, utility >= 0, non-empty name)
│   ├── calculations.ts          # Priority mode multipliers, Greedy solver, random dataset generator
│   └── testRunner.ts            # Built-in automated test suite (8 academic test cases)
└── components/
    ├── Header.tsx               # Branding, system status indicator, mode toggles
    ├── DisasterSelector.tsx     # Scenario preset switcher
    ├── PriorityModeSelector.tsx # Dynamic priority weighting selector
    ├── ResourceTable.tsx        # Resource CRUD management table
    ├── ResourceForm.tsx         # Add/Edit modal dialog with validation
    ├── TruckCapacity.tsx        # Interactive capacity control & load meter
    ├── TruckVisualization.tsx   # Graphic relief truck payload container
    ├── DPExecutionPanel.tsx     # Stepper controls (RUN, PAUSE, NEXT STEP, RESET, RUN ALL)
    ├── DPTable.tsx              # Interactive 2D DP grid matrix with glowing cell highlights & path checkmarks
    ├── DecisionVisualizer.tsx   # Visual decision tree diagram (INCLUDE vs EXCLUDE)
    ├── AlgorithmExplanationPanel.tsx # Live narrative explanation & numeric recurrence formula
    ├── SolutionReconstruction.tsx # Backtracking step log & payload checklist
    ├── ResultPanel.tsx          # Optimal payload summary card
    ├── WhatIfAnalysis.tsx       # Comparative BEFORE vs AFTER simulator
    ├── GreedyVsDPComparison.tsx # Counterexample comparison showing why Greedy fails
    ├── DPConceptExplorer.tsx    # Optimal Substructure & Overlapping Subproblems theory
    ├── ComplexityPanel.tsx      # Asymptotic complexity & pseudocode breakdown
    ├── RandomScenarioGenerator.tsx # Bounded random dataset generator
    ├── TestCasesPanel.tsx       # Automated test runner view
    ├── SimulationPanel.tsx      # Command Center step-by-step simulation walkthrough modal
    └── PresentationMode.tsx     # Slide-like presentation view for faculty evaluation
```

---

## 11. Application Features
1. **Interactive Stepper Execution:** STEP-by-STEP state transition visualization with adjustable animation speed (50ms–1000ms).
2. **Dynamic 2D DP Table:** Real-time cell highlighting (Current Cell, Exclude Cell, Include Cell, Backtracked Optimal Path).
3. **Decision Tree Visualizer:** Graphical branch diagram demonstrating the choice between Include and Exclude options.
4. **Disaster Scenarios:** Preset configurations for Flood, Earthquake, Wildfire, and Cyclone.
5. **Resource Priority Modes:** Dynamic utility weighting for Balanced, Life-Critical, Basic Survival, and Medical Focus.
6. **Relief Truck Visualization:** Graphical truck bay displaying loaded items, current load meter, and remaining capacity.
7. **What-If Analysis:** Side-by-side comparative simulation for capacity and priority adjustments.
8. **Automated Test Suite:** Built-in test cases for edge cases (W=0, item wt > W, single item, duplicate utilities, priority mutation).
9. **Faculty Presentation Mode:** Simplified slide view optimized for academic evaluation.

---

## 12. How to Run Locally

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
# Clone or navigate to project directory
cd Disaster_Relief_Allocator

# Install dependencies
npm install

# Start local dev server
npm run dev
```

The application will be available locally at `http://localhost:5173`.

---

## 13. Academic Conclusion
The **Disaster Relief Allocator** demonstrates how Dynamic Programming transforms an intractable combinatorial optimization problem ($O(2^n)$ recursion) into an efficient pseudo-polynomial solution ($O(n \times W)$). By visualizing state transitions, recurrence formulas, and backtracking logic in a Disaster Management Command Center context, this model serves as a comprehensive tool for DAA academic evaluation.
