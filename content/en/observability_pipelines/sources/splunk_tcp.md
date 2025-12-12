---
title: Splunk Heavy or Universal Forwarders (TCP) Source
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' Splunk Heavy and Universal Forwards (TCP) source to receive logs sent to your Splunk forwarders. Select and set up this source when you [set up a pipeline][1].

## Prerequisites

{{% observability_pipelines/prerequisites/splunk_tcp %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

{{% observability_pipelines/source_settings/splunk_tcp %}}

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_tcp %}}

{{% observability_pipelines/log_source_configuration/splunk_tcp %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
