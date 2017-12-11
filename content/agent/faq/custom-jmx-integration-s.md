---
title: Custom JMX Integration(s)
kind: faq
customnav: agentnav
---

Java Management Extension (JMX) is the de facto method for emitting performance metrics and other stats from Java based applications, Datadog takes advantage of JMX for a number of applications today such as Cassandra, Kafka and more.

If you're interested in monitoring an application that Datadog doesn't currently provide an integration for and it's possible to query via JMX, you can use our existing integrations as examples to help get you started:

* [Tomcat](https://github.com/DataDog/integrations-core/blob/master/tomcat/conf.yaml.example)
* [ActiveMQ](https://github.com/DataDog/integrations-core/blob/master/activemq/conf.yaml.example)
* [Kafka](https://github.com/DataDog/integrations-core/blob/master/kafka/conf.yaml.example )

Each of the aforementioned integrations are nearly identical, the most noticeable differences are the port and the mbeans (management beans), you can see these here:

* https://github.com/DBLaw/dd-agent/blob/master/conf.d/tomcat.yaml.example#L19
* https://github.com/DBLaw/dd-agent/blob/master/conf.d/activemq.yaml.example#L19

Prior to getting started with Datadog verify communication using something like [JConsole](http://en.wikipedia.org/wiki/JConsole) to verify JMX is enabled and that you can list the beans you're planning to collect. Essentially, the JMX Integration will act as a filter to match on the mbeans you've listed in your YAML, if it doesn't match 1:1 (wildcards aren't currently supported) it will not be collected.