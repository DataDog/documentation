---
title: Profiling
kind: Documentation
further_reading:
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
---

<div class="alert alert-info">
Datadog Profiling is in beta. Reach out to <a href="/help/">Datadog Support</a> if you encounter any issues or have feedback to share.
</div>

Profiling libraries are shipped within the following tracing language library. Refer to the dedicated language page to learn how to enable profile connections for your application:

{{< partial name="profiling/profiling-languages.html" >}}

## Profile explorer

Once your profile collection is set up, profiles are available in the [APM > Profiling][1] page within Datadog:

{{< img src="tracing/profiling/profiling_main_page.png" alt="Profiling main page">}}

Each row is a profile of a process for a short amount of time. Depending on the language, these processes are profiled between 15s and 60s.

### Search

You can filter according to infrastructure tags or application tags set up from your [environment tracing configuration][2]. By default the following facets are available:

|  Facet   |  Definition                                                             |
| -------- | ----------------------------------------------------------------------- |
| Env      | The environment your application is running on (`prod`, `staging`).     |
| Service  | The name of the [service][3] your code is running.                      |
| Version  | The version of your code.                                               |
| Host     | The host name your profiled process is running on.                      |
| Runtime  | The type of runtime the profiled process is running (`JVM`, `CPython`). |
| Language | The language of your code (`Java`, `Python`).                           |

The following measures are available:

|  Measure          | Definition                                                                                                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU               | CPU load summed on all cores of the process. This means this can go above `100%` and the theoretical limit is `nCores` \* `100%`.                                                    |
| Memory Allocation | Memory allocation rate in `Bytes/s` over the course of the profile. This value can be above the maximum amount of RAM memory because it can be garbage collected during the profile. |

## Profile

Click on one line to view a specific profile:

{{< img src="tracing/profiling/profile.png" alt="A specic profile">}}

The profile header contains information associated with your profile, like: the service that generated it, or the environment and code version associated to it. In the upper right corner of each profile, there are options to:

- Download the profile
- Switch the profile to full screen

Four tabs are below the profile header:

| Tab          |  Definition                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Profiles     | Flame graph and summary table of the profile you are looking at. You can switch between multiple profile types (`CPU`, `Memory allocation`) |
| Analysis     | A set of heuristics that suggest potential issues or areas of improvement in your code                                                      |
| Metrics      | Profiling metrics coming from all profiles of the same service                                                                              |
| Runtime Info | Text dump of all the Runtime properties                                                                                                     |

### Profile types

In the **Profiles** tab you can see all profile types available for a given language. Depending on the language, the information collected about your profile differs. Refer to the dedicated profile types section for your language to see what is collected:

{{< partial name="profiling/profiling-languages.html" >}}

## Troubleshooting

Datadog profiling is in beta. Note the following limitations:

- Datadog profiling does not work with serverless.
- Datadog profiling does not work with complex proxy configuration. Profiles are sent directly from your application to Datadog.

In case you have done all the necessary configuration steps and do not see profiles in the [profile search page](#search-profiles), turn on [debug mode][4] and open a support ticket with debug files and the following information:

- OS type and version (e.g Linux Ubuntu 14.04.3)
- Runtime type, version and vendor (e.g Java OpenJDK 11 AdoptOpenJDK)

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/profiling
[2]: /tracing/send_traces/#configure-your-environment
[3]: /tracing/visualization/#services
[4]: /tracing/troubleshooting/#tracer-debug-mode
