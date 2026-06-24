---
title: Setup
description: Setting up Network Path
is_beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-network-path-monitoring/"
  tag: "Blog"
  text: "Get end-to-end network visibility with Network Path and SD-WAN monitoring"
- link: "/network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/"
  tag: "Guide"
  text: "Detecting Application Availability using Network Insights"
- link: "/network_monitoring/network_path/guide/traceroute_variants/"
  tag: "Guide"
  text: "Network Path traceroute variants"
---


## Overview

Setting up Network Path involves configuring your environment to monitor and trace the network routes between your services and endpoints. This helps identify bottlenecks, latency issues, and potential points of failure in your network infrastructure. Network Path allows you to manually configure individual network paths, automatically discover them, or use both methods simultaneously, depending on your needs.

**Note**: If your network configuration restricts outbound traffic, follow the setup instructions on the [Agent proxy configuration][2] documentation.

## Setup

<div class="alert alert-info">This page covers Network Path setup for Agent-based configuration in Network Monitoring. To create Network Path tests in Synthetic Monitoring, see <a href="/synthetics/network_path_tests/">Network Path Testing in Synthetic Monitoring</a>.</div>

Datadog provides three Agent-based collection methods. You can use one method on its own or combine multiple methods:

| Method | When to use |
|--------|-------------|
| **[Scheduled&nbsp;tests](#scheduled-tests)** | Monitor specific source-destination pairs that you define in the Agent configuration. Best for tracking a known set of endpoints, such as critical APIs or partner services. |
| **[Dynamic&nbsp;tests](#dynamic-tests)** | Automatically discover and monitor paths based on traffic observed by [Cloud Network Monitoring][1]. Best for broad visibility without manually listing every destination. |
| **[Dynamic&nbsp;Tests&nbsp;for&nbsp;NetFlow](#dynamic-tests-for-netflow-experimental)** | Automatically run Network Path tests from the Agent host to destination IPs observed in [NetFlow Monitoring][6]. Best for adding hop-by-hop route visibility to NetFlow traffic without manually configuring individual destinations. |

### Scheduled tests

You can monitor specific network paths by defining them in the Agent configuration file located at `/etc/datadog-agent/conf.d/network_path.d/conf.yaml`.

To get started, copy the [example configuration][5], remove the `.example` extension, and update it with your desired settings, or use one of the environment-specific configurations below. For performance optimization in large environments, see [increase the number of workers](#increase-the-number-of-workers).

{{< tabs >}}
{{% tab "Linux" %}}

Agent `v7.59+` is required.

1. Enable the `system-probe` traceroute module in `/etc/datadog-agent/system-probe.yaml` by adding the following:

   ```
   traceroute:
     enabled: true
   ```

2. Enable `network_path` to monitor new destinations from this Agent by creating or editing the `/etc/datadog-agent/conf.d/network_path.d/conf.yaml` file:

   ```yaml
   init_config:
     min_collection_interval: 60 # in seconds, default 60 seconds
   instances:
     # configure the endpoints you want to monitor, one check instance per endpoint
     # warning: Do not set the port when using UDP. Setting the port when using UDP can cause traceroute calls to fail and falsely report an unreachable destination.

     - hostname: api.datadoghq.eu # endpoint hostname or IP
       protocol: TCP
       port: 443
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
       min_collection_interval: 120 # set min_collection_interval at the instance level
     ## optional configs:
     # max_ttl: 30 # max traceroute TTL, default is 30
     # timeout: 1000 # timeout in milliseconds per hop, default is 1s
     # tcp_method: syn # TCP probing method, default is syn, options: syn, sack, prefer_sack
     # traceroute_queries: 3 # number of traceroutes to send per check run, default is 3
     # e2e_queries: 50 # number of end-to-end probes to send per check run, default is 50

     # more endpoints
     - hostname: 1.1.1.1 # endpoint hostname or IP
       protocol: UDP
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"

    ```

3. Restart the Agent after making these configuration changes to start seeing network paths.

{{% /tab %}}
{{% tab "macOS" %}}

Agent `v7.75+` is required.

1. Enable the `system-probe` traceroute module in `/opt/datadog-agent/etc/system-probe.yaml` by adding the following:

   ```
   traceroute:
     enabled: true
   ```

2. Enable `network_path` to monitor new destinations from this Agent by creating or editing the `/opt/datadog-agent/etc/conf.d/network_path.d/conf.yaml` file:

   ```yaml
   init_config:
     min_collection_interval: 60 # in seconds, default 60 seconds
   instances:
     # configure the endpoints you want to monitor, one check instance per endpoint
     # warning: Do not set the port when using UDP. Setting the port when using UDP can cause traceroute calls to fail and falsely report an unreachable destination.

     - hostname: api.datadoghq.eu # endpoint hostname or IP
       protocol: TCP
       port: 443
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
       min_collection_interval: 120 # set min_collection_interval at the instance level
     ## optional configs:
     # max_ttl: 30 # max traceroute TTL, default is 30
     # timeout: 1000 # timeout in milliseconds per hop, default is 1s
     # tcp_method: syn # TCP probing method, default is syn, options: syn, sack, prefer_sack
     # traceroute_queries: 3 # number of traceroutes to send per check run, default is 3
     # e2e_queries: 50 # number of end-to-end probes to send per check run, default is 50

     # more endpoints
     - hostname: 1.1.1.1 # endpoint hostname or IP
       protocol: UDP
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"

    ```

3. Restart the Agent after making these configuration changes to start seeing network paths.

{{% /tab %}}
{{% tab "Windows" %}}

Agent `v7.72+` is required.

1. Enable the `system-probe` traceroute module in `%ProgramData%\Datadog\system-probe.yaml` by adding the following:

   ```
   traceroute:
     enabled: true
   ```

2. Enable `network_path` to monitor new destinations from this Agent by creating or editing the `%ProgramData%\Datadog\conf.d\network_path.d\conf.yaml` file:

   ```yaml
   init_config:
     min_collection_interval: 60 # in seconds, default 60 seconds
   instances:
     # configure the endpoints you want to monitor, one check instance per endpoint
     # warning: Do not set the port when using UDP. Setting the port when using UDP can cause traceroute calls to fail and falsely report an unreachable destination.

     - hostname: api.datadoghq.eu # endpoint hostname or IP
       protocol: TCP
       port: 443
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
       min_collection_interval: 120 # set min_collection_interval at the instance level
     ## optional configs:
     # max_ttl: 30 # max traceroute TTL, default is 30
     # timeout: 1000 # timeout in milliseconds per hop, default is 1s
     # tcp_method: syn # TCP probing method, default is syn, options: syn, sack, prefer_sack, syn_socket (Windows only)
     # traceroute_queries: 3 # number of traceroutes to send per check run, default is 3
     # e2e_queries: 50 # number of end-to-end probes to send per check run, default is 50

     # more endpoints
     - hostname: 1.1.1.1 # endpoint hostname or IP
       protocol: TCP
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
    ```

3. Restart the Agent after making these configuration changes to start seeing network paths.

{{% /tab %}}
{{% tab "Helm" %}}

Agent `v7.59+` is required.

<div class="alert alert-info">Helm chart v3.109.1+ is required. For more information, reference the <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md">Datadog Helm Chart documentation</a> and the documentation <a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=helm#configuration">for Kubernetes and Integrations.</a></div>

To enable Network Path with Kubernetes using Helm, add the following to your `values.yaml` file.

  ```yaml
  datadog:
    traceroute:
      enabled: true
    confd:
      network_path.yaml: |-
        init_config:
          min_collection_interval: 60 # in seconds, default 60 seconds
        instances:
          # configure the endpoints you want to monitor, one check instance per endpoint
          # warning: Do not set the port when using UDP. Setting the port when using UDP can cause traceroute calls to fail and falsely report an unreachable destination.

          - hostname: api.datadoghq.eu # endpoint hostname or IP
            protocol: TCP
            port: 443
            tags:
              - "tag_key:tag_value"
              - "tag_key2:tag_value2"
            min_collection_interval: 120 # set min_collection_interval at the instance level
          ## optional configs:
          # max_ttl: 30 # max traceroute TTL, default is 30
          # timeout: 1000 # timeout in milliseconds per hop, default is 1s
          # tcp_method: syn # TCP probing method, default is syn, options: syn, sack, prefer_sack
          # traceroute_queries: 3 # number of traceroutes to send per check run, default is 3
          # e2e_queries: 50 # number of end-to-end probes to send per check run, default is 50

          # more endpoints
          - hostname: 1.1.1.1 # endpoint hostname or IP
            protocol: UDP
            tags:
              - "tag_key:tag_value"
              - "tag_key2:tag_value2"
```

{{% /tab %}}
{{% tab "Autodiscovery (Kubernetes)" %}}
Datadog Autodiscovery allows you to enable Network Path on a per-service basis through Kubernetes annotations. 

<div class="alert alert-info">Helm chart v3.109.1+ is required. For more information, see the <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md">Datadog Helm Chart documentation</a>.</div>

1. Enable the traceroute module in the Datadog `values.yaml` file, which the Network Path integration depends on.

   ```yaml
   datadog:
     traceroute:
       enabled: true
   ```

2. After the module is enabled, Datadog automatically detects Network Path annotations added to your Kubernetes pod. For more information, see [Kubernetes and Integrations][2].

   ```yaml
   apiVersion: v1
   kind: Pod
   # (...)
   metadata:
     name: '<POD_NAME>'
     annotations:
       ad.datadoghq.com/<CONTAINER_NAME>.checks: |
         {
           "network_path": {
             "init_config": {
               "min_collection_interval": 300
             },
             "instances": [
                   {
                     "protocol": "TCP",
                     "port": 443,
                     "source_service": "<CONTAINER_NAME>",
                     "tags": [
                       "tag_key:tag_value",
                       "tag_key2:tag_value2"
                     ],
                     "hostname": "api.datadoghq.eu"
                   },
                   {
                     "protocol": "UDP",
                     "source_service": "<CONTAINER_NAME>",
                     "tags": [
                       "tag_key:tag_value",
                       "tag_key2:tag_value2"
                     ],
                     "hostname": "1.1.1.1"
                   },
             ]
           }
         }
       # (...)
   spec:
     containers:
       - name: '<CONTAINER_NAME>'
   # (...)
   ```
    If you define pods indirectly (with deployments, ReplicaSets, or ReplicationControllers), add pod annotations under `spec.template.metadata`.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md#enabling-system-probe-collection
[2]: https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=annotations#configuration

{{% /tab %}}
{{< /tabs >}}

#### Increase the number of workers 

Network Path monitoring for individual paths runs as an Agent Integration. The number of concurrent workers is controlled by the `check_runners` setting in the `datadog.yaml` file.

To increase the number of workers, add the following configuration to your `datadog.yaml` file:

```yaml
## @param check_runners - integer - optional - default: 4
## @env DD_CHECK_RUNNERS - integer - optional - default: 4
## The `check_runners` refers to the number of concurrent check runners available for check instance execution.
## The scheduler attempts to spread the instances over the collection interval and will _at most_ be
## running the number of check runners instances concurrently.
##
## The level of concurrency has effects on the Agent's: RSS memory, CPU load, resource contention overhead, etc.
#
check_runners: <NUMBER_OF_WORKERS>
```

### Dynamic tests

**Prerequisites**: [CNM][1] must be enabled.

Configure dynamic tests to allow the Agent to automatically discover and monitor network paths based on actual network traffic, eliminating the need to manually configure individual endpoints. See [filter syntax](#filter-syntax) to include/exclude domain or IPs.

{{< tabs >}}
{{% tab "Linux" %}}

Agent `v7.73+` is required.

1. Enable the `system-probe` traceroute module in `/etc/datadog-agent/system-probe.yaml` by adding the following:

   ```yaml
   traceroute:
     enabled: true
   ```

2. Enable `network_path` to monitor CNM connections by creating or editing the `/etc/datadog-agent/datadog.yaml` file:

    ```yaml
    network_path:
      connections_monitoring:
        enabled: true
      # collector:
        # workers: <NUMBER OF WORKERS> # default 4
    ```

    For full configuration details, reference the [example config][3], or use the following:

    ```yaml
    network_path:
      connections_monitoring:
        ## @param enabled - bool - required - default:false
        ## Enable network path collection
        #
        enabled: true
      collector:
        ## @param workers - int - optional - default:4
        ## Number of workers that can collect paths in parallel
        ## Recommendation: leave at default
        #
        # workers: <NUMBER OF WORKERS> # default 4

        #@env DD_NETWORK_PATH_COLLECTOR_PATHTEST_INTERVAL - integer - optional - default: 10m
        # The `pathtest_interval` refers to the traceroute run interval for monitored connections.
        # pathtest_interval: 10m

        # @param pathtest_ttl - integer - optional - default: 35m
        # @env DD_NETWORK_PATH_COLLECTOR_PATHTEST_TTL - integer - optional - default: 35m
        # The `pathtest_ttl` refers to the duration (time-to-live) a connection will be monitored when it's not seen anymore.
        # The TTL is reset each time the connection is seen again.
        # pathtest_ttl: 35m

        ## @param filters - list - optional
        ## Include or exclude specific domains or IP ranges from dynamic monitoring.
        ## Filters are applied sequentially, with later filters taking precedence.
        ## See the "Filter syntax" section for details and examples: https://docs.datadoghq.com/network_monitoring/network_path/setup/#filter-syntax
        #
        # filters:
        #   - match_domain: '*.example.com'
        #     type: exclude
        #   - match_ip: 10.0.0.0/8
        #     type: exclude
        #   - match_domain: 'api.datadoghq.com'
        #     type: include

    ```

3. Restart the Agent after making these configuration changes to start seeing network paths.

[3]: https://github.com/DataDog/datadog-agent/blob/2c8d60b901f81768f44a798444af43ae8d338843/pkg/config/config_template.yaml#L1731

{{% /tab %}}
{{% tab "Windows" %}}

Agent `v7.73+` is required.

1. Enable the `system-probe` traceroute module in `%ProgramData%\Datadog\system-probe.yaml` by adding the following:

   ```yaml
   traceroute:
     enabled: true
   ```

2. Enable `network_path` to monitor CNM connections by creating or editing the `%ProgramData%\Datadog\datadog.yaml` file:

    ```yaml
    network_path:
      connections_monitoring:
        enabled: true
      # collector:
        # workers: <NUMBER OF WORKERS> # default 4
    ```

    For full configuration details, reference the [example config][3], or use the following:

    ```yaml
    network_path:
      connections_monitoring:
        ## @param enabled - bool - required - default:false
        ## Enable network path collection
        #
        enabled: true
      collector:
        ## @param workers - int - optional - default:4
        ## Number of workers that can collect paths in parallel
        ## Recommendation: leave at default
        #
        # workers: <NUMBER OF WORKERS> # default 4

        #@env DD_NETWORK_PATH_COLLECTOR_PATHTEST_INTERVAL - integer - optional - default: 10m
        # The `pathtest_interval` refers to the traceroute run interval for monitored connections.
        # pathtest_interval: 10m

        # @param pathtest_ttl - integer - optional - default: 35m
        # @env DD_NETWORK_PATH_COLLECTOR_PATHTEST_TTL - integer - optional - default: 35m
        # The `pathtest_ttl` refers to the duration (time-to-live) a connection will be monitored when it's not seen anymore.
        # The TTL is reset each time the connection is seen again.
        # pathtest_ttl: 35m

        ## @param filters - list - optional
        ## Include or exclude specific domains or IP ranges from dynamic monitoring.
        ## Filters are applied sequentially, with later filters taking precedence.
        ## See the "Filter syntax" section for details and examples: https://docs.datadoghq.com/network_monitoring/network_path/setup/#filter-syntax
        #
        # filters:
        #   - match_domain: '*.example.com'
        #     type: exclude
        #   - match_ip: 10.0.0.0/8
        #     type: exclude
        #   - match_domain: 'api.datadoghq.com'
        #     type: include
    ```

3. Restart the Agent after making these configuration changes to start seeing network paths.

[3]: https://github.com/DataDog/datadog-agent/blob/2c8d60b901f81768f44a798444af43ae8d338843/pkg/config/config_template.yaml#L1731

{{% /tab %}}
{{% tab "Helm" %}}

Agent `v7.73+` is required.

To enable Network Path with Kubernetes using Helm, add the following to your `values.yaml` file.
**Note:** Helm chart v3.124.0+ is required. For more information, reference the [Datadog Helm Chart documentation][1] and the documentation for [Kubernetes and Integrations][2].

```yaml
datadog:
  networkPath:
    connectionsMonitoring:
      enabled: true
  ## Set to true to enable the Traceroute Module of the System Probe
  traceroute:
    enabled: true

  ## @param collector - custom object - optional
  ## Configuration related to Network Path Collector.
  #
  collector:
    ## @param workers - integer - optional - default: 4
    ## @env DD_WORKERS - integer - optional - default: 4
    ## The `workers` refers to the number of concurrent workers available for network path execution.
    #
    # workers: 4
    
    ## @param pathtest_interval - integer - optional - default: 35m
    ## @env DD_NETWORK_PATH_COLLECTOR_PATHTEST_INTERVAL - integer - optional - default: 30m
    ## The `pathtest_interval` refers to the traceroute run interval for monitored connections.
    #
    # pathtest_interval: 30m

    ## @param pathtest_ttl - integer - optional - default: 35m
    ## @env DD_NETWORK_PATH_COLLECTOR_PATHTEST_TTL - integer - optional - default: 35m
    ## The `pathtest_ttl` refers to the duration (time-to-live) a connection will be monitored when it's not seen anymore.
    ## The TTL is reset each time the connection is seen again.
    #
    # pathtest_ttl: 35m

    ## @param filters - list - optional
    ## Include or exclude specific domains or IP ranges from dynamic monitoring.
    ## Filters are applied sequentially, with later filters taking precedence.
    ## See the "Filter syntax" section for details and examples: https://docs.datadoghq.com/network_monitoring/network_path/setup/#filter-syntax
    #
    # filters:
    #   - match_domain: '*.example.com'
    #     type: exclude
    #   - match_ip: 10.0.0.0/8
    #     type: exclude
    #   - match_domain: 'api.datadoghq.com'
    #     type: include

```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[2]: https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=helm#configuration


{{% /tab %}}
{{< /tabs >}}

### Dynamic Tests for NetFlow (Experimental)

<div class="alert alert-info">Dynamic Tests for NetFlow are experimental and require Agent <code>v7.81+</code>. To enable this feature, contact Datadog Support or your account team.</div>

Configure Dynamic Tests for NetFlow to run Network Path tests from the Agent host to destination IPs observed in NetFlow records. Dynamic Tests for NetFlow do not require [Cloud Network Monitoring][1] or `network_path.connections_monitoring.enabled`.

Dynamic Tests for NetFlow run from the Datadog Agent that collects NetFlow traffic. They do not run from the NetFlow exporter, router, or original flow source. Deploy the Agent close enough to the observed flow sources for traceroutes from that Agent to represent the paths you want to investigate.

**Prerequisites**:

- [NetFlow Monitoring][6] must be configured and receiving flows.
- Agent `v7.81+` is required.

{{< tabs >}}
{{% tab "Linux" %}}

1. Enable the `system-probe` traceroute module in `/etc/datadog-agent/system-probe.yaml` by adding the following:

   ```yaml
   traceroute:
     enabled: true
   ```

2. Enable Dynamic Tests for NetFlow in `/etc/datadog-agent/datadog.yaml`:

   ```yaml
   network_path:
     netflow_monitoring:
       enabled: true
     collector:
       monitor_ip_without_domain: true
   ```

   `monitor_ip_without_domain: true` is required because Dynamic Tests for NetFlow target observed destination IP addresses and the Network Path collector skips IP-only targets by default.

3. Restart the Agent after making these configuration changes.

{{% /tab %}}
{{% tab "Windows" %}}

1. Enable the `system-probe` traceroute module in `%ProgramData%\Datadog\system-probe.yaml` by adding the following:

   ```yaml
   traceroute:
     enabled: true
   ```

2. Enable Dynamic Tests for NetFlow in `%ProgramData%\Datadog\datadog.yaml`:

   ```yaml
   network_path:
     netflow_monitoring:
       enabled: true
     collector:
       monitor_ip_without_domain: true
   ```

   `monitor_ip_without_domain: true` is required because Dynamic Tests for NetFlow target observed destination IP addresses and the Network Path collector skips IP-only targets by default.

3. Restart the Agent after making these configuration changes.

{{% /tab %}}
{{< /tabs >}}

After the Agent reports paths, open the [Network Path][4] UI and filter for `origin:netflow` to view paths generated from NetFlow traffic.

### Filter syntax

Configure filters to include or exclude domains and IPs, allowing you to:

- Reduce monitoring overhead for internal networks
- Focus on external traffic patterns
- Exclude known infrastructure ranges that don't require monitoring

The same `network_path.collector.filters` list applies to dynamic tests and Dynamic Tests for NetFlow. For Dynamic Tests for NetFlow, use `match_ip` filters because Dynamic Tests for NetFlow target observed destination IP addresses.

To include or exclude specific domains or IP ranges from dynamic tests, add the following to your `/etc/datadog-agent/datadog.yaml` file:

```yaml
network_path:
  collector:
    filters:
      # exclude single domain
      - match_domain: 'api.slack.com'
        type: exclude

      # exclude domain using `*` wildcard
      - match_domain: '*.datadoghq.com'      # this translates to regex '.*\.datadoghq\.com
        type: exclude
      - match_domain: '*.zoom.us'
        match_domain_strategy: wildcard      # use simple wildcard matching (wildcard matching is the default)
        type: exclude

      # exclude single IP or using CIDR notation
      - match_ip: 10.10.10.10
        type: exclude
      - match_ip: 10.20.0.0/24
        type: exclude

      # exclude using regex
      - match_domain: '.*\.zoom\.us'
        match_domain_strategy: regex         # use regex matching strategy
        type: exclude

      # include
      - match_domain: 'api.datadoghq.com'
        type: include
```

**Note**: 
Filters are applied sequentially, with later filters taking precedence over earlier ones.

For example, all domains matching `*.datadoghq.com` are ignored, except `api.datadoghq.com`.

```yaml
network_path:
  collector:
    filters:
      - match_domain: '*.datadoghq.com'
        type: exclude
      - match_domain: 'api.datadoghq.com'
        type: include
```

### Source public IP resolution

<div class="alert alert-info">Source public IP resolution is available in Agent v7.75+.</div>

Network Path resolves the source host's public IP address to provide accurate path visualization for internet-bound traffic. The Agent contacts external IP check services over HTTPS to determine the public IP of the host.

This feature is **not required** for Network Path to function. If these services are unreachable, Network Path continues to operate normally, but the source public IP is not resolved and path visualizations do not display source IP metadata.

If your network restricts outbound traffic and you want source public IP resolution, add the following URLs to your firewall allowlist:

| URL | Provider |
|-----|----------|
| `https://icanhazip.com` | Cloudflare |
| `https://ipinfo.io/ip` | IPinfo |
| `https://checkip.amazonaws.com` | Amazon |
| `https://api.ipify.org` | ipify |
| `https://whatismyip.akamai.com` | Akamai |

The Agent tries each service in order and uses the first successful response. All requests are made over HTTPS (port 443).

## Troubleshooting

Use the following guidelines to troubleshoot issues with Network Path. If you need additional help, contact [Datadog Support][3].

### No Network Path data in the UI

If no data appears in the [Network Path][4] UI, the feature may not be fully enabled. Network Path requires the following:

1. The traceroute module must be enabled in your `system-probe.yaml` file:

   ```yaml
   traceroute:
     enabled: true
   ```

2. At least one Network Path feature must be active, such as:

   - [Scheduled tests](#scheduled-tests) configured through the `conf.d/network_path.d` file.
   - [Dynamic tests](#dynamic-tests) configured by enabling both `network_path.connections_monitoring.enabled` and [Cloud Network Monitoring][1].
   - [Dynamic Tests for NetFlow](#dynamic-tests-for-netflow-experimental) configured by enabling `network_path.netflow_monitoring.enabled` and [NetFlow Monitoring][6].

### No Dynamic Tests for NetFlow data in the UI

If no paths with `origin:netflow` appear in the [Network Path][4] UI, verify the following:

1. The Agent is version `7.81+`.
2. [NetFlow Monitoring][6] is enabled and receiving flows.
3. The traceroute module is enabled in `system-probe.yaml`.
4. `network_path.netflow_monitoring.enabled` and `network_path.collector.monitor_ip_without_domain` are set to `true` in `datadog.yaml`.
5. Your `network_path.collector.filters` configuration does not exclude the destination IPs you expect to monitor.

Dynamic Tests for NetFlow automatically skip NetFlow records whose source IP is assigned to the Agent host before destination filters are evaluated. This prevents self-scheduling loops and is expected behavior. For NAT or alias cases where Agent-sourced traffic appears from another source IP, use `network_path.collector.source_excludes` to exclude those source IPs.

Then filter the Network Path UI for `origin:netflow`.

### Error: status code: 404

If you encounter an error like the following:

   ```text
   Error: failed to trace path: traceroute request failed: Probe Path <path>, url: <url>, status code: 404
   ```

   - This indicates that the traceroute module is not enabled. Ensure the traceroute module is enabled in your `system-probe.yaml` file.



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/cloud_network_monitoring/setup/
[2]: https://docs.datadoghq.com/agent/configuration/proxy/?tab=linux
[3]: /help
[4]: https://app.datadoghq.com/network/path
[5]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/network_path.d/conf.yaml.example
[6]: /network_monitoring/netflow/
[15]: /synthetics/network_path_tests/
