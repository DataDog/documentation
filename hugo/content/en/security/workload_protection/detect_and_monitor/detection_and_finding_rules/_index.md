---
title: Detection and Finding Rules
description: Compare the backend detection rules and finding rules that Workload Protection uses to analyze Agent events.
disable_toc: false
---

After the Agent forwards [Agent events][1] to Datadog, backend rules analyze that telemetry to produce security outcomes. Workload Protection provides two types of backend rules:

- **[Detection rules][2]** detect threats and generate [security signals][3] when suspicious activity matches your criteria. They surface real runtime security threats—for example, a reverse shell or credential access attempt.
- **[Finding rules][4]** evaluate runtime security posture and generate [findings][5] with recommendations for resources that fail a policy. They track ongoing bad practices and misconfigurations on a host or container—for example, package manager usage in a production container.

Both rule types query the same **backend event schema**. Each event includes all fields collected by the Agent, plus additional enrichment such as infrastructure context and threat intelligence. When you write a search query for a detection or finding rule, you can filter on any field in this schema. See [Linux backend syntax][6] and [Windows backend syntax][7] for the full set of available fields.

## Detection rules versus finding rules

| | Detection rules | Finding rules |
|---|---|---|
| **Output** | Security signal | Finding |
| **Represents** | Real runtime security threats | Posture issues and security recommendations |
| **Use case** | Threat detection and incident response | Runtime posture and hardening |

For example, `Sudoers Policy File Modification Detection` flags modifications to `/etc/sudoers` and files in `/etc/sudoers.d/`. Modifying those files is a bad practice, but it can be part of a legitimate process. Treating it as a detection rule generates excessive noise. As a finding rule, it tracks which resources have this configuration without triggering a signal for every file write.

## Next steps

- Read [Detection rules][2] to explore out-of-the-box (OOTB) threat detection rules and create custom detection rules.
- Read [Finding rules][4] to explore OOTB posture rules and create custom finding rules.
- Browse [Linux backend syntax][6] and [Windows backend syntax][7] to see every field you can use in rule queries.

[1]: /security/workload_protection/investigate_and_triage/agent_events
[2]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[3]: /security/workload_protection/investigate_and_triage/security_signals
[4]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[5]: /security/workload_protection/investigate_and_triage/security_findings
[6]: /security/workload_protection/backend_linux
[7]: /security/workload_protection/backend_windows
