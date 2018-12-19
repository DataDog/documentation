---
title: Troubleshooting and Deep Dive for Kafka
kind: faq
---

## What is Kafka ?

"Kafka™ is used for building real-time data pipelines and streaming apps. It is horizontally scalable, fault-tolerant, wicked fast, and runs in production in thousands of companies." - [Official Kafka Site][1]

Kafka is essentially a powerful, fast message brokering system used to transfer a payload/message from many applications to many applications. This is a Java based application that exposes metrics through mBeans.

## Kafka Components:

There are four main components to Kafka:

* **Broker**: Cluster of nodes responsible for establishing the mechanisms to write and read messages. (Main piece of Kafka, always in Java, usually managed by Apache Zookeeper)
* **Producer**: Application(s) that is writing the messages that you are interested in viewing. (Most commonly in Java, but possibly in other languages)
* **Consumer**: This is the application(s) that is receiving your set of messages. (Most commonly in Java, but possibly in other languages)
* **Topics** - Mailboxes of messages that Producers and Consumers subscribe to. When writing or reading a message in Kafka, specify which "topic" you are to read from. You can think of this like a channel in slack, you join the ones you want to post and read messages to. Each topic then has a list of offsets that informs you where you are in the number of messages you have read/have left to read.

[A more full dive into Kafka][2] as well as on [a Datadog Blogpost][3].

## Datadog Kafka Integrations:

It is important to note that Datadog has two distinct Kafka Integrations. The first is named [Kafka][4] while the second is [Kafka_Consumer][4].

The [Kafka Integration][4] uses [Datadog's JMXFetch][5] application to pull metrics, just like our other Java based applications such as Cassandra, JMX, Tomcat, etc. This pulls metrics through the use of mBeans, where the engineering team has included a list of commonly used mBeans in the Kafka.yaml file. This can be extended with any other beans the user would like, or if your version of Kafka supports additional metrics.

The [Kafka_Consumer Integration][6] collects metrics like our standard Python based checks. This uses an internal Zookeeper API. Zookeeper is an Apache application that is responsible for managing the configuration for the cluster of nodes known as the Kafka broker. (In version 0.9 of Kafka things are a bit different, Zookeeper is no longer required, see the Troubleshooting section for more information). This check picks up only three metrics, and these do not come from JMXFetch.

## Troubleshooting:

There are a few common issues you may face when it comes to the Kafka Integration. Here is a common list of issues that could be affecting users.

1. This first troubleshooting issue only applies if you are running version *<5.20* of the [Datadog Agent][7]. In older versions of Kafka, consumer offsets were stored in Zookeper exclusively. The initial Kafka_consumer check was written when this limitation was in place. Due to this, you cannot get the `kafka.consumer_lag` metric if your offsets are stored in Kafka and you are using an older version of the Agent. Upgrade the Agent to the latest version to see these metrics.

2. The second most common issue is the following error for the Kafka Integration:
```
instance #kafka-localhost-<PORT_NUM> [ERROR]: 'Cannot connect to instance localhost:<PORT_NUM>. java.io.IOException: Failed to retrieve RMIServer stub
```
This error essentially means that the Datadog Agent is unable to connect to the Kafka instance to retrieve metrics from the exposed mBeans over the RMI protocol.
This error can be resolved by including the following JVM (Java Virtual Machine) arguments when starting the Kafka instance (required for Producer, Consumer, and Broker as they are all separate Java instances)
```
-Dcom.sun.management.jmxremote.port=<PORT_NUM> -Dcom.sun.management.jmxremote.rmi.port=<PORT_NUM>
```

3. The next issue is one that affects the Kafka Integration. The issue is that people may not be seeing Consumer and Producer metrics in your account. By default we only collect broker based metrics.
Additionally, there are cases where users are using custom Producer and Consumer clients that are not written in Java and/or not exposing mBeans, so having this enabled would still collect zero metrics. To start pulling in metrics, if you're running Java based Producers and Consumers, you can uncomment this section of the yaml file and point the Agent to the proper ports:
```
# - host: remotehost
    # port: 9998 # Producer
    # tags:
    # kafka: producer0
    # env: stage
    # newTag: test
    # - host: remotehost
    # port: 9997 # Consumer
    # tags:
    # kafka: consumer0
    # env: stage
    # newTag: test
```
if you are running Producers and Consumers from other languages, this isn't an option, and you have to use another way to submit these metrics from your code, for instance through dogstatsd.

4. This issue is specifically for the Kafka_Consumer check. If you specify a partition in your `Kafka_Consumer.yaml` file that doesn't exist in your environment, you see the following error in `info.log`:
```
instance - #0 [Error]: ''
```
The solution here would be to only specify the specific partition for your topic. This correlates to this specific line:
```
#my_topic [0, 1, 4, 12]
```

5. Partition Context Limitation: the number of partition contexts collection is limited to 200. If you require more contexts, [contact the Datadog support team][8].

[1]: https://kafka.apache.org
[2]: https://sookocheff.com/post/kafka/kafka-in-a-nutshell
[3]: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
[4]: /integrations/kafka
[5]: https://github.com/DataDog/jmxfetch
[6]: /integrations/kafka/#agent-check-kafka-consumer
[7]: /agent
[8]: /help
