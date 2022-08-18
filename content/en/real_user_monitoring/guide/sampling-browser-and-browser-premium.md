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

The `premiumSampleRate` parameter is a percentage of `sampleRate`. Use the slider to set the percentage of Browser RUM Premium sessions collected from the percentage of total user sessions collected for your application.

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
[3]: /real_user_monitoring/browser#browser-and-browser-premium-sampling-configuration
