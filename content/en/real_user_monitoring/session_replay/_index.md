---
title: Session Replay
kind: documentation
description: Learn about how to capture and visually replay your users' web browsing experience with Session Replay.
aliases:
- /real_user_monitoring/guide/session-replay-getting-started/
further_reading:
- link: 'https://www.datadoghq.com/blog/session-replay-datadog/'
  tag: 'Blog'
  text: 'Use Datadog Session Replay to view real-time user journeys'
- link: 'https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/'
  tag: 'Blog'
  text: 'Use funnel analysis to understand and optimize key user flows'
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the Explorer'
---

## Overview

Session Replay expands your user experience monitoring by allowing you to capture and visually replay the web browsing experience of your users. Combined with RUM performance data, Session Replay is beneficial for error identification, reproduction, and resolution, and provides insights into your web application's usage patterns and design pitfalls.

The RUM Browser SDK is [open source][1] and leverages the open source [rrweb][2] project.

## Session Replay recorder

The Session Replay recorder is part of the RUM Browser SDK. The recorder takes a snapshot of the browser's DOM and CSS by tailing and recording events happening on a web page (such as DOM modification, mouse move, clicks, and input events) along with these events' timestamps.

Datadog then rebuilds the web page and re-applies the recorded events at the appropriate time in the replay view. Session Replay follows the same 30 day retention policy as normal RUM sessions.

The Session Replay recorder supports all browsers supported by the RUM Browser SDK with the exception of IE11. For more information, see the [browser support table][3].

To reduce Session Replay's network impact and ensure the Session Replay recorder has minimal overhead on your application's performance, Datadog compresses the data prior to sending it. Datadog also reduces the load on a browser's UI thread by delegating most of the CPU-intensive work (such as compression) to a dedicated web worker. The expected network bandwidth impact is less than 100kB/min.

## Web Setup

Learn more about the [Web Setup for Session Replay][4].
## Mobile Setup

Learn more about the [Mobile Setup for Session Replay][5].
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: https://www.rrweb.io/
[3]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[4]: /real_user_monitoring/session_replay/web
[5]: /real_user_monitoring/session_replay/mobile