---
title: Tabs
private: true
---
<div id="cdoc-selector"><div id="cdoc-filters-menu"><div class="filter-selector-menu" id="cdoc-filters-pill-menu"><div class="cdoc-pills-container"><p 
    id="cdoc-color-pills-label" 
    class="cdoc-filter-label"
  >Color</p><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="color" 
      data-option-id="red"
      aria-selected="false"
      tabIndex="0"
    >Red</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="color" 
      data-option-id="yellow"
      aria-selected="false"
      tabIndex="0"
    >Yellow</button><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="color" 
      data-option-id="blue"
      aria-selected="true"
      tabIndex="0"
    >Blue</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
    id="cdoc-color-dropdown-label" 
    class="cdoc-filter-label"
  >Color</p><div 
    id="cdoc-dropdown-color" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-color-dropdown-label">
      <span 
        id="cdoc-dropdown-color-label" 
        class="cdoc-btn-label"
      >Blue</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-color-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="color" 
      data-option-id="red"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Red</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="color" 
      data-option-id="yellow"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Yellow</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="color" 
      data-option-id="blue"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >Blue</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article>
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
        <div class="cdoc__toggleable" data-if="79">
          <p>The selected color is <strong>blue</strong>.</p>
        </div>
        <div class="cdoc__toggleable cdoc__hidden" data-if="80">
          <p>The selected color is <strong>yellow</strong>.</p>
        </div>
        <div class="cdoc__toggleable cdoc__hidden" data-if="81">
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
        <h3 id="code-block">Code block</h3>
        <p>This is a test code block.</p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-javascript">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl"><span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;The DD site is <code class="cdoc js-region-param region-param" data-region-param="dd_site"></code>&#39;</span><span class="p">);</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <p>Here's a code block in a list:</p>
        <ol>
          <li>
            Item 1 includes some code:
            <div class="code-snippet-wrapper">
              <div class="code-filename-wrapper d-flex justify-content-between">
                <p class="code-filename my-0">example.py</p>
              </div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-python">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="c1"># Function to compute the product of p1 and p2</span>
</span></span><span class="line"><span class="cl"><span class="nb">print</span><span class="p">(</span><span class="s2">&#34;The DD site is <code class="cdoc js-region-param region-param" data-region-param="dd_site"></code>&#34;</span><span class="p">)</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
          <li>This is Item 2. It has no code.</li>
        </ol>
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
          Here's the second example link:
          <a href="https://www.typescriptlang.org/docs">TypeScript docs</a>.
        </p>
      </div>
    </div>
  </div>
</article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"79":{"m":"F","n":"e","p":{"0":{"m":"V","p":["color"],"v":"blue"},"1":"blue"},"v":true,"r":"79"},"80":{"m":"F","n":"e","p":{"0":{"m":"V","p":["color"],"v":"blue"},"1":"yellow"},"v":false,"r":"80"},"81":{"m":"F","n":"e","p":{"0":{"m":"V","p":["color"],"v":"blue"},"1":"red"},"v":false,"r":"81"}},    filtersManifest: {"filtersByTraitId":{"color":{"config":{"label":"Color","trait_id":"color","option_group_id":"primary_color_options"},"defaultValsByOptionGroupId":{"primary_color_options":"blue"}}},"defaultValsByTraitId":{"color":"blue"},"optionGroupsById":{"primary_color_options":[{"id":"red","label":"Red"},{"id":"yellow","label":"Yellow"},{"default":true,"id":"blue","label":"Blue"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>