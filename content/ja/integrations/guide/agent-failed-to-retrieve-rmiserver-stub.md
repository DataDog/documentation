---
title: Agent failed to retrieve RMIServer stub
kind: faq
---

```text
instance #kafka-localhost-<PORT_NUM> [ERROR]: 'Cannot connect to instance localhost:<PORT_NUM>. java.io.IOException: Failed to retrieve RMIServer stub
```

The Datadog Agent is unable to connect to the Kafka instance to retrieve metrics from the exposed mBeans over the RMI protocol.

Include the following JVM arguments when starting the Kafka instance to solve resolve this issue *(required for Producer, Consumer, and Broker as they are all separate Java instances)*

```text
-Dcom.sun.management.jmxremote.port=<PORT_NUM> -Dcom.sun.management.jmxremote.rmi.port=<PORT_NUM>
```
