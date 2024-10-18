import fs from 'fs';
import path from 'path';

const jsonPath = path.join(__dirname, '../..', 'src/scripts/pageviewData.json');
const rows = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

type DataRow = {
  'Page Directory Level1': string;
  'Page Directory Level2': string;
  'Page Directory Level3': string;
  'Page URL Path': string;
  Count: string;
};

type AnalysisResult = {
  ninetyDayViewCount: number;
  collapseCount: number;
  tabSetCount: number;
  pageUrl: string;
  isGuide: boolean;
  dirLevel1: string | null;
  dirLevel2: string | null;
  dirLevel3: string | null;
}[];

const result: AnalysisResult = [];

rows.forEach((row: DataRow) => {});

rows.forEach((row: DataRow) => {
  // split row into variables
  const {
    'Page URL Path': urlPath,
    Count: countStr,
    'Page Directory Level1': dirLevel1,
    'Page Directory Level2': dirLevel2,
    'Page Directory Level3': dirLevel3
  } = row;

  const url = `https://docs.datadoghq.com${urlPath}`;

  const ninetyDayViewCount = parseInt(countStr.replace(/,/g, ''));

  // get the local file path corresponding to the URL path
  let docFilePath = path.join(
    __dirname,
    '../../../..',
    'content/en',
    `${urlPath.slice(0, -1)}.md`
  );

  // if the file doesn't exist, continue to the next row
  if (!fs.existsSync(docFilePath)) {
    // try replacing ".md" with "/index.md"
    const indexDocFilePath = path.join(
      __dirname,
      '../../../..',
      'content/en',
      `${urlPath.slice(0, -1)}/index.md`
    );
    if (!fs.existsSync(indexDocFilePath)) {
      return;
    } else {
      docFilePath = indexDocFilePath;
    }
  }

  // if the file path contains "/integrations/", skip it
  if (docFilePath.includes('/integrations/')) {
    return;
  }

  // if the file path contains "/api/", skip it
  if (docFilePath.includes('/api/')) {
    return;
  }

  const isGuide = docFilePath.includes('/guide/');

  // get the file content as a string
  const content = fs.readFileSync(docFilePath, 'utf-8');

  const collapseCount = (content.match(/ collapse-content /g) || []).length;
  const tabSetCount = (content.match(/ tabs /g) || []).length;

  if (docFilePath.includes('feature_flag')) {
    console.log(`pushing result for ${docFilePath}`);
  }

  result.push({
    ninetyDayViewCount,
    collapseCount,
    tabSetCount,
    pageUrl: url,
    isGuide,
    dirLevel1,
    dirLevel2,
    dirLevel3
  });
});

// write the result to a csv file
const csvPath = path.join(__dirname, '../..', 'src/scripts/analysisResult.csv');

fs.writeFileSync(
  csvPath,
  `ninetyDayViewCount,collapseCount,tabSetCount,isGuide,pageUrl,dirLevel1,dirLevel2,dirLevel3,candidateFor,hasCascade\n${result
    .map(
      ({
        ninetyDayViewCount,
        collapseCount,
        tabSetCount,
        isGuide,
        pageUrl,
        dirLevel1,
        dirLevel2,
        dirLevel3
      }) =>
        `${ninetyDayViewCount},${collapseCount},${tabSetCount},${isGuide},${pageUrl},${dirLevel1},${dirLevel2},${dirLevel3},,`
    )
    .join('\n')}`
);
