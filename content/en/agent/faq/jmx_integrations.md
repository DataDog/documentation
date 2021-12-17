---
title: Which Integrations use Jmxfetch?
kind: faq
---

## Default integrations

The following integrations use [jmxfetch](https://github.com/DataDog/jmxfetch) and are included by default in the Datadog Agent:
* [ActiveMQ](https://docs.datadoghq.com/integrations/activemq/)
* [Cassandra](https://docs.datadoghq.com/integrations/cassandra/)
* [Confluent Platform](https://docs.datadoghq.com/integrations/confluent_platform/)
* [Hazelcast](https://docs.datadoghq.com/integrations/hazelcast/)
* [Hive](https://docs.datadoghq.com/integrations/hive/)
* [HiveMQ](https://docs.datadoghq.com/integrations/hivemq/)
* [Hudi](https://docs.datadoghq.com/integrations/hudi/)
* [ignite](https://docs.datadoghq.com/integrations/ignite/)
* [Java/JMX](https://docs.datadoghq.com/integrations/java)
* [JBoss/WildFly](https://docs.datadoghq.com/integrations/jboss_wildfly/)
* [Kafka](https://docs.datadoghq.com/integrations/kafka/)
* [Presto](https://docs.datadoghq.com/integrations/presto/)
* [Solr](https://docs.datadoghq.com/integrations/solr/)
* [SonarQube](https://docs.datadoghq.com/integrations/sonarqube/)
* [Tomcat](https://docs.datadoghq.com/integrations/tomcat/)

**Note**: These integrations do **not** run by default. Each integration must be confugured to run on a host.

## Community integrations

The following [Community Integrations](/agent/guide/use-community-integrations/?tab=agentv721v621) use jmxfetch and are **not** included by default in the Datadog Agent. 
* [nextcloud](https://github.com/DataDog/integrations-extras/tree/master/nextcloud)
* [flume](https://github.com/DataDog/integrations-extras/tree/master/flume)
* [stardog](https://github.com/DataDog/integrations-extras/tree/master/stardog)
* [hbase_regionserver](https://github.com/DataDog/integrations-extras/tree/master/hbase_regionserver)
* [eventstore](https://github.com/DataDog/integrations-extras/tree/master/eventstore)
* [riak_repl](https://github.com/DataDog/integrations-extras/tree/master/riak_repl)
* [aqua](https://github.com/DataDog/integrations-extras/tree/master/aqua)
* [snmpwalk](https://github.com/DataDog/integrations-extras/tree/master/snmpwalk)
* [resin](https://github.com/DataDog/integrations-extras/tree/master/resin)
* [zabbix](https://github.com/DataDog/integrations-extras/tree/master/zabbix)
* [hbase_master](https://github.com/DataDog/integrations-extras/tree/master/hbase_master)
* [neutrona](https://github.com/DataDog/integrations-extras/tree/master/neutrona)

**Note**: These integrations do **not** run by default. Each integration must be installed and confugured to run on a host.

## Custom checks

Datadog users can monitor any Java Application by configuring the [Java/JMX](https://docs.datadoghq.com/integrations/java) check.
