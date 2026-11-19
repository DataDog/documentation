---
further_reading:
- link: https://learn.datadoghq.com/courses/monitor-a-kafka-pipeline-with-dsm
  tag: Centre d'apprentissage
  text: Surveiller un pipeline Kafka avec Data Streams Monitoring
title: Data Streams Monitoring pour Kafka
---
### Prérequis {#prerequisites}

-   [Datadog Agent v7.34.0 ou version ultérieure][1]

<table>
  <thead>
    <tr>
      <th>Langue</th>
      <th>Bibliothèque</th>
      <th>Version minimale du traceur</th>
      <th>Version recommandée du traceur</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/data_streams/java">Java</a></td>
      <td><a href="https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients">kafka-clients</a> (La génération du lag n’est pas prise en charge pour v3.7*)</td>
      <td>{{< dsm-tracer-version lang="java" lib="kafka-clients" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="java" lib="kafka-clients" type="recommended" >}}</td>
    </tr>
    <tr>
      <td rowspan="3"><a href="/data_streams/go">Go</a></td>
      <td><a href="https://github.com/confluentinc/confluent-kafka-go">confluent-kafka-go</a></td>
      <td>{{< dsm-tracer-version lang="go" lib="confluent-kafka-go" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="go" lib="confluent-kafka-go" type="recommended" >}}</td>
    </tr>
    <tr>
      <td><a href="https://github.com/IBM/sarama">Sarama</a></td>
      <td>{{< dsm-tracer-version lang="go" lib="sarama" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="go" lib="sarama" type="recommended" >}}</td>
    </tr>
    <tr>
      <td><a href="https://github.com/segmentio/kafka-go">kafka-go</a></td>
      <td>{{< dsm-tracer-version lang="go" lib="kafka-go" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="go" lib="kafka-go" type="recommended" >}}</td>
    </tr>
    <tr>
      <td rowspan="2"><a href="/data_streams/nodejs">Node.js</a></td>
      <td><a href="https://www.npmjs.com/package/kafkajs">kafkajs</a></td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="kafkajs" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="nodejs" lib="kafkajs" type="recommended" >}}</td>
    </tr>
    <tr><td><a href="https://github.com/confluentinc/confluent-kafka-javascript">confluent-kafka-javascript</a></td>
    <td>{{< dsm-tracer-version lang="nodejs" lib="confluent-kafka-javascript" type="minimal" >}}</td>
    <td>{{< dsm-tracer-version lang="nodejs" lib="confluent-kafka-javascript" type="recommended" >}}</td>
    </tr>
    <tr>
      <td rowspan="2"><a href="/python">Python</a></td>
      <td><a href="https://pypi.org/project/confluent-kafka/">confluent-kafka</a></td>
      <td>{{< dsm-tracer-version lang="python" lib="confluent-kafka" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="python" lib="confluent-kafka" type="recommended" >}}</td>
    </tr>
    <tr>
      <td><a href="https://pypi.org/project/aiokafka/">aiokafka</a></td>
      <td>{{< dsm-tracer-version lang="python" lib="aiokafka" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="python" lib="aiokafka" type="recommended" >}}</td>
    </tr>
    <tr>
      <td><a href="/data_streams/dotnet">.NET</a></td>
      <td><a href="https://www.nuget.org/packages/Confluent.Kafka">Confluent.Kafka</a></td>
      <td>{{< dsm-tracer-version lang="dotnet" lib="confluent-kafka" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="dotnet" lib="confluent-kafka" type="recommended" >}}</td>
    </tr>
    <tr>
      <td rowspan="2"><a href="/data_streams/Ruby">Ruby</a></td>
      <td><a href="https://github.com/zendesk/ruby-kafka">Ruby Kafka</a></td>
      <td>{{< dsm-tracer-version lang="ruby" lib="ruby-kafka" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="ruby" lib="ruby-kafka" type="recommended" >}}</td>
    </tr>
        <tr>
      <td><a href="https://karafka.io/docs/">Karafka</a></td>
      <td>{{< dsm-tracer-version lang="ruby" lib="karafka" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="ruby" lib="karafka" type="recommended" >}}</td>
    </tr>
    <tr>
      <td><a href="/data_streams/php">PHP</a></td>
      <td><a href="https://github.com/arnaud-lb/php-rdkafka">php-rdkafka</a></td>
      <td>{{< dsm-tracer-version lang="php" lib="php-rdkafka" type="minimal" >}}</td>
      <td>{{< dsm-tracer-version lang="php" lib="php-rdkafka" type="recommended" >}}</td>
    </tr>
  </tbody>
</table>

*Spring Boot 3.3.x et spring-kafka 3.2.x utilisent kafka-clients 3.7.x, qui ne prend pas en charge la génération de lag. Pour résoudre ce problème, <a href="https://docs.spring.io/spring-kafka/reference/appendix/override-boot-dependencies.html">mettez à jour votre version de kafka-clients</a> vers 3.8.0 ou une version ultérieure.</span>

<div class="alert alert-info"><a href="https://kafka.apache.org/documentation/streams/">Kafka Streams</a> est partiellement pris en charge pour Java et peut entraîner la perte de mesures de latence.</div>

### Déploiements Kafka pris en charge {#supported-kafka-deployments}

L'instrumentation de vos consommateurs et producteurs avec Data Streams Monitoring vous permet de visualiser votre topologie et de suivre vos Pipelines avec des [métriques prêtes à l'emploi][7], indépendamment de la manière dont Kafka est déployé. De plus, les déploiements Kafka suivants bénéficient d'une prise en charge d'intégration supplémentaire, offrant davantage d'informations sur l'état de santé de votre cluster Kafka :

| Modèle              | Intégration                                 |
| ------------------ | ------------------------------------------- |
| Auto-hébergé        | [Kafka Broker][8] & [Kafka Consumer][13]    |
| Confluent Platform | [Confluent Platform][11]                    |
| Confluent Cloud    | [Confluent Cloud][12]                       |
| Amazon MSK         | [Amazon MSK][10] ou [Amazon MSK (Agent)][9] |
| Red Panda          | Pas encore intégré                          |

### Configuration de Data Streams Monitoring {#setting-up-data-streams-monitoring}

Consultez les instructions de configuration pour [Java][2], [Go][3], [Node.js][4], [Python][5], [.NET][6], [Ruby][14] ou [PHP][17].

{{% data_streams/monitoring-kafka-pipelines %}}

### Surveillance des connecteurs {#monitoring-connectors}

#### Connecteurs Confluent Cloud {#confluent-cloud-connectors}
{{% data_streams/dsm-confluent-connectors %}}

#### Connecteurs Kafka auto-hébergés {#self-hosted-kafka-connectors}

_Prérequis_ : [`dd-trace-java` v1.44.0+][15]

<div class="alert alert-info">Cette fonctionnalité est en préversion.</div>

Data Streams Monitoring peut collecter des informations à partir de vos connecteurs Kafka auto-hébergés. Dans Datadog, ces connecteurs sont affichés en tant que services connectés aux topics Kafka. Datadog collecte le débit vers et depuis tous les topics Kafka. Datadog ne collecte pas le statut des connecteurs ni les sinks et sources des connecteurs Kafka auto-hébergés.

##### Configuration {#setup}

1. Assurez-vous que Datadog Agent est en cours d'exécution sur vos workers Kafka Connect.
2. Assurez-vous que [`dd-trace-java`][16] est installé sur vos workers Kafka Connect.
3. Modifiez vos options Java pour inclure `dd-trace-java` sur vos workers Kafka Connect. Par exemple, sur Strimzi, modifiez `STRIMZI_JAVA_OPTS` pour ajouter `-javaagent:/path/to/dd-java-agent.jar`.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent
[2]: /fr/data_streams/setup/language/java
[3]: /fr/data_streams/setup/language/go
[4]: /fr/data_streams/setup/language/nodejs
[5]: /fr/data_streams/setup/language/python
[6]: /fr/data_streams/setup/language/dotnet
[7]: /fr/data_streams/#measure-end-to-end-pipeline-health-with-new-metrics
[8]: /fr/integrations/kafka/?tab=host
[9]: /fr/integrations/amazon_msk/
[10]: /fr/integrations/amazon_msk_cloud/
[11]: /fr/integrations/confluent_platform/
[12]: /fr/integrations/confluent_cloud/
[13]: /fr/integrations/kafka/?tab=host#kafka-consumer-integration
[14]: /fr/data_streams/setup/language/ruby
[15]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.44.0
[16]: https://github.com/DataDog/dd-trace-java
[17]: /fr/data_streams/setup/language/php