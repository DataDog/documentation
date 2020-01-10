---
title: Tracer des applications PHP
kind: documentation
aliases:
  - /fr/tracing/languages/php
  - /fr/agent/apm/php/
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitor-php-performance/'
    tag: Blog
    text: Surveillance PHP avec l'APM et le tracing distribué de Datadog
  - link: 'https://github.com/DataDog/dd-trace-php'
    tag: GitHub
    text: Code source
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
  - link: tracing/
    tag: Documentation
    text: Utilisation avancée
---
## Installation et démarrage

<div class="alert alert-info">Si vous avez déjà un compte Datadog, vous trouverez des instructions détaillées dans nos guides intégrés à l'application pour les configurations <a href="https://app.datadoghq.com/apm/docs?architecture=host-based&language=php" target=_blank> basées sur un host</a> et <a href="https://app.datadoghq.com/apm/docs?architecture=container-based&language=php" target=_blank>basées sur un conteneur</a>.</div>

Pour connaître la définition des termes utilisés dans l'APM, consultez la [documentation officielle][1].

Pour découvrir comment effectuer des contributions open source au traceur PHP, consultez le [guide relatif aux contributions][2].

### Configurer l'Agent Datadog

Le traceur de l'APM PHP envoie les données de trace en passant par l'Agent Datadog.

[Installez et configurez l'Agent Datadog][3]. Consultez la documentation supplémentaire relative au [traçage d'applications Docker][4] ou au [traçage d'applications Kubernetes][5].

Assurez-vous que l'**[APM est activé][3]** dans le fichier de configuration de l'Agent.

### Installer l'extension

Installez l'extension PHP à l'aide de l'un des [paquets pré-compilés pour les distributions prises en charge][6].

Une fois téléchargé, installez le paquet avec l'une des commandes ci-dessous.

```bash
# avec le paquet (RHEL/Centos 6+, Fedora 20+)
$ rpm -ivh datadog-php-tracer.rpm

# avec le paquet (Debian Jessie ou ultérieur, Ubuntu 14.04+ sur les versions PHP prises en charge)
$ dpkg -i datadog-php-tracer.deb

# avec le paquet APK (Alpine)
$ apk add datadog-php-tracer.apk --allow-untrusted
```

Redémarrez PHP (PHP-FPM ou le SAPI Apache), puis consultez un endpoint de votre application pour lequel le tracing est activé. Affichez l'[interface de l'APM][7] pour visualiser les traces.

**Remarque** : quelques minutes peuvent s'écouler avant que les traces soient visibles dans l'UI. Si, une fois ce délai passé, elles n'apparaissent toujours pas, [exécutez le script de diagnostic dd-doctor.php][8] depuis la machine du host afin d'identifier les éventuels problèmes.

Si vous ne trouvez pas votre distribution, vous pouvez [installer manuellement][9] l'extension PHP.

## Instrumentation automatique

Le tracing est automatiquement instrumenté par défaut. Une fois l'extension installée, **ddtrace** trace votre application et envoie les traces à l'Agent.

Même si Datadog ne prend pas officiellement en charge votre framework Web, une instrumentation manuelle n'est pas forcément nécessaire. Datadog enregistre les requêtes Web génériques et crée des traces génériques pour celles-ci. Toutefois, lorsque vous utilisez l'un des frameworks pris en charge, Datadog définit des métadonnées plus pertinentes, ce qui facilite la navigation dans vos services.

L'instrumentation automatique fonctionne en modifiant l'exécution de PHP pour wrapper certaines fonctions et méthodes afin de les tracer. Le traceur PHP prend en charge l'instrumentation automatique pour [plusieurs bibliothèques](#compatibilite-bibliotheques).

L'instrumentation automatique capture :

* Le temps d'exécution de la méthode
* Les données de trace pertinentes, telles que l'URL et les codes de réponse de statut pour les requêtes Web ou les requêtes SQL pour l'accès à la base de données
* Les exceptions non traitées, y compris les traces de pile si disponibles
* Le nombre total de traces (p. ex. les requêtes Web) transmises via le système

**Remarque** : si votre application n'utilise pas Composer ni un chargeur automatique enregistré avec `spl_autoload_register()`, définissez la variable d'environnement `DD_TRACE_NO_AUTOLOADER=true` pour activer l'instrumentation automatique.

## Modifier le hostname de l'Agent

Configurez vos traceurs d'applications de façon à envoyer des traces à un hostname d'Agent personnalisé :

Le traceur PHP recherche automatiquement les variables ENV `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` puis s'initialise avec celles-ci.

Consultez la [configuration du traceur][10] pour découvrir comment définir ces variables.

## Compatibilité

L'APM PHP prend en charge les versions PHP suivantes :

| Version | Type de prise en charge    |
|:--------|:----------------|
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

Si le framework Web que vous utilisez ne figure pas dans la liste ci-dessous, vous pouvez toujours consulter les traces pour vos requêtes Web depuis l'interface. Toutefois, il est possible que certaines métadonnéees et spans très spécifiques à ce framework Web ne s'affichent pas.

| Module         | Versions      | Type de prise en charge    |
|:---------------|:--------------|:----------------|
| CakePHP        | 2.x           | Prise en charge complète |
| CodeIgniter    | 2.x           | PHP 7           |
| Laravel        | 4.2, 5.x      | Prise en charge complète |
| Lumen          | 5.2+          | Prise en charge complète |
| Slim           | 3.x           | Prise en charge complète |
| Symfony        | 3.3, 3.4, 4.x | Prise en charge complète |
| WordPress      | 4.x           | PHP 7           |
| Zend Framework | 1.12          | Prise en charge complète |
| Yii            | 2.0           | Prise en charge complète |
| CodeIgniter    | 3.x           | _Disponible prochainement_   |
| Drupal         |               | _Disponible prochainement_   |
| Magento        | 2             | _Disponible prochainement_   |
| Phalcon        | 1.3, 3.4      | _Disponible prochainement_   |
| Slim           | 2.x           | _Disponible prochainement_   |
| Yii            | 1.1           | _Disponible prochainement_   |

Votre framework préféré n'est pas disponible ? Datadog élargit continuellement la liste des frameworks pris en charge. Contactez l'[équipe Datadog][11] pour obtenir de l'aide.

#### Compatibilité des bibliothèques CLI

Le tracing depuis le CLI SAPI est désactivé par défaut. Pour activer le tracing des scripts CLI PHP, définissez `DD_TRACE_CLI_ENABLED=true`.

| Module          | Versions | Type de prise en charge    |
|:----------------|:---------|:----------------|
| Console CakePHP | 2.x      | Prise en charge complète |
| Laravel Artisan | 5.x      | Prise en charge complète |
| Console Symfony |          | _Disponible prochainement_   |

Votre bibliothèque CLI préférée n'est pas disponible ? Datadog élargit continuellement la liste des bibliothèques prises en charge. Contactez l'[équipe Datadog][11] pour obtenir de l'aide.

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

Votre datastore préféré n'est pas disponible ? Datadog élargit continuellement la liste des datastores pris en charge. Contactez l'[équipe Datadog][11] pour obtenir de l'aide.

#### Compatibilité des bibliothèques

| Module     | Versions              | Type de prise en charge    |
|:-----------|:----------------------|:----------------|
| Curl       | *(Toute version de PHP prise en charge)* | Prise en charge complète |
| Guzzle     | 5.x                   | Prise en charge complète |
| Guzzle     | 6.x                   | Prise en charge complète |
| Beanstalkd |                       | _Disponible prochainement_   |
| ReactPHP   |                       | _Disponible prochainement_   |

Vos bibliothèques préférées ne sont pas disponibles ? Datadog élargit continuellement la liste des bibliothèques prises en charge. Contactez l'[équipe Datadog][11] pour obtenir de l'aide.

## Configuration

Le traceur PHP peut être configuré à l'aide de variables d'environnement.

**Remarque** : si vous utilisez l'instrumentation automatique du code (la méthode conseillée), rappelez-vous que le code instrumenté s'exécute avant le code utilisateur. Par conséquent, les variables d'environnement ci-dessous doivent être définies au niveau du serveur et mises à disposition de l'environnement d'exécution PHP avant l'exécution de tout code utilisateur. Par exemple, `putenv()` et les fichiers `.env` ne fonctionneraient pas.

### Apache

Défini avec [`SetEnv`][12] depuis la configuration du serveur, le host virtuel, le répertoire ou le fichier **.htaccess**.

```
SetEnv DD_TRACE_DEBUG true
```

### NGINX

Défini avec [`fastcgi_param`][13] depuis les contextes `http`, `server` ou `location`.

```
fastcgi_param DD_TRACE_DEBUG true;
```

### Serveur CLI PHP

Défini depuis la ligne de commande pour démarrer le serveur.

```
DD_TRACE_DEBUG=true php -S localhost:8888
```

### Configuration des variables d'environnement

| Variable d'environnement                              | Default     | Remarque                                                                                                              |
|-------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------|
| `DD_AGENT_HOST`                           | `localhost` | Le hostname de l'Agent                                                                                               |
| `DD_AUTOFINISH_SPANS`                     | `false`     | Définit si les spans doivent être automatiquement finalisées ou non lorsque le traceur est vidé                                               |
| `DD_DISTRIBUTED_TRACING`                  | `true`      | Définit si le tracing distribué doit être activé ou non                                                                             |
| `DD_INTEGRATIONS_DISABLED`                | `null`      | Liste au format CSV des extensions désactivées ; p. ex. `curl,mysqli`                                                              |
| `DD_PRIORITY_SAMPLING`                    | `true`      | Active ou non l'échantillonnage prioritaire                                                                               |
| `DD_SAMPLING_RATE`                        | `1.0`       | Le taux d'échantillonnage des traces. Entre `0.0` et `1.0` (par défaut)                                               |
| `DD_SERVICE_NAME`                         | ``          | Le nom par défaut de l'application                                                                                              |
| `DD_TRACE_AGENT_ATTEMPT_RETRY_TIME_MSEC`  | `5000`      | Délai de nouvelle tentative du disjoncteur configurable basé sur IPC (en millisecondes)                                               |
| `DD_TRACE_AGENT_CONNECT_TIMEOUT`          | `100`       | Le temps maximum autorisé pour la configuration de la connexion de l'Agent (en millisecondes)                                             |
| `DD_TRACE_AGENT_CONNECT_TIMEOUT`          | `100`       | Délai d'expiration de la connexion de l'Agent (en millisecondes)                                                                    |
| `DD_TRACE_AGENT_MAX_CONSECUTIVE_FAILURES` | `3`         | Nombre maximal de tentatives du disjoncteur configurable basé sur IPC (en millisecondes)                                                   |
| `DD_TRACE_AGENT_PORT`                     | `8126`      | Le port de l'Agent                                                                                             |
| `DD_TRACE_AGENT_TIMEOUT`                  | `500`       | Délai d'expiration du transfert de la requête de l'Agent (en millisecondes)                                                              |
| `DD_TRACE_ANALYTICS_ENABLED`              | `false`     | Flag pour activer la fonction App Analytics pour les spans pertinentes dans les intégrations Web                                               |
| `DD_TRACE_CLI_ENABLED`                    | `false`     | Active le tracing de scripts PHP depuis le CLI                                                                        |
| `DD_TRACE_DEBUG`                          | `false`     | Active le [mode debugging](#mappage-personnalisé-de-l-URL-a-la-ressource) pour le traceur                                                                            |
| `DD_TRACE_ENABLED`                        | `true`      | Activer le traceur partout                                                                                        |
| `DD_TRACE_GLOBAL_TAGS`                    | ``          | Tags à appliquer à toutes les spans : p. ex. `key1:value1,key2:value2`                                                      |
| `DD_TRACE_NO_AUTOLOADER`                  | `false`     | Définissez cette variable d'environnement sur `true` afin d'activer l'instrumentation automatique pour les applications qui n'utilisent pas de chargeur automatique                       |
| `DD_TRACE_REPORT_HOSTNAME`                | `false`     | Active la transmission du hostname sur la span racine                                                                        |
| `DD_TRACE_RESOURCE_URI_MAPPING`           | `null`      | Fichier CSV comprenant les règles de mappage de l'URL au nom de la ressource, p. ex. :  `/foo/*,/bar/$*/baz` ; [voir la section Mappage personnalisé de l'URL à la ressource](#mappage-personnalise-de-l-URL-a-la-ressource) |
| `DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED`  | `false`     | Active les URL en tant que noms de ressources ; [voir la section Mappage des noms de ressources aux URI normalisées](#mappage-des-noms-de-ressources-aux-uri-normalisees)                                  |
| `DD_<INTÉGRATION>_ANALYTICS_ENABLED`      | `false`     | Flag pour activer la fonction App Analytics pour les spans pertinentes dans une intégration spécifique                                         |

#### Mappage des noms de ressources aux URI normalisées

<div class="alert alert-warning">
Cette fonctionnalité est en bêta publique. Si vous avez besoin d'aide, contactez <a href="/help">l'assistance Datadog</a>. 
</div>

Lorsque le paramètre `DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED=true` est défini, l'URL est utilisée afin de créer le nom de ressource de la trace, en suivant le format `<MÉTHODE_REQUÊTE_HTTP> <URL_NORMALISÉE>`. La chaîne de requête est supprimée de l'URL. Cela vous permet de gagner en visibilité sur les frameworks personnalisés qui ne sont pas instrumentés automatiquement en normalisant les URL et en regroupant les endpoints génériques sous une unique ressource.

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

Pour mettre à niveau le traceur PHP, [téléchargez la dernière version][6] et suivez les mêmes étapes que lors de l'[installation de l'extension](#installer-l-extension).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization
[2]: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
[3]: /fr/tracing/send_traces
[4]: /fr/tracing/setup/docker
[5]: /fr/agent/kubernetes/daemonset_setup/#trace-collection
[6]: https://github.com/DataDog/dd-trace-php/releases/latest
[7]: https://app.datadoghq.com/apm/services
[8]: https://raw.githubusercontent.com/DataDog/dd-trace-php/master/src/dd-doctor.php
[9]: /fr/tracing/faq/php-tracer-manual-installation
[10]: /fr/tracing/setup/php/#environment-variable-configuration
[11]: /fr/help
[12]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[13]: http://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_param