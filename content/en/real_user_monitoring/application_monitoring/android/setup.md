---
title: Android and Android TV Monitoring Setup
description: Collect RUM and Error Tracking data from your Android projects.
aliases:
  - /real_user_monitoring/android/
  - /real_user_monitoring/setup/android
  - /real_user_monitoring/mobile_and_tv_monitoring/android/setup
further_reading:
  - link: >-
      /real_user_monitoring/application_monitoring/android/advanced_configuration
    tag: Documentation
    text: RUM Android Advanced Configuration
  - link: https://github.com/DataDog/dd-sdk-android
    tag: Source Code
    text: Source code for dd-sdk-android
  - link: /real_user_monitoring
    tag: Documentation
    text: Explore Datadog RUM
  - link: /real_user_monitoring/guide/mobile-sdk-upgrade
    tag: Documentation
    text: Upgrade RUM Mobile SDKs
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
  <p>
    This page describes how to instrument your web applications with the Datadog
    Browser SDK. The Browser SDK supports
    <a href="/real_user_monitoring/application_monitoring/browser/setup/client"
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
      <strong>Manual client-side setup</strong> (below): Manually add the SDK to
      your application code.
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
  <h3 id="step-2--install-the-browser-sdk">Step 2 - Install the Browser SDK</h3>
  <p>Choose the installation method for the Browser SDK.</p>
  <div class="code-tabs">
    <ul class="nav nav-tabs d-flex"></ul>
    <div class="tab-content">
      <div data-lang="npm" class="tab-pane fade" role="tabpanel" title="NPM">
        <p>
          Installing through Node Package Manager (npm) registry is recommended
          for modern web applications. The Browser SDK is packaged with the rest
          of your frontend JavaScript code. It has no impact on page load
          performance. However, the SDK may miss errors, resources, and user
          actions triggered before the SDK is initialized. Datadog recommends
          using a matching version with the Browser Logs SDK.
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
          Installing through CDN async is recommended for web applications with
          performance targets. The Browser SDK loads from Datadog's CDN
          asynchronously, ensuring the SDK download does not impact page load
          performance. However, the SDK may miss errors, resources, and user
          actions triggered before the SDK is initialized.
        </p>
        <p>
          Add the generated code snippet to the head tag of every HTML page you
          want to monitor in your application.
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
      <div
        data-lang="cdn-sync"
        class="tab-pane fade"
        role="tabpanel"
        title="CDN sync"
      >
        <p>
          Installing through CDN sync is recommended for collecting all events.
          The Browser SDK loads from Datadog's CDN synchronously, ensuring the
          SDK loads first and collects all errors, resources, and user actions.
          This method may impact page load performance.
        </p>
        <p>
          Add the generated code snippet to the head tag (in front of any other
          script tags) of every HTML page you want to monitor in your
          application. Placing the script tag higher and loading it
          synchronously ensures Datadog RUM can collect all performance data and
          errors.
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
              ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span>
</span></span><span class="line"><span class="cl">    <span class="nx">src</span><span class="o">=</span><span class="s2">&#34;https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="nx">type</span><span class="o">=</span><span class="s2">&#34;text/javascript&#34;</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
            </div>
          </div>
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
              ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span>
</span></span><span class="line"><span class="cl">    <span class="nx">src</span><span class="o">=</span><span class="s2">&#34;https://www.datadoghq-browser-agent.com/eu/v6/datadog-rum.js&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="nx">type</span><span class="o">=</span><span class="s2">&#34;text/javascript&#34;</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
            </div>
          </div>
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
              ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span>
</span></span><span class="line"><span class="cl">    <span class="nx">src</span><span class="o">=</span><span class="s2">&#34;https://www.datadoghq-browser-agent.com/ap1/v6/datadog-rum.js&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="nx">type</span><span class="o">=</span><span class="s2">&#34;text/javascript&#34;</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
            </div>
          </div>
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
              ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span>
</span></span><span class="line"><span class="cl">    <span class="nx">src</span><span class="o">=</span><span class="s2">&#34;https://www.datadoghq-browser-agent.com/ap2/v6/datadog-rum.js&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="nx">type</span><span class="o">=</span><span class="s2">&#34;text/javascript&#34;</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
            </div>
          </div>
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
              ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span>
</span></span><span class="line"><span class="cl">    <span class="nx">src</span><span class="o">=</span><span class="s2">&#34;https://www.datadoghq-browser-agent.com/us3/v6/datadog-rum.js&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="nx">type</span><span class="o">=</span><span class="s2">&#34;text/javascript&#34;</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
            </div>
          </div>
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
              ><code><span class="line"><span class="cl"><span class="o">&lt;</span><span class="nx">script</span>
</span></span><span class="line"><span class="cl">    <span class="nx">src</span><span class="o">=</span><span class="s2">&#34;https://www.datadoghq-browser-agent.com/us5/v6/datadog-rum.js&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="nx">type</span><span class="o">=</span><span class="s2">&#34;text/javascript&#34;</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
            </div>
          </div>
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
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/application_monitoring/android/advanced_configuration"><span class="w-100 d-flex justify-content-between "><span class="text">RUM Android Advanced Configuration</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://github.com/DataDog/dd-sdk-android"><span class="w-100 d-flex justify-content-between "><span class="text">Source code for dd-sdk-android</span><span class="badge badge-white pe-2 border-0">SOURCE CODE</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring"><span class="w-100 d-flex justify-content-between "><span class="text">Explore Datadog RUM</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/guide/mobile-sdk-upgrade"><span class="w-100 d-flex justify-content-between "><span class="text">Upgrade RUM Mobile SDKs</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {},    filtersManifest: {"filtersByTraitId":{"sdk":{"config":{"trait_id":"sdk","option_group_id":"sdk_platform_options","label":"SDK"},"defaultValsByOptionGroupId":{"sdk_platform_options":"browser"}}},"defaultValsByTraitId":{"sdk":"browser"},"optionGroupsById":{"sdk_platform_options":[{"default":true,"id":"browser","label":"Browser"},{"id":"android","label":"Android"},{"id":"ios","label":"iOS"},{"id":"flutter","label":"Flutter"},{"id":"react_native","label":"React Native"},{"id":"kotlin_multiplatform","label":"Kotlin Multiplatform"},{"id":"roku","label":"Roku"},{"id":"unity","label":"Unity"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>