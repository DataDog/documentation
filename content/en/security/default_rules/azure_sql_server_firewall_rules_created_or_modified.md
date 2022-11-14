---
aliases:
- aoc-jdx-q3d
- /security_monitoring/default_rules/aoc-jdx-q3d
- /security_monitoring/default_rules/azure_sql_server_firewall_rules_created_or_modified
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: azure
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: Azure SQL Server Firewall Rules Created or Modified
type: security_rules
---

## Goal
Detect when an Azure network security rule has been created, modified, or deleted.

## Strategy
Monitor Azure activity logs and detect when the `@evt.name` is equal to any of the following names:
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/WRITE` 
- `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/SECURITYRULES/DELETE`

and `@evt.outcome` is equal to `Success`.

## Triage and response
1. Inspect the security rule and determine if it exposes any Azure resources that should not be made public.
