---
title: Workflow Logic
disable_toc: false
type: workflows
is_beta: false
algolia:
  tags: ['workflow', 'workflows', 'workflow automation', 'logic', 'logic step', 'flow']
aliases:
- /workflows/logic_actions
- /service_management/workflows/actions_catalog/logic_actions/
further_reading:
- link: "/integrations/"
  tag: "Documentation"
  text: "Learn about integrations"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Workflow Automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Use [Logic actions][2] to add control logic to your workflow. For example, you can branch from a condition, perform an action iteratively, include a sleep interval, and more.

## Branch workflow from condition

You can branch the execution path of your workflow based on the evaluation of one or more statements that you define. In the screenshot below, a **Branch workflow from condition** action determines the next step in the workflow based on whether the status code of a previous HTTP request action returns `200`.

{{< img src="service_management/workflows/branch-workflow-configuration3.png" alt="The workflow canvas with a branch workflow from condition action selected and the configuration tab open. The Statements section is highlighted with two statements specifying that the status of a previous request must be 200." >}}

## Sleep

The **Sleep** action pauses the execution of the workflow for a specified duration. Select a predefined duration from the **Duration** drop-down, or enter a custom variable in seconds.

## Iteration

The **For each** action allows you to execute a specific action iteratively for each element in a given input list. It enables you to automate repetitive tasks by applying the same action to multiple items within a list.

{{< img src="service_management/workflows/iteration.png" alt="An example of an interation step." style="width:100%;" >}}

The action is made up of the For each step and an inner step that you intend to perform iteratively. The output of a For each step is an array of outputs from the inner step.

For example, using For each together with a CloudFlare action, you can iterate over and block a list of IP addresses. In this scenario, you add the list of IP addresses as an **Input list** in the For each step. Next, add a CloudFlare action as an inner step and configure it to block the current value in the iteration loop. When the workflow runs, the CloudFlare step repeats for each value in the list, accessing the current IP value and blocking it.

To configure a **For each** iteration:
1. Click the plus (**+**) icon on your workflow canvas to open the [action catalog][1].
1. Search for and select the **For each** step.
1. To select an inner action to repeat, drag an existing step from your canvas into the **For each** step, or click the plus (**+**) icon inside the **For each** step and make a selection from the action catalog.
1. Click the **For each** step and enter an **Input list** for the step to iterate over.
1. Toggle **Continue on error** if you want the action to continue down the list of remaining values when an error is encountered.
1. Configure the inner action. To access the current value in the input list, use the `{{Current.Value}}` variable. To access the index of the current value, use `{{Current.Index}}`.
1. **Save** and **Run** the action.

When a run completes, the workflow enters **Debug** mode. Select the For each step to see:
* The output of each iteration.
* The number of completed and failed iterations.

You can delete the inner step by:
- Clicking the inner step and selecting **Delete**
- Clicking the For each step and selecting **Clear**

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][3].

[1]: /service_management/workflows/build/#build-a-workflow-with-the-workflow-builder
[2]: https://app.datadoghq.com/workflow/action-catalog#logic//com.datadoghq.core.if
[3]: https://datadoghq.slack.com/
