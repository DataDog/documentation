---
title: Monitors
kind: documentation
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

Datadog Monitors provide vital visibility into your infrastructure, enabling proactive detection and response to performance issues and outages in real-time. By configuring monitors to track essential metrics and thresholds, organizations can promptly receive alerts, allowing them to address problems before customer impact or system downtime occurs. Additionally, with the capacity planning feature, businesses can predict resource needs for growing workloads, avoiding performance degradation by scaling infrastructure proactively. 

Datadog also allows users to monitor critical changes by actively checking metrics, integration availability, and network endpoints, all managed conveniently on the Alerting platform. Simplify monitoring and response processes, enhance operational efficiency, and ensure optimal performance with Datadog Monitors.

## Getting started

The fastest way to start with Datadog Monitors is with [Recommended Monitors][1]. These are a collection of monitors within Datadog that have been preconfigured by Datadog, integration partners, and other users.

Build your own monitors from scratch in lab environments in the Learning Center, or in your application by following the Getting Started with Monitors guide.

{{< whatsnext desc="Use the following resources to create:" >}}
    {{< nextlink href="/getting_started/monitors/" >}}Getting started with Monitors: Guide on how to build a metric based monitor{{< /nextlink >}}
    {{< nextlink href="/monitors/types/" >}}Create a monitor from Monitor Types{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/datadog-foundation" >}}Learning Center: Build a metric base monitor in a sandbox lab environment{{< /nextlink >}}
{{< /whatsnext >}}

## Analyze aggregate data

Monitor data to achieve observability in systems. Good data should be well-understood, granular, tagged by scope, and long-lived. Use different data types for alerts and diagnostics, based on the level of urgency. Instrument everything and collect as much relevant data as possible for comprehensive measurements and observability of complex systems.

Measure the health of your applications and the state of your infrastructure through data sent to Datadog. Use data from across the platform whether Logs, Metrics, Traces, Cloud Cost, RUM, or Security, to create alerts on the potential issues.

## Alert on what matters

Set up [Monitor Notifications][2] when creating monitors to keep your team informed of issues and provide troubleshooting guidance. Route the notifications to the correct people, leverage template variables to include details, and attach snapshots when sending the alerts by email or Slack. 

Reduce alerting fatigue so teams can focus on the resolving alerts when it matters. Create [downtimes][3] to mute alerts during application maintenance. 

## What's next

Monitors and alerts are essential tools for ensuring the reliability, performance, and availability of IT systems and applications. They help maintain operational efficiency, improve user experience, and mitigate potential risks by enabling quick detection and response to issues before they escalate. Learn more about Monitor features: 
1. [Select a monitor type.][4]
1. [Configure monitors.][5]
1. [Configure the notification message.][6]
1. [Schedule downtimes to mute monitors.][7]
1. [Organize and manage monitors.][8]
1. [Resolve misconfigured monitors on Monitor Quality page.][9]

<!-- {{< whatsnext desc="Learn more about Monitor features:">}}
    {{< nextlink href="/monitors/types/" >}}1. Select a monitor type{{< /nextlink >}}
    {{< nextlink href="/monitors/configuration" >}}2. Configure monitors{{< /nextlink >}}
    {{< nextlink href="/monitors/notify" >}}3. Configure notifications{{< /nextlink >}}
    {{< nextlink href="/monitors/downtimes" >}}4. Schedule downtimes{{< /nextlink >}}
    {{< nextlink href="/monitors/guide" >}}5. Organize and manage monitors{{< /nextlink >}}
    {{< nextlink href="/monitors/quality" >}}6. Resolve misconfigured monitors with Monitor Quality{{< /nextlink >}}
{{< /whatsnext >}} -->

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
