---
title: Browser Monitoring Client-Side Setup
description: "Set up RUM Browser SDK using client-side instrumentation with NPM or CDN to monitor user experience, performance, and errors in web applications."
aliases:
  - /real_user_monitoring/setup
  - /real_user_monitoring/browser/setup/client
further_reading:
- link: '/real_user_monitoring/application_monitoring/browser/advanced_configuration/'
  tag: 'Documentation'
  text: 'Advanced configuration'
- link: '/session_replay/browser/'
  tag: 'Documentation'
  text: 'Setup Session Replay'
- link: '/real_user_monitoring/error_tracking/browser/'
  tag: 'Documentation'
  text: 'Setup Error tracking'
- link: '/real_user_monitoring/correlate_with_other_telemetry/'
  tag: 'Documentation'
  text: 'Correlate RUM Events with Other Telemetry'
---

## Overview

The Datadog Browser SDK enables Real User Monitoring (RUM) for your web applications, providing comprehensive visibility into user experience and application performance. With RUM, you can monitor page load times, user interactions, resource loading, and application errors in real-time.

RUM helps you:

- Monitor user experience with detailed performance metrics for page loads, user actions, and resource requests
- Track user journeys through your application with Session Replay capabilities
- Identify performance bottlenecks and correlate frontend and backend performance with APM traces

The Browser SDK supports all modern desktop and mobile browsers and provides automatic collection of key performance metrics, user interactions, and application errors. After setup, you can manage your RUM configurations per application in Datadog and visualize the collected data in dashboards and the RUM Explorer.

## Setup

To start collecting RUM data, [set up the Datadog Browser SDK](/client_sdks/setup/?sdk=browser).

## Sample RUM sessions

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while initializing the Browser SDK. For example, to sample 80% of sessions, set `sessionSampleRate` to 80:

```javascript
datadogRum.init({
  applicationId: '<APP_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  sessionSampleRate: 80,
  sessionReplaySampleRate: 20,
  // ... other configuration options
});
```

For more information, see [Browser RUM & Session Replay Sampling][4].

## Visualize your data

After you've completed the basic setup for RUM, your application is collecting browser errors and you can start monitoring and debugging issues in real-time.

Visualize the [data collected][8] in [dashboards][9] or create a search query in the [RUM Explorer][10].

Your application appears as pending on the Applications page until Datadog starts receiving data.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[4]: /real_user_monitoring/guide/sampling-browser-plans/
[8]: /real_user_monitoring/application_monitoring/browser/data_collected/
[9]: /real_user_monitoring/platform/dashboards/
[10]: https://app.datadoghq.com/rum/sessions
