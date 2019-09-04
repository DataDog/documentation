const pa11y = require('pa11y');
const fs = require('fs');
const asyncPool = require('tiny-async-pool');
const { Parser } = require('json2csv');
const glob = require('glob');

// array containing all html files to test
const fileArray = [];

const pa11yConfig = {
    // rules to ignore
    chromeLaunchConfig: {
        ignoreHTTPSErrors: false,
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
const fileExclusions = '';

// remove directories with many html files that share the same layout and add only single files from each to speed up pa11y process
// const directoryExlcusions = 'api|fr|ja|config|account_management|agent|api|basic_agent_usage|developers|examples|getting_started|graphing|guides|infrastructure|integrations|logs|monitors|synthetics|tracing|videos';
const directoryExlcusions = 'api|fr|ja|config';

// html files to include
const includeUrls = [
    './public/api/index.html'
//     './public/account_management/api-app-keys/index.html',
//     './public/agent/apm/index.html',
//     './public/api/authentication/index.html',
//     './public/basic_agent_usage/index.html',
//     './public/developers/guide/index.html',
//     './public/examples/aws-metric/index.html',
//     './public/getting_started/agent/index.html',
//     './public/graphing/dashboards/index.html',
//     './public/guides/alerting/index.html',
//     './public/infrastructure/index.html',
//     './public/integrations/kubernetes/index.html',
//     './public/logs/analytics/index.html',
//     './public/monitors/check_summary/index.html',
//     './public/synthetics/api_tests/index.html',
//     './public/tracing/advanced/index.html',
//     './public/videos/anomaly_detection/index.html'
];

const globPatterns = `./public/!(${directoryExlcusions}|${fileExclusions})/**/*.html`;

fileArray.push(...glob.sync(globPatterns));
fileArray.push(...includeUrls);

// replace './public' with base url
const absFileArray = fileArray.map(url => url.replace('./public', 'https://docs.datadoghq.com'));

/**
 * Promise pool function to run pa11y command (which returns a promise)
 * on array of urls
 *
 * @param {Number} - concurrency limit
 * @param {Array} - array of urls on which to run pa11y
 * @param {Function} - Iterator function to be called for each url
 */
asyncPool(2, absFileArray, pally)
    .then(results => {
        const cleanResults = removeBadResults(results);

        const numIssues = cleanResults.reduce(
            (accum, currVal) => accum + currVal.issues.length,
            0
        );

        console.log(numIssues);

        const fields = [
            'documentTitle',
            'pageUrl',
            'issues.type',
            'issues.code',
            'issues.message',
            'issues.context',
            'issues.selector'
        ];
        const json2csvParser = new Parser({
            fields,
            unwind: ['issues']
        });

        // choice to output pa11y results as csv or json.
        const csvResults = json2csvParser.parse(cleanResults);
        const jsonResults = JSON.stringify(cleanResults);

        fs.writeFile('pa11y-output-docs.csv', csvResults, function(err) {
            // currently saves file to app's root directory
            if (err) throw err;
        });
    })
    .catch(err => {
        console.log(err);
    });

// takes each url and runs pa11y command with config options.
function pally(url) {
    console.log('url: ', url);
    return pa11y(url, pa11yConfig);
}

// sometimes results come back with null issues and a chrome error, need to filter
function removeBadResults(results) {
    const cleanResults = [];
    for (let i = 0; i <= results.length; i += 1) {
        if (results[i]) {
            if (results[i]['issues'].length !== 0) {
                if (results[i]['pageUrl'] !== 'chrome-error://chromewebdata/') {
                    cleanResults.push(results[i]);
                }
            }
        }
    }

    return cleanResults;
}
