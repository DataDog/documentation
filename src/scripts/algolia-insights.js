import searchInsights from 'search-insights';

// Send a single algolia click event
export const sendAlgoliaInsightsClickEvent = (queryID, objectID, position) => {
  // const insightsClickEventParams = {
  //   userToken: 'documentation',
  //   index: indexName,
  //   eventName: 'clickedObjectIDsAfterSearch',
  //   queryID,
  //   objectIDs: [objectID],
  //   positions: [position]
  // };

  // searchInsights('clickedObjectIDsAfterSearch', insightsClickEventParams);
}

// Send view event
export const sendAlgoliaInsightsViewEvent = (objectIDs) => {
  // const insightsViewEventParams = {
  //   userToken: 'documentation',
  //   index: indexName,
  //   eventName: 'viewedObjectIDs',
  //   objectIDs
  // };

  // searchInsights('viewedObjectIDs', insightsViewEventParams);
}

