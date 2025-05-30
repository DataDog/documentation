---
title: Latency investigations
private: true
further_reading:
- link: "/watchdog/"
  tag: "Documentation"
  text: "Datadog Watchdog"
---

{{< callout btn_hidden="true" >}}
Latency Investigations is in Preview.
{{< /callout >}}

## Overview

APM Latency Investigations help you diagnose and resolve application latency issues through a guided, step-by-step investigation workflow. It consolidates multiple analytical perspectives into a single interface, reducing the time needed to identify root causes and implement solutions.

## Requirements

[TODO]

## Key capabilities

Latency Investigations help you:

- **Identify the source**: Determine whether latency originates from your service or downstream dependencies.
- **Narrow the scope**: Isolate issues to specific data centers, clusters, or user segments.
- **Find root causes**: Detect database slowness, third-party service failures, network issues, or infrastructure problems.
- **Get actionable fixes**: Receive specific remediation steps like rollback commands, scaling recommendations, or code changes.

## Starting an investigation

You can launch investigations from:

- APM latency monitor status pages
- Watchdog latency anomaly notifications
- APM service pages

To begin:

1. Navigate to a service with latency issues reflected on a latency graph.
2. Find the latency graph showing the anomaly.
3. Hover over the graph and click **Investigate**.

This opens the investigation side panel.

## Investigation workflow

### Define context: Select problematic and baseline spans

Latency Investigations help you select two time ranges: a problematic subset (slow spans) and a baseline (fast/healthy spans). In some cases, if the latency anomaly was initially detected by Watchdog, these subsets may be pre-selected for you.

The panel displays latency visualizations (such as heat maps, percentile charts, and scatterplots of your spans' latency over time) to help you identify the latency spike. You can often interact directly with these visualizations, like the scatter plot, to precisely select or refine the cluster of slow spans you want to investigate further.

This comparison between the subset and baseline drives all subsequent analysis.

### Step 1: Analyze deployment changes

**Purpose**: Determine if recent deployments on the service caused the latency increase.

**What you see**:

- Deployments that occurred near the latency spike timeline.
- A performance comparison (for example, p90 latency) between the new version and the previous version.

**Relevance scoring**: Investigations assesses relevance to flag if this section is recommended.

- **High**: A deployment happened within 10 minutes (before or after) the start of the latency spike, OR a deployment occurred within 1 hour before the spike start, and the new version's p90 latency is 25% higher than the previous version.
- **Medium**: A deployment happened within 1 hour before the spike start, and the p90 latency of the new version is 10%-25% higher than the previous; OR a deployment occurred within 6 hours before the spike start, and the p90 latency is 25% higher.
- **Low**: A deployment happened within 6 hours before the spike start, and the p90 latency is 10%-25% higher.

### Step 2: Identify the latency bottleneck

**Purpose**: Pinpoint whether latency stems from your service or its downstream dependencies (downstream service, database, third-party dependency).

**Analysis approach**:
Latency Investigations analyze trace data from both your selected problematic (slow) and baseline (fast) periods. It considers several factors to pinpoint the service most likely responsible for the latency increase:

* **Execution Time**: It compares the execution time (self-time) spent within each service across the two periods. The service with the largest absolute increase in latency between the problematic subset and baseline is a key point of interest.
* **Traffic Patterns**: It analyzes changes in call volume between services, as a significant increase in requests to a service can cause latency. For instance, if a service Y significantly increases its calls to downstream service X, Y might be identified as the bottleneck.
* **Critical Path Analysis**: The system may aggregate slow and fast traces into a combined graph of service-to-service calls, where each connection (edge) stores latency and traffic data. It then examines the sequence of calls in traces (the critical paths) to find edges that represent a high proportion (for example, >=10%) of the total latency difference between slow and fast traces. Crucially, it identifies bottlenecks where this latency increase isn't due to slowness in downstream dependencies or changes in request volume.

Based on this comprehensive analysis, Latency Investigations recommend a service as the likely latency bottleneck. This recommendation is often accompanied by a relevance level (High, Medium, or Low). This level indicates the confidence that the identified service is the true source, based on the proportion of its latency increase that cannot be readily explained by downstream issues or traffic changes.

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
- User experience metrics such as increased page view load times.
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