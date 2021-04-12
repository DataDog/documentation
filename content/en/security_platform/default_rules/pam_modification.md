---
aliases:
- tz1-6vg-1yz
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
- Runtime Agent
scope: ''
security: compliance
source: File Integrity Monitoring
title: PAM Configuration Files Modification
type: security_rules
---

## Goal
Detect modifications to `pam.d` directory.

## Strategy
Linux Pluggable Authentication Modules (PAM) provide authentication for applications and services. Authentication modules in the PAM system are setup and configured under the `/etc/pam.d/` directory. An attacker may attempt to modify or add an authentication module in PAM in order to bypass the authentication process, or reveal system credentials.

## Triage & Response
1. Check to see what changes were made to `/etc/pam.d/`.
2. Check whether the changes were a part of known system-setup or maintenance.
3. If these changes were unauthorized, roll back the host in question to a known good PAM configuration, or replace the system with a known-good system image.
