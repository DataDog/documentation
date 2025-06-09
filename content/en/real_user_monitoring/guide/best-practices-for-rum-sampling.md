---
title: Best Practices for RUM Sampling
description: Guide for RUM sampling.
further_reading:
- link: '/monitors/create/types/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Learn about RUM Monitors'
---

## Overview

Sampling in Datadog's Real User Monitoring product enables you to collect data from a certain percentage of user traffic.

There are two different ways of sampling, which control the data you send to Datadog:

- **Client-side (head-based) sampling**: Makes the sampling decision at the beginning of a user session, before any data is collected. The RUM SDK in your application determines whether to track the entire session or not, reducing data collection and ingestion of sessions that aren't analyzed.

- **Server-side (tail-based) sampling**: Makes the sampling decision after data has been collected and sent to Datadog. It allows you to filter and retain specific sessions based on their characteristics (like errors or user attributes) using retention filters.

_**Note**: Server-side sampling is only possible with the [retention filters][12] provided by [RUM without Limits][2]. If you need to use this but are on the legacy, client-side-only model, reach out to your account team._

This guide walks you through best practices for RUM sampling so you can capture sessions and collect data based on your monitoring needs. Learn more about how [sessions are defined][1] in RUM.

## Sampling configuration

### Configure the sampling rate

#### Client-side (head-based) sampling rate

With [RUM without Limits][2], client-side sampling rate helps you control how many sessions you send from your applications to Datadog.

Before each new user session, the SDK draws a random floating-point number between 0 and 100, which is then compared to the value set in the SDK configuration. If the random number is lower than the value set in the SDK configuration, the session is kept and events start being collected. If the random number is higher, the session is not kept and events are not collected until the end of the session.

You can set the sampling rate with the SDK ([Browser][3], [Android][4], [iOS][5], [Flutter][6], [Kotlin Multiplatform][7], [React Native][8], [Roku][9], [Unity][10]), then deploy it in the application code.

#### Server-side (tail-based) sampling rate

With RUM without Limits, server-side sampling rate defines which sessions you want to keep in Datadog (see details about the [retention period][11]).

The server-side sampling rate is defined as part of the retention filters for your sessions. When a retention filter matches a session or matches one of the events making up the sessions (view/action/error/resource, and so on), the whole session is stored alongside all its events (and including the ones that proceeded the sampling decision). The retention rate allows you to store only a specific percentage of sessions that meet the filter criteria and discard the rest. Learn more about [how retention filters work][12].

### The effect of sampling on data and metrics that are available in RUM
RUM metrics, including the ones that come [out-of-the-box with RUM without Limits][13] (e.g. Core Web Vitals and usage numbers) and the [custom ones][16] that you can create yourself, are all calculated based on sessions that are ingested on Datadog. For example, if the client-sampling rate is set to capture 60% of sessions, then the Core Web Vitals and total number of sessions are calculated based on 60% of those sessions.

_**Note**: with RUM without Limits, those metrics are computed before the [retention filters][12], i.e. before server-side sampling_

### Recommended sampling rate

#### Client-side (head-based) sampling rate

For optimal monitoring, Datadog recommends sending 100% of your sessions to Datadog. This ensures accurate out-of-the-box custom metrics, and complete visibility into your user experience.

However, if your application experiences high traffic and ingestion costs are a concern, you can reduce the sampling rate. Keep in mind that lower sampling rates affect the accuracy of your [metrics][13] proportionally.

#### Server-side (tail-based) sampling rate

For server-side sampling, Datadog recommends a two-step approach:

1. Start with basic retention filters to capture sessions with critical user paths, such as errors or from specific users.

2. Adjust the sampling rate based on your needs:
   - Ensure you have enough sessions for troubleshooting
   - Maintain sufficient data for APM correlation
   - Keep enough samples for performance analysis (waterfall views, long tasks)

With RUM without Limits, your server-side sampling should provide enough data for both troubleshooting and performance analysis while managing your data volume effectively.

### Sampling based on specific attributes
Configuring sampling based on specific attributes, such as sampling 100% of sessions with errors and 5% otherwise, or only sampling sessions that go through the checkout flow, is supported using [retention filters][12]. See the [Retention Filters Best Practices][14] guide to understand common retention filter types.

### Changing the sampling rate in the Datadog RUM UI
Changing the sampling rate is only supported for server-side sampling, and can be accomplished by [modifying the retention rate][15] from the retention filters page.

During live outages, incidents, or bug investigations, you can increase sampling to collect 100% of your sessions to ensure nothing is missed, or to have more examples of a particular issue.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/guide/understanding-the-rum-event-hierarchy/#sessions
[2]: /real_user_monitoring/rum_without_limits/
[3]: /real_user_monitoring/guide/sampling-browser-plans/#overview
[4]: /real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/?tab=kotlin#initialization-parameters
[5]: /real_user_monitoring/mobile_and_tv_monitoring/ios/setup/#sample-session-rates
[6]: /real_user_monitoring/mobile_and_tv_monitoring/flutter/setup/#sample-session-rates
[7]: /real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform/setup/?tab=rum#sample-rum-sessions
[8]: /real_user_monitoring/reactnative/#initialize-the-library-with-application-context
[9]: /real_user_monitoring/mobile_and_tv_monitoring/roku/setup/#step-3---initialize-the-library
[10]: /real_user_monitoring/mobile_and_tv_monitoring/unity/setup#sample-rum-sessions
[11]: /data_security/data_retention_periods/
[12]: /real_user_monitoring/rum_without_limits/retention_filters
[13]: /real_user_monitoring/rum_without_limits/metrics
[14]: /real_user_monitoring/guide/retention_filter_best_practices/
[15]: /real_user_monitoring/rum_without_limits/retention_filters#modifying-filters
[16]: /real_user_monitoring/platform/generate_metrics