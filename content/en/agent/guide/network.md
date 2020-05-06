---
title: Network Traffic
kind: guide
aliases:
    - /account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service
    - /account_management/faq/can-i-whitelist-the-ip-addresses-for-data-coming-from-datadog-via-webhook-and-integrations
    - /agent/network
    - /agent/faq/network
further_reading:
    - link: 'logs/'
      tag: 'Documentation'
      text: 'Collect your logs'
    - link: '/infrastructure/process'
      tag: 'Documentation'
      text: 'Collect your processes'
    - link: 'tracing'
      tag: 'Documentation'
      text: 'Collect your traces'
---

**Traffic is always initiated by the Agent to Datadog. No sessions are ever initiated from Datadog back to the Agent**:

{{< site-region region="us" >}}

- All traffic is sent over SSL
- The destination for:

  - [APM][1] data is `trace.agent.datadoghq.com`
  - [Live Containers][2] data is `process.datadoghq.com`
  - [Logs][3] data is `agent-intake.logs.datadoghq.com` for TCP traffic
  - All other Agent data:
      - **Agents < 5.2.0** `app.datadoghq.com`
      - **Agents >= 5.2.0** `<VERSION>-app.agent.datadoghq.com`

        This decision was taken after the POODLE problem. Versioned endpoints start with Agent v5.2.0, where each version of the Agent calls a different endpoint based on the version of the _Forwarder_. For example, Agent v5.2.0 calls `5-2-0-app.agent.datadoghq.com`. Therefore you must whitelist `*.agent.datadoghq.com` in your firewall(s).

Since v6.1.0, the Agent also queries Datadog's API to provide non-critical functionality (ex.: display validity of configured API key):

- **Agent >= 7.18.0/6.18.0** `api.datadoghq.com`
- **Agent < 7.18.0/6.18.0** `app.datadoghq.com`

All of these domains are **CNAME** records pointing to a set of static IP addresses. These addresses can be found at:

- **[https://ip-ranges.datadoghq.com][4]** for Datadog US region.

[1]: /tracing/
[2]: /infrastructure/livecontainers/
[3]: /logs/
[4]: https://ip-ranges.datadoghq.com
{{< /site-region >}}
{{< site-region region="eu" >}}

- All traffic is sent over SSL
- The destination for:

  - [APM][1] data is `trace.agent.datadoghq.eu`
  - [Live Containers][2] data is `process.datadoghq.eu`
  - [Logs][3] data is `agent-intake.logs.datadoghq.eu` for TCP traffic
  - All other Agent data:
      - **Agents < 5.2.0** `app.datadoghq.eu`
      - **Agents >= 5.2.0** `<VERSION>-app.agent.datadoghq.eu`

        This decision was taken after the POODLE problem. Versioned endpoints start with Agent v5.2.0, where each version of the Agent calls a different endpoint based on the version of the _Forwarder_. For example, Agent v5.2.0 calls `5-2-0-app.agent.datadoghq.com`. Therefore you must whitelist `*.agent.datadoghq.eu` in your firewall(s).

Since v6.1.0, the Agent also queries Datadog's API to provide non-critical functionality (ex.: display validity of configured API key):

- **Agent >= 7.18.0/6.18.0** `api.datadoghq.eu`
- **Agent < 7.18.0/6.18.0** `app.datadoghq.eu`

All of these domains are **CNAME** records pointing to a set of static IP addresses. These addresses can be found at:

- **[https://ip-ranges.datadoghq.eu][4]** for Datadog EU region.

[1]: /tracing/
[2]: /infrastructure/livecontainers/
[3]: /logs/
[4]: https://ip-ranges.datadoghq.eu
{{< /site-region >}}

The information is structured as JSON following this schema:

```text
{
    "version": 1,                       // <-- incremented every time this information is changed
    "modified": "YYYY-MM-DD-HH-MM-SS",  // <-- timestamp of the last modification
    "agents": {                         // <-- the IPs used by the Agent to submit metrics to Datadog
        "prefixes_ipv4": [              // <-- list of IPv4 CIDR blocks
            "a.b.c.d/x",
            ...
        ],
        "prefixes_ipv6": [              // <-- list of IPv6 CIDR blocks
            ...
        ]
    },
    "apm": {...},                       // <-- same structure as "agents" but IPs used for the APM Agent data
    "logs": {...},                      // <-- same for the logs Agent data
    "process": {...},                   // <-- same for the process Agent data
    "api": {...},                       // <-- same for non-critical Agent functionality (querying informaton from API)
    "webhooks": {...}                   // <-- not used for Agent traffic (Datadog source IPs delivering webhooks)
}
```

{{< site-region region="us" >}}

Each section has a dedicated endpoint at, for example:

- [https://ip-ranges.datadoghq.com/logs.json][1] for the IPs used to receive logs data over TCP for Datadog US region.
- [https://ip-ranges.datadoghq.com/apm.json][2] for the IPs used to receive APM data for Datadog US region.

[1]: https://ip-ranges.datadoghq.com/logs.json
[2]: https://ip-ranges.datadoghq.com/apm.json

{{< /site-region >}}
{{< site-region region="eu" >}}

Each section has a dedicated endpoint, for example:

- [https://ip-ranges.datadoghq.eu/logs.json][1] for the IPs used to receive logs data over TCP for Datadog EU region.
- [https://ip-ranges.datadoghq.eu/apm.json][2] for the IPs used to receive APM data for Datadog EU region.

[1]: https://ip-ranges.datadoghq.eu/logs.json
[2]: https://ip-ranges.datadoghq.eu/apm.json

{{< /site-region >}}

### Note

You should whitelist all of these IPs. While only a subset are active at any given moment, there are variations over time within the entire set due to regular network operation and maintenance.

## Open Ports

**All outbound traffic is sent over SSL via TCP / UDP.**

Open the following ports in order to benefit from all the Agent functionalities:

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

- **Outbound**:

  - `443/tcp`: port for most Agent data. (Metrics, APM, Live Processes/Containers)
  - `123/udp`: NTP - [More details on the importance of NTP][1].
  - `10516/tcp`: port for the [Log collection][2] over TCP for Datadog US region, `443/tcp` for the Datadog EU region.
  - `10255/tcp`: port for the [Kubernetes http kubelet][3]
  - `10250/tcp`: port for the [Kubernetes https kubelet][3]

- **Inbound (used for Agent services communicating among themselves locally within the host only)**:

  - `5000/tcp`: port for the [go_expvar server][4]
  - `5001/tcp`: port on which the IPC api listens
  - `5002/tcp`: port for [the Agent browser GUI to be served][5]
  - `8125/udp`: dogstatsd. Unless `dogstatsd_non_local_traffic` is set to true. This port is available on localhost:

      - `127.0.0.1`
      - `::1`
      - `fe80::1`

  - `8126/tcp`: port for the [APM Receiver][6]

[1]: /agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /logs/
[3]: /agent/basic_agent_usage/kubernetes/
[4]: /integrations/go_expvar/
[5]: /agent/basic_agent_usage/#gui
[6]: /tracing/
{{% /tab %}}
{{% tab "Agent v5 & v4" %}}

- **Outbound**:

  - `443/tcp`: port for most Agent data. (Metrics, APM, Live Processes/Containers)
  - `123/udp`: NTP - [More details on the importance of NTP][1].

- **Inbound**:

  - `8125/udp`: DogStatsd. Unless `non_local_traffic` is set to true. This port is available on localhost:

      - `127.0.0.1`
      - `::1`
      - `fe80::1`

  - `8126/tcp`: port for the [APM Receiver][2]
  - `17123/tcp`: Agent forwarder, used to buffer traffic in case of network splits between the Agent and Datadog
  - `17124/tcp`: optional graphite adapter

[1]: /agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /tracing/
{{% /tab %}}
{{< /tabs >}}

## Using Proxies

For a detailed configuration guide on proxy setup, see [Agent Proxy Configuration][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/proxy/
