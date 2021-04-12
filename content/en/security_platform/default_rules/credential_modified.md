---
aliases:
- dvz-4x3-3ws
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
- Runtime Agent
scope: ''
security: compliance
source: File Integrity Monitoring
title: Either /etc/shadow/ or /etc/gshadow was modified by a non-standard tool
type: security_rules
---

## Goal
Detect modifications to sensitive credential files from non-standard processes.

## Strategy
Especially in production, all credentials should be either defined as code, or static. Drift and unmonitored changes to these credentials can open up attack vectors for adversaries, and cause your organization to be out of compliance with any frameworks or regulations that you are subject to. This detection watches for the modification of sensitive credential files which should not be changed outside of their definitions as code (or static definitions). The Linux commands `vipw` and `vigr` are the standard way to modify shadow and gshadow files respectively. Other processes interacting with these sensitive credential files is highly suspicious and should be investigated.

## Triage & Response
1. Check to see which user or process changed the credential file(s).
2. Check what was changed in the credential files.
3. If these changes are not acceptable, roll back contain the host or container in question to an acceptable configuration.
