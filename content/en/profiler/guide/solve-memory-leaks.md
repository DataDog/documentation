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

Profiling has several datasets to help solve memory leaks, such as the Live Heap profile type, which is [available for multiple languages][1].

To help you get started, Datadog provides an end-to-end, guided walkthrough for Go or Java services:

{{< img src="profiler/guide-memory-leak/service-page-memory-leak.png" alt="Memory Leak walkthrough entrypoint in the Service Page" style="width:100%;" >}}

## What to expect

Following this walkthrough requires zero prior knowledge, and it is accessible for first-time investigations.

The walkthrough guides you through several steps to:
1. Scope to the relevant data.
2. Recommend Datadog integrations and upgrades that assist in the investigation.
3. Explain how memory management works in your runtime.
4. Propose potential root causes through [Profile Comparisons][2].

## Requirements

To use this walkthrough, you need:
* A Go or Java service running on Kubernetes with the Datadog Kubernetes integration installed.
* [Continuous Profiler enabled][3].

## Get started

To investigate a memory leak using the guided walkthrough:

1. Go to **[APM > Service Catalog][4]**.
1. Hover over the service you want to investigate and click **Service Page**.
1. Click the **Memory Leaks** tab.
1. Follow the guided steps to complete your investigation.


[1]: /profiler/enabling/supported_versions/#profile-types
[2]: /profiler/compare_profiles
[3]: /profiler/enabling
[4]: https://app.datadoghq.com/services

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
