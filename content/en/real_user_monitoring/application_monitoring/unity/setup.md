---
title: Unity Monitoring Setup
description: Collect RUM data from your Unity Mobile projects.
aliases:
  - /real_user_monitoring/unity/
  - /real_user_monitoring/unity/setup
  - /real_user_monitoring/mobile_and_tv_monitoring/setup/unity
  - /real_user_monitoring/mobile_and_tv_monitoring/unity/setup
further_reading:
  - link: https://github.com/DataDog/dd-sdk-unity
    tag: Source Code
    text: Source code for dd-sdk-unity
  - link: https://github.com/DataDog/unity-package
    tag: Source Code
    text: Package URL for Unity SDK
  - link: real_user_monitoring/explorer/
    tag: Documentation
    text: Learn how to explore your RUM data
---
<div id="cdoc-content" class=""><article>
  <p>
    This page describes how to instrument your applications for
    <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> with the
    Unity SDK. RUM includes Error Tracking by default, but if you have purchased
    Error Tracking as a standalone product, see the
    <a href="/error_tracking/frontend/mobile/unity/"
      >Error Tracking setup guide</a
    >
    for specific steps.
  </p>
  <div class="alert alert-info">
    <p>
      Datadog supports Unity Monitoring for iOS and Android for Unity LTS 2022+.
    </p>
  </div>
  <p>
    Datadog does not support Desktop (Windows, Mac, or Linux) or console
    deployments from Unity. If you have a game or application and want to use
    Datadog RUM to monitor its performance, create a ticket with
    <a href="/help/">Datadog support</a>.
  </p>
  <h3 id="step-1--install-the-sdk">Step 1 - Install the SDK</h3>
  <ol>
    <li>
      <p>
        Install the
        <a href="https://github.com/googlesamples/unity-jar-resolver"
          >External Dependency Manager for Unity (EDM4U)</a
        >. This can be done using
        <a
          href="https://openupm.com/packages/com.google.external-dependency-manager/"
          >Open UPM</a
        >.
      </p>
    </li>
    <li>
      <p>
        Add the Datadog SDK Unity package from its Git URL at
        <a href="https://github.com/DataDog/unity-package"
          >https://github.com/DataDog/unity-package</a
        >. The package URL is
        <code>https://github.com/DataDog/unity-package.git</code>.
      </p>
    </li>
    <li>
      <p>
        (Android only) Configure your project to use
        <a href="https://docs.unity3d.com/Manual/gradle-templates.html"
          >Gradle templates</a
        >, and enable both <code>Custom Main Template</code> and
        <code>Custom Gradle Properties Template</code>.
      </p>
    </li>
    <li>
      <p>
        (Android only) If you build and receive
        <code>Duplicate class</code> errors (common in Unity 2022.x), add the
        following code to the <code>dependencies</code> block of your
        <code>mainTemplate.gradle</code>:
      </p>
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
        ><code><span class="line"><span class="cl"><span class="n">constraints</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">     <span class="n">implementation</span><span class="o">(</span><span class="s2">&#34;org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.0&#34;</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">         <span class="n">because</span><span class="o">(</span><span class="s2">&#34;kotlin-stdlib-jdk8 is now a part of kotlin-stdlib&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">     <span class="o">}</span>
</span></span><span class="line"><span class="cl"><span class="o">}</span>
</span></span></code></pre>
      </div>
    </div>
  </div>
  <h4 id="webgl">WebGL</h4>
  <ol>
    <li>
      <p>
        Create a custom WebGL template, following the instructions provided by
        <a
          href="https://docs.unity3d.com/2022.3/Documentation/Manual/webgl-templates.html"
          >Unity</a
        >, or by using the minimally modified version in Datadog's
        <a
          href="https://github.com/DataDog/dd-sdk-unity/tree/develop/samples/Datadog%20Sample/Assets/WebGLTemplates"
          >GitHub repo</a
        >.
      </p>
    </li>
    <li>
      <p>
        If you are using your own WebGL template, or have added a new WebGL
        template, modify it to include the Datadog Browser SDK delivered by CDN.
      </p>
    </li>
  </ol>
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
        ><code><span class="line"><span class="cl"><span class="p">&lt;</span><span class="nt">script</span> <span class="na">type</span><span class="o">=</span><span class="s">&#34;text/javascript&#34;</span> <span class="na">src</span><span class="o">=</span><span class="s">&#34;https://www.datadoghq-browser-agent.com/us1/v6/datadog-logs.js&#34;</span><span class="p">&gt;&lt;/</span><span class="nt">script</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="p">&lt;</span><span class="nt">script</span> <span class="na">type</span><span class="o">=</span><span class="s">&#34;text/javascript&#34;</span> <span class="na">src</span><span class="o">=</span><span class="s">&#34;https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum-slim.js&#34;</span><span class="p">&gt;&lt;/</span><span class="nt">script</span><span class="p">&gt;</span>
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
    <li>Choose <strong>Unity</strong> as the application type.</li>
    <li>
      Provide an application name to generate a unique Datadog application ID
      and client token.
    </li>
    <li>
      To disable automatic user data collection for either client IP or
      geolocation data, uncheck the boxes for those settings.
    </li>
  </ol>
  <p>
    To ensure the safety of your data, you must use a client token. For more
    information about setting up a client token, see the
    <a href="/account_management/api-app-keys/#client-tokens"
      >Client Token documentation</a
    >.
  </p>
  <h3 id="step-3--configure-datadog-settings-in-unity">
    Step 3 - Configure Datadog settings in Unity
  </h3>
  <p>
    After installing the Datadog Unity SDK, you need to set Datadog's settings
    in the Unity UI. Navigate to your <code>Project Settings</code> and click on
    the <code>Datadog</code> section on the left hand side.
  </p>
  <p>The following parameters are available:</p>
  <table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Required?</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Enable Datadog</td>
        <td>No</td>
        <td>
          Whether Datadog should be enabled. Disabling Datadog does not cause
          any of the Datadog APIs to fail, throw exceptions, or return
          <code>null</code> from any calls. It only stops the SDK from sending
          any information.
        </td>
      </tr>
      <tr>
        <td>Output Symbol Files</td>
        <td>No</td>
        <td>
          This option enables the output of symbol files for Datadog
          symbolication and file/line mapping features in Datadog Error
          Tracking.
        </td>
      </tr>
      <tr>
        <td>Perform Native Stack Mapping</td>
        <td>No</td>
        <td>
          Converts C# stacks traces to native stack traces in non-development
          builds. This allows for file and line mapping to C# code if symbol
          files are uploaded to Datadog. This is not supported if Output Symbols
          is disabled.
        </td>
      </tr>
      <tr>
        <td>Client Token</td>
        <td>Yes</td>
        <td>
          Your client token created for your application on Datadog's website.
        </td>
      </tr>
      <tr>
        <td>Env</td>
        <td>No</td>
        <td>
          The name of the environment for your application. Defaults to
          <code>&quot;prod&quot;</code>.
        </td>
      </tr>
      <tr>
        <td>Service Name</td>
        <td>No</td>
        <td>
          The service name for your application. If this is not set, it is
          automatically set to your application's package name or bundle name
          (e.g.: com.example.android).
        </td>
      </tr>
      <tr>
        <td>Datadog Site</td>
        <td>Yes</td>
        <td>The site you send your data to.</td>
      </tr>
      <tr>
        <td>Batch Size</td>
        <td>Yes</td>
        <td>
          Sets the preferred size of batched data uploaded to Datadog. This
          value impacts the size and number of requests performed by the SDK
          (small batches mean more requests, but each request becomes smaller in
          size).
        </td>
      </tr>
      <tr>
        <td>Upload Frequency</td>
        <td>Yes</td>
        <td>Sets the preferred frequency of uploading data to Datadog.</td>
      </tr>
      <tr>
        <td>Batch Processing Level</td>
        <td>Yes</td>
        <td>
          Defines the maximum amount of batches processed sequentially without a
          delay within one reading/uploading cycle.
        </td>
      </tr>
      <tr>
        <td>Enable Crash Reporting</td>
        <td>No</td>
        <td>Enables crash reporting in the RUM SDK.</td>
      </tr>
      <tr>
        <td>Forward Unity Logs</td>
        <td>No</td>
        <td>
          Whether to forward logs made from Unity's <code>Debug.Log</code> calls
          to Datadog's default logger.
        </td>
      </tr>
      <tr>
        <td>Remote Log Threshold</td>
        <td>Yes</td>
        <td>
          The level at which the default logger forwards logs to Datadog. Logs
          below this level are not sent.
        </td>
      </tr>
      <tr>
        <td>Enable RUM</td>
        <td>No</td>
        <td>
          Whether to enable sending data from Datadog's Real User Monitoring
          APIs
        </td>
      </tr>
      <tr>
        <td>Enable Automatic Scene Tracking</td>
        <td>No</td>
        <td>
          Whether Datadog should automatically track new Views by intercepting
          Unity's <code>SceneManager</code> loading.
        </td>
      </tr>
      <tr>
        <td>RUM Application ID</td>
        <td>Yes (if RUM is enabled)</td>
        <td>
          The RUM Application ID created for your application on Datadog's
          website.
        </td>
      </tr>
      <tr>
        <td>Session Sample Rate</td>
        <td>Yes</td>
        <td>
          The percentage of sessions to send to Datadog. Between 0 and 100.
        </td>
      </tr>
      <tr>
        <td>Trace Sample Rate</td>
        <td>Yes</td>
        <td>
          The percentage of distributed traces to send to Datadog. Between 0 and
          100.
        </td>
      </tr>
      <tr>
        <td>Trace Context Injection</td>
        <td>Yes</td>
        <td>
          Whether to inject trace context into <code>All</code> or
          <code>Only Sampled</code> resource requests.
        </td>
      </tr>
      <tr>
        <td>Track Non-Fatal ANRs</td>
        <td>No</td>
        <td>
          (Android Only) Whether to track non-fatal ANRs (Application Not
          Responding) errors. The &quot;SDK Default&quot; option disables ANR
          detection on Android 30+ because it would create too much noise over
          fatal ANRs. On Android 29 and below, however, the reporting of
          non-fatal ANRs is enabled by default, as fatal ANRs cannot be reported
          on those versions.
        </td>
      </tr>
      <tr>
        <td>Track Non-Fatal App Hangs</td>
        <td>No</td>
        <td>
          (iOS Only) Whether to track non-fatal app hangs. App hangs are
          detected when the app is unresponsive for a certain amount of time.
          The supplied &quot;Threshold&quot; is the amount of time in seconds
          that the app must be unresponsive before it is considered a non-fatal
          app hang.
        </td>
      </tr>
      <tr>
        <td>First Party Hosts</td>
        <td>No</td>
        <td>
          To enable distributed tracing, you must specify which hosts are
          considered &quot;first party&quot; and have trace information
          injected.
        </td>
      </tr>
    </tbody>
  </table>
  <h3 id="sample-rum-sessions">Sample RUM sessions</h3>
  <p>
    You can control the data your application sends to Datadog RUM during
    instrumentation of the RUM Unity SDK. Specify the
    <strong>Session Sample Rate</strong> as a percentage between 0 and 100 in
    the Project Settings window in Unity.
  </p>
  <h2 id="using-datadog">Using Datadog</h2>
  <h3 id="setting-tracking-consent">Setting tracking consent</h3>
  <p>
    In order to be compliant with data protection and privacy policies, the
    Datadog Unity SDK requires setting a tracking consent value.
  </p>
  <p>
    The <code>trackingConsent</code> setting can be one of the following values:
  </p>
  <ul>
    <li>
      <code>TrackingConsent.Pending</code>: The Unity SDK starts collecting and
      batching the data but does not send it to Datadog. The Unity SDK waits for
      the new tracking consent value to decide what to do with the batched data.
    </li>
    <li>
      <code>TrackingConsent.Granted</code>: The Unity SDK starts collecting the
      data and sends it to Datadog.
    </li>
    <li>
      <code>TrackingConsent.NotGranted</code>: The Unity SDK does not collect
      any data. No logs are sent to Datadog.
    </li>
  </ul>
  <p>
    Before Datadog sends any data, we need to confirm the user's
    <code>Tracking Consent</code>. This is set to
    <code>TrackingConsent.Pending</code> during initialization, and needs to be
    set to <code>TrackingConsent.Granted</code> before Datadog sends any
    information.
  </p>
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
        ><code><span class="line"><span class="cl"><span class="n">DatadogSdk</span><span class="p">.</span><span class="n">Instance</span><span class="p">.</span><span class="n">SetTrackingConsent</span><span class="p">(</span><span class="n">TrackingConsent</span><span class="p">.</span><span class="n">Granted</span><span class="p">);</span>
</span></span></code></pre>
      </div>
    </div>
  </div>
  <h3 id="logging">Logging</h3>
  <p>
    You can intercept and send logs from Unity's default debug logger by
    enabling the option and threshold in your projects settings.
  </p>
  <p>
    Datadog maps the Unity levels to the following in Datadog's Logging Levels:
  </p>
  <table>
    <thead>
      <tr>
        <th>Unity LogType</th>
        <th>Datadog Log Level</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Log</td>
        <td>Info</td>
      </tr>
      <tr>
        <td>Error</td>
        <td>Error</td>
      </tr>
      <tr>
        <td>Assert</td>
        <td>Critical</td>
      </tr>
      <tr>
        <td>Warning</td>
        <td>Warn</td>
      </tr>
      <tr>
        <td>Exception</td>
        <td>Critical</td>
      </tr>
    </tbody>
  </table>
  <p>
    You can access this default logger to add attributes or tags through the
    <code>DatadogSdk.DefaultLogger</code> property.
  </p>
  <p>
    You can also create additional loggers for more fine grained control of
    thresholds, service names, logger names, or to supply additional attributes.
  </p>
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
        ><code><span class="line"><span class="cl"><span class="kt">var</span> <span class="n">logger</span> <span class="p">=</span> <span class="n">DatadogSdk</span><span class="p">.</span><span class="n">Instance</span><span class="p">.</span><span class="n">CreateLogger</span><span class="p">(</span><span class="k">new</span> <span class="n">DatadogLoggingOptions</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">NetworkInfoEnabled</span> <span class="p">=</span> <span class="k">true</span><span class="p">,</span>
</span></span><span class="line"><span class="cl">    <span class="n">DatadogReportingThreshold</span> <span class="p">=</span> <span class="n">DdLogLevel</span><span class="p">.</span><span class="n">Debug</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span><span class="line"><span class="cl"><span class="n">logger</span><span class="p">.</span><span class="n">Info</span><span class="p">(</span><span class="s">&#34;Hello from Unity!&#34;</span><span class="p">);</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="n">logger</span><span class="p">.</span><span class="n">Debug</span><span class="p">(</span><span class="s">&#34;Hello with attributes&#34;</span><span class="p">,</span> <span class="k">new</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span> <span class="s">&#34;my_attribute&#34;</span><span class="p">,</span> <span class="m">122</span> <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span> <span class="s">&#34;second_attribute&#34;</span><span class="p">,</span> <span class="s">&#34;with_value&#34;</span> <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span> <span class="s">&#34;bool_attribute&#34;</span><span class="p">,</span> <span class="k">true</span> <span class="p">},</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="s">&#34;nested_attribute&#34;</span><span class="p">,</span> <span class="k">new</span> <span class="n">Dictionary</span><span class="p">&lt;</span><span class="kt">string</span><span class="p">,</span> <span class="kt">object</span><span class="p">&gt;()</span>
</span></span><span class="line"><span class="cl">        <span class="p">{</span>
</span></span><span class="line"><span class="cl">            <span class="p">{</span> <span class="s">&#34;internal_attribute&#34;</span><span class="p">,</span> <span class="m">1.234</span> <span class="p">},</span>
</span></span><span class="line"><span class="cl">        <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">},</span>
</span></span><span class="line"><span class="cl"><span class="p">});</span>
</span></span></code></pre>
      </div>
    </div>
  </div>
  <h3 id="real-user-monitoring--rum">Real User Monitoring (RUM)</h3>
  <h4 id="manual-scene--view-tracking">Manual Scene (View) Tracking</h4>
  <p>
    To manually track new Scenes (<code>Views</code> in Datadog), use the
    <code>StartView</code> and <code>StopView</code> methods:
  </p>
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
        ><code><span class="line"><span class="cl"><span class="k">public</span> <span class="k">void</span> <span class="n">Start</span><span class="p">()</span>
</span></span><span class="line"><span class="cl"><span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="n">DatadogSdk</span><span class="p">.</span><span class="n">Instance</span><span class="p">.</span><span class="n">Rum</span><span class="p">.</span><span class="n">StartView</span><span class="p">(</span><span class="s">&#34;My View&#34;</span><span class="p">,</span> <span class="k">new</span><span class="p">()</span>
</span></span><span class="line"><span class="cl">    <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="p">{</span> <span class="s">&#34;view_attribute&#34;</span><span class="p">:</span> <span class="s">&#34;active&#34;</span> <span class="p">}</span>
</span></span><span class="line"><span class="cl">    <span class="p">});</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre>
      </div>
    </div>
  </div>
  <p>Starting a new view automatically ends the previous view.</p>
  <h4 id="automatic-scene-tracking">Automatic Scene Tracking</h4>
  <p>
    You can also set <code>Enable Automatic Scene Tracking</code> in your
    Project Settings to enable automatically tracking active scenes. This uses
    Unity's <code>SceneManager.activeSceneChanged</code> event to automatically
    start new scenes.
  </p>
  <h4 id="web-requests--resource-tracking">Web Requests / Resource Tracking</h4>
  <p>
    Datadog offers <code>DatadogTrackedWebRequest</code>, which is a
    <code>UnityWebRequest</code> wrapper intended to be a drop-in replacement
    for <code>UnityWebRequest</code>.
    <code>DatadogTrackedWebRequest</code> enables
    <a
      href="/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=browserrum"
      >Datadog Distributed Tracing</a
    >.
  </p>
  <p>
    To enable Datadog Distributed Tracing, you must set the
    <code>First Party Hosts</code> in your project settings to a domain that
    supports distributed tracing. You can also modify the sampling rate for
    distributed tracing by setting the <code>Tracing Sampling Rate</code>.
  </p>
  <p>
    <code>First Party Hosts</code> does not allow wildcards, but matches any
    subdomains for a given domain. For example, api.example.com matches
    staging.api.example.com and prod.api.example.com, but not news.example.com.
  </p>
  <h2 id="sending-data-when-device-is-offline">
    Sending data when device is offline
  </h2>
  <p>
    RUM helps ensure availability of data when your user device is offline. In
    case of low-network areas, or when the device battery is too low, all the
    RUM events are first stored on the local device in batches.
  </p>
  <p>
    Each batch follows the intake specification. They are sent as soon as the
    network is available, and the battery is high enough to help ensure the
    Datadog SDK does not impact the end user's experience. If the network is not
    available while your application is in the foreground, or if an upload of
    data fails, the batch is kept until it can be sent successfully.
  </p>
  <p>
    This means that even if users open your application while offline, no data
    is lost. To help ensure the SDK does not use too much disk space, the data
    on the disk is automatically discarded if it gets too old.
  </p>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://github.com/DataDog/dd-sdk-unity"><span class="w-100 d-flex justify-content-between "><span class="text">Source code for dd-sdk-unity</span><span class="badge badge-white pe-2 border-0">SOURCE CODE</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="https://github.com/DataDog/unity-package"><span class="w-100 d-flex justify-content-between "><span class="text">Package URL for Unity SDK</span><span class="badge badge-white pe-2 border-0">SOURCE CODE</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/real_user_monitoring/explorer/"><span class="w-100 d-flex justify-content-between "><span class="text">Learn how to explore your RUM data</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>