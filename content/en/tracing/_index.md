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

## Setting up APM

With Datadog's infrastructure monitoring, metrics are sent to the Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Agent: the application code instrumentation sends to the Agent every second ([see here for the Python client][2] for instance) and the Agent sends to the Datadog API every 10 seconds. To get APM up and running and reporting data from your application, follow these steps:



1. **[Install and Configure the Datadog Agent to receive traces][3]**:
   Install and configure the latest [Datadog Agent][2]. (On macOS, install and run the Trace Agent in addition to the Datadog Agent. See the [macOS Trace Agent][4] documentation for more information). APM is enabled by default in Agent 6, however there are additional configurations to be set in a containerized environment including setting `apm_non_local_traffic: true`. To get an overview of all the possible settings for APM including setting up APM in containerized environments such as [Docker][5] or [Kubernetes][6], get started [here][3].

2. **[Configure your application to send traces to your Datadog Agent][7]**:
  Datadog has libraries to support configuring your application in several different languages and containers. For more information about specific languages and containers, see [Application Tracing Setup][7].
   
3. **[Enable Trace Search & Analytics][8]**: 
  [Trace Search & Analytics][8] is used to filter APM Data by user-defined tags such as customer_id, error_type, or app_name to help troubleshoot and filter your requests.

4. **[Enrich tracing][8]**:
  [Enrich tracing][9] by automatically [injecting a trace-id into your logs][10], [adding metadata to your spans][11], and [collecting Runtime metrics associated with your traces][12].

Within a few minutes of running APM, your services will appear in [the APM home page][13]. See [Using the APM UI][14] to learn more.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/agent-5-tracing-setup
[2]: /tracing/setup/python
[3]: /agent/apm
[4]: https://github.com/DataDog/datadog-agent/tree/master/docs/trace-agent#run-on-macos
[5]: /agent/docker/apm
[6]: /agent/kubernetes/daemonset_setup
[7]: /tracing/setup
[8]: /tracing/trace_search_and_analytics
[9]: /tracing/advanced
[10]: /tracing/advanced/connect_logs_and_traces
[11]: /tracing/advanced/adding_metadata_to_spans
[12]: /tracing/advanced/runtime_metrics
[13]: https://app.datadoghq.com/apm/home
[14]: /tracing/visualization
