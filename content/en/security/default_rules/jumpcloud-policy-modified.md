---
aliases:
- dil-xy4-9ag
- /security_monitoring/default_rules/dil-xy4-9ag
- /security_monitoring/default_rules/jumpcloud-policy-modified
disable_edit: true
integration_id: jumpcloud
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: jumpcloud
tactic: TA0003-persistence
title: Jumpcloud policy modified
type: security_rules
---

## Goal
Detect when a JumpCloud policy is modified. 

## Strategy
This rule lets you monitor the following JumpCloud event to detect when a policy is modified:

* `@evt.name:policy_update`

## Triage and response
1. Contact the JumpCloud administrator `{{@usr.email}}` to confirm if the policy modification(s) was intended.
2. If the change was **not** authorized, verify there are no other signals from the administrator:`{{@usr.email}}`.
