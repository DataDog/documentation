---
title: Developers
kind: documentation
description: Reference materials for developing for Datadog, including config and code examples
aliases:
- /developers/faq/how-to-monitor-logs-with-loggly-live-tail-and-datadog'
further_reading:
- link: "/api"
  tag: "Documentation"
  text: "Datadog API"
---

## Overview

The Developers section contains reference materials for developing on Datadog. You may want to develop on Datadog if there is data you want to see in the product that you are not seeing. If this is the case, Datadog may already support the technology you need. Refer to the table of [commonly requested technologies](#commonly-requested-technologies) to find the product or integration that may fulfill your needs.

If the solution you require is truly unavailable, you can contact [Datadog Support][1] to request a feature. You may also wish to [create your own solution](#creating-your-own-solution) by using the reference materials in this section.

### Partners and Datadog Marketplace

Additionally, you may also be a partner who wants to build on Datadog and contribute to the Datadog Marketplace or to Datadog's community integrations. For more information about becoming a Datadog partner, see the [Partner program page][2].

## Commonly requested technologies

If there is data you want to monitor with Datadog that you are not seeing, consider the following Datadog products and integrations.

| Type                         | Details |
|------------------------------|---------|
| APM                          | Datadog's [APM & Distributed Tracing][3] provides out-of-the-box performance dashboards for web services, queues, and databases to monitor requests, errors, and latency. |
| Cloud providers              | Major Cloud providers ([AWS][4], [GCP][5], [Azure][6], [Alibaba][7]) emit metrics through APIs. Through the integration tiles in your account, you can configure integrations that use Datadog servers to crawl and store copies of the metrics collected. |
| Endpoint                     | For URL uptimes, use an [HTTP check][8] or [Synthetics][9] to validate if an endpoint or URL is running and accessible. Both work with public and private endpoints. |
| Files and directories        | Measuring the age of files, the number of files in a directory, or the size of a directory can be accomplished with the [Directory check][10]. |
| JMX Beans                    | JVM-based applications expose JMX metrics that Datadog can collect with the JMX integration. For example, the [JMX integration][11] is already used for official integrations like [Solr][12], [Tomcat][13], [Cassandra][14], etc. |
| Logs                         | Most applications generate some type of log. Use Datadog's [Log Management][15] for base monitoring. |
| Network traffic and SNMP     | Network devices, such as routers, switches, printers, emit SNMP metrics (Simple Network Management Protocol) which can be collected using [Network Device Monitoring][16]. Additionally, [Network Performance Monitoring][17] tracks all network traffic in and out of a host. |
| OpenMetrics                  | The Agent includes [OpenMetrics and Prometheus checks][18] capable of scraping Prometheus endpoints. |
| Processes                    | To collect resource usage metrics for specific running processes on any host (CPU, memory, I/O, etc.) use the [Processes integration][19]. To query across all your running processes for open-ended debugging use [Live Process Monitoring][20] (like htop without having to SSH).|
| Windows Performance Counters | Windows services or applications that expose performance counters can be collected with the [PDH integration][21]. |

## Creating your own solution

Developers have several choices for sending unsupported data to Datadog.

- [**DogStatsD**][22] is a metrics aggregation service that accepts custom metrics, events, and service checks.

- [**Custom checks**][23] enable you to collect metrics from custom applications or systems. [Custom Agent checks][23] are suitable for many basic needs. For more advanced requirements like metrics preprocessing, you may choose to write an [OpenMetrics][24] check. You may also wish to submit a [service][25] check within a custom Agent check.

- [**Integrations**][26] also enable you to collect metrics from custom applications or systems. Integrations are reusable. You can keep your integration private, or you can write a public integration and contribute to Datadog's [repository of community integrations][27] to be used by other developers. In this case, you—as the code author—are the active maintainer of the integration and are responsible for ensuring its functionality.


### Should I write a custom check or an integration?

The primary difference between custom checks and integrations is that integrations are reusable components that can become part of the Datadog's ecosystem. They generally take more effort (time to develop) and are best suited for general use-cases such as application frameworks, open source projects, or commonly used software.

When deciding how to send unsupported data to Datadog, the main considerations are effort (time to develop) and budget (cost of custom metrics). If you are trying to see data that Datadog doesn't currently support, start by deciding which method makes the most sense to start sending data:

| Type                | Effort | Custom Metrics | Language |
|---------------------|--------|----------------|----------|
| DogStatsD           | Lowest | Yes            | Any      |
| Custom check        | Low    | Yes            | Python   |
| Private integration | Medium | Yes            | Python   |
| Public integration  | High   | No             | Python   |

If you are a partner developing for the Datadog Marketplace or community integrations, jump straight to the [Marketplace][28] and [building an integration][26] docs.

{{< whatsnext desc="Send your own metrics to Datadog:" >}}
    {{< nextlink href="/developers/dogstatsd" >}}<u>DogStatsD</u>: Overview of the features of DogStatsD, including setup, datagram format, and data submission.{{< /nextlink >}}
    {{< nextlink href="/developers/write_agent_check" >}}<u>Custom Agent Check</u>: Learn how to report metrics, events, and service checks with your own custom check.{{< /nextlink >}}
    {{< nextlink href="/developers/prometheus" >}}<u>Custom OpenMetrics Check</u>: Learn how to report your OpenMetrics with a dedicated custom Agent Check.{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/" >}}<u>Integrations</u>: For more complex tasks, build a public or private Datadog integration. Public integrations can be shared with the community.{{< /nextlink >}}
{{< /whatsnext >}}

### Types

{{< whatsnext desc="Learn about the types of data you can submit to Datadog:" >}}
    {{< nextlink href="/developers/metrics" >}}<u>Custom Metrics</u>: A deep-dive into custom metrics at Datadog. This section explains metrics types, what they represent, how to submit them, and how they are used throughout Datadog.{{< /nextlink >}}
    {{< nextlink href="/developers/events" >}}<u>Events</u>: Explore how to submit events to Datadog with custom Agent checks, DogStatsD, or the Datadog API.{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks" >}}<u>Service Checks</u>: Explore how to submit service checks to Datadog with custom Agent checks, DogStatsD, or the Datadog API.{{< /nextlink >}}
{{< /whatsnext >}}

## Community

{{< whatsnext desc="Collaborate with the Datadog developer community:" >}}
    {{< nextlink href="/developers/libraries" >}}<u>Libraries</u>: A list of official and community-contributed libraries for the Datadog API, DogStatsD client, APM & Distributed Tracing, and externally-supported community integrations for a wide variety of platforms.{{< /nextlink >}}
    {{< nextlink href="/developers/office_hours" >}}<u>Community Office Hours</u>: Regular Datadog office hours, which is your opportunity to chat directly with engineers about developing for Datadog.{{< /nextlink >}}
    {{< nextlink href="/developers/guide/" >}}<u>Guides</u>: Additional helpful articles about technical details, code examples, and reference documentation.{{< /nextlink >}}
{{< /whatsnext >}}

## Other

{{< whatsnext desc="Other developer resources:" >}}
    {{< nextlink href="/developers/marketplace" >}}<u>Marketplace</u>: Build services on top of Datadog and market them to customers.{{< /nextlink >}}
    {{< nextlink href="/developers/amazon_cloudformation" >}}<u>Amazon CloudFormation</u>: Use templates to describe, configure, and provision all the AWS resources in your environment at once.{{< /nextlink >}}
{{< /whatsnext >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: https://www.datadoghq.com/partner/
[3]: /tracing/
[4]: /amazon_web_services/?tab=allpermissions#overview
[5]: /google_cloud_platform/?tab=datadogussite#overview
[6]: /azure/?tab=azurecliv20#overview
[7]: /alibaba_cloud/#overview
[8]: /integrations/http_check/
[9]: /synthetics/
[10]: /integrations/directory/
[11]: /integrations/java/?tab=host#configuration
[12]: /integrations/solr/
[13]: /integrations/tomcat/
[14]: /integrations/cassandra/
[15]: /logs/
[16]: /network_monitoring/devices/#overview
[17]: /network_monitoring/performance/
[18]: /agent/docker/prometheus
[19]: /integrations/process/
[20]: /graphing/infrastructure/process/?tab=linuxwindows#introduction
[21]: /integrations/pdh_check/
[22]: /developers/dogstatsd/
[23]: /developers/write_agent_check/
[24]: /developers/prometheus/
[25]: /developers/service_checks/
[26]: /developers/integrations/
[27]: https://github.com/DataDog/integrations-extras
[28]: /developers/marketplace/
