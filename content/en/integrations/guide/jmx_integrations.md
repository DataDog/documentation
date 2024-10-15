---
title: Which Integrations use Jmxfetch?

further_reading:
- link: "/agent/faq/log4j_mitigation/"
  tag: "Documentation"
  text: "Mitigating the Risk of Remote Code Execution Due to Log4Shell"
---

## Default integrations

The following integrations use [JMXFetch][1] and are included by default in the Datadog Agent:

* [ActiveMQ][2]
* [Cassandra][3]
* [Confluent Platform][4]
* [Hazelcast][5]
* [Hive][6]
* [HiveMQ][7]
* [Hudi][8]
* [ignite][9]
* [Java/JMX][10]
* [JBoss/WildFly][11]
* [Kafka][12]
* [Presto][13]
* [Solr][14]
* [SonarQube][15]
* [Tomcat][16]

**Note**: These integrations do **not** run by default. Each integration must be configured to run on a host.

## Community integrations

The following [Community Integrations][17] use jmxfetch and are **not** included by default in the Datadog Agent:

* [nextcloud][18]
* [flume][19]
* [stardog][20]
* [hbase_regionserver][21]
* [eventstore][22]
* [riak_repl][23]
* [aqua][24]
* [snmpwalk][25]
* [resin][26]
* [zabbix][27]
* [hbase_master][28]
* [neutrona][29]

**Note**: These integrations do **not** run by default. Each integration must be installed and configured to run on a host.

## Custom checks

Datadog users can monitor any Java Application by configuring the [Java/JMX][10] check. The name of these checks is determined by the user who creates the check.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/jmxfetch
[2]: https://docs.datadoghq.com/integrations/activemq/
[3]: https://docs.datadoghq.com/integrations/cassandra/
[4]: https://docs.datadoghq.com/integrations/confluent_platform/
[5]: https://docs.datadoghq.com/integrations/hazelcast/
[6]: https://docs.datadoghq.com/integrations/hive/
[7]: https://docs.datadoghq.com/integrations/hivemq/
[8]: https://docs.datadoghq.com/integrations/hudi/
[9]: https://docs.datadoghq.com/integrations/ignite/
[10]: https://docs.datadoghq.com/integrations/java
[11]: https://docs.datadoghq.com/integrations/jboss_wildfly/
[12]: https://docs.datadoghq.com/integrations/kafka/
[13]: https://docs.datadoghq.com/integrations/presto/
[14]: https://docs.datadoghq.com/integrations/solr/
[15]: https://docs.datadoghq.com/integrations/sonarqube/
[16]: https://docs.datadoghq.com/integrations/tomcat/
[17]: /agent/guide/use-community-integrations/?tab=agentv721v621
[18]: https://github.com/DataDog/integrations-extras/tree/master/nextcloud
[19]: https://github.com/DataDog/integrations-extras/tree/master/flume
[20]: https://github.com/DataDog/integrations-extras/tree/master/stardog
[21]: https://github.com/DataDog/integrations-extras/tree/master/hbase_regionserver
[22]: https://github.com/DataDog/integrations-extras/tree/master/eventstore
[23]: https://github.com/DataDog/integrations-extras/tree/master/riak_repl
[24]: https://github.com/DataDog/integrations-extras/tree/master/aqua
[25]: https://github.com/DataDog/integrations-extras/tree/master/snmpwalk
[26]: https://github.com/DataDog/integrations-extras/tree/master/resin
[27]: https://github.com/DataDog/integrations-extras/tree/master/zabbix
[28]: https://github.com/DataDog/integrations-extras/tree/master/hbase_master
[29]: https://github.com/DataDog/integrations-extras/tree/master/neutrona
