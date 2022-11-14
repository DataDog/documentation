---
aliases:
- mhu-w8j-px0
- /security_monitoring/default_rules/mhu-w8j-px0
- /security_monitoring/default_rules/cis-azure-1.3.0-4.3.8
disable_edit: true
integration_id: azure.dbforpostgresql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.dbforpostgresql
title: Access to Azure services for PostgreSQL Database Server is disabled
type: security_rules
---

## Description

Disable access from Azure services to PostgreSQL Database Server

## Rationale

If access from Azure services is enabled, the server's firewall will accept connections from all Azure resources, including resources not in your subscription. This is usually not a desired configuration. Instead, set up firewall rules to allow access from specific network ranges or VNET rules to allow access from specific virtual networks.

## Remediation

### From the console

1. Login to Azure Portal using https://portal.azure.com
2. Go to Azure Database for PostgreSQL server
3. For each database, click on Connection security
4. In Firewall rules, ensure Allow access to Azure services is set to OFF.
5. Click Save to apply the changed rule. 

Alternatively, use the Azure Command Line Interface and run the below command to delete the `AllowAllAzureIps` rule for PostgreSQL Database:

  ```bash
  az postgres server firewall-rule delete --name AllowAllAzureIps --resource-group <resourceGroupName> --server-name <serverName>
  ```

## References

1. https://docs.microsoft.com/en-us/azure/postgresql/concepts-firewall-rules
2. https://docs.microsoft.com/en-us/azure/postgresql/howto-manage-firewall-using-cli
3. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-network-security#ns-1-implement-security-for-internal-traffic
4. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-network-security#ns-4-protect-applications-and-services-from-external-network-attacks
5. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-network-security#ns-1-implement-security-for-internal-traffic

## CIS Controls

Version 7

9.4 Apply Host-based Firewalls or Port Filtering: Apply host-based firewalls or port filtering tools on end systems, with a default-deny rule that drops all traffic except those services and ports that are explicitly allowed.

9.5 Implement Application Firewalls: Place application firewalls in front of any critical servers to verify and validate the traffic going to the server. Any unauthorized traffic should be blocked and logged.

14.2 Enable Firewall Filtering Between VLANs: Enable firewall filtering between VLANs to ensure that only authorized systems are able to communicate with other systems necessary to fulfill their specific responsibilities.
