---
categories:
  - languages
  - log collection
ddtype: library
dependencies: []
description: Envoyez des métriques custom à partir de vos applications PHP à l'aide du PHP DogStatsD. client.
doc_link: 'https://docs.datadoghq.com/integrations/php/'
git_integration_title: php
has_logo: true
integration_title: PHP
is_public: true
kind: integration
manifest_version: '1.0'
name: php
public_title: Intégration Datadog/PHP
short_description: Envoyer des métriques custom à partir de vos applications PHP à l'aide de DogStatsD PHP client.
version: '1.0'
---
{{< img src="integrations/php/phpgraph.png" alt="graphique PHP"  >}}

## Présentation

Associez vos applications PHP à Datadog pour :

* Visualiser leurs performances
* Corréler leurs performances avec le reste de vos applications
* Surveiller toute métrique pertinente
* Recueillir vos logs PHP

## Implémentation
L'intégration PHP vous permet de surveiller des métriques custom en instrumentant quelques lignes de code. Par exemple, vous pouvez configurer une métrique qui renvoie le nombre de pages vues ou la durée d'un appel de fonction. Pour en savoir plus sur l'envoi de métriques, consultez la documentation relative aux [métriques][1] de Datadog.

### Options d'installation
Installez le client StatsD de Datadog pour PHP avec Composer ou manuellement à l'aide du [référentiel GitHub][2].

#### Composer

Ajoutez ce qui suit à votre fichier `composer.json` :

```
"datadog/php-datadogstatsd": "1.3.*"
```

**Remarque** : la première version distribuée dans Composer est la version 0.0.3.

#### Installation manuelle

Clonez le [référentiel Git][2] :

```
git clone git@github.com:DataDog/php-datadogstatsd.git
```

Configuration : `require './src/DogStatsd.php';`

### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

Surveillez vos fichiers de logs PHP avec l'Agent Datadog pour transmettre vos logs à Datadog. Consultez les instructions spécifiques à votre bibliothèque de journalisation pour générer vos logs :

* [Monolog][3]
* [Symfony][4]
* [Zend-Log][5]

## Utilisation

### Instancier

Utilisez le code suivant pour instancier un objet DogStatsD avec `composer` :

```php
require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;
use DataDog\BatchedDogStatsd;

$statsd = new DogStatsd();
$statsd = new BatchedDogStatsd();
```

Le constructeur DogStatsD utilise un tableau de configuration. La configuration accepte l'ensemble de ces valeurs facultatives :

| Valeur         | Description                                                                                                                      |
|---------------|----------------------------------------------------------------------------------------------------------------------------------|
| `host`        | Le host de votre serveur DogStatsD (`localhost` par défaut).                                                                        |
| `port`        | Le port de votre serveur DogStatsD (`8125` par défaut).                                                                             |
| `socket_path` | Le chemin vers le socket UNIX de DogStatsD qui remplace `host` et `port` (uniquement pris en charge avec les versions >= 6 de `datadog-agent`). La valeur par défaut est `null`. |
| `global_tags` | Les tags à appliquer à toutes les métriques envoyées.                                                                                                |

### Tags

L'argument `tags` peut être un tableau ou une chaîne de caractères. Vous pouvez définir la valeur sur `null`.

```php

$statsd->increment('<NOM.MÉTRIQUE>', 1, array('app' => 'php1', 'beta' => null));
$statsd->increment('<NOM.MÉTRIQUE>', 1, "app:php1,beta");
```

### Incrémenter

Pour incrémenter des métriques :

``` php
$statsd->increment('<NOM.MÉTRIQUE>');
$statsd->increment('<NOM.MÉTRIQUE>', .5);
$statsd->increment('<NOM.MÉTRIQUE>', 1, array('<CLÉ_TAG>' => '<VALEUR>'));
```

### Décrémenter

Pour décrémenter des métriques :

``` php
$statsd->decrement('<NOM.MÉTRIQUE>');
```

### Calcul de l'horodatage

Pour calculer l'horodatage des métriques :

``` php
$start_time = microtime(true);
run_function();
$statsd->microtiming('<NOM.MÉTRIQUE>', microtime(true) - $start_time);

$statsd->microtiming('<NOM.MÉTRIQUE>', microtime(true) - $start_time, 1, array('<CLÉ_TAG>' => '<VALEUR>'));
```

### Événements

Pour en savoir plus sur l'utilisation des paramètres d'événement, consultez la [page relative aux événements de l'API][6] Datadog.

#### Envoi d'événements via TCP ou UDP

- **TCP** : envoi d'événements de confiance élevée. Permet de loguer les erreurs associées à l'envoi d'événements.
- **UDP** : envoi d'événements selon la méthode du « Fire and Forget ». Les erreurs associées à l'envoi d'événements ne sont **pas** loguées. Aucun accusé de réception n'est transmis par Datadog à l'envoi d'un événement.

La fonction `event` utilise la même API pour le transport TCP et UDP. 

#### Envoi UDP vers DogStatsD local

La méthode UDP utilise une instance DogStatsD locale, vous n'avez donc pas besoin de configurer un accès supplémentaire à l'API ou l'application.

Points à retenir pour UDP :

- Méthode par défaut
- Aucune configuration
- Plus rapide
- Moins fiable
- Aucun enregistrement des erreurs de communication avec Datadog

Exemple :

```php
$statsd = new DogStatsd();
$statsd->event('<NOM_ÉVÉNEMENT_RÉUSSI>',
    array(
        'text'       => '<TEXTE_ÉVÉNEMENT_RÉUSSI>',
        'alert_type' => 'success'
    )
);
```

#### Envoi TCP vers l'API Datadog

Pour envoyer des événements via TCP, commencez par configurer la bibliothèque avec vos identifiants Datadog. La fonction event envoie les informations directement à Datadog
plutôt qu'à une instance DogStatsD locale. Vos clés d'application et d'API sont disponibles dans Datadog via l'[onglet API][7].

Points à retenir pour TCP :

- Plus lent
- Plus fiable
- Enregistrement des erreurs de communication avec Datadog (utilise cURL pour la requête API)
- Enregistre les logs via error_log et le bloc try/catch afin d'éviter les erreurs/avertissements concernant les problèmes de communication avec l'API

Ces options sont disponibles lors de l'envoi des `events` via TCP :

| Valeur                  | Description                                                           |
|------------------------|-----------------------------------------------------------------------|
| `api_key`              | Requis pour envoyer `event` via TCP.                                    |
| `app_key`              | Requis pour envoyer `event` via TCP.                                    |
| `curl_ssl_verify_host` | Passthrough de configuration pour `CURLOPT_SSL_VERIFYHOST` (`2` par défaut).         |
| `curl_ssl_verify_peer` | Passthrough de configuration pour `CURLOPT_SSL_VERIFYPEER` (`1` par défaut).         |
| `datadog_host`         | L'emplacement vers lequel envoyer les événements (`https://app.datadoghq.com` par défaut). |

Exemples :
```php
$statsd = new DogStatsd(
    array('api_key' => '<CLÉ_API_DD>',
          'app_key' => '<CLÉ_APP_DD>',
     )
  );

$statsd->event('<NOM_ÉVÉNEMENT_RÉUSSI>',
    array(
        'alert_type'      => 'error',
        'aggregation_key' => '<CLÉ>'
    )
);
$statsd->event('<NOM_ÉVÉNEMENT_RÉUSSI>',
    array(
        'alert_type'      => 'success',
        'aggregation_key' => '<CLÉ>'
    )
);
```

## Données collectées
### Métriques

L'intégration PHP n'inclut aucune métrique par défaut. Utilisez les instructions ci-dessus pour envoyer des métriques custom.

### Événements
L'intégration PHP n'inclut aucun événement par défaut. Utilisez les instructions ci-dessus pour envoyer des événements custom.

### Checks de service
L'intégration PHP n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/developers/metrics
[2]: https://github.com/DataDog/php-datadogstatsd
[3]: https://docs.datadoghq.com/fr/logs/log_collection/php/?tab=phpmonolog
[4]: https://docs.datadoghq.com/fr/logs/log_collection/php/?tab=phpsymfony
[5]: https://docs.datadoghq.com/fr/logs/log_collection/php/?tab=phpzendlog
[6]: https://docs.datadoghq.com/fr/api/#events
[7]: https://app.datadoghq.com/account/settings#api
[8]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}