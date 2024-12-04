import React from 'react';
import { X, Lightbulb, Wrench, Target, Code } from 'lucide-react';

interface MetricExplanationProps {
  explanation: {
    whatItMeans: string;
    howToImprove: string[];
    impact: string;
    technicalDetails: string;
  };
  onClose: () => void;
}

export function MetricExplanation({ explanation, onClose }: MetricExplanationProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Understanding This Metric</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-800">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h4 className="font-medium">What it means</h4>
            </div>
            <p className="text-gray-600 ml-7">{explanation.whatItMeans}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-800">
              <Target className="w-5 h-5 text-red-500" />
              <h4 className="font-medium">Impact on User Experience</h4>
            </div>
            <p className="text-gray-600 ml-7">{explanation.impact}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-800">
              <Wrench className="w-5 h-5 text-blue-500" />
              <h4 className="font-medium">How to Improve</h4>
            </div>
            <ul className="ml-7 space-y-2">
              {explanation.howToImprove.map((tip, index) => (
                <li key={index} className="text-gray-600 flex items-start gap-2">
                  <span className="text-blue-500 font-medium">{index + 1}.</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-800">
              <Code className="w-5 h-5 text-purple-500" />
              <h4 className="font-medium">Technical Details</h4>
            </div>
            <p className="text-gray-600 ml-7">{explanation.technicalDetails}</p>
          </div>
        </div>
      </div>
    </div>
  );
}