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
- link: "https://www.datadoghq.com/blog/monitoring-lambda-containers/"
  tag: "Blog"
  text: "Monitor AWS Lambda functions deployed using container images"
---

{{< vimeo 543362476 >}}

## Overview

Serverless is a concept where you write event-driven code and upload it to a cloud provider, which manages all of the underlying computational resources. [Datadog Serverless][1] brings together metrics, traces, and logs from your AWS Lambda functions running serverless applications into one view.

<div class="alert alert-info">Make sure to check out discussions going on in the <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> channel in the <a href="https://chat.datadoghq.com/">Datadog Slack community</a>.</div>

## Getting started

1. Install the [AWS integration][2]. This allows Datadog to ingest Lambda metrics from AWS CloudWatch. 
2. Install the [Datadog Forwarder Lambda function][3], which is required for ingestion of AWS Lambda traces, enhanced metrics, custom metrics, and logs.
   **Note**: Skip this step if you already have the forwarder function installed as part of the [AWS integration][2] CloudFormation stack.
3. Instrument your application. Select the Lambda runtime below for instructions to instrument your serverless application.

{{< partial name="serverless/getting-started-languages.html" >}}

## Other services

### Azure App Service

The Datadog extension for Azure App Service provides tracing capabilities for Azure Web Apps. For more information setting up tracing in Azure, see the [Azure App Service Extension documentation][4].

### Google Cloud Functions

Google Cloud Functions is a lightweight, event-based, asynchronous compute solution that allows you to create small, single-purpose functions. To monitor serverless functions running on Google Cloud Platform, enable the [Google Cloud Platform integration][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /integrations/amazon_web_services/
[3]: /serverless/forwarder
[4]: /infrastructure/serverless/azure_app_services/#overview
[5]: /integrations/google_cloud_platform/
