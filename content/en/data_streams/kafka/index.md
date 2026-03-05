---
title: Kafka Monitoring
description: Use Data Streams Monitoring
---

With Data Streams Monitoring's Kafka Monitoring, a Datadog Agent check connects to your Kafka cluster and starts collecting health and performance metrics. Kafka Monitorin allows you to:

- Monitor Kafka health in one place - see cluster, broker, topic, and partition health with throughput, lag, and replication metrics
- Pinpoint root cause fast - correlate config and schema changes with lag, throughput, and errors, and trace issues to the exact topic, schema version, or config change
- Connect services to topics - see which producers and consumers interact with each topic, with linked owners, repos, on-call rotations, traces, and error logs
- Inspect topic schemas and messages - view schemas, compare versions, and access messages to debug poison payloads or explore the topic

### Prerequisites

- Install the [Kafka integration][1]
- [Instrument your application][2]

## Setup

[1]: https://app.datadoghq.com/integrations?search=kafka
[2]: /data_streams/setup/