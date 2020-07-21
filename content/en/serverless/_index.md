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

{{< img src="serverless/datadog_serverless_overview.png" alt="Datadog Serverless Overview"  style="width:100%;">}}

## Overview

Serverless is a concept where you write event-driven code and upload it to a cloud provider, which manages all of the underlying compute resources. [Datadog Serverless][1] brings together metrics, traces, and logs from your AWS Lambda functions running serverless applications into one view.

Make sure to check out discussions going on in the [#serverless][2] channel in the [Datadog Slack community][3].

## Getting Started

### 1. Install the AWS Integration

Start by installing the [AWS Integration][4]. Once this is completed, view all of your Lambda Functions in the [Datadog Serverless Homepage][1].

### 2. Instrument Your Application

{{< partial name="serverless/getting-started-languages.html" >}}

## Not Using AWS Lambda?

### Azure App Services

The Datadog extension for Azure App Services provides tracing capabilities for Azure Web Apps. For more information setting up tracing in Azure, see the [Azure App Services Extension documentation][5].

### Google Cloud Functions

Google Cloud Functions is a lightweight, event-based, asynchronous compute solution that allows you to create small, single-purpose functions. To monitor serverless functions running on Google Cloud Platform, you need to enable the [Google Cloud Platform integration][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: https://datadoghq.slack.com/archives/CFDPB83M4
[3]: https://chat.datadoghq.com/
[4]: /integrations/amazon_web_services/
[5]: /infrastructure/serverless/azure_app_services/#overview
[6]: /integrations/google_cloud_platform/
