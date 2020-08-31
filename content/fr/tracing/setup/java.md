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
---
## Exigences de compatibilité

Le traceur Java nécessite l'environnement Java JRE 1.7 ou une version ultérieure pour Oracle JDK et OpenJDK. Datadog ne prend pas officiellement en charge toute version de Java en accès anticipé. Pour obtenir la liste complète des bibliothèques prises en charge, consultez la page [Exigences de compatibilité][1].

## Installation et démarrage

Si vous avez déjà un compte Datadog, vous trouverez des [instructions détaillées][2] dans nos guides intégrés à l'application pour les configurations basées sur un host et les configurations basées sur un conteneur.

Sinon, pour commencer le tracing d'applications écrites dans n'importe quel langage, vous devez d'abord [installer et configurer l'Agent Datadog][3]. Pour obtenir davantage d'informations, consultez la documentation relative au [tracing d'applications Docker][4] ou au [tracing d'applications Kubernetes][5].

Téléchargez ensuite `dd-java-agent.jar`, qui contient les fichiers de classe de l'Agent :

```shell
wget -O dd-java-agent.jar https://dtdg.co/latest-java-tracer
```

Enfin, vous devez ajouter l'argument JVM suivant lors du démarrage de votre application dans votre script d'application IDE, Maven ou Gradle ou la commande `java -jar` :

```text
-javaagent:/chemin/vers/agent-java-dd.jar
```

**Remarques** :

- Le `-javaagent` doit être exécuté avant le fichier `-jar` en l'ajoutant en tant qu'option JVM et non en tant qu'argument d'application. Pour en savoir plus, consultez la [documentation Oracle][6].

- Les artefacts de `dd-trace-java` (`dd-java-agent.jar`, `dd-trace-api.jar`, `dd-trace-ot.jar`) prennent en charge tous les langages basés sur JVM, tels que Scala, Groovy, Kotlin, Clojure, etc. Si vous avez besoin d'utiliser un framework spécifique, pensez à effectuer une [contribution open source][7].

## Instrumentation automatique

L'instrumentation automatique pour Java utilise les fonctionnalités d'instrumentation `java-agent` [fournies par JVM][8]. Lorsqu'un `java-agent` est enregistré, il possède la capacité de modifier les fichiers de classe durant le chargement.
Le `java-agent` utilise le [framework Byte Buddy][9] pour trouver les classes définies pour l'instrumentation et modifier ces octets de classe en conséquence.

L'instrumentation peut provenir de l'instrumentation automatique, de l'API OpenTracing ou d'un mélange des deux. L'instrumentation capture généralement les informations suivantes :

- La durée est capturée à l'aide de l'horloge nanoseconde de JVM, sauf si un horodatage est fourni à partir de l'API OpenTracing
- Les paires de tags clé/valeur
- Les erreurs et les traces de pile non gérées par l'application
- Le nombre total de traces (requêtes) transmises via le système

## Configuration

Toutes les options de configuration ci-dessous ont une propriété système et une variable d'environnement équivalentes.
Si le même type de clé est défini pour les deux, la configuration de la propriété système est prioritaire.
Les propriétés système peuvent être définies en tant que flags JVM.

### Tagging

| Propriété système                        | Variable d'environnement                   | Valeur par défaut                           | Description                                                                                                                                                                                                                                                           |
| -------------------------------------- | -------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dd.service`                      | `DD_SERVICE`                      | `unnamed-java-app`                | Le nom d'un ensemble de processus qui effectuent la même tâche. Utilisé pour regrouper les statistiques de votre application. Disponible à partir de la version 0.50.1.                                                                                                                                                                    |
| `dd.tags`                              | `DD_TAGS`                              | `null`                            | (Exemple : `layer:api,team:intake`) La liste des tags par défaut à ajouter à chaque span, profil et métrique JMX. Si la variable DD_ENV ou DD_VERSION est utilisée, tout tag « env » ou « version » défini dans DD_TAGS sera remplacé. Disponible à partir de la version 0.50.1.  |
|`dd.env`                              | `DD_ENV`                              | `none`                            | L'environnement de votre application (p. ex. production, staging, etc.). Disponible à partir de la version 0.48+.                                                    |
| `dd.version`                              | `DD_VERSION`                              | `null`                            | La version de votre application (p. ex. 2.5, 202003181415, 1.3-alpha, etc.). Disponible à partir de la version 0.48.             |
| `dd.logs.injection`                    | `DD_LOGS_INJECTION`                    | false                             | Active l'injection automatique des clés MDC pour les ID de span et de trace Datadog. Consultez la section [Utilisation avancée][10] pour en savoir plus.   |
| `dd.trace.config`                      | `DD_TRACE_CONFIG`                      | `null`                            | Chemin facultatif vers un fichier où les propriétés de configuration sont définies (une par ligne). Le chemin du fichier peut par exemple être spécifié via `-Ddd.trace.config=<CHEMIN_FICHIER>.properties`, en définissant le nom du service dans le fichier avec `dd.service.name=<NOM_SERVICE>`. |
| `dd.service.mapping`                   | `DD_SERVICE_MAPPING`                   | `null`                            | (Exemple : `mysql:my-mysql-service-name-db, postgres:my-postgres-service-name-db`) Renomme de façon dynamique les services via la configuration. Utile pour faire en sorte que les bases de données affichent des noms distincts d'un service à l'autre.                                                                                                       |
| `dd.writer.type`                       | `DD_WRITER_TYPE`                       | `DDAgentWriter`                   | La valeur par défaut active l'envoi des traces à l'Agent. Si vous utilisez `LoggingWriter` dans votre configuration, les traces sont écrites dans la console.                       |
| `dd.agent.host`                        | `DD_AGENT_HOST`                        | `localhost`                       | Hostname vers lequel envoyer les traces. Si vous utilisez un environnement conteneurisé, configurez cette propriété sur l'IP du host. Consultez la documentation relative au [tracing d'applications Docker][4] pour en savoir plus.                                                                                                  |
| `dd.trace.agent.port`                  | `DD_TRACE_AGENT_PORT`                  | `8126`                            | Numéro du port sur lequel l'Agent effectue son écoute pour le host configuré.                                                                                |
| `dd.trace.agent.unix.domain.socket`    | `DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`    | `null`                            | Permet de faire passer des données de tracing par un proxy en vue de leur envoi vers un Agent Datadog distant.                                                            |
| `dd.trace.agent.timeout`               | `DD_TRACE_AGENT_TIMEOUT`               | `10`                              | Délai d'expiration en secondes pour les interactions réseau avec l'Agent Datadog.                                                                                                                                                                                                   |
| `dd.trace.header.tags`                 | `DD_TRACE_HEADER_TAGS`                 | `null`                            | (Exemple : `en-tête-insensible-CASSE:nom-du-tag,User-ID:userId`.) Une liste des correspondances entre les clés d'en-tête et les noms de tag. Applique automatiquement les valeurs d'en-tête en tant que tags sur les traces.                                                                                                               |
| `dd.trace.annotations`                 | `DD_TRACE_ANNOTATIONS`                 | ([valeurs répertoriées ici][11])               | (Exemple : `com.some.Trace;io.other.Trace`.) Une liste des annotations de méthode à traiter en tant que `@Trace`.                                            |
| `dd.trace.methods`                     | `DD_TRACE_METHODS`                     | `null`                            | (Exemple :`"package.ClassName[method1,method2,...];AnonymousClass$1[call]"`.) Liste des classes/interfaces et méthodes à tracer. Semblable à l'ajout de `@Trace`, mais sans changer le code.                                                                                       |
| `dd.trace.partial.flush.min.spans`     | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`     | `1000`                            | Définit le nombre de spans partielles à partir duquel celles-ci doivent être vidées. Permet de réduire la charge de la mémoire en cas de traitement d'un trafic important ou de traces à exécution longue.     |
| `dd.trace.split-by-tags`               | `DD_TRACE_SPLIT_BY_TAGS`               | `null`                            | (Exemple : `aws.service`) Utilisé pour renommer les spans identifiées avec le tag de service correspondant                                       |
| `dd.trace.db.client.split-by-instance` | `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` | `false`                           | Lorsque cette option est définie sur `true`, les spans de base de données reçoivent le nom de l'instance en tant que nom du service.                                                                     |
| `dd.trace.health.metrics.enabled`      | `DD_TRACE_HEALTH_METRICS_ENABLED`      | `false`                           | Définir sur `true` pour envoyer des métriques de santé du tracer                                                                                             |
| `dd.trace.health.metrics.statsd.host`  | `DD_TRACE_HEALTH_METRICS_STATSD_HOST`  | identique à `dd.jmxfetch.statsd.host` | Host Statsd vers lequel envoyer les métriques de santé                                                                                                     |
| `dd.trace.health.metrics.statsd.port`  | `DD_TRACE_HEALTH_METRICS_STATSD_PORT`  | identique à `dd.jmxfetch.statsd.port` | Port Statsd vers lequel envoyer les métriques de santé                                                                                                    |
| `dd.http.client.tag.query-string`      | `DD_HTTP_CLIENT_TAG_QUERY_STRING`      | `false`                           | Lorsque cette option est définie sur `true`, les paramètres de chaîne de requête et le fragment sont ajoutés aux spans du client Web.                                                    |
| `dd.http.client.error.statuses`        | `DD_HTTP_CLIENT_ERROR_STATUSES`        | `400-499`                           | Permet de définir une plage d'erreurs à accepter. Par défaut, les erreurs 4xx sont signalées comme des erreurs pour les clients http. Ce paramètre remplace ce comportement. Par exemple, `dd.http.client.error.statuses=400-499`                                                                                                    |
| `dd.http.server.error.statuses`        | `DD_HTTP_SERVER_ERROR_STATUSES`        | `500-599`                           | Permet de définir une plage d'erreurs à accepter. Par défaut, les codes de statut 5xx sont signalés comme des erreurs pour les serveurs http. Ce paramètre remplace ce comportement. Par exemple, `dd.http.server.error.statuses=500-599`                                                                                                    |
| `dd.http.server.tag.query-string`      | `DD_HTTP_SERVER_TAG_QUERY_STRING`      | `false`                           | Lorsque cette option est définie sur `true`, les paramètres de chaîne de requête et le fragment sont ajoutés aux spans du serveur Web.                                                     |
| `dd.trace.enabled`                     | `DD_TRACE_ENABLED`                     | `true`                            | Lorsque cette option est définie sur `false`, l'Agent est désactivé.                                                                                                 |
| `dd.jmxfetch.enabled`                  | `DD_JMXFETCH_ENABLED`                  | `true`                            | Active la collecte de métriques JMX par l'Agent de tracing Java.                                                                                  |
| `dd.jmxfetch.config.dir`               | `DD_JMXFETCH_CONFIG_DIR`               | `null`                            | (Exemple : `/opt/datadog-agent/etc/conf.d`) Répertoire de configuration supplémentaire pour la collecte de métriques JMX. L'Agent Java recherche `jvm_direct:true` dans la section `instance` du fichier `yaml` pour changer la configuration.                                            |
| `dd.jmxfetch.config`                   | `DD_JMXFETCH_CONFIG`                   | `null`                            | (Exemple : `activemq.d/conf.yaml, jmx.d/conf.yaml`) Fichier de configuration de métriques supplémentaires pour la collecte de métriques JMX. L'Agent Java recherche `jvm_direct:true` dans la section `instance` du fichier `yaml` pour changer la configuration.                                  |
| `dd.jmxfetch.check-period`             | `DD_JMXFETCH_CHECK_PERIOD`             | `1500`                            | Fréquence d'envoi des métriques JMX (en ms).                                                                                                   |
| `dd.jmxfetch.refresh-beans-period`     | `DD_JMXFETCH_REFRESH_BEANS_PERIOD`     | `600`                             | Fréquence d'actualisation de la liste des beans JMX disponibles (en secondes).                                                                             |
| `dd.jmxfetch.statsd.host`              | `DD_JMXFETCH_STATSD_HOST`              | identique à `agent.host`              | Host Statsd vers lequel envoyer les métriques JMX. Si vous utilisez des sockets de domaine Unix, utilisez un argument tel que 'unix://CHEMIN_VERS_SOCKET_UDS'. Par exemple : `unix:///var/datadog-agent/dsd.socket`                                                                                                            |
| `dd.jmxfetch.statsd.port`              | `DD_JMXFETCH_STATSD_PORT`              | 8125                              | Port StatsD vers lequel envoyer les métriques JMX. Si vous utilisez des sockets de domaine Unix, saisissez 0.                                                                                                                                                                                                                              |
| `dd.integration.opentracing.enabled`              | `DD_INTEGRATION_OPENTRACING_ENABLED`              | true                              | Par défaut, le client de tracing détecte si un GlobalTracer est en cours de chargement et enregistre un traceur dans celui-ci de manière dynamique. En définissant cette option sur false, toute dépendance entre le traceur et OpenTracing est supprimée.                                                                                                                                                                                                                              |
| `dd.hystrix.tags.enabled` | `DD_HYSTRIX_TAGS_ENABLED` | Non | Par défaut, les tags associés au groupe, à la commande et au statut du circuit Hystrix sont désactivés. Cette propriété permet de les activer. |

**Remarques** :

- Si le même type de clé est défini pour les deux, la configuration de la propriété système est prioritaire.
- Les propriétés système peuvent être utilisées comme paramètres JVM.
- Par défaut, les métriques JMX de votre application sont envoyées à l'Agent Datadog via DogStatsD sur le port `8125`. Vérifiez que [DogStatsD est activé pour l'Agent][12].

  - Si vous exécutez l'Agent en tant que conteneur, vérifiez que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [est définie sur `true`][13] et que le port `8125` est ouvert sur le conteneur de l'Agent.
  - Dans Kubernetes, [bindez le port DogStatsD à un port du host][14] ; dans ECS, [définissez les flags appropriés dans la définition de votre tâche][15].

### Intégrations

Découvrez comment désactiver les intégrations dans la section relative à la compatibilité des [intégrations][16].

### Exemples

#### `dd.service.mapping`

**Exemple avec une propriété système** :

```shell
java -javaagent:/chemin/vers/agent-java-dd.jar -Ddd.service.name=web-app -Ddd.service.mapping=postgresql:web-app-pg -jar chemin/vers/application.jar
```

{{< img src="tracing/setup/java/service_mapping.png" alt="mapping de service"  >}}

#### `dd.tags`

**Configuration d'un environnement global pour les spans et les métriques JMX** :

```shell
java -javaagent:/chemin/vers/agent-java-dd.jar -Ddd.service.name=web-app -Ddd.tags=env:dev -jar chemin/vers/application.jar
```

{{< img src="tracing/setup/java/trace_global_tags.png" alt="tags globaux de trace"  >}}

#### `dd.trace.span.tags`

**Exemple d'ajout de project:test à chaque span** :

```shell
java -javaagent:/chemin/vers/agent-java-dd.jar -Ddd.service.name=web-app -Ddd.trace.global.tags=env:dev -Ddd.trace.span.tags=project:test -jar chemin/vers/application.jar
```

{{< img src="tracing/setup/java/trace_span_tags.png" alt="tags de span de trace"  >}}

#### `dd.trace.jmx.tags`

**Définition de custom.type:2 sur une métrique JMX** :

```shell
java -javaagent:/chemin/vers/agent-java-dd.jar -Ddd.service.name=web-app -Ddd.trace.global.tags=env:dev -Ddd.trace.span.tags=project:test -Ddd.trace.jmx.tags=custom.type:2 -jar chemin/vers/application.jar
```

{{< img src="tracing/setup/java/trace_jmx_tags.png" alt="tags JMX de trace"  >}}

#### `dd.trace.methods`

**Exemple avec une propriété système** :

```shell
java -javaagent:/chemin/vers/agent-java-dd.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.methods="hello.GreetingController[doSomeStuff,doSomeOtherStuff];hello.Randomizer[randomize]" -jar chemin/vers/application.jar
```

{{< img src="tracing/setup/java/trace_methods.png" alt="méthodes à tracer"  >}}

#### `dd.trace.db.client.split-by-instance`

Exemple avec une propriété système :

```shell
java -javaagent:/chemin/vers/agent-java-dd.jar -Ddd.trace.global.tags=env:dev -Ddd.service.name=web-app -Ddd.trace.db.client.split-by-instance=TRUE -jar chemin/vers/application.jar
```

L'instance de base de données 1, `webappdb`, possède désormais son propre nom de service, le même que celui indiqué dans les métadonnées de span `db.instance` :

{{< img src="tracing/setup/java/split_by_instance_1.png" alt="instance 1"  >}}

L'instance de base de données 2, `secondwebappdb`, possède désormais son propre nom de service, le même que celui indiqué dans les métadonnées de span `db.instance` :

{{< img src="tracing/setup/java/split_by_instance_2.png" alt="instance 2"  >}}

De même, sur la service map, une app Web appelle désormais deux bases de données Postgres distinctes.

#### `dd.http.server.tag.query-string`

Exemple avec une propriété système :

```shell
java -javaagent:/chemin/vers/agent-java-dd.jar -Ddd.service.name=web-app -Ddd.trace.global.tags=env:dev -Ddd.http.server.tag.query-string=TRUE -jar chemin/vers/application.jar
```

{{< img src="tracing/setup/java/query_string.png" alt="chaîne de la requête"  >}}

#### `dd.trace.enabled`

**Exemple avec une propriété système et le mode debugging d'app**

```shell
java -javaagent:/chemin/vers/agent-java-dd.jar -Ddd.trace.enabled=false -Ddatadog.slf4j.simpleLogger.defaultLogLevel=debug -jar chemin/vers/application.jar
```

Les logs de debugging d'app indiquent, avec le message `Tracing is disabled, not installing instrumentations`, que le tracing est désactivé et qu'aucune instrumentation n'est en cours d'installation.

#### `dd.jmxfetch.config.dir` et `dd.jmxfetch.config`

Exemple de configuration :

- Combinaison `DD_JMXFETCH_CONFIG_DIR=<CHEMIN_RÉPERTOIRE>` + `DD_JMXFETCH_CONFIG=conf.yaml`
- Ou directement avec `DD_JMXFETCH_CONFIG=<CHEMIN_RÉPERTOIRE>/conf.yaml`

Avec le contenu suivant pour `conf.yaml` :

```yaml
init_config:
instances:
    - jvm_direct: true
      port: '<PORT>'
      conf:
          - include:
                bean:
                    - java.lang:type=MemoryPool,name=Metaspace
                attribute:
                    Usage.used:
                        metric_type: gauge
                        alias: sb.usage.used
```

On obtient le résultat suivant :

{{< img src="tracing/setup/java/jmxfetch_example.png" alt="exemple JMXFetch"  >}}

Consultez la [documentation relative à l'intégration Java][17] pour en savoir plus sur la collecte de métriques Java avec JMXFetch.

### Extraction et injection d'en-têtes B3

Le traceur de l'APM Datadog prend en charge [l'extraction et l'injection d'en-têtes B3][18] pour le tracing distribué.

L'injection et l'extraction distribuées d'en-têtes sont contrôlées en configurant des styles d'injection/extraction. Deux styles sont actuellement pris en charge :

- Datadog : `Datadog`
- B3 : `B3`

Les styles d'injection peuvent être configurés via :

- Propriété système : `-Ddd.propagation.style.inject=Datadog,B3`
- Variable d'environnement : `DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

La propriété ou la variable d'environnement prend pour valeur une liste de styles d'en-tête séparés par des virgules (ou des espaces) qui sont activés pour l'injection. Par défaut, seul le style d'injection Datadog est activé.

Les styles d'extraction peuvent être configurés via :

- Propriété système : `-Ddd.propagation.style.extract=Datadog,B3`
- Variable d'environnement : `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

La propriété ou la variable d'environnement prend pour valeur une liste de styles d'en-tête séparés par des virgules (ou des espaces) qui sont activés pour l'extraction. Par défaut, seul le style d'extraction Datadog est activé.

Si plusieurs styles d'extraction sont activés, une tentative d'extraction est effectuée dans l'ordre selon lequel ces styles ont été configurés, et la première valeur extraite avec succès est utilisée.

## Transmission de traces

Voici à quoi ressemble le processus de transmission de trace à Datadog :

- La trace est recueillie.
- La trace est transférée dans une file d'attente asynchrone de traces.
    - La file d'attente présente une limite fixe de 7 000 traces.
    - Une fois la limite atteinte, les traces sont supprimées.
    - Le nombre total de traces est capturé pour assurer l'intégrité des données.
- Dans un thread de transmission distinct, la file d'attente de traces est vidée et les traces sont codées via msgpack, puis envoyées à l'Agent Datadog via http.
- La file d'attente est vidée toutes les secondes.

Pour voir le code utilisé, la documentation ou des exemples d'utilisation des bibliothèques et frameworks pris en charge par Datadog, consultez la liste complète des composants à instrumentation automatique pour les applications Java dans la section [Intégrations](#integrations).

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

Ajoutez maintenant `@Trace` aux méthodes pour permettre leur tracing lors d'une exécution avec `dd-java-agent.jar`. Si l'Agent n'est pas associé, cette annotation n'a aucun effet sur votre application.

Les annotations `@Trace` prennent le nom d'opération par défaut `trace.annotation`, tandis que la méthode tracée prend la ressource par défaut.

## Performances

L'APM Java a un impact minimal sur la charge d'une application :

- Toutes les collectes assurées par l'APM Java sont soumises à des limites de mémoire
- La transmission de traces ne bloque pas le thread de l'application
- L'APM Java charge des classes supplémentaires pour la collecte de traces et l'instrumentation de la bibliothèque
- L'APM Java entraîne généralement une augmentation de la charge processeur inférieure à 3 %
- L'APM Java entraîne généralement une augmentation de la charge mémoire de JVM inférieure à 3 %

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

[1]: /fr/tracing/compatibility_requirements/java
[2]: https://app.datadoghq.com/apm/install
[3]: /fr/tracing/send_traces/
[4]: /fr/tracing/setup/docker/
[5]: /fr/agent/kubernetes/apm/
[6]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[7]: https://github.com/DataDog/dd-trace-java/blob/master/CONTRIBUTING.md
[8]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[9]: http://bytebuddy.net
[10]: /fr/tracing/connect_logs_and_traces/java/
[11]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[12]: /fr/developers/dogstatsd/#setup
[13]: /fr/agent/docker/#dogstatsd-custom-metrics
[14]: /fr/developers/dogstatsd/
[15]: /fr/integrations/amazon_ecs/?tab=python#create-an-ecs-task
[16]: /fr/tracing/compatibility_requirements/java#disabling-integrations
[17]: /fr/integrations/java/?tab=host#metric-collection
[18]: https://github.com/openzipkin/b3-propagation