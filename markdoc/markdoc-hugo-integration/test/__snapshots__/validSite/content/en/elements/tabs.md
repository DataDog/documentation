---
title: Tabs
---
<div id="cdoc-selector"><div><div class="cdoc-filter__container"><div class="cdoc-filter__label">Color</div><div class="cdoc-filter__option cdoc-pill " data-filter-id="color" data-option-id="red">Red</div><div class="cdoc-filter__option cdoc-pill " data-filter-id="color" data-option-id="yellow">Yellow</div><div class="cdoc-filter__option cdoc-pill selected" data-filter-id="color" data-option-id="blue">Blue</div></div><hr /></div></div><div id="cdoc-content" class="customizable"><article>
  <h2 id="usage">Usage</h2>
  <ul>
    <li>
      Tabs can contain other Markdoc tags, such as partials and conditional
      content. If you can use it on a page, you can use it in a tab.
    </li>
    <li>
      Include the URLs for links used in tabs at the bottom of the file along
      with the other links used on the page, not inside the tab.
    </li>
  </ul>
  <h2 id="example">Example</h2>
  <p>
    Usually there's a bit of text here to introduce the tabs, so this paragraph
    is just filler text.
  </p>
  <div class="code-tabs">
    <ul class="nav nav-tabs d-flex"></ul>
    <div class="tab-content">
      <div
        data-lang="tab-1"
        class="tab-pane fade"
        role="tabpanel"
        title="Tab 1"
      >
        <div class="alert alert-info"><p>Here's an info alert.</p></div>
        <h3 id="customization-demo">Customization demo</h3>
        <div class="cdoc__toggleable" data-if="0">
          <p>The selected color is <strong>blue</strong>.</p>
        </div>
        <div class="cdoc__toggleable cdoc__hidden" data-if="1">
          <p>The selected color is <strong>yellow</strong>.</p>
        </div>
        <div class="cdoc__toggleable cdoc__hidden" data-if="2">
          <p>The selected color is <strong>red</strong>.</p>
        </div>
        <h3 id="partial-demo">Partial demo</h3>
        <p>Tabs can include partials, such as these two:</p>
        <p>
          This content is in a partial. It includes a link to
          <a href="https://www.datadoghq.com">Datadog</a>.
        </p>
        <p>
          This content is in a partial. It includes a link to
          <a href="https://www.google.com">Google</a>.
        </p>
        <h3 id="links">Links</h3>
        <p>
          Links in Markdoc tabs behave the same as any other link on the page.
          There's no need to keep separate lists of links inside each tab.
          Example link: <a href="https://markdoc.dev/docs">Markdoc docs</a>. Tab
          2 contains the second example link.
        </p>
      </div>
      <div
        data-lang="tab-2"
        class="tab-pane fade"
        role="tabpanel"
        title="Tab 2"
      >
        <p>This is the content for Tab 2.</p>
        <p>
          Example link:
          <a href="https://www.typescriptlang.org/docs">TypeScript docs</a>.
        </p>
      </div>
    </div>
  </div>
</article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["color"],"v":"blue"},"1":"blue"},"v":true,"r":"0"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["color"],"v":"blue"},"1":"yellow"},"v":false,"r":"1"},"2":{"m":"F","n":"e","p":{"0":{"m":"V","p":["color"],"v":"blue"},"1":"red"},"v":false,"r":"2"}},    filtersManifest: {"filtersById":{"color":{"config":{"display_name":"Color","id":"color","options_source":"primary_color_options"},"defaultValsByOptionsSetId":{"primary_color_options":"blue"}}},"defaultValsByFilterId":{"color":"blue"},"optionSetsById":{"primary_color_options":[{"display_name":"Red","id":"red"},{"display_name":"Yellow","id":"yellow"},{"display_name":"Blue","default":true,"id":"blue"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>