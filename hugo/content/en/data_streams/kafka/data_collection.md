---
title: Data Collection
description: Metrics, configurations, and capabilities collected by Data Streams Monitoring's Kafka Monitoring when cluster monitoring is enabled.
---

Data Streams Monitoring (DSM)'s [Kafka Monitoring][6] uses the [Kafka Consumer integration][1] to collect cluster health data. In addition to the integration's default collection, enabling cluster monitoring collects extra data and unlocks the actions described on this page.

## Metrics

To collect the **DSM-only** [Kafka Consumer integration metrics][5], set `enable_cluster_monitoring: true`. See [Kafka Monitoring Setup][4] for how to configure the check.

## Configurations and schemas

- Broker configurations
- Topic configurations
- Schemas from a schema registry

## Capabilities

Enabling cluster monitoring unlocks the ability to [read live messages on topics][3] on demand. See [Enable message inspection][2] for the additional setup steps.

[1]: /integrations/kafka-consumer/?tab=containerized
[2]: /data_streams/kafka/setup/#enable-message-inspection
[3]: /data_streams/kafka/#inspect-topic-schemas-and-messages
[4]: /data_streams/kafka/setup/
[5]: /integrations/kafka-consumer/?tab=containerized#metrics
[6]: /data_streams/kafka/
