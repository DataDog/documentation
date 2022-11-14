---
aliases:
- dvz-4x3-3ws
- /security_monitoring/default_rules/dvz-4x3-3ws
- /security_monitoring/default_rules/credential_modified
disable_edit: true
fim: 'true'
integration_id: file integrity monitoring
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: file integrity monitoring
tactic: TA0006-credential-access
technique: T1003-os-credential-dumping
title: Credentials file modified
type: security_rules
---

## Goal
Detect modifications to sensitive credential files from non-standard processes.

## Strategy
Especially in production, all credentials should be either defined as code, or static. Drift and unmonitored changes to these credentials can open up attack vectors for adversaries, and cause your organization to be out of compliance with any frameworks or regulations that you are subject to. This detection watches for the modification of sensitive credential files which should not be changed outside of their definitions as code (or static definitions). The Linux commands `vipw` and `vigr` are the standard way to modify shadow and gshadow files respectively. Other processes interacting with these sensitive credential files is highly suspicious and should be investigated.

## Triage and response
1. Identify the user or process that changed the credential file(s).
2. Identify what was changed in the credential files.
3. If these changes are not acceptable, roll back contain the host or container in question to an acceptable configuration.

*Requires Agent version 7.27 or greater*
