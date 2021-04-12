---
aliases:
- 4nu-jvj-zxf
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
- Runtime Agent
scope: ''
security: compliance
source: File Integrity Monitoring
title: A kernel module was added to /lib/modules/
type: security_rules
---

## Goal
Kernel modules can be used to automatically execute code when a host starts up. Attackers sometimes use kernel modules to gain persistence on a particular host, ensuring that their code is executed even after a system reboot. Kernel modules also can help attackers gain elevated permissions on a system.

## Strategy
Kernel modules are loaded from the `/lib/modules` directory in Linux. This detection watches for all new files created under that directory.

## Triage & Response
1. Check the name of the new kernel module created.
2. Check which user or process created the module.
3. If the new kernel module is not expected, contain the host or container, and roll back to a known good configuration.
