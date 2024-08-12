---
title: Destinations
disable_toc: false
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

Use the Observability Pipelines Worker to send your processed logs to different destinations.

Select and set up your destinations when you [set up a pipeline][2]. This is step 4 in the pipeline setup process:

1. Navigate to [Observability Pipelines][1].
1. Select a template.
1. Select and set up your source.
1. Select and set up your destinations.
1. Set up your processors.
1. Install the Observability Pipelines Worker.

{{< whatsnext desc="The available Observability Pipelines destinations are:" >}}
    {{< nextlink href="observability_pipelines/destinations/#amazon-opensearch" >}}Amazon OpenSearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#datadog-log-management" >}}Datadog Log Management{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#elasticsearch" >}}Elasticsearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#google-chronicle" >}}Google Chronicle{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#opensearch" >}}OpenSearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#rsyslog-or-syslog-ng" >}}Rsyslog or Syslog-ng{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#splunk-http-event-collector-hec" >}}Splunk HTTP Event Collector (HEC){{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#sumo-logic-hosted-collector" >}}Sumo Logic Hosted Collector{{< /nextlink >}}
{{< /whatsnext >}}

## Amazon OpenSearch

Set up the Amazon OpenSearch destination and its environment variables when you [set up a pipeline][2]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/amazon_opensearch %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_opensearch %}}

## Datadog Log Management

### Set up the destination

{{% observability_pipelines/destination_settings/datadog %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

## Elasticsearch

Set up the Elasticsearch destination and its environment variables when you [set up a pipeline][2]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/elasticsearch %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/elasticsearch %}}

## Google Chronicle

Set up the Google Chronicle destination and its environment variables when you [set up a pipeline][2]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/chronicle %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/chronicle %}}

## OpenSearch

Set up the OpenSearch destination and its environment variables when you [set up a pipeline][2]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/opensearch %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opensearch %}}

## Rsyslog or Syslog-ng

Set up the Rsyslog or Syslog-ng destination and its environment variables when you [set up a pipeline][2]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/syslog %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

## Splunk HTTP Event Collector (HEC)

Set up the Splunk HEC destination and its environment variables when you [set up a pipeline][2]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/splunk_hec %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

## Sumo Logic Hosted Collector

Set up the Sumo Logic destination and its environment variables when you [set up a pipeline][2]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/sumo_logic %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/set_up_pipelines/