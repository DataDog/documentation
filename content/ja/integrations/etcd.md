---
"app_id": "etcd"
"app_uuid": "7f16875b-4aa8-44e3-adff-63622c234253"
"assets":
  "dashboards":
    "Etcd Overview": "assets/dashboards/etcd_overview.json"
    "etcd-Screenboard": "assets/dashboards/etcd_2_overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check":
      - "etcd.store.watchers"
      - "etcd.server.has_leader"
      "metadata_path": "metadata.csv"
      "prefix": "etcd."
    "process_signatures":
    - "etcd"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "111"
    "source_type_name": "etcd"
  "saved_views":
    "etcd_overview": "assets/saved_views/etcd_overview.json"
    "etcd_processes": "assets/saved_views/etcd_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "orchestration"
- "containers"
- "configuration & deployment"
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/etcd/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "etcd"
"integration_id": "etcd"
"integration_title": "etcd"
"integration_version": "6.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "etcd"
"public_title": "etcd"
"short_description": "Track writes, updates, deletes, inter-node latencies, and more Etcd metrics."
"supported_os":
- "linux"
- "macos"
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Orchestration"
  - "Category::Containers"
  - "Category::Configuration & Deployment"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": "Track writes, updates, deletes, inter-node latencies, and more Etcd metrics."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "etcd"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Etcd Dashboard][1]

## Overview

Collect Etcd metrics to:

- Monitor the health of your Etcd cluster.
- Know when host configurations may be out of sync.
- Correlate the performance of Etcd with the rest of your applications.

## Setup

### Installation

The Etcd check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your Etcd instance(s).

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `etcd.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to start collecting your Etcd performance data. See the [sample etcd.d/conf.yaml][2] for all available configuration options.
2. [Restart the Agent][3]

##### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

    ```yaml
    logs_enabled: true
    ```

2. Uncomment and edit this configuration block at the bottom of your `etcd.d/conf.yaml`:

    ```yaml
    logs:
      - type: file
        path: "<LOG_FILE_PATH>"
        source: etcd
        service: "<SERVICE_NAME>"
    ```

    Change the `path` and `service` parameter values based on your environment. See the [sample etcd.d/conf.yaml][2] for all available configuration options.

3. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                                |
| -------------------- | ---------------------------------------------------- |
| `<INTEGRATION_NAME>` | `etcd`                                               |
| `<INIT_CONFIG>`      | blank or `{}`                                        |
| `<INSTANCE_CONFIG>`  | `{"prometheus_url": "http://%%host%%:2379/metrics"}` |

##### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes log collection][2].

| Parameter      | Value                                             |
| -------------- | ------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "etcd", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's `status` subcommand][3] and look for `etcd` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "etcd" >}}


Etcd metrics are tagged with `etcd_state:leader` or `etcd_state:follower`, depending on the node status, so you can easily aggregate metrics by status.

### Events

The Etcd check does not include any events.

### Service Checks
{{< get-service-checks-from-git "etcd" >}}


## Troubleshooting

Need help? Contact [Datadog support][4].

## Further Reading

- [Kubernetes Control Plane Monitoring][5]
- [Monitor etcd performance to ensure consistent Docker configuration][6]
- [How to monitor etcd with Datadog][7]
- [Tools for collecting etcd metrics and logs][8]
- [Key metrics for monitoring etcd][9]



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/etcd/images/etcd_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/help/
[5]: https://docs.datadoghq.com/agent/kubernetes/control_plane/?tab=helm
[6]: https://www.datadoghq.com/blog/monitor-etcd-performance
[7]: https://www.datadoghq.com/blog/monitor-etcd-with-datadog/
[8]: https://www.datadoghq.com/blog/etcd-monitoring-tools/
[9]: https://www.datadoghq.com/blog/etcd-key-metrics/
