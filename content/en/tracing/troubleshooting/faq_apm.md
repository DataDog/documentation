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

---

## Overview

If you experience unexpected behavior while using Datadog APM, refer to the information on this page to help resolve the issue. If you continue to have trouble, reach out to [Datadog support][1].

- **Trace retention**
  - [Why are there more spans in the Trace Explorer than on the Monitors page?](#why-are-there-more-spans-in-the-trace-explorer-than-on-the-monitors-page)
- **Trace metrics**
  - [Why do trace metrics and custom span-based metrics have different values?](#why-do-trace-metrics-and-custom-span-based-metrics-have-different-values)
- **Services**
  - [Why is one service showing up as multiple services in Datadog?](#why-is-one-service-showing-up-as-multiple-services-in-datadog)
  - [Why is there an unexpected increase in ingested/indexed spans on the Plan and Usage page?](#why-is-there-an-unexpected-increase-in-ingestedindexed-spans-on-the-plan-and-usage-page)
- **Data volumes**
  - [Why are trace metrics not reporting as expected?](#data-volume-issues)
  - [Why are resources missing?](#data-volume-issues)
  - [Why are traces visible for a service but the service isn't shown in the Service Catalog?](#data-volume-issues)

## Trace retention issues

### Why are there more spans in the Trace Explorer than on the Monitors page?

If you haven't set up [custom retention filters][4], this is expected behavior. Here's why:

The [Trace Explorer][12] page allows you to search all ingested or indexed spans using any tag. Here, you can query any of your traces.

By default, after spans have been ingested, they are retained by the [Datadog intelligent filter][2]. Datadog also has other [retention filters][13] that are enabled by default to give you visibility over your services, endpoints, errors, and high-latency traces.

However, to use these traces in your monitors, you must set [custom retention filters][4].

Custom retention filters allow you to decide which spans are indexed and [retained][16] by creating, modifying, and disabling additional filters based on tags. You can also set a percentage of spans matching each filter to be retained. These indexed traces can then be used in your monitors.

| PRODUCT                                                | SPAN SOURCE                                                      |
|--------------------------------------------------------|------------------------------------------------------------------|
| Monitors                                               | Spans from custom retention filters                              |
| Other products <br> <i> (Dashboard, Notebook etc.)</i> | Spans from custom retention filters + Datadog intelligent filter |

## Trace metric issues

### Why do trace metrics and custom span-based metrics have different values?

Trace metrics and custom span-based metrics can have different values because they are calculated based on different data sets:

- [Trace metrics][6] are calculated based on 100% of the application's traffic, regardless of your [trace ingestion sampling][8] configuration. The trace metrics namespace follows this format: `trace.<SPAN_NAME>.<METRIC_SUFFIX>`.
- [Custom span-based metrics][7] are generated based on your ingested spans, which depend on your [trace ingestion sampling][8]. For example, if you are ingesting 50% of your traces, your custom span-based metrics are based on the 50% ingested spans.

To ensure that your trace metrics and custom span-based metrics have the same value, configure a 100% ingestion rate for your application or service.

<div class="alert alert-info">Metric names must follow the <a href="/metrics/#naming-metrics">metric naming convention</a>. Metric names that start with <code>trace.*</code> are not permitted and are not saved.</div>

## Service issues

### Why is one service showing up as multiple services in Datadog?

This can happen when the service name is not consistent across all spans.

For example, you might have a single service like `service:test` showing multiple services in the Datadog:
- `service:test`
- `service:test-mongodb`
- `service:test-postgresdb`

You can merge the service names using `DD_SERVICE_MAPPING` or `DD_TRACE_SERVICE_MAPPING` (depending on the language). For more information, see [Configure the Datadog Tracing Library][9].

### Why is there an unexpected increase in ingested/indexed spans on the Plan and Usage page?

Spikes in data ingestion and indexing can be caused by various factors. To investigate the cause of an increase, use the [APM Traces Estimated Usage metrics][11]:

| USAGE TYPE | METRIC | DESCRIPTION |
| ------- | ------------ |------------ |
| APM Indexed Spans     | `datadog.estimated_usage.apm.indexed_spans` | Total number of spans indexed by tag-based retention filters.|
| APM Ingested Spans     | `datadog.estimated_usage.apm.ingested_spans`| Total number of ingested spans. |

The [APM Traces Usage dashboard][17] contains several widget groups displaying high-level KPIs and additional usage information.

## Data volume issues

If you encounter any of the following issues, you may be exceeding [Datadog's volume guidelines][5]:

- Your trace metrics are not reporting as you would expect in the Datadog platform.
- You are missing some of your resources that you expected to see in the Datadog platform.
- You are seeing traces from your service but are not able to find this service on the [Service Catalog page][14].

Datadog accepts the following combinations for a given 40-minute interval:

- 1000 unique `environments` and `service` combinations
- 30 unique `second primary tag values` per environment
- 100 unique `operation names` per environment and service
- 1000 unique `resources` per environment, service, and operation name
- 30 unique `versions` per environment and service

If you need to accommodate larger volumes, contact [Datadog support][1] with your use case.

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
