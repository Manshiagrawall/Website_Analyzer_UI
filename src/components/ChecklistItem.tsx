import React from 'react';
import { CheckCircle, Circle, ChevronRight, AlertCircle } from 'lucide-react';
import { ChecklistItem as ChecklistItemType } from '../types/performance';

interface ChecklistItemProps {
  item: ChecklistItemType;
}

export function ChecklistItem({ item }: ChecklistItemProps) {
  const [showSteps, setShowSteps] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(item.completed);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCompleted(!isCompleted);
  };

  return (
    <div className={`bg-white rounded-lg border ${isCompleted ? 'border-green-200' : 'border-gray-200'} transition-colors duration-200`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggle}
            className="mt-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full"
          >
            {isCompleted ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className={`font-medium ${isCompleted ? 'text-green-900' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm ${isCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                  {item.description}
                </p>
              </div>
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="ml-4 p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              >
                <ChevronRight 
                  className={`w-5 h-5 transform transition-transform ${showSteps ? 'rotate-90' : ''}`} 
                />
              </button>
            </div>

            {showSteps && (
              <div className="mt-4 space-y-4">
                <div className="pl-4 border-l-2 border-indigo-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-indigo-500" />
                    Implementation Steps
                  </h4>
                  <ol className="space-y-3">
                    {item.implementation.map((step, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="font-medium text-indigo-600 flex-shrink-0">
                          {index + 1}.
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}