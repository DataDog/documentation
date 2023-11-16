---
title: Configure Your Setup For Browser RUM and Browser RUM & Session Replay Sampling
kind: guide
description: Learn how to customize your Browser RUM and Browser RUM & Session Replay sampling configuration.
aliases:
- /real_user_monitoring/guide/sampling-browser-and-browser-premium/
further_reading:
- link: '/real_user_monitoring/browser/'
  tag: 'Documentation'
  text: 'Learn about RUM Browser Monitoring'
---

## Overview

When instrumenting a [Browser RUM application][1], set the sample rate for the total amount of user sessions you want to collect and the percentage of user sessions collected that include [Browser RUM & Session Replay][2] capabilities.

This guide provides an example of how to customize the amount of Browser RUM & Session Replay sessions you want to collect from the total amount of user sessions in Datadog.

## Setup

The `sessionReplaySampleRate` parameter is a percentage of `sessionSampleRate`.

This feature requires the Datadog Browser SDK v3.0.0+.

<blockquote class="alert alert-info">
The Datadog Browser SDK v4.20.0 introduces the <code>sessionReplaySampleRate</code> initialization parameter, deprecating the <code>premiumSampleRate</code> and <code>replaySampleRate</code> initialization parameter.
</blockquote>
<blockquote class="alert alert-info">
The Datadog Browser SDK v5.0.0 introduces two major behavior changes:

- Only sessions that have recorded a replay are considered as Browser RUM & Session Replay
- The <code>sessionReplaySampleRate</code> initialization parameter default value is `0` . Previous versions of the SDK use `100`.
</blockquote>
When a session is created, RUM tracks it as either:

- [**Browser RUM**][2]: Sessions, views, actions, resources, long tasks, and errors are collected.
- [**Browser RUM & Session Replay**][2]: Everything from Browser RUM is collected, including replay recordings.

Two initialization parameters are available to control how the session is tracked:

- `sessionSampleRate` controls the percentage of overall sessions being tracked. It defaults to `100%`, so every session is tracked by default.
- `sessionReplaySampleRate` is applied **after** the overall sample rate, and controls the percentage of sessions tracked as Browser RUM & Session Replay. From Datadog Browser SDK v5.0.0, it defaults to `0`, so no session is tracked as Browser RUM & Session Replay by default.

To track 100% of your sessions as Browser RUM:

<details open>
  <summary>Latest version</summary>

```
datadogRum.init({
    ....
    sessionSampleRate: 100,
    sessionReplaySampleRate: 0
});
```

</details>

<details>
  <summary>before<code>v4.30.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    sessionReplaySampleRate: 0
});
```

</details>

<details>
  <summary>before<code>v4.20.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    premiumSampleRate: 0
});
```

</details>

<details>
  <summary>before<code>v4.10.2</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    replaySampleRate: 0
});
```

</details>

To track 100% of your sessions as Browser RUM & Session Replay:

<details open>
  <summary>Latest version</summary>

```
datadogRum.init({
    ....
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100
});
```

</details>

<details>
  <summary>before<code>v4.30.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    sessionReplaySampleRate: 100
});
```

</details>

<details>
  <summary>before<code>v4.20.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    premiumSampleRate: 100
});
```

</details>


<details>
  <summary>before<code>v4.10.2</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 100,
    replaySampleRate: 100
});
```

</details>

Use the slider to set the percentage of Browser RUM & Session Replay sessions collected from the percentage of total user sessions collected for your application.

{{< img src="real_user_monitoring/browser/example-initialization-snippet.mp4" alt="Example initialization snippet for a browser application with custom percentages" video="true" width="100%" >}}

If you set `sessionSampleRate` to 60 and `sessionReplaySampleRate` to 50, 40% of sessions are dropped, 30% of sessions are collected as Browser RUM, and 30% of sessions are collected as Browser RUM & Session Replay.

<details open>
  <summary>Latest version</summary>

```
datadogRum.init({
    ....
    sessionSampleRate: 60,
    sessionReplaySampleRate: 50
});
```

</details>

<details>
  <summary>before<code>v4.30.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 60,
    sessionReplaySampleRate: 50
});
```

</details>

<details>
  <summary>before<code>v4.20.0</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 60,
    premiumSampleRate: 50
});
```

</details>

<details>
  <summary>before<code>v4.10.2</code></summary>

```
datadogRum.init({
    ....
    sampleRate: 60,
    replaySampleRate: 50
});
```

</details>

From v5.0.0, to track 100% of the sessions that reach a custom state as Browser RUM & Session Replay:

```
datadogRum.init({
    ....
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    startSessionReplayRecordingManually: true,
});

// when the custom state is reached
datadogRum.startSessionReplayRecording()
```

With the use of `startSessionReplayRecordingManually: true`, sessions that do not call `startSessionReplayRecording()` are considered as Browser RUM.

For more information about tagging and exploring attributes, see [Browser Monitoring][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser#setup
[2]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[3]: /real_user_monitoring/browser#tagging
