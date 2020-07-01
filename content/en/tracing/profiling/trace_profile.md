---
title: Connect Traces & Profiles
kind: Documentation
further_reading:
    - link: 'tracing/profiling/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types.'
    - link: 'tracing/profiling/code_level_metrics'
      tag: 'Documentation'
      text: 'View code level metrics.'  
    - link: 'tracing/profiling/getting_started'
      tag: 'Documentation'
      text: 'Enable continuous profiling for your application.'
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
---

{{< img src="tracing/profiling/trace-profile.gif" alt="Connect profiles and traces.">}}

You can pivot seamlessly between distributed traces and profiles by simply clicking on a trace, identifying a span of interest, and clicking the 'View Profile' link.

## Scope Profiles by Span or Trace

{{< img src="tracing/profiling/span_trace_profile.png" alt="Profile scoped by an individual trace.">}}

When you click the 'View Profile' link on a span, you can look at the profile that is scoped to that specific span. You can use this view to gain further visibility when you are debugging a slow request, as it allows you to drill into functions responsible for heavy CPU, memory, or IO usage, scoped for that request. You can also switch between tabs to look at the entire trace profile or a full 60 seconds profile of that service.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
