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
  <div class="cdoc__toggleable" data-if="86">
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
        Navigate to [<strong>Digital Experience</strong> &gt;
        <strong>Add an Application</strong>][11].
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
          specify a sampling rate for RUM sessions while
          <a href="/real_user_monitoring/browser/data_collected/"
            >initializing the RUM Browser SDK</a
          >. The rate is a percentage between 0 and 100. By default,
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
          more information on tracking consent, see [Data Security][18].
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
    <h3 id="visualize-your-data">Visualize your data</h3>
    <p>
      After your deployment is live, Datadog collects events from your users'
      browsers.
    </p>
    <p>
      Visualize the
      <a href="/real_user_monitoring/browser/data_collected/">data collected</a>
      in
      <a href="/real_user_monitoring/platform/dashboards/errors/">dashboards</a>
      or create a search query in Error Tracking.
    </p>
    <p>
      Until Datadog starts receiving data, your application appears as
      <code>pending</code> on the <strong>Applications</strong> page.
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
  <div class="cdoc__toggleable cdoc__hidden" data-if="87">
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
      <a href="https://github.com/DataDog/dd-sdk-android-gradle-plugin"
        ><strong>Error Tracking</strong></a
      >.
    </p>
    <h2 id="setup">Setup</h2>
    <h3 id="create-the-application-in-the-ui">
      Create the application in the UI
    </h3>
    <p>
      Navigate to
      <a href="/tracing/trace_collection/dd_libraries/android/?tab=kotlin"
        >Digital Experience &gt; Add an Application</a
      >. Select Javascript as the application type and enter an application name
      to generate a unique Datadog application ID and client token.
    </p>
    <ol>
      <li>
        Navigate to
        <a href="https://app.datadoghq.com/rum/application/create"
          ><strong>Digital Experience</strong> &gt;
          <strong>Add an Application</strong></a
        >.
      </li>
      <li>
        Select <code>android</code> as the application type and enter an
        application name to generate a unique Datadog application ID and client
        token.
      </li>
    </ol>
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
      <a href="/real_user_monitoring/android/data_collected/"
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
      <a href="/getting_started/tagging/using_tags/#rum--session-replay"
        >Using Tags</a
      >.
    </p>
    <p>
      During initialization, you can also set the sample rate (RUM sessions) and
      set the tracking consent for GDPR compliance, as described below. See
      <a
        href="/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/#initialization-parameters"
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
    <p>
      See the
      <a href="https://app.datadoghq.com/source-code/setup/rum"
        >RUM Debug Symbols</a
      >
      page to view all uploaded symbols.
    </p>
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
          href="/real_user_monitoring/mobile_and_tv_monitoring/android/setup/#track-background-events"
          >method</a
        >
        in your <code>RumConfiguration</code> builder.
      </li>
      <li>
        Only crashes that occur in sampled sessions are kept, meaning if a
        <a href="https://app.datadoghq.com/source-code/setup/rum"
          >session sampling rate is not 100%</a
        >, some will not be reported.
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
          <a href="https://github.com/DataDog/dd-sdk-android-gradle-plugin"
            ><strong>Error Tracking</strong></a
          >.
        </p>
      </li>
    </ol>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="88">
    <h2 id="overview">Overview</h2>
    <p>
      Enable iOS Crash Reporting and Error Tracking to get comprehensive crash
      reports and error trends. With this feature, you can access:
    </p>
    <ul>
      <li>Aggregated iOS crash dashboards and attributes</li>
      <li>Symbolicated iOS crash reports</li>
      <li>Trend analysis with iOS error tracking</li>
    </ul>
    <p>
      To symbolicate your stack traces, find and upload your
      <code>.dSYM</code> files to Datadog. Then, verify your configuration by
      running a test crash and restarting your application.
    </p>
    <p>Your crash reports appear in [<strong>Error Tracking</strong>][1].</p>
    <h2 id="setup">Setup</h2>
    <p>
      If you have not set up the iOS SDK yet, follow the [in-app setup
      instructions][2] or see the [iOS setup documentation][3].
    </p>
    <h3 id="add-crash-reporting">Add crash reporting</h3>
    <p>
      To enable Crash Reporting, add the package according to your dependency
      manager and update your initialize snippet.
    </p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="cocoapods"
          class="tab-pane fade"
          role="tabpanel"
          title="CocoaPods"
        >
          <p>You can use [CocoaPods][1] to install <code>dd-sdk-ios</code>:</p>
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
                ><code><span class="line"><span class="cl">pod &#39;DatadogCrashReporting&#39;
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
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
                ><code><span class="line"><span class="cl">DatadogCrashReporting
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
          <p>You can use [Carthage][1] to install <code>dd-sdk-ios</code>:</p>
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
          <p>In Xcode, link the following frameworks:</p>
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
                ><code><span class="line"><span class="cl">DatadogCrashReporting.xcframework
</span></span><span class="line"><span class="cl">CrashReporter.xcframework
</span></span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p>Update your initialization snippet to include Crash Reporting:</p>
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
          ><code><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl"><span class="kd">import</span> <span class="nc">DatadogCrashReporting</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">service</span><span class="p">:</span> <span class="s">&#34;&lt;service name&gt;&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="p">),</span>
</span></span><span class="line"><span class="cl">  <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">CrashReporting</span><span class="p">.</span><span class="n">enable</span><span class="p">()</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="add-app-hang-reporting">Add app hang reporting</h3>
    <p>
      App hangs are an iOS-specific type of error that happens when the
      application is unresponsive for too long.
    </p>
    <p>
      By default, app hangs reporting is <strong>disabled</strong>, but you can
      enable it and set your own threshold to monitor app hangs that last more
      than a specified duration by using the
      <code>appHangThreshold</code> initialization parameter. A customizable
      threshold allows you to find the right balance between fine-grained and
      noisy observability. See [Configure the app hang threshold][5] for more
      guidance on setting this value.
    </p>
    <p>App hangs are reported through the iOS SDK (not through [Logs][4]).</p>
    <p>
      When enabled, any main thread pause that is longer than the specified
      <code>appHangThreshold</code> is considered a <em>hang</em> in [<strong
        >Error Tracking</strong
      >][1]. There are two types of hangs:
    </p>
    <ul>
      <li>
        <p>
          <strong>Fatal app hang</strong>: How a hang gets reported if it never
          gets recovered and the app is terminated. Fatal app hangs are marked
          as a &quot;Crash&quot; in Error Tracking and the RUM explorer.
        </p>
        <a
          href="http://localhost:1313/images/real_user_monitoring/error_tracking/ios-fatal-app-hang.a0da1b322b64a60b25f4f29f4a1fda4c.png?fit=max&amp;auto=format"
          class="pop"
          data-bs-toggle="modal"
          data-bs-target="#popupImageModal"
          ><div class="shortcode-wrapper shortcode-img expand">
            <figure class="text-center">
              <picture style="width: 60%"
                ><img
                  srcset="
                    http://localhost:1313/images/real_user_monitoring/error_tracking/ios-fatal-app-hang.a0da1b322b64a60b25f4f29f4a1fda4c.png?auto=format
                  "
                  class="img-fluid"
                  style="width: 60%"
                  alt="A fatal app hang in the Error side panel."
              /></picture>
            </figure></div
        ></a>
      </li>
      <li>
        <p>
          <strong>Non-fatal app hang</strong>: How a hang gets reported if the
          app recovers from a relatively short hang and continues running.
          Non-fatal app hangs do not have a &quot;Crash&quot; mark on them in
          Error Tracking and the RUM explorer.
        </p>
        <a
          href="http://localhost:1313/images/real_user_monitoring/error_tracking/ios-non-fatal-app-hang.89830df06429fa8fffb4a81ba2284df7.png?fit=max&amp;auto=format"
          class="pop"
          data-bs-toggle="modal"
          data-bs-target="#popupImageModal"
          ><div class="shortcode-wrapper shortcode-img expand">
            <figure class="text-center">
              <picture style="width: 60%"
                ><img
                  srcset="
                    http://localhost:1313/images/real_user_monitoring/error_tracking/ios-non-fatal-app-hang.89830df06429fa8fffb4a81ba2284df7.png?auto=format
                  "
                  class="img-fluid"
                  style="width: 60%"
                  alt="A non-fatal app hang in the Error side panel."
              /></picture>
            </figure></div
        ></a>
      </li>
    </ul>
    <h4 id="enable-app-hang-monitoring">Enable app hang monitoring</h4>
    <p>To enable app hang monitoring:</p>
    <ol>
      <li><p>[Enable Crash Reporting][19]</p></li>
      <li>
        <p>
          Update the initialization snippet with the
          <code>appHangThreshold</code> parameter:
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
              ><code><span class="line"><span class="cl"><span class="n">RUM</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">with</span><span class="p">:</span> <span class="n">RUM</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="n">applicationID</span><span class="p">:</span> <span class="s">&#34;&lt;application id&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="n">appHangThreshold</span><span class="p">:</span> <span class="mf">0.25</span>
</span></span><span class="line"><span class="cl">    <span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
      <li>
        <p>
          Set the <code>appHangThreshold</code> parameter to the minimal
          duration you want app hangs to be reported. For example, enter
          <code>0.25</code> to report hangs lasting at least 250 ms. See
          [Configure the app hang threshold][5] for more guidance on setting
          this value.
        </p>
        <p>
          Make sure you follow the steps below to get [deobfuscated stack
          traces][6].
        </p>
      </li>
    </ol>
    <h4 id="configure-the-app-hang-threshold">
      Configure the app hang threshold
    </h4>
    <ul>
      <li>
        <p>
          Apple only considers hangs lasting more than 250 ms in their hang rate
          metrics in Xcode Organizer. Datadog recommends starting with a similar
          value for the <code>appHangThreshold</code> (in other words, set it to
          <code>0.25</code>) and then lowering it or increasing it incrementally
          to find the right setup.
        </p>
      </li>
      <li>
        <p>
          To filter out most of the noisy hangs, we recommend settling on an
          <code>appHangThreshold</code> between 2 and 3 seconds.
        </p>
      </li>
      <li>
        <p>
          The minimum value the <code>appHangThreshold</code> option can be set
          to is <code>0.1</code> seconds (100 ms). However, setting the
          threshold to such small values may lead to an excessive reporting of
          hangs.
        </p>
      </li>
      <li>
        <p>
          The SDK implements a secondary thread for monitoring app hangs. To
          reduce CPU utilization, it tracks hangs with a tolerance of 2.5%,
          which means some hangs that last close to the
          <code>appHangThreshold</code> may not be reported.
        </p>
      </li>
    </ul>
    <h4 id="disable-app-hang-monitoring">Disable app hang monitoring</h4>
    <p>
      To disable app hang monitoring, update the initialization snippet and set
      the <code>appHangThreshold</code> parameter to <code>nil</code>.
    </p>
    <h3 id="add-watchdog-terminations-reporting">
      Add watchdog terminations reporting
    </h3>
    <p>
      In the Apple ecosystem, the operating system employs a watchdog mechanism
      to monitor the health of applications, and terminates them if they become
      unresponsive or consume excessive resources like CPU and memory. These
      watchdog terminations are fatal and not recoverable (more details in the
      official [Apple documentation][12]).
    </p>
    <p>
      By default, watchdog terminations reporting is <strong>disabled</strong>,
      but you can enable it by using the
      <code>trackWatchdogTerminations</code> initialization parameter.
    </p>
    <p>
      When enabled, a watchdog termination is reported and attached to the
      previous user session on the next application launch, based on heuristics:
    </p>
    <ul>
      <li><p>The application was not upgraded in the meantime,</p></li>
      <li>
        <p>
          And it did not call neither <code>exit</code>, nor <code>abort</code>,
        </p>
      </li>
      <li>
        <p>
          And it did not crash, either because of an exception, or because of a
          fatal [app hang][13],
        </p>
      </li>
      <li><p>And it was not force-quitted by the user,</p></li>
      <li>
        <p>
          And the device did not reboot (which includes upgrades of the
          operating system).
        </p>
      </li>
    </ul>
    <a
      href="http://localhost:1313/images/real_user_monitoring/error_tracking/ios-watchdog-termination.9d846fde128471349976faed6f253472.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture style="width: 60%"
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/error_tracking/ios-watchdog-termination.9d846fde128471349976faed6f253472.png?auto=format
              "
              class="img-fluid"
              style="width: 60%"
              alt="A watchdog termination in the Error Tracking side panel."
          /></picture>
        </figure></div
    ></a>
    <h4 id="enable-watchdog-terminations-reporting">
      Enable watchdog terminations reporting
    </h4>
    <p>To enable watchdog terminations reporting:</p>
    <ol>
      <li><p>[Enable Crash Reporting][19]</p></li>
      <li>
        <p>
          Update the initialization snippet with the
          <code>trackWatchdogTerminations</code> flag:
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
              ><code><span class="line"><span class="cl"><span class="n">RUM</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="n">with</span><span class="p">:</span> <span class="n">RUM</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="n">applicationID</span><span class="p">:</span> <span class="s">&#34;&lt;application id&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">        <span class="n">trackWatchdogTerminations</span><span class="p">:</span> <span class="kc">true</span>
</span></span><span class="line"><span class="cl">    <span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">)</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
    </ol>
    <h4 id="disable-watchdog-terminations-reporting">
      Disable watchdog terminations reporting
    </h4>
    <p>
      To disable watchdog terminations reporting, update the initialization
      snippet and set the <code>trackWatchdogTerminations</code> parameter to
      <code>false</code>.
    </p>
    <h2 id="get-deobfuscated-stack-traces">Get deobfuscated stack traces</h2>
    <p>
      Mapping files are used to deobfuscate stack traces, which helps in
      debugging errors. Using a unique build ID that gets generated, Datadog
      automatically matches the correct stack traces with the corresponding
      mapping files. This ensures that regardless of when the mapping file was
      uploaded (either during pre-production or production builds), the correct
      information is available for efficient QA processes when reviewing crashes
      and errors reported in Datadog.
    </p>
    <p>
      For iOS applications, the matching of stack traces and symbol files relies
      on their <code>uuid</code> field.
    </p>
    <h3 id="symbolicate-crash-reports">Symbolicate crash reports</h3>
    <p>
      Crash reports are collected in a raw format and mostly contain memory
      addresses. To map these addresses into legible symbol information, Datadog
      requires .<code>dSYM</code> files, which are generated in your
      application's build or distribution process.
    </p>
    <h3 id="find-your-dsym-file">Find your .dSYM file</h3>
    <p>
      Every iOS application produces <code>.dSYM</code> files for each
      application module. These files minimize an application's binary size and
      enable faster download speed. Each application version contains a set of
      <code>.dSYM</code> files.
    </p>
    <p>
      Depending on your setup, you may need to download <code>.dSYM</code> files
      from App Store Connect or find them on your local machine.
    </p>
    <table>
      <thead>
        <tr>
          <th>Bitcode Enabled</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Yes</td>
          <td>
            <code>.dSYM</code> files are available after [App Store Connect][7]
            completes processing your application's build.
          </td>
        </tr>
        <tr>
          <td>No</td>
          <td>
            Xcode exports <code>.dSYM</code> files to
            <code>$DWARF_DSYM_FOLDER_PATH</code> at the end of your
            application's build. Ensure that the
            <code>DEBUG_INFORMATION_FORMAT</code> build setting is set to
            <strong>DWARF with dSYM File</strong>. By default, Xcode projects
            only set <code>DEBUG_INFORMATION_FORMAT</code> to
            <strong>DWARF with dSYM File</strong> for the Release project
            configuration.
          </td>
        </tr>
      </tbody>
    </table>
    <h3 id="upload-your-dsym-file">Upload your .dSYM file</h3>
    <p>
      By uploading your <code>.dSYM</code> file to Datadog, you gain access to
      the file path and line number of each frame in an error's related stack
      trace.
    </p>
    <p>
      Once your application crashes and you restart the application, the iOS SDK
      uploads a crash report to Datadog.
    </p>
    <p>
      <strong>Note</strong>: Re-uploading a source map does not override the
      existing one if the version has not changed.
    </p>
    <h3 id="use-datadog-ci-to-upload-your-dsym-file">
      Use Datadog CI to upload your .dSYM file
    </h3>
    <p>
      You can use the command line tool [@datadog/datadog-ci][8] to upload your
      <code>.dSYM</code> file:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-sh">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="nb">export</span> <span class="nv">DATADOG_API_KEY</span><span class="o">=</span><span class="s2">&#34;&lt;API KEY&gt;&#34;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">// <span class="k">if</span> you have a zip file containing dSYM files
</span></span><span class="line"><span class="cl">npx @datadog/datadog-ci dsyms upload appDsyms.zip
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">// <span class="k">if</span> you have a folder containing dSYM files
</span></span><span class="line"><span class="cl">npx @datadog/datadog-ci dsyms upload /path/to/appDsyms/
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      <strong>Note</strong>: To configure the tool using the EU endpoint, set
      the <code>DATADOG_SITE</code> environment variable to
      <code>datadoghq.eu</code>. To override the full URL for the intake
      endpoint, define the <code>DATADOG_DSYM_INTAKE_URL</code> environment
      variable.
    </p>
    <p>
      Alternatively, if you use Fastlane or GitHub Actions in your workflows,
      you can leverage these integrations instead of <code>datadog-ci</code>:
    </p>
    <h3 id="use-fastlane-plugin-to-upload-your-dsym-file">
      Use Fastlane plugin to upload your .dSYM file
    </h3>
    <p>
      The Fastlane plugin helps you upload <code>.dSYM</code> files to Datadog
      from your Fastlane configuration.
    </p>
    <ol>
      <li>
        <p>Add [<code>fastlane-plugin-datadog</code>][9] to your project.</p>
        <div class="code-snippet-wrapper">
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            <div class="cdoc-code-snippet cdoc-language-sh">
              <pre
                tabindex="0"
                class="chroma"
              ><code><span class="line"><span class="cl">fastlane add_plugin datadog
</span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
      <li>
        <p>Configure Fastlane to upload your symbols.</p>
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
              ><code><span class="line"><span class="cl"><span class="c1"># download_dsyms action feeds dsym_paths automatically</span>
</span></span><span class="line"><span class="cl"><span class="n">lane</span> <span class="ss">:upload_dsym_with_download_dsyms</span> <span class="k">do</span>
</span></span><span class="line"><span class="cl">  <span class="n">download_dsyms</span>
</span></span><span class="line"><span class="cl">  <span class="n">upload_symbols_to_datadog</span><span class="p">(</span><span class="ss">api_key</span><span class="p">:</span> <span class="s2">&#34;datadog-api-key&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="k">end</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
    </ol>
    <p>For more information, see [<code>fastlane-plugin-datadog</code>][9].</p>
    <h3 id="use-github-actions-to-upload-your-dsym-file">
      Use GitHub Actions to upload your .dSYM file
    </h3>
    <p>
      The [Datadog Upload dSYMs GitHub Action][10] allows you to upload your
      symbols in your GitHub Action jobs:
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
          ><code><span class="line"><span class="cl">name: Upload dSYM Files
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">jobs:
</span></span><span class="line"><span class="cl">  build:
</span></span><span class="line"><span class="cl">    runs-on: macos-latest
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    steps:
</span></span><span class="line"><span class="cl">      - name: Checkout
</span></span><span class="line"><span class="cl">        uses: actions/checkout@v2
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">      - name: Generate/Download dSYM Files
</span></span><span class="line"><span class="cl">        uses: ./release.sh
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">      - name: Upload dSYMs to Datadog
</span></span><span class="line"><span class="cl">        uses: DataDog/upload-dsyms-github-action@v1
</span></span><span class="line"><span class="cl">        with:
</span></span><span class="line"><span class="cl">          api_key: ${ secrets.DATADOG_API_KEY }
</span></span><span class="line"><span class="cl">          site: datadoghq.com
</span></span><span class="line"><span class="cl">          dsym_paths: |
</span></span><span class="line"><span class="cl">            path/to/dsyms/folder
</span></span><span class="line"><span class="cl">            path/to/zip/dsyms.zip
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>For more information, see [dSYMs commands][11].</p>
    <h2 id="limitations">Limitations</h2>
    <p>dSYM files are limited in size to <strong>2 GB</strong> each.</p>
    <h2 id="test-your-implementation">Test your implementation</h2>
    <p>
      To verify your iOS Crash Reporting and Error Tracking configuration, issue
      a crash in your application and confirm that the error appears in Datadog.
    </p>
    <ol>
      <li>
        <p>
          Run your application on an iOS simulator or a real device. Ensure that
          the debugger is not attached. Otherwise, Xcode captures the crash
          before the iOS SDK does.
        </p>
      </li>
      <li>
        <p>Execute the code containing the crash:</p>
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
              ><code><span class="line"><span class="cl"><span class="kd">func</span> <span class="nf">didTapButton</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl"><span class="bp">fatalError</span><span class="p">(</span><span class="s">&#34;Crash the app&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
      <li>
        <p>
          After the crash happens, restart your application and wait for the iOS
          SDK to upload the crash report in [<strong>Error Tracking</strong
          >][1].
        </p>
      </li>
    </ol>
    <p>
      <strong>Note:</strong> Error Tracking supports symbolication of system
      symbol files for iOS v14+ arm64 and arm64e architecture.
    </p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="89">
    <h2 id="overview">Overview</h2>
    <p>
      Enable Crash Reporting and Error Tracking to get comprehensive crash
      reports and error trends with Real User Monitoring.
    </p>
    <p>Your crash reports appear in [<strong>Error Tracking</strong>][1].</p>
    <h2 id="setup">Setup</h2>
    <p>
      If you have not set up the Datadog Flutter SDK for RUM yet, follow the
      [in-app setup instructions][2] or see the [Flutter setup
      documentation][3].
    </p>
    <h3 id="add-native-crash-reporting">Add native crash reporting</h3>
    <p>
      Update your initialization snippet to enable native crash reporting for
      iOS and Android by setting <code>nativeCrashReportEnabled</code> to
      <code>true</code>.
    </p>
    <p>For example:</p>
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
          ><code><span class="line"><span class="cl"><span class="kd">final</span> <span class="n">configuration</span> <span class="o">=</span> <span class="n">DdSdkConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">  <span class="nl">clientToken:</span> <span class="s1">&#39;DD_CLIENT_TOKEN&#39;</span>
</span></span><span class="line"><span class="cl">  <span class="nl">env:</span> <span class="s1">&#39;DD_ENV&#39;</span>
</span></span><span class="line"><span class="cl">  <span class="nl">site:</span> <span class="n">DatadogSite</span><span class="p">.</span><span class="n">us1</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nl">trackingConsent:</span> <span class="n">TrackingConsent</span><span class="p">.</span><span class="n">granted</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nl">nativeCrashReportEnabled:</span> <span class="kc">true</span><span class="p">,</span> <span class="c1">// Set this flag
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="nl">loggingConfiguration:</span> <span class="n">LoggingConfiguration</span><span class="p">(),</span>
</span></span><span class="line"><span class="cl">  <span class="nl">rumConfiguration:</span> <span class="s1">&#39;DD_APP_ID&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="n">DatadogSdk</span><span class="p">.</span><span class="n">instance</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span><span class="n">configuration</span><span class="p">);</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      If your application suffers a fatal crash, once your application restarts,
      the Datadog Flutter SDK uploads a crash report to Datadog. For non-fatal
      errors, the Datadog Flutter SDK uploads these errors with other RUM data.
    </p>
    <h2 id="upload-symbol-files-to-datadog">Upload symbol files to Datadog</h2>
    <p>
      Native iOS crash reports are collected in a raw format and mostly contain
      memory addresses. To map these addresses into legible symbol information,
      Datadog requires that you upload .dSYM files, which are generated in your
      application's build process.
    </p>
    <p>
      For all crash reports that are built with the
      <code>--split-debug-info</code> option set and/or with the
      <code>--obfuscate</code> option set, you need to upload their Android
      Proguard mapping file and Dart symbol files generated by the Flutter build
      process.
    </p>
    <p>
      The [@datadog/datadog-ci][4] command line tool supports uploading all of
      the necessary files (dSYMs, Android Proguard Mapping, and Dart Symbol
      Files) in one command.
    </p>
    <p>
      First, install the <code>datadog-ci</code> tool from the instructions
      above and create a <code>datadog-ci.json</code> file at the root of your
      project, containing your API key and (optionally) your Datadog site:
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
</span></span><span class="line"><span class="cl">  <span class="nt">&#34;apiKey&#34;</span><span class="p">:</span> <span class="s2">&#34;&lt;YOUR_DATADOG_API_KEY&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nt">&#34;datadogSite&#34;</span><span class="p">:</span> <span class="s2">&#34;datadoghq.eu&#34;</span>  <span class="c1">// Optional if you are using datadoghq.com
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      Because this file contains your API key, it should not be checked in to
      version control.
    </p>
    <p>
      Alternately, you can set the <code>DATADOG_API_KEY</code> and
      <code>DATADOG_SITE</code> environment variables.
    </p>
    <p>
      Then, you can use the following command to upload all the necessary files
      for symbolication and deobfuscation of your crash reports:
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
          ><code><span class="line"><span class="cl">datadog-ci flutter-symbols upload --service-name &lt;YOUR_SERVICE_NAME&gt; --dart-symbols-location &lt;LOCATION_OF_DART_SYMBOLS&gt; --android-mapping --ios-dsyms
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      For a full list of options, see the <code>datadog-ci</code> [Flutter
      Symbols documentation][6].
    </p>
    <h2 id="advanced-configuration--flavors-and-build-numbers">
      Advanced configuration - flavors and build numbers
    </h2>
    <p>
      Datadog uses the combination of the <code>service-name</code>,
      <code>version</code>, and <code>flavor</code> to locate the correct
      symbols for deobfuscation, so the parameters sent to the
      <code>datadog-ci</code> command and the parameters set in
      [DdSdkConfiguration][7]
    </p>
    <p>
      If you are using app [flavors][8] in Flutter, you will need to set the
      name of the flavor in [DdSdkConfiguration.flavor][9] since we cannot
      detect the flavor automatically. You can then pass this to the
      <code>--flavor</code> parameter of the <code>datadog-ci</code> command:
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
          ><code><span class="line"><span class="cl">datadog-ci flutter-symbols upload --service-name &lt;YOUR_SERVICE_NAME&gt; --dart-symbols-location &lt;LOCATION_OF_DART_SYMBOLS&gt; --android-mapping --ios-dsyms --flavor my_flavor
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      The Datadog SDK automatically detects the version number of your
      application specified in your <code>pubspec.yaml</code> up to but not
      including the build number. If you are using build numbers as part of the
      version in your application and need to upload symbols for each build, you
      need to add the version to [DdSdkConfiguration.version][10]. You can then
      pass this to the <code>--version</code> parameter of the
      <code>datadog-ci</code> command:
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
          ><code><span class="line"><span class="cl">datadog-ci flutter-symbols upload --service-name &lt;YOUR_SERVICE_NAME&gt; --dart-symbols-location &lt;LOCATION_OF_DART_SYMBOLS&gt; --android-mapping --ios-dsyms --version 1.2.3+22
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      Note that Datadog uses tags for versions which do not allow
      <code>+</code>. All tooling automatically replaces <code>+</code> with
      <code>-</code> so that the version tags are searchable in Datadog.
    </p>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="90">
    <h2 id="overview">Overview</h2>
    <p>Error Tracking processes errors collected from the Roku SDK.</p>
    <p>
      Enable Roku Crash Reporting and Error Tracking to get comprehensive crash
      reports and error trends with Real User Monitoring. With this feature, you
      can access:
    </p>
    <ul>
      <li>Aggregated Roku crash dashboards and attributes</li>
      <li>Trend analysis with Roku error tracking</li>
    </ul>
    <p>Your crash reports appear in [<strong>Error Tracking</strong>][1].</p>
    <h2 id="setup">Setup</h2>
    <p>
      If you have not set up the Roku SDK yet, follow the [in-app setup
      instructions][2] or see the [Roku setup documentation][3].
    </p>
    <ol>
      <li>
        Add the latest version of the [Roku SDK][4] to your ROPM dependencies
        (or download the zip archive).
      </li>
      <li>
        Configure your application's <code>env</code> when [initializing the
        SDK][5].
      </li>
    </ol>
    <p>
      For any given error, you can access the file path, line number, and a code
      snippet for each frame of the related stack trace.
    </p>
    <h2 id="limitations">Limitations</h2>
    <p>Crash reporting on Roku doesn't yet support stacktraces.</p>
    <h2 id="test-your-implementation">Test your implementation</h2>
    <p>
      To verify your Roku Crash Reporting and Error Tracking configuration, you
      need to trigger a crash in your application and confirm that the error
      appears in Datadog.
    </p>
    <p>To test your implementation:</p>
    <ol>
      <li><p>Run your application on an Roku device.</p></li>
      <li>
        <p>Execute some code containing a crash. For example:</p>
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
              ><code><span class="line"><span class="cl">sub explodingMethod()
</span></span><span class="line"><span class="cl">    x = 1
</span></span><span class="line"><span class="cl">    print x.foo
</span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
      <li>
        <p>
          After the crash happens, restart your application and wait for the
          Roku SDK to upload the crash report in [<strong>Error Tracking</strong
          >][1].
        </p>
      </li>
    </ol>
    <h3 id="forward-errors-to-datadog">Forward errors to Datadog</h3>
    <p>
      Whenever you perform an operation that might throw an exception, you can
      forward the error to Datadog by adding the following code snippet:
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
          ><code><span class="line"><span class="cl">    try
</span></span><span class="line"><span class="cl">        doSomethingThatMightThrowAnException()
</span></span><span class="line"><span class="cl">    catch error
</span></span><span class="line"><span class="cl">        m.global.datadogRumAgent.callfunc(&#34;addError&#34;, error)
</span></span><span class="line"><span class="cl">    end try
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="91">
    <h2 id="overview">Overview</h2>
    <p>
      Enable React Native Crash Reporting and Error Tracking to get
      comprehensive crash reports and error trends with Real User Monitoring.
      With this feature, you can access:
    </p>
    <ul>
      <li>Aggregated React Native crash dashboards and attributes</li>
      <li>
        Symbolicated React Native (JavaScript and native iOS or Android) crash
        reports
      </li>
      <li>Trend analysis with React Native Error Tracking</li>
    </ul>
    <p>
      In order to symbolicate your stack traces, manually upload your source
      maps and native debug symbols into Datadog.
    </p>
    <p>Your crash reports appear in [<strong>Error Tracking</strong>][1].</p>
    <h2 id="setup">Setup</h2>
    <p>
      If you have not set up the React Native SDK yet, follow the [in-app setup
      instructions][2] or see the [React Native setup documentation][3].
    </p>
    <h3 id="add-crash-reporting">Add Crash Reporting</h3>
    <p>
      Update your initialization snippet to enable native JavaScript crash
      reporting:
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
          ><code><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">config</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">DdSdkReactNativeConfiguration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;&lt;CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;&lt;ENVIRONMENT_NAME&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="s1">&#39;&lt;APPLICATION_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="kc">true</span> <span class="c1">// enable JavaScript crash reporting
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="nx">config</span><span class="p">.</span><span class="nx">nativeCrashReportEnabled</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span> <span class="c1">// enable native crash reporting
</span></span></span></code></pre>
        </div>
      </div>
    </div>
    <h2 id="get-deobfuscated-stack-traces">Get deobfuscated stack traces</h2>
    <p>
      Debug symbols are used to deobfuscate stack traces, which helps in
      debugging errors. Using a unique build ID that gets generated, Datadog
      automatically matches the correct stack traces with the corresponding
      debug symbols. This ensures that regardless of when the debug symbols were
      uploaded (either during pre-production or production builds), the correct
      information is available for efficient QA processes when reviewing crashes
      and errors reported in Datadog.
    </p>
    <p>
      For React Native applications, the matching of stack traces and source
      maps relies on a combination of the <code>service</code>,
      <code>version</code>, <code>bundle_name</code>, and
      <code>platform</code> fields. Out of all source maps that match with these
      fields, Datadog uses the one with the highest
      <code>build_number</code> value.
    </p>
    <p>
      In order to make your application's size smaller, its code is minified
      when it is built for release. To link errors to your actual code, you need
      to upload the following symbolication files:
    </p>
    <ul>
      <li>JavaScript source maps for your iOS JavaScript bundle</li>
      <li>JavaScript source maps for your Android JavaScript bundle</li>
      <li>dSYMs for your iOS native code</li>
      <li>
        Proguard mapping files if you have enabled code obfuscation for your
        Android native code
      </li>
    </ul>
    <p>
      To set your project up to send the symbolication files automatically, run
      <code>npx datadog-react-native-wizard</code>.
    </p>
    <p>See the wizard [official documentation][13] for options.</p>
    <h3 id="use-datadog-metro-configuration">
      Use Datadog Metro Configuration
    </h3>
    <p>
      Starting from <code>@datadog/mobile-react-native@2.10.0</code> and
      <code>@datadog/datadog-ci@v3.13.0</code>, the SDK exports a Datadog Metro
      Plugin, which attaches a unique Debug ID to your application bundle and
      sourcemap.
    </p>
    <p>
      Add it to your <code>metro.config.js</code> to allow for accurate
      symbolication of stacktraces on Datadog:
    </p>
    <div class="code-snippet-wrapper">
      <div class="code-filename-wrapper d-flex justify-content-end"></div>
      <div class="code-snippet">
        <div class="code-button-wrapper position-absolute">
          <button class="btn text-primary js-copy-button">Copy</button>
        </div>
        <div class="cdoc-code-snippet cdoc-language-js">
          <pre
            tabindex="0"
            class="chroma"
          ><code><span class="line"><span class="cl"><span class="kr">const</span> <span class="p">{</span><span class="nx">getDefaultConfig</span><span class="p">,</span> <span class="nx">mergeConfig</span><span class="p">}</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;@react-native/metro-config&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="p">{</span><span class="nx">withDatadogMetroConfig</span><span class="p">}</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;@datadog/mobile-react-native/metro&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c1">// Your configuration
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="kr">const</span> <span class="nx">config</span> <span class="o">=</span> <span class="nx">mergeConfig</span><span class="p">(</span><span class="nx">getDefaultConfig</span><span class="p">(</span><span class="nx">__dirname</span><span class="p">),</span> <span class="p">{});</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">module</span><span class="p">.</span><span class="nx">exports</span> <span class="o">=</span> <span class="nx">withDatadogMetroConfig</span><span class="p">(</span><span class="nx">config</span><span class="p">);</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h3 id="use-the-">
      Use the <code>datadog-ci react-native inject-debug-id</code> command
    </h3>
    <p>
      As an alternative to the Metro Configuration, starting from
      <code>@datadog/mobile-react-native@2.10.0</code> and
      <code>@datadog/datadog-ci@v3.13.0</code>, you can use the
      <code>datadog-ci react-native inject-debug-id</code> command to manually
      attach a unique Debug ID to your application bundle and sourcemap.
    </p>
    <p>
      Usage instructions are available on the [command documentation page][17].
    </p>
    <h3 id="passing-options-for-your-uploads">
      Passing options for your uploads
    </h3>
    <h4 id="using-the-">
      Using the <code>datadog-sourcemaps.gradle</code> script
    </h4>
    <p>
      To specify a different service name, add the following code to your
      <code>android/app/build.gradle</code> file, before the
      <code
        >apply from:
        &quot;../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle&quot;</code
      >
      line:
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
          ><code><span class="line"><span class="cl"><span class="n">project</span><span class="o">.</span><span class="na">ext</span><span class="o">.</span><span class="na">datadog</span> <span class="o">=</span> <span class="o">[</span>
</span></span><span class="line"><span class="cl">    <span class="nl">serviceName:</span> <span class="s2">&#34;com.my.custom.service&#34;</span>
</span></span><span class="line"><span class="cl"><span class="o">]</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h4 id="using-the-">
      Using the <code>datadog-ci react-native xcode</code> command
    </h4>
    <p>
      Options for the <code>datadog-ci react-native xcode</code> command are
      available on the [command documentation page][12].
    </p>
    <h4 id="specifying-a-custom-release-version">
      Specifying a custom release version
    </h4>
    <p>
      Use the <code>DATADOG_RELEASE_VERSION</code> environment variable to
      specify a different release version for your source maps, starting from
      <code>@datadog/mobile-react-native@2.3.5</code> and
      <code>@datadog/datadog-ci@v2.37.0</code>.
    </p>
    <p>
      When the SDK is initialized with a version suffix, you must manually
      override the release version in order for the source map and build
      versions to match.
    </p>
    <h3 id="list-uploaded-source-maps">List uploaded source maps</h3>
    <p>See the [RUM Debug Symbols][16] page to view all uploaded symbols.</p>
    <h2 id="limitations">Limitations</h2>
    <p>
      Source maps and mapping files are limited in size to
      <strong>500 MB</strong> each, while dSYM files can go up to
      <strong>2 GB</strong> each.
    </p>
    <p>
      To compute the size of your source maps and bundle, run the following
      command:
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
          ><code><span class="line"><span class="cl">npx react-native bundle <span class="se">\
</span></span></span><span class="line"><span class="cl"><span class="se"></span>  --dev <span class="nb">false</span> <span class="se">\
</span></span></span><span class="line"><span class="cl"><span class="se"></span>  --platform ios <span class="se">\
</span></span></span><span class="line"><span class="cl"><span class="se"></span>  --entry-file index.js <span class="se">\
</span></span></span><span class="line"><span class="cl"><span class="se"></span>  --bundle-output build/main.jsbundle <span class="se">\
</span></span></span><span class="line"><span class="cl"><span class="se"></span>  --sourcemap-output build/main.jsbundle.map
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nv">sourcemapsize</span><span class="o">=</span><span class="k">$(</span>wc -c build/main.jsbundle.map <span class="p">|</span> awk <span class="s1">&#39;{print $1}&#39;</span><span class="k">)</span>
</span></span><span class="line"><span class="cl"><span class="nv">bundlesize</span><span class="o">=</span><span class="k">$(</span>wc -c build/main.jsbundle <span class="p">|</span> awk <span class="s1">&#39;{print $1}&#39;</span><span class="k">)</span>
</span></span><span class="line"><span class="cl"><span class="nv">payloadsize</span><span class="o">=</span><span class="k">$((</span><span class="nv">$sourcemapsize</span> <span class="o">+</span> <span class="nv">$bundlesize</span><span class="k">))</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nb">echo</span> <span class="s2">&#34;Size of source maps and bundle is </span><span class="k">$((</span><span class="nv">$payloadsize</span> <span class="o">/</span> <span class="m">1000000</span><span class="k">))</span><span class="s2">MB&#34;</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      If a <code>build</code> directory does not already exist, create it first
      by running <code>mkdir build</code>, then run the command above.
    </p>
    <h2 id="test-your-implementation">Test your implementation</h2>
    <p>
      To verify your React Native Crash Reporting and Error Tracking
      configuration, you need to issue an error in your application and confirm
      that the error appears in Datadog.
    </p>
    <p>To test your implementation:</p>
    <ol>
      <li>
        <p>
          Run your application on a simulator, emulator, or a real device. If
          you are running on iOS, ensure that the debugger is not attached.
          Otherwise, Xcode captures the crash before the Datadog SDK does.
        </p>
      </li>
      <li>
        <p>Execute some code containing an error or crash. For example:</p>
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
              ><code><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">throwError</span> <span class="o">=</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl"> <span class="k">throw</span> <span class="k">new</span> <span class="nb">Error</span><span class="p">(</span><span class="s2">&#34;My Error&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
      <li>
        <p>
          For obfuscated error reports that do not result in a crash, you can
          verify symbolication and deobfuscation in [<strong
            >Error Tracking</strong
          >][1].
        </p>
      </li>
      <li>
        <p>
          For crashes, after the crash happens, restart your application and
          wait for the React Native SDK to upload the crash report in [<strong
            >Error Tracking</strong
          >][1].
        </p>
      </li>
    </ol>
    <p>
      To make sure your source maps are correctly sent and linked to your
      application, you can also generate crashes with the
      [<code>react-native-performance-limiter</code>][14] package.
    </p>
    <p>Install it with yarn or npm then re-install your pods:</p>
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
          ><code><span class="line"><span class="cl">yarn add react-native-performance-limiter <span class="c1"># or npm install react-native-performance-limiter</span>
</span></span><span class="line"><span class="cl"><span class="o">(</span><span class="nb">cd</span> ios <span class="o">&amp;&amp;</span> pod install<span class="o">)</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>Crash the JavaScript thread from your app:</p>
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
          ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">crashJavascriptThread</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;react-native-performance-limiter&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">crashApp</span> <span class="o">=</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">crashJavascriptThread</span><span class="p">(</span><span class="s1">&#39;custom error message&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">};</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      Re-build your application for release to send the new source maps, trigger
      the crash and wait on the [Error Tracking][1] page for the error to
      appear.
    </p>
    <p>
      To test your dSYMs and Proguard mapping files upload, crash the native
      main thread instead:
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
          ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">crashNativeMainThread</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;react-native-performance-limiter&#39;</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="kr">const</span> <span class="nx">crashApp</span> <span class="o">=</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="nx">crashNativeMainThread</span><span class="p">(</span><span class="s1">&#39;custom error message&#39;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">};</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="92">
    <h2 id="overview">Overview</h2>
    <p>
      Error Tracking processes errors collected from the Kotlin Multiplatform
      SDK.
    </p>
    <p>
      Enable Kotlin Multiplatform Crash Reporting and Error Tracking to get
      comprehensive crash reports and error trends. With this feature, you can
      access:
    </p>
    <ul>
      <li>Aggregated Kotlin Multiplatform crash dashboards and attributes</li>
      <li>Deobfuscated Kotlin Multiplatform (iOS and Android) crash reports</li>
      <li>Trend analysis with Kotlin Multiplatform error tracking</li>
    </ul>
    <p>Your crash reports appear in [<strong>Error Tracking</strong>][1].</p>
    <h2 id="setup">Setup</h2>
    <p>
      If you have not set up the Kotlin Multiplatform SDK yet, follow the
      [in-app setup instructions][2] or see the [Kotlin Multiplatform setup
      documentation][3].
    </p>
    <p>
      For any given error, you can access the file path, line number, and a code
      snippet for each frame of the related stack trace.
    </p>
    <h3 id="android">Android</h3>
    <p>
      All uncaught exceptions and ANRs resulting in a crash are reported by the
      Kotlin Multiplatform SDK (see <a href="#limitations">limitations</a>). On
      top of these crashes, you can configure the SDK to report NDK crashes, and
      control the reporting of non-fatal ANRs.
    </p>
    <h4 id="add-ndk-crash-reporting">Add NDK crash reporting</h4>
    <p>
      Your Android application may be running native code (C/C++) for
      performance or code reusability. To enable NDK crash reporting, use the
      Datadog NDK library.
    </p>
    <ol>
      <li>
        Add the Gradle dependency to your Android source set by declaring the
        library as a dependency in your <code>build.gradle.kts</code> file:
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
</span></span><span class="line"><span class="cl">  <span class="n">sourceSets</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">androidMain</span><span class="p">.</span><span class="n">dependencies</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="n">implementation</span><span class="p">(</span><span class="s2">&#34;com.datadoghq:dd-sdk-android-ndk:x.x.x&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl">  <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <ol start="2">
      <li>Enable NDK crash collection after initializing the SDK.</li>
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
          ><code><span class="line"><span class="cl"><span class="c1">// in Android source set
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="nc">NdkCrashReports</span><span class="p">.</span><span class="n">enable</span><span class="p">()</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h4 id="add-anr-reporting">Add ANR reporting</h4>
    <p>
      An &quot;Application Not Responding&quot; ([ANR][4]) is an
      Android-specific type of error that gets triggered when the application is
      unresponsive for too long.
    </p>
    <p>
      For any Android version, you can override the default setting for
      reporting non-fatal ANRs by setting
      <code>trackNonFatalAnrs</code> (available from Android source set only) to
      <code>true</code> or <code>false</code> when initializing the SDK.
    </p>
    <p>
      ANRs are only reported through RUM (not through logs). For more
      information, see [Android Crash Reporting and Error Tracking - Add ANR
      Reporting][5].
    </p>
    <h3 id="ios">iOS</h3>
    <p>
      <strong>Note</strong>: Kotlin 2.0.20 or higher is required if crash
      tracking is enabled on iOS. Otherwise, due to the compatibility with
      <code>PLCrashReporter</code>, the application may hang if crash tracking
      is enabled. See other dependencies in the [setup][10] instructions.
    </p>
    <p>
      All uncaught exceptions resulting in a crash are reported by the Kotlin
      Multiplatform SDK.
    </p>
    <h4 id="add-app-hang-reporting">Add app hang reporting</h4>
    <p>
      App hangs are an iOS-specific type of error that happens when the
      application is unresponsive for too long.
    </p>
    <p>
      By default, app hangs reporting is <strong>disabled</strong>, but you can
      enable it and set your own threshold to monitor app hangs that last more
      than a specified duration by using the
      <code>setAppHangThreshold</code> (available from iOS source set only)
      initialization method.
    </p>
    <p>
      App hangs are only reported through RUM (not through logs). For more
      information, see [iOS Crash Reporting and Error Tracking - Add ANR
      Reporting][6].
    </p>
    <h2 id="get-deobfuscated-stack-traces">Get deobfuscated stack traces</h2>
    <p>
      Mapping files are used to deobfuscate stack traces, which helps in
      debugging errors. Using a unique build ID that gets generated, Datadog
      automatically matches the correct stack traces with the corresponding
      mapping files. This ensures that regardless of when the mapping file was
      uploaded (either during pre-production or production builds), the correct
      information is available for efficient QA processes when reviewing crashes
      and errors reported in Datadog.
    </p>
    <p>
      Use the following guides to see how you can upload mapping files (Android)
      or dSYMs (iOS) to Datadog: [Android][7], [iOS][8].
    </p>
    <h2 id="limitations">Limitations</h2>
    <h3 id="file-sizing">File sizing</h3>
    <p>
      Mapping files are limited in size to <strong>500 MB</strong> each, while
      dSYM files can go up to <strong>2 GB</strong> each.
    </p>
    <h3 id="collection">Collection</h3>
    <p>The SDK handles crash reporting with the following behaviors:</p>
    <ul>
      <li>
        The crash can only be detected after the SDK is initialized. Because of
        this, Datadog recommends that you initialize the SDK as soon as possible
        in your application.
      </li>
      <li>
        RUM crashes must be attached to a RUM view. If a crash occurs before a
        view is visible, or after the app is sent to the background by the
        end-user navigating away from it, the crash is muted and isn't reported
        for collection. To mitigate this, use the
        <code>trackBackgroundEvents()</code> [method][9] in your
        <code>RumConfiguration</code> builder.
      </li>
      <li>Only crashes that occur in sampled sessions are kept.</li>
    </ul>
    <h2 id="test-your-implementation">Test your implementation</h2>
    <p>
      To verify your Kotlin Multiplatform Crash Reporting and Error Tracking
      configuration, you need to trigger a crash in your application and confirm
      that the error appears in Datadog.
    </p>
    <p>To test your implementation:</p>
    <ol>
      <li>
        <p>
          Run your application on an Kotlin Multiplatform emulator or a real
          device.
        </p>
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
          Kotlin Multiplatform SDK to upload the crash report in [<strong
            >Error Tracking</strong
          >][1].
        </p>
      </li>
    </ol>
  </div>
  <div class="cdoc__toggleable cdoc__hidden" data-if="93">
    <h2 id="overview">Overview</h2>
    <p>
      Enable Crash Reporting and Error Tracking to get comprehensive crash
      reports and error trends with Real User Monitoring.
    </p>
    <p>Your crash reports appear in [<strong>Error Tracking</strong>][1].</p>
    <h2 id="setup">Setup</h2>
    <p>
      If you have not set up the Datadog Unity SDK for yet, follow the [in-app
      setup instructions][2] or see the [Unity setup documentation][3].
    </p>
    <h3 id="forward-uncaught-exceptions-from-unity-logs">
      Forward uncaught exceptions from Unity logs
    </h3>
    <p>
      Unity forwards all uncaught exceptions to its logger using
      <code>Debug.LogException</code>. To report these exceptions to Datadog,
      check the option in Datadog's project settings labeled &quot;Forward Unity
      Logs&quot;.
    </p>
    <h3 id="native-crash-reporting">Native crash reporting</h3>
    <p>Native crash reporting is enabled for all Datadog Unity SDK projects.</p>
    <p>
      If your application suffers a fatal crash, the Datadog Unity SDK uploads a
      crash report to Datadog <em>after</em> your application restarts. For
      non-fatal errors or exceptions, the Datadog Unity SDK uploads these errors
      with other RUM data.
    </p>
    <h2 id="get-deobfuscated-and-symbolicated-stack-traces">
      Get deobfuscated and symbolicated stack traces
    </h2>
    <p>
      Mapping files are used to deobfuscate and symbolicate stack traces, which
      helps in debugging errors. Using a unique build ID that gets generated,
      Datadog automatically matches the correct stack traces with the
      corresponding mapping files. This ensures that regardless of when the
      mapping file was uploaded (either during pre-production or production
      builds), the correct information is available for efficient QA processes
      when reviewing crashes and errors reported in Datadog.
    </p>
    <h3 id="file-and-line-mapping-with-il2cpp">
      File and line mapping with IL2CPP
    </h3>
    <p>
      When using the IL2CPP backend (the default for iOS), C# stack traces from
      Unity lack any file or line information. This information can be retrieved
      from the native symbol files and an IL2CPP mapping file, provided the C#
      stack traces are mapped to native stacks. To enable this, check the
      &quot;Perform Native Stack Mapping&quot; option in your Unity project
      settings under the Datadog section and upload your symbol and IL2CPP
      mapping files as described below.
    </p>
    <p>
      <strong>Note</strong>: Even when checked, Native Stack Mapping is only
      enabled in non-development builds.
    </p>
    <h3 id="upload-symbol-files-to-datadog">Upload symbol files to Datadog</h3>
    <p>
      Native crash reports are collected in a raw format and mostly contain
      memory addresses. To map these addresses into legible symbol information,
      Datadog requires that you upload iOS <code>.dSYM</code> files, NDK
      <code>.so</code> files, Android Proguard Mapping files, and / or a IL2CPP
      mapping file, which are generated in your application's build process.
    </p>
    <p>
      The [@datadog/datadog-ci][4] command line tool supports uploading all of
      the necessary files (dSYMs, sos, Android Proguard Mapping, and IL2CPP
      Mapping files) in one command.
    </p>
    <p>
      First, install the <code>datadog-ci</code> tool from the instructions
      above and create a <code>datadog-ci.json</code> file at the root of your
      project, containing your API key and (optionally) your Datadog site:
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
</span></span><span class="line"><span class="cl">  <span class="nt">&#34;apiKey&#34;</span><span class="p">:</span> <span class="s2">&#34;&lt;YOUR_DATADOG_API_KEY&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nt">&#34;datadogSite&#34;</span><span class="p">:</span> <span class="s2">&#34;datadoghq.eu&#34;</span>  <span class="c1">// Optional if you are using datadoghq.com
</span></span></span><span class="line"><span class="cl"><span class="c1"></span><span class="p">}</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      Because this file contains your API key, it should not be checked into
      version control.
    </p>
    <p>
      Alternately, you can set the <code>DATADOG_API_KEY</code> and
      <code>DATADOG_SITE</code> environment variables.
    </p>
    <p>
      Then, you can use the following command to upload all the necessary files
      for symbolication and deobfuscation of your crash reports:
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
          ><code><span class="line"><span class="cl"><span class="c1"># From your build output directory</span>
</span></span><span class="line"><span class="cl">datadog-ci unity-symbols upload --ios
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      For Android, export an Android project (instead of building the APK
      directly) and build using the exported project. You can then run
      datadog-ci from the exported project directory:
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
          ><code><span class="line"><span class="cl"><span class="c1"># From your exported project directory</span>
</span></span><span class="line"><span class="cl">datadog-ci unity-symbols upload --android
</span></span></code></pre>
        </div>
      </div>
    </div>
    <p>
      <strong>Note</strong>: Re-uploading a source map does not override the
      existing one if the build id has not changed.
    </p>
    <p>
      For a full list of options, see the <code>datadog-ci</code> [Unity Symbols
      documentation][5].
    </p>
    <h3 id="list-uploaded-symbol-files">List uploaded symbol files</h3>
    <p>See the [RUM Debug Symbols][6] page to view all uploaded symbols.</p>
    <h2 id="limitations">Limitations</h2>
    <p>
      Mapping files are limited in size to <strong>500 MB</strong> each, while
      dSYM files can go up to <strong>2 GB</strong> each.
    </p>
    <h2 id="test-your-implementation">Test your implementation</h2>
    <p>
      To verify your Unity Crash Reporting and Error Tracking configuration,
      issue an error in your application and confirm that the error appears in
      Datadog.
    </p>
    <ol>
      <li>
        <p>
          Ensure you are not running a development build. Uncheck the
          &quot;Development Build&quot; box in Unity's build settings.
        </p>
      </li>
      <li>
        <p>
          Run your application on a simulator, emulator, or a real device. If
          you are running on iOS, ensure that the debugger is not attached.
          Otherwise, Xcode captures the crash before the Datadog SDK does.
        </p>
      </li>
      <li>
        <p>Execute code containing an error or crash. For example:</p>
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
              ><code><span class="line"><span class="cl"><span class="k">void</span> <span class="n">ThrowError</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl"> <span class="k">throw</span> <span class="k">new</span> <span class="n">Exception</span><span class="p">(</span><span class="s">&#34;My Exception&#34;</span><span class="p">)</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
      <li>
        <p>
          For obfuscated error reports that do not result in a crash, you can
          verify symbolication and deobfuscation in [<strong
            >Error Tracking</strong
          >][1].
        </p>
      </li>
      <li>
        <p>
          For crashes, after the crash happens, restart your application and
          wait for the Unity SDK to upload the crash report in [<strong
            >Error Tracking</strong
          >][1].
        </p>
      </li>
    </ol>
  </div>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps"><span class="w-100 d-flex justify-content-between "><span class="text">datadog-ci Source code</span><span class="badge badge-white pe-2 border-0">SOURCE CODE</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/guide/upload-javascript-source-maps"><span class="w-100 d-flex justify-content-between "><span class="text">Upload JavaScript source maps</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/error_tracking/explorer"><span class="w-100 d-flex justify-content-between "><span class="text">Learn about the Error Tracking Explorer</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"86":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"86"},"87":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"android"},"v":false,"r":"87"},"88":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"ios"},"v":false,"r":"88"},"89":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"flutter"},"v":false,"r":"89"},"90":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"roku"},"v":false,"r":"90"},"91":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"react_native"},"v":false,"r":"91"},"92":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"kotlin_multiplatform"},"v":false,"r":"92"},"93":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"unity"},"v":false,"r":"93"}},    filtersManifest: {"filtersByTraitId":{"platform":{"config":{"trait_id":"platform","option_group_id":"rum_sdk_platform_options","label":"SDK"},"defaultValsByOptionGroupId":{"rum_sdk_platform_options":"browser"}}},"defaultValsByTraitId":{"platform":"browser"},"optionGroupsById":{"rum_sdk_platform_options":[{"default":true,"id":"browser","label":"Browser"},{"id":"android","label":"Android"},{"id":"ios","label":"iOS"},{"id":"react_native","label":"React Native"},{"id":"flutter","label":"Flutter"},{"id":"roku","label":"Roku"},{"id":"kotlin_multiplatform","label":"Kotlin Multiplatform"},{"id":"unity","label":"Unity"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>

{{< img src="real_user_monitoring/error_tracking/rum-anr-fatal.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/error_tracking/rum-anr-non-fatal.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/error_tracking/ios-fatal-app-hang.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/error_tracking/ios-non-fatal-app-hang.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/error_tracking/ios-watchdog-termination.png" style="display:none;" alt="" >}}

