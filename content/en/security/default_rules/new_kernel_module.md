---
aliases:
- mnc-w4f-4pf
- /security_monitoring/default_rules/mnc-w4f-4pf
- /security_monitoring/default_rules/new_kernel_module
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
title: Unfamiliar kernel module loaded
type: security_rules
---

## Goal
Attackers can leverage malicious kernel modules to gain persistence on a system, ensuring their malicious code is executed even after a system reboot. Kernel modules can also help attackers gain elevated permissions and cover their tracks through the use of a rootkit.

Loading a malicious kernel module can be a type of rootkit. Rootkits often create backdoor access and hide evidence of themselves. This includes process, file, and network activity.

## Strategy
Kernel modules are loaded from the `/lib/modules` directory in Linux by default, however attackers may attempt to load kernel modules from other locations as well. This detection detects all kernel module loads. 

This rule uses the New Value detection method. Datadog will learn the historical behavior of a specified field in agent logs and then create a signal when unfamiliar values appear.

## Triage and response
1. Check the name of the new kernel module created.
2. Check the name of the process loading the kernel module.
3. If the new kernel module is not expected, contain the host or container and roll back to a known good configuration. Initiate the incident response process.
