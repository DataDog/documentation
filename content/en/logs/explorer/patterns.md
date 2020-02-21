---
title: Log Patterns
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

{{< img src="logs/explorer/patterns/log_patterns_nav.png" alt="Navigate to Log Patterns"  style="width:50%;">}}

The patterns view is helpful for detecting and filtering noisy error patterns that might cause you to miss other issues. It shows the number of logs matching a pattern, split by service and status.

## See log trends and newcomers over time

Switch to the patterns view to automatically see your log patterns for the selected context. A [context][1] is composed of a time range and a search query. Each pattern comes with highlights, to get you straight to its characteristic features:

* A mini graph displays a rough timeline for the volume of its logs, to help you identify how that pattern differs from other patterns.
* Sections of logs that vary within the pattern are highlighted to help you quickly identify differences across log lines.

Click on a pattern to see a sample of underlying logs, and eventually display one single log.

{{< img src="logs/explorer/patterns/patterns_overview.mp4" alt="Log Patterns" video="true"  width="90%" >}}

**Note**: The pattern detection is based on 10,000 log samples. Refine the search to see patterns limited to a specific subset of logs.

## Pattern Actions

{{< img src="logs/explorer/patterns/patterns_action.png" alt="Log Patterns Actions"  style="width:80%;">}}

Selecting a pattern opens a contextual panel that displays a sample of underlying logs. Three buttons are available in the top-right corner:

* **Parsing Rule**: See an automatically generated parsing rule associated to this pattern (see screenshot below).
* **View All**: View all logs matching the pattern query.
* **Graph**: Graph the evolution of this pattern over time.

{{< img src="logs/explorer/patterns/patterns_parsing.png" alt="Log Patterns Parsing Rules"  style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/#context
