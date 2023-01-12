---
title: Search Profiles
kind: documentation
aliases:
    - /tracing/profiling/search_profiles/
    - /tracing/profiler/search_profiles/
further_reading:
    - link: 'profiler/enabling'
      tag: 'Documentation'
      text: 'Enable continuous profiler for your application'
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog'
---

{{< img src="profiler/search_profiles.mp4" alt="Search profiles by tags" video=true >}}

Each row is a profile of a process for a short amount of time. By default, profiles are uploaded once a minute. Depending on the language, these processes are profiled between 15s and 60s.

You can filter according to infrastructure tags or application tags set up from your [environment tracing configuration][1]. By default the following facets are available:

| Facet   | Definition                                                                |
| ------- | ------------------------------------------------------------------------- |
| Env     | The environment your application is running on (`production`, `staging`). |
| Service | The name of the [service][2] your code is running.                        |
| Version | The version of your code.                                                 |
| Host    | The hostname your profiled process is running on.                         |
| Runtime | The type of runtime the profiled process is running (`JVM`, `CPython`).   |

The following measures are available:

| Measure                | Definition                                                                                                                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU                    | CPU usage, measured in cores.                                                                                                                                                            |
| Memory&nbsp;Allocation | Memory allocation rate over the course of the profile. This value can be above the amount of memory on your system because allocated memory can be garbage collected during the profile. |
| Wall time              | The elapsed time used by the code. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while it is running.  |

For each runtime, there is also a broader set of metrics available, which you can see [listed by timeseries][4].

## Profiles

Click on a line to view a specific profile:

{{< img src="profiler/profiling_flamegraph.mp4" alt="A specific profile" video=true >}}

The header contains information associated with your profile, like the service that generated it, or the environment and code version associated to it.

Four tabs are below the profile header:

| Tab               | Definition                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Profiles          | A flame graph and summary table of the profile you are looking at. You can switch between profile types (for example, `CPU`, `Memory allocation`). |
| Analysis          | A set of heuristics that suggest potential issues or areas of improvement in your code. Only available for Java.            |
| Metrics           | Profiler metrics coming from all profiles of the same service.                                                                        |
| Runtime&nbsp;Info | Runtime properties in supported languages, and profile tags.                                                                          |

**Note**: In the upper right corner of each profile, there are options to:

- Download the profile
- Switch the profile to full screen


### Profile types

In the **Profiles** tab, you can see all profile types available for a given language. Depending on the language, the information collected about your profile differs. See [Profile types][3] for a list of profile types available for each language.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/send_traces/#configure-your-environment
[2]: /tracing/glossary/#services
[3]: /profiler/profile_types/
[4]: https://app.datadoghq.com/profiling/search?viz=timeseries