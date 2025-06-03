---
title: APM Investigator
private: true
further_reading:
- link: "/tracing/"
  tag: "Documentation"
  text: "Datadog APM"
---

{{< callout url="https://www.datadoghq.com/support/" header="Request access to the Preview!" >}}
APM Investigator is in Preview. To request access, fill out this form.
{{< /callout >}}

## Overview

The APM investigator help you diagnose and resolve application latency issues through a guided, step-by-step investigation workflow. It consolidates relevant analysis sections into a single interface, reducing the time needed to identify the root cause of the issue.

{{< img src="tracing/guide/apm_investigator/apm_investigator.png" alt="APM investigator UI" style="width:90%;">}}

## Key capabilities

The APM Investigator allows you to:

- **Investigate a custom cluster of slow requests**: Select the problematic set of requests that you wish to investigate from the latency scatter plot.
- **Identify the source of latency**: Determine whether latency originates from your service, a downstream dependency, databases or third party APIs.
- **Narrow the scope**: Isolate issues to specific data centers, clusters, or user segments with [Tag Analysis][1].
- **Find root causes**: Detect faulty deployments, database slowness, third-party service failures, infrastructure problems, or service level issues.

## Starting an investigation

You can launch investigations from APM service pages and resource pages.

To begin:
1. Navigate to a service with latency issues reflected on a latency graph.
2. Find the latency graph showing the anomaly.
3. Hover over the graph and click **Investigate**.

{{< img src="tracing/guide/apm_investigator/apm_investigator_entrypoint.png" alt="APM investigator entrypoint" style="width:90%;">}}

This opens the investigation side panel.

## Investigation workflow

### Define context: Select problematic and baseline spans

To trigger the latency analysis, select two zones on the point plot: a problematic subset (slow spans) and a baseline (fast/healthy spans). If the latency anomaly was initially detected by Watchdog, these are be pre-selected for you.

{{< img src="tracing/guide/apm_investigator/latency_selection.png" alt="Selection of slow spans on the point plot" style="width:90%;">}}

This comparison between the slow and normal spans drives all subsequent analysis.

### Step 1: Identify the latency bottleneck

The investigator first helps you answer the following question: _Is this me or someone else ?_ It automatically pinpoints whether latency stems from your service or its downstream dependencies (downstream service, database, third-party dependency).

**Analysis approach**:
The investigator compares trace data from both your selected problematic (slow) and baseline (fast) periods. To find the service responsible for the latency increase, it compares:

* The **Execution Time** (self-time, i.e. time spent on the service, which is not spent in downstream dependencies) spent within each service across the two datasets. The service with the largest absolute increase in latency between the problematic subset and baseline is a key point of interest.
* The **Call patterns between services**: It analyzes changes in the number of requests between services. For instance, if a service Y significantly increases its calls to downstream service X, Y might be identified as the bottleneck.

Based on this comprehensive analysis, the investigator recommends a service as the likely latency bottleneck. Expand the latency bottleneck section to see details about the comparison between slow and normal traces. A table surfaces the changes in self-time and in the number of inbound requests by service. Below, find two side-by-side flamegraphs to compare slow vs. normal traces in more details. Use the arrows to cycle through examplar traces and click `View` to open the trace in full page.

{{< img src="tracing/guide/apm_investigator/latency_bottleneck.png" alt="Latency bottleneck section" style="width:100%;">}}

From the table, click on the `+` icon showing up on hover of the row to add the service to the context of investigation for further analysis of recent changes on the service.

### Step 2: Correlate to recent changes

The investigator then helps you determine if recent deployments on the service or the latency bottleneck service caused the latency increase.

The Recent changes section surfaces:
- Deployments that occurred near the latency spike timeline on a [change tracking][2] widget
- A latency graph broken down by version

{{< img src="tracing/guide/apm_investigator/recent_changes.png" alt="Recent changes" style="width:80%;">}}

**Analysis approach**:
The APM Investigator analysis this data in the background to flag if this section is relevant to look at (if a deployment occured around the time of the latency increase you are investigating).

### Step 3: Find common patterns with Tag Analysis

The investigator also embeds [Tag analysis][1] also allows you to discover shared attributes (tags/dimensions) among slow traces that differentiate them from fast/successful traces. This is useful if an interesting dimension shows a big difference in distribution between the problematic subset and baseline.

{{< img src="tracing/guide/apm_investigator/tag_analysis.png" alt="Common patterns in slow traces" style="width:80%;">}}

The section surfaces:
- Tag distributions comparing the slow and normal datasets across all span dimensions.
- Highlights of the most discriminating dimensions that might help understand the latency issue, such as `org_id`, `kubernetes_cluster`, `datacenter.name`, etc...

**Analysis approach**:
The APM Investigator only surfaces this section if a dimension is differentiating enough to be looked at.

### Understanding end user impact


**What you see**:

- Details on how end-users or specific application pages (for example, `/checkout`) are affected by the problem.
- User experience metrics such as increased pageview load times.
- Information on which specific users, organizations, or accounts are most affected.

### Root cause

All of the above steps (latency bottleneck, recent changes and tag analysis) are consolidated to emit a root cause hypothesis around the latency increase (e.g. a deployment of this downstream service introduced the latency increase).

By running this bakcground analysis over traces and change data, Latency Investigations help reduce **Mean Time to Resolution (MTTR)** by accelerating issue diagnosis and response.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_explorer/tag_analysis
[2]: /change_tracking/