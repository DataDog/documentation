---
title: Setup Data Streams Monitoring for Java
further_reading:
    - link: '/integrations/kafka/'
      tag: 'Documentation'
      text: 'Kafka Integration'
    - link: '/tracing/software_catalog/'
      tag: 'Documentation'
      text: 'Software Catalog'
    - link: 'https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/'
      tag: 'Blog'
      text: 'Autodiscover Confluent Cloud connectors and easily monitor performance in Data Streams Monitoring'
aliases:
  - /data_streams/java
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][10]

### Supported libraries

| Technology     | Library                                                                                                                       | Minimal tracer version                                                          | Recommended tracer version                                                          |
|----------------|-------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| Kafka          | [kafka-clients](https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients) (Lag generation is not supported for v3.7) | {{< dsm-tracer-version lang="java" lib="kafka-clients" type="minimal" >}}       | {{< dsm-tracer-version lang="java" lib="kafka-clients" type="recommended" >}}       |
| RabbitMQ       | [amqp-client](https://mvnrepository.com/artifact/com.rabbitmq/amqp-client)                                                    | {{< dsm-tracer-version lang="java" lib="amqp-client" type="minimal" >}}         | {{< dsm-tracer-version lang="java" lib="amqp-client" type="recommended" >}}         |
| Amazon SQS     | [aws-java-sdk-sqs (v1)](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-sqs)                                    | {{< dsm-tracer-version lang="java" lib="aws-java-sdk-sqs-v1" type="minimal" >}} | {{< dsm-tracer-version lang="java" lib="aws-java-sdk-sqs-v1" type="recommended" >}} |
| Amazon SQS     | [sqs (v2)](https://mvnrepository.com/artifact/software.amazon.awssdk/sqs)                                                     | {{< dsm-tracer-version lang="java" lib="sqs-v2" type="minimal" >}}              | {{< dsm-tracer-version lang="java" lib="sqs-v2" type="recommended" >}}              |
| Amazon Kinesis | [Kinesis (v1)](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-kinesis)                                         | {{< dsm-tracer-version lang="java" lib="kinesis-v1" type="minimal" >}}          | {{< dsm-tracer-version lang="java" lib="kinesis-v1" type="recommended" >}}          |
| Amazon Kinesis | [Kinesis (v2)](https://mvnrepository.com/artifact/software.amazon.awssdk/kinesis)                                             | {{< dsm-tracer-version lang="java" lib="kinesis-v2" type="minimal" >}}          | {{< dsm-tracer-version lang="java" lib="kinesis-v2" type="recommended" >}}          |
| Amazon SNS     | [SNS (v1)](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-sns)                                                 | {{< dsm-tracer-version lang="java" lib="sns-v1" type="minimal" >}}              | {{< dsm-tracer-version lang="java" lib="sns-v1" type="recommended" >}}              |
| Amazon SNS     | [SNS (v2)](https://mvnrepository.com/artifact/software.amazon.awssdk/sns)                                                     | {{< dsm-tracer-version lang="java" lib="sns-v2" type="minimal" >}}              | {{< dsm-tracer-version lang="java" lib="sns-v2" type="recommended" >}}              |
| Google PubSub  | [Google Cloud Pub/Sub](https://mvnrepository.com/artifact/com.google.cloud/google-cloud-pubsub)                               | {{< dsm-tracer-version lang="java" lib="google-pubsub" type="minimal" >}}       | {{< dsm-tracer-version lang="java" lib="google-pubsub" type="recommended" >}}       |
| IBM MQ         | [IBM MQ classes for Java and JMS](https://mvnrepository.com/artifact/com.ibm.mq/com.ibm.mq.jakarta.client)                    | {{< dsm-tracer-version lang="java" lib="ibmmqjmsclient" type="minimal" >}}      | {{< dsm-tracer-version lang="java" lib="ibmmqjmsclient" type="recommended" >}}      |

### Installation

To enable Data Streams Monitoring, set the following environment variables to `true` on services that are sending or consuming messages:

- `DD_DATA_STREAMS_ENABLED`
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED`

{{< tabs >}}
{{% tab "Environment variables" %}}

```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
  - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

{{% /tab %}}
{{% tab "Command line" %}}

Run the following when you start your Java application:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.data.streams.enabled=true -Ddd.trace.remove.integration-service-names.enabled=true -jar path/to/your/app.jar
```

{{% /tab %}}
{{< /tabs >}}

### One-Click Installation
To set up Data Streams Monitoring from the Datadog UI without needing to restart your service, use [Configuration at Runtime][4]. Navigate to the APM Service Page and `Enable DSM`.

{{< img src="data_streams/enable_dsm_service_catalog.png" alt="Enable the Data Streams Monitoring from the Dependencies section of the APM Service Page" >}}

##### Setup

Use Datadog's Java tracer, [`dd-trace-java`][6], to collect information from your Kafka Connect workers.

1. [Add the `dd-java-agent.jar` file][7] to your Kafka Connect workers. Ensure that you are using `dd-trace-java` [v1.44+][8].
1. Modify your Java options to include the Datadog Java tracer on your worker nodes. For example, on Strimzi, modify `STRIMZI_JAVA_OPTS` to add `-javaagent:/path/to/dd-java-agent.jar`.

{{% data_streams/monitoring-sqs-pipelines %}}

{{% data_streams/monitoring-rabbitmq-pipelines %}}

### Monitoring SNS-to-SQS pipelines
To monitor a data pipeline where Amazon SNS talks directly to Amazon SQS, you must perform the following additional configuration steps:

{{< tabs >}}
{{% tab "SQS v1" %}}
- Set the environment variable `DD_TRACE_SQS_BODY_PROPAGATION_ENABLED` to `true`.

   For example:
   ```yaml
   environment:
     - DD_DATA_STREAMS_ENABLED: "true"
     - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
     - DD_TRACE_SQS_BODY_PROPAGATION_ENABLED: "true"
   ```
- Ensure that you are using [Java tracer v1.44.0+][11].

[11]: https://github.com/DataDog/dd-trace-java/releases
{{% /tab %}}
{{% tab "SQS v2" %}}
Enable [Amazon SNS raw message delivery][1].

[1]: https://docs.aws.amazon.com/sns/latest/dg/sns-large-payload-raw-message-delivery.html
{{% /tab %}}
{{< /tabs >}}

{{% data_streams/monitoring-kinesis-pipelines %}}

### Manual instrumentation
Data Streams Monitoring propagates context through message headers. If you are using a message queue technology that is not supported by DSM, a technology without headers (such as Kinesis), or Lambdas, use [manual instrumentation to set up DSM][5].

### Monitoring connectors

#### Confluent Cloud connectors
{{% data_streams/dsm-confluent-connectors %}}

#### Self-hosted Kafka connectors

_Requirements_: [`dd-trace-java` v1.44.0+][8]

<div class="alert alert-info">This feature is in Preview.</div>

Data Streams Monitoring can collect information from your self-hosted Kafka connectors. In Datadog, these connectors are shown as services connected to Kafka topics. Datadog collects throughput to and from all Kafka topics. Datadog does not collect connector status or sinks and sources from self-hosted Kafka connectors.

##### Setup

1. Ensure that the Datadog Agent is running on your Kafka Connect workers.
2. Ensure that [`dd-trace-java`][6] is installed on your Kafka Connect workers.
3. Modify your Java options to include `dd-trace-java` on your Kafka Connect worker nodes. For example, on Strimzi, modify `STRIMZI_JAVA_OPTS` to add `-javaagent:/path/to/dd-java-agent.jar`.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[10]: /agent
[2]: /tracing/trace_collection/dd_libraries/java/
[4]: /remote_configuration
[5]: /data_streams/manual_instrumentation/?tab=java
[6]: https://github.com/DataDog/dd-trace-java
[7]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget
[8]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.44.0
