---
title: Getting Started with Tags
kind: documentation
description: 'Learn how to assign and use tags in Datadog.'
aliases:
    - /getting_started/getting_started_with_tags
    - /guides/getting_started/tagging/
    - /developers/getting_started/tagging/
    - /tagging
    - /guides/tagging/
    - /faq/when-i-query-can-i-use-wildcards-in-metric-names-and-events/
further_reading:
    - link: '/getting_started/tagging/assigning_tags/'
      tag: 'Documentation'
      text: 'Learn how to assign tags'
    - link: '/getting_started/tagging/unified_service_tagging/'
      tag: 'Documentation'
      text: 'Learn how to configure unified service tagging'
    - link: '/getting_started/tagging/using_tags/'
      tag: 'Documentation'
      text: 'Learn how to use tags'
---

## Overview

Tags are a way of adding dimensions to Datadog telemetries so they can be filtered, aggregated, and compared in Datadog visualizations. [Using tags][1] enables you to observe aggregate performance across several hosts and (optionally) narrow the set further based on specific elements. In summary, tagging is a method to observe aggregate data points.

Tagging binds different data types in Datadog, allowing for correlation and call to action between metrics, traces, and logs. This is accomplished with **reserved** tag keys. 

| Tag Key   | Allows for                                                            |
| --------- | --------------------------------------------------------------------- |
| `host`    | Correlation between metrics, traces, processes, and logs.              |
| `device`  | Segregation of metrics, traces, processes, and logs by device or disk. |
| `source`  | Span filtering and automated pipeline creation for Log Management.     |
| `service` | Scoping of application specific data across metrics, traces, and logs. |
| `env`     | Scoping of application specific data across metrics, traces, and logs. |
| `version` | Scoping of application specific data across metrics, traces, and logs. |

Datadog recommends looking at containers, VMs, and cloud infrastructure at the `service` level in aggregate. For example, look at CPU usage across a collection of hosts that represents a service, rather than CPU usage for server A or server B separately.

Because containers and cloud environments regularly churn through hosts, using tags is important to aggregate your metrics.

## Define tags

Below are Datadog's tagging requirements:

1. Tags must **start with a letter** and after that may contain the characters listed below:

    - Alphanumerics
    - Underscores
    - Minuses
    - Colons
    - Periods
    - Slashes

    Other special characters are converted to underscores.

    **Note**: A tag cannot end with a colon, for example `tag:`.

2. Tags can be **up to 200 characters** long and support Unicode (which includes most character sets, including languages such as Japanese).
3. Tags are converted to lowercase. Therefore, `CamelCase` tags are not recommended. Authentication (crawler) based integrations convert camel case tags to underscores, for example `TestTag` --> `test_tag`. **Note**: `host` and `device` tags are excluded from this conversion.
4. A tag can be in the format `value` or `<KEY>:<VALUE>`. Commonly used tag keys are `env`, `instance`, and `name`. The key always precedes the first colon of the global tag definition, for example:

    | Tag                | Key           | Value          |
    | ------------------ | ------------- | -------------- |
    | `env:staging:east` | `env`         | `staging:east` |
    | `env_staging:east` | `env_staging` | `east`         |

5. Tags should not originate from unbounded sources, such as epoch timestamps, user IDs, or request IDs. Doing so may infinitely [increase the number of metrics][2] for your organization and impact your billing.
6. Limitations (such as downcasing) only apply to metric tags, not log attributes or span tags.

## Assign tags

### Tagging methods

Tags may be assigned using any (or all) of the following methods.

| Method                   | Assign tags                                                     |
| ------------------------ | --------------------------------------------------------------- |
| [Configuration Files][3] | Manually in your main Agent or integration configuration files. |
| [UI][4]                  | In the Datadog site.                                             |
| [API][5]                 | When using Datadog's API.                                        |
| [DogStatsD][6]           | When submitting metrics with DogStatsD.                          |

For more information, see [Assigning Tags][7].
#### Unified service tagging

As a best practice, Datadog recommends using unified service tagging when assigning tags. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to configure your environment with unified tagging, see [Unified Service Tagging][8].

## Usage

After you have [assigned tags][7] at the host and [integration][9] level, start using them to filter and group your metrics, traces, and logs. Tags are used in the following areas of your Datadog platform. 

| Area                 | Use Tags to                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| [Events][10]         | Filter the event stream.                                                                          |
| [Dashboards][11]     | Filter and group metrics on graphs.                                                               |
| [Infrastructure][12] | Filter and group on the host map, infrastructure list, live containers, and live processes views. |
| [Monitors][13]       | Manage monitors, create monitors, or manage downtime.                                             |
| [Metrics][14]        | Filter and group with the Metric Explorer.                                                        |
| [Integrations][15]   | Optionally limit metrics for AWS, Google Cloud, and Azure.                                        |
| [APM][16]            | Filter services, traces, and profiles, or navigate to other areas with the Service Map.           |
| [RUM & Session Replay][17] | Filter event search, analytics, patterns, replays, and issues with the RUM Explorer.        |
| [Synthetics][18]     | Filter and group Synthetic tests or tests running in CI pipelines with the CI Results Explorer.   |
| [Notebooks][19]      | Filter and group metrics on graphs.                                                               |
| [Logs][20]           | Filter logs search, analytics, patterns, live tail, and pipelines.                                |
| [SLOs][21]           | Search for SLOs, grouped metric-based SLOs, and grouped monitor-based SLOs.                       |
| [Developers][22]     | Pull information or setup different areas in the UI with the API.                                 |
| [Billing][23]        | Report on Datadog usage by choosing up to three tags, for example: `env`, `team`, and `account_id`. |

For more information, see [Using Tags][1].
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/using_tags/
[2]: /metrics/
[3]: /getting_started/tagging/assigning_tags/#configuration-files
[4]: /getting_started/tagging/assigning_tags/#ui
[5]: /getting_started/tagging/assigning_tags/#api
[6]: /getting_started/tagging/assigning_tags/#dogstatsd
[7]: /getting_started/tagging/assigning_tags/
[8]: /getting_started/tagging/unified_service_tagging
[9]: /integrations/
[10]: /getting_started/tagging/using_tags/#events
[11]: /getting_started/tagging/using_tags/#dashboards
[12]: /getting_started/tagging/using_tags/#infrastructure
[13]: /getting_started/tagging/using_tags/#monitors
[14]: /getting_started/tagging/using_tags/#metrics
[15]: /getting_started/tagging/using_tags/#integrations
[16]: /getting_started/tagging/using_tags/#apm
[17]: /getting_started/tagging/using_tags/#rum--session-replay
[18]: /getting_started/tagging/using_tags/#synthtics
[19]: /getting_started/tagging/using_tags/#notebooks
[20]: /getting_started/tagging/using_tags/#logs
[21]: /getting_started/tagging/using_tags/?tab=manageslos#service-level-objectives
[22]: /getting_started/tagging/using_tags/#developers
[23]: /account_management/billing/usage_attribution/
