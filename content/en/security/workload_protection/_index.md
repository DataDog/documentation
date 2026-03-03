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
further_reading:
  - link: "https://www.datadoghq.com/blog/workload-protection-investigation/"
    tag: "Blog"
    text: "Turn fragmented runtime signals into coherent attack stories with Datadog Workload Protection"
cascade:
- _target:
    path: /security/workload_protection/agent_expressions
  aliases:
    - /security/threats/agent_expressions
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

Datadog Workload Protection provides real-time visibility and defense for your infrastructure by continuously monitoring file, network, and process activity across your environments. It detects threats as they occur, helping you identify, investigate, and stop malicious behaviors before they impact your workloads.

### Actionable, prioritized and contextualized threat detection in real-time

Workload Protection relies on event correlation to surface contextualized and prioritized alerts. As part of the Datadog Security platform, Workload Protection correlates runtime threat detection with findings from misconfiguration scans, vulnerability assessments, and code security. This deep integration enables you to link runtime attacks with preexisting weaknesses, providing the complete context you need to investigate and remediate security incidents. Because Workload Protection is built on the Datadog platform, it also connects with your infrastructure telemetry — including metrics, traces, and logs — so you can understand the scope and impact of threats across your systems. Simply put, investigations are enriched with full context so you can easily reconstruct the entire attack story from detection to resolution.

{{< img src="security/workload_protection/workload_protection_signal.jpg" alt="Workload Protection signal with an investigation and a threat timeline" width="100%">}}

### Response, remediation and hardening capabilities

You can also take action directly from the Datadog App to block malicious behaviors, trigger remediation workflows, or integrate with your existing response pipelines. Whether your goal is to enforce compliance, strengthen your runtime security posture, or address workload hardening use cases, Workload Protection can take action on your behalf to keep your environments secure and resilient.

### Beyond threat detection: expanded use cases

Workload Protection is not limited to runtime threat detection. Many organizations leverage it across a range of security and operational use cases:

- **Compliance Validation:** Workload Protection helps you validate compliance with regulatory frameworks such as PCI, FedRAMP, and SOC 2 by continuously monitoring runtime activity for policy violations, risky configurations, and unauthorized changes.

- **Runtime Security Posture:** Workload Protection improves your security posture by identifying unsafe runtime practices and sensitive configuration drifts, helping you catch weaknesses before they can be exploited.

- **Infrastructure Monitoring:** Acting as a Swiss army knife for runtime observability, Workload Protection enables teams to track any kind of runtime behavior — security-related or otherwise. From debugging custom workloads to monitoring system-level processes and remote user sessions, Workload Protection offers deep, real-time visibility into how your environments operate.

{{< img src="security/workload_protection/k8s_remote_access_image.png" alt="Breakdown of Kubernetes remote user sessions" width="100%">}}

### Detection Rules, automation, and fleet management

Workload Protection comes out of the box (OOTB) with a comprehensive set of security rules and visibility tools. It includes over 350 agent rules and 200 detection rules, carefully designed to cover most of the MITRE ATT&CK tactics and techniques used by attackers today. This extensive coverage allows teams to detect and mitigate threats across various stages of exploitation, even if they lack the time or specialized expertise to craft detection rules themselves. To complement these detections, the platform provides in-app coverage maps that help users visualize what’s deployed, where it’s active, and what’s protected — ensuring complete and transparent visibility across the entire infrastructure.

For advanced detection and response capabilities, our platform enables custom rule writing, correlation, and automated actions. It supports over 40 event types on Linux and Windows, spanning process, file system, kernel, and network activities. Security teams can define in-agent state machines, enabling contextualized detection logic that triggers alerts only on meaningful and complex indicators of compromise (IOCs).

Managing and scaling protection across large environments is simplified with powerful agent fleet and rule management capabilities. Using {{< tooltip glossary="Remote Configuration" case="title" >}}, teams can push agent rules directly from the UI and receive automatic threat definition updates from Datadog to stay current with evolving attack techniques. The platform also offers flexible configuration and customization options through the UI, CLI, or Terraform, allowing security teams to tailor their detection strategy and deployment workflows to their specific operational needs.

## High level architecture overview

Workload Protection is built on top of the Datadog Agent, which continuously collects real-time runtime telemetry from your workloads. Agent rules determine which security-relevant events are streamed to Datadog for centralized analysis. Once ingested, these events are processed by backend detection and finding rules, which analyze the data to generate detailed, prioritized Signals or Findings.

Using Remote Configuration, you can manage agent rule deployments and trigger response or remediation actions directly from the Datadog app. In addition, Workload Protection integrates with the Datadog Terraform provider, allowing you to define, version, and maintain your rules as code outside the app.

{{< img src="security/workload_protection/workload_protection_architecture.png" alt="Workload Protection architecture overview" width="100%">}}

## Next steps

### Getting started

Begin by exploring our Getting Started guide, which introduces the high-level architecture of Workload Protection. You’ll learn about supported environments, how to deploy the agent, and how to experiment with Workload Protection’s features using our playground scripts.

### Detect and Monitor

Dive into our Detect and Monitor resources to understand how agent events translate into Workload Protection signals and findings. These pages will help you explore the built-in (OOTB) detections and guide you in creating your own detection logic.

### Investigate and Triage

Visit our Investigate and Triage sections to discover the different explorers and in-app views available in Workload Protection. These pages will help you make the most of the events, signals, and findings generated by the platform.

### Respond and Report

Head to our Respond and Report pages to learn how to configure Workload Protection for automated remediation and team performance reporting. You’ll find guidance on mitigating threats and tracking metrics like Mean Time to Remediation (MTTR).

### Guides

{{< whatsnext desc="We've put together use case driven examples to help you discover and learn about Workload Protection:" >}}
{{< nextlink href="/security/workload_protection/guide/active-protection" >}}Proactively block crypto mining threats with Active Protection{{< /nextlink >}}
{{< nextlink href="/security/workload_protection/guide/tuning-rules" >}}Best Practices for Fine-Tuning Workload Protection Security Signals{{< /nextlink >}}
{{< nextlink href="/security/workload_protection/secl_auth_guide" >}}Writing custom rule expressions{{< /nextlink >}}
{{< nextlink href="/security/workload_protection/guide/ebpf-free-agent" >}}Threat Detection for Linux Without eBPF Support{{< /nextlink >}}
{{< /whatsnext >}}