---
title: Trigger a workflow
kind: documentation
disable_toc: false
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

You can trigger a workflow manually, on a schedule, or using a variety of automated methods such as a Datadog Monitor, or a webhook. Triggering a workflow using automation requires a unique service account. For more information on setting up a service account for workflow runs, see **TODO: link for this**.

## Manually trigger a workflow

To trigger a workflow manually:
1. From the workflow page, click the **Run** button. 
1. Enter the values for existing trigger variables.
1. When you're ready to run the workflow, click **Save & Run**.

## Trigger a workflow from a Monitor

To trigger a workflow from a Monitor:
1. On the workflow canvas, click **Add an Automated Trigger** and select **@mention**.
1. Next to **@workflow-**, enter a mention name for the trigger. Your mention name must be unique.
1. Save your Workflow.
1. Find the monitor you'd like to use to trigger the workflow and edit it, or create a new monitor.
1. In the message section, add the full workflow mention name:
   - The mention name should start with `@workflow-`. For example, `@workflow-my-workflow`
   - To pass trigger variables into the workflow, use a comma-separated list with the syntax `@workflow-name(key=value, key=value)`. For example, `@workflow-my-workflow(name="Bits", alert_threshold=threshold)`
1. Save the monitor.

{{< img src="workflows/monitor-trigger.png" alt="Add a monitor trigger to the message section of a Monitor" >}}

## Trigger a workflow from a Dashboard



## Trigger a workflow from a Security Signal notification
## Trigger a workflow from a webhook
## Scheduling a workflow trigger