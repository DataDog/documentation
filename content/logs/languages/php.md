---
title: PHP log collection
kind: documentation
further_reading:
- link: "/logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "/logs/parsing"
  tag: "Documentation"
  text: Learn more about parsing
- link: "/logs/explore"
  tag: "Documentation"
  text: Learn how to explore your logs
- link: /logs/faq/log-collection-troubleshooting-guide
  tag: "FAQ"
  text: Log Collection Troubleshooting Guide
---

## Overview

## PHP Monolog

Monolog is one of the most used logging library. Many of frameworks implement Monolog for their logging module. The following documentation is applicable for many frameworks and home-made application.

There is various way to include Monolog to your application. If you are using a PHP framework like Symfony, please refer to the supported framework section to know if Monolog is already packed.

The recommended way is to use Composer to add Monolog, Add Monolog as dependency
 
```
composer require "monolog/monolog"
```

Alternatively, install it manually:

1. Download Monolog from the reposiotry and include it to the librairies
2. Initialize the instance in the application's bootstrap

    ```php
    <?php

    require __DIR__ . '/vendor/autoload.php';

    // load Monolog library
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;
    use Monolog\Formatter\JsonFormatter;    
    ```


### Setup - Log into a file with Monolog

The following configuration enables the Json formatting and writes the logs and events into the `application-json.log` file. Edit your code, right after the initialization of the Monolog instance and add a new handler.

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

Stream now your log files to Datadog selectively depending on your operating system:


### Framework integration 

Monolog is a part of the following framewok.

* [Symfony2, Symfony3](/logs/languages/php/#symfony-v2-v3)
* [PPI](/logs/languages/php/#ppi)
* [Laravel 4 & 5](/logs/languages/php/#laravel)
* [Silex](/logs/languages/php/#silex)
* [Lumen](/logs/languages/php/#lumen)
* [CakePHP](/logs/languages/php/#cakephp)

Then, configure the logger as usual
 
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
return $r;});
```

and then [stream your log files to Datadog](/logs)

#### Symfony (v2+, v3+)

Look at your configuration directory, and edit `config_dev.yml` or `config_prod.yml` depending on your needs: 

```yaml
 # app/config/config.yml
monolog:

# Uncomment this section, if you want to use a processor
#       processor: 
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

#### PPI

Look at your configuration directory, and edit `config_dev.yml` or `config_prod.yml` depending on your needs: 

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

#### Laravel

```php
 <?php 

//file: bootstrap/app.php
$app->configureMonologUsing(function($monolog) {
    $monolog->pushHandler(...);
    
  // configure your logger as below 
});

return $app;
```

#### Silex

```php
<?php

// file: bootstrap
$app->extend('monolog', function($monolog, $app) {
    $monolog->pushHandler(...);
    // configure your logger as below 
    return $monolog;
});
```

#### Lumen

```php
<?php 

//file: bootstrap/app.php
$app->configureMonologUsing(function($monolog) {
    $monolog->pushHandler(...);
    // configure your logger as below 
});

return $app;
```

#### CakePHP

First, add this dependency to the `composer.json` file and
run `composer update`.

```json
{
    "require": {
        "cakephp/monolog": "*"
    }
}
```

Then, start by creating a logging configuration  file (i.e. `app/Config/log.php`) that you include early in your `app/Config/bootstrap.php`:

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

## PHP Symfony

This section is about:

* How to send your logs to Datadog from a Symfony 2 environment
* How to configure Monolog to send logs in JSON
* How to enrich your Log events with session contextual data

For some part of this doc you need a working PHP Symfony 2 environment. However, you can also follow the instructions if you are or you are planing to use monolog as your logging library.

Depending on your needs, you can send your logs using a common log shipper or directly from your code with the agentless configuration.
For performance purpose, we recommended to use a log shipper that implements buffer mechanism like rsyslog.

### Setup - Log into files with Monolog

1. Declare a Monolog Json formatter as a service:

    ```yaml
    services:
        monolog.json_formatter:
            class: Monolog\Formatter\JsonFormatter
    ```

    Declaring it is enough because this class is already provided in the Monolog library.

2. Wire the formatter in your Monolog configuration: declare the formatter field as follows:

    ```yaml
     monolog:
        handlers:
            main:
                type:   stream
                path:   "%kernel.logs_dir%/%kernel.environment%.log"
                level:  debug
                formatter: monolog.json_formatter
    ```

3. [Stream your log files to Datadog](/logs)

### Adding a session processor to add variable context in your logs

1. Implement your session processor:  
  This is an example of such processor. It knows the current session and it enriches the content of the log record with valuable information such as the `requestId`, `sessionId`, ...  

    ```php
     <?php

    namespace Acme\Bundle\MonologBundle\Log;

    use Symfony\Component\HttpFoundation\Session\Session;

    class SessionRequestProcessor
    {
      private $session;
      private $sessionId;
      private $requestId;
      private $_server;
      private $_get;
      private $_post;

      public function __construct(Session $session)
      {
        $this->session = $session;
      }

      public function processRecord(array $record)
      {
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

      protected function clean($array)
      {
        $toReturn = array();
        foreach(array_keys($array) as $key) {
          if (false !== strpos($key, 'password')) {
            //Do not add
          } else if (false !== strpos($key, 'csrf_token')) {
            //Do not add
          } else {
            $toReturn[$key] = $array[$key];
          }
        }

        return $toReturn;
      }
    }
    ```

2. Wire the processor with Symfony:  
  ```yaml
   services:
      monolog.processor.session_request:
          class: Acme\Bundle\MonologBundle\Log\SessionRequestProcessor
          arguments:  [ @session ]
          tags:
              - { name: monolog.processor, method: processRecord }
  ```

3. Stream generated JSON file to Datadog

## PHP Zend-Log

Zend-log is a part of the Zend framework, one of the most used. The following documentation is applicable for many applications. There is various way to include Zend-Log to your application. If you are using Zend framework, it's obviously already included.

For any others cases, the recommended way is to use [Composer](https://getcomposer.org/) to add Zend-Log:

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

Configure Zend to write log into files. Do not forget that your events need to ship by a log shipper.

### Setup - Log into files with Zend-log

The following configuration enables the Json formatting and writes the logs and events into the `application-json.log` file. Edit your code, right after the initialization of the Zend-Log instance and add a new handler.

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

[Stream your log files to Datadog](/logs)

### Add meta field and context

Much of the usefulness information comes from additional context data that you can add to your logs and your events. Zend-Log makes this very convenient by providing methods to set thread local context data that is then submitted automatically with all events.

At any moment, you can log an event, with a contextual data.

```php
<?php

$logger->info('Adding a new user', array('username' => 'Seldaek'));
```

But, most important, the library comes with a processor feature. Processors allow you to provide additional information to logs in an automated fashion. They are called from the logger before the event is passed to the writers; they receive the event array, and return an event array on completion.

Use cases include:

* Providing exception backtrace information.
* Injecting substitutions into the message.
* Injecting a request identifier (in order to later inspect logs for a specific identifier)

Please, take a peek to this code if you want to use it.

```php
<?php 

$logger->addProcessor(new Zend\Log\Processor\Backtrace());
$logger->addProcessor(new Zend\Log\Processor\PsrPlaceholder());
$logger->addProcessor(new Zend\Log\Processor\ReferenceId());
$logger->addProcessor(new Zend\Log\Processor\RequestId());
```

If you want to develop yours, refer at the [Zend documentation](https://docs.zendframework.com/zend-log/processors/).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

