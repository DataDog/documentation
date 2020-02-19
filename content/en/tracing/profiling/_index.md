---
title: Profiling
kind: Documentation
further_reading:
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
---

<div class="alert alert-info">
Datadog Profiling is in beta, reach out to <a href="/help/">Datadog Support</a> if you encounter any issues or have a feedback to share.
</div>

Profiling libraries are shipped within the following tracing language library, refer to the dedicated language page to learn how to enable profile connection for your application:

{{< partial name="profiling/profiling-languages.html" >}}

## Profile explorer

Once your profile collection is setup, profils are available in the [APM > Profiling][1] page within Datadog:

{{< img src="tracing/profiling/profiling_main_page.png" alt="Profiling main page">}}

Each line represents a profile for a process on which Datadog profiling was running for a short amount of time. Depending on the language, these processes are profiled between 15s and 60s.

### Search

You can filter according to infrastructure tags or application tags set up from your [environment tracing configuration][2]. By default the following facets are available:

|  Facet   |  Definition                                                                   |
| -------- | ----------------------------------------------------------------------------- |
| Env      | The environment your application is running on (`prod`, `staging`)            |
| Service  | The name of the [service][4] your code is running                             |
| Version  | The version of your code                                                      |
| Host     | The host name your profiled process is running on                             |
| Runtime  | The type of Runtime the profiled process is running ( `JVM`, `CPython`)       |
| Language | The language of your code ( `Java`, `Python`)                                 |

And the following measures are available:

|  Measure            | Definition |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------
---------------------------------- |
| CPU                 | CPU load summed on all cores of the process. This means this can go above `100%` and the theoretical limit is `nCores` * `100%`
                                   |
| Memory Allocation   | Memory allocation rate in `Bytes/s` over the course of the profile. This value can be above the maximum amount of RAM memory because it can be garbage collected during the profile       |

## Profile

Click on one line to view a specific profile:

{{< img src="tracing/profiling/profile.png" alt="A specic profile">}}

The profile header contains information associated to your profile like: the service that generated it, the environment and code version associated to it. Find also in the upper right corner of each profile options to:

- Download the profile
- Switch the profile to full screen

Below the profile header you can find 4 tabs:

| Tab          |  Definition |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------
---------------------------------- |
| Profiles     | Flame graph and summary table of the profile you are looking at. You can switch between multiple profile types (`CPU`, `Memory allocation`)                       |
| Analysis     | A set of heuristics that suggest potential issues or areas of improvement in your code
                                   |
| Metrics      | Profiling metrics coming from all profiles of the same service
                                   |
| Runtime Info | Text dump of all the Runtime properties
                                   |

### Profile types

In the **Profiles** tab you can see all profile types available for a given language. Depending of the language, the information collected about your profile differs. Refer to the dedicated profile types section for your language to see which one are collected:

{{< partial name="profiling/profiling-languages.html" >}}

## Troubleshooting

Datadog profiling is in beta. It will not work with some configurations or environments:

- Datadog profiling does not work with serverless.
- Datadog profiling does not work with complex proxy configuration. Profiles are sent directly from your application to Datadog.

In case you have done all the necessary configuration steps and do not see profiles on the [profile search page](#search-profiles), please turn on [debug mode][3] and open a support ticket with debug files and following information:

- OS type and version (e.g Linux Ubuntu 14.04.3)
- Runtime type, version and vendor (e.g Java OpenJDK 11 AdoptOpenJDK)

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/profiling
[2]: /tracing/send_traces/#configure-your-environment
[3]: /tracing/troubleshooting/#tracer-debug-mode
[4]: /tracing/visualization/#services
