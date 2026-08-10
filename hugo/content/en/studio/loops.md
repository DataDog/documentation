---
title: Loops
description: Use Loops in Datadog Studio to run background automations that watch your app and surface notable changes.
---

## Overview

Loops are background automations that watch your app on your behalf. A Loop runs on a schedule and looks for a change you care about. When it finds something worth your attention, it posts a [signal][1] to the Studio home page.

Loops replace the setup work that monitoring usually requires. You don't configure a monitor, define thresholds, or build a dashboard: you describe what to watch in plain language and Studio handles the rest.

## Out-of-the-box Loops

Studio ships with a set of Loops turned on by default. These Loops watch your app's user activity and traffic and surface notable changes. They generate the signals you see on the home page when you first open Studio.

## Create your own Loop

Create a Loop by asking [Bits AI][2] in plain language. Describe what to watch, how often, and what should get your attention. For example:

```text
Watch errors on the AI Suggestions feature weekly, and let me know if the error rate spikes.
```

Bits creates the Loop, sets it to the cadence you asked for, and delivers its results to the home page.

A good Loop request includes:

- **What to watch**: a feature, an error type, an event, or a user segment.
- **How often to check**: for example, hourly, daily, or weekly.
- **What counts as notable**: for example, an error rate spike or a drop in successful events.

## Manage your Loops

The Loops page lists every Loop in your workspace, both the out-of-the-box Loops and the ones you create. From this page, you can review what each Loop watches and turn Loops on or off.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /studio/home/
[2]: /studio/bits_ai/
