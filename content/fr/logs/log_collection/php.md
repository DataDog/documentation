---
aliases:
- /fr/logs/languages/php
further_reading:
- link: https://www.datadoghq.com/blog/php-logging-guide
  tag: Blog
  text: Comment recueillir, personnaliser et analyser des logs PHP
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: /logs/explorer/#visualiser-les-donnees
  tag: Documentation
  text: Effectuer des analyses de logs
- link: /logs/faq/log-collection-troubleshooting-guide
  tag: Documentation
  text: Guide de dépannage pour la collecte de logs
- link: /glossary/#tail
  tag: Glossaire
  text: Entrée du glossaire pour le terme « tail »
kind: documentation
title: Collecte de logs avec PHP
---

## Présentation

Pour envoyer vos logs PHP à Datadog, activez la journalisation au sein d'un fichier et [suivez][14] ce fichier avec l'Agent Datadog. Les exemples de configuration ci-dessous utilisent les bibliothèques de journalisation [Monolog][8], [Zend-Log][9] et [Symfony][10].

## Implémentation

### Installation

{{< tabs >}}
{{% tab "PHP Monolog" %}}

Exécutez la commande suivante pour utiliser [Composer][1] afin d'ajouter Monolog en tant que dépendance :

```text
composer require "monolog/monolog"
```

Sinon, suivez les instructions ci-dessous pour installer manuellement Monolog :

1. Téléchargez Monolog depuis le référentiel et ajoutez-le aux bibliothèques.
2. Ajoutez ce qui suit dans le bootstrap de l'application afin d'initialiser l'instance :

    ```php
    <?php
      require __DIR__ . '/vendor/autoload.php';

      // load Monolog library
      use Monolog\Logger;
      use Monolog\Handler\StreamHandler;
      use Monolog\Formatter\JsonFormatter;
    ```

[1]: https://getcomposer.org
{{% /tab %}}
{{% tab "PHP Zend-Log" %}}

Zend-Log fait partie du framework Zend. Exécutez la commande suivante pour utiliser [Composer][1] afin d'ajouter Zend-Log :

```text
composer require "zendframework/zend-log"
```

Sinon, suivez les instructions ci-dessous pour installer manuellement Zend-Log :

1. Téléchargez la source depuis le référentiel et ajoutez-la aux bibliothèques.
2. Ajoutez ce qui suit dans le bootstrap de l'application afin d'initialiser l'instance :

```php
<?php
  require __DIR__ . '/vendor/autoload.php';

  use Zend\Log\Logger;
  use Zend\Log\Writer\Stream;
  use Zend\Log\Formatter\JsonFormatter;
```

[1]: https://getcomposer.org
{{% /tab %}}
{{% tab "PHP Symfony" %}}

Ajoutez ce qui suit pour déclarer un formateur JSON Monolog en tant que service :

```yaml
services:
    monolog.json_formatter:
        class: Monolog\Formatter\JsonFormatter
```

{{% /tab %}}
{{< /tabs >}}

### Configurer votre logger

{{< tabs >}}
{{% tab "PHP Monolog" %}}

Utilisez la configuration ci-dessous pour activer le format JSON et enregistrer les logs et les événements dans le fichier `application-json.log`. Après avoir lancé l'instance Monolog, ajoutez dans votre code un nouveau gestionnaire :

```php
 <?php
  require __DIR__ . '/vendor/autoload.php';

  // Charger la bibliothèque Monolog
  use Monolog\Logger;
  use Monolog\Handler\StreamHandler;
  use Monolog\Formatter\JsonFormatter;

  // Créer un canal pour l'enregistrement des logs
  $log = new Logger('channel_name');

  // Créer un formateur JSON
  $formatter = new JsonFormatter();

  // Créer un gestionnaire
  $stream = new StreamHandler(__DIR__.'/application-json.log', Logger::DEBUG);
  $stream->setFormatter($formatter);

  // Connexion
  $log->pushHandler($stream);

  // Un exemple
  $log->info('Ajout d'un nouvel utilisateur', array('username' => 'Seldaek'));
```

{{% /tab %}}
{{% tab "PHP Zend-Log" %}}

Utilisez la configuration ci-dessous pour activer le format JSON et enregistrer les logs et les événements dans le fichier `application-json.log`. Après avoir lancé l'instance Zend-Log, ajoutez dans votre code un nouveau gestionnaire :

```php
<?php
  use Zend\Log\Logger;
  use Zend\Log\Writer\Stream;
  use Zend\Log\Formatter\JsonFormatter;

  // Créer un logger
  $logger = new Logger();

  // Créer un service d'écriture
  $writer = new Stream('file://' . __DIR__ . '/application-json.log');

  // Créer un formateur JSON
  $formatter = new JsonFormatter();
  $writer->setFormatter($formatter);

  // Connexion
  $logger->addWriter($writer);
  Zend\Log\Logger::registerErrorHandler($logger);
```

{{% /tab %}}
{{% tab "PHP Symfony" %}}

Pour configurer le formateur dans votre configuration Monolog, déclarez le champ formatter comme suit :

```yaml
 monolog:
    handlers:
        main:
            type:   stream
            path:   "%kernel.logs_dir%/%kernel.environment%.log"
            level:  debug
            formatter: monolog.json_formatter
```

{{% /tab %}}
{{< /tabs >}}

### Configurer l'Agent Datadog

Une fois la [collecte de logs activée][11], procédez comme suit pour configurer la [collecte de logs personnalisée][12] afin de suivre vos fichiers de log et envoyer les nouveaux logs à Datadog.

1. Créez un dossier `php.d/` dans le [répertoire de configuration de l'Agent][13] `conf.d/`.
2. Créez un fichier `conf.yaml` dans votre dossier `php.d/` avec le contenu suivant :

```yaml
init_config:

instances:

## Log section
logs:

  - type: file
    path: "<path_to_your_php_application_json>.log"
    service: "<service_name>"
    source: php
    sourcecategory: sourcecode
```

## Associer vos services à l'ensemble des logs et traces

Si la solution APM est activée pour cette application, vous pouvez améliorer la corrélation entre vos logs et vos traces d'application en suivant les [instructions de journalisation PHP pour APM][2]. Cela vous permet d'ajouter automatiquement des identifiants de trace et de span à vos logs.

## Enrichir le contexte des logs

{{< tabs >}}
{{% tab "PHP Monolog" %}}

Il peut être utile d'enrichir le contexte de vos logs et événements. Monolog propose différents moyens de définir des données de contexte propres à chaque thread, qui sont ensuite automatiquement envoyées avec tous les événements. Par exemple, pour loguer un événement accompagné de données de contexte, utilisez ce qui suit :

```php
<?php
  $logger->info('Ajout d'un nouvel utilisateur', array('username' => 'Seldaek'));
```

Le préprocesseur de Monolog comporte une fonctionnalité de rappel simple qui enrichit vos événements en ajoutant les métadonnées de votre choix (par exemple, l'ID de session ou l'ID de requête) :

```php
 <?php
  $log->pushProcessor(function ($record) {

      // Enregistrer l'utilisateur actuel
      $user = Acme::getCurrentUser();
      $record['context']['user'] = array(
          'name' => $user->getName(),
          'username' => $user->getUsername(),
          'email' => $user->getEmail(),
      );

      // Ajouter différents tags
      $record['ddtags'] = array('key' => 'value');

      // Ajouter des données de contexte générales
      $record['extra']['key'] = 'value';

      return $record;
  });
```

{{% /tab %}}
{{% tab "PHP Zend-Log" %}}

Il peut être utile d'enrichir le contexte de vos logs et événements. Zend-Log propose différents moyens de définir des données de contexte propres à chaque thread, qui sont ensuite automatiquement envoyées avec tous les événements. Par exemple, pour loguer un événement accompagné de données de contexte, utilisez ce qui suit :

```php
<?php
  $logger->info('Ajout d'un nouvel utilisateur', array('username' => 'Seldaek'));
```

Consultez la [documentation Zend sur le processeur][1] (en anglais) pour en savoir plus sur l'ajout d'informations supplémentaires dans vos logs.

[1]: https://docs.zendframework.com/zend-log/processors
{{% /tab %}}
{{% tab "PHP Symfony" %}}

Suivez les étapes ci-dessous pour ajouter un contexte variable à vos logs à l'aide d'un processeur de session.

1. Implémentez votre processeur de session :
  Dans l'exemple ci-dessous, le processeur a accès aux informations de la session actuelle et enrichit l'entrée de log en y ajoutant des données telles que les attributs `requestId`, `sessionId`, etc.

    ```php
    <?php
      namespace Acme\Bundle\MonologBundle\Log;

      use Symfony\Component\HttpFoundation\Session\Session;

      class SessionRequestProcessor {
        private $session;
        private $sessionId;
        private $requestId;
        private $_server;
        private $_get;
        private $_post;

        public function __construct(Session $session) {
          $this->session = $session;
        }

        public function processRecord(array $record) {
          if (null === $this->requestId) {
            if ('cli' === php_sapi_name()) {
              $this->sessionId = getmypid();
            } else {
              try {
                $this->session->start();
                $this->sessionId = $this->session->getId();
              } catch (\RuntimeException $e) {
                $this->sessionId = '????????';
              }
            }
            $this->requestId = substr(uniqid(), -8);
            $this->_server = array(
              'http.url' => (@$_SERVER['HTTP_HOST']).'/'.(@$_SERVER['REQUEST_URI']),
              'http.method' => @$_SERVER['REQUEST_METHOD'],
              'http.useragent' => @$_SERVER['HTTP_USER_AGENT'],
              'http.referer' => @$_SERVER['HTTP_REFERER'],
              'http.x_forwarded_for' => @$_SERVER['HTTP_X_FORWARDED_FOR']
            );
            $this->_post = $this->clean($_POST);
            $this->_get = $this->clean($_GET);
          }
          $record['http.request_id'] = $this->requestId;
          $record['http.session_id'] = $this->sessionId;
          $record['http.url'] = $this->_server['http.url'];
          $record['http.method'] = $this->_server['http.method'];
          $record['http.useragent'] = $this->_server['http.useragent'];
          $record['http.referer'] = $this->_server['http.referer'];
          $record['http.x_forwarded_for'] = $this->_server['http.x_forwarded_for'];

          return $record;
        }

        protected function clean($array) {
          $toReturn = array();
          foreach(array_keys($array) as $key) {
            if (false !== strpos($key, 'password')) {
              // Do not add
            } else if (false !== strpos($key, 'csrf_token')) {
              // Do not add
            } else {
              $toReturn[$key] = $array[$key];
            }
          }

          return $toReturn;
        }
      }
    ```

2. Ajoutez ce qui suit pour intégrer le processeur avec Symfony :

    ```yaml
      services:
          monolog.processor.session_request:
              class: Acme\Bundle\MonologBundle\Log\SessionRequestProcessor
              arguments:  [ @session ]
              tags:
                  - { name: monolog.processor, method: processRecord }
    ``` 

3. [Diffusez](#configurer-l-agent-datadog) le fichier JSON généré à Datadog.

{{% /tab %}}
{{< /tabs >}}

## Intégration de Monolog à un framework

Monolog peut être utilisé avec les frameworks suivants :

* [Symfony v2+/v3+][3]
* [PPI][4]
* [Laravel][5]
* [Silex][6]
* [Lumen][7]

Ajoutez ce qui suit pour intégrer Monolog à votre framework :

```php
 <?php
  // Vérifier que la bibliothèque Monolog est bien chargée
  //use Monolog\Logger;
  //use Monolog\Handler\StreamHandler;
  //use Monolog\Formatter\JsonFormatter;

  // Avec l'instance Monolog suivante
  $monolog = ...

  ///// Configuration du log shipper

  $formatter = new JsonFormatter();
  $stream = new StreamHandler(__DIR__.'/application-json.log', Logger::DEBUG);
  $stream->setFormatter($formatter);

  $monolog->pushHandler($stream);
  return $r;
```

Configurez ensuite votre logger pour Monolog. 

{{< tabs >}}
{{% tab "Symfony v2+/v3+" %}}

Dans votre répertoire de configuration `/chemin/vers/répertoire/configuration/`, ajoutez ce qui suit aux fichiers `config_dev.yml` et `config_prod.yml`. Modifiez l'exemple afin d'adapter la configuration à vos environnements de développement et de production.

```yaml
# app/config/config.yml
monolog:

# Supprimer la mise en commentaire de cette section si vous avez besoin d'un processeur.
#       Processor :
#           session_processor:
#               class: Acme\Bundle\MonologBundle\Log\SessionRequestProcessor
#            arguments:  [ @session ]
#            tags:
#               - { name: monolog.processor, method: processRecord }

    json_formatter:
        class: Monolog\Formatter\JsonFormatter

    handlers:

        # Configuration du log shipper
        to_json_files:
            # Enregistrer les logs dans var/logs/(environment).log
            type: stream
            path: "%kernel.logs_dir%/%kernel.environment%.log"
            # Inclut tous les canaux (doctrine, erreurs, etc.)
            channels: ~
            # Utiliser le formatteur JSON
            formatter: monolog.json_formatter
            # Définir le niveau de journalisation (par exemple, debug, error ou alert)
            level: debug
```

{{% /tab %}}
{{% tab "PPI" %}}

Dans votre répertoire de configuration `/chemin/vers/répertoire/configuration/`, ajoutez ce qui suit aux fichiers `config_dev.yml` et `config_prod.yml`. Modifiez l'exemple afin d'adapter la configuration à vos environnements de développement et de production.

```yaml
monolog:
    handlers:

        # Configuration du log shipper
        to_json_files:
            # Enregistrer les logs dans var/logs/(environment).log
            type: stream
            path: "%kernel.logs_dir%/%kernel.environment%.log"
            # Utiliser le formateur JSON
            formatter: monolog.json_formatter
            # Définir le niveau de journalisation (par exemple, debug, error ou alert)
            level: debug
```

{{% /tab %}}
{{% tab "Laravel" %}}

<div class="alert alert-warning">
La fonction <code>\DDTrace\current_context()</code> a été ajoutée avec la version <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.61.0">0.61.0</a>.
</div>

Ajoutez ce qui suit :

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Enregistrer des services d'application.
     *
     * @return void
     */
    public function register()
    {
        // Récupérer l'instance Monolog
        $monolog = logger()->getLogger();
        if (!$monolog instanceof \Monolog\Logger) {
            return;
        }

        // Facultatif : utiliser le format JSON
        $useJson = false;
        foreach ($monolog->getHandlers() as $handler) {
            if (method_exists($handler, 'setFormatter')) {
                $handler->setFormatter(new \Monolog\Formatter\JsonFormatter());
                $useJson = true;
            }
        }

        // Injecter l'ID de trace et de span pour associer l'entrée de log à la trace APM
        $monolog->pushProcessor(function ($record) use ($useJson) {
            $context = \DDTrace\current_context();
            if ($useJson === true) {
                $record['extra']['dd'] = [
                    'trace_id' => $context['trace_id'],
                    'span_id'  => $context['span_id'],
                ];
            } else {
                $record['message'] .= sprintf(
                    ' [dd.trace_id=%d dd.span_id=%d]',
                    $context['trace_id'],
                    $context['span_id']
                );
            }
            return $record;
        });
    }

    /**
     * Bootstrap des services d'application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
```

{{% /tab %}}
{{% tab "Silex" %}}

Ajoutez ce qui suit :

```php
<?php
  // file: bootstrap
  $app->extend('monolog', function($monolog, $app) {
      $monolog->pushHandler(...);
      // Configurer votre logger ci-dessous
      return $monolog;
  });
```

{{% /tab %}}
{{% tab "Lumen" %}}

Ajoutez ce qui suit :

```php
<?php
  //file: bootstrap/app.php
  $app->configureMonologUsing(function($monolog) {
      $monolog->pushHandler(...);
      // Configurer votre logger ci-dessous
  });

  return $app;
```

{{< /tabs >}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[2]: /fr/tracing/other_telemetry/connect_logs_and_traces/php/
[3]: https://symfony.com/doc/current/logging.html#monolog
[4]: https://github.com/ppi/ppi-monolog-module
[5]: https://laravel.com/docs/9.x/logging#introduction
[6]: https://github.com/silexphp/Silex
[7]: https://lumen.laravel.com/docs/9.x
[8]: https://seldaek.github.io/monolog/
[9]: https://framework.zend.com/
[10]: https://symfony.com/
[11]: /fr/agent/logs/?tab=tailfiles#activate-log-collection
[12]: /fr/agent/logs/?tab=tailfiles#custom-log-collection
[13]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[14]: /fr/glossary/#tail