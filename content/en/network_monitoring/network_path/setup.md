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

Setting up Network Path involves configuring your environment to monitor and trace the network routes between your services and endpoints. This helps identify bottlenecks, latency issues, and potential points of failure in your network infrastructure. Network Path allows you to manually configure individual network paths or automatically discover them, depending on your needs.

**Note**: If your network configuration restricts outbound traffic, follow the setup instructions on the [Agent proxy configuration][2] documentation.

## Setup

### Monitor individual paths

You can monitor specific network paths by defining them in the Agent configuration file located at `/etc/datadog-agent/conf.d/network_path.d/conf.yaml`.

To get started, copy the example configuration file, remove the `.example` extension, and update it with your desired settings. For performance optimization, see [increase number of workers](#increase-the-number-of-workers).

For complete configuration options, see the [example config][5] or use one of the environment-specific configurations below:

{{% collapse-content title="Example config" level="h4" expanded=false id="id-for-anchoring" %}}
```yaml
init_config:
    ## @param min_collection_interval - number - optional - default: 60
    ## Specifies how frequently we should probe the endpoint.
    ## Min collection interval is defined in seconds.
    #
    # min_collection_interval: 60

    ## @param timeout - integer - optional - default: 1000
    ## Specifies how much time in milliseconds the traceroute should
    ## wait for a response from each hop before timing out.
    #
    # timeout: 1000

# Network Path integration is used to monitor individual endpoints.
# Supported platforms are Linux and Windows. macOS is not supported yet.
instances:
  - ## @param hostname - string - required
    ## Hostname or IP of the target endpoint to monitor via Network Path.
    #
    hostname: <HOSTNAME>

    ## @param port - integer - optional
    ## Port of the target endpoint to monitor via Network Path.
    ## For UDP, we do not recommend setting the port since it can make probes less reliable.
    ## If port is not set, a random port will be used.
    #
    # port: <PORT>

    ## @param protocol - string - optional - default: UDP
    ## Protocol used to monitor an endpoint via Network Path.
    ## Available protocols: UDP, TCP, ICMP
    #
    # protocol: <PROTOCOL>

    ## @param max_ttl - integer - optional - default: 30
    ## Specifies the maximum number of hops (max time-to-live value) traceroute will probe.
    #
    # max_ttl: <PORT>

    ## @param timeout - integer - optional - default: 1000
    ## Specifies how much time in milliseconds the traceroute should
    ## wait for a response from each hop before timing out.
    #
    # timeout: 1000

    ## @param min_collection_interval - number - optional - default: 60
    ## Specifies how frequently we should probe the endpoint.
    ## Min collection interval is defined in seconds.
    #
    # min_collection_interval: 60

    ## @param source_service - string - optional
    ## Source service name.
    #
    # source_service: <SOURCE_SERVICE>

    ## @param destination_service - string - optional
    ## Destination service name.
    #
    # destination_service: <DESTINATION_SERVICE>

    ## @param tcp_method - string - optional - default: syn
    ## Traceroute method used to monitor an endpoint via Network Path
    ## Available methods: syn, sack, prefer_sack, syn_socket (syn_socket only works on Windows OSes)
    ## Note: Windows client versions only support syn_socket
    #
    # tcp_method: <METHOD>

    ## @param traceroute_queries - integer - optional - default: 3
    ## Number of traceroutes to send for each check run.
    #
    # traceroute_queries: 3

    ## @param e2e_queries - integer - optional - default: 50
    ## Number of end-to-end probes to send for each check run.
    #
    # e2e_queries: 50

    ## @param tags - list of strings - optional
    ## A list of tags to attach to every metric and service check emitted by this instance.
    ##
    ## Learn more about tagging at https://docs.datadoghq.com/tagging
    #
    # tags:
    #   - <KEY_1>:<VALUE_1>
    #   - <KEY_2>:<VALUE_2>
```
{{% /collapse-content %}}


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
     # max_ttl: 30 # max traderoute TTL, default is 30
     # timeout: 1000 # timeout in milliseconds per hop, default is 1s

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

Agent `v7.61+` is required.

**Note**: Windows only supports TCP traceroutes.

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
     # max_ttl: 30 # max traderoute TTL, default is 30
     # timeout: 1000 # timeout in milliseconds per hop, default is 1s

     # more endpoints
     - hostname: 1.1.1.1 # endpoint hostname or IP
       protocol: TCP
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
    ```

  3. Restart the Agent after making these configuration changes to start seeing network paths.

<div class="alert alert-danger">
In Windows environments, the Agent uses UDP by default to monitor individual paths. If the protocol is not specified in the configuration, the Agent attempts a UDP traceroute, and any errors are logged. To work around this, ensure the protocol is set to TCP. For example: </div>

```yaml
init_config:
  min_collection_interval: 60 # in seconds, default 60 seconds
instances:
  - hostname: api.datadoghq.eu # endpoint hostname or IP
    protocol: TCP
    port: 443 # optional port number, default is 80
```
<div class="alert alert-warning">In Windows Client OS environments, <a href="https://learn.microsoft.com/en-us/windows/win32/winsock/tcp-ip-raw-sockets-2#limitations-on-raw-sockets">raw packets are not supported</a>. To work around this, set <code>protocol: TCP</code> and <code>tcp_method: syn_socket</code>. Agent <code>v7.67+</code> and <a href="https://learn.microsoft.com/en-us/windows/win32/api/ws2tcpip/nf-ws2tcpip-wsasetfailconnectonicmperror">Windows version 2004 (10.0; Build 19041) or later</a> are required. For example:</div>

```yaml
init_config:
  min_collection_interval: 60 # in seconds, default 60 seconds
instances:
  - hostname: api.datadoghq.eu # endpoint hostname or IP
    protocol: TCP
    port: 443 # optional port number, default is 80
    tcp_method: syn_socket
```

{{% /tab %}}
{{% tab "Helm" %}}

Agent `v7.59+` is required.

To enable Network Path with Kubernetes using Helm, add the following to your `values.yaml` file.

<div class="alert alert-info">Helm chart v3.109.1+ is required. For more information, reference the <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md">Datadog Helm Chart documentation</a> and the documentation <a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=helm#configuration">for Kubernetes and Integrations.</a></div>

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
          # max_ttl: 30 # max traderoute TTL, default is 30
          # timeout: 1000 # timeout in milliseconds per hop, default is 1s

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
check_runners: 20
```

### Network traffic paths (experimental)

**Prerequisites**: [CNM][1] must be enabled.

**Note**: Network traffic paths is experimental and is not yet stable. Do not deploy network traffic paths widely in a production environment.

Configure network traffic paths to allow the Agent to automatically discover and monitor network paths based on actual network traffic, eliminating the need to manually configure individual endpoints. See [exclude CIDR ranges](#exclude-cidr-ranges) to filter specific network ranges.

<div class="alert alert-danger"> Enabling Network Path to automatically detect paths can generate a significant number of logs, particularly when monitoring network paths across a large number of hosts. </div>


{{< tabs >}}
{{% tab "Linux" %}}

Agent `v7.59+` is required.

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

    ```

3. Restart the Agent after making these configuration changes to start seeing network paths.

[3]: https://github.com/DataDog/datadog-agent/blob/2c8d60b901f81768f44a798444af43ae8d338843/pkg/config/config_template.yaml#L1731

{{% /tab %}}
{{% tab "Windows" %}}

Agent `v7.61+` is required.

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
    ```

3. Restart the Agent after making these configuration changes to start seeing network paths.

[3]: https://github.com/DataDog/datadog-agent/blob/2c8d60b901f81768f44a798444af43ae8d338843/pkg/config/config_template.yaml#L1731

{{% /tab %}}
{{% tab "Helm" %}}

Agent `v7.59+` is required.

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
    #@env DD_NETWORK_PATH_COLLECTOR_PATHTEST_INTERVAL - integer - optional - default: 10m
    # The `pathtest_interval` refers to the traceroute run interval for monitored connections.
    # pathtest_interval: 10m

    # @param pathtest_ttl - integer - optional - default: 35m
    # @env DD_NETWORK_PATH_COLLECTOR_PATHTEST_TTL - integer - optional - default: 35m
    # The `pathtest_ttl` refers to the duration (time-to-live) a connection will be monitored when it's not seen anymore.
    # The TTL is reset each time the connection is seen again.
    # pathtest_ttl: 35m

```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[2]: https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=helm#configuration


{{% /tab %}}
{{< /tabs >}}

#### Exclude CIDR ranges

Classless Inter-Domain Routing (CIDR) ranges define blocks of IP addresses using network prefixes. You may want to exclude certain CIDR ranges from network traffic paths to:

- Reduce monitoring overhead for internal networks
- Focus on external traffic patterns
- Exclude known infrastructure ranges that don't require monitoring

To exclude specific CIDR ranges from network traffic paths, configure the following in your `/etc/datadog-agent/datadog.yaml` file:

```yaml
network_path:
    connections_monitoring:
        enabled: true # enable network path collection
    collector:
        source_excludes:
            "10.0.0.0/8":
                - "*" # all ports
        dest_excludes:
            "10.0.0.0/8":
                - "*" # all ports
            "8.8.8.8":
                - "53" # dns
                - "33434-33464" # traceroute range
```

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

   - [Individual paths](#monitor-individual-paths) configured through the `conf.d/network_path.d` file.
   - Experimental [network traffic paths](#network-traffic-paths-experimental) configured by enabling both `network_path.connections_monitoring` and [Cloud Network Monitoring][1](CNM).

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


