---
aliases:
- c19-1d0-3b1
- /security_monitoring/default_rules/c19-1d0-3b1
- /security_monitoring/default_rules/gcp-service-account-create
disable_edit: true
integration_id: gcp.service.account
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: gcp.service.account
security: attack
source: gcp
tactic: TA0003-persistence
technique: T1136-create-account
title: GCP service account created
type: security_rules
---

## Goal
Detect when a new service account is created.

## Strategy
This rule lets you monitor GCP admin activity audit logs to determine when a service account is created. 

## Triage and response
1. Contact the user who created the service account and ensure that the account is needed and that the role is scoped properly.
