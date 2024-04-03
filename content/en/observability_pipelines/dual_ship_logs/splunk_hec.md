---
title: Dual Ship Logs from Splunk HTTP Event Collector (HEC)
kind: document
disable_toc: false
---

## Overview

Configure your Splunk HTTP Event Collectors (HEC) and set up Observability Pipelines so that the Observability Pipelines Worker aggregates and processes the logs coming from your upstream sources before routing them to various applications, including Splunk.

See [Dual Ship Logs from Splunk TCP][1] if you want to ingest logs from Splunk Heavy or Splunk Universal Forwarders.

This document walks you through the following steps to set up dual shipping:

1. The [prerequisites](#prerequisites) needed to set up Observability Pipelines
1. [Setting up Observability Pipelines](#set-up-observability-pipelines)
1. [Routing your logs to the Observability Pipelines Worker](#route-your-logs-to-the-observability-pipelines-worker)

## Prerequisites

{{% observability_pipelines/prerequisites/splunk_hec %}}

## Set up Observability Pipelines

1. Navigate to [Observability Pipelines][1].
1. Select the **Dual Ship Logs** use case to create a new pipeline.
1. Select **Splunk HEC** as the source.

### Set up the source

{{% observability_pipelines/source_settings/splunk_hec %}}

### Set up destinations

{{% observability_pipelines/destination_settings/splunk_hec %}}

{{< tabs >}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_settings/datadog %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/destination_settings/splunk_hec %}}

{{% /tab %}}
{{% tab "Splunk TCP" %}}

{{% observability_pipelines/destination_settings/splunk_tcp %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/destination_settings/sumo_logic %}}

{{% /tab %}}
{{< /tabs >}}

### Set up processors

{{% observability_pipelines/processors/intro %}}

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
{{% tab "Remap" %}}

{{% observability_pipelines/processors/remap %}}

{{% /tab %}}
{{< /tabs >}}

## Install the Observability Pipelines Worker
1. Select your platform in the **Choose your installation platform** dropdown menu.
1. Enter the Splunk HEC address. This is the address and port where your applications are sending their logging data to. The Observability Pipelines Worker listens to this address for incoming logs.
1. Provide the environment variables for each of your selected destinations.
{{< tabs >}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/destination_env_vars/splunk_hec %}}

{{% /tab %}}
{{% tab "Splunk TCP" %}}

{{% observability_pipelines/destination_env_vars/splunk_tcp %}}

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

## Route your logs to the Observability Pipelines Worker

TKTK

[1]: /dual_ship_logs/splunk_tcp/
[2]: https://app.datadoghq.com/observability-pipelines