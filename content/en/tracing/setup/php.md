---
title: Tracing PHP Applications
kind: documentation
aliases:
- /tracing/languages/php
- /agent/apm/php/
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-php-performance/"
  tag: "Blog"
  text: "PHP monitoring with Datadog APM and distributed tracing"
- link: "https://github.com/DataDog/dd-trace-php"
  tag: "GitHub"
  text: "Source code"
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "tracing/"
  tag: "Documentation"
  text: "Advanced Usage"
---

## Installation and Getting Started

<div class="alert alert-info">If you already have a Datadog account you can find step-by-step instructions in our in-app guides for <a href="https://app.datadoghq.com/apm/docs?architecture=host-based&language=php" target=_blank> host-based</a> and <a href="https://app.datadoghq.com/apm/docs?architecture=container-based&language=php" target=_blank>container-based</a> set ups.</div>

For descriptions of terminology used in APM, take a look at the [official documentation][1].

For details about open-source contributions to the PHP tracer, refer to the [contributing guide][2].

### Setup the Datadog Agent

The PHP APM tracer sends trace data through the Datadog Agent.

[Install and configure the Datadog Agent][3]. See the additional documentation for [tracing Docker applications][4] or [Kubernetes applications][5].

Make sure the Agent has **[APM enabled][3]**.

### Install the extension

Install the PHP extension using one of the [precompiled packages for supported distributions][6].

Once downloaded, install the package with one of the commands below.

```shell
# using RPM package (RHEL/Centos 6+, Fedora 20+)
rpm -ivh datadog-php-tracer.rpm

# using DEB package (Debian Jessie+ , Ubuntu 14.04+ on supported PHP versions)
dpkg -i datadog-php-tracer.deb

# using APK package (Alpine)
apk add datadog-php-tracer.apk --allow-untrusted
```

The extension will be installed for the default PHP version. To install the extension for a specific PHP version, use the `DD_TRACE_PHP_BIN` environment variable to set the location of the target PHP binary before installing.

```shell
export DD_TRACE_PHP_BIN=$(which php-fpm7)
```

Restart PHP (PHP-FPM or the Apache SAPI) and then visit a tracing-enabled endpoint of your application. View the [APM UI][7] to see the traces.

**Note**: It might take a few minutes before traces appear in the UI. If traces still do not appear after a few minutes, [run the dd-doctor.php diagnostic script][8] from the host machine to help identify any issues.

If you can't find your distribution, you can [manually install][9] the PHP extension.

## Automatic Instrumentation

Tracing is automatically instrumented by default. Once the extension is installed, **ddtrace** traces your application and sends traces to the Agent.

Even if Datadog does not officially support your web framework, you may not need any manual instrumentation. Datadog records generic web requests and creates generic traces for them. If you use one of the supported frameworks, however, Datadog sets more relevant metadata, which makes it easier to navigate through your services.

Automatic instrumentation works by modifying PHP's runtime to wrap certain functions and methods in order to trace them. The PHP tracer supports automatic instrumentation for [several libraries](#library-compatibility).

Automatic instrumentation captures:

* Method execution time
* Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
* Unhandled exceptions, including stacktraces if available
* A total count of traces (e.g., web requests) flowing through the system

**Note**: If your application does not use Composer nor an autoloader registered with `spl_autoload_register()`, set the environment variable, `DD_TRACE_NO_AUTOLOADER=true`, to enable automatic instrumentation.

## Change Agent Hostname

Configure your application level tracers to submit traces to a custom Agent hostname:

The PHP tracer automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`.

See [tracer configuration][10] for more information on how to set these variables.

## Compatibility

PHP APM supports the following PHP versions:

| Version | Support type    |
|:--------|:----------------|
| 7.3.x   | Fully Supported |
| 7.2.x   | Fully Supported |
| 7.1.x   | Fully Supported |
| 7.0.x   | Fully Supported |
| 5.6.x   | Fully Supported |
| 5.4.x   | Fully Supported |

PHP APM supports the following SAPI's:

| SAPI           | Support type    |
|:---------------|:----------------|
| apache2handler | Fully Supported |
| cli            | Fully Supported |
| fpm            | Fully Supported |

### Integrations

#### Web Framework Compatibility

If the web framework that you use is not listed below, you can still see traces for your web requests in the UI. However, some metadata and spans that are very specific to that particular web framework may not display.

| Module         | Versions      | Support Type    |
|:---------------|:--------------|:----------------|
| CakePHP        | 2.x           | Fully Supported |
| CodeIgniter    | 2.x           | PHP 7           |
| Laravel        | 4.2, 5.x      | Fully Supported |
| Lumen          | 5.2+          | Fully Supported |
| Slim           | 3.x           | Fully Supported |
| Symfony        | 3.3, 3.4, 4.x | Fully Supported |
| WordPress      | 4.x           | PHP 7           |
| Zend Framework | 1.12          | Fully Supported |
| Yii            | 2.0           | Fully Supported |
| CodeIgniter    | 3.x           | _Coming Soon_   |
| Drupal         |               | _Coming Soon_   |
| Magento        | 2             | _Coming Soon_   |
| Phalcon        | 1.3, 3.4      | _Coming Soon_   |
| Slim           | 2.x           | _Coming Soon_   |
| Yii            | 1.1           | _Coming Soon_   |

Don’t see your desired frameworks? Datadog is continually adding additional support. Check with the [Datadog team][11] for help.

#### CLI Library Compatibility

Tracing from the CLI SAPI is disabled by default. To enable tracing of PHP CLI scripts, set `DD_TRACE_CLI_ENABLED=true`.

| Module          | Versions | Support Type    |
|:----------------|:---------|:----------------|
| CakePHP Console | 2.x      | Fully Supported |
| Laravel Artisan | 5.x      | Fully Supported |
| Symfony Console |          | _Coming Soon_   |

Don’t see your desired CLI library? Datadog is continually adding additional support. Check with the [Datadog team][11] for help.

#### Datastore Compatibility

| Module                           | Versions                   | Support Type    |
|:---------------------------------|:---------------------------|:----------------|
| Amazon RDS (using PDO or MySQLi) | *(Any Supported PHP)*      | Fully Supported |
| Elasticsearch                    | 1.x                        | Fully Supported |
| Eloquent                         | Laravel supported versions | Fully Supported |
| Memcached                        | *(Any Supported PHP)*      | Fully Supported |
| MongoDB                          | 1.4.x                      | Fully Supported |
| MySQLi                           | *(Any Supported PHP)*      | Fully Supported |
| PDO (MySQL, PostgreSQL, MariaDB) | *(Any Supported PHP)*      | Fully Supported |
| Predis                           | 1.1                        | Fully Supported |
| AWS Couchbase                    | AWS PHP SDK 3              | _Coming Soon_   |
| AWS DynamoDB                     | AWS PHP SDK 3              | _Coming Soon_   |
| AWS ElastiCache                  | AWS PHP SDK 3              | _Coming Soon_   |
| Doctrine ORM                     | 2                          | _Coming Soon_   |
| ODBC                             | *(Any Supported PHP)*      | _Coming Soon_   |
| PHPredis                         | 4                          | _Coming Soon_   |
| Solarium                         | 4.2                        | _Coming Soon_   |

Don’t see your desired datastores? Datadog is continually adding additional support. Check with the [Datadog team][11] for help.

#### Library Compatibility

| Module     | Versions              | Support Type    |
|:-----------|:----------------------|:----------------|
| Curl       | *(Any Supported PHP)* | Fully Supported |
| Guzzle     | 5.x                   | Fully Supported |
| Guzzle     | 6.x                   | Fully Supported |
| Beanstalkd |                       | _Coming Soon_   |
| ReactPHP   |                       | _Coming Soon_   |

Don’t see your desired libraries? Datadog is continually adding additional support. Check with the [Datadog team][11] for help.

## Configuration

The PHP tracer can be configured using environment variables.

**Note**: If you use code auto-instrumentation (the recommended approach) be aware that the instrumenting code is executed before any user code. As a result, the environment variables below must be set at the server level and be available to the PHP runtime before any user code is executed. For example, `putenv()` and `.env` files would not work.

### Apache

Set using [`SetEnv`][12] from the server config, virtual host, directory, or **.htaccess** file.

```text
SetEnv DD_TRACE_DEBUG true
```

### NGINX

Set using [`fastcgi_param`][13] from the `http`, `server`, or `location` contexts.

```text
fastcgi_param DD_TRACE_DEBUG true;
```

### PHP CLI server

Set in the command line to start the server.

```text
DD_TRACE_DEBUG=true php -S localhost:8888
```

### Environment Variable Configuration

| Env variable                              | Default     | Note                                                                                                                                           |
|-------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_AGENT_HOST`                           | `localhost` | The Agent host name                                                                                                                            |
| `DD_AUTOFINISH_SPANS`                     | `false`     | Whether spans are automatically finished when the tracer is flushed                                                                            |
| `DD_DISTRIBUTED_TRACING`                  | `true`      | Whether to enable distributed tracing                                                                                                          |
| `DD_INTEGRATIONS_DISABLED`                | `null`      | CSV list of disabled extensions; e.g., `curl,mysqli`                                                                                           |
| `DD_PRIORITY_SAMPLING`                    | `true`      | Whether to enable priority sampling                                                                                                            |
| `DD_TRACE_SAMPLE_RATE`                    | `1.0`       | The sampling rate for the traces. Between `0.0` and `1.0` (default). It was `DD_SAMPLING_RATE` before v0.36.0                                  |
| `DD_SERVICE_NAME`                         | `none`      | The default app name                                                                                                                           |
| `DD_TRACE_AGENT_ATTEMPT_RETRY_TIME_MSEC`  | `5000`      | IPC-based configurable circuit breaker retry time (in milliseconds)                                                                            |
| `DD_TRACE_AGENT_CONNECT_TIMEOUT`          | `100`       | Maximum time the allowed for Agent connection setup (in milliseconds)                                                                          |
| `DD_TRACE_AGENT_CONNECT_TIMEOUT`          | `100`       | The Agent connection timeout (in milliseconds)                                                                                                 |
| `DD_TRACE_AGENT_MAX_CONSECUTIVE_FAILURES` | `3`         | IPC-based configurable circuit breaker max consecutive failures                                                                                |
| `DD_TRACE_AGENT_PORT`                     | `8126`      | The Agent port number                                                                                                                          |
| `DD_TRACE_AGENT_TIMEOUT`                  | `500`       | The Agent request transfer timeout (in milliseconds)                                                                                           |
| `DD_TRACE_ANALYTICS_ENABLED`              | `false`     | Flag to enable app analytics for relevant spans in web integrations                                                                            |
| `DD_TRACE_CLI_ENABLED`                    | `false`     | Enable tracing of PHP scripts from the CLI                                                                                                     |
| `DD_TRACE_DEBUG`                          | `false`     | Enable [debug mode](#custom-url-to-resource-mapping) for the tracer                                                                            |
| `DD_TRACE_ENABLED`                        | `true`      | Enable the tracer globally                                                                                                                     |
| `DD_TRACE_GLOBAL_TAGS`                    | `none`      | Tags to be set on all spans: e.g.: `key1:value1,key2:value2`                                                                                   |
| `DD_TRACE_NO_AUTOLOADER`                  | `false`     | Set to `true` to enable auto instrumentation for applications that do not use an autoloader                                                    |
| `DD_TRACE_REPORT_HOSTNAME`                | `false`     | Enable hostname reporting on the root span                                                                                                     |
| `DD_TRACE_RESOURCE_URI_MAPPING`           | `null`      | CSV of URL-to-resource-name mapping rules; e.g., `/foo/*,/bar/$*/baz`; [see "Custom URL-To-Resource Mapping"](#custom-url-to-resource-mapping) |
| `DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED`  | `false`     | Enable URL's as resource names; [see "Map Resource Names To Normalized URI"](#map-resource-names-to-normalized-uri)                            |
| `DD_<INTEGRATION>_ANALYTICS_ENABLED`      | `false`     | Flag to enable app analytics for relevant spans in a specific integration                                                                      |

#### Map Resource Names To Normalized URI

<div class="alert alert-warning">
This functionality is in public beta. For assistance, contact <a href="/help">Datadog Support</a>.
</div>

When `DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED=true`, the URL is used to form the trace resource name in the format `<HTTP_REQUEST_METHOD> <NORMALIZED_URL>`, with the query string removed from the URL. This allows better visibility in any custom framework that is not automatically instrumented by normalizing the URLs and grouping together generic endpoints under one resource.

| HTTP Request                       | Resource Name |
|:-----------------------------------|:--------------|
| **GET** request to `/foo?a=1&b=2`  | `GET /foo`    |
| **POST** request to `/bar?foo=bar` | `POST /bar`   |

Numeric IDs, UUIDs (with and without dashes), and 32-to-512-bit hexadecimal hashes are automatically replaced with a `?` character.

| URL (GET request)                              | Resource Name      |
|:-----------------------------------------------|:-------------------|
| `/user/123/show`                               | `GET /user/?/show` |
| `/widget/b7a992e0-3300-4030-8617-84553b11c993` | `GET /widget/?`    |
| `/api/v2/b7a992e033004030861784553b11c993/123` | `GET /api/v2/?/?`  |
| `/book/0dbf3596`                               | `GET /book/?`      |

##### Custom URL-To-Resource Mapping

When [URL resource names are enabled](#map-resource-names-to-normalized-uri), custom URL mapping is configured via `DD_TRACE_RESOURCE_URI_MAPPING` which accepts a CSV list of mapping rules. The wildcards `*` and `$*` are supported, so `DD_TRACE_RESOURCE_URI_MAPPING=/foo/*,/bar/$*/baz`. In this context, `*` is a greedy match with a replacement character `?`, and `$*` performs a greedy match without replacement

Rules are applied in the same order as they appear in `DD_TRACE_RESOURCE_URI_MAPPING`. Less greedy rules should appear in the list before more greedy rules, e.g. `/foo/$*/bar,/foo/*`

The `*` wildcard is replaced with `?`.

| Mapping Rule | URL (GET request)  | Resource Name    |
|:-------------|:-------------------|:-----------------|
| `/foo/*`     | `/foo/bar`         | `GET /foo/?`     |
| `/foo/*/bar` | `/foo/baz/faz/bar` | `GET /foo/?/bar` |
| `/foo-*-bar` | `/foo-secret-bar`  | `GET /foo-?-bar` |

The `$*` wildcard matches without replacement.

| Mapping Rule        | URL (GET request)           | Resource Name              |
|:--------------------|:----------------------------|:---------------------------|
| `/state/$*/show`    | `/state/kentucky/show`      | `GET /state/kentucky/show` |
| `/widget/*/type/$*` | `/widget/foo-id/type/green` | `GET /widget/?/type/green` |

## Upgrading

To upgrade the PHP tracer, [download the latest release][6] and follow the same steps as [installing the extension](#install-the-extension).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization
[2]: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
[3]: /tracing/send_traces
[4]: /tracing/setup/docker
[5]: /agent/kubernetes/daemonset_setup/#trace-collection
[6]: https://github.com/DataDog/dd-trace-php/releases/latest
[7]: https://app.datadoghq.com/apm/services
[8]: https://raw.githubusercontent.com/DataDog/dd-trace-php/master/src/dd-doctor.php
[9]: /tracing/faq/php-tracer-manual-installation
[10]: /tracing/setup/php/#environment-variable-configuration
[11]: /help
[12]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[13]: http://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_param
