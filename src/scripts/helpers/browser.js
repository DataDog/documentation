export const updateQueryParameter = (queryParameterName, newQueryParameterValue) => {
  let historyReplaceUrl =  `?${queryParameterName}=${newQueryParameterValue}`;

  if (window.location.hash) {
    historyReplaceUrl = `${historyReplaceUrl}${window.location.hash}`;
  }

  window.history.replaceState(null, '', historyReplaceUrl);
}

export const deleteQueryParameter = (queryParameterName) => {
  if (queryParameterName) {
    const url = new URL(window.location.href);
    const urlSearchParams = new URLSearchParams(url.search);
    urlSearchParams.delete(queryParameterName);
  
    let historyReplaceUrl = `${window.location.pathname}${urlSearchParams.toString()}`;
  
    if (window.location.hash) {
      historyReplaceUrl = `${historyReplaceUrl}${window.location.hash}`;
    }
  
    window.history.replaceState(null, '', historyReplaceUrl);
  }
}

export const getQueryParameterByName = (name, currentURL) => {
  const queryParameterName = name.replace(/[`[\]]/g, '\\$&');
  const url = !currentURL ? window.location.href : currentURL;
  const regex = new RegExp(`[?&]${queryParameterName}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}