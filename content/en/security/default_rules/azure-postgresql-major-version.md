---
aliases:
- y5a-7ta-747
- /security_monitoring/default_rules/y5a-7ta-747
- /security_monitoring/default_rules/azure-postgresql-major-version
disable_edit: true
integration_id: azure.dbforpostgresql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.dbforpostgresql
title: Azure PostgreSQL Database Server uses the current major PostgreSQL version
type: security_rules
---

## Description

PostgreSQL is using the most recent major version available.

## Rationale

PostegreSQL employs both minor and major version updates. Using the most recent version available (particularly the most recent major version) ensures that you are using the most secure, feature rich, and supported version available. Azure Database Migration Service can help minimize downtime when performing version upgrades in Azure Database for PostgreSQL - Single Server. 

## Remediation

### From the console

1. Use Azure's [Configure server parameters in Azure Database for PostgreSQL - Single Server via the Azure portal][1] to configure a target database with desired PostgreSQL version, network settings, and parameters. 
2. Follow the steps listed at [Tutorial: Migrate/Upgrade Azure DB for PostgreSQL - Single Server to Azure DB for PostgreSQL - Single Server online using DMS via the Azure portal][2] to migrate the old database to the new database.

### From the command line

1. Use Azure's [Customize server configuration parameters for Azure Database for PostgreSQL - Single Server using Azure CLI][3] to configure a target database with desired PostgreSQL version, network settings, and parameters. 
2. Follow the steps listed at [Tutorial: Migrate PostgreSQL to Azure DB for PostgreSQL online using DMS via the Azure CLI][4] to migrate the old database to the new database.

[1]: https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-server-parameters-using-portal
[2]: https://docs.microsoft.com/en-us/azure/dms/tutorial-azure-postgresql-to-azure-postgresql-online-portal
[3]: https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-server-parameters-using-cli
[4]: https://docs.microsoft.com/en-us/azure/dms/tutorial-postgresql-azure-postgresql-online
