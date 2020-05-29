---
title: Tracer des applications PHP
kind: documentation
aliases:
  - /fr/tracing/languages/php
  - /fr/agent/apm/php/
  - /fr/tracing/php/
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
## Installation et démarrage

Si vous avez déjà un compte Datadog, vous trouverez des [instructions détaillées][1] dans nos guides intégrés à l'application pour les configurations basées sur un host et les configurations basées sur un conteneur.

Pour connaître la définition des termes utilisés dans l'APM, consultez la [documentation officielle][2].

Pour découvrir comment effectuer des contributions open source au traceur PHP, consultez le [guide relatif aux contributions][3].

### Configurer l'Agent Datadog

Le traceur de l'APM PHP envoie les données de trace par l'intermédiaire de l'Agent Datadog.

[Installez et configurez l'Agent Datadog][4]. Consultez la documentation supplémentaire relative au [tracing d'applications Docker][5] ou au [tracing d'applications Kubernetes][6].

Pour les versions [7.18.0][7] et ultérieures de l'Agent, l'APM est activé par défaut pour tous les environnements.
Si vous exécutez une version plus ancienne de l'Agent, vérifiez que vous avez **[activé l'APM][4]** pour l'Agent.

### Installer l'extension

Installez l'extension PHP à l'aide de l'un des [paquets pré-compilés pour les distributions prises en charge][8].

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

Redémarrez PHP (PHP-FPM ou le SAPI Apache), puis consultez un endpoint de votre application pour lequel le tracing est activé. Affichez l'[interface de l'APM][9] pour visualiser les traces.

**Remarque** : quelques minutes peuvent s'écouler avant que les traces soient visibles dans l'UI. Si elles n'apparaissent toujours pas une fois ce délai passé, [exécutez le script de diagnostic dd-doctor.php][10] depuis la machine du host afin d'identifier les éventuels problèmes.

Si vous ne trouvez pas votre distribution, vous pouvez [installer manuellement][11] l'extension PHP.

## Instrumentation automatique

Par défaut, le tracing est automatiquement activé. Une fois l'extension installée, **ddtrace** trace votre application et envoie les traces à l'Agent.

Par défaut, Datadog prend en charge tous les frameworks Web. L'instrumentation automatique fonctionne en modifiant l'exécution de PHP pour wrapper certaines fonctions et méthodes afin de les tracer. Le traceur PHP prend en charge l'instrumentation automatique pour [plusieurs bibliothèques](#compatibilite-des-bibliotheques).

L'instrumentation automatique capture :

* Le temps d'exécution de la méthode
* Les données de trace pertinentes, telles que l'URL et les codes de réponse de statut pour les requêtes Web ou les requêtes SQL pour l'accès à la base de données
* Les exceptions non traitées, y compris les traces de pile le cas échéant
* Le nombre total de traces (p. ex. les requêtes Web) transmises via le système

**Remarque** : si votre application n'utilise pas Composer ni un chargeur automatique enregistré avec `spl_autoload_register()`, définissez la variable d'environnement `DD_TRACE_NO_AUTOLOADER=true` pour activer l'instrumentation automatique.

## Modifier le hostname de l'Agent

Configurez vos traceurs d'applications de façon à envoyer des traces à un hostname d'Agent personnalisé :

Le traceur PHP recherche automatiquement les variables ENV `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` puis s'initialise avec celles-ci.

Consultez la [configuration du traceur][12] pour découvrir comment définir ces variables.

## Compatibilité

L'APM PHP prend en charge les versions suivantes de PHP :

| Version | Type de prise en charge    |
|:--------|:----------------|
| 7.4.x   | Prise en charge complète |
| 7.3.x   | Prise en charge complète |
| 7.2.x   | Prise en charge complète |
| 7.1.x   | Prise en charge complète |
| 7.0.x   | Prise en charge complète |
| 5.6.x   | Prise en charge complète |
| 5.4.x   | Prise en charge complète |

L'APM PHP prend en charge les SAPI suivants :

| SAPI           | Type de prise en charge    |
|:---------------|:----------------|
| apache2handler | Prise en charge complète |
| cli            | Prise en charge complète |
| fpm            | Prise en charge complète |

### Intégrations

#### Compatibilité des frameworks Web

Par défaut, Datadog **prend en charge tous les frameworks Web PHP**. Vous pouvez ainsi visualiser les traces des spans des bibliothèques prises en charge, par exemple pour des clients de base de données et HTTP.

Le tableau suivant énumère plusieurs frameworks et versions pour lesquels Datadog peut surveiller des traces.

**Fraweworks Web** :

| Module         | Versions      | Type de prise en charge               |
|:---------------|:--------------|:---------------------------|
| CakePHP        | 2.x           | Toutes les versions PHP |
| CodeIgniter    | 2.x, 3.x      | PHP 7+                     |
| Laravel        | 4.2, 5.x, 6.x | Toutes les versions PHP |
| Lumen          | 5.2+          | Toutes les versions PHP |
| Slim           | 3.x           | Toutes les versions PHP |
| Symfony        | 3.3, 3.4, 4.x | Toutes les versions PHP |
| WordPress      | 4.x, 5.x      | PHP 7+                     |
| Zend Framework | 1.12          | Toutes les versions PHP |
| Yii            | 1.1, 2.0      | Toutes les versions PHP |
| Drupal         |               | Toutes les versions PHP |
| Magento        | 2             | Toutes les versions PHP |
| Phalcon        | 1.3, 3.4      | Toutes les versions PHP |
| Slim           | 2.x           | Toutes les versions PHP |
| Neos Flow      | 1.1           | Toutes les versions PHP |
| FuelPHP        | 1.1           | PHP 7+                     |

Attention : même si votre framework Web n'est pas répertorié, il est par défaut pris en charge avec la dernière version du traceur.

Vous souhaitez utiliser davantage de métadonnées de span et de fonctionnalités internes des frameworks ? Datadog élargit continuellement la prise en charge du tracing avancé pour les frameworks Web PHP. Contactez l'[équipe Datadog][13] pour obtenir de l'aide.

#### Compatibilité des bibliothèques CLI

Le tracing depuis le CLI SAPI est désactivé par défaut. Pour activer le tracing des scripts CLI PHP, définissez `DD_TRACE_CLI_ENABLED=true`.

| Module          | Versions | Type de prise en charge    |
|:----------------|:---------|:----------------|
| Console CakePHP | 2.x      | Prise en charge complète |
| Laravel Artisan | 5.x      | Prise en charge complète |
| Console Symfony |          | _Disponible prochainement_   |

Votre bibliothèque CLI préférée n'est pas disponible ? Datadog élargit continuellement la liste des bibliothèques prises en charge. Contactez l'[équipe Datadog][13] pour obtenir de l'aide.

#### Compatibilité des datastores

| Module                           | Versions                   | Type de prise en charge    |
|:---------------------------------|:---------------------------|:----------------|
| Amazon RDS (avec PDO ou MySQLi) | *(Toute version de PHP prise en charge)*      | Prise en charge complète |
| Elasticsearch                    | 1.x                        | Prise en charge complète |
| Eloquent                         | Versions prises en charge par Laravel | Prise en charge complète |
| Memcached                        | *(Toute version de PHP prise en charge)*      | Prise en charge complète |
| MongoDB                          | 1.4.x                      | Prise en charge complète |
| MySQLi                           | *(Toute version de PHP prise en charge)*      | Prise en charge complète |
| PDO (MySQL, PostgreSQL, MariaDB) | *(Toute version de PHP prise en charge)*      | Prise en charge complète |
| Predis                           | 1.1                        | Prise en charge complète |
| AWS Couchbase                    | AWS PHP SDK 3              | _Disponible prochainement_   |
| AWS DynamoDB                     | AWS PHP SDK 3              | _Disponible prochainement_   |
| AWS ElastiCache                  | AWS PHP SDK 3              | _Disponible prochainement_   |
| Doctrine ORM                     | 2                          | _Disponible prochainement_   |
| ODBC                             | *(Toute version de PHP prise en charge)*      | _Disponible prochainement_   |
| PHPredis                         | 4                          | _Disponible prochainement_   |
| Solarium                         | 4.2                        | _Disponible prochainement_   |

Votre datastore préféré n'est pas disponible ? Datadog élargit continuellement la liste des datastores pris en charge. Contactez l'[équipe Datadog][13] pour obtenir de l'aide.

#### Compatibilité des bibliothèques

| Module     | Versions              | Type de prise en charge    |
|:-----------|:----------------------|:----------------|
| Curl       | *(Toute version de PHP prise en charge)* | Prise en charge complète |
| Guzzle     | 5.x                   | Prise en charge complète |
| Guzzle     | 6.x                   | Prise en charge complète |
| Beanstalkd |                       | _Disponible prochainement_   |
| ReactPHP   |                       | _Disponible prochainement_   |

Vos bibliothèques préférées ne sont pas disponibles ? Datadog élargit continuellement la liste des bibliothèques prises en charge. Contactez l'[équipe Datadog][13] pour obtenir de l'aide.

## Configuration

Le traceur PHP peut être configuré à l'aide de variables d'environnement.

**Remarque** : si vous utilisez l'instrumentation automatique du code (la méthode conseillée), rappelez-vous que le code instrumenté s'exécute avant le code utilisateur. Par conséquent, les variables d'environnement ci-dessous doivent être définies au niveau du serveur et mises à disposition de l'environnement d'exécution PHP avant l'exécution de tout code utilisateur. Par exemple, `putenv()` et les fichiers `.env` ne fonctionneraient pas.

### Apache

Pour Apache avec php-fpm, utilisez le répertoire `env` de votre fichier de configuration `www.conf` pour configurer le traceur PHP. Exemple :

```
env[DD_AGENT_HOST] = $FROM_HOST_ENV
env[DD_TRACE_DEBUG] = true
```

Vous pouvez également utiliser [`SetEnv`][14] depuis la configuration du serveur, le host virtuel, le répertoire ou le fichier `.htaccess`.

```text
SetEnv DD_TRACE_DEBUG true
```

### NGINX

Pour NGINX, utilisez le répertoire `env` dans le fichier `www.conf` de php-fpm. Exemple :

```
env[DD_AGENT_HOST] = $FROM_HOST_ENV
env[DD_TRACE_DEBUG] = true
```

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
| `DD_INTEGRATIONS_DISABLED`                | `null`      | Liste au format CSV des extensions désactivées, p. ex. `curl,mysqli`                                                                                           |
| `DD_PRIORITY_SAMPLING`                    | `true`      | Active ou désactive l'échantillonnage prioritaire                                                                                                            |
| `DD_TRACE_SAMPLE_RATE`                    | `1.0`       | Le taux d'échantillonnage des traces. Entre `0.0` et `1.0` (par défaut). La variable était nommée `DD_SAMPLING_RATE` avant la v0.36.0.                                  |
| `DD_SERVICE_NAME`                         | `none`      | Nom par défaut de l'application                                                                                                                           |
| `DD_TRACE_AGENT_ATTEMPT_RETRY_TIME_MSEC`  | `5000`      | Délai de nouvelle tentative du disjoncteur configurable basé sur IPC (en millisecondes)                                                                            |
| `DD_TRACE_AGENT_CONNECT_TIMEOUT`          | `100`       | Délai maximum autorisé pour la configuration de la connexion de l'Agent (en millisecondes)                                                                          |
| `DD_TRACE_AGENT_CONNECT_TIMEOUT`          | `100`       | Délai d'expiration de la connexion de l'Agent (en millisecondes)                                                                                                 |
| `DD_TRACE_AGENT_MAX_CONSECUTIVE_FAILURES` | `3`         | Nombre maximal de tentatives du disjoncteur configurable basé sur IPC (en millisecondes)                                                                                |
| `DD_TRACE_AGENT_PORT`                     | `8126`      | Port de l'Agent                                                                                                                          |
| `DD_TRACE_AGENT_TIMEOUT`                  | `500`       | Délai d'expiration du transfert de la requête de l'Agent (en millisecondes)                                                                                           |
| `DD_TRACE_ANALYTICS_ENABLED`              | `false`     | Flag pour activer la fonction App Analytics pour les spans pertinentes dans les intégrations Web                                                                            |
| `DD_TRACE_CLI_ENABLED`                    | `false`     | Active le tracing de scripts PHP depuis le CLI                                                                                                     |
| `DD_TRACE_DEBUG`                          | `false`     | Active le [mode debugging](#mappage-personnalisé-de-l-URL-a-la-ressource) pour le traceur                                                                            |
| `DD_TRACE_ENABLED`                        | `true`      | Active le traceur partout                                                                                                                     |
| `DD_TRACE_GLOBAL_TAGS`                    | `none`      | Tags à appliquer à toutes les spans : p. ex. `key1:value1,key2:value2`                                                                                   |
| `DD_TRACE_MEASURE_COMPILE_TIME`           | `true`      | Enregistre la durée de compilation de la requête (en millisecondes) dans la span de premier niveau                                                               |
| `DD_TRACE_NO_AUTOLOADER`                  | `false`     | Définissez cette variable d'environnement sur `true` afin d'activer l'instrumentation automatique pour les applications qui n'utilisent pas de chargeur automatique                                                    |
| `DD_TRACE_REPORT_HOSTNAME`                | `false`     | Active la transmission du hostname sur la span racine                                                                                                     |
| `DD_TRACE_RESOURCE_URI_MAPPING`           | `null`      | Fichier CSV comprenant les règles de mappage de l'URL au nom de la ressource, p. ex. :  `/foo/*,/bar/$*/baz` ; [voir la section Mappage personnalisé de l'URL à la ressource](#mappage-personnalise-de-l-URL-a-la-ressource) |
| `DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED`  | `false`     | Active les URL en tant que noms de ressources ; [voir la section Mappage des noms de ressources aux URI normalisées](#mappage-des-noms-de-ressources-aux-uri-normalisees)                            |
| `DD_<INTÉGRATION>_ANALYTICS_ENABLED`      | `false`     | Flag pour activer la fonction App Analytics pour les spans pertinentes dans une intégration spécifique                                                                      |
| `DD_SERVICE_MAPPING`      | `null`     | Modifie le nom par défaut d'une intégration APM. Vous pouvez remplacer le nom de plusieurs intégrations à la fois. Utilisez par exemple `DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db`.                                                                      |

#### Mappage des noms de ressources aux URI normalisées

Par défaut, l'URL est utilisée afin de créer le nom de ressource de la trace, en suivant le format `<MÉTHODE_REQUÊTE_HTTP> <URL_NORMALISÉE>`. La chaîne de requête est supprimée de l'URL. Cela vous permet de gagner en visibilité sur les frameworks personnalisés qui ne sont pas instrumentés automatiquement en normalisant les URL et en regroupant les endpoints génériques sous une unique ressource.

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

Lorsque [les noms de ressources d'URL sont activés](#mappage-des-noms-de-ressources-aux-URI-normalisees), le mappage d'URL personnalisé se configure via `DD_TRACE_RESOURCE_URI_MAPPING`. Ce paramètre accepte une liste CSV de règles de mappage. Les wildcards `*` et `$*` sont pris en charge. `DD_TRACE_RESOURCE_URI_MAPPING=/foo/*,/bar/$*/baz` est donc valide. Dans ce contexte, `*` est une correspondance gourmande avec un caractère de remplacement `?`, et `$*` forme une correspondance gourmande sans remplacement.

Les règles sont appliquées dans leur ordre d'affichage dans `DD_TRACE_RESOURCE_URI_MAPPING`. Les règles moins gourmandes doivent figurer avant les règles gourmandes. Exemple : `/foo/$*/bar,/foo/*`. 

Le wildcard `*` wildcard est remplacé par `?`.

| Règle de mappage | URL (requête GET)  | Nom de la ressource    |
|:-------------|:-------------------|:-----------------|
| `/foo/*`     | `/foo/bar`         | `GET /foo/?`     |
| `/foo/*/bar` | `/foo/baz/faz/bar` | `GET /foo/?/bar` |
| `/foo-*-bar` | `/foo-secret-bar`  | `GET /foo-?-bar` |

Le wildcard `$*` est mis en correspondance sans être remplacé.

| Règle de mappage        | URL (requête GET)           | Nom de la ressource              |
|:--------------------|:----------------------------|:---------------------------|
| `/state/$*/show`    | `/state/kentucky/show`      | `GET /state/kentucky/show` |
| `/widget/*/type/$*` | `/widget/foo-id/type/green` | `GET /widget/?/type/green` |

## Mise à niveau

Pour mettre à niveau le traceur PHP, [téléchargez la dernière version][8] et suivez les mêmes étapes que lors de l'[installation de l'extension](#installer-l-extension).

**Remarque** : si vous utilisez une mise en cache secondaire dans OPcache en définissant le paramètre `opcache.file_cache`, supprimez le dossier de cache.

## Suppression

Pour supprimer le tracer PHP :

1. Pour php-fpm, arrêtez le service php-fpm ou le serveur Web Apache.
2. Dissociez les fichiers `98-ddtrace.ini` and `99-ddtrace-custom.ini` de votre dossier de configuration PHP.
3. Pour php-fpm, redémarrez le service php-fpm ou le serveur Web Apache.

**Remarque** : si vous utilisez une mise en cache secondaire dans OPcache en définissant le paramètre `opcache.file_cache`, supprimez le dossier de cache.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/install
[2]: /fr/tracing/visualization/
[3]: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
[4]: /fr/tracing/send_traces/
[5]: /fr/tracing/setup/docker/
[6]: /fr/agent/kubernetes/apm/
[7]: https://github.com/DataDog/datadog-agent/releases/tag/7.18.0
[8]: https://github.com/DataDog/dd-trace-php/releases/latest
[9]: https://app.datadoghq.com/apm/services
[10]: https://raw.githubusercontent.com/DataDog/dd-trace-php/master/src/dd-doctor.php
[11]: /fr/tracing/faq/php-tracer-manual-installation
[12]: /fr/tracing/setup/php/#environment-variable-configuration
[13]: /fr/help
[14]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv