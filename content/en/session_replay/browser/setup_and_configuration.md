---
title: Browser Session Replay Setup and Configuration
description: Capture and visually replay your users' web browsing experience with Session Replay.
aliases:
- /real_user_monitoring/session_replay/browser/setup_and_configuration
- /product_analytics/session_replay/browser/setup_and_configuration
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


## Setup

To set up Session Replay for Browser:

### Step 1 - Set up the Browser SDK

Make sure you've set up the [RUM Browser SDK][1].

### Step 2 - Enable Session Replay

To enable Session Replay you have to specify the session replay sample rate. It must be a number between 0.0 and 100.0, where 0 indicates that no replays are recorded and 100 means that all sessions include a replay.

This sample rate is applied in addition to the RUM sample rate. For example, if RUM uses a sample rate of 80% and Session Replay uses a sample rate of 20%, it means that out of all user sessions, 80% are included in RUM, and within those sessions, only 20% have replays.
See [Browser RUM & Session Replay sessions][2] for more information.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
   ...
   sessionReplaySampleRate: 100,
   ...
});

```

{{% /tab %}}
{{% tab "CDN async" %}}

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

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
<script>
    window.DD_RUM && window.DD_RUM.init({
      ...
      sessionReplaySampleRate: 100,
      ...
    });
</script>
```

**Note**: Bellow version v5.0.0, Session Replay does not start automatically and you need to call [`startSessionReplayRecording()`][3] API

{{% /tab %}}
{{< /tabs >}}

## Additional configuration

### Start or stop the recording manually

By default, Session Replay starts recording automatically.
However, if you prefer to manually start recording at a specific point in your application, you can use the option `startSessionReplayRecordingManually` parameter as shown below, and later call [`startSessionReplayRecording()`][3].
You can also use [`stopSessionReplayRecording()`][4] to stop the recording at any time.

{{< tabs >}}
{{% tab "NPM" %}}

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

{{% /tab %}}
{{% tab "CDN async" %}}

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

{{% /tab %}}
{{% tab "CDN sync" %}}

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

{{% /tab %}}
{{< /tabs >}}

**Note**: In some scenarios, you may want to begin recording, even if it was initially sampled out of replay. To force Session Replay recording for the rest of the current session, call [`startSessionReplayRecording({ force: true })`][3]

### Privacy options

Session Replay provides privacy controls to ensure organizations of any scale do not expose sensitive or personal data.
See [Privacy Options][5].

### Connect Session Replay to your third-party tools

You can access the Session Replay URL to use in integrations, live from the browser where the session is taking place.
See [Connect Session Replay to your third-party tools][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/browser/setup/
[2]: /real_user_monitoring/guide/sampling-browser-plans/
[3]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumGlobal.html#startsessionreplayrecording
[4]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumGlobal.html#stopsessionreplayrecording
[5]: /session_replay/browser/privacy_options
[6]: /real_user_monitoring/guide/connect-session-replay-to-your-third-party-tools
