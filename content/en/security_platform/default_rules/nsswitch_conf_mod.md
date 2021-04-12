---
aliases:
- pzv-32s-1sa
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
- Runtime Agent
scope: ''
security: compliance
source: File Integrity Monitoring
title: Nsswitch Configuration Modified
type: security_rules
---

## Goal
Detect modifications to nsswitch.conf.

## Strategy
The Name Service Switch (nsswitch) configuration file is used to point system services and other applications to the sources of name-service information. This name-service information includes where the password file is stored, publickey information, and more. An attacker may attempt to modify nsswitch.conf in order to inject attacker-owned information into the authentication process. For instance, the attacker could point to a malicious password file and then login to privileged user accounts.

## Triage & Response
1. Check to see what changes were made to nsswitch.conf.
2. Check if critical name-service sources were changed, and whether the changes were a part of known system-setup or maintenance.
3. If these changes are unauthorized, roll back the host in question to a known good nsswitch.conf, or replace the system with a known-good system image.
