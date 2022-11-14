---
aliases:
- 6bj-f4v-9aj
- /security_monitoring/default_rules/6bj-f4v-9aj
- /security_monitoring/default_rules/cis-azure-1.3.0-6.3-postgresql
disable_edit: true
integration_id: azure.security
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.security
title: PostgreSQL Databases do not allow ingress 0.0.0.0/0 (ANY IP)
type: security_rules
---

## Description

Ensure that no PostgreSQL Databases allow ingress from 0.0.0.0/0 (ANY IP).

## Rationale

PostgreSQL Server includes a firewall to block access to unauthorized connections. More granular IP addresses can be defined by referencing the range of addresses available from specific datacenters.

### Impact

Disabling Allow access to Azure Services will break all connections to PostgreSQL server and Hosted Databases unless custom IP specific rules are not added in Firewall Policy.

## Remediation

### From the console

1. Go to PostgreSQL servers
2. For each PostgreSQL server, click on Firewall / Virtual Networks
3. Set Allow access to Azure services to `OFF`
4. Set firewall rules to limit access to only authorized connections

### Using PowerShell

Disable default firewall rule "Allow access to Azure services":

```powershell
Remove-AzPostgreSqlFirewallRule -Name "AllowAllWindowsAzureIps" -ResourceGroupName <resource group name> -ServerName <server name>
```

Remove custom firewall rule:

```powershell
Remove-AzPostgreSqlFirewallRule -Name <name> -ResourceGroupName <resource group name> -ServerName <server name>
```

Set the appropriate firewall rules:

```powershell
New-AzPostgreSqlFirewallRule -Name "<rule name>" -ResourceGroupName "<resource group name>" -ServerName "<server name>" -EndIPAddress "<IP Address other than 0.0.0.0>" -StartIPAddress "<IP Address other than 0.0.0.0 or 255.255.255.255>"
```

## References

1. [https://docs.microsoft.com/en-us/azure/postgresql/concepts-firewall-rules][1]

[1]: https://docs.microsoft.com/en-us/azure/postgresql/concepts-firewall-rules
