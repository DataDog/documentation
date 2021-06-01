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

La bibliothèque de tracing Java prend en charge toutes les JVM sur toutes les plateformes à partir de la version 7. Pour tirer parti du tracing avec le [profileur en continu][1], OpenJDK 11+, Oracle Java 11+, OpenJDK 8 pour la plupart des fournisseurs (version 8u262+) et Zulu Java 8+ (version mineure 1.8.0_212+) sont pris en charge. À compter de la version 8u272, tous les fournisseurs seront pris en charge pour le profileur.

Tous les langages basés sur la JVM, tels que Scala (versions 2.10.x à 2.13.x), Groovy, Kotlin, ou encore Clojure, sont pris en charge par le traceur et le profileur Java. Pour obtenir la liste complète des bibliothèques prises en charge, consultez la page [Exigences de compatibilité][1].

## Installation et démarrage

### Suivre la documentation intégrée à l'application (conseillé)

Suivez les [instructions de démarrage rapide][3] fournies dans l'application Datadog pour profiter d'une expérience optimale, et notamment :

- Obtenir des instructions détaillées en fonction de la configuration de votre déploiement (hosts, Docker, Kubernetes ou Amazon ECS) ;
- Définir les tags `service`, `env` et `version` de façon dynamique ;
- Activer le profileur en continu, l'ingestion de 100 % des traces et l'injection des ID de trace dans les logs durant la configuration.

### Étapes d'installation Java

Sinon, pour commencer à tracer vos applications :

1. Téléchargez `dd-java-agent.jar`, qui contient les derniers fichiers de classe de l'Agent :

   ```shell
   wget -O dd-java-agent.jar https://dtdg.co/latest-java-tracer
   ```
   Pour accéder à une version spécifique du traceur, consultez le [référentiel Maven][4] de Datadog.

2. Ajoutez l'argument JVM suivant lors du démarrage de votre application dans votre script d'application IDE, Maven ou Gradle, ou la commande `java -jar` :

   ```text
    -javaagent:/path/to/the/dd-java-agent.jar
   ```

3. Ajoutez des [options de configuration](#configuration) pour le tracing et assurez-vous de définir les variables d'environnement ou de passer les propriétés système en tant qu'arguments JVM, en particulier pour les métriques de service, d'environnement, d'injection de logs, de profiling et éventuellement les métriques runtime (toutes les métriques que vous avez l'intention d'utiliser). Consultez les exemples ci-dessous. Notez que si vous utilisez les instructions Quickstart intégrées à l'application, ces options seront générées pour vous.

### Configurer l'Agent Datadog pour l'APM

Installez et configurez l'Agent Datadog de façon à ce qu'il reçoive des traces à partir de votre application instrumentée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml`, sous `apm_enabled: true`, et écoute le trafic des traces sur `localhost:8126`. Pour les environnements conteneurisés, suivez les liens ci-dessous afin d'activer la collecte de traces au sein de l'Agent Datadog.

{{< tabs >}}
{{% tab "Conteneurs" %}}

1. Définissez `apm_non_local_traffic: true` dans votre [fichier de configuration principal `datadog.yaml`][1].

2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>

3. Après avoir instrumenté votre application, le client de tracing envoie, par défaut, les traces à `localhost:8126`. S'il ne s'agit pas du host et du port adéquats, modifiez-les en définissant les variables d'environnement ci-dessous :

    `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`

    ```bash
    java -javaagent:<DD-JAVA-AGENT-PATH>.jar -jar <YOUR_APPLICATION_PATH>.jar
    ```

    Vous pouvez également utiliser des propriétés système :

    ```bash
    java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
        -Ddd.agent.host=$DD_AGENT_HOST \
        -Ddd.agent.port=$DD_TRACE_AGENT_PORT \
        -jar <YOUR_APPLICATION_PATH>.jar
    ```
{{< site-region region="us3,eu,gov" >}} 

4. Définissez `DD_SITE` dans l'Agent Datadog sur {{< region-param key="dd_site" code="true" >}} pour vous assurer que l'Agent envoie les données au bon site Datadog.

{{< /site-region >}}

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

Consultez la documentation de votre serveur d'application pour découvrir comment passer `-javaagent` et d'autres arguments JVM. Voici des instructions pour certains frameworks couramment utilisés :

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

Ouvrez votre fichier de script de démarrage Tomcat, par exemple `setenv.sh` sous Linux, et ajoutez :

```text
CATALINA_OPTS="$CATALINA_OPTS -javaagent:/chemin/vers/dd-java-agent.jar"
```

Sous Windows, il s'agit du fichier `setenv.bat` :

```text
set CATALINA_OPTS_OPTS=%CATALINA_OPTS_OPTS% -javaagent:"c:\chemin\vers\dd-java-agent.jar"
```
Si vous ne disposez pas de fichier `setenv`, créez-le dans le répertoire `./bin` du dossier de projet Tomcat.

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

     Pour en savoir plus, consultez la [documentation Oracle][5].

- N'ajoutez jamais `dd-java-agent` à votre classpath. Cela peut entraîner un comportement inattendu.

## Instrumentation automatique

L'instrumentation automatique pour Java utilise les fonctionnalités d'instrumentation `java-agent` [fournies par la JVM][6]. Lorsqu'un `java-agent` est enregistré, il est capable de modifier les fichiers de classe durant le chargement.

L'instrumentation peut provenir de l'instrumentation automatique, de l'API OpenTracing ou d'un mélange des deux. L'instrumentation capture généralement les informations suivantes :

- La durée est capturée à l'aide de l'horloge nanoseconde de la JVM, sauf si un timestamp est fourni à partir de l'API OpenTracing
- Les paires de tags key/value
- Les erreurs et les stack traces non gérées par l'application
- Le nombre total de traces (requêtes) transmises via le système

## Configuration

Toutes les options de configuration ci-dessous ont une propriété système et une variable d'environnement équivalentes.
Si le même type de clé est défini pour les deux, la configuration de la propriété système est prioritaire.
Les propriétés système peuvent être définies en tant que flags JVM.

Remarque : si vous utilisez les propriétés système du traceur Java, assurez-vous de les spécifier avant `-jar`, afin qu'elles soient lues en tant qu'options JVM.


`dd.service`
: **Variable d'environnement** : `DD_SERVICE`<br>
**Valeur par défaut** : `unnamed-java-app`<br>
Le nom d'un ensemble de processus qui effectuent la même tâche. Utilisé pour regrouper les statistiques de votre application. Disponible à partir de la version 0.50.0.

`dd.tags`
: **Variables d'environnement** : `DD_TAGS`<br>
**Valeur par défaut** : `null`<br>
**Exemple** : `layer:api,team:intake`<br>
La liste des tags par défaut à ajouter à chaque span, profil et métrique JMX. Si la variable DD_ENV ou DD_VERSION est utilisée, tout tag « env » ou « version » défini dans DD_TAGS sera remplacé. Disponible à partir de la version 0.50.0.

`dd.env`
: **Variable d'environnement** : `DD_ENV`<br>
**Valeur par défaut** : `none`<br>
L'environnement de votre application (p. ex., production, staging, etc.). Disponible à partir de la version 0.48.

`dd.version`
: **Variable d'environnement** : `DD_VERSION`<br>
**Valeur par défaut** : `null`<br>
La version de votre application (p. ex., 2.5, 202003181415, 1.3-alpha, etc.). Disponible à partir de la version 0.48.

`dd.logs.injection`
: **Variable d'environnement** : `DD_LOGS_INJECTION`<br>
**Valeur par défaut** : `false`<br>
Active l'injection automatique des clés MDC pour les I de span et de trace Datadog. Consultez la section [Utilisation avancée][7] pour en savoir plus.

`dd.trace.config`
: **Variable d'environnement** : `DD_TRACE_CONFIG`<br>
**Valeur par défaut** : `null`<br>
Le chemin facultatif vers un fichier où les propriétés de configuration sont définies (une par ligne). Le chemin du fichier peut par exemple être spécifié via `-Ddd.trace.config=<CHEMIN_FICHIER>.properties`, en définissant le nom du service dans le fichier avec `dd.service=<NOM_SERVICE>`.

`dd.service.mapping`
: **Variable d'environnement** : `DD_SERVICE_MAPPING`<br>
**Valeur par défaut** : `null`<br>
**Exemple** : `mysql:my-mysql-service-name-db, postgres:my-postgres-service-name-db`<br>
Renomme de façon dynamique les services via la configuration. Sert notamment à s'assurer que les bases de données possèdent des noms distincts d'un service à l'autre.

`dd.writer.type`
: **Variable d'environnement** : `DD_WRITER_TYPE`<br>
**Valeur par défaut** : `DDAgentWriter`<br>
La valeur par défaut active l'envoi des traces à l'Agent. Si vous utilisez `LoggingWriter` dans votre configuration, les traces sont écrites dans la console.

`dd.agent.host`
: **Variable d'environnement** : `DD_AGENT_HOST`<br>
**Valeur par défaut** : `localhost`<br>
Le hostname vers lequel envoyer les traces. Si vous utilisez un environnement conteneurisé, configurez cette option sur l'IP du host. Consultez la documentation relative au [tracing d'applications Docker][8] pour en savoir plus.

`dd.trace.agent.port`
: **Variable d'environnement** : `DD_TRACE_AGENT_PORT`<br>
**Valeur par défaut** : `8126`<br>
Le numéro du port sur lequel l'Agent effectue son écoute pour le host configuré.

`dd.trace.agent.unix.domain.socket`
: **Variable d'environnement** : `DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`<br>
**Valeur par défaut** : `null`<br>
Permet de faire passer des données de tracing par un proxy en vue de leur envoi vers un Agent Datadog distant.

`dd.trace.agent.url`
: **Variable d'environnement** : `DD_TRACE_AGENT_URL`<br>
**Valeur par défaut** : `null`<br>
L'URL vers laquelle envoyer les traces. Elle peut commencer par `http://` pour une connexion via HTTP ou par `unix://` pour connexion via un socket de domaine Unix. Une fois cette option définie, elle a la priorité sur `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`. Disponible à partir de la version 0.65.

`dd.trace.agent.timeout`
: **Variable d'environnement** : `DD_TRACE_AGENT_TIMEOUT`<br>
**Valeur par défaut** : `10`<br>
Le délai d'expiration en secondes pour les interactions réseau avec l'Agent Datadog.

`dd.trace.header.tags`
: **Variable d'environnement** : `DD_TRACE_HEADER_TAGS`<br>
**Valeur par défaut** : `null`<br>
**Exemple** : `CASE-insensitive-Header:my-tag-name,User-ID:userId`<br>
Une map composée de clés d'en-tête et de noms de tag. Applique automatiquement les valeurs d'en-tête en tant que tags sur les traces.

`dd.trace.annotations`
: **Variable d'environnement** : `DD_TRACE_ANNOTATIONS`<br>
**Valeur par défaut** : ([répertoriée sur cette page][9])<br>
**Exemple** : `com.some.Trace;io.other.Trace`<br>
Une liste des annotations de méthode à traiter en tant que `@Trace`.

`dd.trace.methods`
: **Variable d'environnement** : `DD_TRACE_METHODS`<br>
**Valeur par défaut** : `null`<br>
**Exemple** : `"package.ClassName[method1,method2,...];AnonymousClass$1[call];package.ClassName[*]"`<br>
La liste des classes/interfaces et méthodes à tracer. Semblable à l'ajout de `@Trace`, mais sans changer le code. **Remarque :** l'utilisation d'un wildcard (`[*]`) ne prend pas en compte les appels de méthode constructors, getters, setters, synthetic, toString, equals, hashcode ou finalizer.

`dd.trace.classes.exclude`
: **Variable d'environnement** : `DD_TRACE_CLASSES_EXCLUDE`<br>
**Valeur par défaut** : `null`<br>
**Exemple** : `package.ClassName,package.ClassName$Nested,package.Foo*,package.other.*`<br>
Une liste de noms de classe complets (pouvant se terminer par un wildcard pour spécifier un préfixe) qui seront ignorés (non modifiés) par le traceur. Ces noms doivent correspondre à la représentation interne JVM (ex. : package.ClassName$Nested et non package.ClassName.Nested).

`dd.trace.partial.flush.min.spans`
: **Variable d'environnement** : `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`<br>
**Valeur par défaut** : `1000`<br>
Définit le nombre de spans partielles à partir duquel celles-ci doivent être vidées. Permet de réduire la charge de la mémoire en cas de traitement d'un trafic important ou de traces à exécution longue.

`dd.trace.split-by-tags`
: **Variable d'environnement** : `DD_TRACE_SPLIT_BY_TAGS`<br>
**Valeur par défaut** : `null`<br>
**Exemple** : `aws.service`<br>
Utilisé pour renommer les spans à identifier avec le tag de service correspondant.

`dd.trace.db.client.split-by-instance` 
: **Variable d'environnement** : `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` <br>
**Valeur par défaut** : `false`<br>
Lorsque cette option est définie sur `true`, les spans de base de données reçoivent le nom de l'instance en tant que nom du service.

`dd.trace.health.metrics.enabled`
: **Variable d'environnement** : `DD_TRACE_HEALTH_METRICS_ENABLED`<br>
**Valeur par défaut** : `false`<br>
Lorsque cette option est définie sur `true`, des métriques de santé sur le traceur sont envoyées.

`dd.trace.health.metrics.statsd.host`
: **Variable d'environnement** : `DD_TRACE_HEALTH_METRICS_STATSD_HOST`<br>
**Valeur par défaut** : identique à `dd.jmxfetch.statsd.host` <br>
Le host Statsd vers lequel envoyer les métriques de santé.

`dd.trace.health.metrics.statsd.port`
: **Variable d'environnement** : `DD_TRACE_HEALTH_METRICS_STATSD_PORT`<br>
**Valeur par défaut** : identique à `dd.jmxfetch.statsd.port` <br>
Le port Statsd vers lequel envoyer les métriques de santé.

`dd.http.client.tag.query-string`
: **Variable d'environnement** : `DD_HTTP_CLIENT_TAG_QUERY_STRING`<br>
**Valeur par défaut** : `false`<br>
Lorsque cette option est définie sur `true`, les paramètres de chaîne de requête et le fragment sont ajoutés aux spans du client Web.

`dd.http.client.error.statuses`
: **Variable d'environnement** : `DD_HTTP_CLIENT_ERROR_STATUSES`<br>
**Valeur par défaut** : `400-499`<br>
Permet de définir une plage d'erreurs à accepter. Par défaut, les erreurs 4xx sont signalées comme des erreurs pour les clients http. Cette option remplace ce comportement. Exemple : `dd.http.client.error.statuses=400-403,405,410-499`.

`dd.http.server.error.statuses`
: **Variable d'environnement** : `DD_HTTP_SERVER_ERROR_STATUSES`<br>
**Valeur par défaut** : `500-599`<br>
Permet de définir une plage d'erreurs à accepter. Par défaut, les codes de statut 5xx sont signalés comme des erreurs pour les serveurs http. Cette option remplace ce comportement. Exemple : `dd.http.server.error.statuses=500,502-599`.

`dd.http.server.tag.query-string`
: **Variable d'environnement** : `DD_HTTP_SERVER_TAG_QUERY_STRING`<br>
**Valeur par défaut** : `false`<br>
Lorsque cette option est définie sur `true`, les paramètres de chaîne de requête et le fragment sont ajoutés aux spans du serveur Web.

`dd.trace.enabled`
: **Variable d'environnement** : `DD_TRACE_ENABLED`<br>
**Valeur par défaut** : `true`<br>
Lorsque cette option est définie sur `false`, l'Agent de tracing est désactivé.

`dd.jmxfetch.enabled`
: **Variable d'environnement** : `DD_JMXFETCH_ENABLED`<br>
**Valeur par défaut** : `true`<br>
Active la collecte de métriques JMX par l'Agent de tracing Java.

`dd.jmxfetch.config.dir`
: **Variable d'environnement** : `DD_JMXFETCH_CONFIG_DIR`<br>
**Valeur par défaut** : `null`<br>
**Exemple** : `/opt/datadog-agent/etc/conf.d`<br>
Le répertoire de configuration supplémentaire pour la collecte de métriques JMX. L'Agent Java recherche `jvm_direct:true` dans la section `instance` du fichier `yaml` pour changer la configuration.

`dd.jmxfetch.config`
: **Variable d'environnement** : `DD_JMXFETCH_CONFIG`<br>
**Valeur par défaut** : `null`<br>
**Exemple** : `activemq.d/conf.yaml,jmx.d/conf.yaml`<br>
Le fichier de configuration de métriques supplémentaires pour la collecte de métriques JMX. L'Agent Java recherche `jvm_direct:true` dans la section `instance` du fichier `yaml` pour changer la configuration.

`dd.jmxfetch.check-period`
: **Variable d'environnement** : `DD_JMXFETCH_CHECK_PERIOD`<br>
**Valeur par défaut** : `1500`<br>
La fréquence d'envoi des métriques JMX (en ms).

`dd.jmxfetch.refresh-beans-period`
: **Variable d'environnement** : `DD_JMXFETCH_REFRESH_BEANS_PERIOD`<br>
**Valeur par défaut** : `600`<br>
La fréquence d'actualisation de la liste des beans JMX disponibles (en secondes).

`dd.jmxfetch.statsd.host`
: **Variable d'environnement** : `DD_JMXFETCH_STATSD_HOST`<br>
**Valeur par défaut** : identique à `agent.host`<br>
Le host Statsd vers lequel envoyer les métriques JMX. Si vous utilisez des sockets de domaine Unix, utilisez un argument tel que 'unix://CHEMIN_VERS_SOCKET_UDS'. Exemple : `unix:///var/datadog-agent/dsd.socket`.

`dd.jmxfetch.statsd.port`
: **Variable d'environnement** : `DD_JMXFETCH_STATSD_PORT`<br>
**Valeur par défaut** : `8125`<br>
Le port StatsD vers lequel envoyer les métriques JMX. Si vous utilisez des sockets de domaine Unix, saisissez 0.

`dd.integration.opentracing.enabled`
: **Variable d'environnement** : `DD_INTEGRATION_OPENTRACING_ENABLED`<br>
**Valeur par défaut** : `true`<br>
Par défaut, le client de tracing détecte si un GlobalTracer est en cours de chargement et enregistre un traceur dans celui-ci de manière dynamique. En définissant cette option sur false, toute dépendance entre le traceur et OpenTracing est supprimée.

`dd.hystrix.tags.enabled`
: **Variable d'environnement** : `DD_HYSTRIX_TAGS_ENABLED`<br>
**Valeur par défaut** : `false`<br>
Par défaut, les tags associés au groupe, à la commande et au statut du circuit Hystrix sont désactivés. Cette option permet de les activer.

`dd.trace.servlet.async-timeout.error` 
: **Variable d'environnement** : `DD_TRACE_SERVLET_ASYNC_TIMEOUT_ERROR` <br>
**Valeur par défaut** : `true`<br>
Par défaut, les requêtes asynchrones à exécution longue sont considérées comme des erreurs. Lorsque cette valeur est définie sur false, toutes les requêtes ayant expiré sont considérées comme réussies.

`dd.trace.startup.logs`
: **Variable d'environnement** : `DD_TRACE_STARTUP_LOGS`<br>
**Valeur par défaut** : `true`<br>
Lorsque cette option est définie sur `false`, les logs de lancement informatifs sont désactivés. Disponible à partir de la version 0.64.

`dd.trace.servlet.principal.enabled`
: **Variable d'environnement** : `DD_TRACE_SERVLET_PRINCIPAL_ENABLED`<br>
**Valeur par défaut** : `false`<br>
Lorsque cette option est définie sur `true`, l'objet principal utilisateur est recueilli. Disponible à partir de la version 0.61.


**Remarques** :

- Si le même type de clé est défini pour les deux, la configuration de la propriété système est prioritaire.
- Les propriétés système peuvent être utilisées comme paramètres JVM.
- Par défaut, les métriques JMX de votre application sont envoyées à l'Agent Datadog via DogStatsD sur le port `8125`. Vérifiez que [DogStatsD est activé pour l'Agent][10].

  - Si vous exécutez l'Agent en tant que conteneur, vérifiez que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [est définie sur `true`][11] et que le port `8125` est ouvert sur le conteneur de l'Agent.
  - Dans Kubernetes, [liez le port DogStatsD à un port de host][12] ; dans ECS, [définissez les flags adéquats dans la définition de votre tâche][13].

### Intégrations

Pour découvrir comment désactiver des intégrations, consultez la section relative à la compatibilité des [intégrations][14].

### Scénarios

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

Consultez la [documentation relative à l'intégration Java][15] pour en savoir plus sur la collecte de métriques Java avec JMXFetch.

### Extraction et injection d'en-têtes B3

Le traceur de l'APM Datadog prend en charge l'injection et [l'extraction d'en-têtes B3][16] pour le tracing distribué.

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
[4]: https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent
[5]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[6]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[7]: /fr/tracing/connect_logs_and_traces/java/
[8]: /fr/tracing/setup/docker/
[9]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[10]: /fr/developers/dogstatsd/#setup
[11]: /fr/agent/docker/#dogstatsd-custom-metrics
[12]: /fr/developers/dogstatsd/
[13]: /fr/integrations/amazon_ecs/?tab=python#create-an-ecs-task
[14]: /fr/tracing/compatibility_requirements/java#disabling-integrations
[15]: /fr/integrations/java/?tab=host#metric-collection
[16]: https://github.com/openzipkin/b3-propagation