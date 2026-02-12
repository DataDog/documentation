---
title: Workflow Logic
description: Add control logic to workflows using if conditions, switch statements, loops, sleep intervals, and branching actions.
disable_toc: false
type: workflows
is_beta: false
algolia:
  tags: ['workflow', 'workflows', 'workflow automation', 'logic', 'logic step', 'flow']
aliases:
- /workflows/logic_actions
- /service_management/workflows/actions_catalog/logic_actions/
- /service_management/workflows/actions/flow_control
further_reading:
- link: "/integrations/"
  tag: "Documentation"
  text: "Learn about integrations"
---

Use [Logic actions][1] to add control logic to your workflow. For example, you can branch from a condition, perform an action iteratively, include a sleep interval, and more.

## If condition

You can branch the execution path of your workflow based on the evaluation of one or more statements that you define. In the screenshot below, an **If condition** action determines the next step in the workflow based on whether the status code of a previous HTTP request action returns `200`.

{{< img src="service_management/workflows/if-condition.png" alt="The workflow canvas with a if condition action selected and the configuration tab open. The Statements section is highlighted with two statements specifying that the status of a previous request must be 200." >}}

## Switch statement

Use the Switch statement action to handle multiple branching paths in a single step. Specify a switch expression and compare it against one or more case values. If no case matches, a default branch runs instead. In the example below, a Switch statement routes the workflow based on whether the status code from a previous HTTP request is `200`, `403`, `404`, `500`, or another value.

{{< img src="service_management/workflows/switch-statement.png" alt="The workflow canvas showing a Switch statement action named 'Make_request.status' branching into multiple cases for different HTTP status codes. Each case sends a different Slack message, and the default branch throws an unexpected error if no other case matches." >}}

## Sleep

The **Sleep** action pauses the execution of the workflow for a specified duration. Select a predefined duration from the **Duration** drop-down, or enter a custom variable in seconds.

## For loop

The **For loop** action allows you to execute a set of actions iteratively for each item in a given input list. For loops accept an input list of up to 2000 items. You can perform many different operations within a for loop, including configuring error paths and updating variables.

In the example below, a for loop iterates over a list of incidents and sends a Slack message for any incident that is more than a week old.

{{< img src="service_management/workflows/iteration2.png" alt="A workflow with a for loop. The loop iterates over a list of incidents and sends a message to a slack channel if the incident is more than a week old." style="width:100%;" >}}

To add a for loop to your workflow:
1. Click the plus (**+**) icon on your workflow canvas to open the action catalog.
1. Search for and select the **For loop** step.
1. Click the loop step and enter an **Input list** for the step to iterate over. You can enter a custom list or use a workflow variable.
1. Inside the loop frame, click the (**+**) icon to add a step to the loop.
1. Configure the looped action. To access the current value in the input list, use the `{{Current.Value}}` variable. To access the index of the current value, use `{{Current.Index}}`.
1. Add and configure any additional steps you need to loop. You can use an **if statement** and a **break** to exit your loop early.
1. **Save** and **Publish** the workflow.

When a run completes, the workflow enters **Debug** mode. Select a step within the loop to see a list of **All**, **Failed**, or **Successful** iterations for that step. Select an iteration to see the output or the error message.

## While loop

The **While loop** action allows you to execute a set of actions iteratively based on a set of conditions and is recommended for automation patterns where the number of repetitions isn't known in advance. While loops run a maximum of 2000 iterations. You can perform different operations with a while loop, including pagination, polling for progress, and retrying until success.

The following example uses a while loop to paginate the AWS S3 List Buckets API for an App.

{{< img src="service_management/workflows/iteration3.png" alt="A workflow with a while loop. The workflow uses a while loop to paginate the AWS S3 List Buckets API for an App." style="width:100%;" >}}

To add a while loop to your workflow:
1. Click the plus (**+**) icon on your workflow canvas to open the action catalog.
1. Search for and select the **While loop** step.
1. Click the loop step and define the condition that the While loop will evaluate before each iteration. The loop continues if the condition is true, and stops when it evaluates to false.
1. Inside the loop frame, click the plus (**+**) icon to add a step to the loop.
1. Configure the looped action. To access the index of the current value, use `{{Current.Index}}`.
1. Add and configure any additional steps you need to loop. You can use an **if statement** and a **break** action to exit your loop early.
1. **Save** and **Publish** the workflow.

When a run completes, the workflow enters **Debug** mode. Select a step within the loop to see a list of **All**, **Failed**, or **Successful** iterations for that step. Select an iteration to see the output or the error message. Select the While Loop step and a specific index to see the evaluated condition at the index.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][2].

[1]: https://app.datadoghq.com/workflow/action-catalog#logic//com.datadoghq.core.if
[2]: https://chat.datadoghq.com/
