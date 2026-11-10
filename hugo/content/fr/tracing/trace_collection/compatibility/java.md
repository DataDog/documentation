---
aliases:
- /fr/tracing/compatibility_requirements/
- /fr/tracing/compatibility_requirements/java
- /fr/tracing/setup_overview/compatibility_requirements/java
code_lang: java
code_lang_weight: 0
description: Exigences de compatibilité pour le traceur Java
further_reading:
- link: tracing/trace_collection/dd_libraries/java
  tag: Documentation
  text: Instrumenter votre application
title: Exigences de compatibilité Java
type: multi-code-lang
---
## Compatibilité {#compatibility}

La bibliothèque Java Datadog Trace est open source. Consultez le [référentiel GitHub][1] pour en savoir plus.

### Environnements d'exécution Java {#supported-java-runtimes}

Le Java Tracer prend en charge l'instrumentation automatique pour les environnements d'exécution Oracle JDK, OpenJDK JVM et [GraalVM](#graalvm-native-image-support) suivants.

#### Java Tracer v1 (dernière version) {#java-tracer-v1-latest}

<table>
  <thead>
    <th>Versions Java</th>
    <th>Systèmes d'exploitation</th>
    <th>Niveau de prise en charge</th>
  </thead>
  <tr>
    <td>à partir de 28</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64, arm64)<br>Mac (x86, x86-64, arm64)</td>
    <td><a href="#levels-of-support">Preview</a></td>
  </tr>
  <tr>
    <td>de 18 à 27</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64, arm64)<br>Mac (x86, x86-64, arm64)</td>
    <td><a href="#levels-of-support">GA</a></td>
  </tr>
  <tr>
    <td rowspan="2">de 8 à 17</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64)<br>Mac (x86, x86-64)</td>
    <td><a href="#levels-of-support">GA</a></td>
  </tr>
  <tr>
    <td>Linux (arm64)<br>Mac (arm64)</td>
    <td><a href="#levels-of-support">Preview</a></td>
  </tr>
</table>

Datadog ne prend pas officiellement en charge les versions de Java en accès anticipé.

#### Java Tracer v0 {#java-tracer-v0}

| Versions Java      | Systèmes d'exploitation                                                               | Niveau de prise en charge                     |
|--------------------|---------------------------------------------------------------------------------|-----------------------------------|
| 7 uniquement             | Windows (x86, x86-64)<br>Linux (x86, x86-64)<br>Mac (x86, x86-64)               | [Fin de vie](#levels-of-support) |
| 7 uniquement             | Linux (arm64)<br>Mac (arm64)                                                    | [Fin de vie](#levels-of-support) |

### Niveaux de prise en charge {#levels-of-support}

| **Niveau**                                              | **Prise en charge fournie**                                                                                                                                |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Non pris en charge</span>      |  Aucune implémentation. Contactez le [support Datadog][2] pour les demandes spéciales.                                                                              |
| <span id="support-beta">Preview</span>                 |  Implémentation initiale. Peut ne pas encore contenir toutes les fonctionnalités. La prise en charge des nouvelles fonctionnalités ainsi que des correctifs de bugs et de sécurité est assurée dans la mesure du possible. |
| <span id="support-ga">Disponibilité générale (GA)</span> |  Implémentation complète de toutes les fonctionnalités. Prise en charge complète des nouvelles fonctionnalités ainsi que des correctifs de bugs et de sécurité.                                                     |
| <span id="support-maintenance">Maintenance</span>      |  Implémentation complète des fonctionnalités existantes. Ne reçoit pas de nouvelles fonctionnalités. Prise en charge des correctifs de bugs et de sécurité uniquement.                                  |
| <span id="support-eol">Fin de vie (EOL)</span>        |  Aucune prise en charge.                                                                                                                                        |

## Intégrations {#integrations}

Les intégrations en Preview sont désactivées par défaut, mais peuvent être activées individuellement :

- Propriété système : `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- Variable d'environnement : `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

### Compatibilité avec les frameworks web {#web-framework-compatibility}

`dd-java-agent` inclut la prise en charge du traçage automatique des frameworks web suivants.

**Le traçage des frameworks web fournit :**

- mesure du temps écoulé entre la requête HTTP et la réponse
- tags pour la requête HTTP (code d'état, méthode, etc.)
- la capture des erreurs et des traces de pile
- liaison des opérations effectuées dans le cadre d'une requête web à Distributed Tracing

| Serveur                  | Versions     | Type de support                                           | Noms d'instrumentation (utilisés pour la configuration)             |
|-------------------------|--------------|--------------------------------------------------------|------------------------------------------------------------|
| Akka-Http Server        | 10.0+        | Entièrement pris en charge                                        | `akka-http`, `akka-http-server`                            |
| Apache Pekko            | 1.0+         | Entièrement pris en charge                                        | `pekko-http`, `pekko-http-server`                          |
| Finatra Web             | 2.9+         | Entièrement pris en charge                                        | `finatra`                                                  |
| Grizzly                 | 2.0+         | Entièrement pris en charge                                        | `grizzly`                                                  |
| Grizzly-HTTP            | 2.3.20+      | Entièrement pris en charge                                        | `grizzly-filterchain`                                      |
| Java Servlet Compatible | 2.3+, 3.0+   | Entièrement pris en charge                                        | `servlet`, `servlet-2`, `servlet-3`                        |
| Annotations JAX-RS      | JSR311-API   | Entièrement pris en charge                                        | `jax-rs`, `jaxrs`, `jax-rs-annotations`, `jax-rs-filter`   |
| Jetty                   | 7.0-12.x     | Entièrement pris en charge                                        | `jetty`                                                    |
| Micronaut HTTP Server   | 2.x+         | Entièrement pris en charge                                        | `micronaut`                                                |
| Mulesoft                | 4.5.0+       | Entièrement pris en charge                                        | `mule`                                                     |
| Netty HTTP Server       | 3.8+         | Entièrement pris en charge                                        | `netty`, `netty-3.8`, `netty-4.0`, `netty-4.1`             |
| Play                    | 2.3-2.8      | Entièrement pris en charge                                        | `play`, `play-action`                                      |
| Ratpack                 | 1.5+         | Entièrement pris en charge                                        | `ratpack`                                                  |
| Restlet HTTP Server     | 2.2 - 2.4    | Entièrement pris en charge                                        | `restlet-http`.                                            |
| Spark Java              | 2.3+         | [Preview](#framework-integrations-disabled-by-default) | `sparkjava` (nécessite `jetty`)                             |
| Spring Boot             | 1.5 - 3.X    | Entièrement pris en charge                                        | `spring-web` ou `spring-webflux`                           |
| Spring Web (MVC)        | 4.0+         | Entièrement pris en charge                                        | `spring-web`                                               |
| Spring WebFlux          | 5.0+         | Entièrement pris en charge                                        | `spring-webflux`                                           |
| Tomcat                  | 5.5+         | Entièrement pris en charge                                        | `tomcat`                                                   |
| Undertow                | 2.0+         | Entièrement pris en charge                                        | `undertow`                                                 |
| Vert.x                  | 3.4 - 5.x    | Entièrement pris en charge                                        | `vertx`, `vertx-3.4`, `vertx-3.9`, `vertx-4.0`, `vertx-5.0`|
| Websocket (JSR356)      | 1.0+         | [Preview](#framework-integrations-disabled-by-default) | `websocket`                                                |

**Remarque** : De nombreux serveurs d'applications sont compatibles avec les servlets et sont automatiquement couverts par cette instrumentation, tels que Websphere, Weblogic et JBoss.
De plus, des frameworks comme Spring Boot (version 3) fonctionnent intrinsèquement car ils utilisent généralement un serveur d'applications embarqué pris en charge, tel que Tomcat, Jetty ou Netty.

### Intégrations de frameworks désactivées par défaut {#framework-integrations-disabled-by-default}

Les instrumentations suivantes sont désactivées par défaut et peuvent être activées avec les paramètres suivants :

| Instrumentation              | Pour l'activer 									                                                                              |
|------------------------------|----------------------------------------------------------------------------------------------------------|
| Grizzly                      | `-Ddd.integration.grizzly-client.enabled=true`                                                           |
| Grizzly-HTTP                 | `-Ddd.integration.grizzly-filterchain.enabled=true`                                                      |
| Hazelcast (côté client uniquement) | `-Ddd.integration.hazelcast.enabled=true` </br> `-Ddd.integration.hazelcast_legacy.enabled=true`         |
| Ignite                       | `-Ddd.integration.ignite.enabled=true`                                                                   |
| JAX-WS                       | `-Ddd.integration.jax-ws.enabled=true`                                                                   |
| JDBC Datasource              | `-Ddd.integration.jdbc-datasource.enabled=true`                                                          |
| Mulesoft                     | `-Ddd.integration.mule.enabled=true`                                                                     |
| Netty Promise                | `-Ddd.integration.netty-promise.enabled=true`                                                            |
| Ning                         | `-Ddd.integration.ning.enabled=true`                                                                     |
| Spark Java                   | `-Ddd.integration.sparkjava.enabled=true`                                                                |
| TIBCO BusinessWorks          | `-Ddd.integration.tibco.enabled=true`                                                                    |
| URL Connection               | `-Ddd.integration.urlconnection.enabled=true` </br> `-Ddd.integration.httpurlconnection.enabled=true`    |
| Websocket                    | `-Ddd.trace.websocket.messages.enabled=true`                                                             |
| ZIO                          | `-Ddd.integration.zio.experimental.enabled=true`                                                         |


**Remarque** : L'intégration JAX-WS instrumente les endpoints annotés avec @WebService (JAX-WS 1.x) et @WebServiceProvider (JAX-WS 2.x).

Vous ne trouvez pas le framework web que vous recherchez ? Datadog étend constamment sa prise en charge. Contactez le [support Datadog][2] si vous avez besoin d'aide.

### Compatibilité des frameworks réseau {#networking-framework-compatibility}

`dd-java-agent` inclut la prise en charge du traçage automatique des frameworks réseau suivants.

**Le traçage réseau fournit :**

- le temps écoulé entre la requête et la réponse
- des tags pour la requête (par exemple, le code de réponse)
- la capture des erreurs et des traces de pile
- le traçage distribué

| Framework                          | Versions    | Type de prise en charge                                           | Noms d'instrumentation (utilisés pour la configuration)          |
|------------------------------------|-------------|--------------------------------------------------------|---------------------------------------------------------|
| Apache HTTP Client                 | 4.0+        | Entièrement pris en charge                                        | `httpclient`, `apache-httpclient`, `apache-http-client` |
| Apache HTTP Async Client           | 4.0+        | Entièrement pris en charge                                        | `httpasyncclient`, `apache-httpasyncclient`             |
| AWS Java SDK                       | 1.11+, 2.2+ | Entièrement pris en charge                                        | `aws-sdk`                                               |
| Camel-OpenTelemetry                | 3.12.0+     | Preview                                                | [opentelemetry-1][5]                                    |
| Commons HTTP Client                | 2.0+        | Entièrement pris en charge                                        | `commons-http-client`                                   |
| Google HTTP Client                 | 1.19.0+     | Entièrement pris en charge                                        | `google-http-client`                                    |
| Google Pub/Sub                     | 1.116.0+    | Entièrement pris en charge                                        | `google-pubsub`                                         |
| Grizzly HTTP Client                | 1.9+        | [Preview](#framework-integrations-disabled-by-default) | `grizzly-client`                                        |
| gRPC                               | 1.5+        | Entièrement pris en charge                                        | `grpc`, `grpc-client`, `grpc-server`                    |
| HttpURLConnection                  | toutes      | Entièrement pris en charge                                        | `httpurlconnection`, `urlconnection`                    |
| Kafka-Clients                      | 0.11+       | Entièrement pris en charge                                        | `kafka`                                                 |
| Kafka-Streams                      | 0.11+       | Entièrement pris en charge                                        | `kafka`, `kafka-streams`                                |
| Java RMI                           | toutes      | Traçage distribué non pris en charge                      | `rmi`, `rmi-client`, `rmi-server`                       |
| Jax RS Clients                     | 2.0+        | Entièrement pris en charge                                        | `jax-rs`, `jaxrs`, `jax-rs-client`                      |
| Jersey Client                      | 1.9-2.29    | Entièrement pris en charge                                        | `jax-rs`, `jaxrs`, `jax-rs-client`                      |
| JMS / Jakarta JMS                  | 1-3.0+      | Entièrement pris en charge                                        | `jms`, `jms-1`, `jms-2`, `jakarta-jms`                  |
| Netty HTTP Client                  | 4.0+        | Entièrement pris en charge                                        | `netty`, `netty-4.0`, `netty-4.1`                       |
| Ning HTTP Client                   | 1.9.0+      | [Preview](#framework-integrations-disabled-by-default) | `ning`                                                  |
| OkHTTP                             | 2.2+        | Entièrement pris en charge                                        | `okhttp`, `okhttp-2`,`okhttp-3`                         |
| Play WSClient                      | 1.0+        | Entièrement pris en charge                                        | `play-ws`                                               |
| Rabbit AMQP                        | 2.7+        | Entièrement pris en charge                                        | `amqp`, `rabbitmq`                                      |
| SOFA RPC                           | 5.0+        | Entièrement pris en charge                                        | `sofarpc`                                               |
| Spring SessionAwareMessageListener | 3.1+        | Entièrement pris en charge                                        | `spring-jms-3.1`                                        |
| Spring WebClient                   | 5.0+        | Entièrement pris en charge                                        | `spring-webflux`, `spring-webflux-client`               |

**Remarque sur Kafka** : l'intégration Kafka de Datadog fonctionne avec la version de Kafka `0.11+`, qui prend en charge la Header API. Cette API est utilisée pour injecter et extraire le contexte de trace. Si vous exécutez un environnement avec des versions mixtes, le broker Kafka peut signaler à tort la version plus récente de Kafka. Cela pose un problème lorsque le SDK tente d'injecter des en-têtes qui ne sont pas pris en charge par le producteur local. De plus, les anciens consommateurs sont incapables de consommer le message en raison de la présence d'en-têtes. Pour éviter ces problèmes, si vous utilisez un environnement Kafka combinant plusieurs versions, dont certaines sont antérieures à 0.11, désactivez la propagation du contexte avec la variable d'environnement : `DD_KAFKA_CLIENT_PROPAGATION_ENABLED=false`.

**Remarque JMS** : L'intégration JMS de Datadog ajoute et lit automatiquement les propriétés d'objet de message `x__dash__datadog__dash__trace__dash__id` et `x__dash__datadog__dash__parent__dash__id` pour maintenir la propagation du contexte entre les services consommateur et producteur.

**Remarque Camel** : La propagation des traces distribuées sur les routes Camel n'est pas prise en charge.

**Remarque SOFA RPC** : L'intégration SOFA RPC de Datadog prend en charge les protocoles de transport Bolt, Triple et REST. Triple utilise le transport gRPC ; le traçage distribué des appels Triple nécessite que l'intégration `grpc` reste activée.

Vous ne trouvez pas le framework réseau que vous recherchez ? Datadog étend constamment sa prise en charge. Contactez le [support Datadog][2] si vous avez besoin d'aide.

### Compatibilité des magasins de données {#data-store-compatibility}

`dd-java-agent` inclut la prise en charge du traçage automatique des frameworks/pilotes de base de données suivants.

**Le traçage des datastores fournit :**

- le temps écoulé entre la requête et la réponse
- des informations sur les requêtes (par exemple, une chaîne de requête nettoyée)
- la capture des erreurs et des traces de pile

| Base de données                | Versions | Type de prise en charge    | Noms d'instrumentation (utilisés pour la configuration)                                             |
|-------------------------|----------|-----------------|--------------------------------------------------------------------------------------------|
| Aerospike               | 4.0+     | Entièrement pris en charge | `aerospike`                                                                                |
| Couchbase               | 2.0+     | Entièrement pris en charge | `couchbase`                                                                                |
| Cassandra               | 3.0+     | Entièrement pris en charge | `cassandra`                                                                                |
| Elasticsearch Transport | 2.0+     | Entièrement pris en charge | `elasticsearch`, `elasticsearch-transport`, `elasticsearch-transport-{2,5,6,7}` (choisissez-en un) |
| Elasticsearch Rest      | 5.0+     | Entièrement pris en charge | `elasticsearch`, `elasticsearch-rest`, `elasticsearch-rest-{5,6,7}` (choisissez-en un)             |
| Ignite                  | 2.0-3.0  | [Préversion](#framework-integrations-disabled-by-default) | `ignite`                                            |
| JDBC                    | N/A      | Entièrement pris en charge | `jdbc`, `jdbc-datasource`                                                                  |
| Jedis                   | 1.4+     | Entièrement pris en charge | `jedis`, `redis`                                                                           |
| Lettuce                 | 4.0+     | Entièrement pris en charge | `lettuce`, `lettuce-4-async`, `lettuce-5-rx`                                               |
| MongoDB                 | 3.0-4.0+ | Entièrement pris en charge | `mongo`                                                                                    |
| OpenSearch Rest         | 1.x-2.x  | Entièrement pris en charge | `opensearch`, `opensearch-rest`                                                            |
| OpenSearch Transport    | 1.x-2.x  | Entièrement pris en charge | `opensearch`, `opensearch-transport`                                                       |
| RediScala               | 1.5+     | Entièrement pris en charge | `rediscala`, `redis`                                                                       |
| Redisson                | 2.x-3.x  | Entièrement pris en charge | `redisson`, `redis`                                                                        |
| SpyMemcached            | 2.12+    | Entièrement pris en charge | `spymemcached`                                                                             |
| Vert.x Cassandra Client | 3.9-4.x  | Entièrement pris en charge | `cassandra`																			                                                             |
| Vert.x Redis Client     | 3.9-4.x  | Entièrement pris en charge | `vertx-redis-client`                                                                       |
| Vert.x MySQL Client     | 3.9-4.x  | Entièrement pris en charge | `vertx-sql-client`																		                                                       |

**Remarque** : Redis 6.0+ prend en charge l'authentification intégrée aux commandes telles que `HELLO`, `MIGRATE` et `ACL SETUSER`.

  - **Datadog Trace Agent** : La version minimale requise et recommandée est `7.76.1` pour garantir que les paramètres d'authentification sont automatiquement masqués dans les métadonnées de trace.
  - **Datadog Lambda Extension** (environnements Serverless) : La version minimale requise est `v28.0.0`.

`dd-java-agent` est également compatible avec les pilotes JDBC courants, notamment :

- Apache Derby
- Firebird SQL
- H2 Database Engine
- HSQLDB
- IBM DB2
- MariaDB
- MSSQL (Microsoft SQL Server)
- MySQL
- Oracle
- Postgres SQL
- ScalikeJDBC

### Intégrations de bases de données désactivées par défaut {#database-integrations-disabled-by-default}

Les instrumentations suivantes sont désactivées par défaut et peuvent être activées avec les paramètres suivants :

| Instrumentation   | Pour activer 									                             |
|-------------------|-------------------------------------------------|
| JDBC-Datasource		 | - Propriété système : `-Ddd.integration.jdbc-datasource.enabled=true`<br /> - Variable d'environnement : `DD_INTEGRATION_JDBC_DATASOURCE_ENABLED=true` |

Vous ne trouvez pas les systèmes de stockage de données recherchés ? Datadog étend constamment sa prise en charge. Contactez le [support Datadog][2] si vous avez besoin d'aide.

### Compatibilité avec d'autres frameworks {#additional-framework-compatibility}

`dd-java-agent` inclut la prise en charge du traçage automatique des frameworks suivants.

| Framework           | Versions         | Type de prise en charge                                           | Noms d'instrumentation (utilisés pour la configuration) |
|---------------------|------------------|--------------------------------------------------------|------------------------------------------------|
| Apache CXF (Jax-WS) | 3.0+             | [OpenTelemetry Extension][10]                          | `cxf`                                          |
| Datanucleus JDO     | 4.0+             | Entièrement pris en charge                                        | `datanucleus`                                  |
| Dropwizard Views    | 0.7+             | Entièrement pris en charge                                        | `dropwizard`, `dropwizard-view`                |
| GraphQL             | 14.0+            | Entièrement pris en charge                                        | `graphql-java`                                 |
| Guidewire (PolicyCenter, BillingCenter) | 10.0+ | Entièrement pris en charge                                        | `guidewire`, `guidewire-wsi`   |
| Hazelcast (client)  | 3.6+             | [Préversion](#framework-integrations-disabled-by-default) | `hazelcast`, `hazelcast_legacy`                |
| Hibernate           | 3.5+             | Entièrement pris en charge                                        | `hibernate`, `hibernate-core`                  |
| Hystrix             | 1.4+             | Entièrement pris en charge                                        | `hystrix`                                      |
| Rendu JSP           | 2.3+             | Entièrement pris en charge                                        | `jsp`, `jsp-render`, `jsp-compile`             |
| JUnit               | 4.1+, 5.3+       | Entièrement pris en charge                                        | `junit`, `junit-4`, `junit-5`                  |
| Kotlin Coroutines   | 1.3+             | Entièrement pris en charge                                        | `kotlin_coroutine`                             |
| Project Reactor     | 3.1+             | Entièrement pris en charge                                        | `reactor-core`                                 |
| Quartz              | 2.x              | Entièrement pris en charge                                        | `quartz`                                       |
| RxJava              | 2.x              | Entièrement pris en charge                                        | `rxjava`                                       |
| Spring Data         | 1.8+             | Entièrement pris en charge                                        | `spring-data`                                  |
| Spring Scheduling   | 3.1+             | Entièrement pris en charge                                        | `spring-scheduling`                            |
| TIBCO BusinessWorks | 5.14.0 - 6.11.0  | [Préversion](#framework-integrations-disabled-by-default) | `tibco`, `tibco_bw`                            |
| Twilio SDK          | < 8.0            | Entièrement pris en charge                                        | `twilio-sdk`                                   |

Vous ne voyez pas les frameworks souhaités ? Datadog étend constamment sa prise en charge. Pour demander la prise en charge d'un framework, contactez notre formidable [équipe d'assistance][2].

Pour améliorer la visibilité des applications utilisant des frameworks non pris en charge, considérez l'une des solutions suivantes :

- [Ajout d'une instrumentation personnalisée][3].
- [Soumettre une pull request][4] contenant une instrumentation à intégrer dans une prochaine version.
- Contacter le [support Datadog][2] pour soumettre une demande de fonctionnalité.

### Désactivation des intégrations {#disabling-integrations}

La plupart des intégrations sont activées par défaut. Le paramètre suivant permet de désactiver les intégrations par défaut.

- Propriété système : `-Ddd.integrations.enabled=false`
- Variable d'environnement : `DD_INTEGRATIONS_ENABLED=false`

Les intégrations peuvent être activées ou désactivées individuellement (ce qui remplace la valeur par défaut ci-dessus).

- Propriété système : `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- Variable d'environnement : `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

(Le nom de chaque intégration est affiché ci-dessus.)

### Problèmes connus {#known-issues}

- L'exécution du traceur Java dans Bitbucket n'est pas prise en charge.
- Le chargement de plusieurs Java Agents remplissant des fonctions d'APM ou de tracing n'est ni recommandé ni pris en charge.
- Lors de l'exécution du SDK avec Java 24+, vous pourriez voir des avertissements liés à l'accès natif JNI. Supprimez ces avertissements en ajoutant l'option `--enable-native-access=ALL-UNNAMED`. Consultez [JEP 472][13] pour plus d'informations.

## Prise en charge du chargement et de la liaison anticipés des classes (AOT) {#ahead-of-time-aot-class-loading-linking-support}

Pour améliorer le temps de démarrage, le chargement et la liaison anticipés des classes (AOT) rendent les classes de l'application immédiatement disponibles, déjà chargées et liées, au démarrage de la JVM. Consultez [JEP 483][14] et [JEP 514][15] pour plus d'informations.

### Prérequis {#requirements}

Utilisez :

- Java 25 ou version ultérieure
- [Datadog Java SDK][1] 1.57.0 ou version ultérieure

### Configuration {#setup}

Pour configurer le chargement et la liaison de classes AOT pour APM, ajoutez le Datadog Java SDK pendant l'exécution de l'entraînement :

```shell
java -javaagent:/path/to/dd-java-agent.jar -XX:AOTCacheOutput=app.aot -jar App.jar
```

#### Utilisation {#usage}

En production, ajoutez le même Datadog Java SDK avec les données d'entraînement précédemment mises en cache :

```shell
java -javaagent:/path/to/dd-java-agent.jar -XX:AOTCache=app.aot -jar App.jar
```

Vous pouvez consulter les traces dans le [Trace Explorer][9].

{{% collapse-content title="Dépannage" level="h5" %}}
##### Ne pas attacher le Datadog Java SDK pendant l'exécution de l'entraînement {#not-attaching-the-datadog-java-sdk-during-the-training-run}

Si vous voyez cet avertissement en production, cela signifie que le Datadog Java SDK n'a pas été attaché pendant l'entraînement :

```
Mismatched values for property jdk.module.addmods: java.instrument specified during runtime but not during dump time
```
La JVM ne peut alors pas utiliser le cache AOT pour améliorer le temps de démarrage. La solution consiste à attacher le SDK pendant l'entraînement.

{{% /collapse-content %}}

## Prise en charge de GraalVM Native Image {#graalvm-native-image-support}

GraalVM Native Image est une technologie qui vous permet de compiler des applications Java en exécutables natifs. Le Datadog Java SDK prend en charge GraalVM Native Image. Cela vous permet de compiler vos applications en exécutables natifs tout en bénéficiant des capacités de traçage offertes par la bibliothèque.

### Prérequis {#requirements-1}

Utilisez :

- [GraalVM JDK 21 ou JDK 25][7]
- [Datadog Java SDK][1]

### Configuration {#setup-1}

{{< tabs >}}
{{% tab "GraalVM" %}}
Pour configurer le Datadog Java SDK avec GraalVM Native Image, suivez ces étapes :

1. Instrumentez votre application en suivant les étapes décrites dans [Traçage des applications Java][6].
2. Lorsque vous générez un exécutable natif avec la commande `native-image`, ajoutez l'argument `-J-javaagent:/path/to/dd-java-agent.jar`. Par exemple :
   ```shell
   native-image -J-javaagent:/path/to/dd-java-agent.jar -jar App.jar
   ```
3. (Facultatif) Activez l'intégration du profileur en ajoutant l'argument suivant :
`-J-Ddd.profiling.enabled=true --enable-monitoring=jfr`.
   - Pour les versions du traceur antérieures à `1.39.1`, lors de l'exécution de l'exécutable natif généré, assurez-vous que la variable d'environnement `DD_PROFILING_START_FORCE_FIRST=true` est définie.

[6]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Quarkus Native" %}}
Pour configurer le Datadog Java SDK avec Quarkus Native, suivez ces étapes :

1. Instrumentez votre application en suivant les étapes décrites dans [Traçage des applications Java][6].
2. Lorsque vous générez un exécutable natif, utilisez la propriété `quarkus.native.additional-build-args`. Par exemple :
   ```shell
   ./mvnw package -Dnative -Dquarkus.native.additional-build-args='-J-javaagent:/path/to/dd-java-agent.jar'
   ```
3. (Facultatif) Activez l'intégration du profileur en ajoutant l'argument suivant :
`-J-Ddd.profiling.enabled=true --enable-monitoring=jfr`.
   - Pour les versions du traceur antérieures à `1.39.1`, lors de l'exécution de l'exécutable natif généré, assurez-vous que la variable d'environnement `DD_PROFILING_START_FORCE_FIRST=true` est définie.

[6]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Spring Native" %}}
Pour configurer le Datadog Java SDK avec Spring Native, suivez ces étapes :

1. Instrumentez votre application en suivant les étapes décrites dans [Traçage des applications Java][6].
2. Pour les builds Spring Native basés sur Buildpacks, activez le [Paketo Buildpack for Datadog][8] en utilisant `BP_DATADOG_ENABLED=true`.
    - Vous pouvez le faire au niveau de l'outil de build, comme Maven :
     ```yaml
     <build>
     <plugins>
       <plugin>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-maven-plugin</artifactId>
         <configuration>
           <image>
             ...
             <env>
               ...
               <BP_DATADOG_ENABLED>true</BP_DATADOG_ENABLED>
               ...
             </env>
           </image>
         </configuration>
       </plugin>
     </plugins>
     </build>
     ```
   - Alternativement, vous pouvez utiliser la commande `pack build` avec l'option `--env BP_DATADOG_ENABLED=true` pour activer le buildpack Datadog.
3. (Facultatif) Activez l'intégration du profileur en définissant la variable d'environnement `BP_NATIVE_IMAGE_BUILD_ARGUMENTS=’-J-Ddd.profiling.enabled=true --enable-monitoring=jfr’`.
   - Pour les versions du traceur antérieures à `1.39.1`, lors de l'exécution de l'exécutable natif généré, assurez-vous que la variable d'environnement `DD_PROFILING_START_FORCE_FIRST=true` est définie.

[6]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[8]: https://github.com/paketo-buildpacks/datadog
{{% /tab %}}

{{< /tabs >}}

<div class="alert alert-info">Pour GraalVM 25, vous pourriez voir des erreurs liées à <code>Use of Unsafe</code>. Ajoutez <code>-Dnet.bytebuddy.safe=false</code> lors de la compilation de l'exécutable natif pour résoudre ce problème.</div>

#### Utilisation {#usage-1}

Une fois la configuration terminée, le service devrait envoyer des traces à Datadog.

Vous pouvez consulter les traces dans le [Trace Explorer][9].

{{% collapse-content title="Dépannage" level="h5" %}}
##### Les fonctionnalités ne sont pas activées ou configurées correctement pour les images natives {#features-are-not-enabled-or-configured-correctly-for-native-images}

Il existe des problèmes connus concernant l'accès aux propriétés système au moment de l'exécution à partir d'un binaire construit avec Graal Native Image.

- Pour la configuration au moment de l'exécution, utilisez des variables d'environnement (`DD_PROPERTY_NAME=value`) au lieu des propriétés système (`-Ddd.property.name=value`).
- L'exception à cette règle concerne l'activation du profileur. Dans ce cas, transmettez `-J-Ddd.profiling.enabled=true` à l'outil `native-image` au moment de la _compilation_.

##### Les versions du buildpack native-image antérieures à 5.12.2 {#native-image-buildpack-versions-older-than-5122}

Les anciennes versions du buildpack native-image exposent l'option suivante : `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM`.

Lorsque cette option est `false`, des exceptions comme la suivante peuvent se produire :

```text
Caused by: org.graalvm.compiler.java.BytecodeParser$BytecodeParserError:
com.oracle.graal.pointsto.constraints.UnsupportedFeatureException:
No instances of datadog.trace.bootstrap.DatadogClassLoader are allowed in the image heap
as this class should be initialized at image runtime. To see how this object got
instantiated use --trace-object-instantiation=datadog.trace.bootstrap.DatadogClassLoader.
```

Les solutions à ce problème sont :

- Définissez `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM` explicitement sur true dans la configuration d'environnement de l'image,
- Ou mettez à niveau le buildpack `native-image` vers la version 5.12.2 ou ultérieure. La meilleure façon de procéder est de mettre à niveau le buildpack `java-native-image` vers la version 8.13.0 ou ultérieure.

##### Versions de Paketo Buildpack for Datadog antérieures à 4.6.0 {#paketo-buildpack-for-datadog-versions-older-than-460}

Dans ses anciennes versions, Paketo Buildpack for Datadog présentait un bug qui se manifestait par le message d'erreur suivant :

```text
disabling Datadog at launch time is unsupported for Node
ERROR: failed to launch: exec.d: failed to execute exec.d file at path '/layers
paketo-buildpacks_datadog/helper/exec.d/toggle': exit status 1
```

La solution à ce problème est de mettre à niveau vers la version 4.6.0 ou ultérieure.

##### La compilation Spring Native échoue avec une erreur exec.d/toggle {#spring-native-build-crashes-with-execdtoggle-error}

Vous pouvez rencontrer une erreur similaire à celle ci-dessus, même avec des versions du buildpack plus récentes que 4.6.0, lors de la compilation d'une image native Spring Boot :

```text
disabling Datadog at launch time is unsupported for Node
ERROR: failed to launch: exec.d: failed to execute exec.d file at path '/layers
paketo-buildpacks_datadog/helper/exec.d/toggle': exit status 1
```

Cela se produit généralement parce que le buildpack Datadog s'exécute avant le buildpack d'image native et ne sait donc pas qu'une compilation d'image native est prévue. Il ajoute à tort un script de bascule destiné aux compilations JVM, incompatible avec l'exécutable natif final.

La solution consiste à définir explicitement la variable d'environnement `BP_NATIVE_IMAGE` sur `true` dans la configuration `spring-boot-maven-plugin`. Cela garantit que tous les buildpacks savent dès le départ qu'il s'agit d'une compilation d'image native.

```yaml
<build>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <configuration>
        <image>
          ...
          <env>
            ...
            <BP_NATIVE_IMAGE>true</BP_NATIVE_IMAGE>
            ...
          </env>
        </image>
      </configuration>
    </plugin>
  </plugins>
</build>
```

##### Problème lors de l'activation du SDK Datadog {#problem-activating-datadog-sdk}

Vous pourriez rencontrer des erreurs d'initialisation si votre configuration de traceur repose sur des sockets de domaine Unix (UDS), qui ne sont pas pris en charge dans les images natives :

```text
dd.trace 2024-12-30 08:34:43:306 +0000] [main] WARN datadog.trace.agent.tooling.nativeimage.TracerActivation - Problem activating datadog tracer
java.lang.NoClassDefFoundError: Could not initialize class jnr.unixsocket.UnixSocketChannel
```

La solution consiste à configurer le traceur Java pour utiliser une communication basée sur le host (mode `hostip` ou `service`), plutôt qu'une communication basée sur des sockets (mode `socket`).

Pour plus d'informations, consultez [Configurer le mode de communication d'APM et de DogStatsD][11]. Pour les configurations qui ne reposent pas sur l'Admission Controller, consultez la documentation relative à [DD_TRACE_AGENT_URL][12].

{{% /collapse-content %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java
[2]: https://www.datadoghq.com/support/
[3]: /fr/tracing/manual_instrumentation/java
[4]: https://github.com/DataDog/documentation#outside-contributors
[5]: /fr/tracing/trace_collection/otel_instrumentation/java/
[7]: https://www.graalvm.org/downloads/
[9]: /fr/tracing/trace_explorer/
[10]: /fr/opentelemetry/interoperability/instrumentation_libraries/?tab=java
[11]: /fr/containers/cluster_agent/admission_controller/?tab=datadogoperator#configure-apm-and-dogstatsd-communication-mode
[12]: /fr/tracing/trace_collection/library_config/#agent
[13]: https://openjdk.org/jeps/472
[14]: https://openjdk.org/jeps/483
[15]: https://openjdk.org/jeps/514