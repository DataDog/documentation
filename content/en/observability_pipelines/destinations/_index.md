---
title: Destinations
disable_toc: false
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

Use the Observability Pipelines Worker to send your logs to different destinations.

Select and set up your destinations when you build a pipeline in the UI. This is step 4 in the process:

1. Navigate to [Observability Pipelines][1].
1. Select a template.
1. Select and set up your source.
1. Select and set up your destinations.
1. Set up you processors.
1. Install the Observability Pipelines Worker.

{{< whatsnext desc="The available Observability Pipelines destinations are:" >}}
    {{< nextlink href="observability_pipelines/destinations/#datadog-log-management" >}}Datadog Log Management{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#splunk_hec" >}}Splunk HTTP Event Collector (HEC){{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#sumo_logic" >}}Sumo Logic{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#rsyslog-or-syslog-ng" >}}Rsyslog or Syslog-ng{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#chronicle" >}}Google Chronicle{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#elasticsearch" >}}Elasticsearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#opensearch" >}}OpenSearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#amazon_opensearch" >}}Amazon OpenSearch{{< /nextlink >}}
{{< /whatsnext >}}

## Datadog Log Management

### Set up the destination in the pipelines UI

{{% observability_pipelines/destination_settings/datadog %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

## Splunk HEC

### Set up the destination in the pipelines UI

{{% observability_pipelines/destination_settings/splunk_hec %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

## Sumo Logic

### Set up the destination in the pipelines UI

{{% observability_pipelines/destination_settings/sumo_logic %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

## Rsyslog or Syslog-ng

### Set up the destination in the pipelines UI

{{% observability_pipelines/destination_settings/syslog %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

## Google Chronicle

### Set up the destination in the pipelines UI

{{% observability_pipelines/destination_settings/chronicle %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/chronicle %}}

## Elasticsearch

### Set up the destination in the pipelines UI

{{% observability_pipelines/destination_settings/elasticsearch %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/elasticsearch %}}

## OpenSearch

### Set up the destination in the pipelines UI

{{% observability_pipelines/destination_settings/opensearch %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opensearch %}}

## Amazon OpenSearch

### Set up the destination in the pipelines UI

{{% observability_pipelines/destination_settings/amazon_opensearch %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_opensearch %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/