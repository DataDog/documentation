---
title: Best Practices for RUM Sampling
kind: guide
description: Guide for RUM sampling.
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: Documentation
  text: Learn about RUM Monitors
---

## Overview

Sampling in Datadog's Real User Monitoring product enables you to collect data from a certain percentage of user traffic.

This guide walks you through best practices for RUM sampling so you can capture sessions and collect data based on your monitoring needs. Learn more about how [sessions are defined][9] in RUM.

## Sampling configuration

### Configure the variable names that correspond with the SDK version

Sessions are randomly sampled based on the percentage listed in the [SDK configuration][1]. To that end, make sure to use the correct configuration variable names for the SDK version being used.

### Configure the sampling rate
Before each new user session, the SDK draws a random floating-point number between 0 and 1, which is then compared to the value set in the SDK configuration. If the random number is lower than the value set in the SDK configuration, the session is kept and events start being collected. If the value is higher, the session is not kept and events are not collected until the end of the session.

You can set the sampling rate with the SDK ([Browser][2], [Android][3], [iOS][4], [React Native][5], [Flutter][6], [Roku][7]), then deploy it in the application code.

Only sessions that are sampled are available in RUM. For example, if the sampling rate is set to 60%, then 60% of all sessions and metrics (such as Core Web Vitals and usage numbers) are visible in RUM.

The random sampling is by session, not by user.

### The effect of sampling on data and metrics that are available in RUM
RUM metrics (such as Core Web Vitals and usage numbers) are calculated based on sessions that are sampled. For example, if the sampling rate is set to capture 60% of sessions, then the Core Web Vitals and total number of sessions are calculated based on 60% of those sessions. 

### Recommended sampling rate
In terms of setting an ideal sampling rate, it depends on the amount of traffic you see and the data you are looking for. Datadog recommends starting with a sampling rate you are comfortable with based on your budget and estimated traffic, then tweaking it based on the data you need. 

### Sampling based on specific attributes
Configuring sampling based on specific attributes, such as sampling 100% of sessions with errors and 5% otherwise, or only sampling sessions that go through the checkout flow, is not supported. If this feature is critical for your business needs, create a ticket with [Datadog Support][8].

### Changing the sampling rate in the Datadog RUM UI
Changing the sampling rate in the Datadog RUM UI is not supported. If this feature is critical for your business needs, create a ticket with [Datadog Support][8].

### Adjusting sampling during live outages

If a bug or incident occurs, you can increase sampling to collect 100% of your browser user traffic to ensure no session is missed. You need to deploy a code change to achieve this.

**Note**: This capability does not apply to mobile or Roku applications due to the long release cycle.

### Accounting for mobile devices that go offline or crash

RUM ensures availability of data when user devices are offline. In low-network areas, or when the device battery is too low, all RUM events are first stored on the local device in batches. They are sent as soon as the network becomes available, and the battery is high enough to ensure the RUM SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/guide/sampling-browser-plans/#overview
[2]: /real_user_monitoring/guide/sampling-browser-plans/#overview
[3]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tab=kotlin#initialization-parameters
[4]: /real_user_monitoring/ios/advanced_configuration/?tab=swift#sample-rum-sessions
[5]: /real_user_monitoring/reactnative/#initialize-the-library-with-application-context
[6]: /real_user_monitoring/mobile_and_tv_monitoring/setup/flutter/advanced_configuration/#sample-rum-sessions
[7]: /real_user_monitoring/mobile_and_tv_monitoring/setup/roku/#initialize-the-library
[8]: /help
[9]: /real_user_monitoring/guide/understanding-the-rum-event-hierarchy/#sessions
