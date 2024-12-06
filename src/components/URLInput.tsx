import React, { useState } from 'react';
import { usePerformanceStore } from '../store/usePerformanceStore';
import { fetchPageSpeedInsights } from '../services/api';

interface URLInputProps {
  isMobile: boolean;
}

export function URLInput({ isMobile }: URLInputProps) {
  const [url, setUrl] = useState('');
  const { analyze, isLoading, error } = usePerformanceStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      const strategy = isMobile ? 'mobile' : 'desktop';
      await analyze(url, strategy);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        className="flex-1 border border-gray-300 rounded px-4 py-2"
      />
      <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2" disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Analyze'}
      </button>
      {error && (
        <div className="ml-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </form>
  );
}