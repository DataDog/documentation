---
title: Detecting a Network Outage
kind: guide
---
Network outages are often disguised as infrastructure, application, or container issues, which makes them hard to detect. Without visibility into your regional network performance or that of third-party endpoints you rely on, it may take hours to detect third-party or cloud regional outages, which could ultimately affect your customers and the bottom line. 

Alternatively with Network Performance Monitoring, you can detect network outages in minutes. By analyzing network flow data alongside process metrics, traces, logs, and infrastructure metrics, you can avoid making assumptions about the root of an issue, and instead use process of elimination (see the steps below) to determine whether you’re experiencing a network outage.

## Traffic overloading the underlying infrastructure 

Use NPM metrics to see whether your source endpoint may be sending an enormous amount of traffic or making a large number of open connections to the destination endpoint. When selecting a faulty dependency (e.g. with high latency), the sidepanel graphs can be used to spot such spikes in traffic, which may overwhelm your receiving application to the point that it cannot (in the case of TCP) respond to all connections, leading to increased packet loss and thus, increased TCP latency. 

{{< img src="network_performance_monitoring/guide/detecting_a_network_outage/npm-metrics.png" alt="Traffic overloading of the underlying infrastructure">}}

## CPU overconsumption of the underlying infrastructure

On the other hand, resource overconsumption of either the client or server endpoint could be the culprit of poor communication between the two. In the sidepanel Processes tab, scope your view to processes running on either the source or destination endpoints to spot any heavy software that may be degrading the performance of their underlying hosts or containers, thus reducing their ability to respond to network calls. In this case, it’s not enough _that_ an underlying host is running hot to identify the root of the application latency, but _why_ it is running hot. Grouping your process metrics by command gives you this granularity, since you can identify the particular workload that is consuming your CPU and memory resources. 

{{< img src="network_performance_monitoring/guide/detecting_a_network_outage/processes.png" alt="CPU overconsumption of the underlying infrastructure">}}

## Application errors in code

Network errors and latency can also be caused by client-side application errors. For instance, if your application is generating connections on loop unnecessarily, it could be overwhelming the endpoints that rely on it, leading to downstream application and network issues. Use the `Traces` tab in NPM or the `Network` tab in APM Traces and look for application request errors to determine whether this is the case.

{{< img src="network_performance_monitoring/guide/detecting_a_network_outage/traces.png" alt="Application errors in code">}}

If none of these steps lead to a root cause, and you are seeing errors and latency for your dependencies scoped to a particular region, availability zone, or third-party domain endpoint, then you are experiencing a network outage, and can reach out to the relevant providers to report and resolve the issue.
