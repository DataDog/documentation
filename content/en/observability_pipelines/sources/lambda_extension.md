---
title: Send Datadog Lambda Extension Logs to Observability Pipelines
description: Learn how to send Lambda Extension logs to Observability Pipelines
disable_toc: false
---

This document walks through how to send AWS vended logs with the Datadog Lambda Extension to Observability Pipelines. The setup steps are:

- [Set up a pipeline with the HTTP/S Server source](#set-up-a-pipeline).
- [Set environment variables for Datadog Lambda Extension](#set-environment-variables-for-datadog-lambda-extension).

## Set up a pipeline

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

**Note**: Your Observability Pipeline must use `Http Server` as the source to process logs from the Lambda extension. Do not use `Datadog Agent` as the source.

## Set environment variables for Datadog Lambda Extension

{{% observability_pipelines/lambda_extension_source %}}

