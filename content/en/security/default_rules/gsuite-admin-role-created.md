---
aliases:
- ab5-5lm-x2n
- /security_monitoring/default_rules/ab5-5lm-x2n
- /security_monitoring/default_rules/gsuite-admin-role-created
disable_edit: true
integration_id: gsuite
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: gsuite
security: attack
source: gsuite
tactic: TA0003-persistence
technique: T1098-account-manipulation
title: Google Workspace admin role created
type: security_rules
---

## Goal
Create a signal when Google Workspace detects a new Google Workspace administrative role.

## Strategy
Monitor Google Workspace logs to detect `CREATE_ROLE` events.

## Triage and response
1. Determine if there is a legitimate reason for the new administrator role (`@event.parameters.ROLE_NAME`).
2. If there is not a legitimate reason, investigate activity from around the Google Workspace administrator (`{{@usr.email}}`) and IP that created the role (`{{@network.client.ip}}`).

## Changelog
* 17 October 2022 - Updated tags.
