---
title: APM and distributed tracing
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

 Tracing allows you to see a single request moving across your system and infrastructure, and it gives you systematic data about precisely what is happening to this request. This gives you better insight into your systems interdependencies, it allows you to see where requests are taking the longest, it gives you visual cues for accurately troubleshooting outages and other system issues, and it allows you to see detailed traces of individual requests-side by side with your logs and infrastructure monitoring.

## Setting up APM

The application code instrumentation sends traces to the Agent every second. The Agent then calculates performance metrics over all traces and send those metrics along with [a sample of traces][2] to Datadog every 10 seconds. To get APM up, running, and reporting data from your application, follow these steps:

1. **[Enable Trace collection in the Datadog Agent][3]**:
   Install and configure the latest [Datadog Agent][4]. (On macOS, install and run the Trace Agent in addition to the Datadog Agent. See the [macOS Trace Agent][5] documentation for more information). APM is enabled by default in Agent 6, however there are additional configurations to be set in a containerized environment including setting `apm_non_local_traffic: true`. To get an overview of all the possible settings for APM including setting up APM in containerized environments such as [Docker][6] or [Kubernetes][7], get started [Sending traces to Datadog][3].

2. **[Instrument your application to send traces to your Datadog Agent][8]**:
  Datadog has libraries to support configuring your application in several different languages and containers. For more information about specific languages and containers, see [Application Tracing Setup][8].
   
3. **[Enable Trace Search & Analytics][9]**: 
  [Trace Search & Analytics][9] is used to filter APM Data by user-defined tags such as `customer_id`, `error_type`, or `app_name` to help troubleshoot and filter your requests.

4. **[Enrich tracing][9]**:
  [Enrich tracing][10] by automatically [injecting a trace-id into your logs][11], [adding metadata to your spans][12], and [collecting Runtime metrics associated with your traces][13].

Within a few minutes of running APM, your services will appear in [the APM home page][14]. See [Using the APM UI][15] to learn more.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/agent-5-tracing-setup
[2]: /tracing/guide/trace_sampling_and_storage/#trace-sampling
[3]: /tracing/send_traces
[4]: /tracing/setup/python
[5]: https://github.com/DataDog/datadog-agent/tree/master/docs/trace-agent#run-on-macos
[6]: /agent/docker/apm
[7]: /agent/kubernetes/daemonset_setup
[8]: /tracing/setup
[9]: /tracing/trace_search_and_analytics
[10]: /tracing/advanced
[11]: /tracing/advanced/connect_logs_and_traces
[12]: /tracing/advanced/adding_metadata_to_spans/?tab=java
[13]: /tracing/advanced/runtime_metrics/?tab=java
[14]: https://app.datadoghq.com/apm/home
[15]: /tracing/visualization
