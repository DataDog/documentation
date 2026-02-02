---
title: Sumo Logic Hosted Collector
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

Use Observability Pipelines' Sumo Logic Hosted Collector source to receive logs sent to your Sumo Logic Hosted Collector. Select and set up this source when you [set up a pipeline][1].

## Prerequisites

{{% observability_pipelines/prerequisites/sumo_logic %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

Optionally, in the **Decoding** dropdown menu, select whether your input format is raw **Bytes**, **JSON**, Graylog Extended Log Format (**Gelf**), or **Syslog**. If no decoding is selected, the decoding defaults to JSON.

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/sumo_logic %}}

{{% observability_pipelines/log_source_configuration/sumo_logic %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/