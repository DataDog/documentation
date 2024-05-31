---
title: Archive Logs for the Splunk HTTP Event Collector (HEC)
kind: document
disable_toc: false
---

## Overview

Configure your Splunk HTTP Event Collector (HEC) so that the Observability Pipelines Worker formats the logs collected into a Datadog-rehydratable format before routing them to Datadog Log Archives.

{{< img src="observability_pipelines/use_cases/archive_logs.png" alt="The log sources, processors, and destinations available for this use case" width="100%" >}}

This document walks through the following steps:
1. The [prerequisites](#prerequisites) needed to set up Observability Pipelines
1. [Configuring a Log Archive](#configure-a-log-archive)
1. [Setting up Observability Pipelines](#set-up-observability-pipelines)
1. [Sending logs to the Worker over Splunk HEC](#send-logs-to-the-observability-pipelines-worker-over-splunk-hec)

## Prerequisites

{{% observability_pipelines/prerequisites/splunk_hec %}}

## Configure Log Archives
Select the cloud provider you are using to archive your logs.

{{% collapse-content title="Amazon S3" level="h4" %}}
{{% observability_pipelines/configure_log_archive/instructions %}}
{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/configure_log_archive/docker %}}
{{% observability_pipelines/configure_log_archive/connect_s3_to_datadog_log_archives %}}

{{% /tab %}}
{{% tab "Amazon EKS" %}}

{{% observability_pipelines/configure_log_archive/amazon_eks %}}
{{% observability_pipelines/configure_log_archive/connect_s3_to_datadog_log_archives %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/configure_log_archive/linux_apt %}}
{{% observability_pipelines/configure_log_archive/connect_s3_to_datadog_log_archives %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/configure_log_archive/linux_rpm %}}
{{% observability_pipelines/configure_log_archive/connect_s3_to_datadog_log_archives %}}

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Google Cloud Storage" level="h4" %}}

See the following [Log Archives][100001] steps to configure an archive in Google Cloud Storage:

1. [Create a storage bucket][100002]
1. [Set permissions][100003]
    - TKTK Separate instructions for OP
1. [Route your logs to a bucket][100004]
    - **Note**: Add a query that filters out all logs going through log pipelines so that none of those logs go into this archive. For example, add the query `observability_pipelines_read_only_archive`, assuming no logs going through the pipeline have that tag added.

{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/configure_log_archive/docker %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/configure_log_archive/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/configure_log_archive/linux_rpm %}}

{{% /tab %}}
{{< /tabs >}}

[100001]: /logs/log_configuration/archives/
[100002]: /logs/log_configuration/archives/#create-a-storage-bucket
[100003]: /logs/log_configuration/archives/#set-permissions
[100004]: /logs/log_configuration/archives/#route-your-logs-to-a-bucket

{{% /collapse-content %}}

{{% collapse-content title="Azure Storage" level="h4" %}}

See the following [Log Archives][100001] steps to configure an archive in Azure Storage:

1. [Create a storage bucket][100002]
1. [Set permissions][100003]
    - TKTK Separate instructions for OP
1. [Route your logs to a bucket][100004]
    - **Note**: Add a query that filters out all logs going through log pipelines so that none of those logs go into this archive. For example, add the query `observability_pipelines_read_only_archive`, assuming no logs going through the pipeline have that tag added.

{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/configure_log_archive/docker %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/configure_log_archive/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/configure_log_archive/linux_rpm %}}

{{% /tab %}}
{{< /tabs >}}

[100001]: /logs/log_configuration/archives/
[100002]: /logs/log_configuration/archives/#create-a-storage-bucket
[100003]: /logs/log_configuration/archives/#set-permissions
[100004]: /logs/log_configuration/archives/#route-your-logs-to-a-bucket

{{% /collapse-content %}}

## Set up Observability Pipelines

1. Navigate to [Observability Pipelines][1].
1. Select the **Archive Logs** template to create a new pipeline.
1. Select **Splunk HEC** as the source.

### Set up the source

{{% observability_pipelines/source_settings/splunk_hec %}}

### Set up the destinations

Enter the following information based on your selected logs destinations.

{{< tabs >}}
{{% tab "Datadog Archives" %}}

Select the cloud provider you are using to archive your logs.

{{% collapse-content title="Amazon S3" level="h4" %}}

{{% observability_pipelines/destination_settings/datadog_archives %}}

{{% /collapse-content %}}
{{% collapse-content title="Google Cloud Storage" level="h4" %}}

TKTK

{{% /collapse-content %}}
{{% collapse-content title="Azure Storage" level="h4" %}}

TKTK

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
{{< /tabs >}}

### Set up processors

{{% observability_pipelines/processors/intro %}}

{{% observability_pipelines/processors/filter_syntax %}}

{{% observability_pipelines/processors/add_processors %}}

{{< tabs >}}
{{% tab "Filter" %}}

{{% observability_pipelines/processors/filter %}}

{{% /tab %}}
{{% tab "Sample" %}}

{{% observability_pipelines/processors/sample %}}

{{% /tab %}}
{{% tab "Quota" %}}

{{% observability_pipelines/processors/quota %}}

{{% /tab %}}
{{% tab "Dedupe" %}}

{{% observability_pipelines/processors/dedupe %}}

{{% /tab %}}
{{% tab "Edit fields" %}}

{{% observability_pipelines/processors/remap %}}

{{% /tab %}}
{{< /tabs >}}

### Install the Observability Pipelines Worker
1. Select your platform in the **Choose your installation platform** dropdown menu.
1. Enter the Splunk HEC address. This is the address and port where your applications are sending their logging data. The Observability Pipelines Worker listens to this address for incoming logs.
1. Provide the environment variables for each of your selected destinations. See [prerequisites](#prerequisites) for more information.

{{< tabs >}}
{{% tab "Datadog Archives" %}}

Select the cloud provider you are using to archive your logs.

{{% collapse-content title="Amazon S3" level="h4" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives %}}

{{% /collapse-content %}}
{{% collapse-content title="Google Cloud Storage" level="h4" %}}

TKTK

{{% /collapse-content %}}
{{% collapse-content title="Azure Storage" level="h4" %}}

TKTK

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
{{< /tabs >}}

4. Follow the instructions for your environment to install the Worker.
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

{{% observability_pipelines/log_source_configuration/splunk_hec %}}

[1]: https://app.datadoghq.com/observability-pipelines
