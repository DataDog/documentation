---
aliases:
- 2id-jde-3qh
- /security_monitoring/default_rules/2id-jde-3qh
- /security_monitoring/default_rules/cis-azure-1.3.0-4.1.3
disable_edit: true
integration_id: azure.sql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.sql
title: Audit data for Azure SQL is retained for at least 90 days
type: security_rules
---

## Description

SQL Server Audit Retention should be configured to be greater than 90 days.

## Rationale

Use Audit Logs to check for anomalies and to get insight into suspected breaches or misuse of information and access.

## Remediation

### From the console

1. Go to SQL servers
2. For each server instance
3. Click on Auditing
4. Select Storage Details
5. Set Retention (days) setting greater than 90 days
6. Select OK
7. Select Save using Azure PowerShell. For each server, set retention policy for more than or equal to 90 days:

  ```bash
  set-AzureRmSqlServerAuditing -ResourceGroupName <resource group name> -ServerName <server name> -RetentionInDays <Number of Days to retain the audit logs, should be 90days minimum>
  ```

## References

1. https://docs.microsoft.com/en-us/azure/sql-database/sql-database-auditing
2. https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/get-azurermsqlserverauditing?view=azurermps-5.2.0
3. https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/set-azurermsqlserverauditing?view=azurermps-5.2.0
4. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-logging-threat-detection#lt-6-configure-log-storage-retention

## CIS controls

Version 7

6.4 Ensure adequate storage for logs: Ensure that all systems that store logs have adequate storage space for the logs generated.

4.2 SQL Server: Azure Defender for SQL Azure Defender for SQL provides a layer of security, which enables customers to detect and respond to potential threats as they occur by providing security alerts on anomalous activities. Users will receive an alert upon suspicious database activities, potential vulnerabilities, and SQL injection attacks, as well as anomalous database access patterns. SQL Server Threat Detection alerts provide details of suspicious activity and recommend action on how to investigate and mitigate the threat. Azure Defender for SQL may incur additional cost per SQL server.
