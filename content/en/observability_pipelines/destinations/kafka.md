---
title: Kafka Destination
disable_toc: false
products:
- name: Logs
  icon: logs
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

Set up the Kafka destination and its environment variables when you [set up a pipeline][5]. The information below is configured in the pipelines UI.

### Set up the destination

1. Enter the name of the topic you want to send logs to.
1. In the **Encoding** dropdown menu, select either `JSON` or `Raw message` as the output format.

{{< img src="observability_pipelines/destinations/kafka_settings.png" alt="The Kafka destination with sample values" style="width:30%;" >}}

#### Optional settings

##### Enable TLS

Toggle the switch to enable **TLS**. The following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Configurations][6] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) root file in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

##### Enable SASL authentication

1. Toggle the switch to enable **SASL Authentication**.
1. Select the mechanism (**PLAIN**, **SCHRAM-SHA-256**, or **SCHRAM-SHA-512**) in the dropdown menu.

##### Enable compression

1. Toggle switch to **Enable Compression**.
1. In the **Compression Algorithm** dropdown menu, select a compression algorithm (**gzip**, **zstd**, **lz4**, or **snappy**).
1. (Optional) Select a **Compression Level** in the dropdown menu. If the level is not specified, the algorithm's default level is used.

##### Buffering options (Preview)

Toggle the switch to enable **Buffering Options** ({{< tooltip glossary="preview" case="title" >}}).<br>**Note**: Contact your account manager to request access to the Preview.
- If disabled (default): Up to 500 events are buffered before flush.
- If enabled:
	1. Select the buffer type you want to set.
        - **Memory**: Fast, limited by RAM
        - **Buffer size**: Durable, survives restarts
	1. Enter the buffer size and select the unit.
	    - Maximum capacity in MB or GB.

##### Advanced options

Click **Advanced** if you want to set any of the following fields:

1. **Message Key Field**: Specify which log field contains the message key for partitioning, grouping, and ordering.
1. **Headers Key**: Specify which log field contains your Kafka headers. If left blank, no headers are written.
1. **Message Timeout (ms)**: Local message timeout, in milliseconds. Default is `300,000 ms`.
1. **Socket Timeout (ms)**: Default timeout, in milliseconds, for network requests. Default is `60,000 ms`.
1. **Rate Limit Events**: The maximum number of requests the Kafka client can send within the rate limit time window. Default is no rate limit.
1. **Rate Limit Time Window (secs)**: The time window used for the rate limit option.
    - This setting has no effect if the rate limit for events is not set.
    - Default is `1 second` if **Rate Limit Events** is set, but **Rate Limit Time Window** is not set.
1. To add additional [librdkafka options](#librdkafka-options), click **Add Option** and select an option in the dropdown menu.
    1. Enter a value for that option.
    1. Check your values against the [librdkafka documentation][7] to make sure they have the correct type and are within the set range.
    1. Click **Add Option** to add another librdkafka option.

### Set secrets

The following are the defaults used for secret identifiers and environment variables.

**Note**: If you entered identifiers for yours secrets and then choose to use environment variables, the environment variable is the identifier entered prepended with `DD_OP`. For example, if you entered `PASSWORD_1` for the a password identifier, the environment variable for the password is `DD_OP_PASSWORD_1`.

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Kafka bootstrap servers identifier:
	- The default identifier is `DESTINATION_KAFKA_BOOTSTRAP_SERVERS`.
- Kafka TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `DESTINATION_KAFKA_KEY_PASS`.
- If you are using SASL authentication:
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

## How the destination works

See the [Observability Pipelines Metrics][8] for a full list of available health metrics.

### Worker health metrics

#### Component metrics

{{% observability_pipelines/metrics/component %}}

#### Buffer metrics (when buffering is enabled)

{{% observability_pipelines/metrics/buffer %}}

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][9] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| 10,000         | 1,000,000       | 1                   |

[1]: https://clickhouse.com/docs/engines/table-engines/integrations/kafka
[2]: https://docs.snowflake.com/en/user-guide/kafka-connector
[3]: https://docs.databricks.com/aws/en/connect/streaming/kafka
[4]: https://learn.microsoft.com/en-us/azure/event-hubs/azure-event-hubs-apache-kafka-overview
[5]: https://app.datadoghq.com/observability-pipelines
[6]: /observability_pipelines/advanced_configurations/
[7]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[8]: /observability_pipelines/monitoring/metrics/
[9]: /observability_pipelines/destinations/#event-batching