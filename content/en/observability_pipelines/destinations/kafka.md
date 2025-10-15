---
title: Kafka Destination
disable_toc: false
---

## Overview

Use Observability Pipelines' Kafka destination to send logs to Kafka topics.

### When to use this destination

Common scenarios when you might use this destination:
- To route logs to the following destinations:
    - Clickhouse: An open-source column-oriented database management system used for analyzing large volumes of logs.
    - Snowflake: A data warehouse used for storage and query.
        - Snowflake's API integration utilizes Kafka as a method to ingest logs into their platform.
    - Databricks: A data lakehouse for analytics and storage.
    - Azure Event Hub: An ingest and processing service in the Microsoft and Azure ecosystem.
- To route data to Kafka and use the Kafka Connect ecosystem.
- To process and normalize your data with Observability Pipelines before routing to Apache Spark with Kafka to analyze data and run Machine Learning workloads.

## Setup

Set up the Kafka destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

1. Enter the topic name.
1. In the **Encoding** dropdown menu, select either `JSON` or `Raw message` as the output format.

#### Optional settings

##### Enable TLS

Toggle the switch to enable **TLS**. If you enable TLS, the following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Configurations][2] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

##### Enable SASL authentication

Toggle the switch to enable **SASL Authentication** and select the mechanism (**PLAIN**, **SCHRAM-SHA-256**, or **SCHRAM-SHA-512**) in the dropdown menu.

##### Enable compression
1. Toggle switch to **Enable Compression**.
1. In the **Compression Algorithm** dropdown menu, select a compression algorithm (**gzip**, **zstd**, **lz4**, or **snappy**).
1. (Optional) Select a **Compression Level** in the dropdown menu. If the level is not specified, the algorithm's default level is used.

##### Buffering options (Preview)

Toggle the switch to enable **Buffering Options** (Preview).<br>**Note**: Contact your account manager to request access to the Preview.
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
1. **Headers Key**: Specify which log field contains your Kafka headers. If omitted, no headers are written.
1. **Message Timeout (ms)**: Local message timeout, in milliseconds. Default is `300,000` ms.
1. **Socket Timeout (ms)**: Default timeout, in milliseconds, for network requests. Default is `60,000` ms.
1. **Rate Limit Events**: The maximum number of requests the Kafka client can send within the rate limit time window. Default is no rate limit.
1. **Rate Limit Time Window (secs)**: The time window used for the rate limit option.
    - This setting has no effect if the rate limit for events is not set.
    - Default is `1` second if **Rate Limit Events** is set, but **Rate Limit Time Window** is not set.
1. Click **Add Option** to add additional [librdkafka options](#librdkafka-options).
    1. Select an option in the dropdown menu.
        1. Enter a value for that option.
        1. Check your values against the [librdkafka documentation][3] to make sure they have the correct type and are within the set range.
        1. Click **Add Option** to add another librdkafka option.

### Set environment variables

- The host and port of the Kafka bootstrap servers.
    - The bootstrap server that the client uses to connect to the Kafka cluster and discover all the other hosts in the cluster. The host and port must be entered in the format of `host:port`, such as `10.14.22.123:9092`. If there is more than one server, use commas to separate them.
	- Stored as the environment variable: `DD_OP_DESTINATION_KAFKA_BOOTSTRAP_SERVERS`.
- If TLS is enabled, the Kafka TLS passphrase is needed.
	- Stored as the environment variable: `DD_OP_DESTINATION_KAFKA_KEY_PASS`
- If you enabled SASL:
	- Kafka SASL username
		- Stored as the environment variable: `DD_OP_DESTINATION_KAFKA_SASL_USERNAME`.
	- Kafka SASL password
		- Stored as the environment variable: `DD_OP_DESTINATION_KAFKA_SASL_PASSWORD`.

## librdkafka options

These are the available librdkafka options:

- client.id
- queue.buffering.max_messages
- transactional.id
- enable.idempotence
- acks

See the [librdkafka documentation][3] for more information and to ensure your values have the correct type and are within range.

## How the destination works

See the [Observability Pipelines Metrics][4] for a full list of available health metrics.

### Worker health metrics

#### Component metrics

{{% observability_pipelines/metrics/component %}}

#### Buffer metrics (when buffering is enabled)

{{% observability_pipelines/metrics/buffer %}}

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][5] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| 10,000         | 1,000,000       | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/advanced_configurations/
[3]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[4]: /observability_pipelines/monitoring/metrics/
[5]: /observability_pipelines/destinations/#event-batching