---
aliases:
- xyu-929-so6
- /security_monitoring/default_rules/xyu-929-so6
- /security_monitoring/default_rules/cis-azure-1.3.0-6.3-sql
disable_edit: true
integration_id: azure.security
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.security
title: SQL Databases do not allow ingress 0.0.0.0/0 (ANY IP)
type: security_rules
---

## Description

Ensure that no SQL Databases allow ingress from 0.0.0.0/0 (ANY IP).

## Rationale

SQL Server includes a firewall to block access to unauthorized connections. More granular IP addresses can be defined by referencing the range of addresses available from specific data centers. By default for a SQL server, a firewall exists with start IP of 0.0.0.0 and end IP of 0.0.0.0, allowing access to all the Azure services. Additionally a custom rule can be set up with start IP of 0.0.0.0 and end IP of 255.255.255.255, allowing access from ANY IP over the Internet. In order to reduce the potential attack surface for a SQL server, firewall rules should be defined with more granular IP addresses by referencing the range of addresses available from specific data centers.

### Impact

Disabling allow access to Azure Services will break all connections to SQL server and hosted databases unless custom IP-specific rules are not added in Firewall Policy.

## Remediation

### From the console

1. Go to SQL servers
2. For each SQL server, click on Firewall / Virtual Networks
3. Set Allow access to Azure services to `OFF`
4. Set firewall rules to limit access to only authorized connections

### Using PowerShell

Disable default firewall rule "Allow access to Azure services":

```powershell
Remove-AzureRmSqlServerFirewallRule -FirewallRuleName "AllowAllWindowsAzureIps" -ResourceGroupName <resource group name> -ServerName <server name>
```

Remove custom firewall rule:

```powershell
Remove-AzureRmSqlServerFirewallRule -FirewallRuleName "<firewallRuleName>" -ResourceGroupName <resource group name> -ServerName <server name>
```

Set the appropriate firewall rules:

```powershell
Set-AzureRmSqlServerFirewallRule -ResourceGroupName <resource group name> -ServerName <server name> -FirewallRuleName "<Fw rule Name>" -StartIpAddress "<IP Address other than 0.0.
0.0>" -EndIpAddress "<IP Address other than 0.0.0.0 or 255.255.255.255>"
```

## References

1. [https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/configure-a-windows-firewall-for-database-engine-access?view=sql-server-2017][1]
2. [https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/get-azurermsqlserverfirewallrule?view=azurermps-5.2.0][2]
3. [https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/set-azurermsqlserverfirewallrule?view=azurermps-5.2.0][3]
4. [https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/remove-azurermsqlserverfirewallrule?view=azurermps-5.2.0][4] 
5. [https://docs.microsoft.com/en-us/azure/sql-database/sql-database-firewall-configure][5]
6. [https://docs.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-set-database-firewall-rule-azure-sql-database?view=azuresqldb-current][6] 
7. [https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-network-security#ns-1-implement-security-for-internal-traffic][7]

Additional Information: Firewall rules configured on individual SQL Database using Transact-SQL overrides the rules set on SQL server. Azure does not provides any Powershell, API, CLI, Portal option to check database level firewall rules and so far Transact-SQL is the only way to check for the same. For comprehensive control over egress traffic on SQL Databases, firewall rules should be checked using SQL client.

[1]:https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/configure-a-windows-firewall-for-database-engine-access?view=sql-server-2017
[2]:https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/get-azurermsqlserverfirewallrule?view=azurermps-5.2.0
[3]:https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/set-azurermsqlserverfirewallrule?view=azurermps-5.2.0
[4]:https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/remove-azurermsqlserverfirewallrule?view=azurermps-5.2.0
[5]:https://docs.microsoft.com/en-us/azure/sql-database/sql-database-firewall-configure
[6]:https://docs.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-set-database-firewall-rule-azure-sql-database?view=azuresqldb-current
[7]:https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-network-security#ns-1-implement-security-for-internal-traffic
