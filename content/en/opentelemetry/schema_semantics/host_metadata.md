---
title: Mapping OpenTelemetry Semantic Conventions to Infrastructure List Host Information
kind: documentation
aliases:
- /opentelemetry/guide/host_metadata/
further_reading:
- link: "/opentelemetry/"
  tag: "Documentation"
  text: "OpenTelemetry Support in Datadog"
---

<div class="alert alert-info">
This feature is in beta. If you have any feedback, contact <a href="/help/">Datadog support</a>.
</div>

## Overview

The Datadog exporter supports sending system information about your hosts to Datadog, which you can see in the [Infrastructure List][6]. You can send this information in OTLP through the ['Resource' field][1] as part of any of the existing signals. This is supported under any [deployment pattern][9] including gateway deploys. 

Datadog uses [OpenTelemetry semantic conventions][2] to recognize system information about your hosts. Follow the instructions for [setting up for host metrics][3] to send the necessary metrics and resource attributes to Datadog. Alternatively, you can manually send this information in the way that best fits your infrastructure.

## Opting in to the feature

To opt into the **public beta**, set the `datadog.host.use_as_metadata` resource attribute to `true` in all OTLP payloads that contain information about hosts.

Resources populate the infrastructure list information if they have a [host-identifying attribute][10] and the `datadog.host.use_as_metadata` attribute set to `true`.

To explicitly declare what resources to use for metadata, add the Boolean resource attribute `datadog.host.use_as_metadata` to all resources that have relevant host information.

For example, to set this for all resources in metrics, traces, and logs, use the [transform processor][7] with the following configuration:

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

You must explicitly tag all your resources with a host-identifying attribute. This is done by default by the [recommended setup for host metrics][3].

## Supported conventions

The Datadog exporter supports both resource attribute-level semantic conventions and system metrics-level semantic conventions. Supported resource attribute semantic conventions are mainly under [the `host.` namespace][4] and [the `os.` namespace][8]. All supported system metrics-level semantic conventions are under [the `system.` namespace][5].

### General system conventions

| Semantic convention                         | Type               | In-app field |
|---------------------------------------------|--------------------|--------------|
| [*Various host-identifying attributes*][10] | Resource attribute | Hostname     |
| `os.description`                            | Resource attribute | OS           |

### CPU conventions

| Semantic convention         | Type               | In-app field       |
|-----------------------------|--------------------|--------------------|
| `host.cpu.vendor.id`        | Resource attribute | Vendor ID          |
| `host.cpu.model.name`       | Resource attribute | Model Name         |
| `host.cpu.cache.l2.size`    | Resource attribute | Cache Size         |
| `host.cpu.family`           | Resource attribute | Family             |
| `host.cpu.model.id`         | Resource attribute | Model              |
| `host.cpu.stepping`         | Resource attribute | Stepping           |
| `system.cpu.logical.count`  | System metric      | Logical Processors |
| `system.cpu.physical.count` | System metric      | Cores              |
| `system.cpu.frequency`      | System metric      | MHz                |

### Network conventions

| Semantic convention | Type               | In-app field              |
|---------------------|--------------------|---------------------------|
| `host.ip`           | Resource attribute | IP Address & IPv6 Address |
| `host.mac`          | Resource attribute | Mac Address               |

### Collecting these conventions with the OpenTelemetry Collector

To collect these conventions with the OpenTelemetry Collector, set up the [recommended setup for host metrics][3]. The host metrics receiver collects all the relevant metrics, while the resource detection processor collects all relevant resource attributes.

**Note:** You need to add these processors and receivers in the Collector running on the host that you want to monitor. A gateway host does not collect this information from remote hosts.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/concepts/glossary/#resource
[2]: https://opentelemetry.io/docs/concepts/semantic-conventions/
[3]: /opentelemetry/collector_exporter/host_metrics
[4]: https://opentelemetry.io/docs/specs/semconv/resource/host/
[5]: https://opentelemetry.io/docs/specs/semconv/system/system-metrics/
[6]: /infrastructure/list/
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor#transform-processor
[8]: https://opentelemetry.io/docs/specs/semconv/resource/os/
[9]: https://opentelemetry.io/docs/collector/deployment/
[10]: /opentelemetry/schema_semantics/hostname/
