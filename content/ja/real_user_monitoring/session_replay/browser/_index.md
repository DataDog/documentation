---
aliases:
- /ja/real_user_monitoring/guide/session-replay-getting-started/
- /ja/real_user_monitoring/session_replay/
description: Learn about how to capture and visually replay your users' web browsing
  experience with Session Replay.
further_reading:
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: Blog
  text: Use Datadog Session Replay to view real-time user journeys
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Use funnel analysis to understand and optimize key user flows
- link: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
  tag: Blog
  text: Visually replay user-facing issues with Zendesk and Datadog Session Replay
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualize your RUM data in the Explorer
- link: /integrations/content_security_policy_logs
  tag: Documentation
  text: Detect and aggregate CSP violations with Datadog
kind: documentation
title: Browser Session Replay
---

## Overview

Session Replay expands your user experience monitoring by allowing you to capture and visually replay the web browsing experience of your users. Combined with RUM performance data, Session Replay is beneficial for error identification, reproduction, and resolution, and provides insights into your web application's usage patterns and design pitfalls.

The RUM Browser SDK is [open source][1] and leverages the open source [rrweb][2] project.

## Session Replay recorder

The Session Replay recorder is part of the RUM Browser SDK. The recorder takes a snapshot of the browser's DOM and CSS by tailing and recording events happening on a web page (such as DOM modification, mouse move, clicks, and input events) along with these events' timestamps.

Datadog then rebuilds the web page and re-applies the recorded events at the appropriate time in the replay view. Session Replay follows the same 30 day retention policy as normal RUM sessions.

The Session Replay recorder supports all browsers supported by the RUM Browser SDK with the exception of IE11. For more information, see the [browser support table][3].

To reduce Session Replay's network impact and ensure the Session Replay recorder has minimal overhead on your application's performance, Datadog compresses the data prior to sending it. Datadog also reduces the load on a browser's UI thread by delegating most of the CPU-intensive work (such as compression) to a dedicated web worker. The expected network bandwidth impact is less than 100kB/min.

## セットアップ

Session Replay is available in the RUM Browser SDK. To start collecting data for Session Replay, set up [Datadog RUM Browser Monitoring][4] by creating a RUM application, generating a client token generation, and initializing the RUM Browser SDK. For setup in mobile environments, see [Mobile Session Replay][5].

<div class="alert alert-info">Session Replay is supported by SDK version 3.6.0 or later.</div>

## 使用方法

Starting with v5.0.0 of the RUM Browser SDK, the Session Replay starts recording automatically when calling `init()`. To conditionally start the recording, use the `startSessionReplayRecordingManually` init parameter and call `startSessionReplayRecording()`.

For example, to only record authenticated user sessions:

```javascript
window.DD_RUM.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  startSessionReplayRecordingManually: true,
  ...
});

if (user.isAuthenticated) {
    window.DD_RUM.startSessionReplayRecording();
}
```

To stop the Session Replay recording, call `stopSessionReplayRecording()`.

<div class="alert alert-warning">When using a version of the RUM Browser SDK older than v5.0.0, Session Replay recording does not begin automatically. Call <code>startSessionReplayRecording()</code> to begin recording.</div>

## Disable Session Replay

To stop session recordings, set `sessionReplaySampleRate` to `0`. This stops collecting data for the [Browser RUM & Session Replay plan][6].

<div class="alert alert-warning">If you're using a version of the RUM Browser SDK previous to v5.0.0, set <code>replaySampleRate</code> to <code>0</code>.</div>

## Retention

By default, Session Replay data is retained for 30 days.

To extend retention to 15 months, you can enable _Extended Retention_ on individual session replays. These sessions must be non-active (the user has completed their experience).

Extended Retention only applies to Session Replay and does not include associated events. The 15 months start when Extended Retention is enabled, not when the session is collected.

You can disable Extended Retention at any time. If the session replay is still within its default 30 days of retention, the replay expires at the end of the initial 30 day window. If you disable Extended Retention on a session replay that is older than 30 days, the replay immediately expires.

{{< img src="real_user_monitoring/session_replay/session-replay-extended-retention.png" alt="Enable extended retention" style="width:100%;" >}}

Refer to the below diagram to understand what data is retained with extended retention.

{{< img src="real_user_monitoring/session_replay/replay-extended-retention.png" alt="Diagram of what data is retained with extended retention" style="width:100%;" >}}

## Playback history

You can see who has watched a given session replay by clicking the **watched** count displayed on the player page. This feature allows you to check whether someone you'd like to share the recording with has already watched it.

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="Check who has watched a session's recording" style="width:100%;" >}}

The history includes only playbacks that occurred in the player page or in an embedded player, like in a [Notebook][8] or side panel. Included playbacks also generate an [Audit Trail][7] event. Thumbnail previews are not included in history.

To view your own playback history, check out the [My Watch History][9] playlist.

## Mobile Session Replay

Learn more about the [Session Replay for Mobile][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: https://www.rrweb.io/
[3]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[4]: /ja/real_user_monitoring/browser/
[5]: /ja/real_user_monitoring/session_replay/mobile/
[6]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[7]: https://docs.datadoghq.com/ja/account_management/audit_trail/
[8]: https://docs.datadoghq.com/ja/notebooks/
[9]: https://app.datadoghq.com/rum/replay/playlists/my-watch-history