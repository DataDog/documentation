---
aliases:
- bc4-cbi-lkc
- /security_monitoring/default_rules/bc4-cbi-lkc
- /security_monitoring/default_rules/cis-azure-1.3.0-4.1.1
disable_edit: true
integration_id: azure.sql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.sql
title: Auditing on SQL Server is enabled
type: security_rules
---

## Description

Enable auditing on SQL Servers.

## Rationale

The Azure platform allows a SQL server to be created as a service. Enabling auditing at the server level ensures that all existing and newly created databases on the SQL server instance are audited. The auditing policy applied on the SQL database does not override auditing policy and settings applied on the particular SQL server where the database is hosted. Auditing tracks database events and writes them to an audit log in the Azure storage account. It also helps maintain regulatory compliance, understand database activity, and gain insight into discrepancies and anomalies that could indicate business concerns or suspected security violations.

## Remediation

### From the console

1. Go to SQL servers
2. For each server instance
3. Click on Auditing
4. Set Auditing to On using Azure PowerShell.
5. Get the list of all SQL Servers: `Get-AzureRmSqlServer`. For each Server, enable auditing:

  ```bash
  Set-AzureRmSqlServerAuditingPolicy -ResourceGroupName <resource group name> -ServerName <server name> -AuditType <audit type> -StorageAccountName <storage account name>
  ```

## References

1. https://docs.microsoft.com/en-us/azure/security-center/security-center-enable-auditing-on-sql-servers
2. https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/get-azurermsqlserverauditing?view=azurermps-5.2.0
3. https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/set-azurermsqlserverauditingpolicy?view=azurermps-5.2.0
4. https://docs.microsoft.com/en-us/azure/sql-database/sql-database-auditing
5. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-logging-threat-detection#lt-4-enable-logging-for-azure-resources

**Note**: A server policy applies to all existing and newly created databases on the server. If server blob auditing is enabled, it always applies to the database. The database is audited, regardless of the database auditing settings. The auditing type table is deprecated, leaving only the type blob available. Enabling blob auditing on the database, and enabling it on the server, does not override or change any of the settings of the server blob auditing. Both audits exist side by side. So, the database is audited twice in parallel; once by the server policy, and once by the database policy.

## CIS controls

Version 7 6.3 Enable Detailed Logging: Enable system logging to include detailed information such as an event source, date, user, timestamp, source addresses, destination addresses, and other useful elements.
