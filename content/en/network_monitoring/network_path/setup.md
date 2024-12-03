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

{{< site-region region="gov" >}}
<div class="alert alert-warning">Network Path for Datadog Cloud Network Monitoring is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">Network Path for Datadog Cloud Network Monitoring is in Limited Availability. Reach out to your Datadog representative to sign up, and then use the following instructions to configure the Datadog Agent to gather network path data.</div>

## Overview

Setting up Network Path involves configuring your Linux environment to monitor and trace the network routes between your services and endpoints. This helps identify bottlenecks, latency issues, and potential points of failure in your network infrastructure. Network Path allows you to manually configure individual network paths or automatically discover them, depending on your needs.

## Prerequisites

- Agent version `7.59` or higher is required.
- [CNM][1] must be enabled.

**Note**: If your network configuration restricts outbound traffic, follow the setup instructions on the [Agent proxy configuration][2] documentation.

## Setup

### Monitor individual paths

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

### Network traffic paths (experimental)

**Note**: Network traffic paths is experimental and is not yet stable. Do not deploy network traffic paths widely in a production environment.

Configure network traffic paths to allow the Agent to automatically discover and monitor network paths based on actual network traffic, without requiring you to specify endpoints manually.

<div class="alert alert-warning"> Enabling Network Path to automatically detect paths can generate a significant number of logs, particularly when monitoring network paths across a large number of hosts. </div>

1. Enable the `system-probe` traceroute module in `/etc/datadog-agent/system-probe.yaml` by adding the following:

   ```
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

**Note**: Network path is only supported for Linux environments.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/cloud_network_monitoring/setup/
[2]: https://docs.datadoghq.com/agent/configuration/proxy/?tab=linux
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml#L1645
[4]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/network_path.d/conf.yaml.example
