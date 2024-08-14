---
title: Data Pipeline Lineage
further_reading:
- link: "/data_jobs"
  tag: "Documentation"
  text: "Data Jobs Monitoring"
---

{{< callout url="#" >}}
  Data Pipeline Lineage is available in <strong>private beta</strong>. If you're interested in this feature, complete the form to request access.
{{< /callout >}} 

Data Pipeline Lineage combines Data Streams Monitoring with Data Jobs Monitoring to provide end-to-end visibility into your entire pipeline, including ingestion, processing, and storage. 

## Setup

1. Set up [Data Streams Monitoring][2] on your producer and consumer services. If you are using Java, ensure that you use the [Datadog APM client for Java v1.34.0+][3].

1. Set up [Data Jobs Monitoring][1] on your [Spark workloads][4]. When you run your Spark job, use the [standard Data Jobs Monitoring][5] configurations with the following changes:
   - Remove `-Ddd.integrations.enabled=false`
   - Add `-Ddd.data.streams.enabled=true`.

      <div class="alert alert-warning">This enables Data Streams Monitoring for <strong>all</strong> Spark jobs.</div>

1. Install Datadog's [APM client for Java][6] or [APM client for Python][7] for any services that interact with Snowflake. Set the `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` environment variable to `true`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_jobs
[2]: /data_streams
[3]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0
[4]: /data_jobs/kubernetes/
[5]: /data_jobs/kubernetes/?tab=datadogoperator#inject-spark-instrumentation
[6]: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[7]: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/python/