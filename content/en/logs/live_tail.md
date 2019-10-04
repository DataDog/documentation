---
title: Live Tail
kind: documentation
description: "See all your logs in real time."
further_reading:
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
---

{{< img src="logs/live_tail/live_tail_demo.mp4" alt="Live tail" video="true" responsive="true" >}}

## Overview

The Live Tail feature gives you the ability to see all your log events in near real time from anywhere in your infrastructure. It displays logs as soon as they get out of the [Pipeline section][1] and before they are [indexed][2] by Datadog, hence:

1. All logs ingested by Datadog are displayed. ([It's Logging without Limits][2]*)
2. Displayed logs have been processed.
3. The stream can be paused.
4. You can't go back in time.

This feature allows you, for instance, to check if a process has correctly started, or if a new deployment went smoothly.

## Live Tail view

Choose the `Live Tail` option in the time range selector to switch to the Live Tail view:

{{< img src="logs/live_tail/live_tail_time_selector.png" alt="Live Tail time selector" responsive="true" >}}

The number of received events per second is displayed at the top left, as well as the sampling rate. Since a stream of thousands of logs per second is not human readable, high throughput log streams are sampled.

Use the [Live Tail search bar filtering features](#filtering-the-log-stream) to filter the log stream and the **Pause/Play** button at the top right of the screen to pause or resume the stream.

**Note**: Selecting any log pauses the stream and displays more details about the selected log.

### Display Options

Customize the Live Tail view to better highlight the relevant information in your logs.
Click on the gear at the top right of the page to activate one of the options below:

{{< img src="logs/live_tail/live_tail_column.png" alt="Live tail column" responsive="true" style="width:30%;">}}

1. Choose to display one, three, or ten lines from your logs attributes in your logstream.
2. Enable/Disable the Date and Message column.
3. Add any log attribute as a column either in this panel or by clicking on it directly:

{{< img src="logs/live_tail/live_tail_add_as_column.png" alt="Live tail add as column" responsive="true" style="width:50%;">}}

## Filtering the log Stream

A valid query in the search bar displays logs that match your search criteria.
The search syntax is the same in the Live Tail views as in the other Log views, but here, your query is matched against all of the ingested logs and not just the indexed ones.

### JSON attributes

Any query that works in other views works in the Live Tail view, but you can even go further and **filter on attributes that are not defined as facets**.

For example, to filter on the following `filename` attribute there are two options:

{{< img src="logs/live_tail/live_tail_save.png" alt="Live tail save" responsive="true" style="width:50%;">}}

1. Click on the attribute and add it to the search:

    {{< img src="logs/live_tail/live_tail_click_attribute.png" alt="Live tail click attribute" responsive="true" style="width:50%;">}}

2. Use the following query  `@filename:runner.go`:

    {{< img src="logs/live_tail/live_tail_filtered.png" alt="Live tail filtered" responsive="true" style="width:50%;">}}

To filter on all logs with a line number above 150 use the following query: `@linenumber:>150`

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: /logs/processing/pipelines
[2]: /logs
