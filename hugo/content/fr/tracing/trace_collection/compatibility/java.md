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

La bibliothèque de tracing Datadog Java est open source. Consultez le [référentiel GitHub][1] pour en savoir plus.

### Java runtimes pris en charge {#supported-java-runtimes}

Le Java Tracer prend en charge l'instrumentation automatique pour les runtimes Oracle JDK, OpenJDK JVM et [GraalVM](#graalvm-native-image-support).

#### Java Tracer v1 (latest) {#java-tracer-v1-latest}

<table>
  <thead>
    <th>Versions Java</th>
    <th>Systèmes d'exploitation</th>
    <th>Niveau de support</th>
  </thead>
  <tr>
    <td>à partir de 27 et au-dessus</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64, arm64)<br>Mac (x86, x86-64, arm64)</td>
    <td><a href="#levels-of-support">Aperçu</a></td>
  </tr>
  <tr>
    <td>de 18 à 26</td>
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
    <td><a href="#levels-of-support">Aperçu</a></td>
  </tr>
</table>

Datadog ne prend pas officiellement en charge les versions de Java en accès anticipé. 

#### Java Tracer v0 {#java-tracer-v0}

| Versions Java      | Systèmes d'exploitation                                                               | Niveau de support                     |
|--------------------|---------------------------------------------------------------------------------|-----------------------------------|
| 7 uniquement             | Windows (x86, x86-64)<br>Linux (x86, x86-64)<br>Mac (x86, x86-64)               | [Fin de vie](#levels-of-support) |
| 7 uniquement             | Linux (arm64)<br>Mac (arm64)                                                    | [Fin de vie](#levels-of-support) |

### Niveaux de support {#levels-of-support}

| **Niveau**                                              | **Support fourni**                                                                                                                                |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Non pris en charge</span>      |  Aucune implémentation. Contactez [le support Datadog][2] pour des demandes spéciales.                                                                              |
| <span id="support-beta">Aperçu</span>                 |  Implémentation initiale. Peut ne pas encore contenir toutes les fonctionnalités. Le support pour les nouvelles fonctionnalités ainsi que les corrections de bogues et de sécurité est fourni sur une base de meilleur effort. |
| <span id="support-ga">Disponibilité générale (GA)</span> |  Implémentation complète de toutes les fonctionnalités. Support complet pour les nouvelles fonctionnalités ainsi que les corrections de bogues et de sécurité.                                                     |
| <span id="support-maintenance">Maintenance</span>      |  Implémentation complète des fonctionnalités existantes. Ne reçoit pas de nouvelles fonctionnalités. Support uniquement pour les corrections de bogues et de sécurité.                                  |
| <span id="support-eol">Fin de vie (EOL)</span>        |  Aucun support.                                                                                                                                        |

## Intégrations {#integrations}

Les intégrations en aperçu sont désactivées par défaut mais peuvent être activées individuellement :

- Propriété système : `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- Variable d'environnement : `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

### Compatibilité des frameworks web {#web-framework-compatibility}

`dd-java-agent` inclut le support pour le traçage automatique des frameworks web suivants.

**Le traçage des frameworks web fournit :**

- le temps de la requête HTTP à la réponse
- les balises pour la requête HTTP (code d'état, méthode, etc.)
- la capture des erreurs et des traces de pile
- le lien entre le travail créé dans une requête web et le traçage distribué

| Serveur                  | Versions     | Type de support                                           | Noms d'instrumentation (utilisés pour la configuration)             |
|-------------------------|--------------|--------------------------------------------------------|------------------------------------------------------------|
| Serveur Akka-Http        | 10.0+        | Entièrement pris en charge                                        | `akka-http`, `akka-http-server`                            |
| Apache Pekko            | 1.0+         | Entièrement pris en charge                                        | `pekko-http`, `pekko-http-server`                          |
| Finatra Web             | 2.9+         | Entièrement pris en charge                                        | `finatra`                                                  |
| Grizzly                 | 2.0+         | Entièrement pris en charge                                        | `grizzly`                                                  |
| Grizzly-HTTP            | 2.3.20+      | Entièrement pris en charge                                        | `grizzly-filterchain`                                      |
| Compatible avec Java Servlet | 2.3+, 3.0+   | Entièrement pris en charge                                        | `servlet`, `servlet-2`, `servlet-3`                        |
| Annotations Jax-RS      | JSR311-API   | Entièrement pris en charge                                        | `jax-rs`, `jaxrs`, `jax-rs-annotations`, `jax-rs-filter`   |
| Jetty                   | 7.0-12.x     | Entièrement pris en charge                                        | `jetty`                                                    |
| Serveur HTTP Micronaut   | 2.x+         | Entièrement pris en charge                                        | `micronaut`                                                |
| Mulesoft                | 4.5.0+       | Entièrement pris en charge                                        | `mule`                                                     |
| Serveur HTTP Netty       | 3.8+         | Entièrement pris en charge                                        | `netty`, `netty-3.8`, `netty-4.0`, `netty-4.1`             |
| Play                    | 2.3-2.8      | Entièrement pris en charge                                        | `play`, `play-action`                                      |
| Ratpack                 | 1.5+         | Entièrement pris en charge                                        | `ratpack`                                                  |
| Serveur HTTP Restlet     | 2.2 - 2.4    | Entièrement pris en charge                                        | `restlet-http`.                                            |
| Spark Java              | 2.3+         | [Aperçu](#framework-integrations-disabled-by-default) | `sparkjava` (nécessite `jetty`)                             |
| Spring Boot             | 1.5+         | Entièrement pris en charge                                        | `spring-web` ou `spring-webflux`                           |
| Spring Web (MVC)        | 4.0+         | Entièrement pris en charge                                        | `spring-web`                                               |
| Spring WebFlux          | 5.0+         | Entièrement pris en charge                                        | `spring-webflux`                                           |
| Tomcat                  | 5.5+         | Entièrement pris en charge                                        | `tomcat`                                                   |
| Undertow                | 2.0+         | Entièrement pris en charge                                        | `undertow`                                                 |
| Vert.x                  | 3.4 - 5.x    | Entièrement pris en charge                                        | `vertx`, `vertx-3.4`, `vertx-3.9`, `vertx-4.0`, `vertx-5.0`|
| Websocket (JSR356)      | 1.0+         | [Aperçu](#framework-integrations-disabled-by-default) | `websocket`                                                |

**Remarque** : De nombreux serveurs d'applications sont compatibles avec Servlet et sont automatiquement couverts par cette instrumentation, tels que Websphere, Weblogic et JBoss.
De plus, des frameworks comme Spring Boot (version 3) fonctionnent intrinsèquement car ils utilisent généralement un serveur d'application intégré pris en charge, tel que Tomcat, Jetty ou Netty.

### Intégrations de framework désactivées par défaut {#framework-integrations-disabled-by-default}

Les instrumentations suivantes sont désactivées par défaut et peuvent être activées avec les paramètres suivants :

| Instrumentation              | À activer 									                                                                              |
|------------------------------|----------------------------------------------------------------------------------------------------------|
| Grizzly                      | `-Ddd.integration.grizzly-client.enabled=true`                                                           |
| Grizzly-HTTP                 | `-Ddd.integration.grizzly-filterchain.enabled=true`                                                      |
| Hazelcast (côté client uniquement) | `-Ddd.integration.hazelcast.enabled=true` </br> `-Ddd.integration.hazelcast_legacy.enabled=true`         |
| Ignite                       | `-Ddd.integration.ignite.enabled=true`                                                                   |
| JAX-WS                       | `-Ddd.integration.jax-ws.enabled=true`                                                                   |
| Source de données JDBC              | `-Ddd.integration.jdbc-datasource.enabled=true`                                                          |
| Mulesoft                     | `-Ddd.integration.mule.enabled=true`                                                                     |
| Netty Promise                | `-Ddd.integration.netty-promise.enabled=true`                                                            |
| Ning                         | `-Ddd.integration.ning.enabled=true`                                                                     |
| Spark Java                   | `-Ddd.integration.sparkjava.enabled=true`                                                                |
| TIBCO BusinessWorks          | `-Ddd.integration.tibco.enabled=true`                                                                    |
| Connexion URL               | `-Ddd.integration.urlconnection.enabled=true` </br> `-Ddd.integration.httpurlconnection.enabled=true`    |
| Websocket                    | `-Ddd.trace.websocket.messages.enabled=true`                                                             |
| ZIO                          | `-Ddd.integration.zio.experimental.enabled=true`                                                         |


**Remarque** : L'instrumentation d'intégration JAX-WS couvre les endpoints annotés avec @WebService (JAX-WS 1.x) et @WebServiceProvider (JAX-WS 2.x).

Vous ne voyez pas vos frameworks web souhaités ? Datadog ajoute continuellement un support supplémentaire. Contactez [le support Datadog][2] si vous avez besoin d'aide.

### Compatibilité des frameworks de mise en réseau {#networking-framework-compatibility}

`dd-java-agent` inclut le support pour le traçage automatique des frameworks de mise en réseau suivants.

**Le traçage réseau fournit :**

- le temps de la demande à la réponse
- les tags pour la demande (par exemple, le code de réponse)
- la capture des erreurs et des traces de pile
- le traçage distribué

| Framework                          | Versions    | Type de support                                           | Noms d'instrumentation (utilisés pour la configuration)          |
|------------------------------------|-------------|--------------------------------------------------------|---------------------------------------------------------|
| Apache HTTP Client                 | 4.0+        | Entièrement pris en charge                                        | `httpclient`, `apache-httpclient`, `apache-http-client` |
| Apache HTTP Async Client      | 4.0+        | Entièrement pris en charge                                        | `httpasyncclient`, `apache-httpasyncclient`             |
| AWS Java SDK                       | 1.11+, 2.2+ | Entièrement pris en charge                                        | `aws-sdk`                                               |
| Camel-OpenTelemetry                | 3.12.0+     | Aperçu                                                | [opentelemetry-1][5]                                    |
| Commons HTTP Client                | 2.0+        | Entièrement pris en charge                                        | `commons-http-client`                                   |
| Google HTTP Client                 | 1.19.0+     | Entièrement pris en charge                                        | `google-http-client`                                    |
| Google Pub/Sub                     | 1.116.0+    | Entièrement pris en charge                                        | `google-pubsub`                                         |
| Grizzly HTTP Client                | 1.9+        | [Aperçu](#framework-integrations-disabled-by-default) | `grizzly-client`                                        |
| gRPC                               | 1.5+        | Entièrement pris en charge                                        | `grpc`, `grpc-client`, `grpc-server`                    |
| HttpURLConnection                  | toutes versions         | Entièrement pris en charge                                        | `httpurlconnection`, `urlconnection`                    |
| Kafka-Clients                      | 0.11+       | Entièrement pris en charge                                        | `kafka`                                                 |
| Kafka-Streams                      | 0.11+       | Entièrement pris en charge                                        | `kafka`, `kafka-streams`                                |
| Java RMI                           | toutes versions         | Traçage distribué non pris en charge                      | `rmi`, `rmi-client`, `rmi-server`                       |
| Jax RS Clients                     | 2.0+        | Entièrement pris en charge                                        | `jax-rs`, `jaxrs`, `jax-rs-client`                      |
| Jersey Client                      | 1.9-2.29    | Entièrement pris en charge                                        | `jax-rs`, `jaxrs`, `jax-rs-client`                      |
| JMS / Jakarta JMS                  | 1-3.0+      | Entièrement pris en charge                                        | `jms`, `jms-1`, `jms-2`, `jakarta-jms`                  |
| Netty HTTP Client                  | 4.0+        | Entièrement pris en charge                                        | `netty`, `netty-4.0`, `netty-4.1`                       |
| Ning HTTP Client                   | 1.9.0+      | [Aperçu](#framework-integrations-disabled-by-default) | `ning`                                                  |
| OkHTTP                             | 2.2+        | Entièrement pris en charge                                        | `okhttp`, `okhttp-2`,`okhttp-3`                         |
| Play WSClient                      | 1.0+        | Entièrement pris en charge                                        | `play-ws`                                               |
| Rabbit AMQP                        | 2.7+        | Entièrement pris en charge                                        | `amqp`, `rabbitmq`                                      |
| SOFA RPC                           | 5.0+        | Entièrement pris en charge                                        | `sofarpc`                                               |
| Spring SessionAwareMessageListener | 3.1+        | Entièrement pris en charge                                        | `spring-jms-3.1`                                        |
| Spring WebClient                   | 5.0+        | Entièrement pris en charge                                        | `spring-webflux`, `spring-webflux-client`               |

**Note Kafka** : L'intégration Kafka de Datadog fonctionne avec la version Kafka `0.11+`, qui prend en charge l'API Header. Cette API est utilisée pour injecter et extraire le contexte de trace. Si vous exécutez un environnement avec des versions mixtes, le courtier Kafka peut signaler incorrectement la version plus récente de Kafka. Cela pose un problème lorsque le SDK essaie d'injecter des en-têtes qui ne sont pas pris en charge par le producteur local. De plus, les consommateurs plus anciens ne peuvent pas consommer le message en raison de la présence d'en-têtes. Pour éviter ces problèmes, si vous exécutez un environnement Kafka avec des versions mixtes antérieures à 0.11, désactivez la propagation du contexte avec la variable d'environnement : `DD_KAFKA_CLIENT_PROPAGATION_ENABLED=false`.

**Note JMS** : L'intégration JMS de Datadog ajoute et lit automatiquement les propriétés des objets de message `x__dash__datadog__dash__trace__dash__id` et `x__dash__datadog__dash__parent__dash__id` pour maintenir la propagation du contexte entre les services consommateurs et producteurs.

**Note Camel** : La propagation de trace distribuée sur les routes Camel n'est pas prise en charge.

**Note SOFA RPC** : L'intégration SOFA RPC de Datadog prend en charge les protocoles de transport Bolt, Triple et REST. Triple utilise le transport gRPC ; le traçage distribué pour les appels Triple nécessite que l'intégration `grpc` reste activée.

Vous ne voyez pas le framework réseau souhaité ? Datadog ajoute continuellement un support supplémentaire. Contactez [le support Datadog][2] si vous avez besoin d'aide.

### Compatibilité des magasins de données {#data-store-compatibility}

`dd-java-agent` inclut le support pour le traçage automatique des frameworks/drivers de base de données suivants.

**Le traçage des magasins de données fournit :**

- temps de la requête à la réponse
- informations de requête (par exemple, une chaîne de requête assainie)
- capture d'erreur et de stacktrace

| Base de données                | Versions | Type de support    | Noms d'instrumentation (utilisés pour la configuration)                                             |
|-------------------------|----------|-----------------|--------------------------------------------------------------------------------------------|
| Aerospike               | 4.0+     | Entièrement pris en charge | `aerospike`                                                                                |
| Couchbase               | 2.0+     | Entièrement pris en charge | `couchbase`                                                                                |
| Cassandra               | 3.0+     | Entièrement pris en charge | `cassandra`                                                                                |
| Elasticsearch Transport | 2.0+     | Entièrement pris en charge | `elasticsearch`, `elasticsearch-transport`, `elasticsearch-transport-{2,5,6,7}` (choisissez-en un) |
| Elasticsearch Rest      | 5.0+     | Entièrement pris en charge | `elasticsearch`, `elasticsearch-rest`, `elasticsearch-rest-{5,6,7}` (choisissez-en un)             |
| Ignite                  | 2.0-3.0  | [Aperçu](#framework-integrations-disabled-by-default) | `ignite`                                            |
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

**Remarque** : Redis 6.0+ prend en charge l'authentification en ligne dans des commandes telles que `HELLO`, `MIGRATE` et `ACL SETUSER`.

  - **Agent de trace Datadog** : La version minimale requise et recommandée est `7.76.1` pour garantir que les paramètres d'authentification sont automatiquement obfusqués dans les métadonnées de trace.
  - **Extension Lambda Datadog** (environnements sans serveur) : La version minimale requise est `v28.0.0`.

`dd-java-agent` est également compatible avec les pilotes JDBC courants, y compris :

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

### Intégrations de base de données désactivées par défaut {#database-integrations-disabled-by-default}

Les instrumentations suivantes sont désactivées par défaut et peuvent être activées avec les paramètres suivants :

| Instrumentation   | Pour activer 									                             |
|-------------------|-------------------------------------------------|
| JDBC-Datasource		 | - Propriété système : `-Ddd.integration.jdbc-datasource.enabled=true`<br /> - Variable d'environnement : `DD_INTEGRATION_JDBC_DATASOURCE_ENABLED=true` |

Vous ne voyez pas vos magasins de données souhaités ? Datadog ajoute continuellement un support supplémentaire. Contactez [le support Datadog][2] si vous avez besoin d'aide.

### Compatibilité supplémentaire avec les frameworks {#additional-framework-compatibility}

`dd-java-agent` inclut le support pour le traçage automatique des frameworks suivants.

| Framework           | Versions         | Support Type                                           | Instrumentation Names (used for configuration) |
|---------------------|------------------|--------------------------------------------------------|------------------------------------------------|
| Apache CXF (Jax-WS) | 3.0+             | [OpenTelemetry Extension][10]                          | `cxf`                                          |
| Datanucleus JDO     | 4.0+             | Entièrement pris en charge                                        | `datanucleus`                                  |
| Dropwizard Views    | 0.7+             | Entièrement pris en charge                                        | `dropwizard`, `dropwizard-view`                |
| GraphQL             | 14.0+            | Entièrement pris en charge                                        | `graphql-java`                                 |
| Hazelcast (client)  | 3.6+             | [Aperçu](#framework-integrations-disabled-by-default) | `hazelcast`, `hazelcast_legacy`                |
| Hibernate           | 3.5+             | Entièrement pris en charge                                        | `hibernate`, `hibernate-core`                  |
| Hystrix             | 1.4+             | Entièrement pris en charge                                        | `hystrix`                                      |
| Rendu JSP          | 2.3+             | Entièrement pris en charge                                        | `jsp`, `jsp-render`, `jsp-compile`             |
| JUnit               | 4.1+, 5.3+       | Entièrement pris en charge                                        | `junit`, `junit-4`, `junit-5`                  |
| Kotlin Coroutines   | 1.3+             | Entièrement pris en charge                                        | `kotlin_coroutine`                             |
| Project Reactor     | 3.1+             | Entièrement pris en charge                                        | `reactor-core`                                 |
| Quartz              | 2.x              | Entièrement pris en charge                                        | `quartz`                                       |
| RxJava              | 2.x              | Entièrement pris en charge                                        | `rxjava`                                       |
| Spring Data         | 1.8+             | Entièrement pris en charge                                        | `spring-data`                                  |
| Planification Spring   | 3.1+             | Entièrement pris en charge                                        | `spring-scheduling`                            |
| TIBCO BusinessWorks | 5.14.0 - 6.11.0  | [Aperçu](#framework-integrations-disabled-by-default) | `tibco`, `tibco_bw`                            |
| Twilio SDK          | < 8.0            | Entièrement pris en charge                                        | `twilio-sdk`                                   |

Vous ne voyez pas les frameworks souhaités ? Datadog ajoute continuellement un support supplémentaire. Pour demander un framework, contactez notre [équipe de support][2].

Pour améliorer la visibilité des applications utilisant des frameworks non pris en charge, considérez l'une des solutions suivantes :

- [Ajout d'instrumentation personnalisée][3].
- [Soumettre un pull request][4] avec instrumentation pour inclusion dans une future version.
- Contacter [le support Datadog][2] et soumettre une demande de fonctionnalité.

### Désactiver les intégrations {#disabling-integrations}

La plupart des intégrations sont activées par défaut. Le paramètre suivant peut modifier la configuration par défaut afin de la désactiver.

- Propriété système : `-Ddd.integrations.enabled=false`
- Variable d'environnement : `DD_INTEGRATIONS_ENABLED=false`

Les intégrations peuvent être activées ou désactivées individuellement (ce qui remplace la valeur par défaut ci-dessus).

- Propriété système : `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- Variable d'environnement : `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

(Le nom de chaque intégration est affiché ci-dessus.)

### Problèmes connus {#known-issues}

- L'exécution du traceur Java dans Bitbucket n'est pas prise en charge.
- Charger plusieurs agents Java qui effectuent des fonctions APM/tracing n'est pas une configuration recommandée ou prise en charge.
- Lors de l'exécution du SDK avec Java 24+, vous pouvez voir des avertissements liés à l'accès natif JNI. Supprimez ces avertissements en ajoutant l'option `--enable-native-access=ALL-UNNAMED`. Voir [JEP 472][13] pour plus d'informations.

## Support de chargement et de liaison de classes à l'avance (AOT) {#ahead-of-time-aot-class-loading-linking-support}

Pour améliorer le temps de démarrage, le chargement et la liaison de classes à l'avance (AOT) rendent les classes d'application instantanément disponibles dans un état chargé et lié lorsque la JVM démarre. Voir [JEP 483][14] et [JEP 514][15] pour plus d'informations.

### Exigences {#requirements}

Utiliser :

- Java 25 ou version ultérieure
- [Datadog Java SDK][1] 1.57.0 ou version ultérieure

### Configuration {#setup}

Pour configurer le chargement et la liaison de classes AOT pour APM, ajoutez le Datadog Java SDK lors de l'exécution de la formation :

```shell
java -javaagent:/path/to/dd-java-agent.jar -XX:AOTCacheOutput=app.aot -jar App.jar
```

#### Utilisation {#usage}

Pendant la production, ajoutez le même Datadog Java SDK avec les données de formation mises en cache précédemment :

```shell
java -javaagent:/path/to/dd-java-agent.jar -XX:AOTCache=app.aot -jar App.jar
```

Vous pouvez visualiser les traces en utilisant le [Trace Explorer][9].

{{% collapse-content title="Dépannage" level="h4" %}}
##### Ne pas attacher le Datadog Java SDK lors de l'exécution de formation {#not-attaching-the-datadog-java-sdk-during-the-training-run}

Si vous voyez cet avertissement en production, cela signifie que le Datadog Java SDK n'a pas été attaché lors de la formation :

```
Mismatched values for property jdk.module.addmods: java.instrument specified during runtime but not during dump time
```
La JVM ne peut alors pas utiliser le cache AOT pour améliorer le temps de démarrage. La solution consiste à attacher le Datadog Java SDK lors de la formation.

{{% /collapse-content %}}

## Support de l'image native GraalVM {#graalvm-native-image-support}

L'image native GraalVM est une technologie qui vous permet de compiler des applications Java en exécutables natifs. Le Datadog Java SDK prend en charge l'image native GraalVM. Cela vous permet de compiler vos applications en exécutables natifs tout en bénéficiant des capacités de traçage offertes par la bibliothèque.

### Exigences {#requirements-1}

Utiliser :

- [GraalVM JDK 21 ou JDK 25][7]
- [Datadog Java SDK][1]

### Configuration {#setup-1}

{{< tabs >}}
{{% tab "GraalVM" %}}
Pour configurer le Datadog Java SDK avec GraalVM Native Image, suivez ces étapes :

1. Instrumentez votre application, en suivant les étapes décrites dans [Tracer les applications Java][6].
2. Lorsque vous construisez un exécutable natif avec la commande `native-image`, ajoutez l'argument `-J-javaagent:/path/to/dd-java-agent.jar`. Exemple :
   ```shell
   native-image -J-javaagent:/path/to/dd-java-agent.jar -jar App.jar
   ```
3. (Optionnel) Activez l'intégration du profiler en ajoutant l'argument suivant :
`-J-Ddd.profiling.enabled=true --enable-monitoring=jfr`.
   - Pour les versions du traceur antérieures à `1.39.1`, lors de l'exécution de l'exécutable natif généré, assurez-vous que `DD_PROFILING_START_FORCE_FIRST=true` est défini comme variable d'environnement.

[6]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Quarkus Native" %}}
Pour configurer le Datadog Java SDK avec Quarkus Native, suivez ces étapes :

1. Instrumentez votre application, en suivant les étapes décrites dans [Tracer les applications Java][6].
2. Lorsque vous construisez un exécutable natif, utilisez la propriété `quarkus.native.additional-build-args`. Exemple :
   ```shell
   ./mvnw package -Dnative -Dquarkus.native.additional-build-args='-J-javaagent:/path/to/dd-java-agent.jar'
   ```
3. (Facultatif) Activez l'intégration du profiler en ajoutant l'argument suivant :
`-J-Ddd.profiling.enabled=true --enable-monitoring=jfr`.
   - Pour les versions du traceur antérieures à `1.39.1`, lors de l'exécution de l'exécutable natif généré, assurez-vous que `DD_PROFILING_START_FORCE_FIRST=true` est défini comme variable d'environnement.

[6]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Spring Native" %}}
Pour configurer le Datadog Java SDK avec Spring Native, suivez ces étapes :

1. Instrumentez votre application, en suivant les étapes décrites dans [Tracer les applications Java][6].
2. Pour les constructions Spring Native basées sur Buildpacks, activez le [Paketo Buildpack pour Datadog][8] en utilisant `BP_DATADOG_ENABLED=true`.
    - Vous pouvez le faire au niveau de l'outil de construction, comme Maven :
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
3. (Facultatif) Activez l'intégration du profiler en définissant la variable d'environnement `BP_NATIVE_IMAGE_BUILD_ARGUMENTS=’-J-Ddd.profiling.enabled=true --enable-monitoring=jfr’`.
   - Pour les versions du traceur antérieures à `1.39.1`, lors de l'exécution de l'exécutable natif généré, assurez-vous que `DD_PROFILING_START_FORCE_FIRST=true` est défini comme variable d'environnement.

[6]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[8]: https://github.com/paketo-buildpacks/datadog
{{% /tab %}}

{{< /tabs >}}

<div class="alert alert-info">Pour GraalVM 25, vous pouvez voir des erreurs liées à <code>Use of Unsafe</code>. Ajouter <code>-Dnet.bytebuddy.safe=false</code> lors de la construction de l'exécutable natif pour résoudre ce problème.</div>

#### Utilisation {#usage-1}

Après avoir terminé la configuration, le service doit envoyer des traces à Datadog.

Vous pouvez visualiser les traces en utilisant le [Trace Explorer][9].

{{% collapse-content title="Dépannage" level="h4" %}}
##### Les fonctionnalités ne sont pas activées ou configurées correctement pour les images natives {#features-are-not-enabled-or-configured-correctly-for-native-images}

Il existe des problèmes connus concernant l'accès aux propriétés système à l'exécution depuis un binaire construit avec Graal Native Image.

- Pour la configuration à l'exécution, utilisez des variables d'environnement (`DD_PROPERTY_NAME=value`), au lieu des propriétés système (`-Ddd.property.name=value`).
- L'exception à cette règle est lors de l'activation du profileur. Dans ce cas, passez `-J-Ddd.profiling.enabled=true` à l'outil `native-image` au moment de la construction __.

##### Les versions du buildpack native-image antérieures à 5.12.2 {#native-image-buildpack-versions-older-than-5122}

Les anciennes versions du buildpack native-image exposent l'option suivante : `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM`.

Lorsque cette option est `false`, des exceptions comme celles-ci peuvent se produire :

```text
Caused by: org.graalvm.compiler.java.BytecodeParser$BytecodeParserError:
com.oracle.graal.pointsto.constraints.UnsupportedFeatureException:
No instances of datadog.trace.bootstrap.DatadogClassLoader are allowed in the image heap
as this class should be initialized at image runtime. To see how this object got
instantiated use --trace-object-instantiation=datadog.trace.bootstrap.DatadogClassLoader.
```

Les solutions à ce problème sont :

- Définir `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM` explicitement sur vrai dans la configuration de l'environnement de l'image,
- Ou mettre à niveau le buildpack `native-image` vers la version 5.12.2 ou ultérieure. La meilleure façon de procéder est de mettre à niveau le buildpack `java-native-image` vers la version 8.13.0 ou ultérieure.

##### Buildpack Paketo pour Datadog versions antérieures à 4.6.0 {#paketo-buildpack-for-datadog-versions-older-than-460}

Le buildpack Paketo pour Datadog avait un bug dans les anciennes versions qui se manifestait par le message d'erreur suivant :

```text
disabling Datadog at launch time is unsupported for Node
ERROR: failed to launch: exec.d: failed to execute exec.d file at path '/layers
paketo-buildpacks_datadog/helper/exec.d/toggle': exit status 1
```

La solution à ce problème est de mettre à niveau vers la version 4.6.0 ou ultérieure.

##### Le build Spring Native plante avec l'erreur exec.d/toggle {#spring-native-build-crashes-with-execdtoggle-error}

Vous pouvez rencontrer une erreur similaire à celle ci-dessus, même sur des versions de buildpack plus récentes que 4.6.0, lors de la construction d'une image native Spring Boot :

```text
disabling Datadog at launch time is unsupported for Node
ERROR: failed to launch: exec.d: failed to execute exec.d file at path '/layers
paketo-buildpacks_datadog/helper/exec.d/toggle': exit status 1
```

Cela se produit généralement parce que le buildpack Datadog s'exécute avant le buildpack d'image native, donc il ne sait pas qu'une construction d'image native est prévue. Il ajoute incorrectement un script de basculement destiné aux builds JVM, qui est incompatible avec l'exécutable natif final.

La solution consiste à définir explicitement la variable d'environnement `BP_NATIVE_IMAGE` sur `true` dans la configuration `spring-boot-maven-plugin`. Cela garantit que tous les buildpacks sont conscients qu'il s'agit d'une build d'image native dès le départ.

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

##### Problème d'activation du SDK Datadog {#problem-activating-datadog-sdk}

Vous pourriez rencontrer des erreurs d'initialisation si votre configuration de traceur repose sur les Unix Domain Sockets (UDS), qui ne sont pas pris en charge dans les images natives :

```text
dd.trace 2024-12-30 08:34:43:306 +0000] [main] WARN datadog.trace.agent.tooling.nativeimage.TracerActivation - Problem activating datadog tracer
java.lang.NoClassDefFoundError: Could not initialize class jnr.unixsocket.UnixSocketChannel
```

La solution consiste à configurer le traceur Java pour utiliser une communication basée sur l'hôte (`hostip` ou `service` mode), plutôt que sur une communication basée sur des sockets (`socket` mode).

Pour plus d'informations, voir [Configurer le mode de communication APM et DogstatsD][11]. Pour les configurations qui ne dépendent pas de l'Admission Controller, voir la documentation pour [DD_TRACE_AGENT_URL][12].

{{% /collapse-content %}}

## Lectures complémentaires {#further-reading}

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