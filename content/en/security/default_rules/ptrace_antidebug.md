---
aliases:
- 7b6-e6q-nwa
- /security_monitoring/default_rules/7b6-e6q-nwa
- /security_monitoring/default_rules/ptrace_antidebug
disable_edit: true
integration_id: cloud workload security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: cloud workload security
tactic: TA0005-defense-evasion
technique: T1497-virtualization-or-sandbox-evasion
title: PTRACE_TRACEME used to prevent process debugging
type: security_rules
---

## Goal
Detect usage of the ptrace system call with the `PTRACE_TRACEME` argument, indicating a program actively attempting to avoid debuggers attaching to the process. This behavior is typically indicative of malware activity.

## Strategy
The ptrace system call provides a means for one process to observe and control the execution of another process. This system call allows a process to modify the execution of another process, including changing memory and register values. One limitation of this system call is that a process can only have one trace, and malicious actors have been observed making use of this limitation to prevent debuggers from attaching to malicious processes for the purpose of forensics or analysis.

## Triage and response
1. Check the name of the process using TRACEME
2. If this file is not known or authorized, contain the host or container and roll back to a known good configuration. Initiate the incident response process.
*Requires Agent version 7.35 or greater*
