---
title: Getting Started with Workflow Automation
kind: documentation
further_reading:
    - link: "https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/"
      tag: "Blog"
      text: "Automate end-to-end processes and quickly respond to events with Datadog Workflows"
    - link: "/service_management/workflows/access/"
      tag: "Documentation"
      text: "Access and authentication"
    - link: "/security/cloud_security_management/workflows/"
      tag: "Documentation"
      text: "Automate security workflows"
---

## Overview

With Workflow Automation, you can automate end-to-end processes in response to Datadog alerts and security signals. Workflow Automation is powered by real-time observability data, enabling you to resolve issues faster and proactively maintain the availability and security of your systems.

Follow this guide to create a custom workflow triggered by a monitor alert. When it is triggered, the workflow creates a task in Jira and sends a notification to Slack with a link to the Jira ticket. This guide covers passing data from one step in your workflow to another step, saving and publishing your workflow, and viewing the workflow's run history. 

## Prerequisites

Before getting started, you need the Jira and Slack integrations installed on your [Datadog account][1]. For installation instructions, see the [Slack][2] and [Jira integration][3] documentation.

Account credentials and authentication that you set up in the Jira and Slack integration tiles automatically propagate to the Jira and Slack actions in Workflow Automation. Some integrations require additional configuration for authentication. For more information, see [Connections][4].

## Build the workflow

### Create a workflow with a monitor trigger
You can trigger a workflow from an alert, such as a monitor or security signal, from a schedule, or manually. In this case, create a workflow with a monitor trigger.

To create a workflow with a monitor trigger: 

1. In Datadog, navigate to **Service Management** > **[Workflow Automation][5]**.
2. Click **New Workflow**.
3. Enter a name and description for the workflow. For a sample name, use `Create a Jira Ticket`. A sample description is: `Create a Jira issue and Slack notification when there is a monitor alert`.
4. Select **Monitor or Security Signal**.
5. Click **Create**.
6. On the workflow canvas, click the **Monitor or Security Signal** trigger. 
7. In the **Configure** tab, next to `@workflow-`, enter the unique ID `@workflow-Create-Jira-Ticket` for your workflow. Workflow handles always begin with `@workflow-`. Later, you use this handle to connect the workflow to a monitor notification. 
8. Click **Save** to save your workflow.

{{< img src="/getting_started/workflow_automation/trigger.png" alt="Trigger for Workflows">}}

### Add the Jira and Slack actions
To add the Jira step:
1. On the workflow canvas, click **Add a step to get started**. 
2. Search for the Jira action and select **Create issue**. Click the **Create issue** step and select your **Jira account**. The account should correspond to the Jira URL found in the **Accounts** section of the Jira integration tile. 
3. Enter the **Project** and **Issue type** for the Jira issue that the workflow creates. 
4. Enter a **Summary** and **Description** for the Jira issue, using context variables to pass in data from the monitor that triggers the workflow. You can access a context variable in a step by enclosing it in double braces (`{{`). This following example description uses the source, trigger, and workflow variables to pass along the source that triggered the monitor alert, a link to the affected monitor, the workflow name, and the workflow ID:

```
The CPU usage is above the 95% threshold for {{ Trigger.hostname }}

Please investigate - see this Datadog Dashboard to view all workflow executions: 
https://app.datadoghq.com/dash/integration/workflow_automation?refresh_mode=sliding&from_ts=1698164453793&to_ts=1698168053793&live=true. 

The workflow that created this Jira issue is 
{{ WorkflowName }} : {{ WorkflowId }}

The monitor that triggered the workflow can be found here: {{ Source.url }}
```

For more information on context variables, see **[Context variables][6]**. 

5. Test the Jira action by clicking the green **Test** icon in the **Configure** tab of the action.
6. Click **Save** to save your workflow.

The previous instructions set up a step to create a Jira ticket. Next, add the Slack step:
1. Click the plus icon on the workflow canvas to add another step.
2. Search for the Slack action and select **Send message**.  
3. Enter the **Slack Workspace name**. 
4. Enter the **Slack Channel name**.
5. For a more useful Slack notification, use step output variables. Step output variables allow you to pass data from the Jira step to the Slack step in your workflow. Use the following message text to include the Jira issue key and Jira issue in the Slack message:

```
The monitor named {{ Source.monitor.name }} triggered and created a new Jira issue 
{{ Steps.Create_issue.issueKey }}: {{ Steps.Create_issue.issueUrl }}

The workflow that created this Jira issue is {{ WorkflowName }}
```

6. Test this Slack action by clicking the green **Test** icon in the **Configure** tab of the action.
7. To view your workflow's name in the monitor's notification dropdown, save and publish your workflow. Click **Publish** from the workflow's page.

## Test and publish the workflow

To apply your changes, ensure that you save your workflow by clicking **Save**. Next, test out your workflow by manually triggering it: 

{{< img src="/getting_started/workflow_automation/run_workflow.png" alt="Trigger a workflow manually" style="width:90%;" >}}

To trigger the workflow manually, click **Run** from the workflow page, and enter the values for the trigger variables.

Confirm that running the workflow creates a Jira ticket and sends a Slack message as you specified. 

Scheduled and triggered workflows don't trigger automatically until you publish them. To publish the workflow, click **Publish** from the workflow's page.

<div class="alert alert-info">Testing a workflow connected to active Slack and Jira accounts creates actual Slack messages and Jira tickets.</div>

## Update the monitor that triggers your workflow

1. Navigate to the [Monitors page][7] in Datadog.
2. Find the monitor you'd like to use to trigger the workflow and edit it, or create a new monitor.
3. In the message section, add the full workflow mention name to an alert notification. The mention name starts with `@workflow-`. For example, `@workflow-Create-Jira-Ticket`.
    - You can pass trigger variables into the workflow by using a comma-separated list with the syntax `@workflow-name(key=value, key=value)`. For example, `@workflow-Create-Jira-Ticket(hostname=host.name)`.
4. Click **Test Notifications** to test the workflow and all of this monitor's notifications. 
5. Save the monitor. 

{{< img src="/getting_started/workflow_automation/monitor_trigger.png" alt="Trigger a workflow from a Monitor">}}

Each time the monitor threshold is hit, the monitor triggers a workflow run. 

## Run history

Once you trigger the workflow, you can watch its progress and debug failed steps in the **Run History** view. Select an executed step to see the inputs, outputs, execution context, and error messages. The example below shows a step that failed due to an invalid Jira configuration. 

{{< img src="/getting_started/workflow_automation/testing_the_workflow.mp4" alt="Preview of Workflow Testing" style="width:100%" video=true >}}

To make edits to your workflow, click **Configuration**. To get back to the run history view, click **Run History**. 

To view a list of previous workflow executions and whether each execution succeeded or failed, use the initial run history view. Return to the initial execution history at any time by clicking on the workflow canvas. 

## Conclusion

When the monitor triggers the workflow, it creates a Jira issue for your engineering team to review. Here is an example Jira issue:

{{< img src="/getting_started/workflow_automation/jira_ticket.png" alt="Jira ticket that is generated from the workflow">}}

The workflow also creates a Slack message to notify your team of the Jira issue and monitor alert. Here is an example Slack notification: 

{{< img src="/getting_started/workflow_automation/slack-message.png" alt="Slack message that is generated from the workflow">}}

## What's next? 

* Explore the list of all available workflow actions in the [Actions Catalog][8]. 
* Build a workflow from an out of the box [blueprint][9].
* Use the [HTTP action][10] to make a request to any endpoint.
* Implement [data transformation][11] actions to perform necessary operations on the information flowing through your workflow.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: /integrations/slack/
[3]: /integrations/jira/
[4]: /service_management/workflows/connections/
[5]: https://app.datadoghq.com/workflow
[6]: /workflows/build/#context-variables
[7]: https://app.datadoghq.com/monitors/manage
[8]: /service_management/workflows/actions_catalog/
[9]: /workflows/build
[10]: /service_management/workflows/actions_catalog/generic_actions/#http
[11]: /service_management/workflows/actions_catalog/generic_actions/#data-transformation


