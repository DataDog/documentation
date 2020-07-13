---
title: Serverless
kind: documentation
aliases:
  - /graphing/infrastructure/cloudfunctions
  - /graphing/infrastructure/serverless_functions
  - /graphing/infrastructure/serverless/
  - /infrastructure/serverless/
further_reading:
- link: "/integrations/amazon_xray/"
  tag: "X-Ray Integration"
  text: "AWS X-Ray Integration"
- link: "/integrations/amazon_lambda/"
  tag: "AWS Lambda Integration"
  text: "AWS Lambda Integration"
---

## Overview

Serverless is a concept where you write event-driven code and upload it to a cloud provider, which manages all of the underlying compute resources. [Datadog Serverless][1] brings together metrics, traces, and logs from your AWS Lambda functions running serverless applications into one view.

TODO: Include an asset about joining the Datadog Serverless community with a link to join our public Slack.

## Getting Started

### 1. Install the AWS Integration

TODO: This section needs to be filled.

### 2. Instrument Your Application

TODO: This will contain the language selector.

## Explore Datadog Serverless

### Serverless Homepage

TODO: This section needs to be filled.

### Function Detail View

Clicking on a particular function in the function summary table brings you to a function detail page. This page provides detailed trace and log level information for that function.

{{< img src="infrastructure/serverless/functiondetailview.png" alt="Serverless - Function Detail View" >}}

### Real-time Enhanced Metrics

TODO: This section needs to be filled.

### Distributed Tracing

TODO: This section needs to be updated.

Traces from the function currently being viewed are shown in the `Traces` section. You can sort these traces by attributes such as date, duration, and status.

{{< img src="infrastructure/serverless/traces.png" alt="Traces" >}}

Clicking on a particular trace opens the trace detail view for that trace. For AWS, the AWS X-Ray subsegments are transformed into Datadog spans while preserving the naming paradigms, span tags, and structure of the overall trace.

{{< img src="infrastructure/serverless/traces2.png" alt="Traces" >}}

Datadog provides specially formatted serverless traces for readability and usability. Clicking on the span from another Lambda function creates a link to that function’s detail page, enabling you to jump to another function that is part of the trace.

### Logs

TODO: This section needs to be updated.

The `Logs` section aggregates logs from all recent invocations of the current function. It updates live as your functions send new logs to Datadog.

{{< img src="infrastructure/serverless/logs2.png" alt="Traces" >}}

### Serverless Integrations

TODO: This section needs to be filled.

### Custom Metrics

TODO: This section needs to be filled.

## Not Using AWS?

The Serverless dashboard requires no installation of its own, but it relies on data sources that require their own installation. Refer to the dedicated set of instructions for your Cloud provider:

{{< partial name="serverless/serverless-setup.html" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
