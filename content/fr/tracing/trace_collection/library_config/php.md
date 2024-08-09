---
code_lang: php
code_lang_weight: 40
further_reading:
- link: https://www.datadoghq.com/blog/monitor-php-performance/
  tag: Blog
  text: Surveillance PHP avec APM et le tracing distribué de Datadog
- link: https://github.com/DataDog/dd-trace-php
  tag: GitHub
  text: Code source
- link: /tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: /tracing/
  tag: Documentation
  text: Utilisation avancée
title: Configurer la bibliothèque de tracing PHP
type: multi-code-lang
---

Après avoir configuré la bibliothèque de tracing avec votre code et configuré l'Agent pour collecter les données d'APM, vous pouvez configurer la bibliothèque de tracing selon vos besoins, notamment la configuration du [Tagging de service unifié][1].

Le traceur PHP peut être configuré à l'aide de variables d'environnement et de paramètres INI.

Les paramètres INI peuvent être configurés de façon globale, par exemple dans le fichier `php.ini`, ou pour un serveur Web ou host virtuel spécifique.

**Remarque** : si vous utilisez l'instrumentation automatique du code (la méthode conseillée), rappelez-vous que le code instrumenté s'exécute avant le code utilisateur. Par conséquent, les variables d'environnement et les paramètres INI doivent être définis au niveau du serveur et mises à disposition de l'environnement d'exécution PHP avant l'exécution de tout code utilisateur. Par exemple, `putenv()` et les fichiers `.env` ne fonctionnent pas.

### Apache

Pour Apache avec php-fpm, utilisez le répertoire `env` de votre fichier de configuration `www.conf` pour configurer le traceur PHP. Exemple :

```
; Exemple pour passer la variable d'environnement de host SOME_ENV
; au processus PHP en tant que DD_AGENT_HOST
env[DD_AGENT_HOST] = $SOME_ENV
; Exemple pour passer la valeur 'my-app' au processus PHP
; en tant que DD_SERVICE
env[DD_SERVICE] = my-app
; Ou pour utiliser le paramètre INI équivalent
php_value datadog.service my-app
```

Vous pouvez également utiliser [`SetEnv`][2] depuis la configuration du serveur, le host virtuel, le répertoire ou le fichier `.htaccess`.

```text
# Dans une configuration de host virtuel en tant que variable d'environnement
SetEnv DD_TRACE_DEBUG 1
# Dans une configuration de host virtuel en tant que paramètre INI
php_value datadog.service my-app
```

### NGINX et PHP-FPM

<div class="alert alert-warning">
<strong>Remarque :</strong> PHP-FPM ne prend pas en charge la valeur <code>false</code> dans les directives <code>env[...]</code>. Utilisez <code>1</code> à la place de <code>true</code> et <code>0</code> à la place de <code>false</code>.
</div>

Pour NGINX, utilisez la directive `env` dans le fichier `www.conf` de php-fpm. Exemple :

```
; Exemple pour passer la variable d'environnement de host SOME_ENV
; au processus PHP en tant que DD_AGENT_HOST
env[DD_AGENT_HOST] = $SOME_ENV
; Exemple pour passer la valeur 'my-app' au processus PHP
; en tant que DD_SERVICE
env[DD_SERVICE] = my-app
; Ou pour utiliser le paramètre INI équivalent
php_value[datadog.service] = my-app
```

**Remarque** : si vous avez activé APM pour votre serveur NGINX, assurez-vous d'avoir correctement configuré le paramètre `opentracing_fastcgi_propagate_context` afin que le tracing distribué fonctionne correctement. Consultez la [configuration d'APM NGINX][3] pour obtenir plus d'informations.

### Serveur CLI PHP

Défini depuis la ligne de commande pour démarrer le serveur.

```text
DD_TRACE_DEBUG=1 php -d datadog.service=my-app -S localhost:8888
```

### Configuration des variables d'environnement

Le tableau suivant répertorie les variables d'environnement permettant de configurer le tracing, ainsi que les paramètres INI correspondants (le cas échéant) et les valeurs par défaut.

`DD_AGENT_HOST`
: **INI** : `datadog.agent_host`<br>
**Valeur par défaut** : `localhost` <br>
Hostname de l'Agent.

`DD_AUTOFINISH_SPANS`
: **INI** : `datadog.autofinish_spans`<br>
**Valeur par défaut** : `0`<br>
Définit si les spans sont automatiquement finalisées lors du vidage du traceur.

`DD_DISTRIBUTED_TRACING`
: **INI** : `datadog.distributed_tracing`<br>
**Valeur par défaut** : `1`<br>
Définit si le tracing distribué doit être activé ou non.

`DD_ENV`
: **INI** : `datadog.env`<br>
**Valeur par défaut** : `null`<br>
Définit l'environnement de l'application, par exemple `prod`, `pre-prod` ou encore `stage`. Ajouté avec la version `0.47.0`.

`DD_PROFILING_ENABLED`
: **INI** : `datadog.profiling.enabled`. INI disponible à partir de la version `0.82.0`.<br>
**Valeur par défaut** : `1`<br>
Active le profileur Datadog. Ajouté avec la version `0.69.0`. Consultez la section [Activer le profileur PHP][4]. Dans la version `0.81.0` et les versions antérieures, la valeur par défaut est `0`.

`DD_PROFILING_ENDPOINT_COLLECTION_ENABLED`
: **INI** : `datadog.profiling.endpoint_collection_enabled`. INI disponible à partir de la version `0.82.0`.<br>
**Valeur par défaut** : `1`<br>
Permet d'activer la collecte des données d'endpoint dans les profils. Ajouté avec la version `0.79.0`.

`DD_PROFILING_EXPERIMENTAL_CPU_TIME_ENABLED`
: **INI** : `datadog.profiling.experimental_cpu_time_enabled`. INI disponible à partir de la version `0.82.0`.<br>
**Valeur par défaut** : `1`<br>
Active le type de profil CPU expérimental. Ajouté avec la version `0.69.0`. Dans la version `0.76` et les versions antérieures, la valeur par défaut est `0`.

`DD_PROFILING_LOG_LEVEL`
: **INI** : `datadog.profiling.log_level`. INI disponible à partir de la version `0.82.0`.<br>
**Valeur par défaut** : `off`<br>
Définit le niveau de log du profileur. Valeur autorisées : `off`, `error`, `warn`, `info`, `debug` et `trace`. Les logs du profileur sont écrits dans le flux d'erreurs standard du processus. Ajouté avec la version `0.69.0`.

`DD_PRIORITY_SAMPLING`
: **INI** : `datadog.priority_sampling`<br>
**Valeur par défaut** : `1`<br>
Active ou désactive l'échantillonnage prioritaire.

`DD_SERVICE`
: **INI** : `datadog.service`<br>
**Valeur par défaut** : `null`<br>
Nom de l'application par défaut. Pour les versions antérieures à 0.47.0, il s'agit de `DD_SERVICE_NAME`.

`DD_SERVICE_MAPPING`
: **INI** : `datadog.service_mapping`<br>
**Valeur par défaut** : `null`<br>
Modifie le nom par défaut d'une intégration APM. Vous pouvez renommer plusieurs intégrations à la fois. Utilisez par exemple `DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db` (voir la rubrique [Noms des intégrations](#noms-des-integrations)).

`DD_TRACE_AGENT_ATTEMPT_RETRY_TIME_MSEC`
: **INI** : `datadog.trace.agent_attempt_retry_time_msec`<br>
**Valeur par défaut** : `5000`<br>
Délai (en millisecondes) avant une nouvelle tentative du disjoncteur basé sur les communications inter-processus.

`DD_TRACE_AGENT_CONNECT_TIMEOUT`
: **INI** : `datadog.trace.agent_connect_timeout`<br>
**Valeur par défaut** : `100`<br>
Délai d'expiration (en millisecondes) de la connexion de l'Agent.

`DD_TRACE_AGENT_MAX_CONSECUTIVE_FAILURES`
: **INI** : `datadog.trace.agent_max_consecutive_failures`<br>
**Valeur par défaut** : `3`<br>
Nombre maximal de tentatives du disjoncteur basé sur les communications inter-processus.

`DD_TRACE_AGENT_PORT`
: **INI** : `datadog.trace.agent_port`<br>
**Valeur par défaut** : `8126`<br>
Numéro de port de l'Agent.

`DD_TRACE_AGENT_TIMEOUT`
: **INI** : `datadog.trace.agent_timeout`<br>
**Valeur par défaut** : `500`<br>
Délai d'expiration (en millisecondes) du transfert de la requête de l'Agent.

`DD_TRACE_AGENT_URL`
: **INI** : `datadog.trace.agent_url`<br>
**Valeur par défaut** : `null`<br>
URL de l'Agent, qui a la priorité sur `DD_AGENT_HOST` et sur `DD_TRACE_AGENT_PORT`. Exemple : `https://localhost:8126`. Ajouté avec la version `0.47.1`.

`DD_TRACE_AUTO_FLUSH_ENABLED`
: **INI** : `datadog.trace.auto_flush_enabled`<br>
**Valeur par défaut** : `0`<br>
Vide automatiquement le traceur lorsque toutes les spans sont finalisées ; définissez cette variable sur `1` conjointement à `DD_TRACE_GENERATE_ROOT_SPAN=0` pour tracer les [processus à exécution longue](#scripts-cli-a-execution-longue).

`DD_TRACE_CLI_ENABLED`
: **INI** : `datadog.trace.cli_enabled`<br>
**Valeur par défaut** : `0`<br>
Active le tracing des scripts PHP depuis l'interface de ligne de commande. Consultez la rubrique [Tracer des scripts CLI](#tracer-des-scripts-cli).

`DD_TRACE_DEBUG`
: **INI** : `datadog.trace.debug`<br>
**Valeur par défaut** : `0`<br>
Active le mode debugging. Avec la valeur `1`, les messages de log sont envoyés vers l'appareil ou le fichier défini dans le paramètre INI `error_log`. La valeur réelle de `error_log` peut être différente de la sortie de `php -i`, car elle peut être écrasée dans les fichiers de configuration PHP-FPM/Apache.

`DD_TRACE_ENABLED`
: **INI** : `datadog.trace.enabled`<br>
**Valeur par défaut** : `1`<br>
Active le traceur de façon globale.

`DD_TRACE_GENERATE_ROOT_SPAN`
: **INI** : `datadog.trace.generate_root_span`<br>
**Valeur par défaut** : `1`<br>
Génère automatiquement une span de premier niveau ; définissez cette variable sur `0` conjointement à `DD_TRACE_AUTO_FLUSH_ENABLED=1` pour tracer les [processus à exécution longue](#scripts-cli-a-execution-longue).

`DD_TAGS`
: **INI** : `datadog.tags`<br>
**Valeur par défaut** : `null`<br>
Tags à appliquer à toutes les spans, par exemple `key1:value1,key2:value2`. Ajouté avec la version `0.47.0`.

`DD_TRACE_HEADER_TAGS`
: **INI** : `datadog.trace.header_tags`<br>
**Valeur par défaut** : `null`<br>
Liste des noms d'en-tête au format CSV qui sont ajoutés à la span racine en tant que tags.

`DD_TRACE_HTTP_CLIENT_SPLIT_BY_DOMAIN`
: **INI** : `datadog.trace.http_client_split_by_domain`<br>
**Valeur par défaut** : `0`<br>
Définit le nom de service des requêtes HTTP sur `host-<hostname>`. Par exemple, un appel `curl_exec()` vers `https://datadoghq.com` prend le nom de service `host-datadoghq.com` au lieu du nom de service par défaut `curl`.

`DD_TRACE_REDIS_CLIENT_SPLIT_BY_HOST`
: **INI** : `datadog.trace.redis_client_split_by_host`<br>
**Valeur par défaut** : `0`<br>
Définit le nom de service pour les opérations des clients Redis sur `redis-<hostname>`. Ajouté avec la version `0.51.0`.

`DD_TRACE_<INTEGRATION>_ENABLED`
: **INI** : `datadog.trace.<INTEGRATION>_enabled`<br>
**Valeur par défaut** : `1`<br>
Active ou désactive une intégration. Par défaut, toutes les intégrations sont activées (voir la rubrique [Noms des intégrations](#nom-des-integrations)). Pour les versions antérieures à la version `0.47.1`, il s'agit du paramètre `DD_INTEGRATIONS_DISABLED`, qui accepte une liste d'intégrations à désactiver au format CSV, par exemple `curl,mysqli`.

`DD_TRACE_MEASURE_COMPILE_TIME`
: **INI** : `datadog.trace.measure_compile_time`<br>
**Valeur par défaut** : `1`<br>
Enregistre la durée de compilation de la requête (en millisecondes) dans la span de premier niveau.

`DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`
: **INI** : `datadog.trace.resource_uri_fragment_regex`<br>
**Valeur par défaut** : `null`<br>
Liste d'expressions régulières au format CSV qui identifie les fragments de chemin correspondant aux ID (voir la rubrique [Mapper les noms de ressources à un URI normalisé](#mapper-les-noms-de-ressources-a-un-uri-normalise)).

`DD_TRACE_RESOURCE_URI_MAPPING_INCOMING`
: **INI** : `datadog.trace.resource_uri_mapping_incoming`<br>
**Valeur par défaut** : `null`<br>
Liste de mappages d'URI au format CSV permettant de normaliser les noms de ressources pour les requêtes entrantes (voir la rubrique [Mapper les noms de ressources à un URI normalisé](#mapper-les-noms-de-ressources-a-un-uri-normalise)).

`DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`
: **INI** : `datadog.trace.resource_uri_mapping_outgoing`<br>
**Valeur par défaut** : `null`<br>
Liste de mappages d'URI au format CSV permettant de normaliser les noms de ressources pour les requêtes sortantes (voir la rubrique [Mapper les noms de ressources à un URI normalisé](#mapper-les-noms-de-ressources-a-un-uri-normalise)).

`DD_TRACE_RETAIN_THREAD_CAPABILITIES`
: **INI** : `datadog.trace.retain_thread_capabilities`<br>
**Valeur par défaut** : `0`<br>
Fonctionne sous Linux. Définir sur `true` pour conserver les capacités des threads d'arrière-plan Datadog en cas de modification de l'ID utilisateur effectif. Cette option n'affecte pas la plupart des configurations, mais certains modules (à l'heure actuelle, Datadog n'a connaissance que de [mod-ruid2-mod d'Apache][5]) peuvent invoquer `setuid()` ou des appels système similaires, ce qui entraîne des crashs ou des pertes de fonctionnalité suite à la perte des capacités.<br><br>
**Remarque** : l'activation de cette option peut compromettre la sécurité de votre environnement. En elle-même, cette option ne pose pas de risque pour la sécurité. Toutefois, un hacker capable d'exploiter une vulnérabilité dans PHP ou sur un serveur Web pourrait élever ses privilèges relativement facilement si le serveur Web ou PHP ont été démarrés avec les capacités complètes, étant donné que les threads d'arrière-plan vont conserver leurs capacités initiales. Datadog vous conseille de restreindre les capacités du serveur Web à l'aide de la commande `setcap`.

`DD_TRACE_SAMPLE_RATE`
: **INI** : `datadog.trace.sample_rate`<br>
**Valeur par défaut** : `1.0`<br>
Taux d'échantillonnage des traces (entre `0.0` et `1.0` par défaut). Pour les versions antérieures à `0.36.0`, il s'agit du paramètre `DD_SAMPLING_RATE`.

`DD_TRACE_SAMPLING_RULES`
: **INI** : `datadog.trace.sampling_rules`<br>
**Valeur par défaut** : `null`<br>
Chaîne encodée au format JSON permettant de configurer le taux d'échantillonnage. Pour définir le taux d'échantillonnage sur 20 % : `'[{"sample_rate": 0.2}]'`. Pour définir le taux d'échantillonnage sur 10 % pour les services commençant par « a » et pour les noms de span commençant par « b », et définir le taux d'échantillonnage sur 20 % pour tous les autres services : `'[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]'`. Voir la rubrique [Noms des intégrations](#noms-des-integrations)). Notez que vous **devez** ajouter des apostrophes (`'`) autour de l'objet JSON pour éviter les problèmes d'échappement des guillemets doubles (`"`).

`DD_TRACE_RATE_LIMIT`
: **INI** : `datadog.trace.rate_limit`<br>
**Valeur par défaut** : `0`<br>
Nombre maximal de spans à échantillonner par seconde. Tous les processus au sein d'un pool Apache ou FPM partagent la même limite. Lorsque cette option est désactivée (définie sur 0), l'Agent Datadog se charge de limiter le nombre de spans.

`DD_TRACE_SPANS_LIMIT`
: **INI** : `datadog.trace.spans_limit`<br>
**Valeur par défaut** : `1000`<br>
Nombre maximum de spans générées dans une trace. Lorsque cette limite est atteinte, les spans ne sont plus générées. Si vous augmentez la limite, la quantité de mémoire utilisée par une trace en attente s'accroît, et peut potentiellement atteindre la quantité de mémoire maximale autorisée par PHP. Il est possible d'augmenter la quantité de mémoire maximale autorisée avec le paramètre système INI `memory_limit` de PHP. 

`DD_SPAN_SAMPLING_RULES`
: **INI** : `datadog.span_sampling_rules`<br>
**Valeur par défaut** : `null`<br>
Chaîne encodée au format JSON pour configurer le taux d'échantillonnage. Pour déterminer le taux d'échantillonnage des spans, les règles sont appliquées dans l'ordre configuré. La valeur de `sample_rate` doit être comprise entre 0.0 et 1.0 (inclus). <br>
**Exemple** : définir le taux d'échantillonnage des spans sur 50 % pour le service 'my-service' et le nom d'opération 'http.request', jusqu'à 50 traces par seconde : `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`. Vous **devez** ajouter des apostrophes (`'`) autour de l'objet JSON pour éviter les problèmes d'échappement des guillemets doubles (`"`).<br>
For more information, see [Ingestion Mechanisms][6].<br>


`DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED`
: **INI** : `datadog.trace.url_as_resource_names_enabled`<br>
**Valeur par défaut** : `1`<br>
Active les URL en tant que noms de ressources (voir la rubrique [Mapper les noms de ressources à un URI normalisé](#mapper-les-noms-de-ressources-a-un-uri-normalise)).

`DD_VERSION`
: **INI** : `datadog.version`<br>
**Valeur par défaut** : `null`<br>
Définit la version d'une application dans les traces et logs. Exemples : `1.2.3`, `6c44da20`, `2020.02.13`. Ajouté avec la version `0.47.0`.

`DD_TRACE_HTTP_URL_QUERY_PARAM_ALLOWED`
: **INI** : `datadog.trace.http_url_query_param_allowed`<br>
**Valeur par défaut** : `*`<br>
Une liste de paramètres de requête à recueillir à partir de l'URL, séparés par des virgules. Laissez cette valeur vide pour ne recueillir aucun paramètre, ou définissez-la sur `*` pour recueillir la totalité des paramètres. Ajouté avec la version `0.74.0`.

`DD_TRACE_RESOURCE_URI_QUERY_PARAM_ALLOWED`
: **INI** : `datadog.trace.resource_uri_query_param_allowed`<br>
**Valeur par défaut** : `*`<br>
Une liste de paramètres de requête à recueillir à partir de l'URI de la ressource, séparés par des virgules. Laissez cette valeur vide pour ne recueillir aucun paramètre, ou définissez-la sur `*` pour recueillir la totalité des paramètres. Ajouté avec la version `0.74.0`.

`DD_TRACE_CLIENT_IP_HEADER`
: **INI** : `datadog.trace.client_ip_header`<br>
**Valeur par défaut** : `null`<br>
L'en-tête IP à utiliser pour la collecte de l'adresse IP client, par exemple : `x-forwarded-for`. Ajouté avec la version `0.76.0`.

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **INI** : `datadog.trace.obfuscation_query_string_regexp`<br>
**Valeur par défaut** : 
  ```
  (?i)(?:p(?:ass)?w(?:or)?d|pass(?:_?phrase)?|secret|(?:api_?|private_?|public_?|access_?|secret_?)key(?:_?id)?|token|consumer_?(?:id|key|secret)|sign(?:ed|ature)?|auth(?:entication|orization)?)(?:(?:\s|%20)*(?:=|%3D)[^&]+|(?:"|%22)(?:\s|%20)*(?::|%3A)(?:\s|%20)*(?:"|%22)(?:%2[^2]|%[^2]|[^"%])+(?:"|%22))|bearer(?:\s|%20)+[a-z0-9\._\-]|token(?::|%3A)[a-z0-9]{13}|gh[opsu]_[0-9a-zA-Z]{36}|ey[I-L](?:[\w=-]|%3D)+\.ey[I-L](?:[\w=-]|%3D)+(?:\.(?:[\w.+\/=-]|%3D|%2F|%2B)+)?|[\-]{5}BEGIN(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY[\-]{5}[^\-]+[\-]{5}END(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY|ssh-rsa(?:\s|%20)*(?:[a-z0-9\/\.+]|%2F|%5C|%2B){100,}
  ```
  Expression régulière utilisée pour obfusquer la chaîne de requête incluse dans l'URL. Ajouté avec la version `0.76.0`.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **INI** : `datadog.trace.propagation_style_inject`<br>
**Valeur par défaut** : `Datadog`<br>
Styles de propagation à utiliser lors de l'injection des en-têtes de tracing. En cas d'utilisation de plusieurs styles différents, séparez-les par des virgules. Les styles pris en charge sont les suivants :

  - [B3][7]
  - [B3 single header][8]
  - Datadog

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **INI** : `datadog.trace.propagation_style_extract`<br>
**Valeur par défaut** : `Datadog,B3,B3 single header`<br>
Styles de propagation à utiliser lors de l'extraction des en-têtes de tracing. En cas d'utilisation de plusieurs styles différents, séparez-les par des virgules. Les styles pris en charge sont les suivants :

  - [B3][7]
  - [B3 single header][8]
  - Datadog

#### Noms des intégrations

Le tableau ci-dessous répertorie les noms de service par défaut pour chaque intégration. Modifiez les noms de service avec `DD_SERVICE_MAPPING`.

Utilisez ces noms lorsque vous définissez un paramètre pour une intégration spécifique, tel que `DD_TRACE_<INTÉGRATION>_ENABLED`. Exemple pour Laravel : `DD_TRACE_LARAVEL_ENABLED`.

| Intégration   | Service Name    |
| ------------- | --------------- |
| CakePHP       | `cakephp`       |
| CodeIgniter   | `codeigniter`   |
| cURL          | `curl`          |
| ElasticSearch | `elasticsearch` |
| Eloquent      | `eloquent`      |
| Guzzle        | `guzzle`        |
| Laravel       | `laravel`       |
| Lumen         | `lumen`         |
| Memcached     | `memcached`     |
| Mongo         | `mongo`         |
| Mysqli        | `mysqli`        |
| PDO           | `pdo`           |
| PhpRedis      | `phpredis`      |
| Predis        | `predis`        |
| Slim          | `slim`          |
| Symfony       | `symfony`       |
| WordPress     | `wordpress`     |
| Yii           | `yii`           |
| ZendFramework | `zendframework` |

#### Mapper les noms de ressources à un URI normalisé

<div class="alert alert-warning">
<strong>Paramètre obsolète :</strong> À partir de la version <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.47.0">0.47.0</a>, l'ancien paramètre <code>DD_TRACE_RESOURCE_URI_MAPPING</code> est obsolète. Il continuera à fonctionner pendant un certain temps, mais nous vous conseillons vivement d'utiliser les nouveaux paramètres spécifiés dans ce paragraphe pour éviter tout problème une fois l'ancien paramètre supprimé.

Notez que la configuration de l'un des paramètres suivants : <code>DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX</code>, <code>DD_TRACE_RESOURCE_URI_MAPPING_INCOMING</code> ou <code>DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING</code> activera la nouvelle approche de normalisation des ressources, et toutes les valeurs spécifiées dans <code>DD_TRACE_RESOURCE_URI_MAPPING</code> seront ignorées.
</div>

Pour les intégrations de serveur et client HTTP, l'URL est utilisée afin de créer le nom de ressource de la trace, en suivant le format `<MÉTHODE_REQUÊTE_HTTP> <URL_NORMALISÉE>`. La chaîne de requête est supprimée de l'URL. Cela vous permet de gagner en visibilité sur les frameworks personnalisés qui ne sont pas instrumentés automatiquement en normalisant les URL et en regroupant les endpoints génériques sous une unique ressource.

| Requête HTTP                       | Nom de la ressource |
| :--------------------------------- | :------------ |
| **GET** request to `/foo?a=1&b=2`  | `GET /foo`    |
| **POST** request to `/bar?foo=bar` | `POST /bar`   |

Les ID numériques, les UUID (avec et sans tiret) et les hachages hexadécimaux de 32 à 512 octets sont automatiquement remplacés par le caractère `?`.

| URL (requête GET)                              | Nom de la ressource      |
| :--------------------------------------------- | :----------------- |
| `/user/123/show`                               | `GET /user/?/show` |
| `/widget/b7a992e0-3300-4030-8617-84553b11c993` | `GET /widget/?`    |
| `/api/v2/b7a992e033004030861784553b11c993/123` | `GET /api/v2/?/?`  |
| `/book/0dbf3596`                               | `GET /book/?`      |

Vous pouvez désactiver cette fonctionnalité avec `DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED=0`.

##### Mappage personnalisé de l'URL à la ressource

Certains cas ne sont pas couverts par la normalisation automatique appliquée.

| URL (requête GET)                | Nom de ressource attendu        |
| :------------------------------- | :---------------------------- |
| `/using/prefix/id123/for/id`     | `GET /using/prefix/?/for/id`  |
| `/articles/slug-of-title`        | `GET /articles/?`             |
| `/cities/new-york/rivers`        | `GET /cities/?/rivers`        |
| `/nested/cities/new-york/rivers` | `GET /nested/cities/?/rivers` |

Deux catégories de scénarios ne sont pas couvertes par la normalisation automatique :

  - Le fragment de chemin à normaliser présente un pattern reproductible et peut se trouver partout dans l'URL. Dans l'exemple ci-dessus, il s'agit de `id<nombre>`. Dans cette situation, vous pouvez utiliser le paramètre `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`.
  - Le fragment de chemin peut être n'importe quoi, et le fragment de chemin précédent indique qu'une valeur doit être normalisée. Par exemple, `/cities/new-york` nous indique que `new-york` doit être normalisé, car c'est le nom d'une ville. Ce scénario est couvert par les paramètres `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` et `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` respectivement pour les requêtes entrantes et sortantes.

###### `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`

Ce paramètre correspond à une ou plusieurs expressions régulières, au format CSV, appliquées indépendamment à chaque fragment de chemin. Par exemple, si le paramètre `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` est défini sur `^id\d+$` pour le chemin `/using/prefix/id123/for/id`, les expressions régulières sont appliquées à tous les fragments `using`, `prefix`, `id123`, `for` et `id`.

| URL                          | Expression régulière     | Nom de ressource attendu       |
| :--------------------------- | :-------- | :--------------------------- |
| `/using/prefix/id123/for/id` | `^id\d+$` | `GET /using/prefix/?/for/id` |

Puisque cette variable est au format CSV, le caractère `,` (virgule) n'est pas échappé. Il ne peut donc pas être utilisé dans vos expressions régulières.

###### `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` et `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`

Ce paramètre correspond à une liste de patterns au format CSV qui peut contenir un wildcard `*`. Par exemple, si vous ajoutez le pattern `cities/*`, chaque fois que le fragment `cities` est trouvé lors de l'analyse d'une URL, le fragment suivant (le cas échéant) est alors remplacé par `?`. Les patterns sont appliqués à toutes les profondeurs ; par conséquent, la règle suivante entraînera la normalisation de `/cities/new-york` et `/nested/cities/new-york` dans le tableau ci-dessus.

Les expressions peuvent être appliquées à une partie d'un fragment spécifique. Par exemple, `path/*-fix` normalisera l'URL `/some/path/changing-fix/nested` en `/some/path/?-fix/nested`

Notez que `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` s'applique uniquement aux requêtes entrantes (par exemple, les frameworks Web), tandis que `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` s'applique uniquement aux requêtes sortantes (par exemple, les requêtes `curl` et `guzzle`).

### Restrictions liées à `open_basedir`

Si vous utilisez le paramètre [`open_basedir`][9], `/opt/datadog-php` doit être ajouté à la liste des répertoires autorisés.
Lorsque l'application est exécutée dans un conteneur Docker, le chemin `/proc/self` doit également être ajouté à la liste des répertoires autorisés.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging/
[2]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[3]: /fr/tracing/setup/nginx/#nginx-and-fastcgi
[4]: /fr/profiler/enabling/php/
[5]: https://github.com/mind04/mod-ruid2
[6]: /fr/tracing/trace_pipeline/ingestion_mechanisms/
[7]: https://github.com/openzipkin/b3-propagation
[8]: https://github.com/openzipkin/b3-propagation#single-header
[9]: https://www.php.net/manual/en/ini.core.php#ini.open-basedir