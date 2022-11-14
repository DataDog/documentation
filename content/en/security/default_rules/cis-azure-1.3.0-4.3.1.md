---
aliases:
- y3s-9ua-747
- /security_monitoring/default_rules/y3s-9ua-747
- /security_monitoring/default_rules/cis-azure-1.3.0-4.3.1
disable_edit: true
integration_id: azure.dbforpostgresql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.dbforpostgresql
title: SSL connection on PostgreSQL Database Server is enabled
type: security_rules
---

## Description

Enable SSL connection on PostgreSQL Servers.

## Rationale

SSL connectivity helps to provide a new layer of security by connecting database servers to client applications using Secure Sockets Layer (SSL). Enforcing SSL connections between a database server and its client applications helps protect against "man in the middle" attacks by encrypting the data stream between the server and application.

## Remediation

### From the console
1. Login to Azure Portal using https://portal.azure.com
2. Go to Azure Database for PostgreSQL server
3. For each database, click on Connection security
4. In SSL settings, click on Enabled to enforce SSL connection 

Alternatively, use the Azure Command Line Interface and run the below command to enforce SSL connection for PostgreSQL Database:

  ```bash
  az postgres server update --resource-group <resourceGroupName> --name <serverName> --ssl-enforcement Enabled
  ```

## References

1. https://docs.microsoft.com/en-us/azure/postgresql/concepts-ssl-connection-security
2. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-data-protection#dp-4-encrypt-sensitive-information-in-transit

## CIS Controls

Version 7 14.4 Encrypt All Sensitive Information in Transit
