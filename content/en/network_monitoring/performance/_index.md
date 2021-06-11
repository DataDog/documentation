---
title: Network Performance Monitoring
kind: documentation
description: Explore metrics for point to point communication on your infrastructure.
aliases:
  - /monitors/network_flow_monitors/
  - /graphing/infrastructure/network_performance_monitor/
  - /network_performance_monitoring/
further_reading:
- link: "https://www.datadoghq.com/blog/network-performance-monitoring"
  tag: "Blog"
  text: "Network Performance Monitoring"
- link: "https://www.datadoghq.com/blog/npm-windows-support/"
  tag: "Blog"
  text: "Monitor Windows hosts with Network Performance Monitoring"
- link: "https://www.datadoghq.com/blog/cloud-service-autodetection-datadog/"
  tag: "Blog"
  text: Monitor cloud endpoint health with cloud service autodetection"
- link: "/network_monitoring/devices"
  tag: "Documentation"
  text: "Network Device Monitoring"
---

## Overview

{{< img src="network_performance_monitoring/network_page/npm_cover.png" alt="Main page" >}}

Datadog Network Performance Monitoring (NPM) is designed to give you visibility into your network traffic between services, containers, availability zones, and any other tag in Datadog. Connection data at the IP, port, and PID levels is aggregated into application-layer dependencies between meaningful _source_ and _destination_ endpoints, which can be analyzed and visualized through a customizable [network page][1] and [network map][2]. Use flow data along with key network traffic and DNS server metrics to:

* Pinpoint unexpected or latent service dependencies
* Optimize costly cross-regional or multi-cloud communication
* Identify outages of cloud provider regions and third-party tools
* Troubleshoot client-side and server-side DNS server issues

NPM makes it simple to monitor complex networks with built in support for Linux and [Windows OS][3] as well as containerized environments that are orchestrated and [instrumented with Istio service mesh][4].

{{< whatsnext desc="This section includes the following topics:">}}
    {{< nextlink href="network_monitoring/performance/setup" >}}<u>Setup</u>: Configure the Agent to collect network data.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/performance/network_page" >}}<u>Network Page</u>: Graph your network data between each source and destination available.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/performance/network_map" >}}<u>Network Map</u>: Map your network data between your tags.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map
[3]: https://www.datadoghq.com/blog/npm-windows-support/
[4]: https://www.datadoghq.com/blog/monitor-istio-with-npm/
