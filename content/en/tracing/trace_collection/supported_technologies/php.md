---
title: PHP Supported Technologies
code_lang: php
type: multi-code-lang
code_lang_weight: 50
further_reading:
    - link: 'tracing/trace_collection/dd_libraries/php'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---


#### Web framework compatibility

By default, Datadog **supports all PHP web frameworks** out of the box, with either framework-level instrumentation, or generic web tracing.

Framework-level instrumentation includes tracing of internal methods and framework specific tagging.

Generic web tracing includes a `web.request` span to track latency and errors that originated from the call, in addition to spans for supported libraries — for example: database and HTTP clients.

The following table enumerates some of the frameworks and versions Datadog successfully traces.

**Web frameworks**:

| Module         | Versions                                | Support Type                | Instrumentation level           |
|:---------------|:----------------------------------------|:----------------------------|:--------------------------------|
| CakePHP        | 2.x                                     | All supported PHP versions  | Framework-level instrumentation |
| CodeIgniter    | 2.x                                     | All supported PHP versions  | Framework-level instrumentation |
| CodeIgniter    | 3.x                                     | All supported PHP versions  | Generic web tracing             |
| Drupal         |                                         | All supported PHP versions  | Framework-level instrumentation |
| FuelPHP        | 1.1                                     | All supported PHP versions  | Generic web tracing             |
| Laminas        |                                         | All supported PHP versions  | Framework-level instrumentation |
| Laravel        | 4.2, 5.x, 6.x                           | All supported PHP versions  | Framework-level instrumentation |
| Laravel 8+     | 8.x, 9.x, 10.x, 11.x (tracer `0.52.0+`) | All supported PHP versions  | Framework-level instrumentation |
| Lumen          | 5.2+                                    | All supported PHP versions  | Framework-level instrumentation |
| Magento        | 1                                       | All supported PHP versions  | Generic web tracing             |
| Magento        | 2                                       | All supported PHP versions  | Framework-level instrumentation |
| Neos Flow      | 1.1                                     | All supported PHP versions  | Generic web tracing             |
| Phalcon        | 1.3, 3.4                                | All supported PHP versions  | Generic web tracing             |
| RoadRunner     | 2.x                                     | All supported PHP versions  | Framework-level instrumentation |
| Slim           | 2.x, 3.x, 4.x                           | All supported PHP versions  | Framework-level instrumentation |
| Symfony        | 2.x, 3.3, 3.4, 4.x, 5.x, 6.x, 7.x       | All supported PHP versions  | Framework-level instrumentation |
| WordPress      | 4.x, 5.x, 6.x                           | All supported PHP versions  | Framework-level instrumentation |
| Yii            | 2.0                                     | All supported PHP versions  | Framework-level instrumentation |
| Zend Framework | 1.12, 1.21                              | All supported PHP versions  | Framework-level instrumentation |
| Zend Framework | 2.x                                     | All supported PHP versions  | Generic web tracing             |

Note that even if you don't see your web framework in this list, it is supported out of the box with the latest release of the tracer.

Datadog is continuously adding more support for in-depth tracing for PHP web-frameworks. To request support for additional span metadata and framework internals, contact our awesome [support team][3].

#### CLI library compatibility

Tracing from the CLI SAPI is disabled by default. To enable tracing of PHP CLI scripts, set `DD_TRACE_CLI_ENABLED=true`.

| Module          | Versions            | Support Type               |
|:----------------|:--------------------|:---------------------------|
| CakePHP Console | 2.x                 | All supported PHP versions |
| Laravel Artisan | 5.x, 8.x, 9.x, 10.x | All supported PHP versions |
| Symfony CLI     | 4.x, 5.x, 6.x, 7.x  | All supported PHP versions |

To request support for additional CLI libraries, contact our awesome [support team][3].

#### Datastore compatibility

| Module                                                                  | Versions                   | Support Type               |
|-------------------------------------------------------------------------|----------------------------|----------------------------|
| Amazon RDS (using PDO or MySQLi)                                        | *(Any Supported PHP)*      | All supported PHP versions |
| Elasticsearch                                                           | 1+                         | All supported PHP versions |
| Eloquent                                                                | Laravel supported versions | All supported PHP versions |
| Laravel Queues                                                          | Laravel supported versions | All supported PHP versions |
| Memcache                                                                | *(Any Supported PHP)*      | All supported PHP versions |
| Memcached                                                               | *(Any Supported PHP)*      | All supported PHP versions |
| MongoDB - via [mongo][4] extension                                      | 1.4.x                      | All supported PHP versions |
| MySQLi                                                                  | *(Any Supported PHP)*      | All supported PHP versions |
| PDO                                                                     | *(Any Supported PHP)*      | All supported PHP versions |
| PhpRedis                                                                | 3, 4, 5                    | All supported PHP versions |
| Predis                                                                  | 1.1                        | All supported PHP versions |
| SQLSRV                                                                  | *(Any Supported PHP)*      | All supported PHP versions |

To request support for additional datastores, contact our awesome [support team][3].

#### Library compatibility

| Module            | Versions                   | Support Type               |
|:------------------|:---------------------------|:---------------------------|
| [php-amqplib][10] | 2.x, 3.x                   | PHP 7.1+                   |
| Curl              | *(Any Supported PHP)*      | All supported PHP versions |
| Guzzle            | 5.x, 6.x, 7.x              | All supported PHP versions |
| Laravel Queue     | Laravel supported versions | All supported PHP versions |
| [OpenAI][11]      | OpenAI supported versions  | All supported PHP versions |
| Symfony Messenger | 4.4, 5.x, 6.x, 7.x         | All supported PHP versions |


To request support for additional libraries, contact our awesome [support team][3].

#### Deep call stacks on PHP 5

The call stack is limited on PHP 5. See the [deep call stack troubleshooting page][5] for more details.

### Generators

Instrumenting [generators][6] is not supported on PHP 5 and PHP 7.

### PCNTL

Datadog supports tracing forked processes using [pcntl][7]. When a call to `pcntl_fork` is detected, a dedicated span is created, and the forked process is instrumented. This can be disabled with `DD_TRACE_FORKED_PROCESS`. Refer to the [library configuration page][9] for more details.

If the application invokes `pcntl_unshare(CLONE_NEWUSER);` and the tracer is installed, the application fatally crashes. This happens because `unshare` with `CLONE_NEWUSER` requires the process [not to be threaded][8], while the PHP tracer uses a separate thread to send traces to the Datadog Agent without blocking the main process.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-php
[2]: https://www.datadoghq.com/support/
[3]: /help
[4]: https://pecl.php.net/package/mongo
[5]: /tracing/troubleshooting/php_5_deep_call_stacks
[6]: https://www.php.net/manual/en/language.generators.overview.php
[7]: https://www.php.net/manual/en/book.pcntl.php
[8]: https://man7.org/linux/man-pages/man2/unshare.2.html
[9]: /tracing/trace_collection/library_config/php/#environment-variable-configuration
[10]: https://github.com/php-amqplib/php-amqplib
[11]: https://github.com/openai-php/client
