---
aliases:
- zpg-1cy-pcn
- /security_monitoring/default_rules/zpg-1cy-pcn
- /security_monitoring/default_rules/cis-azure-1.3.0-3.9
disable_edit: true
integration_id: azure.storage
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.storage
title: Storage for critical data is encrypted with Customer Managed Key
type: security_rules
---

## Description

Enable sensitive data encryption at rest using customer managed keys rather than Microsoft managed keys.

## Rationale

By default, data in the storage account is encrypted using Microsoft managed keys at rest. All Azure Storage resources are encrypted, including blobs, disks, files, queues, and tables. All object metadata is also encrypted. However, if you want to control and manage the encryption key yourself, you can specify a customer-managed key, and that key is used to protect and control access to the key that encrypts your data. You can also choose to automatically update the key version used for Azure Storage encryption whenever a new version is available in the associated key vault.

## Remediation

### From the console

1. Go to Storage Accounts
2. For each storage account, go to Encryption
3. Set Customer Managed Keys
4. Select the encryption key and enter the appropriate setting value
5. Click Save

## Impact

If the key expires by setting the activation date and expiration date of the key, you must rotate the key manually. Using customer managed keys may also incur additional effort to create, store, manage, and protect the keys as needed.

## References

1. https://docs.microsoft.com/en-us/azure/storage/common/storage-service-encryption
2. https://docs.microsoft.com/en-us/azure/security/fundamentals/data-encryption-best-practices#protect-data-at-rest
3. https://docs.microsoft.com/en-us/azure/storage/common/storage-service-encryption#azure-storage-encryption-versus-disk-encryption
4. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-data-protection#dp-1-discovery,-classify-and-label-sensitive-data


## CIS Controls

Version 7 14.8 - Encrypt Sensitive Information at Rest - Encrypt all sensitive information at rest using a tool that requires a secondary authentication mechanism not integrated into the operating system, in order to access the information.
