---
further_reading:
- link: /agent/faq/log4j_mitigation/
  tag: Documentation
  text: Log4Shell によるリモートコード実行リスクの軽減
title: どのインテグレーションで Jmxfetch が使われていますか？
---

## デフォルトのインテグレーション

以下のインテグレーションは [JMXFetch][1] を使用しており、Datadog Agent にデフォルトで含まれています。

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

**注**: これらのインテグレーションは、デフォルトでは実行されません。各インテグレーションは、ホスト上で実行されるように構成する必要があります。

## コミュニティのインテグレーション

以下の[コミュニティインテグレーション][17]は jmxfetch を使用しており、Datadog Agent にデフォルトで**含まれていません**。

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

**注**: これらのインテグレーションは、デフォルトでは実行されません。各インテグレーションは、ホスト上で実行されるようにインストール、構成する必要があります。

## カスタムチェック

Datadog ユーザーは、[Java/JMX][10] チェックを構成することで、あらゆる Java アプリケーションを監視することができます。これらのチェックの名前は、チェックを作成するユーザーによって決定されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/jmxfetch
[2]: https://docs.datadoghq.com/ja/integrations/activemq/
[3]: https://docs.datadoghq.com/ja/integrations/cassandra/
[4]: https://docs.datadoghq.com/ja/integrations/confluent_platform/
[5]: https://docs.datadoghq.com/ja/integrations/hazelcast/
[6]: https://docs.datadoghq.com/ja/integrations/hive/
[7]: https://docs.datadoghq.com/ja/integrations/hivemq/
[8]: https://docs.datadoghq.com/ja/integrations/hudi/
[9]: https://docs.datadoghq.com/ja/integrations/ignite/
[10]: https://docs.datadoghq.com/ja/integrations/java
[11]: https://docs.datadoghq.com/ja/integrations/jboss_wildfly/
[12]: https://docs.datadoghq.com/ja/integrations/kafka/
[13]: https://docs.datadoghq.com/ja/integrations/presto/
[14]: https://docs.datadoghq.com/ja/integrations/solr/
[15]: https://docs.datadoghq.com/ja/integrations/sonarqube/
[16]: https://docs.datadoghq.com/ja/integrations/tomcat/
[17]: /ja/agent/guide/use-community-integrations/?tab=agentv721v621
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