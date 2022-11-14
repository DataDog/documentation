---
aliases:
- f72-zu8-tjj
- /security_monitoring/default_rules/f72-zu8-tjj
- /security_monitoring/default_rules/azure_policy_assignment_created
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: compliance
source: azure
title: Azure Policy Assignment Created
type: security_rules
---

## Goal
Detect when an Azure policy assignment has been created.

## Strategy
Monitor Azure activity logs and detect when the `@evt.name` is equal to `MICROSOFT.AUTHORIZATION/POLICYASSIGNMENTS/WRITE` and `@evt.outcome` is equal to `Success`.

## Triage and response
1. Inspect the policy assignment and determine if an unsolicited change was made on any Azure resources.
