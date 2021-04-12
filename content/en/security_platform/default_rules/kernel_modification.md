---
aliases:
- mzz-4y1-zai
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
- Runtime Agent
scope: ''
security: compliance
source: File Integrity Monitoring
title: Kernel Modification
type: security_rules
---

## Goal
Detect modifications made to the `/boot/` directory.

## Strategy
The /boot/ directory in Linux contains everything required for the system to boot. This includes the kernel and other important boot files and data. Attackers may attempt to modify the /boot/ directory to inject malicious code or configuration. This can allow the attacker to gain persistence, by running the malicious code or configuration at boot time. It can also allow the attacker to run malicious code with elevated system privileges.

## Triage & Response
1. Check to see what modifications were made to the `/boot/` directory.
2. Cross-check any changes with known system activity, such as startup scripts, or maintenance.
3. If these changes are not acceptable, roll back the host or container in question to a known good `/boot/` configuration.
