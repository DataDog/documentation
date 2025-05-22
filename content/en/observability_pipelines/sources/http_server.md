---
title: HTTP Server Source
disable_toc: false
---

Use Observability Pipelines' HTTP/S Server source to collect HTTP client logs. Select and set up this source when you [set up a pipeline][1].

You can also [send AWS vended logs with Datadog Lambda Forwarder to Observability Pipelines](#send-aws-vended-logs-with-the-datadog-lambda-forwarder-to-observability-pipelines).

## Prerequisites

{{% observability_pipelines/prerequisites/http_server %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

{{% observability_pipelines/source_settings/http_server %}}

## Send AWS vended logs with the Datadog Lambda Forwarder to Observability Pipelines

To send AWS vended logs to Observability Pipelines with the HTTP/S Server source:

- [Set up a pipeline with the HTTP/S Server source](#set-up-a-pipeline).
- [Deploy the Datadog Forwarder](#deploy-the-datadog-lambda-forwarder).

**Note**: This is available for Worker versions 2.51 or later.

### Set up a pipeline

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

### Deploy the Datadog Lambda Forwarder

{{% observability_pipelines/lambda_forwarder/deploy_forwarder %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/
[3]: /observability_pipelines/processors/
[4]: /logs/guide/forwarder/?tab=cloudformation#installation
[5]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html
[6]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers
