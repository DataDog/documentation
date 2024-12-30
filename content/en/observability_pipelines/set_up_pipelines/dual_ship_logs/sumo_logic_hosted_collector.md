---
title: Dual Ship Logs for the Sumo Logic Hosted Collector HTTP Logs Source
disable_toc: false
aliases:
    - /observability_pipelines/dual_ship_logs/sumo_logic_hosted_collector/
---

## Overview

Configure Sumo Logic Hosted Collector the HTTP Logs source to send logs to the Observability Pipelines Worker so that Observability Pipelines receives and routes logs from the Sumo Logic Hosted Collector to downstream destinations.

{{% observability_pipelines/use_case_images/dual_ship_logs %}}

This document walks you through the following steps:
1. The [prerequisites](#prerequisites) needed to set up Observability Pipelines
1. [Setting up Observability Pipelines](#set-up-observability-pipelines)
1. [Sending logs to the Observability Pipelines Worker over Sumo Logic HTTP Source](#send-logs-to-the-observability-pipelines-worker-over-sumo-logic-http-source)

## Prerequisites

### Sumo Logic Hosted Collectors

{{% observability_pipelines/prerequisites/sumo_logic %}}

### Datadog Log Management

{{% observability_pipelines/prerequisites/datadog_agent_destination_only %}}

## Set up Observability Pipelines

1. Navigate to [Observability Pipelines][1].
1. Select the **Dual Ship** template to create a new pipeline.
1. Select **Sumo Logic** as the source.

### Set up the source

{{% observability_pipelines/source_settings/splunk_hec %}}

### Set up the destinations

Enter the following information based on your selected logs destinations.

{{< tabs >}}
{{% tab "Datadog Archives" %}}

{{% observability_pipelines/destination_settings/datadog_archives_note %}}

{{% observability_pipelines/destination_settings/datadog_archives_prerequisites %}}

To set up the destination, follow the instructions for the cloud provider you are using to archive your logs.

{{% collapse-content title="Amazon S3" level="h5" %}}

{{% observability_pipelines/destination_settings/datadog_archives_amazon_s3 %}}

{{% /collapse-content %}}
{{% collapse-content title="Google Cloud Storage" level="h5" %}}

{{% observability_pipelines/destination_settings/datadog_archives_google_cloud_storage %}}

{{% /collapse-content %}}
{{% collapse-content title="Azure Storage" level="h5" %}}

{{% observability_pipelines/destination_settings/datadog_archives_azure_storage %}}

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_settings/datadog %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/destination_settings/splunk_hec %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/destination_settings/sumo_logic %}}

{{% /tab %}}
{{% tab "Syslog" %}}

{{% observability_pipelines/destination_settings/syslog %}}

{{% /tab %}}
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_settings/chronicle %}}

{{% /tab %}}
{{% tab "Elasticsearch" %}}

{{% observability_pipelines/destination_settings/elasticsearch %}}

{{% /tab %}}
{{% tab "OpenSearch" %}}

{{% observability_pipelines/destination_settings/opensearch %}}

{{% /tab %}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_settings/amazon_opensearch %}}

{{% /tab %}}
{{% tab "New Relic" %}}

{{% observability_pipelines/destination_settings/new_relic %}}

{{% /tab %}}
{{% tab "Amazon Security Lake" %}}

{{% observability_pipelines/destination_settings/amazon_security_lake %}}

{{% /tab %}}
{{% tab "Microsoft Sentinel" %}}

{{% observability_pipelines/destination_settings/microsoft_sentinel %}}

{{% /tab %}}
{{% tab "SentinelOne" %}}

{{% observability_pipelines/destination_settings/sentinelone %}}

{{% /tab %}}
{{< /tabs >}}

### Set up processors

{{% observability_pipelines/processors/intro %}}

{{% observability_pipelines/processors/filter_syntax %}}

{{% observability_pipelines/processors/add_processors %}}

{{< tabs >}}
{{% tab "Filter" %}}

{{% observability_pipelines/processors/filter %}}

{{% /tab %}}
{{% tab "Edit fields" %}}

{{% observability_pipelines/processors/remap %}}

{{% /tab %}}
{{% tab "Sample" %}}

{{% observability_pipelines/processors/sample %}}

{{% /tab %}}
{{% tab "Grok Parser" %}}

{{% observability_pipelines/processors/grok_parser %}}

{{% /tab %}}
{{% tab "Quota" %}}

{{% observability_pipelines/processors/quota %}}

{{% /tab %}}
{{% tab "Reduce" %}}

{{% observability_pipelines/processors/reduce %}}

{{% /tab %}}
{{% tab "Dedupe" %}}

{{% observability_pipelines/processors/dedupe %}}

{{% /tab %}}
{{% tab "Sensitive Data Scanner" %}}

{{% observability_pipelines/processors/sensitive_data_scanner %}}

{{% collapse-content title="Add rules from the library" level="h5" %}}

{{% observability_pipelines/processors/sds_library_rules %}}

{{% /collapse-content %}}
{{% collapse-content title="Add a custom rule" level="h5" %}}

{{% observability_pipelines/processors/sds_custom_rules %}}

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Add hostname" %}}

{{% observability_pipelines/processors/add_hostname %}}

{{% /tab %}}
{{% tab "Parse JSON" %}}

{{% observability_pipelines/processors/parse_json %}}

{{% /tab %}}
{{% tab "Enrichment table" %}}

{{% observability_pipelines/processors/enrichment_table %}}

{{% /tab %}}
{{% tab "Generate metrics" %}}

{{% observability_pipelines/processors/generate_metrics %}}

{{% /tab %}}
{{% tab "Add env vars" %}}

{{% observability_pipelines/processors/add_env_vars %}}

{{% /tab %}}
{{% tab "Remap to OCSF" %}}

{{% observability_pipelines/processors/remap_ocsf %}}

{{% /tab %}}
{{< /tabs >}}

### Install the Observability Pipelines Worker
1. Select your platform in the **Choose your installation platform** dropdown menu.
1. Enter the Sumo Logic address. This is the address and port where your applications are sending their logging data. The Observability Pipelines Worker listens to this address for incoming logs.
1. Provide the environment variables for each of your selected destinations. See [prerequisites](#prerequisites) for more information.
{{< tabs >}}
{{% tab "Datadog Archives" %}}

{{% collapse-content title="Amazon S3" level="h5" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

{{% /collapse-content %}}
{{% collapse-content title="Google Cloud Storage" level="h5" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_google_cloud_storage %}}

{{% /collapse-content %}}
{{% collapse-content title="Azure Storage" level="h5" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/destination_env_vars/splunk_hec %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/destination_env_vars/sumo_logic %}}

{{% /tab %}}
{{% tab "Syslog" %}}

{{% observability_pipelines/destination_env_vars/syslog %}}

{{% /tab %}}
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_env_vars/chronicle %}}

{{% /tab %}}
{{% tab "Elasticsearch" %}}

{{% observability_pipelines/destination_env_vars/elasticsearch %}}

{{% /tab %}}
{{% tab "OpenSearch" %}}

{{% observability_pipelines/destination_env_vars/opensearch %}}

{{% /tab %}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_env_vars/amazon_opensearch %}}

{{% /tab %}}
{{% tab "New Relic" %}}

{{% observability_pipelines/destination_env_vars/new_relic %}}

{{% /tab %}}
{{% tab "Amazon Security Lake" %}}

{{% observability_pipelines/destination_env_vars/amazon_security_lake %}}

{{% /tab %}}
{{% tab "Microsoft Sentinel" %}}

{{% observability_pipelines/destination_env_vars/microsoft_sentinel %}}

{{% /tab %}}
{{% tab "SentinelOne" %}}

{{% observability_pipelines/destination_env_vars/sentinelone %}}

{{% /tab %}}
{{< /tabs >}}
1. Follow the instructions for your environment to install the Worker.
{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/install_worker/docker %}}

{{% /tab %}}
{{% tab "Kubernetes" %}}

{{% observability_pipelines/install_worker/kubernetes %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/install_worker/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/install_worker/linux_rpm %}}

{{% /tab %}}
{{% tab "CloudFormation" %}}

{{% observability_pipelines/install_worker/cloudformation %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/sumo_logic %}}

[1]: https://app.datadoghq.com/observability-pipelines
