---
title: Network Device Monitoring
kind: documentation
disable_sidebar: true
description: Gain visibility into your network-connected devices, such as routers, switches, servers, and firewalls.
aliases:
    - /network_performance_monitoring/devices/
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-snmp-with-datadog/"
  tag: "Blog"
  text: "Monitor SNMP with Datadog"
- link: "https://www.datadoghq.com/blog/monitor-meraki/"
  tag: "Blog"
  text: "Monitor Cisco Meraki with Datadog"
- link: "https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/"
  tag: "Blog"
  text: "Monitor datacenters and network devices with Datadog"
---

## Overview

Datadog Network Device Monitoring is designed to give you visibility into your network-connected devices, such as routers, switches, servers, and firewalls using SNMP protocol.

Configure the Datadog Agent to automatically discover devices on any network and collect metrics such as bandwidth utilization, throughput, and up/down of devices. Graph the metrics on a Datadog [dashboard][1], or create a [monitor][2] to be alerted when issues arise.

{{< img src="network_performance_monitoring/devices/datacenter_dashboard.jpg" alt="Datacenter Overview Dashboard" responsive="true" style="width:100%;">}}

{{< whatsnext desc="This section includes the following topics:">}}
    {{< nextlink href="network_performance_monitoring/devices/setup" >}}<u>Setup</u>: Configure the Agent to collect network device data.{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/devices/profiles" >}}<u>Profiles</u>: Set up profiles to work with your devices.{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/devices/data" >}}<u>Data Collected</u>: View the metrics, events, and service checks collected.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards
[2]: /monitors/monitor_types
