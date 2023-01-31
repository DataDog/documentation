---
title: Exigences de compatibilité Java
kind: documentation
description: Exigences de compatibilité pour le traceur Java
further_reading:
  - link: tracing/setup/java
    tag: Documentation
    text: Instrumenter votre application
---
## Compatibilité

La bibliothèque de tracing Datadog Java est open source. Consultez le [référentiel GitHub][1] pour en savoir plus.

Datadog prend officiellement en charge l'environnement Java JRE 1.7 et versions ultérieures d'Oracle JDK et OpenJDK. Datadog ne prend pas officiellement en charge toute version de Java en accès anticipé.

Les intégrations bêta sont désactivées par défaut. Vous pouvez cependant les activer individuellement.

- System Property: `-Ddd.integration.<NOM_INTÉGRATION>.enabled=true`
- Variable d'environnement : `DD_INTEGRATION_<NOM_INTÉGRATION>_ENABLED=true`

### Compatibilité des frameworks Web

`dd-java-agent` prend en charge le tracing automatique des frameworks Web suivants :

**Le tracing de frameworks Web offre les fonctionnalités suivantes :**

- Calcul de la durée entre les requêtes HTTP et leur réponse
- Ajout de tags pour les requêtes HTTP (code de statut, méthode, etc.)
- Capture des erreurs et des stack traces
- Mise en corrélation des tâches créées au sein d'une requête Web et du tracing distribué

| Serveur                  | Versions   | Type de prise en charge    | Noms des instrumentations (utilisés pour la configuration) |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- |
| Serveur Akka-Http        | 10.0+      | Prise en charge complète | `akka-http`, `akka-http-server`                |
| Finatra Web             | 2.9+       | Prise en charge complète | `finatra`                                      |
| Grizzly                 | 2.0+       | [Bêta][2]       | `grizzly`                                      |
| Grizzly-HTTP            | 2.3.20+    | [Bêta][2]       | `grizzly-filterchain`                          |
| Servlet Java compatible | 2.3+, 3.0+ | Prise en charge complète | `servlet`, `servlet-2`, `servlet-3`            |
| Annotations Jax-RS      | JSR311-API | Prise en charge complète | `jax-rs`, `jaxrs`, `jax-rs-annotations`, `jax-rs-filter` |
| Jetty (hors servlet)     | 8+         | [Bêta][2]       | `jetty`, `jetty-8`                             |
| Netty HTTP Server       | 3.8+       | Prise en charge complète | `netty`, `netty-3.8`, `netty-4.0`, `netty-4.1` |
| Play                    | 2.3 à 2.8    | Prise en charge complète | `play`, `play-action`                          |
| Ratpack                 | 1.5+       | Prise en charge complète | `ratpack`                                      |
| Spark Java              | 2.3+       | [Bêta][2]       | `sparkjava` (nécessite `jetty`)                 |
| Spring Web (MVC)        | 4.0+       | Prise en charge complète | `spring-web`                                   |
| Spring WebFlux          | 5.0+       | Prise en charge complète | `spring-webflux`                               |

**Remarque** : de nombreux serveurs d'applications sont compatibles avec les servlets et sont automatiquement couverts par cette instrumentation. C'est le cas de Tomcat, Jetty, Websphere, Weblogic et JBoss.
En outre, certains frameworks comme Spring Boot sont automatiquement pris en charge car ils utilisent généralement un serveur d'applications intégré compatible avec les servlets (Tomcat/Jetty/Netty).

Vos frameworks Web préférés ne sont pas disponibles ? Datadog élargit continuellement la liste des frameworks pris en charge. Contactez [l'assistance Datadog][2] si vous avez besoin d'aide.

### Compatibilité des frameworks réseau

`dd-java-agent` prend en charge le tracing automatique des frameworks réseau suivants :

**Le tracing réseau offre les fonctionnalités suivantes :**

- Calcul de la durée entre les requêtes HTTP et leur réponse
- Ajout de tags pour les requêtes (p. ex., code de réponse)
- Capture des erreurs et des stack traces
- Tracing distribué


| Framework                | Versions    | Type de prise en charge    | Noms des instrumentations (utilisés pour la configuration) |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- |
| Apache HTTP Client       | 4.0+        | Prise en charge complète | `httpclient`, `apache-httpclient`, `apache-http-client` |
| Apache HTTP Async Client | 4.0+        | Prise en charge complète | `httpasyncclient`, `apache-httpasyncclient`    |
| Kit de développement Java AWS             | 1.11+, 2.2+ | Prise en charge complète | `aws-sdk`                                      |
| Commons HTTP Client      | 2.0+        | Prise en charge complète | `commons-http-client`                          |
| Google HTTP Client       | 1.19.0+     | Prise en charge complète | `google-http-client`                           |
| Grizzly HTTP Client      | 1.9+        | [Bêta][3]         | `grizzly-client`                               |
| gRPC                     | 1.5+        | Prise en charge complète | `grpc`, `grpc-client`, `grpc-server`           |
| HttpURLConnection        | Toutes         | Prise en charge complète | `httpurlconnection`, `urlconnection`           |
| Clients Kafka            | 0.11+       | Prise en charge complète | `kafka`                                        |
| Kafka Streams            | 0.11+       | Prise en charge complète | `kafka`, `kafka-streams`                       |
| Java RMI                 | Toutes         | Prise en charge complète | `rmi`, `rmi-client`, `rmi-server`              |
| Clients Jax RS           | 2.0+        | Prise en charge complète | `jax-rs`, `jaxrs`, `jax-rs-client`             |
| Jersey Client            | 1.9+        | Prise en charge complète | `jax-rs`, `jaxrs`, `jax-rs-client`             |
| JMS                      | 1 et 2     | Prise en charge complète | `jms`, `jms-1`, `jms-2`                        |
| Netty HTTP Client        | 4.0+        | Prise en charge complète | `netty`, `netty-4.0`, `netty-4.1`              |
| Ning HTTP Client         | 1.9.0+      | [Bêta][3]         | `ning`                                         |
| OkHTTP                   | 2.2+        | Prise en charge complète | `okhttp`, `okhttp-2`,`okhttp-3`                |
| Play WSClient            | 1.0+        | Prise en charge complète | `play-ws`                                      |
| Rabbit AMQP              | 2.7+        | Prise en charge complète | `amqp`, `rabbitmq`                             |
| Spring SessionAwareMessageListener              | 3.1+        | Prise en charge complète | `spring-jms-3.1`                             |
| Spring WebClient         | 5.0+        | Prise en charge complète | `spring-webflux`, `spring-webflux-client`      |

**Remarque** : l'intégration Kafka/Datadog fonctionne avec Kafka version `0.11+`, qui prend en charge l'API Header. Cette API est utilisée pour injecter et extraire le contexte de tracing. Si vous utilisez un environnement à versions mixtes, le broker Kafka peut transmettre la version la plus récente de Kafka par erreur, et le traceur tente alors d'injecter des en-têtes qui ne sont pas pris en charge par le producer local. En outre, les consommateurs plus anciens ne sont pas en mesure de consommer le message à cause de la présence des en-têtes. Pour éviter ces problèmes, si vous utilisez un environnement Kafka à versions mixtes avec des versions antérieures à 0.11, désactivez la propagation du contexte avec la variable d'environnement suivante : `DD_KAFKA_CLIENT_PROPAGATION_ENABLED=false`.

Vos frameworks réseau préférés ne sont pas disponibles ? Datadog élargit continuellement la liste des frameworks pris en charge. Contactez [l'assistance Datadog][2] si vous avez besoin d'aide.

### Compatibilité des datastores

`dd-java-agent` prend en charge le tracing automatique des frameworks/pilotes de base de données suivants :

**Le tracing Datadog offre les fonctionnalités suivantes :**

- Calcul de la durée entre les requêtes HTTP et leur réponse
- Récupération d'informations sur les requêtes (p. ex., la chaîne de requête expurgée)
- Capture des erreurs et des stack traces

| Base de données                | Versions | Type de prise en charge    | Noms des instrumentations (utilisés pour la configuration)                                           |
| ----------------------- | -------- | --------------- | ---------------------------------------------------------------------------------------- |
| Couchbase               | 2.0+     | Prise en charge complète | `couchbase`                                                                              |
| Cassandra               | 3.X      | Prise en charge complète | `cassandra`                                                                              |
| Elasticsearch Transport | 2.0-6.x  | Prise en charge complète | `elasticsearch`, `elasticsearch-transport`, `elasticsearch-transport-{2,5,6}` (choisir un nom) |
| Elasticsearch Rest      | 5.0-6.x  | Prise en charge complète | `elasticsearch`, `elasticsearch-rest`, `elasticsearch-rest-5`, `elasticsearch-rest-6`    |
| JDBC                    | S. O.      | Prise en charge complète | `jdbc`, `jdbc-datasource`                                                                |
| Jedis                   | 1.4+     | Prise en charge complète | `jedis`, `redis`                                                                         |
| Lettuce                 | 4.0+     | Prise en charge complète | `lettuce`, `lettuce-4-async`, `lettuce-5-rx`                                             |
| MongoDB                 | 3.0+     | Prise en charge complète | `mongo`                                                                                  |
| RediScala               | 1.5+     | Prise en charge complète | `rediscala`, `redis`                                                                     |
| SpyMemcached            | 2.12+    | Prise en charge complète | `spymemcached`                                                                           |

`dd-java-agent` est également compatible avec les pilotes JDBC courants, notamment :

- Apache Derby
- Firebird SQL
- Moteur de base de données H2
- HSQLDB
- IBM DB2
- MariaDB
- MSSQL (Microsoft SQL Server)
- MySQL
- Oracle
- Postgres SQL
- ScalikeJDBC

Vos datastores préférés ne sont pas disponibles ? Datadog élargit continuellement la liste des datastores pris en charge. Contactez [l'assistance Datadog][2] si vous avez besoin d'aide.

### Compatibilité avec les autres frameworks

`dd-java-agent` prend en charge le tracing automatique des frameworks suivants :

| Framework         | Versions | Type de prise en charge    | Noms des instrumentations (utilisés pour la configuration) |
| ----------------- | -------- | --------------- | ---------------------------------------------- |
| Dropwizard Views  | 0.7+     | Prise en charge complète | `dropwizard`, `dropwizard-view`                |
| Hibernate         | 3.5+     | Prise en charge complète | `hibernate`, `hibernate-core`                  |
| Hystrix           | 1.4+     | Prise en charge complète | `hystrix`                                      |
| JSP Rendering     | 2.3+     | Prise en charge complète | `jsp`, `jsp-render`, `jsp-compile`             |
| Slf4J MDC         | 1+       | Prise en charge complète | `mdc` (voir également la configuration pour `dd.logs.injection`) |
| Project Reactor   | 3.1+     | Prise en charge complète | `reactor-core`                                 |
| Spring Data       | 1.8+     | Prise en charge complète | `spring-data`                                  |
| Spring Scheduling | 3.1+     | Prise en charge complète | `spring-scheduling`                            |
| Twilio SDK        | 0+       | Prise en charge complète | `twilio-sdk`                                   |

Vos frameworks préférés ne sont pas disponibles ? Datadog élargit continuellement la liste des frameworks pris en charge. Pour demander l'ajout d'un framework, contactez notre [formidable équipe d'assistance][2].

Pour profiter d'une meilleure visibilité sur vos applications utilisant des frameworks non pris en charge, vous pouvez :

- [Ajouter une instrumentation personnalisée][4]
- [Envoyer une pull request][5] avec l'instrumentation en vue de son ajout dans une version future
- Contacter l'[assistance Datadog][2] et envoyer une demande d'ajout de fonctionnalité

### Désactivation d'intégrations

La plupart des intégrations sont activées par défaut. Le paramètre suivant peut être utilisé pour les désactiver par défaut.

- Propriété système : `-Ddd.integrations.enabled=false`
- Variable d'environnement : `DD_INTEGRATIONS_ENABLED=false`

Les intégrations peuvent être activées ou désactivées individuellement (ce qui remplace le paramètre par défaut ci-dessus).

- System Property: `-Ddd.integration.<NOM_INTÉGRATION>.enabled=true`
- Variable d'environnement : `DD_INTEGRATION_<NOM_INTÉGRATION>_ENABLED=true`

(Le nom de chaque intégration est affiché ci-dessus.)


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java
[2]: /fr/help/
[3]: http://bytebuddy.net
[4]: /fr/tracing/manual_instrumentation/java
[5]: https://github.com/DataDog/documentation#outside-contributors