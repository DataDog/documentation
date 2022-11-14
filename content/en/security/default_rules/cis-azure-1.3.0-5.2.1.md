---
aliases:
- u2p-1da-4d3
- /security_monitoring/default_rules/u2p-1da-4d3
- /security_monitoring/default_rules/cis-azure-1.3.0-5.2.1
disable_edit: true
integration_id: azure.activity_log
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.activity_log
title: User has 'Create Policy Assignment' activity log alert configured
type: security_rules
---

## Description

Create an activity log alert for the Create Policy Assignment event.

## Rationale

Monitoring for create policy assignment events gives insight into changes done in "azure policy - assignments" and can reduce the time it takes to detect unsolicited changes.

## Remediation

### From the console

1. Go to Monitor 
2. Select Alerts 
3. Click On New Alert Rule 
4. Under Scope, click Select resource 
5. Select the appropriate subscription under Filter by subscription 
6. Select Policy Assignment under Filter by resource type 
7. Select All for Filter by location 
8. Click on the subscription resource from the entries populated under Resource 
9. Verify Selection preview shows All Policy assignment (policyAssignments) and your selected subscription name 
10. Click Done 
11. Under Condition click Add Condition 
12. Select Create policy assignment signal 
13. Click Done 
14. Under Action group, select Add action groups and complete creation process or select appropriate action group 
15. Under Alert rule details, enter Alert rule name and Description 
16. Select appropriate resource group to save the alert to 
17. Check Enable alert rule upon creation checkbox 
18. Click Create alert rule Using the Azure Command Line Interface Use the below command to create an Activity Log Alert for Create policy assignment az account get-access-token --query "{subscription:subscription,accessToken:accessToken}" --out tsv | xargs -L1 bash -c ''curl -X PUT -H "AuthorizationBearer $1" -H "Content-Typeapplication/json" https://management.azure.com/subscriptions/$0/resourceGroups/<Resource_Group_To Create_Alert_In>/providers/microsoft.insights/activityLogAlerts/<Unique_Alert_Name>?api-version=2017-04-01 -d@"input.json"'' Where input.json contains the Request body JSON data as mentioned below. { "location""Global", "tags"{}, "properties"{ "scopes"[ "/subscriptions/<Subscription_ID>" ], "enabled"true, "condition"{ "allOf"[ { "containsAny"null, "equals""Administrative", "field""category" }, { "containsAny"null, "equals""Microsoft.Authorization/policyAssignments/write", "field""operationName" } ] }, "actions"{ "actionGroups"[ { "actionGroupId""/subscriptions/<Subscription_ID>/resourceGroups/<Resource_Group_For_Alert_Group>/providers/microsoft.insights/actionGroups/<Alert_Group>", "webhookProperties"null } ] }, } } Configurable Parameters for command line<Resource_Group_To Create_Alert_In> <Unique_Alert_Name> Configurable Parameters for input.json<Subscription_ID> in scopes <Subscription_ID> in actionGroupId <Resource_Group_For_Alert_Group> in actionGroupId <Alert_Group> in actionGroupId'


## References

1. https://azure.microsoft.com/en-us/updates/classic-alerting-monitoring-retirement 
2. https://docs.microsoft.com/en-in/azure/azure-monitor/platform/alerts-activity-log 
3. https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/createorupdate 
4. https://docs.microsoft.com/en-in/rest/api/monitor/activitylogalerts/listbysubscriptionid 
5. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-logging-threat-detection#lt-4-enable-logging-for-azure-resources

## CIS Controls

Version 7
6.3 Enable Detailed Logging Enable system logging to include detailed information such as an event source, date, user, timestamp, source addresses, destination addresses, and other useful elements.
