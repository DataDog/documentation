---
title: There are too many lines on my graph, can I only display the most important ones?
kind: faq
---

## Problem

When using a grouped query there are sometimes too many lines displayed on the graph, and you might end up with something not easy to read e.g.:

{{< img src="graphing/faq/too_many_metrics_1.png" alt="too_many_metrics_1" responsive="true" >}}

... where you only need to focus on the hosts with high load values here.

## Solution

The top function is a good fit to display only the few relevant lines on the graph:

{{< img src="graphing/faq/too_many_metrics_2.png" alt="too_many_metrics_2" responsive="true" >}}

[Find more documentation about the top function, its parameters and its aliases][1]

[1]: /graphing/miscellaneous/functions
