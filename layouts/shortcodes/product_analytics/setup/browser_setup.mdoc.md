## Session Replay recorder

The Session Replay recorder is part of the RUM Browser SDK. The recorder takes a snapshot of the browser's DOM and CSS by tailing and recording events happening on a web page (such as DOM modification, mouse move, clicks, and input events) along with these events' timestamps.

Datadog then rebuilds the web page and re-applies the recorded events at the appropriate time in the replay view. Session Replay follows the same 30 day retention policy as normal RUM sessions.

The Session Replay recorder supports all browsers supported by the RUM Browser SDK. For more information, see the [Browser Support table][3].

To reduce Session Replay's network impact and ensure the Session Replay recorder has minimal overhead on your application's performance, Datadog compresses the data prior to sending it. Datadog also reduces the load on a browser's UI thread by delegating most of the CPU-intensive work (such as compression) to a dedicated web worker. The expected network bandwidth impact is less than 100kB/min.

## Setup

Session Replay is available in the RUM Browser SDK. To start collecting data for Session Replay, set up [Datadog RUM Browser Monitoring][4] by creating a RUM application, generating a client token generation, and initializing the RUM Browser SDK. For setup in mobile environments, see [Mobile Session Replay][5].

{% alert type="info" %}
Session Replay is supported by SDK version 3.6.0 or later.
{% /alert %}

## Usage

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

{% alert type="warning" %}
When using a version of the RUM Browser SDK older than v5.0.0, Session Replay recording does not begin automatically. Call <code>startSessionReplayRecording()</code> to begin recording.
{% /alert %}

## Disable Session Replay

To stop session recordings, set `sessionReplaySampleRate` to `0`. This stops collecting data for the [Browser RUM & Session Replay plan][6].

{% alert type="warning" %}
If you're using a version of the RUM Browser SDK previous to v5.0.0, set <code>replaySampleRate</code> to <code>0</code>.
{% /alert %}

## Playback history

You can see who has watched a given session replay by clicking the **watched** count displayed on the player page. This feature allows you to check whether someone you'd like to share the recording with has already watched it.

{% img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="Check who has watched a session's recording" style="width:100%;" /%}

The history includes only playbacks that occurred in the player page or in an embedded player, like in a [Notebook][8] or side panel. Included playbacks also generate an [Audit Trail][7] event. Thumbnail previews are not included in history.

To view your own playback history, check out the [My Watch History][9] playlist.

[1]: https://github.com/DataDog/browser-sdk
[2]: https://www.rrweb.io/
[3]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[4]: /real_user_monitoring/browser/
[5]: /real_user_monitoring/session_replay/mobile/
[6]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[7]: https://docs.datadoghq.com/account_management/audit_trail/
[8]: https://docs.datadoghq.com/notebooks/
[9]: https://app.datadoghq.com/rum/replay/playlists/my-watch-history
