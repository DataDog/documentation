---
title: Getting started with tags
kind: documentation
description: "Learn how to assign and use Tags with Datadog."
aliases:
    - /getting_started/getting_started_with_tags
    - /guides/tagging/
    - /developers/tagging/
    - /getting_started/tagging
    - /tagging/faq/
further_reading:
- link: "tagging/assigning_tags"
  tag: "Documentation"
  text: "Learn how to assign tags"
- link: "tagging/using_tags"
  tag: "Documentation"
  text: "Learn how to use tags in Datadog"
---

## Introduction

Tags are a way of adding dimensions to metrics, so they can be filtered, aggregated, and compared in Datadog visualizations. [Using tags][1] enables you to observe aggregate performance across a number of hosts and (optionally) narrow the set further based on specific elements. In summary, tagging is a method to observe aggregate data points.

Tagging binds different data types in Datadog, allowing for correlation and call to action between metrics, traces, and logs. This is accomplished with **reserved** tag keys. Here are some examples:

| Tag Key     | Allows for                                                            |
| ----------- | --------------------------------------------------------------------- |
| `host`      | Correlation between metrics, traces, processes, and logs              |
| `device`    | Segregation of metrics, traces, processes, and logs by device or disk   |
| `source`    | Event filtering and automated pipeline creation for log management    |
| `service`   | Correlation between metrics, traces, and logs                         |

## Why It Matters

Typically, it's helpful to look at containers, VMs, and cloud infrastructure at the "service" level in aggregate. For example, it's more helpful to look at CPU usage across a collection of hosts that represents a service, rather than CPU usage for server A or server B separately.

Containers and cloud environments regularly churn through hosts, so it is critical to tag these to allow for aggregation of the metrics you're getting.

## Defining Tags

Below are Datadog's tagging restrictions, requirements, and suggestions:

1. Tags must **start with a letter** and after that may contain the characters listed below:

    * Alphanumerics
    * Underscores
    * Minuses
    * Colons
    * Periods
    * Slashes

    Other special characters are converted to underscores.

    **Note**: A tag cannot end with a colon, for example `tag:`

2. Tags can be **up to 200 characters** long and support Unicode.
3. Tags are converted to lowercase. Therefore, `CamelCase` tags are not recommended. Authentication (crawler) based integrations convert camel case tags to underscores, for example `TestTag` --> `test_tag`.
4. A tag can be in the format `value` or `<KEY>:<VALUE>`. For optimal functionality, **we recommend constructing tags in the `<KEY>:<VALUE>` format.** Commonly used tag keys are `env`, `instance`, and `name`. The key always precedes the first colon of the global tag definition, for example:

    | Tag                | Key           | Value          |
    |--------------------|---------------|----------------|
    | `env:staging:east` | `env`         | `staging:east` |
    | `env_staging:east` | `env_staging` | `east`         |

5.  **Reserved tag keys** `host`, `device`, `source`, and `service` cannot be used in the standard way.

6. Tags shouldn't originate from unbounded sources, such as EPOCH timestamps, user IDs, or request IDs. Doing so may infinitely [increase the number of metrics][2] for your organization and impact your billing.

## Assigning Tags
Tags may be assigned using any (or all) of the following methods. Refer to the dedicated [Assigning Tags documentation][3] to learn more:

| Method                        | Assign tags                                                                                  |
|-------------------------------|----------------------------------------------------------------------------------------------|
| [Configuration Files][4]     | Manually in your main Agent configuration files, or in your integrations configuration file. |
| [Environment Variables][5]   | Using environment variables for the containerized Agent                                      |
| [UI][6]                      | In your Datadog platform                                                                     |
| [API][7]                     | Using Datadog's API                                                                          |
| [DogStatsD][8]               | When submitting metrics via DogStatsD                                                        |
| [Integration Inheritance][9] | Automatically with supported integrations after setup                                        |

## Using Tags

After you have [assigned tags][3] at the host and [integration][10] level, start using them to filter and group your metrics, traces, and logs. Tags are used in the following areas of your Datadog platform. Refer to the dedicated [Using Tags documentation][1] to learn more:

| Area                 | Use Tags to                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------|
| [Events][11]         | Filter the event stream                                                                          |
| [Dashboards][12]     | Filter and group metrics on graphs                                                               |
| [Infrastructure][13] | Filter and group on the host map, infrastructure list, live containers, and live processes views |
| [Monitors][14]       | Manage monitors, create monitors, or manage downtime                                             |
| [Metrics][15]        | Filter and group with the metric explorer                                                        |
| [Integrations][16]   | Optionally limit metrics for AWS, Google Cloud, and Azure                                        |
| [APM][17]            | Filter trace search and analytics or jump to other areas with the service map                    |
| [Notebooks][18]      | Filter and group metrics on graphs                                                               |
| [Logs][19]           | Filter logs search, analytics, patterns, live tail, and pipelines                                |
| [Developers][20]     | Pull information or setup different areas in the UI with the API                                 |

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tagging/using_tags
[2]: /developers/metrics/custom_metrics/#how-is-a-custom-metric-defined
[3]: /tagging/assigning_tags
[4]: /tagging/assigning_tags/#configuration-files
[5]: /tagging/assigning_tags/#environment-variables
[6]: /tagging/assigning_tags/#ui
[7]: /tagging/assigning_tags/#api
[8]: /tagging/assigning_tags/#dogstatsd
[9]: /tagging/assigning_tags/#integration-inheritance
[10]: /integrations
[11]: /tagging/using_tags/#events
[12]: /tagging/using_tags/#dashboards
[13]: /tagging/using_tags/#infrastructure
[14]: /tagging/using_tags/#monitors
[15]: /tagging/using_tags/#metrics
[16]: /tagging/using_tags/#integrations
[17]: /tagging/using_tags/#apm
[18]: /tagging/using_tags/#notebooks
[19]: /tagging/using_tags/#logs
[20]: /tagging/using_tags/#developers
