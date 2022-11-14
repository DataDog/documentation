---
aliases:
- tg4-fbl-ydm
- /security_monitoring/default_rules/tg4-fbl-ydm
- /security_monitoring/default_rules/cis-azure-1.3.0-4.3.2
disable_edit: true
integration_id: azure.dbformysql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.dbformysql
title: SSL connection on MySQL Database Server is enabled
type: security_rules
---

## Description

Enable SSL connection on MySQL Servers.

## Rationale

SSL connectivity helps to provide a new layer of security by connecting database servers to client applications using Secure Sockets Layer (SSL). Enforcing SSL connections between a database server and its client applications helps protect against "man in the middle" attacks by encrypting the data stream between the server and application.

## Remediation

### From the console

1. Login to Azure Portal using https://portal.azure.com
2. Go to Azure Database for MySQL server
3. For each database, click on Connection security
4. In SSL settings, click on Enabled for enforce SSL connection 

Alternatively, use the Azure Command Line Interface and run the below command to set MYSQL Databases to Enforce SSL connection:

  ```bash
  az mysql server update --resource-group <resourceGroupName> --name <serverName> --ssl-enforcement Enabled
  ```

## References

1. https://docs.microsoft.com/en-us/azure/mysql/concepts-ssl-connection-security
2. https://docs.microsoft.com/en-us/azure/mysql/howto-configure-ssl
3. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-data-protection#dp-4-encrypt-sensitive-information-in-transit

## CIS Controls

Version 7 14.4 Encrypt All Sensitive Information in Transit
