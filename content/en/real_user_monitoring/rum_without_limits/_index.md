---
title: RUM without Limits
description: Keep only the RUM data you need while maintaining full visibility of performance metrics for your applications.
private: true
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
---

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-overview.png" alt="Estimated usage metrics details side panel" style="width:90%" >}}

## Overview

RUM without Limits provides you flexibility over your RUM sessions volumes by decoupling session data ingestion from indexing. This enables you to:

- Dynamically set retention filters from the Datadog UI without up-front sampling decisions or code changes
- Focus on high-impact sessions for improved visibility and troubleshooting of errors, crashes, and high latencies
- Retain sessions with errors or performance issues and discard less significant ones, such as ones with few user interactions

Even if you retain only a fraction of your sessions, Datadog provides performance metrics for all ingested sessions. This ensures an accurate, long-term overview of application health and performance, even if only a fraction of session data is retained.

This page identifies key components of RUM without Limits that can help you manage your RUM sessions volumes within your observability budget.

## Setting up RUM without Limits

### For new applications

To get started with RUM without Limits for new applications, at the [instrumentation][1] step:

1. Ensure the `sessionSampleRate` is set to 100%. This step is required.

2. Choose a `sessionReplaySampleRate` that meets your observability needs.

   **Note**: All replays are kept and billed.
3. For applications with the [APM integration enabled][2], configure the percentage of sessions for which you want to make sure APM backend traces are ingested with `traceSampleRate` (browser), `traceSampler` (Android), or `sampleRate` (iOS).

4. Enable `traceContextInjection: sampled` to defer sampling decisions to backend tracers for sessions where the decision is **not** to keep the trace.

   <div class="alert alert-warning">Steps 1, 3, and 4 may impact your APM traces ingestion. To ensure that ingested span volumes remain stable, configure the <code>traceSampleRate</code> to the previously configured <code>sessionSampleRate</code>. For instance, if you used to have <code>sessionSampleRate</code> set to 10% and you bump it to 100% for RUM without Limits, decrease the <code>traceSampleRate</code> from 100% to 10% accordingly to keep the same amount of traces.</div>

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

1. Navigate to [**Digital Experiences > Real User Monitoring > Manage Applications**][3].
1. Click the application you want to migrate.
1. Click the **SDK Configuration** tab.
1. Ensure `sessionSampleRate` is set to 100%.
1. Set `sessionReplaySampleRate` to a rate that results in the same number of replays prior to increasing the Session Sample Rate.
1. Use the generated code snippet to update your source code and redeploy your applications to make sure the new configuration is applied.

#### Step 2: Adjust tracing

If you've increased `sessionSampleRate`, you might increase the number of ingested APM spans since the RUM SDK has the ability to override the sampling decisions of backend traces to make the correlation.

To alleviate this, set `traceSampleRate` to a percentage below 100% (to the previously set `sessionSampleRate`) and set `traceContextInjection: sampled` to make sure the trace sampling decision is made by backend tracing libraries for sessions where the sampling decision is to **not** keep the trace.

#### Step 3: Create retention filters

On mobile applications, many concurrent versions can live together. However, existing versions are not necessarily sending 100% of sessions, which means that creating new retention filters further reduces the data available in Datadog for these application versions.

Datadog recommends creating the same retention filters for all application versions, independently of whether the SDK sampling rate is set to 100% or not. Ultimately, all valuable sessions will still end up being collected even if some sessions are not ingested for some older versions.

## Next steps

Create and configure [retention filters][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/setup/
[2]: /real_user_monitoring/platform/connect_rum_and_traces/
[3]: https://app.datadoghq.com/rum/list
[4]: /real_user_monitoring/rum_without_limits/retention_filters