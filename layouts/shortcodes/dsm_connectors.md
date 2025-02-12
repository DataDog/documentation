#### Confluent Cloud connectors

Data Streams Monitoring can automatically discover your [Confluent Cloud][101] connectors and visualize them within the context of your end-to-end streaming data pipeline.

##### Setup

1. Install and configure the [Datadog-Confluent Cloud integration][102].
1. In Datadog, open the [Confluent Cloud integration tile][102].

   <figure class="text-center">
   <img src="{{ .Site.Params.img_url}}images/data_streams/confluent_cloud_connectors.png" alt="The log processors available" width="80%">
   </figure>

   Under **Actions**, a list of resources populates with detected clusters and connectors. Datadog attempts to discover new connectors every time you view this integration tile.
1. Select the resources you want to add.
1. Click **Add Resources**.

#### Self-hosted Kafka connectors

<div class="alert alert-info">This feature is in Preview.</div>

Data Streams Monitoring can collect information from your self-hosted Kafka connectors. In Datadog, these connectors are shown as services connected to Kafka topics. Datadog collects throughput to and from all Kafka topics. Datadog does not collect connector status or sinks and sources from self-hosted Kafka connectors.

##### Setup

Use Datadog's Java tracer, [`dd-trace-java`][103], to collect information from your Kafka Connect workers.

1. [Add the `dd-java-agent.jar` file][104] to your Kafka Connect workers. Ensure that you are using `dd-trace-java` [v1.44+][105].
1. Modify your Java options to include the Datadog Java tracer on your worker nodes. For example, on Strimzi, modify `STRIMZI_JAVA_OPTS` to add `-javaagent:/path/to/dd-java-agent.jar`.

[101]: https://www.confluent.io/confluent-cloud/
[102]: https://app.datadoghq.com/integrations/confluent-cloud
[103]: https://github.com/DataDog/dd-trace-java
[104]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget
[105]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.44.0
