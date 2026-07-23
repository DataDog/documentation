---
further_reading:
- link: /agent/faq/log4j_mitigation/
  tag: Documentation
  text: Réduire les risques d'exécution de code à distance via la faille de sécurité
    Log4Shell

title: Quelles intégrations utilisent Jmxfetch ?
---

## Intégrations par défaut

Les intégrations suivantes utilisent [JMXFetch][1] et sont incluses par défaut dans l'Agent Datadog :

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

**Remarque** : ces intégrations ne sont **pas** exécutées par défaut. Chaque intégration doit être configurée pour être exécutée sur un host.

## Intégrations de la communauté

Les [intégrations développées par la communauté][17] suivantes utilisent JMXFetch et ne sont **pas** incluses par défaut dans l'Agent Datadog :

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

**Remarque** : ces intégrations ne sont **pas** exécutées par défaut. Chaque intégration doit être installée et configurée pour être exécutée sur un host.

## Checks custom

Les utilisateurs de Datadog peuvent surveiller n'importe quelle application Java en configurant le check [Java/JMX][10]. Le nom de chacun de ces checks est choisi par son auteur.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/jmxfetch
[2]: https://docs.datadoghq.com/fr/integrations/activemq/
[3]: https://docs.datadoghq.com/fr/integrations/cassandra/
[4]: https://docs.datadoghq.com/fr/integrations/confluent_platform/
[5]: https://docs.datadoghq.com/fr/integrations/hazelcast/
[6]: https://docs.datadoghq.com/fr/integrations/hive/
[7]: https://docs.datadoghq.com/fr/integrations/hivemq/
[8]: https://docs.datadoghq.com/fr/integrations/hudi/
[9]: https://docs.datadoghq.com/fr/integrations/ignite/
[10]: https://docs.datadoghq.com/fr/integrations/java
[11]: https://docs.datadoghq.com/fr/integrations/jboss_wildfly/
[12]: https://docs.datadoghq.com/fr/integrations/kafka/
[13]: https://docs.datadoghq.com/fr/integrations/presto/
[14]: https://docs.datadoghq.com/fr/integrations/solr/
[15]: https://docs.datadoghq.com/fr/integrations/sonarqube/
[16]: https://docs.datadoghq.com/fr/integrations/tomcat/
[17]: /fr/agent/guide/use-community-integrations/?tab=agentv721v621
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