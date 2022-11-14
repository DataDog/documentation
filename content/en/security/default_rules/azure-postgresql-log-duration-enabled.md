---
aliases:
- 3f6-n98-c6p
- /security_monitoring/default_rules/3f6-n98-c6p
- /security_monitoring/default_rules/azure-postgresql-log-duration-enabled
cloud: azure
disable_edit: true
integration_id: azure.dbforpostgresql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.dbforpostgresql
title: Server parameter 'log_duration' is set to 'ON' for PostgreSQL Database Server
type: security_rules
---

## Description

PostgreSQL uses logging to track the time it takes to complete an SQL query.

## Rationale

The "log_duration" parameter allows recording the duration of each completed PostgreSQL statement. Logging this attribute enables administrators to monitor for potential issues in the database.

## Remediation

### From the console

1. Complete steps in Microsoft's [Customize server configuration parameters for Azure Database for PostgreSQL][1] documentation to enable the 'log_duration' logging in the PostgreSQL database. Ensure **log_duration** is selected under **Server Parameters**.

### From the command line

1. Complete steps in Microsoft's [Customize server configuration parameters for Azure Database for PostgreSQL][2] documentation to enable **log_duration** in **Server Parameters**.
2. Get a list of your PostgreSQL servers by running the following in Azure Powershell:

    {{< code-block lang="powershell">}}
    az postgres server list
	--output table
	--query '[*].{name:name, resourceGroup:resourceGroup}'
    {{< /code-block >}}
3. Run the 'postgres server configuration set' command:

    {{< code-block lang="powershell">}}
    az postgres server configuration set
	--server-name "INSERT-SERVER-NAME-HERE-FROM-STEP-2"
	--resource-group "cloud-shell-storage-westeurope"
	--name log_duration
	--value on
    {{< /code-block >}}
4. Repeat steps two and three for each server that is not configured correctly.

[1]: https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-server-parameters-using-portal
[2]: https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-server-parameters-using-cli
