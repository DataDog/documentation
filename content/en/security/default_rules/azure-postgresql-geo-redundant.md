---
aliases:
- 1f5-hbg-tw6
- /security_monitoring/default_rules/1f5-hbg-tw6
- /security_monitoring/default_rules/azure-postgresql-geo-redundant
disable_edit: true
integration_id: azure.dbforpostgresql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.dbforpostgresql
title: Azure PostgreSQL database server uses geo-redundant backups
type: security_rules
---

## Description

PostgreSQL uses geo-redundant backups.

## Rationale

Using geo-redundancy with PostgreSQL creates geographically distributed replicas by default. These replicas assist with achieving data durability, as they protect against data becoming unavailable because of a regional event, such as a natural disaster. You can select this option only at the time of database creation. To modify an existing database to use geo-redundancy, recreate the database.

## Remediation

### From the console

1. Follow the instructions listed at [Tutorial: Design an Azure Database for PostgreSQL - Single Server using the Azure portal][1] to create a new PostgreSQL database. Ensure **Geo-redundant** is selected under **Backup redundancy options**.

### From the command line

1. Follow the steps listed at [Tutorial: Design an Azure Database for PostgreSQL - Single Server using Azure CLI][2] to create and deploy a PostgreSQL server.
2. When configuring the [`az postgres server create` Microsoft Azure Module][3] ensure that `geoRedundantBackup` is set to `Enabled`, as shown in the example below. 

    {{< code-block lang="bash">}}
    az postgres server create 
        -l northeurope 
        -g mygroup 
        -n mysvr 
        -u username 
        -p password 
        --sku-name my_sku
        --ssl-enforcement Enabled 
        --minimal-tls-version TLS1_0 
        --public-network-access Disabled 
        --backup-retention 10 
        --geo-redundant-backup Enabled 
        --storage-size 51200 
        --tags "key=value" 
        --version 11
    {{< /code-block >}}

[1]: https://docs.microsoft.com/en-us/azure/postgresql/tutorial-design-database-using-azure-portal
[2]: https://docs.microsoft.com/en-us/azure/postgresql/tutorial-design-database-using-azure-cli
[3]: https://docs.microsoft.com/en-us/cli/azure/postgres/server?view=azure-cli-latest#az-postgres-server-create
