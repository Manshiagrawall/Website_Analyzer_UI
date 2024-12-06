import { create } from 'zustand';
import { fetchPageSpeedInsights } from '../services/api';
import { parseEnhancedPageSpeedResults } from '../utils/enhancedPageSpeedParser';
import { PerformanceMetric, AuditSavings } from '../types/performance';

interface EnhancedAudit {
  id: string;
  title: string;
  description: string;
  score: number;
  priority: string;
  savings: number;
  solutions?: string[];
  generatedQuestion?: string;
  isAddressable: boolean;
}

interface PerformanceState {
  metrics: PerformanceMetric[];
  audits: EnhancedAudit[];
  savings: AuditSavings | null;
  isLoading: boolean;
  error: string | null;
  analyze: (url: string, strategy: 'desktop' | 'mobile') => Promise<void>;
}

export const usePerformanceStore = create<PerformanceState>((set) => ({
  metrics: [],
  audits: [],
  savings: null,
  isLoading: false,
  error: null,
  analyze: async (url: string, strategy: 'desktop' | 'mobile') => {
    try {
      set({ isLoading: true, error: null });
      const data = await fetchPageSpeedInsights(url, strategy);
      const { metrics, audits, adminPanelSavings, manualInterventionSavings, totalSavings } = parseEnhancedPageSpeedResults(data);
      
      set({
        metrics, // Set the metrics in the state
        audits,
        savings: {
          adminPanelSavings,
          manualInterventionSavings,
          totalSavings
        },
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        isLoading: false 
      });
    }
  }
}));