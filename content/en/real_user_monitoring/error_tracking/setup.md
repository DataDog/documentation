---
title: Client Error Tracking
aliases:
  - /real_user_monitoring/error_tracking/browser_errors
  - /error_tracking/standalone_frontend/browser
further_reading:
  - link: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps
    tag: Source Code
    text: datadog-ci Source code
  - link: /real_user_monitoring/guide/upload-javascript-source-maps
    tag: Documentation
    text: Upload JavaScript source maps
  - link: /error_tracking/explorer
    tag: Documentation
    text: Learn about the Error Tracking Explorer
---
<div id="cdoc-selector"><div id="cdoc-filters-menu"><div class="filter-selector-menu" id="cdoc-filters-pill-menu"><div class="cdoc-pills-container"><p 
    id="cdoc-platform-pills-label" 
    class="cdoc-filter-label"
  >SDK</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="platform" 
      data-option-id="browser"
      aria-selected="true"
      tabIndex="0"
    >Browser</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="android"
      aria-selected="false"
      tabIndex="0"
    >Android</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="ios"
      aria-selected="false"
      tabIndex="0"
    >iOS</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="react_native"
      aria-selected="false"
      tabIndex="0"
    >React Native</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="flutter"
      aria-selected="false"
      tabIndex="0"
    >Flutter</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="roku"
      aria-selected="false"
      tabIndex="0"
    >Roku</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="kotlin_multiplatform"
      aria-selected="false"
      tabIndex="0"
    >Kotlin Multiplatform</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="unity"
      aria-selected="false"
      tabIndex="0"
    >Unity</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
    id="cdoc-platform-dropdown-label" 
    class="cdoc-filter-label"
  >SDK</p><div 
    id="cdoc-dropdown-platform" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-platform-dropdown-label">
      <span 
        id="cdoc-dropdown-platform-label" 
        class="cdoc-btn-label"
      >Browser</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-platform-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="platform" 
      data-option-id="browser"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >Browser</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="android"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Android</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="ios"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >iOS</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="react_native"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >React Native</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="flutter"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Flutter</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="roku"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Roku</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="kotlin_multiplatform"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Kotlin Multiplatform</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="unity"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Unity</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article>
  <div class="cdoc__toggleable" data-if="262">
    <h2 id="overview">Overview</h2>
    <p>
      Error Tracking processes errors collected from the browser by the Browser
      SDK. Whenever a source, custom, report, or console error containing a
      stack trace is collected, Error Tracking processes and groups it under an
      issue, or group of similar errors to be found in the Error Tracking
      Explorer.
    </p>
    <h2 id="setup">Setup</h2>
    <h3 id="create-the-application-in-the-ui">
      Create the application in the UI
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
        Select <code>Javascript</code> as the application type and enter an
        application name to generate a unique Datadog application ID and client
        token.
      </li>
    </ol>
    <h3 id="install-the-browser-sdk">Install the Browser SDK</h3>
    <p>Choose the installation method for the Browser SDK.</p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div data-lang="npm" class="tab-pane fade" role="tabpanel" title="npm">
          <p>
            Installing through npm (Node Package Manager) is recommended for
            modern web applications. The Browser SDK is packaged with the rest
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
            to your <code>package.json</code> file, example if you use npm cli:
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
                ><code><span class="line"><span class="cl">npm install @sentry/browser --save
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
</span></span><span class="line"><span class="cl">  <span class="p">})(</span><span class="nb">window</span><span class="p">,</span><span class="nb">document</span><span class="p">,</span><span class="s1">&#39;script&#39;</span><span class="p">,</span><span class="s1">&#39;https://www.datadoghq-browser-agent.com/<span class="cdoc js-region-param region-param" data-region-param="dd_site_name"></span>/v6/datadog-rum.js&#39;</span><span class="p">,</span><span class="s1">&#39;DD_RUM&#39;</span><span class="p">)</span>
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
</span></span><span class="line"><span class="cl">    <span class="nx">src</span><span class="o">=</span><span class="s2">&#34;https://www.datadoghq-browser-agent.com/us1/<span class="cdoc js-region-param region-param" data-region-param="dd_site_name"></span>/v6/datadog-rum.js&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="nx">type</span><span class="o">=</span><span class="s2">&#34;text/javascript&#34;</span><span class="o">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3 id="initialize-the-browser-sdk">Initialize the Browser SDK</h3>
    <p>
      The SDK should be initialized as early as possible in the app lifecycle.
      This ensures all measurements are captured correctly.
    </p>
    <p>
      In the initialization snippet, set an environment name, service name, and
      client token.
    </p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div data-lang="npm" class="tab-pane fade" role="tabpanel" title="npm">
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
</span></span><span class="line"><span class="cl">   <span class="nx">service</span><span class="o">:</span> <span class="s1">&#39;&lt;SERVICE&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">   <span class="nx">env</span><span class="o">:</span> <span class="s1">&#39;&lt;ENV_NAME&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">   <span class="c1">// site: &#39;&lt;SITE&gt;&#39;,
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>   <span class="c1">// version: &#39;1.0.0&#39;,
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>   <span class="nx">trackUserInteractions</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">   <span class="nx">trackResources</span><span class="o">:</span> <span class="kc">true</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span><span class="line"><span class="cl">
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
</span></span><span class="line"><span class="cl">      <span class="c1">// site: &#39;&lt;SITE&gt;&#39;,
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>      <span class="nx">service</span><span class="o">:</span> <span class="s1">&#39;&lt;APP_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="nx">env</span><span class="o">:</span> <span class="s1">&#39;&lt;ENV_NAME&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="c1">// version: &#39;1.0.0&#39;
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
</span></span><span class="line"><span class="cl">      <span class="c1">// site: &#39;&lt;SITE&gt;&#39;,
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>      <span class="nx">service</span><span class="o">:</span> <span class="s1">&#39;&lt;APP_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">      <span class="nx">env</span><span class="o">:</span> <span class="s1">&#39;&lt;ENV_NAME&gt;&#39;</span><span class="p">,</span><span class="o">&lt;&gt;</span>
</span></span><span class="line"><span class="cl">      <span class="c1">// version: &#39;1.0.0&#39;
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="p">});</span>
</span></span><span class="line"><span class="cl"><span class="o">&lt;</span><span class="err">/script&gt;</span>
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p>
      The Browser SDK automatically tracks user sessions depending on options
      provided at the SDK initialization. To add GDPR compliance for your EU
      users and other
      <a href="https://app.datadoghq.com/error-tracking/settings/setup/client"
        >initialization parameters</a
      >
      to the SDK configuration, see the
      <a href="#set-tracking-consent-gdpr-compliance"
        >Set tracking consent documentation</a
      >.
    </p>
    <details class="collapsible-section">
      <summary class="collapsible-header" tabindex="0" aria-expanded="false">
        <div class="header-content">
          <div class="header-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="icon-chevron-right"
            >
              <path
                fill="currentColor"
                d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
              ></path>
            </svg>
          </div>
          <div class="header-text">
            <h4 class="header-text-inner">Sample the sessions</h4>
          </div>
        </div>
      </summary>
      <div class="collapsible-content">
        <p>
          To control the data your application sends to Datadog RUM, you can
          specify a sampling rate for RUM sessions while initializing the
          Browser SDK. The rate is a percentage between 0 and 100. By default,
          <code>sessionSamplingRate</code> is set to 100 (keep all sessions).
        </p>
        <p>For example, to only keep 50% of sessions use:</p>
        <div class="code-tabs">
          <ul class="nav nav-tabs d-flex"></ul>
          <div class="tab-content">
            <div
              data-lang="npm"
              class="tab-pane fade"
              role="tabpanel"
              title="npm"
            >
              <div class="code-snippet-wrapper">
                <div
                  class="code-filename-wrapper d-flex justify-content-end"
                ></div>
                <div class="code-snippet">
                  <div class="code-button-wrapper position-absolute">
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
                  </div>
                  <div class="cdoc-code-snippet cdoc-language-javascript">
                    <pre
                      tabindex="0"
                      class="chroma"
                    ><code><span class="line"><span class="cl">  <span class="kr">import</span> <span class="p">{</span> <span class="nx">datadogRum</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;@datadog/browser-rum&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">  <span class="nx">datadogRum</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">    <span class="p">...,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">sessionSampleRate</span><span class="o">:</span> <span class="mi">50</span>
</span></span><span class="line"><span class="cl">  <span class="p">});</span>
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
                <div
                  class="code-filename-wrapper d-flex justify-content-end"
                ></div>
                <div class="code-snippet">
                  <div class="code-button-wrapper position-absolute">
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
                  </div>
                  <div class="cdoc-code-snippet cdoc-language-javascript">
                    <pre
                      tabindex="0"
                      class="chroma"
                    ><code><span class="line"><span class="cl">  <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">onReady</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">      <span class="p">...,</span>
</span></span><span class="line"><span class="cl">      <span class="nx">sessionSampleRate</span><span class="o">:</span> <span class="mi">50</span>
</span></span><span class="line"><span class="cl">    <span class="p">});</span>
</span></span><span class="line"><span class="cl">  <span class="p">})</span>
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
                <div
                  class="code-filename-wrapper d-flex justify-content-end"
                ></div>
                <div class="code-snippet">
                  <div class="code-button-wrapper position-absolute">
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
                  </div>
                  <div class="cdoc-code-snippet cdoc-language-javascript">
                    <pre
                      tabindex="0"
                      class="chroma"
                    ><code><span class="line"><span class="cl"> <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span> <span class="o">&amp;&amp;</span> <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">    <span class="p">...,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">sessionSampleRate</span><span class="o">:</span> <span class="mi">50</span>
</span></span><span class="line"><span class="cl">  <span class="p">});</span>
</span></span></code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </details>
    <details class="collapsible-section">
      <summary class="collapsible-header" tabindex="0" aria-expanded="false">
        <div class="header-content">
          <div class="header-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="icon-chevron-right"
            >
              <path
                fill="currentColor"
                d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
              ></path>
            </svg>
          </div>
          <div class="header-text">
            <h4 class="header-text-inner">
              Set tracking consent (GDPR compliance)e
            </h4>
          </div>
        </div>
      </summary>
      <div class="collapsible-content">
        <p>
          To be compliant with GDPR, CCPA, and similar regulations, the Browser
          SDK lets you provide the tracking consent value at initialization. For
          more information on tracking consent, see
          <a href="/data_security/real_user_monitoring/">Data Security</a>.
        </p>
        <p>
          The <code>trackingConsent</code> initialization parameter can be one
          of the following values:
        </p>
        <ol>
          <li>
            <code>&quot;granted&quot;</code>: The RUM Browser SDK starts
            collecting data and sends it to Datadog.
          </li>
          <li>
            <code>&quot;not-granted&quot;</code>: The RUM Browser SDK does not
            collect any data.
          </li>
        </ol>
        <p>
          To change the tracking consent value after the RUM Browser SDK is
          initialized, use the <code>setTrackingConsent()</code> API call. The
          RUM Browser SDK changes its behavior according to the new value:
        </p>
        <ul>
          <li>
            when changed from <code>&quot;granted&quot;</code> to
            <code>&quot;not-granted&quot;</code>, the RUM session is stopped,
            data is no longer sent to Datadog.
          </li>
          <li>
            when changed from <code>&quot;not-granted&quot;</code> to
            <code>&quot;granted&quot;</code>, a new RUM session is created if no
            previous session is active, and data collection resumes.
          </li>
        </ul>
        <p>
          This state is not synchronized between tabs nor persisted between
          navigation. It is your responsibility to provide the user decision
          during RUM Browser SDK initialization or by using
          <code>setTrackingConsent()</code>.
        </p>
        <p>
          When <code>setTrackingConsent()</code> is used before
          <code>init()</code>, the provided value takes precedence over the
          initialization parameter.
        </p>
        <div class="code-tabs">
          <ul class="nav nav-tabs d-flex"></ul>
          <div class="tab-content">
            <div
              data-lang="npm"
              class="tab-pane fade"
              role="tabpanel"
              title="NPM"
            >
              <div class="code-snippet-wrapper">
                <div
                  class="code-filename-wrapper d-flex justify-content-end"
                ></div>
                <div class="code-snippet">
                  <div class="code-button-wrapper position-absolute">
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
                  </div>
                  <div class="cdoc-code-snippet cdoc-language-javascript">
                    <pre
                      tabindex="0"
                      class="chroma"
                    ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">datadogRum</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;@datadog/browser-rum&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">datadogRum</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">    <span class="p">...,</span>
</span></span><span class="line"><span class="cl">    <span class="nx">trackingConsent</span><span class="o">:</span> <span class="s1">&#39;not-granted&#39;</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">acceptCookieBannerButton</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;click&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">datadogRum</span><span class="p">.</span><span class="nx">setTrackingConsent</span><span class="p">(</span><span class="s1">&#39;granted&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
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
                <div
                  class="code-filename-wrapper d-flex justify-content-end"
                ></div>
                <div class="code-snippet">
                  <div class="code-button-wrapper position-absolute">
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
                  </div>
                  <div class="cdoc-code-snippet cdoc-language-javascript">
                    <pre
                      tabindex="0"
                      class="chroma"
                    ><code><span class="line"><span class="cl"><span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">onReady</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">        <span class="p">...,</span>
</span></span><span class="line"><span class="cl">        <span class="nx">trackingConsent</span><span class="o">:</span> <span class="s1">&#39;not-granted&#39;</span>
</span></span><span class="line"><span class="cl">    <span class="p">});</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">acceptCookieBannerButton</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;click&#39;</span><span class="p">,</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">onReady</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">setTrackingConsent</span><span class="p">(</span><span class="s1">&#39;granted&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">    <span class="p">});</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
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
                <div
                  class="code-filename-wrapper d-flex justify-content-end"
                ></div>
                <div class="code-snippet">
                  <div class="code-button-wrapper position-absolute">
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
                  </div>
                  <div class="cdoc-code-snippet cdoc-language-javascript">
                    <pre
                      tabindex="0"
                      class="chroma"
                    ><code><span class="line"><span class="cl"><span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span> <span class="o">&amp;&amp;</span> <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">  <span class="p">...,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">trackingConsent</span><span class="o">:</span> <span class="s1">&#39;not-granted&#39;</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">acceptCookieBannerButton</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;click&#39;</span><span class="p">,</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span> <span class="o">&amp;&amp;</span> <span class="nb">window</span><span class="p">.</span><span class="nx">DD_RUM</span><span class="p">.</span><span class="nx">setTrackingConsent</span><span class="p">(</span><span class="s1">&#39;granted&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span></code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </details>
    <h3 id="add-readable-stack-traces-to-errors--optional-but-recommended">
      Add Readable Stack Traces to Errors (optional but recommended)
    </h3>
    <p>
      Upload your JavaScript source maps to access unminified stack traces. See
      the
      <a href="/real_user_monitoring/guide/upload-javascript-source-maps"
        >source map upload guide</a
      >.
    </p>
    <h3 id="link-errors-with-your-source-code--optional">
      Link errors with your source code (optional)
    </h3>
    <p>
      In addition to sending source maps, the [Datadog CLI][23] reports Git
      information such as the commit hash, repository URL, and a list of tracked
      file paths in the code repository.
    </p>
    <p>
      Error Tracking can use this information to correlate errors with your
      [source code][27], allowing you to pivot from any stack trace frame to the
      related line of code in [GitHub][24], [GitLab][25] and [Bitbucket][26].
    </p>
    <p>
      &lt;div class=&quot;alert alert-info&quot;&gt;Linking from stack frames to
      source code is supported in the &lt;a
      href=&quot;https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command&quot;&gt;Datadog
      CLI&lt;/a&gt; version &lt;code&gt;0.12.0&lt;/code&gt; and
      later.&lt;/div&gt;
    </p>
    <p>For more information, see the [Datadog Source Code Integration][27].</p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="263">
    <h2 id="overview">Overview</h2>
    <p>Error Tracking processes errors collected from the Android SDK.</p>
    <p>
      Enable Android Crash Reporting and Error Tracking to get comprehensive
      crash reports and error trends. With this feature, you can access:
    </p>
    <ul>
      <li>Aggregated Android crash dashboards and attributes</li>
      <li>Deobfuscated Android crash reports</li>
      <li>Trend analysis with Android error tracking</li>
    </ul>
    <p>
      Your crash reports appear in
      <a href="https://app.datadoghq.com/rum/error-tracking"
        ><strong>Error Tracking</strong></a
      >.
    </p>
    <h2 id="setup">Setup</h2>
    <h3 id="create-the-application-in-the-ui">
      Create the application in the UI
    </h3>
    <p>
      Navigate to
      <a href="https://app.datadoghq.com/rum/application/create"
        >Digital Experience &gt; Add an Application</a
      >. Select Android as the application type and enter an application name to
      generate a unique Datadog application ID and client token.
    </p>
    <p>
      For more information about setting up a client token, see the
      <a href="/account_management/api-app-keys/#client-tokens"
        >Client Token documentation</a
      >.
    </p>
    <h3 id="declare-the-android-sdk-as-a-dependency">
      Declare the Android SDK as a dependency
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
    <h3 id="initialize-the-datadog-sdk-with-application-context">
      Initialize the Datadog SDK with application context
    </h3>
    <h4 id="update-the-initialization-snippet">
      Update the initialization snippet
    </h4>
    <p>
      In the initialization snippet, set an environment name, service name, and
      version number. In the examples below,
      <code>APP_VARIANT_NAME</code> specifies the variant of the application
      that generates data. For more information, see
      <a href="https://square.github.io/okhttp/features/interceptors/"
        >Using Tags</a
      >.
    </p>
    <p>
      During initialization, you can also set the sample rate (RUM sessions) and
      set the tracking consent for GDPR compliance, as described below. See
      <a
        href="/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/#automatically-track-network-requests"
        >other configuration options</a
      >
      to initialize the library.
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
                ><code><span class="line"><span class="cl"><span class="k">class</span> <span class="nc">SampleApplication</span> <span class="p">:</span> <span class="n">Application</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">override</span> <span class="k">fun</span> <span class="nf">onCreate</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="k">super</span><span class="p">.</span><span class="n">onCreate</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">        <span class="k">val</span> <span class="py">configuration</span> <span class="p">=</span> <span class="nc">Configuration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">            <span class="n">clientToken</span> <span class="p">=</span> <span class="p">&lt;</span><span class="n">CLIENT_TOKEN</span><span class="p">&gt;,</span>
</span></span><span class="line"><span class="cl">            <span class="n">env</span> <span class="p">=</span> <span class="p">&lt;</span><span class="n">ENV_NAME</span><span class="p">&gt;,</span>
</span></span><span class="line"><span class="cl">            <span class="n">variant</span> <span class="p">=</span> <span class="p">&lt;</span><span class="n">APP_VARIANT_NAME</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl">        <span class="p">).</span><span class="n">build</span><span class="p">()</span>
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
            <div class="code-filename-wrapper d-flex justify-content-end"></div>
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
</span></span><span class="line"><span class="cl">                <span class="k">new</span> <span class="n">Configuration</span><span class="o">.</span><span class="na">Builder</span><span class="o">(&lt;</span><span class="n">CLIENT_TOKEN</span><span class="o">&gt;,</span> <span class="o">&lt;</span><span class="n">ENV_NAME</span><span class="o">&gt;,</span> <span class="o">&lt;</span><span class="n">APP_VARIANT_NAME</span><span class="o">&gt;)</span>
</span></span><span class="line"><span class="cl">                        <span class="o">.</span><span class="na">build</span><span class="o">();</span>
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
    <details class="collapsible-section">
      <summary class="collapsible-header" tabindex="0" aria-expanded="false">
        <div class="header-content">
          <div class="header-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="icon-chevron-right"
            >
              <path
                fill="currentColor"
                d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
              ></path>
            </svg>
          </div>
          <div class="header-text">
            <h4 class="header-text-inner">Sample the sessions</h4>
          </div>
        </div>
      </summary>
      <div class="collapsible-content">
        <p>
          To control the data your application sends to Datadog, you can specify
          a sample rate for sessions when
          <a
            href="/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/#initialization-parameters"
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
      </div>
    </details>
    <details class="collapsible-section">
      <summary class="collapsible-header" tabindex="0" aria-expanded="false">
        <div class="header-content">
          <div class="header-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="icon-chevron-right"
            >
              <path
                fill="currentColor"
                d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
              ></path>
            </svg>
          </div>
          <div class="header-text">
            <h4 class="header-text-inner">
              Set tracking consent (GDPR compliance)
            </h4>
          </div>
        </div>
      </summary>
      <div class="collapsible-content">
        <p>
          To be compliant with the GDPR regulation, the SDK requires the
          tracking consent value upon initialization.
        </p>
        <p>Tracking consent can be one of the following values:</p>
        <ul>
          <li>
            <code>TrackingConsent.PENDING</code>: (Default) The SDK starts
            collecting and batching the data but does not send it to the
            collection endpoint. The SDK waits for the new tracking consent
            value to decide what to do with the batched data.
          </li>
          <li>
            <code>TrackingConsent.GRANTED</code>: The SDK starts collecting the
            data and sends it to the data collection endpoint.
          </li>
          <li>
            <code>TrackingConsent.NOT_GRANTED</code>: The SDK does not collect
            any data. You are not able to manually send any logs, traces, or
            events.
          </li>
        </ul>
        <p>
          To <strong>update the tracking consent</strong> after the SDK is
          initialized, call
          <code>Datadog.setTrackingConsent(&lt;NEW CONSENT&gt;)</code>. The SDK
          changes its behavior according to the new consent. For example, if the
          current tracking consent is <code>TrackingConsent.PENDING</code> and
          you update it to:
        </p>
        <ul>
          <li>
            <code>TrackingConsent.GRANTED</code>: The SDK sends all current
            batched data and future data directly to the data collection
            endpoint.
          </li>
          <li>
            <code>TrackingConsent.NOT_GRANTED</code>: The SDK wipes all batched
            data and does not collect any future data.
          </li>
        </ul>
      </div>
    </details>
    <h3 id="enable-the-feature-to-start-sending-data">
      Enable the feature to start sending data
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
                ><code><span class="line"><span class="cl">    <span class="k">val</span> <span class="py">rumConfig</span> <span class="p">=</span> <span class="nc">RumConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span><span class="n">applicationId</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">      <span class="p">.</span><span class="n">trackInteractions</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">      <span class="p">.</span><span class="n">trackLongTasks</span><span class="p">(</span><span class="n">durationThreshold</span><span class="p">)</span> <span class="c1">// Not applicable to Error Tracking
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>      <span class="p">.</span><span class="n">useViewTrackingStrategy</span><span class="p">(</span><span class="n">strategy</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">      <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="nc">Rum</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">rumConfig</span><span class="p">)</span>
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
                ><code><span class="line"><span class="cl">    <span class="n">RumConfiguration</span> <span class="n">rumConfig</span> <span class="o">=</span> <span class="k">new</span> <span class="n">RumConfiguration</span><span class="o">.</span><span class="na">Builder</span><span class="o">(</span><span class="n">applicationId</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">      <span class="o">.</span><span class="na">trackInteractions</span><span class="o">()</span>
</span></span><span class="line"><span class="cl">      <span class="o">.</span><span class="na">trackLongTasks</span><span class="o">(</span><span class="n">durationThreshold</span><span class="o">)</span> <span class="c1">// Not applicable to Error Tracking
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>      <span class="o">.</span><span class="na">useViewTrackingStrategy</span><span class="o">(</span><span class="n">strategy</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">      <span class="o">.</span><span class="na">build</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">    <span class="n">Rum</span><span class="o">.</span><span class="na">enable</span><span class="o">(</span><span class="n">rumConfig</span><span class="o">);</span>
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
        href="/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/#automatically-track-views"
        ><code>ViewTrackingStrategy</code></a
      >
      to enable automatic tracking of all your views (activities, fragments, and
      more).
    </p>
    <h3 id="initialize-the-interceptor-to-track-network-events">
      Initialize the interceptor to track network events
    </h3>
    <p>To initialize an interceptor for tracking network events:</p>
    <ol>
      <li>
        <p>
          For distributed tracing,
          <a href="/tracing/trace_collection/dd_libraries/android/?tab=kotlin"
            >add and enable the Trace feature</a
          >.
        </p>
      </li>
      <li>
        <p>
          Add the Gradle dependency to the
          <code>dd-sdk-android-okhttp</code> library in the module-level
          <code>build.gradle</code> file:
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
              ><code><span class="line"><span class="cl"><span class="n">dependencies</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">implementation</span> <span class="s2">&#34;com.datadoghq:dd-sdk-android-okhttp:x.x.x&#34;</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
      <li>
        <p>
          To track your OkHttp requests as resources, add the provided
          <a href="https://square.github.io/okhttp/features/interceptors/"
            >interceptor</a
          >:
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
                <div
                  class="code-filename-wrapper d-flex justify-content-end"
                ></div>
                <div class="code-snippet">
                  <div class="code-button-wrapper position-absolute">
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
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
                <div
                  class="code-filename-wrapper d-flex justify-content-end"
                ></div>
                <div class="code-snippet">
                  <div class="code-button-wrapper position-absolute">
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
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
      </li>
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
              href="/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/#custom-views"
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
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
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
                <div
                  class="code-filename-wrapper d-flex justify-content-end"
                ></div>
                <div class="code-snippet">
                  <div class="code-button-wrapper position-absolute">
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
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
      </li>
    </ol>
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
        href="/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/#automatically-track-network-requests"
        >automatically track resource timing</a
      >
      for third-party providers and network requests.
    </p>
    <h3 id="add-ndk-crash-reporting">Add NDK crash reporting</h3>
    <p>
      Your Android application may be running native code (C/C++) for
      performance or code reusability reasons. In order to enable NDK crash
      reporting, use the Datadog NDK plugin.
    </p>
    <ol>
      <li>
        <p>
          Add the Gradle dependency by declaring the library as a dependency in
          your <code>build.gradle</code> file:
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
              ><code><span class="line"><span class="cl"> <span class="n">dependencies</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">     <span class="n">implementation</span><span class="p">(</span><span class="s2">&#34;com.datadoghq:dd-sdk-android-ndk:x.x.x&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">     <span class="c1">//(...)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span> <span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
      <li>
        <p>Enable NDK crash collection after initializing the SDK.</p>
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
              ><code><span class="line"><span class="cl">NdkCrashReports.enable()
</span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
    </ol>
    <h3 id="add-anr-reporting">Add ANR reporting</h3>
    <p>
      An &quot;Application Not Responding&quot; (<a
        href="https://developer.android.com/topic/performance/vitals/anr"
        >ANR</a
      >) is an Android-specific type of error that gets triggered when the
      application is unresponsive for too long.
    </p>
    <p>ANRs are only reported through the SDK (not through Logs).</p>
    <h4 id="report-fatal-anrs">Report fatal ANRs</h4>
    <p>
      Fatal ANRs result in crashes. The application reports them when it's
      unresponsive, leading to the Android OS displaying a popup dialog to the
      user, who chooses to force quit the app through the popup.
    </p>
    <a
      href="http://localhost:1313/images/real_user_monitoring/error_tracking/rum-anr-fatal.439621648b84ea34b6919bec0a48c7fa.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/error_tracking/rum-anr-fatal.439621648b84ea34b6919bec0a48c7fa.png?auto=format
              "
              class="img-fluid"
              alt="A fatal crash report in Error Tracking."
          /></picture>
        </figure></div
    ></a>
    <ul>
      <li>
        In the <strong>Error Tracking</strong> page, fatal ANRs are grouped
        based on their similarity, which can result into several
        <strong>individual issues</strong> being created
      </li>
      <li>
        By default, Datadog catches fatal ANRs through the
        <a
          href="https://developer.android.com/reference/android/app/ApplicationExitInfo"
          >ApplicationExitInfo API</a
        >
        (available since
        <em
          ><a href="https://developer.android.com/tools/releases/platforms#11"
            >Android 30+</a
          ></em
        >), which can be read on the next app launch.
      </li>
      <li>
        In
        <em
          ><a href="https://developer.android.com/tools/releases/platforms#10"
            >Android 29</a
          >
          and below</em
        >, reporting on fatal ANRs is not possible.
      </li>
    </ul>
    <h4 id="report-non-fatal-anrs">Report non-fatal ANRs</h4>
    <p>
      Non-fatal ANRs may or may not have led to the application being terminated
      (crashing).
    </p>
    <a
      href="http://localhost:1313/images/real_user_monitoring/error_tracking/rum-anr-non-fatal.0e1458ade0f537016c8bec9f383c96a6.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/error_tracking/rum-anr-non-fatal.0e1458ade0f537016c8bec9f383c96a6.png?auto=format
              "
              class="img-fluid"
              alt="A non-fatal crash report in Error Tracking."
          /></picture>
        </figure></div
    ></a>
    <ul>
      <li>
        In the <strong>Error Tracking</strong> page, non-fatal ANRs are grouped
        under a <strong>single</strong> issue due to their level of noise.
      </li>
      <li>
        By default, the reporting of non-fatal ANRs on <em>Android 30+</em> is
        <strong>disabled</strong> because it would create too much noise over
        fatal ANRs. On <em>Android 29</em> and below, however, the reporting of
        non-fatal ANRs is <strong>enabled</strong> by default, as fatal ANRs
        cannot be reported on those versions.
      </li>
    </ul>
    <p>
      For any Android version, you can override the default setting for
      reporting non-fatal ANRs by setting <code>trackNonFatalAnrs</code> to
      <code>true</code> or <code>false</code> when initializing the SDK.
    </p>
    <h2 id="get-deobfuscated-stack-traces">Get deobfuscated stack traces</h2>
    <p>
      Mapping files are used to deobfuscate stack traces, which helps in
      debugging errors. Using a unique build ID that gets generated for each
      build run, Datadog automatically matches the correct stack traces with the
      corresponding mapping files. This ensures that regardless of when the
      mapping file was uploaded (either during pre-production or production
      builds), the correct information is available for efficient QA processes
      when reviewing crashes and errors reported in Datadog.
    </p>
    <p>
      Depending on the
      <a href="https://github.com/DataDog/dd-sdk-android-gradle-plugin"
        >Android Gradle plugin</a
      >
      version, the matching of stack traces and mapping files relies on
      different fields:
    </p>
    <ul>
      <li>
        Versions 1.13.0 and higher use the <code>build_id</code> field (you must
        use Datadog Android SDK 2.8.0 or later to support this field)
      </li>
      <li>
        Older versions use a combination of the <code>service</code>,
        <code>version</code>, and <code>variant</code> fields
      </li>
    </ul>
    <h3 id="upload-your-mapping-file">Upload your mapping file</h3>
    <p>
      <strong>Note</strong>: Re-uploading a source map does not override the
      existing one if the version has not changed.
    </p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div data-lang="us" class="tab-pane fade" role="tabpanel" title="US">
          <ol>
            <li>
              <p>
                Add the
                <a
                  href="https://github.com/DataDog/dd-sdk-android-gradle-plugin"
                  >Android Gradle Plugin</a
                >
                to your Gradle project using the following code snippet.
              </p>
              <div class="code-snippet-wrapper">
                <div
                  class="code-filename-wrapper d-flex justify-content-end"
                ></div>
                <div class="code-snippet">
                  <div class="code-button-wrapper position-absolute">
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
                  </div>
                  <div class="cdoc-code-snippet cdoc-language-kotlin">
                    <pre
                      tabindex="0"
                      class="chroma"
                    ><code><span class="line"><span class="cl"><span class="c1">// In your app&#39;s build.gradle script
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">plugins</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">id</span><span class="p">(</span><span class="s2">&#34;com.datadoghq.dd-sdk-android-gradle-plugin&#34;</span><span class="p">)</span> <span class="n">version</span> <span class="s2">&#34;x.y.z&#34;</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <p>
                <a
                  href="https://app.datadoghq.com/organization-settings/api-keys"
                  >Create a dedicated Datadog API key</a
                >
                and export it as an environment variable named
                <code>DD_API_KEY</code> or <code>DATADOG_API_KEY</code>.
                Alternatively, pass it as a task property, or if you have
                <code>datadog-ci.json</code> file in the root of your project,
                it can be taken from an <code>apiKey</code> property there.
              </p>
            </li>
            <li>
              <p>
                Optionally, configure the plugin to upload files to the EU
                region by configuring the plugin in your
                <code>build.gradle</code> script:
              </p>
              <div class="code-snippet-wrapper">
                <div
                  class="code-filename-wrapper d-flex justify-content-end"
                ></div>
                <div class="code-snippet">
                  <div class="code-button-wrapper position-absolute">
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
                  </div>
                  <div class="cdoc-code-snippet cdoc-language-kotlin">
                    <pre
                      tabindex="0"
                      class="chroma"
                    ><code><span class="line"><span class="cl"><span class="n">datadog</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">site</span> <span class="p">=</span> <span class="s2">&#34;EU1&#34;</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <p>Run the upload task after your obfuscated APK builds:</p>
              <div class="code-snippet-wrapper">
                <div
                  class="code-filename-wrapper d-flex justify-content-end"
                ></div>
                <div class="code-snippet">
                  <div class="code-button-wrapper position-absolute">
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
                  </div>
                  <div class="cdoc-code-snippet cdoc-language-bash">
                    <pre
                      tabindex="0"
                      class="chroma"
                    ><code><span class="line"><span class="cl">./gradlew uploadMappingRelease
</span></span></code></pre>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <p>If running native code, run the NDK symbol upload task:</p>
              <div class="code-snippet-wrapper">
                <div
                  class="code-filename-wrapper d-flex justify-content-end"
                ></div>
                <div class="code-snippet">
                  <div class="code-button-wrapper position-absolute">
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
                  </div>
                  <div class="cdoc-code-snippet cdoc-language-bash">
                    <pre
                      tabindex="0"
                      class="chroma"
                    ><code><span class="line"><span class="cl">./gradlew uploadNdkSymbolFilesRelease
</span></span></code></pre>
                  </div>
                </div>
              </div>
            </li>
          </ol>
          <p>
            <strong>Note</strong>: If your project uses additional flavors, the
            plugin provides an upload task for each variant with obfuscation
            enabled. In this case, initialize the Android SDK with a proper
            variant name (the necessary API is available in versions
            <code>1.8.0</code> and later).
          </p>
        </div>
        <div data-lang="eu" class="tab-pane fade" role="tabpanel" title="EU">
          <ol>
            <li>
              <p>
                Add the
                <a
                  href="https://github.com/DataDog/dd-sdk-android-gradle-plugin"
                  >Android Gradle Plugin</a
                >
                to your Gradle project using the following code snippet.
              </p>
              <div class="code-snippet-wrapper">
                <div
                  class="code-filename-wrapper d-flex justify-content-end"
                ></div>
                <div class="code-snippet">
                  <div class="code-button-wrapper position-absolute">
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
                  </div>
                  <div class="cdoc-code-snippet cdoc-language-kotlin">
                    <pre
                      tabindex="0"
                      class="chroma"
                    ><code><span class="line"><span class="cl"><span class="c1">// In your app&#39;s build.gradle script
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="n">plugins</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">id</span><span class="p">(</span><span class="s2">&#34;com.datadoghq.dd-sdk-android-gradle-plugin&#34;</span><span class="p">)</span> <span class="n">version</span> <span class="s2">&#34;x.y.z&#34;</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <p>
                <a
                  href="https://app.datadoghq.com/organization-settings/api-keys"
                  >Create a dedicated Datadog API key</a
                >
                and export it as an environment variable named
                <code>DD_API_KEY</code> or <code>DATADOG_API_KEY</code>.
                Alternatively, pass it as a task property, or if you have
                <code>datadog-ci.json</code> file in the root of your project,
                it can be taken from an <code>apiKey</code> property there.
              </p>
            </li>
            <li>
              <p>
                Configure the plugin to use the EU region by adding the
                following snippet in your app's <code>build.gradle</code> script
                file:
              </p>
              <div class="code-snippet-wrapper">
                <div
                  class="code-filename-wrapper d-flex justify-content-end"
                ></div>
                <div class="code-snippet">
                  <div class="code-button-wrapper position-absolute">
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
                  </div>
                  <div class="cdoc-code-snippet cdoc-language-kotlin">
                    <pre
                      tabindex="0"
                      class="chroma"
                    ><code><span class="line"><span class="cl"><span class="n">datadog</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">site</span> <span class="p">=</span> <span class="s2">&#34;EU1&#34;</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <p>Run the upload task after your obfuscated APK builds:</p>
              <div class="code-snippet-wrapper">
                <div
                  class="code-filename-wrapper d-flex justify-content-end"
                ></div>
                <div class="code-snippet">
                  <div class="code-button-wrapper position-absolute">
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
                  </div>
                  <div class="cdoc-code-snippet cdoc-language-bash">
                    <pre
                      tabindex="0"
                      class="chroma"
                    ><code><span class="line"><span class="cl">./gradlew uploadMappingRelease
</span></span></code></pre>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <p>If running native code, run the NDK symbol upload task:</p>
              <div class="code-snippet-wrapper">
                <div
                  class="code-filename-wrapper d-flex justify-content-end"
                ></div>
                <div class="code-snippet">
                  <div class="code-button-wrapper position-absolute">
                    <button class="btn text-primary js-copy-button">
                      Copy
                    </button>
                  </div>
                  <div class="cdoc-code-snippet cdoc-language-bash">
                    <pre
                      tabindex="0"
                      class="chroma"
                    ><code><span class="line"><span class="cl">./gradlew uploadNdkSymbolFilesRelease
</span></span></code></pre>
                  </div>
                </div>
              </div>
            </li>
          </ol>
          <p>
            <strong>Note</strong>: If your project uses additional flavors, the
            plugin provides an upload task for each variant with obfuscation
            enabled. In this case, initialize the Android SDK with a proper
            variant name (the necessary API is available in versions
            <code>1.8.0</code> and later).
          </p>
        </div>
      </div>
    </div>
    <h4 id="list-uploaded-mapping-files">List uploaded mapping files</h4>
    <p>See the [RUM Debug Symbols][11] page to view all uploaded symbols.</p>
    <h3 id="plugin-configuration-options">Plugin configuration options</h3>
    <p>
      There are several plugin properties that can be configured through the
      plugin extension. In case you are using multiple variants, you can set a
      property value for a specific flavor in the variant.
    </p>
    <p>
      For example, for a <code>fooBarRelease</code> variant, you can use the
      following configuration:
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
          ><code><span class="line"><span class="cl"><span class="n">datadog</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">foo</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="n">versionName</span> <span class="p">=</span> <span class="s2">&#34;foo&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="n">bar</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="n">versionName</span> <span class="p">=</span> <span class="s2">&#34;bar&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="n">fooBar</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="n">versionName</span> <span class="p">=</span> <span class="s2">&#34;fooBar&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      The task configuration for this variant is merged from all three flavor
      configurations provided in the following order:
    </p>
    <ol>
      <li><code>bar</code></li>
      <li><code>foo</code></li>
      <li><code>fooBar</code></li>
    </ol>
    <p>
      This resolves the final value for the <code>versionName</code> property as
      <code>fooBar</code>.
    </p>
    <table>
      <thead>
        <tr>
          <th>Property name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>versionName</code></td>
          <td>
            The version name of the application (by default, the version
            declared in the <code>android</code> block of your
            <code>build.gradle</code> script).
          </td>
        </tr>
        <tr>
          <td><code>serviceName</code></td>
          <td>
            The service name of the application (by default, the package name of
            your application as declared in the <code>android</code> block of
            your <code>build.gradle</code> script).
          </td>
        </tr>
        <tr>
          <td><code>site</code></td>
          <td>
            The Datadog site to upload your data to (US1, US3, US5, EU1,
            US1_FED, AP1, or AP2).
          </td>
        </tr>
        <tr>
          <td><code>remoteRepositoryUrl</code></td>
          <td>
            The URL of the remote repository where the source code was deployed.
            If this is not provided, this value is resolved from your Git
            configuration during the task execution time.
          </td>
        </tr>
        <tr>
          <td><code>checkProjectDependencies</code></td>
          <td>
            This property controls if the plugin should check if the Datadog
            Android SDK is included in the dependencies. If not,
            &quot;none&quot; is ignored, &quot;warn&quot; logs a warning, and
            &quot;fail&quot; fails the build with an error (default).
          </td>
        </tr>
      </tbody>
    </table>
    <h3 id="integrate-with-a-ci-cd-pipeline">
      Integrate with a CI/CD pipeline
    </h3>
    <p>
      By default, the upload mapping task is independent from other tasks in the
      build graph. Run the task manually when you need to upload mapping.
    </p>
    <p>
      If you want to run this task in a CI/CD pipeline, and the task is required
      as part of the build graph, you can set the upload task to run after the
      mapping file is generated.
    </p>
    <p>For example:</p>
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
          ><code><span class="line"><span class="cl"><span class="n">tasks</span><span class="p">[</span><span class="s2">&#34;minify</span><span class="si">${variant}</span><span class="s2">WithR8&#34;</span><span class="p">].</span><span class="n">finalizedBy</span> <span class="p">{</span> <span class="n">tasks</span><span class="p">[</span><span class="s2">&#34;uploadMapping</span><span class="si">${variant}</span><span class="s2">&#34;</span><span class="p">]</span> <span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h2 id="limitations">Limitations</h2>
    <h3 id="file-sizing">File sizing</h3>
    <p>
      Mapping files are limited in size to <strong>500 MB</strong> each. If your
      project has a mapping file larger than this, use one of the following
      options to reduce the file size:
    </p>
    <ul>
      <li>
        Set the <code>mappingFileTrimIndents</code> option to <code>true</code>.
        This reduces your file size by 5%, on average.
      </li>
      <li>
        Set a map of <code>mappingFilePackagesAliases</code>: This replaces
        package names with shorter aliases. <strong>Note</strong>: Datadog's
        stacktrace uses the same alias instead of the original package name, so
        it's better to use this option for third party dependencies.
      </li>
    </ul>
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
          ><code><span class="line"><span class="cl"><span class="n">datadog</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">mappingFileTrimIndents</span> <span class="p">=</span> <span class="k">true</span>
</span></span><span class="line"><span class="cl">    <span class="n">mappingFilePackageAliases</span> <span class="p">=</span> <span class="n">mapOf</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="s2">&#34;kotlinx.coroutines&#34;</span> <span class="n">to</span> <span class="s2">&#34;kx.cor&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="s2">&#34;com.google.android.material&#34;</span> <span class="n">to</span> <span class="s2">&#34;material&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="s2">&#34;com.google.gson&#34;</span> <span class="n">to</span> <span class="s2">&#34;gson&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="s2">&#34;com.squareup.picasso&#34;</span> <span class="n">to</span> <span class="s2">&#34;picasso&#34;</span>
</span></span><span class="line"><span class="cl">    <span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="collection">Collection</h3>
    <p>
      When looking at RUM Crash Reporting behaviors for Android, consider the
      following:
    </p>
    <ul>
      <li>
        The crash can only be detected after the SDK is initialised. Given this,
        the recommendation is to initialize the SDK as soon as possible in your
        application's <code>onCreate</code> method.
      </li>
      <li>
        RUM crashes must be attached to a RUM view. If a crash occurs before a
        view is visible (typically an Activity or Fragment in an
        <code>onResume</code> state), or after the app is sent to the background
        by the end-user navigating away from it, the crash is muted and isn't
        reported for collection. To mitigate this, use the
        <code>trackBackgroundEvents()</code>
        <a
          href="/real_user_monitoring/configuration/advanced_configuration#track-background-events"
          >method</a
        >
        in your <code>RumConfiguration</code> builder.
      </li>
      <li>
        Only crashes that occur in sampled sessions are kept, meaning if a
        session sampling rate is not 100%, some will not be reported.
      </li>
    </ul>
    <h2 id="test-your-implementation">Test your implementation</h2>
    <p>
      To verify your Android Crash Reporting and Error Tracking configuration,
      you need to trigger a crash in your application and confirm that the error
      appears in Datadog.
    </p>
    <p>To test your implementation:</p>
    <ol>
      <li>
        <p>Run your application on an Android emulator or a real device.</p>
      </li>
      <li>
        <p>Execute some code containing an error or crash. For example:</p>
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
              ><code><span class="line"><span class="cl"><span class="k">fun</span> <span class="nf">onEvent</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="k">throw</span> <span class="n">RuntimeException</span><span class="p">(</span><span class="s2">&#34;Crash the app&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
      <li>
        <p>
          After the crash happens, restart your application and wait for the
          Android SDK to upload the crash report in
          <a href="https://app.datadoghq.com/rum/error-tracking"
            ><strong>Error Tracking</strong></a
          >.
        </p>
      </li>
    </ol>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="264">
    <p>Coming soon!</p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="265">
    <p>Coming soon!</p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="266">
    <p>Coming soon!</p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="267">
    <p>Coming soon!</p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="268">
    <p>Coming soon!</p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="269">
    <p>Coming soon!</p>
  </div>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps"><span class="w-100 d-flex justify-content-between "><span class="text">datadog-ci Source code</span><span class="badge badge-white pe-2 border-0">SOURCE CODE</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/guide/upload-javascript-source-maps"><span class="w-100 d-flex justify-content-between "><span class="text">Upload JavaScript source maps</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/error_tracking/explorer"><span class="w-100 d-flex justify-content-between "><span class="text">Learn about the Error Tracking Explorer</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"262":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"262"},"263":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"android"},"v":false,"r":"263"},"264":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"ios"},"v":false,"r":"264"},"265":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"flutter"},"v":false,"r":"265"},"266":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"roku"},"v":false,"r":"266"},"267":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"react_native"},"v":false,"r":"267"},"268":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"kotlin_multiplatform"},"v":false,"r":"268"},"269":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"unity"},"v":false,"r":"269"}},    filtersManifest: {"filtersByTraitId":{"platform":{"config":{"trait_id":"platform","option_group_id":"rum_sdk_platform_options","label":"SDK"},"defaultValsByOptionGroupId":{"rum_sdk_platform_options":"browser"}}},"defaultValsByTraitId":{"platform":"browser"},"optionGroupsById":{"rum_sdk_platform_options":[{"default":true,"id":"browser","label":"Browser"},{"id":"android","label":"Android"},{"id":"ios","label":"iOS"},{"id":"react_native","label":"React Native"},{"id":"flutter","label":"Flutter"},{"id":"roku","label":"Roku"},{"id":"kotlin_multiplatform","label":"Kotlin Multiplatform"},{"id":"unity","label":"Unity"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>

{{< img src="real_user_monitoring/error_tracking/rum-anr-fatal.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/error_tracking/rum-anr-non-fatal.png" style="display:none;" alt="" >}}

