---
aliases:
- er3-o3f-31e
- /security_monitoring/default_rules/er3-o3f-31e
- /security_monitoring/default_rules/cis-azure-1.3.0-5.2.3
disable_edit: true
integration_id: azure.activity_log
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.activity_log
title: User has 'Create or Update Network Security Group' activity log alert configured
type: security_rules
---

## Description

Create an Activity Log Alert for the Create or Update Network Security Group event.

## Rationale

By monitoring for creation and updates to network security group events, you gain insight into network access changes and may reduce the time it takes to detect suspicious activity.

## Remediation

### From the console

1. Navigate to **Monitor**. 
2. Select **Alerts**.
3. Click **On New Alert Rule**.
4. Under **Scope**, click **Select resource**. 
5. Select the appropriate subscription under **Filter by subscription**. 
6. Select **Network Security Groups** under **Filter by resource type**. 
7. Select **All** for **Filter by location**. 
8. Click on the subscription resource from the entries populated under **Resource**. 
9. Click **Done**. 
10. Verify that **Selection preview** shows Network Security Groups and your selected subscription name.
11. Under **Condition**, click **Add Condition**.
12. Select **Create or Update Network Security Group** signal. 
13. Click **Done**. 
14. Under **Action group**, select **Add action groups** and either complete the creation process, or select the appropriate action group. 
15. Under **Alert rule details**, enter **Alert rule name** and **Description**.
16. Select appropriate resource group to save the alert to. 
17. Click on the **Enable alert rule upon creation** checkbox.
18. Click **Create alert rule**.

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
          "containsAny": null,
          "field": "operationName",
          "equals": "Microsoft.Network/networkSecurityGroups/write"
        }
      ]
    },
    "actions": {
      "actionGroups": [
        {
          "actionGroupId": "/subscriptions/<Subscription_ID>/resourceGroups/<Resource_Group_For_Alert_Gr oup>/providers/microsoft.insights/actionGroups/<Alert_Group>",
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
