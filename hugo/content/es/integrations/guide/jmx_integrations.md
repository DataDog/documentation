---
further_reading:
- link: /agent/faq/log4j_mitigation/
  tag: Documentación
  text: Mitigar el riesgo de ejecución remota de código debido a Log4Shell
title: ¿Qué integraciones usan Jmxfetch?
---

## Integraciones predeterminadas

Las siguientes integraciones utilizan [JMXFetch][1] y se incluyen por defecto en el Datadog Agent:

* [ActiveMQ][2]
* [Cassandra][3]
* [Plataforma Confluent][4]
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

**Nota: Estas integraciones **no** se ejecutan por defecto. Cada integración debe configurarse para ejecutarse en un host.

## Integraciones de la comunidad

Las siguientes [integraciones de la comunidad][17] utilizan jmxfetch y **no** están incluidas por defecto en el Datadog Agent:

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

**Nota: Estas integraciones **no** se ejecutan por defecto. Cada integración debe instalarse y configurarse para ejecutarse en un host.

## Checks personalizados

Los usuarios de Datadog pueden monitorizar cualquier aplicación Java configurando el check de [Java/JMX][10]. El nombre de estos checks lo determina el usuario que crea el check.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/jmxfetch
[2]: https://docs.datadoghq.com/es/integrations/activemq/
[3]: https://docs.datadoghq.com/es/integrations/cassandra/
[4]: https://docs.datadoghq.com/es/integrations/confluent_platform/
[5]: https://docs.datadoghq.com/es/integrations/hazelcast/
[6]: https://docs.datadoghq.com/es/integrations/hive/
[7]: https://docs.datadoghq.com/es/integrations/hivemq/
[8]: https://docs.datadoghq.com/es/integrations/hudi/
[9]: https://docs.datadoghq.com/es/integrations/ignite/
[10]: https://docs.datadoghq.com/es/integrations/java
[11]: https://docs.datadoghq.com/es/integrations/jboss_wildfly/
[12]: https://docs.datadoghq.com/es/integrations/kafka/
[13]: https://docs.datadoghq.com/es/integrations/presto/
[14]: https://docs.datadoghq.com/es/integrations/solr/
[15]: https://docs.datadoghq.com/es/integrations/sonarqube/
[16]: https://docs.datadoghq.com/es/integrations/tomcat/
[17]: /es/agent/guide/use-community-integrations/?tab=agentv721v621
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