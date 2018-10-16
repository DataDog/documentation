---
title: Getting started with tags
kind: documentation
aliases:
    - /getting_started/getting_started_with_tags
    - /guides/tagging/
    - /developers/tagging/
    - /getting_started/tagging
further_reading:
- link: "tagging/assigning_tags"
  tag: "Documentation"
  text: Learn how to assign tags
- link: "tagging/using_tags"
  tag: "Documentation"
  text: Learn how to use tags in Datadog
---

## Introduction

Tags are a way of adding dimensions to metrics, so they can be filtered, aggregated, and compared in Datadog visualizations. [Using tags][1] enables you to observe aggregate performance across a number of hosts and (optionally) narrow the set further based on specific elements. In summary, tagging is a method to observe aggregate data points.

Tagging binds different data types in Datadog, allowing for correlation and call to action between metrics, traces, and logs. This is accomplished with **reserved** tag keys. Here are some examples:

| Tag Key   | Allows for                                                          |
|-----------|---------------------------------------------------------------------|
| `host`    | Correlation between metrics, traces, processes, and logs            |
| `device`  | Segregation of metrics, traces, process, and logs by device or disk |
| `source`  | Event filtering and automated pipeline creation for log management  |
| `service` | Correlation between traces and logs                                 |

## Why It Matters

Typically, it's helpful to look at containers, VMs, and cloud infrastructure at the "service" level in aggregate. For example, it's more helpful to look at CPU usage across a collection of hosts that represents a service, rather than CPU usage for server A or server B separately.

Containers and cloud environments regularly churn through hosts, so it is critical to tag these to allow for aggregation of the metrics you're getting.

## Defining Tags

Below are Datadog's tagging restrictions, requirements, and suggestions:

1. Tags must **start with a letter** and after that may contain the characters listed below. Other special characters are converted to underscores. **Note**: A tag cannot end with a colon, for example `tag:`

    * Alphanumerics
    * Underscores
    * Minuses
    * Colons
    * Periods
    * Slashes

2. Tags can be **up to 200 characters** long and support Unicode.
3. Tags are converted to lowercase.
4. A tag can be in the format `value` or `<KEY>:<VALUE>`. For optimal functionality, **we recommend constructing tags in the `<KEY>:<VALUE>` format.** Commonly used tag keys are `env`, `instance`, and `name`. The key always precedes the first colon of the global tag definition, for example:
    
    | Tag                | Key           | Value          |
    |--------------------|---------------|----------------|
    | `env:staging:east` | `env`         | `staging:east` |
    | `env_staging:east` | `env_staging` | `east`         |

5.  **Reserved tag keys** `host`, `device`, `source`, and `service` cannot be used in the standard way.

6. Tags shouldn't originate from unbounded sources, such as EPOCH timestamps, user IDs, or request IDs. Doing so may infinitely [increase the number of metrics][29] for your organization and impact your billing.

## Assigning Tags

Tags may be [assigned][21] using any (or all) of the following methods:

| Method                        | Assign tags                                                                                  |
|-------------------------------|----------------------------------------------------------------------------------------------|
| [Configuration Files][22]     | Manually in your main agent configuration files, or in your integrations configuration file. |
| [Environment Variables][23]   | Using environment variables for the containerized Agent                                      |
| [UI][24]                      | In your Datadog platform                                                                     |
| [API][25]                     | Using Datadog's API                                                                          |
| [DogStatsD][26]               | When submitting metrics via DogStatsD                                                        |
| [Integration Inheritance][27] | Automatically with supported integrations after setup                                        |

## Using Tags

After you have [assigned tags][21] at the host and [integration][11] level, start using them to filter and group your metrics, traces, and logs. Tags are used in the following areas of your Datadog platform; refer to the dedicated [Using Tags documentation][1] to learn more:

| Area                 | Use Tags to                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------|
| [Events][12]         | Filter the event stream                                                                          |
| [Dashboards][13]     | Filter and group metrics on graphs                                                               |
| [Infrastructure][14] | Filter and group on the host map, infrastructure list, live containers, and live processes views |
| [Monitors][15]       | Manage monitors, create monitors, or manage downtime                                             |
| [Metrics][16]        | Filter and group with the metric explorer                                                        |
| [Integrations][17]   | Optionally limit metrics for AWS, Google Cloud, and Azure                                        |
| [APM][18]            | Filter trace search and analytics or jump to other areas with the service map                    |
| [Notebooks][19]      | Filter and group metrics on graphs                                                               |
| [Logs][20]           | Filter logs search, analytics, patterns, live tail, and pipelines                                |
| [Developers][28]     | Pull information or setup different areas in the UI with the API                                 |

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tagging/using_tags
[2]: /developers/dogstatsd
[3]: /integrations/amazon_web_services
[4]: /integrations/azure
[5]: /integrations/google_app_engine
[6]: /api
[7]: /integrations/chef
[8]: /integrations/puppet
[9]: /graphing/infrastructure
[10]: /developers/metrics/custom_metrics
[11]: /integrations
[12]: /tagging/using_tags/#events
[13]: /tagging/using_tags/#dashboards
[14]: /tagging/using_tags/#infrastructure
[15]: /tagging/using_tags/#monitors
[16]: /tagging/using_tags/#metrics
[17]: /tagging/using_tags/#integrations
[18]: /tagging/using_tags/#apm
[19]: /tagging/using_tags/#notebooks
[20]: /tagging/using_tags/#logs
[21]: /tagging/assigning_tags/
[22]: /tagging/assigning_tags/#configuration-files
[23]: /tagging/assigning_tags/#environment-variables
[24]: /tagging/assigning_tags/#ui
[25]: /tagging/assigning_tags/#api
[26]: /tagging/assigning_tags/#dogstatsd
[27]: /tagging/assigning_tags/#integration-inheritance
[28]: /tagging/using_tags/#developers
[29]: /developers/metrics/custom_metrics/#how-is-a-custom-metric-defined
