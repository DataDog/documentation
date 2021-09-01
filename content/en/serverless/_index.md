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
- link: "https://www.datadoghq.com/state-of-serverless"
  tag: "Blog"
  text: "The State of Serverless"
- link: "/integrations/amazon_xray/"
  tag: "Documentation"
  text: "AWS X-Ray Integration"
- link: "/integrations/amazon_lambda/"
  tag: "Documentation"
  text: "AWS Lambda Integration"
- link: "https://www.datadoghq.com/blog/monitoring-lambda-containers/"
  tag: "Blog"
  text: "Monitor AWS Lambda functions deployed using container images"
- link: "https://www.datadoghq.com/blog/manage-serverless-logs-datadog/"
  tag: "Blog"
  text: "Best practices for collecting and managing serverless logs"
---

{{< vimeo 543362476 >}}


Serverless is a concept where you write event-driven code and upload it to a cloud provider, which manages all of the underlying computational resources. [Datadog Serverless][1] brings together metrics, traces, and logs from your AWS Lambda functions running serverless applications into one view.

<div class="alert alert-info">Make sure to check out discussions going on in the <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> channel in the <a href="https://chat.datadoghq.com/">Datadog Slack community</a>.</div>

## Getting started

1. Install the [AWS integration][2]. This allows Datadog to ingest Lambda metrics from AWS CloudWatch. 
2. Instrument your application. Select the Lambda runtime below for instructions to instrument your serverless application.

{{< partial name="serverless/getting-started-languages.html" >}}

## Other services

### Azure App Service

The Datadog extension for Azure App Service provides tracing capabilities for Azure Web Apps. 

Utilize the [Azure App Service view][3] (beta) to:

- Quickly identify apps with high latency or errors

- Track the utilization of your Web Apps, Function Apps, and App Service Plans

- Get insights into the costs of your App Service Plans by visualizing the number of active instances and seeing which are running apps that are submitting traces or logs to Datadog

- Map which apps are running on which App Service Plans to identify apps that may be impacting costs or performance

The Datadog extension for Azure App Service provides tracing capabilities for Azure Web Apps. For more information about setting up tracing in Azure, see the [Azure App Service Extension documentation][4].

### Google Cloud Functions

Google Cloud Functions is a lightweight, event-based, asynchronous compute solution that allows you to create small, single-purpose functions. To monitor serverless functions running on Google Cloud Platform, enable the [Google Cloud Platform integration][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /integrations/amazon_web_services/
[3]: https://app.datadoghq.com/functions?cloud=azure&config_serverless-azure-app=true&group=service
[4]: /infrastructure/serverless/azure_app_services/#overview
[5]: /integrations/google_cloud_platform/
