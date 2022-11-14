---
aliases:
- rzw-eru-lnp
- /security_monitoring/default_rules/rzw-eru-lnp
- /security_monitoring/default_rules/azure_network_security_groups_rules_created_modified_or_deleted
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: azure
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: Azure Network Security Groups or Rules Created, Modified, or Deleted
type: security_rules
---

## Goal
Detect when an Azure network security group or an Azure network security rule has been created, modified, or deleted.

## Strategy
Monitor Azure activity logs and detect when the `@evt.name` is equal to any one of the following names:
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/WRITE`
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/DELETE`
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/WRITE` 
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/DELETE`

and `@evt.outcome` is equal to `Success`.

## Triage and response
1. Inspect the security group or security rule and determine if it exposes any Azure resources that should not be exposed.
