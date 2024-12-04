import { ChecklistItem } from '../types/performance';

export const magentoChecklist: ChecklistItem[] = [
  {
    id: 'production-mode',
    title: 'Set Magento to Production Mode',
    description: 'Production mode optimizes performance by disabling development features, logging, and debugging. This significantly reduces resource usage and improves response times.',
    completed: false,
    category: 'optimization',
    implementation: [
      'Connect to your server via SSH',
      'Navigate to your Magento root directory',
      'Run command: php bin/magento deploy:mode:set production',
      'Clear the cache: php bin/magento cache:clean',
      'Verify mode with: php bin/magento deploy:mode:show'
    ]
  },
  {
    id: 'minification',
    title: 'Enable CSS/JS Minification',
    description: 'Minification removes unnecessary characters from code files without changing functionality, reducing file sizes and improving load times.',
    completed: false,
    category: 'file-compression',
    implementation: [
      'Log in to Magento Admin Panel',
      'Navigate to Stores > Configuration > Advanced > Developer',
      'Under CSS Settings, set "Minify CSS Files" to Yes',
      'Under JavaScript Settings, set "Minify JavaScript Files" to Yes',
      'Under JavaScript Settings, set "Enable JavaScript Bundling" to Yes',
      'Clear the cache after making changes',
      'Test the website thoroughly after enabling minification'
    ]
  },
  {
    id: 'browser-cache',
    title: 'Configure Browser Caching',
    description: 'Browser caching stores static assets locally in the user\'s browser, reducing server requests and improving load times for returning visitors.',
    completed: false,
    category: 'browser-caching',
    implementation: [
      'Configure .htaccess or nginx.conf',
      'Set appropriate cache headers for different file types',
      'Add expires headers for static assets',
      'Configure ETags',
      'Test caching with browser developer tools'
    ]
  },
  {
    id: 'full-page-cache',
    title: 'Enable Full Page Cache',
    description: 'Full page caching stores complete HTML output, dramatically reducing server load and improving response times.',
    completed: false,
    category: 'full-page-caching',
    implementation: [
      'Enable Varnish Cache in Magento Admin',
      'Configure Varnish settings',
      'Set up cache warming strategy',
      'Configure cache invalidation rules',
      'Monitor cache hit rates'
    ]
  },
  {
    id: 'database-cache',
    title: 'Configure Database Caching',
    description: 'Database caching improves query performance by storing frequently accessed data in memory.',
    completed: false,
    category: 'database-caching',
    implementation: [
      'Install and configure Redis',
      'Update Magento configuration for Redis',
      'Configure cache backend settings',
      'Monitor cache performance',
      'Set up cache cleanup schedule'
    ]
  },
  {
    id: 'session-cache',
    title: 'Optimize Session Storage',
    description: 'Efficient session storage improves performance for logged-in users and cart operations.',
    completed: false,
    category: 'session-caching',
    implementation: [
      'Configure Redis for session storage',
      'Update session storage settings',
      'Set appropriate session lifetime',
      'Monitor session storage performance',
      'Implement session cleanup strategy'
    ]
  },
  {
    id: 'gzip-compression',
    title: 'Enable Gzip Compression',
    description: 'Gzip compression reduces the size of transmitted data by up to 70%, significantly improving page load times.',
    completed: false,
    category: 'file-compression',
    implementation: [
      'Configure server for Gzip compression',
      'Add appropriate compression rules',
      'Test compression with online tools',
      'Monitor compression ratios',
      'Verify compression headers'
    ]
  },
  {
    id: 'image-optimization',
    title: 'Optimize Images',
    description: 'Image optimization reduces file sizes without significant quality loss, improving page load times.',
    completed: false,
    category: 'file-compression',
    implementation: [
      'Configure image optimization settings',
      'Enable WebP format support',
      'Implement lazy loading',
      'Set up responsive images',
      'Monitor image compression ratios'
    ]
  }
];