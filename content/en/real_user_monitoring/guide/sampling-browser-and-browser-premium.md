---
title: Configure Your Setup For Browser and Browser Premium Sampling
kind: guide
description: Learn how to customize your Browser and Browser Premium sampling configuration.
further_reading:
- link: '/real_user_monitoring/browser/'
  tag: 'Documentation'
  text: 'Learn about RUM Browser Monitoring'
---

## Overview

When instrumenting a [browser RUM application][1], set the sample rate for the total amount of user sessions you want to collect and the percentage of user sessions collected that include [Browser Premium][2] capabilities.  

Browser Premium sessions include resources, long tasks, and replay recordings. This guide provides an example of how to customize the amount of Browser Premium sessions you want to collect from the total amount of user sessions in Datadog.

## Setup

The `premiumSampleRate` parameter is a percentage of `sampleRate`. 

This feature requires the Datadog Browser SDK v3.0.0+.

<blockquote class="alert alert-info">
The Datadog Browser SDK v4.10.2 introduces the <code>premiumSampleRate</code> initialization parameter, deprecating the <code>replaySampleRate</code> initialization parameter.
</blockquote>

When a session is created, RUM tracks it as either:

- [**Browser RUM**][2]: Only sessions, views, actions, and errors are collected. Calls to `startSessionReplayRecording()` are ignored.
- [**Browser Premium**][2]: Everything from Browser is collected, including resources, long tasks, and replay recordings. To collect replay recordings, call `startSessionReplayRecording()`.

Two initialization parameters are available to control how the session is tracked:

- `sampleRate` controls the percentage of overall sessions being tracked. It defaults to `100%`, so every session is tracked by default.
- `premiumSampleRate` is applied **after** the overall sample rate, and controls the percentage of sessions tracked as Browser Premium. It defaults to `100%`, so every session is tracked as Browser Premium by default.

To track 100% of your sessions as Browser:

<details open>
  <summary>Latest version</summary>

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

To track 100% of your sessions as Browser Premium:

<details open="false">
  <summary>Latest version</summary>

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

Use the slider to set the percentage of Browser RUM Premium sessions collected from the percentage of total user sessions collected for your application.

{{< img src="real_user_monitoring/browser/example-initialization-snippet.mp4" alt="Example initialization snippet for a browser application with custom percentages" video="true" width="100%" >}}

If you set `sampleRate` to 60 and `premiumSampleRate` to 50, 40% of sessions are dropped, 30% of sessions are collected as Browser, and 30% of sessions are collected as Browser Premium.

<details open>
  <summary>Latest version</summary>

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

For more information about tagging and exploring attributes, see [Browser Monitoring][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser#setup
[2]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[3]: /real_user_monitoring/browser#tagging
