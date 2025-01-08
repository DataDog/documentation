---
title: Alert
---
<div id="cdoc-content" class="customizable"><article>
  <h2 id="usage">Usage</h2>
  <ul>
    <li>
      You can use Markdown and Markdoc tags inside of the
      <code>alert</code> tag.
    </li>
    <li>
      Some elements might look odd inside of alerts, because alerts have
      historically been simple and the relevant CSS styles have not been
      written. If needed, we can write additional CSS styles to support those
      elements.
    </li>
  </ul>
  <h2 id="types">Types</h2>
  <h3 id="info">Info</h3>
  <div class="alert alert-info"><p>This is an info alert!</p></div>
  <h3 id="warning">Warning</h3>
  <div class="alert alert-warning"><p>This is a warning alert!</p></div>
  <h3 id="danger">Danger</h3>
  <div class="alert alert-danger"><p>This is a danger alert!</p></div>
  <h2 id="advanced-example">Advanced example</h2>
  <div class="alert alert-info">
    <p>
      The contents of the <code>alert</code> tag are written in Markdoc, not
      HTML. This means that you can use Markdoc syntax within the
      <code>alert</code> tag, such as a reference-style
      <a href="https://www.datadoghq.com">link</a>.
    </p>
    <p>
      Some elements might look odd inside of alerts, because we've never used
      them in this context before. If needed, we can write additional CSS styles
      to support those elements.
    </p>
  </div>
</article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {},    filtersManifest: {"filtersById":{},"defaultValsByFilterId":{},"optionSetsById":{}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>