---
title: Frequently Asked APM Questions
further_reading:
    - link: 'https://docs.datadoghq.com/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter'
      tag: 'Documentation'
      text: 'Custom retention filter'
    - link: 'https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=java'
      tag: 'Documentation'
      text: "Trace Ingestion Sampling"
    - link: ' https://docs.datadoghq.com/tracing/troubleshooting/#data-volume-guidelines'
      tag: 'Documentation'
      text: "Data volume guidelines"
    - link: '/integrations/'
      tag: 'Integrations'
      text: "Datadog's full list of integrations"
    - link: 'https://docs.datadoghq.com/tracing/guide/inferred-service-opt-in/?tab=java'
      tag: 'Documentation'
      text: 'Inferred Service dependencies (beta)'
---

## Overview

If you experience unexpected behavior while using Datadog APM, refer to the information on this page to help resolve the issue. If you continue to have trouble, reach out to [Datadog support][1].

## Trace retention issues

{{% collapse-content title="There are more spans in the Trace Explorer than on the Monitors page" level="h4" %}}

If you haven't set up [custom retention filters][4], this is expected behavior. Here's why:

The [Trace Explorer][12] page allows you to search all ingested or indexed spans using any tag. Here, you can query any of your traces.

By default, after spans have been ingested, they are retained by the [Datadog intelligent filter][2]. Datadog also has other [retention filters][13] that are enabled by default to give you visibility over your services, endpoints, errors, and high-latency traces.

However, to use these traces in your monitors, you must set [custom retention filters][4].

Custom retention filters allow you to decide which spans are indexed and [retained][16] by creating, modifying, and disabling additional filters based on tags. You can also set a percentage of spans matching each filter to be retained. These indexed traces can then be used in your monitors.

| PRODUCT                                                | SPAN SOURCE                                                      |
|--------------------------------------------------------|------------------------------------------------------------------|
| Monitors                                               | Spans from custom retention filters                              |
| Other products <br> <i> (Dashboard, Notebook etc.)</i> | Spans from custom retention filters + Datadog intelligent filter |

{{% /collapse-content %}}

## Trace metric issues

{{% collapse-content title="Trace metrics and custom span-based metrics have different values" level="h4" %}}

Trace metrics and custom span-based metrics can have different values because they are calculated based on different data sets:

- [Trace metrics][6] are calculated based on 100% of the application's traffic, regardless of your [trace ingestion sampling][8] configuration. The trace metrics namespace follows this format: `trace.<SPAN_NAME>.<METRIC_SUFFIX>`.
- [Custom span-based metrics][7] are generated based on your ingested spans, which depend on your [trace ingestion sampling][8]. For example, if you are ingesting 50% of your traces, your custom span-based metrics are based on the 50% ingested spans.

To ensure that your trace metrics and custom span-based metrics have the same value, configure a 100% ingestion rate for your application or service.

<div class="alert alert-info">Metric names must follow the <a href="/metrics/#naming-metrics">metric naming convention</a>. Metric names that start with <code>trace.*</code> are not permitted and are not saved.</div>

{{% /collapse-content %}}

## Service issues

{{% collapse-content title="One service is showing up as multiple services in Datadog" level="h4" %}}

This can happen when the service name is not consistent across all spans.

For example, you might have a single service like `service:test` showing multiple services in the Datadog:
- `service:test`
- `service:test-mongodb`
- `service:test-postgresdb`

You can use [Inferred Service dependencies (beta)][10]. Inferred external APIs use the default naming scheme `net.peer.name`. For example: `api.stripe.com`, `api.twilio.com`, and `us6.api.mailchimp.com`. Inferred databases use the default naming `scheme db.instance`.

Or, you can merge the service names using an environment variable like `DD_SERVICE_MAPPING` or `DD_TRACE_SERVICE_MAPPING`, depending on the language. 

For more information, see [Configure the Datadog Tracing Library][9] or choose your language here:

{{< tabs >}}
{{% tab "Java" %}}

`dd.service.mapping`
: **Environment Variable**: `DD_SERVICE_MAPPING`<br>
**Default**: `null`<br>
**Example**: `mysql:my-mysql-service-name-db, postgresql:my-postgres-service-name-db`<br>
Dynamically rename services via configuration. Useful for making databases have distinct names across different services.

{{% /tab %}}

{{% tab "Python" %}}


`DD_SERVICE_MAPPING`
: Define service name mappings to allow renaming services in traces, for example: `postgres:postgresql,defaultdb:postgresql`. Available in version 0.47+.

{{% /tab %}}
{{% tab "Go" %}}

`DD_SERVICE_MAPPING`
: **Default**: `null` <br>
Dynamically rename services through configuration. Services can be separated by commas or spaces, for example: `mysql:mysql-service-name,postgres:postgres-service-name`, `mysql:mysql-service-name postgres:postgres-service-name`.

{{% /tab %}}
{{% tab "Node.js" %}}

`DD_SERVICE_MAPPING`
: **Configuration**: `serviceMapping`<br>
**Default**: N/A<br>
**Example**: `mysql:my-mysql-service-name-db,pg:my-pg-service-name-db`<br>
Provide service names for each plugin. Accepts comma separated `plugin:service-name` pairs, with or without spaces.

{{% /tab %}}
{{% tab ".NET" %}}

`DD_TRACE_SERVICE_MAPPING`
: Rename services using configuration. Accepts a comma-separated list of key-value pairs of service name keys to rename, and the name to use instead, in the format `[from-key]:[to-name]`. <br>
**Example**: `mysql:main-mysql-db, mongodb:offsite-mongodb-service`<br>
The `from-key` value is specific to the integration type, and should exclude the application name prefix. For example, to rename `my-application-sql-server` to `main-db`, use `sql-server:main-db`. Added in version 1.23.0

{{% /tab %}}
{{% tab "PHP" %}}

`DD_SERVICE_MAPPING`
: **INI**: `datadog.service_mapping`<br>
**Default**: `null`<br>
Change the default name of an APM integration. Rename one or more integrations at a time, for example: `DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db` (see [Integration names][1000]).

[1000]: https://docs.datadoghq.com/tracing/trace_collection/library_config/php#integration-names

{{% /tab %}}
{{% tab "Ruby" %}}

Ruby does not support `DD_SERVICE_MAPPING` or `DD_TRACE_SERVICE_MAPPING`. See [Additional Ruby configuration][2000] for code options to change the service name.

[2000]: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#advanced-configuration

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="There is an unexpected increase in ingested/indexed spans on the Plan and Usage page" level="h4" %}}

Spikes in data ingestion and indexing can be caused by various factors. To investigate the cause of an increase, use the [APM Traces Estimated Usage metrics][11]:

| USAGE TYPE | METRIC | DESCRIPTION |
| ------- | ------------ |------------ |
| APM Indexed Spans     | `datadog.estimated_usage.apm.indexed_spans` | Total number of spans indexed by tag-based retention filters.|
| APM Ingested Spans     | `datadog.estimated_usage.apm.ingested_spans`| Total number of ingested spans. |

The [APM Traces Usage dashboard][17] contains several widget groups displaying high-level KPIs and additional usage information.

{{% /collapse-content %}}

## Data volume issues

If you encounter any of the following issues, you may be exceeding [Datadog's volume guidelines][5]:

- Your trace metrics are not reporting as you would expect in the Datadog platform.
- You are missing some of your resources that you expected to see in the Datadog platform.
- You are seeing traces from your service but are not able to find this service on the [Service Catalog page][14].

{{% collapse-content title="Data volume guidelines" level="h4" %}}

Datadog accepts the following combinations for a given 40-minute interval:

- 1000 unique `environments` and `service` combinations
- 30 unique `second primary tag values` per environment
- 100 unique `operation names` per environment and service
- 1000 unique `resources` per environment, service, and operation name
- 30 unique `versions` per environment and service

If you need to accommodate larger volumes, contact [Datadog support][1] with your use case.

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/help/
[2]: https://docs.datadoghq.com/tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter
[3]: https://docs.datadoghq.com/tracing/trace_pipeline/trace_retention/#one-percent-flat-sampling
[4]: https://docs.datadoghq.com/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[5]: https://docs.datadoghq.com/tracing/troubleshooting/#data-volume-guidelines
[6]: https://docs.datadoghq.com/tracing/metrics/metrics_namespace/
[7]: https://docs.datadoghq.com/tracing/trace_pipeline/generate_metrics/
[8]: https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=java
[9]: https://docs.datadoghq.com/tracing/trace_collection/library_config/
[10]: https://docs.datadoghq.com/tracing/guide/inferred-service-opt-in/?tab=java
[11]: https://docs.datadoghq.com/tracing/trace_pipeline/metrics/#apm-traces-estimated-usage-dashboard
[12]: https://app.datadoghq.com/apm/traces
[13]: https://docs.datadoghq.com/tracing/trace_pipeline/trace_retention/#retention-filters
[14]: https://app.datadoghq.com/services
[15]: https://docs.datadoghq.com/metrics/#naming-metrics
[16]: https://docs.datadoghq.com/developers/guide/data-collection-resolution-retention/
[17]: https://app.datadoghq.com/dash/integration/apm_estimated_usage
