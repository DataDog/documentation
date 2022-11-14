---
aliases:
- 0f2-hbg-tw8
- /security_monitoring/default_rules/0f2-hbg-tw8
- /security_monitoring/default_rules/cis-azure-1.3.0-4.3.7
disable_edit: true
integration_id: azure.dbforpostgresql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.dbforpostgresql
title: Server parameter 'log_retention_days' is greater than 3 days for PostgreSQL
  Database Server
type: security_rules
---

## Description

Enable `log_retention_days` on PostgreSQL Servers.

## Rationale

Enabling `log_retention_days` helps PostgreSQL Database to set the number of days a log file is retained, which generates query and error logs. Query and error logs can be used to identify, troubleshoot, and repair configuration errors and sub-optimal performance.

## Remediation

### From the console

1. Login to Azure Portal using https://portal.azure.com
2. Go to Azure Database for PostgreSQL server
3. For each database, click on Server parameters
4. Search for `log_retention_days`.
5. Enter value in range 4-7 (inclusive) and save. 

Alternatively, use the Azure Command Line Interface and run the the below command to update `log_retention_days` configuration:

  ```bash
  az postgres server configuration set --resource-group <resourceGroupName> --server-name <serverName> --name log_retention_days --value <4-7>
  ```

## References

1. https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-server-parameters-using-portal
2. https://docs.microsoft.com/en-us/rest/api/postgresql/configurations/listbyserver
3. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-logging-threat-detection#lt-6-configure-log-storage-retention

## CIS Controls

Version 7 6.4 Ensure adequate storage for logs: Ensure that all systems that store logs have adequate storage space for the logs generated.
