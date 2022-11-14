---
aliases:
- xbm-10x-93a
- /security_monitoring/default_rules/xbm-10x-93a
- /security_monitoring/default_rules/onelogin-user-viewed-secure-note
disable_edit: true
integration_id: onelogin
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: onelogin
source: onelogin
title: OneLogin user viewed secure note
type: security_rules
---

## Goal
Detect when a OneLogin user views a secure note.

## Strategy
This rule lets you monitor the following OneLogin events to detect when a user views a secure note:

* `@evt.name:PRIVILEGE_GRANTED_TO_USER`

This rule is useful when correlating its findings with other anomalous events from the same OneLogin user (`{{@actor_user_name}}`).

## Triage and response
1. Determine whether the OneLogin user (`{{@actor_user_name}}`) should be legitimately accessing secure notes.
2. If the activity was not legitimate, review all activity from `{{@actor_user_name}}` and the IP (`{{@network.client.ip}}`) associated with this signal.
