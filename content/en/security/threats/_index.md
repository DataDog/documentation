---
title: Workload Protection
aliases:
  - /security_platform/cloud_workload_security/
  - /security/cloud_workload_security/
  - /security/cloud_workload_security/agent_expressions
  - /security/cloud_workload_security/backend/
  - /security/threats/security_profiles
  - /security/threats/runtime_anomaly_detection
---

Workload Protection monitors file, network, and process activity across your environment to detect real-time threats to your infrastructure. As part of the Datadog platform, you can combine the real-time threat detection of Workload Protection with metrics, logs, traces, and other telemetry to see the full context surrounding a potential attack on your workloads.

## Detect threats to your production workloads in real-time

Monitor file and process activity at the kernel level to detect threats to your infrastructure, such as Amazon EC2 instances, Docker containers, and Kubernetes clusters. Combine Workload Protection with [Cloud Network Monitoring][9] and detect suspicious activity at the network level before a workload is compromised.

Workload Protection Threats uses the Datadog Agent to monitor your environment. If you don't already have the Datadog Agent set up, [start with setting up the Agent][2] on a [supported operating system][1]. There are four types of monitoring that the Datadog Agent uses for Workload Protection:

1. **Process Execution Monitoring** to watch process executions for malicious activity on hosts or containers in real-time.
2. **File Integrity Monitoring** to watch for changes to key files and directories on hosts or containers in real-time.
3. **DNS Activity Monitoring** to watch network traffic for malicious activity on hosts and containers in real-time.
4. **Kernel Activity Monitoring** to watch for kernel-layer attacks like process hijacking, container breakouts, and more in real-time.

{{< img src="security/csm/csm_overview_3.png" alt="The Security Inbox on the Cloud Security overview shows a list of prioritized security issues to remediate" width="100%">}}

## Proactively block threats with Active Protection

By default, all OOTB Agent crypto mining threat detection rules are enabled and actively monitoring for threats.

[Active Protection][10] enables you to proactively block and terminate crypto mining threats identified by the Datadog Agent threat detection rules.

## Manage out-of-the-box and custom detection rules

Workload Protection Threats comes with more than 50 out-of-the-box detection rules that are maintained by a team of security experts. The rules surface the most important risks so that you can immediately take steps to remediate. Agent expression rules define the workload activities to be collected for analysis while backend detection rules analyze the activities and identify attacker techniques and other risky patterns of behavior.

Use [Cloud Security][1] with {{< tooltip glossary="Remote Configuration" case="title" >}} to automatically deploy new and updated rules to the Agent. [Customize the rules][5] by defining how each rule monitors process, network, and file activity, [create custom rules][6], and [set up real-time notifications](#set-up-real-time-notifications) for new signals.

{{< img src="security/cws/threats_detection_rules.png" alt="Workload Protection detection rules in the Datadog app" width="100%">}}

## Set up real-time notifications

[Send real-time notifications][3] when a threat is detected in your environment, so that your teams can take action to mitigate the risk. Notifications can be sent to [Slack, email, PagerDuty, webhooks, and more][4].

Use template variables and Markdown to [customize notification messages][5]. Edit, disable, and delete existing notification rules, or create new rules and define custom logic for when a notification is triggered based on severity and rule type.

## Investigate and remediate security signals

Investigate and triage security signals in the [Signals Explorer][8]. View detailed information about the impacted files or processes, related signals and logs, and remediation steps.

{{< img src="security/cws/signals_explorer.png" alt="Cloud Security Signals Explorer page" width="100%">}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSfzQARsTPr3tiJDnS_4bGx7w35LDfAbGUggaUzHYoL0dIUMWQ/viewform" btn_hidden="false" header="Active Protection">}}

Datadog is introducing a new feature called Active Protection to address the crypto threats detected in your environment automatically. Active Protection is in Preview. Fill out the form to request access.
{{< /callout >}}

## Get started

{{< whatsnext >}}
  {{< nextlink href="/security/cloud_security_management/setup/">}}Complete setup and configuration{{< /nextlink >}}
  {{< nextlink href="/account_management/rbac/permissions/#cloud-security-platform">}}Datadog role permissions for Workload Protection{{< /nextlink >}}
  {{< nextlink href="/security/workload_protection/workload_security_rules">}}Learn about Workload Protection detection rules{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-workload-security">}}Start using out-of-the-box Workload Protection detection rules{{< /nextlink >}}
  {{< nextlink href="/getting_started/cloud_security_management">}}Getting Started with Cloud Security{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /security/cloud_security_management/setup/
[2]: /agent/
[3]: /security/notifications/
[4]: /security/notifications/#notification-channels
[5]: /security/notifications/#detection-rule-notifications
[6]: /security/workload_protection/agent_expressions
[8]: /security/workload_protection/security_signals
[9]: /network_monitoring/performance/
[10]: /security/workload_protection/guide/active-protection