---
title: Compare Profiles
aliases:
- /tracing/profiler/compare_profiles/
further_reading:
    - link: profiler/enabling
      tag: Documentation
      text: Enable continuous profiler for your application
    - link: getting_started/profiler
      tag: Documentation
      text: Getting Started with Profiler
    - link: "https://www.datadoghq.com/blog/introducing-datadog-profiling/"
      tag: Blog
      text: Introducing always-on production profiling in Datadog
    - link: "https://www.datadoghq.com/blog/code-optimization-datadog-profile-comparison/"
      tag: Blog
      text: Compare and optimize your code with Datadog Profile Comparison
    - link: "https://www.datadoghq.com/blog/engineering/how-we-optimized-our-akka-application-using-datadogs-continuous-profiler/"
      tag: Blog
      text: How we optimized our Akka application using Datadog's Continuous Profiler
---

The Continuous Profiler can compare two profiles or profile aggregations with each other to help you identify code performance improvements, regressions, and structural changes. You can compare a profile with:

- Profiles taken at a different time,
- An average of the service's profiles over time, or
- Profiles with a different set of Datadog tags (for example, environment, version, or data center). 

This helps you see if the service is taking more or less time, using more or less memory, making more or fewer allocations, throwing more or fewer exceptions, or involving more or less code and calls than it was in the past.

## Comparison scenarios

Comparisons work best when the application is experiencing a similar workload (total requests) as it was in the past.

Some common scenarios to use comparison are:

- Comparing two latest deployments. For example, verify if the latest deployed fix lowers the number of memory allocations your method makes.

- Comparing two distinct time periods. For example, calculate the CPU consumption for today compared to the past week. What methods get better or worse in terms of CPU consumption?

- Comparing two different sets of tags. For example, compare profiles between different environments, availability zones, pods, canaries, or other custom Datadog tags.

## Accessing the comparison view

You can open different types of comparisons from different places in the UI. 

### Comparing a profile to a previous time period 

On the Profiler Search view, select a profile from the list. Click **Compare** to open the comparison view. By default, the selected profile is shown as Profile B. For Profile A, select an aggregation time frame and tags, or a specific profile ID. 

Select the metric you want to compare (the list varies based on code language). This can be helpful, for example, for looking at allocation spikes while investigating CPU profiles.

{{< img src="profiler/compare_time_frames.mp4" alt="Opening the comparison view to compare a profile with an aggregation for a time frame." video="true">}}

Take note of the legend colors, which show:
 - Deepening shades of red for methods that take more time in profile B.
 - Deepening shades of green for methods that take less time in profile B.
 - Blue for methods that are only in profile A.
 - Purple for methods that are only in profile B.

These colors help you identify structural changes in your code between versions, time ranges, or canaries, and how they affect performance.

{{< img src="profiler/comparison_legend.png" alt="Legend for profile comparison." >}}

Hover over methods in the profile to see specific metrics about the methods that are taking more or less time, or making fewer or more allocations, than in the compared profile.

{{< img src="profiler/compare_hover.png" alt="Hover over a method in the profile to see metrics comparison" >}}

### Comparing recent versions

On the Aggregation view, select a service to see its aggregated profile for a particular metric (for example, wall time) over the selected time frame. Then click **Compare** to compare it to the aggregated profile of another version. 

{{< img src="profiler/compare_recent_versions.mp4" alt="Opening the comparison view for two versions." video="true">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
