---
aliases:
- mlb-mlg-mr4
- /security_monitoring/default_rules/mlb-mlg-mr4
- /security_monitoring/default_rules/cis-azure-1.3.0-5.2.9.2
disable_edit: true
integration_id: azure.activity_log
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.activity_log
title: User has 'Delete SQL Server Firewall Rule' activity log alert configured
type: security_rules
---

## Description

Create an activity log alert for the "Delete SQL Server Firewall Rule."

### Default value

By default, no monitoring alerts are created or active.

## Rationale

Monitoring for Create or Update SQL Server Firewall Rule events gives insight into network access changes and may reduce the time it takes to detect suspicious activity.

### Impact

There will be a substantial increase in log size if there are a large number of administrative actions on a server.

## Remediation

### From the console

1. Navigate to `Monitor` blade.
2. Select `Alerts`.
3. Click `Create`.
4. Click on `Alert rule`.
5. Under the Scope tab, click `Select scope`.
6. In the `Select a resource` window,select the appropriate filters:
    * Filter by subscription: `< choose the subscription alerts are needed for >`
    * Filter by resource type: **Server Firewall Rule (servers/firewallRules)** 
    * Filter by location: `All`
    * Click on the `subscription name` or `resource group` that the Log Alert Rule will be applied to
7. Verify that the selection preview shows:
    * **All server firewall rule (servers/firewallrules)** or `< your selected resource >`
    * `< Resource Name >` - The subscription, group, or resource you selected
8. Click `Done`.
9. Under the Condition tab, click `Add Condition`. The `Select a signal` window may automatically open without clicking.
10. In the `Select a signal` window, under the "Signal Name" heading, click **Delete server firewall rule (Microsoft.Sql/servers/firewallRules)**.
11. Under the Actions tab, choose appropriately:
    * Select action groups - If you have an existing action group to notify the necessary personnel
    * Create action group - If you do not have an existing action group or want to create a new one
12. Under the Details tab, fill in:
    * Resource group - Select the resource group you want the alert rule to reside in
    * Alert rule name - Give your alert a recognizable and standardized name
    * Alert rule description - (Optional)
13. Click `Review + create` then verify the summary details.
14. Click `Create`.

### From the command line

```
az account get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c 'curl -X PUT -H "AuthorizationBearer $1" -H "Content-Typeapplication/json" https://management.azure.com/subscriptions/$0/resourceGroups/<Resource_Group_To Create_Alert_In>/providers/microsoft.insights/activityLogAlerts/<Unique_Alert_Name>?api-version=2017-04-01 -d@"input.json"'
```

`input.json` contains the following request body JSON data:

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
          "equals": "Microsoft.Sql/servers/firewallRules/write",
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

## References

1. [https://azure.microsoft.com/en-us/updates/classic-alerting-monitoring-retirement][1]
2. [https://docs.microsoft.com/en-in/azure/azure-monitor/platform/alerts-activity-log][2] 
3. [https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/createorupdate][3] 
4. [https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/listbysubscriptionid][4]
5. [https://docs.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-logging-threat-detection#lt-3-enable-logging-for-security-investigation][5]

[1]: https://azure.microsoft.com/en-us/updates/classic-alerting-monitoring-retirement
[2]: https://docs.microsoft.com/en-in/azure/azure-monitor/platform/alerts-activity-log
[3]: https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/createorupdate
[4]: https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/listbysubscriptionid
[5]: https://docs.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-logging-threat-detection#lt-3-enable-logging-for-security-investigation
