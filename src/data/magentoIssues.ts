import { Issue } from '../types/performance';

export const magentoIssues: Issue[] = [
  {
    id: 'js-bundling',
    title: 'JavaScript Bundling Configuration',
    description: 'Current JavaScript bundling strategy is not optimal for Magento 2',
    impact: 'Increased page load time and delayed interactivity',
    solution: 'Implement advanced JavaScript bundling and minification',
    category: 'technical',
    priority: 'high',
    implementationSteps: [
      'Enable JavaScript bundling in Magento Admin',
      'Configure RequireJS optimization',
      'Implement critical JavaScript splitting',
      'Enable deferred JavaScript loading'
    ]
  },
  {
    id: 'third-party-scripts',
    title: 'Third-party Script Management',
    description: 'Multiple third-party tracking and analytics scripts affecting performance',
    impact: 'Increased page weight and blocking time',
    solution: 'Optimize third-party script loading and evaluate necessity',
    category: 'business',
    priority: 'medium',
    implementationSteps: [
      'Audit all third-party scripts',
      'Implement async/defer loading',
      'Consider lazy loading for non-critical scripts'
    ],
    businessConsiderations: [
      'Impact on analytics data collection',
      'Marketing team requirements',
      'Revenue tracking implications'
    ]
  }
];