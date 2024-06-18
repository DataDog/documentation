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
If you experience unexpected behavior with APM, the troubleshooting steps below can help you resolve the issue quickly. If you continue to have trouble, reach out to [Datadog support][1]. 




## Why are the number of traces different in the traces page and the monitors?

The traces page includes traces retained by our [Datadog intelligent filter][2], [1% flat sampling][3] and [custom retention filters][4]. While monitors include only traces that are retained by the custom retention filters.

To resolve this, create a [custom retention filter][4] to retain all the spans you are using in your query. 



## Why is there a difference in value between [trace metrics][6] and [custom span-based metrics][7]?
The trace metrics are calculated based on 100% of the application’s traffic, regardless of any [trace ingestion sampling][8] configuration. 

However, the custom metrics are generated based on the ingested spans. Hence, you need to make sure you have 100% ingestion configured for the application you are creating a custom metric for to have the value match the trace metrics.

To resolve this, configure the trace sampling rule to 100% for the needed applications/services in the custom metric to match the trace metric value.

## Common issues associated with data volume guidelines
If you experiencing any of the following issues, you might be exceeding our [Data Volume Guidelines][5]. 
- missing some resources
- trace metrics skewed/not reporting correctly
- missing services in the service page even though they are reporting traces


For a given 40 minute interval, Datadog accepts the following combinations. 
- 1000 unique environments and service combinations
- 30 unique second primary tag values per environment
- 100 unique operation names per environment and service
- 1000 unique resources per environment, service, and operation name
- 30 unique versions per environment and service

To accommodate larger volumes contact [Datadog support][1] to discuss your use case.

## One service is showing up as multiple different services in Datadog.

An example of this issue is if your `service:test` is showing as all of these in the Datadog platform:
- `Service:test`
- `Service:test-mongodb`
- `Service:test-postgresdb` 


If you would like to have the services merged into one, we have two options:

1. You could use `DD_SERVICE_MAPPING` or `DD_TRACE_SERVICE_MAPPING` depending on the language used. <br> <br>
This feature is offered in Java, Go, Python, Node.js, PHP and .NET. [Choose your language for additional information on the configuration options for tracing libraries][9]

<br>


2. You could use the [Inferred services][10]




## You see an increase in ingested/indexed spans in your Plan and Usage page and are not sure why
To dive into what might be causing this issue, you can utilize the [estimated usage metrics][11]:


| USAGE TYPE | METRIC | DESCRIPTION |
| ------- | ------------ |------------ |
| APM Indexed Spans     | `datadog.estimated_usage.apm.indexed_spans` | Total number of spans indexed by tag-based retention filters.|
| APM Ingested Spans     | `datadog.estimated_usage.apm.ingested_spans`| Total number of ingested spans. |


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
[11]: https://docs.datadoghq.com/account_management/billing/usage_metrics/#types-of-usage