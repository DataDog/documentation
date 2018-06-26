---
title: Live Tail
kind: documentation
description: "See all your logs in real time."
further_reading:
- link: "logs/graph"
  tag: "Documentation"
  text: "Perform analytics with Log Graphs"
- link: "logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "logs/parsing"
  tag: "Documentation"
  text: Learn more about parsing
---


{{< img src="logs/live_tail/live_tail_demo.gif" alt="Live tail" responsive="true" popup="true">}}

## Overview

The Live Tail feature gives you the ability to see all your log events in near real time from anywhere in your infrastructure. It displays logs as soon as they get out of the [Pipeline section][1] and before [their indexation][2] by Datadog, hence: 

1. All logs ingested by Datadog are displayed. ([The dynamic volume control][2] is not applied.)
2. Logs display are parsed.
3. The stream can be paused.
4. You can't go back in the past.

This feature allows you for instance to check if a process has correctly started or if a new deployment went smoothly.

## Live tail view

Choose the `Live Tail` option in the time range selector to switch to the live tail view:

{{< img src="logs/live_tail/live_tail_time_selector.png" alt="Live tail time selector" responsive="true" popup="true">}}

The number of received events per second is displayed at the top left as well as the sampling rate: since a stream of thousands of logs per seconds is not human readable, **any stream of more than tens of logs per second is sampled**. 

Use the [live tail search bar filtering features](#filtering-the-log-stream) to filter the log stream and the **Pause/Play** button at the top right of the screen to pause or resume the stream.

**Note**: Selecting any log pauses the stream and displays more details about the selected log.

### Display Options

Customize the Live Tail view to better highlight the relevant information in your logs. 
Click on the gear at the top right of the page to activate one of the options below:

{{< img src="logs/live_tail/live_tail_column.png" alt="Live tail column" responsive="true" popup="true" style="width:30%;">}}

1. Choose to display one, three, or ten lines from your logs attributes in your logstream.
2. Enable/Disable the Date and Message column.
3. Add any log attribute as a column either in this panel or by clicking on them directly:

{{< img src="logs/live_tail/live_tail_add_as_column.png" alt="Live tail add as column" responsive="true" popup="true" style="width:50%;">}}

## Filtering the log Stream

A valid query into the search bar displays logs that match your search criteria. 
The search syntax is the same in the Live tail views as in the other Log views but here your query is matched against all of the ingested logs and not just the indexed one.

### JSON attributes

Any query that works in other views works in the Live tail view but you can even go further and **filter on attributes that are not defined as facets**.

For example, to filter on the following `filename` attribute there are two options:

{{< img src="logs/live_tail/live_tail_save.png" alt="Live tail save" responsive="true" popup="true" style="width:50%;">}}

1. Click on the attribute and add it to the search: 

    {{< img src="logs/live_tail/live_tail_click_attribute.png" alt="Live tail click attribute" responsive="true" popup="true" style="width:50%;">}}

2. Use the following query  `@filename:runner.go`:

    {{< img src="logs/live_tail/live_tail_filtered.png" alt="Live tail filtered" responsive="true" popup="true" style="width:50%;">}}

To filter on all logs with a line number above 150 use the following query: `@linenumber:>150`

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing
[2]: /logs/dynamic_colume_control
[3]: /logs/explore/#Search-bar
