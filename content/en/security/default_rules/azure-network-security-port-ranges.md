---
aliases:
- u2p-1da-83i
- /security_monitoring/default_rules/u2p-1da-83i
- /security_monitoring/default_rules/azure-network-security-port-ranges
disable_edit: true
integration_id: azure.network
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.network
title: Network Security Group does not use port ranges
type: security_rules
---

## Description

Azure Network Security Group (NSG) is configured to allow specific ports rather than all ports or port ranges.

## Rationale

NSGs should be configured as granularly as possible, allowing only specific and necessary ports. Leaving ranges of ports open can allow access to ports that are vulnerabile to attack.  

## Remediation

### From the console

Follow the [Work with security rules guide][1] to modify the port ranges associated with a NSG using the Microsoft Azure Console. 

### From the command line

Use the [Microsft Azure az network nsg rule update module][2] to update the ports associated with a NSG using the Microsoft Azure CLI. 

## References

[1]: https://docs.microsoft.com/en-us/azure/virtual-network/manage-network-security-group#work-with-security-rules
[2]: https://docs.microsoft.com/en-us/cli/azure/network/nsg/rule?view=azure-cli-latest#az-network-nsg-rule-update
