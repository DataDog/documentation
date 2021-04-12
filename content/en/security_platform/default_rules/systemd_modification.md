---
aliases:
- cz4-vmk-ju2
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
- Runtime Agent
scope: ''
security: compliance
source: File Integrity Monitoring
title: Systemd Modification
type: security_rules
---

## Goal
Detect modifications to system services.

## Strategy
Especially in production, systems should be generated based on standard images such as AMIs for Amazon EC2, VM images in Azure, or GCP images. Systemd is the default service manager in many Linux distributions. It manages the lifecycle of background processes and services, and can be used by an attacker to establish persistence in the system. Attackers can do this by injecting code into existing systemd services, or by creating new ones. Systemd services can be started on system boot, and therefore attacker code can persist through system reboots.

## Triage & Response
1. Check to see what service was modified of created.
2. Identify whether it is a known service, being modified by a known user and/or process.
3. If these changes are not acceptable, roll back the host in question to an acceptable configuration.
