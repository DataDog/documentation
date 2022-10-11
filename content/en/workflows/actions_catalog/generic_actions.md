---
title: Generic Actions
kind: documentation
disable_toc: false
type: workflows
further_reading:
- link: "/integrations/"
  tag: "Documentation"
  text: "Learn about integrations"
---

<div class="alert alert-warning">Workflows are in public beta. If you have any feedback or questions, contact <a href="/help">Datadog support</a>.</div>

Generic actions are actions which are not associated with a Datadog integration or resource. These actions allow you to implement custom logic within your workflow such as branching the workflow based on a condition, making a custom HTTP request, and transforming data and objects with code. As with all workflow actions, you can use the [context variables][5] tab to access any values available in the workflow context.

## HTTP

Use the HTTP action to make a request to any custom endpoint. You can control the request method and its contents, how it is authenticated and processed, and how it should respond to scenarios like expired certificates or redirects.

Begin by specifying the request method and any necessary [authentication][3]. Read the sections below for further information about the available configuration tabs. Optionally, the request can wait on conditions that you specify in the **Conditional wait** section, and retry itself at a given interval if the condition is not satisfied.

### Request Options

Enter any desired headers, cookies, and a comma-delineated list of any status codes on which to return an error. Use the `Response Parsing` dropdown to override the default response parsing method inferred from the headers, and `Response Encoding` if the target server specifies the wrong encoding in its response headers. You can also decide if the request should allow for expired certificates or follow redirects.

{{< img src="workflows/http-request-options-tab.png" alt="" >}}

### Request Body

If the request has a body, use the `Request Body` tab to configure its content and format. Add inputs to the request body from the workflow context with [context variables][5] in the `Request Body` field, or interpolate them into `Name` and `Value` pairs for the `multipart/form-data` body type. The `Body Type` dropdown allows the following options:

  - `application/json`
  - `text/plain`
  - `text/html`
  - `text/xml`
  - `multipart/form-data`
  - `None`

### URL Params

Specify any desired URL parameter names and values.

## Data Transformation

The **Expression** and **Function** actions perform custom data transformations within your workflows using JavaScript. Use the values of any context variables available within your workflow as inputs for your JavaScript expressions and functions with the syntax `$.Steps.<step_name>.<variable>`. You can also use `_` to make use of [Lodash][4] in your data transformation actions with the same syntax. For example, to reference the HTTP request status variable (`status`) from the HTTP request step (`Make_request`), you'd use the following context variable: 

```
$.Steps.Make_request.status
```

And to apply the `_.includes` Lodash function on an array returned by a previous step `Array_function` to determine if it includes the name `Bits`, you'd use the following syntax:

```
_.includes($.Steps.Array_function.data, "Bits")
```

## Logic

Logic actions enable you to implement custom logic in the execution of your workflows, such as branching to a different workflow based on a condition, or pausing the execution of the workflow.

### Branch workflow from condition

You can branch the execution path of your workflow based on the evaluation of one or more statements that you define. For example, in the screenshot below a branch workflow action considers if the status code of a previous HTTP request action is `200` **and** a function returns `true`. Statements can be evaluated with `and` as well as `or` logic through the `Join operand` dropdown.

{{< img src="workflows/branch-workflow-configuration.png" alt="" >}}

### Sleep

Pause the execution of the workflow for a duration specified in seconds.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/
[2]: https://app.datadoghq.com/workflow
[3]: /workflows/setup/
[4]: https://lodash.com/
[5]: /workflows/build/#context-variables
