---
title: Fluentd and Fluent Bit Sources
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' Fluentd or Fluent Bit source to receive logs from the your Fluentd or Fluent Bit agent. Select and set up this source when you [set up a pipeline][1].

## Prerequisites

{{% observability_pipelines/prerequisites/fluent %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below are for the source settings in the pipeline UI.

{{% observability_pipelines/source_settings/fluent %}}

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/fluent %}}

## Send logs to the Observability Pipelines Worker over Fluent

{{% observability_pipelines/log_source_configuration/fluent %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/