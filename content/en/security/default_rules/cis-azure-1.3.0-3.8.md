---
aliases:
- 1gg-2p8-p6l
- /security_monitoring/default_rules/1gg-2p8-p6l
- /security_monitoring/default_rules/cis-azure-1.3.0-3.8
disable_edit: true
integration_id: azure.storage
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.storage
title: Soft delete is enabled for Azure Storage
type: security_rules
---

## Description

Azure Storage blobs contain ePHI, financial, secret, or personal data. If erroneously modified or deleted accidentally by an application or other storage account user, data loss or data unavailability can occur. It is recommended that Azure Storage be made recoverable by enabling soft delete configuration. This is to save and recover data when blobs or blob snapshots are deleted.

## Rationale

A user can accidentally run delete commands on Azure Storage blobs or blob snapshots, or an attacker/malicious user can do it deliberately to cause disruption. Deleting an Azure Storage blob leads to immediate data loss or non-accessible data. Enable recoverable blobs configuration in the Azure Storage blob service to ensure that even if blobs/data are deleted from the storage account, the objects remain recoverable for a time set in the retention policy. Retention policies can be 7 days to 365 days.

## Remediation

### From the console

1. Go to Storage Account
2. For each Storage Account, navigate to Data Protection
3. Select Set soft delete enabled and enter the number of days to retain soft deleted data.

Azure Command-Line Interface:

Update retention days with the following command: `az storage blob service-properties delete-policy update --days-retained <RetentionDaysValue> --account-name <StorageAccountName> --enable true'`

## References

1. https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-soft-delete

## CIS Controls

Version 7 10 - Data Recovery Capabilities
