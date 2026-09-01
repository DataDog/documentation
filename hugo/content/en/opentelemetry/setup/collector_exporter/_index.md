---
title: Install and Configure the OpenTelemetry Collector
description: 'Send OpenTelemetry data from the OpenTelemetry Collector to Datadog using OTLP'
further_reading:
- link: "/opentelemetry/setup/ddot_collector/install/"
  tag: "Documentation"
  text: "Install the DDOT Collector (Recommended)"
- link: "/opentelemetry/compatibility/"
  tag: "Documentation"
  text: "Feature Compatibility"
---

## Overview

This page provides guides for installing and configuring a standalone OpenTelemetry Collector to send telemetry data to Datadog. The recommended configurations use the agent deployment pattern, with one Collector on each host or Kubernetes node.

This method is best for users who prefer to use OTel Collector distributions from the OpenTelemetry open source community or require advanced processing capabilities not available in other setups. For most use cases the [Datadog Distribution of OTel Collector (DDOT)][1] is the recommended approach.

## Setup

To begin, install the OpenTelemetry Collector Contrib distribution and configure the OTLP HTTP exporter and `span_metrics` connector. This guide walks you through the initial setup required before proceeding to more specific configuration topics.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/install" >}}
    <h3>Install and Configure the Collector</h3>
    Follow the initial setup steps to send telemetry from the Collector to Datadog over OTLP.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Configuration

After your Collector is running, use these guides to configure specific receivers and processors to collect and enrich your telemetry data.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/config/hostname_tagging" >}}
    <h3>Configure Hostname and Tagging</h3>
    Use resource detection and Kubernetes attributes processors to ensure proper hostname resolution and apply critical tags for correlating telemetry in Datadog.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/log_collection" >}}
    <h3>Set up Log Collection</h3>
    Configure the filelog receiver to collect logs from files and forward them to Datadog, enabling unified logs, metrics, and traces.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/otlp_receiver" >}}
    <h3>Enable the OTLP Receiver</h3>
    Configure the OTLP receiver to accept traces, metrics, and logs from your OpenTelemetry-instrumented applications over gRPC or HTTP.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/collector_batch_memory" >}}
    <h3>Configure Memory Limits</h3>
    Protect the Collector from out-of-memory failures by configuring the memory limiter in each pipeline.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Existing Datadog Exporter and Connector configurations

The Datadog Exporter and Datadog Connector remain fully supported. Existing configurations do not need to migrate. To configure or maintain this setup, see [Configure the Datadog Exporter and Connector][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/setup/ddot_collector/install/
[2]: /opentelemetry/setup/collector_exporter/datadog_exporter/
