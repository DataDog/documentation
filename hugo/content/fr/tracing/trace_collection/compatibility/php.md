---
aliases:
- /fr/tracing/compatibility_requirements/php
- /fr/tracing/setup_overview/compatibility_requirements/php
code_lang: php
code_lang_weight: 50
description: Exigences de compatibilité pour le traceur PHP
further_reading:
- link: tracing/trace_collection/dd_libraries/php
  tag: Documentation
  text: Instrumenter votre application
title: Exigences de compatibilité PHP
type: multi-code-lang
---
## Politique de prise en charge du runtime pour PHP

La bibliothèque de tracing Datadog PHP est open source. Consultez le [référentiel GitHub][1] pour en savoir plus.

La solution APM Datadog pour PHP s'appuie sur des dépendances définies dans des versions spécifiques du système d'exploitation du host, du runtime PHP, de certaines bibliothèques PHP, ainsi que de l'Agent ou l'API Datadog. Lorsque ces versions cessent d'être prises en charge et maintenues, la prise en charge par APM pour PHP s'arrête également.

#### Niveaux de prise en charge

| **Niveau**                                              | **Prise en charge fournie**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Aucune prise en charge</span>      |  Aucune implémentation. [Contactez l'assistance clientèle pour toute demande spéciale.][2]                                                             |
| <span id="support-beta">Bêta</span>                    |  Implémentation initiale. Peut ne pas encore contenir toutes les fonctionnalités. La prise en charge des nouvelles fonctionnalités, les corrections de bugs et le déploiement de patchs de sécurité sont assurés dans la mesure du possible uniquement.                                    |
| <span id="support-ga">Disponibilité générale</span> |  Implémentation complète de toutes les fonctionnalités. Prise en charge totale des nouvelles fonctionnalités, des corrections de bugs et des patchs de sécurité.                                                                                    |
| <span id="support-maintenance">Maintenance</span>      |  Implémentation complète des fonctionnalités existantes. Aucune nouvelle fonctionnalité n'est ajoutée. Prise en charge des corrections de bugs et des patchs de sécurité uniquement.                                                              |
| <span id="support-legacy">Legacy</span>                |  Implémentation legacy. Certaines fonctionnalités limitées peuvent être proposées, mais aucune maintenance n'est assurée. [Contactez l'équipe d'assistance][2] en cas de demande spéciale. |
| <span id="support-eol">Fin de cycle de vie</span>        |  Aucune assistance. La version peut quand même être utilisée, mais aucune correction de bug n'est assurée.                                                                                                  |


APM pour PHP prend en charge les versions suivantes de PHP :

<div class="alert alert-info">
<strong>Remarque :</strong>
PHP 5.x est entièrement pris en charge jusqu'à la version 0.75.0. Il est désormais en mode maintenance, et seules les mises à jour de sécurité ainsi que les corrections de bugs importantes sont assurées jusqu'au 31 décembre 2023.
<br>
Si vous utilisez une version 5.x de PHP dans votre application et que votre activité nécessite impérativement une fonctionnalité essentielle, contactez l'<a href="https://www.datadoghq.com/support/">assistance Datadog</a>.
<br>
Nous vous conseillons d'utiliser l'une des <a href="https://www.php.net/supported-versions">versions officiellement prises en charge</a> de PHP, notamment les versions 7.4, 8.0 et 8.1.
</div>

| Version de PHP    | Niveau de prise en charge                         | Version du package |
|:---------------|:--------------------------------------|:----------------|
| 8.2.x          | Disponibilité générale                  | > `0.82.0+`     |
| 8.1.x          | Disponibilité générale                  | > `0.66.0+`     |
| 8.0.x          | Disponibilité générale                  | > `0.52.0+`     |
| 7.4.x          | Disponibilité générale                  | Toutes             |
| 7.3.x          | Disponibilité générale                  | Toutes             |
| 7.2.x          | Disponibilité générale                  | Toutes             |
| 7.1.x          | Disponibilité générale                  | Toutes             |
| 7.0.x          | Disponibilité générale                  | Toutes             |
| 5.6.x          | Maintenance (jusqu'au 31 décembre 2023) | Toutes             |
| 5.5.x          | Maintenance (jusqu'au 31 décembre 2023) | Toutes             |
| 5.4.x          | Maintenance (jusqu'au 31 décembre 2023) | Toutes             |

APM pour PHP prend en charge les SAPI suivants :

| SAPI           | Type de prise en charge    |
|:---------------|:----------------|
| apache2handler | Prise en charge complète |
| cli            | Prise en charge complète |
| fpm-fcgi       | Prise en charge complète |
| cgi-fcgi       | Prise en charge complète |

## Architectures de processeur prises en charge

APM pour PHP prend en charge les architectures suivantes :

| Architectures de processeur                   | Niveau de prise en charge         | Version du package                        |
| ------------------------------------------|-----------------------|----------------------------------------|
| Linux GNU amd64 (`x86-64-linux-gnu`)      | [Disponibilité générale](#support-ga)     | Toutes                                    |
| Linux MUSL amd64 (`x86-64-linux-musl`)    | [Disponibilité générale](#support-ga)     | Toutes                                    |
| Linux GNU arm64 (`aarch64-linux-gnu`)     | [Disponibilité générale](#support-ga)     | > `0.78.0`                             |
| Linux MUSL arm64 (`aarch64-linux-musl`)   | [Disponibilité générale](#support-ga)     | > `0.78.0`                             |

### Intégrations

#### Compatibilité des frameworks Web

Datadog **prend en charge tous les frameworks Web PHP** par défaut, soit via une instrumentation au niveau du framework, soit via une solution de tracing Web générique.

L'instrumentation au niveau du framework implique le tracing des méthodes internes et l'application de tags spécifiques au framework.

Le tracing Web générique utilise une span `web.request` pour suivre la latence et les erreurs générées par l'appel, ainsi que des spans pour les bibliothèques prises en charge, par exemple pour des clients de base de données et HTTP.

Le tableau suivant énumère plusieurs frameworks et versions pour lesquels Datadog peut surveiller des traces.

**Fraweworks Web** :

| Module         | Versions             | Type de prise en charge               | Niveau d'instrumentation           |
|:-------------- |:---------------------|:---------------------------|:--------------------------------|
| CakePHP        | 2.x                  | Toutes les versions de PHP prises en charge | Instrumentation au niveau du framework |
| CodeIgniter    | 2.x                  | PHP 7+                     | Instrumentation au niveau du framework |
| CodeIgniter    | 3.x                  | PHP 7+                     | Tracing Web générique             |
| Drupal         |                      | Toutes les versions PHP | Tracing Web générique             |
| FuelPHP        | 1.1                  | PHP 7+                     | Tracing Web générique             |
| Laravel        | 4.2, 5.x, 6.x        | Toutes les versions de PHP prises en charge | Instrumentation au niveau du framework |
| Laravel 8      | 8.x (traceur `0.52.0+`) | Toutes les versions PHP | Instrumentation au niveau du framework |
| Lumen          |   5.2+                 | Toutes les versions de PHP prises en charge | Instrumentation au niveau du framework |
| Magento        | 1, 2                 | Toutes les versions PHP | Tracing Web générique             |
| Neos Flow      | 1.1                  | Toutes les versions de PHP prises en charge | Tracing Web générique             |
| Phalcon        | 1.3, 3.4             | Toutes les versions de PHP prises en charge | Tracing Web générique             |
| RoadRunner     | 2.x                  | Toutes les versions de PHP prises en charge | Instrumentation au niveau du framework |
| Slim           | 2.x, 3.x, 4.x        | Toutes les versions de PHP prises en charge | Instrumentation au niveau du framework |
| Symfony 3      | 3.3, 3.4             | Toutes les versions de PHP prises en charge | Instrumentation au niveau du framework |
| Symfony 4      | 4.x                  | Toutes les versions de PHP prises en charge | Instrumentation au niveau du framework |
| Symfony 5      | 5.x (traceur `0.50.0+`) | Toutes les versions PHP | Instrumentation au niveau du framework |
| WordPress      | 4.x, 5.x             | PHP 7+                     | Instrumentation au niveau du framework |
| Yii            | 1.1, 2.0             | Toutes les versions PHP | Instrumentation au niveau du framework |
| Zend Framework | 1.12                 | Toutes les versions PHP | Instrumentation au niveau du framework |
| Zend Framework | 2.x                  | Toutes les versions PHP | Tracing Web générique             |

Attention : même si votre framework Web n'est pas répertorié, il est par défaut pris en charge avec la dernière version du traceur.

Datadog améliore continuellement le tracing des frameworks Web PHP. Pour demander la prise en charge d'autres métadonnées de span et d'autres composants internes de framework, contactez notre [formidable équipe d'assistance][3].

#### Compatibilité des bibliothèques CLI

Le tracing depuis le CLI SAPI est désactivé par défaut. Pour activer le tracing des scripts CLI PHP, définissez `DD_TRACE_CLI_ENABLED=true`.

| Module          | Versions | Type de prise en charge    |
|:----------------|:---------|:----------------|
| Console CakePHP | 2.x      | Prise en charge complète |
| Laravel Artisan | 5.x      | Prise en charge complète |

Pour demander la prise en charge d'une autre bibliothèque CLI, contactez notre [formidable équipe d'assistance][3].

#### Compatibilité des datastores

| Module                                                                  | Versions                   | Type de prise en charge    |
|-------------------------------------------------------------------------|----------------------------|-----------------|
| Amazon RDS (avec PDO ou MySQLi)                                        | *(Toute version de PHP prise en charge)*      | Prise en charge complète |
| Elasticsearch                                                           | 1+                         | Prise en charge complète |
| Eloquent                                                                | Versions prises en charge par Laravel | Prise en charge complète |
| Memcached                                                               | *(Toute version de PHP prise en charge)*      | Prise en charge complète |
| MongoDB - via l'extension [mongo][4]                                      | 1.4.x                      | Prise en charge complète |
| MySQLi                                                                  | *(Toute version de PHP prise en charge)*      | Prise en charge complète |
| PDO (MySQL, PostgreSQL, MariaDB)                                        | *(Toute version de PHP prise en charge)*      | Prise en charge complète |
| PhpRedis                                                                | 3, 4, 5                    | PHP 7, 8        |
| Predis                                                                  | 1.1                        | Prise en charge complète |

Pour demander la prise en charge d'un autre datastore, contactez notre [formidable équipe d'assistance][3].

#### Compatibilité des bibliothèques

| Module     | Versions              | Type de prise en charge    |
|:-----------|:----------------------|:----------------|
| Curl       | *(Toute version de PHP prise en charge)* | Prise en charge complète |
| Guzzle     | 5.x                   | Prise en charge complète |
| Guzzle     | 6.x                   | Prise en charge complète |

Pour demander la prise en charge d'une autre bibliothèque, contactez notre [formidable équipe d'assistance][3].

#### Call stacks profondes sur PHP 5

Les call stacks sont limitées sur PHP 5. Pour en savoir plus, consultez la [page de dépannage des call stacks profondes][5].

### Générateurs

L'instrumentation des [générateurs][6] n'est pas prise en charge sur PHP 5 et PHP 7.

### PCNTL

Datadog ne permet pas le tracing de processus forkés via [pcntl][7]. Lorsqu'un appel à `pcntl_fork` est détecté, le tracing est désactivé dans le processus forké. Le processus principal peut toujours être tracé.

Si l'application invoque `pcntl_unshare(CLONE_NEWUSER);` et que le traceur est installé, un plantage fatal se produit. Ce problème survient car `unshare` avec `CLONE_NEWUSER` nécessite un processus [sans thread][8], alors que le traceur PHP utilise un thread séparé pour envoyer les traces à l'Agent Datadog sans bloquer le processus principal.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-php
[2]: https://www.datadoghq.com/support/
[3]: /fr/help
[4]: https://pecl.php.net/package/mongo
[5]: /fr/tracing/troubleshooting/php_5_deep_call_stacks
[6]: https://www.php.net/manual/en/language.generators.overview.php
[7]: https://www.php.net/manual/en/book.pcntl.php
[8]: https://man7.org/linux/man-pages/man2/unshare.2.html