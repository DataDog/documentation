---
aliases:
- 34e-bda-42c
- /security_monitoring/default_rules/34e-bda-42c
- /security_monitoring/default_rules/azure-network-security-group-open-to-the-world
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: azure
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: Azure Network Security Group Open to the World
type: security_rules
---

## Goal
Detect when an Azure network security group allows inbound traffic from all IP Addresses.

## Strategy
This rule monitors Azure Activity logs for network changes and detects when the `@evt.name` has a value of  `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/WRITE`, `@properties.securityRules.properties.direction` has a value of `Inbound`, `@properties.securityRules.properties.access` has a value of `Allow`, and `@properties.securityRules.properties.sourceAddressPrefix` has a value of either `0.0.0.0/0` OR `*`.

## Triage and response
1. Inspect which Virtual Machines are associated with this security group.
2. Determine whether this security group and the VMs should permit inbound traffic from all IP addresses.
