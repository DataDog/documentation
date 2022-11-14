---
aliases:
- s5p-m71-nvi
- /security_monitoring/default_rules/s5p-m71-nvi
- /security_monitoring/default_rules/cis-azure-1.3.0-4.2.3
disable_edit: true
integration_id: azure.sql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.sql
title: Vulnerability Assessment (VA) setting Periodic Recurring Scans is enabled on
  a SQL server
type: security_rules
---

## Description

Enable vulnerability assessment (VA) periodic recurring scans for critical SQL servers and corresponding SQL databases.

## Rationale

VA setting "Periodic recurring scans" schedules periodic (weekly) vulnerability scanning for the SQL server and corresponding Databases. Routine vulnerability scanning provides risk visibility based on updated known vulnerability signatures and best practices.

## Remediation

### From the console

1. Go to SQL servers
2. For each server instance
3. Click on Security Center
4. In Section Vulnerability Assessment Settings, set Storage Account
5. Toggle "Periodic recurring scans" to ON.
6. Click Save using the Azure PowerShell. If not already set, enable Advanced Data Security for a SQL ServerSet:

  ```bash
  -AZSqlServerThreatDetectionPolicy -ResourceGroupName <resource group name> -ServerName <server name> -EmailAdmins $True To enable ADS-VA service with ''Periodic recurring scans'' Update-AzSqlServerVulnerabilityAssessmentSetting ` -ResourceGroupName "<resource group name>"` -ServerName "<Server Name>"` -StorageAccountName "<Storage Name from same subscription and same Location" ` -ScanResultsContainerName "vulnerability-assessment" ` -RecurringScansInterval Weekly ` -EmailSubscriptionAdmins $true ` -NotificationEmail @("mail1@mail.com" , "mail2@mail.com")
  ```

## Impact

Enabling the Azure Defender for SQL feature will incur additional costs for each SQL server.

## References

1. https://docs.microsoft.com/en-us/azure/sql-database/sql-vulnerability-assessment
2. https://docs.microsoft.com/en-us/rest/api/sql/servervulnerabilityassessments/listbyserver
3. https://docs.microsoft.com/en-in/powershell/module/Az.Sql/Update-AzSqlServerVulnerabilityAssessmentSetting?view=azps-2.6.0
4. https://docs.microsoft.com/en-in/powershell/module/Az.Sql/Get-AzSqlServerVulnerabilityAssessmentSetting?view=azps-2.6.0
5. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-posture-vulnerability-management#pv-6-perform-software-vulnerability-assessments

## CIS Controls

Version 7 3.1 Run Automated Vulnerability Scanning Tools: Utilize an up-to-date SCAP-compliant vulnerability scanning tool to automatically scan all systems on the network on a weekly or more frequent basis to identify all potential vulnerabilities on the organization's systems.
