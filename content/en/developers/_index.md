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

### Partners and the Datadog Marketplace

Additionally, you may also be a partner who wants to build on Datadog and contribute to the Datadog Marketplace or to Datadog's community integrations. For more information about becoming a Datadog partner, see the [Partner program page][2].

## Commonly requested technologies

If there is data you want to monitor with Datadog that you are not seeing, before building something custom, consider the following Datadog products and integrations:

{{< partial name="requests.html" links="requests" >}}

## Creating your own solution

Still not seeing the type of data that you need? Developers have several choices for sending unsupported data to Datadog.

- [**DogStatsD**][22] is a metrics aggregation service that accepts custom metrics, events, and service checks.

- [**Custom checks**][23] enable you to collect metrics from custom applications or systems. [Custom Agent checks][23] are suitable for many needs. For more advanced requirements like metrics preprocessing, you may choose to write an [OpenMetrics][24] check. You may also wish to submit a [service][25] check within a custom Agent check.

- [**Integrations**][26] also enable you to collect metrics, events, and service checks from custom applications or systems. Integrations are reusable. You may keep your integration private, or  write a public integration contributing to Datadog's [repository of community integrations][27] to be used by other developers.


### Should I write a custom check or an integration?

The primary difference between custom checks and integrations is that integrations are reusable components that can become part of the Datadog's ecosystem. They generally take more effort (time to develop) and are best suited for general use-cases such as application frameworks, open source projects, or commonly used software. For more niche scenarios, such as monitoring services that are not widely used outside your team or organization, writing a custom check may be the most efficient option. However, you may choose to write an integration instead of a custom check if your particular use-case requires you to publish and deploy your solution as a Python wheel (`.whl`). Metrics emitted through custom checks are considered custom metrics, which have a cost associated based on your subscription plan. However, once an integration gets accepted into the Datadog ecosystem, metrics that it emits are no longer considered custom metrics, and do not count against your custom metric count. For more information about how this might impact cost, see our the [Datadog Pricing Page][29]. 

Note that writing a public integration (that is, one that is part of Datadog's ecosystem, can be installed with the `datadog-agent integration` command, and is accepted into Datadog's [integrations-extras] or [integrations-core] repositories) requires more work than a private integration. These integrations must pass all `ddev validate` steps, have usable tests, and undergo code review. You, as the code author, are the active maintainer of the integration and are responsible for ensuring its functionality.

When deciding how to send unsupported data to Datadog, the main considerations are effort (time to develop) and budget (cost of custom metrics). If you are trying to see data that Datadog doesn't currently support, start by deciding which method makes the most sense to start sending data:

| Type                | Effort | Custom Metrics | Language |
|---------------------|--------|----------------|----------|
| DogStatsD           | Lowest | Yes            | Any      |
| Custom check        | Low    | Yes            | Python   |
| Private integration | Medium | Yes            | Python   |
| Public integration  | High   | No             | Python   |

If you are a partner developing for the Datadog Marketplace or community integrations, jump straight to the [Marketplace][28] and [building an integration][26] docs.

### General developer resources

{{< whatsnext desc="Send your own metrics to Datadog:" >}}
    {{< nextlink href="/developers/dogstatsd" >}}<u>DogStatsD</u>: Overview of the features of DogStatsD, including setup, datagram format, and data submission.{{< /nextlink >}}
    {{< nextlink href="/developers/write_agent_check" >}}<u>Custom Agent Check</u>: Learn how to report metrics, events, and service checks with your own custom check.{{< /nextlink >}}
    {{< nextlink href="/developers/prometheus" >}}<u>Custom OpenMetrics Check</u>: Learn how to report your OpenMetrics with a dedicated custom Agent Check.{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/" >}}<u>Integrations</u>: For more complex tasks, build a public or private Datadog integration. Public integrations can be shared with the community.{{< /nextlink >}}
{{< /whatsnext >}}

### Sending data by data types

{{< whatsnext desc="Learn about the types of data you can submit to Datadog and how to submit them:" >}}
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
[29]: https://www.datadoghq.com/pricing/
