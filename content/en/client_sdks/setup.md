---
title: Client SDK Setup
---
<div id="cdoc-selector"><div id="cdoc-filters-menu"><div class="filter-selector-menu" id="cdoc-filters-pill-menu"><div class="cdoc-pills-container"><p 
    id="cdoc-sdk-pills-label" 
    class="cdoc-filter-label"
  >SDK</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="sdk" 
      data-option-id="browser"
      aria-selected="true"
      tabIndex="0"
    >Browser</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="sdk" 
      data-option-id="android"
      aria-selected="false"
      tabIndex="0"
    >Android</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="sdk" 
      data-option-id="ios"
      aria-selected="false"
      tabIndex="0"
    >iOS</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="sdk" 
      data-option-id="flutter"
      aria-selected="false"
      tabIndex="0"
    >Flutter</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="sdk" 
      data-option-id="react_native"
      aria-selected="false"
      tabIndex="0"
    >React Native</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="sdk" 
      data-option-id="kotlin_multiplatform"
      aria-selected="false"
      tabIndex="0"
    >Kotlin Multiplatform</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="sdk" 
      data-option-id="roku"
      aria-selected="false"
      tabIndex="0"
    >Roku</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="sdk" 
      data-option-id="unity"
      aria-selected="false"
      tabIndex="0"
    >Unity</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
    id="cdoc-sdk-dropdown-label" 
    class="cdoc-filter-label"
  >SDK</p><div 
    id="cdoc-dropdown-sdk" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-sdk-dropdown-label">
      <span 
        id="cdoc-dropdown-sdk-label" 
        class="cdoc-btn-label"
      >Browser</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-sdk-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="sdk" 
      data-option-id="browser"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >Browser</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="sdk" 
      data-option-id="android"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Android</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="sdk" 
      data-option-id="ios"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >iOS</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="sdk" 
      data-option-id="flutter"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Flutter</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="sdk" 
      data-option-id="react_native"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >React Native</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="sdk" 
      data-option-id="kotlin_multiplatform"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Kotlin Multiplatform</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="sdk" 
      data-option-id="roku"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Roku</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="sdk" 
      data-option-id="unity"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Unity</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article>
  <h2 id="overview">Overview</h2>
  <p>
    Follow the instructions below to install and configure the Datadog SDK for
    your platform.
  </p>
  <div
    class="cdoc__toggleable"
    data-description="SDK is Browser"
    data-if="5590"
  >
    <p>
      This page describes how to instrument your web applications with the
      Datadog Browser SDK. The Browser SDK supports
      <a
        href="/real_user_monitoring/application_monitoring/browser/setup/client"
        >Real User Monitoring (RUM)</a
      >, <a href="/error_tracking/frontend/browser">Error Tracking</a>, Session
      Replay, and Product Analytics.
    </p>
    <p>The Browser SDK supports all modern desktop and mobile browsers.</p>
    <h2 id="setup">Setup</h2>
    <p><strong>Choose your setup method:</strong></p>
    <ul>
      <li>
        <strong
          ><a
            href="/real_user_monitoring/application_monitoring/browser/setup/server"
            >Server-side auto-instrumentation</a
          ></strong
        >
        (RUM only): Automatically inject the RUM SDK into HTML responses through
        your web server or proxy.
      </li>
      <li>
        <strong
          ><a
            href="/real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring"
            >Agentic Onboarding</a
          ></strong
        >
        (RUM only): Use AI coding agents (Cursor, Claude Code) to automatically
        instrument your application with one prompt.
      </li>
      <li>
        <strong>Manual client-side setup</strong> (below): Manually add the SDK
        to your application code.
      </li>
    </ul>
    <h3 id="step-1--create-the-application-in-the-ui">
      Step 1 - Create the application in the UI
    </h3>
    <ol>
      <li>
        In Datadog, navigate to
        <a href="https://app.datadoghq.com/rum/list"
          ><strong>Digital Experience</strong> &gt;
          <strong>Add an Application</strong></a
        >
        and select the JavaScript (JS) application type.
      </li>
      <li>
        Enter a name for your application, then click
        <strong>Create Application</strong>. This generates a
        <code>clientToken</code> and an <code>applicationId</code> for your
        application.
      </li>
    </ol>
    <h3 id="step-2--install-the-browser-sdk">
      Step 2 - Install the Browser SDK
    </h3>
    <p>Choose the installation method for the Browser SDK.</p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div data-lang="npm" class="tab-pane fade" role="tabpanel" title="NPM">
          <p>
            Installing through Node Package Manager (npm) registry is
            recommended for modern web applications. The Browser SDK is packaged
            with the rest of your frontend JavaScript code. It has no impact on
            page load performance. However, the SDK may miss errors, resources,
            and user actions triggered before the SDK is initialized. Datadog
            recommends using a matching version with the Browser Logs SDK.
          </p>
          <p>
            Add
            <a href="https://www.npmjs.com/package/@datadog/browser-rum"
              ><code>@datadog/browser-rum</code></a
            >
            to your <code>package.json</code> file, for example if you use npm
            cli:
          </p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-shell">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">npm install --save @datadog/browser-rum
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="cdn-async"
          class="tab-pane fade"
          role="tabpanel"
          title="CDN async"
        >
          <p>
            Installing through CDN async is recommended for web applications
            with performance targets. The Browser SDK loads from Datadog's CDN
            asynchronously, ensuring the SDK download does not impact page load
            performance. However, the SDK may miss errors, resources, and user
            actions triggered before the SDK is initialized.
          </p>
          <p>
            Add the generated code snippet to the head tag of every HTML page
            you want to monitor in your application.
          </p>
          <div class="d-none site-region-container" data-region="us">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl">  <span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">h</span><span class="p">,</span><span class="nx">o</span><span class="p">,</span><span class="nx">u</span><span class="p">,</span><span class="nx">n</span><span class="p">,</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">h</span><span class="o">=</span><span class="nx">h</span><span class="p">[</span><span class="nx">d</span><span class="p">]</span><span class="o">=</span><span class="nx">h</span><span class="p">[</span><span class="nx">d</span><span class="p">]</span><span class="o">||</span><span class="p">{</span><span class="nx">q</span><span class="o">:</span><span class="p">[],</span><span class="nx">onReady</span><span class="o">:</span><span class="kd">function</span><span class="p">(</span><span class="nx">c</span><span class="p">){</span><span class="nx">h</span><span class="p">.</span><span class="nx">q</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">c</span><span class="p">)}}</span>
</span></span><span class="line"><span class="cl">    <span class="nx">d</span><span class="o">=</span><span class="nx">o</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="nx">u</span><span class="p">);</span><span class="nx">d</span><span class="p">.</span><span class="kr">async</span><span class="o">=</span><span class="mi">1</span><span class="p">;</span><span class="nx">d</span><span class="p">.</span><span class="nx">src</span><span class="o">=</span><span class="nx">n</span>
</span></span><span class="line"><span class="cl">    <span class="nx">n</span><span class="o">=</span><span class="nx">o</span><span class="p">.</span><span class="nx">getElementsByTagName</span><span class="p">(</span><span class="nx">u</span><span class="p">)[</span><span class="mi">0</span><span class="p">];</span><span class="nx">n</span><span class="p">.</span><span class="nx">parentNode</span><span class="p">.</span><span class="nx">insertBefore</span><span class="p">(</span><span class="nx">d</span><span class="p">,</span><span class="nx">n</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">})(</span><span class="nb">window</span><span class="p">,</span><span class="nb">document</span><span class="p">,</span><span class="s1">&#39;script&#39;</span><span class="p">,</span><span class="s1">&#39;https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js&#39;</span><span class="p">,</span><span class="s1">&#39;DD_RUM&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="d-none site-region-container" data-region="eu">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl">  <span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">h</span><span class="p">,</span><span class="nx">o</span><span class="p">,</span><span class="nx">u</span><span class="p">,</span><span class="nx">n</span><span class="p">,</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">h</span><span class="o">=</span><span class="nx">h</span><span class="p">[</span><span class="nx">d</span><span class="p">]</span><span class="o">=</span><span class="nx">h</span><span class="p">[</span><span class="nx">d</span><span class="p">]</span><span class="o">||</span><span class="p">{</span><span class="nx">q</span><span class="o">:</span><span class="p">[],</span><span class="nx">onReady</span><span class="o">:</span><span class="kd">function</span><span class="p">(</span><span class="nx">c</span><span class="p">){</span><span class="nx">h</span><span class="p">.</span><span class="nx">q</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">c</span><span class="p">)}}</span>
</span></span><span class="line"><span class="cl">    <span class="nx">d</span><span class="o">=</span><span class="nx">o</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="nx">u</span><span class="p">);</span><span class="nx">d</span><span class="p">.</span><span class="kr">async</span><span class="o">=</span><span class="mi">1</span><span class="p">;</span><span class="nx">d</span><span class="p">.</span><span class="nx">src</span><span class="o">=</span><span class="nx">n</span>
</span></span><span class="line"><span class="cl">    <span class="nx">n</span><span class="o">=</span><span class="nx">o</span><span class="p">.</span><span class="nx">getElementsByTagName</span><span class="p">(</span><span class="nx">u</span><span class="p">)[</span><span class="mi">0</span><span class="p">];</span><span class="nx">n</span><span class="p">.</span><span class="nx">parentNode</span><span class="p">.</span><span class="nx">insertBefore</span><span class="p">(</span><span class="nx">d</span><span class="p">,</span><span class="nx">n</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">})(</span><span class="nb">window</span><span class="p">,</span><span class="nb">document</span><span class="p">,</span><span class="s1">&#39;script&#39;</span><span class="p">,</span><span class="s1">&#39;https://www.datadoghq-browser-agent.com/eu/v6/datadog-rum.js&#39;</span><span class="p">,</span><span class="s1">&#39;DD_RUM&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="d-none site-region-container" data-region="ap1">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl">  <span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">h</span><span class="p">,</span><span class="nx">o</span><span class="p">,</span><span class="nx">u</span><span class="p">,</span><span class="nx">n</span><span class="p">,</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">h</span><span class="o">=</span><span class="nx">h</span><span class="p">[</span><span class="nx">d</span><span class="p">]</span><span class="o">=</span><span class="nx">h</span><span class="p">[</span><span class="nx">d</span><span class="p">]</span><span class="o">||</span><span class="p">{</span><span class="nx">q</span><span class="o">:</span><span class="p">[],</span><span class="nx">onReady</span><span class="o">:</span><span class="kd">function</span><span class="p">(</span><span class="nx">c</span><span class="p">){</span><span class="nx">h</span><span class="p">.</span><span class="nx">q</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">c</span><span class="p">)}}</span>
</span></span><span class="line"><span class="cl">    <span class="nx">d</span><span class="o">=</span><span class="nx">o</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="nx">u</span><span class="p">);</span><span class="nx">d</span><span class="p">.</span><span class="kr">async</span><span class="o">=</span><span class="mi">1</span><span class="p">;</span><span class="nx">d</span><span class="p">.</span><span class="nx">src</span><span class="o">=</span><span class="nx">n</span>
</span></span><span class="line"><span class="cl">    <span class="nx">n</span><span class="o">=</span><span class="nx">o</span><span class="p">.</span><span class="nx">getElementsByTagName</span><span class="p">(</span><span class="nx">u</span><span class="p">)[</span><span class="mi">0</span><span class="p">];</span><span class="nx">n</span><span class="p">.</span><span class="nx">parentNode</span><span class="p">.</span><span class="nx">insertBefore</span><span class="p">(</span><span class="nx">d</span><span class="p">,</span><span class="nx">n</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">})(</span><span class="nb">window</span><span class="p">,</span><span class="nb">document</span><span class="p">,</span><span class="s1">&#39;script&#39;</span><span class="p">,</span><span class="s1">&#39;https://www.datadoghq-browser-agent.com/ap1/v6/datadog-rum.js&#39;</span><span class="p">,</span><span class="s1">&#39;DD_RUM&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="d-none site-region-container" data-region="ap2">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl">  <span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">h</span><span class="p">,</span><span class="nx">o</span><span class="p">,</span><span class="nx">u</span><span class="p">,</span><span class="nx">n</span><span class="p">,</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">h</span><span class="o">=</span><span class="nx">h</span><span class="p">[</span><span class="nx">d</span><span class="p">]</span><span class="o">=</span><span class="nx">h</span><span class="p">[</span><span class="nx">d</span><span class="p">]</span><span class="o">||</span><span class="p">{</span><span class="nx">q</span><span class="o">:</span><span class="p">[],</span><span class="nx">onReady</span><span class="o">:</span><span class="kd">function</span><span class="p">(</span><span class="nx">c</span><span class="p">){</span><span class="nx">h</span><span class="p">.</span><span class="nx">q</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">c</span><span class="p">)}}</span>
</span></span><span class="line"><span class="cl">    <span class="nx">d</span><span class="o">=</span><span class="nx">o</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="nx">u</span><span class="p">);</span><span class="nx">d</span><span class="p">.</span><span class="kr">async</span><span class="o">=</span><span class="mi">1</span><span class="p">;</span><span class="nx">d</span><span class="p">.</span><span class="nx">src</span><span class="o">=</span><span class="nx">n</span>
</span></span><span class="line"><span class="cl">    <span class="nx">n</span><span class="o">=</span><span class="nx">o</span><span class="p">.</span><span class="nx">getElementsByTagName</span><span class="p">(</span><span class="nx">u</span><span class="p">)[</span><span class="mi">0</span><span class="p">];</span><span class="nx">n</span><span class="p">.</span><span class="nx">parentNode</span><span class="p">.</span><span class="nx">insertBefore</span><span class="p">(</span><span class="nx">d</span><span class="p">,</span><span class="nx">n</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">})(</span><span class="nb">window</span><span class="p">,</span><span class="nb">document</span><span class="p">,</span><span class="s1">&#39;script&#39;</span><span class="p">,</span><span class="s1">&#39;https://www.datadoghq-browser-agent.com/ap2/v6/datadog-rum.js&#39;</span><span class="p">,</span><span class="s1">&#39;DD_RUM&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="d-none site-region-container" data-region="us3">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl">  <span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">h</span><span class="p">,</span><span class="nx">o</span><span class="p">,</span><span class="nx">u</span><span class="p">,</span><span class="nx">n</span><span class="p">,</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">h</span><span class="o">=</span><span class="nx">h</span><span class="p">[</span><span class="nx">d</span><span class="p">]</span><span class="o">=</span><span class="nx">h</span><span class="p">[</span><span class="nx">d</span><span class="p">]</span><span class="o">||</span><span class="p">{</span><span class="nx">q</span><span class="o">:</span><span class="p">[],</span><span class="nx">onReady</span><span class="o">:</span><span class="kd">function</span><span class="p">(</span><span class="nx">c</span><span class="p">){</span><span class="nx">h</span><span class="p">.</span><span class="nx">q</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">c</span><span class="p">)}}</span>
</span></span><span class="line"><span class="cl">    <span class="nx">d</span><span class="o">=</span><span class="nx">o</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="nx">u</span><span class="p">);</span><span class="nx">d</span><span class="p">.</span><span class="kr">async</span><span class="o">=</span><span class="mi">1</span><span class="p">;</span><span class="nx">d</span><span class="p">.</span><span class="nx">src</span><span class="o">=</span><span class="nx">n</span>
</span></span><span class="line"><span class="cl">    <span class="nx">n</span><span class="o">=</span><span class="nx">o</span><span class="p">.</span><span class="nx">getElementsByTagName</span><span class="p">(</span><span class="nx">u</span><span class="p">)[</span><span class="mi">0</span><span class="p">];</span><span class="nx">n</span><span class="p">.</span><span class="nx">parentNode</span><span class="p">.</span><span class="nx">insertBefore</span><span class="p">(</span><span class="nx">d</span><span class="p">,</span><span class="nx">n</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">})(</span><span class="nb">window</span><span class="p">,</span><span class="nb">document</span><span class="p">,</span><span class="s1">&#39;script&#39;</span><span class="p">,</span><span class="s1">&#39;https://www.datadoghq-browser-agent.com/us3/v6/datadog-rum.js&#39;</span><span class="p">,</span><span class="s1">&#39;DD_RUM&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="d-none site-region-container" data-region="us5">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl">  <span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">h</span><span class="p">,</span><span class="nx">o</span><span class="p">,</span><span class="nx">u</span><span class="p">,</span><span class="nx">n</span><span class="p">,</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">h</span><span class="o">=</span><span class="nx">h</span><span class="p">[</span><span class="nx">d</span><span class="p">]</span><span class="o">=</span><span class="nx">h</span><span class="p">[</span><span class="nx">d</span><span class="p">]</span><span class="o">||</span><span class="p">{</span><span class="nx">q</span><span class="o">:</span><span class="p">[],</span><span class="nx">onReady</span><span class="o">:</span><span class="kd">function</span><span class="p">(</span><span class="nx">c</span><span class="p">){</span><span class="nx">h</span><span class="p">.</span><span class="nx">q</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">c</span><span class="p">)}}</span>
</span></span><span class="line"><span class="cl">    <span class="nx">d</span><span class="o">=</span><span class="nx">o</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="nx">u</span><span class="p">);</span><span class="nx">d</span><span class="p">.</span><span class="kr">async</span><span class="o">=</span><span class="mi">1</span><span class="p">;</span><span class="nx">d</span><span class="p">.</span><span class="nx">src</span><span class="o">=</span><span class="nx">n</span>
</span></span><span class="line"><span class="cl">    <span class="nx">n</span><span class="o">=</span><span class="nx">o</span><span class="p">.</span><span class="nx">getElementsByTagName</span><span class="p">(</span><span class="nx">u</span><span class="p">)[</span><span class="mi">0</span><span class="p">];</span><span class="nx">n</span><span class="p">.</span><span class="nx">parentNode</span><span class="p">.</span><span class="nx">insertBefore</span><span class="p">(</span><span class="nx">d</span><span class="p">,</span><span class="nx">n</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">})(</span><span class="nb">window</span><span class="p">,</span><span class="nb">document</span><span class="p">,</span><span class="s1">&#39;script&#39;</span><span class="p">,</span><span class="s1">&#39;https://www.datadoghq-browser-agent.com/us5/v6/datadog-rum.js&#39;</span><span class="p">,</span><span class="s1">&#39;DD_RUM&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="d-none site-region-container" data-region="gov">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl">  <span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">h</span><span class="p">,</span><span class="nx">o</span><span class="p">,</span><span class="nx">u</span><span class="p">,</span><span class="nx">n</span><span class="p">,</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">h</span><span class="o">=</span><span class="nx">h</span><span class="p">[</span><span class="nx">d</span><span class="p">]</span><span class="o">=</span><span class="nx">h</span><span class="p">[</span><span class="nx">d</span><span class="p">]</span><span class="o">||</span><span class="p">{</span><span class="nx">q</span><span class="o">:</span><span class="p">[],</span><span class="nx">onReady</span><span class="o">:</span><span class="kd">function</span><span class="p">(</span><span class="nx">c</span><span class="p">){</span><span class="nx">h</span><span class="p">.</span><span class="nx">q</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">c</span><span class="p">)}}</span>
</span></span><span class="line"><span class="cl">    <span class="nx">d</span><span class="o">=</span><span class="nx">o</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="nx">u</span><span class="p">);</span><span class="nx">d</span><span class="p">.</span><span class="kr">async</span><span class="o">=</span><span class="mi">1</span><span class="p">;</span><span class="nx">d</span><span class="p">.</span><span class="nx">src</span><span class="o">=</span><span class="nx">n</span>
</span></span><span class="line"><span class="cl">    <span class="nx">n</span><span class="o">=</span><span class="nx">o</span><span class="p">.</span><span class="nx">getElementsByTagName</span><span class="p">(</span><span class="nx">u</span><span class="p">)[</span><span class="mi">0</span><span class="p">];</span><span class="nx">n</span><span class="p">.</span><span class="nx">parentNode</span><span class="p">.</span><span class="nx">insertBefore</span><span class="p">(</span><span class="nx">d</span><span class="p">,</span><span class="nx">n</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="p">})(</span><span class="nb">window</span><span class="p">,</span><span class="nb">document</span><span class="p">,</span><span class="s1">&#39;script&#39;</span><span class="p">,</span><span class="s1">&#39;https://www.datadoghq-browser-agent.com/datadog-rum-v6.js&#39;</span><span class="p">,</span><span class="s1">&#39;DD_RUM&#39;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="cdn-sync"
          class="tab-pane fade"
          role="tabpanel"
          title="CDN sync"
        >
          <p>
            Installing through CDN sync is recommended for collecting all
            events. The Browser SDK loads from Datadog's CDN synchronously,
            ensuring the SDK loads first and collects all errors, resources, and
            user actions. This method may impact page load performance.
          </p>
          <p>
            Add the generated code snippet to the head tag (in front of any
            other script tags) of every HTML page you want to monitor in your
            application. Placing the script tag higher and loading it
            synchronously ensures Datadog RUM can collect all performance data
            and errors.
          </p>
          <div class="d-none site-region-container" data-region="us">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span>
</span></span><span class="line"><span class="cl">    <span class="nx">src</span><span class="o">=</span><span class="s2">&#34;https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="nx">type</span><span class="o">=</span><span class="s2">&#34;text/javascript&#34;</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="d-none site-region-container" data-region="eu">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span>
</span></span><span class="line"><span class="cl">    <span class="nx">src</span><span class="o">=</span><span class="s2">&#34;https://www.datadoghq-browser-agent.com/eu/v6/datadog-rum.js&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="nx">type</span><span class="o">=</span><span class="s2">&#34;text/javascript&#34;</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="d-none site-region-container" data-region="ap1">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span>
</span></span><span class="line"><span class="cl">    <span class="nx">src</span><span class="o">=</span><span class="s2">&#34;https://www.datadoghq-browser-agent.com/ap1/v6/datadog-rum.js&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="nx">type</span><span class="o">=</span><span class="s2">&#34;text/javascript&#34;</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="d-none site-region-container" data-region="ap2">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span>
</span></span><span class="line"><span class="cl">    <span class="nx">src</span><span class="o">=</span><span class="s2">&#34;https://www.datadoghq-browser-agent.com/ap2/v6/datadog-rum.js&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="nx">type</span><span class="o">=</span><span class="s2">&#34;text/javascript&#34;</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="d-none site-region-container" data-region="us3">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span>
</span></span><span class="line"><span class="cl">    <span class="nx">src</span><span class="o">=</span><span class="s2">&#34;https://www.datadoghq-browser-agent.com/us3/v6/datadog-rum.js&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="nx">type</span><span class="o">=</span><span class="s2">&#34;text/javascript&#34;</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="d-none site-region-container" data-region="us5">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span>
</span></span><span class="line"><span class="cl">    <span class="nx">src</span><span class="o">=</span><span class="s2">&#34;https://www.datadoghq-browser-agent.com/us5/v6/datadog-rum.js&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="nx">type</span><span class="o">=</span><span class="s2">&#34;text/javascript&#34;</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="d-none site-region-container" data-region="gov">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span>
</span></span><span class="line"><span class="cl">    <span class="nx">src</span><span class="o">=</span><span class="s2">&#34;https://www.datadoghq-browser-agent.com/datadog-rum-v6.js&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="nx">type</span><span class="o">=</span><span class="s2">&#34;text/javascript&#34;</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3 id="step-3--initialize-the-browser-sdk">
      Step 3 - Initialize the Browser SDK
    </h3>
    <p>
      The SDK should be initialized as early as possible in the app lifecycle.
      This ensures all measurements are captured correctly.
    </p>
    <p>
      In the initialization snippet, set an environment name, service name, and
      client token. See the full list of
      <a
        href="https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html"
        >initialization parameters</a
      >.
    </p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div data-lang="npm" class="tab-pane fade" role="tabpanel" title="NPM">
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
                ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">datadogRum</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;@datadog/browser-rum&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">datadogRum</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">   <span class="nx">applicationId</span><span class="o">:</span> <span class="s1">&#39;&lt;APP_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">   <span class="nx">clientToken</span><span class="o">:</span> <span class="s1">&#39;&lt;CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">   <span class="c1">// `site` refers to the Datadog site parameter of your organization
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>   <span class="c1">// see https://docs.datadoghq.com/getting_started/site/
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>   <span class="nx">site</span><span class="o">:</span> <span class="s1">&#39;&lt;DATADOG_SITE&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="c1">//  service: &#39;my-web-application&#39;,
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="c1">//  env: &#39;production&#39;,
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="c1">//  version: &#39;1.0.0&#39;,
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">});</span>
</span></span><span class="line"><span class="cl">
</span></span></code></pre>
              </div>
            </div>
          </div>
          <div class="alert alert-info">
            <p>
              Types are compatible with TypeScript &gt;= 3.8.2. For earlier
              versions of TypeScript, import JavaScript sources and use global
              variables to avoid any compilation issues.
            </p>
          </div>
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
                ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="s1">&#39;@datadog/browser-rum/bundle/datadog-rum&#39;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">  <span class="p">...</span>
</span></span><span class="line"><span class="cl"><span class="p">})</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="cdn-async"
          class="tab-pane fade"
          role="tabpanel"
          title="CDN async"
        >
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
                ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl">  <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">onReady</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">      <span class="nx">clientToken</span><span class="o">:</span> <span class="s1">&#39;&lt;CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="nx">applicationId</span><span class="o">:</span> <span class="s1">&#39;&lt;APP_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="c1">// `site` refers to the Datadog site parameter of your organization
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>      <span class="c1">// see https://docs.datadoghq.com/getting_started/site/
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>      <span class="nx">site</span><span class="o">:</span> <span class="s1">&#39;&lt;DATADOG_SITE&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="c1">//  service: &#39;my-web-application&#39;,
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>      <span class="c1">//  env: &#39;production&#39;,
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>      <span class="c1">//  version: &#39;1.0.0&#39;,
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="p">});</span>
</span></span><span class="line"><span class="cl">  <span class="p">})</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="cdn-sync"
          class="tab-pane fade"
          role="tabpanel"
          title="CDN sync"
        >
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
                ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl">    <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span> <span class="o">&amp;&amp;</span> <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">      <span class="nx">clientToken</span><span class="o">:</span> <span class="s1">&#39;&lt;CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="nx">applicationId</span><span class="o">:</span> <span class="s1">&#39;&lt;APP_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="c1">// `site` refers to the Datadog site parameter of your organization
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>      <span class="c1">// see https://docs.datadoghq.com/getting_started/site/
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>      <span class="nx">site</span><span class="o">:</span> <span class="s1">&#39;&lt;DATADOG_SITE&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="c1">//  service: &#39;my-web-application&#39;,
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>      <span class="c1">//  env: &#39;production&#39;,
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>      <span class="c1">//  version: &#39;1.0.0&#39;,
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>
</span></span><span class="line"><span class="cl">    <span class="p">});</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4 id="configure-tracking-consent--gdpr-compliance">
      Configure tracking consent (GDPR compliance)
    </h4>
    <p>
      To be compliant with GDPR, CCPA, and similar regulations, the Browser SDK
      lets you provide the
      <a href="/real_user_monitoring/application_monitoring/browser"
        >tracking consent value at initialization</a
      >.
    </p>
    <h4 id="configure-content-security-policy--csp">
      Configure Content Security Policy (CSP)
    </h4>
    <p>
      If you're using the Datadog Content Security Policy (CSP) integration on
      your site, see
      <a href="/integrations/content_security_policy_logs/"
        >the CSP documentation</a
      >
      for additional setup steps.
    </p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Android"
    data-if="5591"
  >
    <p>
      This page describes how to instrument your applications for
      <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> with the
      Android SDK. RUM includes Error Tracking by default, but if you have
      purchased Error Tracking as a standalone product, see the
      <a href="/error_tracking/frontend/mobile/android"
        >Error Tracking setup guide</a
      >
      for specific steps.
    </p>
    <p>
      The Datadog Android SDK supports Android 6.0+ (API level 23) and Android
      TV.
    </p>
    <h2 id="setup">Setup</h2>
    <p><strong>Choose your setup method:</strong></p>
    <ul>
      <li>
        <strong
          ><a
            href="/real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring"
            >Agentic Onboarding</a
          ></strong
        >: Use AI coding agents (Cursor, Claude Code) to automatically
        instrument your application with one prompt. The agent detects your
        project structure and configures the RUM SDK for you.
      </li>
      <li>
        <strong>Manual setup</strong> (below): Follow the step-by-step
        instructions to manually add and configure the SDK.
      </li>
    </ul>
    <h3 id="step-1--declare-the-android-sdk-as-a-dependency">
      Step 1 - Declare the Android SDK as a dependency
    </h3>
    <p>
      Declare
      <a
        href="https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum"
        >dd-sdk-android-rum</a
      >
      and the
      <a href="https://github.com/DataDog/dd-sdk-android-gradle-plugin"
        >Gradle plugin</a
      >
      as dependencies in your <strong>application module's</strong>
      <code>build.gradle</code> file.
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-groovy">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">buildscript</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">dependencies</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">        <span class="n">classpath</span><span class="o">(</span><span class="s2">&#34;com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="n">plugins</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">id</span><span class="o">(</span><span class="s2">&#34;com.datadoghq.dd-sdk-android-gradle-plugin&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">    <span class="c1">//(...)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="n">android</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">//(...)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="n">dependencies</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">implementation</span> <span class="s2">&#34;com.datadoghq:dd-sdk-android-rum:x.x.x&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="c1">//(...)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="o">}</span>
</span></span><span class="line"><span class="cl">
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="step-2--specify-application-details-in-the-ui">
      Step 2 - Specify application details in the UI
    </h3>
    <ol>
      <li>
        Navigate to
        <a href="https://app.datadoghq.com/rum/list"
          ><strong>Digital Experience</strong> &gt;
          <strong>Add an Application</strong></a
        >.
      </li>
      <li>
        Select <code>android</code> as the application type and enter an
        application name to generate a unique Datadog application ID and client
        token.
      </li>
      <li>
        To instrument your web views, click the
        <strong>Instrument your webviews</strong> toggle. For more information,
        see
        <a href="/real_user_monitoring/android/web_view_tracking/"
          >Web View Tracking</a
        >.
      </li>
      <li>
        To disable automatic user data collection for either client IP or
        geolocation data, use the toggles for those settings. For more
        information, see
        <a href="/real_user_monitoring/android/data_collected/"
          >RUM Android Data Collected</a
        >.
      </li>
    </ol>
    <a
      href="http://localhost:1313/images/real_user_monitoring/android/android-new-application.fe329bfc1c6e54126fcc8822dff1d2f0.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture style="width: 90%"
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/android/android-new-application.fe329bfc1c6e54126fcc8822dff1d2f0.png?auto=format
              "
              class="img-fluid"
              style="width: 90%"
              alt="Create a RUM application for Android in Datadog"
          /></picture>
        </figure></div
    ></a>
    <p>
      For more information about setting up a client token, see the
      <a href="/account_management/api-app-keys/#client-tokens"
        >Client Token documentation</a
      >.
    </p>
    <h3 id="step-3--initialize-the-datadog-sdk-with-application-context">
      Step 3 - Initialize the Datadog SDK with application context
    </h3>
    <h4 id="update-the-initialization-snippet">
      Update the initialization snippet
    </h4>
    <p>
      In the initialization snippet, set an environment name, service name, and
      version number. In the examples below,
      <code>APP_VARIANT_NAME</code> specifies the variant of the application
      that generates data. For more information, see
      <a href="/getting_started/tagging/using_tags/#rum--session-replay"
        >Using Tags</a
      >.
    </p>
    <p>
      During initialization, you can also set the sample rate (RUM sessions) and
      set the tracking consent for GDPR compliance, as described below. See
      <a
        href="/real_user_monitoring/application_monitoring/android/advanced_configuration/#initialization-parameters"
        >other configuration options</a
      >
      to initialize the library.
    </p>
    <div class="d-none site-region-container" data-region="us">
      <div class="code-tabs">
        <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">
          <div
            data-lang="kotlin"
            class="tab-pane fade"
            role="tabpanel"
            title="Kotlin"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-kotlin">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="k">class</span> <span class="nc">SampleApplication</span> <span class="p">:</span> <span class="n">Application</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">override</span> <span class="k">fun</span> <span class="nf">onCreate</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="k">super</span><span class="p">.</span><span class="n">onCreate</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="k">val</span> <span class="py">configuration</span> <span class="p">=</span> <span class="nc">Configuration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">            <span class="n">clientToken</span> <span class="p">=</span> <span class="s2">&#34;&lt;CLIENT_TOKEN&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">            <span class="n">env</span> <span class="p">=</span> <span class="s2">&#34;&lt;ENV_NAME&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">            <span class="n">variant</span> <span class="p">=</span> <span class="s2">&#34;&lt;APP_VARIANT_NAME&gt;&#34;</span>
</span></span><span class="line"><span class="cl">        <span class="p">).</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="nc">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="n">configuration</span><span class="p">,</span> <span class="n">trackingConsent</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div
            data-lang="java"
            class="tab-pane fade"
            role="tabpanel"
            title="Java"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-java">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kd">public</span> <span class="kd">class</span> <span class="nc">SampleApplication</span> <span class="kd">extends</span> <span class="n">Application</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="nd">@Override</span>
</span></span><span class="line"><span class="cl">    <span class="kd">public</span> <span class="kt">void</span> <span class="nf">onCreate</span><span class="o">()</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">        <span class="kd">super</span><span class="o">.</span><span class="na">onCreate</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">        <span class="n">Configuration</span> <span class="n">configuration</span> <span class="o">=</span>
</span></span><span class="line"><span class="cl">                <span class="k">new</span> <span class="n">Configuration</span><span class="o">.</span><span class="na">Builder</span><span class="o">(</span><span class="s">&#34;&lt;CLIENT_TOKEN&gt;&#34;</span><span class="o">,</span> <span class="s">&#34;&lt;ENV_NAME&gt;&#34;</span><span class="o">,</span> <span class="s">&#34;&lt;APP_VARIANT_NAME&gt;&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">                        <span class="o">.</span><span class="na">build</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="n">Datadog</span><span class="o">.</span><span class="na">initialize</span><span class="o">(</span><span class="k">this</span><span class="o">,</span> <span class="n">configuration</span><span class="o">,</span> <span class="n">trackingConsent</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-none site-region-container" data-region="eu">
      <div class="code-tabs">
        <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">
          <div
            data-lang="kotlin"
            class="tab-pane fade"
            role="tabpanel"
            title="Kotlin"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-kotlin">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="k">class</span> <span class="nc">SampleApplication</span> <span class="p">:</span> <span class="n">Application</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">override</span> <span class="k">fun</span> <span class="nf">onCreate</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="k">super</span><span class="p">.</span><span class="n">onCreate</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="k">val</span> <span class="py">configuration</span> <span class="p">=</span> <span class="nc">Configuration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">                <span class="n">clientToken</span> <span class="p">=</span> <span class="s2">&#34;&lt;CLIENT_TOKEN&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                <span class="n">env</span> <span class="p">=</span> <span class="s2">&#34;&lt;ENV_NAME&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                <span class="n">variant</span> <span class="p">=</span> <span class="s2">&#34;&lt;APP_VARIANT_NAME&gt;&#34;</span>
</span></span><span class="line"><span class="cl">            <span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">useSite</span><span class="p">(</span><span class="nc">DatadogSite</span><span class="p">.</span><span class="n">EU1</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="nc">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="n">configuration</span><span class="p">,</span> <span class="n">trackingConsent</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div
            data-lang="java"
            class="tab-pane fade"
            role="tabpanel"
            title="Java"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-java">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kd">public</span> <span class="kd">class</span> <span class="nc">SampleApplication</span> <span class="kd">extends</span> <span class="n">Application</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="nd">@Override</span>
</span></span><span class="line"><span class="cl">    <span class="kd">public</span> <span class="kt">void</span> <span class="nf">onCreate</span><span class="o">()</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">        <span class="kd">super</span><span class="o">.</span><span class="na">onCreate</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">        <span class="n">Configuration</span> <span class="n">configuration</span> <span class="o">=</span>
</span></span><span class="line"><span class="cl">                <span class="k">new</span> <span class="n">Configuration</span><span class="o">.</span><span class="na">Builder</span><span class="o">(</span><span class="s">&#34;&lt;CLIENT_TOKEN&gt;&#34;</span><span class="o">,</span> <span class="s">&#34;&lt;ENV_NAME&gt;&#34;</span><span class="o">,</span> <span class="s">&#34;&lt;APP_VARIANT_NAME&gt;&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">                        <span class="o">.</span><span class="na">useSite</span><span class="o">(</span><span class="n">DatadogSite</span><span class="o">.</span><span class="na">EU1</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">                        <span class="o">.</span><span class="na">build</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="n">Datadog</span><span class="o">.</span><span class="na">initialize</span><span class="o">(</span><span class="k">this</span><span class="o">,</span> <span class="n">configuration</span><span class="o">,</span> <span class="n">trackingConsent</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-none site-region-container" data-region="us3">
      <div class="code-tabs">
        <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">
          <div
            data-lang="kotlin"
            class="tab-pane fade"
            role="tabpanel"
            title="Kotlin"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-kotlin">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="k">class</span> <span class="nc">SampleApplication</span> <span class="p">:</span> <span class="n">Application</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">override</span> <span class="k">fun</span> <span class="nf">onCreate</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="k">super</span><span class="p">.</span><span class="n">onCreate</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="k">val</span> <span class="py">configuration</span> <span class="p">=</span> <span class="nc">Configuration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">                <span class="n">clientToken</span> <span class="p">=</span> <span class="s2">&#34;&lt;CLIENT_TOKEN&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                <span class="n">env</span> <span class="p">=</span> <span class="s2">&#34;&lt;ENV_NAME&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                <span class="n">variant</span> <span class="p">=</span> <span class="s2">&#34;&lt;APP_VARIANT_NAME&gt;&#34;</span>
</span></span><span class="line"><span class="cl">            <span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">useSite</span><span class="p">(</span><span class="nc">DatadogSite</span><span class="p">.</span><span class="n">US3</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="nc">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="n">configuration</span><span class="p">,</span> <span class="n">trackingConsent</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div
            data-lang="java"
            class="tab-pane fade"
            role="tabpanel"
            title="Java"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-java">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kd">public</span> <span class="kd">class</span> <span class="nc">SampleApplication</span> <span class="kd">extends</span> <span class="n">Application</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="nd">@Override</span>
</span></span><span class="line"><span class="cl">    <span class="kd">public</span> <span class="kt">void</span> <span class="nf">onCreate</span><span class="o">()</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">        <span class="kd">super</span><span class="o">.</span><span class="na">onCreate</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">        <span class="n">Configuration</span> <span class="n">configuration</span> <span class="o">=</span>
</span></span><span class="line"><span class="cl">                <span class="k">new</span> <span class="n">Configuration</span><span class="o">.</span><span class="na">Builder</span><span class="o">(</span><span class="s">&#34;&lt;CLIENT_TOKEN&gt;&#34;</span><span class="o">,</span> <span class="s">&#34;&lt;ENV_NAME&gt;&#34;</span><span class="o">,</span> <span class="s">&#34;&lt;APP_VARIANT_NAME&gt;&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">                        <span class="o">.</span><span class="na">useSite</span><span class="o">(</span><span class="n">DatadogSite</span><span class="o">.</span><span class="na">US3</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">                        <span class="o">.</span><span class="na">build</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="n">Datadog</span><span class="o">.</span><span class="na">initialize</span><span class="o">(</span><span class="k">this</span><span class="o">,</span> <span class="n">configuration</span><span class="o">,</span> <span class="n">trackingConsent</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-none site-region-container" data-region="us5">
      <div class="code-tabs">
        <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">
          <div
            data-lang="kotlin"
            class="tab-pane fade"
            role="tabpanel"
            title="Kotlin"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-kotlin">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="k">class</span> <span class="nc">SampleApplication</span> <span class="p">:</span> <span class="n">Application</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">override</span> <span class="k">fun</span> <span class="nf">onCreate</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="k">super</span><span class="p">.</span><span class="n">onCreate</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="k">val</span> <span class="py">configuration</span> <span class="p">=</span> <span class="nc">Configuration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">                <span class="n">clientToken</span> <span class="p">=</span> <span class="s2">&#34;&lt;CLIENT_TOKEN&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                <span class="n">env</span> <span class="p">=</span> <span class="s2">&#34;&lt;ENV_NAME&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                <span class="n">variant</span> <span class="p">=</span> <span class="s2">&#34;&lt;APP_VARIANT_NAME&gt;&#34;</span>
</span></span><span class="line"><span class="cl">            <span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">useSite</span><span class="p">(</span><span class="nc">DatadogSite</span><span class="p">.</span><span class="n">US5</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="nc">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="n">configuration</span><span class="p">,</span> <span class="n">trackingConsent</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div
            data-lang="java"
            class="tab-pane fade"
            role="tabpanel"
            title="Java"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-java">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kd">public</span> <span class="kd">class</span> <span class="nc">SampleApplication</span> <span class="kd">extends</span> <span class="n">Application</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="nd">@Override</span>
</span></span><span class="line"><span class="cl">    <span class="kd">public</span> <span class="kt">void</span> <span class="nf">onCreate</span><span class="o">()</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">        <span class="kd">super</span><span class="o">.</span><span class="na">onCreate</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">        <span class="n">Configuration</span> <span class="n">configuration</span> <span class="o">=</span>
</span></span><span class="line"><span class="cl">                <span class="k">new</span> <span class="n">Configuration</span><span class="o">.</span><span class="na">Builder</span><span class="o">(</span><span class="s">&#34;&lt;CLIENT_TOKEN&gt;&#34;</span><span class="o">,</span> <span class="s">&#34;&lt;ENV_NAME&gt;&#34;</span><span class="o">,</span> <span class="s">&#34;&lt;APP_VARIANT_NAME&gt;&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">                        <span class="o">.</span><span class="na">useSite</span><span class="o">(</span><span class="n">DatadogSite</span><span class="o">.</span><span class="na">US5</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">                        <span class="o">.</span><span class="na">build</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="n">Datadog</span><span class="o">.</span><span class="na">initialize</span><span class="o">(</span><span class="k">this</span><span class="o">,</span> <span class="n">configuration</span><span class="o">,</span> <span class="n">trackingConsent</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-none site-region-container" data-region="gov">
      <div class="code-tabs">
        <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">
          <div
            data-lang="kotlin"
            class="tab-pane fade"
            role="tabpanel"
            title="Kotlin"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-kotlin">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="k">class</span> <span class="nc">SampleApplication</span> <span class="p">:</span> <span class="n">Application</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">override</span> <span class="k">fun</span> <span class="nf">onCreate</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="k">super</span><span class="p">.</span><span class="n">onCreate</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="k">val</span> <span class="py">configuration</span> <span class="p">=</span> <span class="nc">Configuration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">                <span class="n">clientToken</span> <span class="p">=</span> <span class="s2">&#34;&lt;CLIENT_TOKEN&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                <span class="n">env</span> <span class="p">=</span> <span class="s2">&#34;&lt;ENV_NAME&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                <span class="n">variant</span> <span class="p">=</span> <span class="s2">&#34;&lt;APP_VARIANT_NAME&gt;&#34;</span>
</span></span><span class="line"><span class="cl">            <span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">useSite</span><span class="p">(</span><span class="nc">DatadogSite</span><span class="p">.</span><span class="n">US1_FED</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="nc">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="n">configuration</span><span class="p">,</span> <span class="n">trackingConsent</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div
            data-lang="java"
            class="tab-pane fade"
            role="tabpanel"
            title="Java"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-java">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kd">public</span> <span class="kd">class</span> <span class="nc">SampleApplication</span> <span class="kd">extends</span> <span class="n">Application</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="nd">@Override</span>
</span></span><span class="line"><span class="cl">    <span class="kd">public</span> <span class="kt">void</span> <span class="nf">onCreate</span><span class="o">()</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">        <span class="kd">super</span><span class="o">.</span><span class="na">onCreate</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">        <span class="n">Configuration</span> <span class="n">configuration</span> <span class="o">=</span>
</span></span><span class="line"><span class="cl">                <span class="k">new</span> <span class="n">Configuration</span><span class="o">.</span><span class="na">Builder</span><span class="o">(</span><span class="s">&#34;&lt;CLIENT_TOKEN&gt;&#34;</span><span class="o">,</span> <span class="s">&#34;&lt;ENV_NAME&gt;&#34;</span><span class="o">,</span> <span class="s">&#34;&lt;APP_VARIANT_NAME&gt;&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">                        <span class="o">.</span><span class="na">useSite</span><span class="o">(</span><span class="n">DatadogSite</span><span class="o">.</span><span class="na">US1_FED</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">                        <span class="o">.</span><span class="na">build</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="n">Datadog</span><span class="o">.</span><span class="na">initialize</span><span class="o">(</span><span class="k">this</span><span class="o">,</span> <span class="n">configuration</span><span class="o">,</span> <span class="n">trackingConsent</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-none site-region-container" data-region="ap1">
      <div class="code-tabs">
        <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">
          <div
            data-lang="kotlin"
            class="tab-pane fade"
            role="tabpanel"
            title="Kotlin"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-kotlin">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="k">class</span> <span class="nc">SampleApplication</span> <span class="p">:</span> <span class="n">Application</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">override</span> <span class="k">fun</span> <span class="nf">onCreate</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="k">super</span><span class="p">.</span><span class="n">onCreate</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="k">val</span> <span class="py">configuration</span> <span class="p">=</span> <span class="nc">Configuration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">                <span class="n">clientToken</span> <span class="p">=</span> <span class="s2">&#34;&lt;CLIENT_TOKEN&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                <span class="n">env</span> <span class="p">=</span> <span class="s2">&#34;&lt;ENV_NAME&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                <span class="n">variant</span> <span class="p">=</span> <span class="s2">&#34;&lt;APP_VARIANT_NAME&gt;&#34;</span>
</span></span><span class="line"><span class="cl">            <span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">useSite</span><span class="p">(</span><span class="nc">DatadogSite</span><span class="p">.</span><span class="n">AP1</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="nc">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="n">configuration</span><span class="p">,</span> <span class="n">trackingConsent</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div
            data-lang="java"
            class="tab-pane fade"
            role="tabpanel"
            title="Java"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-java">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kd">public</span> <span class="kd">class</span> <span class="nc">SampleApplication</span> <span class="kd">extends</span> <span class="n">Application</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="nd">@Override</span>
</span></span><span class="line"><span class="cl">    <span class="kd">public</span> <span class="kt">void</span> <span class="nf">onCreate</span><span class="o">()</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">        <span class="kd">super</span><span class="o">.</span><span class="na">onCreate</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">        <span class="n">Configuration</span> <span class="n">configuration</span> <span class="o">=</span>
</span></span><span class="line"><span class="cl">                <span class="k">new</span> <span class="n">Configuration</span><span class="o">.</span><span class="na">Builder</span><span class="o">(</span><span class="s">&#34;&lt;CLIENT_TOKEN&gt;&#34;</span><span class="o">,</span> <span class="s">&#34;&lt;ENV_NAME&gt;&#34;</span><span class="o">,</span> <span class="s">&#34;&lt;APP_VARIANT_NAME&gt;&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">                        <span class="o">.</span><span class="na">useSite</span><span class="o">(</span><span class="n">DatadogSite</span><span class="o">.</span><span class="na">AP1</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">                        <span class="o">.</span><span class="na">build</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="n">Datadog</span><span class="o">.</span><span class="na">initialize</span><span class="o">(</span><span class="k">this</span><span class="o">,</span> <span class="n">configuration</span><span class="o">,</span> <span class="n">trackingConsent</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-none site-region-container" data-region="ap2">
      <div class="code-tabs">
        <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">
          <div
            data-lang="kotlin"
            class="tab-pane fade"
            role="tabpanel"
            title="Kotlin"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-kotlin">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="k">class</span> <span class="nc">SampleApplication</span> <span class="p">:</span> <span class="n">Application</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">override</span> <span class="k">fun</span> <span class="nf">onCreate</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="k">super</span><span class="p">.</span><span class="n">onCreate</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="k">val</span> <span class="py">configuration</span> <span class="p">=</span> <span class="nc">Configuration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">                <span class="n">clientToken</span> <span class="p">=</span> <span class="s2">&#34;&lt;CLIENT_TOKEN&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                <span class="n">env</span> <span class="p">=</span> <span class="s2">&#34;&lt;ENV_NAME&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                <span class="n">variant</span> <span class="p">=</span> <span class="s2">&#34;&lt;APP_VARIANT_NAME&gt;&#34;</span>
</span></span><span class="line"><span class="cl">            <span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">useSite</span><span class="p">(</span><span class="nc">DatadogSite</span><span class="p">.</span><span class="n">AP2</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="nc">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="n">configuration</span><span class="p">,</span> <span class="n">trackingConsent</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div
            data-lang="java"
            class="tab-pane fade"
            role="tabpanel"
            title="Java"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-java">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kd">public</span> <span class="kd">class</span> <span class="nc">SampleApplication</span> <span class="kd">extends</span> <span class="n">Application</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="nd">@Override</span>
</span></span><span class="line"><span class="cl">    <span class="kd">public</span> <span class="kt">void</span> <span class="nf">onCreate</span><span class="o">()</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">        <span class="kd">super</span><span class="o">.</span><span class="na">onCreate</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">        <span class="n">Configuration</span> <span class="n">configuration</span> <span class="o">=</span>
</span></span><span class="line"><span class="cl">                <span class="k">new</span> <span class="n">Configuration</span><span class="o">.</span><span class="na">Builder</span><span class="o">(</span><span class="s">&#34;&lt;CLIENT_TOKEN&gt;&#34;</span><span class="o">,</span> <span class="s">&#34;&lt;ENV_NAME&gt;&#34;</span><span class="o">,</span> <span class="s">&#34;&lt;APP_VARIANT_NAME&gt;&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">                        <span class="o">.</span><span class="na">useSite</span><span class="o">(</span><span class="n">DatadogSite</span><span class="o">.</span><span class="na">AP2</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">                        <span class="o">.</span><span class="na">build</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="n">Datadog</span><span class="o">.</span><span class="na">initialize</span><span class="o">(</span><span class="k">this</span><span class="o">,</span> <span class="n">configuration</span><span class="o">,</span> <span class="n">trackingConsent</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p>
      The initialization credentials require your application's variant name and
      use the value of <code>BuildConfig.FLAVOR</code>. With the variant, the
      SDK can match the errors reported from your application to the mapping
      files uploaded by the Gradle plugin. If you do not have variants, the
      credentials use an empty string.
    </p>
    <p>
      The Gradle plugin automatically uploads the appropriate ProGuard
      <code>mapping.txt</code> file at build time so you can view deobfuscated
      error stack traces. For more information, see the
      <a
        href="/real_user_monitoring/error_tracking/android/#upload-your-mapping-file"
        >Track Android Errors</a
      >.
    </p>
    <h4 id="sample-session-rates">Sample session rates</h4>
    <p>
      To control the data your application sends to Datadog, you can specify a
      sample rate for sessions when
      <a
        href="/real_user_monitoring/application_monitoring/android/advanced_configuration/#initialization-parameters"
        >initializing RUM</a
      >. The sample rate is a percentage between 0 and 100. By default,
      <code>sessionSamplingRate</code> is set to 100 (keep all sessions).
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">rumConfig</span> <span class="p">=</span> <span class="nc">RumConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span><span class="n">applicationId</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Here 75% of the RUM sessions are sent to Datadog
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="p">.</span><span class="n">setSessionSampleRate</span><span class="p">(</span><span class="m">75.0f</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">        <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">Rum</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">rumConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h4 id="set-tracking-consent--gdpr-compliance">
      Set tracking consent (GDPR compliance)
    </h4>
    <p>
      To be compliant with the GDPR regulation, the SDK requires the tracking
      consent value upon initialization.
    </p>
    <p>Tracking consent can be one of the following values:</p>
    <ul>
      <li>
        <code>TrackingConsent.PENDING</code>: (Default) The SDK starts
        collecting and batching the data but does not send it to the collection
        endpoint. The SDK waits for the new tracking consent value to decide
        what to do with the batched data.
      </li>
      <li>
        <code>TrackingConsent.GRANTED</code>: The SDK starts collecting the data
        and sends it to the data collection endpoint.
      </li>
      <li>
        <code>TrackingConsent.NOT_GRANTED</code>: The SDK does not collect any
        data. You are not able to manually send any logs, traces, or events.
      </li>
    </ul>
    <p>
      To <strong>update the tracking consent</strong> after the SDK is
      initialized, call
      <code>Datadog.setTrackingConsent(&lt;NEW CONSENT&gt;)</code>. The SDK
      changes its behavior according to the new consent. For example, if the
      current tracking consent is <code>TrackingConsent.PENDING</code> and you
      update it to:
    </p>
    <ul>
      <li>
        <code>TrackingConsent.GRANTED</code>: The SDK sends all current batched
        data and future data directly to the data collection endpoint.
      </li>
      <li>
        <code>TrackingConsent.NOT_GRANTED</code>: The SDK wipes all batched data
        and does not collect any future data.
      </li>
    </ul>
    <h3 id="step-4--enable-the-feature-to-start-sending-data">
      Step 4 - Enable the feature to start sending data
    </h3>
    <p>To enable the Android SDK to start sending data:</p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="kotlin"
          class="tab-pane fade"
          role="tabpanel"
          title="Kotlin"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-kotlin">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">rumConfig</span> <span class="p">=</span> <span class="nc">RumConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span><span class="n">applicationId</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">.</span><span class="n">trackInteractions</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="p">.</span><span class="n">trackLongTasks</span><span class="p">(</span><span class="n">durationThreshold</span><span class="p">)</span> <span class="c1">// Not applicable to Error Tracking
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="p">.</span><span class="n">useViewTrackingStrategy</span><span class="p">(</span><span class="n">strategy</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">Rum</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">rumConfig</span><span class="p">)</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="java"
          class="tab-pane fade"
          role="tabpanel"
          title="Java"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-java">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="n">RumConfiguration</span> <span class="n">rumConfig</span> <span class="o">=</span> <span class="k">new</span> <span class="n">RumConfiguration</span><span class="o">.</span><span class="na">Builder</span><span class="o">(</span><span class="n">applicationId</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">    <span class="o">.</span><span class="na">trackInteractions</span><span class="o">()</span>
</span></span><span class="line"><span class="cl">    <span class="o">.</span><span class="na">trackLongTasks</span><span class="o">(</span><span class="n">durationThreshold</span><span class="o">)</span> <span class="c1">// Not applicable to Error Tracking
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="o">.</span><span class="na">useViewTrackingStrategy</span><span class="o">(</span><span class="n">strategy</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">    <span class="o">.</span><span class="na">build</span><span class="o">();</span>
</span></span><span class="line"><span class="cl"><span class="n">Rum</span><span class="o">.</span><span class="na">enable</span><span class="o">(</span><span class="n">rumConfig</span><span class="o">);</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p>
      See
      <a
        href="/real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-views"
        ><code>ViewTrackingStrategy</code></a
      >
      to enable automatic tracking of all your views (activities, fragments, and
      more).
    </p>
    <h3 id="step-5--initialize-the-interceptor-to-track-network-events">
      Step 5 - Initialize the interceptor to track network events
    </h3>
    <p>To initialize an interceptor for tracking network events:</p>
    <ol>
      <li>
        For distributed tracing,
        <a href="/tracing/trace_collection/dd_libraries/android/"
          >add and enable the Trace feature</a
        >.
      </li>
      <li>
        Add the Gradle dependency to the
        <code>dd-sdk-android-okhttp</code> library in the module-level
        <code>build.gradle</code> file:
      </li>
    </ol>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-groovy">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">dependencies</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">implementation</span> <span class="s2">&#34;com.datadoghq:dd-sdk-android-okhttp:x.x.x&#34;</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <ol start="3">
      <li>
        To track your OkHttp requests as resources, add the provided
        <a href="https://square.github.io/okhttp/features/interceptors/"
          >interceptor</a
        >:
      </li>
    </ol>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="kotlin"
          class="tab-pane fade"
          role="tabpanel"
          title="Kotlin"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-kotlin">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">tracedHostsWithHeaderType</span> <span class="p">=</span> <span class="n">mapOf</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s2">&#34;example.com&#34;</span> <span class="n">to</span> <span class="n">setOf</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="nc">TracingHeaderType</span><span class="p">.</span><span class="n">DATADOG</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nc">TracingHeaderType</span><span class="p">.</span><span class="n">TRACECONTEXT</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">    <span class="s2">&#34;example.eu&#34;</span> <span class="n">to</span> <span class="n">setOf</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="nc">TracingHeaderType</span><span class="p">.</span><span class="n">DATADOG</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nc">TracingHeaderType</span><span class="p">.</span><span class="n">TRACECONTEXT</span><span class="p">))</span>
</span></span><span class="line"><span class="cl"><span class="k">val</span> <span class="py">okHttpClient</span> <span class="p">=</span> <span class="nc">OkHttpClient</span><span class="p">.</span><span class="n">Builder</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="p">.</span><span class="n">addInterceptor</span><span class="p">(</span><span class="nc">DatadogInterceptor</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span><span class="n">tracedHostsWithHeaderType</span><span class="p">).</span><span class="n">build</span><span class="p">())</span>
</span></span><span class="line"><span class="cl">    <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="java"
          class="tab-pane fade"
          role="tabpanel"
          title="Java"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-java">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="n">Map</span><span class="o">&lt;</span><span class="n">String</span><span class="o">,</span> <span class="n">Set</span><span class="o">&lt;</span><span class="n">TracingHeaderType</span><span class="o">&gt;&gt;</span> <span class="n">tracedHostsWithHeaderType</span> <span class="o">=</span> <span class="k">new</span> <span class="n">HashMap</span><span class="o">&lt;&gt;();</span>
</span></span><span class="line"><span class="cl"><span class="n">Set</span><span class="o">&lt;</span><span class="n">TracingHeaderType</span><span class="o">&gt;</span> <span class="n">datadogAndW3HeadersTypes</span> <span class="o">=</span> <span class="k">new</span> <span class="n">HashSet</span><span class="o">&lt;&gt;(</span><span class="n">Arrays</span><span class="o">.</span><span class="na">asList</span><span class="o">(</span><span class="n">TracingHeaderType</span><span class="o">.</span><span class="na">DATADOG</span><span class="o">,</span> <span class="n">TracingHeaderType</span><span class="o">.</span><span class="na">TRACECONTEXT</span><span class="o">));</span>
</span></span><span class="line"><span class="cl"><span class="n">tracedHostsWithHeaderType</span><span class="o">.</span><span class="na">put</span><span class="o">(</span><span class="s">&#34;example.com&#34;</span><span class="o">,</span> <span class="n">datadogAndW3HeadersTypes</span><span class="o">);</span>
</span></span><span class="line"><span class="cl"><span class="n">tracedHostsWithHeaderType</span><span class="o">.</span><span class="na">put</span><span class="o">(</span><span class="s">&#34;example.eu&#34;</span><span class="o">,</span> <span class="n">datadogAndW3HeadersTypes</span><span class="o">);</span>
</span></span><span class="line"><span class="cl"><span class="n">OkHttpClient</span> <span class="n">okHttpClient</span> <span class="o">=</span> <span class="k">new</span> <span class="n">OkHttpClient</span><span class="o">.</span><span class="na">Builder</span><span class="o">()</span>
</span></span><span class="line"><span class="cl">    <span class="o">.</span><span class="na">addInterceptor</span><span class="o">(</span><span class="k">new</span> <span class="n">DatadogInterceptor</span><span class="o">.</span><span class="na">Builder</span><span class="o">(</span><span class="n">tracedHostsWithHeaderType</span><span class="o">).</span><span class="na">build</span><span class="o">())</span>
</span></span><span class="line"><span class="cl">    <span class="o">.</span><span class="na">build</span><span class="o">();</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ol start="4">
      <li>
        <p>
          To automatically create RUM resources and spans for your OkHttp
          requests, use the <code>DatadogInterceptor</code> as an interceptor.
        </p>
        <ul>
          <li>
            This records each request processed by the
            <code>OkHttpClient</code> as a resource, with all the relevant
            information (URL, method, status code, and error) automatically
            filled in. Only the network requests that started when a view is
            active are tracked. To track requests when your application is in
            the background,
            <a
              href="/real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-views"
              >create a view manually</a
            >.
          </li>
        </ul>
      </li>
      <li>
        <p>
          To monitor the network redirects or retries, you can use the
          <code>DatadogInterceptor</code> as a
          <a
            href="https://square.github.io/okhttp/features/interceptors/#network-interceptors"
            >network interceptor</a
          >:
        </p>
      </li>
    </ol>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="kotlin"
          class="tab-pane fade"
          role="tabpanel"
          title="Kotlin"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-kotlin">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">okHttpClient</span> <span class="p">=</span> <span class="nc">OkHttpClient</span><span class="p">.</span><span class="n">Builder</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="p">.</span><span class="n">addNetworkInterceptor</span><span class="p">(</span><span class="nc">DatadogInterceptor</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span><span class="n">tracedHostsWithHeaderType</span><span class="p">).</span><span class="n">build</span><span class="p">())</span>
</span></span><span class="line"><span class="cl">    <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="java"
          class="tab-pane fade"
          role="tabpanel"
          title="Java"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-java">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="n">OkHttpClient</span> <span class="n">okHttpClient</span> <span class="o">=</span> <span class="k">new</span> <span class="n">OkHttpClient</span><span class="o">.</span><span class="na">Builder</span><span class="o">()</span>
</span></span><span class="line"><span class="cl">    <span class="o">.</span><span class="na">addNetworkInterceptor</span><span class="o">(</span><span class="k">new</span> <span class="n">DatadogInterceptor</span><span class="o">.</span><span class="na">Builder</span><span class="o">(</span><span class="n">tracedHostsWithHeaderType</span><span class="o">).</span><span class="na">build</span><span class="o">())</span>
</span></span><span class="line"><span class="cl">    <span class="o">.</span><span class="na">build</span><span class="o">();</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p><strong>Notes</strong>:</p>
    <ul>
      <li>
        To use spans but not RUM resources, you can use the
        <code>TracingInterceptor</code> instead of
        <code>DatadogInterceptor</code> as described above.
      </li>
      <li>
        If you use multiple interceptors, add
        <code>DatadogInterceptor</code> first.
      </li>
    </ul>
    <p>
      You can also add an <code>EventListener</code> for the
      <code>OkHttpClient</code> to
      <a
        href="/real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-network-requests"
        >automatically track resource timing</a
      >
      for third-party providers and network requests.
    </p>
    <p>
      To filter out specific errors reported by <code>DatadogInterceptor</code>,
      you can configure a custom <code>EventMapper</code> in your
      <code>RumConfiguration</code>:
    </p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="kotlin"
          class="tab-pane fade"
          role="tabpanel"
          title="Kotlin"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-kotlin">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">rumConfig</span> <span class="p">=</span> <span class="nc">RumConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span><span class="n">applicationId</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">.</span><span class="n">setErrorEventMapper</span> <span class="p">{</span> <span class="n">errorEvent</span> <span class="o">-&gt;</span>
</span></span><span class="line"><span class="cl">        <span class="k">if</span> <span class="p">(</span><span class="n">errorEvent</span><span class="p">.</span><span class="n">shouldBeDiscarded</span><span class="p">())</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="k">null</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="n">errorEvent</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">.</span><span class="n">build</span><span class="p">();</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="java"
          class="tab-pane fade"
          role="tabpanel"
          title="Java"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-java">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="n">RumConfiguration</span> <span class="n">rumConfig</span> <span class="o">=</span> <span class="k">new</span> <span class="n">RumConfiguration</span><span class="o">.</span><span class="na">Builder</span><span class="o">(</span><span class="s">&#34;applicationId&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">             <span class="o">.</span><span class="na">setErrorEventMapper</span><span class="o">(</span><span class="n">errorEvent</span> <span class="o">-&gt;</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">                 <span class="k">if</span> <span class="o">(</span><span class="n">errorEvent</span><span class="o">.</span><span class="na">shouldBeDiscarded</span><span class="o">())</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">                     <span class="k">return</span> <span class="kc">null</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">                 <span class="o">}</span> <span class="k">else</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">                     <span class="k">return</span> <span class="n">errorEvent</span><span class="o">;</span>
</span></span><span class="line"><span class="cl">                 <span class="o">}</span>
</span></span><span class="line"><span class="cl">             <span class="o">})</span>
</span></span><span class="line"><span class="cl">             <span class="o">.</span><span class="na">build</span><span class="o">();</span>
</span></span><span class="line"><span class="cl"> 
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h2 id="track-background-events">Track background events</h2>
    <p>
      You can track events such as crashes and network requests when your
      application is in the background (for example, no active view is
      available).
    </p>
    <p>Add the following snippet during configuration:</p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="kotlin"
          class="tab-pane fade"
          role="tabpanel"
          title="Kotlin"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-kotlin">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">rumConfig</span> <span class="p">=</span> <span class="nc">RumConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span><span class="n">applicationId</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// …
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="p">.</span><span class="n">trackBackgroundEvents</span><span class="p">(</span><span class="k">true</span><span class="p">)</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="java"
          class="tab-pane fade"
          role="tabpanel"
          title="Java"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-java">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="n">RumConfiguration</span> <span class="n">rumConfig</span> <span class="o">=</span> <span class="k">new</span> <span class="n">RumConfiguration</span><span class="o">.</span><span class="na">Builder</span><span class="o">(</span><span class="n">applicationId</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// …
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="o">.</span><span class="na">trackBackgroundEvents</span><span class="o">(</span><span class="kc">true</span><span class="o">)</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="alert alert-info">
      <p>
        Tracking background events may lead to additional sessions, which can
        impact billing. For questions,
        <a href="https://docs.datadoghq.com/help/">contact Datadog support</a>.
      </p>
    </div>
    <h2 id="sending-data-when-device-is-offline">
      Sending data when device is offline
    </h2>
    <p>
      The Android SDK helps ensure availability of data when your user device is
      offline. In case of low-network areas, or when the device battery is too
      low, all events are first stored on the local device in batches.
    </p>
    <p>
      Each batch follows the intake specification. Batches are sent as soon as
      the network is available, and the battery is high enough to ensure the
      Datadog SDK does not impact the end user's experience. If the network is
      not available while your application is in the foreground, or if an upload
      of data fails, the batch is kept until it can be sent successfully.
    </p>
    <p>
      This means that even if users open your application while offline, no data
      is lost. To ensure the SDK does not use too much disk space, the data on
      the disk is automatically discarded if it gets too old.
    </p>
    <h2 id="kotlin-extensions">Kotlin extensions</h2>
    <h3><code>Closeable</code> extension</h3>
    <p>
      You can monitor <code>Closeable</code> instance usage with the
      <code>useMonitored</code> method, which reports errors to Datadog and
      closes the resource afterwards.
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">closeable</span><span class="p">:</span> <span class="n">Closeable</span> <span class="p">=</span> <span class="o">..</span><span class="p">.</span>
</span></span><span class="line"><span class="cl"><span class="n">closeable</span><span class="p">.</span><span class="n">useMonitored</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Your code here
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="track-local-assets-as-resources">
      Track local assets as resources
    </h3>
    <p>
      You can track access to the assets by using
      <code>getAssetAsRumResource</code> extension method:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">inputStream</span> <span class="p">=</span> <span class="n">context</span><span class="p">.</span><span class="n">getAssetAsRumResource</span><span class="p">(</span><span class="n">fileName</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      Usage of the local resources can be tracked by using
      <code>getRawResAsRumResource</code> extension method:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">inputStream</span> <span class="p">=</span> <span class="n">context</span><span class="p">.</span><span class="n">getRawResAsRumResource</span><span class="p">(</span><span class="n">id</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h2 id="start-monitoring">Start monitoring</h2>
    <p>
      Visualize the
      <a href="/real_user_monitoring/android/data_collected/">data collected</a>
      in <a href="/real_user_monitoring/platform/dashboards/">dashboards</a> or
      create a search query in the
      <a href="https://app.datadoghq.com/rum/list">RUM Explorer</a>.
    </p>
    <p>
      Your application appears as pending on the Applications page until Datadog
      starts receiving data.
    </p>
    <h2 id="next-steps">Next steps</h2>
    <p>
      See
      <a
        href="/real_user_monitoring/application_monitoring/android/advanced_configuration/#initialization-parameters"
        >Advanced Configuration</a
      >.
    </p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is iOS"
    data-if="5592"
  >
    <p>
      This page describes how to instrument your iOS and tvOS applications for
      <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> with the
      iOS SDK. RUM includes Error Tracking by default, but if you have purchased
      Error Tracking as a standalone product, see the
      <a href="/error_tracking/">Error Tracking setup guide</a> for specific
      steps.
    </p>
    <h2 id="prerequisites">Prerequisites</h2>
    <p>Before you begin, ensure you have:</p>
    <ul>
      <li>Xcode 12.0 or later</li>
      <li>iOS 11.0+ or tvOS 11.0+ deployment target</li>
      <li>A Datadog account with RUM or Error Tracking enabled</li>
    </ul>
    <h2 id="setup">Setup</h2>
    <p><strong>Choose your setup method:</strong></p>
    <ul>
      <li>
        <strong
          ><a href="/error_tracking/"
            >Agentic Onboarding (in Preview)</a
          ></strong
        >: Use AI coding agents (Cursor, Claude Code) to automatically
        instrument your iOS application with one prompt. The agent detects your
        project structure and configures the RUM SDK for you.
      </li>
      <li>
        <strong>Manual setup</strong> (below): Follow the instructions to
        manually add and configure the RUM SDK in your iOS application.
      </li>
    </ul>
    <h3 id="manual-setup">Manual setup</h3>
    <p>
      To send RUM data from your iOS or tvOS application to Datadog, complete
      the following steps.
    </p>
    <h3 id="step-1--add-the-ios-sdk-as-a-dependency">
      Step 1 - Add the iOS SDK as a dependency
    </h3>
    <p>
      Add the iOS SDK to your project using your preferred package manager.
      Datadog recommends using Swift Package Manager (SPM).
    </p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="swift-package-manager--spm"
          class="tab-pane fade"
          role="tabpanel"
          title="Swift Package Manager (SPM)"
        >
          <p>
            To integrate using Apple's Swift Package Manager, add the following
            as a dependency to your <code>Package.swift</code>:
          </p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-swift">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="p">.</span><span class="n">package</span><span class="p">(</span><span class="n">url</span><span class="p">:</span> <span class="s">&#34;https://github.com/Datadog/dd-sdk-ios.git&#34;</span><span class="p">,</span> <span class="p">.</span><span class="n">upToNextMajor</span><span class="p">(</span><span class="n">from</span><span class="p">:</span> <span class="s">&#34;3.0.0&#34;</span><span class="p">))</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
          <p>In your project, link the following libraries:</p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-undefined">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">DatadogCore
</span></span><span class="line"><span class="cl">DatadogRUM
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="cocoapods"
          class="tab-pane fade"
          role="tabpanel"
          title="CocoaPods"
        >
          <p>
            You can use <a href="https://cocoapods.org/">CocoaPods</a> to
            install <code>dd-sdk-ios</code>:
          </p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-undefined">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">pod &#39;DatadogCore&#39;
</span></span><span class="line"><span class="cl">pod &#39;DatadogRUM&#39;
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="carthage"
          class="tab-pane fade"
          role="tabpanel"
          title="Carthage"
        >
          <p>
            You can use
            <a href="https://github.com/Carthage/Carthage">Carthage</a> to
            install <code>dd-sdk-ios</code>:
          </p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-undefined">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">github &#34;DataDog/dd-sdk-ios&#34;
</span></span></code></pre>
              </div>
            </div>
          </div>
          <div class="alert alert-info">
            <p>
              Datadog does not provide prebuilt Carthage binaries. This means
              Carthage builds the SDK from source.
            </p>
          </div>
          <p>To build and integrate the SDK, run:</p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-undefined">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">carthage bootstrap --use-xcframeworks --no-use-binaries
</span></span></code></pre>
              </div>
            </div>
          </div>
          <p>
            After building, add the following XCFrameworks to your Xcode project
            (in the &quot;Frameworks, Libraries, and Embedded Content&quot;
            section):
          </p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-undefined">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">DatadogInternal.xcframework
</span></span><span class="line"><span class="cl">DatadogCore.xcframework
</span></span><span class="line"><span class="cl">DatadogRUM.xcframework
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3 id="step-2--specify-application-details-in-the-ui">
      Step 2 - Specify application details in the UI
    </h3>
    <ol>
      <li>
        Navigate to
        <a href="https://app.datadoghq.com/rum/application/create"
          ><strong>Digital Experience</strong> &gt;
          <strong>Add an Application</strong></a
        >.
      </li>
      <li>
        Select <code>iOS</code> as the application type and enter an application
        name to generate a unique Datadog application ID and client token.
      </li>
      <li>
        To instrument your web views, click the
        <strong>Instrument your webviews</strong> toggle. For more information,
        see
        <a href="/real_user_monitoring/ios/web_view_tracking/"
          >Web View Tracking</a
        >.
      </li>
    </ol>
    <h3 id="step-3--initialize-the-library">Step 3 - Initialize the library</h3>
    <p>
      In the initialization snippet, set an environment name, service name, and
      client token.
    </p>
    <p>
      The SDK should be initialized as early as possible in the app lifecycle,
      specifically in the <code>AppDelegate</code>'s
      <code>application(_:didFinishLaunchingWithOptions:)</code> callback. The
      <code>AppDelegate</code> is your app's main entry point that handles app
      lifecycle events.
    </p>
    <p>
      This ensures the SDK can correctly capture all measurements, including
      application startup duration. For apps built with SwiftUI, you can use
      <code>@UIApplicationDelegateAdaptor</code> to hook into the
      <code>AppDelegate</code>.
    </p>
    <div class="alert alert-warning">
      <p>
        Initializing the SDK elsewhere (for example later during view loading)
        may result in inaccurate or missing telemetry, especially around app
        startup performance.
      </p>
    </div>
    <p>
      For more information, see
      <a href="/getting_started/tagging/using_tags/#rum--session-replay"
        >Using Tags</a
      >.
    </p>
    <div class="d-none site-region-container" data-region="us">
      <div class="code-tabs">
        <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">
          <div
            data-lang="swift"
            class="tab-pane fade"
            role="tabpanel"
            title="Swift"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-swift">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Initialize Datadog SDK with your configuration</span>
</span></span><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>  <span class="c1">// From Datadog UI</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>             <span class="c1">// for example, &#34;production&#34;, &#34;staging&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="n">service</span><span class="p">:</span> <span class="s">&#34;&lt;service name&gt;&#34;</span>        <span class="c1">// Your app&#39;s service name</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>  <span class="c1">// GDPR compliance setting</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div
            data-lang="objective-c"
            class="tab-pane fade"
            role="tabpanel"
            title="Objective-C"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-objective-c">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogCore</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Initialize Datadog SDK with your configuration
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">DDConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithClientToken</span><span class="p">:</span><span class="s">@&#34;&lt;client token&gt;&#34;</span> <span class="nl">env</span><span class="p">:</span><span class="s">@&#34;&lt;environment&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">service</span> <span class="o">=</span> <span class="s">@&#34;&lt;service name&gt;&#34;</span><span class="p">;</span>  <span class="c1">// Your app&#39;s service name
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDDatadog</span> <span class="nl">initializeWithConfiguration</span><span class="p">:</span><span class="n">configuration</span>
</span></span><span class="line"><span class="cl">                       <span class="nl">trackingConsent</span><span class="p">:</span><span class="n">trackingConsent</span><span class="p">];</span>  <span class="c1">// GDPR compliance setting
</span></span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-none site-region-container" data-region="eu">
      <div class="code-tabs">
        <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">
          <div
            data-lang="swift"
            class="tab-pane fade"
            role="tabpanel"
            title="Swift"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-swift">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">site</span><span class="p">:</span> <span class="p">.</span><span class="n">eu1</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">service</span><span class="p">:</span> <span class="s">&#34;&lt;service name&gt;&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div
            data-lang="objective-c"
            class="tab-pane fade"
            role="tabpanel"
            title="Objective-C"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-objective-c">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogCore</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">DDConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithClientToken</span><span class="p">:</span><span class="s">@&#34;&lt;client token&gt;&#34;</span> <span class="nl">env</span><span class="p">:</span><span class="s">@&#34;&lt;environment&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">service</span> <span class="o">=</span> <span class="s">@&#34;&lt;service name&gt;&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">site</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDSite</span> <span class="n">eu1</span><span class="p">];</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDDatadog</span> <span class="nl">initializeWithConfiguration</span><span class="p">:</span><span class="n">configuration</span>
</span></span><span class="line"><span class="cl">                       <span class="nl">trackingConsent</span><span class="p">:</span><span class="n">trackingConsent</span><span class="p">];</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-none site-region-container" data-region="us3">
      <div class="code-tabs">
        <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">
          <div
            data-lang="swift"
            class="tab-pane fade"
            role="tabpanel"
            title="Swift"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-swift">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">site</span><span class="p">:</span> <span class="p">.</span><span class="n">us3</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">service</span><span class="p">:</span> <span class="s">&#34;&lt;service name&gt;&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div
            data-lang="objective-c"
            class="tab-pane fade"
            role="tabpanel"
            title="Objective-C"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-objective-c">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogCore</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">DDConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithClientToken</span><span class="p">:</span><span class="s">@&#34;&lt;client token&gt;&#34;</span> <span class="nl">env</span><span class="p">:</span><span class="s">@&#34;&lt;environment&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">service</span> <span class="o">=</span> <span class="s">@&#34;&lt;service name&gt;&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">site</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDSite</span> <span class="n">us3</span><span class="p">];</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDDatadog</span> <span class="nl">initializeWithConfiguration</span><span class="p">:</span><span class="n">configuration</span>
</span></span><span class="line"><span class="cl">                       <span class="nl">trackingConsent</span><span class="p">:</span><span class="n">trackingConsent</span><span class="p">];</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-none site-region-container" data-region="us5">
      <div class="code-tabs">
        <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">
          <div
            data-lang="swift"
            class="tab-pane fade"
            role="tabpanel"
            title="Swift"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-swift">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">site</span><span class="p">:</span> <span class="p">.</span><span class="n">us5</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">service</span><span class="p">:</span> <span class="s">&#34;&lt;service name&gt;&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div
            data-lang="objective-c"
            class="tab-pane fade"
            role="tabpanel"
            title="Objective-C"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-objective-c">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogCore</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">DDConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithClientToken</span><span class="p">:</span><span class="s">@&#34;&lt;client token&gt;&#34;</span> <span class="nl">env</span><span class="p">:</span><span class="s">@&#34;&lt;environment&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">service</span> <span class="o">=</span> <span class="s">@&#34;&lt;service name&gt;&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">site</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDSite</span> <span class="n">us5</span><span class="p">];</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDDatadog</span> <span class="nl">initializeWithConfiguration</span><span class="p">:</span><span class="n">configuration</span>
</span></span><span class="line"><span class="cl">                       <span class="nl">trackingConsent</span><span class="p">:</span><span class="n">trackingConsent</span><span class="p">];</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-none site-region-container" data-region="gov">
      <div class="code-tabs">
        <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">
          <div
            data-lang="swift"
            class="tab-pane fade"
            role="tabpanel"
            title="Swift"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-swift">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">site</span><span class="p">:</span> <span class="p">.</span><span class="n">us1_fed</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">service</span><span class="p">:</span> <span class="s">&#34;&lt;service name&gt;&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div
            data-lang="objective-c"
            class="tab-pane fade"
            role="tabpanel"
            title="Objective-C"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-objective-c">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogCore</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">DDConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithClientToken</span><span class="p">:</span><span class="s">@&#34;&lt;client token&gt;&#34;</span> <span class="nl">env</span><span class="p">:</span><span class="s">@&#34;&lt;environment&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">service</span> <span class="o">=</span> <span class="s">@&#34;&lt;service name&gt;&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">site</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDSite</span> <span class="n">us1_fed</span><span class="p">];</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDDatadog</span> <span class="nl">initializeWithConfiguration</span><span class="p">:</span><span class="n">configuration</span>
</span></span><span class="line"><span class="cl">                       <span class="nl">trackingConsent</span><span class="p">:</span><span class="n">trackingConsent</span><span class="p">];</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-none site-region-container" data-region="ap1">
      <div class="code-tabs">
        <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">
          <div
            data-lang="swift"
            class="tab-pane fade"
            role="tabpanel"
            title="Swift"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-swift">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">site</span><span class="p">:</span> <span class="p">.</span><span class="n">ap1</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">service</span><span class="p">:</span> <span class="s">&#34;&lt;service name&gt;&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div
            data-lang="objective-c"
            class="tab-pane fade"
            role="tabpanel"
            title="Objective-C"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-objective-c">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogCore</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">DDConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithClientToken</span><span class="p">:</span><span class="s">@&#34;&lt;client token&gt;&#34;</span> <span class="nl">env</span><span class="p">:</span><span class="s">@&#34;&lt;environment&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">service</span> <span class="o">=</span> <span class="s">@&#34;&lt;service name&gt;&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">site</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDSite</span> <span class="n">ap1</span><span class="p">];</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDDatadog</span> <span class="nl">initializeWithConfiguration</span><span class="p">:</span><span class="n">configuration</span>
</span></span><span class="line"><span class="cl">                       <span class="nl">trackingConsent</span><span class="p">:</span><span class="n">trackingConsent</span><span class="p">];</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-none site-region-container" data-region="ap2">
      <div class="code-tabs">
        <ul class="nav nav-tabs d-flex"></ul>
        <div class="tab-content">
          <div
            data-lang="swift"
            class="tab-pane fade"
            role="tabpanel"
            title="Swift"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-swift">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">site</span><span class="p">:</span> <span class="p">.</span><span class="n">ap2</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">service</span><span class="p">:</span> <span class="s">&#34;&lt;service name&gt;&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div
            data-lang="objective-c"
            class="tab-pane fade"
            role="tabpanel"
            title="Objective-C"
          >
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-objective-c">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogCore</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">DDConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithClientToken</span><span class="p">:</span><span class="s">@&#34;&lt;client token&gt;&#34;</span> <span class="nl">env</span><span class="p">:</span><span class="s">@&#34;&lt;environment&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">service</span> <span class="o">=</span> <span class="s">@&#34;&lt;service name&gt;&#34;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">site</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDSite</span> <span class="n">ap2</span><span class="p">];</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDDatadog</span> <span class="nl">initializeWithConfiguration</span><span class="p">:</span><span class="n">configuration</span>
</span></span><span class="line"><span class="cl">                       <span class="nl">trackingConsent</span><span class="p">:</span><span class="n">trackingConsent</span><span class="p">];</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p>
      The iOS SDK automatically tracks user sessions based on the options you
      provide during SDK initialization. To add GDPR compliance for your EU
      users (required for apps targeting European users) and configure other
      <a
        href="/real_user_monitoring/ios/advanced_configuration/#initialization-parameters"
        >initialization parameters</a
      >, see the
      <a href="#set-tracking-consent-gdpr-compliance"
        >Set tracking consent documentation</a
      >.
    </p>
    <h4 id="sample-session-rates">Sample session rates</h4>
    <p>
      To control the data your application sends to Datadog RUM, you can specify
      a sampling rate for RUM sessions while
      <a href="https://github.com/DataDog/dd-sdk-ios"
        >initializing the RUM iOS SDK</a
      >. The rate is a percentage between 0 and 100. By default,
      <code>sessionSamplingRate</code> is set to 100 (keep all sessions).
    </p>
    <p>For example, to only keep 50% of sessions use:</p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="swift"
          class="tab-pane fade"
          role="tabpanel"
          title="Swift"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-swift">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="c1">// Configure RUM with 50% session sampling</span>
</span></span><span class="line"><span class="cl"><span class="kd">let</span> <span class="nv">configuration</span> <span class="p">=</span> <span class="n">RUM</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">applicationID</span><span class="p">:</span> <span class="s">&#34;&lt;rum application id&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">sessionSampleRate</span><span class="p">:</span> <span class="mi">50</span>  <span class="c1">// Only track 50% of user sessions</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="objective-c"
          class="tab-pane fade"
          role="tabpanel"
          title="Objective-C"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-objective-c">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="c1">// Configure RUM with 50% session sampling
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">DDRUMConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDRUMConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithApplicationID</span><span class="p">:</span><span class="s">@&#34;&lt;rum application id&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">sessionSampleRate</span> <span class="o">=</span> <span class="mi">50</span><span class="p">;</span>  <span class="c1">// Only track 50% of user sessions
</span></span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4 id="set-tracking-consent--gdpr-compliance">
      Set tracking consent (GDPR compliance)
    </h4>
    <p>
      To be compliant with the GDPR regulation (required for apps targeting
      European users), the iOS SDK requires the tracking consent value at
      initialization.
    </p>
    <p>
      The <code>trackingConsent</code> setting can be one of the following
      values:
    </p>
    <ol>
      <li>
        <code>.pending</code>: The iOS SDK starts collecting and batching the
        data but does not send it to Datadog. The iOS SDK waits for the new
        tracking consent value to decide what to do with the batched data.
      </li>
      <li>
        <code>.granted</code>: The iOS SDK starts collecting the data and sends
        it to Datadog.
      </li>
      <li>
        <code>.notGranted</code>: The iOS SDK does not collect any data. No
        logs, traces, or events are sent to Datadog.
      </li>
    </ol>
    <p>
      To <strong>change the tracking consent value</strong> after the iOS SDK is
      initialized, use the <code>Datadog.set(trackingConsent:)</code> API call.
      The iOS SDK changes its behavior according to the new value.
    </p>
    <p>
      For example, if the current tracking consent is <code>.pending</code>:
    </p>
    <ul>
      <li>
        If you change the value to <code>.granted</code>, the RUM iOS SDK sends
        all current and future data to Datadog;
      </li>
      <li>
        If you change the value to <code>.notGranted</code>, the RUM iOS SDK
        wipes all current data and does not collect future data.
      </li>
    </ul>
    <h3 id="step-4--start-sending-data">Step 4 - Start sending data</h3>
    <h4 id="enable-rum">Enable RUM</h4>
    <p>
      Configure and start RUM. This should be done once and as early as
      possible, specifically in your <code>AppDelegate</code>:
    </p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="swift"
          class="tab-pane fade"
          role="tabpanel"
          title="Swift"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-swift">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogRUM</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">RUM</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">RUM</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">applicationID</span><span class="p">:</span> <span class="s">&#34;&lt;rum application id&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">uiKitViewsPredicate</span><span class="p">:</span> <span class="n">DefaultUIKitRUMViewsPredicate</span><span class="p">(),</span>
</span></span><span class="line"><span class="cl">    <span class="n">uiKitActionsPredicate</span><span class="p">:</span> <span class="n">DefaultUIKitRUMActionsPredicate</span><span class="p">(),</span>
</span></span><span class="line"><span class="cl">    <span class="n">swiftUIViewsPredicate</span><span class="p">:</span> <span class="n">DefaultSwiftUIRUMViewsPredicate</span><span class="p">(),</span>
</span></span><span class="line"><span class="cl">    <span class="n">swiftUIActionsPredicate</span><span class="p">:</span> <span class="n">DefaultSwiftUIRUMActionsPredicate</span><span class="p">(</span><span class="n">isLegacyDetectionEnabled</span><span class="p">:</span> <span class="kc">true</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">    <span class="n">urlSessionTracking</span><span class="p">:</span> <span class="n">RUM</span><span class="p">.</span><span class="n">Configuration</span><span class="p">.</span><span class="n">URLSessionTracking</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">  <span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="objective-c"
          class="tab-pane fade"
          role="tabpanel"
          title="Objective-C"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-objective-c">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="p">@</span><span class="n">import</span> <span class="n">DatadogRUM</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">DDRUMConfiguration</span> <span class="o">*</span><span class="n">configuration</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDRUMConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithApplicationID</span><span class="p">:</span><span class="s">@&#34;&lt;rum application id&gt;&#34;</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">uiKitViewsPredicate</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDDefaultUIKitRUMViewsPredicate</span> <span class="n">new</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">uiKitActionsPredicate</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDDefaultUIKitRUMActionsPredicate</span> <span class="n">new</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">swiftUIViewsPredicate</span> <span class="o">=</span> <span class="p">[</span><span class="n">DDDefaultSwiftUIRUMViewsPredicate</span> <span class="n">new</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="n">configuration</span><span class="p">.</span><span class="n">swiftUIActionsPredicate</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDDefaultSwiftUIRUMActionsPredicate</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithIsLegacyDetectionEnabled</span><span class="p">:</span><span class="nb">YES</span><span class="p">];</span>
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">configuration</span> <span class="nl">setURLSessionTracking</span><span class="p">:[</span><span class="n">DDRUMURLSessionTracking</span> <span class="n">new</span><span class="p">]];</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDRUM</span> <span class="nl">enableWith</span><span class="p">:</span><span class="n">configuration</span><span class="p">];</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4 id="enable-">Enable <code>URLSessionInstrumentation</code></h4>
    <p>
      To monitor requests sent from the <code>URLSession</code> instance as
      resources, enable <code>URLSessionInstrumentation</code> for your delegate
      type and pass the delegate instance to the <code>URLSession</code>:
    </p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="swift"
          class="tab-pane fade"
          role="tabpanel"
          title="Swift"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-swift">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="n">URLSessionInstrumentation</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">with</span><span class="p">:</span> <span class="p">.</span><span class="kd">init</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="n">delegateClass</span><span class="p">:</span> <span class="p">&lt;</span><span class="n">YourSessionDelegate</span><span class="p">&gt;.</span><span class="kc">self</span>
</span></span><span class="line"><span class="cl">    <span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">let</span> <span class="nv">session</span> <span class="p">=</span> <span class="n">URLSession</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">configuration</span><span class="p">:</span> <span class="p">.</span><span class="k">default</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">delegate</span><span class="p">:</span> <span class="p">&lt;</span><span class="n">YourSessionDelegate</span><span class="p">&gt;(),</span>
</span></span><span class="line"><span class="cl">    <span class="n">delegateQueue</span><span class="p">:</span> <span class="kc">nil</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
        <div
          data-lang="objective-c"
          class="tab-pane fade"
          role="tabpanel"
          title="Objective-C"
        >
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-objective-c">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="n">DDURLSessionInstrumentationConfiguration</span> <span class="o">*</span><span class="n">config</span> <span class="o">=</span> <span class="p">[[</span><span class="n">DDURLSessionInstrumentationConfiguration</span> <span class="n">alloc</span><span class="p">]</span> <span class="nl">initWithDelegateClass</span><span class="p">:[</span><span class="o">&lt;</span><span class="n">YourSessionDelegate</span><span class="o">&gt;</span> <span class="k">class</span><span class="p">]];</span>
</span></span><span class="line"><span class="cl"><span class="p">[</span><span class="n">DDURLSessionInstrumentation</span> <span class="nl">enableWithConfiguration</span><span class="p">:</span><span class="n">config</span><span class="p">];</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">NSURLSession</span> <span class="o">*</span><span class="n">session</span> <span class="o">=</span> <span class="p">[</span><span class="n">NSURLSession</span> <span class="nl">sessionWithConfiguration</span><span class="p">:[</span><span class="n">NSURLSessionConfiguration</span> <span class="n">defaultSessionConfiguration</span><span class="p">]</span>
</span></span><span class="line"><span class="cl">                                                      <span class="nl">delegate</span><span class="p">:[[</span><span class="o">&lt;</span><span class="n">YourSessionDelegate</span><span class="o">&gt;</span> <span class="n">alloc</span><span class="p">]</span> <span class="n">init</span><span class="p">]</span>
</span></span><span class="line"><span class="cl">                                                 <span class="nl">delegateQueue</span><span class="p">:</span><span class="nb">nil</span><span class="p">];</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3 id="instrument-views">Instrument views</h3>
    <p>
      The Datadog iOS SDK allows you to instrument views of
      <code>SwiftUI</code> applications. The instrumentation also works with
      hybrid <code>UIKit</code> and <code>SwiftUI</code> applications.
    </p>
    <p>
      To instrument a <code>SwiftUI.View</code>, add the following method to
      your view declaration:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-swift">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">SwiftUI</span>
</span></span><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogRUM</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">struct</span> <span class="nc">FooView</span><span class="p">:</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="kd">var</span> <span class="nv">body</span><span class="p">:</span> <span class="n">some</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="n">FooContent</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="p">...</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span>
</span></span><span class="line"><span class="cl">        <span class="p">.</span><span class="n">trackRUMView</span><span class="p">(</span><span class="n">name</span><span class="p">:</span> <span class="s">&#34;Foo&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      The <code>trackRUMView(name:)</code> method starts and stops a view when
      the <code>SwiftUI</code> view appears and disappears from the screen.
    </p>
    <h3 id="instrument-tap-actions">Instrument tap actions</h3>
    <p>
      The Datadog iOS SDK allows you to instrument tap actions of
      <code>SwiftUI</code> applications. The instrumentation also works with
      hybrid <code>UIKit</code> and <code>SwiftUI</code> applications.
    </p>
    <div class="alert alert-warning">
      <p>
        Using <code>.trackRUMTapAction(name:)</code> for
        <code>SwiftUI</code> controls inside a <code>List</code> can break its
        default gestures. For example, it may disable the
        <code>Button</code> action or break <code>NavigationLink</code>. To
        track taps in a <code>List</code> element, use the
        <a
          href="/real_user_monitoring/application_monitoring/ios/advanced_configuration#custom-actions"
          >Custom Actions</a
        >
        API instead.
      </p>
    </div>
    <p>
      To instrument a tap action on a <code>SwiftUI.View</code>, add the
      following method to your view declaration:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-swift">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">SwiftUI</span>
</span></span><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogRUM</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">struct</span> <span class="nc">BarView</span><span class="p">:</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="kd">var</span> <span class="nv">body</span><span class="p">:</span> <span class="n">some</span> <span class="n">View</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="n">Button</span><span class="p">(</span><span class="s">&#34;BarButton&#34;</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="c1">// Your button action here</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span>
</span></span><span class="line"><span class="cl">        <span class="p">.</span><span class="n">trackRUMTapAction</span><span class="p">(</span><span class="n">name</span><span class="p">:</span> <span class="s">&#34;Bar&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h2 id="track-ios-errors">Track iOS errors</h2>
    <p>
      <a href="/error_tracking/frontend/mobile/ios"
        >iOS Crash Reporting and Error Tracking</a
      >
      displays any issues in your application and the latest available errors.
      You can view error details and attributes including JSON in the
      <a href="/real_user_monitoring/explorer/">RUM Explorer</a>.
    </p>
    <h2 id="disable-automatic-user-data-collection">
      Disable automatic user data collection
    </h2>
    <p>
      You may want to disable automatic collection of user data to comply with
      privacy regulations or organizational data governance policies.
    </p>
    <p>
      To disable automatic user data collection for client IP or geolocation
      data:
    </p>
    <ol>
      <li>
        After creating your application, go to the
        <a href="https://app.datadoghq.com/rum/application/"
          >Application Management</a
        >
        page and click your application.
      </li>
      <li>Click <strong>User Data Collection</strong>.</li>
      <li>
        Use the toggles for those settings. For more information, see
        <a href="/real_user_monitoring/ios/data_collected/"
          >RUM iOS Data Collected</a
        >.
      </li>
    </ol>
    <p>
      To ensure the safety of your data, you must use a client token. Using only
      <a href="https://cocoapods.org/">Datadog API keys</a> to configure the
      <code>dd-sdk-ios</code> library would expose them client-side in your iOS
      application's byte code.
    </p>
    <p>
      For more information about setting up a client token, see the
      <a href="https://github.com/Carthage/Carthage"
        >Client token documentation</a
      >.
    </p>
    <h2 id="sending-data-when-device-is-offline">
      Sending data when device is offline
    </h2>
    <p>
      The iOS SDK ensures availability of data when your user device is offline.
      In cases of low-network areas, or when the device battery is too low, all
      events are first stored on the local device in batches. They are sent as
      soon as the network is available, and the battery is high enough to ensure
      the iOS SDK does not impact the end user's experience. If the network is
      not available while your application is in the foreground, or if an upload
      of data fails, the batch is kept until it can be sent successfully.
    </p>
    <p>
      This means that even if users open your application while offline, no data
      is lost.
    </p>
    <p>
      <strong>Note</strong>: The data on the disk is automatically discarded if
      it gets too old to ensure the iOS SDK does not use too much disk space.
    </p>
    <h2 id="supported-versions">Supported versions</h2>
    <p>
      See
      <a
        href="/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/"
        >Supported versions</a
      >
      for a list of operating system versions and platforms that are compatible
      with the iOS SDK.
    </p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Flutter"
    data-if="5593"
  >
    <p>
      This page describes how to instrument your applications for
      <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> with the
      Flutter SDK. RUM includes Error Tracking by default, but if you have
      purchased Error Tracking as a standalone product, see the
      <a href="/error_tracking/frontend/mobile/flutter/"
        >Error Tracking setup guide</a
      >
      for specific steps.
    </p>
    <h2 id="setup">Setup</h2>
    <h3 id="step-1--specify-application-details-in-the-ui">
      Step 1 - Specify application details in the UI
    </h3>
    <ol>
      <li>
        In Datadog, navigate to
        <a href="https://app.datadoghq.com/rum/application/create"
          ><strong>Digital Experience</strong> &gt;
          <strong>Add an Application</strong></a
        >.
      </li>
      <li>Choose <code>Flutter</code> as the application type.</li>
      <li>
        Provide an application name to generate a unique Datadog application ID
        and client token.
      </li>
    </ol>
    <p>
      To secure your data, you must use a client token. For more information
      about setting up a client token, see the
      <a href="/account_management/api-app-keys/#client-tokens"
        >Client Token documentation</a
      >.
    </p>
    <h3 id="step-2--instrument-your-application">
      Step 2 - Instrument your application
    </h3>
    <p>
      First, make sure you have your environment set up properly for each
      platform.
    </p>
    <div class="alert alert-info">
      <p>
        Datadog supports Flutter Monitoring for iOS, Android, and Web for
        Flutter 3.27+.
      </p>
    </div>
    <p>
      Datadog supports Flutter Web starting with v3 of the SDK, with a few known
      limitations.
    </p>
    <ul>
      <li>
        Long running actions (<code>startAction</code> and
        <code>stopAction</code>) are not supported
      </li>
      <li>
        Actions (<code>addAction</code>) and manually reported Resources (<code
          >startResource</code
        >
        and <code>stopResource</code>) do not properly associate with Errors or
        Actions.
      </li>
      <li>Event mappers are not supported.</li>
    </ul>
    <h4 id="ios">iOS</h4>
    <p>
      The Datadog SDK for Flutter supports integration with both Cocoapods and
      Swift Package Manager (SPM).
    </p>
    <p>
      If you are using Cocoapods, your iOS Podfile, located in
      <code>ios/Podfile</code>, must have <code>use_frameworks!</code> set to
      true (which is the default in Flutter) and must set its target iOS version
      &gt;= 12.0.
    </p>
    <p>
      This constraint is usually commented out on the top line of the Podfile,
      and should read:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-ruby">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">platform</span> <span class="ss">:ios</span><span class="p">,</span> <span class="s1">&#39;12.0&#39;</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      You can replace <code>12.0</code> with any minimum version of iOS you want
      to support that is 12.0 or higher.
    </p>
    <h4 id="android">Android</h4>
    <p>
      For Android, your <code>minSdkVersion</code> version must be &gt;= 23, and
      your <code>compileSdkVersion</code> must be &gt;= 35. Clients using
      Flutter after 3.27 usually have these variables set to Flutter constants
      (<code>flutter.minSdkVersion</code> and
      <code>flutter.compileSdkVersion</code>), and they do not have to be
      manually changed.
    </p>
    <p>
      If you are using Kotlin, it should be a version &gt;= 2.1.0. Flutter
      versions above 3.27 emit a warning stating that older versions of Kotlin
      are not supported, and provide instructions for updating.
    </p>
    <p>
      These constraints are usually held in your
      <code>android/app/build.gradle</code> file, or in your
      <code>android/gradle.properties</code> file.
    </p>
    <h4 id="web">Web</h4>
    <p>
      For Web, add the following to your <code>index.html</code> under the
      <code>head</code> tag:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-html">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="p">&lt;</span><span class="nt">script</span> <span class="na">type</span><span class="o">=</span><span class="s">&#34;text/javascript&#34;</span> <span class="na">src</span><span class="o">=</span><span class="s">&#34;https://www.datadoghq-browser-agent.com/<span class="cdoc js-region-param region-param" data-region-param="flutter_web_logs_cdn_path"></span>&#34;</span><span class="p">&gt;&lt;/</span><span class="nt">script</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="p">&lt;</span><span class="nt">script</span> <span class="na">type</span><span class="o">=</span><span class="s">&#34;text/javascript&#34;</span> <span class="na">src</span><span class="o">=</span><span class="s">&#34;https://www.datadoghq-browser-agent.com/<span class="cdoc js-region-param region-param" data-region-param="flutter_web_rum_cdn_path"></span>&#34;</span><span class="p">&gt;&lt;/</span><span class="nt">script</span><span class="p">&gt;</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      This loads the CDN-delivered Datadog Browser SDKs for Logs and RUM. The
      synchronous CDN-delivered version of the Browser SDK is the only version
      supported by the Datadog Flutter Plugin.
    </p>
    <h4 id="add-the-plugin">Add the plugin</h4>
    <ol>
      <li>Add the following to your <code>pubspec.yaml</code> file:</li>
    </ol>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-yaml">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="nt">dependencies</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">datadog_flutter_plugin</span><span class="p">:</span><span class="w"> </span><span class="l">^3.0.0</span><span class="w">
</span></span></span></code></pre>
        </div>
      </div>
    </div>
    <ol start="2">
      <li>
        Create a configuration object for each Datadog feature (such as Logs or
        RUM) with the following snippet. If you do not pass a configuration for
        a given feature, that feature is disabled.
      </li>
    </ol>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="c1">// Determine the user&#39;s consent to be tracked
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kd">final</span> <span class="n">trackingConsent</span> <span class="o">=</span> <span class="p">...</span>
</span></span><span class="line"><span class="cl"><span class="kd">final</span> <span class="n">configuration</span> <span class="o">=</span> <span class="n">DatadogConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="nl">clientToken:</span> <span class="s1">&#39;&lt;CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nl">env:</span> <span class="s1">&#39;&lt;ENV_NAME&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nl">site:</span> <span class="n">DatadogSite</span><span class="p">.</span><span class="n">us1</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nl">nativeCrashReportEnabled:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nl">loggingConfiguration:</span> <span class="n">DatadogLoggingConfiguration</span><span class="p">(),</span>
</span></span><span class="line"><span class="cl">  <span class="nl">rumConfiguration:</span> <span class="n">DatadogRumConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="nl">applicationId:</span> <span class="s1">&#39;&lt;RUM_APPLICATION_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      For more information on available configuration options, see the
      <a
        href="https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration-class.html"
        >DatadogConfiguration object documentation</a
      >.
    </p>
    <p>
      To secure data, you must use a client token. You cannot use Datadog API
      keys to configure the Datadog
      <a
        href="https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html"
        >Flutter Plugin</a
      >.
    </p>
    <ul>
      <li>
        If you are using RUM, set up a <strong>Client Token</strong> and
        <strong>Application ID</strong>.
      </li>
      <li>
        If you are only using Logs, initialize the library with a client token.
      </li>
    </ul>
    <h3 id="step-3--initialize-the-library">Step 3 - Initialize the library</h3>
    <p>
      You can initialize the library using one of two methods in your
      <code>main.dart</code> file.
    </p>
    <ul>
      <li>
        Use <code>DatadogSdk.runApp</code> to automatically set up
        <a href="/real_user_monitoring/error_tracking/flutter">Error Tracking</a
        >.
      </li>
    </ul>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kd">await</span> <span class="n">DatadogSdk</span><span class="p">.</span><span class="n">runApp</span><span class="p">(</span><span class="n">configuration</span><span class="p">,</span> <span class="n">TrackingConsent</span><span class="p">.</span><span class="n">granted</span><span class="p">,</span> <span class="p">()</span> <span class="kd">async</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="n">runApp</span><span class="p">(</span><span class="kd">const</span> <span class="n">MyApp</span><span class="p">());</span>
</span></span><span class="line"><span class="cl"><span class="p">})</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <ul>
      <li>
        You can also manually set up
        <a href="/real_user_monitoring/error_tracking/flutter">Error Tracking</a
        >. <code>DatadogSdk.runApp</code> calls
        <code>WidgetsFlutterBinding.ensureInitialized</code>, so if you are not
        using <code>DatadogSdk.runApp</code>, you need to call this method prior
        to calling <code>DatadogSdk.instance.initialize</code>.
      </li>
    </ul>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">WidgetsFlutterBinding</span><span class="p">.</span><span class="n">ensureInitialized</span><span class="p">();</span>
</span></span><span class="line"><span class="cl"><span class="kd">final</span> <span class="n">originalOnError</span> <span class="o">=</span> <span class="n">FlutterError</span><span class="p">.</span><span class="n">onError</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="n">FlutterError</span><span class="p">.</span><span class="n">onError</span> <span class="o">=</span> <span class="p">(</span><span class="n">details</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="n">DatadogSdk</span><span class="p">.</span><span class="n">instance</span><span class="p">.</span><span class="n">rum</span><span class="o">?</span><span class="p">.</span><span class="n">handleFlutterError</span><span class="p">(</span><span class="n">details</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">  <span class="n">originalOnError</span><span class="o">?</span><span class="p">.</span><span class="n">call</span><span class="p">(</span><span class="n">details</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">};</span>
</span></span><span class="line"><span class="cl"><span class="kd">final</span> <span class="n">platformOriginalOnError</span> <span class="o">=</span> <span class="n">PlatformDispatcher</span><span class="p">.</span><span class="n">instance</span><span class="p">.</span><span class="n">onError</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="n">PlatformDispatcher</span><span class="p">.</span><span class="n">instance</span><span class="p">.</span><span class="n">onError</span> <span class="o">=</span> <span class="p">(</span><span class="n">e</span><span class="p">,</span> <span class="n">st</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="n">DatadogSdk</span><span class="p">.</span><span class="n">instance</span><span class="p">.</span><span class="n">rum</span><span class="o">?</span><span class="p">.</span><span class="n">addErrorInfo</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">e</span><span class="p">.</span><span class="n">toString</span><span class="p">(),</span>
</span></span><span class="line"><span class="cl">    <span class="n">RumErrorSource</span><span class="p">.</span><span class="k">source</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nl">stackTrace:</span> <span class="n">st</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="p">);</span>
</span></span><span class="line"><span class="cl">  <span class="k">return</span> <span class="n">platformOriginalOnError</span><span class="o">?</span><span class="p">.</span><span class="n">call</span><span class="p">(</span><span class="n">e</span><span class="p">,</span> <span class="n">st</span><span class="p">)</span> <span class="o">??</span> <span class="kc">false</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="p">};</span>
</span></span><span class="line"><span class="cl"><span class="kd">await</span> <span class="n">DatadogSdk</span><span class="p">.</span><span class="n">instance</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span><span class="n">configuration</span><span class="p">,</span> <span class="n">TrackingConsent</span><span class="p">.</span><span class="n">granted</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="n">runApp</span><span class="p">(</span><span class="kd">const</span> <span class="n">MyApp</span><span class="p">());</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h4 id="sample-session-rates">Sample session rates</h4>
    <p>
      To control the data your application sends to Datadog RUM, you can specify
      a sampling rate for RUM sessions while initializing the Flutter RUM SDK.
      The rate is a percentage between 0 and 100. By default,
      <code>sessionSamplingRate</code> is set to 100 (keep all sessions).
    </p>
    <p>For example, to keep only 50% of sessions, use:</p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kd">final</span> <span class="n">config</span> <span class="o">=</span> <span class="n">DatadogConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// other configuration...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nl">rumConfiguration:</span> <span class="n">DatadogRumConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="nl">applicationId:</span> <span class="s1">&#39;&lt;YOUR_APPLICATION_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nl">sessionSamplingRate:</span> <span class="m">50.0</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="p">),</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h4 id="set-tracking-consent--gdpr-compliance">
      Set tracking consent (GDPR compliance)
    </h4>
    <p>
      To be compliant with the GDPR regulation, the Datadog Flutter SDK requires
      the <code>trackingConsent</code> value during initialization.
    </p>
    <p>Set <code>trackingConsent</code> to one of the following values:</p>
    <ul>
      <li>
        <code>TrackingConsent.pending</code>: The Datadog Flutter SDK starts
        collecting and batching the data but does not send it to Datadog. It
        waits for the new tracking consent value to decide what to do with the
        batched data.
      </li>
      <li>
        <code>TrackingConsent.granted</code>: The Datadog Flutter SDK starts
        collecting the data and sends it to Datadog.
      </li>
      <li>
        <code>TrackingConsent.notGranted</code>: The Datadog Flutter SDK does
        not collect any data, which means no logs, traces, or events are sent to
        Datadog.
      </li>
    </ul>
    <p>
      To change the tracking consent value after the SDK is initialized, use the
      <code>DatadogSdk.setTrackingConsent</code> API call.
    </p>
    <p>
      The SDK changes its behavior according to the new value. For example, if
      the current tracking consent is <code>TrackingConsent.pending</code>:
    </p>
    <ul>
      <li>
        You change it to <code>TrackingConsent.granted</code>, the SDK sends all
        current and future data to Datadog;
      </li>
      <li>
        You change it to <code>TrackingConsent.notGranted</code>, the SDK wipes
        all current data and does not collect any future data.
      </li>
    </ul>
    <h4 id="manage-user-data-collection">Manage user data collection</h4>
    <p>
      To manage user data collection settings for client IP or geolocation data:
    </p>
    <ol>
      <li>Go to <strong>Manage Applications</strong>.</li>
      <li>Select your application.</li>
      <li>
        Click <strong>User Data Collection</strong>, then toggle the settings to
        enable/disable <strong>Collect geolocation data</strong> and
        <strong>Collect client IP data</strong>.
      </li>
    </ol>
    <p>
      For more information about the data collected, see
      <a
        href="/real_user_monitoring/application_monitoring/flutter/data_collected/"
        >Flutter Data Collected</a
      >.
    </p>
    <h2 id="automatically-track-views">Automatically track views</h2>
    <p>
      If you are using Flutter Navigator v2.0, your setup for automatic view
      tracking differs depending on your routing middleware. See
      <a
        href="/real_user_monitoring/application_monitoring/flutter/integrated_libraries/"
        >Flutter Integrated Libraries</a
      >
      for instructions on how to integrate with
      <a href="https://pub.dev/packages?q=go_router">go_router</a>,
      <a href="https://pub.dev/packages/auto_route">AutoRoute</a>, and
      <a href="https://pub.dev/packages/beamer">Beamer</a>.
    </p>
    <h3 id="flutter-navigator-v1">Flutter Navigator v1</h3>
    <p>
      The Datadog Flutter Plugin can automatically track named routes using the
      <code>DatadogNavigationObserver</code> on your MaterialApp:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">MaterialApp</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="nl">home:</span> <span class="n">HomeScreen</span><span class="p">(),</span>
</span></span><span class="line"><span class="cl">  <span class="nl">navigatorObservers:</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">    <span class="n">DatadogNavigationObserver</span><span class="p">(</span><span class="n">DatadogSdk</span><span class="p">.</span><span class="n">instance</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="p">],</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      This works if you are using named routes or if you have supplied a name to
      the <code>settings</code> parameter of your <code>PageRoute</code>.
    </p>
    <p>
      If you are not using named routes, you can use
      <code>DatadogRouteAwareMixin</code> in conjunction with the
      <code>DatadogNavigationObserverProvider</code> widget to start and stop
      your RUM views automatically. With <code>DatadogRouteAwareMixin</code>,
      move any logic from <code>initState</code> to <code>didPush</code>.
    </p>
    <h3 id="flutter-navigator-v2">Flutter Navigator v2</h3>
    <p>
      If you are using Flutter Navigator v2.0, which uses the
      <code>MaterialApp.router</code> named constructor, the setup varies based
      on the routing middleware you are using, if any. Since
      <a href="https://pub.dev/packages?q=go_router"><code>go_router</code></a>
      uses the same observer interface as Flutter Navigator v1,
      <code>DatadogNavigationObserver</code> can be added to other observers as
      a parameter to <code>GoRouter</code>.
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kd">final</span> <span class="n">_router</span> <span class="o">=</span> <span class="n">GoRouter</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="nl">routes:</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Your route information here
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="p">],</span>
</span></span><span class="line"><span class="cl">  <span class="nl">observers:</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">    <span class="n">DatadogNavigationObserver</span><span class="p">(</span><span class="nl">datadogSdk:</span> <span class="n">DatadogSdk</span><span class="p">.</span><span class="n">instance</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="p">],</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="n">MaterialApp</span><span class="p">.</span><span class="n">router</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="nl">routerConfig:</span> <span class="n">_router</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// Your remaining setup
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      For examples that use routers other than <code>go_router</code>, see
      <a href="#automatically-track-views">Automatically track views</a>.
    </p>
    <h3 id="renaming-views">Renaming views</h3>
    <p>
      For all setups, you can rename views or supply custom paths by providing a
      <a
        href="https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html"
        ><code>viewInfoExtractor</code></a
      >
      callback. This function can fall back to the default behavior of the
      observer by calling <code>defaultViewInfoExtractor</code>. For example:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">RumViewInfo</span><span class="o">?</span> <span class="n">infoExtractor</span><span class="p">(</span><span class="n">Route</span><span class="o">&lt;</span><span class="kt">dynamic</span><span class="o">&gt;</span> <span class="n">route</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="kd">var</span> <span class="n">name</span> <span class="o">=</span> <span class="n">route</span><span class="p">.</span><span class="n">settings</span><span class="p">.</span><span class="n">name</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">  <span class="k">if</span> <span class="p">(</span><span class="n">name</span> <span class="o">==</span> <span class="s1">&#39;my_named_route&#39;</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="n">RumViewInfo</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">      <span class="nl">name:</span> <span class="s1">&#39;MyDifferentName&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="nl">attributes:</span> <span class="p">{</span><span class="s1">&#39;extra_attribute&#39;</span><span class="o">:</span> <span class="s1">&#39;attribute_value&#39;</span><span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="p">);</span>
</span></span><span class="line"><span class="cl">  <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">  <span class="k">return</span> <span class="n">defaultViewInfoExtractor</span><span class="p">(</span><span class="n">route</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kd">var</span> <span class="n">observer</span> <span class="o">=</span> <span class="n">DatadogNavigationObserver</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="nl">datadogSdk:</span> <span class="n">DatadogSdk</span><span class="p">.</span><span class="n">instance</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nl">viewInfoExtractor:</span> <span class="n">infoExtractor</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h2 id="automatically-track-actions">Automatically track actions</h2>
    <p>
      Use
      <a
        href="https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionAnnotation-class.html"
        ><code>RumUserActionDetector</code></a
      >
      to track user taps that happen in a given Widget tree:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">RumUserActionDetector</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="nl">rum:</span> <span class="n">DatadogSdk</span><span class="p">.</span><span class="n">instance</span><span class="p">.</span><span class="n">rum</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nl">child:</span> <span class="n">Scaffold</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="nl">appBar:</span> <span class="n">AppBar</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">      <span class="nl">title:</span> <span class="kd">const</span> <span class="n">Text</span><span class="p">(</span><span class="s1">&#39;RUM&#39;</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">    <span class="p">),</span>
</span></span><span class="line"><span class="cl">    <span class="nl">body:</span> <span class="c1">// Rest of your application
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="p">),</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      <code>RumUserActionDetector</code> automatically detects tap user actions
      that occur in its tree and sends them to RUM. It detects interactions with
      several common Flutter widgets.
    </p>
    <p>
      For most Button types, the detector looks for a <code>Text</code> widget
      child, which it uses for the description of the action. In other cases it
      looks for a <code>Semantics</code> object child, or an
      <code>Icon</code> with its <code>Icon.semanticsLabel</code> property set.
    </p>
    <p>
      Alternatively, you can enclose any Widget tree with a
      <a
        href="https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionDetector-class.html"
        ><code>RumUserActionAnnotation</code></a
      >, which uses the provided description when reporting user actions
      detected in the child tree, without changing the Semantics of the tree.
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-dart">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">Container</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="nl">margin:</span> <span class="kd">const</span> <span class="n">EdgeInsets</span><span class="p">.</span><span class="n">all</span><span class="p">(</span><span class="m">8</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="nl">child:</span> <span class="n">RumUserActionAnnotation</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="nl">description:</span> <span class="s1">&#39;My Image Button&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nl">child:</span> <span class="n">InkWell</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">      <span class="nl">onTap:</span> <span class="n">onTap</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="nl">child:</span> <span class="n">Column</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="nl">children:</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">          <span class="n">FadeInImage</span><span class="p">.</span><span class="n">memoryNetwork</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">            <span class="nl">placeholder:</span> <span class="n">kTransparentImage</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">            <span class="nl">image:</span> <span class="n">image</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">          <span class="p">),</span>
</span></span><span class="line"><span class="cl">          <span class="n">Center</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">            <span class="nl">child:</span> <span class="n">Text</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">              <span class="n">text</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">              <span class="nl">style:</span> <span class="n">theme</span><span class="p">.</span><span class="n">textTheme</span><span class="p">.</span><span class="n">headlineSmall</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">            <span class="p">),</span>
</span></span><span class="line"><span class="cl">          <span class="p">)</span>
</span></span><span class="line"><span class="cl">        <span class="p">],</span>
</span></span><span class="line"><span class="cl">      <span class="p">),</span>
</span></span><span class="line"><span class="cl">    <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h2 id="sending-data-when-device-is-offline">
      Sending data when device is offline
    </h2>
    <p>
      The Flutter SDK ensures availability of data when your user device is
      offline. In cases of low-network areas, or when the device battery is too
      low, all events are first stored on the local device in batches. They are
      sent as soon as the network is available, and the battery is high enough
      to ensure the Flutter SDK does not impact the end user's experience. If
      the network is not available with your application running in the
      foreground, or if an upload of data fails, the batch is kept until it can
      be sent successfully.
    </p>
    <p>
      This means that even if users open your application while offline, no data
      is lost.
    </p>
    <p>
      <strong>Note</strong>: The data on the disk is automatically deleted if it
      gets too old to ensure the Flutter SDK does not use too much disk space.
    </p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is React Native"
    data-if="5594"
  >
    <p>
      The minimum supported version for the React Native SDK is React Native
      v0.65+. Compatibility with older versions is not guaranteed
      out-of-the-box.
    </p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="react-native"
          class="tab-pane fade"
          role="tabpanel"
          title="React Native"
        >
          <h3 id="step-1--install-the-sdk">Step 1 - Install the SDK</h3>
          <p>To install with npm, run:</p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-shell">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">npm install @datadog/mobile-react-native
</span></span></code></pre>
              </div>
            </div>
          </div>
          <p>To install with Yarn, run:</p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-shell">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">yarn add @datadog/mobile-react-native
</span></span></code></pre>
              </div>
            </div>
          </div>
          <h3 id="install-dependencies-for-ios">
            Install dependencies for iOS
          </h3>
          <p>Install the added pod:</p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-shell">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="o">(</span><span class="nb">cd</span> ios <span class="o">&amp;&amp;</span> pod install<span class="o">)</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
          <h3 id="android">Android</h3>
          <p>
            If you use a React Native version strictly over 0.67, make sure to
            use Java version 17. If you use React Native version equal or below
            0.67, make sure to use Java version 11.
          </p>
          <p>
            In your <code>android/build.gradle</code> file, specify the
            <code>kotlinVersion</code> to avoid clashes among kotlin
            dependencies:
          </p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-groovy">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="n">buildscript</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">ext</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// targetSdkVersion = ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="n">kotlinVersion</span> <span class="o">=</span> <span class="s2">&#34;1.8.21&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
          <p>
            The minimum supported Android SDK version is API level 23. Make sure
            to set <code>minSdkVersion</code> to 23 (or higher) in your Android
            configuration.
          </p>
          <p>
            The Datadog React Native SDK requires you to have
            <code>compileSdkVersion = 31</code> or higher in the Android
            application setup, which implies that you should use Build Tools
            version 31 or higher, Android Gradle Plugin version 7, and Gradle
            version 7 or higher. To modify the versions, change the values in
            the <code>buildscript.ext</code> block of your application's
            top-level <code>build.gradle</code> file. Datadog recommends using a
            React Native version that's actively supported.
          </p>
          <h3 id="step-2--specify-application-details-in-the-ui">
            Step 2 - Specify application details in the UI
          </h3>
          <ol>
            <li>
              In Datadog, navigate to
              <a href="https://app.datadoghq.com/rum/application/create"
                ><strong>Digital Experience</strong> &gt;
                <strong>Add an Application</strong></a
              >.
            </li>
            <li>Choose <code>react-native</code> as the application type.</li>
            <li>
              Provide an application name to generate a unique Datadog
              application ID and client token.
            </li>
            <li>
              To disable automatic user data collection for client IP or
              geolocation data, uncheck the boxes for those settings.
            </li>
          </ol>
          <div class="alert alert-info">
            <p>
              If you've purchased Error Tracking as a standalone product
              (without RUM), navigate to
              <a
                href="https://app.datadoghq.com/error-tracking/settings/setup/client/"
                ><strong>Error Tracking</strong> &gt;
                <strong>Settings</strong> &gt;
                <strong>Browser and Mobile</strong> &gt;
                <strong>Add an Application</strong></a
              >
              instead.
            </p>
          </div>
          <p>
            For data security, you must use a client token. If you used only
            <a href="/account_management/api-app-keys/#api-keys"
              >Datadog API keys</a
            >
            to configure the <code>@datadog/mobile-react-native</code> library,
            they would be exposed client-side in the React Native application's
            code.
          </p>
          <p>
            For more information about setting up a client token, see the
            <a href="/account_management/api-app-keys/#client-tokens"
              >Client Token documentation</a
            >.
          </p>
          <h3 id="step-3--initialize-the-library-with-application-context">
            Step 3 - Initialize the library with application context
          </h3>
          <div class="d-none site-region-container" data-region="us">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">SdkVerbosity</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">DatadogProvider</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">DatadogProviderConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">PropagatorType</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;@datadog/mobile-react-native&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Configure Datadog SDK
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">const</span> <span class="nx">config</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">DatadogProviderConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;&lt;CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;&lt;ENVIRONMENT_NAME&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Optional: Configure the Datadog Site to target. Default is &#39;US1&#39;.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">site</span><span class="o">:</span> <span class="s1">&#39;US1&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Optional: Set the reported service name (by default, it uses the package name or bundleIdentifier of your Android or iOS app respectively)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">service</span><span class="o">:</span> <span class="s1">&#39;com.example.reactnative&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Optional: Let the SDK print internal logs above or equal to the provided level. Default is undefined (meaning no logs)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">verbosity</span><span class="o">:</span> <span class="nx">SdkVerbosity</span><span class="p">.</span><span class="nx">WARN</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable RUM
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">rumConfiguration</span><span class="o">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Required: RUM Application ID
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">applicationId</span><span class="o">:</span> <span class="s1">&#39;&lt;APPLICATION_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Track user interactions (set to false if using Error Tracking only)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">trackInteractions</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Track XHR resources (set to false if using Error Tracking only)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">trackResources</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Track errors
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">trackErrors</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Optional: Sample sessions, for example: 80% of sessions are sent to Datadog. Default is 100%.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">sessionSampleRate</span><span class="o">:</span> <span class="mi">80</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Optional: Enable or disable native crash reports.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">nativeCrashReportEnabled</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Optional: Sample tracing integrations for network calls between your app and your backend 
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// (in this example, 80% of calls to your instrumented backend are linked from the RUM view to
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// the APM view. Default is 20%).
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// You need to specify the hosts of your backends to enable tracing with these backends
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">resourceTraceSampleRate</span><span class="o">:</span> <span class="mi">80</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nx">firstPartyHosts</span><span class="o">:</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">            <span class="p">{</span> 
</span></span><span class="line"><span class="cl">                <span class="nx">match</span><span class="o">:</span> <span class="s1">&#39;example.com&#39;</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">                <span class="nx">propagatorTypes</span><span class="o">:</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">                    <span class="nx">PropagatorType</span><span class="p">.</span><span class="nx">DATADOG</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                    <span class="nx">PropagatorType</span><span class="p">.</span><span class="nx">TRACECONTEXT</span>
</span></span><span class="line"><span class="cl">                <span class="p">]</span>
</span></span><span class="line"><span class="cl">            <span class="p">}</span>
</span></span><span class="line"><span class="cl">        <span class="p">]</span>
</span></span><span class="line"><span class="cl">    <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable Logs with default configuration
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">logsConfiguration</span><span class="o">:</span> <span class="p">{},</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable Trace with default configuration
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">traceConfiguration</span><span class="o">:</span> <span class="p">{}</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Wrap the content of your App component in a DatadogProvider component, passing it your configuration:
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">export</span> <span class="k">default</span> <span class="kd">function</span> <span class="nx">App</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="o">&lt;</span><span class="nx">DatadogProvider</span> <span class="nx">configuration</span><span class="o">=</span><span class="p">{</span><span class="nx">config</span><span class="p">}</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl">            <span class="o">&lt;</span><span class="nx">Navigation</span> <span class="o">/&gt;</span>
</span></span><span class="line"><span class="cl">        <span class="o">&lt;</span><span class="err">/DatadogProvider&gt;</span>
</span></span><span class="line"><span class="cl">    <span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Once the Datadog React Native SDK for RUM is initialized, you need to setup view tracking to be able to see data in a dashboard
</span></span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="d-none site-region-container" data-region="us3">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">SdkVerbosity</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">DatadogProvider</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">DatadogProviderConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">PropagatorType</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;@datadog/mobile-react-native&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Configure Datadog SDK
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">const</span> <span class="nx">config</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">DatadogProviderConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;&lt;CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;&lt;ENVIRONMENT_NAME&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Optional: Configure the Datadog Site to target. Default is &#39;US1&#39;.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">site</span><span class="o">:</span> <span class="s1">&#39;US3&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Optional: Set the reported service name (by default, it uses the package name or bundleIdentifier of your Android or iOS app respectively)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">service</span><span class="o">:</span> <span class="s1">&#39;com.example.reactnative&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Optional: Let the SDK print internal logs above or equal to the provided level. Default is undefined (meaning no logs)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">verbosity</span><span class="o">:</span> <span class="nx">SdkVerbosity</span><span class="p">.</span><span class="nx">WARN</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable RUM
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">rumConfiguration</span><span class="o">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Required: RUM Application ID
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">applicationId</span><span class="o">:</span> <span class="s1">&#39;&lt;APPLICATION_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Track user interactions (set to false if using Error Tracking only)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">trackInteractions</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Track XHR resources (set to false if using Error Tracking only)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">trackResources</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Track errors
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">trackErrors</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Optional: Sample sessions, for example: 80% of sessions are sent to Datadog. Default is 100%.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">sessionSampleRate</span><span class="o">:</span> <span class="mi">80</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Optional: Enable or disable native crash reports.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">nativeCrashReportEnabled</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Optional: Sample tracing integrations for network calls between your app and your backend 
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// (in this example, 80% of calls to your instrumented backend are linked from the RUM view to
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// the APM view. Default is 20%).
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// You need to specify the hosts of your backends to enable tracing with these backends
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">resourceTraceSampleRate</span><span class="o">:</span> <span class="mi">80</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nx">firstPartyHosts</span><span class="o">:</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">            <span class="p">{</span> 
</span></span><span class="line"><span class="cl">                <span class="nx">match</span><span class="o">:</span> <span class="s1">&#39;example.com&#39;</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">                <span class="nx">propagatorTypes</span><span class="o">:</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">                    <span class="nx">PropagatorType</span><span class="p">.</span><span class="nx">DATADOG</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                    <span class="nx">PropagatorType</span><span class="p">.</span><span class="nx">TRACECONTEXT</span>
</span></span><span class="line"><span class="cl">                <span class="p">]</span>
</span></span><span class="line"><span class="cl">            <span class="p">}</span>
</span></span><span class="line"><span class="cl">        <span class="p">]</span>
</span></span><span class="line"><span class="cl">    <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable Logs with default configuration
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">logsConfiguration</span><span class="o">:</span> <span class="p">{},</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable Trace with default configuration
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">traceConfiguration</span><span class="o">:</span> <span class="p">{}</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Wrap the content of your App component in a DatadogProvider component, passing it your configuration:
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">export</span> <span class="k">default</span> <span class="kd">function</span> <span class="nx">App</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="o">&lt;</span><span class="nx">DatadogProvider</span> <span class="nx">configuration</span><span class="o">=</span><span class="p">{</span><span class="nx">config</span><span class="p">}</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl">            <span class="o">&lt;</span><span class="nx">Navigation</span> <span class="o">/&gt;</span>
</span></span><span class="line"><span class="cl">        <span class="o">&lt;</span><span class="err">/DatadogProvider&gt;</span>
</span></span><span class="line"><span class="cl">    <span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Once the Datadog React Native SDK for RUM is initialized, you need to setup view tracking to be able to see data in a dashboard
</span></span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="d-none site-region-container" data-region="eu">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">SdkVerbosity</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">DatadogProvider</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">DatadogProviderConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">PropagatorType</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;@datadog/mobile-react-native&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Configure Datadog SDK
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">const</span> <span class="nx">config</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">DatadogProviderConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;&lt;CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;&lt;ENVIRONMENT_NAME&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Optional: Configure the Datadog Site to target. Default is &#39;US1&#39;.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">site</span><span class="o">:</span> <span class="s1">&#39;EU1&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Optional: Set the reported service name (by default, it uses the package name or bundleIdentifier of your Android or iOS app respectively)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">service</span><span class="o">:</span> <span class="s1">&#39;com.example.reactnative&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Optional: Let the SDK print internal logs above or equal to the provided level. Default is undefined (meaning no logs)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">verbosity</span><span class="o">:</span> <span class="nx">SdkVerbosity</span><span class="p">.</span><span class="nx">WARN</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable RUM
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">rumConfiguration</span><span class="o">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Required: RUM Application ID
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">applicationId</span><span class="o">:</span> <span class="s1">&#39;&lt;APPLICATION_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Track user interactions (set to false if using Error Tracking only)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">trackInteractions</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Track XHR resources (set to false if using Error Tracking only)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">trackResources</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Track errors
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">trackErrors</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Optional: Sample sessions, for example: 80% of sessions are sent to Datadog. Default is 100%.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">sessionSampleRate</span><span class="o">:</span> <span class="mi">80</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Optional: Enable or disable native crash reports.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">nativeCrashReportEnabled</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Optional: Sample tracing integrations for network calls between your app and your backend 
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// (in this example, 80% of calls to your instrumented backend are linked from the RUM view to
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// the APM view. Default is 20%).
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// You need to specify the hosts of your backends to enable tracing with these backends
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">resourceTraceSampleRate</span><span class="o">:</span> <span class="mi">80</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nx">firstPartyHosts</span><span class="o">:</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">            <span class="p">{</span> 
</span></span><span class="line"><span class="cl">                <span class="nx">match</span><span class="o">:</span> <span class="s1">&#39;example.com&#39;</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">                <span class="nx">propagatorTypes</span><span class="o">:</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">                    <span class="nx">PropagatorType</span><span class="p">.</span><span class="nx">DATADOG</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                    <span class="nx">PropagatorType</span><span class="p">.</span><span class="nx">TRACECONTEXT</span>
</span></span><span class="line"><span class="cl">                <span class="p">]</span>
</span></span><span class="line"><span class="cl">            <span class="p">}</span>
</span></span><span class="line"><span class="cl">        <span class="p">]</span>
</span></span><span class="line"><span class="cl">    <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable Logs with default configuration
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">logsConfiguration</span><span class="o">:</span> <span class="p">{},</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable Trace with default configuration
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">traceConfiguration</span><span class="o">:</span> <span class="p">{}</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Wrap the content of your App component in a DatadogProvider component, passing it your configuration:
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">export</span> <span class="k">default</span> <span class="kd">function</span> <span class="nx">App</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="o">&lt;</span><span class="nx">DatadogProvider</span> <span class="nx">configuration</span><span class="o">=</span><span class="p">{</span><span class="nx">config</span><span class="p">}</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl">            <span class="o">&lt;</span><span class="nx">Navigation</span> <span class="o">/&gt;</span>
</span></span><span class="line"><span class="cl">        <span class="o">&lt;</span><span class="err">/DatadogProvider&gt;</span>
</span></span><span class="line"><span class="cl">    <span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Once the Datadog React Native SDK for RUM is initialized, you need to setup view tracking to be able to see data in a dashboard
</span></span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="d-none site-region-container" data-region="gov">
            <div class="code-snippet-wrapper">
              <div
                class="code-filename-wrapper d-flex justify-content-end"
              ></div>
              <div class="code-snippet">
                <div class="code-button-wrapper position-absolute">
                  <button class="btn text-primary js-copy-button">Copy</button>
                </div>
                <div class="cdoc-code-snippet cdoc-language-javascript">
                  <pre
                    tabindex="0"
                    class="chroma"
                  ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">SdkVerbosity</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">DatadogProvider</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">DatadogProviderConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">PropagatorType</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;@datadog/mobile-react-native&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Configure Datadog SDK
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">const</span> <span class="nx">config</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">DatadogProviderConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;&lt;CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;&lt;ENVIRONMENT_NAME&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Optional: Configure the Datadog Site to target. Default is &#39;US1&#39;.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">site</span><span class="o">:</span> <span class="s1">&#39;US1_FED&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Optional: Set the reported service name (by default, it uses the package name or bundleIdentifier of your Android or iOS app respectively)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">service</span><span class="o">:</span> <span class="s1">&#39;com.example.reactnative&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Optional: Let the SDK print internal logs above or equal to the provided level. Default is undefined (meaning no logs)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">verbosity</span><span class="o">:</span> <span class="nx">SdkVerbosity</span><span class="p">.</span><span class="nx">WARN</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable RUM
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">rumConfiguration</span><span class="o">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Required: RUM Application ID
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">applicationId</span><span class="o">:</span> <span class="s1">&#39;&lt;APPLICATION_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Track user interactions (set to false if using Error Tracking only)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">trackInteractions</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Track XHR resources (set to false if using Error Tracking only)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">trackResources</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Track errors
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">trackErrors</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Optional: Sample sessions, for example: 80% of sessions are sent to Datadog. Default is 100%.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">sessionSampleRate</span><span class="o">:</span> <span class="mi">80</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Optional: Enable or disable native crash reports.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">nativeCrashReportEnabled</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Optional: Sample tracing integrations for network calls between your app and your backend 
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// (in this example, 80% of calls to your instrumented backend are linked from the RUM view to
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// the APM view. Default is 20%).
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// You need to specify the hosts of your backends to enable tracing with these backends
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">resourceTraceSampleRate</span><span class="o">:</span> <span class="mi">80</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nx">firstPartyHosts</span><span class="o">:</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">            <span class="p">{</span> 
</span></span><span class="line"><span class="cl">                <span class="nx">match</span><span class="o">:</span> <span class="s1">&#39;example.com&#39;</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">                <span class="nx">propagatorTypes</span><span class="o">:</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">                    <span class="nx">PropagatorType</span><span class="p">.</span><span class="nx">DATADOG</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                    <span class="nx">PropagatorType</span><span class="p">.</span><span class="nx">TRACECONTEXT</span>
</span></span><span class="line"><span class="cl">                <span class="p">]</span>
</span></span><span class="line"><span class="cl">            <span class="p">}</span>
</span></span><span class="line"><span class="cl">        <span class="p">]</span>
</span></span><span class="line"><span class="cl">    <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable Logs with default configuration
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">logsConfiguration</span><span class="o">:</span> <span class="p">{},</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable Trace with default configuration
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">traceConfiguration</span><span class="o">:</span> <span class="p">{}</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Wrap the content of your App component in a DatadogProvider component, passing it your configuration:
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">export</span> <span class="k">default</span> <span class="kd">function</span> <span class="nx">App</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="o">&lt;</span><span class="nx">DatadogProvider</span> <span class="nx">configuration</span><span class="o">=</span><span class="p">{</span><span class="nx">config</span><span class="p">}</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl">            <span class="o">&lt;</span><span class="nx">Navigation</span> <span class="o">/&gt;</span>
</span></span><span class="line"><span class="cl">        <span class="o">&lt;</span><span class="err">/DatadogProvider&gt;</span>
</span></span><span class="line"><span class="cl">    <span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Once the Datadog React Native SDK for RUM is initialized, you need to setup view tracking to be able to see data in a dashboard
</span></span></span></code></pre>
                </div>
              </div>
            </div>
          </div>
          <h4 id="sample-session-rates">Sample session rates</h4>
          <p>
            To control the data your application sends to Datadog RUM, you can
            specify a sampling rate for RUM sessions while
            <a href="#step-3--initialize-the-library-with-application-context"
              >initializing the RUM React Native SDK</a
            >
            as a percentage between 0 and 100. You can specify the rate with the
            <code>config.sessionSamplingRate</code> parameter.
          </p>
          <h4 id="set-tracking-consent--gdpr-compliance">
            Set tracking consent (GDPR compliance)
          </h4>
          <p>
            To be compliant with the GDPR regulation, the React Native SDK
            requires the tracking consent value at initialization.
          </p>
          <p>
            The <code>trackingConsent</code> setting can be one of the following
            values:
          </p>
          <ol>
            <li>
              <code>.PENDING</code>: The React Native SDK starts collecting and
              batching the data but does not send it to Datadog. The React
              Native SDK waits for the new tracking consent value to decide what
              to do with the batched data.
            </li>
            <li>
              <code>.GRANTED</code>: The React Native SDK starts collecting the
              data and sends it to Datadog.
            </li>
            <li>
              <code>.NOTGRANTED</code>: The React Native SDK does not collect
              any data. No logs, traces, or RUM events are sent to Datadog.
            </li>
          </ol>
          <p>
            To change the tracking consent value after the React Native SDK is
            initialized, use the <code>Datadog.set(trackingConsent:)</code> API
            call. The React Native SDK changes its behavior according to the new
            value.
          </p>
          <p>
            For example, if the current tracking consent is
            <code>.PENDING</code>:
          </p>
          <ul>
            <li>
              If you change the value to <code>.GRANTED</code>, the React Native
              SDK sends all current and future data to Datadog;
            </li>
            <li>
              If you change the value to <code>.NOTGRANTED</code>, the React
              Native SDK wipes all current data and does not collect future
              data.
            </li>
          </ul>
          <h3 id="user-interactions-tracking">User interactions tracking</h3>
          <p>
            The preferred way to set up interaction tracking is by using the
            Datadog React Native Babel Plugin
            (<code>@datadog/mobile-react-native-babel-plugin</code>). This
            plugin automatically enriches React components with contextual
            metadata, improving interaction tracking accuracy and enabling a
            range of configuration options.
          </p>
          <h4 id="installation">Installation</h4>
          <p>To install with npm, run:</p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-shell">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">npm install @datadog/mobile-react-native-babel-plugin
</span></span></code></pre>
              </div>
            </div>
          </div>
          <p>To install with Yarn, run:</p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-shell">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">yarn add @datadog/mobile-react-native-babel-plugin
</span></span></code></pre>
              </div>
            </div>
          </div>
          <h4 id="configure-babel">Configure Babel</h4>
          <p>
            Add the plugin to your Babel configuration file
            (<code>babel.config.js</code>, <code>.babelrc</code>, or similar):
          </p>
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
                ><code><span class="line"><span class="cl"><span class="nx">module</span><span class="p">.</span><span class="nx">exports</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">presets</span><span class="o">:</span> <span class="p">[</span><span class="s1">&#39;module:@react-native/babel-preset&#39;</span><span class="p">],</span>
</span></span><span class="line"><span class="cl">  <span class="nx">plugins</span><span class="o">:</span> <span class="p">[</span><span class="s1">&#39;@datadog/mobile-react-native-babel-plugin&#39;</span><span class="p">]</span>
</span></span><span class="line"><span class="cl"><span class="p">};</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
          <p>
            After the plugin is installed and configured, it automatically
            tracks interactions on standard React Native components. No
            additional code changes are required for basic usage.
          </p>
          <h3 id="codepush-integration--optional">
            CodePush integration (optional)
          </h3>
          <p>
            If you're deploying updates with
            <a
              href="https://docs.microsoft.com/en-us/appcenter/distribution/codepush/"
              >CodePush</a
            >, see the
            <a
              href="/real_user_monitoring/application_monitoring/react_native/setup/codepush"
              >CodePush setup documentation</a
            >
            for additional configuration steps.
          </p>
        </div>
        <div
          data-lang="expo"
          class="tab-pane fade"
          role="tabpanel"
          title="Expo"
        >
          <h3 id="step-1--install-the-sdk">Step 1 - Install the SDK</h3>
          <p>
            The RUM React Native SDK supports Expo and Expo Go. To use it,
            install <code>expo-datadog</code> and
            <code>@datadog/mobile-react-native</code>.
          </p>
          <p>
            <code>expo-datadog</code> supports Expo starting from SDK 45 and the
            plugin's versions follow Expo versions. For example, if you use Expo
            SDK 45, use <code>expo-datadog</code> version <code>45.x.x</code>.
            Datadog recommends using <strong>Expo SDK 45</strong> as a minimum
            version; previous versions may require manual steps.
          </p>
          <p>To install with npm, run:</p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-shell">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">npm install expo-datadog @datadog/mobile-react-native
</span></span></code></pre>
              </div>
            </div>
          </div>
          <p>To install with Yarn, run:</p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-shell">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">yarn add expo-datadog @datadog/mobile-react-native
</span></span></code></pre>
              </div>
            </div>
          </div>
          <h3 id="step-2--specify-application-details-in-the-ui">
            Step 2 - Specify application details in the UI
          </h3>
          <ol>
            <li>
              In Datadog, navigate to
              <a href="https://app.datadoghq.com/rum/application/create"
                ><strong>Digital Experience</strong> &gt;
                <strong>Add an Application</strong></a
              >.
            </li>
            <li>Choose <code>react-native</code> as the application type.</li>
            <li>
              Provide an application name to generate a unique Datadog
              application ID and client token.
            </li>
            <li>
              To disable automatic user data collection for client IP or
              geolocation data, uncheck the boxes for those settings.
            </li>
          </ol>
          <div class="alert alert-info">
            <p>
              If you've purchased Error Tracking as a standalone product
              (without RUM), navigate to
              <a
                href="https://app.datadoghq.com/error-tracking/settings/setup/client/"
                ><strong>Error Tracking</strong> &gt;
                <strong>Settings</strong> &gt;
                <strong>Browser and Mobile</strong> &gt;
                <strong>Add an Application</strong></a
              >
              instead.
            </p>
          </div>
          <p>
            For data security, you must use a client token. For more information
            about setting up a client token, see the
            <a href="/account_management/api-app-keys/#client-tokens"
              >Client Token documentation</a
            >.
          </p>
          <h3 id="step-3--initialize-the-library-with-application-context">
            Step 3 - Initialize the library with application context
          </h3>
          <p>Add the following code snippet to your initialization file:</p>
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
                ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">SdkVerbosity</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">DatadogProvider</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">DatadogProviderConfiguration</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">PropagatorType</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;expo-datadog&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">DatadogProviderConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;&lt;CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;&lt;ENVIRONMENT_NAME&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Optional: Configure the Datadog Site to target. Default is &#39;US1&#39;.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">site</span><span class="o">:</span> <span class="s1">&#39;US1&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Optional: Set the reported service name (by default, it uses the package name or bundleIdentifier of your Android or iOS app respectively)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">service</span><span class="o">:</span> <span class="s1">&#39;com.example.reactnative&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Optional: Let the SDK print internal logs above or equal to the provided level. Default is undefined (meaning no logs)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">verbosity</span><span class="o">:</span> <span class="nx">SdkVerbosity</span><span class="p">.</span><span class="nx">WARN</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable RUM
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">rumConfiguration</span><span class="o">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Required: RUM Application ID
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">applicationId</span><span class="o">:</span> <span class="s1">&#39;&lt;APPLICATION_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Track user interactions (set to false if using Error Tracking only)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">trackInteractions</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Track XHR resources (set to false if using Error Tracking only)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">trackResources</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Track errors
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">trackErrors</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Optional: Sample sessions, for example: 80% of sessions are sent to Datadog. Default is 100%.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">sessionSampleRate</span><span class="o">:</span> <span class="mi">80</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Optional: Enable or disable native crash reports.
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">nativeCrashReportEnabled</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Optional: Sample tracing integrations for network calls between your app and your backend 
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// (in this example, 80% of calls to your instrumented backend are linked from the RUM view to
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// the APM view. Default is 20%).
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="c1">// You need to specify the hosts of your backends to enable tracing with these backends
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="nx">resourceTraceSampleRate</span><span class="o">:</span> <span class="mi">80</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="nx">firstPartyHosts</span><span class="o">:</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">            <span class="p">{</span> 
</span></span><span class="line"><span class="cl">                <span class="nx">match</span><span class="o">:</span> <span class="s1">&#39;example.com&#39;</span><span class="p">,</span> 
</span></span><span class="line"><span class="cl">                <span class="nx">propagatorTypes</span><span class="o">:</span> <span class="p">[</span>
</span></span><span class="line"><span class="cl">                    <span class="nx">PropagatorType</span><span class="p">.</span><span class="nx">DATADOG</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">                    <span class="nx">PropagatorType</span><span class="p">.</span><span class="nx">TRACECONTEXT</span>
</span></span><span class="line"><span class="cl">                <span class="p">]</span>
</span></span><span class="line"><span class="cl">            <span class="p">}</span>
</span></span><span class="line"><span class="cl">        <span class="p">]</span>
</span></span><span class="line"><span class="cl">    <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable Logs with default configuration
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">logsConfiguration</span><span class="o">:</span> <span class="p">{},</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable Trace with default configuration
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="nx">traceConfiguration</span><span class="o">:</span> <span class="p">{}</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Wrap the content of your App component in a DatadogProvider component, passing it your configuration:
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">export</span> <span class="k">default</span> <span class="kd">function</span> <span class="nx">App</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">return</span> <span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="o">&lt;</span><span class="nx">DatadogProvider</span> <span class="nx">configuration</span><span class="o">=</span><span class="p">{</span><span class="nx">config</span><span class="p">}</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl">            <span class="o">&lt;</span><span class="nx">Navigation</span> <span class="o">/&gt;</span>
</span></span><span class="line"><span class="cl">        <span class="o">&lt;</span><span class="err">/DatadogProvider&gt;</span>
</span></span><span class="line"><span class="cl">    <span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Once the Datadog React Native SDK for RUM is initialized, you need to setup view tracking to be able to see data in a dashboard
</span></span></span></code></pre>
              </div>
            </div>
          </div>
          <h4 id="sample-session-rates">Sample session rates</h4>
          <p>
            To control the data your application sends to Datadog RUM, you can
            specify a sampling rate for RUM sessions. To set this rate, use the
            <code>config.sessionSamplingRate</code> parameter and specify a
            percentage between 0 and 100.
          </p>
          <h3 id="upload-source-maps-on-eas-builds">
            Upload source maps on EAS builds
          </h3>
          <p>
            To enable crash reporting and error symbolication, add
            <code>expo-datadog</code> to your plugins in the
            <code>app.json</code> file:
          </p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-json">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nt">&#34;expo&#34;</span><span class="p">:</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="nt">&#34;plugins&#34;</span><span class="p">:</span> <span class="p">[</span><span class="s2">&#34;expo-datadog&#34;</span><span class="p">]</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
          <p>
            This plugin takes care of uploading the dSYMs, source maps and
            Proguard mapping files on every EAS build.
          </p>
          <p>
            Add <code>@datadog/datadog-ci</code> as a development dependency.
            This package contains scripts to upload the source maps. You can
            install it with npm:
          </p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-shell">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">npm install @datadog/datadog-ci --save-dev
</span></span></code></pre>
              </div>
            </div>
          </div>
          <p>or with Yarn:</p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-shell">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">yarn add -D @datadog/datadog-ci
</span></span></code></pre>
              </div>
            </div>
          </div>
          <p>
            Run <code>eas secret:create</code> to set
            <code>DATADOG_API_KEY</code> to your Datadog API key, and
            <code>DATADOG_SITE</code> to the host of your Datadog site (for
            example, <code>datadoghq.com</code>).
          </p>
          <h3 id="user-interactions-tracking">User interactions tracking</h3>
          <p>
            Datadog recommends set up interaction tracking by using the Datadog
            React Native Babel Plugin
            (<code>@datadog/mobile-react-native-babel-plugin</code>). This
            plugin automatically enriches React components with contextual
            metadata, improving interaction tracking accuracy and enabling a
            range of configuration options.
          </p>
          <p>To install with npm, run:</p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-shell">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">npm install @datadog/mobile-react-native-babel-plugin
</span></span></code></pre>
              </div>
            </div>
          </div>
          <p>To install with Yarn, run:</p>
          <div class="code-snippet-wrapper">
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
            <div class="code-snippet">
              <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
              </div>
              <div class="cdoc-code-snippet cdoc-language-shell">
                <pre
                  tabindex="0"
                  class="chroma"
                ><code><span class="line"><span class="cl">yarn add @datadog/mobile-react-native-babel-plugin
</span></span></code></pre>
              </div>
            </div>
          </div>
          <p>
            Add the plugin to your Babel configuration file
            (<code>babel.config.js</code>, <code>.babelrc</code>, or similar):
          </p>
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
                ><code><span class="line"><span class="cl"><span class="nx">module</span><span class="p">.</span><span class="nx">exports</span> <span class="o">=</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nx">presets</span><span class="o">:</span> <span class="p">[</span><span class="s2">&#34;babel-preset-expo&#34;</span><span class="p">],</span>
</span></span><span class="line"><span class="cl">  <span class="nx">plugins</span><span class="o">:</span> <span class="p">[</span><span class="s1">&#39;@datadog/mobile-react-native-babel-plugin&#39;</span><span class="p">]</span>
</span></span><span class="line"><span class="cl"><span class="p">};</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
          <p>
            After the plugin is installed and configured, it automatically
            tracks interactions on standard React Native components. No
            additional code changes are required for basic usage.
          </p>
          <h3 id="codepush-integration--optional">
            CodePush integration (optional)
          </h3>
          <p>
            If you're deploying updates with
            <a
              href="https://docs.microsoft.com/en-us/appcenter/distribution/codepush/"
              >CodePush</a
            >, see the
            <a
              href="/real_user_monitoring/application_monitoring/react_native/setup/codepush"
              >CodePush setup documentation</a
            >
            for additional configuration steps.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Kotlin Multiplatform"
    data-if="5595"
  >
    <p>
      This page describes how to instrument your applications for
      <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> with the
      Kotlin Multiplatform SDK. RUM includes Error Tracking by default, but if
      you have purchased Error Tracking as a standalone product, see the
      <a href="/error_tracking/frontend/mobile/kotlin-multiplatform/"
        >Error Tracking setup guide</a
      >
      for specific steps.
    </p>
    <p>
      The Datadog Kotlin Multiplatform SDK supports Android 5.0+ (API level 21)
      and iOS v12+.
    </p>
    <h2 id="setup">Setup</h2>
    <h3 id="step-1--declare-the-kotlin-multiplatform-sdk-as-a-dependency">
      Step 1 - Declare the Kotlin Multiplatform SDK as a dependency
    </h3>
    <p>
      Declare
      <a
        href="https://github.com/DataDog/dd-sdk-kotlin-multiplatform/tree/develop/features/rum"
        ><code>dd-sdk-kotlin-multiplatform-rum</code></a
      >
      as a common source set dependency in your Kotlin Multiplatform module's
      <code>build.gradle.kts</code> file.
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">kotlin</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// declare targets
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>
</span></span><span class="line"><span class="cl">  <span class="n">sourceSets</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="n">commonMain</span><span class="p">.</span><span class="n">dependencies</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="n">implementation</span><span class="p">(</span><span class="s2">&#34;com.datadoghq:dd-sdk-kotlin-multiplatform-rum:&lt;latest_version&gt;&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl">  <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="step-2--add-native-dependencies-for-ios">
      Step 2 - Add native dependencies for iOS
    </h3>
    <div class="alert alert-info">
      <p>
        Kotlin 2.0.20 or higher is required if crash tracking is enabled on iOS.
        Otherwise, due to the compatibility with <code>PLCrashReporter</code>,
        the application may hang if crash tracking is enabled.
      </p>
    </div>
    <p>
      Add the following Datadog iOS SDK dependencies, which are needed for the
      linking step:
    </p>
    <ul>
      <li><code>DatadogCore</code></li>
      <li><code>DatadogRUM</code></li>
      <li><code>DatadogCrashReporting</code></li>
    </ul>
    <p>
      <strong>Note</strong>: Versions of these dependencies should be aligned
      with the version used by the Datadog Kotlin Multiplatform SDK itself. You
      can find the complete mapping of iOS SDK versions for each Kotlin
      Multiplatform SDK release in the
      <a
        href="https://github.com/DataDog/dd-sdk-kotlin-multiplatform/blob/develop/NATIVE_SDK_VERSIONS.md"
        >version compatibility guide</a
      >. If you are using Kotlin Multiplatform SDK version 1.3.0 or below, add
      <code>DatadogObjc</code> dependency instead of
      <code>DatadogCore</code> and <code>DatadogRUM</code>.
    </p>
    <h4 id="adding-native-ios-dependencies-using-the-cocoapods-plugin">
      Adding native iOS dependencies using the CocoaPods plugin
    </h4>
    <p>
      If you are using Kotlin Multiplatform library as a CocoaPods dependency
      for your iOS application, you can add dependencies as following:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">cocoapods</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">   <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>
</span></span><span class="line"><span class="cl">   <span class="n">framework</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">     <span class="n">baseName</span> <span class="p">=</span> <span class="s2">&#34;sharedLib&#34;</span>
</span></span><span class="line"><span class="cl">   <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">   <span class="n">pod</span><span class="p">(</span><span class="s2">&#34;DatadogCore&#34;</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">     <span class="n">linkOnly</span> <span class="p">=</span> <span class="k">true</span>
</span></span><span class="line"><span class="cl">     <span class="n">version</span> <span class="p">=</span> <span class="n">x</span><span class="p">.</span><span class="n">x</span><span class="p">.</span><span class="n">x</span>
</span></span><span class="line"><span class="cl">   <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">   <span class="n">pod</span><span class="p">(</span><span class="s2">&#34;DatadogRUM&#34;</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">     <span class="n">linkOnly</span> <span class="p">=</span> <span class="k">true</span>
</span></span><span class="line"><span class="cl">     <span class="n">version</span> <span class="p">=</span> <span class="n">x</span><span class="p">.</span><span class="n">x</span><span class="p">.</span><span class="n">x</span>
</span></span><span class="line"><span class="cl">   <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">   <span class="n">pod</span><span class="p">(</span><span class="s2">&#34;DatadogCrashReporting&#34;</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">     <span class="n">linkOnly</span> <span class="p">=</span> <span class="k">true</span>
</span></span><span class="line"><span class="cl">     <span class="n">version</span> <span class="p">=</span> <span class="n">x</span><span class="p">.</span><span class="n">x</span><span class="p">.</span><span class="n">x</span>
</span></span><span class="line"><span class="cl">   <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h4 id="adding-native-ios-dependencies-using-xcode">
      Adding native iOS dependencies using Xcode
    </h4>
    <p>
      If you are integrating Kotlin Multiplatform library as a framework with an
      <code>embedAndSignAppleFrameworkForXcode</code> Gradle task as a part of
      your Xcode build, you can add the necessary dependencies directly in Xcode
      as following:
    </p>
    <ol>
      <li>
        Click on your project in Xcode and go to the
        <strong>Package Dependencies</strong> tab.
      </li>
      <li>
        Add the iOS SDK package dependency by adding
        <code>https://github.com/DataDog/dd-sdk-ios.git</code> as a package URL.
      </li>
      <li>Select the version from the table above.</li>
      <li>
        Click on the necessary application target and open the
        <strong>General</strong> tab.
      </li>
      <li>
        Scroll down to the
        <strong>Frameworks, Libraries, and Embedded Content</strong> section and
        add the dependencies mentioned above.
      </li>
    </ol>
    <h3 id="step-3--specify-application-details-in-the-ui">
      Step 3 - Specify application details in the UI
    </h3>
    <ol>
      <li>
        Navigate to [<strong>Digital Experience</strong> &gt;
        <strong>Add an Application</strong>][4].
      </li>
      <li>
        Select <code>Kotlin Multiplatform</code> as the application type and
        enter an application name to generate a unique Datadog application ID
        and client token.
      </li>
      <li>
        To disable automatic user data collection for either client IP or
        geolocation data, uncheck the boxes for those settings. For more
        information, see [RUM Kotlin Multiplatform Data Collected][5].
      </li>
    </ol>
    <div class="alert alert-info">
      <p>
        If you've purchased Error Tracking as a standalone product (without
        RUM), navigate to [<strong>Error Tracking</strong> &gt;
        <strong>Settings</strong> &gt; <strong>Browser and Mobile</strong> &gt;
        <strong>Add an Application</strong>][6] instead.
      </p>
    </div>
    <p>
      To ensure the safety of your data, you must use a client token. If you use
      only
      <a href="/account_management/api-app-keys/#api-keys">Datadog API keys</a>
      to configure the Datadog SDK, they are exposed client-side in the Android
      application's APK byte code.
    </p>
    <p>
      For more information about setting up a client token, see the
      <a href="/account_management/api-app-keys/#client-tokens"
        >Client Token documentation</a
      >.
    </p>
    <h3 id="step-4--initialize-datadog-sdk">Step 4 - Initialize Datadog SDK</h3>
    <p>
      In the initialization snippet, set an environment name. For Android, set a
      variant name if it exists. For more information, see
      <a href="/getting_started/tagging/using_tags/">Using Tags</a>.
    </p>
    <p>
      See
      <a href="#set-tracking-consent-gdpr-compliance"
        ><code>trackingConsent</code></a
      >
      to add GDPR compliance for your EU users, and
      <a
        href="/real_user_monitoring/application_monitoring/advanced_configuration/kotlin_multiplatform/#initialization-parameters"
        >other configuration options</a
      >
      to initialize the library.
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="c1">// in common source set
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="k">fun</span> <span class="nf">initializeDatadog</span><span class="p">(</span><span class="n">context</span><span class="p">:</span> <span class="n">Any</span><span class="p">?</span> <span class="p">=</span> <span class="k">null</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// context should be application context on Android and can be null on iOS
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="k">val</span> <span class="py">appClientToken</span> <span class="p">=</span> <span class="p">&lt;</span><span class="n">CLIENT_TOKEN</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">    <span class="k">val</span> <span class="py">appEnvironment</span> <span class="p">=</span> <span class="p">&lt;</span><span class="n">ENV_NAME</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">    <span class="k">val</span> <span class="py">appVariantName</span> <span class="p">=</span> <span class="p">&lt;</span><span class="n">APP_VARIANT_NAME</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="k">val</span> <span class="py">configuration</span> <span class="p">=</span> <span class="nc">Configuration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">            <span class="n">clientToken</span> <span class="p">=</span> <span class="n">appClientToken</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">            <span class="n">env</span> <span class="p">=</span> <span class="n">appEnvironment</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">            <span class="n">variant</span> <span class="p">=</span> <span class="n">appVariantName</span>
</span></span><span class="line"><span class="cl">    <span class="p">)</span><span class="m">2</span><span class="n">e814c11</span><span class="p">-</span><span class="n">f634</span><span class="p">-</span><span class="m">45</span><span class="n">bf</span><span class="p">-</span><span class="m">8</span><span class="n">ef1</span><span class="p">-</span><span class="n">e0fdb9b4c746</span>
</span></span><span class="line"><span class="cl">        <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="nc">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span><span class="n">context</span><span class="p">,</span> <span class="n">configuration</span><span class="p">,</span> <span class="n">trackingConsent</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="step-5--sample-rum-sessions">Step 5 - Sample RUM sessions</h3>
    <p>
      To control the data your application sends to Datadog RUM, you can specify
      a sample rate for RUM sessions while
      <a href="https://app.datadoghq.com/rum/application/create"
        >initializing the RUM feature</a
      >. The rate is a percentage between 0 and 100. By default,
      <code>sessionSamplingRate</code> is set to 100 (keep all sessions).
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">rumConfig</span> <span class="p">=</span> <span class="nc">RumConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span><span class="n">applicationId</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// Here 75% of the RUM sessions are sent to Datadog
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="p">.</span><span class="n">setSessionSampleRate</span><span class="p">(</span><span class="m">75.0f</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">        <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="nc">Rum</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">rumConfig</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="step-6--enable-rum-to-start-sending-data">
      Step 6 - Enable RUM to start sending data
    </h3>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="c1">// in a common source set
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="k">fun</span> <span class="nf">initializeRum</span><span class="p">(</span><span class="n">applicationId</span><span class="p">:</span> <span class="n">String</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">val</span> <span class="py">rumConfiguration</span> <span class="p">=</span> <span class="nc">RumConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span><span class="n">applicationId</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">trackLongTasks</span><span class="p">(</span><span class="n">durationThreshold</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">apply</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">                <span class="c1">// platform specific setup
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>                <span class="n">rumPlatformSetup</span><span class="p">(</span><span class="k">this</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">}</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="nc">Rum</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">rumConfiguration</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="k">internal</span> <span class="k">expect</span> <span class="k">fun</span> <span class="nf">rumPlatformSetup</span><span class="p">(</span><span class="n">rumConfigurationBuilder</span><span class="p">:</span> <span class="nc">RumConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// in iOS source set
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="k">internal</span> <span class="k">actual</span> <span class="k">fun</span> <span class="nf">rumPlatformSetup</span><span class="p">(</span><span class="n">rumConfigurationBuilder</span><span class="p">:</span> <span class="nc">RumConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">with</span><span class="p">(</span><span class="n">rumConfigurationBuilder</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="n">trackUiKitViews</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="n">trackUiKitActions</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// check more iOS-specific methods
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// in Android source set
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="k">internal</span> <span class="k">actual</span> <span class="k">fun</span> <span class="nf">rumPlatformSetup</span><span class="p">(</span><span class="n">rumConfigurationBuilder</span><span class="p">:</span> <span class="nc">RumConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">with</span><span class="p">(</span><span class="n">rumConfigurationBuilder</span><span class="p">)</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="n">useViewTrackingStrategy</span><span class="p">(</span><span class="cm">/** choose view tracking strategy **/</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">        <span class="n">trackUserInteractions</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// check more Android-specific methods
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      See
      <a
        href="/real_user_monitoring/application_monitoring/advanced_configuration/kotlin_multiplatform/#automatically-track-views"
        >Automatically track views</a
      >
      to enable automatic tracking of all your views.
    </p>
    <h3 id="set-tracking-consent--gdpr-compliance">
      Set tracking consent (GDPR compliance)
    </h3>
    <p>
      To be compliant with GDPR, the SDK requires the tracking consent value at
      initialization. Tracking consent can be one of the following values:
    </p>
    <ul>
      <li>
        <code>TrackingConsent.PENDING</code>: (Default) The SDK starts
        collecting and batching the data but does not send it to the collection
        endpoint. The SDK waits for the new tracking consent value to decide
        what to do with the batched data.
      </li>
      <li>
        <code>TrackingConsent.GRANTED</code>: The SDK starts collecting the data
        and sends it to the data collection endpoint.
      </li>
      <li>
        <code>TrackingConsent.NOT_GRANTED</code>: The SDK does not collect any
        data. You are not able to manually send any logs, traces, or RUM events.
      </li>
    </ul>
    <p>
      To update the tracking consent after the SDK is initialized, call
      <code>Datadog.setTrackingConsent(&lt;NEW CONSENT&gt;)</code>. The SDK
      changes its behavior according to the new consent. For example, if the
      current tracking consent is <code>TrackingConsent.PENDING</code> and you
      update it to:
    </p>
    <ul>
      <li>
        <code>TrackingConsent.GRANTED</code>: The SDK sends all current batched
        data and future data directly to the data collection endpoint.
      </li>
      <li>
        <code>TrackingConsent.NOT_GRANTED</code>: The SDK wipes all batched data
        and does not collect any future data.
      </li>
    </ul>
    <h3
      id="step-7--initialize-the-rum-ktor-plugin-to-track-network-events-made-with-ktor"
    >
      Step 7 - Initialize the RUM Ktor plugin to track network events made with
      Ktor
    </h3>
    <ol>
      <li>
        In your <code>build.gradle.kts</code> file, add the Gradle dependency to
        <code>dd-sdk-kotlin-multiplatform-ktor</code> for Ktor 2.x, or
        <code>dd-sdk-kotlin-multiplatform-ktor3</code> for Ktor 3.x:
      </li>
    </ol>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">kotlin</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="n">sourceSets</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="c1">// ...
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="n">commonMain</span><span class="p">.</span><span class="n">dependencies</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="c1">// Use this line if you are using Ktor 2.x
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>            <span class="n">implementation</span><span class="p">(</span><span class="s2">&#34;com.datadoghq:dd-sdk-kotlin-multiplatform-ktor:x.x.x&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="c1">// Use this line if you are using Ktor 3.x
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>            <span class="c1">// implementation(&#34;com.datadoghq:dd-sdk-kotlin-multiplatform-ktor3:x.x.x&#34;)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>        <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <ol start="2">
      <li>
        To track your Ktor requests as resources, add the provided
        <a
          href="https://github.com/DataDog/dd-sdk-kotlin-multiplatform/tree/develop/integrations/ktor"
          >Datadog Ktor plugin</a
        >:
      </li>
    </ol>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-kotlin">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="k">val</span> <span class="py">ktorClient</span> <span class="p">=</span> <span class="n">HttpClient</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">install</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="n">datadogKtorPlugin</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">            <span class="n">tracedHosts</span> <span class="p">=</span> <span class="n">mapOf</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">                <span class="s2">&#34;example.com&#34;</span> <span class="n">to</span> <span class="n">setOf</span><span class="p">(</span><span class="nc">TracingHeaderType</span><span class="p">.</span><span class="n">DATADOG</span><span class="p">),</span>
</span></span><span class="line"><span class="cl">                <span class="s2">&#34;example.eu&#34;</span> <span class="n">to</span> <span class="n">setOf</span><span class="p">(</span><span class="nc">TracingHeaderType</span><span class="p">.</span><span class="n">DATADOG</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">            <span class="p">),</span>
</span></span><span class="line"><span class="cl">            <span class="n">traceSampleRate</span> <span class="p">=</span> <span class="m">100f</span>
</span></span><span class="line"><span class="cl">        <span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      This records each request processed by the <code>HttpClient</code> as a
      resource in RUM, with all the relevant information automatically filled
      (URL, method, status code, and error). Only the network requests that
      started when a view is active are tracked. To track requests when your
      application is in the background,
      <a
        href="/real_user_monitoring/application_monitoring/advanced_configuration/kotlin_multiplatform/#custom-views"
        >create a view manually</a
      >
      or enable <a href="#track-background-events">background view tracking</a>.
    </p>
    <h2 id="track-errors">Track errors</h2>
    <p>
      <a href="/real_user_monitoring/error_tracking/kotlin_multiplatform/"
        >Kotlin Multiplatform Crash Reporting and Error Tracking</a
      >
      displays any issues in your application and the latest available errors.
      You can view error details and attributes including JSON in the
      <a href="/real_user_monitoring/explorer/">RUM Explorer</a>.
    </p>
    <h2 id="sending-data-when-device-is-offline">
      Sending data when device is offline
    </h2>
    <p>
      RUM ensures availability of data when your user device is offline. In case
      of low-network areas, or when the device battery is too low, all the RUM
      events are first stored on the local device in batches.
    </p>
    <p>
      Each batch follows the intake specification. They are sent as soon as the
      network is available, and the battery is high enough to ensure the Datadog
      SDK does not impact the end user's experience. If the network is not
      available while your application is in the foreground, or if an upload of
      data fails, the batch is kept until it can be sent successfully.
    </p>
    <p>
      This means that even if users open your application while offline, no data
      is lost. To ensure the SDK does not use too much disk space, the data on
      the disk is automatically discarded if it gets too old.
    </p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Roku"
    data-if="5596"
  >
    <p>
      This page describes how to instrument your applications for
      <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> with the
      Roku SDK. RUM includes Error Tracking by default, but if you have
      purchased Error Tracking as a standalone product, see the
      <a href="/error_tracking/frontend/mobile/roku/"
        >Error Tracking setup guide</a
      >
      for specific steps.
    </p>
    <p>
      The Datadog Roku SDK supports BrightScript channels for Roku OS 10 and
      higher.
    </p>
    <h2 id="setup">Setup</h2>
    <h3 id="step-1--declare-the-sdk-as-a-dependency">
      Step 1 - Declare the SDK as a dependency
    </h3>
    <h4 id="using-ropm--recommended">Using ROPM (recommended)</h4>
    <p>
      <code>ROPM</code> is a package manager for the Roku platform (based on
      NPM). If you're not already using <code>ROPM</code> in your Roku project,
      read their
      <a href="https://github.com/rokucommunity/ropm">Getting started guide</a>.
      Once your project is set up to use <code>ROPM</code>, you can use the
      following command to install the Datadog dependency:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-shell">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl">ropm install datadog-roku
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h4 id="setup-manually">Setup manually</h4>
    <p>
      If your project does not use <code>ROPM</code>, install the library
      manually by downloading the
      <a href="https://github.com/DataDog/dd-sdk-roku">Roku SDK</a> zip archive
      and unzipping it in your project's root folder.
    </p>
    <p>
      Make sure you have a <code>roku_modules/datadogroku</code> subfolder in
      both the <code>components</code> and <code>source</code> folders of your
      project.
    </p>
    <h3 id="step-2--specify-application-details-in-datadog">
      Step 2 - Specify application details in Datadog
    </h3>
    <ol>
      <li>
        Navigate to
        <a href="https://app.datadoghq.com/rum/application/create"
          ><strong>Digital Experience</strong> &gt;
          <strong>Add an Application</strong></a
        >.
      </li>
      <li>
        Select <strong>Roku</strong> as the application type and enter an
        application name to generate a unique Datadog application ID and client
        token.
      </li>
      <li>
        To disable automatic user data collection for client IP or geolocation
        data, uncheck the boxes for those settings. For more information, see
        <a
          href="/real_user_monitoring/application_monitoring/roku/data_collected"
          >Roku Data Collected</a
        >.
      </li>
    </ol>
    <div class="alert alert-info">
      <p>
        If you've purchased Error Tracking as a standalone product (without
        RUM), navigate to
        <a href="https://app.datadoghq.com/error-tracking/settings/setup/client"
          ><strong>Error Tracking</strong> &gt; <strong>Settings</strong> &gt;
          <strong>Browser and Mobile</strong> &gt;
          <strong>Add an Application</strong></a
        >
        instead.
      </p>
    </div>
    <p>
      To ensure the safety of your data, you must use a client token. If you use
      only
      <a href="/account_management/api-app-keys/#api-keys">Datadog API keys</a>
      to configure the <code>dd-sdk-roku</code> library, they are exposed
      client-side in the Roku channel's BrightScript code.
    </p>
    <p>
      For more information about setting up a client token, see the
      <a href="/account_management/api-app-keys/#client-tokens"
        >Client Token documentation</a
      >.
    </p>
    <h3 id="step-3--initialize-the-library">Step 3 - Initialize the library</h3>
    <p>
      In the initialization snippet, set an environment name. For more
      information, see
      <a href="/getting_started/tagging/using_tags/#rum--session-replay"
        >Using Tags</a
      >.
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-vb.net">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="k">sub</span> <span class="nf">RunUserInterface</span><span class="p">(</span><span class="n">args</span> <span class="ow">as</span> <span class="n">dynamic</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="n">screen</span> <span class="o">=</span> <span class="n">CreateObject</span><span class="p">(</span><span class="s">&#34;roSGScreen&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="n">scene</span> <span class="o">=</span> <span class="n">screen</span><span class="p">.</span><span class="n">CreateScene</span><span class="p">(</span><span class="s">&#34;MyScene&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="n">screen</span><span class="p">.</span><span class="n">show</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="n">datadogroku_initialize</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">        <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;CLIENT_TOKEN&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="n">applicationId</span><span class="p">:</span> <span class="s">&#34;&lt;APPLICATION_ID&gt;&#34;</span>
</span></span><span class="line"><span class="cl">        <span class="n">site</span><span class="p">:</span> <span class="s">&#34;<span class="cdoc js-region-param region-param" data-region-param="roku_site"></span>&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;ENV_NAME&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="n">sessionSampleRate</span><span class="p">:</span> <span class="n">100</span><span class="p">,</span> <span class="c">&#39; the percentage (integer) of sessions to track
</span></span></span><span class="line"><span class="cl"><span class="c"></span>        <span class="n">launchArgs</span><span class="p">:</span> <span class="n">args</span>
</span></span><span class="line"><span class="cl">    <span class="p">})</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c">&#39; complete your channel setup here
</span></span></span><span class="line"><span class="cl"><span class="c"></span><span class="k">end</span> <span class="k">sub</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h4 id="sample-session-rates">Sample session rates</h4>
    <p>
      To control the data your application sends to Datadog RUM, you can specify
      a sampling rate for RUM sessions while
      <a
        href="/real_user_monitoring/application_monitoring/roku/advanced_configuration/#enrich-user-sessions"
        >initializing the RUM Roku SDK</a
      >. The rate is a percentage between 0 and 100. By default,
      <code>sessionSamplingRate</code> is set to 100 (keep all sessions).
    </p>
    <h2 id="instrument-the-channel">Instrument the channel</h2>
    <p>
      See
      <a href="#track-rum-resources"><strong>Track RUM Resources</strong></a> to
      enable automatic tracking of all your resources, and
      <a href="#enrich-user-sessions"><strong>Enrich user sessions</strong></a>
      to add custom global or user information to your events.
    </p>
    <h3 id="track-views">Track Views</h3>
    <p>
      To split
      <a href="/real_user_monitoring/application_monitoring/roku/data_collected"
        >user sessions</a
      >
      into logical steps, manually start a View using the following code. Every
      navigation to a new screen within your channel should correspond to a new
      View.
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-vb.net">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl">    <span class="n">viewName</span> <span class="o">=</span> <span class="s">&#34;VideoDetails&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="n">viewUrl</span> <span class="o">=</span> <span class="s">&#34;components/screens/VideoDetails.xml&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="n">m</span><span class="p">.</span><span class="n">global</span><span class="p">.</span><span class="n">datadogRumAgent</span><span class="p">.</span><span class="n">callfunc</span><span class="p">(</span><span class="s">&#34;startView&#34;</span><span class="p">,</span> <span class="n">viewName</span><span class="p">,</span> <span class="n">viewUrl</span><span class="p">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="track-rum-actions">Track RUM Actions</h3>
    <p>
      RUM Actions represent the interactions your users have with your channel.
      You can forward actions to Datadog as follows:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-vb.net">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl">    <span class="n">targetName</span> <span class="o">=</span> <span class="s">&#34;playButton&#34;</span> <span class="c">&#39; the name of the SG Node the user interacted with
</span></span></span><span class="line"><span class="cl"><span class="c"></span>    <span class="n">actionType</span> <span class="o">=</span> <span class="s">&#34;click&#34;</span> <span class="c">&#39; the type of interaction, should be one of &#34;click&#34;, &#34;back&#34;, or &#34;custom&#34; 
</span></span></span><span class="line"><span class="cl"><span class="c"></span>    <span class="n">m</span><span class="p">.</span><span class="n">global</span><span class="p">.</span><span class="n">datadogRumAgent</span><span class="p">.</span><span class="n">callfunc</span><span class="p">(</span><span class="s">&#34;addAction&#34;</span><span class="p">,</span> <span class="p">{</span> <span class="n">target</span><span class="p">:</span> <span class="n">targetName</span><span class="p">,</span> <span class="n">type</span><span class="p">:</span> <span class="n">actionType</span><span class="p">})</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="track-rum-errors">Track RUM errors</h3>
    <p>
      Whenever you perform an operation that might throw an exception, you can
      forward the error to Datadog as follows:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-vb.net">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl">    <span class="k">try</span>
</span></span><span class="line"><span class="cl">        <span class="n">doSomethingThatMightThrowAnException</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="k">catch</span> <span class="k">error</span>
</span></span><span class="line"><span class="cl">        <span class="n">m</span><span class="p">.</span><span class="n">global</span><span class="p">.</span><span class="n">datadogRumAgent</span><span class="p">.</span><span class="n">callfunc</span><span class="p">(</span><span class="s">&#34;addError&#34;</span><span class="p">,</span> <span class="k">error</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="k">end</span> <span class="k">try</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h2 id="sending-data-when-device-is-offline">
      Sending data when device is offline
    </h2>
    <p>
      RUM ensures availability of data when your user device is offline. In case
      of low-network areas, or when the device battery is too low, all the RUM
      events are first stored on the local device in batches.
    </p>
    <p>
      Each batch follows the intake specification. They are sent as soon as the
      network is available, and the battery is high enough to ensure the Datadog
      SDK does not impact the end user's experience. If the network is not
      available while your application is in the foreground, or if an upload of
      data fails, the batch is kept until it can be sent successfully.
    </p>
    <p>
      This means that even if users open your application while offline, no data
      is lost. To ensure the SDK does not use too much disk space, the data on
      the disk is automatically discarded if it gets too old.
    </p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Unity"
    data-if="5597"
  >
    <p>
      This page describes how to instrument your applications for
      <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> with the
      Unity SDK. RUM includes Error Tracking by default, but if you have
      purchased Error Tracking as a standalone product, see the
      <a href="/error_tracking/frontend/mobile/unity/"
        >Error Tracking setup guide</a
      >
      for specific steps.
    </p>
    <div class="alert alert-info">
      <p>
        Datadog supports Unity Monitoring for iOS and Android for Unity LTS
        2022+.
      </p>
    </div>
    <p>
      Datadog does not support Desktop (Windows, Mac, or Linux) or console
      deployments from Unity. If you have a game or application and want to use
      Datadog RUM to monitor its performance, create a ticket with
      <a href="/help/">Datadog support</a>.
    </p>
    <h3 id="step-1--install-the-sdk">Step 1 - Install the SDK</h3>
    <ol>
      <li>
        <p>
          Install the
          <a href="https://github.com/googlesamples/unity-jar-resolver"
            >External Dependency Manager for Unity (EDM4U)</a
          >. This can be done using
          <a
            href="https://openupm.com/packages/com.google.external-dependency-manager/"
            >Open UPM</a
          >.
        </p>
      </li>
      <li>
        <p>
          Add the Datadog SDK Unity package from its Git URL at
          <a href="https://github.com/DataDog/unity-package"
            >https://github.com/DataDog/unity-package</a
          >. The package URL is
          <code>https://github.com/DataDog/unity-package.git</code>.
        </p>
      </li>
      <li>
        <p>
          (Android only) Configure your project to use
          <a href="https://docs.unity3d.com/Manual/gradle-templates.html"
            >Gradle templates</a
          >, and enable both <code>Custom Main Template</code> and
          <code>Custom Gradle Properties Template</code>.
        </p>
      </li>
      <li>
        <p>
          (Android only) If you build and receive
          <code>Duplicate class</code> errors (common in Unity 2022.x), add the
          following code to the <code>dependencies</code> block of your
          <code>mainTemplate.gradle</code>:
        </p>
      </li>
    </ol>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-groovy">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">constraints</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">     <span class="n">implementation</span><span class="o">(</span><span class="s2">&#34;org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.0&#34;</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">         <span class="n">because</span><span class="o">(</span><span class="s2">&#34;kotlin-stdlib-jdk8 is now a part of kotlin-stdlib&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">     <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h4 id="webgl">WebGL</h4>
    <ol>
      <li>
        <p>
          Create a custom WebGL template, following the instructions provided by
          <a
            href="https://docs.unity3d.com/2022.3/Documentation/Manual/webgl-templates.html"
            >Unity</a
          >, or by using the minimally modified version in Datadog's
          <a
            href="https://github.com/DataDog/dd-sdk-unity/tree/develop/samples/Datadog%20Sample/Assets/WebGLTemplates"
            >GitHub repo</a
          >.
        </p>
      </li>
      <li>
        <p>
          If you are using your own WebGL template, or have added a new WebGL
          template, modify it to include the Datadog Browser SDK delivered by
          CDN.
        </p>
      </li>
    </ol>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-html">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="p">&lt;</span><span class="nt">script</span> <span class="na">type</span><span class="o">=</span><span class="s">&#34;text/javascript&#34;</span> <span class="na">src</span><span class="o">=</span><span class="s">&#34;https://www.datadoghq-browser-agent.com/us1/v6/datadog-logs.js&#34;</span><span class="p">&gt;&lt;/</span><span class="nt">script</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="p">&lt;</span><span class="nt">script</span> <span class="na">type</span><span class="o">=</span><span class="s">&#34;text/javascript&#34;</span> <span class="na">src</span><span class="o">=</span><span class="s">&#34;https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum-slim.js&#34;</span><span class="p">&gt;&lt;/</span><span class="nt">script</span><span class="p">&gt;</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="step-2--specify-application-details-in-the-ui">
      Step 2 - Specify application details in the UI
    </h3>
    <ol>
      <li>
        In Datadog, navigate to
        <a href="https://app.datadoghq.com/rum/application/create"
          ><strong>Digital Experience</strong> &gt;
          <strong>Add an Application</strong></a
        >.
      </li>
      <li>Choose <strong>Unity</strong> as the application type.</li>
      <li>
        Provide an application name to generate a unique Datadog application ID
        and client token.
      </li>
      <li>
        To disable automatic user data collection for either client IP or
        geolocation data, uncheck the boxes for those settings.
      </li>
    </ol>
    <p>
      To ensure the safety of your data, you must use a client token. For more
      information about setting up a client token, see the
      <a href="/account_management/api-app-keys/#client-tokens"
        >Client Token documentation</a
      >.
    </p>
    <h3 id="step-3--configure-datadog-settings-in-unity">
      Step 3 - Configure Datadog settings in Unity
    </h3>
    <p>
      After installing the Datadog Unity SDK, you need to set Datadog's settings
      in the Unity UI. Navigate to your <code>Project Settings</code> and click
      on the <code>Datadog</code> section on the left hand side.
    </p>
    <p>The following parameters are available:</p>
    <table>
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Required?</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Enable Datadog</td>
          <td>No</td>
          <td>
            Whether Datadog should be enabled. Disabling Datadog does not cause
            any of the Datadog APIs to fail, throw exceptions, or return
            <code>null</code> from any calls. It only stops the SDK from sending
            any information.
          </td>
        </tr>
        <tr>
          <td>Output Symbol Files</td>
          <td>No</td>
          <td>
            This option enables the output of symbol files for Datadog
            symbolication and file/line mapping features in Datadog Error
            Tracking.
          </td>
        </tr>
        <tr>
          <td>Perform Native Stack Mapping</td>
          <td>No</td>
          <td>
            Converts C# stacks traces to native stack traces in non-development
            builds. This allows for file and line mapping to C# code if symbol
            files are uploaded to Datadog. This is not supported if Output
            Symbols is disabled.
          </td>
        </tr>
        <tr>
          <td>Client Token</td>
          <td>Yes</td>
          <td>
            Your client token created for your application on Datadog's website.
          </td>
        </tr>
        <tr>
          <td>Env</td>
          <td>No</td>
          <td>
            The name of the environment for your application. Defaults to
            <code>&quot;prod&quot;</code>.
          </td>
        </tr>
        <tr>
          <td>Service Name</td>
          <td>No</td>
          <td>
            The service name for your application. If this is not set, it is
            automatically set to your application's package name or bundle name
            (e.g.: com.example.android).
          </td>
        </tr>
        <tr>
          <td>Datadog Site</td>
          <td>Yes</td>
          <td>The site you send your data to.</td>
        </tr>
        <tr>
          <td>Batch Size</td>
          <td>Yes</td>
          <td>
            Sets the preferred size of batched data uploaded to Datadog. This
            value impacts the size and number of requests performed by the SDK
            (small batches mean more requests, but each request becomes smaller
            in size).
          </td>
        </tr>
        <tr>
          <td>Upload Frequency</td>
          <td>Yes</td>
          <td>Sets the preferred frequency of uploading data to Datadog.</td>
        </tr>
        <tr>
          <td>Batch Processing Level</td>
          <td>Yes</td>
          <td>
            Defines the maximum amount of batches processed sequentially without
            a delay within one reading/uploading cycle.
          </td>
        </tr>
        <tr>
          <td>Enable Crash Reporting</td>
          <td>No</td>
          <td>Enables crash reporting in the RUM SDK.</td>
        </tr>
        <tr>
          <td>Forward Unity Logs</td>
          <td>No</td>
          <td>
            Whether to forward logs made from Unity's
            <code>Debug.Log</code> calls to Datadog's default logger.
          </td>
        </tr>
        <tr>
          <td>Remote Log Threshold</td>
          <td>Yes</td>
          <td>
            The level at which the default logger forwards logs to Datadog. Logs
            below this level are not sent.
          </td>
        </tr>
        <tr>
          <td>Enable RUM</td>
          <td>No</td>
          <td>
            Whether to enable sending data from Datadog's Real User Monitoring
            APIs
          </td>
        </tr>
        <tr>
          <td>Enable Automatic Scene Tracking</td>
          <td>No</td>
          <td>
            Whether Datadog should automatically track new Views by intercepting
            Unity's <code>SceneManager</code> loading.
          </td>
        </tr>
        <tr>
          <td>RUM Application ID</td>
          <td>Yes (if RUM is enabled)</td>
          <td>
            The RUM Application ID created for your application on Datadog's
            website.
          </td>
        </tr>
        <tr>
          <td>Session Sample Rate</td>
          <td>Yes</td>
          <td>
            The percentage of sessions to send to Datadog. Between 0 and 100.
          </td>
        </tr>
        <tr>
          <td>Trace Sample Rate</td>
          <td>Yes</td>
          <td>
            The percentage of distributed traces to send to Datadog. Between 0
            and 100.
          </td>
        </tr>
        <tr>
          <td>Trace Context Injection</td>
          <td>Yes</td>
          <td>
            Whether to inject trace context into <code>All</code> or
            <code>Only Sampled</code> resource requests.
          </td>
        </tr>
        <tr>
          <td>Track Non-Fatal ANRs</td>
          <td>No</td>
          <td>
            (Android Only) Whether to track non-fatal ANRs (Application Not
            Responding) errors. The &quot;SDK Default&quot; option disables ANR
            detection on Android 30+ because it would create too much noise over
            fatal ANRs. On Android 29 and below, however, the reporting of
            non-fatal ANRs is enabled by default, as fatal ANRs cannot be
            reported on those versions.
          </td>
        </tr>
        <tr>
          <td>Track Non-Fatal App Hangs</td>
          <td>No</td>
          <td>
            (iOS Only) Whether to track non-fatal app hangs. App hangs are
            detected when the app is unresponsive for a certain amount of time.
            The supplied &quot;Threshold&quot; is the amount of time in seconds
            that the app must be unresponsive before it is considered a
            non-fatal app hang.
          </td>
        </tr>
        <tr>
          <td>First Party Hosts</td>
          <td>No</td>
          <td>
            To enable distributed tracing, you must specify which hosts are
            considered &quot;first party&quot; and have trace information
            injected.
          </td>
        </tr>
      </tbody>
    </table>
    <h3 id="sample-rum-sessions">Sample RUM sessions</h3>
    <p>
      You can control the data your application sends to Datadog RUM during
      instrumentation of the RUM Unity SDK. Specify the
      <strong>Session Sample Rate</strong> as a percentage between 0 and 100 in
      the Project Settings window in Unity.
    </p>
    <h2 id="using-datadog">Using Datadog</h2>
    <h3 id="setting-tracking-consent">Setting tracking consent</h3>
    <p>
      In order to be compliant with data protection and privacy policies, the
      Datadog Unity SDK requires setting a tracking consent value.
    </p>
    <p>
      The <code>trackingConsent</code> setting can be one of the following
      values:
    </p>
    <ul>
      <li>
        <code>TrackingConsent.Pending</code>: The Unity SDK starts collecting
        and batching the data but does not send it to Datadog. The Unity SDK
        waits for the new tracking consent value to decide what to do with the
        batched data.
      </li>
      <li>
        <code>TrackingConsent.Granted</code>: The Unity SDK starts collecting
        the data and sends it to Datadog.
      </li>
      <li>
        <code>TrackingConsent.NotGranted</code>: The Unity SDK does not collect
        any data. No logs are sent to Datadog.
      </li>
    </ul>
    <p>
      Before Datadog sends any data, we need to confirm the user's
      <code>Tracking Consent</code>. This is set to
      <code>TrackingConsent.Pending</code> during initialization, and needs to
      be set to <code>TrackingConsent.Granted</code> before Datadog sends any
      information.
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-csharp">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="n">DatadogSdk</span><span class="p">.</span><span class="n">Instance</span><span class="p">.</span><span class="n">SetTrackingConsent</span><span class="p">(</span><span class="n">TrackingConsent</span><span class="p">.</span><span class="n">Granted</span><span class="p">);</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="logging">Logging</h3>
    <p>
      You can intercept and send logs from Unity's default debug logger by
      enabling the option and threshold in your projects settings.
    </p>
    <p>
      Datadog maps the Unity levels to the following in Datadog's Logging
      Levels:
    </p>
    <table>
      <thead>
        <tr>
          <th>Unity LogType</th>
          <th>Datadog Log Level</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Log</td>
          <td>Info</td>
        </tr>
        <tr>
          <td>Error</td>
          <td>Error</td>
        </tr>
        <tr>
          <td>Assert</td>
          <td>Critical</td>
        </tr>
        <tr>
          <td>Warning</td>
          <td>Warn</td>
        </tr>
        <tr>
          <td>Exception</td>
          <td>Critical</td>
        </tr>
      </tbody>
    </table>
    <p>
      You can access this default logger to add attributes or tags through the
      <code>DatadogSdk.DefaultLogger</code> property.
    </p>
    <p>
      You can also create additional loggers for more fine grained control of
      thresholds, service names, logger names, or to supply additional
      attributes.
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-csharp">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kt">var</span> <span class="n">logger</span> <span class="p">=</span> <span class="n">DatadogSdk</span><span class="p">.</span><span class="n">Instance</span><span class="p">.</span><span class="n">CreateLogger</span><span class="p">(</span><span class="k">new</span> <span class="n">DatadogLoggingOptions</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">NetworkInfoEnabled</span> <span class="p">=</span> <span class="k">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">DatadogReportingThreshold</span> <span class="p">=</span> <span class="n">DdLogLevel</span><span class="p">.</span><span class="n">Debug</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span><span class="line"><span class="cl"><span class="n">logger</span><span class="p">.</span><span class="n">Info</span><span class="p">(</span><span class="s">&#34;Hello from Unity!&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">logger</span><span class="p">.</span><span class="n">Debug</span><span class="p">(</span><span class="s">&#34;Hello with attributes&#34;</span><span class="p">,</span> <span class="k">new</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span> <span class="s">&#34;my_attribute&#34;</span><span class="p">,</span> <span class="m">122</span> <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span> <span class="s">&#34;second_attribute&#34;</span><span class="p">,</span> <span class="s">&#34;with_value&#34;</span> <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span> <span class="s">&#34;bool_attribute&#34;</span><span class="p">,</span> <span class="k">true</span> <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="s">&#34;nested_attribute&#34;</span><span class="p">,</span> <span class="k">new</span> <span class="n">Dictionary</span><span class="p">&lt;</span><span class="kt">string</span><span class="p">,</span> <span class="kt">object</span><span class="p">&gt;()</span>
</span></span><span class="line"><span class="cl">        <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="p">{</span> <span class="s">&#34;internal_attribute&#34;</span><span class="p">,</span> <span class="m">1.234</span> <span class="p">},</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">},</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="real-user-monitoring--rum">Real User Monitoring (RUM)</h3>
    <h4 id="manual-scene--view-tracking">Manual Scene (View) Tracking</h4>
    <p>
      To manually track new Scenes (<code>Views</code> in Datadog), use the
      <code>StartView</code> and <code>StopView</code> methods:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-csharp">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="k">public</span> <span class="k">void</span> <span class="n">Start</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">DatadogSdk</span><span class="p">.</span><span class="n">Instance</span><span class="p">.</span><span class="n">Rum</span><span class="p">.</span><span class="n">StartView</span><span class="p">(</span><span class="s">&#34;My View&#34;</span><span class="p">,</span> <span class="k">new</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="p">{</span> <span class="s">&#34;view_attribute&#34;</span><span class="p">:</span> <span class="s">&#34;active&#34;</span> <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">});</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>Starting a new view automatically ends the previous view.</p>
    <h4 id="automatic-scene-tracking">Automatic Scene Tracking</h4>
    <p>
      You can also set <code>Enable Automatic Scene Tracking</code> in your
      Project Settings to enable automatically tracking active scenes. This uses
      Unity's <code>SceneManager.activeSceneChanged</code> event to
      automatically start new scenes.
    </p>
    <h4 id="web-requests--resource-tracking">
      Web Requests / Resource Tracking
    </h4>
    <p>
      Datadog offers <code>DatadogTrackedWebRequest</code>, which is a
      <code>UnityWebRequest</code> wrapper intended to be a drop-in replacement
      for <code>UnityWebRequest</code>.
      <code>DatadogTrackedWebRequest</code> enables
      <a
        href="/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=browserrum"
        >Datadog Distributed Tracing</a
      >.
    </p>
    <p>
      To enable Datadog Distributed Tracing, you must set the
      <code>First Party Hosts</code> in your project settings to a domain that
      supports distributed tracing. You can also modify the sampling rate for
      distributed tracing by setting the <code>Tracing Sampling Rate</code>.
    </p>
    <p>
      <code>First Party Hosts</code> does not allow wildcards, but matches any
      subdomains for a given domain. For example, api.example.com matches
      staging.api.example.com and prod.api.example.com, but not
      news.example.com.
    </p>
    <h2 id="sending-data-when-device-is-offline">
      Sending data when device is offline
    </h2>
    <p>
      RUM helps ensure availability of data when your user device is offline. In
      case of low-network areas, or when the device battery is too low, all the
      RUM events are first stored on the local device in batches.
    </p>
    <p>
      Each batch follows the intake specification. They are sent as soon as the
      network is available, and the battery is high enough to help ensure the
      Datadog SDK does not impact the end user's experience. If the network is
      not available while your application is in the foreground, or if an upload
      of data fails, the batch is kept until it can be sent successfully.
    </p>
    <p>
      This means that even if users open your application while offline, no data
      is lost. To help ensure the SDK does not use too much disk space, the data
      on the disk is automatically discarded if it gets too old.
    </p>
  </div>
</article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"5590":{"m":"F","n":"e","p":{"0":{"m":"V","p":["sdk"],"v":"browser"},"1":"browser"},"v":true,"r":"5590"},"5591":{"m":"F","n":"e","p":{"0":{"m":"V","p":["sdk"],"v":"browser"},"1":"android"},"v":false,"r":"5591"},"5592":{"m":"F","n":"e","p":{"0":{"m":"V","p":["sdk"],"v":"browser"},"1":"ios"},"v":false,"r":"5592"},"5593":{"m":"F","n":"e","p":{"0":{"m":"V","p":["sdk"],"v":"browser"},"1":"flutter"},"v":false,"r":"5593"},"5594":{"m":"F","n":"e","p":{"0":{"m":"V","p":["sdk"],"v":"browser"},"1":"react_native"},"v":false,"r":"5594"},"5595":{"m":"F","n":"e","p":{"0":{"m":"V","p":["sdk"],"v":"browser"},"1":"kotlin_multiplatform"},"v":false,"r":"5595"},"5596":{"m":"F","n":"e","p":{"0":{"m":"V","p":["sdk"],"v":"browser"},"1":"roku"},"v":false,"r":"5596"},"5597":{"m":"F","n":"e","p":{"0":{"m":"V","p":["sdk"],"v":"browser"},"1":"unity"},"v":false,"r":"5597"}},    filtersManifest: {"filtersByTraitId":{"sdk":{"config":{"trait_id":"sdk","option_group_id":"sdk_platform_options","label":"SDK"},"defaultValsByOptionGroupId":{"sdk_platform_options":"browser"}}},"defaultValsByTraitId":{"sdk":"browser"},"optionGroupsById":{"sdk_platform_options":[{"default":true,"id":"browser","label":"Browser"},{"id":"android","label":"Android"},{"id":"ios","label":"iOS"},{"id":"flutter","label":"Flutter"},{"id":"react_native","label":"React Native"},{"id":"kotlin_multiplatform","label":"Kotlin Multiplatform"},{"id":"roku","label":"Roku"},{"id":"unity","label":"Unity"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>

{{< img src="real_user_monitoring/android/android-new-application.png" style="display:none;" alt="" >}}

