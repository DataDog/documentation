---
title: Investigate Dashboard Anomalies
description: Automatically detect and group anomalies across a dashboard's graphs, identify the tags contributing to them, and delegate root cause analysis to Bits Investigation.
site_support_id: dashboard_anomaly_detection
further_reading:
- link: "/dashboards/graph_insights/watchdog_explains/"
  tag: "Documentation"
  text: "Analyze a single anomaly with Watchdog Explains"
- link: "/bits_ai/bits_investigation/"
  tag: "Documentation"
  text: "Learn how Bits Investigation analyzes root cause"
---

## Overview

Datadog detects anomalies across your dashboard's timeseries graphs, groups co-occurring anomalies into issues, and identifies the tags contributing most to each. From an anomaly you can narrow the cause down on a single graph with [Watchdog Explains][2], or delegate root cause analysis to [Bits Investigation][1].

<div class="alert alert-info">Anomaly detection is available for <a href="/dashboards/widgets/timeseries/">Timeseries widgets</a> with {{< ui >}}Metrics{{< /ui >}} data (avg, sum, min, and max aggregation). Widgets using functions such as <code>cumsum</code>, <code>anomalies</code>, or <code>outliers</code> are not eligible.</div>

Detection runs when you open a dashboard, and issues appear within approximately 20 seconds. If Datadog detects no anomalies, none of the controls described on this page appear.

Datadog does not run anomaly detection on:

- Public (shared) dashboards, because there is no signed-in viewer who can act on a result
- Dashboards embedded in the mobile app
- Dashboards in TV mode
- Dashboards in print mode
- Dashboards where you turned off {{< ui >}}Auto-detect issues{{< /ui >}}

## How Datadog detects anomalies

Datadog applies anomaly detection to the graphs on your dashboard by analyzing both the shape and value of the underlying timeseries. It identifies deviations from historical patterns, flagging spikes, dips, or gradual drifts that don't align with expected behavior.

To account for seasonality, the algorithm looks back up to three weeks. For example, if a spike appears on a Monday at 9:00 a.m., Datadog compares that datapoint against previous Mondays at the same hour. If similar patterns appear consistently, the spike is treated as **seasonal** and is not flagged as an anomaly. This helps reduce false positives so that only unexpected deviations are surfaced.

Anomalies can be sharp spikes or drops, but may also be subtler trends such as step changes or slope shifts.

## Find detected issues on a dashboard

Click {{< ui >}}Investigate{{< /ui >}} at the top of the dashboard to see the issues Datadog detected. Each issue names the metric that deviated and when it was detected. Expanding an issue also shows its influential tags and the {{< ui >}}Widget affected{{< /ui >}}.

Selecting an issue scrolls the dashboard to that graph, which is useful on dashboards with many widgets.

Anomalies occurring across several widgets at once are grouped into one issue, such as `Anomalies co-occur on 18 widgets`.

{{< img src="dashboards/graph_insights/investigate_anomalies/investigate_menu.png" alt="The Investigate menu open on a dashboard, listing four detected issues with an Auto-detect issues toggle." style="width:100%;" >}}

## Review an anomaly

Detected anomalies are highlighted in pink on the graph.

1. Hover over a highlighted region. A chip appears summarizing the anomaly and how far it deviates from the expected range, for example: `The spike is 70% higher than the expected range as inferred from the past 3 weeks of data.`
1. Click the chip to expand it. The expanded chip always contains:
   - **Influential tags**: the tags contributing most to the anomaly.
   - **Next steps**: suggested follow-up actions, such as viewing the affected service or creating a monitor.

   Some anomalies also include a **Co-occurs with** section, listing other metrics that deviated over the same period.

{{< img src="dashboards/graph_insights/investigate_anomalies/anomaly_chip.png" alt="An expanded anomaly chip showing an influential tag, next steps, and the Investigate With AI button." style="width:100%;" >}}

## Analyze a single graph with Watchdog Explains

To narrow an anomaly down to a specific tag, open the graph in fullscreen and click {{< ui >}}Findings{{< /ui >}}. This panel is powered by Watchdog Explains.

Each finding names a tag that likely explains the anomaly. It also shows the graph before and after filtering that tag out, so you can confirm whether removing it flattens the spike.

For more information, see [Watchdog Explains][2].

## Investigate root cause with Bits Investigation

Click {{< ui >}}Investigate With AI{{< /ui >}} from an expanded anomaly chip, from the {{< ui >}}Investigate{{< /ui >}} menu, or from a Watchdog Explains finding. Datadog opens [Bits Investigation][1] in a new tab, where it analyzes the anomaly and reports a root cause, an impact assessment, and a timeline.

After an investigation exists, the button reads {{< ui >}}See N Related Investigation{{< /ui >}}. Clicking it opens a filtered list of investigations rather than a single investigation. To open one, click {{< ui >}}Review Completed Investigation{{< /ui >}}.

<div class="alert alert-info">The related-investigations count is scoped to the whole dashboard and time range, not to the anomaly you are viewing. A count of one can mean an investigation started from a different graph on the same dashboard.</div>

Investigations started this way record {{< ui >}}Dashboard Anomaly{{< /ui >}} as their source and carry a `dashboard_id` tag. Use either to find them later in the Bits Investigation list.

## Turn off anomaly detection

To stop scanning a dashboard for anomalies, click {{< ui >}}Investigate{{< /ui >}} and turn off {{< ui >}}Auto-detect issues{{< /ui >}}.

This preference applies to one dashboard and is stored in your browser. Other viewers of the same dashboard still see anomalies unless they turn detection off themselves. The preference also does not carry over to a different browser or device.

To exclude a single widget from anomaly detection, edit the widget, expand {{< ui >}}Anomaly Detection{{< /ui >}}, and select {{< ui >}}Hide{{< /ui >}}. This setting is part of the widget definition, so it applies to everyone who views the dashboard.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_investigation/
[2]: /dashboards/graph_insights/watchdog_explains/
