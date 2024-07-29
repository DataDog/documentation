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
<div class="alert alert-warning">Network Path for Datadog Network Performance Monitoring is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">Network Path for Datadog Network Performance Monitoring is in private beta. Reach out to your Datadog representative to sign up, and then use the following instructions to configure the Datadog Agent to gather network path data.</div>


## Overview

Setting up Network Path involves configuring your Linux environment to monitor and trace the network routes between your services and endpoints. This helps identify bottlenecks, latency issues, and potential points of failure in your network infrastructure. Network Path allows you to configure either static or dynamic paths depending on your needs. Dynamic paths are automatically generated when enabled, while static paths let you specify the endpoint to test.

## Prerequisites

- Agent version `7.55` or higher is required.
- [NPM][1] must be enabled.

**Note**: If your network configuration restricts outbound traffic, follow the setup instructions on the [Agent proxy configuration][2] documentation.

## Setup

{{< tabs >}}
{{% tab "Dynamic paths" %}}

1. Enable the `system-probe` traceroute module in `/etc/datadog-agent/system-probe.yaml` by adding the following:

   ```
   traceroute:
     enabled: true
   ```

2. Enable `network_path` to monitor NPM connections by creating or editing the `/etc/datadog-agent/datadog.yaml` file: 

    ```yaml
    network_path:
      connections_monitoring:
        enabled: true
      collector:
        workers: 10 # default 4
    ```
 
    For full configuration details, see the following:

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
        workers: 10
    ```

3. Restart the Agent after making these configuration changes to start seeing network paths.

{{% /tab %}}

{{% tab "Static paths" %}}

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
     - hostname: api.datadoghq.eu # endpoint hostname or IP
       protocol: TCP
       port: 443
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
     ## optional configs:
     # max_ttl: 30 # max traderoute TTL, default is 30
     # timeout: 10 # timeout in seconds of traceroute calls, default is 10s
     - hostname: 1.1.1.1 # endpoint hostname or IP
       protocol: UDP
       port: 53
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
    ```
 
   For full configuration details, see the following:

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
  
     ## @param port - uint16 - optional - default:<RANDOM PORT>
     ## The port of the destination endpoint.
     ## By default, the port is random.
     #
     # port: <PORT>

     ## @param max_ttl - uint8 - optional - default:30
     ## The maximum traceroute TTL used during path collection.
     #
     # max_ttl: 30
  
     ## @param timeout - uint32 - optional - default:3000
     ## The timeout of traceroute network calls.
     ## The timeout is in millisecond.
     #
     # timeout: 3000
  
     ## @param min_collection_interval - int - optional - default:60
     ## Interval between each traceroute runs for each destination.
     # min_collection_interval: <interval_in_seconds>
   ```

3. Restart the Agent after making these configuration changes to start seeing network paths.

{{% /tab %}}

{{< /tabs >}}


**Note**: Network path is only supported for Linux environments. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/performance/setup/
[2]: https://docs.datadoghq.com/agent/configuration/proxy/?tab=linux