---
title: Exigences de compatibilité PHP
kind: documentation
description: Exigences de compatibilité pour le traceur PHP
further_reading:
  - link: tracing/setup/php
    tag: Documentation
    text: Instrumenter votre application
---
## Compatibilité

La bibliothèque de tracing Datadog PHP est open source. Consultez le [référentiel GitHub][1] pour en savoir plus.

L'APM PHP prend en charge les versions suivantes de PHP :

| Version    | Type de prise en charge                          |
|:-----------|:--------------------------------------|
| 8.0.0 RC 1 | Prise en charge expérimentale (à partir de `0.49.0`) |
| 7.4.x      | Prise en charge complète                       |
| 7.3.x      | Prise en charge complète                       |
| 7.2.x      | Prise en charge complète                       |
| 7.1.x      | Prise en charge complète                       |
| 7.0.x      | Prise en charge complète                       |
| 5.6.x      | Prise en charge complète                       |
| 5.5.x      | Entièrement prise en charge (à partir de `0.49.0`)      |
| 5.4.x      | Prise en charge complète                       |

L'APM PHP prend en charge les SAPI suivants :

| SAPI           | Type de prise en charge    |
|:---------------|:----------------|
| apache2handler | Prise en charge complète |
| cli            | Prise en charge complète |
| fpm-fcgi       | Prise en charge complète |
| cgi-fcgi       | Prise en charge complète |


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

Datadog améliore continuellement le tracing des frameworks Web PHP. Pour demander la prise en charge d'autres métadonnées de span et d'autres composants internes de framework, contactez notre [formidable équipe d'assistance][2].

#### Compatibilité des bibliothèques CLI

Le tracing depuis le CLI SAPI est désactivé par défaut. Pour activer le tracing des scripts CLI PHP, définissez `DD_TRACE_CLI_ENABLED=true`.

| Module          | Versions | Type de prise en charge    |
|:----------------|:---------|:----------------|
| Console CakePHP | 2.x      | Prise en charge complète |
| Laravel Artisan | 5.x      | Prise en charge complète |
| Console Symfony |          | _Disponible prochainement_   |

Pour demander la prise en charge d'une autre bibliothèque CLI, contactez notre [formidable équipe d'assistance][2].

#### Compatibilité des datastores

| Module                                                                  | Versions                   | Type de prise en charge    |
|-------------------------------------------------------------------------|----------------------------|-----------------|
| Amazon RDS (avec PDO ou MySQLi)                                        | *(Toute version de PHP prise en charge)*      | Prise en charge complète |
| Elasticsearch                                                           | 1.x                        | Prise en charge complète |
| Eloquent                                                                | Versions prises en charge par Laravel | Prise en charge complète |
| Memcached                                                               | *(Toute version de PHP prise en charge)*      | Prise en charge complète |
| MongoDB - via l'extension [mongo][3]                                      | 1.4.x                      | Prise en charge complète |
| MongoDB - via l'extension [mongodb][4]                                    | *(Toute version de PHP prise en charge)*      | _Disponible prochainement_   |
| MySQLi                                                                  | *(Toute version de PHP prise en charge)*      | Prise en charge complète |
| PDO (MySQL, PostgreSQL, MariaDB)                                        | *(Toute version de PHP prise en charge)*      | Prise en charge complète |
| PhpRedis                                                                | 3, 4, 5                    | PHP 7, 8 |
| Predis                                                                  | 1.1                        | Prise en charge complète |
| AWS Couchbase                                                           | AWS PHP SDK 3              | _Disponible prochainement_   |
| AWS DynamoDB                                                            | AWS PHP SDK 3              | _Disponible prochainement_   |
| AWS ElastiCache                                                         | AWS PHP SDK 3              | _Disponible prochainement_   |
| Doctrine ORM                                                            | 2                          | _Disponible prochainement_   |
| ODBC                                                                    | *(Toute version de PHP prise en charge)*      | _Disponible prochainement_   |
| Solarium                                                                | 4.2                        | _Disponible prochainement_   |

Pour demander la prise en charge d'un autre datastore, contactez notre [formidable équipe d'assistance][2].

#### Compatibilité des bibliothèques

| Module     | Versions              | Type de prise en charge    |
|:-----------|:----------------------|:----------------|
| Curl       | *(Toute version de PHP prise en charge)* | Prise en charge complète |
| Guzzle     | 5.x                   | Prise en charge complète |
| Guzzle     | 6.x                   | Prise en charge complète |
| Beanstalkd |                       | _Disponible prochainement_   |
| ReactPHP   |                       | _Disponible prochainement_   |

Pour demander la prise en charge d'une autre bibliothèque, contactez notre [formidable équipe d'assistance][2].

#### Call stacks profondes sur PHP 5

Les call stacks sont limitées sur PHP 5. Pour en savoir plus, consultez la [page de dépannage des call stacks profondes][5].

### Générateurs

L'instrumentation des [générateurs][6] n'est pas prise en charge sur PHP 5 et PHP 7.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-php
[2]: /fr/help
[3]: https://pecl.php.net/package/mongo
[4]: https://pecl.php.net/package/mongodb
[5]: /fr/tracing/troubleshooting/php_5_deep_call_stacks
[6]: https://www.php.net/manual/en/language.generators.overview.php