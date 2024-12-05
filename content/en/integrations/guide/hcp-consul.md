---
title: Monitoring HCP Consul with Datadog

further_reading:
  - link: "/integrations/consul/"
    tag: "Documentation"
    text: "Learn about the Consul integration"
---

## Overview

The [Datadog Consul Integration][1] can collect information about your HCP Consul environment through a Consul client. HCP Consul is a version of Consul in which the control plane is managed by [HashiCorp Cloud Platform][10].

## Setup

To start collecting your Consul metrics:

1. Ensure you have set up HCP Consul according to the [Get Started with HCP Consul documentation][2].
2. Install the Datadog Agent on your [Consul client][3].
3. Edit the [`consul.d/conf.yaml` file][4], in the `conf.d/` folder at the root of your [Agent's configuration directory][5] and set the `url` configuration option to your Consul client URL.
5. Restart the [Agent][6].

## Metrics collected

Using the Datadog Consul Integration with HCP Consul collects a subset of the Consul Integration's [default metrics][7] that do not pertain to [server health][8], including the following:

- Information about Consul nodes
- Network coordinates (inter- and intra-data center latencies)
- [Cluster health][9] metrics

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/consul/?tab=host
[2]: https://developer.hashicorp.com/consul/tutorials/get-started-hcp
[3]: https://developer.hashicorp.com/hcp/docs/consul/usage/clients
[4]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example
[5]: /agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: /integrations/consul/?tab=host#metrics
[8]: https://www.consul.io/docs/agent/telemetry#server-health
[9]: https://www.consul.io/docs/agent/telemetry#cluster-health
[10]: https://developer.hashicorp.com/hcp/docs/consul