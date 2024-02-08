---
title: Transform Data
kind: Documentation
disable_toc: false
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

The **Expression** and **Function** actions perform custom data transformations within your workflows using JavaScript. Use the values of any context variables available within your workflow as inputs for your JavaScript expressions and functions with the syntax `$.Steps.<step_name>.<variable>`. You can also use `_` to make use of [Lodash][1] in your data transformation actions with the same syntax. For example, to reference the HTTP request status variable (`status`) from the HTTP request step (`Make_request`), you'd use the following context variable: 

```
$.Steps.Make_request.status
```

And to apply the `_.includes` Lodash function on an array returned by a previous step `Array_function` to determine if it includes the name `Bits`, you'd use the following syntax:

```
_.includes($.Steps.Array_function.data, "Bits")
```

The data returned by these actions can then be referenced in subsequent steps of the workflow.

## Expression

Use expression actions for data transformations that can be accomplished in a single line of code, and do not require variable assignments or multiple standalone operations. For example:

`[1, 2, 3].filter(x => x < 3)`

## Function

The function action allows for variable assignments and data transformations requiring multiple expressions.

## Testing expressions and functions

To test an expression or function action, click **Test** in the **Inputs** section. If the action uses an output variable from a previous step, comment out the variable in your code and replace it with test data. For example, consider the following action that assigns variables to the workflow name and to the `Steps.List_monitors` output from a previous step:

```js
let name = $.WorkflowName;
let object = $.Steps.List_monitors;

...
```

To test the action, comment out the existing variable assignments and replace them with hardcoded test data:

```js
\\ let name = $.WorkflowName;
let name = 'Test workflow'
\\ let object = $.Steps.List_monitors;
let object = {0:{
  'name': 'Test monitor'
}}
...
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://lodash.com/