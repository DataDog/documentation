---
title: PHP Log Collection
aliases:
  - /logs/languages/php
further_reading:
- link: "https://www.datadoghq.com/blog/php-logging-guide"
  tag: "Blog"
  text: "How to collect, customize, and analyze PHP logs"
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/explorer/#visualize"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: /logs/faq/log-collection-troubleshooting-guide
  tag: "Documentation"
  text: "Log Collection Troubleshooting Guide"
- link: "/glossary/#tail"
  tag: Glossary
  text: 'Glossary entry for "tail"'  
---

## Overview

To send your PHP logs to Datadog, log to a file and then [tail][14] that file with your Datadog Agent. This page details setup examples for the [Monolog][8], [Zend-Log][9], and [Symfony][10] logging libraries.

## Setup

### Installation

{{< tabs >}}
{{% tab "PHP Monolog" %}}

Run this command to use [Composer][1] to add Monolog as a dependency:

```text
composer require "monolog/monolog"
```

Alternatively, install Monolog manually by doing the following:

1. Download Monolog from the repository and include it in the libraries.
2. Add the following in the application's bootstrap to initialize the instance:

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

Zend-Log is a part of the Zend framework. Run this command to use [Composer][1] to add Zend-Log:

```text
composer require "zendframework/zend-log"
```

Alternatively, install Zend-Log manually by doing the following:

1. Download the source from the repository and include it in the libraries.
2. Add the following the application's bootstrap to initialize the instance:

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

Add the following to declare a Monolog JSON formatter as a service:

```yaml
services:
    monolog.json_formatter:
        class: Monolog\Formatter\JsonFormatter
```

{{% /tab %}}
{{< /tabs >}}

### Configure your logger

{{< tabs >}}
{{% tab "PHP Monolog" %}}

The following configuration enables JSON formatting and writes the logs and events into the `application-json.log` file. In your code, add a new handler after the initialization of the Monolog instance:

```php
 <?php
  require __DIR__ . '/vendor/autoload.php';

  // load Monolog library
  use Monolog\Logger;
  use Monolog\Handler\StreamHandler;
  use Monolog\Formatter\JsonFormatter;

  // create a log channel
  $log = new Logger('channel_name');

  // create a Json formatter
  $formatter = new JsonFormatter();

  // create a handler
  $stream = new StreamHandler(__DIR__.'/application-json.log', Logger::DEBUG);
  $stream->setFormatter($formatter);

  // bind
  $log->pushHandler($stream);

  // an example
  $log->info('Adding a new user', array('username' => 'Seldaek'));
```

{{% /tab %}}
{{% tab "PHP Zend-Log" %}}

The following configuration enables the JSON formatting and writes the logs and events into the `application-json.log` file. In your code, add a new handler after the initialization of the Zend-Log instance.

```php
<?php
  use Zend\Log\Logger;
  use Zend\Log\Writer\Stream;
  use Zend\Log\Formatter\JsonFormatter;

  // create a logger
  $logger = new Logger();

  // create a writer
  $writer = new Stream('file://' . __DIR__ . '/application-json.log');

  // create a Json formatter
  $formatter = new JsonFormatter();
  $writer->setFormatter($formatter);

  // bind
  $logger->addWriter($writer);
  Zend\Log\Logger::registerErrorHandler($logger);
```

{{% /tab %}}
{{% tab "PHP Symfony" %}}

To configure the formatter in your Monolog configuration, declare the formatter field as follows:

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

### Configure the Datadog Agent

Once [log collection is enabled][11], do the following to set up [custom log collection][12] to tail your log files and send new logs to Datadog.

1. Create a `php.d/` folder in the `conf.d/` [Agent configuration directory][13].
2. Create a `conf.yaml` file in `php.d/` with the following content:

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

## Connect your services across logs and traces

If APM is enabled for this application, the correlation between application logs and traces can be improved by following the [APM PHP logging instructions][2] to automatically add trace and span IDs in your logs.

## Add more context to logs

{{< tabs >}}
{{% tab "PHP Monolog" %}}

It can be useful to add additional context to your logs and events. Monolog provides methods for setting thread-local context that is then submitted automatically with all events. For example, to log an event with contextual data:

```php
<?php
  $logger->info('Adding a new user', array('username' => 'Seldaek'));
```

Monolog's pre-processor has a feature that is a simple callback and enriches your events with metadata you can set (for example, the session ID, or the request id):

```php
 <?php
  $log->pushProcessor(function ($record) {

      // record the current user
      $user = Acme::getCurrentUser();
      $record['context']['user'] = array(
          'name' => $user->getName(),
          'username' => $user->getUsername(),
          'email' => $user->getEmail(),
      );

      // Add various tags
      $record['ddtags'] = array('key' => 'value');

      // Add various generic context
      $record['extra']['key'] = 'value';

      return $record;
  });
```

{{% /tab %}}
{{% tab "PHP Zend-Log" %}}

It can be useful to add additional context to your logs and events. Zend-Log provides methods to set thread-local context that is then submitted automatically with all events. For example, to log an event with contextual data:

```php
<?php
  $logger->info('Adding a new user', array('username' => 'Seldaek'));
```

See [Zend's Processor documentation][1] for more information on providing additional information to your logs.

[1]: https://docs.zendframework.com/zend-log/processors
{{% /tab %}}
{{% tab "PHP Symfony" %}}

Follow these steps to add variable context in your logs using a session processor.

1. Implement your session processor:
  In the following example, the processor knows the current session and enriches the content of the log record with information such as the `requestId`, `sessionId`, and so on.

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

2. Integrate the processor with Symfony by adding the following:

    ```yaml
      services:
          monolog.processor.session_request:
              class: Acme\Bundle\MonologBundle\Log\SessionRequestProcessor
              arguments:  [ @session ]
              tags:
                  - { name: monolog.processor, method: processRecord }
    ``` 

3. [Stream](#configure-the-datadog-agent) the generated JSON file to Datadog.

{{% /tab %}}
{{< /tabs >}}

## Monolog framework integration

Monolog can be used with the following frameworks:

* [Symfony v2+/v3+][3]
* [PPI][4]
* [Laravel][5]
* [Silex][6]
* [Lumen][7]

To integrate Monolog with your framework, add the following:

```php
 <?php
  // Check if the Monolog library is well loaded
  //use Monolog\Logger;
  //use Monolog\Handler\StreamHandler;
  //use Monolog\Formatter\JsonFormatter;

  // with the monolog instance
  $monolog = ...

  ///// Log shipper configuration

  $formatter = new JsonFormatter();
  $stream = new StreamHandler(__DIR__.'/application-json.log', Logger::DEBUG);
  $stream->setFormatter($formatter);

  $monolog->pushHandler($stream);
  return $r;
```

Then, configure your logger for Monolog.

{{< tabs >}}
{{% tab "Symfony v2+/v3+" %}}

In your configuration directory `/path/to/config/directory/`, add the following to the `config_dev.yml` and `config_prod.yml`. Modify the example to configure it for your development and production environments.

```yaml
# app/config/config.yml
monolog:

# Uncomment this section, if you want to use a Processor
#       Processor :
#           session_processor:
#               class: Acme\Bundle\MonologBundle\Log\SessionRequestProcessor
#            arguments:  [ @session ]
#            tags:
#               - { name: monolog.processor, method: processRecord }

    json_formatter:
        class: Monolog\Formatter\JsonFormatter

    handlers:

        # Log shipper configuration
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

In your configuration directory `/path/to/config/directory/`, add the following to the `config_dev.yml` and `config_prod.yml`. Modify the example to configure it for your development and production environments.

```yaml
monolog:
    handlers:

        # Log shipper configuration
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
The function <code>\DDTrace\current_context()</code> has been introduced in version <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.61.0">0.61.0</a>.
</div>

Add the following:

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

        // Optional: Use JSON formatting
        $useJson = false;
        foreach ($monolog->getHandlers() as $handler) {
            if (method_exists($handler, 'setFormatter')) {
                $handler->setFormatter(new \Monolog\Formatter\JsonFormatter());
                $useJson = true;
            }
        }

        // Inject the trace and span ID to connect the log entry with the APM trace
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

Add the following: 

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

Add the following: 

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /tracing/other_telemetry/connect_logs_and_traces/php/
[3]: https://symfony.com/doc/current/logging.html#monolog
[4]: https://github.com/ppi/ppi-monolog-module
[5]: https://laravel.com/docs/9.x/logging#introduction
[6]: https://github.com/silexphp/Silex
[7]: https://lumen.laravel.com/docs/9.x
[8]: https://seldaek.github.io/monolog/
[9]: https://framework.zend.com/
[10]: https://symfony.com/
[11]: /agent/logs/?tab=tailfiles#activate-log-collection
[12]: /agent/logs/?tab=tailfiles#custom-log-collection
[13]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[14]: /glossary/#tail
