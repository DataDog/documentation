/* eslint-disable no-underscore-dangle */
import searchInsights from 'search-insights';
import algoliasearch from 'algoliasearch';
import { getConfig } from './helpers/helpers';
import { getUrlWithPathnameAndHash } from './helpers/browser';

export const getAlogliaIndexName = () => {
  const { algoliaConfig } = getConfig();
  return algoliaConfig.index;
}

export const initializeAlogliaInsights = () => {
  const { algoliaConfig } = getConfig();
  const { appId, apiKey } = algoliaConfig;

  searchInsights('init', { appId, apiKey });
}

const pageIsEligibleToSendAlgoliaInsightsData = (url) => {
  const urlObject = new URL(url);
  return window._DATADOG_SYNTHETICS_BROWSER === undefined && urlObject.pathname !== '/';
}

/**
  * Sends click event data from the Search page to Algolia Insights
  * @param {String} queryID - Algolia's identifier correlating to the current search.
  * @param {String} objectID - Algolia's identifier correlating to the search result link that was clicked.
  * @param {Number} position - Position in the results set returned by Algolia.
  * Info: https://www.algolia.com/doc/api-reference/api-methods/clicked-object-ids-after-search/
*/
export const sendAlgoliaInsightsClickAfterSearchEvent = (queryID, objectID, position) => {
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
  * Sends click event data to Algolia Insights, without a search.  This is currently used from the autocomplete dropdown.
  * @param {String} objectID - Algolia's identifier correlating to the autocomplete result link that was clicked.
  * Info: https://www.algolia.com/doc/api-reference/api-methods/clicked-object-ids/
*/
const sendAlgoliaClickedObjectIDEvent = (objectID) => {  
  const insightsClickedObjectParams = {
    userToken: 'documentation',
    index: getAlogliaIndexName(),
    eventName: 'clickedObjectIDs',
    objectIDs: [objectID]
  };
  
  searchInsights('clickedObjectIDs', insightsClickedObjectParams);
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

/**
 * Gets the Algolia search entry associated with the given URL.
*/
const getAlgoliaSearchDataByUrl = (url) => {
  const { algoliaConfig } = getConfig();
  const { appId, apiKey } = algoliaConfig;
  const client = algoliasearch(appId, apiKey);
  const index = client.initIndex(getAlogliaIndexName());
  const urlPathnameWithHash = getUrlWithPathnameAndHash(url);

  return index.search(urlPathnameWithHash, {
    hitsPerPage: 50,
    attributesToRetrieve: ['url', 'url_without_anchor'],
    restrictSearchableAttributes: ['url']
  })
}

export const handleAlgoliaViewEventOnPageLoad = (url) => {
  if (pageIsEligibleToSendAlgoliaInsightsData(url)) {
    initializeAlogliaInsights();
    const urlPathnameWithHash = getUrlWithPathnameAndHash(url);

    getAlgoliaSearchDataByUrl(url)
      .then(({ hits }) => {
        hits.forEach(hit => {
          const resultUrlPathnameWithHash = getUrlWithPathnameAndHash(hit.url);

          if (urlPathnameWithHash === resultUrlPathnameWithHash) {
            const { objectID } = hit;
            sendAlgoliaInsightsViewEvent([objectID]);
          }
        })
      })
  }
}

/**
  * Sends click event data from the autocomplete dropdown to Algolia Insights
  * @param {String} url - url of the clicked suggestion link from the autocomplete dropdown.
*/
export const handleAlgoliaClickedObjectEventOnAutocomplete = (url) => {
  initializeAlogliaInsights();
  const urlPathnameWithHash = getUrlWithPathnameAndHash(url);

  getAlgoliaSearchDataByUrl(url)
      .then(({ hits }) => {
        hits.forEach(hit => {
          const resultUrlPathnameWithHash = getUrlWithPathnameAndHash(hit.url);

          if (urlPathnameWithHash === resultUrlPathnameWithHash) {
            const { objectID } = hit;
            sendAlgoliaClickedObjectIDEvent(objectID);
          }
        })
      })
}

