---
title: OpAMP Extension
description: "Use the OpenTelemetry OpAMP extension to view OpenTelemetry Collector configuration and health in Fleet Automation."
further_reading:
- link: "/opentelemetry/integrations/datadog_extension/"
  tag: "Documentation"
  text: "Datadog Extension"
- link: "/opentelemetry/integrations/collector_health_metrics/"
  tag: "Documentation"
  text: "Collector Health Metrics"
- link: "/opentelemetry/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation for OpenTelemetry Collectors"
- link: "https://opentelemetry.io/docs/specs/opamp/"
  tag: "External Site"
  text: "Open Agent Management Protocol (OpAMP) specification"
---

**[Placeholder: Release stage of the OpAMP extension in Datadog, and a Preview label or request form if it applies.]**

## Overview

The [OpenTelemetry OpAMP extension][1] connects an OpenTelemetry (OTel) Collector to Datadog with the [Open Agent Management Protocol (OpAMP)][2]. The Collector reports its configuration, health, and available components, and you can view them in [Fleet Automation][3].

The OpAMP extension is an alternative to the [Datadog Extension][4]. Datadog recommends the Datadog Extension, because the OpAMP extension doesn't support:

- The [Topology view][5] in Fleet Automation
- Remote configuration of the Collector

The OpAMP extension is part of OpenTelemetry Collector Contrib. It's included in the contrib and k8s distributions of the OpenTelemetry Collector, and you can add it to [custom builds][6].

<div class="alert alert-info">If you use the <a href="/opentelemetry/setup/ddot_collector/">DDOT Collector</a>, you don't need the OpAMP extension. The Datadog Extension is enabled automatically in the DDOT Collector.</div>

## Setup

**[Placeholder: Minimum OpenTelemetry Collector Contrib version.]**

### 1. Add the OpAMP extension to your Collector configuration

Add the `opamp` extension and list it under `service.extensions`:

```yaml
extensions:
  opamp:
    server:
      http:
        endpoint: ${env:DD_OPAMP_ENDPOINT}
        headers:
          DD-API-KEY: ${env:DD_API_KEY}
    instance_uid: ${env:OTELCOL_INSTANCE_UID}

service:
  extensions: [opamp]
```

Set the following environment variables:

- `DD_OPAMP_ENDPOINT`: The Datadog OpAMP endpoint. **[Placeholder: Endpoint URL, and whether it differs by Datadog site.]**
- `DD_API_KEY`: Your [Datadog API key][7].
- `OTELCOL_INSTANCE_UID`: A stable identifier for this Collector. See [Set a stable Collector identity](#2-set-a-stable-collector-identity).

The extension's `reports_health`, `reports_effective_config`, and `reports_available_components` capabilities are on by default. Don't turn them off. Fleet Automation uses them as follows:

| Capability | Used for | If you turn it off |
|---|---|---|
| `reports_health` | Collector health in Fleet Automation | Fleet Automation shows no health issues for the Collector. |
| `reports_effective_config` | The Collector's configuration and recommendations based on it | Recommendations that depend on the configuration don't appear. |
| `reports_available_components` | Recommendations based on the Collector's components and versions | Recommendations that depend on components don't appear. |

### 2. Set a stable Collector identity

Fleet Automation identifies each Collector by its OpAMP `instance_uid`. If you don't set `instance_uid`, the extension generates a new one each time the Collector starts, and each restart appears in Fleet Automation as a new Collector.

To keep one record per Collector, set `instance_uid` to a UUIDv7 that is unique to each Collector and stays the same across restarts.

**[Placeholder: How to generate and persist `instance_uid`, for example on Kubernetes.]**

Optionally, set the Collector's `service.instance.id` resource attribute to the same value. The Collector's internal telemetry then uses the same identity as Fleet Automation:

```yaml
service:
  telemetry:
    resource:
      service.instance.id: ${env:OTELCOL_INSTANCE_UID}
```

### 3. Send the Collector's internal telemetry

Send the Collector's internal metrics to Datadog to monitor Collector health and pipeline throughput. Datadog recommends pushing them directly to the OTLP metrics intake endpoint. Scraping them with the Prometheus receiver is an alternative. For both setups, see [Collector Health Metrics][8].

## Complete configuration example

The following example combines the OpAMP extension with internal telemetry sent to the [Datadog OTLP metrics intake endpoint][9]:

```yaml
extensions:
  opamp:
    server:
      http:
        endpoint: ${env:DD_OPAMP_ENDPOINT}
        headers:
          DD-API-KEY: ${env:DD_API_KEY}
    instance_uid: ${env:OTELCOL_INSTANCE_UID}

service:
  extensions: [opamp]
  telemetry:
    resource:
      service.instance.id: ${env:OTELCOL_INSTANCE_UID}
    metrics:
      readers:
        - periodic:
            interval: 10000
            exporter:
              otlp:
                protocol: http/protobuf
                endpoint: ${env:DD_OTLP_METRICS_ENDPOINT}
                temporality_preference: delta
                headers:
                  - name: dd-api-key
                    value: ${env:DD_API_KEY}
```

Set `DD_OTLP_METRICS_ENDPOINT` to the OTLP metrics intake endpoint for your [Datadog site][10]: {{< region-param key="otlp_metrics_endpoint" code="true" >}}.

## View the Collector in Fleet Automation

1. Navigate to [Fleet Automation][11].
1. Filter for OTel Collectors, then select a Collector to open its detail panel.
1. Click the {{< ui >}}Configuration{{< /ui >}} tab to view the Collector's configuration.

For what you can do with OTel Collectors in Fleet Automation, see [Fleet Automation for OpenTelemetry Collectors][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/opampextension
[2]: https://opentelemetry.io/docs/specs/opamp/
[3]: /opentelemetry/fleet_automation/
[4]: /opentelemetry/integrations/datadog_extension/
[5]: /opentelemetry/fleet_automation/#topology-view
[6]: https://opentelemetry.io/docs/collector/custom-collector/
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: /opentelemetry/integrations/collector_health_metrics/
[9]: /opentelemetry/setup/otlp_ingest/metrics/
[10]: /getting_started/site
[11]: https://app.datadoghq.com/fleet
