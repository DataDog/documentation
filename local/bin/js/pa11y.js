const pa11y = require('pa11y');
const path = require('path');
const fs = require('fs');
const asyncPool = require('tiny-async-pool');
const { Parser } = require('json2csv');

const fileArray = [];

// some html files in dist have weird characters, pa11y fails to read them, must exclude.
const fileExclusions = [
    // '&ap=434&fe=21625&dc=11210&at=GUdVQ18ZT08%3D&jsonp=NREUM.setToken',
    // '%E2%80%8E',
    // '%C2%A0%E2%80%A6',
    // '%EF%BC%89%E4%B8%8A',
    // '%20%5Bon%20our%20site%5D',
    // 'content-assets'
];

// create array of all html files in starting folder
fromDir('./dist', '.html');

function fromDir(startPath, filter) {
    // console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)) {
        console.log('no dir ', startPath);
        return;
    }

    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter); // recurse
        } else if (filename.indexOf(filter) >= 0) {
            const absFilePath = `./${filename}`;

            const isValidHTML = fileExclusions.every(function(
                currVal,
                index,
                arr
            ) {
                // console.log('curr val: ', currVal);
                if (absFilePath.includes(currVal)) {
                    return false;
                }
                return true;
            });

            if (
                filename &&
                typeof filename === 'string' &&
                fs.existsSync(absFilePath) &&
                isValidHTML
            ) {
                fileArray.push(absFilePath);
            }
        }
    }
}

const testUrls = [
    './dist/about/press/index.html',
    './dist/about/team/index.html'
];

const pa11yConfig = {
    // rules to ignore
    ignore: [
        'WCAG2AA.Principle1.Guideline1_3.1_3_1.H49.AlignAttr', // align="left" attribute added by hugo in md tables. can't remove. 
        'WCAG2AA.Principle3.Guideline3_2.3_2_2.H32.2', // for mkto forms without 'submit' attribute
        'WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124.NoSuchID' // we use id hashes for filtering, should change to query params in future
    ]
}

// takes each url and runs pa11y command with config options.
function pally(url){
    return pa11y(url, pa11yConfig)
}


/**
* Promise pool function to run pa11y command (which returns a promise)
* on array of urls
*
* @param {Number} - concurrency limit
* @param {Array} - array of urls on whic to run pa11y
* @param {Function} - Iterator function to be called for each url
*/ 
asyncPool(3, fileArray, pally).then(results => {

    const cleanResults = removeBadResults(results);
    const numIssues = cleanResults.reduce(
        (accum, currVal) => accum + currVal.issues.length,
        0
    );

    console.log(
        'Number of accessibility issues across all pages are: ',
        numIssues
    );

    const fields = [
        'documentTitle',
        'pageUrl',
        'issues.type',
        'issues.code',
        'issues.message',
        'issues.context',
        'issues.selector'
    ];
    const json2csvParser = new Parser({ fields, unwind: ['issues'] });
    const csv = json2csvParser.parse(cleanResults);

    fs.writeFile('pa11y-output.csv', csv, function(err) {
        // currently saves file to app's root directory
        if (err) throw err;
        console.log('file saved');
    });
}).catch(err => {
    console.log(err);
})

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
