---
title: Data Collection
description: Metrics, configurations, and capabilities collected by Data Streams Monitoring's Kafka Monitoring when cluster monitoring is enabled.
---

Data Streams Monitoring's Kafka Monitoring collects cluster health data through the [Kafka Consumer integration][1]. With `enable_cluster_monitoring: true`, the integration collects additional metrics and unlocks the extra capabilities described on this page.

See [Kafka Monitoring Setup][4] for how to configure the check.

## Metrics

| Metric                                           | Description                                                  |
|--------------------------------------------------|--------------------------------------------------------------|
| `kafka.cluster.controller_id`                    | ID of the broker acting as the cluster controller            |
| `kafka.broker.count`                             | Total number of brokers in the cluster                       |
| `kafka.broker.leader_count`                      | Number of partitions for which this broker is the leader     |
| `kafka.broker.partition_count`                   | Total number of partitions on this broker including replicas |
| `kafka.broker.config.log_retention_bytes`        | Broker configuration for log retention in bytes              |
| `kafka.broker.config.log_retention_ms`           | Broker configuration for log retention in milliseconds       |
| `kafka.broker.config.log_segment_bytes`          | Broker configuration for log segment size in bytes           |
| `kafka.broker.config.num_partitions`             | Broker configuration for default number of partitions        |
| `kafka.broker.config.num_network_threads`        | Broker configuration for number of network threads           |
| `kafka.broker.config.num_io_threads`             | Broker configuration for number of I/O threads               |
| `kafka.broker.config.default_replication_factor` | Broker configuration for default replication factor          |
| `kafka.broker.config.min_insync_replicas`        | Broker configuration for minimum in-sync replicas            |
| `kafka.topic.count`                              | Total number of topics in the cluster                        |
| `kafka.topic.partitions`                         | Number of partitions for this topic                          |
| `kafka.topic.size`                               | Total number of messages in the topic                        |
| `kafka.topic.message_rate`                       | Message production rate for this topic                       |
| `kafka.topic.config.retention_ms`                | Topic configuration for retention time in milliseconds       |
| `kafka.topic.config.retention_bytes`             | Topic configuration for retention size in bytes              |
| `kafka.topic.config.max_message_bytes`           | Topic configuration for maximum message size in bytes        |
| `kafka.partition.beginning_offset`               | The earliest offset in the partition                         |
| `kafka.partition.replicas`                       | Number of replicas for this partition                        |
| `kafka.partition.isr`                            | Number of in-sync replicas for this partition                |
| `kafka.partition.size`                           | Number of messages in the partition                          |
| `kafka.partition.under_replicated`               | Whether this partition is under-replicated (1) or not (0)    |
| `kafka.partition.offline`                        | Whether this partition is offline (1) or not (0)             |
| `kafka.consumer_group.count`                     | Total number of consumer groups                              |
| `kafka.consumer_group.members`                   | Number of members in the consumer group                      |
| `kafka.consumer_group.member.partitions`         | Number of partitions assigned to this consumer group member  |

Now collected across the entire cluster instead of for selected topics only:

| Metric                                           | Description                                                                                                                                             |
|--------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| `kafka.broker_offset`                            | Current message offset on broker.<br>*Shown as offset*                                                                                                  |
| `kafka.consumer_offset`                          | Current message offset on consumer.<br>*Shown as offset*                                                                                                |
| `kafka.consumer_lag`                             | Lag in messages between consumer and broker.<br>*Shown as message*                                                                                      |
| `kafka.estimated_consumer_lag`                   | Lag in seconds between consumer and broker. This metric is provided through Data Streams Monitoring. Additional charges may apply.<br>*Shown as second* |

## Configurations and schemas

- Broker configurations
- Topic configurations
- Schemas from a schema registry

These appear in Data Streams Monitoring alongside the metrics above.

## Capabilities

Enabling cluster monitoring also unlocks the ability to [read live messages on topics][3] on demand. See [Enable message inspection][2] for the additional setup steps.

[1]: /integrations/kafka-consumer/?tab=containerized
[2]: /data_streams/kafka/setup/#enable-message-inspection
[3]: /data_streams/kafka/#inspect-topic-schemas-and-messages
[4]: /data_streams/kafka/setup/
