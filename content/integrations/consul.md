---
title: Datadog-Consul Integration
integration_title: Consul
kind: integration
git_integration_title: consul
newhlevel: true
---

## Overview

Connect Consul to Datadog in order to:

* Correlate the performance of Consul with the rest of your applications
* Monitor the health of your Consul cluster

## Configuration 

To capture Consul metrics you need to install the Datadog Agent.

1. Configure the Agent to connect to Consul, edit `conf.d/consul.yaml`
{{< highlight yaml>}}
init_config:

instances:
    # Where your Consul HTTP Server Lives
    - url: http://localhost:8500

      # collect per-service node status and per-node service status?
      catalog_checks: yes

      # to emit leader election events
      self_leader_check: yes

      # to collect node-to-node latencies, both intra- and inter-datacenter
      network_latency_checks: yes
          
{{< /highlight >}}
2. Configure Consul to emit metrics to DogStatsD (the name of your config file may vary) and restart it, edit `default.json`
{{< highlight json>}}
{
  "check_update_interval": "0s",
  "data_dir": "/mnt/consul",
  "server": true,
  "bootstrap": false,
  "ui_dir": "/var/lib/consul/ui",
  "client_addr": "127.0.0.1",
  "recursor": "8.8.8.8",
  "telemetry": {
      "dogstatsd_addr": "127.0.0.1:8125"
  },
  "acl_default_policy": "allow",
  "acl_down_policy": "extend-cache",
  "bind_addr": "0.0.0.0",
  "log_level": "info",
  "node_name": "Node-37291",
  "advertise_addr": "10.0.2.15",
  "enable_syslog": true
}
{{< /highlight >}}

        
3. Restart the Agent

{{< insert-example-links >}}

## Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:
{{< highlight shell>}}
Checks
======

  [...]

  consul
  ------
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
{{< /highlight >}}

## Metrics

{{< get-metrics-from-git >}}

For each service that you're monitoring we'll create the `consul.catalog.nodes_up` gauge metric tagged by `consul_service_id` that will let you know how many Consul nodes are running each service. 

We'll also collect `consul.catalog.service_u` tagged by `consul_node_id` that measures how many services a node is running.
Finally, we perform a service check `consul.check` that will report on the state of each service.

The other consul metrics collected are not service bound but node bound, and only `consul.peers` is tagged with `mode:leader` or `mode:follower`.

