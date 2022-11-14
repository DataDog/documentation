---
aliases:
- 8pu-lqe-4ze
- /security_monitoring/default_rules/8pu-lqe-4ze
- /security_monitoring/default_rules/azure_user_invited_an_external_user
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: azure
tactic: TA0003-persistence
title: Azure user invited an external user
type: security_rules
---

## Goal
Detect when an invitation is sent to an external user.

## Strategy
Monitor Azure Active Directory Audit logs and detect when any `@evt.name` is equal to `Invite external user` and the `@evt.outcome` is equal to `success`.

## Triage and response
1. Review and determine if the invitation and its recipient are valid.
