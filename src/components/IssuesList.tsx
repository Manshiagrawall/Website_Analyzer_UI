import React, { useState } from 'react';
import { usePerformanceStore } from '../store/usePerformanceStore';
import { performanceIssues } from '../data/performanceIssues';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

// Define CSS styles for highlighting
const highlightStyle = {
  fontWeight: 'bold',
  color: 'green', // Change this color as needed
};

const savingsTextStyle = {
  color: '#47663B', // Updated color for potential savings
};

export function IssuesList() {
  const { audits } = usePerformanceStore();
  const [showKnownIssues, setShowKnownIssues] = useState(true);
  const [showOtherIssues, setShowOtherIssues] = useState(true);

  if (!audits.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No performance issues detected
      </div>
    );
  }

  const addressableIssues = audits.filter(audit => audit.isAddressable);
  const otherIssues = audits.filter(audit => !audit.isAddressable);
  const sortedOtherIssues = otherIssues.sort((a, b) => (b.savings || 0) - (a.savings || 0));

  return (
    <div className="space-y-8">
      {/* Known Issues Section */}
      {addressableIssues.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h3 className="text-2xl font-bold text-black pb-2 cursor-pointer" onClick={() => setShowKnownIssues(!showKnownIssues)}>
            Known Issues {showKnownIssues ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />}
          </h3>
          {showKnownIssues && (
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-black">Quick Fixes Available</h4>
              {addressableIssues.map((issue) => {
                const solutions = issue.solutions || [];
                return (
                  <div key={issue.id} className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
                    <h4 className="font-bold text-black">{issue.title}</h4>
                    <p className="mt-1 text-sm font-semibold text-green-700">{issue.description}</p>
                    {issue.savings > 0 && (
                      <p className="mt-2 text-sm font-bold text-gray-500">Potential savings: {(issue.savings / 1000).toFixed(2)}s</p>
                    )}
                    {solutions.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h5 className="text-sm font-bold text-green-900">Solution Steps:</h5>
                        <ul className="space-y-1">
                          {solutions.map((solution, index) => (
                            <li key={index} className="flex gap-2 p-2 bg-teal-50 rounded-md hover:bg-teal-100 transition duration-200 text-sm">
                              <ArrowRight className="w-4 h-4 flex-shrink-0" />
                              <span>{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Other Performance Issues Section */}
      {sortedOtherIssues.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h3 className="text-2xl font-bold text-black pb-2 cursor-pointer" onClick={() => setShowOtherIssues(!showOtherIssues)}>
            Other Performance Issues {showOtherIssues ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />}
          </h3>
          {showOtherIssues && (
            <div className="space-y-4">
              {sortedOtherIssues.map((issue) => (
                <div key={issue.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-md">
                  <h4 className="font-bold text-black">{issue.title}</h4>
                  {issue.savings > 0 && (
                    <p className="mt-2 text-sm font-bold" style={savingsTextStyle}>
                        Potential savings: {(issue.savings / 1000).toFixed(2)}s
                      </p>                  )}
                  {performanceIssues[issue.id] && (
                    <div className="mt-4">
                      <h5 className="text-sm font-bold text-gray-900">Questions for Optimization:</h5>
                      <ul className="space-y-2">
                        {performanceIssues[issue.id].questions.map((question, index) => {
                          // Highlighting only the first query's work time
                          const parts = question.split(':');
                          return (
                            <li key={index} className="text-sm font-semibold text-gray-700 bg-gray-100 p-1 rounded-md hover:bg-gray-200 transition duration-200">
                              {/* Highlighting only the first part */}
                              {index === 0 ? (
                                <>
                                  <span style={highlightStyle}>{parts[0]}:</span> {parts[1]}
                                </>
                              ) : (
                                <>
                                  {parts[0]}: {parts[1]}
                                </>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
