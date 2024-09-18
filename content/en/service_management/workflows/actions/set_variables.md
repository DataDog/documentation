---
title: Set variables
disable_toc: false
algolia:
  tags: ['workflow variables', 'variables', 'mutable']
further_reading:
- link: "/service_management/workflows/actions/flow_control#for-loop"
  tag: "Documentation"
  text: "Use a for loop to perform an action iteratively"

---

To set a mutable workflow variable, use the [Set variable][1] action. You can use this action to declare, update, and access variables throughout your workflow, which allows you to perform more complex workflow operations. For example:
- _Handling API pagination_: API requests sometimes require you to keep track of a page token or offset.
- _Handling lists_: You can use a variable to initialize an array and perform actions like map and reduce.
- _Iteration_: Variables allow you to manipulate and store data inside a [for loop][2]. You can then use that data in the rest of the workflow.

## Set a variable

To set a variable:
1. Click the plus (**+**) icon on your workflow canvas to open the action catalog.
1. Search for and select the **Set variable** step.
1. Click the **Set variable** step and enter a **Step name**.
1. Enter a **variable name**. Variable names must start with a letter and can contain only alphanumeric characters and underscores.
1. Enter a value for the variable.
   - Type ``{{`` if you want to use a workflow context variable.
   - To create an object, click the **Create object** <i class="icon-api"></i> button.
   - To create an array, click the **Create array** <span id="icon-array">[ ]</span> button.

If you need to change the value of a variable after setting it, you must add an additional **Set variable** step and either reassign the variable or create a new variable.

Here is an example of a workflow that uses the **Set variable** step:

1. In your workflow, start with a **Set variable** step to declare a variable called `intList` and give it the value `[1,2,3,4]`.
1. Add a data transformation **expression** step with the expression `$.Variables.intList.filter(number => number % 2 === 0)` to filter out the odd numbers.
1. Use another **Set variable** step to assign the result from the expression (`[2,4]`) to a new variable named `evenList`.
1. Add an **Echo** step to echo the value of `evenList`.

{{< img src="service_management/workflows/set-variable.png" alt="This workflow sets a variable, performs an Expression step on it, and then sets a new variable with the result of the expression. Finally, it echoes the result of the final variable." style="width:100%;" >}}

## Access a variable

You can access a variable in your workflow using `{{ Variables.variableName }}`. For example, to access a variable named `DashboardList`, use `{{ Variables.DashboardList }}`.

## Iteration

Setting a variable inside a **For loop** allows you store data for use outside of the loop. For example, if you're making multiple API requests inside a **For loop**, you can set a variable and append the data you need to it on each iteration. Outside of the loop, you can access the variable and handle the data you collected.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][3].

[1]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.core/com.datadoghq.core.setVariable
[2]: /service_management/workflows/actions/flow_control#for-loop
[3]: https://datadoghq.slack.com/