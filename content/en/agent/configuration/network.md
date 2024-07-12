---
title: Network Traffic
aliases:
    - /account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service
    - /account_management/faq/can-i-whitelist-the-ip-addresses-for-data-coming-from-datadog-via-webhook-and-integrations
    - /agent/network
    - /agent/faq/network
    - /agent/guide/network
further_reading:
    - link: '/getting_started/site'
      tag: 'Documentation'
      text: 'Learn about the Datadog site'
    - link: '/logs/'
      tag: 'Documentation'
      text: 'Collect your logs'
    - link: '/infrastructure/process'
      tag: 'Documentation'
      text: 'Collect your processes'
    - link: 'tracing'
      tag: 'Documentation'
      text: 'Collect your traces'
algolia:
  tags: ['network traffic', 'destinations', 'ports', 'data buffering', 'static IP addresses']
---

## Overview

<div class="alert alert-warning">
Traffic is always initiated by the Agent to Datadog. No sessions are ever initiated from Datadog back to the Agent.
</div>

All Agent traffic is sent over SSL. The destination is dependent on the Datadog service and site. To see destinations based on your [Datadog site][11], click the `DATADOG SITE` selector on the right.

## Destinations

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}<br>
`instrumentation-telemetry-intake.`{{< region-param key="dd_site" code="true" >}}

[Container Images][13]
: `contimage-intake.`{{< region-param key="dd_site" code="true" >}}

[Live Containers][3] & [Live Process][4]
: `process.`{{< region-param key="dd_site" code="true" >}}

[Network Device Monitoring][10]
: `ndm-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`snmp-traps-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`ndmflow-intake.`{{< region-param key="dd_site" code="true" >}}

[Network Path][14]
: `netpath-intake.`{{< region-param key="dd_site" code="true" >}}

[Orchestrator][5]
: `orchestrator.`{{< region-param key="dd_site" code="true" >}}<br>
`contlcycle-intake.`{{< region-param key="dd_site" code="true" >}}

[Profiling][7]
: `intake.profile.`{{< region-param key="dd_site" code="true" >}}

[Real User Monitoring (RUM)][6]
: {{< region-param key="browser_sdk_endpoint_domain" code="true" >}}

[Synthetic Monitoring Private Locations][8]
: Synthetics Worker v1.5.0 or later: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} is the only endpoint you need to configure.<br>
API test results for the Synthetics Worker > v0.1.6: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Browser test results for the Synthetics Worker > v0.2.0: `intake-v2.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
API test results for the Synthetics Worker < v0.1.5: `api.`{{< region-param key="dd_site" code="true" >}}

{{% site-region region="us,eu,us3,us5,ap1" %}}

[Remote Configuration][101]
: `config.`{{< region-param key="dd_site" code="true" >}}

[Database Monitoring][102]
: `dbm-metrics-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`dbquery-intake.`{{< region-param key="dd_site" code="true" >}}

[101]: /agent/remote_config
[102]: /database_monitoring/

{{% /site-region %}}

{{% site-region region="us" %}}
[Logs][200] & [HIPAA logs][201]
: TCP: `agent-intake.logs.datadoghq.com`<br>
HTTP: `agent-http-intake.logs.datadoghq.com`<br>
Other: See [logs endpoints][203]

[HIPAA logs legacy][201]
: `tcp-encrypted-intake.logs.datadoghq.com`<br>
`lambda-tcp-encrypted-intake.logs.datadoghq.com`<br>
`gcp-encrypted-intake.logs.datadoghq.com`<br>
`http-encrypted-intake.logs.datadoghq.com`

[200]: /logs/
[201]: /data_security/logs/#hipaa-enabled-customers
[203]: /logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="eu" %}}
[Logs][200] & [HIPAA logs][201]
: TCP: `agent-intake.logs.datadoghq.eu`<br>
HTTP: `agent-http-intake.logs.datadoghq.eu`<br>
Other: See [logs endpoints][202]

[HIPAA logs legacy][201]
: `tcp-encrypted-intake.logs.datadoghq.eu`<br>
`lambda-tcp-encrypted-intake.logs.datadoghq.eu`<br>
`gcp-encrypted-intake.logs.datadoghq.eu`<br>
`http-encrypted-intake.logs.datadoghq.eu`

[200]: /logs/
[201]: /data_security/logs/#hipaa-enabled-customers
[202]: /logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="us3" %}}
[Logs][200] & [HIPAA logs][201]
: HTTP: `agent-http-intake.logs.us3.datadoghq.com`<br>
Other: See [logs endpoints][202]

[HIPAA logs legacy][201]
: `lambda-tcp-encrypted-intake.logs.us3.datadoghq.com`<br>
`gcp-encrypted-intake.logs.us3.datadoghq.com`<br>
`http-encrypted-intake.logs.us3.datadoghq.com`

[200]: /logs/
[201]: /data_security/logs/#hipaa-enabled-customers
[202]: /logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="us5" %}}
[Logs][200] & [HIPAA logs][201]
: HTTP: `agent-http-intake.logs.us5.datadoghq.com`<br>
Other: See [logs endpoints][202]

[HIPAA logs legacy][201]
: `lambda-tcp-encrypted-intake.logs.us5.datadoghq.com`<br>
`gcp-encrypted-intake.logs.us5.datadoghq.com`<br>
`http-encrypted-intake.logs.us5.datadoghq.com`

[200]: /logs/
[201]: /data_security/logs/#hipaa-enabled-customers
[202]: /logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="ap1" %}}
[Logs][200] & [HIPAA logs][201]
: HTTP: `agent-http-intake.logs.ap1.datadoghq.com`<br>
Other: See [logs endpoints][202]

[200]: /logs/
[201]: /data_security/logs/#hipaa-enabled-customers
[202]: /logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="gov" %}}
[Logs][200] & [HIPAA logs][201]
: HTTP: `agent-http-intake.logs.ddog-gov.com`<br>
Other: See [logs endpoints][202]

[HIPAA logs legacy][201]
: `lambda-tcp-encrypted-intake.logs.ddog-gov.com`<br>
`gcp-encrypted-intake.logs.ddog-gov.com`<br>
`http-encrypted-intake.logs.ddog-gov.com`

[200]: /logs/
[201]: /data_security/logs/#hipaa-enabled-customers
[202]: /logs/log_collection/#logging-endpoints
{{% /site-region %}}

All other Agent data
: `<VERSION>-app.agent.`{{< region-param key="dd_site" code="true" >}}<br>
For example, Agent v7.31.0 reports to `7-31-0-app.agent.`{{< region-param key="dd_site" code="true" >}}. You must add `*.agent.`{{< region-param key="dd_site" code="true" >}} to your inclusion list in your firewall(s).<br>
Since v6.1.0, the Agent also queries Datadog's API to provide non-critical functionality (For example, display validity of configured API key):<br>
Agent v7.18.0 or 6.18.0 and later: `api.`{{< region-param key="dd_site" code="true" >}}<br>
Agent < v7.18.0 or 6.18.0: `app.`{{< region-param key="dd_site" code="true" >}}

[Agent flare][12]
: `<VERSION>-flare.agent.`{{< region-param key="dd_site" code="true" >}}<br>
For example, Agent v7.31.0 sends flare data to `7-31-0-flare.agent.`{{< region-param key="dd_site" code="true" >}}. You must add `*.agent.`{{< region-param key="dd_site" code="true" >}} to your inclusion list in your firewall(s).<br>

### Static IP addresses

All of these domains are **CNAME** records pointing to a set of static IP addresses. These addresses can be found at `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

The information is structured as JSON following this schema:

{{< code-block lang="text" disable_copy="true" >}}
{
    "version": 1,                          // <-- incremented every time this information is changed
    "modified": "YYYY-MM-DD-HH-MM-SS",     // <-- timestamp of the last modification
    "agents": {                            // <-- the IPs used by the Agent to submit metrics to Datadog
        "prefixes_ipv4": [                 // <-- list of IPv4 CIDR blocks
            "a.b.c.d/x",
            ...
        ],
        "prefixes_ipv6": [                 // <-- list of IPv6 CIDR blocks
            ...
        ]
    },
    "api": {...},                          // <-- the IPs used by the Agent for non-critical functionality (querying information from API)
    "apm": {...},                          // <-- the IPs used by the Agent to submit APM data to Datadog
    "logs": {...},                         // <-- the IPs used by the Agent to submit logs to Datadog
    "process": {...},                      // <-- the IPs used by the Agent to submit process data to Datadog
    "orchestrator": {...},                 // <-- the IPs used by the Agent to submit container data to Datadog
    "remote-configuration": {...},         // <-- the IPs used by the Agent to retrieve its dynamic configuration
    "synthetics": {...},                   // <-- the source IPs used by Synthetic workers (not used by the Agent)
    "synthetics-private-locations": {...}, // <-- the IPs used by Synthetics Private Locations workers to submit data to Datadog (not used by the Agent)
    "webhooks": {...}                      // <-- the source IPs used by Datadog to connect to 3rd party infrastructure over HTTP (not used by the Agent)
}
{{< /code-block >}}

Each section has a dedicated endpoint, for example:

- `https://ip-ranges.{{< region-param key="dd_site" >}}/logs.json` for the IPs used to receive logs data over TCP.
- `https://ip-ranges.{{< region-param key="dd_site" >}}/apm.json` for the IPs used to receive APM data.

### Inclusion

Add all of the `ip-ranges` to your inclusion list. While only a subset are active at any given moment, there are variations over time within the entire set due to regular network operation and maintenance.

## Open ports

<div class="alert alert-warning">
All outbound traffic is sent over SSL through TCP or UDP.
<br><br>
Ensure the Agent is only accessible by your applications or trusted network sources using a firewall rule or similar network restriction. Untrusted access can allow malicious actors to perform several invasive actions, including but not limited to writing traces and metrics to your Datadog account, or obtaining information about your configuration and services.
</div>

Open the following ports to benefit from all the **Agent** functionalities:
{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

#### Outbound

{{% site-region region="us" %}}

443/tcp
: Port for most Agent data (Metrics, APM, Live Processes & Containers).

123/udp
: Port for NTP ([more details on the importance of NTP][1]).<br>
See [default NTP targets][2].

8443/tcp
: Port for [Custom Agent Autoscaling][5].

10516/tcp
: Port for log collection over TCP.<br>
See [logs endpoints][3] for other connection types.

10255/tcp
: Port for the [Kubernetes HTTP Kubelet][4].

10250/tcp
: Port for the [Kubernetes HTTPS Kubelet][4].

[1]: /agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /integrations/ntp/#overview
[3]: /logs/log_collection/#logging-endpoints
[4]: /agent/basic_agent_usage/kubernetes/
[5]: /containers/guide/cluster_agent_autoscaling_metrics

{{% /site-region %}}

{{% site-region region="eu" %}}

443/tcp
: Port for most Agent data (Metrics, APM, Live Processes & Containers).

123/udp
: Port for NTP ([more details on the importance of NTP][1]).<br>
See [default NTP targets][2].

443/tcp
: Port for log collection over TCP.<br>
See [logs endpoints][3] for other connection types.

10255/tcp
: Port for the [Kubernetes HTTP Kubelet][4].

10250/tcp
: Port for the [Kubernetes HTTPS Kubelet][4].

[1]: /agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /integrations/ntp/#overview
[3]: /logs/log_collection/#logging-endpoints
[4]: /agent/basic_agent_usage/kubernetes/

{{% /site-region %}}

{{% site-region region="us3,us5,gov,ap1" %}}

443/tcp
: Port for most Agent data (Metrics, APM, Live Processes & Containers).

123/udp
: Port for NTP ([more details on the importance of NTP][1]).<br>
See [default NTP targets][2].

10255/tcp
: Port for the [Kubernetes HTTP Kubelet][4].

10250/tcp
: Port for the [Kubernetes HTTPS Kubelet][4].

[1]: /agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /integrations/ntp/#overview
[3]: /logs/log_collection/#logging-endpoints
[4]: /agent/basic_agent_usage/kubernetes/

{{% /site-region %}}

#### Inbound

Used for Agent services communicating with each other locally within the host only.

5000/tcp
: Port for the [go_expvar server][1].

5001/tcp
: Port the IPC API listens to.

5002/tcp
: Port for the [Agent browser GUI][2].

5012/tcp
: Port for the APM [go_expvar server][1].

6062/tcp
: Port for the debug endpoints for the Process Agent.

6162/tcp
: Port for configuring runtime settings for the Process Agent.

8125/udp
: Port for DogStatsD unless `dogstatsd_non_local_traffic` is set to true. This port is available on localhost: `127.0.0.1`, `::1`, `fe80::1`.

8126/tcp
: Port for the [APM receiver][3]

[1]: /integrations/go_expvar/
[2]: /agent/basic_agent_usage/#gui
[3]: /tracing/
{{% /tab %}}
{{% tab "Agent v5 & v4" %}}

#### Outbound

443/tcp
: Port for most Agent data (Metrics, APM, Live Processes & Containers).

123/udp
: Port for NTP ([more details on the importance of NTP][1]).<br>
See [default NTP targets][2].

#### Inbound

6062/tcp
: Port for the debug endpoints for the Process Agent.

6162/tcp
: Port for configuring runtime settings for the Process Agent.

8125/udp
: Port for DogStatsD unless `dogstatsd_non_local_traffic` is set to true. This port is available on localhost: `127.0.0.1`, `::1`, `fe80::1`.

8126/tcp
: Port for the [APM Receiver][3].

17123/tcp
: Agent forwarder, used to buffer traffic in case of network splits between the Agent and Datadog.

17124/tcp
: Optional graphite adapter.

[1]: /agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /integrations/ntp/#overview
[3]: /tracing/
{{% /tab %}}
{{< /tabs >}}

## Configure ports

If you need to change an inbound port because the default port is already in use by an existing service on your network, edit the `datadog.yaml` configuration file. You can find most of the ports in the **Advanced Configuration** section of the file:

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param expvar_port - integer - optional - default: 5000
## @env DD_EXPVAR_PORT - integer - optional - default: 5000
## The port for the go_expvar server.
#
# expvar_port: 5000

## @param cmd_port - integer - optional - default: 5001
## @env DD_CMD_PORT - integer - optional - default: 5001
## The port on which the IPC api listens.
#
# cmd_port: 5001

## @param GUI_port - integer - optional
## @env DD_GUI_PORT - integer - optional
## The port for the browser GUI to be served.
## Setting 'GUI_port: -1' turns off the GUI completely
## Default is:
##  * Windows & macOS : `5002`
##  * Linux: `-1`
##
#
# GUI_port: <GUI_PORT>

{{< /code-block >}}

The APM receiver and the DogStatsD ports are located in the **Trace Collection Configuration** and **DogStatsD Configuration** sections of the `datadog.yaml` configuration file, respectively:

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param dogstatsd_port - integer - optional - default: 8125
## @env DD_DOGSTATSD_PORT - integer - optional - default: 8125
## Override the Agent DogStatsD port.
## Note: Make sure your client is sending to the same UDP port.
#
# dogstatsd_port: 8125

[...]

## @param receiver_port - integer - optional - default: 8126
## @env DD_APM_RECEIVER_PORT - integer - optional - default: 8126
## The port that the trace receiver should listen on.
## Set to 0 to disable the HTTP receiver.
#
# receiver_port: 8126
{{< /code-block >}}

<div class="alert alert-warning">If you change the DogStatsD port or APM receiver port value here, you must also change the APM tracing library configuration for the corresponding port. See the information about configuring ports in the <a href="/tracing/trace_collection/library_config/">Library Configuration docs for your language</a>.</div>

## Using proxies

For a detailed configuration guide on proxy setup, see [Agent Proxy Configuration][9].

## Data buffering

If the network becomes unavailable, the Agent stores the metrics in memory.
The maximum memory usage for storing the metrics is defined by the `forwarder_retry_queue_payloads_max_size` configuration setting. When this limit is reached, the metrics are dropped.

Agent v7.27.0 or later stores the metrics on disk when the memory limit is reached. Enable this capability by setting `forwarder_storage_max_size_in_bytes` to a positive value indicating the maximum amount of storage space, in bytes, that the Agent can use to store the metrics on disk.

The metrics are stored in the folder defined by the `forwarder_storage_path` setting, which is by default `/opt/datadog-agent/run/transactions_to_retry` on Unix systems, and `C:\ProgramData\Datadog\run\transactions_to_retry` on Windows.

To avoid running out of storage space, the Agent stores the metrics on disk only if the total storage space used is less than 80 percent. This limit is defined by `forwarder_storage_max_disk_ratio` setting.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/
[2]: /database_monitoring/
[3]: /infrastructure/livecontainers/
[4]: /infrastructure/process/
[5]: /infrastructure/containers/#kubernetes-orchestrator-explorer
[6]: /real_user_monitoring/
[7]: /profiler/
[8]: /synthetics/private_locations
[9]: /agent/configuration/proxy/
[10]: /network_monitoring/devices
[11]: /getting_started/site/
[12]: /agent/troubleshooting/send_a_flare
[13]: /infrastructure/containers/container_images
[14]: /network_monitoring/network_path/
