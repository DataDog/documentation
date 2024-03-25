---
title: Dual Ship Logs from Splunk HEC
kind: documentation
disable_toc: false
---

## Overview

Configure your Splunk HTTP Event Collectors (HEC) so that the Observability Pipelines Worker processes the collected logs before routing them to various applications. These applications could be a SIEM product, archives, or another vendor as part of a vendor migration workflow. See [Dual Ship Logs from Splunk TCP][1] if you want to use Splunk Heavy/Universal Forwarders.

This document walks you through the following steps to set up dual shipping:

1. Set up the Splunk index
1. Set up a pipeline in Observability Pipelines
1. Install the Observability Pipelines Worker
1. Connect your Splunk collector to the Observability Pipelines Worker

## Set up the Splunk index

<div class="alert alert-info">Observability Pipelines supports acknowledgments when you enable the <strong>Enable Indexer Acknowledgments</strong> setting on the input. Indexer acknowledgement is only available for Splunk Enterprise</div>

You must provision a Splunk HEC input and HEC token on the Splunk index so that the Observability Pipelines Worker can send logs to Splunk. If you don't have one set up, follow the instructions in the [Configure HTTP Event Collector on Splunk Cloud Platform][2] section.

After configuring the HTTP Event Collector, use the Splunk HEC token to set up Observability Pipelines.

For existing HEC configurations, you can get this token from the Splunk app:
1. In Splunk, navigate to **Settings** > **Data Inputs**.
1. Go to the **HTTP Event Collector** tab
1. Copy the **Token Value** from your target collector.

## Set up a pipeline for a Splunk HEC source

1. Navigate to [Observability Pipelines][LINK].
1. Select the **Dual Ship Logs** use case to create a new pipeline.
1. Select **Splunk HEC** as the source.

### Add processors

There are pre-selected processors and you can add additional processors for your use case. The order of the processors is important because a log can match multiple filters. Click on the drag handle icon on the top left corner of the processor to reorder it. The following processors are available:

{{< tabs >}}
{{% tab "Filter" %}}

Add a query to filter your logs.

{{% /tab %}}
{{% tab "Sampler" %}}

1. Add a query to filter your logs
1. Enter the percent of logs to sample.

{{% /tab %}}
{{% tab "Quota" %}}

1. Add a query to filter your logs.
1. Select in the **Unit for quota** dropdown menu if you want to determine the quota by events or volume.
1. Set the daily quota limit and select the unit of measurement.
1. Uncheck **Drop fields** if you want to…TKTK

{{% /tab %}}
{{% tab "Edit field" %}}

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

### Add the destinations for your logs

1. Select the destinations for your logs.
1. If applicable, enter the information for the destinations selected:
{{< tabs >}}
{{% tab "Splunk HEC" %}}

3. Enter the Splunk index.
4. In the **Encoding** dropdown menu, select whether you want to encode in **JSON** or **Raw**.
5. Check the box if you want to auto extract the timestamp.
6. Enter the `sourcetype`.

{{% /tab %}}
{{% tab "Splunk TCP" %}}

TKTK

{{% /tab %}}

{{% tab "Sumo Logic" %}}

This destination will be configured through environment variables in the Worker deployment step.

{{% /tab %}}
{{% tab "Datadog" %}}

Secrets will be set (for example, the Datadog API Key) when you install the OP Worker.

{{% /tab %}}
{{< /tabs >}}

## Install the Observability Pipelines Worker

1. Select your platform in the **Choose your installation platform** dropdown menu.
1. Enter the Splunk HEC address. The Observability Pipelines Worker listens on the this port address for logs originally intended for the Splunk indexer. See [Connect Splunk HEC to the Observability Pipelines Worker](#connect-splunk-hec-to-the-observability-pipelines-worker) for instructions on how to direct the Splunk HEC to the Worker. The Splunk HEC address is stored in the `DD_OP_SOURCE_SPLUNK_HEC_ADDRESS` environment variable.
1. Provide the environment variables for each of your selected destinations.
{{< tabs >}}
{{% tab "Splunk HEC" %}}
1. Enter the Splunk HEC token, which is typically in UUID format. This information is stored in the `DD_OP_DESTINATION_SPLUNK_HEC_TOKEN` environment variable.
1. Enter the Splunk HEC endpoint URL in the **Splunk HEC address** field.    
    - Make sure to specify the port. If you are using Splunk Cloud, this is an example URL: `https://<your_account>.splunkcloud.com:8088`.  The Observability Pipelines Worker listens on this port for logs originally intended for the Splunk indexer. See [Send Data to HTTP Event Collector][1] for more information.   
    - If you are using Splunk on-premises, then check the port here under **global settings**.
    - **Note**: `/services/collector/event` is automatically appended to the endpoint.   
    - The Splunk HEC endpoint URL is stored in the `DD_OP_DESTINATION_SPLUNK_HEC_ENDPOINT` environment variable.   

[1]: https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector#Send_data_to_HTTP_Event_Collector

{{% /tab %}}
{{% tab "Splunk TCP" %}}

TKTK

{{% /tab %}}
{{% tab "Sumo Logic" %}}

Enter the Sumo Logic HTTP collector URL.

For example, `https://<sumo_endpoint>/reciever/v1/http/<unique_http_collector_code`. Replace the placeholders with the following:   
        - `<sumo_endpoint>` with your Sumo Logic collection endpoint.   
        - `<unique_http_collector_code>` with the string that follows the last forward slash (`/`) in the upload URL for the HTTP source.

{{% /tab %}}
{{% tab "Datadog" %}}

TKTK

{{% /tab %}}
{{% tab "Datadog Log Archives" %}}

1. Enter the name of the S3 archive bucket you created earlier.
1. Enter the AWS region of the target service.
1. Enter the AWS access key ID of the S3 archive bucket you created earlier
1. Enter the AWS secret access key of your S3 archive bucket.

{{% /tab %}}
{{< /tabs >}}
3. Follow the instructions for your environment to install the Worker.
{{< tabs >}}
{{% tab "Docker" %}}

1. Click **Select an API key** to choose the Datadog API key you want to use.
1. Run the command automatically provided in the UI to install the Worker. The command is automatically populated with the environment variables you entered earlier.
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.

{{% /tab %}}
{{% tab "Amazon EKS" %}}

1. Download the [Helm chart values file][1] for Amazon EKS.
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
1. Navigate back to the Observability Pipelines installation page. Click **Deploy**.

[1]: /resources/yaml/observability_pipelines/v2/setup/aws_eks.yaml
[2]: /getting_started/site/
{{% /tab %}}
{{% tab "Azure AKS" %}}

1. Download the [Helm chart values file][1] for Azure AKS.
1. In the Helm chart values file, replace `site` with {{< region-param key="dd_site" code="true" >}}. Make sure you have the correct site region selected in the upper right side of the page to show the site region URL you need to use. See [Datadog Site][2] for more information.
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
        -f azure_aks.yaml
    ```
1. Navigate back to the Observability Pipelines installation page. Click **Deploy**.

[1]: /resources/yaml/observability_pipelines/v2/setup/azure_aks.yaml
[2]: /getting_started/site/
{{% /tab %}}
{{% tab "Google GKE" %}}

1. Download the [Helm chart values file][1] for Google GKE.
1. In the Helm chart values file, replace `site` with {{< region-param key="dd_site" code="true" >}}. Make sure you have the correct site region selected in the upper right side of the page to show the site region URL you need to use. See [Datadog Site][2] for more information.
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
        -f google_gke.yaml
    ```
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.

[1]: /resources/yaml/observability_pipelines/v2/setup/google_gke.yaml
[2]: /getting_started/site/
{{% /tab %}}
{{% tab "Linux" %}}

1. Click **Select an API key** to choose the Datadog API key you want to use.
1. Run the command automatically provided in the UI to install the Worker. The command is automatically populated with the environment variables you entered earlier.
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.

{{% /tab %}}
{{% tab "CloudFormation" %}}

TKTK
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

TKTK

{{% /tab %}}
{{< /tabs >}}

## Connect Splunk HEC to the Observability Pipelines Worker

TKTK

[1]: /obs_pipelines/dual_ship_logs_for_splunk_tcp
[2]: https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector