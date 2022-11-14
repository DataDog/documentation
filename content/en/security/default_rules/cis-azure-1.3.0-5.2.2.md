---
aliases:
- e4p-3af-0w3
- /security_monitoring/default_rules/e4p-3af-0w3
- /security_monitoring/default_rules/cis-azure-1.3.0-5.2.2
disable_edit: true
integration_id: azure.activity_log
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.activity_log
title: User has 'Delete Policy Assignment' activity log alert configured
type: security_rules
---

## Description

Create an activity log alert for the Delete Policy Assignment event.

## Rationale

By monitoring delete policy assignment events, you gain insight into changes in the **Policy - Assignments** page and reduce the time it takes to detect unsolicited changes.

## Remediation

### From the console

1. Navigate to **Monitor**. 
2. Select **Alerts**.
3. Click **On New Alert Rule**.
4. Under **Scope**, click **Select resource**. 
5. Select the appropriate subscription under **Filter by subscription**. 
6. Select **Policy Assignment** under **Filter by resource type**. 
7. Select **All** for **Filter by location**. 
8. Click on the subscription from the entries populated under **Resource**. 
9. Verify that **Selection preview** shows All Policy assignments (`policyAssignments`) and your selected subscription name. 
10. Click **Done**. 
11. Under **Condition**, click **Add Condition**. 
12. Select **Delete policy assignment signal**. 
13. Click **Done**. 
14. Under **Action group**, select **Add action groups** and either complete the creation process or select the appropriate action group. 
15. Under **Alert rule details**, enter **Alert rule name** and **Description**. 
16. Select the appropriate resource group to save the alert to. 
17. Click on the **Enable alert rule upon creation** checkbox. 
18. Click **Create alert rule**.

### From the command line

```
az account get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c 'curl -X PUT -H "AuthorizationBearer $1" -H "Content-Typeapplication/json" https://management.azure.com/subscriptions/$0/resourceGroups/<Resource_Group_To Create_Alert_In>/providers/microsoft.insights/activityLogAlerts/<Unique_Alert_Name>?api-version=2017-04-01 -d@"input.json"'
```

`input.json` contains the request body JSON data below. 

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
          "equals": "Microsoft.Authorization/policyAssignments/delete",
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
$ComplianceName = 'Delete Policy Assignment'
$Signal = 'Microsoft.Authorization/policyAssignments/delete'
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

1. https://docs.microsoft.com/en-in/azure/azure-monitor/platform/alerts-activity-log 
2. https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/createorupdate 
3. https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/listbysubscriptionid 
4. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-logging-threat-detection#lt-4-enable-logging-for-azure-resources 
5. https://azure.microsoft.com/en-us/services/blueprints/ 

## Additional Information

This log alert also applies for Azure Blueprints.

## CIS Controls

Version 7: _6.3 Enable Detailed Logging_. Enable system logging to include detailed information such as an event source, date, user, timestamp, source addresses, destination addresses, and other useful elements.
