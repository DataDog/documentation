---
aliases:
- a81-bja-19e
- /security_monitoring/default_rules/a81-bja-19e
- /security_monitoring/default_rules/selinux_disable_enforcement
disable_edit: true
fim: 'true'
integration_id: file integrity monitoring
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: file integrity monitoring
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: SELinux enforcement disabled
type: security_rules
---

## Goal
Detect when SELinux enforcement is disabled.

## Strategy
This detection monitors the change of SELinux enforcing mode.

## Triage & Response
1. Check which user or process disabled SELinux enforcing mode.
2. If the change is not expected, roll back to enable SELinux enforcing mode.
3. Investigate security signals (if present) occurring around the time of the event to establish an attack path.
4. Find and repair the root cause of the attack.

*Requires Agent version 7.30 or greater*
