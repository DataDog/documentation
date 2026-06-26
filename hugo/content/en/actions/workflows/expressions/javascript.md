---
title: JavaScript Expressions
description: Capabilities and limits of JavaScript expressions in App Builder
code_lang: javascript
type: multi-code-lang
code_lang_weight: 10
---

JavaScript (JS) is available in workflows using inline expressions or through the dedicated JS {{< ui >}}Function{{< /ui >}} and {{< ui >}}Expression{{< /ui >}} actions.

## Inline JavaScript expressions

You can use JS expressions directly in workflow steps to perform a wide range of data transformations without needing to include dedicated JS steps.

To use an inline expression in your workflow, enclose the expression in `${}`. For example, to convert a string ID (`Trigger.stringId`) to an integer, use `${ parseInt(Trigger.stringId) }`.

The [Lodash][1] utility library is available in inline expressions. The Lodash underscore prefix (`_`) is optional. For example, both `${ _.toNumber("1") }` and `${ toNumber("1") }` are valid inline expressions.

### Examples

#### Retrieve a timestamp

The following example uses the Lodash `now()` function inside a {{< ui >}}Get hosts total{{< /ui >}} step to get the count of hosts in the last minute.

The action uses the following inline expression in the {{< ui >}}From{{< /ui >}} field:
```js
${ Math.floor(now() / 1000) - 60 }
```

{{< img src="/service_management/workflows/timestamp.png" alt="An inline expression using the now() lowdash function" style="width:90%;" >}}

#### Increment a value

The following example increments the desired capacity inside a {{< ui >}}Set desired capacity{{< /ui >}} step by 1.

The action uses the following inline expression in the {{< ui >}}Desired capacity{{< /ui >}} field:
```js
${ Steps.Describe_auto_scaling_group.autoScalingGroup.DesiredCapacity + 1 }
```

{{< img src="/service_management/workflows/increment.png" alt="An inline expression that increments the desired capacity by one" style="width:90%;" >}}

## JavaScript expression actions

The [Expression](#expression-step) and [Function](#function-step) actions perform custom data transformations within your workflows using JavaScript. Use the values of any context variables available within your workflow as inputs for your JavaScript expressions and functions with the syntax `$.Steps.<step_name>.<variable>`.

The data returned by these actions can then be referenced in subsequent steps of the workflow.

You can use an underscore (`_`) to make use of [Lodash][1] in your expression and function steps. For example, to reference the HTTP request status variable (`status`) from the HTTP request step (`Make_request`), you'd use the following context variable:

```
$.Steps.Make_request.status
```

And to determine if an array returned by `Array_function` includes the name `Bits`, apply the `_.includes` Lodash function with the following syntax:

```
_.includes($.Steps.Array_function.data, "Bits")
```
### Function step

The function action allows for variable assignments and complex data transformations requiring multiple expressions.

To add a function action:
- In a new workflow, click {{< ui >}}Add step{{< /ui >}} and search for `function`. Select the {{< ui >}}Function{{< /ui >}} action to add it to your workflow.
- In an existing workflow, click {{< ui >}}+{{< /ui >}} and search for `function`. Select the {{< ui >}}Function{{< /ui >}} action to add it to your workflow.

#### Write function steps with AI

You can use Bits AI to help you write the JavaScript for a {{< ui >}}Function{{< /ui >}} step. To use this feature, perform the following steps:

1. Add a {{< ui >}}Function{{< /ui >}} step to your workflow.
1. Under {{< ui >}}General{{< /ui >}}, in the {{< ui >}}Script{{< /ui >}} field, click {{< ui >}}<i class="icon-bits-ai"></i> Write with Bits AI{{< /ui >}}.
1. In the {{< ui >}}Describe your transformation script{{< /ui >}} field, enter a description of what you want your script to do. Click the up arrow ({{< ui >}}↑{{< /ui >}}) to submit your description.
1. Choose an option to {{< ui >}}Replace script{{< /ui >}}, {{< ui >}}Insert in script{{< /ui >}}, or {{< ui >}}Copy to clipboard{{< /ui >}}.
1. Check the script and change it as necessary to fit your needs.

### Expression step

In most cases, use an inline expression instead of a dedicated expression step. Expression actions accept a single line of code. For example, `[1, 2, 3].filter(x => x < 3)`. Variable assignments are not available in expressions.

To add an expression action:
- In a new workflow, click {{< ui >}}Add step{{< /ui >}} and search for `expression`. Select the {{< ui >}}Expression{{< /ui >}} action to add it to your workflow.
- In an existing workflow, click {{< ui >}}+{{< /ui >}} and search for `expression`. Select the {{< ui >}}Expression{{< /ui >}} action to add it to your workflow.

In an expression step, execution uses _copies_ of all available variables. Mutating a variable within a step has no effect on the variable's value outside of the step. To assign the result of an expression to a variable, see [Variables and parameters][2].

## Test expressions and functions

See the test and debug page to learn how to [test a workflow step][3].

[1]: https://lodash.com/
[2]: /actions/workflows/variables/
[3]: /service_management/workflows/test_and_debug/#test-a-step