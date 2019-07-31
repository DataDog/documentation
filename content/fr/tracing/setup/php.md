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
  - link: tracing/advanced/
    tag: Documentation
    text: Utilisation avancée
---
## Installation et démarrage

Pour connaître la définition des termes utilisés dans l'APM, consultez la [documentation officielle][1].

Pour découvrir comment effectuer des contributions open source au traceur PHP, consultez le [guide relatif aux contributions][2].

### Configurer l'Agent Datadog

Le traceur de l'APM PHP envoie les données de trace en passant par l'Agent Datadog.

[Installez et configurez l'Agent Datadog][3]. Consultez la documentation supplémentaire relative au [traçage d'applications Docker][4] ou au [traçage d'applications Kubernetes][5].

Assurez-vous que l'**[APM est activé][6]** dans le fichier de configuration de l'Agent.

### Installer l'extension

Installez l'extension PHP à l'aide de l'un des [paquets pré-compilés pour les distributions prises en charge][7].

Une fois téléchargé, installez le paquet avec l'une des commandes ci-dessous.

```bash
# avec le paquet RPM (RHEL/Centos 6+, Fedora 20+)
$ rpm -ivh datadog-php-tracer.rpm

# avec le paquet DEB (Debian Jessie+ , Ubuntu 14.04+)
$ dpkg -i datadog-php-tracer.deb

# avec le paquet APK (Alpine)
$ apk add datadog-php-tracer.apk --allow-untrusted
```

Redémarrez PHP (PHP-FPM ou le SAPI Apache), puis consultez un endpoint de votre application pour lequel le tracing est activé. Affichez l'[interface de l'APM][8] pour visualiser les traces.

**Remarque** : quelques minutes peuvent s'écouler avant que les traces soient visibles dans l'interface graphique.

Si vous ne trouvez pas votre distribution, vous pouvez [installer manuellement][9] l'extension PHP.

## Instrumentation automatique

Le tracing est automatiquement instrumenté par défaut. Une fois l'extension installée, **ddtrace** trace votre application et envoie les traces à l'Agent.

Même si Datadog ne prend pas officiellement en charge votre framework Web, une instrumentation manuelle n'est pas forcément nécessaire. Datadog enregistre les requêtes Web génériques et crée des traces génériques pour celles-ci. Toutefois, lorsque vous utilisez l'un des frameworks pris en charge, Datadog définit des métadonnées plus pertinentes, ce qui facilite la navigation dans vos services.

L'instrumentation automatique fonctionne en modifiant l'exécution de PHP pour wrapper certaines fonctions et méthodes afin de les tracer. Le traceur PHP prend en charge l'instrumentation automatique pour [plusieurs bibliothèques][10].

L'instrumentation automatique capture :

* Le temps d'exécution de la méthode
* Les données de trace pertinentes, telles que l'URL et les codes de réponse de statut pour les requêtes Web ou les requêtes SQL pour l'accès à la base de données
* Les exceptions non traitées, y compris les traces de pile si disponibles
* Le nombre total de traces (p. ex. les requêtes Web) transmises via le système

## Modifier le hostname de l'Agent

Configurez vos traceurs d'applications de façon à envoyer des traces à un hostname d'Agent personnalisé :

Le traceur PHP recherche automatiquement les variables ENV `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` puis s'initialise avec celles-ci.

Consultez la [configuration du traceur][11] pour découvrir comment définir ces variables.

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

L'APM PHP prend en charge les SAPI suivantes :

| SAPI           | Type de prise en charge    |
|:---------------|:----------------|
| apache2handler | Prise en charge complète |
| cli            | Prise en charge complète |
| fpm            | Prise en charge complète |

### Les intégrations

#### Compatibilité des frameworks Web

Si le framework Web que vous utilisez ne figure pas dans la liste ci-dessous, vous pouvez toujours consulter les traces pour vos requêtes Web depuis l'interface. Toutefois, il est possible que certaines métadonnéees et spans très spécifiques à ce framework Web ne s'affichent pas.

| Module         | Versions           | Type de prise en charge    |
|:---------------|:-------------------|:----------------|
| CakePHP        | 2.x                | Prise en charge complète |
| Laravel        | 4.2, 5.x           | Prise en charge complète |
| Lumen          | 5.2+               | Prise en charge complète |
| Slim           | 3.x                | Prise en charge complète |
| Symfony        | 2.x, 3.3, 3.4, 4.x | Prise en charge complète |
| Framework Zend | 1.12               | Prise en charge complète |
| CodeIgniter    | 2, 3               | _Disponible prochainement_   |
| Drupal         |                    | _Disponible prochainement_   |
| Magento        | 2                  | _Disponible prochainement_   |
| Phalcon        | 1.3, 3.4           | _Disponible prochainement_   |
| Wordpress      |                    | _Disponible prochainement_   |
| Yii            | 1.1                | _Disponible prochainement_   |

Votre framework préféré n'est pas disponible ? Datadog élargit continuellement la liste des frameworks pris en charge. Contactez l'[équipe Datadog][12] pour obtenir de l'aide.

#### Compatibilité des bibliothèques CLI

Le tracing depuis le CLI SAPI est désactivé par défaut. Pour activer le tracing des scripts CLI PHP, définissez `DD_TRACE_CLI_ENABLED=true`.

| Module          | Versions           | Type de prise en charge    |
|:----------------|:-------------------|:----------------|
| Laravel Artisan | 5.x                | Prise en charge complète |
| Console Symfony |                    | _Disponible prochainement_   |

Votre bibliothèque CLI préférée n'est pas disponible ? Datadog élargit continuellement la liste des bibliothèques prises en charge. Contactez l'[équipe Datadog][12] pour obtenir de l'aide.

#### Compatibilité des datastores

| Module                           | Versions                   | Type de prise en charge    |
|:---------------------------------|:---------------------------|:----------------|
| Amazon RDS (avec PDO ou MySQLi) | *(Toute version de PHP prise en charge)*      | Prise en charge complète |
| Console CakePHP                  | 2.x                        | Prise en charge complète |
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

Votre datastore préféré n'est pas disponible ? Datadog élargit continuellement la liste des datastores pris en charge. Contactez l'[équipe Datadog][12] pour obtenir de l'aide.

#### Compatibilité des bibliothèques

| Module     | Versions              | Type de prise en charge    |
|:-----------|:----------------------|:----------------|
| Curl       | *(Toute version de PHP prise en charge)* | Prise en charge complète |
| Guzzle     | 5.x                   | Prise en charge complète |
| Guzzle     | 6.x                   | Prise en charge complète |
| Beanstalkd |                       | _Disponible prochainement_   |
| ReactPHP   |                       | _Disponible prochainement_   |

Vos bibliothèques préférées ne sont pas disponibles ? Datadog élargit continuellement la liste des bibliothèques prises en charge. Contactez l'[équipe Datadog][12] pour obtenir de l'aide.

## Configuration

Le traceur PHP peut être configuré à l'aide de variables d'environnement.

**Remarque** : si vous utilisez l'instrumentation automatique du code (la méthode conseillée), rappelez-vous que le code instrumenté s'exécute avant le code utilisateur. Par conséquent, les variables d'environnement ci-dessous doivent être définies au niveau du serveur et mises à disposition de l'environnement d'exécution PHP avant l'exécution de tout code utilisateur. Par exemple, `putenv()` et les fichiers `.env` ne fonctionneraient pas.

### Apache

Défini avec [`SetEnv`][13] depuis la configuration du serveur, le host virtuel, le répertoire ou le fichier **.htaccess**.

```
SetEnv DD_TRACE_DEBUG true
```

### NGINX

Défini avec [`fastcgi_param`][14] depuis les contextes `http`, `server`, ou `location`.

```
fastcgi_param DD_TRACE_DEBUG true;
```

### Serveur CLI PHP

Défini depuis la ligne de commande pour démarrer le serveur.

```
DD_TRACE_DEBUG=true php -S localhost:8888
```

### Configuration des variables d'environnement

| Variable d'environnement                         | Valeur par défaut     | Remarque                                                                        |
|:-------------------------------------|:------------|:----------------------------------------------------------------------------|
| `DD_AGENT_HOST`                      | `localhost` | Le hostname de l'Agent                                                         |
| `DD_AUTOFINISH_SPANS`                | `false`     | Définit si les spans doivent être automatiquement finalisées ou non lorsque le traceur est vidé         |
| `DD_TRACE_CLI_ENABLED`               | `false`     | Active le tracing de scripts PHP depuis le CLI                                  |
| `DD_DISTRIBUTED_TRACING`             | `true`      | Définit si le tracing distribué doit être activé ou non                                       |
| `DD_INTEGRATIONS_DISABLED`           | `null`      | Liste au format CSV des extensions désactivées ; p. ex. `curl,mysqli`                        |
| `DD_SAMPLING_RATE`                   | `1.0`       | Le taux d'échantillonnage des traces. Entre `0.0` et `1.0` (par défaut)         |
| `DD_SERVICE_NAME`                    | ``          | Le nom par défaut de l'application                                                        |
| `DD_TRACE_AGENT_PORT`                | `8126`      | Le port de l'Agent                                                       |
| `DD_TRACE_AGENT_TIMEOUT`             | `500`       | Le temps maximum que l'Agent est autorisé à prendre (en millisecondes)                 |
| `DD_TRACE_AGENT_CONNECT_TIMEOUT`     | `100`       | Le temps maximum autorisé pour la configuration de la connexion de l'Agent (en millisecondes)       |
| `DD_TRACE_ANALYTICS_ENABLED`         | `false`     | Flag pour activer les analyses de traces pour les spans pertinentes dans les intégrations Web       |
| `DD_TRACE_DEBUG`                     | `false`     | Activer le [mode debugging][15] pour le traceur                                      |
| `DD_TRACE_ENABLED`                   | `true`      | Activer le traceur partout                                                  |
| `DD_TRACE_GLOBAL_TAGS`               | ``          | Tags à appliquer à toutes les spans : p. ex. `key1:value1,key2:value2`                |
| `DD_<INTEGRATION>_ANALYTICS_ENABLED` | `false`     | Flag pour activer les analyses de traces pour les spans pertinentes dans une intégration spécifique |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization
[2]: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
[3]: /fr/agent/?tab=agentv6
[4]: /fr/tracing/setup/docker
[5]: /fr/agent/kubernetes/daemonset_setup/#trace-collection
[6]: /fr/tracing/send_traces
[7]: https://github.com/DataDog/dd-trace-php/releases/latest
[8]: https://app.datadoghq.com/apm/services
[9]: /fr/tracing/faq/php-tracer-manual-installation
[10]: #library-compatibility
[11]: /fr/help
[12]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[13]: http://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_param
[14]: /fr/tracing/troubleshooting
[15]: /fr/tracing/troubleshooting/?tab=php