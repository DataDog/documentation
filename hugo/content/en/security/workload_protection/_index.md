---
title: Workload Protection
aliases:
  - /security_platform/cloud_workload_security/
  - /security/cloud_workload_security/
  - /security/cloud_workload_security/agent_expressions
  - /security/cloud_workload_security/backend/
  - /security/threats/security_profiles
  - /security/threats/runtime_anomaly_detection
  - /security/threats/
  - /security/threats/agent
  - /security/workload_protection/agent
further_reading:
  - link: "https://www.datadoghq.com/blog/workload-protection-investigation/"
    tag: "Blog"
    text: "Turn fragmented runtime signals into coherent attack stories with Datadog Workload Protection"
  - link: "https://www.datadoghq.com/blog/workload-protection-findings"
    tag: "Blog"
    text: "Surface and remediate runtime posture issues with Workload Protection Findings"
  - link: "https://learn.datadoghq.com/courses/workload-protection-detect-compromises"
    tag: "Learning Center"
    text: "Detect Host and Container Compromises with Workload Protection"
  - link: "https://learn.datadoghq.com/courses/workload-protection-enable-manage"
    tag: "Learning Center"
    text: "Enable and Manage Workload Protection"
cascade:
- _target:
    path: /security/workload_protection/backend_linux
  aliases:
    - /security/threats/backend_linux
- _target:
    path: /security/workload_protection/backend_windows
  aliases:
    - /security/threats/backend_windows
- _target:
    path: /security/workload_protection/linux_expressions
  aliases:
    - /security/threats/linux_expressions
- _target:
    path: /security/workload_protection/windows_expressions
  aliases:
    - /security/threats/windows_expressions

---

## Overview

Datadog Workload Protection provides real-time visibility and defense for your infrastructure by continuously monitoring file, network, and process activity across your environments. It detects threats as they occur, generating security signals and findings. Use them to identify, investigate, and stop malicious behaviors before they impact your workloads.

Workload Protection is part of the Datadog Security platform. Signals correlate with misconfiguration scans, vulnerability assessments, and code security findings, so you can link runtime attacks to preexisting weaknesses. Because it runs on the Datadog platform, it also connects with your infrastructure metrics, traces, and logs. That context helps you understand a threat's scope and reconstruct the attack story.

## Beyond runtime threat detection

Workload Protection is not limited to runtime threat detection. Many organizations use it across a range of security and operational use cases:

- **Compliance Validation:** Workload Protection helps you validate compliance with regulatory frameworks such as PCI, FedRAMP, and SOC 2 by continuously monitoring runtime activity for policy violations, risky configurations, and unauthorized changes.

- **Runtime Security Posture:** Workload Protection improves your security posture by identifying unsafe runtime practices and sensitive configuration drifts, helping you catch weaknesses before they can be exploited.

- **Infrastructure Monitoring:** Workload Protection tracks any kind of runtime behavior, whether security-related or not. From debugging custom workloads to monitoring system-level processes and remote user sessions, it offers real-time visibility into how your environments operate.

{{< img src="security/workload_protection/k8s_remote_access.png" alt="Breakdown of Kubernetes remote user sessions" width="100%">}}

## How it works

Workload Protection evaluates the activity it collects in two places: on the Datadog Agent, and in Datadog.

### Saving resources by design

Workload Protection detection rules are complex, correlating several datapoints across time and processes. This complexity would result in considerable compute resource demands on the Agent host if all rules were evaluated there.

Datadog solves this problem by keeping the Agent lightweight with efficient rules that filter out non-security-relevant activity from your workloads and processing the remaining activity using threat detection and finding rules on the Datadog backend. Agent rules are organized in [policies][14], which you deploy with {{< tooltip glossary="Remote Configuration" case="title" >}} or manually. You can manage rules and policies in Datadog, in Agent configuration files, or with the Datadog Terraform provider.

{{< img src="security/workload_protection/workload_protection_detection_architecture.png" alt="Workload Protection architecture overview" width="100%">}}

### Collecting runtime activity

The Datadog Agent collects runtime activity from your workloads. The collection mechanism depends on the platform:

- **Linux**: the eBPF Agent, which offers the broadest feature support.
- **AWS Fargate**: the cws-instrumentation tracer. Fargate does not provide eBPF access, so this Agent uses ptrace instead. It covers the major Workload Protection features, including File Integrity Monitoring and process execution monitoring.
- **Windows**: a Windows driver.

Across Linux and Windows, Workload Protection covers over 40 event types, spanning process, file system, kernel, and network activity. For the distributions, versions, and cloud environments each Agent supports, see [Setup][1].

### Evaluating activity

Agent rules perform lightweight filtering so they run efficiently on every host. Datadog evaluates the more complex correlations across time and processes:

1. The [agent rules][6] evaluate system activity on the Agent host.
2. When activity matches an agent rule expression, the Agent generates an [agent event][7] and passes it to Datadog.
3. Datadog evaluates the agent events against [detection rules][8] and [finding rules][9].
4. If a detection rule matches, a signal is generated and displayed in [Signals][10]. If an agent event attribute matches a [threat intelligence indicator][13], the matching indicator is also displayed.
5. If a finding rule matches, a finding is generated and displayed in [Findings][11].
6. Any [notification rules][12] matching the signal's severity, rule type, tags, and attributes are triggered.

Workload Protection ships with over 350 agent rules and 200 detection rules, covering most MITRE ATT&CK tactics and techniques. You can also write your own, including in-agent state machines that alert only on complex indicators of compromise.

### Responding to threats

Response actions run in the Agent. The Agent can terminate a process or container, or block network traffic using an eBPF-based filter. You can trigger these actions two ways:

- **Automated response** attaches an action to an agent rule, so the Agent acts as soon as the rule matches.
- **Manual response** lets you act from a signal after it is generated.

Both depend on enforcement being enabled in the Agent. See [Respond to Threats][4].

You can also respond from Datadog instead of the Agent. Trigger a [workflow][15] from a signal, or integrate signals with your existing response pipelines. See [Signal actions][16].

## Next steps

### Setup

Begin with the [Setup][1] guide. It covers supported environments, how to deploy the Agent, and how to experiment with Workload Protection's features using the playground scripts.

### Detect and monitor

Read the [Detect and Monitor][2] pages to understand how agent events translate into Workload Protection signals and findings. These pages help you explore the built-in (OOTB) detections and create your own detection logic.

### Investigate and triage

See the [Investigate and Triage][3] pages to discover the explorers and in-app views available in Workload Protection. These pages help you make the most of the events, signals, and findings generated by the platform.

### Respond to threats

The [Respond to Threats][4] page explains how to configure automated and manual response. It covers the Agent enforcement requirements, the response actions available, and how to interpret their results.

### Coverage

Use [Coverage][5] to get a unified, real-time view of Workload Protection posture across hosts, containers, and serverless workloads. Identify policy deployment issues, unprotected assets, and detection gaps before they become exploitable risks.

### Guides

{{< whatsnext desc="Use case driven examples to help you discover and learn about Workload Protection:" >}}
{{< nextlink href="/security/workload_protection/guide/tuning-rules" >}}Best Practices for Tuning Workload Protection Security Signals{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /security/workload_protection/setup
[2]: /security/workload_protection/detect_and_monitor
[3]: /security/workload_protection/investigate_and_triage
[4]: /security/workload_protection/respond_and_report
[5]: /security/workload_protection/inventory
[6]: /security/workload_protection/detect_and_monitor/agent_rules
[7]: /security/workload_protection/investigate_and_triage/agent_events
[8]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[9]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[10]: /security/workload_protection/investigate_and_triage/security_signals
[11]: /security/workload_protection/investigate_and_triage/security_findings
[12]: /security/notifications/rules
[13]: /security/workload_protection/detect_and_monitor/threat_intelligence
[14]: /security/workload_protection/detect_and_monitor/agent_rules/policy_management
[15]: /actions/workflows/
[16]: /security/workload_protection/investigate_and_triage/security_signals/actions
