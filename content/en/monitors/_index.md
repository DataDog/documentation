---
title: Monitors
disable_sidebar: true
aliases:
  - /guides/monitors/
  - /guides/monitoring/
  - /guides/alerting/
  - /guides/monitors/the-conditions
  - /monitoring
description: "Create monitors, configure notifications and automations, and manage your monitors using the alerting platform"
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Alerting"
    tag: "Release Notes"
    text: "Check out the latest Datadog Alerting releases! (App login required)."
  - link: "https://dtdg.co/fe"
    tag: "Foundation Enablement"
    text: "Join an interactive session on creating effective monitors"
  - link: "https://www.datadoghq.com/blog/monitoring-101-alerting/"
    tag: "Blog"
    text: "Monitoring 101: Alerting on what matters"
  - link: "/api/v1/monitors/"
    tag: "Documentation"
    text: "Datadog Monitors API"
cascade:
    algolia:
        rank: 70
        tags: ["alerts", "alerting", "monitoring"]

---

## Overview

Datadog Monitors provide vital visibility into your infrastructure, enabling proactive detection and real-time response to performance issues and outages. By configuring monitors to track key metrics and thresholds, organizations can receive immediate alerts and address problems before they impact customers or cause system downtime.

Monitor critical changes by checking metrics, integration availability, and network endpoints through the Alerting platform. With Datadog Monitors you can:
- Simplify monitoring and response processes
- Enhance operational efficiency
- Optimize performance 

## Get started

The fastest way to start with Datadog Monitors is with [Recommended Monitors][1]. These are a collection of monitors within Datadog that are preconfigured by Datadog and integration partners.

You can also build your own monitors from scratch in lab environments in the Learning Center, or in your application by following the Getting Started with Monitors guide.

{{< whatsnext desc="Use the following resources to create a monitor:" >}}
    {{< nextlink href="/getting_started/monitors/" >}}Getting started with Monitors: Guide on how to build a metric based monitor{{< /nextlink >}}
    {{< nextlink href="/monitors/types/" >}}Create a monitor from Monitor Types{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/datadog-foundation" >}}Learning Center: Build a metric base monitor in a sandbox lab environment{{< /nextlink >}}
{{< /whatsnext >}}

## Analyze aggregate data

Data should be well-understood, granular, tagged by scope, and long-lived. Use different data types for alerts and diagnostics, based on the level of urgency. Instrument all applications and collect as much relevant data as possible for comprehensive measurements and observability of complex systems.

Measure the health of your applications and the state of your infrastructure with Datadog. Use data from across the Datadog platform to create alerts on potential issues.

## Alert on what matters

Set up [Monitor Notifications][2] to keep your team informed of issues and provide troubleshooting guidance. Route the notifications to the correct people, leverage template variables to include details, and attach snapshots when sending the alerts by email or Slack. 

Reduce alerting fatigue so teams can focus on resolving alerts when it matters. Create [downtimes][3] to mute alerts during application maintenance. 

## What's next

Monitors and alerts are essential tools for ensuring the reliability, performance, and availability of IT systems and applications. They help maintain operational efficiency, improve user experience, and mitigate potential risks by enabling quick detection and response to issues before they escalate. Learn more about Monitor features: 
1. [Select a monitor type.][4]
1. [Configure monitors.][5]
1. [Configure notification messages.][6]
1. [Schedule downtimes to mute monitors.][7]
1. [Organize and manage monitors.][8]
1. [Resolve misconfigured monitors on the Monitor Quality page.][9]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/monitors/recommended
[2]: /monitors/notify
[3]: /monitors/downtimes
[4]: /monitors/types/
[5]: /monitors/configuration/?tab=thresholdalert
[6]: /monitors/notify/
[7]: /monitors/downtimes/?tab=bymonitorname
[8]: /monitors/manage
[9]: /monitors/quality/
