---
title: React Native Monitoring Setup
description: Collect RUM and Error Tracking data from your React Native projects.
aliases:
  - /real_user_monitoring/react-native/
  - /real_user_monitoring/reactnative/
  - /real_user_monitoring/mobile_and_tv_monitoring/setup/reactnative
  - /real_user_monitoring/mobile_and_tv_monitoring/react_native/setup
  - >-
    /real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/reactnative/
  - /real_user_monitoring/application_monitoring/react_native/setup/
  - /real_user_monitoring/application_monitoring/react_native/setup/expo/
  - /real_user_monitoring/reactnative/expo/
  - /real_user_monitoring/reactnative-expo/
  - /real_user_monitoring/mobile_and_tv_monitoring/setup/expo
  - /real_user_monitoring/mobile_and_tv_monitoring/expo/setup
further_reading:
  - link: >-
      /real_user_monitoring/application_monitoring/react_native/advanced_configuration
    tag: Documentation
    text: RUM React Native Advanced Configuration
  - link: https://github.com/DataDog/dd-sdk-reactnative
    tag: Source Code
    text: Source code for dd-sdk-reactnative
  - link: https://www.datadoghq.com/blog/react-native-monitoring/
    tag: Blog
    text: Monitor React Native applications
  - link: real_user_monitoring/guide/monitor-hybrid-react-native-applications
    tag: Documentation
    text: Monitor hybrid React Native applications
  - link: real_user_monitoring/explorer/
    tag: Documentation
    text: Learn how to explore your RUM data
---
<div id="cdoc-selector"><div id="cdoc-filters-menu"><div class="filter-selector-menu" id="cdoc-filters-pill-menu"><div class="cdoc-pills-container"><p 
    id="cdoc-platform-pills-label" 
    class="cdoc-filter-label"
  >Setup Method</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="platform" 
      data-option-id="react_native"
      aria-selected="true"
      tabIndex="0"
    >React Native</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="expo"
      aria-selected="false"
      tabIndex="0"
    >Expo</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
    id="cdoc-platform-dropdown-label" 
    class="cdoc-filter-label"
  >Setup Method</p><div 
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
      >React Native</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-platform-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="platform" 
      data-option-id="react_native"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >React Native</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="expo"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Expo</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article>
  <p>
    This page describes how to instrument your applications for
    <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> with the
    React Native SDK. RUM includes Error Tracking by default, but if you have
    purchased Error Tracking as a standalone product, see the
    <a href="/error_tracking/">Error Tracking setup guide</a> for specific
    steps.
  </p>
  <p>
    The minimum supported version for the React Native SDK is React Native
    v0.65+. Compatibility with older versions is not guaranteed out-of-the-box.
  </p>
  <h2 id="setup">Setup</h2>
  <div
    class="cdoc__toggleable"
    data-description="Setup Method is React Native"
    data-if="3373"
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
    <h3 id="install-dependencies-for-ios">Install dependencies for iOS</h3>
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
      If you use a React Native version strictly over 0.67, make sure to use
      Java version 17. If you use React Native version equal or below 0.67, make
      sure to use Java version 11.
    </p>
    <p>
      In your <code>android/build.gradle</code> file, specify the
      <code>kotlinVersion</code> to avoid clashes among kotlin dependencies:
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
      The minimum supported Android SDK version is API level 23. Make sure to
      set <code>minSdkVersion</code> to 23 (or higher) in your Android
      configuration.
    </p>
    <p>
      The Datadog React Native SDK requires you to have
      <code>compileSdkVersion = 31</code> or higher in the Android application
      setup, which implies that you should use Build Tools version 31 or higher,
      Android Gradle Plugin version 7, and Gradle version 7 or higher. To modify
      the versions, change the values in the <code>buildscript.ext</code> block
      of your application's top-level <code>build.gradle</code> file. Datadog
      recommends using a React Native version that's actively supported.
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
        Provide an application name to generate a unique Datadog application ID
        and client token.
      </li>
      <li>
        To disable automatic user data collection for client IP or geolocation
        data, uncheck the boxes for those settings.
      </li>
    </ol>
    <div class="alert alert-info">
      <p>
        If you've purchased Error Tracking as a standalone product (without
        RUM), navigate to
        <a
          href="https://app.datadoghq.com/error-tracking/settings/setup/client/"
          ><strong>Error Tracking</strong> &gt; <strong>Settings</strong> &gt;
          <strong>Browser and Mobile</strong> &gt;
          <strong>Add an Application</strong></a
        >
        instead.
      </p>
    </div>
    <p>
      For data security, you must use a client token. If you used only
      <a href="/account_management/api-app-keys/#api-keys">Datadog API keys</a>
      to configure the <code>@datadog/mobile-react-native</code> library, they
      would be exposed client-side in the React Native application's code.
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
      To control the data your application sends to Datadog RUM, you can specify
      a sampling rate for RUM sessions while
      <a
        href="/real_user_monitoring/application_monitoring/react_native/setup/reactnative/#initialize-the-library-with-application-context"
        >initializing the RUM React Native SDK</a
      >
      as a percentage between 0 and 100. You can specify the rate with the
      <code>config.sessionSamplingRate</code> parameter.
    </p>
    <h4 id="set-tracking-consent--gdpr-compliance">
      Set tracking consent (GDPR compliance)
    </h4>
    <p>
      To be compliant with the GDPR regulation, the React Native SDK requires
      the tracking consent value at initialization.
    </p>
    <p>
      The <code>trackingConsent</code> setting can be one of the following
      values:
    </p>
    <ol>
      <li>
        <code>.PENDING</code>: The React Native SDK starts collecting and
        batching the data but does not send it to Datadog. The React Native SDK
        waits for the new tracking consent value to decide what to do with the
        batched data.
      </li>
      <li>
        <code>.GRANTED</code>: The React Native SDK starts collecting the data
        and sends it to Datadog.
      </li>
      <li>
        <code>.NOTGRANTED</code>: The React Native SDK does not collect any
        data. No logs, traces, or RUM events are sent to Datadog.
      </li>
    </ol>
    <p>
      To change the tracking consent value after the React Native SDK is
      initialized, use the <code>Datadog.set(trackingConsent:)</code> API call.
      The React Native SDK changes its behavior according to the new value.
    </p>
    <p>
      For example, if the current tracking consent is <code>.PENDING</code>:
    </p>
    <ul>
      <li>
        If you change the value to <code>.GRANTED</code>, the React Native SDK
        sends all current and future data to Datadog;
      </li>
      <li>
        If you change the value to <code>.NOTGRANTED</code>, the React Native
        SDK wipes all current data and does not collect future data.
      </li>
    </ul>
    <h3 id="user-interactions-tracking">User interactions tracking</h3>
    <p>
      The preferred way to set up interaction tracking is by using the Datadog
      React Native Babel Plugin
      (<code>@datadog/mobile-react-native-babel-plugin</code>). This plugin
      automatically enriches React components with contextual metadata,
      improving interaction tracking accuracy and enabling a range of
      configuration options.
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
      After the plugin is installed and configured, it automatically tracks
      interactions on standard React Native components. No additional code
      changes are required for basic usage.
    </p>
    <h3 id="codepush-integration--optional">CodePush integration (optional)</h3>
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
    class="cdoc__toggleable cdoc__hidden"
    data-description="Setup Method is Expo"
    data-if="3374"
  >
    <h3 id="step-1--install-the-sdk">Step 1 - Install the SDK</h3>
    <p>
      The RUM React Native SDK supports Expo and Expo Go. To use it, install
      <code>expo-datadog</code> and <code>@datadog/mobile-react-native</code>.
    </p>
    <p>
      <code>expo-datadog</code> supports Expo starting from SDK 45 and the
      plugin's versions follow Expo versions. For example, if you use Expo SDK
      45, use <code>expo-datadog</code> version <code>45.x.x</code>. Datadog
      recommends using <strong>Expo SDK 45</strong> as a minimum version;
      previous versions may require manual steps.
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
        Provide an application name to generate a unique Datadog application ID
        and client token.
      </li>
      <li>
        To disable automatic user data collection for client IP or geolocation
        data, uncheck the boxes for those settings.
      </li>
    </ol>
    <div class="alert alert-info">
      <p>
        If you've purchased Error Tracking as a standalone product (without
        RUM), navigate to
        <a
          href="https://app.datadoghq.com/error-tracking/settings/setup/client/"
          ><strong>Error Tracking</strong> &gt; <strong>Settings</strong> &gt;
          <strong>Browser and Mobile</strong> &gt;
          <strong>Add an Application</strong></a
        >
        instead.
      </p>
    </div>
    <p>
      For data security, you must use a client token. For more information about
      setting up a client token, see the
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
      To control the data your application sends to Datadog RUM, you can specify
      a sampling rate for RUM sessions. To set this rate, use the
      <code>config.sessionSamplingRate</code> parameter and specify a percentage
      between 0 and 100.
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
      This plugin takes care of uploading the dSYMs, source maps and Proguard
      mapping files on every EAS build.
    </p>
    <p>
      Add <code>@datadog/datadog-ci</code> as a development dependency. This
      package contains scripts to upload the source maps. You can install it
      with npm:
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
      Run <code>eas secret:create</code> to set <code>DATADOG_API_KEY</code> to
      your Datadog API key, and <code>DATADOG_SITE</code> to the host of your
      Datadog site (for example, <code>datadoghq.com</code>).
    </p>
    <h3 id="user-interactions-tracking">User interactions tracking</h3>
    <p>
      Datadog recommends set up interaction tracking by using the Datadog React
      Native Babel Plugin
      (<code>@datadog/mobile-react-native-babel-plugin</code>). This plugin
      automatically enriches React components with contextual metadata,
      improving interaction tracking accuracy and enabling a range of
      configuration options.
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
      After the plugin is installed and configured, it automatically tracks
      interactions on standard React Native components. No additional code
      changes are required for basic usage.
    </p>
    <h3 id="codepush-integration--optional">CodePush integration (optional)</h3>
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
  <h2 id="sending-data-when-device-is-offline">
    Sending data when device is offline
  </h2>
  <p>
    The React Native SDK helps make data available when your user device is
    offline. In cases of low-network areas, or when the device battery is too
    low, all events are first stored on the local device in batches. They are
    sent as soon as the network is available, and the battery is high enough so
    the React Native SDK does not impact the end user's experience. If the
    network is not available with your application running in the foreground, or
    if an upload of data fails, the batch is kept until it can be sent
    successfully.
  </p>
  <p>
    This means that even if users open your application while offline, no data
    is lost.
  </p>
  <p>
    <strong>Note</strong>: The data on the disk is automatically deleted if it
    gets too old so the React Native SDK does not use too much disk space.
  </p>
  <h2 id="track-background-events">Track background events</h2>
  <div class="alert alert-info">
    <p>
      Tracking background events may lead to additional sessions, which can
      impact billing. For questions,
      <a href="https://docs.datadoghq.com/help/">contact Datadog support</a>.
    </p>
  </div>
  <p>
    You can track events such as crashes and network requests when your
    application is in the background (for example, when no active view is
    available).
  </p>
  <p>
    Add the following snippet during initialization in your Datadog
    configuration:
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
        ><code><span class="line"><span class="cl"><span class="nx">rumConfiguration</span><span class="p">.</span><span class="nx">trackBackgroundEvents</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span>
</span></span></code></pre>
      </div>
    </div>
  </div>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/application_monitoring/react_native/advanced_configuration"><span class="w-100 d-flex justify-content-between "><span class="text">RUM React Native Advanced Configuration</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://github.com/DataDog/dd-sdk-reactnative"><span class="w-100 d-flex justify-content-between "><span class="text">Source code for dd-sdk-reactnative</span><span class="badge badge-white pe-2 border-0">SOURCE CODE</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://www.datadoghq.com/blog/react-native-monitoring/"><span class="w-100 d-flex justify-content-between "><span class="text">Monitor React Native applications</span><span class="badge badge-white pe-2 border-0">BLOG</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/guide/monitor-hybrid-react-native-applications"><span class="w-100 d-flex justify-content-between "><span class="text">Monitor hybrid React Native applications</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/explorer/"><span class="w-100 d-flex justify-content-between "><span class="text">Learn how to explore your RUM data</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"3373":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"react_native"},"1":"react_native"},"v":true,"r":"3373"},"3374":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"react_native"},"1":"expo"},"v":false,"r":"3374"}},    filtersManifest: {"filtersByTraitId":{"platform":{"config":{"trait_id":"platform","option_group_id":"rum_react_native_framework_options","label":"Setup Method"},"defaultValsByOptionGroupId":{"rum_react_native_framework_options":"react_native"}}},"defaultValsByTraitId":{"platform":"react_native"},"optionGroupsById":{"rum_react_native_framework_options":[{"default":true,"id":"react_native","label":"React Native"},{"id":"expo","label":"Expo"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>