---
aliases:
- e59-lrj-bki
- /security_monitoring/default_rules/e59-lrj-bki
- /security_monitoring/default_rules/ssh_authorized_keys
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
technique: T1098-account-manipulation
title: SSH authorized keys modified
type: security_rules
---

## Goal
Detect modifications to authorized SSH keys.

## Strategy
SSH is a commonly used key-based authentication mechanism. In this system, the authorized_keys file specifies SSH keys that can be used to authenticate as a specific user on the system. Attacker's may modify the authorized_keys file to authorize attacker-owned SSH keys. This allows the attacker to maintain persistence on a system as a specific user.

## Triage and response
1. Check what changes were made to authorized_keys, and under which user.
2. Determine whether any keys were added. If so, determine if the added keys belong to known trusted users.
3. If they keys in question are not acceptable, roll back the host or container in question to a known trusted SSH configuration.


*Requires Agent version 7.27 or greater*
