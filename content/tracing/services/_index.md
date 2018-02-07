---
title: Services list
kind: Documentation
---

## Overview

After having [instrumented your application](/tracing/languages), your reporting services are listed on [the APM services page](https://app.datadoghq.com/apm/services).  
Select a service to have more performance insights, [read our dedicated service documentation to learn more](tracing/services/service)

{{< img src="tracing/services/services_page.png" alt="Services page" responsive="true" popup="true">}}

## Filtering the service list

The services list is a bird eyed view of all [services](/tracing/services/service) reporting from your infrastructure. It can be filtered depending on:

* [Your environment](#environment).
* [Your service type](#services-types)
* A query

{{< img src="tracing/services/services_filtering.gif" alt="Services filtering" responsive="true" popup="true" style="width:75%;">}}

### Environment
#### Definition

An environment is a first class dimension that you can use to scope a whole Datadog APM application. Some display settings can be shared across environments, but all the measurable data (traces/metrics/statistics) can not be re-aggregated across multiple environments. Use cases can be:

* Stage environments such as production, staging, and pre-production
* Datacenters and availability zones in isolation

Environments are [tags](/agent/tagging), therefore they must follow the following rules:

* They must start with a letter.
* Other characters must be alphanumeric lower case Unicode characters, underscores, minuses, colons, periods or slashes.
* They must not be more than 100 characters long.

Environments in traces and configuration files are normalized:

* Unsupported characters are replaced by underscores.
* Upper case characters are converted to lower case.

#### Default environment

If you are not using this feature, your data is put in `env:none` which is the default behavior.

**Note**: if you are using environments, you still get a default `env:none` environment where all the non-tagged data goes.

##### Setup

There are several ways to specify an environment when reporting data:

1. Host tag:

    If you use a host tag that looks like `env:XXXX`, all traces reported from that agent are tagged accordingly.

2. Agent configuration:

    Override the default tag used by the trace agent in [the Agent configuration file](/agent/faq/where-is-the-configuration-file-for-the-agent). This tags all traces coming through the agent, overriding the host tag value.

    ```
    [trace.config]
    env = pre-prod
    ```

3. Per trace:

    When submitting a single trace, specify an environment by tagging one of its span with the metadata key `env`. It overrides the agent configuration and the host tags values (if any).

    ```
    # in code this looks like
    span.set_tag('env', 'prod')
    ```

### Services types

Every Service monitored by your application is associated with a "Type". This type is automatically determined by Datadog and is applied for you. The "Type" specified the name of the application/framework the Datadog Agent is Integrating with.

For example, if you are using the official Flask Integration, the "Type" is set to "Web". If you are monitoring a custom application, the "Type" appears as "Custom".

The type of the service can be one of:

*  Cache
*  Custom
*  DB
*  Web

We also have some aliases for Integrations such as Postgres, MySQL, and Cassandra which are map to Type: "DB" and Integrations Redis and Memcache which are map to Type: "Cache".

## Columns

{{< img src="tracing/services/services_columns.png" alt="Services columns" responsive="true" popup="true" style="width:40%;">}}

Choose what do display in your services list:

* **Request**: Total amount of requests traced (per seconds)
* **Avg/p75/p90/p95/p99/Max Latency**: Avg/p75/p90/p95/p99/Max latency of your traced requests
* **Error Rate**: Amount of requests traced (per seconds) that ended with an error
* **Apdex**: Apdex score of the service, [learn more on Apdex](/tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm)
* **Monitor status**: [Status of monitors](/tracing/services/service/#service-monitor) attached to a service.