---
title: Frequently Asked APM Questions
kind: documentation
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

If you experience unexpected behavior while using the APM product, the steps on this page can help you quickly resolve the issue. If you continue to have trouble, reach out to [Datadog support][1]. 


## Trace metric related issues

{{% collapse-content title="There are more traces on the Trace Explorer page than on the Monitor's page" level="h4" %}}

This is an expected behavior <strong> if </strong> you do not have [custom retention filters][4]. 

The [Trace Explorer][12] page allows you to search all ingested or indexed spans using any tag on any span. As such you can easily query on any of your traces on the Trace Explorer page. 

 After spans have been ingested, they are retained by the [Datadog intelligent filter][2] by default. Datadog has other [retention filters][13] that are enabled by default to ensure that you keep visibility over all of your services and endpoints, as well as errors and high-latency traces.

In order to use these traces in your monitors, however, you need to set the [custom retention filters][4].

The custom retention filter allows you to decide which spans are indexed and [retained][16] by creating, modifying, and disabling additional filters based on tags. You can also set a percentage of spans matching each filter to be retained. These indexed traces can then be used in your monitors. 

| PRODUCT | SPAN SOURCE |
| ------- | ------------ |
| Monitors     | Spans from custom retention filters |
| Other products <br> <i> (Dashboard, Notebook etc.)</i> | Spans from custom retention filters + Datadog intelligent filter |

{{% /collapse-content %}} 



{{% collapse-content title="The trace metrics value is different from the custom span-based metrics value" level="h4" %}} 

</strong>[Trace metrics][6] </strong> are calculated based on 100% of the application’s traffic, regardless of any [trace ingestion sampling][8] configuration. The trace metrics namespace is formatted as: `trace.<SPAN_NAME>.<METRIC_SUFFIX>`

[Custom span-based metrics][7] are generated based on your ingested spans which is dependent on your [trace ingestion sampling][8]. If you are ingesting 50% of your traces, your custom span-based metrics will be based on the 50% ingested spans.

To have the value of the trace metric and the value of the custom span-based metric be the same, you would need to make sure you have a 100% ingestion rate configured for your application/service. 

<div class="alert alert-info"> 

Metric names must follow the [metric naming convention][15]. Metric names that start with `trace.*` are not permitted and will not be saved. 

</div>

{{% /collapse-content %}} 



<br>

## Service related issues
{{% collapse-content title="One of my services is showing up as multiple different services in Datadog" level="h4" %}}

An example of this issue is if your `service:test` is showing as all of these in the Datadog platform:
- `Service:test`
- `Service:test-mongodb`
- `Service:test-postgresdb` 

To have the service names merged into one, you can use one(1) of these two options:

1. You could use `DD_SERVICE_MAPPING` or `DD_TRACE_SERVICE_MAPPING` depending on the language used to rename the service. This feature is offered in Java, Go, Python, Node.js, PHP and .NET. You can [choose your application's language][9] for additional information on the configuration options available for tracing libraries.

2. You could use the <strong> [Inferred services][10] </strong>. Datadog can automatically discover the dependencies for an instrumented service, such as a database, a queue, or a third-party API, even if that dependency hasn’t been instrumented yet.

{{% /collapse-content %}} 



{{% collapse-content title="There is an unexpected increase in ingested/indexed spans on the Plan and Usage page" level="h4" %}}

Spikes in data ingestion and indexing can be a result of multiple things(share some reasons.. from reasonX to reasonY). To dive into what specifically might be causing this increase, use the [estimated usage metrics][11]:


| USAGE TYPE | METRIC | DESCRIPTION |
| ------- | ------------ |------------ |
| APM Indexed Spans     | `datadog.estimated_usage.apm.indexed_spans` | Total number of spans indexed by tag-based retention filters.|
| APM Ingested Spans     | `datadog.estimated_usage.apm.ingested_spans`| Total number of ingested spans. |

{{% /collapse-content %}} 



<br>

## Data volumes related issues
If you encounter issues related to the following, there is a possibility that you are exceeding [Datadog's volume guidelines][5]:
- Your trace metrics are not reporting as you would expect in the Datadog platform
- You are missing some of your resources that you expected to see in the Datadog platform
- You are seeing traces from your service but are not able to find this service on the [Service Catalog page][14]

{{% collapse-content title="Data Volume Guidelines" level="h4" %}}


For a given 40 minute interval, Datadog accepts the following combinations:
- 1000 unique `environments` and `service` combinations
- 30 unique `second primary tag values` per environment
- 100 unique `operation names` per environment and service
- 1000 unique `resources` per environment, service, and operation name
- 30 unique `versions` per environment and service

If you need to accommodate larger volumes, contact [Datadog support][1] with your use case.

{{% /collapse-content %}} 

## Further Reading

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