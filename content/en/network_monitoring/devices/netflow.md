---
title: NetFlow Monitoring
kind: documentation
is_beta: true
further_reading:
- link: "/network_monitoring/devices/profiles"
  tag: "Documentation"
  text: "Using Profiles with Network Device Monitoring"
---

<div class="alert alert-warning">NetFlow Monitoring for Datadog Network Device Monitoring is in public beta.</div>

## Overview

Use NetFlow Monitoring in Datadog to visualize and monitor your flow records from your Netflow-enabled devices.

## Installation

To use NetFlow Monitoring with Network Device Monitoring, ensure you are using the [Agent][1] version 7.45 or newer.

**Note:** Configuring [metric collection from Network Device Monitoring][2] is not a requirement for sending NetFlow data, although it is strongly recommended as this extra data can be used to enrich your flow records with information like the device name, model and vendor as well as the inbound/outbound interface name.

## Configuration

To configure your devices to send NetFlow, sFlow, or IPFIX traffic to the Agent NetFlow server, your devices must be configured to send traffic to the IP address that the Datadog Agent is installed on, specifically the `flow_type` and `port`.

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

The Datadog Agent will automatically aggregate the received NetFlow data in order to limit the number of records sent to platform while maintaining most of the information. By default there is a 5 minutes aggregation interval, flow recording sharing the same identifying information (source and destination address and port, protocol etc.) will be aggregated together. Addtionnally the Datadog Agent can detect ephemeral port and remove them, this is why you may see Flows with `port:*`.

## Enrichment

Your NetFlow data is processed by the Datadog backend and they are enriched with the available metadata we have about your devices and interfaces. Enrichment is based on the NetFlow exporter IP and the interface indexes. In case of possible private IP collisions, a `namespace` configured on the Agent side is also used.

In case the NetFlow exporter IP is one of the device IPs but not the one configured on the SNMP integration, Datadog will try to find which device does this exporter IP belong to and will enrich your NetFlow data with is as long as the match is unique.

## Visualization

You can find the NetFlow page directly from the [Network Devices page][5].
{{< img src="network_device_monitoring/netflow_page.png" alt="NetFlow Page" >}}

But your data is also available in Dashboards, Notebooks and more for more precise queries and for correlating with other sources of data.

## Retention

NetFlow data is retained for 15 days by default.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent
[2]: /network_monitoring/devices/snmp_metrics/
[3]: /agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/infrastructure/devices?facets=&viewTab=netflow
