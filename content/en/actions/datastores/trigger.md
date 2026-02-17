---
title: Automation Rules 
description: Reduce manual effort by triggering workflows automatically when datastore records are created, updated, or change status. 
disable_toc: false
aliases:
- /actions/datastore/trigger
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-datastore/"
  tag: "Blog"
  text: "Enhance your automated workflows and apps with Datastore"
- link: "https://www.datadoghq.com/blog/datadog-automation-rules/"
  tag: "Blog"
  text: "Respond to changes in your data with Datadog automation rules"
---

This page explains how to use and audit automation rules for datastores. With automation rules, you can add workflows to your datastores that automatically trigger when records are created, updated, or deleted.

## Use automation rules 

### Create a new automation rule

To create a new automation rule: 
1. Navigate to the [Datastores page][1].
1. Select a datastore. 
1. Click **Automation Rules**, then **+ New Automation Rule**. 
1. Configure your new automation rule: 
    1. Choose if the rule will be triggered when a new entry is added, a value has changed, or an entry is deleted.
    1. Choose the workflow that will be triggered when the event occurs. 
    1. Name your rule. 
1. Click **Save**.

### Edit an automation rule 

To edit an automation rule: 
1. Navigate to the [Datastores page][1].
1. Select a datastore. 
1. Click **Automation Rules**, then **+ New Automation Rule**. 
1. Click the **Edit** {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} icon.
1. Make your changes. 
1. Click **Save Changes**.

### Delete an automation rule

To delete an automation rule: 
1. Navigate to the [Datastores page][1].
1. Select a datastore. 
1. Click **Automation Rules**, then **+ New Automation Rule**. 
1. Click the **Delete** {{< img src="icons/delete.png" inline="true" style="width:14px;">}} icon. 
1. When prompted, confirm deletion.

## Audit automation rules

### About audit logs

Changes you make to a datastore are evaluated by whether they match any of your configured automation rules. Each time a rule is evaluated, a log of that event is created. You can view these logs to help with troubleshooting. 

In the screenshot below, audit logs were created for automation rules run when new entries were added, entries were changed, and entries were deleted. Each run generates three logs: one for the rule match, one for the workflow beginning execution, and one for the workflow execution result.

{{< img src="/actions/datastore/datastore-automation-audit-2.png" alt="An example of a datastore's audit logs" style="width:100%;" >}}

### View audit logs

To audit an automation rule: 
1. Navigate to the [Datastores page][1].
1. Select a datastore. 
1. Click **Automation Rules**.
1. Click **Audit Logs**.
1. Click the dropdown menu on the left to filter by automation rule. 
1. Click the dropdown menu on the right to filter results to a specific date range. 
1. To sort the list, click **DATE** or **RULES**. 
1. To see more information, click a log. Logs for item keys display the datastore entry that triggered the automation rule. Logs for workflow executions display a link to your workflow's configuration.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/actions/datastores