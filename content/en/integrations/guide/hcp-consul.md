# Monitoring HCP Consul with Datadog

The [Datadog Consul Integration][1] can collect information about your HCP Consul environment through a Consul client.

## Overview

HCP Consul is a version of Consul in which the control plane is managed by HashiCorp Cloud Platform. 

## Setup 
1. Ensure you have set up HCP Consul according to the [documentation][2].
2. Install the Datadog agent on your [Consul client][3].
3. Edit the [`consul.d/conf.yaml` file][4], in the `conf.d/` folder at the root of your [Agent's configuration directory][9] and set the `url` configuration option to your Consul client URL.
5. Restart the [Agent][5].

## Metrics Collected 

Using The Datadog Consul Integration with HCP Consul collects a subset of the Consul Integration's [default metrics][6] that do not pertain to [server health][7], including:   
- Information about Consul nodes
- Network coordinates - inter- and intra-datacenter latencies
- Cluster health [metrics][8]

[1]: /integrations/consul/?tab=host
[2]: https://learn.hashicorp.com/tutorials/cloud/consul-introduction?in=consul/cloud-get-started
[3]: https://learn.hashicorp.com/tutorials/cloud/consul-client-virtual-machines?in=consul/cloud-get-started
[4]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/integrations/consul/?tab=host#metrics
[7]: https://www.consul.io/docs/agent/telemetry#server-health
[8]: https://www.consul.io/docs/agent/telemetry#cluster-health
[9]: /agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
