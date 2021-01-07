---
title: Tracer des applications PHP
kind: documentation
aliases:
  - /fr/tracing/languages/php
  - /fr/agent/apm/php/
  - /fr/tracing/php/
  - /fr/tracing/setup/php
  - /fr/tracing/setup_overview/php
code_lang: php
type: multi-code-lang
code_lang_weight: 40
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitor-php-performance/'
    tag: Blog
    text: Surveillance PHP avec l'APM et le tracing distribué de Datadog
  - link: 'https://github.com/DataDog/dd-trace-php'
    tag: GitHub
    text: Code source
  - link: /tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
  - link: /tracing/
    tag: Documentation
    text: Utilisation avancée
---
## Exigences de compatibilité

Pour obtenir la liste complète des versions de langage et des bibliothèques prises en charge, consultez la page [Exigences de compatibilité][1].

## Installation et démarrage

### Suivre la documentation intégrée à l'application (conseillé)

Suivez les [instructions de démarrage rapide][2] fournies dans l'application Datadog pour profiter d'une expérience optimale, et notamment :

- Obtenir des instructions détaillées en fonction de la configuration de votre déploiement (hosts, Docker, Kubernetes ou Amazon ECS) ;
- Définir les tags `service`, `env` et `version` de façon dynamique ;
- Activer l'ingestion de 100 % des traces durant la configuration.

Pour connaître la définition des termes utilisés dans l'APM, consultez la [documentation officielle][3].

Pour découvrir comment effectuer des contributions open source au traceur PHP, consultez le [guide relatif aux contributions][4].

### Configurer l'Agent Datadog pour APM

Installez et configurez l'Agent Datadog de façon à ce qu'il reçoive des traces à partir de votre application instrumentée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml`, sous `apm_enabled: true`, et écoute le trafic des traces sur `localhost:8126`. Pour les environnements conteneurisés, suivez les liens ci-dessous afin d'activer la collecte de traces au sein de l'Agent Datadog.

{{< tabs >}}
{{% tab "Conteneurs" %}}

1. Définissez `apm_non_local_traffic: true` dans votre [fichier de configuration principal `datadog.yaml`][1].

2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>

3. Après avoir instrumenté votre application, le client de tracing envoie, par défaut, les traces à `localhost:8126`. S'il ne s'agit pas du host et du port adéquats, modifiez-les en définissant les variables d'environnement ci-dessous :

`DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`.

Consultez la [configuration du traceur][2] pour découvrir comment définir ces variables.

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /fr/tracing/setup/php/#environment-variable-configuration
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


### Installer l'extension

Installez l'extension PHP à l'aide de l'un des [paquets pré-compilés pour les distributions prises en charge][5].

Une fois le paquet téléchargé, installez-le avec l'une des commandes ci-dessous.

```shell
# avec le paquet RPM (RHEL/Centos 6+, Fedora 20+)
rpm -ivh datadog-php-tracer.rpm

# avec le paquet DEB (Debian Jessie ou ultérieur, Ubuntu 14.04+ sur les versions de PHP prises en charge)
dpkg -i datadog-php-tracer.deb

# avec le paquet APK (Alpine)
apk add datadog-php-tracer.apk --allow-untrusted
```

L'extension sera installée pour la version de PHP par défaut. Si vous souhaitez installer l'extension pour une version spécifique de PHP, utilisez la variable d'environnement `DD_TRACE_PHP_BIN` pour définir l'emplacement du binaire PHP cible avant de lancer l'installation.

```shell
export DD_TRACE_PHP_BIN=$(which php-fpm7)
```

Redémarrez PHP (PHP-FPM ou le SAPI Apache), puis consultez un endpoint de votre application pour lequel le tracing est activé. Affichez l'[interface de l'APM][6] pour visualiser les traces.

**Remarque** : quelques minutes peuvent s'écouler avant que les traces soient visibles dans l'interface. Si elles n'apparaissent toujours pas une fois ce délai passé, [créez une page `phpinfo()`][7] depuis la machine du host et faites défiler jusqu'à la section « ddtrace ». Vous y trouverez les checks de diagnostic qui ont échoué, pour vous aider à identifier les éventuels problèmes.

Si vous ne trouvez pas votre distribution, vous pouvez [installer manuellement][8] l'extension PHP.

## Instrumentation automatique

Par défaut, le tracing est automatiquement activé. Une fois l'extension installée, **ddtrace** trace votre application et envoie les traces à l'Agent.

Par défaut, Datadog prend en charge tous les frameworks Web. L'instrumentation automatique fonctionne en modifiant l'exécution de PHP pour wrapper certaines fonctions et méthodes afin de les tracer. Le traceur PHP prend en charge l'instrumentation automatique pour plusieurs bibliothèques.

L'instrumentation automatique capture :

* Le temps d'exécution de la méthode
* Les données de trace pertinentes, telles que l'URL et les codes de réponse de statut pour les requêtes Web ou les requêtes SQL pour l'accès à la base de données
* Les exceptions non traitées, y compris les stack traces le cas échéant
* Le nombre total de traces (p. ex. les requêtes Web) transmises via le système

**Remarque** : si votre application n'utilise pas Composer ni un chargeur automatique enregistré avec `spl_autoload_register()`, définissez la variable d'environnement `DD_TRACE_NO_AUTOLOADER=true` pour activer l'instrumentation automatique.

## Configuration

Le traceur PHP peut être configuré à l'aide de variables d'environnement.

**Remarque** : si vous utilisez l'instrumentation automatique du code (la méthode conseillée), rappelez-vous que le code instrumenté s'exécute avant le code utilisateur. Par conséquent, les variables d'environnement ci-dessous doivent être définies au niveau du serveur et mises à disposition de l'environnement d'exécution PHP avant l'exécution de tout code utilisateur. Par exemple, `putenv()` et les fichiers `.env` ne fonctionneraient pas.

### Apache

Pour Apache avec php-fpm, utilisez le répertoire `env` de votre fichier de configuration `www.conf` pour configurer le traceur PHP. Exemple :

```
; Exemple pour passer la variable d'environnement de host SOME_ENV
; au processus PHP en tant que DD_AGENT_HOST
env[DD_AGENT_HOST] = $SOME_ENV
; Exemple pour passer la valeur 'my-app' au processus PHP
; en tant que DD_SERVICE
env[DD_SERVICE] = my-app
```

Vous pouvez également utiliser [`SetEnv`][9] depuis la configuration du serveur, le host virtuel, le répertoire ou le fichier `.htaccess`.

```text
SetEnv DD_TRACE_DEBUG true
```

### NGINX

Pour NGINX, utilisez la directive `env` dans le fichier `www.conf` de php-fpm. Exemple :

```
; Exemple pour passer la variable d'environnement de host SOME_ENV
; au processus PHP en tant que DD_AGENT_HOST
env[DD_AGENT_HOST] = $SOME_ENV
; Exemple pour passer la valeur 'my-app' au processus PHP
; en tant que DD_SERVICE
env[DD_SERVICE] = my-app
```

**Remarque** : si vous avez activé l'APM pour votre serveur NGINX, assurez-vous d'avoir correctement configuré le paramètre `opentracing_fastcgi_propagate_context` pour que le tracing distribué fonctionne correctement. Consultez la [configuration de l'APM NGINX][10] pour obtenir plus d'informations.

### Serveur CLI PHP

Défini depuis la ligne de commande pour démarrer le serveur.

```text
DD_TRACE_DEBUG=true php -S localhost:8888
```

### Configuration des variables d'environnement

| Variable d'environnement                              | Valeur par défaut     | Remarque                                                                                                                                           |
|-------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_AGENT_HOST`                           | `localhost` | Nom du host de l'Agent                                                                                                                            |
| `DD_AUTOFINISH_SPANS`                     | `false`     | Définit si les spans doivent être automatiquement finalisées ou non lorsque le traceur est vidé                                                                            |
| `DD_DISTRIBUTED_TRACING`                  | `true`      | Définit si le tracing distribué doit être activé ou non                                                                                                          |
| `DD_ENV`                                  | `null`      | Définit l'environnement de l'application, par exemple `prod`, `pre-prod` ou encore `stage`. Ajouté dans la version `0.47.0`.                                         |
| `DD_PRIORITY_SAMPLING`                    | `true`      | Active ou désactive l'échantillonnage prioritaire                                                                                                            |
| `DD_SERVICE`                              | `null`      | Le nom de l'application par défaut. Pour les versions < 0.47.0, il s'agit de `DD_SERVICE_NAME`.                                                                          |
| `DD_SERVICE_MAPPING`                      | `null`      | Modifie le nom par défaut d'une intégration APM. Vous pouvez remplacer le nom de plusieurs intégrations à la fois. Utilisez par exemple `DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db` (voir la section [Noms des intégrations](#noms-des-integrations)). |
| `DD_TRACE_AGENT_ATTEMPT_RETRY_TIME_MSEC`  | `5000`      | Délai de nouvelle tentative du disjoncteur configurable basé sur IPC (en millisecondes)                                                                            |
| `DD_TRACE_AGENT_CONNECT_TIMEOUT`          | `100`       | Délai maximum autorisé pour la configuration de la connexion de l'Agent (en millisecondes)                                                                          |
| `DD_TRACE_AGENT_CONNECT_TIMEOUT`          | `100`       | Délai d'expiration de la connexion de l'Agent (en millisecondes)                                                                                                 |
| `DD_TRACE_AGENT_MAX_CONSECUTIVE_FAILURES` | `3`         | Nombre maximal de tentatives du disjoncteur configurable basé sur IPC (en millisecondes)                                                                                |
| `DD_TRACE_AGENT_PORT`                     | `8126`      | Port de l'Agent                                                                                                                          |
| `DD_TRACE_AGENT_TIMEOUT`                  | `500`       | Délai d'expiration du transfert de la requête de l'Agent (en millisecondes)                                                                                           |
| `DD_TRACE_AGENT_URL`                      | `null`      | L'URL de l'Agent, qui l'emporte sur `DD_AGENT_HOST` et sur `DD_TRACE_AGENT_PORT`. Exemple : `https://localhost:8126`. Ajoutée dans la version `0.47.1`. |
| `DD_TRACE_AUTO_FLUSH_ENABLED`             | `false`     | Vider automatiquement le traceur lorsque toutes les spans sont finalisées ; définir sur `true` conjointement à `DD_TRACE_GENERATE_ROOT_SPAN=0` pour tracer les processus à exécution longue |
| `DD_TRACE_CLI_ENABLED`                    | `false`     | Active le tracing de scripts PHP depuis le CLI                                                                                                     |
| `DD_TRACE_DEBUG`                          | `false`     | Active le [mode debugging](#mappage-personnalisé-de-l-URL-a-la-ressource) pour le traceur                                                                            |
| `DD_TRACE_ENABLED`                        | `true`      | Active le traceur partout                                                                                                                     |
| `DD_TRACE_GENERATE_ROOT_SPAN`             | `true`      | Générer automatiquement une span de premier niveau ; définir sur `false` conjointement à `DD_TRACE_AUTO_FLUSH_ENABLED=1` pour tracer les processus à exécution longue    |
| `DD_TAGS`                                 | `null`      | Tags à appliquer à toutes les spans, p. ex. : `key1:value1,key2:value2`. Ajoutée dans la version `0.47.0`                                                 |
| `DD_TRACE_HTTP_CLIENT_SPLIT_BY_DOMAIN`    | `false`     | Définir le nom de service des requêtes HTTP sur `host-<hostname>`. Par exemple, un appel `curl_exec()` vers `https://datadoghq.com` prendra le nom de service `host-datadoghq.com` au lieu du nom de service par défaut `curl`. |
| `DD_TRACE_REDIS_CLIENT_SPLIT_BY_HOST`     | `false`     | Définit le nom de service pour les opérations des clients Redis sur `redis-<hostname>`. Ajouté dans la version `0.51.0`                            |
| `DD_TRACE_<INTÉGRATION>_ENABLED`          | `true`      | Active ou désactive une intégration. Par défaut, toutes les intégrations sont activées (voir la section [Noms des intégration](#nom-des-integrations)). Pour les versions antérieures à la version `0.47.1`, il s'agit du paramètre `DD_INTEGRATIONS_DISABLED`, qui accepte une liste d'intégrations à désactiver au format CSV, p. ex. : `curl,mysqli`. |
| `DD_TRACE_MEASURE_COMPILE_TIME`           | `true`      | Enregistre la durée de compilation de la requête (en millisecondes) dans la span de premier niveau                                                               |
| `DD_TRACE_NO_AUTOLOADER`                  | `false`     | Définissez cette variable d'environnement sur `true` afin d'activer l'instrumentation automatique pour les applications qui n'utilisent pas de chargeur automatique                                                    |
| `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`    | `null`      | Liste d'expressions regex au format CSV qui identifie les fragments de chemin correspondant aux ID (voir la section [Mapper les noms de ressources à un URI normalisé](#mapper-les-noms-de-ressources-a-un-uri-normalise)). |
| `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING`  | `null`      | Liste de mappages d'URI au format CSV afin de normaliser les noms de ressources pour les requêtes entrantes (voir la section [Mapper les noms de ressources à un URI normalisé](#mapper-les-noms-de-ressources-a-un-uri-normalise)). |
| `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`  | `null`      | Liste de mappages d'URI au format CSV afin de normaliser les noms de ressources pour les requêtes sortantes (voir la section [Mapper les noms de ressources à un URI normalisé](#mapper-les-noms-de-ressources-a-un-uri-normalise)). |
| `DD_TRACE_SAMPLE_RATE`                    | `1.0`       | Taux d'échantillonnage des traces (entre `0.0` et `1.0` par défaut). Pour les versions inférieures à `0.36.0`, ce paramètre est `DD_SAMPLING_RATE`.           |
| `DD_TRACE_SAMPLING_RULES`                 | `null`      | Chaîne encodée au format JSON pour configurer le taux d'échantillonnage. Exemples : définir le taux d'échantillonnage sur 20 % : `[{"sample_rate": 0.2}]`. Définir le taux d'échantillonnage sur 10 % pour les services commençant par « a » et pour les noms de span commençant par « b » et définir le taux d'échantillonnage sur 20 % pour tous les autres services : `[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]` (voir la section [Noms des intégrations](#noms-des-integrations)). |
| `DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED`  | `true`      | Activer les URL en tant que noms de ressources (voir la section [Mapper les noms de ressources à une URL normalisée](#mapper-les-noms-de-ressources-a-une-url-normalisee)).                            |
| `DD_VERSION`                              | `null`      | Définit la version d'une application dans les traces et logs, par exemple : `1.2.3`, `6c44da20`, `2020.02.13`. Ajoutée dans la version `0.47.0`.                    |

#### Noms des intégrations

Le tableau ci-dessous répertorie les noms de service par défaut pour chaque intégration. Modifiez les noms de service avec `DD_SERVICE_MAPPING`.

Utilisez ces noms lorsque vous définissez un paramètre pour une intégration spécifique, tel que `DD_TRACE_<INTÉGRATION>_ANALYTICS_ENABLED`. Exemple pour Laravel : `DD_TRACE_LARAVEL_ANALYTICS_ENABLED`.

| Intégration       | Service Name      |
|-------------------|-------------------|
| CakePHP           | `cakephp`         |
| CodeIgniter       | `codeigniter`     |
| cURL              | `curl`            |
| ElasticSearch     | `elasticsearch`   |
| Eloquent          | `eloquent`        |
| Guzzle            | `guzzle`          |
| Laravel           | `laravel`         |
| Lumen             | `lumen`           |
| Memcached         | `memcached`       |
| Mongo             | `mongo`           |
| Mysqli            | `mysqli`          |
| PDO               | `pdo`             |
| PhpRedis          | `phpredis`        |
| Predis            | `predis`          |
| Slim              | `slim`            |
| Symfony           | `symfony`         |
| WordPress         | `wordpress`       |
| Yii               | `yii`             |
| ZendFramework     | `zendframework`   |

#### Mapper les noms de ressources à une URL normalisée

<div class="alert alert-warning">
<strong>Paramètre obsolète :</strong> À partir de la version <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.47.0">0.47.0</a>, l'ancien paramètre <code>DD_TRACE_RESOURCE_URI_MAPPING</code> est obsolète. Il continuera à fonctionner pendant un certain temps, mais nous vous conseillons vivement d'utiliser les nouveaux paramètres spécifiés dans ce paragraphe pour éviter tout problème une fois l'ancien paramètre supprimé.

Notez que la configuration de l'un des paramètres suivants : <code>DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX</code>, <code>DD_TRACE_RESOURCE_URI_MAPPING_INCOMING</code> ou <code>DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING</code> activera la nouvelle approche de normalisation des ressources, et toutes les valeurs spécifiées dans <code>DD_TRACE_RESOURCE_URI_MAPPING</code> seront ignorées.
</div>

Pour les intégrations de serveur et client HTTP, l'URL est utilisée afin de créer le nom de ressource de la trace, en suivant le format `<MÉTHODE_REQUÊTE_HTTP> <URL_NORMALISÉE>`. La chaîne de requête est supprimée de l'URL. Cela vous permet de gagner en visibilité sur les frameworks personnalisés qui ne sont pas instrumentés automatiquement en normalisant les URL et en regroupant les endpoints génériques sous une unique ressource.

| Requête HTTP                       | Nom de la ressource |
|:-----------------------------------|:--------------|
| **GET** request to `/foo?a=1&b=2`  | `GET /foo`    |
| **POST** request to `/bar?foo=bar` | `POST /bar`   |

Les ID numériques, les UUID (avec et sans tiret) et les hachages hexadécimaux de 32 à 512 octets sont automatiquement remplacés par le caractère `?`.

| URL (requête GET)                              | Nom de la ressource      |
|:-----------------------------------------------|:-------------------|
| `/user/123/show`                               | `GET /user/?/show` |
| `/widget/b7a992e0-3300-4030-8617-84553b11c993` | `GET /widget/?`    |
| `/api/v2/b7a992e033004030861784553b11c993/123` | `GET /api/v2/?/?`  |
| `/book/0dbf3596`                               | `GET /book/?`      |

Vous pouvez désactiver cette fonctionnalité avec `DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED=false`.

##### Mappage personnalisé de l'URL à la ressource

Certains cas ne sont pas couverts par la normalisation automatique appliquée.

| URL (requête GET)                | Nom de ressource attendu        |
|:---------------------------------|:------------------------------|
| `/using/prefix/id123/for/id`    | `GET /using/prefix/?/for/id`  |
| `/articles/slug-of-title`        | `GET /articles/?`             |
| `/cities/new-york/rivers`        | `GET /cities/?/rivers`        |
| `/nested/cities/new-york/rivers` | `GET /nested/cities/?/rivers` |

Deux catégories de scénarios ne sont pas couvertes par la normalisation automatique :

  - Le fragment de chemin à normaliser présente un format reproductible et peut se trouver partout dans l'URL, par exemple `id<number>` dans l'exemple ci-dessus. Ce scénario est couvert par le paramètre `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` ci-dessous.
  - Le fragment de chemin peut être n'importe quoi, et le fragment de chemin précédent indique qu'une valeur doit être normalisée. Par exemple, `/cities/new-york` nous indique que `new-york` doit être normalisé, car c'est le nom d'une ville. Ce scénario est couvert par les paramètres `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` et `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` respectivement pour les requêtes entrantes et sortantes.

###### `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`

Ce paramètre est une liste au format CSV d'expressions regex appliquées indépendamment à chaque fragment de chemin. Par exemple, si le paramètre `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` est défini sur `^id\d+$` pour le premier exemple `/using/prefix/id123/for/id`, les expressions regex seront appliquées à tous les fragments `using`, `prefix`, `id123`, `for` et `id`. Le nom de ressource normalisé final sera `GET /using/prefix/?/for/id`.

Notez que plusieurs expressions régulières séparées par une virgule peuvent être ajoutées : `^id\d+$,code\d+$`. La virgule `,` n'étant pas échappée, elle ne peut pas être utilisée dans l'expression régulière.

###### `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` et `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`

Ce paramètre est une liste d'expressions au format CSV qui peut contenir une wildcard `*`. Par exemple, si vous ajoutez l'expression `cities/*`, cela signifie que chaque fois que le fragment `cities` est trouvé lors de l'analyse d'une URL, alors le fragment suivant (le cas échéant) sera remplacé par `?`. Les expressions sont appliquées à toutes les profondeurs ; par conséquent, la règle suivante entraînera la normalisation de `/cities/new-york` et `/nested/cities/new-york` dans le tableau ci-dessus.

Les expressions peuvent être appliquées à une partie d'un fragment spécifique. Par exemple, `path/*-fix` normalisera l'URL `/some/path/changing-fix/nested` en `/some/path/?-fix/nested`

Notez que `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` s'applique uniquement aux requêtes entrantes (par exemple, les frameworks Web), tandis que `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` s'applique uniquement aux requêtes sortantes (par exemple, les requêtes `curl` et `guzzle`).

## Mise à niveau

Pour mettre à niveau le traceur PHP, [téléchargez la dernière version][5] et suivez les mêmes étapes que lors de l'[installation de l'extension](#installer-l-extension).

**Remarque** : si vous utilisez une mise en cache secondaire dans OPcache en définissant le paramètre `opcache.file_cache`, supprimez le dossier de cache.

## Suppression

Pour supprimer le tracer PHP :

1. Pour php-fpm, arrêtez le service php-fpm ou le serveur Web Apache.
2. Dissociez les fichiers `98-ddtrace.ini` and `99-ddtrace-custom.ini` de votre dossier de configuration PHP.
3. Pour php-fpm, redémarrez le service php-fpm ou le serveur Web Apache.

**Remarque** : si vous utilisez une mise en cache secondaire dans OPcache en définissant le paramètre `opcache.file_cache`, supprimez le dossier de cache.

## Résoudre un crash d'application

Si jamais le traceur PHP entraîne le crash de votre application, généralement en raison d'une erreur de segmentation, il est préférable d'obtenir un core dump et de contacter l'assistance Datadog.

### Obtenir un core dump

Il peut s'avérer difficile d'obtenir un core dump pour les applications PHP, notamment pour PHP-FPM. Voici quelques conseils pour vous aider à obtenir un core dump :

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

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/php
[2]: https://app.datadoghq.com/apm/docs
[3]: /fr/tracing/visualization/
[4]: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
[5]: https://github.com/DataDog/dd-trace-php/releases/latest
[6]: https://app.datadoghq.com/apm/services
[7]: /fr/tracing/troubleshooting/tracer_startup_logs?tab=php#php-info
[8]: /fr/tracing/faq/php-tracer-manual-installation
[9]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[10]: /fr/tracing/setup/nginx/#nginx-and-fastcgi