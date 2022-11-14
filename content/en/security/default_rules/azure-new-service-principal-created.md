---
aliases:
- 848-4cc-725
- /security_monitoring/default_rules/848-4cc-725
- /security_monitoring/default_rules/azure-new-service-principal-created
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: azure
security: attack
source: azure
tactic: TA0003-persistence
title: Azure New Service Principal created
type: security_rules
---

## Goal

Detect when a new service principal is created in Azure, which applies to a persistence mechanism.

## Strategy

Monitor Azure Active Directory logs where `@evt.name` is `"Add service principal"` and `@evt.outcome` of `Success`. 

## Triage and response

1. Inspect the new service principal in `@properties.targetResources`.
2. Verify with the user (`{{$usr.name}}`) to determine if the service principal is legitimate.
