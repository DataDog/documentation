---
title: Collecting Composite type JMX attributes
kind: guide
aliases:
  - /integrations/faq/collecting-composite-type-jmx-attributes/
---

## JMXFetch

Agent では、以下の統合のための yaml ファイルがすべて JMXFetch によって読み込まれます。

* [Active MQ][1]
* [Cassandra][2]
* [Java][3]
* [Solr][4]
* [Tomcat][5]

## JMXFetch の属性

JMXFetchが収集できるJMX属性には2種類あります（simpleとcomposite）。

### Simple attributes

These are `integer`, `float`, `double`, `long`, `boolean` etc ...

**Note**: Boolean values of true result in 1 and false in 0. [Check the list of supported types][6]

You can use the `list` commands in order to get an idea of what your current JMX integration is collecting. Here is a snippet of that output showing a Simple attribute:

```text
Matching: x/350. Bean name: java.lang - Attribute name: attribute_1 - Attribute type: java.lang.Integer
```

That would give you the following configuration:

```yaml
- include:
     domain: java.lang
     attribute:
       attribute_1:
         metric_type: counter
         alias: java.lang.Integer
```

JMXFetch extracts the attribute value directly and use it as the metric value. See [the JMX documentation][3] to learn how to collect it.

### Composite attributes

These can be seen as an array, a hashmap, or an object composed of 'simple' attributes.

```text
Matching: x/350. Bean name: java.lang - Attribute name: HeapMemoryUsage - Attribute type: javax.management.openmbean.CompositeData
```

In this case, you need to add more details to JMXFetch on how to use this 'composite' attribute to create a numerical value for a metric.

To do this, use a `.` to specify the component:

```yaml
- include:
    domain: java.lang
    type: Memory
    attribute:
      HeapMemoryUsage.used:
        alias: jvm.heap_memory
        metric_type: gauge
      HeapMemoryUsage.committed:
        alias: jvm.heap_memory_committed
        metric_type: gauge

      # (...)
```

### How can I get to see the next level of these composite attributes?

The best way to achieve this would be using JMXterm (see below).

```text
java -jar /opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar -l localhost:<PORT> -u <USER> -p <PASSWORD>
```

Note, for all versions of **Agent v5.32.8 or greater**, the `jmxterm` JAR is not shipped with the Agent. To download and use `jmxterm`, see the [upstream project][7].

Then use the get command to pull up a specific metric.

[1]: /integrations/activemq/
[2]: /integrations/cassandra/
[3]: /integrations/java/
[4]: /integrations/solr/
[5]: /integrations/tomcat/
[6]: https://github.com/DataDog/jmxfetch/blob/master/src/main/java/org/datadog/jmxfetch/Instance.java#L23-L27
[7]: https://github.com/jiaqi/jmxterm
