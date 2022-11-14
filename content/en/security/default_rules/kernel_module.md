---
aliases:
- 4nu-jvj-zxf
- /security_monitoring/default_rules/4nu-jvj-zxf
- /security_monitoring/default_rules/kernel_module
disable_edit: true
fim: 'true'
integration_id: file integrity monitoring
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: file integrity monitoring
tactic: TA0003-persistence
technique: T1547-boot-or-logon-autostart-execution
title: Kernel module directory modified
type: security_rules
---

## Goal
Kernel modules can be used to automatically execute code when a host starts up. Attackers sometimes use kernel modules to gain persistence on a particular host, ensuring that their code is executed even after a system reboot. Kernel modules can also help attackers gain elevated permissions on a system.

Loading a malicious kernel module is a type of rootkit. Rootkits often create backdoor access and hide evidence of themselves. This includes process, file, and network activity.

## Strategy
Kernel modules are loaded from the `/lib/modules` directory in Linux. This detection watches for all new files created under that directory.

## Triage and response
1. Check the name of the new kernel module created.
2. Check which user or process created the module.
3. If the new kernel module is not expected, contain the host or container and roll back to a known good configuration. Initiate the incident response process.

*Requires Agent version 7.27 or greater*
