---
title: Solve Memory Leaks with Profiling
further_reading:
- link: "/profiler"
  tag: "Documentation"
  text: "Datadog Continuous Profiler"
- link: "/profiler/compare_profiles/"
  tag: "Documentation"
  text: "Comparing Profiles"
---

## Overview

Profiling has several datasets to help solve memory leaks, such as the Heap profile type, which is [available for multiple languages][1].

To help you get started, Datadog provides an end-to-end, guided walkthrough for your service within the [APM service page][5]:

{{< img src="profiler/guide-memory-leak/service-page-memory-leak.png" alt="Memory Leak walkthrough entrypoint in the Service Page" style="width:100%;" >}}

## What to expect

Following this walkthrough requires zero prior knowledge, and it is accessible for first-time investigations.

The walkthrough guides you through several steps to:
1. Scope to the relevant data.
2. Recommend Datadog integrations and upgrades that assist in the investigation.
3. Explain how memory management works in your runtime.
4. Confirm potential memory leaks by inspecting retained objects using profile comparisons.

## Requirements

To use this walkthrough, you need:
* A containerized service with either the Datadog Kubernetes integration or the Datadog Container integration installed.
* [Continuous Profiler enabled][3].
  * Ensure that your profiles are tagged with `container_id`. This is necessary to link between container memory utilization metrics and profiling data.
  * For Java ([Enabling the heap histogram metrics][6]) and .NET ([Heap snapshot][7]) ensure that heap profiling is enabled so that heap data is available for analysis.


## Get started

To investigate a memory leak using the guided walkthrough:

1. Go to **[APM > Software Catalog][4]**.
2. Hover over the service you want to investigate and click **Service Page**.
3. Click the **Memory Leaks** tab.
4. Follow the guided steps to complete your investigation.


[1]: /profiler/enabling/supported_versions/#profile-types
[3]: /profiler/enabling
[4]: https://app.datadoghq.com/services
[5]: /tracing/services/service_page/#memory-leaks
[6]: /profiler/profiler_troubleshooting/java/?tab=jfr#enabling-the-heap-histogram-metrics
[7]: /profiler/enabling/dotnet/#configuration

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
