---
aliases:
- 3j9-g6j-598
- /security_monitoring/default_rules/3j9-g6j-598
- /security_monitoring/default_rules/cis-azure-1.3.0-4.5
disable_edit: true
integration_id: azure.sql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.sql
title: SQL server's TDE protector is encrypted with Customer-managed key
type: security_rules
---

## Description

TDE with Customer-managed key support provides increased transparency and control over the TDE Protector, increased security with an HSM-backed external service, and promotion of separation of duties. With TDE, data is encrypted at rest with a symmetric key (called the database encryption key) stored in the database or data warehouse distribution. To protect this data encryption key (DEK) in the past, only a certificate that the Azure SQL Service managed could be used. With Customer-managed key support for TDE, the DEK can be protected with an asymmetric key stored in the Key Vault. The Key Vault is a highly available and scalable cloud-based key store that offers central key management, leverages FIPS 140-2 Level 2 validated hardware security modules (HSMs), and allows separation of keys and data for additional security. Based on business needs or the criticality of data/databases hosted a SQL server, Datadog recommends that the TDE protector is encrypted by a key that is managed by the data owner (Customer-managed key).

## Rationale

Customer-managed key support for Transparent Data Encryption (TDE) allows user control of TDE encryption keys and restricts who can access them and when. Azure Key Vault, Azures cloud-based external key management system, is the first key management service where TDE has integrated support for customer-managed keys. With customer-managed key support, the database encryption key is protected by an asymmetric key stored in the Key Vault. The asymmetric key is set at the server level and inherited by all databases under that server.

## Remediation

### From the console
1. Go to SQL servers for the desired server instance
2. Click On Transparent data encryption
3. Set Use your own key to YES
4. Browse through your key vaults to select an existing key or create a new key in the key vault.
5. Check Make selected key the default TDE protector Using Azure CLI. Use the below command to encrypt SQL server's TDE protector with a Customer-managed key: `az sql server tde-key >> Set --resource-group <resourceName> --server <dbServerName> --server-key-type {AzureKeyVault} [--kid <keyIdentifier>]`

## Impact

Once the TDE protector is encrypted with a customer-managed key, it transfers the entire responsibility of key management to you. Hence, you should be more careful about doing any operations on the particular key to keep data from the corresponding SQL server Databases host accessible. When deploying customer-managed keys, ensure that you  deploy an automated toolset for managing these keys (this should include discovery and key rotation), and keys should be stored in an HSM or hardware backed keystore; for example, Azure Key Vault). As far as toolsets go, check with your cryptographic key provider as they may well provide one as an add-on to their service.

## References

1. https://docs.microsoft.com/en-us/sql/relational-databases/security/encryption/transparent-data-encryption-byok-azure-sql
2. https://azure.microsoft.com/en-in/blog/preview-sql-transparent-data-encryption-tde-with-bring-your-own-key-support/
3. https://winterdom.com/2017/09/07/azure-sql-tde-protector-keyvault
4. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-identity-management#im-1-standardize-azure-active-directory-as-the-central-identity-and-authentication-system

**Note**: This configuration can be done only on an SQL server. The same configuration will be in effect on SQL Databases hosted on SQL Server. Ensuring yourTDE is protected by a Customer-managed key on SQL Server does not ensure SQL Databases' encryption. Transparent Data Encryption Data Encryption (ON/OFF) setting on individual SQL Database decides whether the database is encrypted or not.

## CIS Controls

Version 7

16.4 Encrypt or Hash all Authentication Credentials: Encrypt or hash with a salt all authentication credentials when stored. 

5 Logging and Monitoring: This section covers security recommendations to follow to set logging and monitoring policies on an Azure Subscription.

5.1 Configuring Diagnostic Settings: The Azure Diagnostic Settings capture control/management activities performed on a subscription. By default, the Azure Portal retains activity logs only for 90 days. The Diagnostic Settings define the type of stored or streamed events and the output storage account, and the event hub. The Diagnostic Settings, if appropriately configured, can ensure that all activity logs are retained for a longer duration. This section has recommendations for correctly configuring the Diagnostic Settings so that all activity logs captured are retained for longer periods. When configuring Diagnostic Settings, you may choose to export in one of three ways in which you need to ensure appropriate data retention. The options are Log Analytics, Event Hub, and a Storage Account. It is important to ensure you are aware and have set retention as your organization sees fit.
