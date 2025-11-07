---
title: Browser Session Replay
description: Learn about how to capture and visually replay your users' web browsing experience with Session Replay.
further_reading:
- link: 'https://www.datadoghq.com/blog/session-replay-datadog/'
  tag: 'Blog'
  text: 'Use Datadog Session Replay to view real-time user journeys'
- link: 'https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/'
  tag: 'Blog'
  text: 'Use funnel analysis to understand and optimize key user flows'
- link: 'https://www.datadoghq.com/blog/zendesk-session-replay-integration/'
  tag: 'Blog'
  text: 'Visually replay user-facing issues with Zendesk and Datadog Session Replay'
- link: '/product_analytics/analytics_explorer'
  tag: 'Documentation'
  text: 'Visualize your Product Analytics data in the Analytics Explorer'
- link: '/integrations/content_security_policy_logs'
  tag: 'Documentation'
  text: 'Detect and aggregate CSP violations with Datadog'
---


## Overview

Session Replay expands your user experience monitoring by allowing you to capture and visually replay the web browsing experience of your users. Combined with RUM performance data, Session Replay is beneficial for error identification, reproduction, and resolution, and provides insights into your web application's usage patterns and design pitfalls.

The RUM Browser SDK is [open source][1] and leverages the open source [rrweb][2] project.

## How the Session Replay recorder works

The Session Replay recorder is part of the RUM Browser SDK. The recorder takes a snapshot of the browser's DOM and CSS by tailing and recording events happening on a web page (such as DOM modification, mouse move, clicks, and input events) along with these events' timestamps.

Datadog then rebuilds the web page and re-applies the recorded events at the appropriate time in the replay view. Session Replay follows the same 30 day retention policy as normal RUM sessions.

The Session Replay recorder supports all browsers supported by the RUM Browser SDK. For more information, see the [Browser Support table][3].

To reduce Session Replay's network impact and ensure the Session Replay recorder has minimal overhead on your application's performance, Datadog compresses the data prior to sending it. Datadog also reduces the load on a browser's UI thread by delegating most of the CPU-intensive work (such as compression) to a dedicated web worker. The expected network bandwidth impact is less than 100kB/min.

## Start monitoring Browser Session Replay

{{< whatsnext desc="This section includes the following topics:" >}}
  {{< nextlink href="/product_analytics/session_replay/setup_and_configuration">}}<u>Setup and Configuration</u>: Learn how to set up and configure Browser Session Replay including enabling recording, sampling configuration, and privacy controls.{{< /nextlink >}}
  {{< nextlink href="/product_analytics/session_replay/privacy_options">}}<u>Privacy Options</u>: Control and mask sensitive data in Session Replay recordings with privacy configuration options.{{< /nextlink >}}
  {{< nextlink href="/product_analytics/session_replay/browser/developer_tools">}}<u>Developer Tools</u>: Use browser developer tools to debug and inspect Session Replay recordings.{{< /nextlink >}}
  {{< nextlink href="/product_analytics/session_replay/browser/troubleshooting">}}<u>Troubleshooting</u>: Resolve common Browser Session Replay issues and errors.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: https://www.rrweb.io/
[3]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
