---
aliases:
- isz-66a-20r
- /security_monitoring/default_rules/isz-66a-20r
- /security_monitoring/default_rules/cis-azure-1.3.0-8.1
disable_edit: true
integration_id: azure.keyvault
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.keyvault
title: All keys in Azure Key Vault have an expiration time set
type: security_rules
---

## Description

Ensure that all keys in your Azure Key Vault have an expiration time set.

## Rationale

Azure Key Vault enables users to store and use cryptographic keys within the Microsoft Azure environment. The `exp` (expiration time) attribute identifies the expiration time on or after which the key **must not** be used for a cryptographic operation. By default, keys never expire. Datadog recommends that keys be rotated in the key vault and set an explicit expiration time for all keys. This ensures that the keys cannot be used beyond their assigned lifetimes.

## Remediation

### From the console

1. Go to Key vaults
2. For each Key vault, click on Keys.
3. Under the Settings section, Make sure Enabled? is set to Yes
4. Set an appropriate expiration date on all keys. Using the Azure Command Line Interface, update the expiration date for the key using below command:

  ```bash
  az keyvault key set-attributes --name <keyName> --vault-name <vaultName> --expires Y-m-d''T''H:M:S''Z''
  ```

  **Note**: To access expiration time on all keys in Azure Key Vault using Microsoft API requires "List" Key permission. To provide required access follow below steps:

  1. Go to Key Vaults
  2. For each Key Vault, click on Access Policy.
  3. Add access policy with Key permission as List

## Impact

Keys cannot be used beyond their assigned expiration times respectively. Keys need to be rotated periodically wherever they are used.

## References

1. https://docs.microsoft.com/en-us/azure/key-vault/key-vault-whatis
2. https://docs.microsoft.com/en-us/rest/api/keyvault/about-keys--secrets-and-certificates#key-vault-keys
3. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-governance-strategy#gs-1-define-asset-management-and-data-protection-strategy

## CIS Controls

Version 7 13 Data Protection Data Protection
