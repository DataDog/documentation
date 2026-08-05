---
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://github.com/DataDog/dd-trace-java
  tag: Code source
  text: Code source de l'APM Datadog Java
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: /tracing/trace_collection/trace_context_propagation/
  tag: Documentation
  text: Propagation du contexte des traces avec des en-têtes
- link: /opentelemetry/interoperability/environment_variable_support
  tag: Documentation
  text: Configuration des variables d'environnement OpenTelemetry
- link: https://learn.datadoghq.com/courses/apm-java-host
  tag: Centre d'apprentissage
  text: Configurer APM pour les applications Java
title: Configuration du SDK Java
type: multi-code-lang
---
Après avoir configuré le SDK avec votre code et configuré l'Agent pour collecter les données APM, configurez le SDK selon vos souhaits, y compris la mise en place de [Unified Service Tagging][1].

{{% apm-config-visibility %}}

Toutes les options de configuration ci-dessous ont des équivalents en propriétés système et en variables d'environnement.
Si le même type de clé est défini pour les deux, la configuration de la propriété système est prioritaire.
Les propriétés système peuvent être définies comme des JVM flags.

### Conversion entre propriétés système et variables d'environnement {#converting-between-system-properties-and-environment-variables}
Sauf indication contraire, vous pouvez convertir entre propriétés système et variables d'environnement avec les transformations suivantes :

- Pour définir une propriété système comme une variable d'environnement, mettez le nom de la propriété en majuscules et remplacez `.` ou `-` par `_`.
  Par exemple, `dd.service` devient `DD_SERVICE`.
- Pour définir une variable d'environnement comme une propriété système, mettez le nom de la variable en minuscules et remplacez `_` par `.`
  Par exemple, `DD_TAGS` devient `dd.tags`.

**Remarque**: Lors de l'utilisation des propriétés système du traceur Java, listez les propriétés avant `-jar`. Cela garantit que les propriétés sont lues en tant qu'options JVM.

## Options de configuration {#configuration-options}

### Unified Service Tagging {#unified-service-tagging}

`dd.service`
: **Variable d'environnement**: `DD_SERVICE`<br>
**Par défaut**: `unnamed-java-app`<br>
Le nom d'un ensemble de processus qui effectuent le même travail. Utilisé pour regrouper les statistiques de votre application. Disponible pour les versions 0.50.0+.

`dd.env`
: **Variable d'environnement**: `DD_ENV`<br>
**Par défaut**: `none`<br>
Votre environnement d'application (par exemple, production, staging). Disponible pour les versions 0.48+.

`dd.version`
: **Variable d'environnement**: `DD_VERSION`<br>
**Par défaut**: `null`<br>
Votre version d'application (par exemple, 2.5, 202003181415, 1.3-alpha). Disponible pour les versions 0.48+.

### Traces {#traces}

`dd.trace.enabled`
: **Variable d'environnement**: `DD_TRACE_ENABLED`<br>
**Par défaut**: `true`<br>
Lorsque `false` l'Agent de tracing est désactivé.<br/>
Voir aussi [DD_APM_TRACING_ENABLED][21].

`dd.trace.config`
: **Variable d'environnement**: `DD_TRACE_CONFIG`<br>
**Par défaut**: `null`<br>
Chemin optionnel vers un fichier où les propriétés de configuration sont fournies une par ligne. Par exemple, le chemin du fichier peut être fourni via `-Ddd.trace.config=<FILE_PATH>.properties`, en définissant le nom du service dans le fichier avec `dd.service=<SERVICE_NAME>`<br>
**Remarque**: Ne comptez pas uniquement sur `dd.trace.config` comme mécanisme pour activer ou désactiver les produits dépendants du SDK (par exemple, Profiler et Instrumentation Dynamique). Utilisez plutôt les propriétés système correspondantes ou les variables d'environnement (ou `application_monitoring.yaml` pour Single Step Instrumentation). 

`dd.service.mapping`
: **Variable d'environnement**: `DD_SERVICE_MAPPING`<br>
**Par défaut**: `null`<br>
**Exemple**: `mysql:my-mysql-service-name-db, postgresql:my-postgres-service-name-db`<br>
Renommez dynamiquement les services via la configuration. Utile pour donner des noms distincts aux bases de données à travers différents services.

`dd.writer.type`
: **Variable d'environnement**: `DD_WRITER_TYPE`<br>
**Par défaut**: `DDAgentWriter`<br>
La valeur par défaut envoie les traces à l'Agent. Configurer avec `LoggingWriter` écrit plutôt les traces dans la console.

`dd.trace.agent.port`
: **Variable d'environnement**: `DD_TRACE_AGENT_PORT`<br>
**Par défaut**: `8126`<br>
Le numéro de port sur lequel l'Agent écoute pour l'hôte configuré. Si la [configuration de l'Agent][6] définit `receiver_port` ou `DD_APM_RECEIVER_PORT` à quelque chose d'autre que le `8126` par défaut, alors `dd.trace.agent.port` ou `dd.trace.agent.url` doit correspondre.

`dd.trace.agent.unix.domain.socket`
: **Variable d'environnement**: `DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`<br>
**Par défaut**: `null`<br>
Peut être utilisée pour faire passer des données de tracing par un proxy en vue de leur envoi vers un Agent Datadog distant.

`dd.trace.agent.url`
: **Variable d'environnement**: `DD_TRACE_AGENT_URL`<br>
**Par défaut**: `null`<br>
L'URL pour envoyer les traces. Si la [configuration de l'Agent][6] définit `receiver_port` ou `DD_APM_RECEIVER_PORT` à quelque chose d'autre que le `8126` par défaut, alors `dd.trace.agent.port` ou `dd.trace.agent.url` doit correspondre. La valeur de l'URL peut commencer par `http://` pour se connecter en utilisant HTTP ou par `unix://` pour utiliser un socket de domaine Unix. Lorsqu'il est défini, cela prévaut sur `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`. Disponible pour les versions 0.65+.

`dd.trace.agent.timeout`
: **Variable d'environnement**: `DD_TRACE_AGENT_TIMEOUT`<br>
**Par défaut**: `10`<br>
Délai d'expiration en secondes pour les interactions réseau avec l'Agent Datadog.

`dd.trace.client-ip.enabled`
: **Par défaut**: `false` <br>
Activez la collecte des adresses IP des clients à partir des en-têtes IP pertinents dans les traces de requêtes HTTP. Activé automatiquement lorsque `dd.appsec.enabled=true`.

`dd.trace.header.tags`
: **Variable d'environnement**: `DD_TRACE_HEADER_TAGS`<br>
**Par défaut**: `null`<br>
**Exemple**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Accepte une carte de clés d'en-tête insensibles à la casse aux noms de balises et applique automatiquement les valeurs d'en-tête correspondantes en tant que balises sur les traces. Accepte également des entrées sans nom de balise spécifié qui sont automatiquement mappées à des balises de la forme `http.request.headers.<header-name>` et `http.response.headers.<header-name>` respectivement.<br><br>
Avant la version 0.96.0, ce paramètre ne s'appliquait qu'aux balises d'en-tête de requête. Pour revenir à l'ancien comportement, ajoutez le paramètre `-Ddd.trace.header.tags.legacy.parsing.enabled=true` ou la variable d'environnement `DD_TRACE_HEADER_TAGS_LEGACY_PARSING_ENABLED=true`.<br><br>
À partir de la version 1.18.3, si [Agent Remote Configuration][3] est activée là où ce service s'exécute, vous pouvez définir `DD_TRACE_HEADER_TAGS` dans l'interface [Catalog][4].

`dd.trace.request_header.tags`
: **Variable d'environnement**: `DD_TRACE_REQUEST_HEADER_TAGS`<br>
**Par défaut**: `null`<br>
**Exemple**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Accepte un mappage de clés d'en-tête insensibles à la casse vers des noms de balises et applique automatiquement les valeurs d'en-tête de requête correspondantes en tant que balises sur les traces. Accepte également des entrées sans nom de balise spécifié qui sont automatiquement mappées à des balises de la forme `http.request.headers.<header-name>`.<br>
Disponible depuis la version 0.96.0.

`dd.trace.response_header.tags`
: **Variable d'environnement**: `DD_TRACE_RESPONSE_HEADER_TAGS`<br>
**Par défaut**: `null`<br>
**Exemple**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Accepte un mappage de clés d'en-tête insensibles à la casse vers des noms de balises et applique automatiquement les valeurs d'en-tête de réponse correspondantes en tant que balises sur les traces. Accepte également des entrées sans nom de balise spécifié qui sont automatiquement mappées à des balises de la forme `http.response.headers.<header-name>`.<br>
Disponible depuis la version 0.96.0.

`dd.trace.header.baggage`
: **Variable d'environnement**: `DD_TRACE_HEADER_BAGGAGE`<br>
**Par défaut**: `null`<br>
**Exemple**: `CASE-insensitive-Header:my-baggage-name,User-ID:userId,My-Header-And-Baggage-Name`<br>
Accepte un mappage de clés d'en-tête insensibles à la casse vers des clés de bagages et applique automatiquement les valeurs d'en-tête de requête correspondantes en tant que bagages sur les traces. Lors de la propagation, le mappage inverse est appliqué: Les bagages sont mappés aux en-têtes.<br>
Disponible depuis la version 1.3.0.

`dd.trace.annotations`
: **Variable d'environnement**: `DD_TRACE_ANNOTATIONS`<br>
**Par défaut**: ([énuméré ici][7])<br>
**Exemple**: `com.some.Trace;io.other.Trace`<br>
Une liste d'annotations de méthode à traiter comme `@Trace`.

`dd.trace.methods`
: **Variable d'environnement**: `DD_TRACE_METHODS`<br>
**Par défaut**: `null`<br>
**Exemple**: `package.ClassName[method1,method2,...];AnonymousClass$1[call];package.ClassName[*]`<br>
Liste des classes/interfaces et des méthodes à tracer. Semblable à l'ajout de `@Trace`, mais sans modifier le code. **Remarque :** Le wildcard method support (`[*]`) ne prend pas en charge les appels de méthodes de constructeur, d'accesseurs, de mutateurs, synthétiques, toString, equals, hashcode ou finaliseur.
`dd.trace.methods` n'est pas destiné à tracer un grand nombre de méthodes et de classes. Pour trouver les goulets d'étranglement CPU, mémoire et IO, décomposés par nom de méthode, nom de classe et numéro de ligne, envisagez plutôt le produit [Continuous Profiler][22].

`dd.trace.classes.exclude`
: **Variable d'environnement**: `DD_TRACE_CLASSES_EXCLUDE`<br>
**Par défaut**: `null`<br>
**Exemple**: `package.ClassName,package.ClassName$Nested,package.Foo*,package.other.*`<br>
Une liste de classes entièrement qualifiées (qui peuvent se terminer par un caractère générique pour désigner un préfixe) qui seront ignorées (non modifiées) par le SDK. Doit utiliser la représentation interne JVM pour les noms (par exemple package.ClassName$Nested et non package.ClassName.Nested)

`dd.trace.partial.flush.min.spans`
: **Variable d'environnement**: `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`<br>
**Par défaut**: `1000`<br>
Définissez un nombre de spans partiels à vider. Utile pour réduire la surcharge mémoire lors de la gestion d'un trafic important ou de traces de longue durée.

`dd.trace.split-by-tags`
: **Variable d'environnement**: `DD_TRACE_SPLIT_BY_TAGS`<br>
**Par défaut**: `null`<br>
**Exemple**: `aws.service`<br>
Utilisé pour renommer le nom du service associé aux spans afin que ceux-ci soient identifiés par le tag de span correspondant.

`dd.trace.health.metrics.enabled`
: **Variable d'environnement**: `DD_TRACE_HEALTH_METRICS_ENABLED`<br>
**Par défaut**: `true`<br>
Lorsqu'il est réglé sur `true`, envoie des métriques de santé du traceur.

`dd.trace.health.metrics.statsd.host`
: **Variable d'environnement**: `DD_TRACE_HEALTH_METRICS_STATSD_HOST`<br>
**Par défaut**: Identique à `dd.jmxfetch.statsd.host` <br>
Host Statsd vers lequel envoyer les métriques de santé

`dd.trace.health.metrics.statsd.port`
: **Variable d'environnement**: `DD_TRACE_HEALTH_METRICS_STATSD_PORT`<br>
**Par défaut**: Identique à `dd.jmxfetch.statsd.port` <br>
Port Statsd vers lequel envoyer les métriques de santé

`dd.trace.obfuscation.query.string.regexp`
: **Variable d'environnement**: `DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`<br>
**Par défaut**: `null`<br>
Une expression régulière pour masquer les données sensibles de la chaîne de requête des requêtes entrantes rapportées dans la balise `http.url` (les correspondances sont remplacées par <redacted>).

`dd.trace.servlet.async-timeout.error`
: **Variable d'environnement**: `DD_TRACE_SERVLET_ASYNC_TIMEOUT_ERROR` <br>
**Par défaut**: `true`<br>
Par défaut, les requêtes asynchrones à exécution longue seront considérées comme une erreur. La définition de cette valeur sur false permet de marquer tous les délais d'expiration comme des requêtes réussies.

`dd.trace.span.tags`
: **Variable d'environnement**: `DD_TRACE_SPAN_TAGS`<br>
**Par défaut**: `none`<br>
**Exemple**: `tag1:value1,tag2:value2`<br>
Une liste de balises par défaut à ajouter à chaque span.

`dd.trace.jmx.tags`
: **Variable d'environnement**: `DD_TRACE_JMX_TAGS`<br>
**Par défaut**: `none`<br>
**Exemple**: `tag1:value1,tag2:value2`<br>
Une liste de balises de span à ajouter à chaque métrique JMX.

`dd.trace.startup.logs`
: **Variable d'environnement**: `DD_TRACE_STARTUP_LOGS`<br>
**Par défaut**: `true`<br>
Lorsque `false`, la journalisation des informations de démarrage est désactivée. Disponible pour les versions 0.64+.

`dd.trace.debug`
: **Variable d'environnement**: `DD_TRACE_DEBUG`<br>
**Par défaut** : `false`<br>
Lorsque `true`, le mode débogage pour le traceur Java de Datadog est activé.

`datadog.slf4j.simpleLogger.jsonEnabled`
: **Variable d'environnement** : Non disponible<br>
**Par défaut** : `false`<br>
Lorsque `true`, les journaux du SDK Java de Datadog sont écrits en JSON. Disponible pour les versions 1.48.0+.<br>
**Remarque** : Ce paramètre est spécifique au logger simple SLF4J intégré et ne prend pas en charge les variables d'environnement. `dd.log.format.json` est l'option de configuration préférée.

`dd.trace.servlet.principal.enabled`
: **Variable d'environnement** : `DD_TRACE_SERVLET_PRINCIPAL_ENABLED`<br>
**Par défaut** : `false`<br>
Lorsque `true`, le principal utilisateur est collecté. Disponible pour les versions 0.61+.

`dd.trace.rate.limit`
: **Variable d'environnement** : `DD_TRACE_RATE_LIMIT`<br>
**Par défaut** : `100`<br>
Nombre maximum de spans à échantillonner par seconde, par processus, lorsque `DD_TRACE_SAMPLING_RULES` ou `DD_TRACE_SAMPLE_RATE` est défini. Sinon, l'Agent Datadog contrôle la limitation de débit.

`dd.http.server.tag.query-string`
: **Variable d'environnement** : `DD_HTTP_SERVER_TAG_QUERY_STRING`<br>
**Par défaut** : `true`<br>
Lorsqu'il est défini sur `true`, les paramètres de chaîne de requête et le fragment sont ajoutés aux spans du serveur web.

`dd.http.server.route-based-naming`
: **Variable d'environnement** : `DD_HTTP_SERVER_ROUTE_BASED_NAMING`<br>
**Par défaut** : `true`<br>
Lorsqu'il est défini sur `false`, les routes du framework HTTP ne sont pas utilisées pour les noms de ressources. _Cela peut changer les noms de ressources et les métriques dérivées si modifié._

`dd.trace.http.server.path-resource-name-mapping`<br>
: **Variable d'environnement** : `DD_TRACE_HTTP_SERVER_PATH_RESOURCE_NAME_MAPPING`<br>
**Par défaut** : `{}` (vide) <br>
Mappe les chemins de requête HTTP à des noms de ressources personnalisés. Fournissez une liste de paires `pattern:resource_name` séparées par des virgules :<br>
&nbsp;&nbsp;&nbsp;&ndash; `pattern`: Un [modèle de chemin de style Ant][20] qui doit correspondre à la valeur de la balise `http.path_group` span.<br>
&nbsp;&nbsp;&nbsp;&ndash; `resource_name`: Le nom de ressource personnalisé à attribuer si le modèle correspond.<br>
Si `*` est utilisé comme le `resource_name` pour un modèle correspondant, le chemin de requête d'origine, non normalisé, combiné avec la méthode HTTP est utilisé comme nom de ressource. Par exemple, étant donné la règle `/test/**:*`, une requête `GET` pour `/test/some/path` donne le nom de ressource `GET /test/some/path`.<br>
Les mappages sont évalués par ordre de priorité, et la première règle correspondante s'applique. Les chemins de requête non correspondants utilisent le comportement de normalisation par défaut.<br>
**Exemple**: Utiliser `-Ddd.trace.http.server.path-resource-name-mapping=/admin/*.jsp:/admin-page,/admin/user/**:/admin/user` donne :<br>
Chemin de requête | Chemin de ressource
------------ | -------------
`/admin/index.jsp` | `/admin-page`
`/admin/user/12345/delete` | `/admin/user`
`/user/12345` | `/user/?`

`dd.trace.http.client.path-resource-name-mapping`<br>
: **Variable d'environnement** : `DD_TRACE_HTTP_CLIENT_PATH_RESOURCE_NAME_MAPPING`<br>
**Par défaut** : `{}` (vide) <br>
Mappe les chemins de requête des clients HTTP à des noms de ressources personnalisés. Utilise le même format que `dd.trace.http.server.path-resource-name-mapping`, mais s'applique aux spans de clients HTTP au lieu des spans de serveurs.

`dd.trace.status404rule.enabled`
: **Variable d'environnement** : `DD_TRACE_STATUS404RULE_ENABLED`<br>
**Par défaut** : `true`<br>
Par défaut, les réponses HTTP 404 utilisent "404" comme nom de ressource de span. Lorsque `false`, les réponses HTTP 404 conservent le chemin d'URL d'origine comme nom de ressource.

`dd.trace.128.bit.traceid.generation.enabled`
: **Variable d'environnement** : `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`<br>
**Par défaut** : `true`<br>
Lorsque `true`, le SDK génère des identifiants de trace de 128 bits et encode les identifiants de trace en 32 caractères hexadécimaux minuscules avec un remplissage de zéros.

`dd.trace.128.bit.traceid.logging.enabled`
: **Variable d'environnement** : `DD_TRACE_128_BIT_TRACEID_LOGGING_ENABLED`<br>
**Par défaut** : `false`<br>
Lorsque `true`, le SDK injectera des identifiants de trace de 128 bits sous forme de 32 caractères hexadécimaux minuscules avec un remplissage de zéros, et des identifiants de trace de 64 bits sous forme de nombres décimaux. Sinon, le SDK injecte toujours les identifiants de trace sous forme de nombres décimaux.

`dd.trace.otel.enabled`
: **Variable d'environnement**: `DD_TRACE_OTEL_ENABLED`<br>
**Par défaut**: `false`<br>
Lorsque `true`, le traçage basé sur OpenTelemetry pour l'instrumentation [personnalisée][16] est activé.

`dd.trace.cloud.payload.tagging.services`
: **Variable d'environnement**: `DD_TRACE_CLOUD_PAYLOAD_TAGGING_SERVICES`<br>
**Par défaut**: `ApiGateway,ApiGatewayV2,EventBridge,Sqs,Sns,S3,Kinesis`<br>
**Exemple**: `S3,Sso`<br>
Pour activer le [tagging de charge utile AWS][18] pour des services supplémentaires, utilisez ce paramètre.

`dd.trace.cloud.request.payload.tagging`
: **Variable d'environnement**: `DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING`<br>
**Par défaut**: N/A (désactivé)<br>
**Exemple**: `$.Metadata.UserId,$.phoneNumber`<br>
Une chaîne de caractères JSONPath séparée par des virgules des entrées à masquer dans les requêtes AWS SDK. Activer cela permet le [tagging de charge utile AWS][18] pour les requêtes.

`dd.trace.cloud.response.payload.tagging`
: **Variable d'environnement**: `DD_TRACE_CLOUD_RESPONSE_PAYLOAD_TAGGING`<br>
**Par défaut**: N/A (désactivé)<br>
**Exemple**: `$.Metadata.Credentials.*`<br>
Une chaîne de caractères JSONPath séparée par des virgules des entrées à masquer dans les réponses AWS SDK. Activer cela permet le [tagging de charge utile AWS][18] pour les réponses.

`dd.trace.cloud.payload.tagging.max-depth`
: **Variable d'environnement**: `DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_DEPTH`<br>
**Par défaut**: `10`<br>
Un entier représentant la profondeur maximale d'une charge utile de requête/réponse AWS SDK à utiliser pour le [tagging de charge utile AWS][18].

`dd.trace.cloud.payload.tagging.max-tags`
: **Variable d'environnement**: `DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_TAGS`<br>
**Par défaut**: `758`<br>
Un entier représentant le nombre maximal de tags à extraire par span à utiliser pour le [tagging de charge utile AWS][18].

### Agent {#agent}

`dd.tags`
: **Variable d'environnement**: `DD_TAGS`<br>
**Par défaut**: `null`<br>
**Exemple**: `layer:api,team:intake,key:value`<br>
Une liste de tags par défaut à ajouter à chaque span, profil et métrique JMX. Si DD_ENV ou DD_VERSION est utilisé, cela remplace tout tag d'environnement ou de version défini dans DD_TAGS. Disponible pour les versions 0.50.0+.

`dd.agent.host`
: **Variable d'environnement**: `DD_AGENT_HOST`<br>
**Par défaut** : `localhost`<br>
Nom d'hôte pour l'envoi des traces. Si vous utilisez un environnement conteneurisé, configurez ceci pour être l'adresse IP de l'hôte. Voir [Tracer les applications Docker][5] pour plus de détails.

`dd.instrumentation.telemetry.enabled`
: **Variable d'environnement** : `DD_INSTRUMENTATION_TELEMETRY_ENABLED`<br>
**Par défaut** : `true`<br>
Lorsque `true`, le traceur collecte des [données de télémétrie][8]. Disponible pour les versions 0.104+. Par défaut, cela vaut `true` pour les versions 0.115+.

### Bases de données {#databases}

`dd.trace.db.client.split-by-instance`
: **Variable d'environnement** : `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` <br>
**Par défaut** : `false`<br>
Lorsqu'il est défini sur `true`, les spans de base de données se voient attribuer le nom de l'instance comme nom de service.

`dd.trace.db.client.split-by-host`
: **Variable d'environnement** : `DD_TRACE_DB_CLIENT_SPLIT_BY_HOST` <br>
**Par défaut** : `false`<br>
Lorsqu'il est défini sur `true`, les spans de base de données se voient attribuer le nom d'hôte de la base de données distante comme nom de service.

`dd.dbm.propagation.mode`
: **Variable d'environnement** : `DD_DBM_PROPAGATION_MODE` <br>
**Par défaut** : `null`<br>
Lorsqu'il est défini sur `service` ou `full`, active Database Monitoring et la corrélation APM. Pour plus d'informations, voir [Correlate Database Monitoring and Traces][23].

### AAP {#aap}

`dd.appsec.enabled`
: **Variable d'environnement** : `DD_APPSEC_ENABLED`<br>
**Par défaut**: `false`<br>
Lorsque `true`, active Datadog App and API Protection Monitoring. De plus, cela active automatiquement la collecte de l'adresse IP du client (`dd.trace.client-ip.enabled`).<br>
Pour plus d'informations, voir [Activation de l'AAP pour Java][19].

### Erreurs {#errors}

`dd.trace.http.client.tag.query-string`
: **Propriété système (obsolète)**: `dd.http.client.tag.query-string`<br>
**Variable d'environnement**: `DD_TRACE_HTTP_CLIENT_TAG_QUERY_STRING`<br>
**Variable d'environnement (obsolète)**: `DD_HTTP_CLIENT_TAG_QUERY_STRING`<br>
**Par défaut**: `true`<br>
Par défaut, les paramètres de chaîne de requête et les fragments sont ajoutés à la balise `http.url` sur les spans du client web. Définir sur `false` pour empêcher la collecte de ces données.

`dd.trace.http.client.error.statuses`
: **Variable d'environnement**: `DD_TRACE_HTTP_CLIENT_ERROR_STATUSES`<br>
**Par défaut**: `400-499`<br>
Une gamme d'erreurs peut être acceptée. Par défaut, les erreurs 4xx sont signalées comme des erreurs pour les clients HTTP. Cette configuration remplace cela. Ex. `dd.trace.http.client.error.statuses=400-403,405,410-499`

`dd.trace.http.server.error.statuses`
: **Variable d'environnement**: `DD_TRACE_HTTP_SERVER_ERROR_STATUSES`<br>
**Par défaut**: `500-599`<br>
Une gamme d'erreurs peut être acceptée. Par défaut, les codes d'état 5xx sont signalés comme des erreurs pour les serveurs HTTP. Cette configuration remplace cela. Ex. `dd.trace.http.server.error.statuses=500,502-599`

`dd.grpc.client.error.statuses`
: **Variable d'environnement**: `DD_GRPC_CLIENT_ERROR_STATUSES`<br>
**Par défaut**: `1-16`<br>
Une gamme d'erreurs peut être acceptée. Par défaut, les codes d'état gRPC de 1 à 16 sont signalés comme des erreurs pour les clients gRPC. Cette configuration remplace cela. Ex. `dd.grpc.client.error.statuses=1-4,7-10`

`dd.grpc.server.error.statuses`
: **Variable d'environnement**: `DD_GRPC_SERVER_ERROR_STATUSES`<br>
**Par défaut**: `2-16`<br>
Une gamme d'erreurs peut être acceptée. Par défaut, les codes d'état gRPC de 2 à 16 sont signalés comme des erreurs pour les serveurs gRPC. Cette configuration remplace cela. Ex. `dd.grpc.server.error.statuses=2-4,7-10`

### Logs {#logs}

`dd.log.level`
: **Variable d'environnement**: `DD_LOG_LEVEL`<br>
**Par défaut**: `INFO`<br>
Définit le niveau de journalisation interne pour le Datadog Java Tracer. Valeurs valides : `DEBUG`, `INFO`, `WARN`, `ERROR`.<br>
Disponible depuis la version 1.36.0

`dd.log.format.json`
: **Variable d'environnement**: `DD_LOG_FORMAT_JSON`<br>
**Par défaut**: `false`<br>
Lorsque `true`, produit des logs du Datadog Java Tracer au format JSON compatible avec le Datadog Logs UI.<br>
Disponible depuis la version 1.58.0

`dd.logs.injection`
: **Variable d'environnement**: `DD_LOGS_INJECTION`<br>
**Par défaut**: `true`<br>
Active l'injection automatique des clés MDC pour les trace and span IDs de Datadog. Voir [Utilisation avancée][2] pour plus de détails.<br><br>
À partir de la version 1.18.3, si [Agent Remote Configuration][3] est activée là où ce service s'exécute, vous pouvez définir `DD_LOGS_INJECTION` dans l'UI [Catalog][4].

### Propagation du contexte de trace {#trace-context-propagation}

Pour des informations sur les valeurs valides et l'utilisation des options de configuration suivantes, voir [Propagation du contexte de trace Java][15].

`dd.trace.propagation.style.inject`
: **Variable d'environnement**: `DD_TRACE_PROPAGATION_STYLE_INJECT`<br>
**Par défaut**: `datadog,tracecontext`<br>
Une liste de formats d'en-tête séparés par des virgules à inclure pour propager les traces distribuées entre les services.<br>
Disponible depuis la version 1.9.0

`dd.trace.propagation.style.extract`
: **Variable d'environnement**: `DD_TRACE_PROPAGATION_STYLE_EXTRACT`<br>
**Par défaut**: `datadog,tracecontext`<br>
Une liste de formats d'en-tête séparés par des virgules à partir desquels tenter d'extraire les données de propagation de traçage distribué. Le premier format trouvé avec des en-têtes complets et valides est utilisé pour définir la trace à continuer.<br>
Disponible depuis la version 1.9.0

`dd.trace.propagation.style`
: **Variable d'environnement**: `DD_TRACE_PROPAGATION_STYLE`<br>
**Par défaut**: `datadog,tracecontext`<br>
Une liste de formats d'en-tête séparés par des virgules à partir desquels tenter d'injecter et d'extraire des données de propagation de traçage distribué. Le premier format trouvé avec des en-têtes complets et valides est utilisé pour définir la trace à continuer. Les paramètres de configuration plus spécifiques `dd.trace.propagation.style.inject` et `dd.trace.propagation.style.extract` ont la priorité lorsqu'ils sont présents.<br>
Disponible depuis la version 1.9.0

`trace.propagation.extract.first`
: **Variable d'environnement**: `DD_TRACE_PROPAGATION_EXTRACT_FIRST`<br>
**Par défaut**: `false`<br>
Lorsqu'il est défini sur `true`, l'extraction du contexte de trace s'arrête dès qu'un contexte de trace valide est trouvé.

### Métriques JMX {#jmx-metrics}

`dd.jmxfetch.enabled`
: **Variable d'environnement**: `DD_JMXFETCH_ENABLED`<br>
**Par défaut**: `true`<br>
Active la collecte de métriques JMX par l'agent de tracing Java.

`dd.jmxfetch.config.dir`
: **Variable d'environnement**: `DD_JMXFETCH_CONFIG_DIR`<br>
**Par défaut**: `null`<br>
**Exemple**: `/path/to/directory/etc/conf.d`<br>
Répertoire de configuration supplémentaire pour la collecte des métriques JMX. L'agent Java recherche `jvm_direct:true` dans la section `instance` du fichier `yaml` pour modifier la configuration.

`dd.jmxfetch.config`
: **Variable d'environnement**: `DD_JMXFETCH_CONFIG`<br>
**Par défaut**: `null`<br>
**Exemple**: `path/to/file/conf.yaml,other/path/to/file/conf.yaml`<br>
Fichier de configuration supplémentaire pour les métriques JMX. L'agent Java recherche `jvm_direct:true` dans la section `instance` du fichier `yaml` pour modifier la configuration.

`dd.jmxfetch.check-period`
: **Variable d'environnement**: `DD_JMXFETCH_CHECK_PERIOD`<br>
**Par défaut**: `15000`<br>
Fréquence d'envoi des métriques JMX (en ms).

`dd.jmxfetch.refresh-beans-period`
: **Variable d'environnement**: `DD_JMXFETCH_REFRESH_BEANS_PERIOD`<br>
**Par défaut**: `600`<br>
Fréquence d'actualisation de la liste des beans JMX disponibles (en secondes).

`dd.jmxfetch.statsd.host`
: **Variable d'environnement**: `DD_JMXFETCH_STATSD_HOST`<br>
**Par défaut**: Identique à `agent.host`<br>
Host Statsd vers lequel envoyer les métriques JMX. Si vous utilisez des sockets de domaine Unix, utilisez un argument comme 'unix://CHEMIN_VERS_SOCKET_UDS'. Exemple : `unix:///var/datadog-agent/dsd.socket`

`dd.jmxfetch.statsd.port`
: **Variable d'environnement**: `DD_JMXFETCH_STATSD_PORT`<br>
**Par défaut**: `8125`<br>
Port StatsD pour envoyer des métriques JMX. Si vous utilisez des sockets de domaine Unix, saisissez 0.

`dd.jmxfetch.<integration-name>.enabled`
: **Variable d'environnement**: `DD_JMXFETCH_<INTEGRATION_NAME>_ENABLED`<br>
**Par défaut**: `false`<br>
Intégration JMX à activer (par exemple, Kafka ou ActiveMQ).

### Intégrations {#integrations}

Pour découvrir comment désactiver des intégrations, consultez la section relative à la compatibilité des [intégrations][13].

`dd.integration.opentracing.enabled`
: **Variable d'environnement**: `DD_INTEGRATION_OPENTRACING_ENABLED`<br>
**Par défaut**: `true`<br>
Par défaut, le client de traçage détecte si un GlobalTracer est chargé et enregistre dynamiquement un traceur dans celui-ci. En le mettant à faux, cela supprime toute dépendance du traceur à OpenTracing.

`dd.hystrix.tags.enabled`
: **Variable d'environnement**: `DD_HYSTRIX_TAGS_ENABLED`<br>
**Par défaut**: `false`<br>
Par défaut, les tags de groupe, de commande et d'état de circuit Hystrix ne sont pas activés. Cette propriété les active.

`dd.trace.elasticsearch.body.enabled`
: **Variable d'environnement**: `DD_TRACE_ELASTICSEARCH_BODY_ENABLED` <br>
**Par défaut**: `false`<br>
Lorsqu'il est défini sur `true`, le corps est ajouté aux spans Elasticsearch et OpenSearch.

`dd.trace.elasticsearch.params.enabled`
: **Variable d'environnement**: `DD_TRACE_ELASTICSEARCH_PARAMS_ENABLED` <br>
**Par défaut**: `true`<br>
Lorsqu'il est défini sur `true`, les paramètres de chaîne de requête sont ajoutés aux spans Elasticsearch et OpenSearch.

`dd.trace.cassandra.keyspace.statement.extraction.enabled`
: **Variable d'environnement**: `DD_TRACE_CASSANDRA_KEYSPACE_STATEMENT_EXTRACTION_ENABLED` <br>
**Par défaut**: `false`<br>
Par défaut, l'espace de clés est extrait uniquement s'il est configuré lors de la création de la session. Lorsqu'il est défini sur `true`, l'espace de clés peut également être extrait en examinant les métadonnées dans les résultats de la requête.

`dd.trace.websocket.messages.enabled`
: **Variable d'environnement**: `DD_TRACE_WEBSOCKET_MESSAGES_ENABLED` <br>
**Par défaut**: `false`<br>
Active le traçage des messages websocket envoyés et reçus (texte et binaire) et des événements de fermeture de connexion.

`dd.trace.websocket.messages.inherit.sampling`
: **Variable d'environnement**: `DD_TRACE_WEBSOCKET_MESSAGES_INHERIT_SAMPLING` <br>
**Par défaut**: `true`<br>
Par défaut, les messages websocket conservent le même échantillonnage que le span capturé lors de la poignée de main. Cela garantit que, si un span de poignée de main a été échantillonné, tous les messages de sa session seront également échantillonnés. Pour désactiver ce comportement et échantillonner chaque message websocket indépendamment, définissez cette configuration sur `false`.

`dd.trace.websocket.messages.separate.traces`
: **Variable d'environnement**: `DD_TRACE_WEBSOCKET_MESSAGES_SEPARATE_TRACES` <br>
**Par défaut** : `true`<br>
Par défaut, chaque message reçu génère une nouvelle trace. La poignée de main y est liée en tant que span link. Définir ce paramètre sur `false` fait en sorte que tous les spans capturés pendant la session soient dans la même trace.

`dd.trace.websocket.tag.session.id`
: **Variable d'environnement** : `DD_TRACE_WEBSOCKET_TAG_SESSION_ID` <br>
**Par défaut** : `false`<br>
Lorsqu'il est défini sur `true`, les websocket spans ont le tag `websocket.session.id` contenant l'ID de session lorsqu'il est disponible.


**Remarque** :

- Si le même type de clé est défini pour les deux, la configuration des propriétés système a la priorité.
- Les propriétés système peuvent être utilisées comme paramètres JVM.
- Par défaut, les métriques JMX de votre application sont envoyées à l'Agent Datadog grâce à DogStatsD sur le port `8125`. Assurez-vous que [DogStatsD est activé pour l'Agent][9].

  - Si vous exécutez l'Agent en tant que conteneur, assurez-vous que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [est défini sur `true`][10], et que le port `8125` est ouvert sur le conteneur de l'Agent.
  - Dans Kubernetes, [lier le port DogStatsD à un port hôte][11]; dans ECS, [définir les flags appropriés dans votre définition de tâche][12].

### UDS {#uds}

`dd.jdk.socket.enabled`
: **Variable d'environnement** : `DD_JDK_SOCKET_ENABLED` <br>
**Par défaut** : `true`<br>
Activer le support natif JDK pour les sockets de domaine Unix.

### Exemples {#examples}

#### `dd.service.mapping` {#ddservicemapping}

Exemple avec une propriété système :

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.service.mapping=postgresql:web-app-pg -jar path/to/application.jar
```

{{< img src="tracing/setup/java/service_mapping.png" alt="cartographie des services" >}}

#### `dd.tags` {#ddtags}
Définir un environnement global pour les spans et les métriques JMX :

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_global_tags.png" alt="Tags de trace globaux" >}}

#### `dd.trace.span.tags` {#ddtracespantags}

Exemple d'ajout de project:test à chaque span :

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_span_tags.png" alt="tags de span de trace" >}}

#### `dd.trace.jmx.tags` {#ddtracejmxtags}

Définir custom.type:2 sur une métrique JMX :

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -Ddd.trace.jmx.tags=custom.type:2 -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_jmx_tags.png" alt="tags JMX de trace" >}}

#### `dd.trace.methods` {#ddtracemethods}

Exemple avec une propriété système :

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.methods="hello.GreetingController[doSomeStuff,doSomeOtherStuff];hello.Randomizer[randomize]" -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_methods.png" alt="méthodes de trace" >}}

#### `dd.trace.db.client.split-by-instance` {#ddtracedbclientsplit-by-instance}

Exemple avec une propriété système :

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=dev -Ddd.service=web-app -Ddd.trace.db.client.split-by-instance=TRUE -jar path/to/application.jar
```

L'instance de base de données 1, `webappdb`, obtient maintenant son propre nom de service qui est le même que les métadonnées de span `db.instance` :

{{< img src="tracing/setup/java/split_by_instance_1.png" alt="instance 1" >}}

L'instance de base de données 2, `secondwebappdb`, obtient maintenant son propre nom de service qui est le même que les métadonnées de span `db.instance` :

{{< img src="tracing/setup/java/split_by_instance_2.png" alt="instance 2" >}}

De même, sur la service map, une app Web appelle désormais deux base de données Postgres distinctes.

#### `dd.http.server.tag.query-string` {#ddhttpservertagquery-string}

Exemple avec une propriété système :

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.http.server.tag.query-string=TRUE -jar path/to/application.jar
```

{{< img src="tracing/setup/java/query_string.png" alt="chaîne de requête" >}}

#### `dd.trace.enabled` {#ddtraceenabled}

Exemple avec propriété système et mode application de débogage :

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.trace.enabled=false -Ddd.trace.debug=true -jar path/to/application.jar
```

Les journaux de débogage de l'application montrent que `Tracing is disabled, not installing instrumentations.`

#### `dd.jmxfetch.config.dir` et `dd.jmxfetch.config` {#ddjmxfetchconfigdir-and-ddjmxfetchconfig}

Exemple de configuration :

- Soit la combinaison de : `DD_JMXFETCH_CONFIG_DIR=<DIRECTORY_PATH>` + `DD_JMXFETCH_CONFIG=conf.yaml`
- Ou directement : `DD_JMXFETCH_CONFIG=<DIRECTORY_PATH>/conf.yaml`

Avec le contenu suivant pour `conf.yaml` :

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

{{< img src="tracing/setup/java/jmxfetch_example.png" alt="Exemple de récupération JMX" >}}

Consultez la [documentation relative à l'intégration Java][14] pour en savoir plus sur la collecte de métriques Java avec JMXFetch.

#### Paramètres d'extraction et d'injection obsolètes {#deprecated-extraction-and-injection-settings}

Ces paramètres d'extraction et d'injection ont été déclarés obsolètes au profit des paramètres `dd.trace.propagation.style.inject`, `dd.trace.propagation.style.extract` et `dd.trace.propagation.style` depuis la version 1.9.0. Voir [Propagation du contexte de trace Java][15]. Le paramètre précédent `b3` pour B3 multi header et B3 single header a été remplacé par les nouveaux paramètres `b3multi` et `b3single`.

`dd.propagation.style.inject`
: **Variable d'environnement**: `DD_PROPAGATION_STYLE_INJECT`<br>
**Par défaut**: `datadog`<br>
Une liste séparée par des virgules des formats d'en-tête à inclure pour propager les traces distribuées entre les services.<br>
Obsolète depuis la version 1.9.0

`dd.propagation.style.extract`
: **Variable d'environnement**: `DD_PROPAGATION_STYLE_EXTRACT`<br>
**Par défaut**: `datadog`<br>
Une liste séparée par des virgules des formats d'en-tête à partir desquels tenter d'extraire les données de propagation de traçage distribué. Le premier format trouvé avec des en-têtes complets et valides est utilisé pour définir la trace à continuer.<br>
Obsolète depuis la version 1.9.0

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging/
[2]: /fr/agent/logs/advanced_log_collection
[3]: /fr/tracing/guide/remote_config
[4]: https://app.datadoghq.com/services
[5]: /fr/tracing/setup/docker/
[6]: /fr/agent/configuration/network/#configure-ports
[7]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[8]: /fr/tracing/configure_data_security/#telemetry-collection
[9]: /fr/extend/dogstatsd/#setup
[10]: /fr/agent/docker/#dogstatsd-custom-metrics
[11]: /fr/extend/dogstatsd/
[12]: /fr/agent/amazon_ecs/#create-an-ecs-task
[13]: /fr/tracing/compatibility_requirements/java#disabling-integrations
[14]: /fr/integrations/java/?tab=host#metric-collection
[15]: /fr/tracing/trace_collection/trace_context_propagation/
[16]: /fr/tracing/trace_collection/custom_instrumentation/java/otel/
[17]: /fr/opentelemetry/interoperability/environment_variable_support
[18]: /fr/tracing/guide/aws_payload_tagging/?code-lang=java
[19]: /fr/security/application_security/setup/threat_detection/java/
[20]: https://ant.apache.org/manual/dirtasks.html#patterns
[21]: /fr/tracing/trace_collection/library_config/#traces
[22]: /fr/profiler/
[23]: /fr/database_monitoring/connect_dbm_and_apm/?tab=java