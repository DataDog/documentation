---
title: Dual Ship Logs from Splunk HEC
kind: documentation
disable_toc: false
---

## Overview

The Observability Pipelines Worker can dual ship your logs to Splunk and Datadog. You can configure your Splunk HTTP Event Collectors (HEC) to send logs to the Worker to dual ship them to Splunk and Datadog. See [Dual Ship Logs with Splunk TCP][1] if you want to use Splunk Heavy/Universal Forwarders.

This document walks you through the following steps:

1. Set up the Splunk index
1. Set up Observability Pipelines
1. Connect Splunk to the Observability Pipelines Worker

## Set up the Splunk index

<div class="alert alert-info">Observability Pipelines supports acknowledgments when you enable the <strong>Enable Indexer Acknowledgments</strong> setting on the input. Indexer acknowledgement is only available for Splunk Enterprise</div>

You must provision a Splunk HEC input and HEC token on the Splunk index so that the Observability Pipelines Worker can send logs to Splunk. Follow the instructions in the [Configure HTTP Event Collector on Splunk Cloud Platform][2] section.

After configuring the HTTP Event Collector, use the Splunk HEC token to set up Observability Pipelines.

## Set up Observability Pipelines

To build a pipeline:

1. Navigate to [Observability Pipelines][LINK].
1. Select the **Dual Ship Logs** use case to create a new pipeline.

### Add the log source

1. Select **Splunk HEC** as the source.
1. Enter the Splunk HEC endpoint in the Splunk HEC **Address** field. For example `https://<your_account>.splunkcloud.com:8088/services/collector/event`. See Send Data to HTTP Event Collector for more information.

### Add processors

There are pre-selected processors and you can add additional processors for your use case. The following processors are available:

{{< tabs >}}
{{% tab "Filter" %}}

Add a query to filter your logs.

{{% /tab %}}
{{% tab "Sampler" %}}

1. Add a query to filter your logs
1. Enter the percent of logs to sample.

{{% /tab %}}
{{% tab "Quota" %}}

1. Add a query to filter you logs.
1. Select in the **Enforce by** dropdown menu how do you want to determine the quota.
1. Enter the daily quota limit.

{{% /tab %}}
{{% tab "Remap" %}}

Select one of the following type of reamp in the dropdown menu: **add field**, **drop field**, or **rename field**.

#### Add a field
For the **Add field** remap:

1. Select the field.
1. Add a query.
1. Enter the key and value you want to add.

#### Drop a field

For the **Drop** remap:
1. Add a query to filter to logs.
1. Enter the key you want to drop.

#### Rename a field
For the **Rename** remap:
1. Add a query to filter the logs.
1. Enter the key that you want to remap.
1. Enter the key that you want the original key to be remapped to.
1. If you to do not want to keep the original source tag, uncheck **Preserve source tag**.

{{% /tab %}}
{{< /tabs >}}

### Configure the destinations for your logs

1. Select **Splunk HEC** and **Datadog** for the destination.
1. Enter in the Splunk endpoint URL. 

## Install the Observability Pipelines Worker

Select your platform in the **Choose your installation platform** dropdown menu.

{{< tabs >}}
{{% tab "Docker" %}}

**[INSTRUCTIONS ARE WIP]**

1. Enter the Splunk HEC token ino the **Splunk_Token** field.
1. Enter the Splunk HEC endpoint in the Splunk HEC **Address** field. For example `https://<your_account>.splunkcloud.com:8088/services/collector/event`. See Send Data to HTTP Event Collector for more information.
1. Click **Select an API key** to choose the Datadog API key you want to use.
1. Run the provided command to install the Worker.
1. Run the following command to start the worker:

```
sudo systemctl restart observability-pipelines-worker
```

{{% /tab %}}
{{% tab "AWS EKS" %}}

1. Download the [Helm chart values file][link] for AWS EKS.
1. In the Helm chart values file, replace `site` with {{< region-param key="dd_site" code="true" >}}. Make sure you have the correct site region selected in the upper right side of the page to show the site URL you need to use. See [Datadog Site][2] for more information.
1. To install the Worker, run the following commands:

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```

    ```shell
    helm repo update
    ```

    ```shell
    helm upgrade --install \
        opw datadog/observability-pipelines-worker \
        -f aws_eks.yaml
    ```

[2]: /getting_started/site/

{{% /tab %}}
{{% tab "Azure AKS" %}}

TKTK

{{% /tab %}}
{{% tab "Google GKE" %}}

TKTK

{{% /tab %}}
{{% tab "Linux (APT)" %}}

TKTK

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

TKTK

{{% /tab %}}
{{% tab "CloudFormation" %}}

TKTK
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

TKTK

{{% /tab %}}
{{< /tabs >}}

[1]: /obs_pipelines/dual_ship_logs_for_splunk_tcp
[2]: https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector