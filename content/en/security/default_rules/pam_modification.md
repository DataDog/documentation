---
aliases:
- tz1-6vg-1yz
- /security_monitoring/default_rules/tz1-6vg-1yz
- /security_monitoring/default_rules/pam_modification
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
technique: T1556-modify-authentication-process
title: System authentication files modified
type: security_rules
---

## Goal
Detect modifications to `pam.d` directory.

## Strategy
Linux Pluggable Authentication Modules (PAM) provide authentication for applications and services. Authentication modules in the PAM system are setup and configured under the `/etc/pam.d/` directory. An attacker may attempt to modify or add an authentication module in PAM in order to bypass the authentication process, or reveal system credentials.

## Triage and response
1. Identify if the changes to the path `{{@file.path}}` were part of known system setup or mainenance.
2. If these changes were unauthorized, roll back the host in question to a known good PAM configuration, or replace the system with a known-good system image.

*Required agent version 7.27 or higher*
