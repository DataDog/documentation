---
aliases:
- iu4-15i-eay
- /security_monitoring/default_rules/iu4-15i-eay
- /security_monitoring/default_rules/ptrace_injection
disable_edit: true
integration_id: cloud workload security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: cloud workload security
tactic: TA0005-defense-evasion
technique: T1055-process-injection
title: Process injected into another process
type: security_rules
---

## Goal
Detect usage of the ptrace systemcall to inject code into another process.

## Strategy
The ptrace system call provides a means for one process to observe and control the execution of another process. This system call allows a process to modify the execution of another process, including changing memory and register values. Malicious actors have been observed using ptrace to inject code into another process, for the purposes of defense evasion and privilege escalation.

## Triage and response
1. Check the name of the process doing the injection (the tracer).
2. Identify if the file doing the injection (the tracer) is authorized.
3. If the tracer is not authorized in this environment, or is not normally known to use the ptrace syscall, contain the host or container and roll back to a known good configuration. Initiate the incident response process.

*Requires Agent version 7.35 or greater*
