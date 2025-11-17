---
title: Send Datadog Lambda Extension Logs to Observability Pipelines
description: Learn how to send Lambda Extension logs to Observability Pipelines
disable_toc: false

---

This document describes how to use the Datadog Lambda Extension to send AWS vended logs to Observability Pipelines. The setup steps are:

- [Set up a pipeline with the HTTP/S Server source](#set-up-a-pipeline).
- [Deploy the Datadog Lambda Extension](#deploy-the-datadog-lambda-extension)

See [Datadog Lambda Extension][1] to learn more about it.

## Set up a pipeline

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

**Note**: Your Observability Pipeline must use `HTTP Server` as the source to process logs from the Lambda extension. Do not use `Datadog Agent` as the source.

## Deploy the Datadog Lambda Extension

### Install the Datadog Lambda Extension

Follow the instructions in [Instrument AWS Lambda applications][2] to set up the Datadog Lambda Library to collect data from your AWS Lambda applications.

### Set environment variables for Datadog Lambda Extension

{{% observability_pipelines/lambda_extension_source %}}

[1]: https://docs.datadoghq.com/serverless/libraries_integrations/extension/
[2]: https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/
