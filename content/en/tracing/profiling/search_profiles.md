---
title: Search Profiles
kind: Documentation
further_reading:
    - link: 'tracing/profiling/trace_profile'
      tag: 'Documentation'
      text: 'Connect traces and profiles.'
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

{{< img src="tracing/profiling/search_profiles.gif" alt="Search profiles by tags">}}

Each row is a profile of a process for a short amount of time. By default profiles are uploaded once a minute. Depending on the language, these processes are profiled between 15s and 60s.

You can filter according to infrastructure tags or application tags set up from your [environment tracing configuration][1]. By default the following facets are available:

| Facet    | Definition                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------ |
| Env      | The environment your application is running on (`prod`, `staging`).                                    |
| Service  | The name of the [service][2] your code is running.                                                     |
| Version  | The version of your code.                                                                              |
| Host     | The host name your profiled process is running on. If running in Kubernetes, it's the name of the pod. |
| Runtime  | The type of runtime the profiled process is running (`JVM`, `CPython`).                                |
| Language | The language of your code (`Java`, `Python`).                                                          |

The following measures are available:

| Measure           | Definition                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CPU cores              | CPU load summed on all cores of the process. This metric can go above `100%`, and the theoretical limit is `nCores` \* `100%`.                                                    |
| Memory Allocation | Memory allocation rate in `Bytes/s` over the course of the profile. This value can be above the maximum amount of RAM memory because it can be garbage collected during the profile. |



## Profiles

Click on a line to view a specific profile:

{{< img src="tracing/profiling/profiling_flamegraph.gif" alt="A specic profile">}}

The profile header contains information associated with your profile, like the service that generated it, or the environment and code version associated to it.

Four tabs are below the profile header:

| Tab          | Definition                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Profiles     | Flame graph and summary table of the profile you are looking at. You can switch between multiple profile types (`CPU`, `Memory allocation`) |
| Analysis     | A set of heuristics that suggest potential issues or areas of improvement in your code                                                      |
| Metrics      | Profiling metrics coming from all profiles of the same service                                                                              |
| Runtime Info | Text dump of all the runtime properties                                                                                                     |

**Note**: In the upper right corner of each profile, there are options to:

- Download the profile
- Switch the profile to full screen


### Profile types

In the **Profiles** tab you can see all profile types available for a given language. Depending on the language, the information collected about your profile differs.

{{< tabs >}}
{{% tab "Java" %}}

{{< img src="tracing/profiling/profile.png" alt="A specific profile">}}

Once enabled, the following profile types are collected:

| Profile type             | Definition                                                                                                                                                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU in Java Code         | Shows the time each method spent running on the CPU. It includes JVM bytecode, but not native code called from within the JVM.                                                                                                                                                                     |
| Allocation               | Shows the amount of heap memory allocated by each method, including allocations which were subsequently freed.                                                                                                                                                                                     |
| Wall Time in Native Code | Shows the elapsed time spent in native code. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the method is running. This profile does not include time spent running JVM bytecode, which is typically most of your application code. |
| Class load               | Shows the number of classes loaded by each method.                                                                                                                                                                                                                                                 |
| Error                    | Shows the number of errors thrown by each method.                                                                                                                                                                                                                                                  |
| File I/O                 | Shows the time each method spent reading and writing files.                                                                                                                                                                                                                                        |
| Lock                     | Shows the time each method spent waiting for a lock.                                                                                                                                                                                                                                               |
| Socket I/O               | Shows the time each method spent handling socket I/O.                                                                                                                                                                                                                                              |


{{% /tab %}}

{{% tab "Python" %}}

Once enabled, the following profile types are collected:

| Profile type             | Definition                                                                                                                                                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU         | Shows the time each function spent running on the CPU. It includes CPython bytecode, including native code called from within Python.                                                                                                                                                                     |
| Allocation               | Shows the amount of heap memory allocated by each function, including allocations which were subsequently freed. Only supported on Python 3.                                                                                                                                                                                    |
| Wall | Shows the elapsed time used by each function. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the function is running. |
| Exceptions               | Shows the number of caught or uncaught exceptions raised by each function.                                                                                                                                                                                                                                                 |
| Lock                     | Shows the time each function spent waiting for a lock.                                                                                                                                                                                                                                               |

{{% /tab %}}

{{% tab "Go" %}}

Once enabled, the following profile types are collected:

| Profile type             | Definition                                                                                                                                                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU                      | Shows the time each function spent running on the CPU.                                                                          |
| Allocation               | Shows the amount of heap memory allocated by each function, including allocations which were subsequently freed. Go calls this `alloc_space`. This is useful for investigating garbage collection load.              |
| Allocation Count         | Shows the number of objects allocated in heap memory by each function, including allocations which were subsequently freed. This is useful for investigating garbage collection load.     |
| Heap                     | Shows the amount of heap memory allocated by each function that remained allocated. Go calls this `inuse_space`. This is useful for investigating the overall memory usage of your service.               |
| Heap Count               | Shows the number of objects allocated in heap memory by each function and that remained allocated. This is useful for investigating the overall memory usage of your service.                              |

{{% /tab %}}

{{% tab "Node" %}}

Once enabled, the following profile types are collected:

| Profile type | Definition |
| ------------ | ---------- |
| Allocation   | Shows the amount of heap memory allocated by each function, including allocations which were subsequently freed. |
| Wall         | Shows the elapsed time used by each function. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the function is running. |

{{% /tab %}}

{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/send_traces/#configure-your-environment
[2]: /tracing/visualization/#services
