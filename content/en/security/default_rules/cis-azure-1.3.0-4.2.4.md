---
aliases:
- tlw-3s4-bbr
- /security_monitoring/default_rules/tlw-3s4-bbr
- /security_monitoring/default_rules/cis-azure-1.3.0-4.2.4
disable_edit: true
integration_id: azure.sql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.sql
title: SQL Server Vulnerability Assessments send scan reports to subscribed admins
type: security_rules
---

## Description

Configure `send scan reports to` with the email IDs of concerned data owners and stakeholders for a critical SQL server.

## Rationale

Vulnerability Assessment (VA) scan reports and alerts are sent to email IDs configured with `send scan reports to`. This may help in reducing time required for identifying risks and taking corrective measures.

## Impact

**Note**: Enabling the Azure Defender for SQL features incurs additional costs for each SQL server.

## Remediation

### From the console

1. Go to SQL servers
2. Select a server instance
3. Click on Security Center
4. Ensure that Azure Defender for SQL is enabled
5. Select Configure next to enabled at subscription-level
6. In Vulnerability Assessment Settings, configure Storage Accounts
7. Configure email IDs for concerned data owners and stakeholders in the `send scan reports to` section.
8. Click Save

### Using PowerShell

If not already, enable Advanced Data Security for a SQL: `ServerSet-AZSqlServerThreatDetectionPolicy -ResourceGroupName <resource group name> -ServerName <server name> -EmailAdmins $True`


To enable ADS-VA service and set `send scan reports to`:

```bash
Update-AzSqlServerVulnerabilityAssessmentSetting ` -ResourceGroupName "<resource group name>"` -ServerName "<Server Name>"` -StorageAccountName "<Storage Name from same subscription and same Location" ` -ScanResultsContainerName "vulnerability-assessment" ` -RecurringScansInterval Weekly ` -EmailSubscriptionAdmins $true ` -NotificationEmail @("mail1@mail.com" , "mail2@mail.com")'
```

## References

1. https://docs.microsoft.com/en-us/azure/sql-database/sql-vulnerability-assessment
2. https://docs.microsoft.com/en-us/rest/api/sql/servervulnerabilityassessments/listbyserver
3. https://docs.microsoft.com/en-in/powershell/module/Az.Sql/Update-AzSqlServerVulnerabilityAssessmentSetting?view=azps-2.6.0
4. https://docs.microsoft.com/en-in/powershell/module/Az.Sql/Get-AzSqlServerVulnerabilityAssessmentSetting?view=azps-2.6.0
5. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-posture-vulnerability-management#pv-6-perform-software-vulnerability-assessments

## CIS Controls

Version 7 3.1 - Run Automated Vulnerability Scanning Tools - Utilize an up-to-date SCAP-compliant vulnerability scanning tool to automatically scan all systems on the network on a weekly or more frequent basis to identify all potential vulnerabilities on the organization's systems.
