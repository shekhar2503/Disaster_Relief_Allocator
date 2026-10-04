import React, { useState } from 'react';
import { runAllTestCases } from '../utils/testRunner';
import type { TestCaseResult } from '../types';
import { TestTube, CheckCircle2, XCircle, RefreshCw, X } from 'lucide-react';

interface TestCasesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TestCasesPanel: React.FC<TestCasesPanelProps> = ({ isOpen, onClose }) => {
  const [results, setResults] = useState<TestCaseResult[]>([]);
  const [hasRun, setHasRun] = useState(false);

  if (!isOpen) return null;

  const handleRunTests = () => {
    const res = runAllTestCases();
    setResults(res);
    setHasRun(true);
  };

  const allPassed = results.length > 0 && results.every((r) => r.passed);

  return (
    <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-2xl w-full p-5 shadow-xl relative max-h-[90vh] flex flex-col justify-between text-slate-900 dark:text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <TestTube className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Academic Algorithm Verification Suite</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Executes built-in edge cases (zero capacity, single items, duplicate utility, capacity overflow, priority mutation) to verify DP correctness.
          </p>

          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleRunTests}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>RUN ALL TEST CASES</span>
            </button>

            {hasRun && (
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  allPassed
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60'
                    : 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60'
                }`}
              >
                {allPassed ? 'ALL TEST CASES PASSED (100%)' : 'SOME TESTS FAILED'}
              </span>
            )}
          </div>

          <div className="overflow-y-auto max-h-[50vh] rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2 space-y-2 font-mono text-xs">
            {!hasRun ? (
              <div className="text-center text-slate-400 dark:text-slate-500 py-10 font-sans text-xs">
                Click &quot;RUN ALL TEST CASES&quot; to execute automated academic verification.
              </div>
            ) : (
              results.map((test) => (
                <div
                  key={test.id}
                  className={`p-3 rounded-lg border transition-colors ${
                    test.passed
                      ? 'bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-800/60 text-slate-800 dark:text-slate-200'
                      : 'bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-800/60 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 font-sans font-bold">
                    <span className="flex items-center gap-2">
                      {test.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      )}
                      <span>{test.name}</span>
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        test.passed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {test.passed ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                  <p className="text-[11px] font-sans text-slate-500 dark:text-slate-400 mb-2">{test.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-2 rounded border border-slate-200 dark:border-slate-800">
                    <div>Expected Utility: <span className="text-blue-700 dark:text-blue-400 font-semibold">{test.expectedUtility}</span></div>
                    <div>Actual Utility: <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{test.actualUtility}</span></div>
                    <div>Expected Items: <span className="text-blue-700 dark:text-blue-400 font-semibold">{test.expectedSelectedCount}</span></div>
                    <div>Actual Items: <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{test.actualSelectedCount}</span></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-3 text-right border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
