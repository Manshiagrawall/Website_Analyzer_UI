export interface MetricDetails {
  title: string;
  value: string | number;
  description: string;
  displayValue: string;
  numericValue: number;
  score: number;
  details?: {
    items?: any[];
    type: string;
  };
  explanation?: string;
}

export interface PerformanceMetric {
  id: string;
  label: string;
  value: string | number;
  description: string;
  icon: string;
  color: string;
  score: number;
  details?: {
    explanation: {
      whatItMeans: string;
      howToImprove: string[];
      impact: string;
      technicalDetails: string;
    };
  };
  threshold?: {
    good: number;
    needsImprovement: number;
  };
}

export interface AuditResult {
  id: string;
  title: string;
  description: string;
  score: number;
}

export interface AddressableIssue extends AuditResult {
  solutions: string[];
  savings: number;
}

export interface OtherIssue extends AuditResult {
  impact?: string;
  priority?: string;
}

export interface AuditSavings {
  adminPanelSavings: number;
  manualInterventionSavings: number;
  totalSavings: number;
}

export interface ParsedResults {
  metrics: PerformanceMetric[];
  addressableIssues: AddressableIssue[];
  otherIssues: OtherIssue[];
  savings: AuditSavings;
}