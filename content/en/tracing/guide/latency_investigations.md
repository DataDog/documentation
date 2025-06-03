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

Based on this comprehensive analysis, Latency Investigations recommend a service as the likely latency bottleneck. Expand the latency bottleneck section to see details about the comparison between slow and normal traces. A table surfaces the changes in self-time and in the number of inbound requests by service. Below, find two side-by-side flamegraphs to compare slow vs. normal traces in more details. Use the arrows to cycle through examplar traces and click `View` to open the trace in full page.

{{< img src="tracing/guide/apm_investigator/latency_bottleneck.png" alt="Latency bottleneck section" style="width:100%;">}}

### Step 2: Analyze deployment changes

**Purpose**: Determine if recent deployments on the service caused the latency increase.

**What you see**:

- Deployments that occurred near the latency spike timeline.
- A performance comparison (for example, p90 latency) between the new version and the previous version.

**Relevance scoring**: Investigations assesses relevance to flag if this section is recommended.

- **High**: A deployment happened within 10 minutes (before or after) the start of the latency spike, OR a deployment occurred within 1 hour before the spike start, and the new version's p90 latency is 25% higher than the previous version.
- **Medium**: A deployment happened within 1 hour before the spike start, and the p90 latency of the new version is 10%-25% higher than the previous; OR a deployment occurred within 6 hours before the spike start, and the p90 latency is 25% higher.
- **Low**: A deployment happened within 6 hours before the spike start, and the p90 latency is 10%-25% higher.

### Step 3: Find common patterns (Tag analysis)

**Purpose**: Discover shared attributes (tags/dimensions) among slow traces that differentiate them from fast/successful traces. This is useful if an interesting dimension shows a big difference in distribution between the problematic subset and baseline.

**What you see**:

- Tag distributions comparing the subset and baseline datasets across all span dimensions.
- Highlights of the most discriminating dimensions that might help understand the latency issue, such as `peer.db.name`, `org_id`, `kubernetes_cluster`, `env`, `datacenter.name`, or `team.name`.

**Example**: The issue is scoped to specific organization IDs (for example, 2 and 1018) and the cluster1 Kubernetes cluster.

### Step 4: Compare trace structures

**Purpose**: Identify structural differences between the execution paths of slow traces and fast traces by analyzing the full request tree.

**What you see**:

- Changes in service interaction patterns.
- The presence of new spans or absence of expected spans in slow traces compared to baseline traces.
- Variations in the critical path execution.

**Example**: Slow traces consistently include calls to an additional, unexpected service, or a particular render-blocking server call (XHR request) is linked to the latency increase.

### Step 5: Determine root cause

**Purpose**: Pinpoint the actual cause of the latency issue using automated analysis once the originating service and scope are identified.

**Analysis method**: Investigations automatically execute a decision tree tailored to latency investigations to test the most plausible root causes and categorize the root cause:

- **Infrastructure**: High CPU utilization, pod restarts (for example, CrashLoopBackOff).
- **Third-party services**: Increased error rates or response times from external dependencies, indicating a potential third-party outage.
- **Network**: High TCP retransmit rate.
- **Code-level**: N+1 query patterns, lock contention (potentially identified using profiling data).
- **Database**: N+1 problems, missing indexes leading to slow queries or full table scans (identified using DBM data).

**Additional analysis**: An analysis of a representative sample of fast and slow traces (for example, comparing their full request trees) may be used to provide a root cause hypothesis with further explanation.

**Output**: The most plausible root cause is presented as a concise summary, often highlighting specific problematic interactions (for example, "extended duration of ServiceNow API interactions") and the services handling them (for example, the "collab integrations worker" service making calls to an external API). This summary, along with supporting evidence (like slow query details or explain plans if applicable), helps you understand the issue without needing to manually sift through lengthy traces. Other potential root causes may be listed as discarded, with brief explanations.

### Step 6: Understand impact

**Purpose**: Quantify the business and user impact of the latency problem.

**What you see**:

- Details on how end-users or specific application pages (for example, `/checkout`) are affected by the problem.
- User experience metrics such as increased pageview load times.
- Information on which specific users, organizations, or accounts are most affected.

### Step 7: Get remediation advice

**Purpose**: Receive specific, actionable steps to fix the identified problem.

**Examples**:

- **Deployment issues**: Suggestion to roll back to a previous stable version to solve the issue immediately.
- **Database issues**: A SQL query to create the missing index is generated for you to use.
- **Infrastructure issues**: Suggestions for configuration changes like upscaling infrastructure or restarting a service.
- **Code issues**: Fixes suggested with code generation (for example, to fix an N+1 problem where a database is called in a loop) or by disabling a feature flag.
- **Dependency issues**: Identifying the specific internal service responsible for problematic calls to a downstream or third-party dependency, enabling you to contact the relevant team.

Latency Investigations may suggest that a new version can be safely rolled forward once a fix (for example, for a network or database issue, or a failing third-party dependency) is implemented.

## Benefits

By following this systematic approach, Latency Investigations help reduce:

- **Mean Time to Detection (MTTD)**: Faster identification of latency issues.
- **Mean Time to Resolution (MTTR)**: Quicker implementation of fixes by accelerating diagnosis and response.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_explorer/tag_analysis