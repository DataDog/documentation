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

The Lambda Forwarder source uses the HTTP/S Server source. For the [component metrics](/observability_pipelines/monitoring/metrics/#component-metrics) and [source buffer metrics](/observability_pipelines/monitoring/metrics/#source-buffer-metrics) emitted by all sources, see the Observability Pipelines Metrics documentation. This source emits metrics with the `component_type` tag set to `http_server`.

[1]: /logs/guide/forwarder/?tab=cloudformation