---
title: Log Explorer
kind: documentation
description: 'Search through all of your logs and perform Log Analytics'
aliases:
    - /logs/explore/livetail
further_reading:
    - link: 'logs/processing'
      tag: 'Documentation'
      text: 'Learn how to process your logs'
    - link: 'logs/explorer/side_panel'
      tag: 'Documentation'
      text: 'The log side panel'
    - link: 'logs/explorer#list-logs'
      tag: 'Documentation'
      text: 'The list view of logs'
---

## Overview

With the Live Tail access all your log events in near real time from anywhere in your infrastructure. 

The Live Tail view provides visibility on **all** logs, whether you choose to index them or not - see also [Exclusion Filters][1] on Logs Indexes. Logs flowing through the Live Tail are all structured, processed and enriched from [Log Pipelines][2].

[1]: /logs/indexes#exclusion-filters
[2]: /logs/processing

The Livetail is specifically useful, for instance, to check if a process has correctly started, or if a new deployment went smoothly.

## Live Tail View

Choose the Live Tail option in the timerange from the [Log Explorer][3] to query logs as they flow into Datadog.

{{< img src="logs/explorer/live_tail/livetail.gif" alt="Log Live Tail" style="width:100%;" >}}

Contrary to queries on indexed logs happening in the [Log Explorer][3], queries in the Live Tail do *not* require that you [declare a facet][4] beforehand.

[3]: /logs/explorer
[4]: /logs/explorer/facets/

*Note*. For the sake of readability, the Live Tail output is sampled when too many logs matching the query are flowing in. The sampling applied is uniformly random, so that your livetail logs are statistically representative of your actual log throughput. Scope your query down with additional search filters if you need visibility on every single log flowing in.    

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}



