## Setup

{% alert type="info" %}
Session Replay is supported by SDK version 3.6.0 or later.
{% /alert %}

### Install the Android SDK

Make sure you've set up the [Browser SDK][6].

### Enable session replay

To enable session replay initialize the Browser SDK with sessionReplaySampleRate. Example:

```javascript
window.DD_RUM.init({
  ...
  sessionReplaySampleRate: 100,
  ...
});
```

{% alert type="warning" %}
When using a version of the RUM Browser SDK older than v5.0.0, Session Replay recording does not begin automatically. Call <code>startSessionReplayRecording()</code> to begin recording.
{% /alert %}

To stop the Session Replay recording, call `stopSessionReplayRecording()`.


## Disable Session Replay

To stop session recordings, set `sessionReplaySampleRate` to `0`. This stops collecting data for the [Browser RUM & Session Replay plan][2].

{% alert type="warning" %}
If you're using a version of the RUM Browser SDK previous to v5.0.0, set <code>replaySampleRate</code> to <code>0</code>.
{% /alert %}

## Playback history

You can see who has watched a given session replay by clicking the **watched** count displayed on the player page. This feature allows you to check whether someone you'd like to share the recording with has already watched it.

{% img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="Check who has watched a session's recording" style="width:100%;" /%}

The history includes only playbacks that occurred in the player page or in an embedded player, like in a [Notebook][4] or side panel. Included playbacks also generate an [Audit Trail][3] event. Thumbnail previews are not included in history.

To view your own playback history, check out the [My Watch History][5] playlist.

[1]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[2]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[3]: https://docs.datadoghq.com/account_management/audit_trail/
[4]: https://docs.datadoghq.com/notebooks/
[5]: https://app.datadoghq.com/rum/replay/playlists/my-watch-history
[6]: /client_sdks/setup