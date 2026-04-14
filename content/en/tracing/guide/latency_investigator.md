---
title: APM Investigator
description: Use APM Investigator to analyze performance issues and investigate latency patterns across your distributed services.
private: true
further_reading:
- link: "/tracing/"
  tag: "Documentation"
  text: "Datadog APM"
---

{{< callout url="https://www.datadoghq.com/product-preview/apm-investigator/" header="Request access to the Preview!" >}}
APM Investigator is in Preview. To request access, fill out this form.
{{< /callout >}}

## Overview

The APM Investigator helps you diagnose and resolve application latency issues through a guided, step-by-step workflow. It consolidates analysis tools into a single interface so you can identify root causes and take action.

{{< img src="tracing/guide/apm_investigator/apm_investigator.png" alt="APM Investigator UI" style="width:90%;">}}

## Key capabilities

The APM Investigator helps you:

- **Investigate slow request clusters**: Select problematic requests directly from the latency scatter plot.
- **Identify the source of latency**: Determine whether latency originates from your service, a downstream dependency, databases, or third-party APIs.
- **Narrow the scope**: Isolate issues to specific data centers, clusters, or user segments with [Tag Analysis][1].
- **Find root causes**: Detect faulty deployments, database slowness, third-party service failures, infrastructure problems, and service-level issues.

## Starting an investigation

Launch an investigation from an APM service page or a resource page.

1. Navigate to a service showing latency issues.
2. Find the **Latency** graph showing the anomaly.
3. Hover over the graph and click **Investigate**. This opens the investigation side panel.


{{< img src="tracing/guide/apm_investigator/apm_investigator_entrypoint.png" alt="APM Investigator entrypoint" style="width:90%;">}}

## Investigation workflow

### Define context: Select slow and normal spans

To trigger the latency analysis, select two zones on the point plot:

- **Slow**: Problematic, slow spans
- **Normal**: Baseline, healthy spans

<div class="alert alert-info">Latency anomalies detected by Watchdog are pre-selected.</div>

{{< img src="tracing/guide/apm_investigator/latency_selection.png" alt="Selection of slow spans on the point plot" style="width:90%;">}}

This comparison between the slow and normal spans drives all subsequent analysis.

### Step 1: Identify the latency bottleneck

The investigator identifies whether latency originates from your service or its downstream dependencies (services, databases, third-party APIs).

**Analysis approach**:
The investigator compares trace data from both your selected slow and normal periods. To find the service responsible for the latency increase, it compares:

**Execution Time**: Compares each service's "self-time", defined as the time spent on its own processing, excluding waits for downstream dependencies, across the two datasets. The service with the largest absolute latency increase is the primary focus.
- **Call Patterns Between Services**: Analyzes changes in the number of requests between services. For example, if service Y significantly increases its calls to downstream service X, the investigator might identify Y as the bottleneck.

Based on this comprehensive analysis, the investigator recommends a service as the likely latency bottleneck. Expand the latency bottleneck section to see details about the comparison between slow and normal traces. A table surfaces the changes in self-time and in the number of inbound requests by service.

The following example shows two side-by-side flame graphs that compare slow traces against healthy traces in more detail. Use the arrows to cycle through example traces and click **View** to open the trace in a full pageview.

{{< img src="tracing/guide/apm_investigator/latency_bottleneck.png" alt="Latency bottleneck section" style="width:100%;">}}

To investigate recent changes to a service, click the `+` icon that appears when you hover over a row to add it as context for your investigation.

### Step 2: Correlate to recent changes

The investigator then helps you determine if recent deployments on the service or the latency bottleneck service caused the latency increase.

The **Recent changes** section surfaces:
- Deployments that occurred near the latency spike timeline on a [change tracking][2] widget
- A latency graph broken down by version

{{< img src="tracing/guide/apm_investigator/recent_changes.png" alt="Recent changes" style="width:80%;">}}

**Analysis approach**:
The APM Investigator analyzes this data in the background to flag if this section is relevant to examine (if a deployment occurred around the time of the latency increase you are investigating).

### Step 3: Find common patterns with Tag Analysis

The investigator also uses [Tag Analysis][1] to help you discover shared attributes that distinguish slow traces from healthy traces. Tag Analysis highlights dimensions with significant distribution differences between slow and normal datasets.

{{< img src="tracing/guide/apm_investigator/tag_analysis.png" alt="Common patterns in slow traces" style="width:80%;">}}

The section surfaces:
- Tag distributions comparing the slow and normal datasets across all span dimensions.
- Highlights of the most discriminating dimensions that might help you understand the latency issue, such as `org_id`, `kubernetes_cluster`, or `datacenter.name`.

The APM Investigator only surfaces this section when dimensions show significant differentiation that is worth examining.

### End user impact

Above the point plot, you can find a preview of how many end-users, account and application pages (for example, `/checkout`) are affected by the problem. This information is collected if you enabled the connection between [RUM and traces][3].

{{< img src="tracing/guide/apm_investigator/end_user_impact.png" alt="End user impact" style="width:80%;">}}

### Root cause

The investigator consolidates findings from all analysis steps (latency bottleneck, recent changes, and tag analysis) to generate a root cause hypothesis. For example, "a deployment of this downstream service introduced the latency increase".

The APM Investigator helps reduce **Mean Time to Resolution (MTTR)** by accelerating issue diagnosis and response through automated trace and change data analysis.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_explorer/tag_analysis
[2]: /change_tracking/
[3]: /tracing/other_telemetry/rum/
