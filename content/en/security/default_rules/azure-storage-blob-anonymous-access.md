---
aliases:
- tzw-4b4-bz5
- /security_monitoring/default_rules/tzw-4b4-bz5
- /security_monitoring/default_rules/azure-storage-blob-anonymous-access
disable_edit: true
integration_id: azure.storage
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.storage
title: Blob Containers do not allow anonymous access
type: security_rules
---

## Description

Anonymous read access is disabled for Azure Storage Blobs.

## Rationale

Anonymous access to Azure storage blob containers allows un-authenticated users to perform operations against your storage account. Datadog recommends only allowing authenticated users access to storage blobs. 

## Remediation

### From the Console

Follow the [Set the public access level for a container - Azure Console][1] guide to disable anonymous read access with the Azure Console.

### From the Azure CLI

Follow the [Set the public access level for a container - Azure CLI][2] guide to disable anonymous read access with the Azure CLI. 

[1]: https://docs.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-configure?tabs=portal
[2]: https://docs.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-configure?tabs=azure-cli
