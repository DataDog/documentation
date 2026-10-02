---
title: RUM & Session Replay
description: "Visualize, observe, and analyze the performance of your frontend applications as seen by your users."
disable_sidebar: true
aliases:
  - /real_user_monitoring/installation
  - /real_user_monitoring/faq/
  - /real_user_monitoring/rum_without_limits/
further_reading:
- link: "/real_user_monitoring/setup/"
  tag: "Documentation"
  text: "Set Up RUM"
- link: "/real_user_monitoring/rum_terms_and_concepts/"
  tag: "Documentation"
  text: "RUM Terms and Concepts"
- link: "/real_user_monitoring/setup/data_collected/"
  tag: "Documentation"
  text: "RUM Data Collected"
- link: "/real_user_monitoring/guide/retention_filter_best_practices/"
  tag: "Guide"
  text: "Retention Filter Best Practices"
- link: "https://learn.datadoghq.com/courses/intro-to-rum"
  tag: "Learning Center"
  text: "Intro to Real User Monitoring (RUM)"
- link: "https://dtdg.co/fe"
  tag: "Foundation Enablement"
  text: "Join an interactive session to gain insights through Real User Monitoring"
- link: "https://learn.datadoghq.com/courses/rum-retention-filters"
  tag: "Learning Center"
  text: "Interactive Lab: RUM Retention Filters"
- link: "https://www.datadoghq.com/blog/rum-without-limits/"
  tag: "Blog"
  text: "Introducing RUM without Limits™: Capture everything, keep what matters"
- link: "https://www.datadoghq.com/blog/ai-summaries-and-smart-chapters/"
  tag: "Blog"
  text: "Understand session replays faster with AI summaries and smart chapters"
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: "Blog"
  text: "Introducing Datadog Real User Monitoring"
- link: "https://www.datadoghq.com/blog/datadog-mobile-rum/"
  tag: "Blog"
  text: "Improve mobile user experience with Datadog Mobile Real User Monitoring"
- link: "https://www.datadoghq.com/blog/mobile-monitoring-best-practices/"
  tag: "Blog"
  text: "Best practices for monitoring mobile app performance"
- link: "https://www.datadoghq.com/blog/error-tracking/"
  tag: "Blog"
  text: "Make sense of application issues with Datadog Error Tracking"
- link: "https://www.datadoghq.com/blog/unify-apm-rum-datadog/"
  tag: "Blog"
  text: "Unify APM and RUM data for full-stack visibility"
- link: "https://www.datadoghq.com/blog/datadog-geomaps/"
  tag: "Blog"
  text: "Use geomaps to visualize your app data by location"
- link: "https://www.datadoghq.com/blog/datadog-rum-react-components/#tune-up-your-react-data-collection"
  tag: "Blog"
  text: "Get better RUM data with our custom React components"
- link: "https://www.datadoghq.com/blog/hybrid-app-monitoring/"
  tag: "Blog"
  text: "Monitor your hybrid mobile applications with Datadog"
- link: "https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/"
  tag: "Blog"
  text: "How Datadog's Technical Solutions team uses RUM, Session Replay, and Error Tracking to resolve customer issues"
- link: "https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/"
  tag: "Blog"
  text: "Best practices for monitoring static web applications"
- link: "https://www.datadoghq.com/blog/progressive-web-application-monitoring/"
  tag: "Blog"
  text: "Best practices for monitoring progressive web applications"
- link: "https://www.datadoghq.com/blog/datadog-executive-dashboards"
  tag: "Blog"
  text: "Design effective executive dashboards with Datadog"
- link: "https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams"
  tag: "Blog"
  text: "From performance to impact: Bridging frontend teams through shared context"
- link: "https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring"
  tag: "Release Notes"
  text: "Check out the latest Datadog RUM releases! (App login required)"
algolia:
  tags: ['rum', 'real user monitoring']
cascade:
    algolia:
        rank: 70
---


{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=RUM">}}
  Discover how to create custom user actions tailored to specific business needs, enabling precise tracking of user behavior.
{{< /learning-center-callout >}}

## What is Real User Monitoring?

{{< img src="real_user_monitoring/performance-summary-browser.png" alt="RUM Dashboard" >}}

Datadog's *Real User Monitoring (RUM)* gives you end-to-end visibility into the real-time activity and experience of individual users. RUM solves four types of use cases for monitoring web and mobile applications:

* **Performance**: Track the performance of web pages, mobile application screens, user actions, network requests, and your frontend code.
* **Error Management**: Monitor the ongoing bugs and issues and track them over time and versions.
* **Analytics / Usage**: Understand who is using your application (country, device, OS), follow individual users across sessions, and analyze how users interact with your application (most common page visited, clicks, interactions, and feature usage).
* **Support**: Retrieve all of the information related to one user session to troubleshoot an issue (session duration, pages visited, interactions, resources loaded, and errors).

For definitions of sessions, views, actions, and other RUM concepts, and for the technical limits that apply to RUM data, see [RUM Terms and Concepts][22].

## What is Session Replay?

Datadog's *Session Replay* allows you to capture and visually replay the user experience in your web or mobile application.

Combined with RUM performance data, Session Replay is beneficial for error identification, reproduction, and resolution, and provides insights into your application's usage patterns and design pitfalls.

## RUM without Limits

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-overview.png" alt="Estimated usage metrics details side panel" style="width:90%" >}}

<div class="alert alert-info">RUM without Limits is automatically enabled for customers with non-committed RUM plans. Reach out to your account team or <a href="/help/">Datadog support</a> to enable this feature.</div>

RUM without Limits gives you flexibility over your RUM session volumes by decoupling session data ingestion from retention. This enables you to:

- Dynamically set [retention filters][23] from the Datadog UI without up-front sampling decisions or code changes
- Retain sessions with errors or performance issues and discard less significant ones, such as ones with few user interactions

Even if you retain only a fraction of your sessions, Datadog provides [performance metrics][24] for all ingested sessions. This gives you an accurate, long-term overview of application health and performance.

**Note**: In RUM without Limits mode, you can only use default filters on the [Performance Monitoring Summary page][1]. This lets you see the entire dataset and prevents skewed performance metrics, because the data is sampled and there are fewer tags available than event attributes.

To start collecting RUM data, follow the [setup instructions][15].

### Set up RUM without Limits for new applications

When you [install the SDK][25]:

1. Set `sessionSampleRate` to 100%. Datadog recommends this rate for optimal visibility and metrics accuracy.
2. Choose a `sessionReplaySampleRate` that meets your observability needs.
3. For applications with [APM integration enabled][5], configure the percentage of sessions for which backend traces are ingested with `traceSampleRate` (Browser), `traceSampler` (Android), or `sampleRate` (iOS).
4. Enable `traceContextInjection: sampled` to allow backend SDKs to make their own sampling decisions for sessions where the RUM SDK decides not to keep the trace.

   <div class="alert alert-danger">Steps 1, 3, and 4 may impact your APM trace ingestion. To keep ingested span volumes stable, set <code>traceSampleRate</code> to the previously configured <code>sessionSampleRate</code>. For example, if you had <code>sessionSampleRate</code> set to 10% and you increase it to 100% for RUM without Limits, decrease <code>traceSampleRate</code> from 100% to 10% to ingest the same amount of traces.</div>

5. Deploy your application to apply the configuration.

### Set up RUM without Limits for existing applications

Existing RUM users must redeploy applications to fully use RUM without Limits. Set the session sample rate to 100% for all applications.

#### Step 1: Adjust sample rates

If you already collect replays, increasing the session sample rate requires reducing the replay sample rate to collect the same number of replays. The replay sample rate is applied on top of the session sample rate.

Before:

```javascript
   sessionSampleRate: 20,
   sessionReplaySampleRate: 10,
```

After:

```javascript
   sessionSampleRate: 100,
   sessionReplaySampleRate: 2,
```

1. Navigate to [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Real User Monitoring{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}][26].
1. Click the application you want to migrate.
1. Click the {{< ui >}}SDK Configuration{{< /ui >}} tab.
1. Set `sessionSampleRate` to 100%.
1. Set `sessionReplaySampleRate` to a rate that results in the same number of replays as before you increased the session sample rate.
1. Use the generated code snippet to update your source code, and redeploy your applications to apply the new configuration.

#### Step 2: Adjust tracing

Increasing `sessionSampleRate` can increase the number of ingested APM spans, because the RUM SDK can override the sampling decisions of backend traces to correlate them with sessions.

To avoid this, set `traceSampleRate` to a percentage below 100% (the previously set `sessionSampleRate`), and set `traceContextInjection: sampled` to allow backend SDKs to make their own sampling decisions for sessions where the RUM SDK decides not to keep the trace.

#### Step 3: Create retention filters

On mobile applications, many versions can be in use at the same time. Older versions don't necessarily send 100% of sessions, so creating new retention filters reduces the data available in Datadog for those versions.

Datadog recommends creating the same retention filters for all application versions, whether or not their SDK sample rate is set to 100%. All valuable sessions are still retained, even if some sessions from older versions aren't ingested.

For suggested retention filters and use cases, see [Retention Filter Best Practices][27].

## Explore Datadog RUM

Access RUM by navigating to [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Summary{{< /ui >}}][1].

Select an application from the top navigation, or follow the [setup instructions][15] to add your first application.

{{< img src="real_user_monitoring/rum-performance-application-selector.png" alt="Select a RUM application" >}}

**Tip**: To open RUM from Datadog's global search, press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> and search for `real user monitoring`.

## Performance monitoring summary

| Browser Performance Summary | Mobile Performance Summary |
|---------|---------|
| {{< img src="real_user_monitoring/performance-summary-browser.png" alt="RUM Performance Monitoring summary page for a browser application" >}} | {{< img src="real_user_monitoring/performance-summary-mobile-2.png" alt="RUM Performance Monitoring summary page for a mobile application" >}} | 

The [RUM Performance Monitoring summary][1] page provides relevant and actionable insights for both web and mobile applications. You have a tailored experience for each platform that helps you:

- **Focus on key datapoints** by platform, such as the UI latency for web or mobile crashes
- **Monitor application health** through familiar KPIs, such as Core Web Vitals for web apps or hang rate for iOS, to assess app reliability
- **Dive into investigations directly** from interactive widgets without leaving the page

For **web apps**, use the search bar to filter data, identify slow pages, and follow the UI to the [RUM Optimization Inspect][17] page.

For **mobile apps**, review recent crashes at the bottom of the page and use the [Error Tracking][6] side panel for troubleshooting.

### Out-of-the-box dashboards

Analyze information about your user sessions, performance, mobile applications, frustration signals, network resources, and errors collected automatically with [out-of-the-box RUM dashboards][2].

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="RUM dashboard" >}}

### RUM Explorer and visualizations

View user sessions in segments, such as checking when latency impacts your premium customers, with [visualizations][3]. Explore data, save views, and create [monitors][4] on your customized searches.

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mp4" alt="RUM Analytics" video=true >}}

### Integration with logs, APM, and profiler

View your [backend traces, logs, and infrastructure metrics][5] down to the exact line of code impacting your application performance, corresponding to user experiences and reported issues.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs-2.png" alt="RUM and APM" >}}

### Error tracking and crash reporting

Get automated alerts on outliers and groups of errors, timeouts, and crashes to significantly reduce your MTTR with [Error Tracking][6].

{{< img src="real_user_monitoring/error_tracking/errors_rum.mp4" alt="RUM error tracking" video=true >}}

### Web and mobile vitals

View performance scores and telemetry for [browser applications][7] such as Core Web Vitals and Mobile Vitals for [iOS, iPadOS, tvOS, and visionOS][8] or [Android and Android TV applications][9].

### Web view tracking

Collect information from your native web applications and explore hybrid views with Web View Tracking for [iOS, iPadOS, and visionOS][10] or [Android and Android TV][11].

{{< img src="real_user_monitoring/webview_tracking/webview_tracking_light.png" alt="Web Views captured in a user session in the RUM Explorer" >}}

## Explore Datadog Session Replay

### Session replays

Watch [browser recordings][12] of real users interacting with your website and set [privacy controls][13] for your organization.

### Developer tools

Access triggered logs, errors, and performance information when troubleshooting application issues using [Browser Dev Tools][14].


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /real_user_monitoring/administer_and_extend_rum/dashboards/
[3]: /real_user_monitoring/investigate_problems/explore_retained_data/visualize/
[4]: /monitors/types/real_user_monitoring/
[5]: /real_user_monitoring/enrich_rum_data/track_frontend_to_backend_traces/
[6]: /real_user_monitoring/investigate_problems/triage_errors_and_crashes/
[7]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=browser#event-timings-and-core-web-vitals
[8]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=ios#mobile-vitals
[9]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=android#mobile-vitals
[10]: /real_user_monitoring/enrich_rum_data/track_navigation_across_web_views/?platform=ios
[11]: /real_user_monitoring/enrich_rum_data/track_navigation_across_web_views/?platform=android
[12]: /session_replay/browser/
[13]: /session_replay/privacy_options?platform=browser
[14]: /session_replay/dev_tools
[15]: /real_user_monitoring/setup/
[17]: https://app.datadoghq.com/rum/optimization/inspect
[22]: /real_user_monitoring/rum_terms_and_concepts/
[23]: /real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/
[24]: /real_user_monitoring/measure_health_with_metrics/out_of_the_box_metrics/
[25]: /real_user_monitoring/setup/install/?platform=browser
[26]: https://app.datadoghq.com/rum/list
[27]: /real_user_monitoring/guide/retention_filter_best_practices/
