---
aliases:
- fky-16q-0ud
- /security_monitoring/default_rules/fky-16q-0ud
- /security_monitoring/default_rules/cis-azure-1.3.0-4.3.3
disable_edit: true
integration_id: azure.dbforpostgresql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.dbforpostgresql
title: Server parameter 'log_checkpoints' is set to 'ON' for PostgreSQL Database Server
type: security_rules
---

## Description

Enable `log_checkpoints` on PostgreSQL Servers.

## Rationale

Enabling `log_checkpoints` helps the PostgreSQL Database to log each checkpoint and generate query and error logs. Access to transaction logs is not supported. Query and error logs can be used to identify, troubleshoot, and repair configuration errors and sub-optimal performance.

## Remediation

### From the console

1. Login to Azure Portal using https://portal.azure.com
2. Go to Azure Database for PostgreSQL server
3. For each database, click on Server parameters
4. Search for `log_checkpoints`.
5. Click ON and save.

Alternatively, use the Azure Command Line Interface and run the below command to update `log_checkpoints` configuration:

  ```bash
  az postgres server configuration set --resource-group <resourceGroupName> --server-name <serverName> --name log_checkpoints --value on
  ```

## References

1. https://docs.microsoft.com/en-us/rest/api/postgresql/configurations/listbyserver
2. https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-server-parameters-using-portal
3. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-logging-threat-detection#lt-4-enable-logging-for-azure-resources

## CIS Controls

Version 7 6.2 Activate logging: Ensure that local logging has been enabled on all systems and networking devices.
