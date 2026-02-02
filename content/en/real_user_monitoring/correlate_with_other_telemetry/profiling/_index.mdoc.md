---
title: Correlate RUM and Profiling
description: "Use profiling with RUM to understand application performance issues affecting user experience."
content_filters:
  - trait_id: sdk_profiling
    option_group_id: rum_sdk_profiling_options
    label: "SDK"
aliases:
  - /real_user_monitoring/correlate_with_other_telemetry/profiling/browser_profiling
  - /real_user_monitoring/correlate_with_other_telemetry/profiling/ios_profiling
  - /real_user_monitoring/correlate_with_other_telemetry/profiling/android_profiling
further_reading:
  - link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
    tag: "Blog"
    text: "Real User Monitoring"
  - link: "https://www.datadoghq.com/blog/modern-frontend-monitoring/"
    tag: "Blog"
    text: "Start monitoring single-page applications"
  - link: "https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android"
    tag: "Documentation"
    text: "Start monitoring Android applications"
  - link: "https://docs.datadoghq.com/real_user_monitoring/application_monitoring/ios"
    tag: "Documentation"
    text: "Start monitoring iOS applications"
  - link: "/tracing/"
    tag: "Documentation"
    text: "APM and Distributed Tracing"
---
## Overview

Datadog RUM supports profiling for browser, iOS, and Android applications. Use profiling data to identify performance bottlenecks, optimize slow code paths, and improve rendering performance at both the system and code level.

<!-- Browser -->
{% if equals($sdk_profiling, "browser") %}

{% callout header="Join the Preview!" btn_hidden="true" %}
Browser Profiling is in Preview. To request access, fill out [this form](https://www.datadoghq.com/product-preview/browser-profiler/).
{% /callout %}

{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler.png" 
alt="Browser profiling example when analyzing an event sample." 
style="width:100%;" /%}

Browser profiling provides visibility into how your application behaves in your users' browsers, helping you understand root causes behind unresponsive applications at page load or during the page life cycle. Use profiling data alongside RUM insights to identify which code executes during a [Long Animation Frame (LoAF)][1] and how JavaScript execution and rendering tasks impact user-perceived performance.

To get started, enable browser profiling in your RUM SDK configuration. After enabling it, click on a profiled event sample to see detailed profiling data.

## Setup {% #setup-browser %}

### Step 1 - Set up RUM {% #step-1-set-up-rum-browser %}

{% alert %}
Browser SDK version 6.12 or later is required.
{% /alert %}

To start collecting data, set up [RUM Browser Monitoring][2].

### Step 2 - Configure the profiling sampling rate {% #step-2-configure-the-profiling-sampling-rate-browser %}

1. Initialize the RUM SDK and configure `profilingSampleRate`, which determines the percentage of sessions that are profiled (for example, 25% means profiling runs on 25 out of 100 sessions).
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      profilingSampleRate: 25,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
    ```

2. Configure your web servers to serve HTML pages with the HTTP response header `Document-Policy: js-profiling`:
    ```javascript
        app.get("/", (request, response) => {
            … 
            response.set("Document-Policy", "js-profiling");
            …
        });
    ```

3. Set up Cross-Origin Resource Sharing (CORS) if needed.

      This step is required only if your JavaScript files are served from a different origin than your HTML. For example, if your HTML is served from `cdn.com` and JavaScript files from `static.cdn.com`, you must enable CORS to make JavaScript files visible to the profiler. For more information, see the [Browser profiling and CORS](#cors) section.
    
    To enable CORS:

    - Add a `crossorigin="anonymous"` attribute to `<script/>` tags
    - Make sure that JavaScript response includes the `Access-Control-Allow-Origin: *` HTTP header (or the proper origin value)
    
       ```javascript
       app.get("/", (request, response) => {
           … 
           response.header("Access-Control-Allow-Origin", "*");
           response.header("Access-Control-Allow-Headers",
           …
       });
       ```

{% collapse-content title="Browser profiling and CORS" %}

#### Requirements for Cross-Origin Scripts (CORS)

If a script's execution or attribution information is to be surfaced in performance entries (and thus captured in browser profiling), the resource (for example, a JavaScript file) needs to be fetched with CORS headers that explicitly allow it to be shared with the origin making the measurement (your application).

To summarize:

- If a script is loaded from a same-origin source, then attribution is allowed, and you can see profiling data attributed to this script.
- If a script is loaded cross-origin _without_ a permissive CORS policy (like `Access-Control-Allow-Origin` allowing the page origin), then attribution is blocked, and you do not see profiling data attributed to this script.

This CORS policy restricts profiling to only scripts that are explicitly intended to be profiled by other origins.

#### How does CORS relate to browser profiling?

When you start Datadog's browser profiler (which uses the [JS Self-Profiling API][3]), the profiler can capture stack traces of JavaScript execution—but it only includes _attribution_ (function names, URLs, etc.) for the following scripts:

- Scripts that have the same origin as the page initiating the profiling
- Cross-origin scripts that explicitly opt-in using CORS

This protects third-party content and users from leaking execution details across security boundaries.

#### Why is the crossorigin="anonymous" attribute needed?

Without the `crossorigin="anonymous"` attribute, the browser does not make a CORS-enabled request for the script. The browser fetches the script without CORS, meaning:

- No CORS policy applies.
- No credentials (cookies, HTTP auth, etc.) are sent.
- The fetched script is not eligible for detailed attribution in performance entries or stack traces. These stack frames are displayed as "(anonymous)" or with no attribution.

To protect cross-origin script privacy, _both_ sides must agree to share information:
- The page must explicitly request a CORS-enabled fetch, with `crossorigin="anonymous"`.
- The server must permit this, with an `Access-Control-Allow-Origin` header in the response.

A script is eligible for attribution in the JS Self-Profiling API only when both of these conditions are met.

{% /collapse-content %}

## Explore profiling {% #explore-profiling-browser %}

### Within the Optimization page {% #within-the-optimization-page-browser %}

The **Optimization page** surfaces profiling data in several contexts:

- In the **Troubleshoot section**, Datadog samples long tasks across multiple views to identify your top contributing functions. Use this overview to find where JavaScript execution time is spent and which functions block the main thread, then optimize those functions to improve responsiveness.

{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_troubleshoot_section.png" alt="Browser profiling troubleshoot section example within the Optimization page." style="width:100%;" /%}

- Within the **Event Waterfall**, any long task that includes profiling data is marked with a yellow profiling icon. Click one of these long task events to open a Long Task view panel with detailed profiling data. Use this panel to identify blocking functions, trace their call stacks, and understand how script execution contributes to poor responsiveness.

{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_event_waterfall.png" alt="Browser profiling event waterfall example within the Optimization page." style="width:100%;" /%}


### Within the Sessions Explorer {% #within-the-sessions-explorer-browser %}
You can also find profiling data when reviewing individual events within the **Sessions Explorer**. This opens the same Long Task view panel with profiling data, allowing you to inspect what code was executing during that task and how it affected the user's experience.

{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_sessions_explorer.png" alt="Browser profiling troubleshoot section example within the Optimization page." style="width:100%;" /%}

{% /if %}
<!-- end Browser -->

<!-- Android -->
{% if equals($sdk_profiling, "android") %}

{% callout header="Join the Preview!" btn_hidden="true" %}
Android Profiling is in Preview. To request access, fill out [this form](https://www.datadoghq.com/product-preview/android-profiler/).
{% /callout %}

{% img src="real_user_monitoring/android/android-profiling-ttid.png" alt="Android profiling data in a time to initial display vital event." style="width:90%;" /%}

Android profiling captures detailed data about your application's performance during launch, helping you identify slow methods and optimize startup time. Android profiling is built on top of the [ProfilingManager Android API][4] and samples the device's CPU to collect method call stacks from the application's process.

{% alert level="warning" %}
Only devices running Android 15 (API level 35) or higher generate profiling data.
{% /alert %}

## Prerequisites {% #prerequisites-android %}

- Your Android application must use the Datadog Android SDK version 3.6.0+.
- [RUM without Limits][5] must be enabled in your organization.

## Setup {% #setup-android %}

### Step 1 - Set up RUM {% #step-1-set-up-rum-android %}

To start collecting data, set up [Mobile RUM for Android][6].

### Step 2 - Configure the profiling sampling rate {% #step-2-configure-the-profiling-sampling-rate-android %}

1. Initialize the RUM SDK and configure the `applicationLaunchSampleRate`, which determines the percentage of application launches that are profiled (for example, 15% means profiling runs on 15 out of 100 launches).

    {% alert level="danger" %}
    If no value is specified, the default `applicationLaunchSampleRate` is 15 percent.
    {% /alert %}

    ```kotlin
      class SampleApplication : Application() {
          override fun onCreate() {
              super.onCreate()
              val configuration = Configuration.Builder(
                  clientToken = "<CLIENT_TOKEN>",
                  env = "<ENV_NAME>",
                  variant = "<APP_VARIANT_NAME>"
              ).build()

              Datadog.initialize(this, configuration, trackingConsent)

              // Enable RUM (required for Profiling)
              val rumConfig = RumConfiguration.Builder(applicationId)
                  .build()
              Rum.enable(rumConfig)

              // Enable Profiling
              val profilingConfig = ProfilingConfiguration.Builder()
                .setApplicationLaunchSampleRate(15) // default is 15%
                .build()

              Profiling.enable(profilingConfig)
          }
      }
    ```

    {% alert level="warning" %}
    The total volume of profiles may not match the percentage configured in `applicationLaunchSampleRate`. This variation results from [rate limitations](https://developer.android.com/topic/performance/tracing/profiling-manager/will-my-profile-always-be-collected#how-rate-limiting-works) within the data collector, including profiling support on older devices and the maximum profiling frequency per device.
    {% /alert %}

The [ProfilingManager API][7] also supports disabling rate limiting during debug builds. 

## Explore profiling data {% #explore-profiling-data-android %}

### During the time to initial display {% #during-the-time-to-initial-display-android %}

Android application launch profiling data is attached to the [time to initial display][8] vital event in a RUM session. You can access the time to initial display from the session side panel, view side panel, or directly from the time to initial display vital side panel.

{% img src="real_user_monitoring/android/android-profiling-session.png" alt="Android profiling data in RUM session." style="width:90%;" /%}

Use the **flame graph** to identify which methods consume the most CPU time during launch, the **thread timeline** to see parallel execution patterns, and the **call graph** to trace method dependencies. You can also download the profiling data for external analysis or deeper investigation.

{% img src="real_user_monitoring/android/android-profiling-thread-timeline.png" alt="Android profiling data for the time to initial display in a thread timeline." style="width:90%;" /%}

{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($sdk_profiling, "ios") %}

{% callout header="Join the Preview!" btn_hidden="true" %}
iOS Profiling is in Preview. To request access, fill out [this form](https://www.datadoghq.com/product-preview/ios-profiler/).
{% /callout %}

{% img src="real_user_monitoring/ios/ios-profiling-ttid.png" alt="iOS profiling data in a time to initial display vital event." style="width:90%;" /%}

iOS profiling captures detailed data about your application's performance during launch, helping you identify slow functions and optimize startup time. iOS profiling is built on top of the [mach Kernel API][9] and periodically samples all application threads to collect call stacks. 

## Prerequisites {% #prerequisites-ios %}

- Your iOS application must use the Datadog iOS SDK version 3.6.0+.
- [RUM without Limits][10] must be enabled in your organization.

## Setup {% #setup-ios %}

### Step 1 - Set up RUM {% #step-1-set-up-rum-ios %}
To start collecting data, set up [Mobile RUM for iOS][11].

### Step 2 - Configure the profiling sampling rate {% #step-2-configure-the-profiling-sampling-rate-ios %}

Initialize the RUM SDK and configure the `applicationLaunchSampleRate`, which determines the percentage of application launches that are profiled (for example, 5% means profiling runs on 5 out of 100 launches).

{% alert level="danger" %}
If no value is specified, the default `applicationLaunchSampleRate` is 5 percent.
{% /alert %}

```swift
    import DatadogCore
    import DatadogRUM
    import DatadogProfiling

    // Initialize Datadog SDK with your configuration
    Datadog.initialize(
      with: Datadog.Configuration(
        clientToken: "<client token>",  // From Datadog UI
        env: "<environment>",           // for example, "production", "staging"
        service: "<service name>"       // Your app's service name
      ),
      trackingConsent: trackingConsent  // GDPR compliance setting
    )

    // Enable RUM feature
    RUM.enable(
      with: RUM.Configuration(
        applicationID: "<rum application id>"
      )
    )

    // Enable Profiling feature
    Profiling.enable() // default is 5%
```

## Explore profiling data {% #explore-profiling-data-ios %}

### During the time to initial display {% #during-the-time-to-initial-display-ios %}

iOS application launch profiling data is attached to the [time to initial display][12] vital event in a RUM session. You can access the time to initial display from the session side panel, view side panel, or directly from the time to initial display vital side panel.

{% img src="real_user_monitoring/ios/ios-profiling-session.png" alt="iOS profiling data in a view event to initial display vital event." style="width:90%;" /%}

Use the **flame graph** to identify which functions consume the most Wall time during launch, the **thread timeline** to see parallel execution patterns, and the **call graph** to trace function dependencies. You can also download the profiling data for external analysis or deeper investigation.

{% img src="real_user_monitoring/ios/ios-profiling-thread-timeline.png" alt="iOS profiling data for the time to initial display in a thread timeline." style="width:90%;" /%}

{% /if %}
<!-- end iOS -->

[1]: /real_user_monitoring/guide/browser-sdk-upgrade/#collect-long-animation-frames-as-long-tasks
[2]: /real_user_monitoring/application_monitoring/browser/setup/
[3]: https://developer.mozilla.org/en-US/docs/Web/API/JS_Self-Profiling_API
[4]: https://developer.android.com/topic/performance/tracing/profiling-manager/overview
[5]: /real_user_monitoring/rum_without_limits/ 
[6]: /real_user_monitoring/application_monitoring/android
[7]: https://developer.android.com/topic/performance/tracing/profiling-manager/debug-mode
[8]: /real_user_monitoring/application_monitoring/android/application_launch_monitoring?tab=kotlin
[9]: https://developer.apple.com/documentation/kernel/mach
[10]: /real_user_monitoring/rum_without_limits/ 
[11]: /real_user_monitoring/application_monitoring/ios
[12]: /real_user_monitoring/application_monitoring/ios/application_launch_monitoring?tab=swift