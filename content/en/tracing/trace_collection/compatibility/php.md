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
    - link: 'tracing/trace_collection/dd_libraries/php'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---
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


PHP APM supports the following PHP versions:

<div class="alert alert-info">
<strong>Note:</strong>
PHP 5.x is fully supported until version 0.75.0. It is now in maintenance mode and supported with security and important bug fixes until December 31, 2023.
<br>
If you are using PHP 5.x version in your application and have a feature request which is critical for your business needs, contact <a href="https://www.datadoghq.com/support/">Datadog Support</a>.
<br>
It's recommended to use <a href="https://www.php.net/supported-versions">officially supported versions</a> of PHP, especially 7.4, 8.0, and 8.1.
</div>

| PHP Version    | Support level                         | Package version |
|:---------------|:--------------------------------------|:----------------|
| 8.2.x          | General Availability                  | > `0.82.0+`     |
| 8.1.x          | General Availability                  | > `0.66.0+`     |
| 8.0.x          | General Availability                  | > `0.52.0+`     |
| 7.4.x          | General Availability                  | All             |
| 7.3.x          | General Availability                  | All             |
| 7.2.x          | General Availability                  | All             |
| 7.1.x          | General Availability                  | All             |
| 7.0.x          | General Availability                  | All             |
| 5.6.x          | Maintenance (until December 31, 2023) | All             |
| 5.5.x          | Maintenance (until December 31, 2023) | All             |
| 5.4.x          | Maintenance (until December 31, 2023) | All             |

PHP APM supports the following SAPI's:

| SAPI           | Support type    |
|:---------------|:----------------|
| apache2handler | Fully Supported |
| cli            | Fully Supported |
| fpm-fcgi       | Fully Supported |
| cgi-fcgi       | Fully Supported |

## Supported processor architectures

PHP APM supports the following architectures:

| Processor architectures                   | Support level         | Package version                        |
| ------------------------------------------|-----------------------|----------------------------------------|
| Linux GNU amd64 (`x86-64-linux-gnu`)      | [GA](#support-ga)     | All                                    |
| Linux MUSL amd64 (`x86-64-linux-musl`)    | [GA](#support-ga)     | All                                    |
| Linux GNU arm64 (`aarch64-linux-gnu`)     | [GA](#support-ga)     | > `0.78.0`                             |
| Linux MUSL arm64 (`aarch64-linux-musl`)   | [GA](#support-ga)     | > `0.78.0`                             |

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
| Drupal         |                      | All supported PHP versions | Generic web tracing             |
| FuelPHP        | 1.1                  | PHP 7+                     | Generic web tracing             |
| Laravel        | 4.2, 5.x, 6.x        | All supported PHP versions | Framework-level instrumentation |
| Laravel 8      | 8.x (tracer `0.52.0+`) | All supported PHP versions | Framework-level instrumentation |
| Lumen          |   5.2+                 | All supported PHP versions | Framework-level instrumentation |
| Magento        | 1, 2                 | All supported PHP versions | Generic web tracing             |
| Neos Flow      | 1.1                  | All supported PHP versions | Generic web tracing             |
| Phalcon        | 1.3, 3.4             | All supported PHP versions | Generic web tracing             |
| RoadRunner     | 2.x                  | All supported PHP versions | Framework-level instrumentationq |
| Slim           | 2.x, 3.x, 4.x        | All supported PHP versions | Framework-level instrumentation |
| Symfony 3      | 3.3, 3.4             | All supported PHP versions | Framework-level instrumentation |
| Symfony 4      | 4.x                  | All supported PHP versions | Framework-level instrumentation |
| Symfony 5      | 5.x (tracer `0.50.0+`) | All supported PHP versions | Framework-level instrumentation |
| WordPress      | 4.x, 5.x             | PHP 7+                     | Framework-level instrumentation |
| Yii            | 1.1, 2.0             | All supported PHP versions | Framework-level instrumentation |
| Zend Framework | 1.12                 | All supported PHP versions | Framework-level instrumentation |
| Zend Framework | 2.x                  | All supported PHP versions | Generic web tracing             |

Note that even if you don't see your web framework in this list, it is supported out of the box with the latest release of the tracer.

Datadog is continuously adding more support for in-depth tracing for PHP web-frameworks.  To request support for additional span metadata and framework internals, contact our awesome [support team][3].

#### CLI library compatibility

Tracing from the CLI SAPI is disabled by default. To enable tracing of PHP CLI scripts, set `DD_TRACE_CLI_ENABLED=true`.

| Module          | Versions | Support Type    |
|:----------------|:---------|:----------------|
| CakePHP Console | 2.x      | Fully Supported |
| Laravel Artisan | 5.x      | Fully Supported |

To request support for additional CLI libraries, contact our awesome [support team][3].

#### Datastore compatibility

| Module                                                                  | Versions                   | Support Type    |
|-------------------------------------------------------------------------|----------------------------|-----------------|
| Amazon RDS (using PDO or MySQLi)                                        | *(Any Supported PHP)*      | Fully Supported |
| Elasticsearch                                                           | 1+                         | Fully Supported |
| Eloquent                                                                | Laravel supported versions | Fully Supported |
| Memcached                                                               | *(Any Supported PHP)*      | Fully Supported |
| MongoDB - via [mongo][4] extension                                      | 1.4.x                      | Fully Supported |
| MySQLi                                                                  | *(Any Supported PHP)*      | Fully Supported |
| PDO (MySQL, PostgreSQL, MariaDB)                                        | *(Any Supported PHP)*      | Fully Supported |
| PhpRedis                                                                | 3, 4, 5                    | PHP 7, 8        |
| Predis                                                                  | 1.1                        | Fully Supported |

To request support for additional datastores, contact our awesome [support team][3].

#### Library compatibility

| Module     | Versions              | Support Type    |
|:-----------|:----------------------|:----------------|
| Curl       | *(Any Supported PHP)* | Fully Supported |
| Guzzle     | 5.x                   | Fully Supported |
| Guzzle     | 6.x                   | Fully Supported |

To request support for additional libraries, contact our awesome [support team][3].

#### Deep call stacks on PHP 5

The call stack is limited on PHP 5. See the [deep call stack troubleshooting page][5] for more details.

### Generators

Instrumenting [generators][6] is not supported on PHP 5 and PHP 7.

### PCNTL

Datadog does not offer support for tracing processes forked using [pcntl][7]. When a call to `pcntl_fork` is detected, tracing is disabled in the forked process. The main process can still be traced.

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
