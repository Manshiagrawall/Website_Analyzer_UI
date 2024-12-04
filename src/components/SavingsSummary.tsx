import React from 'react';
import { usePerformanceStore } from '../store/usePerformanceStore';
import { Clock, Zap, Gauge } from 'lucide-react';

export function SavingsSummary() {
  const { savings } = usePerformanceStore();

  if (!savings) return null;

  const cards = [
    {
      title: 'Admin Panel Optimizations',
      value: savings.adminPanelSavings.toFixed(2),
      icon: Gauge,
      colorClass: 'bg-green-50 text-green-700 border-green-200'
    },
    {
      title: 'Manual Interventions',
      value: savings.manualInterventionSavings.toFixed(2),
      icon: Clock,
      colorClass: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      title: 'Total Potential Savings',
      value: savings.totalSavings.toFixed(2),
      icon: Zap,
      colorClass: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Potential Time Savings</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`p-4 rounded-lg border ${card.colorClass} flex items-center space-x-4`}
            >
              <Icon className="w-8 h-8 opacity-80" />
              <div>
                <p className="text-sm opacity-80">{card.title}</p>
                <p className="text-2xl font-bold">{card.value}s</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}