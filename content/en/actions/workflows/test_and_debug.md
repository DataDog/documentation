---
title: Test and debug
description: Test monitor triggers, individual workflow steps, and debug failed steps using run history and error messages.
disable_toc: false
aliases:
- /service_management/workflows/test_and_debug
algolia:
  tags: ['workflow', 'workflows', 'workflow automation']
further_reading:
- link: "/getting_started/workflow_automation/"
  tag: "Documentation"
  text: "Getting Started with Workflow Automation"
- link: "/service_management/workflows/build"
  tag: "Documentation"
  text: "Build workflows"
- link: "/service_management/workflows/trigger"
  tag: "Documentation"
  text: "Trigger workflows"
---

## Test a monitor trigger

You can test a monitor trigger during workflow creation. Testing a monitor generates a snippet that you can paste into your monitor notification window to trigger the workflow.

To test a monitor trigger:
1. Select the monitor trigger action in your workflow.
1. Click **Test from Monitor**.
1. If your monitor passes inputs to the workflow, enter a test value under **Workflow Inputs**.
1. Select a monitor to test.
1. Select a monitor state.
1. Click **Run From Monitor**.


## Test a step

To ensure a step functions as desired without having to run the entire workflow, you can test the step independently.

To test a workflow step:
1. Click **Test** in the step **Inputs** section.
1. Optionally, adjust the step configuration. If your step uses output variables from a previous step, enter some hardcoded test data for the step to use.
1. Click **Test** to test the action.
1. When you're finished testing the step, click **Use in configuration** to use your new configuration in the workflow, or close the screen to return to the workflow without saving your test configuration.

Testing is not available for branching and logic actions. To test a JavaScript function or expression action that uses output variables from a previous step, comment out the variables in your code and replace them with test data. For more information, see [Test expressions and functions][6].


## Debug a failed step

You can use a workflow's **Run History** to debug a failed step. Click **Configuration** or **Run History** in the top-left to switch between the configuration and run history views.

Clicking on a failed step gives you the inputs, outputs, and execution context for the step, as well as the associated error message. The example below shows a failed _GitHub pull request status_ step. The error message shows that the step failed due to missing permissions:

{{< img src="service_management/workflows/failed-step4.png" alt="A workflow with a failed step." >}}

The initial run history for a workflow provides a panel with the list of previous workflow executions and whether each execution succeeded or failed. Failures include a link to the failed workflow step. Click on a workflow execution in the list to inspect it. You can return to the initial execution history at any time by clicking anywhere on the workflow canvas.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][10].

[6]: #test-expressions-and-functions
[10]: https://chat.datadoghq.com/