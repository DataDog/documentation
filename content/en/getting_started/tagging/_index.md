---
title: Getting started with tags
kind: documentation
description: 'Learn how to assign and use Tags with Datadog.'
aliases:
    - /getting_started/getting_started_with_tags
    - /guides/getting_started/tagging/
    - /developers/getting_started/tagging/
    - /tagging
    - /guides/tagging/
    - - /faq/when-i-query-can-i-use-wildcards-in-metric-names-and-events/
further_reading:
    - link: '/getting_started/tagging/assigning_tags/'
      tag: 'Documentation'
      text: 'Learn how to assign tags'
    - link: '/getting_started/tagging/unified_service_tagging/'
      tag: 'Documentation'
      text: 'Configure unified service tagging'
    - link: '/getting_started/tagging/using_tags/'
      tag: 'Documentation'
      text: 'Explore how to use tags in the Datadog app'
---

## Introduction

Tags are a way of adding dimensions to Datadog telemetries so they can be filtered, aggregated, and compared in Datadog visualizations. [Using tags][1] enables you to observe aggregate performance across a number of hosts and (optionally) narrow the set further based on specific elements. In summary, tagging is a method to observe aggregate data points.

Tagging binds different data types in Datadog, allowing for correlation and call to action between metrics, traces, and logs. This is accomplished with **reserved** tag keys. Here are some examples:

| Tag Key   | Allows for                                                            |
| --------- | --------------------------------------------------------------------- |
| `host`    | Correlation between metrics, traces, processes, and logs              |
| `device`  | Segregation of metrics, traces, processes, and logs by device or disk |
| `source`  | Span filtering and automated pipeline creation for log management     |
| `service` | Scoping of application specific data across metrics, traces, and logs |
| `env`     | Scoping of application specific data across metrics, traces, and logs |
| `version` | Scoping of application specific data across metrics, traces, and logs |

## Why it matters

Typically, it's helpful to look at containers, VMs, and cloud infrastructure at the `service` level in aggregate. For example, it's more helpful to look at CPU usage across a collection of hosts that represents a service, rather than CPU usage for server A or server B separately.

Containers and cloud environments regularly churn through hosts, so it is critical to tag these to allow for aggregation of the metrics you're getting.

## Defining tags

Below are Datadog's tagging requirements:

1. Tags must **start with a letter** and after that may contain the characters listed below:

    - Alphanumerics
    - Underscores
    - Minuses
    - Colons
    - Periods
    - Slashes

    Other special characters are converted to underscores.

    **Note**: A tag cannot end with a colon, for example `tag:`

2. Tags can be **up to 200 characters** long and support Unicode (which includes most character sets, including languages such as Japanese).
3. Tags are converted to lowercase. Therefore, `CamelCase` tags are not recommended. Authentication (crawler) based integrations convert camel case tags to underscores, for example `TestTag` --> `test_tag`. **Note**: `host` and `device` tags are excluded from this conversion.
4. A tag can be in the format `value` or `<KEY>:<VALUE>`. For optimal functionality, **we recommend constructing tags in the `<KEY>:<VALUE>` format.** Commonly used tag keys are `env`, `instance`, and `name`. The key always precedes the first colon of the global tag definition, for example:

    | Tag                | Key           | Value          |
    | ------------------ | ------------- | -------------- |
    | `env:staging:east` | `env`         | `staging:east` |
    | `env_staging:east` | `env_staging` | `east`         |

5. Tags shouldn't originate from unbounded sources, such as epoch timestamps, user IDs, or request IDs. Doing so may infinitely [increase the number of metrics][2] for your organization and impact your billing.

## Assigning tags

### Tagging methods

Tags may be assigned using any (or all) of the following methods. Refer to the dedicated [Assigning Tags documentation][3] to learn more:

| Method                   | Assign tags                                                     |
| ------------------------ | --------------------------------------------------------------- |
| [Configuration Files][4] | Manually in your main Agent or integration configuration files. |
| [UI][5]                  | In the Datadog App                                              |
| [API][6]                 | When using Datadog's API                                        |
| [DogStatsD][7]           | When submitting metrics via DogStatsD                           |

#### Unified service tagging

As a best practice, Datadog recommends using unified service tagging when assigning tags. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to configure your environment with unified tagging, refer to the dedicated [unified service tagging][8] documentation.

## Using tags

After you have [assigned tags][3] at the host and [integration][9] level, start using them to filter and group your metrics, traces, and logs. Tags are used in the following areas of your Datadog platform. Refer to the dedicated [Using Tags documentation][1] to learn more:

| Area                 | Use Tags to                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| [Events][10]         | Filter the event stream                                                                          |
| [Dashboards][11]     | Filter and group metrics on graphs                                                               |
| [Infrastructure][12] | Filter and group on the host map, infrastructure list, live containers, and live processes views |
| [Monitors][13]       | Manage monitors, create monitors, or manage downtime                                             |
| [Metrics][14]        | Filter and group with the metric explorer                                                        |
| [Integrations][15]   | Optionally limit metrics for AWS, Google Cloud, and Azure                                        |
| [APM][16]            | Filter Analytics or jump to other areas with the service map                                 |
| [Notebooks][17]      | Filter and group metrics on graphs                                                               |
| [Logs][18]           | Filter logs search, analytics, patterns, live tail, and pipelines                                |
| [SLOs][19]           | Search for SLOs, grouped metric-based SLOs, grouped monitor-based SLOs                           |
| [Developers][20]     | Pull information or setup different areas in the UI with the API                                 |
| [Billing][21]        | Report on Datadog usage by choosing up to three tags, for example: `env`, `team`, and `account_id` |

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/using_tags/
[2]: /developers/metrics/
[3]: /getting_started/tagging/assigning_tags/
[4]: /getting_started/tagging/assigning_tags/#configuration-files
[5]: /getting_started/tagging/assigning_tags/#ui
[6]: /getting_started/tagging/assigning_tags/#api
[7]: /getting_started/tagging/assigning_tags/#dogstatsd
[8]: /getting_started/tagging/unified_service_tagging
[9]: /integrations/
[10]: /getting_started/tagging/using_tags/#events
[11]: /getting_started/tagging/using_tags/#dashboards
[12]: /getting_started/tagging/using_tags/#infrastructure
[13]: /getting_started/tagging/using_tags/#monitors
[14]: /getting_started/tagging/using_tags/#metrics
[15]: /getting_started/tagging/using_tags/#integrations
[16]: /getting_started/tagging/using_tags/#apm
[17]: /getting_started/tagging/using_tags/#notebooks
[18]: /getting_started/tagging/using_tags/#logs
[19]: /getting_started/tagging/using_tags/?tab=manageslos#service-level-objectives
[20]: /getting_started/tagging/using_tags/#developers
[21]: /account_management/billing/usage_attribution/
