---
title: Tracing PHP CLI Scripts
kind: guide
further_reading:
- link: "/tracing/trace_collection/dd_libraries/php/"
  tags: "Documentation"
  text: "Set up PHP trace collection"
- link: "/tracing/troubleshooting/"
  tags: "Documentation"
  text: "Troubleshooting"
---

## Monitor Kafka queues

### Integration

To get metrics around your Kafka queues, please use [Datadog's Kafka integration][1]

### Data Stream Monitoring

Say something about the awesome DSM and point to their doc

### Collect distributed traces

Datadog APM and distributed tracing gives you expanded visibility into the performance of your services by measuring request volume and latency. You create graphs and alerts to monitor your APM data, and you can visualize the activity of a single request in a flame graph like the one shown below to better understand the sources of latency and errors.

{{< img src="https://imgix.datadoghq.com/img/blog/monitor-kafka-with-datadog/datadog-kafka-traces.png?auto=format&fit=max&w=847" alt="A kafka consumer span" >}}

Datadog APM can trace requests to and from Kafka clients. This means you can collect traces without modifying the source code of your producers and consumers.

#### Setup

To trace kafka applications, we actually trace the producing and consuming calls within kafka SDK. So to monitor Kafka, you just have to setup APM on your services. To do so, please follow

#### Kafka spans

A few screenshots, a quick view of the metadata we will find on each spans

#### Special use cases

Detail any specifics here. Like DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED in .NET

#### Disable tracing for Kafka

If you want to disable tracing for Kafka, you can set `DD_TRACE_KAFKA_ENABLED` to false on the given applications.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/kafka