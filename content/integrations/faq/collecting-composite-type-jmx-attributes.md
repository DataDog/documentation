---
title: Collecting Composite type JMX attributes
kind: faq
---

## JMXFetch

In the Agent, the yaml files for the following integrations are all read by JMXFetch:

* Active MQ
* Cassandra
* Java
* Solr
* Tomcat

This file can be found here: [JMXFetch.py][1]

## JMXFetch 'Simple' vs 'Composite' attributes

There are two kinds of JMX attributes that JMXFetch is able to collect:

### 'Simple attributes'

These are integer, float, double, long, boolean etc ...

Note: Boolean values of true result in 1 and false in 0. [Check the list of supported types][2]

You can use the `list` commands found here in order to get an idea of what your current JMX integration is collecting. Here is a snippet of that output showing a Simple attribute.
```
Matching: x/350. Bean name: domain:mybeanname - Attribute name: myattribute - Attribute type: java.lang.Integer
```
JMXFetch extracts the attribute value directly and use it as the metric value.

### 'Composite' attributes

These can be seen as an array, a hashmap or an object composed of 'simple attributes'.

Matching: x/350. Bean name: domain:mybeanname - Attribute name: myattribute - Attribute type: javax.management.openmbean.CompositeData
In this case, we need to give more details to JMXFetch on how to use this 'composite' attribute to create a numerical value for a metric. In order to do this, you can use a . to specify the component, i.e.:

`myattribute.component`

In the YAML configuration file [is an example with java.lang HeapMemoryUsage composite attribute][3].

### How can I get to see the next level of these composite attributes?

The best way to achieve this would be using JMXterm (see below). Note, for all versions of **Agent v6**, the `jmxterm` JAR is not shipped with the Agent. To download and use `jmxterm`, see the [upstream project][4].

```
java -jar /opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar -l localhost:PORT -u USER -p PASSWORD
```

Then use the get command to pull up a specific metric.

[1]: https://github.com/DataDog/dd-agent/blob/master/jmxfetch.py
[2]: https://github.com/DataDog/jmxfetch/blob/master/src/main/java/org/datadog/jmxfetch/Instance.java#L23-L27
[3]: https://github.com/DataDog/jmxfetch/blob/master/src/main/resources/jmx-2.yaml#L3-L14
[4]: https://github.com/jiaqi/jmxterm
