---
title: Setup
description: Setting up Network Path
is_beta: true
further_reading:
- link: "/network_monitoring/network_path/list_view"
  tag: "Documentation"
  text: "Learn more about the List View in Network Path"
- link: "/network_monitoring/network_path/path_view"
  tag: "Documentation"
  text: "Learn more about the Path View in Network Path"
---

## Overview

Setting up Network Path involves configuring your environment to monitor and trace the network routes between your services and endpoints. This helps identify bottlenecks, latency issues, and potential points of failure in your network infrastructure. Network Path allows you to manually configure individual network paths or automatically discover them, depending on your needs.

**Note**: If your network configuration restricts outbound traffic, follow the setup instructions on the [Agent proxy configuration][2] documentation.

## Setup

### Monitor individual paths

{{< tabs >}}
{{% tab "Linux" %}}

Agent `v7.59+` is required.

Manually configure individual paths by specifying the exact endpoint you want to test. This allows you to target specific network routes for monitoring.

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

   For full configuration details, reference the [example config][4], or use the following:

   ```yaml
   init_config:
    ## @param min_collection_interval - int - optional - default:60
     ## Interval between each traceroute runs for each destination.
     # min_collection_interval: <interval_in_seconds>

   instances:
     ## @param hostname - string - required
     ## Hostname or IP of the destination endpoint to monitor.
     ## Traceroute will be run against this endpoint with a sequence of different TTL.
     #
     - hostname: <HOSTNAME_OR_IP>

     ## @param port - integer - optional - default:<RANDOM PORT>
     ## The port of the destination endpoint.
     ## For UDP, we do not recommend setting the port since it can make probes less reliable.
     ## By default, the port is random.
     #
     # port: <PORT>

     ## @param max_ttl - integer - optional - default:30
     ## The maximum traceroute TTL used during path collection.
     #
     # max_ttl: 30

     ## @param timeout - integer - optional - default:1000
     ## Specifies how much time in milliseconds the traceroute should
     ## wait for a response from each hop before timing out.
     #
     # timeout: 1000

     ## @param min_collection_interval - integer - optional - default:60
     ## Interval between each traceroute runs for each destination.
     # min_collection_interval: <interval_in_seconds>
     ## @param source_service - string - optional
     ## Source service name.
     #
     # source_service: <SOURCE_SERVICE>

     ## @param destination_service - string - optional
     ## Destination service name.
     #
     # destination_service: <DESTINATION_SERVICE>

     ## @param tags - list of strings - optional
     ## A list of tags to attach to every metric and service check emitted by this instance.
     ##
     ## Learn more about tagging at https://docs.datadoghq.com/tagging
     #
     # tags:
     #   - <KEY_1>:<VALUE_1>
     #   - <KEY_2>:<VALUE_2>
   ```

3. Restart the Agent after making these configuration changes to start seeing network paths.

[4]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/network_path.d/conf.yaml.example

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

   For full configuration details, reference the [example config][4].

  3. Restart the Agent after making these configuration changes to start seeing network paths.

**Note**: In Windows environments, the Agent uses UDP by default to monitor individual paths. If the protocol is not specified in the configuration, the Agent attempts a UDP traceroute, and any errors are logged. To work around this, ensure the protocol is set to TCP. For example:

```yaml
init_config:
  min_collection_interval: 60 # in seconds, default 60 seconds
instances:
  - hostname: api.datadoghq.eu # endpoint hostname or IP
    protocol: TCP
    port: 443 # optional port number, default is 80
```

**Note**: In Windows Client OS environments, raw packets are [not supported][5]. To work around this, set `protocol: TCP` and `tcp_method: syn_socket`. Agent `v7.67+` and [Windows version 2004 (10.0; Build 19041) or later][6] are required. For example:

```yaml
init_config:
  min_collection_interval: 60 # in seconds, default 60 seconds
instances:
  - hostname: api.datadoghq.eu # endpoint hostname or IP
    protocol: TCP
    port: 443 # optional port number, default is 80
    tcp_method: syn_socket
```

[4]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/network_path.d/conf.yaml.example
[5]: https://learn.microsoft.com/en-us/windows/win32/winsock/tcp-ip-raw-sockets-2#limitations-on-raw-sockets
[6]: https://learn.microsoft.com/en-us/windows/win32/api/ws2tcpip/nf-ws2tcpip-wsasetfailconnectonicmperror

{{% /tab %}}
{{% tab "Helm" %}}

Agent `v7.59+` is required.

To enable Network Path with Kubernetes using Helm, add the following to your `values.yaml` file.</br>
**Note:** Helm chart v3.109.1+ is required. For more information, reference the [Datadog Helm Chart documentation][1] and the documentation for [Kubernetes and Integrations][2].

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

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[2]: https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=helm#configuration
{{% /tab %}}
{{% tab "Autodiscovery (Kubernetes)" %}}
Datadog Autodiscovery allows you to enable Network Path on a per-service basis through Kubernetes annotations. To do this, first enable the traceroute module in the Datadog `values.yaml` file, which the Network Path integration depends on.</br>
**Note:** Helm chart v3.109.1+ **is required**. For more information, see the [Datadog Helm Chart documentation][1].

  ```yaml
  datadog:
    traceroute:
      enabled: true
  ```
After the module is enabled, Datadog automatically detects Network Path annotations added to your Kubernetes pod. For more information, see [Kubernetes and Integrations][2].
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

### Network traffic paths (experimental)

<div class="alert alert-info">Network traffic paths is in Limited Availability. Reach out to your Datadog representative to sign up, and then use the following instructions to configure the Datadog Agent to gather network traffic paths data.</div>

**Prerequisites**: [CNM][1] must be enabled.

**Note**: Network traffic paths is experimental and is not yet stable. Do not deploy network traffic paths widely in a production environment.

Configure network traffic paths to allow the Agent to automatically discover and monitor network paths based on actual network traffic, without requiring you to specify endpoints manually.

<div class="alert alert-warning"> Enabling Network Path to automatically detect paths can generate a significant number of logs, particularly when monitoring network paths across a large number of hosts. </div>

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

```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[2]: https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=helm#configuration


{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/cloud_network_monitoring/setup/
[2]: https://docs.datadoghq.com/agent/configuration/proxy/?tab=linux

