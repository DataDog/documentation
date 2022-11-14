---
aliases:
- d3m-cxg-12m
- /security_monitoring/default_rules/d3m-cxg-12m
- /security_monitoring/default_rules/gsuite-user-added-super-admin
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
title: Google Workspace user assigned to super admin role
type: security_rules
---

## Goal
Detect when a user is added to the super administrator group on Google Workspace.

## Strategy
Monitor Google Workspace logs to detect `ASSIGN_ROLE` events where `@event.parameters.ROLE_NAME` is `_SEED_ADMIN_ROLE`. 

## Triage and response
1. Verify with the Google admin (`{{@usr.email}}`) if the Google Workspace user in the `@event.parameters.USER_EMAIL` attribute should legitimately be given the super admin role.
2. If the user in `@event.parameters.USER_EMAIL` was not legitimately added, investigate activity from the IP address (`{{@network.client.ip}}`) that made the role addition.
3. Review activity around the Google Workspace admin who made the change (`{{@usr.email}}`) and the newly added super admin (`@event.parameters.USER_EMAIL`).
