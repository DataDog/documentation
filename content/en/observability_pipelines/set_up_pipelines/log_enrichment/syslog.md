---
title: Log Enrichment for Syslog
disable_toc: false
aliases:
    - /observability_pipelines/log_enrichment/syslog/
---

## Overview

Configure rsyslog or syslog-ng to send logs to the Observability Pipelines Worker and enrich and transform your logs before routing them to their destination.

{{% observability_pipelines/use_case_images/log_enrichment %}}

This document walks you through the following:
1. The [prerequisites](#prerequisites) needed to set up Observability Pipelines
1. [Setting up Observability Pipelines](#set-up-observability-pipelines)
1. [Sending logs to the Observability Pipelines Worker](#send-logs-to-the-observability-pipelines-worker-over-syslog)

## Prerequisites

{{% observability_pipelines/prerequisites/syslog %}}

## Set up Observability Pipelines

1. Navigate to [Observability Pipelines][1].
1. Select the **Log Volume Control** template to create a new pipeline.
1. Select **rsyslog** or **syslog-ng** as the source.

### Set up the source

{{% observability_pipelines/source_settings/syslog %}}

### Set up the destinations

Enter the following information based on your selected logs destinations.

{{< tabs >}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_settings/amazon_opensearch %}}

{{% /tab %}}
{{% tab "Amazon Security Lake" %}}

##### Prerequisites

{{% observability_pipelines/prerequisites/amazon_security_lake %}}

##### Set up the destination

{{% observability_pipelines/destination_settings/amazon_security_lake %}}

{{% /tab %}} 
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_settings/chronicle %}}

{{% /tab %}}
{{% tab "CrowdStrike NG-SIEM" %}}

{{% observability_pipelines/destination_settings/crowdstrike_ng_siem %}}

{{% /tab %}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_settings/datadog %}}

{{% /tab %}}
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
{{% tab "Elasticsearch" %}}

{{% observability_pipelines/destination_settings/elasticsearch %}}

{{% /tab %}}
{{% tab "Microsoft Sentinel" %}}

{{% observability_pipelines/destination_settings/microsoft_sentinel %}}

{{% /tab %}}
{{% tab "New Relic" %}}

{{% observability_pipelines/destination_settings/new_relic %}}

{{% /tab %}}
{{% tab "OpenSearch" %}}

{{% observability_pipelines/destination_settings/opensearch %}}

{{% /tab %}}
{{% tab "SentinelOne" %}}

{{% observability_pipelines/destination_settings/sentinelone %}}

{{% /tab %}}
{{% tab "Socket" %}}

{{% observability_pipelines/destination_settings/socket %}}

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
{{< /tabs >}}

#### Add additional destinations

{{% observability_pipelines/multiple_destinations %}}

### Set up processors

{{% observability_pipelines/processors/intro %}}

{{% observability_pipelines/processors/filter_syntax %}}

{{% observability_pipelines/processors/add_processors %}}

{{< tabs >}}
{{% tab "Add env vars" %}}

{{% observability_pipelines/processors/add_env_vars %}}

{{% /tab %}}
{{% tab "Add hostname" %}}

{{% observability_pipelines/processors/add_hostname %}}

{{% /tab %}}
{{% tab "Custom Processor" %}}

{{% observability_pipelines/processors/custom_processor %}}

{{% /tab %}}
{{% tab "Dedupe" %}}

{{% observability_pipelines/processors/dedupe %}}

{{% /tab %}}
{{% tab "Edit fields" %}}

{{% observability_pipelines/processors/remap %}}

{{% /tab %}}
{{% tab "Enrichment table" %}}

{{% observability_pipelines/processors/enrichment_table %}}

{{% /tab %}}
{{% tab "Filter" %}}

{{% observability_pipelines/processors/filter %}}

{{% /tab %}}
{{% tab "Generate metrics" %}}

{{% observability_pipelines/processors/generate_metrics %}}

{{% /tab %}}
{{% tab "Grok Parser" %}}

{{% observability_pipelines/processors/grok_parser %}}

{{% /tab %}}
{{% tab "Parse JSON" %}}

{{% observability_pipelines/processors/parse_json %}}

{{% /tab %}}
{{% tab "Parse XML" %}}

{{% observability_pipelines/processors/parse_xml %}}

{{% /tab %}}
{{% tab "Quota" %}}

{{% observability_pipelines/processors/quota %}}

{{% /tab %}}
{{% tab "Reduce" %}}

{{% observability_pipelines/processors/reduce %}}

{{% /tab %}}
{{% tab "Remap to OCSF" %}}

{{% observability_pipelines/processors/remap_ocsf %}}

{{% collapse-content title="Library mapping" level="h5" expanded=false id="library_mapping" %}}

{{% observability_pipelines/processors/remap_ocsf_library_mapping %}}

{{% /collapse-content %}}

{{% collapse-content title="Custom mapping" level="h5" expanded=false id="custom_mapping" %}}

{{% observability_pipelines/processors/remap_ocsf_custom_mapping %}}

{{% /collapse-content %}}

{{% observability_pipelines/processors/filter_syntax %}}

{{% /tab %}}
{{% tab "Sample" %}}

{{% observability_pipelines/processors/sample %}}

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
{{% tab "Split array" %}}

{{% observability_pipelines/processors/split_array %}}

{{% /tab %}}
{{% tab "Tags Processor" %}}

{{% observability_pipelines/processors/tags_processor %}}

{{% /tab %}}
{{% tab "Throttle" %}}

{{% observability_pipelines/processors/throttle %}}

{{% /tab %}}
{{< /tabs >}}

#### Add another set of processors and destinations

{{% observability_pipelines/multiple_processors %}}

### Install the Observability Pipelines Worker
1. Select your platform in the **Choose your installation platform** dropdown menu.
1. Enter the Syslog address. This is a Syslog-compatible endpoint, exposed by the Worker, that your applications send logs to. The Observability Pipelines Worker listens on this address for incoming logs.

1. Provide the environment variables for each of your selected destinations. See [Prerequisites](#prerequisites) for more information.
{{< tabs >}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_env_vars/amazon_opensearch %}}

{{% /tab %}}
{{% tab "Amazon Security Lake" %}}

{{% observability_pipelines/destination_env_vars/amazon_security_lake %}}

{{% /tab %}}
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_env_vars/chronicle %}}

{{% /tab %}}
{{% tab "CrowdStrike NG-SIEM" %}}

{{% observability_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

{{% /tab %}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{% tab "Datadog Archives" %}}

For the Datadog Archives destination, follow the instructions for the cloud provider you are using to archive your logs.

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
{{% tab "Elasticsearch" %}}

{{% observability_pipelines/destination_env_vars/elasticsearch %}}

{{% /tab %}}
{{% tab "Microsoft Sentinel" %}}

{{% observability_pipelines/destination_env_vars/microsoft_sentinel %}}

{{% /tab %}}
{{% tab "New Relic" %}}

{{% observability_pipelines/destination_env_vars/new_relic %}}

{{% /tab %}}
{{% tab "OpenSearch" %}}

{{% observability_pipelines/destination_env_vars/opensearch %}}

{{% /tab %}}
{{% tab "SentinelOne" %}}

{{% observability_pipelines/destination_env_vars/sentinelone %}}

{{% /tab %}}
{{% tab "Socket" %}}

{{% observability_pipelines/destination_env_vars/socket %}}

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

## Send logs to the Observability Pipelines Worker over Syslog

{{% observability_pipelines/log_source_configuration/syslog %}}

[1]: https://app.datadoghq.com/observability-pipelines
