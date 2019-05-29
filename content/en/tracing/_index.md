---
title: APM and Distributed Tracing
kind: documentation
description: Instrument your code to improve performance
further_reading:
- link: "/tracing/advanced/connect_logs_and_traces/"
  tag: "Documentation"
  text: "Connect logs and traces"
- link: "/advanced/adding_metadata_to_spans"
  tag: "Documentation"
  text: "Adding metadata to spans"
- link: "/advanced/runtime_metrics"
  tag: "Documentation"
  text: "Runtime metrics"
- link: "https://learn.datadoghq.com/course/view.php?id=4"
  tag: "Learning Center"
  text: "Introduction to Application Performance Monitoring"
aliases:
  - /tracing/faq/terminology
  - /tracing/guide/terminology
disable_toc: true
---

## What is APM?

 Datadog Application Performance Monitoring (APM or tracing) provides you with deep insight into your application's performance - from automatically generated dashboards for monitoring key metrics, like request volume and latency, to detailed traces of individual requests - side by side with your logs and infrastructure monitoring. This documentation covers Agent v6 only, for more information on setting up APM tracing with Agent v5, [see the APM with Agent v5 doc][1].

 Tracing allows you to see a single request moving across your system and infrastructure, and it gives you systematic data about precisely what is happening to this request. This gives you better insight into your systems interdependencies, it allows you to see where requests are taking the longest, and it gives you visual cues for accurately troubleshooting outages and other system issues.

Datadog APM is offered as an upgrade to the Pro and Enterprise plans. A free 14-day trial is available. Registered users can visit the [APM page of the Datadog application][2] to get started.

## Setting up APM

With Datadog's infrastructure monitoring, metrics are sent to the Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Agent: the application code instrumentation sends to the Agent every second ([see here for the Python client][3] for instance) and the Agent sends to the Datadog API every 10 seconds. To get APM up and running and reporting data from your application, follow these steps:

{{< partial name="apm/apm-steps.html" >}}

1. **Install the Datadog Agent**:
  Install and configure the latest [Datadog Agent][3]. (On macOS, install and run the Trace Agent in addition to the Datadog Agent. See the [macOS Trace Agent][4] documentation for more information).

2. **[Configure the Datadog Agent to receive traces][5]**:
  To configure your Datadog Agent to receive traces, update the `apm_config` key in your Agent `datadog.yaml` main configuration file to `true`. For more information, see the [Agent APM configuration page][5].

3. **[Set up your application to send traces to your Datadog Agent][6]**:
  Datadog has libraries to support configuring your application in several different languages and containers. For more information about specific languages and containers, see [Application Tracing Setup][6].

4. **[Visualize and monitor services, resources, and traces in Datadog][7]**:
  Once you have everything set up and configured, APM collects metrics on your app’s performance at four levels of granularity: services, resources, traces, and spans level. For more information about these levels of granularity, see [Using the APM UI][7].
   
5. **[Enable Trace Search & Analytics][8]**: 
  [Trace Search & Analytics][8] is used to filter APM Data by user-defined tags such as customer_id, error_type, or app_name to help troubleshoot and filter your requests.

Within a few minutes of running APM, your services will appear in [the APM home page][2]. See [Using the APM UI][7] to learn more.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/agent-5-tracing-setup
[2]: https://app.datadoghq.com/apm/home
[3]: /tracing/setup/python
[4]: https://github.com/DataDog/datadog-agent/tree/master/docs/trace-agent#run-on-macos
[5]: /agent/apm
[6]: /tracing/setup
[7]: /tracing/visualization
[8]: /tracing/trace_search_and_analytics
