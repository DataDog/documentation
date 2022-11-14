---
aliases:
- x6x-izl-poe
- /security_monitoring/default_rules/x6x-izl-poe
- /security_monitoring/default_rules/cis-azure-1.3.0-8.2
disable_edit: true
integration_id: azure.keyvault
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.keyvault
title: All secrets in the Azure Key Vault have an expiration time set
type: security_rules
---

## Description

Ensure that all Secrets in the Azure Key Vault have an expiration time set.

## Rationale

The Azure Key Vault enables users to store and keep secrets within the Microsoft Azure environment. Secrets in the Azure Key Vault are octet sequences with a maximum size of 25k bytes each. The `exp` (expiration time) attribute identifies the expiration time on or after which the secret **must not** be used. By default, secrets never expire. Datadog recommends rotating secrets in the key vault and setting an explicit expiration time for all secrets. This ensures that the secrets cannot be used beyond their assigned lifetimes.

## Remediation

### From the console

1. Go to Key vaults
2. For each Key vault, click on Secrets
3. Under the Settings section, Make sure Enabled? is set to Yes
4. Set an appropriate expiration date on all secrets. Using the Azure Command Line Interface, use the below command to set expiration date on the all secrets:

  ```bash
  az keyvault secret set-attributes --name <secretName> --vault-name <vaultName> --expires Y-m-d'T'H:M:S'Z'
  ```

## Impact

Secrets cannot be used beyond their assigned expiry times respectively. Secrets need to be rotated periodically wherever they are used.

## References

1. https://docs.microsoft.com/en-us/azure/key-vault/key-vault-whatis
2. https://docs.microsoft.com/en-us/rest/api/keyvault/about-keys--secrets-and-certificates#key-vault-secrets
3. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-privileged-access#pa-4-set-up-emergency-access-in-azure-ad
4. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-privileged-access#pa-5-automate-entitlement-management
5. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-privileged-access#pa-8-choose-approval-process-for-microsoft-support
6. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-governance-strategy#gs-2-define-enterprise-segmentation-strategy
7. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-governance-strategy#gs-6-define-identity-and-privileged-access-strategy

## CIS Controls

Version 7 16 Account Monitoring and Control
