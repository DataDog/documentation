---
title: Correlate RUM and Profiling
description: >-
  Use profiling with RUM to understand application performance issues affecting
  user experience.
aliases:
  - >-
    /real_user_monitoring/correlate_with_other_telemetry/profiling/browser_profiling
  - /real_user_monitoring/correlate_with_other_telemetry/profiling/ios_profiling
  - >-
    /real_user_monitoring/correlate_with_other_telemetry/profiling/android_profiling
further_reading:
  - link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
    tag: Blog
    text: Real User Monitoring
  - link: https://www.datadoghq.com/blog/modern-frontend-monitoring/
    tag: Blog
    text: Start monitoring single-page applications
  - link: >-
      https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android
    tag: Documentation
    text: Start monitoring Android applications
  - link: https://docs.datadoghq.com/real_user_monitoring/application_monitoring/ios
    tag: Documentation
    text: Start monitoring iOS applications
  - link: /tracing/
    tag: Documentation
    text: APM and Distributed Tracing
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
    >iOS</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
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
    >iOS</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article>
  <h2 id="overview">Overview</h2>
  <p>
    Datadog RUM supports profiling for browser, iOS, and Android applications.
    Use profiling data to identify performance bottlenecks, optimize slow code
    paths, and improve rendering performance at both the system and code level.
  </p>
  <div class="cdoc__toggleable" data-description="SDK is Browser" data-if="217">
    <div class="card callout-card mb-4">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-black mt-0 mb-1">Join the Preview!</h5>
        <p class="card-text">
          <span
            ><p>
              Browser Profiling is in Preview. To request access, fill out this
              form.
            </p></span
          >
        </p>
        <a
          target="_blank"
          class="btn btn-outline-primary pb-1 align-self-end d-flex flex-column justify-content-center"
          >Request Access</a
        >
      </div>
    </div>
    <a
      href="http://localhost:1313/images/real_user_monitoring/browser/optimizing_performance/browser_profiler.f3c90929d45047a8f0ab89034d64e50f.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture style="width: 100%"
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/browser/optimizing_performance/browser_profiler.f3c90929d45047a8f0ab89034d64e50f.png?auto=format
              "
              class="img-fluid"
              style="width: 100%"
              alt="Browser profiling example when analyzing an event sample."
          /></picture>
        </figure></div
    ></a>
    <p>
      Browser profiling provides visibility into how your application behaves in
      your users' browsers, helping you understand root causes behind
      unresponsive applications at page load or during the page life cycle. Use
      profiling data alongside RUM insights to identify which code executes
      during a
      <a
        href="/real_user_monitoring/guide/browser-sdk-upgrade/#collect-long-animation-frames-as-long-tasks"
        >Long Animation Frame (LoAF)</a
      >
      and how JavaScript execution and rendering tasks impact user-perceived
      performance.
    </p>
    <p>
      To get started, enable browser profiling in your RUM SDK configuration.
      After enabling it, click on a profiled event sample to see detailed
      profiling data.
    </p>
    <h2 id="setup">Setup</h2>
    <h3 id="step-1--set-up-rum">Step 1 - Set up RUM</h3>
    <div class="alert alert-info">
      <p>Browser SDK version 6.12 or later is required.</p>
    </div>
    <p>
      To start collecting data, set up
      <a href="/real_user_monitoring/application_monitoring/browser/setup/"
        >RUM Browser Monitoring</a
      >.
    </p>
    <h3 id="step-2--configure-the-profiling-sampling-rate">
      Step 2 - Configure the profiling sampling rate
    </h3>
    <ol>
      <li>
        <p>
          Initialize the RUM SDK and configure <code>profilingSampleRate</code>,
          which determines the percentage of sessions that are profiled (for
          example, 25% means profiling runs on 25 out of 100 sessions).
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
              ><code><span class="line"><span class="cl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">datadogRum</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;@datadog/browser-rum&#39;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nx">datadogRum</span><span class="p">.</span><span class="nx">init</span><span class="p">({</span>
</span></span><span class="line"><span class="cl">  <span class="nx">clientToken</span><span class="o">:</span> <span class="s1">&#39;&lt;CLIENT_TOKEN&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">applicationId</span><span class="o">:</span> <span class="s1">&#39;&lt;APPLICATION_ID&gt;&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">site</span><span class="o">:</span> <span class="s1">&#39;datadoghq.com&#39;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="c1">//  service: &#39;my-web-application&#39;,
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="c1">//  env: &#39;production&#39;,
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="c1">//  version: &#39;1.0.0&#39;,
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>  <span class="nx">profilingSampleRate</span><span class="o">:</span> <span class="mi">25</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">trackLongTasks</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">  <span class="nx">trackUserInteractions</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">})</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
      <li>
        <p>
          Configure your web servers to serve HTML pages with the HTTP response
          header <code>Document-Policy: js-profiling</code>:
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
              ><code><span class="line"><span class="cl">    <span class="nx">app</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s2">&#34;/&#34;</span><span class="p">,</span> <span class="p">(</span><span class="nx">request</span><span class="p">,</span> <span class="nx">response</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="err">…</span> 
</span></span><span class="line"><span class="cl">        <span class="nx">response</span><span class="p">.</span><span class="nx">set</span><span class="p">(</span><span class="s2">&#34;Document-Policy&#34;</span><span class="p">,</span> <span class="s2">&#34;js-profiling&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">        <span class="err">…</span>
</span></span><span class="line"><span class="cl">    <span class="p">});</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
      </li>
      <li>
        <p>Set up Cross-Origin Resource Sharing (CORS) if needed.</p>
        <p>
          This step is required only if your JavaScript files are served from a
          different origin than your HTML. For example, if your HTML is served
          from <code>cdn.com</code> and JavaScript files from
          <code>static.cdn.com</code>, you must enable CORS to make JavaScript
          files visible to the profiler. For more information, see the
          <a href="#cors">Browser profiling and CORS</a> section.
        </p>
        <p>To enable CORS:</p>
        <ul>
          <li>
            <p>
              Add a <code>crossorigin=&quot;anonymous&quot;</code> attribute to
              <code>&lt;script/&gt;</code> tags
            </p>
          </li>
          <li>
            <p>
              Make sure that JavaScript response includes the
              <code>Access-Control-Allow-Origin: *</code> HTTP header (or the
              proper origin value)
            </p>
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
                  ><code><span class="line"><span class="cl"><span class="nx">app</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s2">&#34;/&#34;</span><span class="p">,</span> <span class="p">(</span><span class="nx">request</span><span class="p">,</span> <span class="nx">response</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="err">…</span> 
</span></span><span class="line"><span class="cl">    <span class="nx">response</span><span class="p">.</span><span class="nx">header</span><span class="p">(</span><span class="s2">&#34;Access-Control-Allow-Origin&#34;</span><span class="p">,</span> <span class="s2">&#34;*&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">    <span class="nx">response</span><span class="p">.</span><span class="nx">header</span><span class="p">(</span><span class="s2">&#34;Access-Control-Allow-Headers&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="err">…</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span></code></pre>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ol>
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
            <h3 class="header-text-inner">Browser profiling and CORS</h3>
          </div>
        </div>
      </summary>
      <div class="collapsible-content">
        <h4 id="requirements-for-cross-origin-scripts--cors">
          Requirements for Cross-Origin Scripts (CORS)
        </h4>
        <p>
          If a script's execution or attribution information is to be surfaced
          in performance entries (and thus captured in browser profiling), the
          resource (for example, a JavaScript file) needs to be fetched with
          CORS headers that explicitly allow it to be shared with the origin
          making the measurement (your application).
        </p>
        <p>To summarize:</p>
        <ul>
          <li>
            If a script is loaded from a same-origin source, then attribution is
            allowed, and you can see profiling data attributed to this script.
          </li>
          <li>
            If a script is loaded cross-origin <em>without</em> a permissive
            CORS policy (like <code>Access-Control-Allow-Origin</code> allowing
            the page origin), then attribution is blocked, and you do not see
            profiling data attributed to this script.
          </li>
        </ul>
        <p>
          This CORS policy restricts profiling to only scripts that are
          explicitly intended to be profiled by other origins.
        </p>
        <h4 id="how-does-cors-relate-to-browser-profiling">
          How does CORS relate to browser profiling?
        </h4>
        <p>
          When you start Datadog's browser profiler (which uses the
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/JS_Self-Profiling_API"
            >JS Self-Profiling API</a
          >), the profiler can capture stack traces of JavaScript execution—but
          it only includes <em>attribution</em> (function names, URLs, etc.) for
          the following scripts:
        </p>
        <ul>
          <li>
            Scripts that have the same origin as the page initiating the
            profiling
          </li>
          <li>Cross-origin scripts that explicitly opt-in using CORS</li>
        </ul>
        <p>
          This protects third-party content and users from leaking execution
          details across security boundaries.
        </p>
        <h4 id="why-is-the-crossorigin-anonymous-attribute-needed">
          Why is the crossorigin=&quot;anonymous&quot; attribute needed?
        </h4>
        <p>
          Without the <code>crossorigin=&quot;anonymous&quot;</code> attribute,
          the browser does not make a CORS-enabled request for the script. The
          browser fetches the script without CORS, meaning:
        </p>
        <ul>
          <li>No CORS policy applies.</li>
          <li>No credentials (cookies, HTTP auth, etc.) are sent.</li>
          <li>
            The fetched script is not eligible for detailed attribution in
            performance entries or stack traces. These stack frames are
            displayed as &quot;(anonymous)&quot; or with no attribution.
          </li>
        </ul>
        <p>
          To protect cross-origin script privacy, <em>both</em> sides must agree
          to share information:
        </p>
        <ul>
          <li>
            The page must explicitly request a CORS-enabled fetch, with
            <code>crossorigin=&quot;anonymous&quot;</code>.
          </li>
          <li>
            The server must permit this, with an
            <code>Access-Control-Allow-Origin</code> header in the response.
          </li>
        </ul>
        <p>
          A script is eligible for attribution in the JS Self-Profiling API only
          when both of these conditions are met.
        </p>
      </div>
    </details>
    <h2 id="explore-profiling">Explore profiling</h2>
    <h3 id="within-the-optimization-page">Within the Optimization page</h3>
    <p>
      The <strong>Optimization page</strong> surfaces profiling data in several
      contexts:
    </p>
    <ul>
      <li>
        In the <strong>Troubleshoot section</strong>, Datadog samples long tasks
        across multiple views to identify your top contributing functions. Use
        this overview to find where JavaScript execution time is spent and which
        functions block the main thread, then optimize those functions to
        improve responsiveness.
      </li>
    </ul>
    <a
      href="http://localhost:1313/images/real_user_monitoring/browser/optimizing_performance/browser_profiler_troubleshoot_section.7fa9f72cce3e38b5e6785291423be06b.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture style="width: 100%"
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/browser/optimizing_performance/browser_profiler_troubleshoot_section.7fa9f72cce3e38b5e6785291423be06b.png?auto=format
              "
              class="img-fluid"
              style="width: 100%"
              alt="Browser profiling troubleshoot section example within the Optimization page."
          /></picture>
        </figure></div
    ></a>
    <ul>
      <li>
        Within the <strong>Event Waterfall</strong>, any long task that includes
        profiling data is marked with a yellow profiling icon. Click one of
        these long task events to open a Long Task view panel with detailed
        profiling data. Use this panel to identify blocking functions, trace
        their call stacks, and understand how script execution contributes to
        poor responsiveness.
      </li>
    </ul>
    <a
      href="http://localhost:1313/images/real_user_monitoring/browser/optimizing_performance/browser_profiler_event_waterfall.9d598bde1aad74b87583fea24edf2bb9.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture style="width: 100%"
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/browser/optimizing_performance/browser_profiler_event_waterfall.9d598bde1aad74b87583fea24edf2bb9.png?auto=format
              "
              class="img-fluid"
              style="width: 100%"
              alt="Browser profiling event waterfall example within the Optimization page."
          /></picture>
        </figure></div
    ></a>
    <h3 id="within-the-sessions-explorer">Within the Sessions Explorer</h3>
    <p>
      You can also find profiling data when reviewing individual events within
      the <strong>Sessions Explorer</strong>. This opens the same Long Task view
      panel with profiling data, allowing you to inspect what code was executing
      during that task and how it affected the user's experience.
    </p>
    <a
      href="http://localhost:1313/images/real_user_monitoring/browser/optimizing_performance/browser_profiler_sessions_explorer.6c37c17ba4843996619bf6feae6a69d2.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture style="width: 100%"
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/browser/optimizing_performance/browser_profiler_sessions_explorer.6c37c17ba4843996619bf6feae6a69d2.png?auto=format
              "
              class="img-fluid"
              style="width: 100%"
              alt="Browser profiling troubleshoot section example within the Optimization page."
          /></picture>
        </figure></div
    ></a>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is Android"
    data-if="218"
  >
    <div class="card callout-card mb-4">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-black mt-0 mb-1">Join the Preview!</h5>
        <p class="card-text">
          <span
            ><p>
              Android Profiling is in Preview. To request access, fill out this
              form.
            </p></span
          >
        </p>
        <a
          target="_blank"
          class="btn btn-outline-primary pb-1 align-self-end d-flex flex-column justify-content-center"
          >Request Access</a
        >
      </div>
    </div>
    <a
      href="http://localhost:1313/images/real_user_monitoring/android/android-profiling-ttid.42a859be355425903315687a4f4d8871.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture style="width: 90%"
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/android/android-profiling-ttid.42a859be355425903315687a4f4d8871.png?auto=format
              "
              class="img-fluid"
              style="width: 90%"
              alt="Android profiling data in a time to initial display vital event."
          /></picture>
        </figure></div
    ></a>
    <p>
      Android profiling captures detailed data about your application's
      performance during launch, helping you identify slow methods and optimize
      startup time. Android profiling is built on top of the
      <a
        href="/real_user_monitoring/guide/browser-sdk-upgrade/#collect-long-animation-frames-as-long-tasks"
        >ProfilingManager Android API</a
      >
      and samples the device's CPU to collect method call stacks from the
      application's process.
    </p>
    <div class="alert alert-warning">
      <p>
        Only devices running Android 15 (API level 35) or higher generate
        profiling data.
      </p>
    </div>
    <h2 id="prerequisites">Prerequisites</h2>
    <ul>
      <li>
        Your Android application must use the Datadog Android SDK version
        3.6.0+.
      </li>
      <li>
        <a href="/real_user_monitoring/application_monitoring/browser/setup/"
          >RUM without Limits</a
        >
        must be enabled in your organization.
      </li>
    </ul>
    <h2 id="setup">Setup</h2>
    <h3 id="step-1--set-up-rum">Step 1 - Set up RUM</h3>
    <p>
      To start collecting data, set up
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/JS_Self-Profiling_API"
        >Mobile RUM for Android</a
      >.
    </p>
    <h3 id="step-2--configure-the-profiling-sampling-rate">
      Step 2 - Configure the profiling sampling rate
    </h3>
    <ol>
      <li>
        <p>
          Initialize the RUM SDK and configure the
          <code>applicationLaunchSampleRate</code>, which determines the
          percentage of application launches that are profiled (for example, 15%
          means profiling runs on 15 out of 100 launches).
        </p>
        <div class="alert alert-danger">
          <p>
            If no value is specified, the default
            <code>applicationLaunchSampleRate</code> is 15 percent.
          </p>
        </div>
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
              ><code><span class="line"><span class="cl">  <span class="k">class</span> <span class="nc">SampleApplication</span> <span class="p">:</span> <span class="n">Application</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">      <span class="k">override</span> <span class="k">fun</span> <span class="nf">onCreate</span><span class="p">()</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">          <span class="k">super</span><span class="p">.</span><span class="n">onCreate</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">          <span class="k">val</span> <span class="py">configuration</span> <span class="p">=</span> <span class="nc">Configuration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">              <span class="n">clientToken</span> <span class="p">=</span> <span class="s2">&#34;&lt;CLIENT_TOKEN&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">              <span class="n">env</span> <span class="p">=</span> <span class="s2">&#34;&lt;ENV_NAME&gt;&#34;</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">              <span class="n">variant</span> <span class="p">=</span> <span class="s2">&#34;&lt;APP_VARIANT_NAME&gt;&#34;</span>
</span></span><span class="line"><span class="cl">          <span class="p">).</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">          <span class="nc">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="n">configuration</span><span class="p">,</span> <span class="n">trackingConsent</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">          <span class="c1">// Enable RUM (required for Profiling)
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>          <span class="k">val</span> <span class="py">rumConfig</span> <span class="p">=</span> <span class="nc">RumConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">(</span><span class="n">applicationId</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">              <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">          <span class="nc">Rum</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">rumConfig</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">          <span class="c1">// Enable Profiling
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>          <span class="k">val</span> <span class="py">profilingConfig</span> <span class="p">=</span> <span class="nc">ProfilingConfiguration</span><span class="p">.</span><span class="n">Builder</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">            <span class="p">.</span><span class="n">setApplicationLaunchSampleRate</span><span class="p">(</span><span class="m">15</span><span class="p">)</span> <span class="c1">// default is 15%
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>            <span class="p">.</span><span class="n">build</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">          <span class="nc">Profiling</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span><span class="n">profilingConfig</span><span class="p">)</span>
</span></span><span class="line"><span class="cl">      <span class="p">}</span>
</span></span><span class="line"><span class="cl">  <span class="p">}</span>
</span></span></code></pre>
            </div>
          </div>
        </div>
        <div class="alert alert-warning">
          <p>
            The total volume of profiles may not match the percentage configured
            in <code>applicationLaunchSampleRate</code>. This variation results
            from
            <a
              href="https://developer.android.com/topic/performance/tracing/profiling-manager/will-my-profile-always-be-collected#how-rate-limiting-works"
              >rate limitations</a
            >
            within the data collector, including profiling support on older
            devices and the maximum profiling frequency per device.
          </p>
        </div>
      </li>
    </ol>
    <p>
      The
      <a
        href="https://developer.android.com/topic/performance/tracing/profiling-manager/debug-mode"
        >ProfilingManager API</a
      >
      also supports disabling rate limiting during debug builds.
    </p>
    <h2 id="explore-profiling-data">Explore profiling data</h2>
    <h3 id="during-the-time-to-initial-display">
      During the time to initial display
    </h3>
    <p>
      Android application launch profiling data is attached to the
      <a
        href="/real_user_monitoring/application_monitoring/android/application_launch_monitoring?tab=kotlin"
        >time to initial display</a
      >
      vital event in a RUM session. You can access the time to initial display
      from the session side panel, view side panel, or directly from the time to
      initial display vital side panel.
    </p>
    <a
      href="http://localhost:1313/images/real_user_monitoring/android/android-profiling-session.e48d508d104271ec303e5840408a7bee.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture style="width: 90%"
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/android/android-profiling-session.e48d508d104271ec303e5840408a7bee.png?auto=format
              "
              class="img-fluid"
              style="width: 90%"
              alt="Android profiling data in RUM session."
          /></picture>
        </figure></div
    ></a>
    <p>
      Use the <strong>flame graph</strong> to identify which methods consume the
      most CPU time during launch, the <strong>thread timeline</strong> to see
      parallel execution patterns, and the <strong>call graph</strong> to trace
      method dependencies. You can also download the profiling data for external
      analysis or deeper investigation.
    </p>
    <a
      href="http://localhost:1313/images/real_user_monitoring/android/android-profiling-thread-timeline.8968aa60db0150e82a44291125c771e7.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture style="width: 90%"
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/android/android-profiling-thread-timeline.8968aa60db0150e82a44291125c771e7.png?auto=format
              "
              class="img-fluid"
              style="width: 90%"
              alt="Android profiling data for the time to initial display in a thread timeline."
          /></picture>
        </figure></div
    ></a>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="SDK is iOS"
    data-if="219"
  >
    <div class="card callout-card mb-4">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-black mt-0 mb-1">Join the Preview!</h5>
        <p class="card-text">
          <span
            ><p>
              iOS Profiling is in Preview. To request access, fill out this
              form.
            </p></span
          >
        </p>
        <a
          target="_blank"
          class="btn btn-outline-primary pb-1 align-self-end d-flex flex-column justify-content-center"
          >Request Access</a
        >
      </div>
    </div>
    <a
      href="http://localhost:1313/images/real_user_monitoring/ios/ios-profiling-ttid.e923ca487faca19586289c468f07e6ee.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture style="width: 90%"
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/ios/ios-profiling-ttid.e923ca487faca19586289c468f07e6ee.png?auto=format
              "
              class="img-fluid"
              style="width: 90%"
              alt="iOS profiling data in a time to initial display vital event."
          /></picture>
        </figure></div
    ></a>
    <p>
      iOS profiling captures detailed data about your application's performance
      during launch, helping you identify slow functions and optimize startup
      time. iOS profiling is built on top of the
      <a
        href="/real_user_monitoring/guide/browser-sdk-upgrade/#collect-long-animation-frames-as-long-tasks"
        >mach Kernel API</a
      >
      and periodically samples all application threads to collect call stacks.
    </p>
    <h2 id="prerequisites">Prerequisites</h2>
    <ul>
      <li>Your iOS application must use the Datadog iOS SDK version 3.6.0+.</li>
      <li>
        <a href="/real_user_monitoring/application_monitoring/browser/setup/"
          >RUM without Limits</a
        >
        must be enabled in your organization.
      </li>
    </ul>
    <h2 id="setup">Setup</h2>
    <h3 id="step-1--set-up-rum">Step 1 - Set up RUM</h3>
    <p>
      To start collecting data, set up
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/JS_Self-Profiling_API"
        >Mobile RUM for iOS</a
      >.
    </p>
    <h3 id="step-2--configure-the-profiling-sampling-rate">
      Step 2 - Configure the profiling sampling rate
    </h3>
    <p>
      Initialize the RUM SDK and configure the
      <code>applicationLaunchSampleRate</code>, which determines the percentage
      of application launches that are profiled (for example, 5% means profiling
      runs on 5 out of 100 launches).
    </p>
    <div class="alert alert-danger">
      <p>
        If no value is specified, the default
        <code>applicationLaunchSampleRate</code> is 5 percent.
      </p>
    </div>
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
          ><code><span class="line"><span class="cl">    <span class="kd">import</span> <span class="nc">DatadogCore</span>
</span></span><span class="line"><span class="cl">    <span class="kd">import</span> <span class="nc">DatadogRUM</span>
</span></span><span class="line"><span class="cl">    <span class="kd">import</span> <span class="nc">DatadogProfiling</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1">// Initialize Datadog SDK with your configuration</span>
</span></span><span class="line"><span class="cl">    <span class="n">Datadog</span><span class="p">.</span><span class="n">initialize</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">      <span class="n">with</span><span class="p">:</span> <span class="n">Datadog</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="n">clientToken</span><span class="p">:</span> <span class="s">&#34;&lt;client token&gt;&#34;</span><span class="p">,</span>  <span class="c1">// From Datadog UI</span>
</span></span><span class="line"><span class="cl">        <span class="n">env</span><span class="p">:</span> <span class="s">&#34;&lt;environment&gt;&#34;</span><span class="p">,</span>           <span class="c1">// for example, &#34;production&#34;, &#34;staging&#34;</span>
</span></span><span class="line"><span class="cl">        <span class="n">service</span><span class="p">:</span> <span class="s">&#34;&lt;service name&gt;&#34;</span>       <span class="c1">// Your app&#39;s service name</span>
</span></span><span class="line"><span class="cl">      <span class="p">),</span>
</span></span><span class="line"><span class="cl">      <span class="n">trackingConsent</span><span class="p">:</span> <span class="n">trackingConsent</span>  <span class="c1">// GDPR compliance setting</span>
</span></span><span class="line"><span class="cl">    <span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable RUM feature</span>
</span></span><span class="line"><span class="cl">    <span class="n">RUM</span><span class="p">.</span><span class="n">enable</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">      <span class="n">with</span><span class="p">:</span> <span class="n">RUM</span><span class="p">.</span><span class="n">Configuration</span><span class="p">(</span>
</span></span><span class="line"><span class="cl">        <span class="n">applicationID</span><span class="p">:</span> <span class="s">&#34;&lt;rum application id&gt;&#34;</span>
</span></span><span class="line"><span class="cl">      <span class="p">)</span>
</span></span><span class="line"><span class="cl">    <span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1">// Enable Profiling feature</span>
</span></span><span class="line"><span class="cl">    <span class="n">Profiling</span><span class="p">.</span><span class="n">enable</span><span class="p">()</span> <span class="c1">// default is 5%</span>
</span></span></code></pre>
        </div>
      </div>
    </div>
    <h2 id="explore-profiling-data">Explore profiling data</h2>
    <h3 id="during-the-time-to-initial-display">
      During the time to initial display
    </h3>
    <p>
      iOS application launch profiling data is attached to the
      <a
        href="https://developer.android.com/topic/performance/tracing/profiling-manager/debug-mode"
        >time to initial display</a
      >
      vital event in a RUM session. You can access the time to initial display
      from the session side panel, view side panel, or directly from the time to
      initial display vital side panel.
    </p>
    <a
      href="http://localhost:1313/images/real_user_monitoring/ios/ios-profiling-session.7f28ff5e724223b62a4b620edd957b88.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture style="width: 90%"
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/ios/ios-profiling-session.7f28ff5e724223b62a4b620edd957b88.png?auto=format
              "
              class="img-fluid"
              style="width: 90%"
              alt="iOS profiling data in a view event to initial display vital event."
          /></picture>
        </figure></div
    ></a>
    <p>
      Use the <strong>flame graph</strong> to identify which functions consume
      the most Wall time during launch, the <strong>thread timeline</strong> to
      see parallel execution patterns, and the <strong>call graph</strong> to
      trace function dependencies. You can also download the profiling data for
      external analysis or deeper investigation.
    </p>
    <a
      href="http://localhost:1313/images/real_user_monitoring/ios/ios-profiling-thread-timeline.6defacce896d471fda276ace3c6a8c9c.png?fit=max&amp;auto=format"
      class="pop"
      data-bs-toggle="modal"
      data-bs-target="#popupImageModal"
      ><div class="shortcode-wrapper shortcode-img expand">
        <figure class="text-center">
          <picture style="width: 90%"
            ><img
              srcset="
                http://localhost:1313/images/real_user_monitoring/ios/ios-profiling-thread-timeline.6defacce896d471fda276ace3c6a8c9c.png?auto=format
              "
              class="img-fluid"
              style="width: 90%"
              alt="iOS profiling data for the time to initial display in a thread timeline."
          /></picture>
        </figure></div
    ></a>
  </div>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"><span class="w-100 d-flex justify-content-between "><span class="text">Real User Monitoring</span><span class="badge badge-white pe-2 border-0">BLOG</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://www.datadoghq.com/blog/modern-frontend-monitoring/"><span class="w-100 d-flex justify-content-between "><span class="text">Start monitoring single-page applications</span><span class="badge badge-white pe-2 border-0">BLOG</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android"><span class="w-100 d-flex justify-content-between "><span class="text">Start monitoring Android applications</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://docs.datadoghq.com/real_user_monitoring/application_monitoring/ios"><span class="w-100 d-flex justify-content-between "><span class="text">Start monitoring iOS applications</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/tracing/"><span class="w-100 d-flex justify-content-between "><span class="text">APM and Distributed Tracing</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"217":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"217"},"218":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"android"},"v":false,"r":"218"},"219":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"ios"},"v":false,"r":"219"}},    filtersManifest: {"filtersByTraitId":{"platform":{"config":{"trait_id":"platform","option_group_id":"rum_sdk_platform_options_v3","label":"SDK"},"defaultValsByOptionGroupId":{"rum_sdk_platform_options_v3":"browser"}}},"defaultValsByTraitId":{"platform":"browser"},"optionGroupsById":{"rum_sdk_platform_options_v3":[{"default":true,"id":"browser","label":"Browser"},{"id":"android","label":"Android"},{"id":"ios","label":"iOS"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>

{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_troubleshoot_section.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_event_waterfall.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_sessions_explorer.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/android/android-profiling-ttid.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/android/android-profiling-session.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/android/android-profiling-thread-timeline.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/ios/ios-profiling-ttid.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/ios/ios-profiling-session.png" style="display:none;" alt="" >}}
{{< img src="real_user_monitoring/ios/ios-profiling-thread-timeline.png" style="display:none;" alt="" >}}

