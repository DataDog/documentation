---
title: Data Transformation
disable_toc: false
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Workflow Automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

The **Expression** and **Function** actions perform custom data transformations within your workflows using JavaScript. Use the values of any context variables available within your workflow as inputs for your JavaScript expressions and functions with the syntax `$.Steps.<step_name>.<variable>`. You can also use `_` to make use of [Lodash][1] in your data transformation actions with the same syntax. For example, to reference the HTTP request status variable (`status`) from the HTTP request step (`Make_request`), you'd use the following context variable: 

```
$.Steps.Make_request.status
```

And to determine if an array returned by `Array_function` includes the name `Bits`, apply the `_.includes` Lodash function with the following syntax:

```
_.includes($.Steps.Array_function.data, "Bits")
```

The data returned by these actions can then be referenced in subsequent steps of the workflow.

## Expression

Use expression actions for data transformations that can be accomplished in a single line of code, and do not require variable assignments or multiple standalone operations. For example:

`[1, 2, 3].filter(x => x < 3)`

To add an expression action:
- In a new workflow, click **Add step** and search for `expression`. Select the **Expression** action to add it to your workflow.
- In an existing workflow, click **+** and search for `expression`. Select the **Expression** action to add it to your workflow.

In an expression step, execution uses _copies_ of all available variables. Mutating a variable within a step has no effect on the variable's value outside of the step. To assign the result of an expression to a variable, see [Set variables][4].

## Function

The function action allows for variable assignments and data transformations requiring multiple expressions.

To add a function action:
- In a new workflow, click **Add step** and search for `function`. Select the **Function** action to add it to your workflow.
- In an existing workflow, click **+** and search for `function`. Select the **Function** action to add it to your workflow.

### Write functions with AI

You can use Bits AI to help you write the JavaScript for a **Function** step. To use this feature, perform the following steps:

1. Add a **Function** step to your workflow.
1. Under **General**, in the **Script** field, click **<i class="icon-bits-ai"></i> Write with Bits AI**.
1. In the **Describe your transformation script** field, enter a description of what you want your script to do. Click the up arrow (**↑**) to submit your description.
1. Choose an option to **Replace script**, **Insert in script**, or **Copy to clipboard**.
1. Check the script and change it as necessary to fit your needs.

## Test expressions and functions

See the test and debug page to learn how to [test a workflow step][3].

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][2].

[1]: https://lodash.com/
[2]: https://datadoghq.slack.com/
[3]: /service_management/workflows/test_and_debug/#test-a-step
[4]: /service_management/workflows/actions/set_variables