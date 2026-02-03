---
title: Kotlin Multiplatform Monitoring Setup
description: Collect RUM and Error Tracking data from your Kotlin Multiplatform projects.
aliases:
  - /real_user_monitoring/kotlin-multiplatform/
  - /real_user_monitoring/kotlin_multiplatform/
  - /real_user_monitoring/kotlin-multiplatform/setup
  - /real_user_monitoring/kotlin_multiplatform/setup
  - /real_user_monitoring/mobile_and_tv_monitoring/setup/kotlin-multiplatform
  - /real_user_monitoring/mobile_and_tv_monitoring/setup/kotlin_multiplatform
  - /real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform/setup
further_reading:
  - link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
    tag: Source Code
    text: Source code for dd-sdk-kotlin-multiplatform
  - link: real_user_monitoring/explorer/
    tag: Documentation
    text: Learn how to explore your RUM data
---
<div id="cdoc-content" class=""><article>
  <p>
    This page describes how to instrument your applications for
    <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> with the
    Kotlin Multiplatform SDK. RUM includes Error Tracking by default, but if you
    have purchased Error Tracking as a standalone product, see the
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
      Otherwise, due to the compatibility with <code>PLCrashReporter</code>, the
      application may hang if crash tracking is enabled.
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
    <strong>Note</strong>: Versions of these dependencies should be aligned with
    the version used by the Datadog Kotlin Multiplatform SDK itself. You can
    find the complete mapping of iOS SDK versions for each Kotlin Multiplatform
    SDK release in the
    <a
      href="https://github.com/DataDog/dd-sdk-kotlin-multiplatform/blob/develop/NATIVE_SDK_VERSIONS.md"
      >version compatibility guide</a
    >. If you are using Kotlin Multiplatform SDK version 1.3.0 or below, add
    <code>DatadogObjc</code> dependency instead of <code>DatadogCore</code> and
    <code>DatadogRUM</code>.
  </p>
  <h4 id="adding-native-ios-dependencies-using-the-cocoapods-plugin">
    Adding native iOS dependencies using the CocoaPods plugin
  </h4>
  <p>
    If you are using Kotlin Multiplatform library as a CocoaPods dependency for
    your iOS application, you can add dependencies as following:
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
      Select <code>Kotlin Multiplatform</code> as the application type and enter
      an application name to generate a unique Datadog application ID and client
      token.
    </li>
    <li>
      To disable automatic user data collection for either client IP or
      geolocation data, uncheck the boxes for those settings. For more
      information, see [RUM Kotlin Multiplatform Data Collected][5].
    </li>
  </ol>
  <div class="alert alert-info">
    <p>
      If you've purchased Error Tracking as a standalone product (without RUM),
      navigate to [<strong>Error Tracking</strong> &gt;
      <strong>Settings</strong> &gt; <strong>Browser and Mobile</strong> &gt;
      <strong>Add an Application</strong>][6] instead.
    </p>
  </div>
  <p>
    To ensure the safety of your data, you must use a client token. If you use
    only
    <a href="/account_management/api-app-keys/#api-keys">Datadog API keys</a> to
    configure the Datadog SDK, they are exposed client-side in the Android
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
</span></span><span class="line"><span class="cl">    <span class="p">)</span><span class="n">eec412a2</span><span class="p">-</span><span class="n">b6e0</span><span class="p">-</span><span class="m">45</span><span class="n">c2</span><span class="p">-</span><span class="n">b395</span><span class="p">-</span><span class="m">329</span><span class="n">b3b163b4b</span>
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
    To control the data your application sends to Datadog RUM, you can specify a
    sample rate for RUM sessions while
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
    displays any issues in your application and the latest available errors. You
    can view error details and attributes including JSON in the
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
    is lost. To ensure the SDK does not use too much disk space, the data on the
    disk is automatically discarded if it gets too old.
  </p>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://github.com/DataDog/dd-sdk-kotlin-multiplatform"><span class="w-100 d-flex justify-content-between "><span class="text">Source code for dd-sdk-kotlin-multiplatform</span><span class="badge badge-white pe-2 border-0">SOURCE CODE</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/explorer/"><span class="w-100 d-flex justify-content-between "><span class="text">Learn how to explore your RUM data</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>