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
  <h2 id="overview">Overview</h2>
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
    The Datadog Android SDK supports Android 6.0+ (API level 23) and Android TV.
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
      >: Use AI coding agents (Cursor, Claude Code) to automatically instrument
      your application with one prompt. The agent detects your project structure
      and configures the RUM SDK for you.
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
    <code>APP_VARIANT_NAME</code> specifies the variant of the application that
    generates data. For more information, see
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
      <div data-lang="java" class="tab-pane fade" role="tabpanel" title="Java">
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
      <div data-lang="java" class="tab-pane fade" role="tabpanel" title="Java">
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
      <div data-lang="java" class="tab-pane fade" role="tabpanel" title="Java">
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
      <div data-lang="java" class="tab-pane fade" role="tabpanel" title="Java">
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
      <div data-lang="java" class="tab-pane fade" role="tabpanel" title="Java">
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
      <div data-lang="java" class="tab-pane fade" role="tabpanel" title="Java">
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
      <div data-lang="java" class="tab-pane fade" role="tabpanel" title="Java">
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
  <p>
    The initialization credentials require your application's variant name and
    use the value of <code>BuildConfig.FLAVOR</code>. With the variant, the SDK
    can match the errors reported from your application to the mapping files
    uploaded by the Gradle plugin. If you do not have variants, the credentials
    use an empty string.
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
      <code>TrackingConsent.PENDING</code>: (Default) The SDK starts collecting
      and batching the data but does not send it to the collection endpoint. The
      SDK waits for the new tracking consent value to decide what to do with the
      batched data.
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
      <div data-lang="java" class="tab-pane fade" role="tabpanel" title="Java">
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
      <div data-lang="java" class="tab-pane fade" role="tabpanel" title="Java">
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
          information (URL, method, status code, and error) automatically filled
          in. Only the network requests that started when a view is active are
          tracked. To track requests when your application is in the background,
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
      <div data-lang="java" class="tab-pane fade" role="tabpanel" title="Java">
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
      <div data-lang="java" class="tab-pane fade" role="tabpanel" title="Java">
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
    application is in the background (for example, no active view is available).
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
      <div data-lang="java" class="tab-pane fade" role="tabpanel" title="Java">
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
    Each batch follows the intake specification. Batches are sent as soon as the
    network is available, and the battery is high enough to ensure the Datadog
    SDK does not impact the end user's experience. If the network is not
    available while your application is in the foreground, or if an upload of
    data fails, the batch is kept until it can be sent successfully.
  </p>
  <p>
    This means that even if users open your application while offline, no data
    is lost. To ensure the SDK does not use too much disk space, the data on the
    disk is automatically discarded if it gets too old.
  </p>
  <h2 id="kotlin-extensions">Kotlin extensions</h2>
  <h3><code>Closeable</code> extension</h3>
  <p>
    You can monitor <code>Closeable</code> instance usage with the
    <code>useMonitored</code> method, which reports errors to Datadog and closes
    the resource afterwards.
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
  <h3 id="track-local-assets-as-resources">Track local assets as resources</h3>
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
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/application_monitoring/android/advanced_configuration"><span class="w-100 d-flex justify-content-between "><span class="text">RUM Android Advanced Configuration</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://github.com/DataDog/dd-sdk-android"><span class="w-100 d-flex justify-content-between "><span class="text">Source code for dd-sdk-android</span><span class="badge badge-white pe-2 border-0">SOURCE CODE</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring"><span class="w-100 d-flex justify-content-between "><span class="text">Explore Datadog RUM</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/guide/mobile-sdk-upgrade"><span class="w-100 d-flex justify-content-between "><span class="text">Upgrade RUM Mobile SDKs</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {},    filtersManifest: {"filtersByTraitId":{"sdk":{"config":{"trait_id":"sdk","option_group_id":"sdk_platform_options","label":"SDK"},"defaultValsByOptionGroupId":{"sdk_platform_options":"browser"}}},"defaultValsByTraitId":{"sdk":"browser"},"optionGroupsById":{"sdk_platform_options":[{"default":true,"id":"browser","label":"Browser"},{"id":"android","label":"Android"},{"id":"ios","label":"iOS"},{"id":"flutter","label":"Flutter"},{"id":"react_native","label":"React Native"},{"id":"kotlin_multiplatform","label":"Kotlin Multiplatform"},{"id":"roku","label":"Roku"},{"id":"unity","label":"Unity"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>

{{< img src="real_user_monitoring/android/android-new-application.png" style="display:none;" alt="" >}}

