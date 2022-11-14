---
aliases:
- t1w-2b4-bz3
- /security_monitoring/default_rules/t1w-2b4-bz3
- /security_monitoring/default_rules/azure-storage-immutable-blob
disable_edit: true
integration_id: azure.storage
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.storage
title: Immutable Blob Storage is enabled
type: security_rules
---

## Description

Immutability is enabled for Azure Storage Blobs.

## Rationale

Immutability for Azure Blob enables Writes once read many (WORM) state storage, which protects data from being overwritten or deleted. 

The two types of immutability policies are time-based retention and legal hold. Time-based policies are cleared when the time period expires. Legal holds are cleared when they are manually modified. 

## Remediation

### From the console

Follow the [Enable version-level immutability support on a storage account - Azure Console][1] guide to enable version-level immutability with the Azure Console.

### From the command line

Follow the [Enable version-level immutability support on a storage account - Azure CLI][2] guide to enable version-level immutability with the Azure CLI. 

[1]: https://docs.microsoft.com/en-us/azure/storage/blobs/immutable-policy-configure-version-scope?tabs=azure-portal
[2]: https://docs.microsoft.com/en-us/azure/storage/blobs/immutable-policy-configure-version-scope?tabs=azure-cli
