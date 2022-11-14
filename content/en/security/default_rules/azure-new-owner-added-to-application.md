---
aliases:
- ofj-lse-l1a
- /security_monitoring/default_rules/ofj-lse-l1a
- /security_monitoring/default_rules/azure-new-owner-added-to-application
disable_edit: true
integration_id: azure.activedirectory
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: azure.activedirectory
security: attack
source: azure
tactic: TA0003-persistence
title: Azure New Owner added to Azure Active Directory application
type: security_rules
---

## Goal
Detect when a user is added as a new owner for an Active Directory application which could be used as a persistence mechanism. 

## Strategy
Monitor Azure Active Directory logs for `@evt.name: "Add owner to application"` has an `@evt.outcome` of `success`. 

## Triage and response
1. Review evidence of anomalous activity for the user being added as an owner (`@properties.targetResources`) for the Active Directory application.
2. Determine if there is a legitimate reason for the user being added to the application.
