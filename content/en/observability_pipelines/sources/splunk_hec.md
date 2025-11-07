---
title: Splunk HTTP Event Collector (HEC) Source
disable_toc: false
---

Use Observability Pipelines' Splunk HTTP Event Collector (HEC) source to receive logs from your Splunk HEC. Select and set up this source when you [set up a pipeline][1].

**Note**: Use the Splunk HEC source if you want to [send logs from the Splunk Distribution of the OpenTelemetry Collector to Observability Pipelines](#send-logs-from-the-splunk-distributor-of-the-opentelemetry-collector-to-observability-pipelines).

## Prerequisites

{{% observability_pipelines/prerequisites/splunk_hec %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

{{% observability_pipelines/source_settings/splunk_hec %}}

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_hec %}}

{{% observability_pipelines/log_source_configuration/splunk_hec %}}

## Send logs from the Splunk Distributor of the OpenTelemetry collector to Observability Pipelines

To send logs from the Splunk Distributor of the OpenTelemetry Collector:

1. Install the Splunk OpenTelemetry Collector based on the your environment:
    - [Kubernetes][2]
    - [Linux][3]
2. Configure the Splunk OpenTelemetry Collector:
    ```bash
    cp /etc/otel/collector/splunk-otel-collector.conf.example etc/otel/collector/splunk-otel-collector.conf
    ```
    ```bash
    # Splunk HEC endpoint URL, if forwarding to Splunk Observability Cloud
    # SPLUNK_HEC_URL=https://ingest.us0.signalfx.com/v1/log
    # If you're forwarding to a Splunk Enterprise instance running on example.com, with HEC at port 8088:
    SPLUNK_HEC_URL=http://0.0.0.0:8088/services/collector
    ```
3. [Set up a pipeline][4] using the [Splunk HEC source](#set-up-the-source-in-the-pipeline-ui).

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: https://help.splunk.com/en/splunk-observability-cloud/manage-data/splunk-distribution-of-the-opentelemetry-collector/get-started-with-the-splunk-distribution-of-the-opentelemetry-collector/collector-for-kubernetes
[3]: https://help.splunk.com/en/splunk-observability-cloud/manage-data/splunk-distribution-of-the-opentelemetry-collector/get-started-with-the-splunk-distribution-of-the-opentelemetry-collector/collector-for-linux
[4]: /observability_pipelines/configuration/set_up_pipelines
