---
aliases:
- ylf-74t-6ud
- /security_monitoring/default_rules/ylf-74t-6ud
- /security_monitoring/default_rules/azure-postgresql-intransit-encryption
disable_edit: true
integration_id: azure.dbforpostgresql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.dbforpostgresql
title: Azure PostgreSQL Database Server uses In-Transit Encryption
type: security_rules
---

## Description

PostgreSQL uses SSL/TLS in-transit encryption.

## Rationale

Using in-transit encryption with PostgreSQL protects data from attacks like Man-In-The-Middle (MITM), by ensuring that data is encrypted with Transport Layer Security (SSL/TLS) while moving between endpoints. This is the default option with Azure. 

## Remediation

### From the console

1. Follow the instructions listed at [Configure TLS connectivity in Azure Database for PostgreSQL - Single Server][1] to transition to SSL/TLS encyrption in-transit. 

### From the command line

1. Follow the steps listed at [Configure TLS connectivity in Azure Database for PostgreSQL - Single Server][2] to use the CLI to transition to SSL/TLS encyrption in-transit. 

[1]: https://docs.microsoft.com/en-us/azure/postgresql/concepts-ssl-connection-security#using-the-azure-portal
[2]: https://docs.microsoft.com/en-us/azure/postgresql/concepts-ssl-connection-security#using-azure-cli
