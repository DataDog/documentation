---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Officially Integrating with Datadog
sidebar:
  nav:
    - header: Guides
    - text: Getting Started with the Agent
      href: "guides/basic_agent_usage/"
    - text: Datadog Overview
      href: "overview/"
    - text: Sending App Metrics
      href: "guides/metrics/"
    - text: Log Parsing in the Agent
      href: "guides/logs/"
    - text: Writing an Agent Check
      href: "guides/agent_checks/"
    - text: Setting up Service Checks
      href: "guides/services_checks/"
    - text: Guide to Alerting
      href: "guides/monitors/"
    - text: Single Sign On With SAML
      href: "guides/saml/"
    - text: Billing FAQ
      href: "guides/billing/"
    - header: References
    - text: API
      href: "api/"
    - text: Libraries
      href: "libraries/"
    - text: Graphing
      href: "graphing/"
    - text: Host Names
      href: "hostnames/"
    - text: Integrations
      href: "integrations/"
    - text: DogStatsD
      href: "guides/dogstatsd/"
---

Being able to see all of your metrics from across your infrastructure is key within Datadog.
While we do have guides to submit [custom metrics](http://docs.datadoghq.com/guides/metrics/) via our [API](http://docs.datadoghq.com/api/) and [code instrumentation](http://docs.datadoghq.com/libraries/), it's possible you might want to see a certain source become an official integration. Overall, the largest deciding factor in what integrations we build is what our clients request.

If you would like to propose an integration, please reach out to support@datadoghq.com and tell us what metrics you would like to see from that given source.

If you manage or work with a service and would like to see Datadog integrate it, the following information is needed:

- How will data get into Datadog? There are currently three options:
    1. Push data from the source to Datadog
    2. Crawl the data source's API
    3. Have the Datadog Agent pick up the information from the source
- What are the metrics and tags should be picked up from the source?
- What metrics should be included on the default dashboard that we generate for each integration?

We will also need a short blurb describing the integration as well as the correct
image to use across our site.
