---
title: region-param
---
<div id="markdoc-content"><article>
  <h2 id="body-copy">Body copy</h2>
  <p>The user's DD site is {{< region-param key="dd_site" >}}.</p>
  <h2 id="code">Code</h2>
  <p>The user's DD site is {{< region-param key="dd_site" code="true" >}}.</p>
</article>
</div><div x-init='    const initPage = () => clientPrefsManager.initialize({});    if (document.readyState === "complete" || document.readyState === "interactive") {      setTimeout(initPage, 1);    } else {      document.addEventListener("DOMContentLoaded", initPage);    }  '></div>