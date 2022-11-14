---
aliases:
- b2t-p3g-d09
- /security_monitoring/default_rules/b2t-p3g-d09
- /security_monitoring/default_rules/onelogin-user-granted-admin-privileges
disable_edit: true
integration_id: onelogin
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: onelogin
security: attack
source: onelogin
tactic: TA0003-persistence
technique: T1098-account-manipulation
title: OneLogin user granted administrative privileges
type: security_rules
---

## Goal
Detect when a OneLogin administrator grants additional privileges to another OneLogin user.

## Strategy
This rule lets you monitor the following OneLogin events to detect when an administrator grants additional privileges to another OneLogin user:

* `@evt.name:PRIVILEGE_GRANTED_TO_USER`

## Triage and response
1. Determine whether the user (`{{@actor_user_name}}`) should be legitimately adding additional roles to `@usr.name`. **Note:** The role granted to the user is not available in OneLogin logs.
2. If the activity was not legitimate, review all activity from `{{@actor_user_name}}` and the IP (`{{@network.client.ip}}`) associated with this signal.
