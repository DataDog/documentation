---
title: NetFlow Monitoring
aliases:
- /network_monitoring/devices/netflow/
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

The NetFlow view in Network Device Monitoring provides visibility into network traffic flows collected from devices that export flow data (for example, routers, firewalls, or switches). You can analyze traffic volume, identify top talkers, and understand how data moves through your network.

The NetFlow view displays traffic metrics aggregated by device and interface. Use it to identify which devices or interfaces are consuming the most bandwidth, generating the most packets, or contributing to traffic spikes.

{{< img src="network_device_monitoring/netflow/netflow_home_2.png" alt="The NetFlow Monitoring page containing a collapsible legend for traffic volume, device health, flows and more." style="width:100%;" >}}

## Side Navigation

Use the left-hand navigation to explore additional NetFlow views:

- **Traffic Volume**: Overall flow metrics by device and interface.
- **Device Health**: Status and utilization of monitored devices.
- **Flows**: Detailed individual flow records.
- **Conversations**: Aggregated source–destination pairs.
- **Autonomous Systems**: Flow data grouped by Autonomous System Numbers (ASNs).
- **Geo IP**: Flow data grouped by geographic origin/destination.
- **Source Ports / Destination Ports / Protocols / Flags**: Traffic breakdown by packet metadata.

## Installation

To use NetFlow Monitoring with Network Device Monitoring, ensure you are using the [Agent][1] version 7.45 or newer.

**Note:** Configuring [metric collection from Network Device Monitoring][2] is not a requirement for sending NetFlow data, although it is strongly recommended as this extra data can be used to enrich your flow records with information such as the device name, model, and vendor, as well as the inbound/outbound interface name.

## Configuration

To configure your devices to send NetFlow, jFlow, sFlow, or IPFIX traffic to the Agent NetFlow server, your devices must be configured to send traffic to the IP address that the Datadog Agent is installed on, specifically the `flow_type` and `port`.

1. Edit your [`datadog.yaml`][3] Agent configuration file to enable NetFlow:

```yaml
network_devices:
  netflow:
    enabled: true
    listeners:
      - flow_type: netflow9   # choices: netflow5, netflow9, ipfix, sflow5
        port: 2055            # devices need to be configured to the same port number
      - flow_type: netflow5
        port: 2056
      - flow_type: ipfix
        port: 4739
      - flow_type: sflow5
        port: 6343
    ## Set to true to enable reverse DNS enrichment of private source and destination IP addresses in NetFlow records
    reverse_dns_enrichment_enabled: false
```

2. After saving your changes, [restart the Agent][4].

   **Note**: Ensure that your [firewall rules][9] allow incoming UDP traffic on the configured ports.

## Aggregation

The Datadog Agent automatically aggregates the data received into NetFlow to limit the number of records sent to the platform while maintaining most of the information. By default, flow recordings that have the same identifiers, such as `source`, `destination address`, `port`, and `protocol`, are aggregated together in five minute intervals. Additionally, the Datadog Agent can detect ephemeral ports and remove them. As a result, you may see Flows with `port:*`.

## Enrichment

Your NetFlow data is processed by the Datadog backend and enriched with the available metadata from your devices and interfaces. Enrichment is based on the NetFlow exporter IP and the interface indexes. To disambiguate possible collisions between reused private IPs, you can configure a different `namespace` for each Agent configuration file (with the setting `network_devices.namespace`).

If the NetFlow exporter IP is one of the device IPs, but not the one configured on the SNMP integration, Datadog attempts to locate the device that the exporter IP belongs to, and enriches your NetFlow data with it is as long as the match is unique.

### Cloud provider IP enrichment

Datadog enriches IPs with public cloud provider service and region for IPv4 addresses, so you can filter for flow records from a specific service and region.

{{< img src="network_device_monitoring/netflow/netflow_cloud_provider_enrichment_2.png" alt="Netflow Filter menu displaying cloud provider name, region, and service" width="100%" >}}

### Port enrichment

Datadog enriches ports in NetFlow with IANA (Internet Assigned Numbers Authority) data to resolve well known port mappings (such as Postgres on 5432 and HTTPS on 443). 

#### Custom port enrichment

You can also add your own custom enrichments to map ports and protocols to specific applications (for example, if a custom service runs on a specific port). This makes it easier for network engineers and their teams to interpret and query NetFlow data with human-readable names.

From the **Configuration** tab in NetFlow, click **+ Add Enrichment** to upload the CSV file containing your custom enrichments.

{{< img src="network_device_monitoring/netflow/new_enrichment_2.png" alt="The New Enrichment Mapping modal in the Netflow configuration tab" width="100%" >}}

### Reverse DNS private IP enrichment

Enable Reverse DNS private IP enrichment to perform DNS lookups for hostnames associated with source or destination IP addresses. When enabled, the Agent conducts reverse DNS lookups on source and destination IPs within private address ranges, enriching NetFlow records with the corresponding hostnames.

By [default][7], the Reverse DNS IP enrichment in your `datadog.yaml` file is disabled. To enable, see the [Configuration](#configuration) section of this page.

Search for **DNS** in the **+ Filter** menu to locate flows associated with Reverse DNS IP enrichment:

{{< img src="network_device_monitoring/netflow/dns_ip_enrichmen_2.png" alt="Filter menu enhanced to show the reverse DNS destination and source facets" width="100%" >}}

**Note**: Reverse DNS entries are cached and subject to rate limiting to minimize DNS queries and reduce the load on DNS servers. For more configuration options, including modifying default caching and rate limiting, see the [full configuration file][8].

## IP details

In the **Conversations** view, you can view the Public IP address of the Destination IP. Hover over the IP to display rich metadata about the IP and a link to **View Related Network Connections** where you can inspect the connectivity in more detail.

{{< img src="network_device_monitoring/netflow/NetFlow_IP_pill.png" alt="Hover over an IP address to display the IP details and View Related Network Connections" width="100%" >}}

## Flow diagram

You can visualize the flows in NetFlow Monitoring by clicking on the **Flows** menu and hovering over a flow from the list to view additional information about Source IP, Ingress Interface Name, Device name, and Destination IP across related network connections.

{{< img src="network_device_monitoring/netflow/flows.png" alt="Hover over a flow aggregated from a device emitting netflow to access related network connections" width="100%" >}}

## NetFlow monitor

Click on the **Create Monitor** icon from any of the views to create a [NetFlow monitor][6]. When creating the monitor, consider the following fields with respect to the source IP or destination IP from the perspective of the device. These fields provide insights into network traffic patterns and help with optimizing performance and security.

{{< img src="network_device_monitoring/netflow/create_monitor.png" alt="Flows view in NetFlow monitoring with the create monitor link highlighted." width="100%" >}}

### Interface information

The following fields represent details about the ingress and egress interfaces.

| Field Name | Field Description |
|---|---|
| Egress Interface Alias | Alias of the egress interface. |
| Egress Interface Index | Index of the egress interface. |
| Egress Interface Name | Name of the egress interface. |
| Ingress Interface Alias | Alias of the ingress interface. |
| Ingress Interface Index | Index of the ingress interface. |
| Ingress Interface Name | Name of the ingress interface. |

### Device information

The following fields represent details related to the device generating NetFlow records.

| Field Name | Field Description |
|---|---|
| Device IP | IP address used to map to a device in NDM for enrichment purposes. |
| Exporter IP | IP address from which NetFlow packets originate. |
| Device Model | Model of the device. |
| Device Name | Name of the device. |
| Device Namespace | Namespace of the device. |
| Device Vendor | Vendor of the device. |

### Flow details

The following fields represent characteristics of the network flow.

| Field Name | Field Description |
|---|---|
| Direction | Indicates whether the flow is inbound or outbound. |
| Start Time | Timestamp of the first network packet between the source and destination IP addresses. |
| End Time | Timestamp of the last network packet between the source and destination IP addresses. |
| Ether Type | Type of Ethernet frame encapsulation (IPv4 or IPv6). |
| Flow Type | Type of NetFlow data format (IPFIX, sFlow5, NetFlow5, NetFlow9, or Unknown). |
| IP Protocol | Protocol used for communication (such as ICMP, TCP, or UDP). |
| Next Hop IP | IP address of the next hop in the network path. |
| TCP Flag | Union of all TCP flags observed over the life of the flow. |
| Bytes | Total number of bytes transferred. |
| Packets | Total number of packets transferred. |

In addition to fields, you can also use out-of-the-box facets to start analyzing traffic patterns based on NetFlow destination and source IP addresses.

### NetFlow Destination IP facets

| Facet Name | Facet Description |
|---|---|
| Destination AS Domain | The domain associated with the Autonomous System (AS) to which the destination IP belongs. |
| Destination AS Name | The name of the Autonomous System (AS) to which the destination IP belongs. |
| Destination AS Number | The number assigned to the Autonomous System (AS) to which the destination IP belongs. |
| Destination AS Route | The route information associated with the Autonomous System (AS) to which the destination IP belongs. |
| Destination AS Type | The type of Autonomous System (AS) to which the destination IP belongs (such as transit, customer, peer). |
| Destination Application Name | The name of the application associated with the destination IP. |
| Destination City Name | The name of the city associated with the destination IP. |
| Destination Cloud Provider Name | The name of the cloud provider associated with the destination IP. |
| Destination Cloud Provider Region | The region of the cloud provider associated with the destination IP. |
| Destination Cloud Provider Service | The service provided by the cloud provider associated with the destination IP. |
| Destination Continent Code | The code representing the continent associated with the destination IP. |
| Destination Continent Name | The name of the continent associated with the destination IP. |
| Destination Country ISO Code | The ISO code representing the country associated with the destination IP. |
| Destination Country Name | The name of the country associated with the destination IP. |
| Destination IP | The destination IP address. |
| Destination Latitude | The latitude coordinate associated with the destination IP. |
| Destination Longitude | The longitude coordinate associated with the destination IP. |
| Destination MAC | The Media Access Control (MAC) address associated with the destination IP. |
| Destination Mask | The subnet mask associated with the destination IP. |
| Destination Port | The destination port number. |
| Destination Reverse DNS Hostname | The DNS hostname associated with the destination IP. |
| Destination Subdivision ISO Code | The ISO code representing the subdivision (such as state or province) associated with the destination IP. |
| Destination Subdivision Name | The name of the subdivision (such as state or province) associated with the destination IP. |
| Destination Timezone | The timezone associated with the destination IP. |

### NetFlow Source IP facets

| Facet Name | Facet Description |
|---|---|
| Source AS Domain | The domain associated with the Autonomous System (AS) to which the source IP belongs. |
| Source AS Name | The name of the Autonomous System (AS) to which the source IP belongs. |
| Source AS Number | The number assigned to the Autonomous System (AS) to which the source IP belongs. |
| Source AS Route | The route information associated with the Autonomous System (AS) to which the source IP belongs. |
| Source AS Type | The type of Autonomous System (AS) to which the source IP belongs (such as transit, customer, peer). |
| Source Application Name | The name of the application associated with the source IP. |
| Source City Name | The name of the city associated with the source IP. |
| Source Cloud Provider Name | The name of the cloud provider associated with the source IP. |
| Source Cloud Provider Region | The region of the cloud provider associated with the source IP. |
| Source Cloud Provider Service | The service provided by the cloud provider associated with the source IP. |
| Source Continent Code | The code representing the continent associated with the source IP. |
| Source Continent Name | The name of the continent associated with the source IP. |
| Source Country ISO Code | The ISO code representing the country associated with the source IP. |
| Source Country Name | The name of the country associated with the source IP. |
| Source IP | The source IP address. |
| Source Latitude | The latitude coordinate associated with the source IP. |
| Source Longitude | The longitude coordinate associated with the source IP. |
| Source MAC | The Media Access Control (MAC) address associated with the source IP. |
| Source Mask | The subnet mask associated with the source IP. |
| Source Port | The source port number. |
| Source Reverse DNS Hostname | The DNS hostname associated with the source IP. |
| Source Subdivision ISO Code | The ISO code representing the subdivision (such as state or province) associated with the source IP. |
| Source Subdivision Name | The name of the subdivision (such as state or province) associated with the source IP. |
| Source Timezone | The timezone associated with the source IP. |

## Sampling rate

NetFlow's sampling rate is taken into account in the computation of bytes and packets by default. The displayed values for bytes and packets are computed with the sampling rate applied.
Additionally, you can query for **Bytes (Adjusted) (@adjusted_bytes)** and **Packets (Adjusted) (@adjusted_packets)** in dashboards and notebooks to visualize them.

To visualize the raw bytes/packets (sampled) sent by your devices, you can query for **Bytes (Sampled) (@bytes)** and **Packets (Sampled) (@packets)** in dashboards and notebooks.

## Retention

NetFlow data is retained for 30 days by default, with options for 15, 30, 60, and 90 day retention.

<div class="alert alert-warning">To retain NetFlow data for longer periods of time, contact your account representative.</div>

## Troubleshooting

### NetFlow packet drops
NetFlow packet drops can occur when there are a high number of NetFlow packets per second, typically greater than 50,000. The following steps can help identify and mitigate NetFlow packet drops:

#### Identifying packet drops

Use the `netstat -s` command to see if there are any dropped UDP packets:

```bash
    netstat -s
  ```

#### Mitigation steps
1. Increase the Number of NetFlow Listeners

  Increase the number of NetFlow listeners by using a configuration similar to the following:
  Datadog recommends setting the number of workers to match the number of CPU cores in your system:

```yaml
      netflow:
        enabled: true
        listeners:
          - flow_type: netflow9
            port: 2055
            workers: 4 # 4 CPUs
```

2. Increase UDP Queue Length (Linux only)

  Adjusting your system's UDP queue length can help accommodate the higher volume of NetFlow packets. Increase the UDP receive buffer size to 25MB by executing the following commands:

```bash
    sudo sysctl -w net.core.rmem_max=26214400
    sudo sysctl -w net.core.rmem_default=26214400
```

3. Persisting the configuration (Linux only)

  To make these changes permanent, add the following lines to your `/etc/sysctl.conf` file:

```bash
    net.core.rmem_max=26214400
    net.core.rmem_default=26214400
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /network_monitoring/devices/snmp_metrics/
[3]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/devices/netflow
[6]: /monitors/types/netflow/
[7]: https://github.com/DataDog/datadog-agent/blob/f6ae461a7d22aaf398de5a94d9330694d69560d6/pkg/config/config_template.yaml#L4201
[8]: https://github.com/DataDog/datadog-agent/blob/f6ae461a7d22aaf398de5a94d9330694d69560d6/pkg/config/config_template.yaml#L4203-L4275
[9]: /network_monitoring/devices/troubleshooting#traps-or-flows-not-being-received-at-all
