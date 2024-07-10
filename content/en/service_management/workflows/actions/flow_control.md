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

The **For loop** action allows you to execute a set of actions iteratively for each item in a given input list. For loops accept an input list of up to 2000 items. You can perform many different operations within a for loop, including configuring error paths for individual iterations that fail.

In the example below, a for loop iterates over a list of incidents and sends a Slack message for any incident that is more than a week old.

{{< img src="service_management/workflows/iteration2.png" alt="A workflow with a for loop. The loop iterates over a list of incidents and sends a message to a slack channel if the incident is more than a week old." style="width:100%;" >}}

To add a for loop to your workflow:
1. Click the plus (**+**) icon on your workflow canvas to open the [action catalog][1].
1. Search for and select the **For loop** step.
1. Click the loop step and enter an **Input list** for the step to iterate over. You can enter a custom list or use a workflow variable.
1. Inside the loop frame, click the (**+**) icon to add a step to the loop.
1. Configure the looped action. To access the current value in the input list, use the `{{Current.Value}}` variable. To access the index of the current value, use `{{Current.Index}}`.
1. Add and configure any additional steps you need to loop.
1. **Save** and **Publish** the workflow.

When a run completes, the workflow enters **Debug** mode. Select a step within the loop to see a list of **All**, **Failed**, or **Successful** iterations for that step. Select an iteration to see the output or the error message.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][3].

[1]: /service_management/workflows/build/#build-a-workflow-with-the-workflow-builder
[2]: https://app.datadoghq.com/workflow/action-catalog#logic//com.datadoghq.core.if
[3]: https://datadoghq.slack.com/
