---
title: Automation Rules 
description: Reduce manual effort by triggering workflows automatically when datastore records are created, updated, or change status. 
disable_toc: false
aliases:
- actions/datastore/trigger
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-datastore/"
  tag: "Blog"
  text: "Enhance your automated workflows and apps with Datastore"
---

This page explains how to use and audit automation rules for datastores. With automation rules, you can add workflows to your datastores that automatically trigger when records are created, updated, or deleted.

## Use Automation Rules 

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

## Audit Automation Rules



## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/actions/datastores