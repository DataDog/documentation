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

The Developers section contains reference materials for developing on Datadog. You may want to develop on Datadog if there is data you want to see in the product that you are not seeing, or if you are a partner who wants to build on Datadog and contribute to the Datadog Marketplace or to Datadog's community integrations. For more information about becoming a Datadog partner, see the [Partner program page][1].

## Data

### Should I write a custom check or an integration?

Developers have several choices for sending unsupported data to Datadog. The main considerations are effort (time to develop) and budget (cost of custom metrics). If you are a Partner developing on Datadog Marketplace or community integrations, jump straight to the [Marketplace][2] and [building an integration][3] docs. If you are trying to see data that Datadog doesn't support, start by deciding which method makes the most sense to start sending data:

| Type                | Effort | Custom Metrics | Language |
|---------------------|--------|----------------|----------|
| DogStatsD           | Lowest | Yes            | Any      |
| Custom check        | Low    | Yes            | Python   |
| Private integration | Medium | Yes            | Python   |
| Public integration  | High   | No             | Python   |

{{< whatsnext desc="Send unsupported metrics to Datadog:" >}}
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

[1]: https://www.datadoghq.com/partner/
[2]: /developers/integrations/
[3]: /developers/marketplace/
