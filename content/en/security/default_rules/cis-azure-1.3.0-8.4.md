---
aliases:
- 1ep-kwe-uw3
- /security_monitoring/default_rules/1ep-kwe-uw3
- /security_monitoring/default_rules/cis-azure-1.3.0-8.4
disable_edit: true
integration_id: azure.keyvault
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.keyvault
title: Azure Key Vault is recoverable
type: security_rules
---

## Description

The key vault contains object keys, secrets, and certificates. Accidental unavailability of a key vault can cause immediate data loss or loss of security functions (authentication, validation, verification, non-repudiation, etc.) supported by the key vault objects. Datadog recommends the key vault be made recoverable by enabling the "Do Not Purge" and "Soft Delete" functions. This is to prevent loss of encrypted data including storage accounts, SQL databases, and dependent services provided by key vault objects (Keys, Secrets, Certificates) etc., as may happen in the case of accidental deletion by a user or from disruptive activity by a malicious user.

### Default value 

When a new Key Vault is created, both the parameters `enableSoftDelete` and `enablePurgeProtection` are set to `null`, disabling both the features.

## Rationale

There could be scenarios where users accidentally run delete and purge commands on key vault or attacker or malicious user does it deliberately to cause disruption. Deleting or purging a key vault leads to immediate data loss as keys encrypting data and secrets and certificates causing access and services to become non-accessible. There are two key vault properties that plays role in permanent unavailability of a key vault:

1. Setting the `enableSoftDeleteSetting` parameter to true for a key vault ensures that even if key vault is deleted, the key vault itself or its objects are recoverable for next 90 days. In this span of 90 days either key vault and objects can be recovered or purged (permanent deletion). If no action is taken, after 90 days, the key vault and its objects are purged.

2. `enablePurgeProtectionenableSoftDelete` only ensures that the key vault is not deleted permanently and will be recoverable for 90 days from the deletion date. However, there is a chance that the key vault or objects are accidentally purged and are not recoverable. Setting `enablePurgeProtection` to "true" ensures that the key vault and its objects cannot be purged. Enabling both the parameters on key vaults ensures that key vaults and their objects cannot be deleted or purged permanently.

### Impact

Once purge-protection and soft-delete is enabled for a key vault, the action is irreversible.

- Note: When a key is used for the SQL server TDE or Encrypting Storage account, the corresponding key vault features "Do Not Purge" and "Soft Delete" are enabled by default by your Azure backend.

## Remediation

### From the command line 

Enable "Do Not Purge" and "Soft Delete" for a key vault using

```bash
az resource update --id /subscriptions/xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/resourceGroups/<resourceGroupName>/providers/Microsoft.KeyVault /vaults/<keyVaultName> --set properties.enablePurgeProtection=true properties.enableSoftDelete=true
```

## References

1. [https://docs.microsoft.com/en-us/azure/key-vault/key-vault-soft-delete-cli][1]
2. [https://blogs.technet.microsoft.com/kv/2017/05/10/azure-key-vault-recovery-options/][2]
3. [https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-governance-strategy#gs-8-define-backup-and-recovery-strategy][3]


[1]: https://docs.microsoft.com/en-us/azure/key-vault/key-vault-soft-delete-cli
[2]: https://blogs.technet.microsoft.com/kv/2017/05/10/azure-key-vault-recovery-options/
[3]: https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-governance-strategy#gs-8-define-backup-and-recovery-strategy
