---
title: Grouping Logs Into Patterns
description: 'Group queried logs into patterns.'
further_reading:
- link: 'logs/explorer/'
  tag: 'Documentation'
  text: 'Learn about the Log Explorer'
- link: 'logs/explorer/analytics'
  tag: 'Documentation'
  text: 'Learn how to analyze your logs'
- link: 'https://www.datadoghq.com/blog/filter-logs-by-subqueries-with-datadog/'
  tag: 'Blog'
  text: 'Filter and correlate logs dynamically using Subqueries'
- link: 'https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/'
  tag: 'Blog'
  text: 'Monitor DNS logs for network and security analysis'
---

## Overview

When aggregating indexed logs by **Patterns**, logs that have a `message` with similar structures are grouped altogether. Optionally, select one to three faceted fields to pre-aggregate your logs into groups before patterns are detected within these groupings.

The **Patterns** view is helpful for detecting and filtering noisy error patterns that could cause you to miss other issues. The pattern detection is based on 10,000 log samples. Refine your search to see patterns limited to a specific subset of logs.

{{< img src="logs/explorer/aggregations_patterns.png" alt="The logs explorer showing logs grouped by patterns" style="width:90%;" >}}

Patterns support the [List][1] visualization. Clicking a pattern in the list opens the pattern side panel from which you can:

- Access a sample of logs from that pattern
- Append the search filter to scope it down to logs from this pattern only
- Get a kickstart for a [grok parsing rule][2] to extract structured information logs of that pattern

{{< img src="logs/explorer/patterns_side_panel.jpg" alt="The log side panel with the view all button and the parsing rule highlighted" style="width:90%;" >}}

## Pattern Inspector

Use the Pattern Inspector to get a visual breakdown of the underlying values of a log pattern's aggregation based on your search query. 

{{< img src="logs/explorer/group/pattern_inspector_values.png" alt="The distribution of values graph showing a bar graph of the values" style="width:90%;" >}}

For example, if you are investigating an issue, you could see how many hosts are involved or what regions or data centers are impacted.

1. Navigate to the [Log Explorer][3].
2. Click **Patterns** in the **Group into** section. In the list of patterns, the aggregate values in the message section are highlighted in yellow. Hover over an aggregate value to get a preview of the visual distribution of its values. 
3. Click on an aggregate value to open the log pattern's side panel and see more details in the **Pattern Inspector** tab. 

{{< img src="logs/explorer/group/pattern_inspector_panel_1.png" alt="The pattern panel showing the Pattern Inspector tab" style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/visualize/#list-aggregates-of-logs
[2]: /logs/log_configuration/processors/#grok-parser
[3]: https://app.datadoghq.com/logs