---
title: Setup
kind: documentation
description: Setting up Network Path 
is_beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/"
  tag: "Blog"
  text: "Monitor cloud architecture and app dependencies with Datadog NPM"
- link: "https://www.datadoghq.com/blog/network-performance-monitoring"
  tag: "Blog"
  text: "Monitor cloud endpoint health with cloud service autodetection"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Network Path for Datadog Network Performance Monitoring is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">The instructions provided below are intended solely for setting up the Datadog Agent to gather network path data. To configure the Datadog app to display the collected network path data, please contact your Customer Success Manager.</div>


## Setup Instructions for Static Paths


1. Agent version `7.55` or higher is required.
2. Enable the `system-probe` traceroute module.

Enable the `system-probe` traceroute module in `/etc/datadog-agent/system-probe.yaml` by adding the following:

```
traceroute:
  enabled: true
```

4. Configure the `network_path` integration to monitor new Destinations from the Agent by creating/editing the `/etc/datadog-agent/conf.d/network_path.d/conf.yaml` file:

```
Example:

init_config:
  min_collection_interval: 60 # in seconds, default 60 seconds
instances:
  # configure the endpoints you want to monitor, one check instance per endpoint 
  - hostname: api.datadoghq.eu
  - hostname: www.example.com
  - hostname: dns.google.com
  - hostname: 8.8.8.8
  - hostname: 8.8.4.4
  - hostname: 1.1.1.1
 ```


Detailed available configuration:

```
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
 

## Setup Instructions for Dynamic Paths

1. Agent version `7.55` or higher is required.
2. Enable [NPM][1].
3. Enable the `system-probe` traceroute module.

Enable the `system-probe` traceroute module in `/etc/datadog-agent/system-probe.yaml` by adding the following:

```
traceroute:
  enabled: true
```

4.  Enable network_path to Monitor NPM Connections by creating/editing the `/etc/datadog-agent/datadog.yaml` file: 

```
Example:

network_path:
  connections_monitoring:
    enabled: true
  collector:
    workers: 10 # default 4
```
 

Detailed available configuration:

```
network_path:
  connections_monitoring:
    ## @param enabled - bool - required - default:false
    ## Toggle Network Path collection for NPM connections
    #
    enabled: true
  collector:
    ## @param workers - int - optional - default:4
    ## Toggle Network Path collection for NPM connections
    #
	workers: 10
```
 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/performance/setup/