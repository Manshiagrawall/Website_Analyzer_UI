import axios from 'axios';

const API_KEY = import.meta.env.VITE_PAGESPEED_API_KEY;
const BASE_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

export async function fetchPageSpeedInsights(url: string, strategy: 'desktop' | 'mobile') {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        url,
        key: API_KEY,
        strategy
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch PageSpeed Insights');
    }
    throw error;
  }
}