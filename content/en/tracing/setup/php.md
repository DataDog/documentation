---
title: Tracing PHP Applications
kind: documentation
aliases:
- /tracing/languages/php
- /agent/apm/php/
- /tracing/php/
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-php-performance/"
  tag: "Blog"
  text: "PHP monitoring with Datadog APM and distributed tracing"
- link: "https://github.com/DataDog/dd-trace-php"
  tag: "GitHub"
  text: "Source code"
- link: "/tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "/tracing/"
  tag: "Documentation"
  text: "Advanced Usage"
---

## Installation and Getting Started

If you already have a Datadog account you can find [step-by-step instructions][1] in our in-app guides for either host-based or container-based set ups.

For descriptions of terminology used in APM, take a look at the [official documentation][2].

For details about open-source contributions to the PHP tracer, refer to the [contributing guide][3].

### Setup the Datadog Agent

The PHP APM tracer sends trace data through the Datadog Agent.

[Install and configure the Datadog Agent][4]. See the additional documentation for [tracing Docker applications][5] or [Kubernetes applications][6].

For Agent version [7.18.0][7] and above, APM is enabled by default for all environments without further action.
If you are running an older version of the agent, make sure the Agent has **[APM enabled][4]**.

### Install the extension

Install the PHP extension using one of the [precompiled packages for supported distributions][8].

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

Restart PHP (PHP-FPM or the Apache SAPI) and then visit a tracing-enabled endpoint of your application. View the [APM UI][9] to see the traces.

**Note**: It might take a few minutes before traces appear in the UI. If traces still do not appear after a few minutes, [run the dd-doctor.php diagnostic script][10] from the host machine to help identify any issues.

If you can't find your distribution, you can [manually install][11] the PHP extension.

## Automatic Instrumentation

Tracing is automatically enabled by default. Once the extension is installed, **ddtrace** traces your application and sends traces to the Agent.

Datadog supports all web frameworks out of the box. Automatic instrumentation works by modifying PHP's runtime to wrap certain functions and methods to trace them. The PHP tracer supports automatic instrumentation for [several libraries](#library-compatibility).

Automatic instrumentation captures:

* Method execution time
* Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
* Unhandled exceptions, including stacktraces if available
* A total count of traces (e.g., web requests) flowing through the system

**Note**: If your application does not use Composer nor an autoloader registered with `spl_autoload_register()`, set the environment variable, `DD_TRACE_NO_AUTOLOADER=true`, to enable automatic instrumentation.

## Change Agent Hostname

Configure your application level tracers to submit traces to a custom Agent hostname:

The PHP tracer automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`.

See [tracer configuration][12] for more information on how to set these variables.

## Compatibility

PHP APM supports the following PHP versions:

| Version | Support type    |
|:--------|:----------------|
| 7.4.x   | Fully Supported |
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
| fpm-fcgi       | Fully Supported |
| cgi-fcgi       | Fully Supported |

### Integrations

#### Web Framework Compatibility

By default Datadog **supports all PHP web frameworks** out of the box, which allows you to see traces for spans of supported libraries—for example: database and HTTP clients.

The following table enumerates some of the frameworks and versions Datadog succesfully traces.

**Web frameworks**:

| Module         | Versions      | Support Type               |
|:---------------|:--------------|:---------------------------|
| CakePHP        | 2.x           | All supported PHP versions |
| CodeIgniter    | 2.x, 3.x      | PHP 7+                     |
| Laravel        | 4.2, 5.x, 6.x | All supported PHP versions |
| Lumen          | 5.2+          | All supported PHP versions |
| Slim           | 3.x           | All supported PHP versions |
| Symfony        | 3.3, 3.4, 4.x | All supported PHP versions |
| WordPress      | 4.x, 5.x      | PHP 7+                     |
| Zend Framework | 1.12          | All supported PHP versions |
| Yii            | 1.1, 2.0      | All supported PHP versions |
| Drupal         |               | All supported PHP versions |
| Magento        | 2             | All supported PHP versions |
| Phalcon        | 1.3, 3.4      | All supported PHP versions |
| Slim           | 2.x           | All supported PHP versions |
| Neos Flow      | 1.1           | All supported PHP versions |
| FuelPHP        | 1.1           | PHP 7+                     |

Note that even if you don't see your web framework in this list, it is supported out of the box with the latest release of the tracer.

Want to see more span metadata and framework internals? Datadog is continously adding more support for in-depth tracing for PHP web-frameworks. Check with the [Datadog team][13] for help.

#### CLI Library Compatibility

Tracing from the CLI SAPI is disabled by default. To enable tracing of PHP CLI scripts, set `DD_TRACE_CLI_ENABLED=true`.

| Module          | Versions | Support Type    |
|:----------------|:---------|:----------------|
| CakePHP Console | 2.x      | Fully Supported |
| Laravel Artisan | 5.x      | Fully Supported |
| Symfony Console |          | _Coming Soon_   |

Don’t see your desired CLI library? Datadog is continually adding additional support. Check with the [Datadog team][13] for help.

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

Don’t see your desired datastores? Datadog is continually adding additional support. Check with the [Datadog team][13] for help.

#### Library Compatibility

| Module     | Versions              | Support Type    |
|:-----------|:----------------------|:----------------|
| Curl       | *(Any Supported PHP)* | Fully Supported |
| Guzzle     | 5.x                   | Fully Supported |
| Guzzle     | 6.x                   | Fully Supported |
| Beanstalkd |                       | _Coming Soon_   |
| ReactPHP   |                       | _Coming Soon_   |

Don’t see your desired libraries? Datadog is continually adding additional support. Check with the [Datadog team][13] for help.

## Configuration

The PHP tracer can be configured using environment variables.

**Note**: If you use code auto-instrumentation (the recommended approach) be aware that the instrumenting code is executed before any user code. As a result, the environment variables below must be set at the server level and be available to the PHP runtime before any user code is executed. For example, `putenv()` and `.env` files would not work.

### Apache

For Apache with php-fpm, use the `env` directory in your `www.conf` configuration file to configure the php tracer, for example:

```
env[DD_AGENT_HOST] = $FROM_HOST_ENV
env[DD_TRACE_DEBUG] = true
```

Alternatively, you can use [`SetEnv`][14] from the server config, virtual host, directory, or `.htaccess` file.

```text
SetEnv DD_TRACE_DEBUG true
```

### NGINX

For NGINX, use the `env` directory in the php-fpm's `www.conf` file, for example:

```
env[DD_AGENT_HOST] = $FROM_HOST_ENV
env[DD_TRACE_DEBUG] = true
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
| `DD_INTEGRATIONS_DISABLED`                | `null`      | A CSV list of integrations to disable, for example: `curl,mysqli` (see [Integration names](#integration-names)).                                      |
| `DD_PRIORITY_SAMPLING`                    | `true`      | Whether to enable priority sampling                                                                                                            |
| `DD_SERVICE_NAME`                         | `null`      | The default app name                                                                                                                           |
| `DD_SERVICE_MAPPING`                      | `null`      | Change the default name of an APM integration. Rename one or more integrations at a time, for example: `DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db` (see [Integration names](#integration-names)). |
| `DD_TRACE_AGENT_ATTEMPT_RETRY_TIME_MSEC`  | `5000`      | IPC-based configurable circuit breaker retry time (in milliseconds)                                                                            |
| `DD_TRACE_AGENT_CONNECT_TIMEOUT`          | `100`       | Maximum time the allowed for Agent connection setup (in milliseconds)                                                                          |
| `DD_TRACE_AGENT_CONNECT_TIMEOUT`          | `100`       | The Agent connection timeout (in milliseconds)                                                                                                 |
| `DD_TRACE_AGENT_MAX_CONSECUTIVE_FAILURES` | `3`         | IPC-based configurable circuit breaker max consecutive failures                                                                                |
| `DD_TRACE_AGENT_PORT`                     | `8126`      | The Agent port number                                                                                                                          |
| `DD_TRACE_AGENT_TIMEOUT`                  | `500`       | The Agent request transfer timeout (in milliseconds)                                                                                           |
| `DD_TRACE_ANALYTICS_ENABLED`              | `false`     | Flag to enable app analytics for relevant spans in web integrations                                                                            |
| `DD_TRACE_AUTO_FLUSH_ENABLED`             | `false`     | Automatically flush the tracer when all the spans are closed; set to `true` in conjunction with `DD_TRACE_GENERATE_ROOT_SPAN=0` to trace long-running processes |
| `DD_TRACE_CLI_ENABLED`                    | `false`     | Enable tracing of PHP scripts from the CLI                                                                                                     |
| `DD_TRACE_DEBUG`                          | `false`     | Enable [debug mode](#custom-url-to-resource-mapping) for the tracer                                                                            |
| `DD_TRACE_ENABLED`                        | `true`      | Enable the tracer globally                                                                                                                     |
| `DD_TRACE_GENERATE_ROOT_SPAN`             | `true`      | Automatically generate a top-level span; set to `false` in conjunction with `DD_TRACE_AUTO_FLUSH_ENABLED=1` to trace long-running processes    |
| `DD_TRACE_GLOBAL_TAGS`                    | `null`      | Tags to be set on all spans, for example: `key1:value1,key2:value2`.                                                                                 |
| `DD_TRACE_HTTP_CLIENT_SPLIT_BY_DOMAIN`    | `false`     | Set the service name of HTTP requests to `host-<hostname>`, for example a `curl_exec()` call to `https://datadoghq.com` has the service name `host-datadoghq.com` instead of the default service name of `curl`. |
| `DD_TRACE_MEASURE_COMPILE_TIME`           | `true`      | Record the compile time of the request (in milliseconds) onto the top-level span                                                               |
| `DD_TRACE_NO_AUTOLOADER`                  | `false`     | Set to `true` to enable auto instrumentation for applications that do not use an autoloader                                                    |
| `DD_TRACE_REPORT_HOSTNAME`                | `false`     | Enable hostname reporting on the root span                                                                                                     |
| `DD_TRACE_RESOURCE_URI_MAPPING`           | `null`      | CSV of URL-to-resource-name mapping rules, for example: `/foo/*,/bar/$*/baz` (see ["Custom URL-To-Resource Mapping"](#custom-url-to-resource-mapping)) |
| `DD_TRACE_SAMPLE_RATE`                    | `1.0`       | The sampling rate for the traces (defaults to: between `0.0` and `1.0`). For versions <0.36.0, this parameter is `DD_SAMPLING_RATE`.                                  |
| `DD_TRACE_SAMPLING_RULES`                 | `null`      | A JSON encoded string to configure the sampling rate. Examples: Set the sample rate to 20%: `[{"sample_rate": 0.2}]`. Set the sample rate to 10% for services starting with 'a' and span name 'b' and set the sample rate to 20% for all other services: `[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]` (see [Integration names](#integration-names)). |
| `DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED`  | `true`      | Enable URL's as resource names (see [Map resource names to normalized URI](#map-resource-names-to-normalized-uri)).                            |
| `DD_<INTEGRATION>_ANALYTICS_ENABLED`      | `false`     | A flag to enable app analytics for relevant spans in a specific integration (see [Integration names](#integration-names)).                       |
| `DD_<INTEGRATION>_ANALYTICS_SAMPLE_RATE`  | `1.0`       | Set the app analytics sample rate for relevant spans in a specific integration (see [Integration names](#integration-names)).                  |

#### Integration names

The table below specifies the default service names for each integration. Change the service names with `DD_SERVICE_MAPPING`.

Use the name when setting integration-specific configuration such as, `DD_<INTEGRATION>_ANALYTICS_ENABLED`, for example: Laravel is `DD_LARAVEL_ANALYTICS_ENABLED`.

| Integration       | Service Name      |
|-------------------|-------------------|
| CakePHP           | `cakephp`         |
| CodeIgniter       | `codeigniter`     |
| cURL              | `curl`            |
| ElasticSearch     | `elasticsearch`   |
| Eloquent          | `eloquent`        |
| Guzzle            | `guzzle`          |
| Laravel           | `laravel`         |
| Lumen             | `lumen`           |
| Memcached         | `memcached`       |
| Mongo             | `mongo`           |
| Mysqli            | `mysqli`          |
| PDO               | `pdo`             |
| Predis            | `predis`          |
| Slim              | `slim`            |
| Symfony           | `symfony`         |
| WordPress         | `wordpress`       |
| Yii               | `yii`             |
| ZendFramework     | `zendframework`   |

#### Map resource names to normalized URI

By default, the URL is used to form the trace resource name in the format `<HTTP_REQUEST_METHOD> <NORMALIZED_URL>`, with the query string removed from the URL. This allows better visibility in any custom framework that is not automatically instrumented by normalizing the URLs and grouping together generic endpoints under one resource.

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

You can turn this functionality OFF using `DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED=false`.

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

To upgrade the PHP tracer, [download the latest release][8] and follow the same steps as [installing the extension](#install-the-extension).

**Note**: If you are using second level caching in OPcache by setting the parameter `opcache.file_cache`, remove the cache folder.

## Removing

To remove the PHP tracer:

1. For php-fpm, stop the php-fpm service, otherwise stop the Apache web server.
2. Unlink files `98-ddtrace.ini` and `99-ddtrace-custom.ini` from your php configuration folder.
3. For php-fpm, restart php-fpm service, otherwise restart the Apache web server.

**Note**: If you are using second level caching in OPcache by setting the parameter `opcache.file_cache`, remove the cache folder.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/install
[2]: /tracing/visualization/
[3]: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
[4]: /tracing/send_traces/
[5]: /tracing/setup/docker/
[6]: /agent/kubernetes/apm/
[7]: https://github.com/DataDog/datadog-agent/releases/tag/7.18.0
[8]: https://github.com/DataDog/dd-trace-php/releases/latest
[9]: https://app.datadoghq.com/apm/services
[10]: https://raw.githubusercontent.com/DataDog/dd-trace-php/master/src/dd-doctor.php
[11]: /tracing/faq/php-tracer-manual-installation
[12]: /tracing/setup/php/#environment-variable-configuration
[13]: /help
[14]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
