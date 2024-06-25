---
title: Archive Logs for Splunk Heavy and Universal Forwarders (TCP)
kind: document
disable_toc: false
---

## Overview

Configure your Splunk Heavy and Universal Forwarder so that the Observability Pipelines Worker formats the logs collected into a Datadog-rehydratable format before routing them to Datadog Log Archives.

{{< img src="observability_pipelines/use_cases/archive_logs.png" alt="The log sources, processors, and destinations available for this use case" width="100%" >}}

This document walks you through the following steps:
1. The [prerequisites](#prerequisites) needed to set up Observability Pipelines
1. [Configuring a Log Archive](#configure-a-log-archive)
1. [Setting up Observability Pipelines](#set-up-observability-pipelines)
1. [Connecting Splunk Forwarder to the Observability Pipelines Worker](#connect-splunk-forwarder-to-the-observability-pipelines-worker)

## Prerequisites

{{% observability_pipelines/prerequisites/splunk_tcp %}}

## Configure Log Archives

If you already have a Datadog Log Archive configured for Observability Pipelines, skip to [Set up Observability Pipelines](#set-up-observability-pipelines).

Select the cloud provider you are using to archive your logs. 

{{% collapse-content title="Amazon S3" level="h4" %}}
{{% observability_pipelines/configure_log_archive/amazon_s3/instructions %}}

{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/docker %}}

{{% /tab %}}
{{% tab "Amazon EKS" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/amazon_eks %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/linux_rpm %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/configure_log_archive/amazon_s3/connect_s3_to_datadog_log_archives %}}

{{% /collapse-content %}}

{{% collapse-content title="Google Cloud Storage" level="h4" %}}
{{% observability_pipelines/configure_log_archive/google_cloud_storage/instructions %}}

{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/configure_log_archive/google_cloud_storage/docker %}}

{{% /tab %}}
{{% tab "Google GKE" %}}

{{% observability_pipelines/configure_log_archive/google_cloud_storage/google_gke %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/configure_log_archive/google_cloud_storage/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/configure_log_archive/google_cloud_storage/linux_rpm %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/configure_log_archive/google_cloud_storage/connect_datadog_log_archives %}}

{{% /collapse-content %}}
{{% collapse-content title="Azure Storage" level="h4" %}}

{{% observability_pipelines/configure_log_archive/azure_storage/instructions %}}

{{% /collapse-content %}}

## Set up Observability Pipelines

1. Navigate to [Observability Pipelines][1].
1. Select the **Archive Logs** template to create a new pipeline.
1. Select **Splunk TCP** as the source.

### Set up the source

{{% observability_pipelines/source_settings/splunk_tcp %}}

### Set up the destinations

Enter the following information based on your selected logs destination.

{{< tabs >}}
{{% tab "Datadog Archives" %}}

{{% observability_pipelines/destination_settings/datadog_archives_note %}}

Follow the instructions for the cloud provider you are using to archive your logs.

{{% observability_pipelines/destination_settings/datadog_archives_amazon_s3 %}}

{{% observability_pipelines/destination_settings/datadog_archives_google_cloud_storage %}}

{{% observability_pipelines/destination_settings/datadog_archives_azure_storage %}}

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
{{< /tabs >}}

### Install the Observability Pipelines Worker
1. Select your platform in the **Choose your installation platform** dropdown menu.
1. Enter the Splunk TCP address. This is the address and port where your applications are sending their logging data. The Observability Pipelines Worker listens to this address for incoming logs.
1. Provide the environment variables for each of your selected destinations. See [prerequisites](#prerequisites) for more information.
{{< tabs >}}
{{% tab "Datadog Archives" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_google_cloud_storage %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

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
{{< /tabs >}}
1. Follow the instructions for your environment to install the Worker.
{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/install_worker/docker %}}

{{% /tab %}}
{{% tab "Amazon EKS" %}}

{{% observability_pipelines/install_worker/amazon_eks %}}

{{% /tab %}}
{{% tab "Azure AKS" %}}

{{% observability_pipelines/install_worker/azure_aks %}}

{{% /tab %}}
{{% tab "Google GKE" %}}

{{% observability_pipelines/install_worker/google_gke %}}

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

{{% observability_pipelines/log_source_configuration/splunk_tcp %}}

[1]: https://app.datadoghq.com/observability-pipelines