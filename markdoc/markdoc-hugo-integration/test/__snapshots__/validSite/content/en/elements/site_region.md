---
title: site-region
---
<div id="cdoc-content" class="customizable"><article>
  <div class="d-none site-region-container" data-region="us">
    <p>
      Your site region is <code>US</code>, which is why this line appears. It
      should be the only line in this section.
    </p>
  </div>
  <div class="d-none site-region-container" data-region="eu">
    <p>
      Your site region is <code>EU</code>, which is why this line appears. It
      should be the only line in this section.
    </p>
  </div>
</article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {},    filtersManifest: {"filtersById":{},"defaultValsByFilterId":{},"optionSetsById":{}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>