---
title: Serverless
kind: documentation
aliases:
  - /graphing/infrastructure/cloudfunctions
  - /graphing/infrastructure/serverless_functions
  - /graphing/infrastructure/serverless/
  - /infrastructure/serverless/
  - /tracing/serverless_functions/datadog_apm
  - /integrations/amazon_lambda/docs.datadoghq.com/serverless/
further_reading:
- link: "/integrations/amazon_xray/"
  tag: "X-Ray Integration"
  text: "AWS X-Ray Integration"
- link: "/integrations/amazon_lambda/"
  tag: "AWS Lambda Integration"
  text: "AWS Lambda Integration"
---

{{< img src="serverless/datadog_serverless_overview.png" alt="Datadog Serverless Overview"  style="width:100%;">}}

## Overview

Serverless is a concept where you write event-driven code and upload it to a cloud provider, which manages all of the underlying computational resources. [Datadog Serverless][1] brings together metrics, traces, and logs from your AWS Lambda functions running serverless applications into one view.

<div class="alert alert-info">Make sure to check out discussions going on in the <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> channel in the <a href="https://chat.datadoghq.com/">Datadog Slack community</a>.</div>

## Getting Started

### 1. Install the AWS Integration

Start by installing the [AWS Integration][2]. This allows Datadog to ingest Amazon CloudWatch metrics from AWS Lambda. The AWS integration installation also configures the Datadog Forwarder, which is required for ingestion of AWS Lambda traces, enhanced metrics, custom metrics, and logs.

### 2. Instrument your application

{{< partial name="serverless/getting-started-languages.html" >}}

## Not Using AWS Lambda?

### Azure App Services

The Datadog extension for Azure App Services provides tracing capabilities for Azure Web Apps. For more information setting up tracing in Azure, see the [Azure App Services Extension documentation][3].

### Google Cloud Functions

Google Cloud Functions is a lightweight, event-based, asynchronous compute solution that allows you to create small, single-purpose functions. To monitor serverless functions running on Google Cloud Platform, enable the [Google Cloud Platform integration][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /integrations/amazon_web_services/
[3]: /infrastructure/serverless/azure_app_services/#overview
[4]: /integrations/google_cloud_platform/
