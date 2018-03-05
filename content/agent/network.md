---
title: Network Traffic
kind: documentation
aliases:
    - /agent/proxy
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

This decision was taken after the POODLE problem, see the [new agent endpoints details](#new-agent-endpoints)

These domains are **CNAME** pointing to a set of static IP addresses, these addresses can be found at:  

* [https://ip-ranges.datadoghq.com](https://ip-ranges.datadoghq.com)

The information is structured as JSON following this schema: 

```json
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

* 17123/tcp: agent forwarder, used to buffer traffic in case of network
  splits between the agent and Datadog
* 17124/tcp: optional graphite adapter
* 8125/udp: dogstatsd

Starting with version 3.4.0, these ports are available on localhost
(127.0.0.1, ::1 and fe80::1 only), unless `non_local_traffic` is set
to true.

## Default Agent Network Traffic

### Debian, Ubuntu, RedHat, CentOS Mac OS X

In most cases (on linux) you run the agent by installing `datadog-agent`: In that case traffic flows like this:

    datadog-agent --(localhost:17123)--> datadog-agent --(https)--> https://app.datadoghq.com

_Or `<version>-app.agent.datadoghq.com` from version 5.2.x_

## Using Proxies

For a detailed configuration guide on proxy setup, head over to [Proxy Configuration](/agent/proxy).

## New agent endpoints

Versioned endpoints start with Agent 5.2.0, i.e. each version of the agent will hit a different endpoint based on the version of the *Forwarder*.  

i.e. Agent 5.2.0 will hit 5-2-0-app.agent.datadoghq.com  

It is safe to assume that we'll be using *.agent.datadoghq.com for a while, however, the -app suffix will likely change in a future version of the Datadog Agent as we are working on a better separation of metrics and metadata.

As a consequence you should whitelist *.agent.datadoghq.com in your firewalls.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}