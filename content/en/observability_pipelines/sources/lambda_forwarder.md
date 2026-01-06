---
title: Send Datadog Lambda Forwarder Logs to Observability Pipelines
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

This document walks through how to send AWS vended logs with the Datadog Lambda Forwarder to Observability Pipelines. The setup steps are:

- [Set up a pipeline with the HTTP/S Server source](#set-up-a-pipeline).
- [Deploy the Datadog Forwarder](#deploy-the-datadog-lambda-forwarder).

See [Datadog Forwarder][1] to learn more about it.

## Set up a pipeline

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

## Deploy the Datadog Lambda Forwarder

{{% observability_pipelines/lambda_forwarder/deploy_forwarder %}}

[1]: /logs/guide/forwarder/?tab=cloudformation