---
aliases:
- 1c3-d0v-jv0
- /security_monitoring/default_rules/1c3-d0v-jv0
- /security_monitoring/default_rules/onelogin-admin-assumed-user
disable_edit: true
integration_id: onelogin
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: onelogin
security: attack
source: onelogin
tactic: TA0004-privilege-escalation
technique: T1078-valid-accounts
title: OneLogin administrator assumed a user
type: security_rules
---

## Goal
Detect when a OneLogin user with appropriate privileges assumes another OneLogin user's identity. Logging in as another user allows the user to view another OneLogin user's account and perform actions on their behalf. 

## Strategy
This rule lets you monitor the following OneLogin events to detect when an administrator assumes another OneLogin user's identity:

* `@evt.name:USER_ASSUMED_USER`

## Triage and response
1. Determine whether the user (`{{@usr.name}}`) should be legitimately assuming another user's identity.
2. If the activity was not legitimate, review all activity from `{{@usr.name}}` and the IP (`{{@network.client.ip}}`) associated with this signal.
