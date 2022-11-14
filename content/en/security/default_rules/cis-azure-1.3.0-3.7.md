---
aliases:
- mpx-tee-gng
- /security_monitoring/default_rules/mpx-tee-gng
- /security_monitoring/default_rules/cis-azure-1.3.0-3.7
disable_edit: true
integration_id: azure.storage
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.storage
title: '''Trusted Microsoft Services'' is enabled for Storage Account access'
type: security_rules
---

## Description

Some Microsoft services that interact with storage accounts operate from networks that can't be granted access through network rules. To help this type of service work as intended, allow the set of trusted Microsoft services to bypass the network rules. These services use strong authentication to access the storage account. If Allow trusted Microsoft services exception is enabled, the following services, when registered in the subscription, are granted access to the storage account: Azure Backup, Azure Site Recovery, Azure DevTest Labs, Azure Event Grid, Azure Event Hubs, Azure Networking, Azure Monitor and Azure SQL Data Warehouse.

## Rationale

Turning on firewall rules for storage account blocks access to incoming requests for data, including from other Azure services. This includes using the portal, writing logs, etc. You can re-enable access to services like Monitor, Networking, Hubs, and Event Grid by enabling Trusted Microsoft Services through exceptions. The exception also supports backing up and restoring virtual machines using unmanaged disks in storage accounts with network rules applied.

## Remediation

### From the console

1. Go to Storage Accounts
2. For each storage account, click on the settings menu called Firewalls and Virtual Networks.
3. Ensure that Allow access from selected networks is enabled.
4. Enable Allow trusted Microsoft services to access this storage account.
5. Click Save to apply your changes.

### From the command line

Use the following command to update trusted Microsoft services: `az storage account update --name <StorageAccountName> --resource-group <resourceGroupName> --bypass AzureServices`

## References

1. https://docs.microsoft.com/en-us/azure/storage/common/storage-network-security
2. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-network-security#ns-1-implement-security-for-internal-traffic
3. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-governance-strategy#gs-2-define-enterprise-segmentation-strategy

## CIS Controls

Version 7 9.2 - Ensure Only Approved Ports, Protocols and Services Are Running - Ensure that only network ports, protocols, and services listening on a system with validated business needs, are running on each system.
