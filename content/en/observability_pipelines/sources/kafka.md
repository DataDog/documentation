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

<div class="alert alert-danger">Only enter the identifiers for the Kafka servers, username, password, and if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your Kafka servers. If you leave it blank, the [default](#set-secrets) is used.
1. Enter the identifier for your Kafka username. If you leave it blank, the [default](#set-secrets) is used.
1. Enter the identifier for your Kafka password. If you leave it blank, the [default](#set-secrets) is used.
1. Enter the group ID.
1. Enter the topic name. If there is more than one, click **Add Field** to add additional topics.

### Optional settings

#### Enable SASL Authentication

1. Toggle the switch to enable **SASL Authentication** 
1. Select the mechanism (**PLAIN**, **SCHRAM-SHA-256**, or **SCHRAM-SHA-512**) in the dropdown menu.

#### Enable TLS

{{% observability_pipelines/tls_settings %}}

#### Add additional librdkafka options

1. Click **Advanced** and then **Add Option**.
1. Select an option in the dropdown menu.
1. Enter a value for that option.
1. Check your values against the [librdkafka documentation][4] to make sure they have the correct type and are within the set range.
1. Click **Add Option** to add another librdkafka option.

## Set secrets

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

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: https://github.com/confluentinc/librdkafka/tree/master
[3]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[4]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[6]: /observability_pipelines/sources/azure_event_hubs/
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline