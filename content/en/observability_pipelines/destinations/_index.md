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

All [destinations][2] are available for all templates, except for the Amazon S3, Google Cloud Storage, and Azure Storage destinations which are only available for the Archive Logs template.

{{< whatsnext desc="These are the available Observability Pipelines destinations:" >}}
    {{< nextlink href="observability_pipelines/destinations/#datadog-log-management" >}}Datadog Log Management{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#splunk-hec" >}}Splunk HTTP Event Collector (HEC){{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#sumo-logic/" >}}Sumo Logic{{< /nextlink >}}
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

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/