---
title: Cloud Workload Security
kind: documentation
aliases:
  - /security_platform/cloud_workload_security/
---

## Overview

Datadog Workload Security detects threats to your production workloads in real-time. With Workload Security, you can monitor file and process activity across your environment to detect threats to your infrastructure, like AWS EC2 instances, docker containers, or Kubernetes clusters, in real-time at the kernel level. Use **File Integrity Monitoring (FIM)** to watch for changes to key files and directories. Use **Process Execution Monitoring** to watch process executions for suspicious, malicious, or anomalous activity.

{{< img src="security/cws/workload_security_rules.png" alt="Cloud Workload Security detection rules in the Datadog app" width="100%">}}

Workload Security uses the Datadog Agent, so if you’re already using Datadog to monitor your environment (within the [supported versions and platforms][1]), there’s no need to provision additional resources or introduce new agents. If you don't already have the Datadog Agent set up, [start with setting up the Agent][2] on a [supported operating system][1]. As a part of the Datadog platform, you can combine real-time threat detection with metrics, logs, traces, and other telemetry to see the full context surrounding a potential attack on your workloads.

## Get started

{{< whatsnext >}}
  {{< nextlink href="/security/cloud_workload_security/setup">}}Complete setup and configuration{{< /nextlink >}}
  {{< nextlink href="/security/cloud_workload_security/workload_security_rules">}}Learn about Cloud Workload Security detection rules{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-workload-security">}}Start using out-of-the-box Cloud Workload Security detection rules{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /security/cloud_workload_security/setup/?tab=kubernetes#requirements
[2]: /agent/
