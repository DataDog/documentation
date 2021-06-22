---
title: Cloud Workload Security
kind: documentation
---

<div class="alert alert-warning">
Cloud Workload Security is currently in <a href="https://app.datadoghq.com/security/configuration">public beta</a>.
</div>

## Overview

Datadog Cloud Workload Security (CWS) detects threats to your production workloads in real-time. With Cloud Workload Security, monitor file and process activity across your environment to detect threats to your infrastructure, like AWS EC2 instances, docker containers, or Kubernetes clusters, in real-time at the kernel level. Use **File Integrity Monitoring (FIM)** to watch for changes to key files and directories. Use **Process Execution Monitoring** to monitor process executions for suspicious, malicious, or anomalous activity.

Cloud Workload Security uses the Datadog Agent, so if you’re already using Datadog to monitor your environment, there’s no need to provision additional resources or introduce new agents. If you don't already have the Datadog Agent set up, [start with setting up the Agent][1]. As a part of the Datadog platform, you can easily combine real-time threat detection with metrics, logs, traces, and other telemetry to see the full context surrounding a potential attack on your workloads.

## Get started

{{< whatsnext >}}
  {{< nextlink href="/security_platform/cloud_workload_security/getting_started">}}Complete setup and configuration{{< /nextlink >}}
  {{< nextlink href="/security_platform/cloud_workload_security/workload_security_rules">}}Learn about Workload Security rules{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules">}}Start using out-of-the-box Workload Security rules in your environment{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /agent/
