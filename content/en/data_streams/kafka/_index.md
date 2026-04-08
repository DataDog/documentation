---
title: Kafka Monitoring
description: Monitor Kafka cluster health, connect services to topics, and inspect schemas and messages with Data Streams Monitoring's Kafka Monitoring.
---

With Data Streams Monitoring's Kafka Monitoring, a Datadog Agent check connects to your Kafka cluster and starts collecting health and performance metrics. Kafka Monitoring allows you to:

- **Monitor Kafka health**: See cluster, broker, topic, and partition health with throughput, lag, and replication metrics
- **Pinpoint root cause**: Correlate configuration and schema changes with lag, throughput, and errors, and trace issues to the exact topic, schema version, or configuration change
- **Connect services to topics**: See which producers and consumers interact with each topic, with linked owners, repos, on-call rotations, traces, and error logs
- **Inspect topic schemas and messages**: View schemas, compare versions, and access messages to debug poison payloads or explore the topic

## Setup

Go to the [Kafka Monitoring setup page][1] and click {{< ui >}}Get Started{{< / ui >}}. Then choose your environment and follow the instructions. To request assistance, choose {{< ui >}}Request a pairing session{{< /ui >}}.

{{< img src="data_streams/kafka_setup-2.png" alt="The Kafka Monitoring setup dialog showing environment selection, security protocol, schema registry options, and Kubernetes configuration instructions" >}}

The setup page provides environment-specific configuration instructions. You can copy the instructions directly to an AI agent with **Copy for AI**.

### Kafka ACL permissions

If your Kafka cluster uses ACLs, the Datadog Agent user requires the following minimum permissions:

| Resource Name | Resource Type | Operation        |
|---------------|---------------|------------------|
| `kafka-cluster` | `CLUSTER`   | `Describe`       |
| `kafka-cluster` | `CLUSTER`   | `DescribeConfigs` |
| `*`           | `TOPIC`       | `Describe`       |
| `*`           | `TOPIC`       | `DescribeConfigs` |
| `*`           | `GROUP`       | `Describe`       |

To [view messages][2], the Agent user also requires:

| Resource Name | Resource Type | Operation |
|---------------|---------------|-----------|
| `*`           | `TOPIC`       | `Read`    |

## Workflows

### Monitor cluster health and performance

The **Clusters**, **Topics**, and **Brokers** tabs display health status across your entire Kafka infrastructure. For each topic, you can see partition count, under-replicated and offline partitions, message throughput, and consumer lag.

{{< img src="data_streams/kafka_clusters_overview-2.png" alt="The Kafka Monitoring clusters view showing cluster list with broker counts, topic names, replication status, and messages-in rate" >}}

Click into any topic to see a detailed summary, including incoming message rate, maximum lag across all partitions, and whether current lag is approaching the retention limit.

{{< img src="data_streams/kafka_topic_summary-2.png" alt="Topic detail summary page showing incoming message rate of 0.8 msg/sec, current lag of 1.15 seconds, and lag-vs-retention status" >}}

From any metric, you can create Datadog monitors, SLOs, and dashboards.

### Correlate configuration and schema changes with health metrics

Change events are overlaid directly on throughput and lag graphs, so you can see whether a configuration or schema change coincided with a degradation.

{{< img src="data_streams/kafka_topics_lag_change-2.png" alt="Topics view with a topic_config change annotation at 17:02:42 overlaid on the lag-by-topic graph, showing a spike correlated with the change event" >}}

To identify exactly what changed, click on detected changes on the overlay and select **View config change**. 

{{< img src="data_streams/lag-by-topic-overlay.png" alt="Topic configuration diff view comparing version 625 and 626, with max.message.bytes changed from 1000012 to 1024 highlighted" >}}

### Connect producer and consumer services to topics

The **Producers** and **Consumers** sections of each topic show which services are reading from and writing to that topic. Hovering over a service shows ownership information from the Service Catalog: team, code repository, on-call engineer, and Slack channel.

{{< img src="data_streams/kafka_topic_service_ownership.png" alt="Topic producers and consumers view with a service panel open showing ownership team (Frameworks), code repo, on-call engineer, Slack channel, and health status" >}}

Use this information to contact the right team when a consumer is lagging or a producer is misbehaving.

### Inspect topic schemas and messages

The **Schema** section shows the current schema for a topic's key or value, with version history. Use the version selector to compare schemas across versions.

The **Messages** section lets you retrieve messages by partition and offset to inspect payloads directly. This is useful for debugging poison payloads or verifying message structure after a schema change.

{{< img src="data_streams/kafka_schema_messages.png" alt="Topic schema and messages view showing a Protobuf schema definition and a table of recent messages with date, partition, offset, and message value" >}}

**Note**: [Message viewing][2] is not enabled by default and requires additional setup. Access is controlled by per-user permissions, so you can roll out Kafka Monitoring without exposing message content. Configure message viewing separately after completing the initial setup.

[1]: https://app.datadoghq.com/data-streams/kafka/setup
[2]: /data_streams/kafka/messages