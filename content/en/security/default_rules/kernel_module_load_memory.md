---
aliases:
- jrx-axx-056
- /security_monitoring/default_rules/jrx-axx-056
- /security_monitoring/default_rules/kernel_module_load_memory
disable_edit: true
integration_id: cloud workload security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: cloud workload security
tactic: TA0003-persistence
technique: T1547-boot-or-logon-autostart-execution
title: Unfamiliar kernel module loaded from memory
type: security_rules
---

## Goal
Kernel modules can be used to automatically execute code when a host starts up. Attackers sometimes use kernel modules to gain persistence on a particular host, ensuring that their code is executed even after a system reboot. Kernel modules can also help attackers gain elevated permissions on a system.

Loading a malicious kernel module is a type of rootkit. Rootkits often create backdoor access and hide evidence of themselves. This includes process, file, and network activity.

## Strategy
Kernel modules are loaded from the `/lib/modules` directory in Linux by default. In an attempt to thwart forensics, attackers sometimes attempt to load malicious kernel modules from memory so as not to leave artifacts on disk. This detection watches for all new kernel modules being loaded directly from memory. 

## Triage and response
1. Check the name of the new kernel module created.
2. If the new kernel module is not expected, contain the host or container and roll back to a known good configuration. Initiate the incident response process.

*Requires Agent version 7.35 or greater*
