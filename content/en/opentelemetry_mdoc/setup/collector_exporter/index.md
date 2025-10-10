---
title: Install and Configure the OpenTelemetry Collector
description: Send OpenTelemetry data to the OpenTelemetry Collector and Datadog Exporter
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Send OpenTelemetry Data to Datadog > Install
  and Configure the OpenTelemetry Collector
sourceUrl: https://docs.datadoghq.com/opentelemetry/setup/collector_exporter/index.html
---

# Install and Configure the OpenTelemetry Collector

## Overview{% #overview %}

This page provides guides for installing and configuring a standalone OpenTelemetry Collector to send telemetry data to Datadog.

This method is best for users who prefer to use OTel Collector distributions from the OpenTelemetry open source community or require advanced processing capabilities not available in other setups. For most use cases the [Datadog Distribution of OTel Collector (DDOT)](https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/) is the recommended approach.

## Setup{% #setup %}

To begin, install the OpenTelemetry Collector and configure it with the Datadog Exporter. This guide walks you through the initial setup required before proceeding to more specific configuration topics.

- [
  ### Install and Configure the Collector
Follow the initial setup steps to get a Collector running with the Datadog Exporter.](https://docs.datadoghq.com/opentelemetry/setup/collector_exporter/install)

## Configuration{% #configuration %}

After your Collector is running, use these guides to configure specific receivers and processors to collect and enrich your telemetry data.

- [
  ### Deploy the Collector
Learn how to run the Collector in various environments, including on a host, in Docker, or as a DaemonSet or Gateway in Kubernetes.](https://docs.datadoghq.com/opentelemetry/setup/collector_exporter/deploy)
- [
  ### Configure Hostname and Tagging
Use resource detection and Kubernetes attributes processors to ensure proper hostname resolution and apply critical tags for correlating telemetry in Datadog.](https://docs.datadoghq.com/opentelemetry/config/hostname_tagging)
- [
  ### Set up Log Collection
Configure the filelog receiver to collect logs from files and forward them to Datadog, enabling unified logs, metrics, and traces.](https://docs.datadoghq.com/opentelemetry/config/log_collection)
- [
  ### Enable the OTLP Receiver
Configure the OTLP receiver to accept traces, metrics, and logs from your OpenTelemetry-instrumented applications over gRPC or HTTP.](https://docs.datadoghq.com/opentelemetry/config/otlp_receiver)
- [
  ### Tune Batch and Memory Settings
Optimize your Collector's performance and resource consumption by configuring the batch processor and memory limiter.](https://docs.datadoghq.com/opentelemetry/config/collector_batch_memory)

## Further Reading{% #further-reading %}

- [Install the DDOT Collector (Recommended)](https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/)
- [Feature Compatibility](https://docs.datadoghq.com/opentelemetry/compatibility/)
