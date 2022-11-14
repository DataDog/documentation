---
aliases:
- ngh-qas-7b3
- /security_monitoring/default_rules/ngh-qas-7b3
- /security_monitoring/default_rules/jumpcloud-admin-role-assigned
disable_edit: true
integration_id: jumpcloud
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: jumpcloud
tactic: TA0004-privilege-escalation
title: Jumpcloud administrator role assigned
type: security_rules
---

## Goal
Detect when administrative privileges are provisioned to a JumpCloud user.

## Strategy
This rule lets you monitor the following JumpCloud event to detect when administrative privileges are provisioned:

* `user_admin_granted`

## Triage and response
1. Contact the JumpCloud administrator: `{{@usr.email}}` to confirm that the users or devices should have administrative privileges.
2. If the change was **not** authorized, verify there are no other signals from the JumpCloud administrator: `{{@usr.email}}`.
