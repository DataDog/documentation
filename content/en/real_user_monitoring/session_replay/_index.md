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

Session Replay expands your user experience monitoring by allowing you to capture and visually replay the web browsing experience of your users. Combined with RUM performance data, Session Replay is beneficial for error identification, reproduction, and resolution, and provides insights into your web application’s usage patterns and design pitfalls.

The RUM Browser SDK is [open source][1] and leverages the open source [rrweb][2] project.

## Session Replay recorder

The Session Replay recorder is part of the RUM Browser SDK. The recorder takes a snapshot of the browser's DOM and CSS by tailing and recording events happening on a web page (such as DOM modification, mouse move, clicks, and input events) along with these events' timestamps.

Datadog then rebuilds the web page and re-applies the recorded events at the appropriate time in the replay view. Session Replay follows the same 30 day retention policy as normal RUM sessions.

The Session Replay recorder supports all browsers supported by the RUM Browser SDK with the exception of IE11. For more information, see the [browser support table][3].

To reduce Session Replay's network impact and ensure the Session Replay recorder has minimal overhead on your application's performance, Datadog compresses the data prior to sending it. Datadog also reduces the load on a browser’s UI thread by delegating most of the CPU-intensive work (such as compression) to a dedicated web worker. The expected network bandwidth impact is less than 100kB/min.

## Setup

Session Replay is available in the RUM Browser SDK. To start collecting data for Session Replay, set up [Datadog RUM Browser Monitoring][4] by creating a RUM application, generating a client token generation, and initializing the RUM Browser SDK.

<div class="alert alert-info">You must be on the latest version of the SDK (v3.6.0 or later)</div>

## Usage

The Session Replay does not start recording automatically when calling `init()`. To start the recording, call `startSessionReplayRecording()`. This can be useful to conditionally start the recording, for example, to only record authenticated user sessions:

```javascript
DD_RUM.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100, // if not included, the default is 100
  ...
});

if (user.isAuthenticated) {
    DD_RUM.startSessionReplayRecording();
}
```

To stop the Session Replay recording, call `stopSessionReplayRecording()`.

### Disable Session Replay

To stop session recordings, remove `startSessionReplayRecording()` and set `sessionReplaySampleRate` to `0`. This stops collecting data for [Browser RUM & Session Replay plan][5], which includes replays.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: https://www.rrweb.io/
[3]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[4]: /real_user_monitoring/browser/#setup
[5]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
