---
title: Log Patterns (Beta)
kind: documentation
description: "Spot Log Patterns"
aliases:
  - /logs/patterns
further_reading:
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "logs/explorer/saved_views"
  tag: Documentation
  text: Automatically configure your Log Explorer
---

## Overview

Investigating into large volumes of logs is time consuming, you can spend hours in it and still understand a fraction of it. However, applicative logs often look the same with some fraction of it varying; these what we call patterns.

In the Log Explorer, Patterns can be surfaced automatically to bring structure to the problem and help you to quickly see what matters or exclude what's pollute the general understanding.


{{< img src="logs/explorer/patterns/log_patterns_nav.png" alt="Navigate to Log Patterns" responsive="true" style="width:50%;">}}

The Patterns view makes it very helpful to detect error pattern that could be hidden by a noisy recurring error. It shows the number of logs matching a pattern splitted by service and status.

## See log trends and newcomers over time

Switch to the Pattern view to automatically see your log patterns for the selected context (timeframe and search query).

**Note**: The pattern detection is based on 10,000 log samples. Refine the search to see patterns limited to a specific subset of logs:

{{< img src="logs/explorer/log_patterns.png" alt="Log Patterns" responsive="true" style="width:90%;">}}

Section of the logs that varies within the pattern are highlighted to quickly identify the variation across logs within a pattern.

## Sample logs related to a pattern

Click on a pattern to see underlying log samples:

{{< img src="logs/explorer/patterns/sample_logs_related_to_pattern.gif" alt="Log Patterns" responsive="true" style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}