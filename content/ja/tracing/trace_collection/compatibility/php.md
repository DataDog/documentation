---
title: PHP Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the PHP tracer'
aliases:
  - /tracing/compatibility_requirements/php
  - /tracing/setup_overview/compatibility_requirements/php
code_lang: php
type: multi-code-lang
code_lang_weight: 50
further_reading:
    - link: tracing/trace_collection/dd_libraries/php
      tag: Documentation
      text: Instrument Your Application
---
<div class="alert alert-info">This documentation is for the PHP tracer v1.x. If you are looking for the PHP tracer v0.x documentation, see the legacy <a href="/tracing/trace_collection/compatibility/php_v0/">PHP Compatibility Requirements
</a> documentation.</div>

## Runtime support policy for PHP APM

The PHP Datadog Trace library is open source - view the [GitHub repository][1] for more information.

Datadog APM for PHP is built upon dependencies defined in specific versions of the host operating system, PHP runtime,
certain PHP libraries, and the Datadog Agent or API.
When these versions are no longer supported by their maintainers, Datadog APM for PHP limits its support for these as well.

#### Levels of support

| **Level**                                              | **Support provided**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Unsupported</span>      |  No implementation. [Contact our customer support team for special requests.][2]                                                             |
| <span id="support-beta">Beta</span>                    |  Initial implementation. May not yet contain all features. Support for new features, bug, and security fixes provided on a best-effort basis.                                    |
| <span id="support-ga">General Availability (GA)</span> |  Full implementation of all features. Full support for new features, bug, and security fixes.                                                                                    |
| <span id="support-maintenance">Maintenance</span>      |  Full implementation of existing features. Does not receive new features. Support for bug and security fixes only.                                                              |
| <span id="support-legacy">Legacy</span>                |  Legacy implementation. May have limited function, but no maintenance provided. [Contact the support team][2] for special requests. |
| <span id="support-eol">End-of-life (EOL)</span>        |  No support. The version can still be used but no bug fixes are provided.                                                                                                  |


PHP APM supports the following PHP versions (both ZTS and NTS):

<div class="alert alert-info">
<strong>Note:</strong>
PHP 5.x is not supported starting version 1.0.0. If you are using PHP 5, you can still use the PHP tracer up to version <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.99.0">0.99</a>.
<br>
If you are using PHP 5.x version in your application and have a feature request which is critical for your business needs, contact <a href="https://www.datadoghq.com/support/">Datadog Support</a>.
<br>
It's recommended to use <a href="https://www.php.net/supported-versions">officially supported versions</a> of PHP, especially 8.0+.
</div>

| PHP Version    | Support level        | Package version |
|:---------------|:---------------------|:----------------|
| 8.3.x          | General Availability | > `0.93.0+`     |
| 8.2.x          | General Availability | > `0.82.0+`     |
| 8.1.x          | General Availability | > `0.66.0+`     |
| 8.0.x          | General Availability | > `0.52.0+`     |
| 7.4.x          | General Availability | All             |
| 7.3.x          | General Availability | All             |
| 7.2.x          | General Availability | All             |
| 7.1.x          | General Availability | All             |
| 7.0.x          | General Availability | All             |
| 5.6.x          | EOL                  | < `1.0.0`      |
| 5.5.x          | EOL                  | < `1.0.0`      |
| 5.4.x          | EOL                  | < `1.0.0`      |

PHP APM supports the following SAPI's:

| SAPI           | Support type               |
|:---------------|:---------------------------|
| apache2handler | All supported PHP versions |
| cli            | All supported PHP versions |
| fpm-fcgi       | All supported PHP versions |
| cgi-fcgi       | All supported PHP versions |
| FrankenPHP     | All supported PHP versions |


## Supported processor architectures

PHP APM supports the following architectures:

| Processor architectures                 | Support level     | Package version | Support Type               |
|-----------------------------------------|-------------------|---------------|----------------------------|
| Linux GNU amd64 (`x86-64-linux-gnu`)    | [GA](#support-ga) | All           | All supported PHP versions |
| Linux MUSL amd64 (`x86-64-linux-musl`)  | [GA](#support-ga) | All           | All supported PHP versions |
| Linux GNU arm64 (`aarch64-linux-gnu`)   | [GA](#support-ga) | > `0.78.0`    | All supported PHP versions |
| Linux MUSL arm64 (`aarch64-linux-musl`) | [GA](#support-ga) | > `0.78.0`    | All supported PHP versions |
| Windows amd64 (`x86_64-windows`)        | [GA](#support-ga) | > `0.98.0`    | PHP 7.2+                   |

### Integrations

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
| Yii            | 1.1, 2.0                                | All supported PHP versions  | Framework-level instrumentation |
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
| Symfony CLI     | 4.x, 5.x, 6.x       | All supported PHP versions |

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
