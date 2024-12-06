import React, { useState } from 'react';
import { Info, Clock, Gauge, Maximize, Move, Zap } from 'lucide-react';
import { PerformanceMetric } from '../types/performance';

const iconMapping = {
  'first-contentful-paint': Zap,
  'largest-contentful-paint': Maximize,
  'total-blocking-time': Clock,
  'cumulative-layout-shift': Move,
  'speed-index': Gauge,
  'interactive': Move, // Adjust as necessary
};

const explanationDataMapping: Record<string, { whatItMeans: string; howToImprove: string[]; impact: string; technicalDetails: string; thresholds?: string }> = {
  'first-contentful-paint': {
    whatItMeans: 'First Contentful Paint (FCP) measures the time it takes for the first piece of content to be rendered on the screen.',
    howToImprove: [
      'Optimize server response times.',
      'Reduce render-blocking resources.',
      'Use a content delivery network (CDN).',
    ],
    impact: 'A faster FCP improves user perception of your site’s speed.',
    technicalDetails: 'FCP is measured from the time the user requests the page until the browser renders the first pixel of content.',
    thresholds: `
      <div>
        <div class="text-green-500">Good (≤ 1.8 s)</div>
        <div class="text-yellow-500">Needs Improvement (1.8 s - 3 s)</div>
        <div class="text-red-500">Poor (> 3 s)</div>
      </div>
    `,
  },
  'largest-contentful-paint': {
    whatItMeans: 'Largest Contentful Paint (LCP) measures the time it takes for the largest content element to be rendered.',
    howToImprove: [
      'Optimize images and videos.',
      'Minimize CSS and JavaScript blocking.',
      'Use lazy loading for offscreen images.',
    ],
    impact: 'Improving LCP can lead to a better user experience and lower bounce rates.',
    technicalDetails: 'LCP is measured from the time the user requests the page until the largest content element is rendered.',
    thresholds: `
      <div>
        <div class="text-green-500">Good (≤ 2.5 s)</div>
        <div class="text-yellow-500">Needs Improvement (2.5 s - 4 s)</div>
        <div class="text-red-500">Poor (> 4 s)</div>
      </div>
    `,
  },
  'cumulative-layout-shift': {
    whatItMeans: 'Cumulative Layout Shift (CLS) measures the visual stability of a page by quantifying how much the content shifts during loading.',
    howToImprove: [
      'Include size attributes for images and videos.',
      'Avoid inserting content above existing content.',
      'Use CSS transform animations instead of layout animations.',
    ],
    impact: 'A lower CLS score leads to a more stable and pleasant user experience.',
    technicalDetails: 'CLS is calculated by summing the layout shift scores for every unexpected layout shift during the entire lifespan of the page.',
    thresholds: `
      <div>
        <div class="text-green-500">Good (≤ 0.1)</div>
        <div class="text-yellow-500">Needs Improvement (0.1 - 0.25)</div>
        <div class="text-red-500">Poor (> 0.25)</div>
      </div>
    `,
  },
  'total-blocking-time': {
    whatItMeans: 'Total Blocking Time (TBT) measures the time between FCP and Time to Interactive (TTI) when the main thread is blocked long enough to prevent input responsiveness.',
    howToImprove: [
      'Minimize long tasks in JavaScript.',
      'Use web workers for heavy computations.',
      'Optimize third-party scripts.',
    ],
    impact: 'Reducing TBT can lead to a more responsive user experience.',
    technicalDetails: 'TBT is calculated by summing the blocking time of all long tasks that occur between FCP and TTI.',
    thresholds: `
      <div>
        <div class="text-green-500">Good (≤ 200 ms)</div>
        <div class="text-yellow-500">Needs Improvement (200 ms - 500 ms)</div>
        <div class="text-red-500">Poor (> 500 ms)</div>
      </div>
    `,
  },
  'speed-index': {
    whatItMeans: 'Speed Index measures how quickly the contents of a page are visibly populated.',
    howToImprove: [
      'Optimize critical rendering path.',
      'Minimize CSS and JavaScript blocking.',
      'Use lazy loading for images.',
    ],
    impact: 'A lower Speed Index indicates a faster perceived load time.',
    technicalDetails: 'Speed Index is calculated by analyzing the visual progress of a page load.',
  },
  'interactive': {
    whatItMeans: 'Time to Interactive (TTI) measures how long it takes for a page to become fully interactive.',
    howToImprove: [
      'Reduce JavaScript execution time.',
      'Optimize resource loading.',
      'Minimize main thread work.',
    ],
    impact: 'A faster TTI improves user engagement and satisfaction.',
    technicalDetails: 'TTI is measured from the time the user requests the page until the page is fully interactive.',
  },
};

interface MetricCardProps {
  metric: PerformanceMetric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const [showExplanation, setShowExplanation] = useState(false);
  const IconComponent = iconMapping[metric.icon as keyof typeof iconMapping];

  const explanationData = explanationDataMapping[metric.id];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          {IconComponent && (
            <IconComponent className={`w-5 h-5 ${metric.color} flex-shrink-0 mt-1`} />
          )}
          <div>
            <h3 className="font-semibold text-gray-900">{metric.label}</h3>
            <div className={`px-2 py-0.5 rounded text-lg ${metric.color}`}>
              <strong>{typeof metric.value === 'number' ? `${metric.value}` : metric.value}</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        {!showExplanation && (
          <button
            onClick={() => setShowExplanation(true)}
            className="mt-4 text-blue-500 hover:underline"
          >
            Read More
          </button>
        )}
      </div>
      {showExplanation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 shadow-lg">
            <h3 className="text-lg font-semibold flex items-center">
              <Info className={`mr-2 ${metric.color}`} />
              Understanding This Metric
            </h3>
            <div className="space-y-4 mt-4">
              <div className="flex items-start">
                <Clock className={`w-5 h-5 text-green-500 mr-2`} />
                <h4 className="font-medium text-green-600">What it means</h4>
              </div>
              <p className="text-gray-600">{explanationData.whatItMeans}</p>

              <div className="flex items-start">
                <Gauge className={`w-5 h-5 text-orange-500 mr-2`} />
                <h4 className="font-medium text-orange-600">Impact on User Experience</h4>
              </div>
              <p className="text-gray-600">{explanationData.impact}</p>

              <div className="flex items-start">
                <Maximize className={`w-5 h-5 text-blue-500 mr-2`} />
                <h4 className="font-medium text-blue-600">How to Improve</h4>
              </div>
              <ul className="list-disc ml-5 text-gray-600">
                {explanationData.howToImprove.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>

              <div className="flex items-start">
                <Move className={`w-5 h-5 text-purple-500 mr-2`} />
                <h4 className="font-medium text-purple-600">Technical Details</h4>
              </div>
              <p className="text-gray-600">{explanationData.technicalDetails}</p>

              {explanationData.thresholds && (
                <div className="flex items-start">
                  <Info className={`w-5 h-5 text-gray-500 mr-2`} />
                  <h4 className="font-medium text-gray-600">Performance Thresholds</h4>
                </div>
              )}
              {explanationData.thresholds && (
                <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: explanationData.thresholds }} />
              )}
            </div>
            <button
              onClick={() => setShowExplanation(false)}
              className="mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}