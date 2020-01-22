---
title: Network Performance Monitoring
kind: documentation
disable_toc: true
description: Explore metrics for point to point communication on your infrastructure.
aliases:
  - /monitors/network_flow_monitors/
  - /graphing/infrastructure/network_performance_monitor/
further_reading:
- link: "https://www.datadoghq.com/blog/network-performance-monitoring"
  tag: "Blog"
  text: "Network Performance Monitoring"
- link: "/integrations/snmp"
  tag: "Documentation"
  text: "SNMP integration"
---

## Overview

Datadog Network Performance Monitoring (NPM) is designed to give you visibility into your network traffic across any tagged object in Datadog: from containers to hosts, services, and availability zones. Connection data is aggregated into flows, each showing traffic between one _source_ and one _destination_, through a customizable [network page][1] and [network map][2].
Each flow contains network metrics such as throughput, bandwidth, retransmit count, and source/destination information down to the IP, port, and PID levels.

{{< whatsnext desc="This section includes the following topics:">}}
    {{< nextlink href="network_performance_monitoring/installation" >}}<u>Installation</u>: Configure the Agent to collect network data.{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/network_page" >}}<u>Network Page</u>: Graph your network data between each source and destination available.{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/network_map" >}}<u>Network Map</u>: Map your network data between your tags.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map
