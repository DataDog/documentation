---
title: Kafka Source
disable_toc: false
---

Use Observability Pipelines' Kafka source to receive logs from your Kafka topics. Select and set up this source when you [set up a pipeline][1]. The Kafka source uses [librdkafka][2].

You can also [send Azure Event Hub logs to Observability Pipelines using the Kafka source](/observability_pipelines/sources/azure_event_hub/#send-azure-event-hub-logs-to-observability-pipelines-using-the-kafka-source).

## Prerequisites

{{% observability_pipelines/prerequisites/kafka %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

{{% observability_pipelines/source_settings/kafka %}}

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/kafka %}}

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