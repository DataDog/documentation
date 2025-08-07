---
further_reading:
- link: /agent/faq/log4j_mitigation/
  tag: 설명서
  text: Log4Shell로 인한 원격 코드 실행 위험 완화
title: 어떤 통합에서 Jmxfetch를 사용합니까?
---

## 기본 통합

다음 통합은 [JMXFetch][1]를 사용하며 Datadog Agent에 기본으로 포함됩니다.

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

**참고**: 이러한 통합은 기본값으로 실행되지 **않습니다**. 각 통합은 호스트에서 실행되도록 설정해야 합니다.

## 커뮤니티 통합

다음 [커뮤니티 통합][17]은 jmxfetch를 사용하며 Datadog Agent에 기본으로 포함되지 **않습니다**.

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

**참고**: 이러한 통합은 기본값으로 실행되지 **않습니다**. 각 통합은 호스트에서 설치하고 실행되도록 설정해야 합니다.

## 커스텀 점검

Datadog 사용자는 [Java/JMX][10] 점검을 설정하여 모든 Java 애플리케이션을 모니터링할 수 있습니다. 이 점검의 이름은 해당 점검을 생성하는 사용자가 결정합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/jmxfetch
[2]: https://docs.datadoghq.com/ko/integrations/activemq/
[3]: https://docs.datadoghq.com/ko/integrations/cassandra/
[4]: https://docs.datadoghq.com/ko/integrations/confluent_platform/
[5]: https://docs.datadoghq.com/ko/integrations/hazelcast/
[6]: https://docs.datadoghq.com/ko/integrations/hive/
[7]: https://docs.datadoghq.com/ko/integrations/hivemq/
[8]: https://docs.datadoghq.com/ko/integrations/hudi/
[9]: https://docs.datadoghq.com/ko/integrations/ignite/
[10]: https://docs.datadoghq.com/ko/integrations/java
[11]: https://docs.datadoghq.com/ko/integrations/jboss_wildfly/
[12]: https://docs.datadoghq.com/ko/integrations/kafka/
[13]: https://docs.datadoghq.com/ko/integrations/presto/
[14]: https://docs.datadoghq.com/ko/integrations/solr/
[15]: https://docs.datadoghq.com/ko/integrations/sonarqube/
[16]: https://docs.datadoghq.com/ko/integrations/tomcat/
[17]: /ko/agent/guide/use-community-integrations/?tab=agentv721v621
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