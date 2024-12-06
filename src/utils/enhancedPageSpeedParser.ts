import { PerformanceMetric, AuditResult, ParsedResults } from '../types/performance';

const PRIORITY_MAPPING = {
  FCP: 'High',
  LCP: 'Medium',
  CLS: 'Medium',
  TBT: 'Low',
};

const ADDRESSABLE_ISSUES = {
    'modern-image-formats': {
      description: 'The use of outdated image formats like JPEG or PNG can result in large file sizes, which negatively affect the loading time of a page. Older image formats are not optimized for modern web performance and do not take advantage of newer compression techniques.',
      impact: 'Switching to modern image formats such as WebP or AVIF can significantly reduce the file size of images. This reduction in size helps the page load faster, especially on mobile devices or slow network connections. Images often make up a large percentage of the total page size, so optimizing them can result in substantial improvements in performance, leading to faster load times, lower data usage for users, and a better user experience overall.',
      solutions: [
        'Convert images to modern formats (WebP/AVIF): Use tools like ImageMagick, Adobe Photoshop, or online converters to convert images.',
        'Update codebase references: Replace existing image references in HTML, CSS, or JS with WebP/AVIF URLs.',
        'Automate conversion: Integrate libraries like Sharp for automated conversion during uploads or CMS extensions.',
        'In Magento Admin Panel: Go to Stores > Configuration > Web > Default Pages. Enable the "WebP Images" option if your store supports WebP. If not, use third-party extensions to implement WebP support and automate conversion.',
        'Ensure proper caching: Go to System > Cache Management and refresh cache after image optimization to ensure the new formats are recognized.'
      ],
    },
    'unminified-javascript': {
      description: 'Unminified JavaScript files contain unnecessary characters like whitespace, line breaks, and comments, which increase the file size. These characters are not required for execution but are used to make the code human-readable. As a result, the larger file sizes can lead to slower download times and increased latency in page rendering.',
      impact: 'Minifying JavaScript reduces the size of JavaScript files by removing these unnecessary characters. This reduction in file size can dramatically improve load times, especially on mobile networks where bandwidth is limited. Smaller files also reduce the time it takes for the browser to parse and execute the JavaScript, speeding up the overall page load and improving the user experience. Additionally, minified files are harder to reverse-engineer, providing a small security benefit.',
      solutions: [
        'Minify JavaScript: Use tools such as Terser, UglifyJS, or integrated build processes like Webpack.',
        'Ensure functionality: Test thoroughly to ensure minified code functions correctly in all environments.',
        'In Magento Admin Panel: Go to Stores > Configuration > Developer > JavaScript Settings. Enable the "Merge JavaScript Files" option to merge and minify JavaScript files automatically.',
        'For more advanced optimization: Use third-party performance extensions in Magento (e.g., Full Page Cache Warmer or Page Speed Optimizer) to further minify and merge assets.'
      ],
    },
    'render-blocking-resources': {
      description: 'Render-blocking resources are files (like JavaScript and CSS) that must be fully downloaded and processed before the page can be rendered. These resources can delay the initial paint of the page, meaning the user sees an empty screen or a partially-loaded page for a longer period.',
      impact: 'Reducing or deferring render-blocking resources can significantly improve the page load time. By deferring or asynchronously loading non-essential resources, the browser can begin rendering the page content sooner, providing users with a faster, more responsive experience. This is especially important for mobile users who may be on slower networks. Faster load times contribute to lower bounce rates and improved user satisfaction.',
      solutions: [
        'Optimize loading order: Defer or asynchronously load non-critical scripts to prioritize essential content rendering.',
        'Inline critical CSS: Include critical styles inline to reduce render-blocking resources. This allows the browser to render the page before external CSS files are fully loaded.',
        'In Magento Admin Panel: Go to Stores > Configuration > Developer > CSS Settings. Enable the "Merge CSS Files" option to reduce the number of CSS files and reduce blocking.',
        'Use preload or prefetch: Preload key assets (such as fonts or images) for faster loading and prefetch less critical resources to smooth out performance.',
        'Ensure all resources are optimized by using a performance extension in Magento (e.g., Magento 2 PageSpeed Optimization extension) to automate these changes.'
      ],
    },
  };

export function parseEnhancedPageSpeedResults(data: any) {
  const { lighthouseResult } = data;
  const { audits, categories } = lighthouseResult;

  // Parse core metrics
  const metricsToExtract = [
    { id: 'first-contentful-paint', label: 'First Contentful Paint (FCP)', icon: 'Zap' },
    { id: 'largest-contentful-paint', label: 'Largest Contentful Paint (LCP)', icon: 'Maximize' },
    { id: 'total-blocking-time', label: 'Total Blocking Time (TBT)', icon: 'Clock' },
    { id: 'cumulative-layout-shift', label: 'Cumulative Layout Shift (CLS)', icon: 'Move' },
    { id: 'interactive', label: 'Time to Interactive (TTI)', icon: 'MousePointer' },
    { id: 'speed-index', label: 'Speed Index', icon: 'Gauge' },
  ];

  const metrics = metricsToExtract.map(({ id, label, icon }) => {
    const audit = audits[id];
    console.log(audit);
    return {
      id,
      label,
      value: audit.displayValue,
      description: audit.description,
      icon,
      color: getMetricColor(audit.score),
      score: audit.score,
      details: {
        ...audit,
        explanation: audit.explanation,
      },
      threshold: getThresholdForMetric(id),
    };
  });

  // Parse issues
  const results: any[] = [];
  let totalAdminSavings = 0;
  let totalManualSavings = 0;

  Object.entries(audits).forEach(([auditId, auditDetails]: [string, any]) => {
    const metricSavings = auditDetails?.metricSavings || {};
    const totalMetricSavings = Object.values(metricSavings).reduce(
      (sum: number, value: any) => sum + (value as number),
      0
    );

    if (totalMetricSavings <= 0) return;

    const title = auditDetails?.title || 'Untitled Audit';
    const priority = PRIORITY_MAPPING[auditId as keyof typeof PRIORITY_MAPPING] || 'Unknown';

    if (ADDRESSABLE_ISSUES[auditId as keyof typeof ADDRESSABLE_ISSUES]) {
      const issue = ADDRESSABLE_ISSUES[auditId as keyof typeof ADDRESSABLE_ISSUES];
      totalAdminSavings += totalMetricSavings;
      results.push({
        id: auditId,
        title,
        description: issue.description,
        impact: issue.impact,
        priority,
        score: auditDetails.score,
        savings: totalMetricSavings,
        solutions: issue.solutions,
        isAddressable: true,
      });
    } else {
      totalManualSavings += totalMetricSavings;
      results.push({
        id: auditId,
        title,
        description: auditDetails.description,
        impact: auditDetails.impact || 'No specific impact provided.',
        priority,
        score: auditDetails.score,
        savings: totalMetricSavings,
        generatedQuestion: `What actions can resolve the issue: "${title}"?`,
        isAddressable: false,
      });
    }
  });

  return {
    metrics,
    audits: results,
    adminPanelSavings: totalAdminSavings / 1000,
    manualInterventionSavings: totalManualSavings / 1000,
    totalSavings: (totalAdminSavings + totalManualSavings) / 1000,
  };
}

function getMetricColor(score: number): string {
  if (score >= 0.9) return 'text-green-500';
  if (score >= 0.5) return 'text-yellow-500';
  return 'text-red-500';
}

function getThresholdForMetric(metricId: string) {
  const thresholds: Record<string, { good: number; needsImprovement: number }> = {
    'first-contentful-paint': { good: 1.8, needsImprovement: 3.0 },
    'largest-contentful-paint': { good: 2.5, needsImprovement: 4.0 },
    'total-blocking-time': { good: 200, needsImprovement: 600 },
    'cumulative-layout-shift': { good: 0.1, needsImprovement: 0.25 },
    'interactive': { good: 3.8, needsImprovement: 7.3 },
    'speed-index': { good: 3.4, needsImprovement: 5.8 },
  };
  return thresholds[metricId];
}