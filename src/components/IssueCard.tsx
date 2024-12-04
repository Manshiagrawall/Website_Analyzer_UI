import React from 'react';
import { AlertCircle, ArrowRight, Building, Code } from 'lucide-react';
import { Issue } from '../types/performance';

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {issue.category === 'technical' ? (
            <Code className="w-5 h-5 text-red-500" />
          ) : (
            <Building className="w-5 h-5 text-red-500" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-red-800">{issue.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${
              issue.priority === 'high' ? 'bg-red-200 text-red-800' :
              issue.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
              'bg-blue-200 text-blue-800'
            }`}>
              {issue.priority}
            </span>
          </div>
          <p className="mt-1 text-sm text-red-700">{issue.description}</p>
          
          <div className="mt-4 space-y-3">
            <div>
              <h4 className="text-sm font-medium text-red-800">Impact</h4>
              <p className="text-sm text-red-700">{issue.impact}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-red-800">Implementation Steps</h4>
              <ul className="mt-1 space-y-1">
                {issue.implementationSteps.map((step, index) => (
                  <li key={index} className="text-sm text-red-700 flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {issue.businessConsiderations && (
              <div>
                <h4 className="text-sm font-medium text-red-800">Business Considerations</h4>
                <ul className="mt-1 space-y-1">
                  {issue.businessConsiderations.map((consideration, index) => (
                    <li key={index} className="text-sm text-red-700 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {consideration}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}