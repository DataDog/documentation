---
title: Build workflows
description: Create workflows from blueprints or build custom workflows using AI assistance, manual configuration, and drag-and-drop actions.
disable_toc: false
aliases:
- /workflows/build
- /service_management/workflows/build
algolia:
  tags: ['workflow', 'workflows', 'workflow automation']
further_reading:
- link: "/getting_started/workflow_automation/"
  tag: "Documentation"
  text: "Getting Started with Workflow Automation"
- link: "/actions/actions_catalog"
  tag: "Documentation"
  text: "Browse the available actions in the Action Catalog"
- link: "/security/cloud_security_management/workflows"
  tag: "Documentation"
  text: "Automate Security Workflows with Workflow Automation"
- link: "/service_management/workflows/variables"
  tag: "Documentation"
  text: "Variables and Parameters"
---

You can create workflows or edit existing workflows from the [Workflow Automation][1] page. The page lists information about existing workflows, such as the workflow's owner, the trigger type, the dates that each workflow was last modified and executed, and whether the workflow is published or not.
- Hover over a workflow for the options to delete, clone, or edit the permissions for the workflow.
- Toggle **My workflows** if you want to see only workflows that you created.

## Build a workflow from a blueprint

1. Click the [**Blueprints**][5] tab.
1. If desired, use the search bar to narrow the list of blueprints by name, category, or integration.
1. Find the blueprint you'd like to use, and click on it. The workflow canvas appears.
1. Click **Create From Blueprint**. The workflow canvas updates to show your newly created workflow.
1. Enter a new name and description for the workflow.
1. Optionally, select or enter tags you'd like to apply to the workflow. For more information on Datadog tags, see [Getting Started with Tags][7].
1. Optionally, select any related [services][8] to apply to the workflow.
1. Optionally, select [teams][9] to associate with the workflow. If a team doesn't exist, you can enter a name to create it.
1. Click **Save** to apply your changes.
1. Workflow steps that require updates are marked with exclamation marks. Click on each workflow step you'd like to modify and fill in any empty fields on the **Configure** tab.
1. When you are finished modifying the workflow, Click **Run** to test your workflow.
1. When you're ready to publish your workflow, click **Publish**. Published workflows accrue costs based on workflow executions. For more information, see the [Datadog Pricing page][4].

## Create or edit a workflow with AI {#create-a-workflow-with-ai}

If you're not sure where to start, you can automatically generate a workflow, or iterate on an existing workflow with AI.

To generate a workflow:
1. From the [Workflow Automation][1] page, click **New Workflow**.
1. Click **Create a workflow with AI**.
1. Enter a detailed prompt for your workflow. Specify the integrations and actions you'd like to use.
1. Click the up arrow (**↑**) to create your workflow.

To iterate on an existing workflow:
1. From an existing workflow, click **Edit with AI**.
1. Enter a detailed prompt for the behavior you'd like to add to your workflow. Include the integrations and actions you'd like to use.
1. Click the up arrow (**↑**) to add the functionality to your workflow.

<div class="alert alert-info">The Workflow Automation AI does not answer questions about the product. If you have questions or feedback, consider joining the <strong>#workflows</strong> channel on the <a href="https://datadoghq.slack.com/">Datadog Community Slack</a></div>

## Create a custom workflow

To create a workflow, click **New workflow** on the [Workflow Automation][1] page.

To configure your workflow:
1. In the workflow configuration panel, enter a **Name** for your workflow.
1. Optionally, select or enter tags you'd like to apply to the workflow. For more information on Datadog tags, see [Getting Started with Tags][7].
1. Optionally, select any related [services][8] to apply to the workflow.
1. Optionally, select [teams][9] to associate with the workflow. If a team doesn't exist, you can enter a name to create it.
1. Enter input or output parameters if your workflow uses them.
1. Click **Save** to apply your changes.

If you're not sure about your workflow configuration, you can return to the panel later by clicking anywhere on the workflow canvas.

### Build a workflow with the workflow builder

1. If your workflow requires a trigger, click **Add Trigger**. For more information, see [Trigger a Workflow][3].
1. Click **Add Step** to start adding steps to your workflow.
1. Search for an action using the search bar or browse through the integrations and their related actions to find the action you're looking for. Click an action to add it as a step on your workflow canvas.
1. Click on the step in the workflow canvas to configure it or view its outputs or context variables. For more information on outputs and context variables, see [Context variables][14].
1. After you've configured the step, click either the AI icon <i class="icon-bits-ai"></i> or the plus icon (**+**) to add another step, or save the workflow if you're done.
1. When you're ready to publish your workflow, click **Publish**. Published workflows accrue costs based on workflow executions. For more information, see the [Datadog Pricing page][4].

You can edit a step in the workflow at any time by clicking on it. Click and drag steps on your workflow to rearrange them.

#### Shortcuts and canvas tools

To see keyboard and mouse shortcuts for the workflow builder canvas, type `?` (shift+`/`) or click the **Keyboard** {{< img src="service_management/workflows/keyboard-icon.png" inline="true" style="width:40px;">}} button. A list of shortcuts appears.

The **Zoom out** {{< img src="service_management/workflows/zoom-out-mag-icon.png" inline="true" style="width:30px;">}}, **Zoom in** {{< img src="service_management/workflows/zoom-in-mag-icon.png" inline="true" style="width:30px;">}}, and **Reset viewport** {{< img src="service_management/workflows/reset-viewport-icon.png" inline="true" style="width:34px;">}} buttons control how the viewport is displayed.

The **Auto layout** {{< img src="service_management/workflows/auto-layout-icon.png" inline="true" style="width:80px;">}} button aligns and distributes your workflow steps.

The **Add annotation** {{< img src="service_management/workflows/add-annotation-icon.png" inline="true" style="width:30px;">}} button allows you to add annotation notes to your workflow. These notes offer a formatting bar to add various text formatting such as bold and italics, links, and lists. You can also enter your annotations in Markdown.

{{< img src="service_management/workflows/workflow-annotation-with-bar.png" alt="An empty annotation, with the formatting bar displayed above it" style="width:70%;" >}}

## Test a step

See the test and debug page for information on [how to test a step][11].

## Publish a workflow

Scheduled and triggered workflows don't trigger automatically until you've published them. To publish the workflow, click **Publish** from the workflow's page.

Published workflows accrue costs based on workflow executions. For more information, see the [Datadog Pricing page][4].

### Updating a published workflow

You can update published workflows without affecting the live version until you are ready.

Editing a published workflow creates a draft. All changes made to the draft do not alter the published workflow. Each workflow can have one active draft, which all editors can modify. When ready, click on **Publish Changes** to replace the published version.

Drafts execute all configured steps like any normal workflow. You can only run drafts from the workflow editor. 

To discard the draft, click the **cog icon** in the top-right corner of the editor and select **Discard draft**.

**Notes**:
- Running a draft for published workflows do not accrue costs.
- Any update to the workflow properties (name, tags, or notifications) bypass the drafting flow and are applied immediately to the published version.

## Variables and parameters

For information on using variables and parameters in your workflows, see [Variables and parameters][12].

## Workflow notifications

You can configure your workflow to send you a notification on success or failure. The following integrations are supported:
- Slack
- Microsoft Teams
- PagerDuty
- Email

To add a notification:
1. In the workflow configuration panel, scroll down to the **Notifications** section.
1. To add a notification if the workflow succeeds:
   1. Click the plus (`+`) icon next to **Notify on success**.
   1. Select the integration that you want to use for notifications.
   1. Complete the required fields for the specified integration.
   1. Click **Save** to save your workflow.
1. To add a notification if the workflow fails:
   1. Click the plus (`+`) icon next to **Notify on failure**.
   1. Select the integration that you want to use for notifications.
   1. Complete the required fields for the specified integration.
   1. Click **Save** to save your workflow.

## Error handling

You can specify the number of times you want your workflow to retry a failed step, and at what interval, before moving on to an optional error path. If no error path is present, the workflow terminates after all retries are exhausted.

### Retries

To configure retries for a step:
1. Click on the step in the workflow canvas.
1. In the **Retries** section, adjust the **Interval** and **Max retries** values.
1. Save your workflow to apply the changes.

### Add an error path

You can add an error path for the workflow to follow if it encounters an error.

To add an error path:
1. Hover over the step where you'd like to add an error path.
1. Click and drag the **Error path** icon {{< img src="service_management/workflows/error-path-icon.png" inline="true" style="width:24px;">}} to place a new error path on the canvas.
1. Select a workflow step to add to the error path.
1. After configuring your step, you can add more steps to an error path and even merge your error path back into the main workflow path.
1. When you're done configuring your error path steps, click **Save** to apply your changes.

## Wait until condition

Some actions allow you to add a condition that must be met before a workflow can mark a step as complete and continue.

To add a condition:
1. Click on the step in the workflow canvas.
1. In the **Wait until condition** section, use the dropdown to select a preconfigured condition, or select **Configure custom wait condition** and build your own conditional.
   - The list of available preconfigured conditions depends on the action.
   - Conditional statement variables can be either a String, a Number, a Boolean, or a step output variable.
   - Only the current step's output variables can be used in a custom conditional statement.
1. Enter a maximum wait time for the workflow. If the condition is not met in time, the step fails.

{{< img src="service_management/workflows/wait-until-condition2.png" alt="An example of wait until condition" style="width:100%;" >}}

## Edit a workflow with JSON

Edit a workflow in JSON by clicking **Edit JSON Spec** on your workflow page. The JSON editor also allows you to:
- **Format JSON**: Beautify your JSON.
- **Export JSON**: Download the workflow.

## Interact with workflows using the API

To perform tasks using the API, see the [Workflow Automation API documentation][13].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][10].

[1]: https://app.datadoghq.com/workflow
[2]: https://handlebarsjs.com/guide/expressions.html#expressions
[3]: /service_management/workflows/trigger
[4]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[5]: https://app.datadoghq.com/workflow/blueprints
[6]: /service_management/workflows/actions/#testing-expressions-and-functions
[7]: /getting_started/tagging/
[8]: /glossary/#service
[9]: /account_management/teams/
[10]: https://datadoghq.slack.com/
[11]: /service_management/workflows/test_and_debug/#test-a-step
[12]: /service_management/workflows/variables/
[13]: /api/latest/workflow-automation/
[14]: /service_management/workflows/variables/#context-variables
