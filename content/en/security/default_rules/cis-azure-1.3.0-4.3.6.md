---
aliases:
- ah6-4cz-b7c
- /security_monitoring/default_rules/ah6-4cz-b7c
- /security_monitoring/default_rules/cis-azure-1.3.0-4.3.6
disable_edit: true
integration_id: azure.dbforpostgresql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.dbforpostgresql
title: Server parameter 'connection_throttling' is set to 'ON' for PostgreSQL Database
  Server
type: security_rules
---

## Description

Enable `connection_throttling` on PostgreSQL Servers.

## Rationale

Enabling `connection_throttling` helps the PostgreSQL Database to Set the verbosity of logged messages which generates query and error logs about concurrent connections. Too many concurrent connections could lead to a successful Denial of Service (DoS) attack by exhausting connection resources. A system can also fail or be degraded by an overload of legitimate users. Query and error logs can be used to identify, troubleshoot, and repair configuration errors and sub-optimal performance.

## Remediation

### From the console

1. Login to Azure Portal using https://portal.azure.com
2. Go to Azure Database for PostgreSQL server
3. For each database, click on Server parameters
4. Search for `connection_throttling`.
5. Click ON and save. 

Alternatively, use the Azure Command Line Interface and run the below command to update `connection_throttling` configuration:

  ```bash
  az postgres server configuration set --resource-group <resourceGroupName> --server-name <serverName> --name connection_throttling --value on
  ```

## References

1. https://docs.microsoft.com/en-us/rest/api/postgresql/configurations/listbyserver
2. https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-server-parameters-using-portal
3. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-logging-threat-detection#lt-4-enable-logging-for-azure-resources

## CIS Controls

Version 7 6.2 Activate logging: Ensure that local logging has been enabled on all systems and networking devices.
