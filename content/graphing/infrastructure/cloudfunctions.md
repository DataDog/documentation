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

{{< img src="graphing/infrastructure/cloudfunctions/cf-overview.png" alt="cloud functions overview" responsive="true" style="width:80%;">}}

## Installation

The Cloud Functions dashboard requires no installation of its own, but it relies on three data sources that require their own installation:

1. [Amazon Web Services integration][2] (required)

	This integration is used to populate summary graphs and the main functions table. Install this integration and ensure that Lambda metrics are reporting in your account.

	*Note*: Metrics in the Cloud Function UI are delayed ~10 minutes, as this is the default speed at which we poll AWS APIs. Reach out to support@datadoghq.com if you would like this rate to be decreased.

2. [AWS X-Ray integration][3] (optional)
	This integration provides traces for Lambda functions in the function detail page.

	Install the X-Ray integration and add the following permissions to the policy document in your AWS/Datadog Role:
	```
	xray:BatchGetTraces,
	xray:GetTraceSummaries
	```
	If using a Customer Master Key to encrypt traces, add the `kms:Decrypt` method to your policy where the Resource is the Customer Master Key used for X-Ray.

	Recommended X-Ray setup:

	- Navigate to the Lambda function in the AWS console you want to instrument. In the “Debugging and error handling” section, check the box to “Enable active tracing”. This turns on X-Ray for that function.

	- Import the X-Ray SDK in your function, and patch all supported libraries. This automatically causes X-Ray to trace all AWS calls and other X-Ray supported integrations. See [an example of this in Python][4].

	- Datadog's X-Ray integration supports custom subsegments and annotations as well.

	*Note*: Traces are delayed ~5 minutes, as this is the speed at which Datadog polls AWS X-Ray APIs.

3. AWS CloudWatch Logs (optional)

	Install this if you want to see logs from your Lambda functions in the function detail page. This will also populate the additional metrics such as Memory Used (avg) and Last Start in your functions table.

	To enable this, refer to the [documentation for sending Lambda logs to Datadog][5].

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

Ensure you have the `lambda:List*` permission in your Datadog IAM policy in order to have these tags collected.

Ensure you have the `tag:GetResources` permission in your Datadog IAM policy in order to have custom tags collected.

### Filtering

Use the faceted search functionality along the left-hand side of the page to narrow down the functions that are in view. All AWS and custom tags are available to use as filters.

### Selecting metrics on table

You can check and uncheck metrics you would like to view on the functions table. By default, invocations, duration (avg), errors, estimated cost, memory used (avg), and last start are on by default.

Non-default metrics you can check are

- DeadLetterError
- Iterator Age
- Concurrent Executions
- Throttles

## Function Detail view

Clicking on a particular function in the function summary table brings you to a function detail page. This page provides detailed trace and log level information for that function.

{{< img src="graphing/infrastructure/cloudfunctions/cf-functiondetailview.png" alt="Cloud Functions - Function Detail View" responsive="true" style="width:80%;">}}

### Summary graphs and time selector

Use the summary graphs across the top of screen and the time selector to focus in on a specific time frame you are interested in. The entire page, including the traces and logs shown, updates when you use the time selector.

### Traces

Via the AWS X-Ray integration, traces from the function currently being viewed are shown in the `Traces` tab. You can sort these traces by attributes such as date, duration, and status.

{{< img src="graphing/infrastructure/cloudfunctions/cf-traces.png" alt="Traces" responsive="true" style="width:80%;">}}

#### Trace detail view

Clicking on a particular trace opens the trace detail view for that trace. The X-Ray subsegments are transformed into Datadog spans while preserving the naming paradigms, span metadata, and structure of the overall trace.

{{< img src="graphing/infrastructure/cloudfunctions/cf-traces2.png" alt="Traces" responsive="true" style="width:80%;">}}

Datadog provides specially formatted serverless traces for readability and usability. Clicking on the span from another Lambda function creates a link to that function’s detail page so you can easily jump to another function that is part of the trace.

### Logs

All logs emitted from that function are pulled into the function detail page as well. Narrow down the timeframe of the page to a specific moment of interest to view the logs during a critical point in time. Click on the logs in the table to see the full log in more detail.

{{< img src="graphing/infrastructure/cloudfunctions/cf-logs.png" alt="logs" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[4]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-python-patching.html
[5]: /integrations/amazon_lambda/#log-collection
