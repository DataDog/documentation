---
aliases:
- l95-z72-nrb
- /security_monitoring/default_rules/l95-z72-nrb
- /security_monitoring/default_rules/cis-azure-1.3.0-5.1.2
disable_edit: true
integration_id: azure.monitor
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.monitor
title: Diagnostic Setting captures appropriate categories
type: security_rules
---

## Description

Configure the diagnostic setting to log the appropriate activities from the control/management plane.

## Rationale

A diagnostic setting controls how the diagnostic log is exported. Capturing the diagnostic setting categories for appropriate control/management plane activities allows proper alerting.

## Remediation

### From the console

1. Go to Azure Monitor
2. Click Activity log
3. Click on Diagnostic settings
4. Click on Edit Settings for the diagnostic settings entry
5. Ensure that the following categories are checked: Administrative, Alert, Policy, and Security

ARM Template with AZ PowerShell cmdlets:

Create a file to hold the following JSON:

```json
{ "$schema""https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#", "contentVersion""
1.0.0.0", "parameters"{ "settingName"{ "type""String" }, "workspaceId"{ "type""String" } }, "resources"[ { "type""Microsoft.Insights/diagnosticSettings", "apiVersion""2017-05-01-preview", "name""[parameters(''settingName'')]", "dependsOn"[], "properties"{ "workspaceId""[parameters(''workspaceId'')]", "logs"[ { "category""Administrative", "enabled"true }, { "category""Alert", "enabled"true }, { "category""Autoscale", "enabled"false }, { "category""Policy", "enabled"true }, { "category""Recommendation", "enabled"false }, { "category""ResourceHealth", "enabled"false }, { "category""Security", "enabled"true }, { "category""ServiceHealth", "enabled"false } ] } } ] }
```

Reference the JSON. In the `New-AzSubscriptionDeployment`, call `$OMSWorkspace`:

```powershell
Get-AzResource -ResourceType "Microsoft.OperationalInsights/workspaces" -Name <Workspace Name> New-AzSubscriptionDeployment -Name CreateDiagnosticSetting -location eastus -TemplateFile CreateDiagnosticSetting.jsonc -settingName "Send Activity log to workspace" -workspaceId $OMSWorkspace.ResourceId'
```

## References

1. https://docs.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-settings
2. https://docs.microsoft.com/en-us/azure/azure-monitor/samples/resource-manager-diagnostic-settings
3. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-logging-threat-detection#lt-4-enable-logging-for-azure-resources

## CIS Controls

Version 7 6.3 - Enable Detailed Logging - Enable system logging to include detailed information such as an event source, date, user, timestamp, source addresses, destination addresses, and other useful elements.
