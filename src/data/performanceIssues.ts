export const performanceIssues = {
  'uses-responsive-images': {
    questions: [
      'Hours of work: Setting up conversion pipelines and tools can be relatively quick.',
    ],
  },
  'legacy-javascript': {
    questions: [
      'Hours of work: Minifying JavaScript is straightforward using existing tools.',
    ],
  },
  'bootup-time': {
    questions: [
      'Days of work: Requires identifying and restructuring critical resources.',
    ],
  },
  'largest-contentful-paint-element': {
    questions: [
      'Weeks of work: Optimizing LCP often involves multiple areas like images, server-side rendering, and caching.',
    ],
  },
  'server-response-time': {
    questions: [
      'Weeks of work: Depends on server infrastructure, caching, and backend optimizations.',
    ],
  },
  'unused-javascript': {
    questions: [
      'Days of work: Analyzing and removing unused JS can be complex but is usually manageable.',
    ],
  },
  'long-tasks': {
    questions: [
      'Days of work: Breaking up long tasks requires analysis and restructuring of code.',
    ],
  },
  'mainthread-work-breakdown': {
    questions: [
      'Weeks of work: Minimizing main-thread work often involves optimizing various parts of the app.',
    ],
  },
  'unused-css-rules': {
    questions: [
      'Days of work: Identifying and cleaning up unused CSS can be done with tools but might require some manual effort.',
    ],
  },
  'dom-size': {
    questions: [
      'Days of work: Reducing DOM size involves structural changes to HTML and JavaScript.',
    ],
  },
  'third-party-summary': {
    questions: [
      'Weeks of work: Evaluating and potentially replacing or removing third-party scripts can be time-intensive.',
    ],
  },
};

// export const performanceIssues = {
//   'uses-responsive-images': {
//     questions: [
//       'Hours of work: Setting up conversion pipelines and tools can be relatively quick.',
//       'What tools or libraries can be used to convert existing images to modern formats like WebP or AVIF?',
//       'How can we automate the image conversion process during uploads in our CMS?',
//     ],
//   },
//   'legacy-javascript': {
//     questions: [
//       'Hours of work: Minifying JavaScript is straightforward using existing tools.',
//       'What tools are available for minifying JavaScript files, and how do they integrate with our build process?',
//       'Are there specific JavaScript files that are particularly large and could benefit most from minification?',
//     ],
//   },
//   'bootup-time': {
//     questions: [
//       'Days of work: Requires identifying and restructuring critical resources.',
//       'What critical resources are currently impacting bootup time, and how can we identify them?',
//       'Are there specific scripts or stylesheets that are blocking the initial rendering of the page?',
//     ],
//   },
//   'largest-contentful-paint-element': {
//     questions: [
//       'Weeks of work: Optimizing LCP often involves multiple areas like images, server-side rendering, and caching.',
//       'Which elements on the page contribute most to the Largest Contentful Paint (LCP) metric?',
//       'How can we optimize images and other media that affect LCP without sacrificing quality?',
//     ],
//   },
//   'server-response-time': {
//     questions: [
//       'Weeks of work: Depends on server infrastructure, caching, and backend optimizations.',
//       'What factors contribute to our current server response times, and how can we measure them effectively?',
//       'Are there specific backend processes or database queries that are slowing down response times?',
//     ],
//   },
//   'unused-javascript': {
//     questions: [
//       'Days of work: Analyzing and removing unused JS can be complex but is usually manageable.',
//       'How can we identify which JavaScript files or functions are not being used in our application?',
//       'What tools or methods can help us safely remove unused JavaScript without affecting functionality?',
//     ],
//   },
//   'long-tasks': {
//     questions: [
//       'Days of work: Breaking up long tasks requires analysis and restructuring of code.',
//       'What specific tasks in our application are classified as "long tasks," and how do we identify them?',
//       'How can we break long tasks into smaller, more manageable chunks to improve user experience?',
//     ],
//   },
//   'mainthread-work-breakdown': {
//     questions: [
//       'Weeks of work: Minimizing main-thread work often involves optimizing various parts of the app.',
//       'What are the primary contributors to main thread work in our application, and how can we analyze them?',
//       'How can we optimize rendering and layout calculations to reduce main thread work?',
//     ],
//   },
//   'unused-css-rules': {
//     questions: [
//       'Days of work: Identifying and cleaning up unused CSS can be done with tools but might require some manual effort.',
//       'How can we identify unused CSS rules within our stylesheets effectively?',
//       'What tools are available for cleaning up unused CSS without affecting the design of the application?',
//     ],
//   },
//   'dom-size': {
//     questions: [
//       'Days of work: Reducing DOM size involves structural changes to HTML and JavaScript.',
//       'What is the current size of our DOM, and how does it impact performance metrics like load time and responsiveness?',
//       'How can we simplify complex DOM structures to improve performance and maintainability?',
//     ],
//   },
//   'third-party-summary': {
//     questions: [
//       'Weeks of work: Evaluating and potentially replacing or removing third-party scripts can be time-intensive.',
//       'Which third-party scripts are currently integrated into our application, and what impact do they have on performance?',
//       'How can we evaluate the necessity of each third-party script and its contribution to overall performance?',
//     ],
//   },
// };