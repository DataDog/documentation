const runPa11y = require('a11y');

// pa11y config options
const pa11yConfig = {
  chromeLaunchConfig: {
    ignoreHTTPSErrors: false,
    executablePath: process.env.CHROME_BIN || null, // allows puppeteer to be run in docker image alpine
    args: ['--no-sandbox'] // for launching a "headless" chrome browser in CI
  },
  timeout: 200000,
  ignore: [
    'WCAG2AA.Principle1.Guideline1_3.1_3_1.H49.AlignAttr', // align="left" attribute added by hugo in md tables. can't remove.
    'WCAG2AA.Principle3.Guideline3_2.3_2_2.H32.2', // for mkto forms without 'submit' attribute
    'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail', // color contrast issues, too many incorrect results
    'WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputSearch.Name' // can't update Algolia's searchBox componenet to include this attribute
  ]
};

// some html files in dist have weird characters, pa11y fails to read them, must exclude.
// remove directories with many html files that share the same layout and add only single files from each to speed up pa11y process
const directoryExclusions = [
  'api',
  'fr',
  'en',
  'ja',
  'config',
  'examples',
  'integrations',
  'tags',
  'videos'
];

// html files to include
const includeUrls = [
  'api/index.html'
];

// bad html files to exclude
const excludeUrls = [
  'google29bb7b242ea53c9b',
  'google487da280cbe6a467'
];

// some results will contain errors from third parties, or should be excluded from pa11y output.
// If you find an error from a 3rd party, exclude it by adding the string in this array from the issue.context result
const filterBadResults = ['bid.g.doubleclick.net', '_hj'];

const options = {
  pa11yConfig,
  directoryExclusions, // any directories to exclude
  includeUrls, // any specific html files to include
  excludeUrls, // any specific html files to exlude
  filterBadResults,
  publicDir: 'public', // output directory name
  baseUrl: 'https://docs.datadoghq.com', // site baseUrl to test
  outputFileName: 'docs-pa11y-output',
  outputFileType: 'csv', // csv or json
  metricName: 'docs.pa11y.num_errors', // metric name
  slackChannel: ['#documentation-ci', '#guac-ops']
};

runPa11y(options);
