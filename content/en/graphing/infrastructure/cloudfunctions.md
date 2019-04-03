---
title: Cloud Functions
kind: documentation
further_reading:
- link: "integrations/amazon_xray"
  tag: "X-Ray Integration"
  text: "AWS X-Ray Integration"
- link: "integrations/amazon_lambda"
  tag: "AWS Lambda Integration"
  text: "AWS Lambda Integration"
---

## Overview

Cloud functions are a service that run your code in response to events and automatically manage the underlying compute resources for you. [Datadog Cloud Functions][1] brings together metrics, traces, and logs from your AWS Lambda functions running serverless applications into one view.

{{< img src="graphing/infrastructure/cloudfunctions/cf-overview.png" alt="cloud functions overview" responsive="true">}}

## Installation

The Cloud Functions dashboard requires no installation of its own, but it relies on three data sources that require their own installation:

1. [Amazon Web Services integration][2] (required)

    This integration populates the summary graphs and the main functions table. Install this integration and ensure that Lambda metrics are reporting in your account.

    **Note**: Metrics in the Cloud Function UI are delayed ~10 minutes, as this is the default speed at which Datadog polls AWS APIs. To find out if your delay can be decreased, contact [Datadog support][3].

2. [AWS X-Ray integration][4] (optional)
    This integration provides traces for Lambda functions in the function detail page.

    Install the X-Ray integration and add the following permissions to the policy document in your AWS/Datadog Role:
    ```
    xray:BatchGetTraces,
    xray:GetTraceSummaries
    ```
    If using a Customer Master Key to encrypt traces, add the `kms:Decrypt` method to your policy where the Resource is the Customer Master Key used for X-Ray.

    Recommended X-Ray setup:

    - Navigate to the Lambda function in the AWS console you want to instrument. In the “Debugging and error handling” section, check the box to “Enable active tracing”. This turns on X-Ray for that function.

    - Import the X-Ray SDK in your function, and patch all supported libraries. This automatically causes X-Ray to trace all AWS calls and other X-Ray supported integrations. See an [example of this in Python][5].

    - Datadog's X-Ray integration supports custom subsegments and annotations as well.

    **Note**: Traces are delayed ~5 minutes, as this is the speed at which Datadog polls AWS X-Ray APIs.

3. AWS CloudWatch Logs (optional)

    Install this if you want to see logs from your Lambda functions in the function detail page. This also populates the additional metrics such as Memory Used (avg) and Last Start in your functions table.

    To enable this, refer to the [documentation for sending Lambda logs to Datadog][6].

## Searching, Filtering, Sorting

### Tagging

Datadog tags your Lambda functions and metrics with relevant AWS metadata and custom tags.

AWS Metadata:

- account_id
- executedversion
- functionname
- memorysize
- region
- resource
- runtime

In your Datadog IAM policy, add the permissions:

* `lambda:List*` to have the tags above collected.
* `tag:GetResources` to have custom tags collected.

### Filtering

Use the faceted search functionality along the left side of the page to narrow down the functions that are in view. All AWS and custom tags are available to use as filters.

### Selecting metrics on table

Using the settings gear, you can check and uncheck metric columns on the functions table. Below is a list of metrics, the associated integration type, and if the column is displayed by default:

| Metric                | Type   | Default |
|-----------------------|--------|---------|
| Invocations           | Metric | Yes     |
| Duration (Avg)        | Metric | Yes     |
| Errors                | Metric | Yes     |
| Throttles             | Metric | No      |
| Dead Letter Errors    | Metric | No      |
| Concurrent Executions | Metric | No      |
| Iterator Age          | Metric | No      |
| Est Cost              | Logs   | Yes     |
| Memory Used           | Logs   | Yes     |
| Last Start            | Logs   | Yes     |
| % Memory Used         | Logs   | No      |

## Function Detail view

Clicking on a particular function in the function summary table brings you to a function detail page. This page provides detailed trace and log level information for that function.

{{< img src="graphing/infrastructure/cloudfunctions/cf-functiondetailview.png" alt="Cloud Functions - Function Detail View" responsive="true">}}

### Summary graphs and time selector

Use the summary graphs across the top of screen and the time selector to focus in on a specific time frame you are interested in. The entire page, including the traces and logs shown, updates when you use the time selector.

### Traces

Via the AWS X-Ray integration, traces from the function currently being viewed are shown in the `Traces` section. You can sort these traces by attributes such as date, duration, and status.

{{< img src="graphing/infrastructure/cloudfunctions/cf-traces.png" alt="Traces" responsive="true">}}

### Logs

The `Logs` section aggregates logs from all recent invocations of the current function. It updates live as your functions send new logs to Datadog.

{{< img src="graphing/infrastructure/cloudfunctions/cf-logs2.png" alt="Traces" responsive="true">}}

## Trace detail view

Clicking on a particular trace opens the trace detail view for that trace. The X-Ray subsegments are transformed into Datadog spans while preserving the naming paradigms, span metadata, and structure of the overall trace.

{{< img src="graphing/infrastructure/cloudfunctions/cf-traces2.png" alt="Traces" responsive="true">}}

Datadog provides specially formatted serverless traces for readability and usability. Clicking on the span from another Lambda function creates a link to that function’s detail page so you can easily jump to another function that is part of the trace.

### Logs

All logs emitted from that function, and all functions it calls, are pulled into the function detail page as well. Narrow down the timeframe of the page to a specific moment of interest to view the logs during a critical point in time. Click on the logs in the table to see the full log in more detail.

{{< img src="graphing/infrastructure/cloudfunctions/cf-logs.png" alt="logs" responsive="true">}}

### Errors

The errors tab bubbles up exceptions that occured during the duration of the trace. This is useful for quickly understanding what went wrong during execution.

{{< img src="graphing/infrastructure/cloudfunctions/cf-errors.png" alt="logs" responsive="true">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /integrations/amazon_web_services
[3]: /help
[4]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[5]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-python-patching.html
[6]: /integrations/amazon_lambda/#log-collection
