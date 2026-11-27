---
title: Investigate Regressions and Alerts with Bits AI
description: "Start a Bits Investigation from an anomaly on a RUM vital chart, or let Bits investigate RUM monitor alerts automatically."
further_reading:
  - link: "/real_user_monitoring/bits_ai/"
    tag: "Documentation"
    text: "Bits in RUM"
  - link: "/bits_ai/bits_investigation/investigate_issues/"
    tag: "Documentation"
    text: "Investigate issues with Bits Investigation"
  - link: "/monitors/types/real_user_monitoring/"
    tag: "Documentation"
    text: "RUM monitors"
---

## Overview

When a performance metric suddenly degrades, you can get to the root cause in two ways:

- [Investigate an anomaly](#investigate-an-anomaly-on-a-vital-chart) that RUM detects on a vital chart.
- [Add your RUM monitors to a scope](#automatically-investigate-rum-monitor-alerts), so Bits triages their alerts and investigates the ones that need action.

## Investigate an anomaly on a vital chart

RUM runs anomaly detection on the Core Web Vitals charts of the RUM summary page for browser applications. When a vital degrades unexpectedly, RUM highlights the time range of the anomaly on the chart and displays an **Anomaly · Investigate** button below it.

{{< img src="real_user_monitoring/bits_ai/anomaly-investigate.png" alt="A First Contentful Paint chart with an anomalous window highlighted in pink and an Anomaly · Investigate button below the chart." style="width:50%;" >}}

To start an investigation, click **Anomaly · Investigate**. A Bits Investigation opens in a new tab with the vital, the active query and view, the chart timeframe, and the start and end of the anomaly. Bits compares the anomalous window with the surrounding periods to explain what changed, and which releases, pages, or user segments were affected.

**Note**: Only degradations are highlighted, such as an increase in Largest Contentful Paint or Cumulative Layout Shift. Improvements are not flagged as anomalies.

## Automatically investigate RUM monitor alerts

Bits Investigation supports [RUM monitors][1]. When a RUM monitor is covered by a [scope][4], Bits triages each of its alerts and investigates the ones that need action, so the root cause and its evidence are ready when your on-call engineer opens the alert.

To add a RUM monitor to a scope, open the monitor's status page and click **Create Scope**. To cover several RUM monitors, create a **Watch monitor alerts** scope that selects them. For details, see [Enable automatic investigations][3].

You can also start an investigation manually from an individual RUM monitor alert. For all the available entry points and the conditions that trigger automatic investigations, see [Investigate issues][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/real_user_monitoring/
[3]: /bits_ai/bits_investigation/investigate_issues/#enable-automatic-investigations
[4]: /bits_ai/bits_autonomous_operations/#scopes
