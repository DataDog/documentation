---
title: Datadog WatchdogTM
kind: Documentation
description: Automatically detect potential application and infrastructure issues
aliases:
  - /tracing/watchdog
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Watchdog"
    tag: Release Notes
    text: Check out the latest Datadog Watchdog releases! (App login required).
  - link: "https://www.datadoghq.com/blog/datadog-bits-generative-ai/"
    tag: Blog
    text: Introducing Bits AI, your new DevOps copilot
  - link: /logs/
    tag: Documentation
    text: Collect your logs
  - link: /tracing/
    tag: Documentation
    text: Collect your traces
  - link: "https://www.datadoghq.com/blog/datadog-watchdog-automated-root-cause-analysis/"
    tag: Blog
    text: Automated root cause analysis with Watchdog RCA
  - link: "https://www.datadoghq.com/blog/watchdog-impact-analysis/"
    tag: Blog
    text: Understand user impact scope with Watchdog Impact Analysis
  - link: "https://www.datadoghq.com/blog/watchdog-live-processes/"
    tag: Blog
    text: Troubleshoot anomalies in workload performance with Watchdog Insights for Live Processes
algolia:
  tags: [watchdog]
cascade:
    algolia:
        rank: 70
---
## Overview

Watchdog is Datadog's AI engine, providing you with automated alerts, insights, and root cause analyses that draw from observability data across the entire Datadog platform. Watchdog continuously monitors your infrastructure and calls attention to the signals that matter most, helping you to detect, troubleshoot, and resolve issues. 

All Watchdog features come built-in, and do not require setup.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/781921620/rendition/1080p/file.mp4?loc=external&signature=8889419b739e3398d03a72edca4f96909144567e045d30deeb8f9345c43a682d" poster="/images/poster/watchdog.png" >}}

<br/>

### Proactive alerts

Watchdog proactively computes a baseline of expected behavior for your systems, applications, and deployments. This baseline is then used to detect anomalous behavior.

{{< whatsnext desc="">}}
  {{< nextlink href="/watchdog/alerts">}}<u>Watchdog Alerts</u>: How to view and interpret Watchdog Alerts: what information is provided by each alert, what alerts cover, and where to find Watchdog alerts throughout Datadog.{{< /nextlink >}}
  {{< nextlink href="/watchdog/faulty_deployment_detection">}}<u>Faulty Deployment Detection</u>: How Watchdog finds faulty code deployments.{{< /nextlink >}}
{{< /whatsnext >}}

To customize Watchdog algorithms:
  * [Anomaly Algorithm][7]
  * [Forecast Algorithm][8]
  * [Outlier Algorithm][9]

### Investigation assistance

To help investigation, Watchdog shows context-based insights in all explorers, searches for root causes, and determines user impact.

{{< whatsnext desc="">}}
  {{< nextlink href="/watchdog/insights">}}<u>Watchdog Insights</u>: Watchdog Insights is a recommendation engine that helps you identify and resolve issues.{{< /nextlink >}}
  {{< nextlink href="/watchdog/rca">}}<u>Root Cause Analysis</u>: How Watchdog Root Cause Analysis (RCA) finds the root cause of an anomaly, and how to use the information provided.{{< /nextlink >}}
  {{< nextlink href="/watchdog/impact_analysis">}}<u>Impact Analysis</u>: How Watchdog identifies when an anomaly adversely impacts users.{{< /nextlink >}}
{{< /whatsnext >}}

## Troubleshooting

Need help? Contact [Datadog support][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /watchdog/alerts
[3]: /watchdog/faulty_deployment_detection/
[4]: /watchdog/insights?tab=logmanagement
[5]: /watchdog/rca/
[6]: /watchdog/impact_analysis/
[7]: /monitors/types/anomaly/#anomaly-detection-algorithms
[8]: /monitors/types/forecasts/?tab=linear#algorithms
[9]: /monitors/types/outlier/?tab=dbscan#algorithms
