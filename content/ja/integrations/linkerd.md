---
"app_id": "linkerd"
"app_uuid": "971384a8-4745-4b31-89b5-b112507543e6"
"assets":
  "dashboards":
    "Linkerd - Overview": "assets/dashboards/overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check":
      - "linkerd.prometheus.health"
      - "linkerd.openmetrics.health"
      "metadata_path": "metadata.csv"
      "prefix": "linkerd."
    "process_signatures":
    - "linkerd"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10019"
    "source_type_name": "Linkerd"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "configuration & deployment"
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/linkerd/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "linkerd"
"integration_id": "linkerd"
"integration_title": "Linkerd"
"integration_version": "4.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "linkerd"
"public_title": "Linkerd"
"short_description": "Monitor your services health with metrics from linkerd."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Configuration & Deployment"
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Monitor your services health with metrics from linkerd."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Linkerd"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

[Linkerd][1] is a light but powerful open-source service mesh with CNCF graduated status. It provides the tools you need to write secure, reliable, observable cloud-native applications. With minimal configuration and no application changes, Linkerd:
- Uses mutual TLS to transparently secure all on-cluster TCP communication. 
- Adds latency-aware load balancing, request retries, timeouts, and blue-green deploys to keep your applications resilient.
- Provides platform health metrics by tracking success rates, latencies, and request volumes for every meshed workload.

This integration sends your Linkerd metrics to Datadog, including application success rates, latency, and saturation.


## Setup

This OpenMetrics-based integration has a latest mode (enabled by setting `openmetrics_endpoint` to point to the target endpoint) and a legacy mode (enabled by setting `prometheus_url` instead). To get all the most up-to-date features, Datadog recommends enabling the latest mode. For more information, see [Latest and Legacy Versioning For OpenMetrics-based Integrations][2].

Metrics marked as `[OpenMetrics V1]` or `[OpenMetrics V2]` are only available using the corresponding mode of the Linkerd integration. Metrics not marked are collected by all modes.

### Installation

The Linkerd check is included in the [Datadog Agent][3] package, so you don't need to install anything else on your server.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `linkerd.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1].
   See the [sample `linkerd.d/conf.yaml`][2] for all available configuration options using the latest OpenMetrics check example. If you previously implemented this integration, see the [legacy example][3].

2. [Restart the Agent][4].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/7.30.x/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Linkerd v1

| Parameter            | Value                                                                       |
| -------------------- | --------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `linkerd`                                                                   |
| `<INIT_CONFIG>`      | blank or `{}`                                                               |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:9990/admin/metrics/prometheus"}` |

 **Note**: This is a new default OpenMetrics check example. If you previously implemented this integration, see the [legacy example][2].

##### Linkerd v2

| Parameter            | Value                                                                       |
| -------------------- | --------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `linkerd`                                                                   |
| `<INIT_CONFIG>`      | blank or `{}`                                                               |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:4191/metrics"}`                  |

   **Note**: This is a new default OpenMetrics check example. If you previously implemented this integration, see the [legacy example][2].


##### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes log collection][3].

| Parameter      | Value                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "linkerd", "service": "<SERVICE_NAME>"}` |

To increase the verbosity of the data plane logs, see [Modifying the Proxy Log Level][4].

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/integrations-core/blob/7.30.x/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/kubernetes/log/
[4]: https://linkerd.io/2/tasks/modifying-proxy-log-level/
{{% /tab %}}
{{< /tabs >}}

### Validation

Run the [Agent's status subcommand][4] and look for `linkerd` under the Checks section.

## Data Collected

### Metrics

See [metadata.csv][5] for a list of metrics provided by this integration.

For Linkerd v1, see the [finagle metrics guide][6] for metric descriptions and [this gist][7] for an example of metrics exposed by Linkerd.

Linkerd is a Prometheus-based integration. Depending on your Linkerd configuration, some metrics might not be exposed by Linkerd. If any metric is not present in the cURL output, the Datadog Agent is unable to collect that particular metric.

To list the metrics exposed by your current configuration, run:

```bash
curl <linkerd_prometheus_endpoint>
```

Where `linkerd_prometheus_endpoint` is the Linkerd Prometheus endpoint (you should use the same value as the `prometheus_url` config key in your `linkerd.yaml`)

If you need to use a metric that is not provided by default, you can add an entry to `linkerd.yaml`.

For more information, see the examples in the [default configuration][8].


### Service Checks
{{< get-service-checks-from-git "linkerd" >}}


## Troubleshooting

Need help? Contact [Datadog support][9].



[1]: https://linkerd.io
[2]: https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/linkerd/metadata.csv
[6]: https://twitter.github.io/finagle/guide/Metrics.html
[7]: https://gist.githubusercontent.com/arbll/2f63a5375a4d6d5acface6ca8a51e2ab/raw/bc35ed4f0f4bac7e2643a6009f45f9068f4c1d12/gistfile1.txt
[8]: https://github.com/DataDog/integrations-core/blob/master/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[9]: https://docs.datadoghq.com/help/
