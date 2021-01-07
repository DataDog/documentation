---
title: Tracer des applications Java
kind: documentation
aliases:
  - /fr/tracing/java
  - /fr/tracing/languages/java
  - /fr/agent/apm/java/
  - /fr/tracing/setup/java
  - /fr/tracing/setup_overview/java
code_lang: java
type: multi-code-lang
code_lang_weight: 0
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-java'
    tag: GitHub
    text: Code source de l'APM Datadog Java
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
## Exigences de compatibilité

La bibliothèque de tracing Java prend en charge toutes les JVM sur toutes les plateformes à partir de la version 7. Pour tirer parti du tracing avec le [Profileur en continu][1], OpenJDK 11+, Oracle Java 11+, OpenJDK 8 pour la plupart des fournisseurs (version 8u262+) et Zulu Java 8+ (version mineure 1.8.0_212+) sont pris en charge. À partir de la version 8u272+, tous les fournisseurs seront pris en charge pour le profileur.

Tous les langages basés sur la JVM, tels que Scala (versions 2.10.x à 2.13.x), Groovy, Kotlin, ou encore Clojure sont pris en charge. Pour obtenir la liste complète des bibliothèques prises en charge, consultez la page [Exigences de compatibilité][2].

## Installation et démarrage

### Suivre la documentation intégrée à l'application (conseillé)

Suivez les [instructions de démarrage rapide][3] fournies dans l'application Datadog pour profiter d'une expérience optimale, et notamment :

- Obtenir des instructions détaillées en fonction de la configuration de votre déploiement (hosts, Docker, Kubernetes ou Amazon ECS) ;
- Définir les tags `service`, `env` et `version` de façon dynamique ;
- Activer le profileur en continu, l'ingestion de 100 % des traces et l'injection des ID de trace dans les logs durant la configuration.

### Étapes d'installation Java

Sinon, pour commencer le tracing d'applications écrites dans n'importe quel langage :

1. Téléchargez `dd-java-agent.jar`, qui contient les fichiers de classe de l'Agent :

   ```shell
   wget -O dd-java-agent.jar https://dtdg.co/latest-java-tracer
   ```

2. Ajoutez l'argument JVM suivant lors du démarrage de votre application dans votre script d'application IDE, Maven ou Gradle, ou la commande `java -jar` :

   ```text
    -javaagent:/path/to/the/dd-java-agent.jar
   ```

3. Ajoutez des [options de configuration](#configuration) pour le tracing et assurez-vous de définir les variables d'environnement ou de passer les propriétés système en tant qu'arguments JVM, en particulier pour les métriques de service, d'environnement, d'injection de logs, de profiling et éventuellement les métriques runtime (toutes les métriques que vous avez l'intention d'utiliser). Consultez les exemples ci-dessous. Notez que si vous utilisez les instructions Quickstart intégrées à l'application, ces options seront générées pour vous.

### Configurer l'Agent Datadog pour APM

Installez et configurez l'Agent Datadog de façon à ce qu'il reçoive des traces à partir de votre application instrumentée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml`, sous `apm_enabled: true`, et écoute le trafic des traces sur `localhost:8126`. Pour les environnements conteneurisés, suivez les liens ci-dessous afin d'activer la collecte de traces au sein de l'Agent Datadog.

{{< tabs >}}
{{% tab "Conteneurs" %}}

1. Définissez `apm_non_local_traffic: true` dans votre [fichier de configuration principal `datadog.yaml`][1].

2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>

3. Une fois que vous avez instrumenté votre application, le client de tracing envoie, par défaut, les traces à `localhost:8126`. S'il ne s'agit pas du host et du port adéquats, modifiez-les en définissant les variables d'environnement ci-dessous :

`DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`.

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


[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

Pour configurer l'APM Datadog dans AWS Lambda, consultez la documentation dédiée au [tracing de fonctions sans serveur][1].


[1]: /fr/tracing/serverless_functions/
{{% /tab %}}
{{% tab "Autres environnements" %}}

Le tracing est disponible pour un certain nombre d'environnements, tels que [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3] et l'[extension Azure App Services][4].

Pour les autres environnements, veuillez consulter la documentation relative aux [intégrations][5] pour l'environnement qui vous intéresse. [Contactez l'assistance][6] si vous rencontrez des problèmes de configuration.

[1]: /fr/agent/basic_agent_usage/heroku/#installation
[2]: /fr/integrations/cloud_foundry/#trace-collection
[3]: /fr/integrations/amazon_elasticbeanstalk/
[4]: /fr/infrastructure/serverless/azure_app_services/#overview
[5]: /fr/integrations/
[6]: /fr/help/
{{% /tab %}}
{{< /tabs >}}

### Ajouter le traceur Java à la JVM

Consultez la documentation de votre IDE pour savoir comment passer `-javaagent` et d'autres arguments JVM. Voici des instructions pour certains frameworks couramment utilisés :

{{< tabs >}}
{{% tab "Spring Boot" %}}

Si votre application s'appelle `my_app.jar`, créez un fichier `my_app.conf`, contenant :

```text
JAVA_OPTS=-javaagent:/chemin/vers/dd-java-agent.jar
```

Pour en savoir plus, consultez la [documentation de Spring Boot][1].


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
{{% /tab %}}
{{% tab "Tomcat" %}}

Ouvrez votre fichier de script de démarrage Tomcat, par exemple `catalina.sh`, et ajoutez :

```text
CATALINA_OPTS="$CATALINA_OPTS -javaagent:/chemin/vers/dd-java-agent.jar"
```

Ou sur Windows, `catalina.bat` :

```text
set CATALINA_OPTS_OPTS=%CATALINA_OPTS_OPTS% -javaagent:"c:\chemin\vers\dd-java-agent.jar"
```

{{% /tab %}}
{{% tab "JBoss" %}}

Ajoutez la ligne suivante à la fin de `standalone.sh` :

```text
JAVA_OPTS="$JAVA_OPTS -javaagent:/chemin/vers/dd-java-agent.jar"
```

Sur Windows, ajoutez la ligne suivante à la fin de `standalone.conf.bat` :

```text
set "JAVA_OPTS=%JAVA_OPTS% -javaagent:X:/chemin/vers/dd-java-agent.jar"
```

Pour en savoir plus, consultez la [documentation de JBoss][1].


[1]: https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/configuring_jvm_settings
{{% /tab %}}
{{% tab "Jetty" %}}

Si vous utilisez `jetty.sh` pour démarrer Jetty en tant que service, ajoutez ce qui suit :

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/chemin/vers/dd-java-agent.jar"
```

Si vous utilisez `start.ini` pour démarrer Jetty, ajoutez la ligne suivante (sous `--exec`, ou ajoutez la ligne `--exec` si elle n'est pas présente) :

```text
-javaagent:/chemin/vers/dd-java-agent.jar
```

{{% /tab %}}
{{% tab "WebSphere" %}}

Dans la console d'administration :

1. Sélectionnez **Servers**. Sous **Server Type**, sélectionnez **WebSphere application servers** et choisissez votre serveur.
2. Sélectionnez **Java and Process Management > Process Definition**.
3. Dans la section **Additional Properties**, cliquez sur **Java Virtual Machine**.
4. Dans le champ de texte **Generic JVM arguments**, saisissez :

```text
-javaagent:/chemin/vers/dd-java-agent.jar
```

Pour plus d'informations et d'options, consultez la [documentation relative à WebSphere][1].

[1]: https://www.ibm.com/support/pages/setting-generic-jvm-arguments-websphere-application-server
{{% /tab %}}
{{< /tabs >}}

**Remarque**

- Si vous ajoutez l'argument `-javaagent` à votre commande `java -jar`, il doit être ajouté _avant_ l'argument `-jar`, c'est-à-dire en tant qu'option JVM et non en tant qu'argument d'application. Par exemple :

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

     Pour en savoir plus, consultez la [documentation Oracle][4].

- N'ajoutez jamais `dd-java-agent` à votre classpath. Cela peut entraîner un comportement inattendu. 

## Instrumentation automatique

L'instrumentation automatique pour Java utilise les fonctionnalités d'instrumentation `java-agent` [fournies par la JVM][5]. Lorsqu'un `java-agent` est enregistré, il possède la capacité de modifier les fichiers de classe durant le chargement.

L'instrumentation peut provenir de l'instrumentation automatique, de l'API OpenTracing ou d'un mélange des deux. L'instrumentation capture généralement les informations suivantes :

- La durée est capturée à l'aide de l'horloge nanoseconde de la JVM, sauf si un timestamp est fourni à partir de l'API OpenTracing
- Les paires de tags key/value
- Les erreurs et les stack traces non gérées par l'application
- Le nombre total de traces (requêtes) transmises via le système

## Configuration

Toutes les options de configuration ci-dessous ont une propriété système et une variable d'environnement équivalentes.
Si le même type de clé est défini pour les deux, la configuration de la propriété système est prioritaire.
Les propriétés système peuvent être définies en tant que flags JVM.


| Propriété système                        | Variable d'environnement                   | Valeur par défaut                           | Description                                                                                                                                                                                                                                                           |
| -------------------------------------- | -------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dd.service`                      | `DD_SERVICE`                      | `unnamed-java-app`                | Le nom d'un ensemble de processus qui effectuent la même tâche. Utilisé pour regrouper les statistiques de votre application. Disponible à partir de la version 0.50.1.                                                                                                                                                                    |
| `dd.tags`                              | `DD_TAGS`                              | `null`                            | (Exemple : `layer:api,team:intake`) La liste des tags par défaut à ajouter à chaque span, profil et métrique JMX. Si la variable DD_ENV ou DD_VERSION est utilisée, tout tag « env » ou « version » défini dans DD_TAGS sera remplacé. Disponible à partir de la version 0.50.1.  |
|`dd.env`                              | `DD_ENV`                              | `none`                            | L'environnement de votre application (p. ex. production, staging, etc.). Disponible à partir de la version 0.48.                                                    |
| `dd.version`                              | `DD_VERSION`                              | `null`                            | La version de votre application (p. ex. 2.5, 202003181415, 1.3-alpha, etc.). Disponible à partir de la version 0.48.             |
| `dd.logs.injection`                    | `DD_LOGS_INJECTION`                    | false                             | Active l'injection automatique des clés MDC pour les ID de span et de trace Datadog. Consultez la section [Utilisation avancée][6] pour en savoir plus   |
| `dd.trace.config`                      | `DD_TRACE_CONFIG`                      | `null`                            | Chemin facultatif vers un fichier où les propriétés de configuration sont définies (une par ligne). Le chemin du fichier peut par exemple être spécifié via `-Ddd.trace.config=<CHEMIN_FICHIER>.properties`, en définissant le nom du service dans le fichier avec  `dd.service=<NOM_SERVICE>`. |
| `dd.service.mapping`                   | `DD_SERVICE_MAPPING`                   | `null`                            | (Exemple : `mysql:my-mysql-service-name-db, postgres:my-postgres-service-name-db`) Renomme de façon dynamique les services via la configuration. Utile pour faire en sorte que les bases de données affichent des noms distincts d'un service à l'autre.                                                                                                       |
| `dd.writer.type`                       | `DD_WRITER_TYPE`                       | `DDAgentWriter`                   | La valeur par défaut active l'envoi des traces à l'Agent. Si vous utilisez `LoggingWriter` dans votre configuration, les traces sont écrites dans la console.                       |
| `dd.agent.host`                        | `DD_AGENT_HOST`                        | `localhost`                       | Hostname vers lequel envoyer les traces. Si vous utilisez un environnement conteneurisé, configurez cette propriété sur l'IP du host. Consultez la documentation relative au [tracing d'applications Docker][7] pour en savoir plus.                                                                                                  |
| `dd.trace.agent.port`                  | `DD_TRACE_AGENT_PORT`                  | `8126`                            | Numéro du port sur lequel l'Agent effectue son écoute pour le host configuré.                                                                                |
| `dd.trace.agent.unix.domain.socket`    | `DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`    | `null`                            | Permet de faire passer des données de tracing par un proxy en vue de leur envoi vers un Agent Datadog distant.                                                            |
| `dd.trace.agent.url`                   | `DD_TRACE_AGENT_URL`                   | `null`                            | L'URL vers laquelle envoyer les traces. Elle peut commencer par `http://` pour une connexion via HTTP ou par `unix://` pour utiliser un socket de domaine Unix. Une fois définie, elle a la priorité sur `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`. Disponible à partir de la version 0.65. |
| `dd.trace.agent.timeout`               | `DD_TRACE_AGENT_TIMEOUT`               | `10`                              | Délai d'expiration en secondes pour les interactions réseau avec l'Agent Datadog.                                                                                                                                                                                                   |
| `dd.trace.header.tags`                 | `DD_TRACE_HEADER_TAGS`                 | `null`                            | (Exemple : `en-tête-insensible-CASSE:nom-du-tag,User-ID:userId`.) Une liste des correspondances entre les clés d'en-tête et les noms de tag. Applique automatiquement les valeurs d'en-tête en tant que tags sur les traces.                                                                                                               |
| `dd.trace.annotations`                 | `DD_TRACE_ANNOTATIONS`                 | ([Valeurs répertoriées ici][8])               | (Exemple : `com.some.Trace;io.other.Trace`.) Une liste des annotations de méthode à traiter en tant que `@Trace`.                                            |
| `dd.trace.methods`                     | `DD_TRACE_METHODS`                     | `null`                            | (Exemple : `"package.ClassName[method1,method2,...];AnonymousClass$1[call]"`). Liste des classes/interfaces et méthodes à tracer. Semblable à l'ajout de `@Trace`, mais sans changer le code.                                                                                       |
| `dd.trace.partial.flush.min.spans`     | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`     | `1000`                            | Définit le nombre de spans partielles à partir duquel celles-ci doivent être vidées. Permet de réduire la charge de la mémoire en cas de traitement d'un trafic important ou de traces à exécution longue.     |
| `dd.trace.split-by-tags`               | `DD_TRACE_SPLIT_BY_TAGS`               | `null`                            | (Exemple : `aws.service`) Utilisé pour renommer les spans identifiées avec le tag de service correspondant                                       |
| `dd.trace.db.client.split-by-instance` | `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` | `false`                           | Lorsque cette option est définie sur `true`, les spans de base de données reçoivent le nom de l'instance en tant que nom du service.                                                                     |
| `dd.trace.health.metrics.enabled`      | `DD_TRACE_HEALTH_METRICS_ENABLED`      | `false`                           | Définir sur `true` pour envoyer des métriques de santé du traceur                                                                                             |
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
| `dd.hystrix.tags.enabled` | `DD_HYSTRIX_TAGS_ENABLED` | False | Par défaut, les tags associés au groupe, à la commande et au statut du circuit Hystrix sont désactivés. Cette propriété permet de les activer. |
| `dd.trace.servlet.async-timeout.error` | `DD_TRACE_SERVLET_ASYNC_TIMEOUT_ERROR` | True | Par défaut, les requêtes asynchrones à exécution longue sont considérées comme une erreur. Lorsque cette valeur est définie sur false, toutes les requêtes ayant expiré sont considérées comme réussies. |
| `dd.trace.startup.logs`                | `DD_TRACE_STARTUP_LOGS`                | True | Lorsque cette option est définie sur `false`, les logs de lancement sont désactivés. Disponible à partir de la version 0.64. |
| `dd.trace.servlet.principal.enabled`                | `DD_TRACE_SERVLET_PRINCIPAL_ENABLED`                | False | Définir sur `true` pour recueillir l'objet Principal d'utilisateur. Disponible à partir de la version 0.61. |


**Remarques** :

- Si le même type de clé est défini pour les deux, la configuration de la propriété système est prioritaire.
- Les propriétés système peuvent être utilisées comme paramètres JVM.
- Par défaut, les métriques JMX de votre application sont envoyées à l'Agent Datadog via DogStatsD sur le port `8125`. Vérifiez que [DogStatsD est activé pour l'Agent][9].

  - Si vous exécutez l'Agent en tant que conteneur, vérifiez que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [est définie sur `true`][10] et que le port `8125` est ouvert sur le conteneur de l'Agent.
  - Dans Kubernetes, [liez le port DogStatsD à un port de host][14] ; dans ECS, [définissez les flags adéquats dans la définition de votre tâche][12].

### Intégrations

Pour découvrir comment désactiver des intégrations, consultez la section relative à la compatibilité des [intégrations][13].

### Exemples

#### `dd.service.mapping`

**Exemple avec une propriété système** :

```shell
java -javaagent:/chemin/vers/dd-java-agent.jar -Ddd.service=web-app -Ddd.service.mapping=postgresql:web-app-pg -jar chemin/vers/application.jar
```

{{< img src="tracing/setup/java/service_mapping.png" alt="mapping de service"  >}}

#### `dd.tags`

**Configuration d'un environnement global pour les spans et les métriques JMX** :

```shell
java -javaagent:/chemin/vers/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -jar chemin/vers/application.jar
```

{{< img src="tracing/setup/java/trace_global_tags.png" alt="tags globaux de trace"  >}}

#### `dd.trace.span.tags`

**Exemple d'ajout de project:test à chaque span** :

```shell
java -javaagent:/chemin/vers/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -jar chemin/vers/application.jar
```

{{< img src="tracing/setup/java/trace_span_tags.png" alt="tags de span de trace"  >}}

#### `dd.trace.jmx.tags`

**Définition de custom.type:2 sur une métrique JMX** :

```shell
java -javaagent:/chemin/vers/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -Ddd.trace.jmx.tags=custom.type:2 -jar chemin/vers/application.jar
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
java -javaagent:/chemin/vers/dd-java-agent.jar -Ddd.env=dev -Ddd.service=web-app -Ddd.trace.db.client.split-by-instance=TRUE -jar chemin/vers/application.jar
```

L'instance de base de données 1, `webappdb`, possède désormais son propre nom de service, le même que celui indiqué dans les métadonnées de span `db.instance` :

{{< img src="tracing/setup/java/split_by_instance_1.png" alt="instance 1"  >}}

L'instance de base de données 2, `secondwebappdb`, possède désormais son propre nom de service, le même que celui indiqué dans les métadonnées de span `db.instance` :

{{< img src="tracing/setup/java/split_by_instance_2.png" alt="instance 2"  >}}

De même, sur la service map, une app Web appelle désormais deux bases de données Postgres distinctes.

#### `dd.http.server.tag.query-string`

Exemple avec une propriété système :

```shell
java -javaagent:/chemin/vers/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.http.server.tag.query-string=TRUE -jar chemin/vers/application.jar
```

{{< img src="tracing/setup/java/query_string.png" alt="chaîne de requête"  >}}

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

Consultez la [documentation relative à l'intégration Java][14] pour en savoir plus sur la collecte de métriques Java avec JMXFetch.

### Extraction et injection d'en-têtes B3

Le traceur de l'APM Datadog prend en charge [l'extraction et l'injection d'en-têtes B3][15] pour le tracing distribué.

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
implementation group: 'com.datadoghq', name: 'dd-trace-api', version: {version}
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


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/profiler/getting_started/?tab=java
[2]: /fr/tracing/compatibility_requirements/java
[3]: https://app.datadoghq.com/apm/docs
[4]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[5]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[6]: /fr/tracing/connect_logs_and_traces/java/
[7]: /fr/tracing/setup/docker/
[8]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[9]: /fr/developers/dogstatsd/#setup
[10]: /fr/agent/docker/#dogstatsd-custom-metrics
[11]: /fr/developers/dogstatsd/
[12]: /fr/integrations/amazon_ecs/?tab=python#create-an-ecs-task
[13]: /fr/tracing/compatibility_requirements/java#disabling-integrations
[14]: /fr/integrations/java/?tab=host#metric-collection
[15]: https://github.com/openzipkin/b3-propagation