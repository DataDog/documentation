---
title: Infrastructure List Host Information
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Semantic Mapping > Infrastructure List Host
  Information
sourceUrl: https://docs.datadoghq.com/opentelemetry/mapping/host_metadata/index.html
---

# Infrastructure List Host Information

{% alert level="info" %}
This feature is in Preview. If you have any feedback, contact [Datadog support](https://docs.datadoghq.com/help/).
{% /alert %}

## Overview{% #overview %}

The Datadog exporter supports sending system information about your hosts to Datadog, which you can see in the [Infrastructure List](https://docs.datadoghq.com/infrastructure/list/). You can send this information in OTLP through the ['Resource' field](https://opentelemetry.io/docs/concepts/glossary/#resource) as part of any of the existing signals. This is supported under any [deployment pattern](https://opentelemetry.io/docs/collector/deployment/) including gateway deploys.

Datadog uses [OpenTelemetry semantic conventions](https://opentelemetry.io/docs/concepts/semantic-conventions/) to recognize system information about your hosts. Follow the instructions for [setting up for host metrics](https://docs.datadoghq.com/opentelemetry/collector_exporter/host_metrics) to send the necessary metrics and resource attributes to Datadog. Alternatively, you can manually send this information in the way that best fits your infrastructure.

## Opting in to the feature{% #opting-in-to-the-feature %}

To use this feature, set the `datadog.host.use_as_metadata` resource attribute to `true` in all OTLP payloads that contain information about hosts.

Resources populate the infrastructure list information if they have a [host-identifying attribute](https://docs.datadoghq.com/opentelemetry/schema_semantics/hostname/) and the `datadog.host.use_as_metadata` attribute set to `true`.

To explicitly declare what resources to use for metadata, add the Boolean resource attribute `datadog.host.use_as_metadata` to all resources that have relevant host information.

For example, to set this for all resources in metrics, traces, and logs, use the [transform processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor#transform-processor) with the following configuration:

```yaml
processors:
  transform:
    metric_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
    trace_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
    log_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
```

Add this processor to the `processors` list of all your pipelines.

You must explicitly tag all your resources with a host-identifying attribute. This is done by default by the [recommended setup for host metrics](https://docs.datadoghq.com/opentelemetry/collector_exporter/host_metrics).

## Supported conventions{% #supported-conventions %}

The Datadog exporter supports both resource attribute-level semantic conventions and system metrics-level semantic conventions. Supported resource attribute semantic conventions are mainly under [the `host.` namespace](https://opentelemetry.io/docs/specs/semconv/resource/host/) and [the `os.` namespace](https://opentelemetry.io/docs/specs/semconv/resource/os/). All supported system metrics-level semantic conventions are under [the `system.` namespace](https://opentelemetry.io/docs/specs/semconv/system/system-metrics/).

### General system conventions{% #general-system-conventions %}

| Semantic convention                                                                                          | Type               | In-app field |
| ------------------------------------------------------------------------------------------------------------ | ------------------ | ------------ |
| [*Various host-identifying attributes*](https://docs.datadoghq.com/opentelemetry/schema_semantics/hostname/) | Resource attribute | Hostname     |
| `os.description`                                                                                             | Resource attribute | OS           |

### CPU conventions{% #cpu-conventions %}

| Semantic convention         | Type               | In-app field       |
| --------------------------- | ------------------ | ------------------ |
| `host.cpu.vendor.id`        | Resource attribute | Vendor ID          |
| `host.cpu.model.name`       | Resource attribute | Model Name         |
| `host.cpu.cache.l2.size`    | Resource attribute | Cache Size         |
| `host.cpu.family`           | Resource attribute | Family             |
| `host.cpu.model.id`         | Resource attribute | Model              |
| `host.cpu.stepping`         | Resource attribute | Stepping           |
| `system.cpu.logical.count`  | System metric      | Logical Processors |
| `system.cpu.physical.count` | System metric      | Cores              |
| `system.cpu.frequency`      | System metric      | MHz                |

### Network conventions{% #network-conventions %}

| Semantic convention | Type               | In-app field              |
| ------------------- | ------------------ | ------------------------- |
| `host.ip`           | Resource attribute | IP Address & IPv6 Address |
| `host.mac`          | Resource attribute | Mac Address               |

### Collecting these conventions with the OpenTelemetry Collector{% #collecting-these-conventions-with-the-opentelemetry-collector %}

To collect these conventions with the OpenTelemetry Collector, set up the [recommended setup for host metrics](https://docs.datadoghq.com/opentelemetry/collector_exporter/host_metrics). The host metrics receiver collects all the relevant metrics, while the resource detection processor collects all relevant resource attributes.

**Note:** You need to add these processors and receivers in the Collector running on the host that you want to monitor. A gateway host does not collect this information from remote hosts.

## Further reading{% #further-reading %}

- [OpenTelemetry Support in Datadog](https://docs.datadoghq.com/opentelemetry/)
