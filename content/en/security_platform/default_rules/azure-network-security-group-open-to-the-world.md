---
aliases:
- 34e-bda-42c
disable_edit: true
kind: documentation
rule_category:
- Log Detection
security: compliance
source: azure
title: Azure Network Security Group Open to the World
type: security_rules
---

### Goal
Detect when an Azure network security group allows inbound traffic from all IP Addresses.

### Strategy
This rule monitors Azure Activity logs for network changes and detects when the `@evt.name` has a value of  `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/WRITE`, `@properties.securityRules.properties.direction` has a value of `Inbound`, `@properties.securityRules.properties.access` has a value of `Allow`, and `@properties.securityRules.properties.sourceAddressPrefix` has a value of either `0.0.0.0/0` OR `*`.

### Triage & Response
1. Inspect which Virtual Machines are associated with this security group.
2. Determine whether this security group and the VMs should permit inbound traffic from all IP addresses.
