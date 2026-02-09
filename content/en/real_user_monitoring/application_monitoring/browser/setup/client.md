---
title: Browser Monitoring Client-Side Setup
description: >-
  Set up RUM Browser SDK using client-side instrumentation with NPM or CDN to
  monitor user experience, performance, and errors in web applications.
aliases:
  - /real_user_monitoring/setup
  - /real_user_monitoring/browser/setup/client
further_reading:
  - link: >-
      /real_user_monitoring/application_monitoring/browser/advanced_configuration/
    tag: Documentation
    text: Advanced configuration
  - link: /session_replay/browser/
    tag: Documentation
    text: Setup Session Replay
  - link: /real_user_monitoring/error_tracking/browser/
    tag: Documentation
    text: Setup Error tracking
  - link: /real_user_monitoring/correlate_with_other_telemetry/
    tag: Documentation
    text: Correlate RUM Events with Other Telemetry
---
<div id="cdoc-content" class=""><article>
  <h2 id="overview">Overview</h2>
  <p>
    The Datadog Browser SDK enables Real User Monitoring (RUM) for your web
    applications, providing comprehensive visibility into user experience and
    application performance. With RUM, you can monitor page load times, user
    interactions, resource loading, and application errors in real-time.
  </p>
  <p>RUM helps you:</p>
  <ul>
    <li>
      Monitor user experience with detailed performance metrics for page loads,
      user actions, and resource requests
    </li>
    <li>
      Track user journeys through your application with Session Replay
      capabilities
    </li>
    <li>
      Identify performance bottlenecks and correlate frontend and backend
      performance with APM traces
    </li>
  </ul>
  <p>
    The Browser SDK supports all modern desktop and mobile browsers and provides
    automatic collection of key performance metrics, user interactions, and
    application errors. After setup, you can manage your RUM configurations per
    application in Datadog and visualize the collected data in dashboards and
    the RUM Explorer.
  </p>
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
        <div class="d-none site-region-container" data-region="us">
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
        </div>
        <div class="d-none site-region-container" data-region="eu">
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
        </div>
        <div class="d-none site-region-container" data-region="ap1">
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
        </div>
        <div class="d-none site-region-container" data-region="ap2">
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
        </div>
        <div class="d-none site-region-container" data-region="us3">
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
        </div>
        <div class="d-none site-region-container" data-region="us5">
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
        </div>
        <div class="d-none site-region-container" data-region="gov">
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
        <div class="d-none site-region-container" data-region="us">
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
        </div>
        <div class="d-none site-region-container" data-region="eu">
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
        </div>
        <div class="d-none site-region-container" data-region="ap1">
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
        </div>
        <div class="d-none site-region-container" data-region="ap2">
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
        </div>
        <div class="d-none site-region-container" data-region="us3">
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
        </div>
        <div class="d-none site-region-container" data-region="us5">
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
        </div>
        <div class="d-none site-region-container" data-region="gov">
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
  <h4 id="set-session-sampling-rates">Set session sampling rates</h4>
  <p>
    To control the data your application sends to Datadog RUM, you can specify a
    sampling rate for RUM sessions while initializing the Browser SDK. For
    example, to sample 80% of sessions, set <code>sessionSampleRate</code> to
    80:
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
        ><code><span class="line"><span class="cl"><span class="nx">datadogRum</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">  <span class="nx">applicationId</span><span class="o">:</span> <span class="s1">&#39;&lt;APP_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">clientToken</span><span class="o">:</span> <span class="s1">&#39;&lt;CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">site</span><span class="o">:</span> <span class="s1">&#39;&lt;DATADOG_SITE&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">sessionSampleRate</span><span class="o">:</span> <span class="mi">80</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">sessionReplaySampleRate</span><span class="o">:</span> <span class="mi">20</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="c1">// ... other configuration options
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">});</span>
</span></span></code></pre>
      </div>
    </div>
  </div>
  <p>
    For more information, see
    <a href="/real_user_monitoring/guide/sampling-browser-plans/"
      >Browser RUM &amp; Session Replay Sampling</a
    >.
  </p>
  <h2 id="start-monitoring-your-application">
    Start monitoring your application
  </h2>
  <p>
    Now that you've completed the basic setup for RUM, your application is
    collecting browser errors and you can start monitoring and debugging issues
    in real-time.
  </p>
  <p>
    Visualize the
    <a
      href="/real_user_monitoring/application_monitoring/browser/data_collected/"
      >data collected</a
    >
    in <a href="/real_user_monitoring/platform/dashboards/">dashboards</a> or
    create a search query in the
    <a href="https://app.datadoghq.com/rum/explorer">RUM Explorer</a>.
  </p>
  <p>
    Your application appears as pending on the Applications page until Datadog
    starts receiving data.
  </p>
  <h2 id="next-steps">Next steps</h2>
  <p>
    See
    <a
      href="/real_user_monitoring/application_monitoring/browser/advanced_configuration/"
      >Advanced Configuration</a
    >.
  </p>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/application_monitoring/browser/advanced_configuration/"><span class="w-100 d-flex justify-content-between "><span class="text">Advanced configuration</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/session_replay/browser/"><span class="w-100 d-flex justify-content-between "><span class="text">Setup Session Replay</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/error_tracking/browser/"><span class="w-100 d-flex justify-content-between "><span class="text">Setup Error tracking</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/correlate_with_other_telemetry/"><span class="w-100 d-flex justify-content-between "><span class="text">Correlate RUM Events with Other Telemetry</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
