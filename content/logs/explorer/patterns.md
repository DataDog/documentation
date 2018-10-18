---
title: Log Patterns (Beta)
kind: documentation
description: "Spot Log Patterns"
aliases:
  - /logs/patterns
further_reading:
- link: "https://www.datadoghq.com/blog/log-patterns/"
  tag: "Blog"
  text: "Log Patterns: Automatically cluster your logs for faster investigation"
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/explorer/saved_views"
  tag: "Documentation"
  text: "Automatically configure your Log Explorer"
---

## Overview

Investigating large volumes of log data can be time consuming: you can spend hours on them and still understand only a fraction of them. However, application logs often look the same with some fraction of them varying. These are what we call *patterns*.

In the Log Explorer, patterns can be surfaced automatically to bring structure to the problem and help you quickly see what matters—exclude what's irrelevant.

{{< img src="logs/explorer/patterns/log_patterns_nav.png" alt="Navigate to Log Patterns" responsive="true" style="width:50%;">}}

The patterns view is helpful for detecting and filtering noisy error patterns that might cause you to miss other issues. It shows the number of logs matching a pattern, split by service and status.

## See log trends and newcomers over time

Switch to the patterns view to automatically see your log patterns for the selected context. A [context][1] is composed of a time range and a search query.

**Note**: The pattern detection is based on 10,000 log samples. Refine the search to see patterns limited to a specific subset of logs:

{{< img src="logs/explorer/log_patterns.png" alt="Log Patterns" responsive="true" style="width:90%;">}}

Sections of the logs that vary within the pattern are highlighted to help you quickly identify differences across log lines.

## Sample logs related to a pattern

Click on a pattern to see underlying log samples:

{{< img src="logs/explorer/patterns/sample_logs_related_to_pattern.gif" alt="Log Patterns" responsive="true" style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/#context
