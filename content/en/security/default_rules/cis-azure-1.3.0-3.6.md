---
aliases:
- 1xl-jnk-5fa
- /security_monitoring/default_rules/1xl-jnk-5fa
- /security_monitoring/default_rules/cis-azure-1.3.0-3.6
disable_edit: true
integration_id: azure.storage
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.storage
title: Default network access rule for Storage Accounts is set to deny
type: security_rules
---

## Description

Restricting default network access provides a layer of security, because storage accounts accept connections from clients on any network. To limit access to selected networks, change the default action.

## Rationale

Configure storage accounts to deny access to traffic from all networks (including internet traffic). Grant access to traffic from specific Azure Virtual networks, allowing a secure network boundary for specific applications to be built. Access can also be granted to public internet IP address ranges, to enable connections from specific internet or on-premises clients. When network rules are configured, only applications from allowed networks can access a storage account. When calling from an allowed network, applications continue to require proper authorization (a valid access key or SAS token) to access the storage account.

## Remediation

### From the console

1. Go to Storage Accounts
2. For each storage account, click on the settings menu called Firewalls and Virtual Networks.
3. Enable Allow access from selected networks.
4. Add rules to allow traffic from a specific network.
5. Click Save to apply your changes.

### From the command line

Use the following command to update the default action to deny: 
```
az storage account update --name <StorageAccountName> --resource-group <resourceGroupName> --default-action Deny
```

## References

1. [https://docs.microsoft.com/en-us/azure/storage/common/storage-network-security][1]
2. [https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-governance-strategy#gs-2-define-enterprise-segmentation-strategy][2]
3. [https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-network-security#ns-1-implement-security-for-internal-traffic][3]

[1]: https://docs.microsoft.com/en-us/azure/storage/common/storage-network-security
[2]: https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-governance-strategy#gs-2-define-enterprise-segmentation-strategy
[3]: https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-network-security#ns-1-implement-security-for-internal-traffic
