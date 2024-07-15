---
aliases:
- /es/logs/languages/php
further_reading:
- link: https://www.datadoghq.com/blog/php-logging-guide
  tag: Blog
  text: Cómo recopilar, personalizar y analizar logs de PHP
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtén más información sobre el parseo
- link: /logs/explorer/
  tag: Documentación
  text: Aprende a explorar tus logs
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Realizar análisis de los logs
- link: /logs/faq/log-collection-troubleshooting-guide
  tag: Documentación
  text: Guía para solucionar problemas relacionados con la recopilación de logs
- link: /glossary/#tail
  tag: Glosario
  text: Entrada de glosario para "tail" (cola)
kind: documentación
title: Recopilación de logs de PHP
---

## Información general

Para enviar tus logs de PHP a Datadog, loguea un archivo y luego [supervisa][14] ese archivo con tu Datadog Agent. En esta página, se detallan ejemplos de configuración para las bibliotecas de registro [Monolog][8], [Zend-Log][9] y [Symfony][10].

## Configuración

### Instalación

{{< tabs >}}
{{% tab "PHP Monolog" %}}

Ejecuta este comando para utilizar [Composer][1] para añadir Monolog como una dependencia:

```text
composer require "monolog/monolog"
```

Alternativamente, instala Monolog manualmente de la siguiente manera:

1. Descarga Monolog del repositorio e inclúyelo en las bibliotecas.
2. Añade lo siguiente en el arranque de la aplicación para inicializar la instancia:

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

Zend-Log forma parte del marco Zend. Ejecuta este comando para utilizar [Composer][1] para añadir Zend-Log:

```text
composer require "zendframework/zend-log"
```

Alternativamente, instala Zend-Log manualmente de la siguiente manera:

1. Descarga la fuente del repositorio e inclúyela en las bibliotecas.
2. Añade lo siguiente al arranque de la aplicación para inicializar la instancia:

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

Añade lo siguiente para declarar un formateador JSON de Monolog como un servicio:

```yaml
services:
    monolog.json_formatter:
        class: Monolog\Formatter\JsonFormatter
```

{{% /tab %}}
{{< /tabs >}}

### Configurar tu logger

{{< tabs >}}
{{% tab "PHP Monolog" %}}

La siguiente configuración habilita el formato JSON y redacta los logs y eventos en el archivo `application-json.log`. En tu código, añade un nuevo manejador después de la inicialización de la instancia de Monolog:

```php
 <?php
  require __DIR__ . '/vendor/autoload.php';

  // cargar biblioteca Monolog
  use Monolog\Logger;
  use Monolog\Handler\StreamHandler;
  use Monolog\Formatter\JsonFormatter;

  // crear un canal de log
  $log = new Logger('channel_name');

  // crear un formateador de Json
  $formatter = new JsonFormatter();

  // crear un manejador
  $stream = new StreamHandler(__DIR__.'/application-json.log', Logger::DEBUG);
  $stream->setFormatter($formatter);

  // vincular
  $log->pushHandler($stream);

  // un ejemplo
  $log->info('Adding a new user', array('username' => 'Seldaek'));
```

{{% /tab %}}
{{% tab "PHP Zend-Log" %}}

La siguiente configuración habilita el formato JSON y redacta los logs y eventos en el archivo `application-json.log`. En tu código, añade un nuevo manejador después de la inicialización de la instancia de Zend-Log:

```php
<?php
  use Zend\Log\Logger;
  use Zend\Log\Writer\Stream;
  use Zend\Log\Formatter\JsonFormatter;

  // crear un registrador
  $logger = new Logger();

  // crear un escritor
  $writer = new Stream('file://' . __DIR__ . '/application-json.log');

  // crear un formateador Json
  $formatter = new JsonFormatter();
  $writer->setFormatter($formatter);

  // vincular
  $logger->addWriter($writer);
  Zend\Log\Logger::registerErrorHandler($logger);
```

{{% /tab %}}
{{% tab "PHP Symfony" %}}

Para configurar el formateador en tu configuración de Monolog, declara el campo de formateador de la siguiente manera:

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

### Configurar el Datadog Agent

Cuando tengas la [recopilación de logs activada][11], haz la siguiente configuración de la [recopilación de logs personalizada][4] para supervisar tus archivos de log y enviar logs nuevos a Datadog.

1. Crea una carpeta `php.d/` en el [directorio de configuración del Agent][13] `conf.d/`.
2. Crea un archivo `conf.yaml` en `php.d/` con el siguiente contenido:

```yaml
init_config:

instances:

## Sección de log
logs:

  - type: file
    path: "<path_to_your_php_application_json>.log"
    service: "<service_name>"
    source: php
    sourcecategory: sourcecode
```

## Conectar tus servicios entre logs y trazas (traces)

Si APM está habilitado para esta aplicación, la correlación entre los logs de aplicación y trazas puede mejorarse siguiendo las [instrucciones de registro de APM PHP][10] para añadir automáticamente trazas e IDs de tramos en tus logs.

## Añadir más contexto a los logs

{{< tabs >}}
{{% tab "PHP Monolog" %}}

Puede ser útil añadir contexto adicional a tus logs y eventos. Monolog proporciona métodos para establecer el contexto local del subproceso que luego se envía automáticamente con todos los eventos. Por ejemplo, para loguear un evento con datos contextuales:

```php
<?php
  $logger->info('Adding a new user', array('username' => 'Seldaek'));
```

El preprocesador de Monolog tiene una función que es una devolución de llamada simple y enriquece tus eventos con metadatos que puedes establecer (por ejemplo, el ID de sesión, o el ID de solicitud):

```php
 <?php
  $log->pushProcessor(function ($record) {

      // registrat el usuario actual
      $user = Acme::getCurrentUser();
      $record['context']['user'] = array(
          'name' => $user->getName(),
          'username' => $user->getUsername(),
          'email' => $user->getEmail(),
      );

      // Añadir varias etiquetas
      $record['ddtags'] = array('key' => 'value');

      // Añadir varios contextos genéricos
      $record['extra']['key'] = 'value';

      return $record;
  });
```

{{% /tab %}}
{{% tab "PHP Zend-Log" %}}

Puede ser útil añadir contexto adicional a tus logs y eventos. Zend-Log proporciona métodos para establecer el contexto local del subproceso que luego se envía automáticamente con todos los eventos. Por ejemplo, para loguear un evento con datos contextuales:

```php
<?php
  $logger->info('Adding a new user', array('username' => 'Seldaek'));
```

Consulta [la documentación del procesador de Zend][1] para obtener más información sobre cómo proporcionar información adicional a tus logs.

[1]: https://docs.zendframework.com/zend-log/processors
{{% /tab %}}
{{% tab "PHP Symfony" %}}

Sigue estos pasos para añadir contexto variable en tus logs utilizando un procesador de sesión.

1. Implementar tu procesador de sesiones:
  En el siguiente ejemplo, el procesador conoce la sesión actual y mejora el contenido del registro de log con información como `requestId`, `sessionId`, etc.

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

2. Integrar el procesador con Symfony añadiendo lo siguiente:

    ```yaml
      services:
          monolog.processor.session_request:
              class: Acme\Bundle\MonologBundle\Log\SessionRequestProcessor
              arguments:  [ @session ]
              tags:
                  - { name: monolog.processor, method: processRecord }
    ``` 

3. [Envía en un flujo](#configure-the-datadog-agent) el archivo JSON generado a Datadog.

{{% /tab %}}
{{< /tabs >}}

## Integración del marco de Monolog

Monolog puede utilizarse con los siguientes marcos:

* [Symfony v2+/v3+][3]
* [PPI][4]
* [Laravel][5]
* [Silex][6]
* [Lumen][7]

Para integrar Monolog con tu marco, añade lo siguiente:

```php
 <?php
  // Comprueba si la biblioteca de Monolog está bien cargada
  //use Monolog\Logger;
  //use Monolog\Handler\StreamHandler;
  //use Monolog\Formatter\JsonFormatter;

  // con la instancia de monolog
  $monolog = ...

  ///// Configuración de envío de log

  $formatter = new JsonFormatter();
  $stream = new StreamHandler(__DIR__.'/application-json.log', Logger::DEBUG);
  $stream->setFormatter($formatter);

  $monolog->pushHandler($stream);
  return $r;
```

A continuación, configura tu registrador para Monolog.

{{< tabs >}}
{{% tab "Symfony v2+/v3+" %}}

En tu directorio de configuración `/path/to/config/directory/`, añade lo siguiente a `config_dev.yml` y `config_prod.yml`. Modifica el ejemplo para configurarlo para tus entornos de desarrollo y producción.

```yaml
# app/config/config.yml
monolog:

# Deja sin comentarios esta sección si deseas usar un procesador
#       Processor :
#           session_processor:
#               class: Acme\Bundle\MonologBundle\Log\SessionRequestProcessor
#            arguments:  [ @session ]
#            tags:
#               - { name: monolog.processor, method: processRecord }

    json_formatter:
        class: Monolog\Formatter\JsonFormatter

    handlers:

        # Configuración de envío de log
        to_json_files:
            # log to var/logs/(environment).log
            type: stream
            path: "%kernel.logs_dir%/%kernel.environment%.log"
            # includes all channels (doctrine, errors, and so on)
            channels: ~
            # use json formatter
            formatter: monolog.json_formatter
            # set the log level (for example: debug, error, or alert)
            level: debug
```

{{% /tab %}}
{{% tab "PPI" %}}

En tu directorio de configuración `/path/to/config/directory/`, añade lo siguiente a `config_dev.yml` y `config_prod.yml`. Modifica el ejemplo para configurarlo para tus entornos de desarrollo y producción.

```yaml
monolog:
    handlers:

        # Configuración de envío de log
        to_json_files:
            # log to var/logs/(environment).log
            type: stream
            path: "%kernel.logs_dir%/%kernel.environment%.log"
            # use json formatter
            formatter: monolog.json_formatter
            # set the log level (for example: debug, error, or alert)
            level: debug
```

{{% /tab %}}
{{% tab "Laravel" %}}

<div class="alert alert-warning">
La función <code>\DDTrace\current_context()</code> se presentó en la versión <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.61.0">0.61.0</a>.
</div>

Añade lo siguiente:

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // Get the Monolog instance
        $monolog = logger()->getLogger();
        if (!$monolog instanceof \Monolog\Logger) {
            return;
        }

        // Opcional: utilice el formato JSON
        $useJson = false;
        foreach ($monolog->getHandlers() as $handler) {
            if (method_exists($handler, 'setFormatter')) {
                $handler->setFormatter(new \Monolog\Formatter\JsonFormatter());
                $useJson = true;
            }
        }

        // Inyecta la traza y el ID de tramo para conectar la entrada de log con la traza de APM
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
     * Bootstrap any application services.
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

Añade lo siguiente: 

```php
<?php
  // file: bootstrap
  $app->extend('monolog', function($monolog, $app) {
      $monolog->pushHandler(...);
      // configure your logger below
      return $monolog;
  });
```

{{% /tab %}}
{{% tab "Lumen" %}}

Añade lo siguiente:

```php
<?php
  //file: bootstrap/app.php
  $app->configureMonologUsing(function($monolog) {
      $monolog->pushHandler(...);
      // configure your logger below
  });

  return $app;
```

{{< /tabs >}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/tracing/other_telemetry/connect_logs_and_traces/php/
[3]: https://symfony.com/doc/current/logging.html#monolog
[4]: https://github.com/ppi/ppi-monolog-module
[5]: https://laravel.com/docs/9.x/logging#introduction
[6]: https://github.com/silexphp/Silex
[7]: https://lumen.laravel.com/docs/9.x
[8]: https://seldaek.github.io/monolog/
[9]: https://framework.zend.com/
[10]: https://symfony.com/
[11]: /es/agent/logs/?tab=tailfiles#activate-log-collection
[12]: /es/agent/logs/?tab=tailfiles#custom-log-collection
[13]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[14]: /es/glossary/#tail