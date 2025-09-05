---
title: Data Pipeline Lineage
further_reading:
- link: "/data_jobs"
  tag: "Documentation"
  text: "Data Jobs Monitoring"
- link: https://www.datadoghq.com/blog/data-observability-monitoring/
  tag: "Blog"
  text: "Observing the data lifecycle with Datadog"
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Data Streams Monitoring is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

{{< callout url="https://www.datadoghq.com/product-preview/monitoring-for-data-and-data-pipelines/" >}}
  Data Pipeline Lineage is available in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}} 

Datadog's Data Pipeline Lineage helps you monitor data flow throughout your pipelines end-to-end, including ingestion, processing, and storage. With expanded visibility into your streaming data pipelines, data jobs, and data warehouses in a unified view, you can detect issues with your data, identify related upstream failures, and troubleshoot faster.

You can visualize lineage of data between components (streaming data, data processing jobs, data warehouses) with upstream and downstream dependencies, monitor throughput, and detect issues such as consumer lag, schema changes, along with the downstream data impacted.

This feature requires both Data Streams Monitoring **and** [Data Jobs Monitoring][1].

## Supported technologies

| Type | Technology |
| - | ---------- |
| Streaming | <ul><li/>Java producer/consumer services <li/>Kafka <li/>RabbitMQ <li/>SQS <li/>SNS <li/>Kinesis</ul>|
| Processing | <ul><li/>Apache Spark jobs running on Kubernetes<li/>Apache Spark jobs running on EMR on EKS</ul>|
| Storage | <ul><li/>S3 <li/>Snowflake</ul>|

Don't see your tech stack here? [Submit a request][2].

## Setup

1. **Set up Data Streams Monitoring on your producer and consumer services**. Follow the instructions in the [Data Streams Monitoring setup documentation][3]. If you are using Java, ensure that you use the [Datadog APM client for Java v1.34.0+][4].

1. **Set up Data Jobs Monitoring on your Spark workloads**. See the instructions for [Spark on Kubernetes][5] or [Spark on EMR][6].

1. **Enable Data Streams Monitoring for your Spark jobs**. Add `-Ddd.data.streams.enabled=true` to your `spark-submit` command line.

   For example:
   ```bash
   spark-submit \
   --conf spark.driver.extraJavaOptions="-Ddd.data.jobs.enabled=true -Ddd.data.streams.enabled=true" \
   --conf spark.executor.extraJavaOptions="-Ddd.data.jobs.enabled=true -Ddd.data.streams.enabled=true" \
   application.jar
   ```

1. **For Snowflake services, install APM clients**. Install Datadog's [Java][7] or [Python][8] APM client for any services that interact with Snowflake. Set the `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` environment variable to `true`.

## View your pipelines in Datadog
{{< img src="data_streams/data_pipeline_lineage.png" alt="In Data Streams Monitoring, the Map view. A pipeline visualization shows data flow from left to right." style="width:100%;" >}}

After you set up Data Pipeline Lineage, go the [Data Streams Monitoring][9] page in Datadog and select **Map** to see your visualized pipelines.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_jobs
[2]: https://www.datadoghq.com/product-preview/monitoring-for-data-and-data-pipelines/
[3]: /data_streams
[4]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0
[5]: /data_jobs/kubernetes/
[6]: /data_jobs/emr/
[7]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[8]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
[9]: https://app.datadoghq.com/data-streams/map
