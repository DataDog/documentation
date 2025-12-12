---
title: Socket Source
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' Socket source to send logs to the Worker over a socket connection (TCP or UDP). Select and set up this source when you [set up a pipeline][1].

## Prerequisites

{{% observability_pipelines/prerequisites/socket %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

{{% observability_pipelines/source_settings/socket %}}

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/socket %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/