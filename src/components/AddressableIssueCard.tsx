import React from 'react';
import { AddressableIssue } from '../types/performance';
import { ChevronDown, ChevronUp, Wrench } from 'lucide-react';

interface AddressableIssueCardProps {
  issue: AddressableIssue;
}

export function AddressableIssueCard({ issue }: AddressableIssueCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <Wrench className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-green-900">{issue.title}</h3>
              <p className="text-sm text-green-700 mt-1">{issue.description}</p>
              {issue.savings > 0 && (
                <p className="text-sm text-green-600 mt-2">
                  Potential savings: {(issue.savings / 1000).toFixed(2)}s
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4 p-1 hover:bg-green-100 rounded-full"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-green-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-green-600" />
            )}
          </button>
        </div>
        
        {isExpanded && (
          <div className="mt-4 border-t border-green-200 pt-4">
            <h4 className="font-medium text-green-900">Quick Fix Steps:</h4>
            <ul className="mt-2 space-y-2">
              {issue.solutions.map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-green-700">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}