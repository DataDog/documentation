---
title: Detect and Monitor
description: Understand the Agent rules, detection rules, finding rules, threat intelligence, and Content Packs that Workload Protection uses to detect threats.
aliases:
  - /security/workload_protection/workload_security_rules
  - /security/threats/workload_security_rules
  - /security/cloud_workload_security/workload_security_rules
  - /security_platform/cloud_workload_security/workload_security_rules
disable_toc: false
---

Workload Protection evaluates your workload activity against several kinds of rules. Together they detect threats, assess your runtime security posture, and provide granular audit capabilities. Agent rules select which activity reaches Datadog. Detection rules and finding rules analyze that activity. Threat intelligence enriches it with reputation context, and Content Packs bundle optional rules for specific software stacks and threat vectors.

For how these rules fit together in the detection pipeline, see [How Workload Protection works][19].

## Agent rules

[Agent rules][1] define which system activity is sent to the Datadog backend for further analysis:
- [SECL guide][15] for writing custom agent rules with the SECL expression language
- [Policy management][9] for deploying custom and default agent rules
- [Variables and actions][16] for stateful detections and additional telemetry collection
- [Linux expressions][17] and [Windows expressions][18] for the full set of queryable SECL fields

## Detection and finding rules

[Detection and finding rules][3] describe the backend logic used to analyze [Agent events][2] and generate [signals][5] or [findings][6]:
- [Detection rules][11] for threat detection and incident response
- [Finding rules][12] for runtime posture and hardening
- [Linux backend syntax][13] and [Windows backend syntax][14] for the full set of queryable event fields

## Threat intelligence

Workload Protection uses threat intelligence databases to enrich your [Agent Events][2] and detect malware and known malicious entities. The [Threat Intelligence][7] page helps you:
- Explore the threat intelligence databases that are provided out-of-the-box (OOTB) with Workload Protection
- Import your own threat intelligence database and configure it to work with Workload Protection

## Content Packs

Workload Protection provides targeted, Datadog-crafted [Content Packs][10] built for specific software stacks, threat vectors, and emerging vulnerabilities. The [Content Packs][10] page helps you:
- Explore and enable Content Packs for key workload security use cases
- Deploy optional detections only to the workloads where they apply
- Stay current with emerging threats through Datadog-managed rule updates

[1]: /security/workload_protection/detect_and_monitor/agent_rules
[2]: /security/workload_protection/investigate_and_triage/agent_events
[3]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules
[5]: /security/workload_protection/investigate_and_triage/security_signals
[6]: /security/workload_protection/investigate_and_triage/security_findings
[7]: /security/workload_protection/detect_and_monitor/threat_intelligence
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
[19]: /security/workload_protection/#evaluating-activity
