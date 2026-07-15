---
title: Kafka Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Kafka destination to send logs to Kafka topics.

### When to use this destination

Common scenarios when you might use this destination:
- To route logs to the following destinations:
    - [Clickhouse][1]: An open-source column-oriented database management system used for analyzing large volumes of logs.
    - [Snowflake][2]: A data warehouse used for storage and query.
        - Snowflake's API integration utilizes Kafka as a method to ingest logs into their platform.
    - [Databricks][3]: A data lakehouse for analytics and storage.
    - [Azure Event Hub][4]: An ingest and processing service in the Microsoft and Azure ecosystem.
- To route data to Kafka and use the Kafka Connect ecosystem.
- To process and normalize your data with Observability Pipelines before routing to Apache Spark with Kafka to analyze data and run machine learning workloads.

## Setup

Configure the Kafka destination when you [set up a pipeline][10]. You can set up a pipeline in the [UI][5], using the [API][11], or with [Terraform][12]. The steps in this section are configured in the UI.

<div class="alert alert-danger">For Secrets Management: Only enter the identifiers for the Kafka bootstrap servers and, if applicable, the SASL username and password and the TLS key pass. Do <b>not</b> enter the actual values.</div>

{{% observability_pipelines/secrets_env_var_note %}}

After you select the Kafka destination in the pipeline UI:

1. Enter the identifier for your Kafka bootstrap servers. If you leave it blank, the [default](#secret-defaults) is used.
1. Enter the name of the topic you want to send logs to.
1. In the {{< ui >}}Encoding{{< /ui >}} dropdown menu, select either {{< ui >}}JSON{{< /ui >}} or {{< ui >}}Raw message{{< /ui >}} as the output format.

{{< img src="observability_pipelines/destinations/kafka_settings.png" alt="The Kafka destination with sample values" style="width:30%;" >}}

#### Optional settings

##### Enable TLS

{{% observability_pipelines/tls_settings %}}

##### Enable SASL authentication

1. Toggle the switch to enable {{< ui >}}SASL Authentication{{< /ui >}}.
1. Enter the identifiers for your Kafka SASL username and password. If you leave them blank, the [defaults](#secret-defaults) are used.
1. Select the mechanism ({{< ui >}}PLAIN{{< /ui >}}, {{< ui >}}SCHRAM-SHA-256{{< /ui >}}, or {{< ui >}}SCHRAM-SHA-512{{< /ui >}}) in the dropdown menu.

##### Enable compression

1. Toggle switch to {{< ui >}}Enable Compression{{< /ui >}}.
1. In the {{< ui >}}Compression Algorithm{{< /ui >}} dropdown menu, select a compression algorithm ({{< ui >}}gzip{{< /ui >}}, {{< ui >}}zstd{{< /ui >}}, {{< ui >}}lz4{{< /ui >}}, or {{< ui >}}snappy{{< /ui >}}).
1. (Optional) Select a {{< ui >}}Compression Level{{< /ui >}} in the dropdown menu. If the level is not specified, the algorithm's default level is used.

##### Buffering

{{% observability_pipelines/destination_buffer %}}

##### Advanced options

Click {{< ui >}}Advanced{{< /ui >}} if you want to set any of the following fields:

1. {{< ui >}}Message Key Field{{< /ui >}}: Specify which log field contains the message key for partitioning, grouping, and ordering.
1. {{< ui >}}Headers Key{{< /ui >}}: Specify which log field contains your Kafka headers. If left blank, no headers are written.
1. {{< ui >}}Message Timeout (ms){{< /ui >}}: Local message timeout, in milliseconds. Default is `300,000 ms`.
1. {{< ui >}}Socket Timeout (ms){{< /ui >}}: Default timeout, in milliseconds, for network requests. Default is `60,000 ms`.
1. {{< ui >}}Rate Limit Events{{< /ui >}}: The maximum number of requests the Kafka client can send within the rate limit time window. Default is no rate limit.
1. {{< ui >}}Rate Limit Time Window (secs){{< /ui >}}: The time window used for the rate limit option.
    - This setting has no effect if the rate limit for events is not set.
    - Default is `1 second` if {{< ui >}}Rate Limit Events{{< /ui >}} is set, but {{< ui >}}Rate Limit Time Window{{< /ui >}} is not set.
1. To add additional [librdkafka options](#librdkafka-options), click {{< ui >}}Add Option{{< /ui >}} and select an option in the dropdown menu.
    1. Enter a value for that option.
    1. Check your values against the [librdkafka documentation][7] to make sure they have the correct type and are within the set range.
    1. Click {{< ui >}}Add Option{{< /ui >}} to add another librdkafka option.

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Kafka bootstrap servers identifier:
    - References the bootstrap server that the client uses to connect to the Kafka cluster and discover all the other hosts in the cluster.
	- In your secrets manager, the host and port must be entered in the format of `host:port`, such as `10.14.22.123:9092`. If there is more than one server, use commas to separate them.
	- The default identifier is `DESTINATION_KAFKA_BOOTSTRAP_SERVERS`.
- Kafka TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `DESTINATION_KAFKA_KEY_PASS`.
- SASL authentication (when enabled):
	- Kafka SASL username identifier:
		- The default identifier is `DESTINATION_KAFKA_SASL_USERNAME`.
	- Kafka SASL password identifier:
		- The default identifier is `DESTINATION_KAFKA_SASL_PASSWORD`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{< img src="observability_pipelines/destinations/kafka_env_var.png" alt="The install page showing the Kafka environment variable field" style="width:70%;" >}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/kafka %}}

{{% /tab %}}
{{< /tabs >}}

## librdkafka options

These are the available librdkafka options:

- client.id
- queue.buffering.max_messages
- transactional.id
- enable.idempotence
- acks

See the [librdkafka documentation][7] for more information and to ensure your values have the correct type and are within range.

## Metrics

For [component metrics][13] and [destination buffer metrics][14] emitted by all destinations, see the [Pipelines Usage Metrics][8] documentation.

### Kafka metrics

- Use the `component_id` tag to filter or group by individual components.
- The `component_type` tag is `kafka` for Kafka destination metrics.

`pipelines.kafka_produced_messages_total`
: **Description**: The number of messages produced and sent to Kafka brokers.
: **Metric type**: count

`pipelines.kafka_produced_messages_bytes_total`
: **Description**: The number of message bytes produced and sent to Kafka brokers.
: **Metric type**: count

`pipelines.kafka_queue_messages`
: **Description**: Current number of messages in the librdkafka producer queue.
: **Metric type**: gauge

`pipelines.kafka_queue_messages_bytes`
: **Description**: Current total size, in bytes, of messages in the librdkafka producer queue.
: **Metric type**: gauge

`pipelines.kafka_requests_total`
: **Description**: The number of requests sent to Kafka brokers.
: **Metric type**: count

`pipelines.kafka_requests_bytes_total`
: **Description**: The number of bytes transmitted to Kafka brokers.
: **Metric type**: count

`pipelines.kafka_responses_total`
: **Description**: The number of responses received from Kafka brokers.
: **Metric type**: count

`pipelines.kafka_responses_bytes_total`
: **Description**: The number of bytes received from Kafka brokers.
: **Metric type**: count

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][9] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| 10,000         | 1                 | 1                   |

[1]: https://clickhouse.com/docs/engines/table-engines/integrations/kafka
[2]: https://docs.snowflake.com/en/user-guide/kafka-connector
[3]: https://docs.databricks.com/aws/en/connect/streaming/kafka
[4]: https://learn.microsoft.com/en-us/azure/event-hubs/azure-event-hubs-apache-kafka-overview
[5]: https://app.datadoghq.com/observability-pipelines
[7]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[8]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[9]: /observability_pipelines/destinations/#event-batching
[10]: /observability_pipelines/configuration/set_up_pipelines/
[11]: /api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[13]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[14]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
