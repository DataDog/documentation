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

Make sure to check out discussions going on in the [#serverless][2] channel in the [Datadog Slack community][3].

## Getting Started

### 1. Install the Cloud Integration

Start by setting up the cloud integration you are using to run your serverless functions.

#### AWS Lambda

To set up Datadog APM in AWS Lambda, see the [Lambda integration documentation][4]. Alternatively, you can use [AWS X-Ray][5] to trace your Lambda functions.

#### Azure App Services

The Datadog extension for Azure App Services provides tracing capabilities for Azure Web Apps. For more information setting up tracing in Azure, see the [Azure App Services Extension documentation][6].

#### Google App Engine

To monitor serverless functions on Google App Engine, you need to enable [Datadog APM][7]. Datadog APM requires sending trace data to a running Agent. A workaround for enabling trace collection for a serverless setup is to configure a separate VM that accepts trace traffic externally.

### 2. Instrument Your Application

{{< partial name="serverless/getting-started-languages.html" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: https://datadoghq.slack.com/archives/CFDPB83M4
[3]: https://chat.datadoghq.com/
[4]: /integrations/amazon_lambda/#trace-collection
[5]: /integrations/amazon_xray/#overview
[6]: /infrastructure/serverless/azure_app_services/#overview
[7]: /tracing/
