---
title: Cloud Workload Security
kind: documentation
aliases:
  - /security_platform/cloud_workload_security/
---

Datadog Cloud Workload Security (CWS) monitors file and process activity across your environment to detect real-time threats to your infrastructure. As part of the Datadog platform, you can combine the real-time threat detection of CWS with metrics, logs, traces, and other telemetry to see the full context surrounding a potential attack on your workloads.

## Detects threats to your production workloads in real-time

Monitor file and process activity at the kernel level to detect threats to your infrastructure, such as AWS EC2 instances, Docker containers, and Kubernetes clusters. Combine CWS with [Network Performance Monitoring][9] and detect suspicious activity at the network-level before workload compromise.

CWS uses the Datadog Agent to monitor your environment. If you don't already have the Datadog Agent set up, [start with setting up the Agent][2] on a [supported operating system][1]. There are four types of monitoring that the Datadog Agent uses for Cloud Workload Security:

1. **Process Execution Monitoring** to watch process executions for malicious activity on hosts or containers in real-time.
2. **File Integrity Monitoring** to watch for changes to key files and directories on hosts or containers in real-time.
3. **DNS Activity Monitoring** to watch network traffic for malicious activity on hosts and containers in real-time.
4. **Kernel Activity Monitoring** to watch for Kernel-layer attacks like process hijacking, container breakouts, and more in real-time.

{{< img src="security/cws/cws_signals.png" alt="Cloud Workload Security signals in the Datadog app" width="100%">}}

## Manage out-of-the-box and custom detection rules

CWS comes with more than 50+ out-of-the-box detection rules that are maintained by a team of security experts. The rules surface the most important risks so that you can immediately take steps to remediate. 

Use [Remote Configuration][7] to automatically deploy new and updated rules to the Agent. [Customize the rules][5] by defining how each rule monitors process and file activity, [create custom rules][6], and [set up real-time notifications](#set-up-real-time-notifications) for new signals.

{{< img src="security/cws/cws_detection_rules.png" alt="Cloud Workload Security detection rules in the Datadog app" width="100%">}}

## Set up real-time notifications

[Send real-time notifications][3] when a threat is detected in your environment, so that your teams can take action to mitigate the risk. Notifications can be sent to [Slack, email, PagerDuty, webhooks, and more][4].

Use template variables and Markdown to [customize notification messages][5]. Edit, disable, and delete existing notification rules, or create new rules and define custom logic for when a notification is triggered based on severity and rule type.

## Investigate and remediate security signals

Investigate and triage security signals in the [Security Signals Explorer][8]. View detailed information about the impacted files or processes, related signals and logs, and remediation steps.

## Get started

{{< whatsnext >}}
  {{< nextlink href="/security/cloud_workload_security/setup">}}Complete setup and configuration{{< /nextlink >}}
  {{< nextlink href="/security/cloud_workload_security/workload_security_rules">}}Learn about Cloud Workload Security detection rules{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-workload-security">}}Start using out-of-the-box Cloud Workload Security detection rules{{< /nextlink >}}
  {{< nextlink href="/getting_started/cloud_security_management">}}Getting Started with Cloud Security Management{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /security/cloud_workload_security/setup/?tab=kubernetes#requirements
[2]: /agent/
[3]: /security/notifications/
[4]: /security/notifications/#notification-channels
[5]: /security/notifications/#detection-rule-notifications
[6]: /security/cloud_workload_security/agent_expressions
[7]: /security/cloud_workload_security/getting_started
[8]: /security/explorer
[9]: /network_monitoring/performance/