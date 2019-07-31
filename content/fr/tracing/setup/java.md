---
title: Tracer des applications Java
kind: documentation
aliases:
  - /fr/tracing/java
  - /fr/tracing/languages/java
  - /fr/agent/apm/java/
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-java'
    tag: GitHub
    text: Code source de l'APM Datadog Java
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
  - link: tracing/advanced/
    tag: Utilisation avancée
    text: Utilisation avancée
---
## Installation et démarrage

Pour commencer le tracing d'applications écrites dans n'importe quel langage, vous devez d'abord [installer et configurer l'Agent Datadog][1]. Pour obtenir davantage d'informations, consultez la documentation relative au [tracing d'applications Docker][2] ou au [tracing d'applications Kubernetes][3].

Téléchargez ensuite `dd-java-agent.jar`, qui contient les fichiers de classe de l'Agent :

```shell
wget -O dd-java-agent.jar 'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.datadoghq&a=dd-java-agent&v=LATEST'
```

Enfin, vous devez ajouter l'argument JVM suivant lors du démarrage de votre application dans votre script d'application IDE, Maven ou Gradle ou la commande `java -jar` :

```
-javaagent:/chemin/vers/l/agent/java-dd.jar
```

Notez que les artefacts de `dd-trace-java` (`dd-java-agent.jar`, `dd-trace-api.jar`, `dd-trace-ot.jar`) prennent en charge tous les langages basés sur JVM, tels que Scala, Groovy, Kotlin, Clojure, etc. Si vous avez besoin d'utiliser un framework spécifique, pensez à effectuer une [contribution open source][4].

## Instrumentation automatique

L'instrumentation automatique pour Java utilise les fonctionnalités d'instrumentation `java-agent` [fournies par JVM][5]. Lorsqu'un `java-agent` est enregistré, il possède la capacité de modifier les fichiers de classe durant le chargement.
Le `java-agent` utilise le [framework Byte Buddy][6] pour trouver les classes définies pour l'instrumentation et modifier ces octets de classe en conséquence.

L'instrumentation peut provenir de l'instrumentation automatique, de l'API OpenTracing ou d'un mélange des deux. L'instrumentation capture généralement les informations suivantes :

* La durée est capturée à l'aide de l'horloge nanoseconde de JVM, sauf si un horodatage est fourni à partir de l'API OpenTracing
* Les paires de tags clé/valeur
* Les erreurs et les traces de pile non gérées par l'application
* Le nombre total de traces (requêtes) transmises via le système

## Compatibilité

Datadog prend officiellement en charge l'environnement Java JRE 1.7 et versions ultérieures d'Oracle JDK et OpenJDK. Datadog ne prend pas officiellement en charge toute version de Java en accès anticipé.

### Intégrations

La plupart des intégrations sont activées par défaut. Le paramètre suivant peut être utilisé pour les désactiver par défaut.

* Propriété système : `-Ddd.integrations.enabled=false`
* Variable d'environnement : `DD_INTEGRATIONS_ENABLED=false`

Les intégrations peuvent être activées ou désactivées individuellement (ce qui remplace la valeur par défaut ci-dessus).

* Propriété système : `-Ddd.integration.<integration-name>.enabled=true`
* Variable d'environnement : `DD_INTEGRATION_<NOM_INTÉGRATION>_ENABLED=true`

(Le nom de chaque intégration est affiché ci-dessous.)

Les intégrations bêta sont désactivées par défaut, mais peuvent être activées individuellement.

#### Compatibilité des frameworks Web

`dd-java-agent` prend en charge le tracing automatique des frameworks Web suivants :

| Serveur                       | Versions   | Prise en charge    | Noms d'instrumentation (utilisés pour la configuration) |
|------------------------------|------------|-----------------|------------------------------------------------|
| Serveur Akka-Http             | 10.0+      | Prise en charge complète | `akka-http`, `akka-http-server`                |
| Servlet Java compatible      | 2.3+, 3.0+ | Prise en charge complète | `servlet`, `servlet-2`, `servlet-3`            |
| Annotations Jax-RS           | JSR311-API | Prise en charge complète | `jax-rs`, `jaxrs`, `jax-rs-annotations`        |
| Jetty (hors servlet)          | 8+         | [Bêta][7]       | `jetty`, `jetty-8`                             |
| Netty HTTP Server            | 4.0+       | Prise en charge complète | `netty`, `netty-4.0`, `netty-4.1`              |
| Play                         | 2.4-2.6    | Prise en charge complète | `play`                                         |
| Ratpack                      | 1.4+       | [Bêta][7]       | `ratpack`                                      |
| Spark Java                   | 2.3+       | [Bêta][7]       | `sparkjava` (nécessite `jetty`)                 |
| Spring Web (MVC)             | 4.0+       | Prise en charge complète | `spring-web`                                   |
| Spring WebFlux               | 5.0+       | Prise en charge complète | `spring-webflux`                               |

**Le tracing de frameworks Web permet :** le calcul du délai entre la requête HTTP et la réponse, l'application de tags à la requête HTTP (code de statut, méthode, etc.), la capture des erreurs et des traces de pile, la mise en corrélation des requêtes Web avec les opérations en backend ainsi que la mise en place d'un tracing distribué.

*Remarque :* de nombreux serveurs d'applications sont compatibles avec les servlets et sont automatiquement couverts par cette instrumentation, y compris Tomcat, Jetty, Websphere, Weblogic, etc.
En outre, certains frameworks comme Spring Boot sont automatiquement pris en charge grâce à l'utilisation d'un serveur d'applications intégré compatible avec les servlets.

Vos frameworks Web préférés ne sont pas disponibles ? Datadog élargit continuellement la liste des frameworks pris en charge. Contactez [l'assistance Datadog][7] si vous avez besoin d'aide.

#### Compatibilité des frameworks réseau

`dd-java-agent` prend en charge le tracing automatique des frameworks réseau suivants :

| Framework                | Versions    | Type de prise en charge    | Noms d'instrumentation (utilisés pour la configuration) |
|--------------------------|-------------|-----------------|------------------------------------------------|
| Apache HTTP Client       | 4.0+        | Prise en charge complète | `httpclient`                                   |
| Apache HTTP Async Client | 4.0+        | Prise en charge complète | `httpasyncclient`, apache-httpasyncclient      |
| Kit de développement Java AWS             | 1.11+, 2.2+ | Prise en charge complète | `aws-sdk`                                      |
| Google HTTP Client       | 1.19.0+     | Prise en charge complète | `google-http-client`                           |
| gRPC                     | 1.5+        | Prise en charge complète | `grpc`, `grpc-client`, `grpc-server`           |
| HttpURLConnection        | Toutes         | Prise en charge complète | `httpurlconnection`, `urlconnection`           |
| Clients Kafka            | 0.11+       | Prise en charge complète | `kafka`                                        |
| Kafka Streams            | 0.11+       | Prise en charge complète | `kafka`, `kafka-streams`                       |
| Clients Jax RS           | 2.0+        | Prise en charge complète | `jax-rs`, `jaxrs`, `jax-rs-client`             |
| Jersey Client            | 1.9+        | Prise en charge complète | `jax-rs`, `jaxrs`, `jax-rs-client`             |
| JMS                      | 1 et 2     | Prise en charge complète | `jms`                                          |
| Netty HTTP Client        | 4.0+        | Prise en charge complète | `netty`, `netty-4.0`, `netty-4.1`              |
| OkHTTP                   | 3.0+        | Prise en charge complète | `okhttp`, `okhttp-3`                           |
| Rabbit AMQP              | 2.7+        | Prise en charge complète | `amqp`, `rabbitmq`                             |
| Spring WebClient         | 5.0+        | Prise en charge complète | `spring-webflux`, `spring-webflux-client`      |

**Le tracing de frameworks réseau permet :** le calcul du délai entre la requête et la réponse, l'application de tags à la requête (par exemple le code de réponse), la capture des erreurs et des traces de pile, ainsi que la mise en place d'un tracing distribué.

Votre framework réseau préféré n'est pas disponible ? Datadog élargit continuellement la liste des frameworks pris en charge. Contactez [l'assistance Datadog][7] si vous avez besoin d'aide.

#### Compatibilité des datastores

`dd-java-agent` prend en charge le tracing automatique des frameworks/pilotes de base de données suivants :

| Base de données                | Versions | Type de prise en charge    | Noms d'instrumentation (utilisés pour la configuration)                                           |
|-------------------------|----------|-----------------|------------------------------------------------------------------------------------------|
| Couchbase               | 2.0+     | Prise en charge complète | `couchbase`                                                                              |
| Cassandra               | 3.X      | Prise en charge complète | `cassandra`                                                                              |
| Elasticsearch Transport | 2.0+     | Prise en charge complète | `elasticsearch`, `elasticsearch-transport`, `elasticsearch-transport-{2,5,6}` (choisissez-en un) |
| Elasticsearch Rest      | 5.0+     | Prise en charge complète | `elasticsearch`, `elasticsearch-rest`, `elasticsearch-rest-5`, `elasticsearch-rest-6`    |
| Hibernate               | 3.5+     | Prise en charge complète | `hibernate`                                                                              |
| JDBC                    | S. O.      | Prise en charge complète | `jdbc`                                                                                   |
| Jedis                   | 1.4+     | Prise en charge complète | `redis`                                                                                  |
| Lettuce                 | 5.0+     | Prise en charge complète | `lettuce`                                                                                |
| MongoDB                 | 3.0+     | Prise en charge complète | `mongo`                                                                                  |
| SpyMemcached            | 2.12+    | Prise en charge complète | `spymemcached`                                                                           |

`dd-java-agent` est également compatible avec les pilotes JDBC courants, notamment :

*  Apache Derby
*  Firebird SQL
*  Moteur de base de données H2
*  HSQLDB
*  IBM DB2
*  MariaDB
*  MSSQL (Microsoft SQL Server)
*  MySQL
*  Oracle
*  Postgres SQL

**Le tracing de datastores permet :** le calcul du délai entre la requête et la réponse, la récupération des informations sur la requête (par exemple, la chaîne de requête expurgée) ainsi que la capture des erreurs et des traces de pile.

Vos datastores préférés ne sont pas disponibles ? Datadog élargit continuellement la liste des datastores pris en charge. Contactez [l'assistance Datadog][7] si vous avez besoin d'aide.

#### Compatibilité avec les autres frameworks

`dd-java-agent` prend en charge le tracing automatique des frameworks suivants :

| Framework        | Versions | Type de prise en charge    | Noms d'instrumentation (utilisés pour la configuration) |
|------------------|----------|-----------------|------------------------------------------------|
| Slf4J MDC        | 1+       | Prise en charge complète | `mdc` (voir également la configuration `dd.logs.injection`)    |
| JSP Rendering    | 2.3+     | Prise en charge complète | `jsp`, `jsp-render`                            |
| Dropwizard Views | 0.7+     | Prise en charge complète | `dropwizard`, `dropwizard-view`                |
| Hystrix          | 1.4+     | Prise en charge complète | `hystrix`                                      |
| Twilio SDK       | 0+       | Prise en charge complète | `twilio-sdk`                                   |

Votre framework préféré n'est pas disponible ? Datadog élargit continuellement la liste des frameworks pris en charge. Contactez [l'assistance Datadog][7] si vous avez besoin d'aide.

Pour améliorer la visibilité des applications utilisant des frameworks non pris en charge, considérez l'une des solutions suivantes :

* Ajout d'une instrumentation personnalisée (avec OpenTracing ou l'annotation `@Trace`).
* [Envoi d'une pull request][8] avec l'instrumentation en vue de son ajout dans une version future.
* Contact de [l'assistance Datadog][7] et envoi d'une demande d'ajout de fonctionnalité.

## Créez un fichier `conf.yaml` dans le dossier `logstash.d/` précédemment créé.

Le traceur est configuré à l'aide des propriétés système et des variables d'environnement comme suit :
(Voir la configuration spécifique de l'intégration dans la section [Intégrations](#integrations) ci-dessus.)

| Propriété système                        | Variable d'environnement                   | Valeur par défaut              | Description                                                                                                                                                                                                             |
|----------------------------------------|----------------------------------------|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dd.trace.enabled`                     | `DD_TRACE_ENABLED`                     | `true`               | Lorsque cette option est définie sur `false`, l'Agent est désactivé.                                                                                                                                                                                 |
| `dd.trace.config`                      | `DD_TRACE_CONFIG`                      | `null`               | Chemin facultatif vers le fichier contenant les propriétés de configuration, à raison d'une propriété de configuration par ligne. Par exemple, `dd.trace.enabled=nom-mon_service`                                                                                           |
| `dd.service.name`                      | `DD_SERVICE_NAME`                      | `unnamed-java-app`   | Le nom d'un ensemble de processus qui effectuent la même tâche. Utilisé pour regrouper les statistiques de votre application.                                                                                                                      |
| `dd.service.mapping`                   | `DD_SERVICE_MAPPING`                   | `null`               | (Exemple : `mysql:nom-du-service-db`.) Renomme de façon dynamique les services via la configuration. Utile pour faire en sorte que les bases de données affichent des noms distincts d'un service à l'autre.                                                          |
| `dd.writer.type`                       | `DD_WRITER_TYPE`                       | `DDAgentWriter`      | La valeur par défaut active l'envoi des traces à l'Agent. Si vous utilisez `LoggingWriter` dans votre configuration, les traces sont écrites dans la console.                                                                                                     |
| `dd.agent.host`                        | `DD_AGENT_HOST`                        | `localhost`          | Hostname vers lequel envoyer les traces. Si vous utilisez un environnement conteneurisé, configurez cette propriété sur l'IP du host. Consultez la documentation relative au [tracing d'applications Docker][1] pour en savoir plus.                                                   |
| `dd.trace.agent.port`                  | `DD_TRACE_AGENT_PORT`                  | `8126`               | Numéro du port sur lequel l'Agent effectue son écoute pour le host configuré.                                                                                                                                                              |
| `dd.trace.global.tags`                 | `DD_TRACE_GLOBAL_TAGS`                 | `null`               | (Exemple : `key1:value1,key2:value2`.) Une liste de tags par défaut à ajouter à chaque span et à chaque métrique JMX. Cette valeur est fusionnée dans `trace.span.tags` et `trace.jmx.tags` afin de configurer les deux depuis un seul emplacement. |
| `dd.trace.span.tags`                   | `DD_TRACE_SPAN_TAGS`                   | `null`               | (Exemple : `key1:value1,key2:value2`.) Une liste de tags par défaut à ajouter à chaque span. Les tags portant le même nom qui sont ajoutés directement à une span remplacent ceux par défaut fournis ici.                                             |
| `dd.trace.jmx.tags`                    | `DD_TRACE_JMX_TAGS`                    | `null`               | (Exemple : `key1:value1,key2:value2`) Une liste de tags par défaut à ajouter à chaque métrique JMX. Les tags portant le même nom qui sont ajoutés à la configuration de métriques JMX remplacent ceux par défaut fournis ici.                             |
| `dd.trace.header.tags`                 | `DD_TRACE_HEADER_TAGS`                 | `null`               | (Exemple : `en-tête-insensible-CASSE:nom-du-tag,User-ID:userId`.) Une liste des correspondances entre les clés d'en-tête et les noms de tag. Applique automatiquement des valeurs d'en-tête en tant que tags sur les traces.                                                                |
| `dd.trace.annotations`                 | `DD_TRACE_ANNOTATIONS`                 | ([Valeurs répertoriées ici][9])   | (Exemple : `com.some.Trace;io.other.Trace`.) Une liste des annotations de méthode à traiter en tant que `@Trace`.                                                                                                                           |
| `dd.trace.methods`                     | `DD_TRACE_METHODS`                     | `null`               | (Exemple : `package.ClassName[method1,method2…];AnonymousClass$1[call]`.) Liste des classes/interfaces et méthodes à tracer. Semblable à l'ajout de `@Trace`, mais sans changer le code.                                        |
| `dd.trace.partial.flush.min.spans`     | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`     | `1000`               | Définit le nombre de spans partielles à partir duquel celles-ci doivent être vidées. Permet de réduire la charge de la mémoire lors du traitement d'un trafic important ou de traces à exécution longue.                                                                                     |
| `dd.trace.report-hostname`             | `DD_TRACE_REPORT_HOSTNAME`             | `false`              | Lorsque cette option est activée, le hostname détecté est ajouté aux métadonnées de trace.                                                                                                                                                           |
| `dd.trace.db.client.split-by-instance` | `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` | `false`              | Lorsque cette option est définie sur `true`, les spans de base de données reçoivent le nom de l'instance en tant que nom du service.                                                                                                                                          |
| `dd.http.client.tag.query-string`      | `DD_HTTP_CLIENT_TAG_QUERY_STRING`      | `false`              | Lorsque cette option est définie sur `true`, les paramètres de chaîne de requête et le fragment sont ajoutés aux spans du client Web.                                                                                                                                   |
| `dd.http.server.tag.query-string`      | `DD_HTTP_SERVER_TAG_QUERY_STRING`      | `false`              | Lorsque cette option est définie sur `true`, les paramètres de chaîne de requête et le fragment sont ajoutés aux spans du serveur Web.                                                                                                                                   |
| `dd.jmxfetch.enabled`                  | `DD_JMXFETCH_ENABLED`                  | `true`               | Active la collecte de métriques JMX par l'agent de tracing Java.                                                                                                                                                                 |
| `dd.jmxfetch.metrics-configs`          | `DD_JMXFETCH_METRICS_CONFIGS`          | `null`               | (Exemple : `/fichier/emplacement1,/fichier/emplacement2`.) Fichiers de configuration de métriques supplémentaires pour la collecte de métriques JMX.                                                                                                           |
| `dd.jmxfetch.check-period`             | `DD_JMXFETCH_CHECK_PERIOD`             | `1500`               | Fréquence d'envoi des métriques JMX (en ms).                                                                                                                                                                                  |
| `dd.jmxfetch.refresh-beans-period`     | `DD_JMXFETCH_REFRESH_BEANS_PERIOD`     | `600`                | Fréquence d'actualisation de la liste des beans JMX disponibles (en secondes).                                                                                                                                                           |
| `dd.jmxfetch.statsd.host`              | `DD_JMXFETCH_STATSD_HOST`              | identique à `agent.host` | Host Statsd vers lequel envoyer les métriques JMX.                                                                                                                                                                                     |
| `dd.jmxfetch.statsd.port`              | `DD_JMXFETCH_STATSD_PORT`              | 8125                 | Port Statsd vers lequel envoyer les métriques JMX.                                                                                                                                                                                     |
| `dd.logs.injection`                    | `DD_LOGS_INJECTION`                    | false                | Active l'injection automatique des clés MDC pour les ID de span et de trace Datadog. Consultez la section [Utilisation avancée][10] pour en savoir plus                                                                                                                |

**Remarque** :

* Si le même type de clé est défini pour les deux, la configuration de la propriété système est prioritaire.
* Les propriétés système peuvent être utilisées comme paramètres JVM.

### Extraction et injection d'en-têtes B3

Le traceur de l'APM Datadog prend en charge [l'extraction et l'injection d'en-têtes B3][11] pour le tracing distribué.

L'injection d'en-têtes distribuées est contrôlée par
la configuration des styles d'injection/extraction. Deux styles sont
actuellement pris en charge :

* Datadog : `Datadog`
* B3 : `B3`

Les styles d'injection peuvent être configurés en utilisant les éléments suivants :

* Propriétés système : `-Ddd.propagation.style.inject=Datadog,B3`
* Variable d'environnement : `DD_PROPAGATION_STYLE_INJECTION=Datadog,B3`

La valeur de la propriété ou de la variable d'environnement est une liste de
styles d'en-tête séparés par des virgules (ou des espaces) qui sont activés pour
l'injection. Par défaut, seul le style d'injection Datadog est activé.

Les styles d'extraction peuvent être configurés en utilisant les éléments suivants :

* Propriété système : `-Ddd.propagation.style.extract=Datadog,B3`
* Variable d'environnement : `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

La valeur de la propriété ou de la variable d'environnement est une liste de
styles d'en-tête séparés par des virgules (ou des espaces) qui sont activés pour
l'extraction. Par défaut, seul le style d'extraction Datadog est activé.

Si plusieurs styles d'extraction sont activés, une tentative d'extraction est effectuée
dans l'ordre selon lequel ces styles ont été configurés, et la première valeur
extraite avec succès est utilisée.


## Transmission de traces

Lors de la transmission d'une trace à Datadog, voici ce qui se produit :

* La trace est recueillie
* La trace est transférée dans une file d'attente asynchrone de traces
  * La file d'attente présente une limite fixe de 7 000 traces
  * Une fois la limite atteinte, les traces sont supprimées
  * Le nombre total de traces est capturé pour veiller à la précision du débit
* Dans un thread de transmission distinct, la file d'attente de traces est vidée et les traces sont codées via msgpack, puis envoyées à l'Agent Datadog via http
* La file d'attente est vidée toutes les secondes

Pour voir le code utilisé, la documentation ou des exemples d'utilisation des
bibliothèques et frameworks pris en charge par Datadog, consultez la liste complète des composants
à instrumentation automatique pour les applications Java dans la section [Intégrations](#integrations).

### Annotation de trace

Ajoutez la dépendance `dd-trace-api` à votre projet. Pour Maven, ajoutez ce qui suit à `pom.xml` :

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-api</artifactId>
    <version>{version}</version>
</dependency>
```

Pour Gradle, ajoutez :

```gradle
compile group: 'com.datadoghq', name: 'dd-trace-api', version: {version}
```

Ajoutez maintenant `@Trace` au méthodes pour permettre leur tracing lors d'une exécution avec `dd-java-agent.jar`. Si l'Agent n'est pas associé, cette annotation n'a aucun effet sur votre application.

## Performances

L'APM Java a un impact minimal sur la charge d'une application :

* Toutes les collectes assurées par l'APM Java sont soumises à des limites de mémoire
* La transmission de traces ne bloque pas le thread de l'application
* L'APM Java entraîne généralement une augmentation de la charge processeur inférieure à 3 %
* L'APM Java entraîne généralement une augmentation de la charge mémoire de JVM inférieure à 3 %

## Modifier le hostname de l'Agent

Configurez vos traceurs d'applications de façon à envoyer des traces à un hostname d'Agent personnalisé :

Le module de tracing Java recherche automatiquement les variables ENV `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` et s'initialise avec celles-ci.

```bash
java -javaagent:<CHEMIN-AGENT-JAVA-DD>.jar -jar <CHEMIN_VOTRE_APPLICATION>.jar
```

Vous pouvez également utiliser des propriétés système :

```bash
java -javaagent:<CHEMIN-AGENT-JAVA-DD>.jar \
     -Ddd.agent.host=$DD_AGENT_HOST \
     -Ddd.agent.port=$DD_TRACE_AGENT_PORT \
     -jar <CHEMIN_VOTRE_APPLICATION>.jar
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup
[2]: /fr/tracing/setup/docker
[3]: /fr/agent/kubernetes/daemonset_setup/#trace-collection
[4]: https://github.com/DataDog/dd-trace-java/blob/master/CONTRIBUTING.md
[5]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[6]: http://bytebuddy.net
[7]: /fr/help
[8]: https://github.com/DataDog/documentation#outside-contributors
[9]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[10]: /fr/tracing/advanced/connect_logs_and_traces/?tab=java
[11]: https://github.com/openzipkin/b3-propagation