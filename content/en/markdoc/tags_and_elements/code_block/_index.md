---
title: Code Block
private: true
---
<div id="cdoc-content" class="customizable"><article>
  <h2 id="usage">Usage</h2>
  <ul>
    <li>The default language for code blocks is <code>text</code>.</li>
    <li>
      Supported Markdoc tags within code blocks:
      <ul>
        <li><code>region-param</code></li>
      </ul>
    </li>
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
  <h2 id="example-with-filename">Example with filename</h2>
  <p>
    <code>collapsible</code> is set to <code>false</code> and
    <code>disable_copy</code> is set to <code>true</code>.
  </p>
  <div class="code-snippet-wrapper">
    <div class="code-filename-wrapper d-flex justify-content-between">
      <p class="code-filename my-0">example.js</p>
    </div>
    <div class="code-snippet">
      <div class="cdoc-code-snippet cdoc-language-javascript">
        <pre
          tabindex="0"
          class="chroma"
        ><code><span class="line"><span class="cl"><span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Hello, World!&#39;</span><span class="p">);</span>
</span></span></code></pre>
      </div>
    </div>
  </div>
  <h2 id="indented-code-blocks">Indented code blocks</h2>
  <p>
    The first one has <code>collapsible</code> explicitly set to
    <code>false</code>.
  </p>
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
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {},    filtersManifest: {"filtersByTraitId":{},"defaultValsByTraitId":{},"optionGroupsById":{}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>