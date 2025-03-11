---
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://github.com/DataDog/dd-trace-java
  tag: GitHub
  text: Code source de l'APM Datadog Java
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
title: Configurer la bibliothèque de tracing Java
type: multi-code-lang
---

Après avoir configuré la bibliothèque de tracing avec votre code ainsi que l'Agent de façon à recueillir des données APM, vous pouvez ajuster sa configuration selon vos besoins, notamment en configurant le [tagging de service unifié][1].

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
La liste des tags par défaut à ajouter à chaque span, profil et métrique JMX. Si la variable DD_ENV ou DD_VERSION est utilisée, tout tag « env » ou « version » défini dans DD_TAGS est remplacé. Disponible à partir de la version 0.50.0.

`dd.env`
: **Variable d'environnement** : `DD_ENV`<br>
**Valeur par défaut** : `none`<br>
L'environnement de votre application (par exemple, production ou staging). Disponible à partir de la version 0.48.

`dd.version`
: **Variable d'environnement** : `DD_VERSION`<br>
**Valeur par défaut** : `null`<br>
La version de votre application (par exemple, 2.5, 202003181415 ou 1.3-alpha). Disponible à partir de la version 0.48.

`dd.logs.injection`
: **Variable d'environnement** : `DD_LOGS_INJECTION`<br>
**Valeur par défaut** : `true`<br>
Active l'injection automatique des clés MDC pour les ID de span et de trace Datadog. Consultez la section relative à l'[utilisation avancée][2] pour en savoir plus.

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
Le hostname vers lequel envoyer les traces. Si vous utilisez un environnement conteneurisé, configurez cette option sur l'IP du host. Consultez la section [Tracer des applications Docker][3] pour en savoir plus.

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
**Exemple** : `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Accepte une liste des correspondances entre les clés d'en-tête (insensibles à la casse) et les noms de tag et applique automatiquement les valeurs d'en-tête correspondantes en tant que tags sur les traces. Accepte également les entrées sans nom de tag qui sont automatiquement mis en correspondance avec des tags au format `http.request.headers.<nom_en-tête>` et `http.response.headers.<nom_en-tête>`, respectivement.<br><br>
Jusqu'à la version 0.96.0, ce paramètre s'appliquait uniquement aux tags des en-têtes de requête. Pour revenir à l'ancien comportement, ajoutez le paramètre `-Ddd.trace.header.tags.legacy.parsing.enabled=true` ou la variable d'environnement `DD_TRACE_HEADER_TAGS_LEGACY_PARSING_ENABLED=true`.

`dd.trace.request_header.tags`
: **Variable d'environnement** : `DD_TRACE_REQUEST_HEADER_TAGS`<br>
**Valeur par défaut** : `null`<br>
**Exemple** : `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Accepte une liste des correspondances entre les clés d'en-tête (insensibles à la casse) et les noms de tag et applique automatiquement les valeurs d'en-tête de requête correspondantes en tant que tags sur les traces. Accepte également les entrées sans nom de tag qui sont automatiquement mis en correspondance avec des tags au format `http.request.headers.<nom_en-tête>`.<br>
Disponible à partir de la version 0.96.0.

`dd.trace.response_header.tags`
: **Environment Variable**: `DD_TRACE_RESPONSE_HEADER_TAGS`<br>
**Default**: `null`<br>
**Example**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Accepte une liste des correspondances entre les clés d'en-tête (insensibles à la casse) et les noms de tag et applique automatiquement les valeurs d'en-tête de réponse correspondantes en tant que tags sur les traces. Accepte également les entrées sans nom de tag qui sont automatiquement mis en correspondance avec des tags au format `http.response.headers.<nom_en-tête>`.<br>
Disponible à partir de la version 0.96.0.

`dd.trace.annotations`
: **Variable d'environnement** : `DD_TRACE_ANNOTATIONS`<br>
**Valeur par défaut** : ([répertoriée sur cette page][4])<br>
**Exemple** : `com.some.Trace;io.other.Trace`<br>
Une liste des annotations de méthode à traiter en tant que `@Trace`.

`dd.trace.methods`
: **Variable d'environnement** : `DD_TRACE_METHODS`<br>
**Valeur par défaut** : `null`<br>
**Exemple** : `package.ClassName[method1,method2,...];AnonymousClass$1[call];package.ClassName[*]`<br>
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
Utilisé pour renommer le service associé aux spans à identifier avec le tag de span correspondant.

`dd.trace.db.client.split-by-instance` 
: **Variable d'environnement** : `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` <br>
**Valeur par défaut** : `false`<br>
Lorsque cette option est définie sur `true`, les spans de base de données reçoivent le nom de l'instance en tant que nom du service.

`dd.trace.health.metrics.enabled`
: **Variable d'environnement** : `DD_TRACE_HEALTH_METRICS_ENABLED`<br>
**Valeur par défaut** : `true`<br>
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
**Exemple** : `/chemin/vers/répertoire/etc/conf.d`<br>
Le répertoire de configuration supplémentaire pour la collecte de métriques JMX. L'Agent Java recherche `jvm_direct:true` dans la section `instance` du fichier `yaml` pour changer la configuration.

`dd.jmxfetch.config`
: **Variable d'environnement** : `DD_JMXFETCH_CONFIG`<br>
**Valeur par défaut** : `null`<br>
**Exemple** : `chemin/vers/fichier/conf.yaml,autre/chemin/vers/fichier/conf.yaml`<br>
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
- Par défaut, les métriques JMX de votre application sont envoyées à l'Agent Datadog via DogStatsD sur le port `8125`. Vérifiez que [DogStatsD est activé pour l'Agent][5].

  - Si vous exécutez l'Agent en tant que conteneur, vérifiez que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [est défini sur `true`][6] et que le port `8125` est ouvert sur le conteneur de l'Agent.
  - Dans Kubernetes, [liez le port DogStatsD à un port de host][7] ; dans ECS, [définissez les flags appropriés dans la définition de votre tâche][2].

### Intégrations

Pour découvrir comment désactiver des intégrations, consultez la section relative à la compatibilité des [intégrations][8].

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

Consultez la [documentation relative à l'intégration Java][9] pour en savoir plus sur la collecte de métriques Java avec JMXFetch.

### Extraction et injection d'en-têtes B3

Le traceur de l'APM Datadog prend en charge [l'extraction et l'injection d'en-têtes B3][10] pour le tracing distribué.

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

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging/
[2]: /fr/agent/amazon_ecs/#create-an-ecs-task
[3]: /fr/tracing/setup/docker/
[4]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[5]: /fr/developers/dogstatsd/#setup
[6]: /fr/agent/docker/#dogstatsd-custom-metrics
[7]: /fr/developers/dogstatsd/
[8]: /fr/tracing/compatibility_requirements/java#disabling-integrations
[9]: /fr/integrations/java/?tab=host#metric-collection
[10]: https://github.com/openzipkin/b3-propagation