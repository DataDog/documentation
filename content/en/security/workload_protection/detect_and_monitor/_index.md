---
title: Detect and Monitor
disable_toc: false
---

## Overview

Workload Protection processes multiple feeds to detect threats, evaluate your runtime security posture and provide granular audit capabilities in your environment. This documentation describes each feed, their purpose, how they interact with each other and how to configure them to implement your own logic.

## High level architecture

Workload Protection is built on top of the Datadog Agent, which continuously collects runtime telemetry from your workloads. Depending on your environment, this telemetry is collected using eBPF, ptrace or a Windows driver. Agent rules determine which security-relevant events are streamed to Datadog for centralized analysis. Once ingested, these events are processed by backend detection and finding rules, which analyze the data to generate detailed and prioritized Signals or Findings.

{{< img src="security/workload_protection/workload_protection_detection_architecture.png" alt="Workload Protection detection architecture overview" width="100%">}}

Workload Protection uses the following pipeline to protect your workloads:

1. The [Agent rules][1] evaluate system activity on the Agent host.
2. When activity matches an Agent rule expression, the Agent generates an [Agent Event][2] and passes it to the Datadog backend.
3. The Datadog backend evaluates the agent events to see if they match any threat [Detection rules][3] or [Finding rules][4].
4. If a detection rule matches, a signal is generated and displayed in [Signals][5].
5. If a finding rule matches, a finding is generated and displayed in [Findings][6].
6. If the value of one of the attributes of an agent event matches a [threat intelligence indicator][7], a signal is generated and displayed in [Signals][5].
7. Any [Notification Rules][8] that match the severity, detection rule type, tags, and attributes of the generated signal are triggered.

### Saving resources by design

Workload Protection detection rules are complex, correlating several datapoints across time and processes. This complexity would result in considerable compute resource demands on the Agent host if all rules were evaluated there.

Datadog solves this problem by keeping the Agent lightweight with highly efficient rules that filter out all non security relevant activity from your workloads, and processes the rest using the threat detection and finding rules on the Datadog backend. You can learn more about this process in the dedicated [Agent rules][1] page.

## Agent rules

[Agent rules][1] define which system activity is sent to the Datadog backend for further analysis. The [Agent rules][1] page and its sub-pages will help you:
- Write custom agent rules
- Deploy custom and default agent rules using [Policies][9]
- Leverage variables to built complex detections based on state machines
- Configure actions to collect additional telemetry (like file hashes) or take proactive remediation steps to protect your infrastructure

## Detection rules

[Detection rules][1] describe the logic used to detect threats in your environment by analysing [Agent Event][2]. The [Detection rules][1] page will help you:
- Explore and configure Out Of The Box (OOTB) detection rules
- Write custom detection rules

## Finding rules

[Finding rules][4] describe the logic used to track bad practices and evaluate your runtime security posture based upon the analysis of [Agent Event][2]. The [Finding rules][4] page will help you:
- Explore and configure Out Of The Box (OOTB) finding rules
- Write custom finding rules

## Threat intelligence

Workload Protection leverages threat intelligence databases to enrich your [Agent Events][2] and detect malwares and known malicious entities. The [Threat Intelligence][4] page will help you:
- Explore the threat intelligence databases that are provided Out Of The Box (OOTB) to Workload Protection
- Import your own threat intelligence database and configure it to work with Workload Protection

[1]: /security/workload_protection/detect_and_monitor/agent_rules
[2]: /security/workload_protection/investigate_and_triage/agent_events
[3]: /security/workload_protection/detect_and_monitor/detection_rules
[4]: /security/workload_protection/detect_and_monitor/finding_rules
[5]: /security/workload_protection/investigate_and_triage/security_signals
[6]: /security/workload_protection/investigate_and_triage/security_findings
[7]: /security/workload_protection/detect_and_monitor/threat_intelligence
[8]: /security/configuration/notification-rules
[9]: /security/workload_protection/detect_and_monitor/agent_rules/policy_management