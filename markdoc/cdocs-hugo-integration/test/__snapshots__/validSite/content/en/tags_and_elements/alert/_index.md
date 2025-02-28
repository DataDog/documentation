---
title: Alert
private: true
---
<div id="cdoc-content" class="customizable"><article>
  <h2 id="info">Info</h2>
  <div class="alert alert-info">
    <p>
      This is an info alert! The <code>level=info</code> attribute is optional.
    </p>
  </div>
  <p>
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  </p>
  <h2 id="warning">Warning</h2>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
  </p>
  <div class="alert alert-warning"><p>This is a warning alert!</p></div>
  <ul>
    <li>First list item</li>
    <li>Second list item</li>
    <li>Third list item</li>
  </ul>
  <h2 id="danger">Danger</h2>
  <div class="alert alert-danger"><p>This is a danger alert!</p></div>
  <p>
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  </p>
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
  <p>
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  </p>
</article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {},    filtersManifest: {"filtersByTraitId":{},"defaultValsByTraitId":{},"optionGroupsById":{}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>