---
title: Send Datadog Lambda Extension Logs to Observability Pipelines
description: Learn how to send Lambda Extension logs to Observability Pipelines
disable_toc: false
---

This document walks through how to send AWS vended logs with the Datadog Lambda Extension to Observability Pipelines. The setup steps are:

- [Set up a pipeline with the HTTP/S Server source](#set-up-a-pipeline).
- [Deploy the Datadog Forwarder](#deploy-the-datadog-lambda-forwarder).

**Note**: This is available for Worker versions 2.51 or later.

## Set up a pipeline

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

**Note**: Your Observability Pipeline must use `Http Server` as the source to process logs from the Lambda extension. Do not use `Datadog Agent` as the source.

## Set environment variables for Datadog Lambda Extension

Datadog Lambda Extension version 87+ and later allows users to send logs to Observability Pipelines.

To enable this feature, set these environment variables:
- `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED`: `true`
- `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL`: `<YOUR_OBSERVABILITY_PIPELINE_URL>`

