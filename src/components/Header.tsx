import React from 'react';
import { Gauge } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-between p-6 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <Gauge className="w-8 h-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">WebPerformance</h1>
      </div>
    </header>
  );
}