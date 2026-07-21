---
title: Kafka Source
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Kafka source to receive logs from your Kafka topics. The Kafka source uses [librdkafka][2].

You can also [send Azure Event Hub logs to Observability Pipelines using the Kafka source][6].

## Prerequisites

{{% observability_pipelines/prerequisites/kafka %}}

## Setup

Set up this source when you [set up a pipeline][1]. You can set up a pipeline in the [UI][7], using the [API][8], or with [Terraform][9]. The instructions in this section are for setting up the source in the UI.

<div class="alert alert-danger">For Secrets Management: Only enter the identifiers for the Kafka servers, username, password, and if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

{{% observability_pipelines/secrets_env_var_note %}}

After you select the Kafka source in the pipeline UI:

1. Enter the identifier for your Kafka servers. If you leave it blank, the [default](#secret-defaults) is used.
1. Enter the identifier for your Kafka username. If you leave it blank, the [default](#secret-defaults) is used.
1. Enter the identifier for your Kafka password. If you leave it blank, the [default](#secret-defaults) is used.
1. Enter the group ID.
1. Enter the topic name. If there is more than one, click {{< ui >}}Add Field{{< /ui >}} to add additional topics.

### Optional settings

#### Enable SASL Authentication

1. Toggle the switch to enable {{< ui >}}SASL Authentication{{< /ui >}}
1. Select the mechanism ({{< ui >}}PLAIN{{< /ui >}}, {{< ui >}}SCHRAM-SHA-256{{< /ui >}}, or {{< ui >}}SCHRAM-SHA-512{{< /ui >}}) in the dropdown menu.

#### Enable TLS

{{% observability_pipelines/tls_settings %}}

#### Add additional librdkafka options

1. Click {{< ui >}}Advanced{{< /ui >}} and then {{< ui >}}Add Option{{< /ui >}}.
1. Select an option in the dropdown menu.
1. Enter a value for that option.
1. Check your values against the [librdkafka documentation][4] to make sure they have the correct type and are within the set range.
1. Click {{< ui >}}Add Option{{< /ui >}} to add another librdkafka option.

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Kafka bootstrap servers identifier:
	- References the bootstrap server that the client uses to connect to the Kafka cluster and discover all the other hosts in the cluster.
	- In your secrets manager, the host and port must be entered in the format of `host:port`, such as `10.14.22.123:9092`. If there is more than one server, use commas to separate them.
	- The default identifier is `SOURCE_KAFKA_BOOTSTRAP_SERVERS`.
- Kafka SASL username identifier:
	- The default identifier is `SOURCE_KAFKA_SASL_USERNAME`.
- Kafka SASL password identifier:
	- The default identifier is `SOURCE_KAFKA_SASL_PASSWORD`.
- Kafka TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `SOURCE_KAFKA_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/kafka %}}

{{% /tab %}}
{{< /tabs >}}

## librdkafka options

These are the available librdkafka options:

- auto.offset.reset
- auto.commit.interval.ms
- client.id
- coordinator.query.interval.ms
- enable.auto.commit
- enable.auto.offset.store
- fetch.max.bytes
- fetch.message.max.bytes
- fetch.min.bytes
- fetch.wait.max.ms
- group.instance.id
- heartbeat.interval.ms
- queued.min.messages
- session.timeout.ms
- socket.timeout.ms

See the [librdkafka documentation][3] for more information and to ensure your values have the correct type and are within range.

## Metrics

For [component metrics][10] and [source buffer metrics][11] emitted by all sources, see the [Pipelines Usage Metrics][12] documentation.

### Kafka metrics

- Use the `component_id` tag to filter or group by individual components.
- The `component_type` tag is `kafka` for these metrics.

`pipelines.kafka_consumer_lag`
: **Description**: Kafka consumer lag per topic and partition. High values indicate the source is falling behind the incoming message rate.
: **Metric type**: gauge

`pipelines.kafka_consumed_messages_total`
: **Description**: The number of messages the Worker consumed from Kafka brokers.
: **Metric type**: count

`pipelines.kafka_consumed_messages_bytes_total`
: **Description**: The number of message bytes the Worker consumed from Kafka brokers.
: **Metric type**: count

`pipelines.kafka_requests_total`
: **Description**: The number of requests the Worker sent to Kafka brokers.
: **Metric type**: count

`pipelines.kafka_requests_bytes_total`
: **Description**: The number of bytes the Worker sent to Kafka brokers.
: **Metric type**: count

`pipelines.kafka_responses_total`
: **Description**: The number of responses the Worker received from Kafka brokers after writing to them.
: **Metric type**: count

`pipelines.kafka_responses_bytes_total`
: **Description**: The number of bytes the Worker received from Kafka brokers after writing to them.
: **Metric type**: count

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: https://github.com/confluentinc/librdkafka/tree/master
[3]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[4]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[6]: /observability_pipelines/sources/azure_event_hubs/
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[10]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[11]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[12]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
