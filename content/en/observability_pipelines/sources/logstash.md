---
title: Logstash Source
disable_toc: false
---

Use Observability Pipelines' Logstash source to receive logs from your Logstash agent. Select and set up this source when you [set up a pipeline][1].

You can also use the Logstash source to [send logs to Observability Pipelines using Filebeat][2].

## Prerequisites

{{% observability_pipelines/prerequisites/logstash%}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

{{% observability_pipelines/source_settings/logstash %}}

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/logstash %}}

## Send logs to the Observability Pipelines Worker over Logstash

{{% observability_pipelines/log_source_configuration/logstash %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: /observability_pipelines/sources/filebeat/