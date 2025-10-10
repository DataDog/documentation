---
title: Variables and parameters
description: Use context variables, input parameters, output parameters, and custom variables to pass data between workflow steps.
disable_toc: false
aliases:
  - /service_management/workflows/actions/set_variables/
  - /service_management/workflows/variables
algolia:
  tags: ['workflow variables', 'variables', 'mutable']
further_reading:
- link: "/service_management/workflows/actions/flow_control#for-loop"
  tag: "Documentation"
  text: "Use a for loop to perform an action iteratively"

---

The following variables and parameters are available in workflows:
- [Context variables](#context-variables): Context variables are a broad category of immutable variables that store contextual information about a workflow, or contain data that is passed into the workflow by a triggering event or by a step in the workflow.
- [Input parameters](#input-parameters): Input parameters are immutable key-value pairs that you can use to pass data into a workflow at runtime.
- [Output parameters](#output-parameters): Output parameters allow you to pass the result of a workflow to another workflow.
- [Custom variables](#custom-variables): Custom variables are mutable. They allow you to declare, update, and access variables throughout your workflow.

## Context variables

Creating useful workflows sometimes necessitates passing data from one step to another, or configuring steps that act on data from the workflow's trigger source. You can perform this kind of data interpolation with context variables.

- **Workflow variables** give you information about the current workflow:
    - `WorkflowName`: The name of the workflow.
    - `WorkflowId`: The ID of the workflow.
    - `InstanceId`: The ID of the execution instance of the workflow.
- Some steps come with built-in **step output variables** that allow you to pass data from that step to a subsequent step in your workflow.
- **Trigger variables** are passed into the workflow by the triggering event.
- **Source object variables** are passed into the workflow by the triggering event.

The **Context Variables** tab for each step provides a map of all context variables available to that step.

{{< img src="service_management/workflows/context-variables5.png" alt="The Context Variables tab" >}}

Access a context variable in a step by enclosing it in double braces (`{{`). To access fields within context variables, use [Handlebars expression syntax][4].

### Step output variables

Some steps create outputs that are available to subsequent steps in a workflow. Access a step variable with the syntax: `Steps.<step_name>.<variable>`. For example, to retrieve the pull request status variable (`state`) from the GitHub pull request status step (`Get_pull_request_status`), you'd use the following context variable:

```
{{ Steps.Get_pull_request_status.state }}
```

If you're not sure what variable you're looking for, Datadog suggests existing step outputs as you type. Alternatively, you can consult the [Context Variables](#context-variables) tab for a list of available variables.

{{< img src="service_management/workflows/step-outputs2.png" alt="Datadog suggests existing step outputs as you type." style="width:100%;" >}}

### Source object variables

Source object variables are properties of the triggering event that are resolved at execution. The variables available in the workflow depend on the type of trigger that initiated the workflow instance. For example, if the workflow instance is triggered by a monitor, the monitor ID variable is available using `{{Source.monitor.id}}`. If the workflow is triggered by a security signal detection or notification rule, the signal ID is available using `{{Source.securitySignal.id}}`.

All the variables of the Source object are visible in the Context Variables tab.

{{< img src="service_management/workflows/context-variables-tab-source-object-variables2.png" alt="The Source object variables in the Context Variables tab" style="width:60%;">}}

## Input parameters

Input parameters are immutable key-value pairs that you can use to pass data into a workflow. You can use input parameters in workflows that:
- are triggered manually, such as from a Dashboard.
- use mention triggers, such as Monitors and Security Signal Notification Rules.

To add an input parameter:
1. Click on the workflow canvas.
1. Click the **+** icon next to **Input Parameters**.
1. Add a parameter name, data type, and description for the parameter. The display name is generated automatically from the parameter name. Check the **Use custom display name** box to customize it. The display name is a human readable name for the parameter, while the parameter name is used to reference the parameter in your workflow steps.
1. Optionally, add a default value for the parameter. If you add a default value, the parameter is optional at runtime.

To reference the input parameter in a step, use the syntax `{{ Trigger.<parameter name>}}`. For example, to reference an input parameter named `user`, use `{{Trigger.user}}`.

The **Input Parameters** section displays the names of all existing input parameters together with a counter. Hover over a counter to see which steps are using the parameter.

{{< img src="service_management/workflows/input-parameter3.png" alt="Hover over a counter to see which steps are using the parameter." style="width:60%;">}}

You can add an implicit input parameter (a parameter that doesn't already exist in the workflow) by typing it into a workflow step using the `{{ Trigger.<parameter name> }}` syntax. The next time you save the workflow, a dialog appears allowing you to convert the parameter to an explicit parameter. For more information on triggering workflows, see [Trigger a workflow][5].

If you're looking for an existing input parameter, start typing `{{ Trigger.` to see if it appears as a suggestion. Alternatively, consult the [Context Variables](#context-variables) tab for a list of available parameters.

## Output parameters

Output parameters allow you to access the result of a workflow. This is useful when you want to pass the result of a workflow to another workflow or an App Builder app.

To add an output parameter:
1. Click on the workflow canvas.
1. Click the **+** icon next to **Output Parameters**.
1. Add a parameter name, value, and data type for the parameter.
1. Optionally, add a default value for the parameter. If you add a default value, the parameter is optional at runtime.

The **Output Parameters** section displays the names of all existing output parameters together with a counter.

For information on passing data between workflows, see [Access the result of a child workflow][7].

For an example of how to use output parameters to pass information between Workflows and App Builder, see [return workflow results to an app][6].

## Custom variables

To set a mutable workflow variable, use the [Set variable][1] action. You can use this action to declare, update, and access custom variables throughout your workflow, which allows you to perform more complex workflow operations. For example:
- _Handling API pagination_: API requests sometimes require you to keep track of a page token or offset.
- _Handling lists_: You can use a variable to initialize an array and perform actions like map and reduce.
- _Iteration_: Variables allow you to manipulate and store data inside a [for loop][2]. You can then use that data in the rest of the workflow.

### Set a custom variable

To set a custom variable:
1. Click the plus (**+**) icon on your workflow canvas to open the action catalog.
1. Search for and select the **Set variable** step.
1. Click the **Set variable** step and enter a **Step name**.
1. Enter a **variable name**. Variable names must start with a letter and can contain only alphanumeric characters and underscores.
1. Enter a value for the variable.
   - Type ``{{`` if you want to use a workflow context variable.
   - To create an object, click the **Create object** <i class="icon-api"></i> button.
   - To create an array, click the **Create array** <span id="icon-array">[ ]</span> button.

If you need to change the value of a custom variable after setting it, you must add an additional **Set variable** step and either reassign the variable or create a new variable.

Here is an example of a workflow that demonstrates the **Set variable** step:

1. In your workflow, start with a **Set variable** step to declare a variable called `intList` and give it the value `[1,2,3,4]`.
1. Add a second **Set variable** step and declare a variable named `evenList` with the value `${Variables.intList.filter(number => number % 2 === 0)}`. This is an [inline JavaScript expression][8] that filters out odd numbers.
1. Add an **Echo** step to echo the value of `evenList` (`2,4`).

{{< img src="service_management/workflows/set-variable-updated.png" alt="This workflow sets a variable to hold a list of numbers, declares a second variable which filters out the odd numbers in the list using an inline expression, and echoes the value of the second variable." style="width:100%;" >}}

### Access a custom variable

You can access a custom variable in your workflow using `{{ Variables.variableName }}`. For example, to access a custom variable named `DashboardList`, use `{{ Variables.DashboardList }}`.

### Iteration

Setting a custom variable inside a **For loop** or a **While loop** allows you store data for use outside of the loop. For example, if you're making multiple API requests inside a **For loop**, you can set a custom variable and append the data you need to it on each iteration. Outside of the loop, you can access the custom variable and handle the data you collected.

To avoid a type error resulting from an undefined variable, assign a custom variable before you use it in a loop. In the example below, the custom variable `evenList` is set to an empty array before it is used in the loop.

{{< img src="service_management/workflows/loop.png" alt="This workflow sets a variable before it is used in a loop." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][3].

[1]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.core/com.datadoghq.core.setVariable
[2]: /service_management/workflows/actions/flow_control#for-loop
[3]: https://datadoghq.slack.com/
[4]: https://handlebarsjs.com/guide/expressions.html#expressions
[5]: /service_management/workflows/trigger
[6]: /service_management/app_builder/queries/#return-workflow-results-to-an-app
[7]: /service_management/workflows/trigger/#access-the-result-of-a-child-workflow
[8]: /service_management/workflows/expressions/#inline-javascript-expressions
