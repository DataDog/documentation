---
title: Watchdog RCA
further_reading:
- link: "/watchdog/faq/root-cause-not-showing/"
  tag: "Documentation"
  text: "Root cause not showing"
- link: "https://www.datadoghq.com/blog/datadog-watchdog-automated-root-cause-analysis/"
  tag: "Blog"
  text: "Automated root cause analysis"
---

## Overview

Watchdog Root Cause Analysis (RCA) helps you reduce mean time to recovery (MTTR) by automating preliminary investigations during incident triage. The Watchdog AI engine identifies interdependencies between application performance anomalies and related components to draw causal relationships between symptoms. Whenever Watchdog finds an APM anomaly, it starts a root cause analysis in an attempt to provide deeper insight into the cause and/or effects of the anomaly.

Watchdog RCA requires the use of [APM][1]. In order for Watchdog to take full advantage of all relevant Datadog telemetry for impacted services, Datadog recommends that you set up [unified tagging][2]. 

Watchdog RCA considers the following sources of data in its analysis:

* APM error rate, latency, and hit rate metrics
* APM deployment tracking
* APM traces
* Agent based infrastructure metrics, including CPU usage, memory usage, and disk usage
* AWS instance status check metrics
* Log pattern anomalies

## Components of a Watchdog Root Cause Analysis

{{< img src="watchdog/rca/root_cause_cropped.png" alt="Watchdog Root Cause Analysis showing Root Cause, Critical Failure, and Impact">}}

A Watchdog Root Cause Analysis includes three components: root cause, critical failure, and impact.

### Root cause

A root cause is a state change that leads to application performance issues. Possible state changes include a difference in infrastructure availability, a traffic spike, or code deployment.

Watchdog supports four types of root causes:

* Version changes, as captured by APM Deployment Tracking
* Traffic increases, as captured by hit rate metrics on your APM-instrumented services
* AWS instance failures, as captured by Amazon EC2 integration metrics
* Running out of disk space, as captured by system metrics from the Datadog agent

Watchdog never classifies degraded application performance, such as higher latency or new errors, as the root cause of an incident. Datadog calls an initial symptom of degraded application performance a **critical failure**, as described below. 

### Critical failure

The Critical Failure section highlights where and how the root cause first (and most directly) causes degraded application performance. Critical failures always include a latency or error rate increase.

### Impact

Watchdog RCA also identifies services indirectly affected by the root cause. Any performance degradation listed in Impact is expected to recover once the Critical Failure is resolved. For RUM users, Watchdog also automatically assesses which view paths and users were affected by the performance anomalies.

{{< img src="watchdog/rca/views_impacted.png" alt="Screenshot of Watchdog Root Cause Analysis detail showing Views impacted pop-up">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/
[2]: /getting_started/tagging/unified_service_tagging
