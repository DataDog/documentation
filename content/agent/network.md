---
title: Network Traffic
kind: documentation
aliases:
    - /agent/proxy
    - /account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service
    - /account_management/faq/can-i-whitelist-the-ip-addresses-for-data-coming-from-datadog-via-webhook-and-integrations
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: Collect your logs
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: Collect your processes
- link: "tracing"
  tag: "Documentation"
  text: Collect your traces
---

**Traffic is always initiated by the agent to Datadog. No sessions are ever initiated from Datadog back to the agent**:

* All traffic is sent over SSL
* The destination for [APM][1] data is `trace.agent.datadoghq.com`
* The destination for [Live Containers][2] data is `process.datadoghq.com`
* The destination for [Logs][3] data is `intake.logs.datadoghq.com `
* The destination for all other agent data is
  * **Agents < 5.2.0** `app.datadoghq.com`
  *  **Agents >= 5.2.0** `<version>-app.agent.datadoghq.com`

This decision was taken after the POODLE problem, now versioned endpoints start with Agent 5.2.0, i.e. each version of the agent hits a different endpoint based on the version of the *Forwarder*.  

* i.e. Agent 5.2.0 hits `5-2-0-app.agent.datadoghq.com`  

As a consequence whitelist `*.agent.datadoghq.com` in your firewalls.

These domains are **CNAME** records pointing to a set of static IP addresses, these addresses can be found at:  

* **[https://ip-ranges.datadoghq.com][4]**

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

**All traffic is sent (outbound only) over SSL via 443 TCP.**

Open the following ports in order to benefit from all the agent functionalities: 

### Agent v6

* `123/UDP`: NTP - [More details on the importance of NTP here][5].
* `5000/tcp`: port for the [go_expvar server][6]
* `5001/tcp`: port on which the IPC api listens
* `5002/tcp`: port for [the Agent browser GUI to be served][7]
* `8125/udp`: dogstatsd
    
    Unless `dogstatsd_non_local_traffic` is set to true. This port is available on localhost: 

    * `127.0.0.1`
    * `::1` 
    * `fe80::1`
* `8126/tcp`: port for the [APM Receiver][1]
* `10516/tcp`: port for the [Log collection][3]
* `10255/tcp`: port for the [Kubernetes http kubelet][8]
* `10250/tcp`: port for the [Kubernetes https kubelet][8]

### Agent v4 and v5 

* `123/UDP`: NTP - [More details on the importance of NTP here][5].
* **`8125/udp`**: dogstatsd

  Unless `non_local_traffic` is set to true. Those port are available on localhost: 

  * `127.0.0.1`
  * `::1` 
  * `fe80::1`

* `8126/tcp`: port for the [APM Receiver][1]
* `17123/tcp`: agent forwarder, used to buffer traffic in case of network splits between the agent and Datadog
* `17124/tcp`: optional graphite adapter

## Using Proxies

For a detailed configuration guide on proxy setup, head over to [Proxy Configuration][9].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing
[2]: /graphing/infrastructure/livecontainers
[3]: /logs
[4]: https://ip-ranges.datadoghq.com
[5]: /agent/faq/network-time-protocol-ntp-offset-issues/
[6]: /integrations/go_expvar/
[7]: /agent/#using-the-gui
[8]: /agent/basic_agent_usage/kubernetes/
[9]: /agent/proxy
