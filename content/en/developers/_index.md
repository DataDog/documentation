---
title: Developers
kind: documentation
description: Learn how to develop an integration on Datadog.
aliases:
- /developers/faq/how-to-monitor-logs-with-loggly-live-tail-and-datadog
further_reading:
- link: "/api/latest/"
  tag: "Documentation"
  text: "Learn about the Datadog API"
- link: "https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices"
  tag: "Best Practices"
  text: "Create great integration dashboards"
- link: "https://www.datadoghq.com/blog/engineering/druids-the-design-system-that-powers-datadog/"
  tag: "Blog"
  text: "DRUIDS, the design system that powers Datadog"
- link: "https://www.datadoghq.com/blog/introducing-open-source-hub/"
  tag: "Blog"
  text: "Introducing the Datadog Open Source Hub"
cascade:
    algolia:
        rank: 70
---

## Overview

The Developers section contains reference materials for developing on Datadog. You may want to develop on Datadog if there is data you want to see in the product that you are not seeing. If this is the case, Datadog may already support the technology you need. See the table of [commonly requested technologies](#commonly-requested-technologies) to find the product or integration that may fulfill your needs.

## Commonly requested technologies

If there is data you want to monitor with Datadog that you are not seeing, before building something custom, consider the following Datadog products and integrations:

{{< partial name="requests.html" links="requests" >}}

If the solution you require is truly unavailable, you can contact [Datadog Support][1] to request a feature. You may also wish to [create your own solution](#creating-your-own-solution) by using the reference materials in this section.

### Partners and the Datadog Marketplace

You may also be a partner who wants to build on Datadog and contribute to the [Datadog Marketplace][10] or to Datadog's community [integrations][6]. 

{{< whatsnext desc="To develop an offering, see the appropriate documentation:" >}}
    {{< nextlink href="/developers/integrations/agent_integration" >}}Create an Agent-based Integration{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/api_integration" >}}Create an API Integration{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/log_integration" >}}Create a Log Integration{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/marketplace_offering" >}}Build a Marketplace Offering{{< /nextlink >}}
{{< /whatsnext >}}

For more information about becoming a Datadog partner, navigate to the [Datadog Partner Network][2]. 

## Creating your own solution

Still not seeing the type of data that you need? Developers have several choices for sending unsupported data to Datadog.

- [**DogStatsD**][3] is a metrics aggregation service that accepts custom metrics, events, and service checks.

- [**Custom checks**][4] enable you to collect metrics from custom applications or systems. [Custom Agent checks][4] are suitable for many needs. For more advanced requirements like metrics preprocessing, you may choose to write an [OpenMetrics][5] check.

- [**Integrations**][6] also enable you to collect metrics, events, and service checks from custom applications or systems. Integrations are reusable. You may keep your integration private, or write a public integration contributing to Datadog's [repository of community integrations][7] to be used by other developers.


### Custom check versus integration

The primary difference between custom checks and integrations is that integrations are reusable components that can become part of the Datadog's ecosystem. They generally take more effort (time to develop) and are best suited for general use-cases such as application frameworks, open source projects, or commonly used software. For more unique scenarios, such as monitoring services that are not widely used outside your team or organization, writing a custom check may be the most efficient option. 

However, you may choose to write an integration instead of a custom check if your particular use case requires you to publish and deploy your solution as a Python wheel (`.whl`). Metrics emitted through custom checks are considered custom metrics, which have a cost associated based on your subscription plan. However, once an integration gets accepted into the Datadog ecosystem, metrics that it emits are no longer considered custom metrics, and do not count against your custom metric count. For more information about how this might impact cost, see [Datadog Pricing][8].

### How do I create an integration? 

Writing a public integration (that is, one that is part of Datadog's ecosystem, can be installed with the `datadog-agent integration` command, and is accepted into Datadog's [integrations-extras][7] or [integrations-core][9] repositories) requires more work than a private integration. These integrations must pass all `ddev validate` steps, have usable tests, and undergo code review. You, as the code author, are the active maintainer of the integration and are responsible for ensuring its functionality.

The initial goal is to generate some code that collects the desired metrics in a reliable way, and to ensure that the general integration framework is in place. Start by writing the basic functionality as a custom Check, then fill in the framework details from [Create an Agent Integration][13].

Next, open a pull request against the [`integrations-extras` repository][7]. This signals to Datadog that you're ready to start reviewing code together. Don't worry if you have questions about tests, Datadog internals, or other topics—the Datadog Ecosystems team is ready to help, and the pull request is a good place to go over those concerns. 

Once the integration has been validated for functionality, framework compliance, and general code quality, it is merged into `integrations-extras` where it becomes part of the Datadog ecosystem. 

When deciding how to send unsupported data to Datadog, the main considerations are effort (time to develop) and budget (cost of custom metrics). If you are trying to see data that Datadog doesn't support, start by deciding which method makes the most sense to start sending data:

| Type                | Effort | Custom Metrics | Language |
|---------------------|--------|----------------|----------|
| DogStatsD           | Lowest | Yes            | Any      |
| Custom check        | Low    | Yes            | Python   |
| Private integration | Medium | Yes            | Python   |
| Public integration  | High   | No             | Python   |

### Why create an integration?

[Custom Checks][1] are great for occasional reporting, or in cases where the data source is either unique or very limited. For more general use cases - such as application frameworks, open source projects, or commonly-used software - it makes sense to write an integration.

Metrics reported from accepted integrations are not counted as custom metrics, and therefore don't impact your custom metric allocation. (Integrations that emit potentially unlimited metrics may still be considered custom.) Ensuring native support for Datadog reduces friction to adoption, and incentivizes people to use your product, service, or project. Also, being featured within the Datadog ecosystem is a great avenue for added visibility.

### What's the difference between a custom check and a service check?

A [custom check][11], also know as a custom Agent check, lets you send internal service data to Datadog. A [service check][12] is much simpler and lets you monitor the up or down status of the specific service. Even though these are both checks, they have different functionality and can be used separately and together based on your monitoring needs. For more information about each, see the [custom check][11], and [service check][12] documentation sections.

### Sending metrics by integration types

{{< whatsnext desc="Learn how to send your own metrics to Datadog:" >}}
    {{< nextlink href="/developers/dogstatsd" >}}<u>DogStatsD</u>: Overview of the features of DogStatsD, including setup, datagram format, and data submission.{{< /nextlink >}}
    {{< nextlink href="/developers/write_agent_check" >}}<u>Custom Agent Check</u>: Learn how to report metrics, events, and service checks with your own custom check.{{< /nextlink >}}
    {{< nextlink href="/developers/prometheus" >}}<u>Custom OpenMetrics Check</u>: Learn how to report your OpenMetrics check with a dedicated custom Agent Check.{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/" >}}<u>Integrations</u>: For more complex tasks, build a public or private Datadog integration. Public integrations can be shared with the community.{{< /nextlink >}}
{{< /whatsnext >}}

### Sending data by data types

{{< whatsnext desc="Learn about the types of data you can submit to Datadog and how to submit them:" >}}
    {{< nextlink href="/metrics" >}}<u>Custom Metrics</u>: A deep-dive into custom metrics at Datadog. This section explains metrics types, what they represent, how to submit them, and how they are used throughout Datadog.{{< /nextlink >}}
    {{< nextlink href="service_management/events/guides/" >}}<u>Events</u>: Explore how to submit events to Datadog with custom Agent checks, DogStatsD, or the Datadog API.{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks" >}}<u>Service Checks</u>: Explore how to submit the up or down status of a specific service to Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

## Engage with the developer community

{{< whatsnext desc="Learn how to get involved with the Datadog developer community:" >}}
    {{< nextlink href="/developers/libraries" >}}<u>Libraries</u>: A list of official and community-contributed libraries for the Datadog API, DogStatsD client, APM & Continuous Profiler, and externally-supported community integrations for a wide variety of platforms.{{< /nextlink >}}
    {{< nextlink href="/developers/guide/" >}}<u>Guides</u>: Read helpful articles covering technical details, code examples, and reference documentation.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: https://www.datadoghq.com/partner/
[3]: /developers/dogstatsd/
[4]: /developers/custom_checks/write_agent_check/
[5]: /developers/custom_checks/prometheus/
[6]: /developers/integrations/
[7]: https://github.com/DataDog/integrations-extras
[8]: https://www.datadoghq.com/pricing/
[9]: https://github.com/DataDog/integrations-core
[10]: /developers/integrations/marketplace_offering
[11]: /developers/custom_checks/
[12]: /developers/service_checks/
[13]: /developers/integrations/agent_integration
