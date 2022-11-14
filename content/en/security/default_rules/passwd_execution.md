---
aliases:
- sc8-pjc-tut
- /security_monitoring/default_rules/sc8-pjc-tut
- /security_monitoring/default_rules/passwd_execution
disable_edit: true
integration_id: runtime security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: runtime security
tactic: TA0003-persistence
technique: T1098-account-manipulation
title: Local account password modified
type: security_rules
---

## Goal
Detect use of the `passwd` or `chpasswd` commands to change account passwords.

## Strategy
The `passwd` operating system command is used to change user account passwords. The `chpasswd` does this in bulk. If this is unexpected behavior, it could indicate an attacker attempting to compromise your host machine and achieve persistence. This detection is triggered when execution of the `passwd` or `chpasswd` command is detected.

## Triage and response
1. Determine which user executed the command and whether or not this is allowed or expected behavior.
2. If this behavior is unexpected, attempt to contain the compromise (this may be achieved by terminating the workload, depending on the stage of attack) and look for indications of initial compromise. Follow your organization's internal processes for investigating and remediating compromised systems.
3. Investigate security signals (if present) occurring around the time of the event to establish an attack path.
4. Find and repair the root cause of the exploit.

*Requires Agent version 7.27 or greater*
