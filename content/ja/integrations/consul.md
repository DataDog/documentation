---
"app_id": "consul"
"app_uuid": "d0b52e9d-6594-4ff5-9b66-800943f75756"
"assets":
  "dashboards":
    "consul": "assets/dashboards/consul_overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": true
    "metrics":
      "check": "consul.peers"
      "metadata_path": "metadata.csv"
      "prefix": "consul."
    "process_signatures":
    - "consul agent"
    - "consul_agent"
    - "consul-agent"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "122"
    "source_type_name": "Consul"
  "monitors":
    "consul": "assets/monitors/consul_status.json"
  "saved_views":
    "consul_errors": "assets/saved_views/consul_errors.json"
    "consul_overview": "assets/saved_views/consul_overview.json"
    "consul_processes": "assets/saved_views/consul_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "configuration & deployment"
- "containers"
- "log collection"
- "network"
- "notifications"
- "orchestration"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/consul/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "consul"
"integration_id": "consul"
"integration_title": "Consul"
"integration_version": "2.6.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "consul"
"public_title": "Consul"
"short_description": "Alert on Consul health checks, see service-to-node mappings, and much more."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Configuration & Deployment"
  - "Category::Containers"
  - "Category::Log Collection"
  - "Category::Network"
  - "Category::Notifications"
  - "Category::Orchestration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Alert on Consul health checks, see service-to-node mappings, and much more."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Consul"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Consul Dash][1]

## Overview

The Datadog Agent collects many metrics from Consul nodes, including those for:

- Total Consul peers
- Service health - for a given service, how many of its nodes are up, passing, warning, critical?
- Node health - for a given node, how many of its services are up, passing, warning, critical?
- Network coordinates - inter- and intra-datacenter latencies

The _Consul_ Agent can provide further metrics with DogStatsD. These metrics are more related to the internal health of Consul itself, not to services which depend on Consul. There are metrics for:

- Serf events and member flaps
- The Raft protocol
- DNS performance

And many more.

Finally, in addition to metrics, the Datadog Agent also sends a service check for each of Consul's health checks, and an event after each new leader election.

## Setup

### Installation

The Datadog Agent's Consul check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your Consul nodes.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `consul.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to start collecting your Consul metrics. See the [sample consul.d/conf.yaml][2] for all available configuration options.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Where your Consul HTTP server lives,
     ## point the URL at the leader to get metrics about your Consul cluster.
     ## Use HTTPS instead of HTTP if your Consul setup is configured to do so.
     #
     - url: http://localhost:8500
   ```

2. [Restart the Agent][3].

###### OpenMetrics

Optionally, you can enable the `use_prometheus_endpoint` configuration option to get an additional set of metrics from the Consul Prometheus endpoint.

**Note**: Use the DogStatsD or Prometheus method, do not enable both for the same instance.

1. Configure Consul to expose metrics to the Prometheus endpoint. Set the [`prometheus_retention_time`][4] nested under the top-level `telemetry` key of the main Consul configuration file:

    ```conf
    {
      ...
      "telemetry": {
        "prometheus_retention_time": "360h"
      },
      ...
    }
    ```

2. Edit the `consul.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to start using the Prometheus endpoint.
    ```yaml
    instances:
        - url: <EXAMPLE>
          use_prometheus_endpoint: true
    ```

3. [Restart the Agent][3].

##### DogStatsD

Instead of using the Prometheus endpoint, you can configure Consul to send the same set of additional metrics to the Agent through [DogStatsD][5].

1. Configure Consul to send DogStatsD metrics by adding the `dogstatsd_addr` nested under the top-level `telemetry` key in the main Consul configuration file:

    ```conf
    {
      ...
      "telemetry": {
        "dogstatsd_addr": "127.0.0.1:8125"
      },
      ...
    }
    ```

2. Update the [Datadog Agent main configuration file][6] `datadog.yaml` by adding the following configs to ensure metrics are tagged correctly:

   ```yaml
   # dogstatsd_mapper_cache_size: 1000  # default to 1000
   dogstatsd_mapper_profiles:
     - name: consul
       prefix: "consul."
       mappings:
         - match: 'consul\.http\.([a-zA-Z]+)\.(.*)'
           match_type: "regex"
           name: "consul.http.request"
           tags:
             method: "$1"
             path: "$2"
         - match: 'consul\.raft\.replication\.appendEntries\.logs\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.appendEntries.logs"
           tags:
             peer_id: "$1"
         - match: 'consul\.raft\.replication\.appendEntries\.rpc\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.appendEntries.rpc"
           tags:
             peer_id: "$1"
         - match: 'consul\.raft\.replication\.heartbeat\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.heartbeat"
           tags:
             peer_id: "$1"
   ```

3. [Restart the Agent][3].

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, enable it in `datadog.yaml` with:

   ```yaml
   logs_enabled: true
   ```

2. Edit this configuration block in your `consul.yaml` file to collect Consul logs:

   ```yaml
   logs:
     - type: file
       path: /var/log/consul_server.log
       source: consul
       service: myservice
   ```

   Change the `path` and `service` parameter values and configure them for your environment.
   See the [sample consul.d/conf.yaml][2] for all available configuration options.

3. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://www.consul.io/docs/agent/options#telemetry-prometheus_retention_time
[5]: https://docs.datadoghq.com/developers/dogstatsd/
[6]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                              |
| -------------------- | ---------------------------------- |
| `<INTEGRATION_NAME>` | `consul`                           |
| `<INIT_CONFIG>`      | blank or `{}`                      |
| `<INSTANCE_CONFIG>`  | `{"url": "https://%%host%%:8500"}` |

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "consul", "service": "<SERVICE_NAME>"}` |


[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][3] and look for `consul` under the Checks section.

**Note**: If your Consul nodes have debug logging enabled, the Datadog Agent's regular polling shows in the Consul log:

```text
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/status/leader (59.344us) from=127.0.0.1:53768
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/status/peers (62.678us) from=127.0.0.1:53770
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/health/state/any (106.725us) from=127.0.0.1:53772
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/catalog/services (79.657us) from=127.0.0.1:53774
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/health/service/consul (153.917us) from=127.0.0.1:53776
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/coordinate/datacenters (71.778us) from=127.0.0.1:53778
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/coordinate/nodes (84.95us) from=127.0.0.1:53780
```

#### Consul Agent to DogStatsD

Use `netstat` to verify that Consul is sending its metrics, too:

```shell
$ sudo netstat -nup | grep "127.0.0.1:8125.*ESTABLISHED"
udp        0      0 127.0.0.1:53874         127.0.0.1:8125          ESTABLISHED 23176/consul
```

## Data Collected

### Metrics
{{< get-metrics-from-git "consul" >}}


See [Consul's Telemetry doc][4] for a description of metrics the Consul Agent sends to DogStatsD.

See [Consul's Network Coordinates doc][5] for details on how the network latency metrics are calculated.

### Events

**consul.new_leader**:<br>
The Datadog Agent emits an event when the Consul cluster elects a new leader, tagging it with `prev_consul_leader`, `curr_consul_leader`, and `consul_datacenter`.

### Service Checks
{{< get-service-checks-from-git "consul" >}}


## Troubleshooting

Need help? Contact [Datadog support][6].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitoring HCP Consul with Datadog][7]
- [Monitor Consul health and performance with Datadog][8]
- [Consul at Datadog][9]
- [Key metrics for monitoring Consul][10]
- [Consul monitoring tools][11]
- [How to monitor Consul with Datadog][12]
- [Datadog NPM now supports Consul networking][13]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/consul/images/consul-dash.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://www.consul.io/docs/agent/telemetry.html
[5]: https://www.consul.io/docs/internals/coordinates.html
[6]: https://docs.datadoghq.com/help/
[7]: https://docs.datadoghq.com/integrations/guide/hcp-consul
[8]: https://www.datadoghq.com/blog/monitor-consul-health-and-performance-with-datadog
[9]: https://engineering.datadoghq.com/consul-at-datadog
[10]: https://www.datadoghq.com/blog/consul-metrics/
[11]: https://www.datadoghq.com/blog/consul-monitoring-tools/
[12]: https://www.datadoghq.com/blog/consul-datadog/
[13]: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
