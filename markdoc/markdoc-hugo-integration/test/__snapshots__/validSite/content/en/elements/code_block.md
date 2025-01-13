---
title: Code Block
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
      Markdown tags are <strong>not</strong> supported in code blocks. Use only
      plaintext code within code blocks.
    </li>
    <li>The default language for code blocks is <code>text</code>.</li>
  </ul>
  <h2 id="simple-example">Simple example</h2>
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
        ><code><span class="line"><span class="cl"><span class="c1">// Function to compute the product of p1 and p2
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kd">function</span> <span class="nx">myFunction</span><span class="p">(</span><span class="nx">p1</span><span class="p">,</span> <span class="nx">p2</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="k">return</span> <span class="nx">p1</span> <span class="o">*</span> <span class="nx">p2</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
      </div>
    </div>
  </div>
  <h2 id="example-with-region-param">Example with region-param</h2>
  <div class="code-snippet-wrapper">
    <div class="code-filename-wrapper d-flex justify-content-end"></div>
    <div class="code-snippet">
      <div class="code-button-wrapper position-absolute">
        <button class="btn text-primary js-copy-button">Copy</button>
      </div>
      <div class="cdoc-code-snippet cdoc-language-bash">
        <pre
          tabindex="0"
          class="chroma"
        ><code><span class="line"><span class="cl">curl -L -X GET <span class="s1">&#39;https://api.<code class="cdoc js-region-param region-param" data-region-param="dd_site"></code>/api/v2/security_monitoring/configuration/security_filters&#39;</span> <span class="se">\
</span></span></span><span class="line"><span class="cl"><span class="se"></span>--header <span class="s1">&#39;Content-Type: application/json&#39;</span> <span class="se">\
</span></span></span><span class="line"><span class="cl"><span class="se"></span>--header <span class="s1">&#39;DD-API-KEY: &lt;DATADOG_API_KEY&gt;&#39;</span> <span class="se">\
</span></span></span><span class="line"><span class="cl"><span class="se"></span>--header <span class="s1">&#39;DD-APPLICATION-KEY: &lt;DATADOG_APP_KEY&gt;&#39;</span>
</span></span></code></pre>
      </div>
    </div>
  </div>
  <h2 id="indented-code-blocks">Indented code blocks</h2>
  <ol>
    <li>
      Item 1 includes some code:
      <div class="code-snippet-wrapper">
        <div class="code-filename-wrapper d-flex justify-content-end"></div>
        <div class="code-snippet">
          <div class="code-button-wrapper position-absolute">
            <button class="btn text-primary js-copy-button">Copy</button>
          </div>
          <div class="cdoc-code-snippet cdoc-language-python">
            <pre
              tabindex="0"
              class="chroma"
            ><code><span class="line"><span class="cl"><span class="c1"># Function to compute the product of p1 and p2</span>
</span></span><span class="line"><span class="cl"><span class="k">def</span> <span class="nf">myFunction</span><span class="p">(</span><span class="n">p1</span><span class="p">,</span> <span class="n">p2</span><span class="p">):</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="n">p1</span> <span class="o">*</span> <span class="n">p2</span>
</span></span></code></pre>
          </div>
        </div>
      </div>
    </li>
    <li>This is Item 2. It has no code.</li>
    <li>
      This step has its own steps, and one of them has code:
      <ul>
        <li>Step 1: Step one would go here.</li>
        <li>Step 2: Step two would go here.</li>
        <li>
          Step 3: Step three would go here. It has some code:
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
                ><code><span class="line"><span class="cl"><span class="c1">// Function to compute the product of p1 and p2
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kd">function</span> <span class="nx">myFunction</span><span class="p">(</span><span class="nx">p1</span><span class="p">,</span> <span class="nx">p2</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="k">return</span> <span class="nx">p1</span> <span class="o">*</span> <span class="nx">p2</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </li>
        <li>Step 4: Step four would go here.</li>
      </ul>
    </li>
  </ol>
</article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {},    filtersManifest: {"filtersById":{"color":{"config":{"label":"Color","filter_id":"color","option_group_id":"primary_color_options"},"defaultValsByOptionGroupId":{"primary_color_options":"blue"}}},"defaultValsByFilterId":{"color":"blue"},"optionGroupsById":{"primary_color_options":[{"label":"Red","id":"red"},{"label":"Yellow","id":"yellow"},{"label":"Blue","default":true,"id":"blue"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>