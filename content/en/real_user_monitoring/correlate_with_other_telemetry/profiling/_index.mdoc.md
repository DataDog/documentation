---
title: Correlate RUM and Profiling
description: "Use profiling with RUM to understand application performance issues affecting user experience."
content_filters:
  - trait_id: platform
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
{% if equals($platform, "browser") %}

{% callout url="https://www.datadoghq.com/product-preview/browser-profiler/" header="Join the Preview!" btn_hidden=false %}
Browser Profiling is in Preview.
{% /callout %}

{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiling_tab_in_explorer.png" 
alt="Browser profiling tab in the Sessions Explorer." 
style="width:100%;" /%}

Browser profiling provides visibility into how your application behaves in your users' browsers, helping you understand root causes behind unresponsive applications at page load or during the page life cycle. Use profiling data alongside RUM insights to identify which code executes during a [Long Animation Frame (LoAF)][1] and how JavaScript execution and rendering tasks impact user-perceived performance.

To get started, enable browser profiling in your RUM SDK configuration. After enabling it, click on a profiled event sample to see detailed profiling data.

## Setup

### Step 1 - Set up RUM

{% alert %}
Browser SDK version 6.12 or later is required.
{% /alert %}

To start collecting data, set up [RUM Browser Monitoring][2].

### Step 2 - Configure the profiling sampling rate

1. Initialize the RUM SDK and configure `profilingSampleRate`, which determines the percentage of sessions that are profiled (for example, 25% means profiling runs on 25 out of 100 ingested sessions).
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

3. **Quota check**: Before starting a profiled session, the SDK makes a request to a quota API to determine whether the current RUM session will receive profiling data.

    If you use a [proxy][13] or [CSP][14], you must also allow the `quota.` subdomain of your site's standard intake origin (for example, `https://quota.browser-intake-datadoghq.com` for US1, serving the `/api/v2/profiling/quota` endpoint). See the full list of quota endpoints per site in the [Supported endpoints][15] section, and refer to the [proxy setup documentation][13] for details on routing subdomain-specific requests.

4. Set up Cross-Origin Resource Sharing (CORS) if needed.

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

{% collapse-content title="Browser profiling and CORS" id="cors"%}

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

## Explore profiling

### Within the Sessions Explorer

Profiling data is captured on long tasks and rolls up to actions, views, vitals, and sessions. Use `@profiling.has_profile` to filter to profiled events and understand what code ran and how it affected the user's experience. This is available for sessions, views, actions, vitals, and long tasks.
- **View panel**: Profiling data in a new tab.
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_sessions_explorer_view_panel.png" alt="Browser profiling tab in the View panel." style="width:100%;" /%}

- **Long Task panel**: Profiling data in the performance tab.
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_sessions_explorer.png" alt="Browser profiling troubleshoot section example within the Optimization page." style="width:100%;" /%}

- **Vitals panel**: Profiling data in a new tab.
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_sessions_explorer_vitals_panel.png" alt="Browser profiling tab in the Vitals panel." style="width:100%;" /%}

- **Action panel**: Profiling data in a new tab.
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_sessions_explorer_action_panel.png" alt="Browser profiling tab in the Action panel." style="width:100%;" /%}

### Within the Profiling page
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_aggregate_experience.png" alt="Browser profiling aggregate experience." style="width:100%;" /%}

The Profiling page, found through the top bar navigation, lets you analyze and compare profiling data across sessions in one place. Use it to spot system level patterns, compare top-consuming functions, and prioritize optimizations instead of inspecting profiled sessions one by one. The guided experience walks you through:

1. **Focus on views**: Choose the views you'd like to analyze.
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_aggregate_experience_step_1.png" alt="Step 1 of the browser profiling aggregate experience showing which views to select." style="width:100%;" /%}

2. **Select a measurement**: Pick a Core Web Vital, custom vital, or RUM action to dive into. Optionally, filter by RUM attributes such as version or OS, or narrow to a specific distribution such as p95.
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_aggregate_experience_step_2.png" alt="Step 2 of the browser profiling aggregate experience showing which measurement to focus on." style="width:100%;" /%}

3. **Compare (Optional)**: Define two groups to compare side by side—for example, different versions, OS types, or percentile ranges—to isolate performance differences between them.
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_aggregate_experience_step_3.png" alt="Step 3 of the browser profiling aggregate experience showing how to compare." style="width:100%;" /%}

4. **Investigate slowest functions**: Review which functions consume the most time in the aggregated profile so you can prioritize what to optimize first. Explore the call hierarchy to see how those functions relate and where time is spent across the stack, or if you chose to compare see the differences between group A and B.
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_aggregate_experience_step_4a.png" alt="Step 4 of the browser profiling aggregate experience showing results to compare between groups." style="width:100%;" /%}
{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_aggregate_experience_step_4b.png" alt="Step 4 of the browser profiling aggregate experience showing a flamegraph and top methods list." style="width:100%;" /%}


### Within the Optimization page

The **Optimization page** surfaces profiling data in several contexts:

- In the **Troubleshoot section**, Datadog samples long tasks across multiple views to identify your top contributing functions. Use this overview to find where JavaScript execution time is spent and which functions block the main thread, then optimize those functions to improve responsiveness.

{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_troubleshoot_section.png" alt="Browser profiling troubleshoot section example within the Optimization page." style="width:100%;" /%}

- Within the **Event Waterfall**, any long task that includes profiling data is marked with a yellow profiling icon. Click one of these long task events to open a Long Task view panel with detailed profiling data. Use this panel to identify blocking functions, trace their call stacks, and understand how script execution contributes to poor responsiveness.

{% img src="real_user_monitoring/browser/optimizing_performance/browser_profiler_event_waterfall.png" alt="Browser profiling event waterfall example within the Optimization page." style="width:100%;" /%}

{% /if %}
<!-- end Browser -->

<!-- Android -->
{% if equals($platform, "android") %}

{% callout url="https://www.datadoghq.com/product-preview/android-profiler/" header="Join the Preview!" btn_hidden=false %}
Android Profiling is in Preview.
{% /callout %}

{% img src="real_user_monitoring/android/android-profiling-ttid.png" alt="Android profiling data in a time to initial display vital event." style="width:90%;" /%}

Android profiling helps you identify and optimize slow methods during important moments in user sessions. Android profiling is built on top of the [ProfilingManager Android API][4] and samples the device's CPU to collect method call stacks from the application's process.

{% alert level="warning" %}
Only devices running Android 15 (API level 35) or higher generate profiling data.
{% /alert %}

## Prerequisites

- Application launch profiling requires Android SDK version 3.6.0+.
- Continuous profiling requires Android SDK version 3.12.0+.
- [RUM without Limits][5] must be enabled in your organization.

## Setup

### Step 1 - Set up RUM

To start collecting data, set up [Mobile RUM for Android][6].

### Step 2 - Configure the profiling sampling rate

Initialize the RUM SDK and configure the `setApplicationLaunchSampleRate` and `setContinuousSampleRate` parameters, which are independent of each other:

- `setApplicationLaunchSampleRate` determines how often the time to initial display is profiled (for example, 15 means profiling runs on 15 out of 100 launches).
- `setContinuousSampleRate` determines whether the time to full display, application not responding (ANR) errors, long tasks, or [RUM Operations][19] are profiled (for example, 15 means that 15 out of 100 sessions will have their time to full display, ANRs, and long tasks profiled).

Both sample rates are applied on top of the [RUM session sampling rate][17]. 

{% alert level="danger" %}
If no value is specified, the default for both `setApplicationLaunchSampleRate` and `setContinuousSampleRate` is 15%.
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
          Profiling.enable(
              ProfilingConfiguration.Builder()
                  .setApplicationLaunchSampleRate(15f)
                  .setContinuousSampleRate(15f)
                  .build()
          )
      }
  }
```

{% alert level="warning" %}
The total volume of profiles may not match the percentage configured in `applicationLaunchSampleRate` or `continuousSampleRate`. This variation results from [rate limitations][20] within the data collector, including profiling support on older devices and the maximum profiling frequency per device.
{% /alert %}

The [ProfilingManager API][7] also supports disabling rate limiting during debug builds. 

## Explore profiling data

You can use the `@profiling.has_profile` attribute in the Sessions Explorer to filter to profiled events and investigate which code ran and how it affected the user's experience. This is available for sessions, views, errors, long tasks, vitals, and operations.

### During the time to initial display and time to full display

Android application launch profiling data is attached to the [time to initial display][8] and [time to full display][8] vital events in a RUM session. You can access profiles for the time to initial display and time to full display from the session side panel, view side panel, or directly from the vital side panels.

{% img src="real_user_monitoring/android/android-profiling-ttfd.png" alt="Android profiling data for a time to full display event." style="width:90%;" /%}

Use the **flame graph** to identify which methods consume the most CPU time during launch, the **thread timeline** to see parallel execution patterns, and the **call graph** to trace method dependencies. You can also download the profiling data for external analysis or deeper investigation.

{% img src="real_user_monitoring/android/android-profiling-thread-timeline.png" alt="Android profiling data for the time to initial display in a thread timeline." style="width:90%;" /%}

### During application not responding errors

Android profiling data is attached to [application not responding (ANR)][16] errors in a RUM session. You can access profiles for ANR errors from the view side panel or from the error event side panel.

{% img src="real_user_monitoring/android/android-profiling-anr.png" alt="Android profiling data for an application not responding error event." style="width:90%;" /%}

### During long tasks

Android profiling data is attached to long task events in a RUM session. You can access profiles for long tasks from the view side panel or from the long task event side panel.

{% img src="real_user_monitoring/android/android-profiling-long-task.png" alt="Android profiling data for a long task event." style="width:90%;" /%}

### During operations

Android profiling data is attached to operations events in a RUM session. You can access profiles for operations from the view side panel or from the operations event side panel.

{% img src="real_user_monitoring/android/android-profiling-operation.png" alt="Android profiling data for an operation." style="width:90%;" /%}

{% /if %}
<!-- end Android -->

<!-- iOS -->
{% if equals($platform, "ios") %}

{% callout url="https://www.datadoghq.com/product-preview/ios-profiler/" header="Join the Preview!" btn_hidden=false %}
iOS Profiling is in Preview.
{% /callout %}

{% img src="real_user_monitoring/ios/ios-profiling-ttid.png" alt="iOS profiling data in a time to initial display vital event." style="width:90%;" /%}

iOS profiling helps you identify and optimize slow methods during important moments in user sessions. iOS profiling is built on top of the [mach Kernel API][9] and periodically samples all application threads to collect call stacks. 

## Prerequisites

- Application launch profiling requires iOS SDK version 3.6.0+.
- Continuous profiling requires iOS SDK version 3.14.0+.
- [RUM without Limits][10] must be enabled in your organization.

## Setup

### Step 1 - Set up RUM
To start collecting data, set up [Mobile RUM for iOS][11].

### Step 2 - Configure the profiling sampling rate

Initialize the RUM SDK and configure the `applicationLaunchSampleRate` and `continuousSampleRate` parameters, which are independent of each other:

- `applicationLaunchSampleRate` determines how often the time to initial display is profiled (for example, 5 means profiling runs on 5 out of 100 launches).
- `continuousSampleRate` determines whether the time to full display, application hangs, long tasks, or [RUM Operations] [21] are profiled (for example, 5 means that 5 out of 100 sessions will have their time to full display, application hangs, and long tasks profiled).

Both sample rates are applied on top of the [RUM session sampling rate][21].

{% alert level="danger" %}
If no value is specified, the default for both `applicationLaunchSampleRate` and `continuousSampleRate` is 5%.
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
    Profiling.enable(with:
        Profiling.Configuration(
            applicationLaunchSampleRate: 5.0,
            continuousSampleRate: 5.0
        )
    )
```

## Explore profiling data

You can use the `@profiling.has_profile`attribute in the Sessions Explorer to filter to profiled events and investigate which code ran and how it affected the user's experience. This is available for sessions, views, errors, long tasks, vitals, and operations.

### During the time to initial display and time to full display

iOS application launch profiling data is attached to the [time to initial display][12] and [time to full display][12] vital events in a RUM session. You can access profiles for the time to initial display and time to full display from the session side panel, view side panel, or directly from the vital side panels.

{% img src="real_user_monitoring/ios/ios-profiling-ttfd.png" alt="iOS profiling data in a time to full display vital event." style="width:90%;" /%}

Use the **flame graph** to identify which functions consume the most Wall time during launch, the **thread timeline** to see parallel execution patterns, and the **call graph** to trace function dependencies. You can also download the profiling data for external analysis or deeper investigation.

{% img src="real_user_monitoring/ios/ios-profiling-thread-timeline.png" alt="iOS profiling data for the time to initial display in a thread timeline." style="width:90%;" /%}

### During application hangs

iOS profiling data is attached to [application hangs][18] in a RUM session. You can access profiles for application hangs from the view side panel or from the error event side panel.

{% img src="real_user_monitoring/ios/ios-profiling-app-hang.png" alt="iOS profiling data in an application hang event." style="width:90%;" /%}

### During long tasks

iOS profiling data is attached to long task events in a RUM session. You can access profiles for long tasks from the view side panel or from the long task event side panel.

{% img src="real_user_monitoring/ios/ios-profiling-long-task.png" alt="iOS profiling data in a long task event." style="width:90%;" /%}

### During operations

iOS profiling data is attached to operations events in a RUM session. You can access profiles for operations from the view side panel or from the operations event side panel.

{% img src="real_user_monitoring/ios/ios-profiling-operation.png" alt="iOS profiling data in an operation event." style="width:90%;" /%}


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
[13]: /real_user_monitoring/guide/proxy-rum-data
[14]: /integrations/content_security_policy_logs
[15]: /real_user_monitoring/#supported-endpoints-for-sdk-domains
[16]: /real_user_monitoring/application_monitoring/android/data_collected#error-attributes
[17]: /real_user_monitoring/application_monitoring/android/setup?tab=kotlin#sample-session-rates-2
[18]: /real_user_monitoring/application_monitoring/ios/data_collected#error-attributes
[19]: /real_user_monitoring/operations_monitoring/?tab=browser
[20]: https://developer.android.com/topic/performance/tracing/profiling-manager/will-my-profile-always-be-collected#how-rate-limiting-works 
[21]: /real_user_monitoring/application_monitoring/ios/setup?tab=swift-package-manager--spm
