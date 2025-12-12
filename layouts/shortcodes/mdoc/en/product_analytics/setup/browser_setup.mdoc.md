To set up Session Replay for Browser:

### Step 1 - Set up the Browser SDK

Make sure you've set up the [RUM Browser SDK][100].

### Step 2 - Enable Session Replay

To enable Session Replay you have to specify the session replay sample rate. It must be a number between 0.0 and 100.0, where 0 indicates that no replays are recorded and 100 means that all sessions include a replay.

This sample rate is applied in addition to the RUM sample rate. For example, if RUM uses a sample rate of 80% and Session Replay uses a sample rate of 20%, it means that out of all user sessions, 80% are included in RUM, and within those sessions, only 20% have replays.
See [Browser RUM & Session Replay sessions][101] for more information.

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
   ...
   sessionReplaySampleRate: 100,
   ...
});

```

{% /tab %}
{% tab label="CDN async" %}

```javascript
<script>
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      ...
      sessionReplaySampleRate: 100,
      ...
    });
  })
</script>
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
<script>
    window.DD_RUM && window.DD_RUM.init({
      ...
      sessionReplaySampleRate: 100,
      ...
    });
</script>
```

**Note**: Below version v5.0.0, Session Replay does not start automatically and you need to call [`startSessionReplayRecording()`][102] API

{% /tab %}
{% /tabs %}

## Additional configuration

### Start or stop the recording manually

By default, Session Replay starts recording automatically.
However, if you prefer to manually start recording at a specific point in your application, you can use the option `startSessionReplayRecordingManually` parameter as shown below, and later call [`startSessionReplayRecording()`][102].
You can also use [`stopSessionReplayRecording()`][103] to stop the recording at any time.

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
   ...
   startSessionReplayRecordingManually: true,
   ...
});

datadogRum.startSessionReplayRecording()
// Do something
datadogRum.stopSessionReplayRecording()
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
<script>
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...
        startSessionReplayRecordingManually: true,
        ...
    });

    window.DD_RUM.startSessionReplayRecording()
    // Do something
    window.DD_RUM.stopSessionReplayRecording()
  })
</script>
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
<script>
    window.DD_RUM && window.DD_RUM.init({
        ...
        startSessionReplayRecordingManually: true,
        ...
    });

    window.DD_RUM && window.DD_RUM.startSessionReplayRecording();
    // Do something
    window.DD_RUM && window.DD_RUM.stopSessionReplayRecording();
</script>
```

{% /tab %}
{% /tabs %}

**Note**: In some scenarios, you may want to begin recording, even if it was initially sampled out of replay. To force Session Replay recording for the rest of the current session, call [`startSessionReplayRecording({ force: true })`][102]

### Privacy options

Session Replay provides privacy controls to ensure organizations of any scale do not expose sensitive or personal data.
See [Privacy Options][104].

### Connect Session Replay to your third-party tools

You can access the Session Replay URL to use in integrations, live from the browser where the session is taking place.
See [Connect Session Replay to your third-party tools][105].

[100]: /real_user_monitoring/browser/setup/
[101]: /real_user_monitoring/guide/sampling-browser-plans/
[102]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumGlobal.html#startsessionreplayrecording
[103]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumGlobal.html#stopsessionreplayrecording
[104]: /real_user_monitoring/session_replay/privacy_options
[105]: /real_user_monitoring/guide/connect-session-replay-to-your-third-party-tools