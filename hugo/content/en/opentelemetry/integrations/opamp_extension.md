---
title: OpAMP Extension
description: "Use the OpenTelemetry OpAMP extension to view upstream OpenTelemetry Collector configuration and health in Fleet Automation."
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

{{< callout header="false" btn_hidden="true" >}}
The OpAMP extension is in Preview.
{{< /callout >}}

## Overview

The [OpenTelemetry OpAMP extension][1] connects an upstream OpenTelemetry (OTel) Collector to Datadog with the [Open Agent Management Protocol (OpAMP)][2] and acts as an alternative to the [Datadog Extension][4]. The Collector reports its configuration, health, and available components to Datadog. You can view them in [Fleet Automation][3].

The OpAMP extension doesn't support remote configuration of the Collector.

The OpAMP extension is part of OpenTelemetry Collector Contrib. It's included in the contrib and k8s distributions of the upstream OpenTelemetry Collector, and you can add it to [custom builds][6]. Upstream, the extension's stability level is alpha.

<div class="alert alert-info">If you use the <a href="/opentelemetry/setup/agent/#agents-collector">Agent's Collector</a> or the <a href="/opentelemetry/setup/ddot_collector/">DDOT Collector</a>, you don't need the OpAMP extension. Both connect to Fleet Automation without extra configuration.</div>

## Setup

The OpAMP extension requires OpenTelemetry Collector Contrib v0.154.0 or later.

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

service:
  extensions: [opamp]
```

Set the following environment variables:

- `DD_OPAMP_ENDPOINT`: The Datadog OpAMP endpoint for your [Datadog site][10].
- `DD_API_KEY`: Your [Datadog API key][7].

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Set `DD_OPAMP_ENDPOINT` to the OpAMP endpoint for your Datadog site: {{< region-param key="opamp_endpoint" code="true" >}}.
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
The OpAMP endpoint isn't available on US1-FED or US2-FED.
{{< /site-region >}}

The extension's `reports_health`, `reports_effective_config`, and `reports_available_components` capabilities are on by default. Don't turn them off. Fleet Automation uses them as follows:

| Capability | Used for | If you turn it off |
|---|---|---|
| `reports_health` | Collector health in Fleet Automation | Fleet Automation doesn't show health status for the Collector. |
| `reports_effective_config` | The Collector's configuration and recommendations based on it | Recommendations that depend on the configuration don't appear. |
| `reports_available_components` | Recommendations based on the Collector's components and versions | Recommendations that depend on components don't appear. |

### 2. (Optional) Identify individual Collectors

Fleet Automation identifies each Collector by its OpAMP `instance_uid`. If you don't set `instance_uid`, the extension generates a new one each time the Collector starts. After each deployment, Fleet Automation lists Collectors that no longer run, and Collector health shows them as no longer reporting.

To reduce this noise and make individual Collectors easier to identify:

- Tag your Collectors under `service.telemetry.resource`:

  ```yaml
  service:
    telemetry:
      resource:
        deployment.environment.name: production
        k8s.cluster.name: <CLUSTER_NAME>
  ```

- Give each Collector a persistent instance ID with the [OpAMP Supervisor][12], which generates and stores the ID. On Kubernetes, this requires a custom image that includes both the Supervisor and the Collector, and persistent storage for the ID. For gateway Collectors, you can leave `instance_uid` unset.

### 3. Send the Collector's internal telemetry

Send the Collector's internal metrics to Datadog to monitor Collector health and pipeline throughput. You can push them directly to the OTLP metrics intake endpoint, or scrape them with the Prometheus receiver. For both setups, see [Collector Health Metrics][8].

## OpAMP extension configuration example

The following example combines the OpAMP extension with internal telemetry sent to the [Datadog OTLP metrics intake endpoint][9]. Merge it into your existing Collector configuration, which defines your receivers, exporters, and pipelines:

```yaml
extensions:
  opamp:
    server:
      http:
        endpoint: ${env:DD_OPAMP_ENDPOINT}
        headers:
          DD-API-KEY: ${env:DD_API_KEY}

service:
  extensions: [opamp]
  telemetry:
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

Set `DD_OTLP_METRICS_ENDPOINT` to the OTLP metrics intake endpoint for your [Datadog site][10]: {{< region-param key="otlp_metrics_endpoint" code="true" >}}. This setup skips pipeline processors. To add host and environment tags, see [Collector Health Metrics][8].

## View the Collector in Fleet Automation

1. Navigate to [Fleet Automation][11].
1. Filter for OTel Collectors.
1. Select a Collector to open its detail panel.
1. Click the {{< ui >}}Configuration{{< /ui >}} tab to view the Collector's configuration.

To see which Fleet Automation features each kind of Collector supports, see [Fleet Automation for OpenTelemetry Collectors][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/opampextension
[2]: https://opentelemetry.io/docs/specs/opamp/
[3]: /opentelemetry/fleet_automation/
[4]: /opentelemetry/integrations/datadog_extension/
[6]: https://opentelemetry.io/docs/collector/custom-collector/
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: /opentelemetry/integrations/collector_health_metrics/
[9]: /opentelemetry/setup/otlp_ingest/metrics/
[10]: /getting_started/site
[11]: https://app.datadoghq.com/fleet
[12]: https://opentelemetry.io/docs/collector/management/
