---
aliases:
- c6c-xsu-o9f
- /security_monitoring/default_rules/c6c-xsu-o9f
- /security_monitoring/default_rules/cis-azure-1.3.0-4.2.5
disable_edit: true
integration_id: azure.sql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.sql
title: Vulnerability Assessment (VA) setting 'Also send email notifications to admins
  and subscription owners' is set for a SQL server
type: security_rules
---

## Description

Enable the vulnerability assessment (VA) setting, "Also send email notifications to admins and subscription owners".

## Rationale

VA scan reports and alerts are sent to admins and subscription owners by enabling the setting, "Also send email notifications to admins and subscription owners". This helps to reduce the time required for identifying risks and taking corrective measures.

## Remediation

### From the console

1. Go to SQL servers
2. Select a server instance
3. Click on Security Center
4. Select Configure next to Enabled at subscription-level
5. In Section Vulnerability Assessment Settings, configure Storage Accounts
6. Check/enable "Also send email notifications to admins and subscription owners"
7. Click Save using the Azure PowerShell. If not already set, Enable Advanced Data Security for a SQL:

  ```bash
  -ServerSet-AZSqlServerThreatDetectionPolicy -ResourceGroupName <resource group name> -ServerName <server name> -EmailAdmins $True To enable ADS-VA service and Set ''Also send email notifications to admins and subscription owners'' Update-AzSqlServerVulnerabilityAssessmentSetting ` -ResourceGroupName "<resource group name>"` -ServerName "<Server Name>"` -StorageAccountName "<Storage Name from same subscription and same Location" ` -ScanResultsContainerName "vulnerability-assessment" ` -RecurringScansInterval Weekly ` -EmailSubscriptionAdmins $true ` -NotificationEmail @("mail1@mail.com" , "mail2@mail.com")
  ```

## Impact

Enabling the Azure Defender for SQL features will incur additional costs for each SQL server.

## References

1. https://docs.microsoft.com/en-us/azure/sql-database/sql-vulnerability-assessment
2. https://docs.microsoft.com/en-us/rest/api/sql/servervulnerabilityassessments/listbyserver
3. https://docs.microsoft.com/en-in/powershell/module/Az.Sql/Update-AzSqlServerVulnerabilityAssessmentSetting?view=azps-2.6.0
4. https://docs.microsoft.com/en-in/powershell/module/Az.Sql/Get-AzSqlServerVulnerabilityAssessmentSetting?view=azps-2.6.0
5. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-posture-vulnerability-management#pv-6-perform-software-vulnerability-assessments

## CIS Controls

Version 7

3.1 Run Automated Vulnerability Scanning Tools: Utilize an up-to-date SCAP-compliant vulnerability scanning tool to automatically scan all systems on the network on a weekly or more frequent basis to identify all potential vulnerabilities on the organization's systems.

4.3 PostgreSQL Database Server: This section groups security best practices/recommendations for Azure PostgreSQL Database Servers.
