---
aliases:
- 6an-kt3-3oj
- /security_monitoring/default_rules/6an-kt3-3oj
- /security_monitoring/default_rules/apparmor_modified_tty
disable_edit: true
integration_id: cloud workload security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: cloud workload security
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: AppArmor profile modified
type: security_rules
---

## Goal
Detect modification of AppArmor profiles using an interactive session.

## Strategy
After an initial intrusion, attackers may attempt to disable security tools to avoid possible detection of their offensive tools and activities. [AppArmor][1] is a Linux Security Module (LSM) feature that confines programs to a limited set of resources. Disabling AppArmor could help an attacker run disallowed tools and gain access to resources that are otherwise blocked. This detection looks for commands that disable or modify AppArmor during interactive sessions, which is highly irregular in production environments.

## Triage & Response
1. Determine whether or not this is expected behavior.
2. If this behavior is unexpected, attempt to contain the compromise (possibly by terminating the workload, depending on the stage of attack) and look for indications of the initial compromise. Follow your organization's internal processes for investigating and remediating compromised systems.
3. Determine the nature of the attack and utilities involved. Investigate security signals (if present) occurring around the time of the event to establish an attack path.
4. Find and repair the root cause of the exploit.

*Requires Agent version 7.27 or greater*

[1]: https://wiki.ubuntu.com/AppArmor
