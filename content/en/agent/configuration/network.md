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

<div class="alert alert-danger">
Traffic is always initiated by the Agent to Datadog. No sessions are ever initiated from Datadog back to the Agent.
</div>

All Agent traffic is sent over SSL. The destination is dependent on the Datadog service and site. To see destinations based on your [Datadog site][11], click the `DATADOG SITE` selector on the right.

## Installation

Add the following domains to your inclusion list to allow for Agent installation:

- `install.datadoghq.com`
- `yum.datadoghq.com`
- `keys.datadoghq.com`
- `apt.datadoghq.com`
- `windows-agent.datadoghq.com`

## Destinations
<div class="alert alert-warning">
Starting with version 7.67.0, the Agent converts Datadog sites to fully qualified domain names (by adding a dot at the end of the domain) to reduce the number of DNS queries.
For example, it sends APM payloads to <code>trace.agent.datadoghq.com.</code>.<br>
This behavior can be disabled in version 7.72.0 and later by setting <code>convert_dd_site_fqdn.enabled</code> to <code>false</code> in the configuration, or with the environment variable <code>DD_CONVERT_DD_SITE_FQDN_ENABLED=false</code>.
</div>

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}<br>
`instrumentation-telemetry-intake.`{{< region-param key="dd_site" code="true" >}}

[LLM Observabilty][23]
: `llmobs-intake.`{{< region-param key="dd_site" code="true" >}}

[Container Images][13]
: `contimage-intake.`{{< region-param key="dd_site" code="true" >}}

[Live Containers][3], [Live Process][4], [Cloud Network Monitoring][24], [Universal Service Monitoring][25]
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

[Cloud Security Vulnerabilities][29]
: `sbom-intake.`{{< region-param key="dd_site" code="true" >}}

[Synthetic Monitoring Private Locations][8]
: Synthetics Worker v1.5.0 or later: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} is the only endpoint you need to configure.<br>
API test results for the Synthetics Worker > v0.1.6: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Browser test results for the Synthetics Worker > v0.2.0: `intake-v2.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
API test results for the Synthetics Worker < v0.1.5: `api.`{{< region-param key="dd_site" code="true" >}}

{{% site-region region="us,eu,us3,us5,ap1,ap2" %}}

[Remote Configuration][101]
: `config.`{{< region-param key="dd_site" code="true" >}}

[Database Monitoring][102]
: `dbm-metrics-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`dbquery-intake.`{{< region-param key="dd_site" code="true" >}}

[101]: /remote_configuration
[102]: /database_monitoring/

{{% /site-region %}}

{{% logs-tcp-disclaimer %}}

[Logs][30] & [HIPAA logs][31]
: [Deprecated] TCP: {{< region-param key=tcp_endpoint code="true" >}}<br>
HTTP: {{< region-param key=agent_http_endpoint code="true" >}}<br>
Other: See [logs endpoints][32]

[HIPAA logs legacy][31]
: {{< region-param key=hipaa_logs_legacy code="true" >}}

[Metrics][26], [Service Checks][27], [Events][28], and other Agent metadata
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

<div class="alert alert-danger">
All outbound traffic is sent over SSL through TCP or UDP.
<br><br>
Ensure the Agent is only accessible by your applications or trusted network sources using a firewall rule or similar network restriction. Untrusted access can allow malicious actors to perform several invasive actions, including but not limited to writing traces and metrics to your Datadog account, or obtaining information about your configuration and services.
</div>

Open the following ports to benefit from all the **Agent** functionalities:

#### Outbound

{{% site-region region="us,eu" %}}

| Product/Functionality | Port | Protocol | Description |
| ------  | ---- | ------- | ----------- |
| Agent<br>APM<br>Containers<br>Live Processes<br>Metrics<br>Cloud Network Monitoring<br>Universal Service Monitoring | 443 | TCP | Most Agent data uses port 443. |
| [Custom Agent Autoscaling][22] | 8443 | TCP |  |
| Log collection | {{< region-param key=web_integrations_port >}} | [Deprecated] TCP | Logging over TCP. <br>**Note**:TCP log collection is **not supported**. Datadog provides **no delivery or reliability guarantees** when using TCP, and log data may be lost without notice.
For reliable ingestion, use the HTTP intake endpoint, an official Datadog Agent, or forwarder integration instead. For other connection types, see [logs endpoints][21]. |
| NTP | 123 | UDP | Network Time Protocol (NTP). See [default NTP targets][20].<br>For information on troubleshooting NTP, see [NTP issues][19]. |

[19]: /agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /integrations/ntp/#overview
[21]: /logs/log_collection/#logging-endpoints
[22]: /containers/guide/cluster_agent_autoscaling_metrics

{{% /site-region %}}

{{% site-region region="us3,us5,gov,ap1,ap2" %}}

| Product/Functionality | Port | Protocol | Description |
| ------  | ---- | ------- | ----------- |
| Agent<br>APM<br>Containers<br>Live Processes<br>Metrics<br>Cloud Network Monitoring<br>Universal Service Monitoring | 443 | TCP | Most Agent data uses port 443. |
| NTP | 123 | UDP | Network Time Protocol (NTP). See [default NTP targets][20].<br>For information on troubleshooting NTP, see [NTP issues][19]. |

[19]: /agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /integrations/ntp/#overview

{{% /site-region %}}

#### Inbound

Used for Agent services communicating with each other locally within the host only.

| Product/Functionality | Port | Protocol | Description |
| ------  | ---- | ------- | ----------- |
| [Agent browser GUI][16] | 5002 | TCP |  |
| APM receiver | 8126 | TCP | Includes Tracing and the Profiler. |
| [DogStatsD][18] | 8125 | UDP | Port for DogStatsD unless `dogstatsd_non_local_traffic` is set to true. This port is available on IPv4 localhost: `127.0.0.1`. |
| go_expvar server (APM) | 5012 | TCP | For more information, see [the go_expar integration documentation][15]. |
| go_expvar integration server | 5000 | TCP | For more information, see [the go_expar integration documentation][15]. |
| IPC API | 5001 | TCP | Port used for Inter Process Communication (IPC). |
| Process Agent debug | 6062 | TCP | Debug endpoints for the Process Agent. |
| Process Agent runtime | 6162 | TCP | Runtime configuration settings for the Process Agent. |

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

<div class="alert alert-danger">If you change the DogStatsD port or APM receiver port value here, you must also change the APM tracing library configuration for the corresponding port. See the information about configuring ports in the <a href="/tracing/trace_collection/library_config/">Library Configuration docs for your language</a>.</div>

## Using proxies

For a detailed configuration guide on proxy setup, see [Agent Proxy Configuration][9].

## Data buffering

If the network becomes unavailable, the Agent stores the metrics in memory.
The maximum memory usage for storing the metrics is defined by the `forwarder_retry_queue_payloads_max_size` configuration setting. When this limit is reached, the metrics are dropped.

Agent v7.27.0 or later stores the metrics on disk when the memory limit is reached. Enable this capability by setting `forwarder_storage_max_size_in_bytes` to a positive value indicating the maximum amount of storage space, in bytes, that the Agent can use to store the metrics on disk.

The metrics are stored in the folder defined by the `forwarder_storage_path` setting, which is by default `/opt/datadog-agent/run/transactions_to_retry` on Unix systems, and `C:\ProgramData\Datadog\run\transactions_to_retry` on Windows.

To avoid running out of storage space, the Agent stores the metrics on disk only if the total storage space used is less than 80 percent. This limit is defined by `forwarder_storage_max_disk_ratio` setting.

## Installing the Datadog Operator

If you are installing the Datadog Operator in a Kubernetes environment with limited connectivity, you need to allowlist the following endpoints for TCP port 443, based on your location:

- `gcr.io/datadoghq` (GCR US)
- `eu.gcr.io/datadoghq` (GCR Europe)
- `asia.gcr.io/datadoghq` (GCR Asia)
- `datadoghq.azurecr.io` (Azure)
- `public.ecr.aws/datadog` (AWS)
- `docker.io/datadog` (DockerHub)


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
[15]: /integrations/go_expvar/
[16]: /agent/basic_agent_usage/#gui
[17]: /tracing/
[18]: /developers/dogstatsd/
[19]: /agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /integrations/ntp/#overview
[21]: /logs/log_collection/#logging-endpoints
[22]: /containers/guide/cluster_agent_autoscaling_metrics
[23]: /llm_observability/
[24]: /network_monitoring/cloud_network_monitoring/
[25]: /universal_service_monitoring/
[26]: /metrics/
[27]: /developers/service_checks/
[28]: /events/
[29]: /security/cloud_security_management/vulnerabilities/
[30]: /logs/
[31]: /data_security/logs/#hipaa-enabled-customers
[32]: /logs/log_collection/#logging-endpoints
