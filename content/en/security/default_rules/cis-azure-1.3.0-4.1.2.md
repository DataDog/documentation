---
aliases:
- atd-4lk-p7o
- /security_monitoring/default_rules/atd-4lk-p7o
- /security_monitoring/default_rules/cis-azure-1.3.0-4.1.2
disable_edit: true
integration_id: azure.sql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.sql
title: Data encryption on SQL Database Server is enabled
type: security_rules
---

## Description

Enable Transparent Data Encryption on every SQL server.

## Rationale

Azure SQL Database transparent data encryption helps protect against the threat of malicious activity by performing real-time encryption and decryption of the database, associated backups, and transaction log files at rest without requiring changes to the application.

## Remediation

### From the console

1. Go to SQL databases
2. For each DB instance
3. Click on Transparent data encryption
4. Set Data encryption to On using the Azure Command Line Interface
5. Use the below command to enable Transparent data encryption for SQL DB instance:

  ```bash
  --resource-group <resourceGroup> --server <dbServerName> --database <dbName> --status
  ```

  **Note**: TDE cannot be used to encrypt the logical master database in SQL Database. The master database contains objects that are needed to perform the TDE operations on the user databases. Azure Portal does not show master databases per SQL server. However, CLI/API responses will show master databases.

## References

1. https://docs.microsoft.com/en-us/sql/relational-databases/security/encryption/transparent-data-encryption-with-azure-sql-database
2. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-data-protection#dp-5-encrypt-sensitive-data-at-rest

**Note**: Transparent Data Encryption (TDE) can be enabled or disabled on individual SQL Database level and not on the SQL Server level. TDE cannot be used to encrypt the logical master database in SQL Database. The master database contains objects that are needed to perform the TDE operations on the user databases.

# CIS Controls

Version 7 14.8 Encrypt Sensitive Information at Rest: Encrypt all sensitive information at rest using a tool that requires a secondary authentication mechanism not integrated into the operating system, in order to access the information.
