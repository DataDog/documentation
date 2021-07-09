---
title: PHP Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the PHP tracer'
aliases:
  - /tracing/compatibility_requirements/php
code_lang: php
type: multi-code-lang
code_lang_weight: 50
further_reading:
    - link: 'tracing/setup/php'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---
## Compatibility

The PHP Datadog Trace library is open source - view the [Github repository][1] for more information.

PHP APM supports the following PHP versions:

| Version    | Support type                          |
|:-----------|:--------------------------------------|
| 8.0.x      | Fully Supported (as of `0.52.0`)      |
| 7.4.x      | Fully Supported                       |
| 7.3.x      | Fully Supported                       |
| 7.2.x      | Fully Supported                       |
| 7.1.x      | Fully Supported                       |
| 7.0.x      | Fully Supported                       |
| 5.6.x      | Fully Supported                       |
| 5.5.x      | Fully Supported (as of `0.49.0`)      |
| 5.4.x      | Fully Supported                       |

PHP APM supports the following SAPI's:

| SAPI           | Support type    |
|:---------------|:----------------|
| apache2handler | Fully Supported |
| cli            | Fully Supported |
| fpm-fcgi       | Fully Supported |
| cgi-fcgi       | Fully Supported |


### Integrations

#### Web framework compatibility

By default, Datadog **supports all PHP web frameworks** out of the box, with either framework-level instrumentation, or generic web tracing.

Framework-level instrumentation includes tracing of internal methods and framework specific tagging.

Generic web tracing includes a `web.request` span to track latency and errors that originated from the call, in addition to spans for supported libraries — for example: database and HTTP clients.

The following table enumerates some of the frameworks and versions Datadog successfully traces.

**Web frameworks**:

| Module         | Versions             | Support Type               | Instrumentation level           |
|:-------------- |:---------------------|:---------------------------|:--------------------------------|
| CakePHP        | 2.x                  | All supported PHP versions | Framework-level instrumentation |
| CodeIgniter    | 2.x                  | PHP 7+                     | Framework-level instrumentation |
| CodeIgniter    | 3.x                  | PHP 7+                     | Generic web tracing             |
| Laravel        | 4.2, 5.x, 6.x        | All supported PHP versions | Framework-level instrumentation |
| Laravel 8      | 8.x (as of `0.52.0`) | All supported PHP versions | Framework-level instrumentation |
| Lumen          | 5.2+                 | All supported PHP versions | Framework-level instrumentation |
| Symfony 3      | 3.3, 3.4             | All supported PHP versions | Framework-level instrumentation |
| Symfony 4      | 4.x                  | All supported PHP versions | Framework-level instrumentation |
| Symfony 5      | 5.x (as of `0.50.0`) | All supported PHP versions | Framework-level instrumentation |
| WordPress      | 4.x, 5.x             | PHP 7+                     | Framework-level instrumentation |
| Zend Framework | 1.12                 | All supported PHP versions | Framework-level instrumentation |
| Zend Framework | 2.x                  | All supported PHP versions | Generic web tracing             |
| Yii            | 1.1, 2.0             | All supported PHP versions | Framework-level instrumentation |
| Drupal         |                      | All supported PHP versions | Generic web tracing             |
| Magento        | 1, 2                 | All supported PHP versions | Generic web tracing             |
| Phalcon        | 1.3, 3.4             | All supported PHP versions | Generic web tracing             |
| Slim           | 2.x, 3.x, 4.x        | All supported PHP versions | Framework-level instrumentation |
| Neos Flow      | 1.1                  | All supported PHP versions | Generic web tracing             |
| FuelPHP        | 1.1                  | PHP 7+                     | Generic web tracing             |

Note that even if you don't see your web framework in this list, it is supported out of the box with the latest release of the tracer.

Datadog is continuously adding more support for in-depth tracing for PHP web-frameworks.  To request support for additional span metadata and framework internals, contact our awesome [support team][2].

#### CLI library compatibility

Tracing from the CLI SAPI is disabled by default. To enable tracing of PHP CLI scripts, set `DD_TRACE_CLI_ENABLED=true`.

| Module          | Versions | Support Type    |
|:----------------|:---------|:----------------|
| CakePHP Console | 2.x      | Fully Supported |
| Laravel Artisan | 5.x      | Fully Supported |

To request support for additional CLI libraries, contact our awesome [support team][2].

#### Datastore compatibility

| Module                                                                  | Versions                   | Support Type    |
|-------------------------------------------------------------------------|----------------------------|-----------------|
| Amazon RDS (using PDO or MySQLi)                                        | *(Any Supported PHP)*      | Fully Supported |
| Elasticsearch                                                           | 1.x                        | Fully Supported |
| Eloquent                                                                | Laravel supported versions | Fully Supported |
| Memcached                                                               | *(Any Supported PHP)*      | Fully Supported |
| MongoDB - via [mongo][3] extension                                      | 1.4.x                      | Fully Supported |
| MySQLi                                                                  | *(Any Supported PHP)*      | Fully Supported |
| PDO (MySQL, PostgreSQL, MariaDB)                                        | *(Any Supported PHP)*      | Fully Supported |
| PhpRedis                                                                | 3, 4, 5                    | PHP 7           |
| Predis                                                                  | 1.1                        | Fully Supported |

To request support for additional datastores, contact our awesome [support team][2].

#### Library compatibility

| Module     | Versions              | Support Type    |
|:-----------|:----------------------|:----------------|
| Curl       | *(Any Supported PHP)* | Fully Supported |
| Guzzle     | 5.x                   | Fully Supported |
| Guzzle     | 6.x                   | Fully Supported |

To request support for additional libraries, contact our awesome [support team][2].

#### Deep call stacks on PHP 5

The call stack is limited on PHP 5. See the [deep call stack troubleshooting page][4] for more details.

### Generators

Instrumenting [generators][5] is not supported on PHP 5 and PHP 7.

### PCNTL

We currently do not offer support for tracing processes forked via [pcntl][6]. When a call to `pcntl_fork` is detected, we disable tracing in the forked process. The main process will still be traced. We plan to provide support for `pcntl` in the future.

If the application invokes `pcntl_unshare(CLONE_NEWUSER);` and the tracer is installed, the application will fatally crash. This happens because `unshare` with `CLONE_NEWUSER` requires the process [not to be threaded][7], while the PHP tracer uses a separate thread to send traces to the Datadog agent without blocking the main process.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-php
[2]: /help
[3]: https://pecl.php.net/package/mongo
[4]: /tracing/troubleshooting/php_5_deep_call_stacks
[5]: https://www.php.net/manual/en/language.generators.overview.php
[6]: https://www.php.net/manual/en/book.pcntl.php
[7]: https://man7.org/linux/man-pages/man2/unshare.2.html
