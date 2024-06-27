---
title: Live Tail
kind: documentation
description: 'Search through all of your logs and perform Log Analytics'
aliases:
    - /logs/explore/livetail
    - /logs/live_tail
further_reading:
    - link: "/logs/log_configuration/processors"
      tag: 'Documentation'
      text: 'Learn how to process your logs'
    - link: 'logs/explorer/side_panel'
      tag: 'Documentation'
      text: 'The log side panel'
    - link: 'logs/explorer/#list-of-logs'
      tag: 'Documentation'
      text: 'The list view of logs'
---

## Overview

With Live Tail, access all your log events in near real time from anywhere in your infrastructure. The Live Tail view provides visibility on both indexed and non-indexed logs streaming to Datadog - see also [Exclusion Filters][1] on logs indexes. Logs flowing through the Live Tail are all structured, processed, and enriched from [Log Pipelines][2].

For example, Live Tail is specifically useful to check if a process has correctly started or if a new deployment went smoothly.

## Live Tail view

In the [Log Explorer][3], choose the Live Tail option in the timerange to query logs as they flow into Datadog. See [Log Search Syntax][4] for more information on queries.

{{< img src="logs/explorer/live_tail/livetail.mp4" alt="Log Live Tail" video=true style="width:100%;" >}}

Contrary to queries on indexed logs happening in the [Log Explorer][3], queries in the Live Tail do *not* require that you [declare a facet][5] beforehand. 

**Note**: For the sake of readability, the Live Tail output is sampled when too many logs matching the query are flowing in. The sampling applied is uniformly random, so that your Live Tail logs are statistically representative of your actual log throughput. Scope your query down with additional search filters if you need visibility on every single log flowing in.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/indexes#exclusion-filters
[2]: /logs/log_configuration/pipelines
[3]: /logs/explorer
[4]: /logs/explorer/search_syntax/
[5]: /logs/explorer/facets/
