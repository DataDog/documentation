---
aliases:
- /fr/tracing/languages/php
- /fr/agent/apm/php/
- /fr/tracing/php/
- /fr/tracing/setup/php
- /fr/tracing/setup_overview/php
code_lang: php
code_lang_weight: 40
further_reading:
- link: https://www.datadoghq.com/blog/monitor-php-performance/
  tag: Blog
  text: Surveillance PHP avec l'APM et le tracing distribué de Datadog
- link: https://github.com/DataDog/dd-trace-php
  tag: GitHub
  text: Code source
- link: /tracing/visualization/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: /tracing/
  tag: Documentation
  text: Utilisation avancée
kind: documentation
title: Tracer des applications PHP
type: multi-code-lang
---
## Exigences de compatibilité

Pour obtenir la liste complète des versions de langage et des bibliothèques prises en charge, consultez la page [Exigences de compatibilité][1].

## Installation et démarrage

### Suivre la documentation dans l'application (conseillé)

Suivez les [instructions de démarrage rapide][2] fournies dans l'application Datadog pour profiter d'une expérience optimale, et notamment :

- Obtenir des instructions détaillées en fonction de la configuration de votre déploiement (hosts, Docker, Kubernetes ou Amazon ECS) ;
- Définir les tags `service`, `env` et `version` de façon dynamique ;
- Activer l'ingestion de 100 % des traces durant la configuration.

Pour connaître la définition des termes utilisés dans l'APM, consultez la [documentation officielle][3].

Pour découvrir comment effectuer des contributions open source au traceur PHP, consultez le [guide relatif aux contributions][4].

### Configurer l'Agent Datadog pour APM

Installez et configurez l'Agent Datadog de façon à ce qu'il reçoive des traces à partir de votre application instrumentée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml` sous `apm_config` avec `enabled: true`, et écoute le trafic des traces sur `localhost:8126`. Pour les environnements conteneurisés, suivez les liens ci-dessous afin d'activer la collecte de traces au sein de l'Agent Datadog.

{{< tabs >}}
{{% tab "Conteneurs" %}}

1. Définissez `apm_non_local_traffic: true` dans la section `apm_config` de votre [fichier de configuration principal `datadog.yaml`][1].

2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>

3. Après avoir instrumenté votre application, le client de tracing envoie, par défaut, les traces à `localhost:8126`. S'il ne s'agit pas du host et du port adéquats, modifiez-les en définissant les variables d'environnement ci-dessous :

    `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`

    Consultez la [configuration des variables d'environnement](#configuration-des-variables-d-environnement) pour découvrir comment définir ces variables.
{{< site-region region="us3,us5,eu,gov" >}}

4. Définissez `DD_SITE` dans l'Agent Datadog sur {{< region-param key="dd_site" code="true" >}} pour vous assurer que l'Agent envoie les données au bon site Datadog.

{{< /site-region >}}

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

Pour configurer l'APM Datadog dans AWS Lambda, consultez la documentation dédiée au [tracing de fonctions sans serveur][1].


[1]: /fr/tracing/serverless_functions/
{{% /tab %}}
{{% tab "Autres environnements" %}}

Le tracing est disponible pour un certain nombre d'environnements, tels que [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3] et [Azure App Services][4].

Pour les autres environnements, veuillez consulter la documentation relative aux [intégrations][5] pour l'environnement qui vous intéresse. [Contactez l'assistance][6] si vous rencontrez des problèmes de configuration.

[1]: /fr/agent/basic_agent_usage/heroku/#installation
[2]: /fr/integrations/cloud_foundry/#trace-collection
[3]: /fr/integrations/amazon_elasticbeanstalk/
[4]: /fr/infrastructure/serverless/azure_app_services/#overview
[5]: /fr/integrations/
[6]: /fr/help/
{{% /tab %}}
{{< /tabs >}}


### Installer l'extension

Téléchargez le programme d'installation officiel :

```shell
curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
```

Exécutez le programme d'installation :

```shell
# Installation complète : APM, ASM et profiling (bêta)
php datadog-setup.php --php-bin=all --enable-appsec --enable-profiling

# APM seulement
php datadog-setup.php --php-bin=all

# APM et ASM
php datadog-setup.php --php-bin=all --enable-appsec

# APM et profiling (bêta)
php datadog-setup.php --php-bin=all --enable-profiling
```

Cette commande installe l'extension sur l'ensemble des binaires PHP détectés sur le host ou le conteneur. Si vous ne précisez pas `--php-bin` dans la commande, le programme d'installation s'exécute en mode interactif et vous demande de sélectionner les binaires pertinents pour l'installation. La valeur de `--php-bin` peut être définie sur le chemin d'un binaire spécifique si jamais `dd-trace-php` doit être uniquement installé sur ce binaire.

Redémarrez PHP (PHP-FPM ou le SAPI Apache), puis accédez à un endpoint de votre application pour lequel le tracing est activé. Pour les traces, consultez la [liste des services APM][5].

<div class="alert alert-info">
<strong>Remarque :</strong>
quelques minutes peuvent s'écouler avant que les traces soient visibles dans l'interface. Si elles n'apparaissent toujours pas une fois ce délai passé, créez une page <a href="/tracing/troubleshooting/tracer_startup_logs?tab=php#php-info"><code>phpinfo()</code></a> depuis la machine du host et faites défiler jusqu'à la section `ddtrace`. Vous y trouverez les checks de diagnostic qui ont échoué, pour vous aider à identifier les éventuels problèmes.
</div>

<div class="alert alert-warning">
<strong>Apache ZTS :</strong>
si le binaire CLI PHP créé est de type NTS (non thread-safe), puisqu'Apache utilise une version ZTS (Zend thread-safe) de PHP, vous devez modifier manuellement le chargement de l'extension pour le binaire ZTS. Exécutez <code>/chemin/vers/zts-php --ini</code> pour déterminer l'emplacement du fichier <code>.ini</code> de Datadog, puis ajoutez le suffixe <code>-zts</code> du nom du fichier. Par exemple, remplacez <code>extension=ddtrace-20210902.so</code> par <code>extension=ddtrace-20210902-zts.so</code>.
</div>


Si vous ne pouvez pas utiliser le programme d'installation PHP, consultez les [autres options d'installation][6].

## Instrumentation automatique

Par défaut, le tracing est automatiquement activé. Une fois l'extension installée, **ddtrace** trace votre application et envoie les traces à l'Agent.

Par défaut, Datadog prend en charge tous les frameworks Web. L'instrumentation automatique fonctionne en modifiant l'exécution de PHP pour wrapper certaines fonctions et méthodes afin de les tracer. Le traceur PHP prend en charge l'instrumentation automatique pour plusieurs bibliothèques.

L'instrumentation automatique capture :

* Le temps d'exécution de la méthode
* Les données de trace pertinentes, telles que l'URL et les codes de réponse de statut pour les requêtes Web ou les requêtes SQL pour l'accès à la base de données
* Les exceptions non traitées, y compris les stack traces le cas échéant
* Le nombre total de traces (p. ex. les requêtes Web) transmises via le système

## Configuration

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

Vous pouvez également utiliser [`SetEnv`][7] depuis la configuration du serveur, le host virtuel, le répertoire ou le fichier `.htaccess`.

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

**Remarque** : si vous avez activé APM pour votre serveur NGINX, assurez-vous d'avoir correctement configuré le paramètre `opentracing_fastcgi_propagate_context` afin que le tracing distribué fonctionne correctement. Consultez la [configuration d'APM NGINX][8] pour obtenir plus d'informations.

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
: **INI** : non disponible<br>
**Valeur par défaut** : `0`<br>
Active le profileur Datadog. Ajouté avec la version `0.69.0`. Consultez la section [Activer le profileur PHP][9].

`DD_PROFILING_EXPERIMENTAL_CPU_TIME_ENABLED`
: **INI** : non disponible<br>
**Valeur par défaut** : `0`<br>
Active le type de profil CPU expérimental. Ajouté avec la version `0.69.0`.

`DD_PROFILING_LOG_LEVEL`
: **INI** : non disponible<br>
**Valeur par défaut** : `off`<br>
Définit le niveau de log du profileur. Valeur autorisées : `off`, `error`, `warn`, `info` et `debug`. Les logs du profileur sont écrits dans le flux d'erreurs standard du processus. Ajouté avec la version `0.69.0`.

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
Fonctionne sous Linux. Définir sur `true` pour conserver les capacités des threads d'arrière-plan Datadog en cas de modification de l'ID utilisateur effectif. Cette option n'affecte pas la plupart des configurations, mais certains modules (à l'heure actuelle, Datadog n'a connaissance que de [mod-ruid2-mod d'Apache][10]) peuvent invoquer `setuid()` ou des appels système similaires, ce qui entraîne des crashs ou des pertes de fonctionnalité suite à la perte des capacités.<br><br>
**Remarque** : l'activation de cette option peut compromettre la sécurité de votre environnement. En elle-même, cette option ne pose pas de risque pour la sécurité. Toutefois, un hacker capable d'exploiter une vulnérabilité dans PHP ou sur un serveur Web pourrait élever ses privilèges relativement facilement si le serveur Web ou PHP ont été démarrés avec les capacités complètes, étant donné que les threads d'arrière-plan vont conserver leurs capacités initiales. Datadog vous conseille de restreindre les capacités du serveur Web à l'aide de la commande `setcap`.

`DD_TRACE_SAMPLE_RATE`
: **INI** : `datadog.trace.sample_rate`<br>
**Valeur par défaut** : `1.0`<br>
Taux d'échantillonnage des traces (entre `0.0` et `1.0` par défaut). Pour les versions antérieures à `0.36.0`, il s'agit du paramètre `DD_SAMPLING_RATE`.

`DD_TRACE_SAMPLING_RULES`
: **INI** : `datadog.trace.sampling_rules`<br>
**Valeur par défaut** : `null`<br>
Chaîne encodée au format JSON permettant de configurer le taux d'échantillonnage. Pour définir le taux d'échantillonnage sur 20 % : `'[{"sample_rate": 0.2}]'`. Pour définir le taux d'échantillonnage sur 10 % pour les services commençant par « a » et pour les noms de span commençant par « b », et définir le taux d'échantillonnage sur 20 % pour tous les autres services : `'[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]'`. Voir la rubrique [Noms des intégrations](#noms-des-integrations)). Veuillez noter que vous **devez** ajouter des apostrophes (`'`) autour de l'objet JSON pour éviter les problèmes d'échappement des guillemets doubles (`"`).

`DD_TRACE_SPANS_LIMIT`
: **INI** : `datadog.trace.spans_limit`
**Valeur par défaut** : `1000`<br>
Nombre maximum de spans générées dans une trace. Lorsque cette limite est atteinte, les spans ne sont plus générées. Si vous augmentez la limite, la quantité de mémoire utilisée par une trace en attente s'accroît, et peut potentiellement atteindre la quantité de mémoire maximale autorisée par PHP. Il est possible d'augmenter la quantité de mémoire maximale autorisée avec le paramètre système INI `memory_limit` de PHP. 

`DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED`
: **INI** : `datadog.trace.url_as_resource_names_enabled`<br>
**Valeur par défaut** : `1`<br>
Active les URL en tant que noms de ressources (voir la rubrique [Mapper les noms de ressources à un URI normalisé](#mapper-les-noms-de-ressources-a-un-uri-normalise)).

`DD_VERSION`
: **INI** : `datadog.version`<br>
**Valeur par défaut** : `null`<br>
Définit la version d'une application dans les traces et logs. Exemples : `1.2.3`, `6c44da20`, `2020.02.13`. Ajouté avec la version `0.47.0`.

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

Si vous utilisez le paramètre [`open_basedir`][11], `/opt/datadog-php` doit être ajouté à la liste des répertoires autorisés.
Lorsque l'application est exécutée dans un conteneur Docker, le chemin `/proc/self` doit également être ajouté à la liste des répertoires autorisés.

## Tracer des scripts CLI

### Scripts CLI à exécution courte

Un script à exécution courte s'exécute généralement en quelques secondes ou minutes, et une trace est reçue à chaque fois que le script est exécuté.

Par défaut, le tracing est désactivé pour les scripts PHP qui s'exécutent depuis la ligne de commande. Activez-le en définissant `DD_TRACE_CLI_ENABLED` sur `1`.

```
$ export DD_TRACE_CLI_ENABLED=1

# (Facultatif) Définissez le host et le port de l'Agent s'ils sont différents de localhost et 8126, respectivement
$ export DD_AGENT_HOST=agent
$ export DD_TRACE_AGENT_PORT=8126
```

Par exemple, imaginons que le `script.php` suivant exécute une requête Curl :

```php
<?php

sleep(1);

$ch = curl_init('https://httpbin.org/delay/1');
curl_exec($ch);

sleep(1);

```

Exécutez le script :

```
$ php script.php
```

Une fois exécuté, la trace est générée et envoyée au backend Datadog quand le script se termine.

{{< img src="tracing/setup/php/short-running-cli.jpg" alt="Trace pour un script CLI PHP à exécution courte" >}}

### Scripts CLI à exécution longue

Un script à exécution longue s'exécute pendant des heures ou des jours. Ces scripts exécutent généralement une tâche spécifique de façon répétitive, par exemple le traitement de messages entrants ou de nouvelles lignes ajoutées à une table dans une base de données. Une trace est générée pour chaque unité de travail, par exemple pour chaque message traité, ce qui correspond au comportement attendu.

Par défaut, le tracing est désactivé pour les scripts PHP qui s'exécutent depuis la ligne de commande. Activez-le en définissant `DD_TRACE_CLI_ENABLED` sur `1`.

```
$ export DD_TRACE_CLI_ENABLED=1
# Ces deux paramètres permettent d'envoyer des traces pour chaque unité de travail quand la méthode d'exécution se termine.
$ export DD_TRACE_GENERATE_ROOT_SPAN=0
$ export DD_TRACE_AUTO_FLUSH_ENABLED=1

# (Facultatif) Définissez les paramètres service name, env, etc.
$ export DD_SERVICE=my_service

# (Facultatif) Définissez le host et le port de l'Agent s'ils sont différents de localhost et 8126, respectivement
$ export DD_AGENT_HOST=agent
$ export DD_TRACE_AGENT_PORT=8126
```

Par exemple, prenons le script `long_running.php` suivant :

```php
<?php


/* Code spécifique à Datadog. Peut être placé dans un fichier séparé. Obligatoire dans ce script */
use function DDTrace\trace_method;
use function DDTrace\trace_function;
use DDTrace\SpanData;

trace_function('processMessage', function(SpanData $span, $args) {
    // Accéder aux arguments de la méthode et modifier le nom de la ressource
    $span->resource =  'message:' . $args[0]->id;
    $span->meta['message.content'] = $args[0]->content;
    $span->service = 'my_service';
});

trace_method('ProcessingStage1', 'process', function (SpanData $span, $args) {
    $span->service = 'my_service';
    // Par défaut, le nom de la ressource correspond au nom complet de la méthode.
});

trace_method('ProcessingStage2', 'process', function (SpanData $span, $args) {
    $span->service = 'my_service';
    $span->resource = 'message:' . $args[0]->id;
});
/* Fin du code Datadog */

/** Représente un message qui sera reçu et traité */
class Message
{
    public $id;
    public $content;

    public function __construct($id, $content)
    {
        $this->id   = $id;
        $this->content = $content;
    }
}

/** Une étape de traitement parmi d'autres, chacune devant avoir une span */
class ProcessingStage1
{
    public function process(Message $message)
    {
        sleep(1);
        $ch = curl_init('https://httpbin.org/delay/1');
        curl_exec($ch);
    }
}

/** Une étape de traitement parmi d'autres, chacune devant avoir une span */
class ProcessingStage2
{
    public function process(Message $message)
    {
        sleep(1);
    }
}

/** Dans une application réelle, permet de lire les nouveaux messages à partir d'une source, telle qu'une file d'attente */
function waitForNewMessages()
{
    return [
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
    ];
}

/** Cette fonction correspond à l'unité de travail. Une trace est générée à chaque fois qu'elle est exécutée */
function processMessage(Message $m, array $processors)
{
    foreach ($processors as $processor) {
        $processor->process($m);
        usleep(100000);
    }
}

$processors = [new ProcessingStage1(), new ProcessingStage2()];

/** Une boucle infinie qui attend les nouveaux messages */
while (true) {
    $messages = waitForNewMessages();
    foreach ($messages as $message) {
        processMessage($message, $processors);
    }
}
```

Exécutez le script :

```
$ php long_running.php
```

Une fois exécuté, une trace est générée et envoyée au backend Datadog chaque fois qu'un nouveau message est traité.

{{< img src="tracing/setup/php/long-running-cli.jpg" alt="Trace pour un script CLI PHP à exécution longue" >}}

## Mise à niveau

Pour mettre à niveau le traceur PHP, [téléchargez la dernière version][5] et suivez les mêmes étapes que lors de l'[installation de l'extension](#installer-l-extension).

Une fois l'installation terminée, redémarrez PHP (PHP-FPM ou le SAPI Apache).

**Remarque** : si vous utilisez une mise en cache secondaire dans OPcache en définissant le paramètre `opcache.file_cache`, supprimez le dossier de cache.

## Suppression

Pour supprimer le tracer PHP :

1. Pour php-fpm, arrêtez le service php-fpm ou le serveur Web Apache.
2. Dissociez les fichiers `98-ddtrace.ini` and `99-ddtrace-custom.ini` de votre dossier de configuration PHP.
3. Pour php-fpm, redémarrez le service php-fpm ou le serveur Web Apache.

**Remarque** : si vous utilisez une mise en cache secondaire dans OPcache en définissant le paramètre `opcache.file_cache`, supprimez le dossier de cache.

## Dépanner un crash d'application

Si jamais le traceur PHP entraîne le crash de votre application, généralement en raison d'une erreur de segmentation, il est préférable d'obtenir un core dump ou une trace Valgrind et de contacter l'assistance Datadog.

### Installer les symboles de debugging

Pour que les core dumps soient lisibles, les symboles de debugging pour les binaires PHP doivent être installés sur le système qui exécute PHP.

Pour vérifier si les symboles de debugging sont installés pour PHP ou PHP-FPM, utilisez `gdb`.

Installez `gdb` :

```
apt|yum install -y gdb
```

Exécutez `gdb` avec le binaire souhaité. Par exemple pour PHP-FPM :

```
gdb php-fpm
```

Si la sortie de `gdb` contient une ligne similaire au texte ci-dessous, alors les symboles de debugging sont déjà installés.

```
...
Reading symbols from php-fpm...Reading symbols from /usr/lib/debug/path/to/some/file.debug...done.
...
```

Si la sortie de `gdb` contient une ligne similaire au texte ci-dessous, alors les symboles de debugging doivent être installés :

```
...
Reading symbols from php-fpm...(no debugging symbols found)...done.
...
```


#### Centos

Installez le package `yum-utils` qui fournit le programme `debuginfo-install` :

```
yum install -y yum-utils
```

Trouvez le nom du package pour vos binaires PHP. Celui-ci peut varier en fonction de la méthode d'installation de PHP :

```
yum list installed | grep php
```

Installez les symboles de debugging. Par exemple, pour le package `php-fpm` :

```
debuginfo-install -y php-fpm
```

**Remarque** : si le référentiel qui fournit les binaires PHP n'est pas activé par défaut, il peut être activé lors de l'exécution de la commande `debuginfo-install`. Par exemple :

```
debuginfo-install --enablerepo=remi-php74 -y php-fpm
```

#### Debian

##### PHP installé depuis la DPA Sury Debian

Si PHP a été installé depuis la [DPA Sury Debian][12], les symboles de debugging sont déjà disponibles à partir de la DPA. Par exemple, pour PHP-FPM 7.2 :

```
apt update
apt install -y php7.2-fpm-dbgsym
```

##### PHP installé depuis un autre package

Le projet Debian tient à jour une page wiki avec [des instructions pour installer les symboles de debugging][13].

Modifiez le fichier `/etc/apt/sources.list` :

```
# ... laisser tous les packages existants ici

# ajouter un `deb` deb http://deb.debian.org/debian-debug/ $RELEASE-debug main
# Par exemple, pour buster
deb http://deb.debian.org/debian-debug/ buster-debug main
```

Mettez à jour `apt` :

```
apt update
```

Essayez d'abord d'utiliser les noms canoniques des packages pour les symboles de debugging. Par exemple, si le nom du package est `php7.2-fpm`, essayez :

```
apt install -y php7.2-fpm-dbgsym

# Si la ligne ci-dessus ne fonctionne pas

apt install -y php7.2-fpm-dbg
```

Si les symboles de debugging sont introuvables, utilisez l'utilitaire `find-dbgsym-packages`. Installez le binaire :

```
apt install -y debian-goodies
```

Tentez de trouver les symboles de debugging à l'aide du chemin complet vers le binaire ou de l'ID d'un processus en cours d'exécution :

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

Installez le package à l'aide du nom renvoyé, si vous l'avez trouvé :

```
apt install -y php7.2-fpm-{nom-du-package-renvoyé-par-les-packages-dbgsym}
```

#### Ubuntu

##### PHP installé depuis `ppa:ondrej/php`

Si PHP a été installé depuis [`ppa:ondrej/php`][14], modifiez le fichier source apt `/etc/apt/sources.list.d/ondrej-*.list` en ajoutant le composant `main/debug`.

Avant :

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main```

Après :

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main main/debug```

Mettez à jour et installez les symboles de debugging. Par exemple, pour PHP-FPM 7.2 :

```
apt update
apt install -y php7.2-fpm-dbgsym
```
##### PHP installé depuis un autre package

Trouvez le nom du package pour vos binaires PHP. Celui-ci peut varier en fonction de la méthode d'installation de PHP :

```
apt list --installed | grep php
```

**Remarque** : dans certains cas, `php-fpm` peut être un méta-package qui renvoie vers le vrai package, par exemple `php7.2-fpm` pour PHP-FPM 7.2. Dans ce cas, le nom est celui du vrai package.

Essayez d'abord d'utiliser les noms canoniques des packages pour les symboles de debugging. Par exemple, si le nom du package est `php7.2-fpm`, essayez :

```
apt install -y php7.2-fpm-dbgsym

# Si la ligne ci-dessus ne fonctionne pas

apt install -y php7.2-fpm-dbg
```

Si les packages `-dbg` et `-dbgsym` sont introuvables, activez les référentiels `ddebs`. Pour obtenir des instructions détaillées concernant l'[installation des symboles de debugging][15] depuis les `ddebs`, consultez la documentation Ubuntu.

Par exemple, pour Ubuntu 18.04+, activez le référentiel `ddebs` :

```
echo "deb http://ddebs.ubuntu.com $(lsb_release -cs) main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list

echo "deb http://ddebs.ubuntu.com $(lsb_release -cs)-updates main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list
```

Importez la clé de signature (assurez-vous qu'[elle est correcte][16]) :

```
apt install ubuntu-dbgsym-keyring
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys <CLÉ DE SIGNATURE ISSUE DE LA DOCUMENTATION UBUNTU>
apt update
```

Essayez d'ajouter les noms canoniques des packages pour les symboles de debugging. Par exemple, si le nom du package est `php7.2-fpm`, essayez :

```
apt install -y php7.2-fpm-dbgsym

# Si la ligne ci-dessus ne fonctionne pas

apt install -y php7.2-fpm-dbg
```

Si les symboles de debugging sont introuvables, utilisez l'utilitaire `find-dbgsym-packages`. Installez le binaire :

```
apt install -y debian-goodies
```

Tentez de trouver les symboles de debugging à l'aide du chemin complet vers le binaire ou de l'ID d'un processus en cours d'exécution :

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

Installez le package à l'aide du nom renvoyé, si vous l'avez trouvé :

```
apt install -y php7.2-fpm-{nom-du-package-renvoyé-par-les-packages-dbgsym}
```

### Obtenir un core dump

Il peut s'avérer difficile d'obtenir un core dump pour les applications PHP, notamment pour PHP-FPM. Voici quelques conseils pour vous aider :

1. Passez en revue le log d'erreur de l'application pour déterminer si PHP-FPM a généré un core dump :
   - Recherchez l'expression `(SIGSEGV - core dumped)`, afin de trouver un message confirmant l'enregistrement d'un core dump. Exemple : `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV - core dumped) after <duration> seconds from start`.
   - Recherchez l'expression `(SIGSEGV)`, afin de trouver un message confirmant le non-enregistrement d'un core dump. Exemple : `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV) after <duration> seconds from start`.
1. Accédez au core dump en exécutant `cat /proc/sys/kernel/core_pattern`. La valeur par défaut étant généralement `core`, un fichier `core` est donc généré dans le dossier racine Web.

Si aucun core dump n'a été généré, vérifiez les configurations suivantes et modifiez-les en fonction de vos besoins :

1. Si `/proc/sys/kernel/core_pattern` contient un chemin comprenant des répertoires imbriqués, assurez-vous que le chemin d'accès avec les répertoires complets existe.
1. Si l'utilisateur qui exécute les workers du pool PHP-FPM n'est pas `root` (`www-data` est généralement utilisé), attribuez à cet utilisateur des autorisations d'écriture dans le répertoire des core dumps.
1. Assurez-vous que la valeur de `/proc/sys/fs/suid_dumpable` n'est pas `0`. Définissez-la sur `1` ou `2`, sauf si vous exécutez le pool de workers PHP-FPM en tant que `root`. Vérifiez vos options avec votre administrateur système.
1. Assurez-vous que la valeur de `rlimit_core` est adéquate dans la configuration du pool PHP-FPM. Vous pouvez retirer cette limite, avec `rlimit_core = unlimited`.
1. Assurez-vous que la valeur de `ulimit` est adéquate dans votre système. Vous pouvez retirer cette limite, avec `ulimit -c unlimited`.
1. Si votre application s'exécute dans un conteneur Docker et que vous souhaitez modifier `/proc/sys/*`, vous devez effectuer les changements sur la machine du host. Contactez votre administrateur système pour découvrir les différentes options qui s'offrent à vous. Si vous le pouvez, essayez de reproduire le problème dans vos environnements staging ou test.

### Obtenir une trace Valgrind 

Pour obtenir des informations plus détaillées sur le crash, exécutez l'application avec Valgrind. Contrairement aux core dumps, cette méthode fonctionne toujours dans un conteneur sans privilège.

<div class="alert alert-danger">
<strong>Remarque</strong> : une application exécutée à travers Valgrind est considérablement plus lente que lorsqu'elle est exécutée nativement. Cette méthode est uniquement recommandée en dehors d'un environnement de production.
</div>

Installez Valgrind avec votre gestionnaire de package. Exécutez l'application avec Valgrind le temps de générer quelques requêtes.

Pour une application CLI, exécutez :
{{< code-block lang=shell >}}
USE_ZEND_ALLOC=0 valgrind -- php chemin/vers/script.php
{{< /code-block >}}
Si vous utilisez `php-fpm`, exécutez :
{{< code-block lang="shell" >}}
USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- php-fpm -F --fpm-config <CHEMIN_VERS_FICHIER_CONFIG> <AUTRES_OPTIONS>
{{< /code-block >}}
Si vous utilisez Apache, exécutez :
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- apache2 -X)`
{{< /code-block >}}

Par défaut, la trace Valgrind obtenue est générée vers stderr ; suivez la [documentation officielle][17] (en anglais) pour la générer vers une autre cible. La sortie devrait ressembler à l'exemple ci-dessous pour un processus PHP-FPM :

```
==322== Conditional jump or move depends on uninitialised value(s)
==322==    at 0x41EE82: zend_string_equal_val (zend_string.c:403)
==322==    ...
==322==    ...
==322==
==322== Process terminating with default action of signal 11 (SIGSEGV): dumping core
==322==    at 0x73C8657: kill (syscall-template.S:81)
==322==    by 0x1145D0F2: zif_posix_kill (posix.c:468)
==322==    by 0x478BFE: ZEND_DO_ICALL_SPEC_RETVAL_UNUSED_HANDLER (zend_vm_execute.h:1269)
==322==    by 0x478BFE: execute_ex (zend_vm_execute.h:53869)
==322==    by 0x47D9B0: zend_execute (zend_vm_execute.h:57989)
==322==    by 0x3F6782: zend_execute_scripts (zend.c:1679)
==322==    by 0x394F0F: php_execute_script (main.c:2658)
==322==    by 0x1FFE18: main (fpm_main.c:1939)
==322==
==322== Process terminating with default action of signal 11 (SIGSEGV)
==322==    ...
==322==    ...
==322==
==322== HEAP SUMMARY:
==322==     in use at exit: 3,411,619 bytes in 22,428 blocks
==322==   total heap usage: 65,090 allocs, 42,662 frees, 23,123,409 bytes allocated
==322==
==322== LEAK SUMMARY:
==322==    definitely lost: 216 bytes in 3 blocks
==322==    indirectly lost: 951 bytes in 32 blocks
==322==      possibly lost: 2,001,304 bytes in 16,840 blocks
==322==    still reachable: 1,409,148 bytes in 5,553 blocks
==322==                       of which reachable via heuristic:
==322==                         stdstring          : 384 bytes in 6 blocks
==322==         suppressed: 0 bytes in 0 blocks
==322== Rerun with --leak-check=full to see details of leaked memory
==322==
==322== Use --track-origins=yes to see where uninitialised values come from
==322== For lists of detected and suppressed errors, rerun with: -s
==322== ERROR SUMMARY: 18868 errors from 102 contexts (suppressed: 0 from 0)
```

### Obtenir une strace

Certains problèmes étant causés par des facteurs externes, il peut être utile d'obtenir une `strace`.

<div class="alert alert-danger">
<strong>Remarque</strong> : une application exécutée à travers <code>strace</code> est considérablement plus lente que lorsqu'elle est exécutée nativement. Cette méthode est uniquement recommandée en dehors d'un environnement de production.
</div>

Installez `strace` avec votre gestionnaire de package. Lorsque vous générez une `strace` afin de l'envoyer à l'assistance Datadog, assurez-vous d'utiliser l'option `-f` pour suivre les processus enfant.

Pour une application CLI, exécutez :
{{< code-block lang="shell" >}}
strace -f php chemin/vers/script.php
{{< /code-block >}}

Pour `php-fpm`, exécutez :
{{< code-block lang="shell" >}}
strace -f php-fpm -F --fpm-config <CHEMIN_VERS_FICHIER_CONFIG> <AUTRES_OPTIONS>
{{< /code-block >}}

Pour Apache, exécutez :
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; strace -f apache2 -X)
{{< /code-block >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/php
[2]: https://app.datadoghq.com/apm/docs
[3]: /fr/tracing/visualization/
[4]: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
[5]: https://app.datadoghq.com/apm/services
[6]: /fr/tracing/faq/php-tracer-manual-installation
[7]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[8]: /fr/tracing/setup/nginx/#nginx-and-fastcgi
[9]: /fr/tracing/profiler/enabling/php/
[10]: https://github.com/mind04/mod-ruid2
[11]: https://www.php.net/manual/en/ini.core.php#ini.open-basedir
[12]: https://packages.sury.org/php/
[13]: https://wiki.debian.org/HowToGetABacktrace
[14]: https://launchpad.net/~ondrej/+archive/ubuntu/php
[15]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages
[16]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages#Getting_-dbgsym.ddeb_packages
[17]: https://valgrind.org/docs/manual/manual-core.html#manual-core.comment