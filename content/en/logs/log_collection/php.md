---
title: PHP log collection
kind: documentation
aliases:
  - /logs/languages/php
further_reading:
- link: "/logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "/logs/explorer"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: /logs/faq/log-collection-troubleshooting-guide
  tag: "FAQ"
  text: "Log Collection Troubleshooting Guide"
---

## Overview

Write your PHP logs into a file, then [use the Agent][1] to forward them to Datadog, choose between the following libraries:

{{< tabs >}}
{{% tab "PHP Monolog" %}}

Use Composer to add Monolog as a dependency:  
 
```
composer require "monolog/monolog"
```

Alternatively, install it manually:

1. Download Monolog from the repository and include it to the libraries
2. Initialize the instance in the application's bootstrap

    ```php
    <?php

    require __DIR__ . '/vendor/autoload.php';

    // load Monolog library
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;
    use Monolog\Formatter\JsonFormatter;    
    ```

## Setup - Log into a file with Monolog

The following configuration enables the JSON formatting and writes the logs and events into the `application-json.log` file. Edit your code, right after the initialization of the Monolog instance and add a new handler:

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

## Configure your Datadog Agent

Create a `php.d/conf.yaml` file in your `conf.d/` folder with the following content:

```yaml
init_config:

instances:
    
## Log section
logs:

    ## - type: file (mandatory) type of log input source (tcp / udp / file)
    ##   port/path: (mandatory) Set port if type is tcp or udp. Set path if type is file
    ##   service: (mandatory) name of the service owning the log
    ##   source: (mandatory) attribute that defines which integration is sending the logs
    ##   sourcecategory: (optional) Multiple value attribute. Can be used to refine the source attribute
    ##   tags: (optional) add tags to each logs collected

  - type: file
    path: /path/to/your/php/application-json.log
    service: php
    source: php
    sourcecategory: sourcecode
```

## Add meta field and context

It's useful to add additional context data to your logs and events.  
Monolog makes this convenient by providing methods for setting thread-local context data that is then submitted automatically with all events. At any moment, log an event with contextual data:

```php
$logger->info('Adding a new user', array('username' => 'Seldaek'));
```

Monolog comes with a pre-processor feature. It's a simple callback that enriches your events with metadata you can set (e.g., the session id, the request id, etc.):

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

## Framework integration 

Monolog is a part of the following frameworks:

* [Symfony2, Symfony3][1]
* [PPI][2]
* [Laravel 4 & 5][3]
* [Silex][4]
* [Lumen][5]
* [CakePHP][6]


Integrate Monolog with your framework then configure your logger: 
 
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

### Symfony (v2+, v3+)

In your configuration directory `/path/to/config/directory/`, edit the `config_dev.yml` and `config_prod.yml` to configure log management to suit your needs for development and production environments.

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
            # inclues all channels (doctrine, errors, etc.)
            channels: ~
            # use json formatter
            formatter: monolog.json_formatter
            # logs alls events (debug trought fatal)
            level: debug
```

### PPI

In your configuration directory `/path/to/config/directory/`, edit the `config_dev.yml` and `config_prod.yml` to configure log management to suit your needs for development and production environments.

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
            # logs alls events (debug trought fatal)
            level: debug
```

### Laravel

```php
//file: bootstrap/app.php
$app->configureMonologUsing(function($monolog) {
    $monolog->pushHandler(...);
    
  // configure your logger below
});

return $app;
```

### Silex

```php
// file: bootstrap
$app->extend('monolog', function($monolog, $app) {
    $monolog->pushHandler(...);
    // configure your logger below
    return $monolog;
});
```

### Lumen

```php
//file: bootstrap/app.php
$app->configureMonologUsing(function($monolog) {
    $monolog->pushHandler(...);
    // configure your logger below
});

return $app;
```

### CakePHP

First, add this dependency to the `composer.json` file and
run `composer update`.

```json
{
    "require": {
        "cakephp/monolog": "*"
    }
}
```

Then, start by creating a logging configuration file (i.e., `app/Config/log.php`) that you includes your `app/Config/bootstrap.php`:

```php
include 'log.php';
```

A basic configuration, to replicate what Cake does but using Monolog would look something like this:

```
CakePlugin::load('Monolog');
```

Finally log into a file:

```
CakeLog::config('debug', array(
  'engine' => 'Monolog.Monolog',
  'channel' => 'app',
  'handlers' => array(
    'Stream' => array(
      LOGS . 'application-json.log',
      'formatters' => array(
        'Json' => array("")
      )
    )
  )
));
```

[1]: /logs/log_collection/php/#symfony-v2-v3
[2]: /logs/log_collection/php/#ppi
[3]: /logs/log_collection/php/#laravel
[4]: /logs/log_collection/php/#silex
[5]: /logs/log_collection/php/#lumen
[6]: /logs/log_collection/php/#cakephp
{{% /tab %}}
{{% tab "PHP Symfony" %}}

This section is about:

* How to send your logs to Datadog from a Symfony 2 environment
* How to configure Monolog to send logs in JSON
* How to enrich your Log events with session contextual data

## Setup - Log into files with Monolog

1. Declare a Monolog JSON formatter as a service:

    ```yaml
    services:
        monolog.json_formatter:
            class: Monolog\Formatter\JsonFormatter
    ```

2. Configure the formatter in your Monolog configuration: declare the formatter field as follows:

    ```yaml
     monolog:
        handlers:
            main:
                type:   stream
                path:   "%kernel.logs_dir%/%kernel.environment%.log"
                level:  debug
                formatter: monolog.json_formatter
    ```

## Configure your Datadog Agent

Create a `php.d/conf.yaml` file in your `conf.d/` folder with the following content:

```yaml
init_config:

instances:
    
## Log section
logs:

    ## - type: file (mandatory) type of log input source (tcp / udp / file)
    ##   port / path: (mandatory) Set port if type is tcp or udp. Set path if type is file
    ##   service: (mandatory) name of the service owning the log
    ##   source: (mandatory) attribute that defines which integration is sending the logs
    ##   sourcecategory: (optional) Multiple value attribute. Can be used to refine the source attribute
    ##   tags: (optional) add tags to each logs collected

  - type: file
    path: /path/to/your/php/application-json.log
    service: php
    source: php
    sourcecategory: sourcecode
```

## Adding a session Processor to add variable context in your logs

1. Implement your session Processor:  
  This is an example of such a Processor. It knows the current session and it enriches the content of the log record with valuable information such as the `requestId`, `sessionId`, ...  

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

2. Wire the Processor with Symfony:  
  ```yaml
   services:
      monolog.processor.session_request:
          class: Acme\Bundle\MonologBundle\Log\SessionRequestProcessor
          arguments:  [ @session ]
          tags:
              - { name: monolog.processor, method: processRecord }
  ```

3. [Stream generated JSON file to Datadog][1]


[1]: /logs/log_collection
{{% /tab %}}
{{% tab "PHP Zend-Log" %}}

Zend-log is a part of the Zend framework. Use [Composer][1] to add Zend-Log:

```
composer require "zendframework/zend-log"
```

Alternatively, install it manually:

1. Download the source from the repository and include it to the libraries
2. Initialize the instance in the application's bootstrap

```php
<?php
require __DIR__ . '/vendor/autoload.php';

use Zend\Log\Logger;
use Zend\Log\Writer\Stream;
use Zend\Log\Formatter\JsonFormatter;
```

## Setup - Log into files with Zend-log

The following configuration enables the JSON formatting and writes the logs and events into the `application-json.log` file. Edit your code, right after the initialization of the Zend-Log instance and add a new handler.

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

Then [Stream your log files to Datadog][2]

## Configure your Datadog Agent

Create a `php.d/conf.yaml` file in your `conf.d/` folder with the following content:

```yaml
init_config:

instances:
    
## Log section
logs:

    ## - type: file (mandatory) type of log input source (tcp / udp / file)
    ##   port/path: (mandatory) Set port if type is tcp or udp. Set path if type is file
    ##   service: (mandatory) name of the service owning the log
    ##   source: (mandatory) attribute that defines which integration is sending the logs
    ##   sourcecategory: (optional) Multiple value attribute. Can be used to refine the source attribute
    ##   tags: (optional) add tags to each logs collected

  - type: file
    path: /path/to/your/php/application-json.log
    service: php
    source: php
    sourcecategory: sourcecode
```

## Add meta field and context

Much of the useful information comes from additional context data that you can add to your logs and your events. Zend-Log makes this very convenient by providing methods to set thread local context data that is then submitted automatically with all events. At any moment, log an event with contextual data:  

```php
$logger->info('Adding a new user', array('username' => 'Seldaek'));
```

But, most importantly, the library comes with a Processor feature. Processors allow you to provide additional information to logs in an automated fashion. They are called from the logger before the event is passed to the writers; they receive the event array, and return an event array on completion.

Use cases include:

* Providing exception backtrace information.
* Injecting substitutions into the message.
* Injecting a request identifier (in order to later inspect logs for a specific identifier).

Take a peek to this code if you want to use it:

```php
$logger->addProcessor(new Zend\Log\Processor\Backtrace());
$logger->addProcessor(new Zend\Log\Processor\PsrPlaceholder());
$logger->addProcessor(new Zend\Log\Processor\ReferenceId());
$logger->addProcessor(new Zend\Log\Processor\RequestId());
```

If you want to develop yours, [refer the Zend documentation][3].


[1]: https://getcomposer.org
[2]: /logs/log_collection
[3]: https://docs.zendframework.com/zend-log/processors
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}




[1]: /logs
