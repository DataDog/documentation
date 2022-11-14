---
aliases:
- bdn-uvn-jrd
- /security_monitoring/default_rules/bdn-uvn-jrd
- /security_monitoring/default_rules/cis-azure-1.3.0-3.1
disable_edit: true
integration_id: azure.storage
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.storage
title: '''Secure transfer required'' is set to ''Enabled'''
type: security_rules
---

## Description

Enable data encryption in transit.

## Rationale

The secure transfer option enhances the security of a storage account by only allowing requests to the storage account by a secure connection. For example, when calling REST APIs to access storage accounts, the connection must be HTTPS. Any requests using HTTP will be rejected when secure transfer required is enabled. When using the Azure files service, connection without encryption will fail, including scenarios using SMB 2.1, SMB  3.0 without encryption, and some flavors of the Linux SMB client. Because Azure storage doesn't support HTTPS for custom domain names, this option is not applied when using a custom domain name.

## Remediation

### From the console

1. Go to Storage Accounts
2. For each storage account, go to Configuration
3. Set Secure transfer required to Enabled

### From the command line

Interface 2.0 - Use the below command to enable Secure transfer required for a Storage Account: `az storage account update --name <storageAccountName> --resource-group <resourceGroupName> --https-only true`

## References


1. https://docs.microsoft.com/en-us/azure/storage/blobs/security-recommendations#encryption-in-transit
2. https://docs.microsoft.com/en-us/cli/azure/storage/account?view=azure-cli-latest#az_storage_account_list
3. https://docs.microsoft.com/en-us/cli/azure/storage/account?view=azure-cli-latest#az_storage_account_update
4. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-data-protection#dp-4-encrypt-sensitive-information-in-transit

## CIS Controls

Version 7 - 14.4 Encrypt All Sensitive Information in Transit
