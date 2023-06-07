---
title: Web Setup for Session Replay
kind: documentation
description: Describes how to setup Session Replay for web browsers
aliases:
further_reading:
    - link: '/real_user_monitoring/session_replay'
      tag: Documentation
      text: Session Replay
---

## Overview

Session Replay is available in the RUM Browser SDK. To start collecting data for Session Replay, set up [Datadog RUM Browser Monitoring][1] by creating a RUM application, generating a client token generation, and initializing the RUM Browser SDK. For setup in mobile environments, see [Mobile Session Replay](#mobile-session-replay).

<div class="alert alert-info">You must be on the latest version of the SDK (v3.6.0 or later)</div>

## Usage

The Session Replay does not start recording automatically when calling `init()`. To start the recording, call `startSessionReplayRecording()`. This can be useful to conditionally start the recording, for example, to only record authenticated user sessions:

```javascript
window.DD_RUM.init({
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
    window.DD_RUM.startSessionReplayRecording();
}
```

To stop the Session Replay recording, call `stopSessionReplayRecording()`.

## Disable Session Replay

To stop session recordings, remove `startSessionReplayRecording()` and set `sessionReplaySampleRate` to `0`. This stops collecting data for [Browser RUM & Session Replay plan][2], which includes replays.

[1]: /real_user_monitoring/browser/#setup
[2]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay