---
title: Solve Memory Leaks with Profiling
kind: guide
further_reading:
- link: "/profiler"
  tag: "Documentation"
  text: "Datadog Continuous Profiler"
- link: "/profiler/compare_profiles/"
  tag: "Documentation"
  text: "Comparing Profiles"
---

## Overview

Profiling has a few datasets to help solve memory leaks, for example Live Heap profile type, which is [available in Python, Go, Node.js and is in beta for Java, .NET, Rust, C and C++][1].

This can be hard to get started with, so Datadog provides an end-to-end guided workflow, starting with Go:

{{< img src="profiler/guide-memory-leak/service-page-memory-leak-walkthrough.mp4" alt="Walk through the memory leak workflow" video=true >}}

## What to expect?

<div class="alert alert-info">The workflow requires zero prior knowledge, and is accessible for first time investigations</div>

Through multiple steps, the workflow will:
1. Scope to the right data
2. Recommend missing Datadog integrations and upgrades that ease the investigation
3. Inform about how memory management works in your runtime
4. Propose potential root causes through [Profile Comparisons][2]

## Requirements

<div class="alert alert-warning">The workflow is in public beta and prone to change. More languages and infrastructure will be supported over time</div>

For now, the workflow needs:
* a Go service 
* Running on Kubernetes
* With [Continuous Profiler enabled][3]

## How to get started?

1. Go to *APM -> Service Page* on the service you want to investigate
2. Click on the tab *Memory Leaks*:
{{< img src="profiler/guide-memory-leak/service-page-memory-leak-entrypoint.png" alt="Memory Leak workflow entrypoint in the Service Page" style="width:100%;" >}}
3. Follow the steps


[1]: /profiler/enabling/supported_versions/#profile-types
[2]: /profiler/compare_profiles
[3]: /profiler/enabling

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
