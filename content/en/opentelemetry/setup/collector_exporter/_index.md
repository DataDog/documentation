---
title: Install and Configure the OpenTelemetry Collector
description: 'Send OpenTelemetry data to the OpenTelemetry Collector and Datadog Exporter'
further_reading:
- link: "/opentelemetry/setup/ddot_collector/install/"
  tag: "Documentation"
  text: "Install the DDOT Collector (Recommended)"
- link: "/opentelemetry/compatibility/"
  tag: "Documentation"
  text: "Feature Compatibility"
---

## Overview

This page provides guides for installing and configuring a standalone OpenTelemetry Collector to send telemetry data to Datadog.

This method is best for users who prefer to use OTel Collector distributions from the OpenTelemetry open source community or require advanced processing capabilities not available in other setups. For most use cases the [Datadog Distribution of OTel Collector (DDOT)][1] is the recommended approach.

## Setup

To begin, install the OpenTelemetry Collector and configure it with the Datadog Exporter. This guide walks you through the initial setup required before proceeding to more specific configuration topics.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/install" >}}
    <h3>Install and Configure the Collector</h3>
    Follow the initial setup steps to get a Collector running with the Datadog Exporter.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Configuration

After your Collector is running, use these guides to configure specific receivers and processors to collect and enrich your telemetry data.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/deploy" >}}
    <h3>Deploy the Collector</h3>
    Learn how to run the Collector in various environments, including on a host, in Docker, or as a DaemonSet or Gateway in Kubernetes.
    {{< /nextlink >}}
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
    <h3>Tune Batch and Memory Settings</h3>
    Optimize your Collector's performance and resource consumption by configuring the batch processor and memory limiter.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/setup/ddot_collector/install/
