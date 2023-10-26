---
title: Send metrics with Micrometer
kind: Guide
further_reading:
- link: "https://micrometer.io/docs/registry/otlp"
  tag: "Micrometer"
  text: "Micrometer OTLP"
- link: "https://micrometer.io/docs/registry/prometheus"
  tag: "Micrometer"
  text: "Micrometer Prometheus"
---

## Overview

[Micrometer][1] is a vendor-neutral interface that allows access to metrics with the ability to analyze them across their dimensions. Often used with a Java Spring Boot application as an abstraction layer to submit metrics.

Micrometer offers multiple ways to integrate with Datadog. This guide outlines Datadog's recommended options to use with the Agent to send metrics to Datadog.

## OpenTelemetry

OpenTelemetry Protocol (OTLP) Ingestion by the Datadog Agent allows you to take advantage of observability feature in the Datadog Agent.

{{< whatsnext desc="See the configuration outlined in the following documentation:" >}}
    {{< nextlink href="/opentelemetry/otlp_ingest_in_the_agent/" >}}OTLP Ingestion by the Datadog Agent{{< /nextlink >}}
{{< /whatsnext >}}

## Prometheus and OpenMetrics

Use the Prometheus or OpenMetrics integrations to send your application metrics to Datadog. 

{{< whatsnext desc="See the configuration outlined in the following documentation:" >}}
    {{< nextlink href="/integrations/guide/prometheus-host-collection/#overview" >}}Prometheus and OpenMetrics metrics collection from a host{{< /nextlink >}}
    {{< nextlink href="/containers/kubernetes/prometheus/?tab=kubernetesadv2" >}}Kubernetes Prometheus and OpenMetrics metrics collection{{< /nextlink >}}
    {{< nextlink href="/containers/docker/prometheus/?tab=standard" >}}Docker Prometheus and OpenMetrics metrics collection{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://micrometer.io/