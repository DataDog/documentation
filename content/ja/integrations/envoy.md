---
"app_id": "envoy"
"app_uuid": "49dc62d7-7e0c-4c46-b90f-dfd4d5c35d53"
"assets":
  "dashboards":
    "Envoy - Overview": "assets/dashboards/envoy_overview.json"
    "Envoy Openmetrics Overview": "assets/dashboards/openmetrics_overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "envoy.server.uptime"
      "metadata_path": "metadata.csv"
      "prefix": "envoy."
    "process_signatures":
    - "envoy"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10012"
    "source_type_name": "Envoy"
  "monitors":
    "Envoy - connected state": "assets/monitors/connected_state.json"
  "saved_views":
    "envoy_4xx": "assets/saved_views/envoy_4xx.json"
    "envoy_5xx": "assets/saved_views/envoy_5xx.json"
    "envoy_error_grouped": "assets/saved_views/envoy_error_grouped.json"
    "envoy_overview": "assets/saved_views/envoy_overview.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "cloud"
- "log collection"
- "network"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/envoy/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "envoy"
"integration_id": "envoy"
"integration_title": "Envoy"
"integration_version": "3.5.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "envoy"
"public_title": "Envoy"
"short_description": "Envoy is an open source edge and service proxy"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Network"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": "Envoy is an open source edge and service proxy"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Envoy"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check collects distributed system observability metrics from [Envoy][1].

## Setup

### Installation

The Envoy check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your server.

#### Istio

If you are using Envoy as part of [Istio][3], configure the Envoy integration to collect metrics from the Istio proxy metrics endpoint.

```yaml
instances:
  - openmetrics_endpoint: localhost:15090/stats/prometheus
```

#### Standard

There are 2 ways to setup the `/stats` endpoint:

##### Unsecured stats endpoint

Here's an example Envoy admin configuration:

```yaml
admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8001
```

##### Secured stats endpoint

Create a listener/vhost that routes to the [admin endpoint][4] (Envoy connecting to itself), but only has a route for `/stats`; all other routes get a static/error response. Additionally, this allows nice integration with L3 filters for auth, for example.

Here's an example config from [envoy_secured_stats_config.json][5]:

```yaml
admin:
  access_log_path: /dev/null
  address:
    socket_address:
      protocol: TCP
      address: 127.0.0.1
      port_value: 8081
static_resources:
  listeners:
    - address:
        socket_address:
          protocol: TCP
          address: 0.0.0.0
          port_value: 80
      filter_chains:
        - filters:
            - name: envoy.http_connection_manager
              config:
                codec_type: AUTO
                stat_prefix: ingress_http
                route_config:
                  virtual_hosts:
                    - name: backend
                      domains:
                        - "*"
                      routes:
                        - match:
                            prefix: /stats
                          route:
                            cluster: service_stats
                http_filters:
                  - name: envoy.router
                    config:
  clusters:
    - name: service_stats
      connect_timeout: 0.250s
      type: LOGICAL_DNS
      lb_policy: ROUND_ROBIN
      hosts:
        - socket_address:
            protocol: TCP
            address: 127.0.0.1
            port_value: 8001
```

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `envoy.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to start collecting your Envoy performance data. See the [sample envoy.d/conf.yaml][2] for all available configuration options.

    ```yaml
    init_config:

    instances:
        ## @param openmetrics_endpoint - string - required
        ## The URL exposing metrics in the OpenMetrics format.
        #
      - openmetrics_endpoint: http://localhost:8001/stats/prometheus

    ```

2. Check if the Datadog Agent can access Envoy's [admin endpoint][3].
3. [Restart the Agent][4].

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Next, edit `envoy.d/conf.yaml` by uncommenting the `logs` lines at the bottom. Update the logs `path` with the correct path to your Envoy log files.

   ```yaml
   logs:
     - type: file
       path: /var/log/envoy.log
       source: envoy
       service: envoy
   ```

3. [Restart the Agent][4].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/data/conf.yaml.example
[3]: https://www.envoyproxy.io/docs/envoy/latest/operations/admin
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                       |
| -------------------- | ------------------------------------------- |
| `<INTEGRATION_NAME>` | `envoy`                                     |
| `<INIT_CONFIG>`      | blank or `{}`                               |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:80/stats/prometheus"}` |
 **Note**: The current version of the check (1.26.0+) uses [OpenMetrics][2] for metric collection, which requires Python 3. For hosts that are unable to use Python 3, or if you would like to use a legacy version of this check, refer to the following [config][3].

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][4].

| Parameter      | Value                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "envoy", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/integrations/openmetrics/
[3]: https://github.com/DataDog/integrations-core/blob/7.33.x/envoy/datadog_checks/envoy/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][6] and look for `envoy` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "envoy" >}}


See [metrics.py][7] for a list of tags sent by each metric.

### Events

The Envoy check does not include any events.

### Service Checks
{{< get-service-checks-from-git "envoy" >}}


## Troubleshooting

### Common problems

#### Endpoint `/server_info` unreachable
- Disable the `collect_server_info` option in your Envoy configuration, if the endpoint is not available in your Envoy environment, to minimize error logs.

**Note**: Envoy version data is not collected.

Need help? Contact [Datadog support][8].


[1]: https://www.envoyproxy.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://istio.io
[4]: https://www.envoyproxy.io/docs/envoy/latest/operations/admin
[5]: https://gist.github.com/ofek/6051508cd0dfa98fc6c13153b647c6f8
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/metrics.py
[8]: https://docs.datadoghq.com/help/
