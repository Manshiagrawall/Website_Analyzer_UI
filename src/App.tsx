import React from 'react';
import { Header } from './components/Header';
import { URLInput } from './components/URLInput';
import { PerformanceScore } from './components/PerformanceScore';
import { ExpandablePanel } from './components/ExpandablePanel';
import { IssuesList } from './components/IssuesList';
import { OptimizationChecklist } from './components/OptimizationChecklist';
import { SavingsSummary } from './components/SavingsSummary';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Analyze Your Website Performance</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get detailed insights into your website's performance and discover actionable improvements to enhance user experience.
          </p>
        </div>
        <URLInput />
        <div className="mt-12 space-y-6">
          <PerformanceScore />
          <SavingsSummary />
        </div>
        <div className="space-y-6">
          <ExpandablePanel title="Known Issues">
            <IssuesList />
          </ExpandablePanel>
          <ExpandablePanel title="Optimization Checklist">
            <OptimizationChecklist />
          </ExpandablePanel>
        </div>
      </main>
    </div>
  );
}

export default App;