---
title: Request Datadog Integrations
kind: guide
aliases:
  - /integrations/guide/requests/
further_reading:
  - link: "developers/integrations/new_check_howto"
    tag: "Documentation"
    text: "Create a Datadog Integration"
  - link: "https://www.datadoghq.com/blog/instrument-opencensus-opentracing-and-openmetrics/"
    tag: "Blog"
    text: "Performance monitoring with OpenTracing, OpenCensus, and OpenMetrics"
  - link: "https://www.datadoghq.com/blog/easy-jmx-discovery-browsing-open-source-agent/"
    tag: "Blog"
    text: "Easy JMX discovery and browsing with the open source Agent"
  - link: "https://www.datadoghq.com/blog/metrics-without-limits/"
    tag: "Blog"
    text: "Easy JMX discovery and browsing with the open source Agent"
  - link: "https://www.datadoghq.com/blog/process-level-data/"
    tag: "Blog"
    text: "Troubleshoot faster with process-level app and network data"    
  - link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
    tag: "Blog"
    text: "Introducing Datadog synthetic monitoring" 
  - link: "https://www.datadoghq.com/blog/network-performance-monitoring/"
    tag: "Blog"
    text: "Introducing Datadog Network Performance Monitoring" 
  - link: "https://www.datadoghq.com/blog/network-device-monitoring/"
    tag: "Blog"
    text: "Introducing Network Device Monitoring" 
---

## Overview

Before submitting a request, review the information below to determine if your use case is supported.

### OpenMetrics

The Agent includes [OpenMetrics][1] and Prometheus checks capable of scraping Prometheus endpoints. Metrics retrieved by this integration are considered [custom metrics][2].

### JMX Beans

The [JMX integration][3] enables collection of metrics, logs, and traces from JVM-based applications. For example, the JMX integration is already used for official integrations like Solr, Tomcat, Cassandra, and more.

Metrics generated through JMX-based integrations not natively supported by Datadog are considered [custom metrics][2].

### Custom Metrics and Integrations

Submit custom metrics for business stats using the [API][4] and [DogStatsD][5].

Datadog Agent integrations are Python files querying for metrics. All Agent code is open source, so it's possible to write your own [custom Agent check][6] or [custom Agent integration][7]. The [integrations-extras GitHub repository][8] contains many community developed custom Agent integrations.

### Logs

Use [Log Management][9] to view, monitor, and analyze the logs from your applications and infrastructure. The [Datadog Agent][10] provides advanced functionality for sending logs to your Datadog account, but you can also submit logs directly to the [Logs API][11].

### APM

[APM and Continuous Profiler][12] provide out-of-the-box performance dashboards for web services, queues, and databases to monitor requests, errors, and latency. You can use the [Datadog Tracing Library][13] for your environment and language, whether you are [tracing a proxy][14] or tracing across [AWS Lambda functions][15] and hosts, using automatic instrumentation, dd-trace-api, or [OpenTelemetry][16].

### Processes

The [Processes integration][17] collects resource usage metrics for specific running processes on any host, such as CPU, memory, I/O, and others. Use [Live Process Monitoring][18] (which is like htop without having to SSH) to query across all your running processes.

### Files/Directories

The [Directory check][19] measures the age of files, the number of files in a directory, or the size of a directory.

### Endpoints

Use the [HTTP check][20] or [Synthetics Monitoring][21] to validate if an endpoint or URL is running and accessible. Both work with public and private endpoints. Combine with [Service Level Objectives, or SLOs][22] to define clear targets for performance. 

### SNMP Traffic / Network Traffic

[Network Device Monitoring][23] enables you to collect [SNMP][24] (Simple Network Management Protocol) metrics emitted from network devices, such as routers, switches, and printers. 

[Network Performance Monitoring][25] tracks all network traffic in and out of a host, providing visibility into your network traffic between services, containers, availability zones, and any other tag in Datadog. Connection data at the IP, port, and PID levels is aggregated into application-layer dependencies between meaningful `source` and `destination` endpoints.

### Cloud Providers

All the major Cloud providers ([AWS][26], [Azure][27], [GCP][28], [Alibaba][29]) emit metrics through APIs. Use the [Datadog integration tiles][30] in your account to configure these integrations, which use Datadog servers to crawl for metrics.

## Feature request

If none of Datadog's existing tools fit your needs, create a ticket with [Datadog support][31].

### Submit a request

Include the following info when submitting a ticket:

- The name, role, and contact info for the request submitter
- The level of urgency for your request: blocker, high priority, nice to have
- The name of technology and a link to their website
- The specific metrics you want to collect and monitor
- Your use case for collecting the information
- Describe how you are currently accomplishing your goal
- Any specific events or issues that make this feature important

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/openmetrics/
[2]: /metrics/custom_metrics/
[3]: /integrations/java/
[4]: /api/latest/metrics/
[5]: /developers/dogstatsd/
[6]: /developers/custom_checks/
[7]: /developers/integrations/
[8]: https://github.com/DataDog/integrations-extras
[9]: /logs/
[10]: /agent/logs/
[11]: /api/latest/logs/
[12]: /tracing/
[13]: /tracing/trace_collection/dd_libraries/
[14]: /tracing/trace_collection/proxy_setup/
[15]: /serverless/distributed_tracing/
[16]: /tracing/trace_collection/open_standards/
[17]: /integrations/process/
[18]: /infrastructure/process/
[19]: /integrations/directory/
[20]: /integrations/http_check/
[21]: /synthetics/
[22]: /monitors/service_level_objectives/
[23]: /network_monitoring/devices/
[24]: /integrations/snmp/
[25]: /network_monitoring/performance/
[26]: /integrations/amazon_web_services/
[27]: /integrations/azure/
[28]: /integrations/google_cloud_platform/
[29]: /integrations/alibaba_cloud/
[30]: https://app.datadoghq.com/integrations
[31]: /help
