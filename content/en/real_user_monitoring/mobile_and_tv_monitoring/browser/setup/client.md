---
title: Browser Monitoring Client-Side Instrumentation
aliases:
  - /real_user_monitoring/setup
further_reading:
  - link: /real_user_monitoring/explorer/
    tag: Documentation
    text: Learn about the RUM Explorer
  - link: /logs/log_collection/javascript/
    tag: Documentation
    text: Learn about the Datadog Browser SDK for Logs
---
<div id="cdoc-content" class="customizable"><article>
  <h2 id="overview">Overview</h2>
  <p>
    This page describes how to instrument your applications for both [Real User
    Monitoring (RUM)][1] or [Error Tracking][2] with the iOS SDK. You can follow
    the steps below to instrument your applications for RUM (includes Error
    Tracking), or Error Tracking if you have purchased it as a standalone
    product.
  </p>
  <h2 id="setup">Setup</h2>
  <p>
    To start sending Error Tracking data from your browser application to
    Datadog, follow the [in-app setup instructions][3] or follow the steps
    below.
  </p>
  <h3 id="step-1--create-the-application-in-the-ui">
    Step 1 - Create the application in the UI
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
  <h3 id="step-2--install-the-browser-sdk">Step 2 - Install the Browser SDK</h3>
  <p>Choose the installation method for the Browser SDK.</p>
  <div class="code-tabs">
    <ul class="nav nav-tabs d-flex"></ul>
    <div class="tab-content">
      <div data-lang="npm" class="tab-pane fade" role="tabpanel" title="npm">
        <p>
          Installing through npm (Node Package Manager) is recommended for
          modern web applications. The Browser SDK is packaged with the rest of
          your frontend JavaScript code. It has no impact on page load
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
  <h3 id="step-3--initialize-the-browser-sdk">
    Step 3 - Initialize the Browser SDK
  </h3>
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
    provided at the SDK initialization. To add GDPR compliance for your EU users
    and other
    <a href="https://app.datadoghq.com/error-tracking/settings/setup/client"
      >initialization parameters</a
    >
    to the SDK configuration, see the
    <a href="#set-tracking-consent-gdpr-compliance"
      >Set tracking consent documentation</a
    >.
  </p>
  <h4 id="session-sample-rate">Session sample rate</h4>
  <p>
    To control the data your application sends to Datadog RUM, you can specify a
    sampling rate for RUM sessions while
    <a href="/real_user_monitoring/browser/data_collected/"
      >initializing the RUM Browser SDK</a
    >. The rate is a percentage between 0 and 100. By default,
    <code>sessionSamplingRate</code> is set to 100 (keep all sessions).
  </p>
  <p>For example, to only keep 50% of sessions use:</p>
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
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
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
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
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
  <h4 id="set-tracking-consent--gdpr-compliance">
    Set tracking consent (GDPR compliance)
  </h4>
  <p>
    To be compliant with GDPR, CCPA, and similar regulations, the Browser SDK
    lets you provide the tracking consent value at initialization. For more
    information on tracking consent, see [Data Security][18].
  </p>
  <p>
    The <code>trackingConsent</code> initialization parameter can be one of the
    following values:
  </p>
  <ol>
    <li>
      <code>&quot;granted&quot;</code>: The RUM Browser SDK starts collecting
      data and sends it to Datadog.
    </li>
    <li>
      <code>&quot;not-granted&quot;</code>: The RUM Browser SDK does not collect
      any data.
    </li>
  </ol>
  <p>
    To change the tracking consent value after the RUM Browser SDK is
    initialized, use the <code>setTrackingConsent()</code> API call. The RUM
    Browser SDK changes its behavior according to the new value:
  </p>
  <ul>
    <li>
      when changed from <code>&quot;granted&quot;</code> to
      <code>&quot;not-granted&quot;</code>, the RUM session is stopped, data is
      no longer sent to Datadog.
    </li>
    <li>
      when changed from <code>&quot;not-granted&quot;</code> to
      <code>&quot;granted&quot;</code>, a new RUM session is created if no
      previous session is active, and data collection resumes.
    </li>
  </ul>
  <p>
    This state is not synchronized between tabs nor persisted between
    navigation. It is your responsibility to provide the user decision during
    RUM Browser SDK initialization or by using
    <code>setTrackingConsent()</code>.
  </p>
  <p>
    When <code>setTrackingConsent()</code> is used before <code>init()</code>,
    the provided value takes precedence over the initialization parameter.
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
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
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
          <div class="code-filename-wrapper d-flex justify-content-end"></div>
          <div class="code-snippet">
            <div class="code-button-wrapper position-absolute">
              <button class="btn text-primary js-copy-button">Copy</button>
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
  <h3
    id="step-4--add-readable-stack-traces-to-errors--optional-but-recommended"
  >
    Step 4 - Add Readable Stack Traces to Errors (optional but recommended)
  </h3>
  <p>
    Upload your JavaScript source maps to access unminified stack traces. See
    the
    <a href="/real_user_monitoring/guide/upload-javascript-source-maps"
      >source map upload guide</a
    >.
  </p>
  <h3 id="step-5--visualize-your-data">Step 5 - Visualize your data</h3>
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
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/explorer/"><span class="w-100 d-flex justify-content-between "><span class="text">Learn about the RUM Explorer</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/logs/log_collection/javascript/"><span class="w-100 d-flex justify-content-between "><span class="text">Learn about the Datadog Browser SDK for Logs</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {},    filtersManifest: {"filtersByTraitId":{},"defaultValsByTraitId":{},"optionGroupsById":{}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>