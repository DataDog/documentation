---
title: Network Traffic
kind: documentation
aliases:
    - /agent/proxy
    - /account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service
    - /account_management/faq/can-i-whitelist-the-ip-addresses-for-data-coming-from-datadog-via-webhook-and-integrations
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: Collect your logs
- link: "/graphing/infrastructure/process"
  tag: "Documentation"
  text: Collect your processes
- link: "/tracing"
  tag: "Documentation"
  text: Collect your traces
---

## Network Security

1. **Traffic is always initiated by the agent to Datadog. No sessions are ever initiated from Datadog back to the agent**
2. All traffic is sent over SSL
3. The destination for all agent data is
    1. **Agents < 5.2.0** `app.datadoghq.com`
    1. **Agents >= 5.2.0** `<version>-app.agent.datadoghq.com`

This decision was taken after the POODLE problem, now versioned endpoints start with Agent 5.2.0, i.e. each version of the agent hits a different endpoint based on the version of the *Forwarder*.  

* i.e. Agent 5.2.0 hits `5-2-0-app.agent.datadoghq.com`  

As a consequence whitelist `*.agent.datadoghq.com` in your firewalls.

These domains are **CNAME** records pointing to a set of static IP addresses, these addresses can be found at:  

* [https://ip-ranges.datadoghq.com](https://ip-ranges.datadoghq.com)

The information is structured as JSON following this schema: 

```
{
    "version": 1,                       // <-- we increment this every time the information is changed
    "modified": "YYYY-MM-DD-HH-MM-SS",  // <-- the timestamp of the last modification
    "agents": {                         // <-- in this section the IPs used for the agent traffic intake
        "prefixes_ipv4": [              // <-- a list of IPv4 CIDR blocks
            "a.b.c.d/x",
            ...
        ],
        "prefixes_ipv6": [              // <-- a list of IPv6 CIDR blocks
            ...
        ]
    },
    "webhooks": {                       // <-- same structure as "agents" but this section is not relevant
        ...                             //     for agent traffic (webhooks delivered by Datadog to the internet)
    }
}
```

## Open Ports

### Agent v6

* `5000`: port for the [go_expvar server](/integrations/go_expvar/)
* `5001`: port on which the IPC api listens
* `5002`: port for [the Agent browser GUI to be served](/agent/#using-the-gui)
* `8125/udp`: dogstatsd
    
    Unless `dogstatsd_non_local_traffic` is set to true. This port is available on localhost: 

    * `127.0.0.1`
    * `::1` 
    * `fe80::1`
* `8126`: port for the [APM Receiver](/tracing)
* `10516`: port for the [Log collection](/logs)
* `10255`: port for the [Kubernetes http kubelet](/agent/basic_agent_usage/kubernetes/)
* `10250`: port for the [Kubernetes https kubelet](/agent/basic_agent_usage/kubernetes/)

### Agent v4 and v5 

  * **`17123/tcp`**: agent forwarder, used to buffer traffic in case of network
  splits between the agent and Datadog
  * **`17124/tcp`**: optional graphite adapter
  * **`8125/udp`**: dogstatsd

  Unless `non_local_traffic` is set to true. Those port are available on localhost: 

  * `127.0.0.1`
  * `::1` 
  * `fe80::1`

## Using Proxies

For a detailed configuration guide on proxy setup, head over to [Proxy Configuration](/agent/proxy).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
