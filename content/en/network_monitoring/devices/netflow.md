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

{{< site-region region="gov" >}}
<div class="alert alert-warning">Network Device Monitoring is not supported for this site.</div>
{{< /site-region >}}

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

The Datadog Agent automatically aggregates the received NetFlow data in order to limit the number of records sent to the platform while maintaining most of the information. By default there is a 5 minute aggregation interval, during which flow recordings which share the same identifying information (source and destination address and port, protocol, and so forth) will be aggregated together. Additionally, the Datadog Agent can detect ephemeral ports and remove them. As a result, you may see Flows with `port:*`.

## Enrichment

Your NetFlow data is processed by the Datadog backend and are enriched with the available metadata from your devices and interfaces. Enrichment is based on the NetFlow exporter IP and the interface indexes. To disambiguate possible collisions between reused private IPs, you can configure a different `namespace` for each Agent configuration file (with the setting `network_devices.namespace`)

If the NetFlow exporter IP is one of the device IPs, but not the one configured on the SNMP integration, Datadog will attempt to locate the device that the exporter IP belongs to, and will enrich your NetFlow data with it is as long as the match is unique.

## Visualization

You can find the NetFlow page on the [Network Devices page][5].
{{< img src="network_device_monitoring/netflow/netflow_page.png" alt="NetFlow Page" >}}

This data is also available in Dashboards, Notebooks, and more for more precise queries and for correlating with other sources of data.
{{< img src="network_device_monitoring/netflow/notebook.png" alt="Notebook" >}}

## Retention

NetFlow data is retained for 30 days by default.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /network_monitoring/devices/snmp_metrics/
[3]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/infrastructure/devices?facets=&viewTab=netflow
