---
title: Solve Memory Leaks with Profiling
further_reading:
- link: /profiler
  tag: Documentation
  text: Datadog Continuous Profiler
- link: /profiler/compare_profiles/
  tag: Documentation
  text: Comparing Profiles
---

## 概要

Profiling has several datasets to help solve memory leaks, such as the Live Heap profile type, which is [available for multiple languages][1].

To help you get started, Datadog provides an end-to-end, guided walkthrough for Go services:

{{< img src="profiler/guide-memory-leak/service-page-memory-leak-walkthrough.mp4" alt="Walk through the memory leak walkthrough" video=true >}}

## What to expect

Following this walkthrough requires zero prior knowledge, and it is accessible for first-time investigations.

The walkthrough guides you through several steps to:
1. Scope to the relevant data.
2. Recommend Datadog integrations and upgrades that assist in the investigation.
3. Explain how memory management works in your runtime.
4. Propose potential root causes through [Profile Comparisons][2].

## 要件

<div class="alert alert-warning">The walkthrough is in public beta and prone to change. More languages and infrastructure will be supported over time</div>

To use this walkthrough, you need:
* A Go service running on Kubernetes.
* [Continuous Profiler enabled][3].

## 詳細はこちら

To investigate a memory leak using the guided walkthrough:

1. Go to **APM > Service Page** on the service you want to investigate.
2. Click the **Memory Leaks** tab:
{{< img src="profiler/guide-memory-leak/service-page-memory-leak-entrypoint.png" alt="Memory Leak walkthrough entrypoint in the Service Page" style="width:100%;" >}}
3. Follow the guided steps to complete your investigation.


[1]: /profiler/enabling/supported_versions/#profile-types
[2]: /profiler/compare_profiles
[3]: /profiler/enabling

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}
