---
title: Data Streams Terms and Concepts
kind: documentation
---

There are a number of terms and concepts specific to Data Streams Monitoring.

| Concept | Description |
| ------- | ----------- |
| Consumer lag | Delay between when the Kafka broker receives a message and when the consumer receives it. (requires [Kafka integration][1]). |
| Edge latency | Latency observed between the time a message was added to this queue and picked up by this service ("last hop" latency). |
| Origin latency | Latency observed between the time the first message was produced by the first service in the pipeline, and the time at which this particular service has processed or "consumed" the message. |
| Pathway | tk |
| Queue | tk |
| Throughput | The rate at which messages are being consumed by this service. |



[1]: https://docs.datadoghq.com/integrations/kafka/?tab=host#kafka-consumer-integration
