---
title: Detect and Monitor
aliases:
  - /security/workload_protection/workload_security_rules
  - /security/threats/workload_security_rules
  - /security/cloud_workload_security/workload_security_rules
  - /security_platform/cloud_workload_security/workload_security_rules
disable_toc: false
---

## Overview

Workload Protection processes multiple feeds to detect threats, evaluate your runtime security posture, and provide granular audit capabilities in your environment. This documentation describes each feed, their purpose, how they interact with each other and how to configure them to implement your own logic.

## High level architecture

Workload Protection is built on top of the Datadog Agent, which continuously collects runtime telemetry from your workloads. Depending on your environment, this telemetry is collected using eBPF, ptrace, or a Windows driver. Agent rules determine which security-relevant events are streamed to Datadog for centralized analysis. After they are ingested, these events are processed by backend detection and finding rules, which analyze the data to generate detailed and prioritized Signals or Findings.

{{< img src="security/workload_protection/detect_and_monitor/threat_detection_pipeline_2.png" alt="Workload Protection detection architecture overview" width="100%">}}

Workload Protection uses the following pipeline to protect your workloads:

1. The [Agent rules][1] evaluate system activity on the Agent host.
2. When activity matches an Agent rule expression, the Agent generates an [Agent Event][2] and passes it to the Datadog backend.
3. The Datadog backend evaluates the agent events to see if they match any threat [Detection rules][11] or [Finding rules][12].
4. If a detection rule matches, a signal is generated and displayed in [Signals][5].
5. If a finding rule matches, a finding is generated and displayed in [Findings][6].
6. If the value of one of the attributes of an agent event matches a [threat intelligence indicator][7], a signal is generated and displayed in [Signals][5].
7. Any [Notification Rules][8] that match the severity, detection rule type, tags, and attributes of the generated signal are triggered.

### Saving resources by design

Workload Protection detection rules are complex, correlating several datapoints across time and processes. This complexity would result in considerable compute resource demands on the Agent host if all rules were evaluated there.

Datadog solves this problem by keeping the Agent lightweight with efficient rules that filter out all non security relevant activity from your workloads, and processes the rest using the threat detection and finding rules on the Datadog backend. You can learn more about this process in the dedicated [Agent rules][1] page.

## Agent rules

[Agent rules][1] define which system activity is sent to the Datadog backend for further analysis. The section covers:
- [SecL guide][15] for writing custom agent rules with the SecL expression language
- [Policy management][9] for deploying custom and default agent rules
- [Variables and actions][16] for stateful detections and additional telemetry collection
- [Linux expressions][17] and [Windows expressions][18] for the full set of queryable SecL fields

## Detection and finding rules

[Detection and finding rules][3] describe the backend logic used to analyze [Agent events][2] and generate [signals][5] or [findings][6]. The section covers:
- [Detection rules][11] for threat detection and incident response
- [Finding rules][12] for runtime posture and hardening
- [Linux backend syntax][13] and [Windows backend syntax][14] for the full set of queryable event fields

## Threat intelligence

Workload Protection uses threat intelligence databases to enrich your [Agent Events][2] and detect malware and known malicious entities. The [Threat Intelligence][7] page helps you:
- Explore the threat intelligence databases that are provided Out Of The Box (OOTB) to Workload Protection
- Import your own threat intelligence database and configure it to work with Workload Protection

## Content Packs

Workload Protection provides targeted, Datadog-crafted [Content Packs][10] built for specific software stacks, threat vectors, and emerging vulnerabilities. The [Content Packs][10] page helps you:
- Explore and enable Content Packs for key workload security use cases
- Deploy optional detections only to the workloads where they apply
- Stay current with emerging threats through Datadog-managed rule updates

[1]: /security/workload_protection/detect_and_monitor/agent_rules
[2]: /security/workload_protection/investigate_and_triage/agent_events
[3]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules
[4]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[5]: /security/workload_protection/investigate_and_triage/security_signals
[6]: /security/workload_protection/investigate_and_triage/security_findings
[7]: /security/workload_protection/detect_and_monitor/threat_intelligence
[8]: /security/notifications/rules
[9]: /security/workload_protection/detect_and_monitor/agent_rules/policy_management
[10]: /security/workload_protection/detect_and_monitor/content_packs
[11]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[12]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[13]: /security/workload_protection/backend_linux
[14]: /security/workload_protection/backend_windows
[15]: /security/workload_protection/detect_and_monitor/agent_rules/secl_guide
[16]: /security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions
[17]: /security/workload_protection/linux_expressions
[18]: /security/workload_protection/windows_expressions