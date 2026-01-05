---
title: RUM without Limits
description: Keep only the RUM data you need while maintaining full visibility of performance metrics for your applications.
further_reading:
  - link: '/real_user_monitoring/rum_without_limits/retention_filters'
    tag: Documentation
    text: Retain Data with Retention Filters
  - link: '/real_user_monitoring/guide/retention_filter_best_practices/'
    tag: Guide
    text: Retention Filter Best Practices
  - link: '/real_user_monitoring/rum_without_limits/metrics'
    tag: Documentation
    text: Analyze Performance with Metrics
  - link: 'https://www.datadoghq.com/blog/rum-without-limits/'
    tag: Blog
    text: 'Introducing RUM without Limits™: Capture everything, keep what matters'
---

<div class="alert alert-info">RUM without Limits is automatically enabled for customers with non-committed RUM plans. Reach out to your account team or <a href="/help/">Datadog support</a> to enable this feature.</div>

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-overview.png" alt="Estimated usage metrics details side panel" style="width:90%" >}}

## Overview

RUM without Limits provides you flexibility over your RUM sessions volumes by decoupling session data ingestion from indexing. This enables you to:

- Dynamically set retention filters from the Datadog UI without up-front sampling decisions or code changes
- Retain sessions with errors or performance issues and discard less significant ones, such as ones with few user interactions

Even if you retain only a fraction of your sessions, Datadog provides [performance metrics][1] for all ingested sessions. This ensures an accurate, long-term overview of application health and performance, even if only a fraction of session data is retained.

**Note**: In RUM without Limits mode, you can only use default filters on the [Performance Monitoring Summary page][7]. This lets you see the entire dataset and prevents skewed performance metrics since the data is sampled and there are fewer tags available than in event attributes.

This page identifies key components of RUM without Limits that can help you manage your RUM sessions volumes within your observability budget.

### For new applications

To get started with RUM without Limits for new applications, at the [instrumentation][2] step:

1. Ensure the `sessionSampleRate` is set to 100%. Datadog recommends setting it at this rate for optimal visibility and metrics accuracy.

2. Choose a `sessionReplaySampleRate` that meets your observability needs.

3. For applications with the [APM integration enabled][3], configure the percentage of sessions for which you want to make sure APM backend traces are ingested with `traceSampleRate` (browser), `traceSampler` (Android), or `sampleRate` (iOS).

4. Enable `traceContextInjection: sampled` to allow backend tracing libraries to make their own sampling decisions for sessions where the RUM SDK decides not to keep the trace.

   <div class="alert alert-danger">Steps 1, 3, and 4 may impact your APM traces ingestion. To ensure that ingested span volumes remain stable, configure the <code>traceSampleRate</code> to the previously configured <code>sessionSampleRate</code>. For instance, if you used to have <code>sessionSampleRate</code> set to 10% and you bump it to 100% for RUM without Limits, decrease the <code>traceSampleRate</code> from 100% to 10% accordingly to ingest the same amount of traces.</div>

5. Deploy your application to apply the configuration.

### For existing applications
Existing RUM users must redeploy applications to fully use RUM without Limits. Ensure your session sampling rate is 100% for all applications.

#### Step 1: Adjust sampling rates
If you are already collecting replays, increasing the session sampling rate requires reducing the replay sampling rate to collect the same number of replays (see example below). The replay sampling rate is based on the existing session sampling rate.

Before:

```java
   sessionSampleRate: 20,
   sessionReplaySampleRate: 10,
```

After:

```java
   sessionSampleRate: 100,
   sessionReplaySampleRate: 2,
```

1. Navigate to [**Digital Experiences > Real User Monitoring > Manage Applications**][4].
1. Click the application you want to migrate.
1. Click the **SDK Configuration** tab.
1. Ensure `sessionSampleRate` is set to 100%.
1. Set `sessionReplaySampleRate` to a rate that results in the same number of replays prior to increasing the Session Sample Rate.
1. Use the generated code snippet to update your source code and redeploy your applications to make sure the new configuration is applied.

#### Step 2: Adjust tracing

If you've increased `sessionSampleRate`, you might increase the number of ingested APM spans since the RUM SDK has the ability to override the sampling decisions of backend traces to make the correlation.

To alleviate this, set `traceSampleRate` to a percentage below 100% (to the previously set `sessionSampleRate`) and set `traceContextInjection: sampled` to allow backend tracing libraries to make their own sampling decisions for sessions where the RUM SDK decides not to keep the trace.

#### Step 3: Create retention filters

On mobile applications, many concurrent versions can live together. However, existing versions are not necessarily sending 100% of sessions, which means that creating new retention filters reduces the data available in Datadog for these application versions.

Datadog recommends creating the same retention filters for all application versions, independently of whether the SDK sampling rate is set to 100% or not. Ultimately, all valuable sessions are still collected even if some sessions are not ingested for some older versions.

See suggested retention filters and use cases in [Retention Filter Best Practices][5].

## Next steps

Create and configure [retention filters][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/rum_without_limits/metrics
[2]: /real_user_monitoring/application_monitoring/browser/setup/
[3]: /real_user_monitoring/platform/connect_rum_and_traces/
[4]: https://app.datadoghq.com/rum/list
[5]: /real_user_monitoring/guide/retention_filter_best_practices/
[6]: /real_user_monitoring/rum_without_limits/retention_filters
[7]: https://app.datadoghq.com/rum/performance-monitoring