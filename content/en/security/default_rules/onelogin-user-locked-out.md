---
aliases:
- im7-3xo-xff
- /security_monitoring/default_rules/im7-3xo-xff
- /security_monitoring/default_rules/onelogin-user-locked-out
disable_edit: true
integration_id: onelogin
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: onelogin
security: attack
source: onelogin
tactic: TA0006-credential-access
technique: T1110-brute-force
title: OneLogin user locked out
type: security_rules
---

## Goal
Detect when a OneLogin user is locked out. This may be common if the user is repeatedly failing to log in. This rule is most useful when correlated with other anomalous activity for the user.

## Strategy
This rule lets you monitor the following OneLogin events to when a user is locked out:
* `@evt.name:USER_LOCKED`

## Triage and response
1. Determine whether the user (`{{@usr.name}}`) was legitimately trying to authenticate and was locked out.
2. If the activity was not legitimate, review all activity from the IP (`{{@network.client.ip}}`) associated with this signal.
