---
title: Generic Actions
kind: documentation
disable_toc: false
disable_sidebar: false
type: documentation
is_beta: true
aliases:
- /workflows/generic_actions
further_reading:
- link: "/integrations/"
  tag: "Documentation"
  text: "Learn about integrations"
---

Generic actions are workflow actions that are not associated with a tool or integration. They allow you to overcome any action that may not be currently present in the Actions catalog.

As with all workflow actions, you can use the [context variables][1] tab to access any values available in the workflow context.

You can also [request a new action or entire integration][5].

## HTTP

Use the HTTP action to make a request to any custom endpoint. You can control the request method and its contents, how it is authenticated and processed, and how it should respond to scenarios like expired certificates or redirects. If you need to add Datadog IP address ranges to your allowlist so that the HTTP action works as expected, use the IPs listed in the `webhooks` object. See the [IP Ranges page][2] for details. 

Begin by specifying the request method and any necessary [authentication][3]. Read the sections below for further information about the available configuration tabs. Optionally, the request can wait on conditions that you specify in the **Conditional wait** section, and retry itself at a given interval if the condition is not satisfied.

### Request Options

Enter any desired headers, cookies, and a comma-delineated list of any status codes on which to return an error. Use the `Response Parsing` dropdown to override the default response parsing method inferred from the headers, and `Response Encoding` if the target server specifies the wrong encoding in its response headers. You can also decide if the request should allow for expired certificates or follow redirects.

{{< img src="service_management/workflows/http-request-options-tab2.png" alt="The workflow canvas open with an HTTP request action selected and the configuration tab open. The Request Options tab is selected and the action is configured with a header with the name Connection and the value keep-alive, and the Error on Status field has been filled in with the values 202, 300-305" >}}

### Request Body

If the request has a body, use the `Request Body` tab to configure its content and format. Add inputs to the request body from the workflow context with [context variables][1] in the `Request Body` field, or interpolate them into `Name` and `Value` pairs for the `multipart/form-data` body type. The `Body Type` dropdown allows the following options:

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

The data returned by these actions can then be referenced in subsequent steps of the workflow.

### Expression

Use expression actions for data transformations that can be accomplished in a single line of code, and do not require variable assignments or multiple standalone operations. For example:

`[1, 2, 3].filter(x => x < 3)`

### Function

The function action allows for variable assignments and data transformations requiring multiple expressions.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/workflows/build/#context-variables
[2]: https://docs.datadoghq.com/api/latest/ip-ranges/#list-ip-ranges
[3]: /service_management/workflows/access/
[4]: https://lodash.com/
[5]: https://forms.gle/JzPazvxXox7fvA2R8
