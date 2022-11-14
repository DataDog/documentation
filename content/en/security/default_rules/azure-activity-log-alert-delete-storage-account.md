---
aliases:
- op4-440-iu1
- /security_monitoring/default_rules/op4-440-iu1
- /security_monitoring/default_rules/azure-activity-log-alert-delete-storage-account
disable_edit: true
integration_id: azure.activity_log
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.activity_log
title: User has 'Delete Storage Accounts' activity log alert configured
type: security_rules
---

## Description

Create an activity log alert for the Delete Storage Account event.

## Rationale

By monitoring for storage accounts deletion events, you gain insight into storage account changes and may reduce the time it takes to detect suspicious activity.

## Remediation

### From the console

1. Navigate to **Monitor**. 
2. Select **Alerts**.
3. Click on **New Alert Rule**.
4. Under **Scope**, click **Select scope**. 
5. Select the appropriate subscription under **Filter by subscription**. 
6. Select **Storage Accounts** under **Filter by resource type**. 
7. Select **All** for **Filter by location**. 
8. Click on the **Include all future resources** checkbox.
9. Click **Done**. 
10. Under **Condition**, click **Add Condition**.
11. Select **Delete Storage Account** signal. 
12. Click **Done**. 
13. Under **Actions**, select **Add action groups** and either complete the creation process, or select the appropriate action group. 
14. Under **Alert rule details**, enter **Alert rule name** and **Description**.
15. Select appropriate resource group to save the alert to. 
16. Click on the **Enable alert rule upon creation** checkbox.
17. Click **Create alert rule**.

### From the command line

```bash
az account get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c 'curl -X PUT -H "Authorization: Bearer $1" -H "Content-Type: application/json" https://management.azure.com/subscriptions/$0/resourceGroups/<Resource_Group_ To_Create_Alert_In>/providers/microsoft.insights/activityLogAlerts/<Unique_Alert _Name>?api-version=2017-04-01 -d@"input.json"'
```

Where `input.json` contains the request body JSON data, as mentioned below.

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
          "field": "operationName",
          "equals": "Microsoft.Storage/storageAccounts/delete"
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

## References


1. https://azure.microsoft.com/en-us/updates/classic-alerting-monitoring-retirement 
2. https://docs.microsoft.com/en-in/azure/azure-monitor/platform/alerts-activity-log 
3. https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/createorupdate 
4. https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/listbysubscriptionid 
5. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-logging-threat-detection#lt-4-enable-logging-for-azure-resources

## CIS Controls

Version 7, 6.3 - Enable Detailed Logging: Enable system logging to include detailed information such as an event source, date, user, timestamp, source addresses, destination addresses, and other useful elements.
