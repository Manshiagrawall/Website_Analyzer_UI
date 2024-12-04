// import { PerformanceMetric } from '../types/performance';

// export function parsePageSpeedResults(data: any) {
//   const { lighthouseResult } = data;
//   const { categories, audits } = lighthouseResult;

//   const metrics: PerformanceMetric[] = [
//     {
//       id: 'performance',
//       label: 'Performance Score',
//       value: Math.round(categories.performance.score * 100),
//       description: 'Overall performance score based on Core Web Vitals',
//       icon: 'Gauge',
//       color: 'text-green-500',
//       threshold: {
//         good: 90,
//         needsImprovement: 50
//       }
//     },
//     {
//       id: 'fcp',
//       label: 'First Contentful Paint',
//       value: `${(audits['first-contentful-paint'].numericValue / 1000).toFixed(1)}s`,
//       description: audits['first-contentful-paint'].description,
//       icon: 'Zap',
//       color: 'text-blue-500',
//       threshold: {
//         good: 1.8,
//         needsImprovement: 3.0
//       }
//     },
//     {
//       id: 'lcp',
//       label: 'Largest Contentful Paint',
//       value: `${(audits['largest-contentful-paint'].numericValue / 1000).toFixed(1)}s`,
//       description: audits['largest-contentful-paint'].description,
//       icon: 'Maximize',
//       color: 'text-purple-500',
//       threshold: {
//         good: 2.5,
//         needsImprovement: 4.0
//       }
//     },
//     {
//       id: 'tbt',
//       label: 'Total Blocking Time',
//       value: `${Math.round(audits['total-blocking-time'].numericValue)}ms`,
//       description: audits['total-blocking-time'].description,
//       icon: 'Clock',
//       color: 'text-orange-500',
//       threshold: {
//         good: 200,
//         needsImprovement: 600
//       }
//     }
//   ];

//   return {
//     metrics,
//     audits: Object.entries(audits)
//       .filter(([_, audit]: [string, any]) => audit.score !== null && audit.score < 1)
//       .map(([id, audit]: [string, any]) => ({
//         id,
//         title: audit.title,
//         description: audit.description,
//         score: audit.score,
//         numericValue: audit.numericValue,
//         displayValue: audit.displayValue,
//         details: audit.details
//       }))
//   };
// }

export function parsePageSpeedResults(data: any) {
  const { lighthouseResult } = data;
  const { categories, audits } = lighthouseResult;

  const metricsToExtract = [
    { id: 'first-contentful-paint', label: 'First Contentful Paint', icon: 'Zap' },
    { id: 'largest-contentful-paint', label: 'Largest Contentful Paint', icon: 'Maximize' },
    { id: 'total-blocking-time', label: 'Total Blocking Time', icon: 'Clock' },
    { id: 'cumulative-layout-shift', label: 'Cumulative Layout Shift', icon: 'Move' },
    { id: 'interactive', label: 'Time to Interactive', icon: 'MousePointer' },
    { id: 'speed-index', label: 'Speed Index', icon: 'Gauge' }
  ];

  const metrics = metricsToExtract.map(({ id, label, icon }) => {
    const audit = audits[id];
    return {
      id,
      label,
      value: audit.displayValue,
      description: audit.description,
      icon,
      color: getMetricColor(audit.score),
      score: audit.score,
      details: {
        ...audit,
        explanation: audit.explanation || undefined
      },
      threshold: getThresholdForMetric(id)
    };
  });

  // Rest of your existing parsing logic...
  return {
    metrics,
    // ... other return values
  };
}

function getMetricColor(score: number): string {
  if (score >= 0.9) return 'text-green-500';
  if (score >= 0.5) return 'text-yellow-500';
  return 'text-red-500';
}

function getThresholdForMetric(metricId: string) {
  const thresholds: Record<string, { good: number; needsImprovement: number }> = {
    'first-contentful-paint': { good: 1.8, needsImprovement: 3.0 },
    'largest-contentful-paint': { good: 2.5, needsImprovement: 4.0 },
    'total-blocking-time': { good: 200, needsImprovement: 600 },
    'cumulative-layout-shift': { good: 0.1, needsImprovement: 0.25 },
    'interactive': { good: 3.8, needsImprovement: 7.3 },
    'speed-index': { good: 3.4, needsImprovement: 5.8 }
  };
  return thresholds[metricId];
}