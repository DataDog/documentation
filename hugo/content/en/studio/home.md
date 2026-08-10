---
title: Home page and signals
description: Understand the signals Datadog Studio surfaces on the home page and how to start an investigation from one.
---

## Overview

The home page is the first thing you see when you open Datadog Studio. Instead of an empty search bar, it shows *signals*: short, plain-language summaries of what changed in your app, generated automatically by Studio's [Loops][1].

Loops run in the background and watch your app's traffic patterns, user activity, and errors. When a Loop finds something worth your attention, it posts a signal card to the home page. Each card includes:

- A summary of what changed, such as a dip in a key event or a spike in errors.
- The time frame the change occurred in.
- The Loop that produced the signal.

Because signals come from Loops, the home page reflects whichever Loops you have enabled. Studio ships with out-of-the-box Loops turned on, and any Loop you create yourself also delivers its results here.

## Start an investigation from a signal

Signal cards are a starting point, not a dead end. To investigate a signal:

1. On the home page, select the signal card you want to look into.
2. [Bits AI][2] opens an investigation and starts pulling in related data across logs, error events, and user activity to determine what went wrong.
3. Continue working while the investigation runs. You can close the investigation panel to free up space; the investigation keeps running in the background.
4. Return to the investigation to see what Bits found, including the evidence behind each claim.

For a full walkthrough that starts from a home page signal and ends with a fix, see [Investigate an issue from a signal][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /studio/loops/
[2]: /studio/bits_ai/
[3]: /studio/guide/investigate_an_issue/
