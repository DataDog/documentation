---
disable_toc: false
title: Archive Logs for the Sumo Logic Hosted Collector HTTP Logs Source
---

## 概要

Configure your Sumo Logic Hosted Collector HTTP Logs source so that the Observability Pipelines Worker formats the logs collected into a Datadog-rehydratable format before routing them to Datadog Log Archives.

{{< img src="observability_pipelines/use_cases/archive_logs.png" alt="The log sources, processors, and destinations available for this use case" width="100%" >}}

This document walks you through the following steps:
1. The [prerequisites](#prerequisites) needed to set up Observability Pipelines
1. [Configuring a Log Archive](#configure-a-log-archive)
1. [Setting up Observability Pipelines](#set-up-observability-pipelines)
1. [Sending logs to the Observability Pipelines Worker over Sumo Logic HTTP Source](#send-logs-to-the-observability-pipelines-worker-over-sumo-logic-http-source)

## 前提条件

{{% observability_pipelines/prerequisites/sumo_logic %}}

{{% observability_pipelines/configure_log_archive/instructions %}}

{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/configure_log_archive/docker %}}


{{% /tab %}}
{{% tab "Amazon EKS" %}}

{{% observability_pipelines/configure_log_archive/amazon_eks %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/configure_log_archive/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/configure_log_archive/linux_rpm %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/configure_log_archive/connect_s3_to_datadog_log_archives %}}

## 観測可能性パイプラインを設定する

1. Navigate to [Observability Pipelines][1].
1. Select the **Archive Logs** template to create a new pipeline.
1. Select **Sumo Logic** as the source.

### Set up the source

{{% observability_pipelines/source_settings/sumo_logic %}}

### Set up the destinations

Enter the following information based on your selected logs destination.

{{< tabs >}}
{{% tab "Datadog Archives" %}}

{{% observability_pipelines/destination_settings/datadog_archives %}}

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
{{% tab "Sensitive Data Scanner" %}}

{{% observability_pipelines/processors/sensitive_data_scanner %}}

{{% /tab %}}
{{< /tabs >}}

### 観測可能性パイプラインワーカーのインストール
1. Select your platform in the **Choose your installation platform** dropdown menu.
1. Enter the Sumo Logic address. This is the address and port where your applications are sending their logging data. The Observability Pipelines Worker listens to this address for incoming logs.
1. Provide the environment variables for each of your selected destinations. See [prerequisites](#prerequisites) for more information.
{{< tabs >}}
{{% tab "Datadog Archives" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives %}}

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

{{% observability_pipelines/log_source_configuration/sumo_logic %}}

[1]: https://app.datadoghq.com/observability-pipelines