---
aliases:
- a28-5a3-d0x
- /security_monitoring/default_rules/a28-5a3-d0x
- /security_monitoring/default_rules/jumpcloud-user-granted-system-admin
disable_edit: true
integration_id: jumpcloud
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: jumpcloud
security: attack
source: jumpcloud
tactic: TA0003-persistence
technique: T1098-account-manipulation
title: Jumpcloud admin granted system privileges
type: security_rules
---

## Goal

Detect when a JumpCloud user grants administrative privileges on a user endpoint. This is not indicative of malicious activity, but detecting this event is valuable for auditing.

## Strategy

This rule monitors JumpCloud audit logs to detect when a user triggers the `@evt.name` of `system_admin_grant`.

## Triage and response

1. Reach out to the admin making the change (`{{@usr.email}}`) to confirm that the user `(@usr.name`) should have administrative privileges on the specified resource (`@resource.name`).
2. If the change was not authorized, reverify there are no other signals from the jumpcloud admin: {{@usr.email}} and the system (`@resource.name`).
