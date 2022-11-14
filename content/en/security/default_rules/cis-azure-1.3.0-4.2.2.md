---
aliases:
- q67-xy1-a2u
- /security_monitoring/default_rules/q67-xy1-a2u
- /security_monitoring/default_rules/cis-azure-1.3.0-4.2.2
disable_edit: true
integration_id: azure.sql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.sql
title: Vulnerability Assessment (VA) is enabled on a SQL server by setting a Storage
  Account
type: security_rules
---

## Description

Enable Vulnerability Assessment (VA) service scans for critical SQL servers and corresponding SQL databases.

## Rationale

Enabling Azure Defender for SQL server does not enable vulnerability assessment capabilities for individual SQL databases unless a storage account is set to store the scanning data and reports. The Vulnerability Assessment service scans databases for known security vulnerabilities and highlights deviations from best practices, such as misconfigurations, excessive permissions, and unprotected sensitive data. Results of the scan include actionable steps to resolve each issue and provide customized remediation scripts where applicable. Additionally, an assessment report can be customized by setting an acceptable baseline for permission configurations, feature configurations, and database settings.

## Remediation

### From the console

1. Go to SQL servers
2. Select a server instance
3. Click on Security Center
4. Select Configure next to Enabled at subscription-level
5. In Section Vulnerability Assessment Settings, Click Storage Account
6. Choose Storage Account (Existing or Create New). Click Ok
7. Click Save Using Azure PowerShell. If not already, enable Azure Defender for a SQLSet:

  ```bash
  -AZSqlServerThreatDetectionPolicy -ResourceGroupName <resource group name> -ServerName <server name> -EmailAdmins $True To enable ADS-VA service by setting Storage Account Update-AzSqlServerVulnerabilityAssessmentSetting ` -ResourceGroupName "<resource group name>"` -ServerName "<Server Name>"` -StorageAccountName "<Storage Name from same subscription and same Location" ` -ScanResultsContainerName "vulnerability-assessment" ` -RecurringScansInterval Weekly ` -EmailSubscriptionAdmins $true ` -NotificationEmail @("mail1@mail.com" , "mail2@mail.com")'
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

Version 7 3.1 Run Automated Vulnerability Scanning Tools: Utilize an up-to-date SCAP-compliant vulnerability scanning tool to automatically scan all systems on the network on a weekly or more frequent basis to identify all potential vulnerabilities on the organization's systems.
