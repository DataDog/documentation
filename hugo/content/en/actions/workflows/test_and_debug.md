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
- link: "/actions/workflows/build"
  tag: "Documentation"
  text: "Build workflows"
- link: "/actions/workflows/trigger"
  tag: "Documentation"
  text: "Trigger workflows"
---

## Test a monitor trigger

You can test a monitor trigger during workflow creation. Testing a monitor generates a snippet that you can paste into your monitor notification window to trigger the workflow.

To test a monitor trigger:
1. Select the monitor trigger action in your workflow.
1. Click {{< ui >}}Test from Monitor{{< /ui >}}.
1. If your monitor passes inputs to the workflow, enter a test value under {{< ui >}}Workflow Inputs{{< /ui >}}.
1. Select a monitor to test.
1. Select a monitor state.
1. Click {{< ui >}}Run From Monitor{{< /ui >}}.


## Test a step

To ensure a step functions as desired without having to run the entire workflow, you can test the step independently.

To test a workflow step:
1. Click {{< ui >}}Test{{< /ui >}} in the step {{< ui >}}Inputs{{< /ui >}} section.
1. Optionally, adjust the step configuration. If your step uses output variables from a previous step, enter some hardcoded test data for the step to use.
1. Click {{< ui >}}Test{{< /ui >}} to test the action.
1. When you're finished testing the step, click {{< ui >}}Use in configuration{{< /ui >}} to use your new configuration in the workflow, or close the screen to return to the workflow without saving your test configuration.

Testing is not available for branching and logic actions. To test a JavaScript function or expression action that uses output variables from a previous step, comment out the variables in your code and replace them with test data. For more information, see [Test expressions and functions][6].


## Debug a failed step

You can use a workflow's {{< ui >}}Run History{{< /ui >}} to debug a failed step. Click {{< ui >}}Configuration{{< /ui >}} or {{< ui >}}Run History{{< /ui >}} in the top-left to switch between the configuration and run history views.

Clicking on a failed step gives you the inputs, outputs, and execution context for the step, as well as the associated error message. The example below shows a failed _GitHub pull request status_ step. The error message shows that the step failed due to missing permissions:

{{< img src="actions/workflows/test_and_debug/failed-step4.png" alt="A workflow with a failed step." >}}

The initial run history for a workflow provides a panel with the list of previous workflow executions and whether each execution succeeded or failed. Failures include a link to the failed workflow step. Click on a workflow execution in the list to inspect it. You can return to the initial execution history at any time by clicking anywhere on the workflow canvas.


## Fix a failed step with AI

In {{< ui >}}Run History{{< /ui >}}, select a failed step and open its {{< ui >}}Outputs{{< /ui >}} tab. Next to the error message, click {{< ui >}}Fix with AI{{< /ui >}} to get help resolving the failure.

{{< img src="actions/workflows/test_and_debug/fix-with-ai.png" alt="Bits Chat diagnosing and proposing a fix for a failed workflow step." >}}

The assistant opens in [Bits Chat][7], diagnoses the failure using the step's inputs, outputs, execution context, and error message, and can search external documentation for errors returned by third-party APIs. It explains the issue and proposes a fix, then asks you to confirm before applying any change. After you confirm, the assistant updates the step's configuration and reruns validation.

Fixes with AI apply to problems in the workflow's configuration, such as incorrect inputs or an outdated action setup. For failures caused by external factors, such as invalid credentials, rate limits, or an outage in a connected service, the assistant explains the root cause and suggests next steps, such as checking your credentials or contacting the owner of the connected service.

If the failed step triggers another workflow, Bits Chat can trace the failure into the triggered workflow to diagnose and propose a fix there as well.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][10].

[6]: /actions/workflows/expressions/
[7]: /bits_ai/bits_chat/
[10]: https://chat.datadoghq.com/
