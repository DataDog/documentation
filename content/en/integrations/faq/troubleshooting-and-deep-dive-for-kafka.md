---
title: Troubleshooting and Deep Dive for Kafka

aliases:
  - /integrations/faq/producer-and-consumer-metrics-don-t-appear-in-my-datadog-application
---

## Overview

"Kafka™ is used for building real-time data pipelines and streaming apps. It is horizontally scalable, fault-tolerant, wicked fast, and runs in production in thousands of companies." - [Official Kafka Site][1]

Kafka is essentially a powerful, fast message brokering system used to transfer a payload/message from many applications to many applications. This is a Java based application that exposes metrics through mBeans.

## Kafka components

There are four main components to Kafka:

* **Broker**: Cluster of nodes responsible for establishing the mechanisms to write and read messages. (Main piece of Kafka, always in Java, usually managed by Apache Zookeeper)
* **Producer**: Application(s) that is writing the messages that you are interested in viewing. (Most commonly in Java, but possibly in other languages)
* **Consumer**: This is the application(s) that is receiving your set of messages. (Most commonly in Java, but possibly in other languages)
* **Topics** - Mailboxes of messages that Producers and Consumers subscribe to. When writing or reading a message in Kafka, specify which "topic" you are to read from. You can think of this like a channel in slack, you join the ones you want to post and read messages to. Each topic then has a list of offsets that informs you where you are in the number of messages you have read/have left to read.

[A more full dive into Kafka][2] as well as on [a Datadog Blogpost][3].

## Datadog Kafka integrations

It is important to note that Datadog has two distinct Kafka Integrations. The first is named [Kafka][4] while the second is [Kafka_Consumer][4].

The [Kafka Integration][4] uses [Datadog's JMXFetch][5] application to pull metrics, just like our other Java based applications such as Cassandra, JMX, Tomcat, etc. This pulls metrics through the use of mBeans, where the engineering team has included a list of commonly used mBeans in the Kafka.yaml file. This can be extended with any other beans the user would like, or if your version of Kafka supports additional metrics.

The [Kafka_Consumer Integration][6] collects metrics like our standard Python based checks. This uses an internal Zookeeper API. Zookeeper is an Apache application that is responsible for managing the configuration for the cluster of nodes known as the Kafka broker. (In version 0.9 of Kafka things are a bit different, Zookeeper is no longer required, see the Troubleshooting section for more information). This check picks up only three metrics, and these do not come from JMXFetch.

## Troubleshooting

### Older Agent versions

This issue only applies if you are running version *<5.20* of the [Datadog Agent][7]. In older versions of Kafka, consumer offsets were stored in Zookeper exclusively. The initial Kafka_consumer Agent Check was written when this limitation was in place. Due to this, you cannot get the `kafka.consumer_lag` metric if your offsets are stored in Kafka and you are using an older version of the Agent. [Upgrade the Agent to the latest version][8] to see these metrics.

### Cannot connect to instance

You might see the following error for the Datadog-Kafka integration:

```text
instance #kafka-localhost-<PORT_NUM> [ERROR]: 'Cannot connect to instance localhost:<PORT_NUM>. java.io.IOException: Failed to retrieve RMIServer stub
```

This error means the Datadog Agent is unable to connect to the Kafka instance to retrieve metrics from the exposed mBeans over the RMI protocol. The error can be resolved by including the following Java Virtual Machine (JVM) arguments when starting the Kafka instance (required for all separate Java instances - producer, consumer, and broker).

```text
-Dcom.sun.management.jmxremote.port=<PORT_NUM> -Dcom.sun.management.jmxremote.rmi.port=<PORT_NUM>
```

### Missing producer and consumer metrics

By default Datadog only collects broker based metrics.

For Java based producers and consumers, add the following to the `conf.yaml` and update the settings as necessary. See the [sample kafka.d/conf.yaml][9] for all available configuration options.
```yaml
- host: remotehost
  port: 9998 # Producer
  tags:
    - kafka: producer0
- host: remotehost
  port: 9997 # Consumer
  tags:
    - kafka: consumer0
```

**Note**: This method does not work if you are using custom producer and consumer clients written in other languages or not exposing mBeans. To submit your metrics from your code, use [DogStatsD][10].

### Partition doesn't exist

This issue is specifically for the Kafka Consumer Agent check. If you specify a partition in `kafka_consumer.d/conf.yaml` that doesn't exist in your environment, you see the following error:

```text
instance - #0 [Error]: ''
```

To remedy, specify the correct partition for your topic. This correlates to this line:

```yaml
#     <TOPIC_NAME_1>: [0, 1, 4, 12]
```

### Partition context limitation

The number of partition contexts collection is limited to 500. If you require more contexts, contact [Datadog support][11].

[1]: https://kafka.apache.org
[2]: https://sookocheff.com/post/kafka/kafka-in-a-nutshell
[3]: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
[4]: /integrations/kafka/
[5]: https://github.com/DataDog/jmxfetch
[6]: /integrations/kafka/#agent-check-kafka-consumer
[7]: /agent/
[8]: /agent/versions/upgrade_to_agent_v6/
[9]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[10]: /developers/dogstatsd/
[11]: /help/
