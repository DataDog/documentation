---
title: Kafka Monitoring
description: Monitor Kafka cluster health, connect services to topics, and inspect schemas and messages with Data Streams Monitoring's Kafka Monitoring.
---

With Data Streams Monitoring's Kafka Monitoring, a Datadog Agent check connects to your Kafka cluster and starts collecting health and performance metrics. Kafka Monitorin allows you to:

- **Monitor Kafka health**: See cluster, broker, topic, and partition health with throughput, lag, and replication metrics
- **Connect services to topics**: See which producers and consumers interact with each topic, with linked owners, repos, on-call rotations, traces, and error logs
- **Inspect topic schemas and messages**: View schemas, compare versions, and access messages to debug poison payloads or explore the topic

### Prerequisites

- Install the [Kafka integration][1]
- [Instrument your application][2]

## Setup

Go to the [Kafka Monitoring setup page][3] and click {{< ui >}}Get Started{{< / ui >}}. Then choose your environment and follow the instructions.

[1]: https://app.datadoghq.com/integrations?search=kafka
[2]: /data_streams/setup/
[3]: https://app.datadoghq.com/data-streams/kafka/setup