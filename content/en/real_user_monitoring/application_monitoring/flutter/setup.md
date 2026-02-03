---
title: Flutter Monitoring Setup
description: Collect RUM and Error Tracking data from your Flutter projects.
aliases:
  - /real_user_monitoring/flutter/
  - /real_user_monitoring/flutter/setup
  - /real_user_monitoring/mobile_and_tv_monitoring/setup/flutter
  - /real_user_monitoring/mobile_and_tv_monitoring/flutter/setup
further_reading:
  - link: >-
      /real_user_monitoring/application_monitoring/flutter/advanced_configuration
    tag: Documentation
    text: RUM Flutter Advanced Configuration
  - link: https://github.com/DataDog/dd-sdk-flutter
    tag: Source Code
    text: Source code for dd-sdk-flutter
  - link: real_user_monitoring/explorer/
    tag: Documentation
    text: Learn how to explore your RUM data
  - link: >-
      https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
    tag: Blog
    text: Monitor Flutter application performance with Datadog Mobile RUM
---
<div id="cdoc-content" class=""><article>
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
    To secure your data, you must use a client token. For more information about
    setting up a client token, see the
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
      Datadog supports Flutter Monitoring for iOS, Android, and Web for Flutter
      3.27+.
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
    <code>ios/Podfile</code>, must have <code>use_frameworks!</code> set to true
    (which is the default in Flutter) and must set its target iOS version &gt;=
    12.0.
  </p>
  <p>
    This constraint is usually commented out on the top line of the Podfile, and
    should read:
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
    your <code>compileSdkVersion</code> must be &gt;= 35. Clients using Flutter
    after 3.27 usually have these variables set to Flutter constants (<code
      >flutter.minSdkVersion</code
    >
    and <code>flutter.compileSdkVersion</code>), and they do not have to be
    manually changed.
  </p>
  <p>
    If you are using Kotlin, it should be a version &gt;= 2.1.0. Flutter
    versions above 3.27 emit a warning stating that older versions of Kotlin are
    not supported, and provide instructions for updating.
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
      RUM) with the following snippet. If you do not pass a configuration for a
      given feature, that feature is disabled.
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
    To secure data, you must use a client token. You cannot use Datadog API keys
    to configure the Datadog
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
      <a href="/real_user_monitoring/error_tracking/flutter">Error Tracking</a>.
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
      <a href="/real_user_monitoring/error_tracking/flutter">Error Tracking</a>.
      <code>DatadogSdk.runApp</code> calls
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
    To control the data your application sends to Datadog RUM, you can specify a
    sampling rate for RUM sessions while initializing the Flutter RUM SDK. The
    rate is a percentage between 0 and 100. By default,
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
      collecting and batching the data but does not send it to Datadog. It waits
      for the new tracking consent value to decide what to do with the batched
      data.
    </li>
    <li>
      <code>TrackingConsent.granted</code>: The Datadog Flutter SDK starts
      collecting the data and sends it to Datadog.
    </li>
    <li>
      <code>TrackingConsent.notGranted</code>: The Datadog Flutter SDK does not
      collect any data, which means no logs, traces, or events are sent to
      Datadog.
    </li>
  </ul>
  <p>
    To change the tracking consent value after the SDK is initialized, use the
    <code>DatadogSdk.setTrackingConsent</code> API call.
  </p>
  <p>
    The SDK changes its behavior according to the new value. For example, if the
    current tracking consent is <code>TrackingConsent.pending</code>:
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
    <code>DatadogNavigationObserverProvider</code> widget to start and stop your
    RUM views automatically. With <code>DatadogRouteAwareMixin</code>, move any
    logic from <code>initState</code> to <code>didPush</code>.
  </p>
  <h3 id="flutter-navigator-v2">Flutter Navigator v2</h3>
  <p>
    If you are using Flutter Navigator v2.0, which uses the
    <code>MaterialApp.router</code> named constructor, the setup varies based on
    the routing middleware you are using, if any. Since
    <a href="https://pub.dev/packages?q=go_router"><code>go_router</code></a>
    uses the same observer interface as Flutter Navigator v1,
    <code>DatadogNavigationObserver</code> can be added to other observers as a
    parameter to <code>GoRouter</code>.
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
    >, which uses the provided description when reporting user actions detected
    in the child tree, without changing the Semantics of the tree.
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
    sent as soon as the network is available, and the battery is high enough to
    ensure the Flutter SDK does not impact the end user's experience. If the
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
    gets too old to ensure the Flutter SDK does not use too much disk space.
  </p>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/application_monitoring/flutter/advanced_configuration"><span class="w-100 d-flex justify-content-between "><span class="text">RUM Flutter Advanced Configuration</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://github.com/DataDog/dd-sdk-flutter"><span class="w-100 d-flex justify-content-between "><span class="text">Source code for dd-sdk-flutter</span><span class="badge badge-white pe-2 border-0">SOURCE CODE</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/explorer/"><span class="w-100 d-flex justify-content-between "><span class="text">Learn how to explore your RUM data</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/"><span class="w-100 d-flex justify-content-between "><span class="text">Monitor Flutter application performance with Datadog Mobile RUM</span><span class="badge badge-white pe-2 border-0">BLOG</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>