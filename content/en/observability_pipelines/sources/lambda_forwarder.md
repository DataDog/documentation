---
title: Send Datadog Lambda Forwarder Logs to Observability Pipelines
disable_toc: false
---

## Overview

This document walks through how to send AWS vended logs with the Datadog Lambda Forwarder to Observability Pipelines. The setup steps are:

- [Set up a pipeline with the HTTP/S Server source](#set-up-a-pipeline).
- [Deploy the Datadog Forwarder](#deploy-the-datadog-lambda-forwarder).

See [Datadog Forwarder][1] to learn more about it.

## Set up a pipeline

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

## Deploy the Datadog Lambda Forwarder

{{% observability_pipelines/lambda_forwarder/deploy_forwarder %}}

## Metrics

For [component metrics][2] and [source buffer metrics][3] emitted by all sources, see the [Pipelines Usage Metrics][4] documentation. Since you use the HTTP Server source to send logs from Lambda Forwarder to Observability pipelines, use the `component_type:http_server` tag to filter the relevant metrics.

[1]: /logs/guide/forwarder/?tab=cloudformation
[2]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[4]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
