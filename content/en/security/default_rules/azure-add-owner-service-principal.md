---
aliases:
- ypa-4t4-zo4
- /security_monitoring/default_rules/ypa-4t4-zo4
- /security_monitoring/default_rules/azure-add-owner-service-principal
disable_edit: true
integration_id: azure.activedirectory
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: azure.activedirectory
security: attack
source: azure
tactic: TA0003-persistence
title: Azure new owner added for service principal
type: security_rules
---

## Goal
Detect when a new owner is added to a service principal, which applies to privilege escalation or persistence.

## Strategy
Monitor Azure Active Directory logs where `@evt.name` is `"Add owner to service principal"` and `@evt.outcome` of `Success`. 

## Triage and response
1. Inspect that the user is added to a service principal in `@properties.targetResources`.
2. Verify with the user (`{{@usr.name}}`) to determine if the owner addition is legitimate.
