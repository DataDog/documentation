---
app_id: cilium
app_uuid: 791bc8e8-1a70-465a-b423-709b6af4e6e5
assets:
  dashboards:
    Cilium Overview: assets/dashboards/overview.json
    Cilium Overview v2: assets/dashboards/overview_v2.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cilium.endpoint.state
      metadata_path: metadata.csv
      prefix: cilium.
    process_signatures:
    - cilium-operator-generic
    - cilium-agent
    - cilium-health-responder
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10077
    source_type_name: Cilium
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- containers
- network
- security
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cilium/README.md
display_on_public_website: true
draft: false
git_integration_title: cilium
integration_id: cilium
integration_title: Cilium
integration_version: 3.5.0
is_public: true
manifest_version: 2.0.0
name: cilium
public_title: Cilium
short_description: Collect per pod agent metrics and cluster-wide operator metrics
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Containers
  - Category::Network
  - Category::Security
  - Category::Log Collection
  configuration: README.md#Setup
  description: Collect per pod agent metrics and cluster-wide operator metrics
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cilium
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Cilium][1] through the Datadog Agent. The integration can either collect metrics from the `cilium-agent` or `cilium-operator`.

## セットアップ

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### インストール

The Cilium check is included in the [Datadog Agent][3] package, but it requires additional setup steps to expose Prometheus metrics.

Starting with version 1.10.0, this OpenMetrics-based integration has a latest mode (`use_openmetrics`: true) and a legacy mode (`use_openmetrics`: false). To get all the most up-to-date features, Datadog recommends enabling the latest mode. For more information, see [Latest and Legacy Versioning For OpenMetrics-based Integrations][4].

1. In order to enable Prometheus metrics in both the `cilium-agent` and `cilium-operator`, deploy Cilium with the following Helm values set according to your version of Cilium:
   * Cilium < v1.8.x:
     `global.prometheus.enabled=true`
   * Cilium >= v1.8.x and < v1.9.x:
     `global.prometheus.enabled=true` and `global.operatorPrometheus.enabled=true`
   * Cilium >= 1.9.x:
     `prometheus.enabled=true` and `operator.prometheus.enabled=true`

Or, separately enable Prometheus metrics in the Kubernetes manifests:
<div class="alert alert-warning">For <a href="https://docs.cilium.io/en/v1.12/operations/upgrade/#id2">Cilium <= v1.11</a>, use <code>--prometheus-serve-addr=:9090</code>.</a></div>  

   - In the `cilium-agent` add `--prometheus-serve-addr=:9962` to the `args` section of the Cilium DaemonSet config:

     ```yaml
     # [...]
     spec:
       containers:
         - args:
             - --prometheus-serve-addr=:9962
     ```

   - In the `cilium-operator` add `--enable-metrics` to the `args` section of the Cilium deployment config:

      ```yaml
      # [...]
      spec:
        containers:
          - args:
              - --enable-metrics
      ```

### 構成

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

To configure this check for an Agent running on a host:
1. Edit the `cilium.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Cilium performance data. See the [sample cilium.d/conf.yaml][1] for all available configuration options.

   - To collect `cilium-agent` metrics, enable the `agent_endpoint` option.
   - To collect `cilium-operator` metrics, enable the `operator_endpoint` option.

    ```yaml  
        instances:

            ## @param use_openmetrics - boolean - optional - default: false
            ## Use the latest OpenMetrics implementation for more features and better performance.
            ##
            ## Note: To see the configuration options for the legacy OpenMetrics implementation (Agent 7.33 or older),
            ## see https://github.com/DataDog/integrations-core/blob/7.33.x/cilium/datadog_checks/cilium/data/conf.yaml.example
            #
          - use_openmetrics: true # Enables OpenMetrics latest mode

            ## @param agent_endpoint - string - optional
            ## The URL where your application metrics are exposed by Prometheus.
            ## By default, the Cilium integration collects `cilium-agent` metrics.
            ## One of agent_endpoint or operator_endpoint must be provided.
            #
            agent_endpoint: http://localhost:9090/metrics

            ## @param operator_endpoint - string - optional
            ## Provide instead of `agent_endpoint` to collect `cilium-operator` metrics.
            ## Cilium operator metrics are exposed on port 6942.
            #
            operator_endpoint: http://localhost:6942/metrics
   ```

2. [Restart the Agent][2].

##### Log collection

Cilium contains two types of logs: `cilium-agent` and `cilium-operator`.

1. Collecting logs is disabled by default in the Datadog Agent. Enable it in your [DaemonSet configuration][1]:

   ```yaml
     # (...)
       env:
       #  (...)
         - name: DD_LOGS_ENABLED
             value: "true"
         - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
             value: "true"
     # (...)
   ```

2. Mount the Docker socket to the Datadog Agent through the manifest or mount the `/var/log/pods` directory if you are not using Docker. For example manifests see the [Kubernetes Installation instructions for DaemonSet][3].

3. [Restart the Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/cilium/datadog_checks/cilium/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/?tab=daemonset#installation
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

##### To collect `cilium-agent` metrics and logs: 

- Metric collection

| Parameter            | Value                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `"cilium"`                                                 |
| `<INIT_CONFIG>`      | blank or `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"agent_endpoint": "http://%%host%%:9090/metrics", "use_openmetrics": "true"}` |

- Log collection

| Parameter      | Value                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "cilium-agent", "service": "cilium-agent"}` |

##### To collect `cilium-operator` metrics and logs: 

- Metric collection

| Parameter            | Value                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `"cilium"`                                                 |
| `<INIT_CONFIG>`      | blank or `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"operator_endpoint": "http://%%host%%:6942/metrics", "use_openmetrics": "true"}` |

- Log collection

| Parameter      | Value                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "cilium-operator", "service": "cilium-operator"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][5] and look for `cilium` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "cilium" >}}


### イベント

The Cilium integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "cilium" >}}


## トラブルシューティング

Need help? Contact [Datadog support][6].


[1]: https://cilium.io
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadohgq.com/integrations/guide/versions-for-openmetrics-based-integrations
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/