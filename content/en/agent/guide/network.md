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

<div class="alert alert-warning">
Traffic is always initiated by the Agent to Datadog. No sessions are ever initiated from Datadog back to the Agent.
</div>

## Overview

All Agent traffic is sent over SSL. The destination is dependent on the Datadog service and site. To see destinations based on your site, use the `SITE` selector on the right.

## Destinations

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}

[Database Monitoring][2]
: `dbm-metrics-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`dbquery-intake.`{{< region-param key="dd_site" code="true" >}}

[Live Containers][3] & [Live Process][4]
: `process.`{{< region-param key="dd_site" code="true" >}}

[Logs][5] & [HIPAA logs][6]
: TCP: `{{< region-param key="tcp_endpoint" code="true" >}}`<br>
HTTP: `{{< region-param key="agent_http_endpoint" code="true" >}}`<br>
Other: See [logs endpoints][7]

[HIPAA logs legacy][6]
: `tcp-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}<br>
`lambda-tcp-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}<br>
`gcp-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}<br>
`http-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}

[Orchestrator][8]
: `orchestrator.`{{< region-param key="dd_site" code="true" >}}

[Real User Monitoring (RUM)][9]
: `rum.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}}<br>
`session-replay.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}}

[Profiling][10]
: `intake.profile.`{{< region-param key="dd_site" code="true" >}}

[Synthetics private location][11]
: Worker v>=1.5.0 `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} is the only endpoint to configure.<br>
API test results for worker v>0.1.6 `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Browser test results for worker v>0.2.0 `intake-v2.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
API test results for worker v<0.1.5 `api.`{{< region-param key="dd_site" code="true" >}}

[Network Device Monitoring][13]
: `ndm-intake.`{{< region-param key="dd_site" code="true" >}}

All other Agent data
: `<VERSION>-app.agent.`{{< region-param key="dd_site" code="true" >}}<br>
For example, Agent v7.31.0 reports to `7-31-0-app.agent.`{{< region-param key="dd_site" code="true" >}}. Therefore you must add `*.agent.`{{< region-param key="dd_site" code="true" >}} to your inclusion list in your firewall(s).<br>
Since v6.1.0, the Agent also queries Datadog's API to provide non-critical functionality (For example, display validity of configured API key):<br>
**Agent >= 7.18.0/6.18.0** `api.`{{< region-param key="dd_site" code="true" >}}<br>
**Agent < 7.18.0/6.18.0** `app.`{{< region-param key="dd_site" code="true" >}}

All of these domains are **CNAME** records pointing to a set of static IP addresses. These addresses can be found at `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

The information is structured as JSON following this schema:

{{< code-block lang="text" disable_copy="true" >}}
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
    "api": {...},                       // <-- same for non-critical Agent functionality (querying information from API)
    "apm": {...},                       // <-- same structure as "agents" but IPs used for the APM Agent data
    "logs": {...},                      // <-- same for the logs Agent data
    "process": {...},                   // <-- same for the process Agent data
    "orchestrator": {...},              // <-- same for the process Agent data
    "synthetics": {...},                // <-- not used for Agent traffic (Datadog source IPs of bots for synthetic tests)
    "webhooks": {...}                   // <-- not used for Agent traffic (Datadog source IPs delivering webhooks)
}
{{< /code-block >}}

Each section has a dedicated endpoint, for example:

- `https://ip-ranges.{{< region-param key="dd_site" >}}/logs.json` for the IPs used to receive logs data over TCP.
- `https://ip-ranges.{{< region-param key="dd_site" >}}/apm.json` for the IPs used to receive APM data.

### Inclusion

Add all of the `ip-ranges` to your inclusion list. While only a subset are active at any given moment, there are variations over time within the entire set due to regular network operation and maintenance.

## Open ports

<div class="alert alert-warning">
All outbound traffic is sent over SSL through TCP / UDP.
</div>

Open the following ports to benefit from all the **Agent** functionalities:

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

#### Outbound

443/tcp
: Port for most Agent data (Metrics, APM, Live Processes/Containers)

123/udp
: Port for NTP ([more details on the importance of NTP][1]).<br>
See [default NTP targets][2].

{{< region-param key="tcp_endpoint_port_ssl" >}}/tcp
: Port for log collection over TCP.<br>
See [logs endpoints][3] for other connection types.

10255/tcp
: Port for the [Kubernetes HTTP Kubelet][4]

10250/tcp
: Port for the [Kubernetes HTTPS Kubelet][4]

#### Inbound

Used for Agent services communicating with each other locally within the host only.

5000/tcp
: Port for the [go_expvar server][5]

5001/tcp
: Port the IPC API listens to

5002/tcp
: Port for the [Agent browser GUI][6]

8125/udp
: Port for DogStatsD unless `dogstatsd_non_local_traffic` is set to true. This port is available on localhost: `127.0.0.1`, `::1`, `fe80::1`.

8126/tcp
: Port for the [APM receiver][7]

[1]: /agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /integrations/ntp/#overview
[3]: /logs/log_collection/#logging-endpoints
[4]: /agent/basic_agent_usage/kubernetes/
[5]: /integrations/go_expvar/
[6]: /agent/basic_agent_usage/#gui
[7]: /tracing/
{{% /tab %}}
{{% tab "Agent v5 & v4" %}}

#### Outbound

443/tcp
: Port for most Agent data (Metrics, APM, Live Processes/Containers)

123/udp
: Port for NTP ([more details on the importance of NTP][1]).<br>
See [default NTP targets][2].
#### Inbound

8125/udp
: Port for DogStatsD unless `dogstatsd_non_local_traffic` is set to true. This port is available on localhost: `127.0.0.1`, `::1`, `fe80::1`.

8126/tcp
: Port for the [APM Receiver][3]

17123/tcp
: Agent forwarder, used to buffer traffic in case of network splits between the Agent and Datadog

17124/tcp
: Optional graphite adapter

[1]: /agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /integrations/ntp/#overview
[3]: /tracing/
{{% /tab %}}
{{< /tabs >}}

## Using proxies

For a detailed configuration guide on proxy setup, see [Agent Proxy Configuration][12].

## Data buffering

If the network becomes unavailable, the Agent stores the metrics in memory.
The maximum memory usage for storing the metrics is defined by the `forwarder_retry_queue_payloads_max_size` configuration setting. When this limit is reached, the metrics are dropped.

Agent v7.27.0+ stores the metrics on disk when the memory limit is reached. Enable this capability by setting `forwarder_storage_max_size_in_bytes` to a positive value indicating the maximum amount of storage space, in bytes, that the Agent can use to store the metrics on disk.

The metrics are stored in the folder defined by the `forwarder_storage_path` setting, which is by default `/opt/datadog-agent/run/transactions_to_retry` on Unix systems and `C:\ProgramData\Datadog\run\transactions_to_retry` on Windows.

To avoid running out of storage space, the Agent stores the metrics on disk only if the total storage space used is less than 95 percent. This limit is defined by `forwarder_storage_max_disk_ratio` setting.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/
[2]: /database_monitoring/
[3]: /infrastructure/livecontainers/
[4]: /infrastructure/process/
[5]: /logs/
[6]: /security/logs/#hipaa-enabled-customers
[7]: /logs/log_collection/#logging-endpoints
[8]: /infrastructure/livecontainers/#kubernetes-resources-1
[9]: /real_user_monitoring/
[10]: /tracing/profiler/
[11]: /synthetics/private_locations
[12]: /agent/proxy/
[13]: /network_monitoring/devices
