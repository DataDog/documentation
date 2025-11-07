---
title: Send Lambda Forwarder Logs to Observability Pipelines
disable_toc: false
---

This document walks through how to send AWS vended logs with the Datadog Lambda Forwarder to Observability Pipelines. The setup steps are:

- [Set up a pipeline with the HTTP/S Server source](#set-up-a-pipeline).
- [Deploy the Datadog Forwarder](#deploy-the-datadog-lambda-forwarder).

**Note**: This is available for Worker versions 2.51 or later.

## Set up a pipeline

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

## Deploy the Datadog Lambda Forwarder

{{% observability_pipelines/lambda_forwarder/deploy_forwarder %}}
