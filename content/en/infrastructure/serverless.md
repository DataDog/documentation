---
title: Serverless
kind: documentation
aliases:
  - /graphing/infrastructure/cloudfunctions
  - /graphing/infrastructure/serverless_functions
  - /graphing/infrastructure/serverless/
further_reading:
- link: "integrations/amazon_xray"
  tag: "X-Ray Integration"
  text: "AWS X-Ray Integration"
- link: "integrations/amazon_lambda"
  tag: "AWS Lambda Integration"
  text: "AWS Lambda Integration"
---

## Overview

Serverless is a concept where you write event-driven code and upload it to a cloud provider, which manages all of the underlying compute resources. [Datadog Serverless][1] brings together metrics, traces, and logs from your AWS Lambda functions running serverless applications into one view.

## Installation

The Serverless dashboard requires no installation of its own, but it relies on data sources that require their own installation, refer to the dedicated set of instructions for your Cloud provider:

{{< partial name="serverless/serverless-setup.html" >}}

## Searching, filtering, sorting

Use the faceted search functionality along the left side of the page to narrow down the functions that are in view. All your cloud provider tags and your custom tags are available to use as filters.

### Selecting metrics on table

Using the settings gear, you can check and uncheck metric columns on the functions table. Below is a table of metrics, their associated integration types, and whether each column is displayed by default:

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

## Function detail view

Clicking on a particular function in the function summary table brings you to a function detail page. This page provides detailed trace and log level information for that function.

{{< img src="infrastructure/serverless/functiondetailview.png" alt="Serverless - Function Detail View" >}}

### Summary graphs and time selector

Use the summary graphs across the top of screen and the time selector to focus in on a specific time frame you are interested in. The entire page, including the traces and logs shown, updates when you use the time selector.

### Traces

Traces from the function currently being viewed are shown in the `Traces` section. You can sort these traces by attributes such as date, duration, and status.

{{< img src="infrastructure/serverless/traces.png" alt="Traces" >}}

### Logs

The `Logs` section aggregates logs from all recent invocations of the current function. It updates live as your functions send new logs to Datadog.

{{< img src="infrastructure/serverless/logs2.png" alt="Traces" >}}

## Trace detail view

Clicking on a particular trace opens the trace detail view for that trace. For AWS, the AWS X-Ray subsegments are transformed into Datadog spans while preserving the naming paradigms, span tags, and structure of the overall trace.

{{< img src="infrastructure/serverless/traces2.png" alt="Traces" >}}

Datadog provides specially formatted serverless traces for readability and usability. Clicking on the span from another Lambda function creates a link to that function’s detail page, enabling you to jump to another function that is part of the trace.

### Trace logs

All logs emitted from a function, and all functions it calls, are pulled into the function detail page as well. Narrow down the timeframe of the page to a specific moment of interest to view the logs during a critical point in time. Click on the logs in the table to see the full log in more detail.

{{< img src="infrastructure/serverless/logs.png" alt="logs" >}}

### Errors

The errors tab bubbles up exceptions that occured during the duration of the trace. This is useful for quickly understanding what went wrong during execution.

{{< img src="infrastructure/serverless/errors.png" alt="logs" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
