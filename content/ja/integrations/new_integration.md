---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Officially Integrating with Datadog
sidebar:
  nav:
    - header: Guides
    - text: Getting Started with the Agent
      href: "/ja/guides/basic_agent_usage/"
    - text: Datadog Overview
      href: "/ja/overview/"
    - text: Sending App Metrics
      href: "/ja/guides/dogstatsd/"
    - text: Log Parsing in the Agent
      href: "/ja/guides/logs/"
    - text: Writing an Agent Check
      href: "/ja/guides/agent_checks/"
    - text: Setting up Service Checks
      href: "/ja/guides/services_checks/"
    - text: Deploying the Agent with Chef
      href: "/ja/guides/chef/"
    - text: Guide to Alerting
      href: "/ja/guides/alerting/"
    - text: Single Sign On With SAML
      href: "/ja/guides/saml/"
    - text: Billing FAQ
      href: "/ja/guides/billing/"
    - header: References
    - text: API
      href: "/ja/api/"
    - text: Libraries
      href: "/ja/libraries/"
    - text: Graphing
      href: "/ja/graphing/"
    - text: Host Names
      href: "/ja/hostnames/"
    - text: Integrations
      href: "/ja/integrations/"
    - text: DogStatsD
      href: "/ja/guides/dogstatsd/"
---

Being able to see all of your metrics from across your infrastructure is key within Datadog.
While we do have guides to submit custom metrics via our [API](http://docs.datadoghq.com/api/) and [code instrumentation](http://docs.datadoghq.com/guides/dogstatsd), it's possible you might want to see a certain source become an official integration. Overall, the largest deciding factor in what integrations we build is what our clients request.

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
