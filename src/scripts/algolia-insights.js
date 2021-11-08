import searchInsights from 'search-insights';
import { getConfig } from './helpers/helpers';

const getAlogliaIndexName = () => {
  const { algoliaConfig } = getConfig();
  return algoliaConfig.index;
}

export const initializeAlogliaInsights = () => {
  const { algoliaConfig } = getConfig();
  const { appId, apiKey } = algoliaConfig;

  searchInsights('init', { appId, apiKey });
}

/**
  * Sends click event data from the Search page to Algolia Insights
  * @param {String} queryID - Algolia's identifier correlating to the current search.
  * @param {String} objectID - Algolia's identifier correlating to the search result link that was clicked.
  * @param {Number} position - Position in the results set returned by Algolia.
  * Info: https://www.algolia.com/doc/api-reference/api-methods/clicked-object-ids-after-search/
*/
export const sendAlgoliaInsightsClickEvent = (queryID, objectID, position) => {
  const insightsClickEventParams = {
    userToken: 'documentation',
    index: getAlogliaIndexName(),
    eventName: 'clickedObjectIDsAfterSearch',
    queryID,
    objectIDs: [objectID],
    positions: [position]
  };

  searchInsights('clickedObjectIDsAfterSearch', insightsClickEventParams);
}

/**
  * Sends click event data from the Search page to Algolia Insights
  * @param {Array} objectIDs - List of Algolia identifiers correlating to each result for the current search.
  * Info: https://www.algolia.com/doc/api-reference/api-methods/viewed-object-ids/
*/
export const sendAlgoliaInsightsViewEvent = (objectIDs) => {
  const insightsViewEventParams = {
    userToken: 'documentation',
    index: getAlogliaIndexName(),
    eventName: 'viewedObjectIDs',
    objectIDs
  };

  searchInsights('viewedObjectIDs', insightsViewEventParams);
}

