---
title: Data Streams Terms and Concepts
kind: documentation
---

There are a number of terms and concepts specific to Data Streams Monitoring.

| Concept | Description |
| ------- | ----------- |
| Origin latency | Latency observed between the time the first message was produced by the first service in the pipeline, and the time at which this particular service has processed or "consumed" the message. |
| Edge latency | Latency observed between the time a message was added to this queue and picked up by this service ("last hop" latency). |
| Throughput | The rate at which messages are being consumed by this service. |
| Consumer lag | Lag in messages between consumer and Kafka broker (requires [Kafka integration][1] |


[1]: https://docs.datadoghq.com/integrations/kafka/?tab=host#kafka-consumer-integration
