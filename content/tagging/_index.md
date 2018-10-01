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

Tags are a way of adding dimensions to metrics, so they can be sliced, diced, aggregated, and compared on the front end. [Using tags][1] enables you to observe aggregate performance across a number of hosts and (optionally) narrow the set further based on specific elements. In summary, tagging is a method to scope aggregated data.

## Why It Matters

Typically, it's helpful to look at containers, VMs and cloud infrastructure at the "service" level in aggregate. For example, it's more helpful to look at CPU across a collection of hosts that represents a service, rather than CPU for server A or server B separately.

Containers and cloud environments regularly churn through hosts, so it is critical to tag these to allow for aggregation of the metrics you're getting.

## How To Use

Below are Datadog's tagging restrictions, requirements, and suggestions:

1. Tags must **start with a letter** and after that may contain the characters listed below. Other special characters are converted to underscores. **Note**: A tag cannot end with a colon, for example `tag:`

    * Alphanumerics
    * Underscores
    * Minuses
    * Colons
    * Periods
    * Slashes

2. Tags can be **up to 200 characters** long and support unicode.
3. Tags are converted to lowercase.
4. A tag can be in the format `value` or `key:value`. For optimal functionality, **we recommend constructing tags in the `key:value` format.** Commonly used tag keys are `env`, `instance`, `name`, and `service`. The key is always what precedes the first colon of the global tag definition, for example:
    
    | Tag                      | Key                | Value            |
    |--------------------------|--------------------|------------------|
    | `service:database:mysql` | `service`          | `database:mysql` |
    | `service_database:mysql` | `service_database` | `mysql`          |

5.  **Reserved tag keys** `device`, `host`, and `source` cannot be used in the standard way.

6. Tags shouldn't originate from unbounded sources, such as EPOCH timestamps or user IDs. These tags may impact platform performance and billing.

## Assigning Tags

Tags may be [assigned][21] using any (or all) of the following methods:

* [Configuration Files][22]
* [Environment Variables][23]
* [UI][24]
* [API][25]
* [DogStatsD][26]
* [Integration Inheritance][27]

## Using Tags

After you have [assigned tags][21] at the host and [integration][11] level, you can start using them to filter and group in interesting ways. There are several places you can use tags. Explore the various areas:

* [Events][12]
* [Dashboards][13]
* [Infrastructure][14]
* [Monitors][15]
* [Metrics][16]
* [Integrations][17]
* [APM][18]
* [Notebooks][19]
* [Logs][20]
* [Developers][28]

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
