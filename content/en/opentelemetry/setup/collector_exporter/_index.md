---
title: OpenTelemetry Collector
description: 'Send OpenTelemetry data to Datadog using the OpenTelemetry Collector'
further_reading:
- link: "/opentelemetry/setup/ddot_collector/install/"
  tag: "Documentation"
  text: "Install the DDOT Collector"
- link: "/opentelemetry/compatibility/"
  tag: "Documentation"
  text: "Feature Compatibility"
---

## Overview

You can use a standalone OpenTelemetry Collector to send traces, metrics, and logs to Datadog without the Datadog Exporter or Datadog Connector. This setup uses the [OpenTelemetry Collector Contrib][1] distribution with the OTLP HTTP exporter and the span metrics connector to send data directly to Datadog's OTLP intake endpoints.

This method is best for teams that want a vendor-neutral data pipeline using standard OpenTelemetry protocols and processors.

## Setup

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/install" >}}
    <h3>Install and Configure the Collector</h3>
    Set up the OpenTelemetry Collector with the recommended configuration for sending data to Datadog.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/deploy" >}}
    <h3>Deploy the Collector</h3>
    Deploy the Collector on a host, in Docker, or as a DaemonSet in Kubernetes.
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
    Configure the filelog receiver to collect logs from files and forward them to Datadog.
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

[1]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
