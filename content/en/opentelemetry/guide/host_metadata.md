---
title: Mapping OpenTelemetry semantic conventions to Infrastructure List host information
kind: guide
further_reading:
- link: "/opentelemetry/"
  tag: "Documentation"
  text: "OpenTelemetry Support in Datadog"
---

<div class="alert alert-warning">
This feature is in public beta. If you have any feedback, contact <a href="https://docs.datadoghq.com/help/">Datadog support</a>.
</div>

## Overview

The Datadog exporter supports sending system information about your hosts to Datadog, which you can see at the [Infrastructure List][6] tab. You can send this information in OTLP via the ['Resource' field][1] as part of any of the existing signals. This is supported under any [deployment pattern][9] including gateway deploys. 

We use [OpenTelemetry semantic conventions][2] to recognize system information about your hosts. You can use the [recommended setup for host metrics][3] to send the necessary metrics and resource attributes to Datadog or manually set this information in the way that best fits your infrastructure.

During the **public beta** you need to opt-in by setting the `datadog.host.use_as_metadata` resource attribute to `true` in all OTLP payloads with information relevant about hosts.

## How to opt-in to this feature?

Resources are used to populate the infrastructure list information if they have a [host-identifying attribute][10] and the `datadog.host.use_as_metadata` attribute set to `true`.

To explicitly declare what resources should be used for metadata, add a boolean-valued resource attribute called `datadog.host.use_as_metadata` to all resources that have relevant host information.

For example, to set this for all resources in metrics, traces and logs, you can use the [transform processor][7] with the following configuration:

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

Lastly, add this processor to the `processors` list of all your pipelines.

You also need to explicitly tag all your resources with a host-identifying attribute. This is done by default by the [recommended setup for host metrics][3].

## What conventions are supported?

The Datadog exporter supports both resource attribute-level semantic conventions as well as system metrics-level semantic conventions. Supported resource attribute semantic conventions are mainly under [the `host.` namespace][4] and [the `os.` namespace][8]. All supported system metrics-level semantic conventions are under [the `system.` namespace][5].

The following general system conventions are supported:

| Semantic convention | Type               | In-app field |
|---------------------|--------------------|--------------|
| [*Various*][10]     | Resource attribute | Hostname     |
| `os.description`    | Resource attribute | OS           |

The following CPU related conventions are supported:

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

The following network related conventions are supported:

| Semantic convention | Type               | In-app field              |
|---------------------|--------------------|---------------------------|
| `host.ip`           | Resource attribute | IP Address & IPv6 Address |
| `host.mac`          | Resource attribute | Mac Address               |

### How to collect these conventions with the OpenTelemetry Collector?

To collect these conventions with the OpenTelemetry Collector, you need to set up the [recommended setup for host metrics][3]. The host metrics receiver will collect all the relevant metrics, while the resource detection processor will collect all relevant resource attributes.

Note that you will need to use these processors and receivers in the host that you want to monitor. A gateway host will not be able to collect this information from remote hosts.

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
[10]: /metrics/open_telemetry/otlp_metric_types/?tab=sum#hostname-resolution
