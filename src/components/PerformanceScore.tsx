import React from 'react';
import { MetricCard } from './MetricCard';
import { usePerformanceStore } from '../store/usePerformanceStore';
import { Loader2 } from 'lucide-react';

export function PerformanceScore() {
  const { metrics, isLoading } = usePerformanceStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!metrics.length) {
    return <div className="text-center py-8 text-gray-500">No performance metrics available.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Performance Metrics</h2>
      <p className="text-gray-600 mb-4">Click on each metric to learn more about what it means and how to improve it.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
    </div>
  );
}