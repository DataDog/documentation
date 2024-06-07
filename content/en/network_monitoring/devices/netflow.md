---
title: NetFlow Monitoring
kind: documentation
is_beta: true
further_reading:
- link: "/network_monitoring/devices/profiles"
  tag: "Documentation"
  text: "Using Profiles with Network Device Monitoring"
- link: "https://www.datadoghq.com/blog/monitor-netflow-with-datadog/"
  tag: "Blog"
  text: "Monitor NetFlow traffic data with Datadog"
- link: "https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/"
  tag: "Blog"
  text: "Monitor and diagnose network performance issues with SNMP Traps"
---

## Overview

Use NetFlow Monitoring in Datadog to visualize and monitor your flow records from your NetFlow-enabled devices.

## Installation

To use NetFlow Monitoring with Network Device Monitoring, ensure you are using the [Agent][1] version 7.45 or newer.

**Note:** Configuring [metric collection from Network Device Monitoring][2] is not a requirement for sending NetFlow data, although it is strongly recommended as this extra data can be used to enrich your flow records with information such as the device name, model, and vendor, as well as the inbound/outbound interface name.

## Configuration

To configure your devices to send NetFlow, jFlow, sFlow, or IPFIX traffic to the Agent NetFlow server, your devices must be configured to send traffic to the IP address that the Datadog Agent is installed on, specifically the `flow_type` and `port`.

Edit your [`datadog.yaml`][3] Agent configuration file to enable NetFlow:

```yaml
network_devices:
  netflow:
    enabled: true
    listeners:
      - flow_type: netflow9   # choices: netflow5, netflow9, ipfix, sflow5
        port: 2055            # devices must send traffic to this port
      - flow_type: netflow5
        port: 2056
      - flow_type: ipfix
        port: 4739
      - flow_type: sflow5
        port: 6343
```

After saving your changes, [restart the Agent][4].

## Aggregation

The Datadog Agent automatically aggregates the received NetFlow data in order to limit the number of records sent to the platform while maintaining most of the information. By default there is a five-minute aggregation interval, during which flow recordings which share the same identifying information (source and destination address and port, protocol, and so forth) are aggregated together. Additionally, the Datadog Agent can detect ephemeral ports and remove them. As a result, you may see Flows with `port:*`.

## Enrichment

Your NetFlow data is processed by the Datadog backend and enriched with the available metadata from your devices and interfaces. Enrichment is based on the NetFlow exporter IP and the interface indexes. To disambiguate possible collisions between reused private IPs, you can configure a different `namespace` for each Agent configuration file (with the setting `network_devices.namespace`).

If the NetFlow exporter IP is one of the device IPs, but not the one configured on the SNMP integration, Datadog attempts to locate the device that the exporter IP belongs to, and enriches your NetFlow data with it is as long as the match is unique.

### Cloud provider IP enrichment

Datadog enriches IPs with public cloud provider service and region for IPv4 addresses, so you can filter for flow records from a specific service and region.

{{< img src="network_device_monitoring/netflow/netflow_cloud_provider_ip_enrichment.png" alt="Netflow IPs enriched with cloud provider name, region, and service" width="80%" >}}

### Port enrichment

Datadog enriches ports in NetFlow with IANA (Internet Assigned Numbers Authority) data to resolve well known port mappings (such as Postgres on 5432 and HTTPS on 443). This can be seen when searching for source or destination application names on NetFlow.

{{< img src="network_device_monitoring/netflow/netflow_iana_port_mappings.png" alt="The NetFlow page filtered by @destination.application_name and displaying names for ports such as HTTPS" width="80%" >}}

#### Custom port enrichment

You can also add your own custom enrichments to map ports and protocols to specific applications (for example, if a custom service runs on a specific port). This makes it easier for network engineers and their teams to interpret and query NetFlow data with human-readable names.

From the **Configuration** tab in NetFlow, click **Add Enrichment** to upload the CSV file containing your custom enrichments.

{{< img src="network_device_monitoring/netflow/new_enrichment.png" alt="The New Enrichment Mapping modal in the Netflow configuration tab" width="80%" >}}

## Visualization

You can find the NetFlow page on the [Network Devices page][5].
{{< img src="network_device_monitoring/netflow/netflow_page.png" alt="NetFlow Page" width="80%" >}}

This data is also available in Dashboards, Notebooks, and more for more precise queries and for correlating with other sources of data.
{{< img src="network_device_monitoring/netflow/notebook.png" alt="Notebook" width="80%" >}}

## Sampling rate

NetFlow sampling rate is taken into account in the computation of bytes and packets by default. This means that the displayed values for bytes and packets are computed with the sampling rate applied.
Additionally, you can query for **Bytes (Adjusted) (@adjusted_bytes)** and **Packets (Adjusted) (@adjusted_packets)** in Dashboards and Notebooks to visualize them.

**Note:** You can query for **Bytes (Sampled) (@bytes)** and **Packets (Sampled) (@packets)** in Dashboards and Notebooks to visualize the real data sent by your devices.

## Retention

NetFlow data is retained for 30 days by default.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /network_monitoring/devices/snmp_metrics/
[3]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/infrastructure/devices?facets=&viewTab=netflow
