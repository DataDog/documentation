---
aliases:
- mex-to8-3fa
- /security_monitoring/default_rules/mex-to8-3fa
- /security_monitoring/default_rules/jumpcloud-policy-created
disable_edit: true
integration_id: jumpcloud
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: jumpcloud
tactic: TA0003-persistence
title: Jumpcloud policy created
type: security_rules
---

## Goal
Detect when a JumpCloud policy is created. 

## Strategy
This rule lets you monitor the following JumpCloud event to detect when a policy is created:

* `@evt.name:policy_create`

## Triage and response
1. Contact the JumpCloud administrator `{{@usr.email}}` to confirm if the policy creation was intended.
2. If the change was **not** authorized, verify there are no other signals from the administrator:`{{@usr.email}}`.
