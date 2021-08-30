---
title: Compare Profiles
kind: documentation
further_reading:
    - link: 'tracing/profiler/enabling'
      tag: 'Documentation'
      text: 'Enable continuous profiler for your application'
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog'
---

Continuous Profiler allows you to compare profiles to help you you identify code performance improvements, regressions, and structural changes. Compare a profile with the same profile at a different time, an average of the service's profiles over time, or with a profile with a different set of Datadog tags (environment, version or data center, for example). See if the current snapshot is taking more time, using more  memory, making more  allocations, throwing more  exceptions, or involves more or less code and calls.

Common Comparison Scenarios

Comparisons work best when the application is experiencing a similar workload (total requests and resource usage). Some common scenarios to use comparison are:
Comparing two latest deployments
Example: Verify if the latest deployed fix lowered the number of memory allocations your method was making 
Comparing two distinct time periods. 
Example: Calculate the CPU consumption for today vs the past week. What were the methods that got better or worse in CPU consumption?
Comparing two different sets of tags.
Example: Compare profiles between different environments, availability zones, pods, canaries, or any other custom Datadog tags

Accessing the Comparison UI
There are two ways to access the comparison feature:

Aggregation 
Note: the compare dropdown shows two latest versions seen of the application






Single profile comparison



Metrics

The metric section includes:
Time ranges selected for both Profile A and Profile B in their respective colors
A dropdown to change to any metric type. This is helpful in situations where you want to look at allocation spikes while investigating CPU profiles

Side-by-side comparison



This comparison mode is helpful when you want to retain the context of both A and B profiles. In this mode:
The flame graph on the left represents profile scoped to tags and time range scoped in ‘A’ while the flame graph on the right represents profile scoped to tags and time range scoped in ‘B’
The green boxes in the example above show methods that are taking less CPU time in profile captured in B compared to profile captured in A. The red boxes represent methods that consume more CPU time in B compared to A.
The methods highlighted in blue on the left flame graph show methods that do not exist in the profile B. Similarly, methods highlighted in purple show methods that exist in profile B but not in profile A. These colors can easily help you identify structural changes in your code between versions, timeranges, canaries, and more

Combined comparison



This comparison mode is helpful when you want to look at code performance changes in a single view. 
It computes one flame graph that averages method timings in A and B and shows an averaged difference in method timings between the two queries. 
In the example above the method ‘ModelTraining.computeCoefficientsOnFeature’ consumed 3m and 46 seconds of CPU time over 5 minutes 44 seconds in A and 3 minutes and 56 seconds of CPU time over 5m 44s in B. This means on average this method consumed 2.8% more CPU time in B compared to A.
Removed methods are highlighted in green and revealed when you hover over the method frame while added code is highlighted in red




## Further reading

{{< partial name="whats-next/whats-next.html" >}}