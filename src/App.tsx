import { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { DisasterSelector } from './components/DisasterSelector';
import { PriorityModeSelector } from './components/PriorityModeSelector';
import { ResourceTable } from './components/ResourceTable';
import { TruckCapacity } from './components/TruckCapacity';
import { TruckVisualization } from './components/TruckVisualization';
import { DPExecutionPanel } from './components/DPExecutionPanel';
import { DPTable } from './components/DPTable';
import { DecisionVisualizer } from './components/DecisionVisualizer';
import { AlgorithmExplanationPanel } from './components/AlgorithmExplanationPanel';
import { SolutionReconstruction } from './components/SolutionReconstruction';
import { ResultPanel } from './components/ResultPanel';
import { WhatIfAnalysis } from './components/WhatIfAnalysis';
import { DPConceptExplorer } from './components/DPConceptExplorer';
import { ComplexityPanel } from './components/ComplexityPanel';
import { GreedyVsDPComparison } from './components/GreedyVsDPComparison';
import { RandomScenarioGenerator } from './components/RandomScenarioGenerator';
import { TestCasesPanel } from './components/TestCasesPanel';
import { SimulationPanel } from './components/SimulationPanel';
import { PresentationMode } from './components/PresentationMode';

import { DEFAULT_SCENARIOS, PRIORITY_MODES } from './data/scenarios';
import type { Resource, DisasterScenario, PriorityModeInfo, DPStep } from './types';
import { solve01Knapsack } from './algorithms/knapsack';
import { applyPriorityMode } from './utils/calculations';

export function App() {
  // Theme State (Default: 'light', persistent in localStorage)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('disaster_allocator_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('disaster_allocator_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Scenario & Dataset State
  const [activeScenario, setActiveScenario] = useState<DisasterScenario>(DEFAULT_SCENARIOS[0]);
  const [resources, setResources] = useState<Resource[]>(DEFAULT_SCENARIOS[0].resources);
  const [capacity, setCapacity] = useState<number>(DEFAULT_SCENARIOS[0].defaultCapacity);
  const [activePriorityMode, setActivePriorityMode] = useState<PriorityModeInfo>(PRIORITY_MODES[0]);

  // Stepper Animation State
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(300);

  // Modals & Presentation View State
  const [isSimulationOpen, setIsSimulationOpen] = useState<boolean>(false);
  const [isTestCasesOpen, setIsTestCasesOpen] = useState<boolean>(false);
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);

  // Apply priority mode multipliers to resource utilities
  const adjustedResources = useMemo(() => {
    return applyPriorityMode(resources, activePriorityMode);
  }, [resources, activePriorityMode]);

  // Compute 0/1 Knapsack Solution & Step Trace dynamically
  const result = useMemo(() => {
    return solve01Knapsack(adjustedResources, capacity);
  }, [adjustedResources, capacity]);

  const totalSteps = result.executionSteps.length;
  const isComplete = currentStepIndex >= totalSteps;

  // Selected Item IDs Set
  const selectedItemIds = useMemo(() => {
    return new Set(result.selectedItems.map((item) => item.id));
  }, [result.selectedItems]);

  // Auto-stepping Interval Effect
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && currentStepIndex < totalSteps) {
      timerRef.current = window.setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= totalSteps - 1) {
            setIsRunning(false);
            return totalSteps;
          }
          return prev + 1;
        });
      }, speedMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, currentStepIndex, totalSteps, speedMs]);

  // Handler: Change Scenario
  const handleSelectScenario = (scenario: DisasterScenario) => {
    setActiveScenario(scenario);
    setResources(scenario.resources);
    setCapacity(scenario.defaultCapacity);
    setCurrentStepIndex(0);
    setIsRunning(false);
  };

  // Handler: Change Priority Mode
  const handleSelectPriorityMode = (mode: PriorityModeInfo) => {
    setActivePriorityMode(mode);
    setCurrentStepIndex(0);
    setIsRunning(false);
  };

  // Handler: Add Resource
  const handleAddResource = (resData: Omit<Resource, 'id'>) => {
    const newRes: Resource = {
      ...resData,
      id: `res-${Date.now()}`,
    };
    setResources((prev) => [...prev, newRes]);
    setCurrentStepIndex(0);
    setIsRunning(false);
  };

  // Handler: Edit Resource
  const handleEditResource = (id: string, resData: Omit<Resource, 'id'>) => {
    setResources((prev) =>
      prev.map((item) => (item.id === id ? { ...resData, id } : item))
    );
    setCurrentStepIndex(0);
    setIsRunning(false);
  };

  // Handler: Delete Resource
  const handleDeleteResource = (id: string) => {
    setResources((prev) => prev.filter((item) => item.id !== id));
    setCurrentStepIndex(0);
    setIsRunning(false);
  };

  // Handler: Reset Defaults
  const handleResetDefaults = () => {
    setResources(activeScenario.resources);
    setCapacity(activeScenario.defaultCapacity);
    setActivePriorityMode(PRIORITY_MODES[0]);
    setCurrentStepIndex(0);
    setIsRunning(false);
  };

  // Stepper Controls Handlers
  const handlePlay = () => {
    if (isComplete) setCurrentStepIndex(0);
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStepIndex(0);
  };

  const handleRunAll = () => {
    setIsRunning(false);
    setCurrentStepIndex(totalSteps);
  };

  // Random Scenario Generator Handler
  const handleGenerateRandom = (newItems: Resource[], newCapacity: number) => {
    setResources(newItems);
    setCapacity(newCapacity);
    setCurrentStepIndex(0);
    setIsRunning(false);
  };

  // Active DP Step for Visualization
  const currentStep: DPStep | null =
    currentStepIndex > 0 && currentStepIndex <= totalSteps
      ? result.executionSteps[currentStepIndex - 1]
      : null;

  // System Status String
  const systemStatus = isRunning
    ? 'RUNNING'
    : isComplete
    ? 'DISPATCHED'
    : currentStepIndex > 0
    ? 'PAUSED'
    : 'READY';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors duration-150">
      {/* Header with Theme Switcher */}
      <Header
        systemStatus={systemStatus}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenSimulation={() => setIsSimulationOpen(true)}
        onOpenTestCases={() => setIsTestCasesOpen(true)}
        isPresentationMode={isPresentationMode}
        onTogglePresentationMode={() => setIsPresentationMode(!isPresentationMode)}
      />

      {/* Main Workspace Layout */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex-1 w-full space-y-5">
        {/* Top Controls: Scenario & Priority Modes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DisasterSelector
            scenarios={DEFAULT_SCENARIOS}
            activeScenarioId={activeScenario.id}
            onSelectScenario={handleSelectScenario}
          />

          <PriorityModeSelector
            modes={PRIORITY_MODES}
            activeModeId={activePriorityMode.id}
            onSelectMode={handleSelectPriorityMode}
          />
        </div>

        {/* Resource Management & Capacity Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ResourceTable
              resources={adjustedResources}
              selectedItemIds={selectedItemIds}
              onAddResource={handleAddResource}
              onEditResource={handleEditResource}
              onDeleteResource={handleDeleteResource}
              onResetDefaults={handleResetDefaults}
            />
          </div>

          <div>
            <TruckCapacity
              capacity={capacity}
              currentWeight={result.totalWeight}
              onChangeCapacity={(cap) => {
                setCapacity(cap);
                setCurrentStepIndex(0);
                setIsRunning(false);
              }}
            />
          </div>
        </div>

        {/* Relief Truck Cargo Bay Container */}
        <TruckVisualization
          selectedItems={result.selectedItems}
          totalWeight={result.totalWeight}
          totalUtility={result.maxUtility}
          capacity={capacity}
          remainingCapacity={result.remainingCapacity}
        />

        {/* Stepper Execution Panel */}
        <DPExecutionPanel
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
          isRunning={isRunning}
          onPlay={handlePlay}
          onPause={handlePause}
          onNextStep={handleNextStep}
          onReset={handleReset}
          onRunAll={handleRunAll}
          speedMs={speedMs}
          onChangeSpeed={setSpeedMs}
        />

        {/* 2D DP State Matrix — Visual Centerpiece */}
        <DPTable
          resources={adjustedResources}
          capacity={capacity}
          currentStep={currentStep}
          fullDPTable={result.dpTable}
          reconstructedPath={result.reconstructedPath}
          isComplete={isComplete}
        />

        {/* Decision Tree & Recurrence Narrative Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DecisionVisualizer currentStep={currentStep} />
          <AlgorithmExplanationPanel currentStep={currentStep} />
        </div>

        {/* Solution Reconstruction (Backtracking) */}
        <SolutionReconstruction
          reconstructionSteps={result.reconstructionSteps}
          selectedItems={result.selectedItems}
          unselectedItems={result.unselectedItems}
          isComplete={isComplete}
        />

        {/* Final Optimal Result Highlight */}
        <ResultPanel
          selectedItems={result.selectedItems}
          maxUtility={result.maxUtility}
          totalWeight={result.totalWeight}
          capacity={capacity}
          remainingCapacity={result.remainingCapacity}
          timeTakenMs={result.timeTakenMs}
          isComplete={isComplete}
        />

        {/* Random Dataset Generator */}
        <RandomScenarioGenerator onGenerate={handleGenerateRandom} />

        {/* What-If Comparative Analysis Simulator */}
        <WhatIfAnalysis
          currentItems={adjustedResources}
          currentCapacity={capacity}
          currentMaxUtility={result.maxUtility}
          currentTotalWeight={result.totalWeight}
        />

        {/* Greedy vs DP Counterexample Comparison */}
        <GreedyVsDPComparison
          resources={adjustedResources}
          capacity={capacity}
          dpMaxUtility={result.maxUtility}
        />

        {/* Theoretical DP Concept Explorer */}
        <DPConceptExplorer />

        {/* Complexity Analysis & Pseudocode */}
        <ComplexityPanel />
      </main>

      {/* Modals & Overlays */}
      <SimulationPanel
        isOpen={isSimulationOpen}
        onClose={() => setIsSimulationOpen(false)}
        scenario={activeScenario}
        resources={adjustedResources}
        capacity={capacity}
        result={result}
      />

      <TestCasesPanel
        isOpen={isTestCasesOpen}
        onClose={() => setIsTestCasesOpen(false)}
      />

      {isPresentationMode && (
        <PresentationMode
          scenario={activeScenario}
          resources={adjustedResources}
          capacity={capacity}
          result={result}
          onExit={() => setIsPresentationMode(false)}
        />
      )}

      {/* Academic Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-4 px-4 text-center text-xs text-slate-500 dark:text-slate-400 font-mono transition-colors">
        <p>🚚 Disaster Relief Allocator — FA2 Project for Design and Analysis of Algorithms (DAA)</p>
      </footer>
    </div>
  );
}

export default App;
