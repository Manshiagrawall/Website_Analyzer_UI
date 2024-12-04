import React from 'react';
import { ChecklistItem } from './ChecklistItem';
import { magentoChecklist } from '../data/magentoChecklist';

export function OptimizationChecklist() {
  return (
    <div className="space-y-4">
      {magentoChecklist.map((item) => (
        <ChecklistItem key={item.id} item={item} />
      ))}
    </div>
  );
}