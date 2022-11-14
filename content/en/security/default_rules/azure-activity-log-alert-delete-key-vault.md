---
aliases:
- ka5-bad-7de
- /security_monitoring/default_rules/ka5-bad-7de
- /security_monitoring/default_rules/azure-activity-log-alert-delete-key-vault
disable_edit: true
integration_id: azure.activity_log
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.activity_log
title: User has 'Delete Key Vault' activity log alert configured
type: security_rules
---

## Description

Create an activity log alert for the Delete Key Vault event.

## Rationale

By implementing alerting on significant infrastructure changes in Microsoft Azure, you can detect unauthorized or unwanted activity.

## Remediation


### From the console

1. Navigate to **Monitor**. 
2. Select **Activity Logs**.
3. Search the operation name **Delete Key Vault**.
3. Click **On New Alert Rule**.
4. Under **Scope**, select the Subscription and any Resource Groups that need monitoring.
5. Configure Action groups if needed.
6. In **Details**, provide a descriptive Alert rule name and description.
7. Go to **Tags** and enter relevant tags.
8. Click **Review + create**.

### From the command line

```bash
az account get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c 'curl -X PUT -H "AuthorizationBearer $1" -H "Content-Typeapplication/json" https://management.azure.com/subscriptions/$0/resourceGroups/<Resource_Group_To Create_Alert_In>/providers/microsoft.insights/activityLogAlerts/<Unique_Alert_Name>?api-version=2017-04-01 -d@"input.json"'
```

`input.json` contains the request body JSON data mentioned below. 

```json
{
  "location": "Global",
  "tags": {},
  "properties": {
    "scopes": [
      "/subscriptions/<Subscription_ID>"
    ],
    "enabled": true,
    "condition": {
      "allOf": [
        {
          "containsAny": null,
          "equals": "Administrative",
          "field": "category"
        },
        {
          "containsAny": null,
          "equals": "Microsoft.KeyVault/vaults/delete",
          "field": "operationName"
        }
      ]
    },
    "actions": {
      "actionGroups": [
        {
          "actionGroupId": "/subscriptions/<Subscription_ID>/resourceGroups/<Resource_Group_For_Alert_Group>/providers/microsoft.insights/actionGroups/<Alert_Group>",
"webhookProperties": null
        }
      ]
    },
  }
}
```

**Using PowerShell AZ cmdlets**: 

```powershell
$ComplianceName = 'Delete Key Vault'
$Signal = 'Microsoft.KeyVault/vaults/delete'
$Category = 'Administrative'
$ResourceGroupName = 'MyResourceGroup'
$actiongroup = (Get-AzActionGroup -Name corenotifications -ResourceGroupName $ResourceGroupName)
$ActionGroupId = (New-Object Microsoft.Azure.Management.Monitor.Models.ActivityLogAlertActionGroup $ActionGroup.Id)
$Subscription = (Get-AzContext).Subscription
$location = 'Global'
$scope = "/subscriptions/$($Subscription.Id)"
$alertName = "$($Subscription.Name) - $($ComplianceName)"
$conditions = @(
  New-AzActivityLogAlertCondition -Field 'category' -Equal $Category
  New-AzActivityLogAlertCondition -Field 'operationName' -Equal $Signal
)
Set-AzActivityLogAlert -Location $location -Name $alertName -ResourceGroupName $ResourceGroupName -Scope $scope -Action $ActionGroupId -Condition $conditions
```
## References

1. https://docs.microsoft.com/en-us/azure/key-vault/general/overview
2. https://docs.microsoft.com/en-in/azure/azure-monitor/platform/alerts-activity-log 
3. https://docs.microsoft.com/en-in/rest/api/monitor/activity-log-alerts/delete
4. https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/listbysubscriptionid 
5. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-logging-threat-detection#lt-4-enable-logging-for-azure-resources 

## CIS Controls

Version 7: _6.3 Enable Detailed Logging_. Enable system logging to include detailed information such as an event source, date, user, timestamp, source addresses, destination addresses, and other useful elements.
