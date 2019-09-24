const runPa11y = require('a11y');

// some html files in dist have weird characters, pa11y fails to read them, must exclude.
// remove directories with many html files that share the same layout and add only single files from each to speed up pa11y process
const directoryExclusions = [
    'api',
    'fr',
    'en',
    'ja',
    'config',
    'account_management',
    'agent',
    'basic_agent_usage',
    'developers',
    'examples',
    'getting_started',
    'graphing',
    'guides',
    'infrastructure',
    'integrations',
    'logs',
    'monitors',
    'synthetics',
    'tracing',
    'videos'
];

// html files to include
const includeUrls = [
    'api/index.html',
    'account_management/api-app-keys/index.html',
    'agent/apm/index.html',
    'api/authentication/index.html',
    'basic_agent_usage/index.html',
    'developers/guide/index.html',
    'examples/aws-metric/index.html',
    'getting_started/agent/index.html',
    'graphing/dashboards/index.html',
    'guides/alerting/index.html',
    'infrastructure/index.html',
    'integrations/kubernetes/index.html',
    'logs/analytics/index.html',
    'monitors/check_summary/index.html',
    'synthetics/api_tests/index.html',
    'tracing/advanced/index.html',
    'videos/anomaly_detection/index.html'
];

const options = {
    directoryExclusions, // any directories to exclude
    includeUrls, // any specific html files to include
    publicDir: 'public', // output directory name
    baseUrl: 'https://docs.datadoghq.com', // site baseUrl to test
    outputFileName: 'docs-pa11y-output',
    outputFileType: 'csv', // csv or json
    metricName: 'test.pa11y.num_errors' // metric name
};

runPa11y(options);
