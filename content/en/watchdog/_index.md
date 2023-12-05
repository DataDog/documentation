---
title: Datadog Watchdog™
kind: Documentation
description: Automatically detect potential application and infrastructure issues
aliases:
  - /tracing/watchdog
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Watchdog"
    tag: "Release Notes"
    text: "Check out the latest Datadog Watchdog releases! (App login required)."
  - link: "https://www.datadoghq.com/blog/datadog-bits-generative-ai/"
    tag: "Blog"
    text: "Introducing Bits AI, your new DevOps copilot"
  - link: "/logs/"
    tag: "Documentation"
    text: "Collect your logs"
  - link: "/tracing/"
    tag: "Documentation"
    text: "Collect your traces"
  - link: "https://www.datadoghq.com/blog/datadog-watchdog-automated-root-cause-analysis/"
    tag: "Blog"
    text: "Automated root cause analysis with Watchdog RCA"
  - link: "https://www.datadoghq.com/blog/watchdog-impact-analysis/"
    tag: "Blog"
    text: "Understand user impact scope with Watchdog Impact Analysis"
algolia:
  tags: ['watchdog']
cascade:
    algolia:
        rank: 70
---
## Overview

Watchdog is Datadog’s AI engine, providing you with automated alerts, insights, and root cause analyses that draw from observability data across the entire Datadog platform. Watchdog continuously monitors your infrastructure and surfaces the signals that matter most, helping you quickly detect, troubleshoot, and resolve issues. Plus, all Watchdog features come built in—no setup required

{{< youtube url="https://www.youtube.com/watch?v=UMNXdrI0J8A" >}}

### Proactive alerts

Watchdog proactively computes a baseline of expected behaviour for your systems, applications, and deployments to then detect anomalous behaviours:

* [Watchdog alerts][2]
* [Faulty deployments][3]
* Customise Watchdog algorithms for your needs:
  * [Anomaly Algorithm][7]
  * [Forecast Algorithm][8]
  * [Outlier Algorithm][9]

### Investigation assistance

To help investigation, Watchdog shows context based insights in all explorers as well as searching for the root cause and the user impact on identified anomalies:

* [Watchdog insights][4]
* [Root cause Analysis][5]
* [Impact analysis][6]

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
