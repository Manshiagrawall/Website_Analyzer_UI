// import React from 'react';
// import { IssueCard } from './IssueCard';
// import { magentoIssues } from '../data/magentoIssues';

// export function IssuesList() {
//   const [filter, setFilter] = React.useState<'all' | 'technical' | 'business'>('all');

//   const filteredIssues = magentoIssues.filter(issue => 
//     filter === 'all' ? true : issue.category === filter
//   );

//   return (
//     <div className="space-y-6">
//       <div className="flex gap-2">
//         {(['all', 'technical', 'business'] as const).map((category) => (
//           <button
//             key={category}
//             onClick={() => setFilter(category)}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//               filter === category
//                 ? 'bg-indigo-100 text-indigo-700'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             {category.charAt(0).toUpperCase() + category.slice(1)}
//           </button>
//         ))}
//       </div>
      
//       <div className="space-y-4">
//         {filteredIssues.map((issue) => (
//           <IssueCard key={issue.id} issue={issue} />
//         ))}
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { usePerformanceStore } from '../store/usePerformanceStore';
import { Code, ArrowRight, AlertCircle } from 'lucide-react';

export function IssuesList() {
  const { audits } = usePerformanceStore();

  if (!audits.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No performance issues detected
      </div>
    );
  }

  const addressableIssues = audits.filter(audit => audit.isAddressable);
  const otherIssues = audits.filter(audit => !audit.isAddressable);

  return (
    <div className="space-y-8">
      {addressableIssues.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Quick Fixes Available</h3>
          {addressableIssues.map((issue) => (
            <div key={issue.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900">{issue.title}</h4>
              <p className="mt-1 text-sm text-green-700">{issue.description}</p>
              {issue.savings > 0 && (
                <p className="mt-2 text-sm text-green-600">
                  Potential savings: {(issue.savings / 1000).toFixed(2)}s
                </p>
              )}
              {issue.solutions && (
                <div className="mt-4 space-y-2">
                  <h5 className="text-sm font-medium text-green-900">Solution Steps:</h5>
                  <ul className="space-y-2">
                    {issue.solutions.map((solution, index) => (
                      <li key={index} className="flex gap-2 text-sm text-green-700">
                        <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* {otherIssues.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Other Performance Issues</h3>
          {otherIssues.map((issue) => (
            <div key={issue.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900">{issue.title}</h4>
              <p className="mt-1 text-sm text-gray-600">{issue.description}</p>
              {issue.savings > 0 && (
                <p className="mt-2 text-sm text-gray-500">
                  Potential savings: {(issue.savings / 1000).toFixed(2)}s
                </p>
              )}
              {issue.generatedQuestion && (
                <p className="mt-4 text-sm text-gray-600 italic">{issue.generatedQuestion}</p>
              )}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}