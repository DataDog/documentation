---
title: Configuring the PHP Tracing Library
code_lang: php
type: multi-code-lang
code_lang_weight: 40
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-php-performance/"
  tag: "Blog"
  text: "PHP monitoring with Datadog APM and distributed tracing"
- link: "https://github.com/DataDog/dd-trace-php"
  tag: "Source Code"
  text: "Source code"
- link: "/tracing/trace_collection/trace_context_propagation/"
  tag: "Documentation"
  text: "Propagating trace context"
- link: "/tracing/glossary/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "/tracing/"
  tag: "Documentation"
  text: "Advanced Usage"
- link: "/opentelemetry/interoperability/environment_variable_support"
  tag: "Documentation"
  text: "OpenTelemetry Environment Variable Configurations"
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired, including setting up [Unified Service Tagging][1].

{{% apm-config-visibility %}}

The PHP tracer can be configured using environment variables and INI settings.

INI settings can be configured globally, for example, in the `php.ini` file, or for a specific web server or virtual host.

**Note**: If you use code auto-instrumentation (the recommended approach), be aware that the instrumenting code is executed before any user code. As a result, the environment variables and the INI settings below must be set at the server level and be available to the PHP runtime before any user code is executed. For example, `putenv()` and `.env` files do not work.

## Apache

For Apache with PHP-FPM, use the `env[]` directive in your `www.conf` configuration file to configure the PHP tracer. For example:

```
; Example of passing the host environment variable SOME_ENV
; to the PHP process as DD_AGENT_HOST
env[DD_AGENT_HOST] = $SOME_ENV
; Example of passing the value 'my-app' to the PHP
; process as DD_SERVICE
env[DD_SERVICE] = my-app
; Or using the equivalent INI setting
php_value datadog.service my-app
```

**Note:** By default, PHP-FPM does not inherit environment variables from the host system when `clear_env=yes` is set in `www.conf`. If you need to use environment variables set on the host, you must explicitly define them using the `env[]` directive.

For Apache without PHP-FPM (mod_php setups), you can set environment variables directly in the server config, virtual host, directory, or `.htaccess` file using [`SetEnv`][2]:

```text
# In a virtual host configuration as an environment variable
SetEnv DD_TRACE_DEBUG 1
# In a virtual host configuration as an INI setting
php_value datadog.service my-app
```

## NGINX and PHP-FPM

<div class="alert alert-danger">
PHP-FPM does not support the value <code>false</code> in <code>env[...]</code> directives. Use <code>1</code> in place of <code>true</code> and <code>0</code> in place of <code>false</code>.
</div>

For NGINX, use the `env` directive in the php-fpm's `www.conf` file, for example:

```
; Example of passing the host environment variable SOME_ENV
; to the PHP process as DD_AGENT_HOST
env[DD_AGENT_HOST] = $SOME_ENV
; Example of passing the value 'my-app' to the PHP
; process as DD_SERVICE
env[DD_SERVICE] = my-app
; Or using the equivalent INI setting
php_value[datadog.service] = my-app
```

**Note**: If you have enabled APM for your NGINX server, make sure you have properly configured the `opentracing_fastcgi_propagate_context` setting for distributed tracing to properly work. See [NGINX APM configuration][3] for more details.

## PHP CLI server

Set in the command line to start the server.

```text
DD_TRACE_DEBUG=1 php -d datadog.service=my-app -S localhost:8888
```

## Configurations keys

The previous version of this configuration documentation is still available at [Configuring the PHP Tracing Library (legacy)][23].

{{< partial name="apm/registry-config-list.html" >}}

#### Integration names

The table below specifies the default service names for each integration. Change the service names with `DD_SERVICE_MAPPING`.

Use the name when setting integration-specific configuration such as, `DD_TRACE_<INTEGRATION>_ENABLED`, for example: Laravel is `DD_TRACE_LARAVEL_ENABLED`.

| Integration       | Service Name       |
|-------------------|--------------------|
| AMQP              | `amqp`             |
| CakePHP           | `cakephp`          |
| CodeIgniter       | `codeigniter`      |
| cURL              | `curl`             |
| ElasticSearch     | `elasticsearch`    |
| Eloquent          | `eloquent`         |
| Guzzle            | `guzzle`           |
| Laminas           | `laminas`          |
| Laravel           | `laravel`          |
| Laravel Queue     | `laravelqueue`     |
| Lumen             | `lumen`            |
| Memcache          | `memcache`         |
| Memcached         | `memcached`        |
| Mongo             | `mongo`            |
| MongoDB           | `mongodb`          |
| Mysqli            | `mysqli`           |
| Nette             | `nette`            |
| OpenAI            | `openai`           |
| PCNTL             | `pcntl`            |
| PDO               | `pdo`              |
| PhpRedis          | `phpredis`         |
| Predis            | `predis`           |
| Psr18             | `psr18`            |
| Roadrunner        | `roadrunner`       |
| Sql Server        | `sqlsrv`           |
| Symfony           | `symfony`          |
| Symfony Messenger | `symfonymessenger` |
| WordPress         | `wordpress`        |
| Yii               | `yii`              |
| ZendFramework     | `zendframework`    |

## Map resource names to normalized URI

<div class="alert alert-danger">
Note that setting any of the following: <code>DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX</code>, <code>DD_TRACE_RESOURCE_URI_MAPPING_INCOMING</code>, and <code>DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING</code> will opt-in to the new resource normalization approach and any value in <code>DD_TRACE_RESOURCE_URI_MAPPING</code> will be ignored.
</div>

For HTTP server and client integrations, the URL is used to form the trace resource name in the format `<HTTP_REQUEST_METHOD> <NORMALIZED_URL>`, with the query string removed from the URL. This allows better visibility in any custom framework that is not automatically instrumented by normalizing the URLs and grouping together generic endpoints under one resource.

| HTTP Request                       | Resource Name |
| :--------------------------------- | :------------ |
| **GET** request to `/foo?a=1&b=2`  | `GET /foo`    |
| **POST** request to `/bar?foo=bar` | `POST /bar`   |

Numeric IDs, UUIDs (with and without dashes), and 32-to-512-bit hexadecimal hashes are automatically replaced with a `?` character.

| URL (GET request)                              | Resource Name      |
| :--------------------------------------------- | :----------------- |
| `/user/123/show`                               | `GET /user/?/show` |
| `/widget/b7a992e0-3300-4030-8617-84553b11c993` | `GET /widget/?`    |
| `/api/v2/b7a992e033004030861784553b11c993/123` | `GET /api/v2/?/?`  |
| `/book/0dbf3596`                               | `GET /book/?`      |

You can turn this functionality OFF using `DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED=0`.

### Custom URL-to-resource mapping

There are a few cases that are not covered by the automatic normalization that is applied.

| URL (GET request)                | Expected Resource Name        |
| :------------------------------- | :---------------------------- |
| `/using/prefix/id123/for/id`     | `GET /using/prefix/?/for/id`  |
| `/articles/slug-of-title`        | `GET /articles/?`             |
| `/cities/new-york/rivers`        | `GET /cities/?/rivers`        |
| `/nested/cities/new-york/rivers` | `GET /nested/cities/?/rivers` |

There are two classes of scenarios that are not covered by automatic normalization:

  - The path fragment to normalize has a reproducible pattern and can be present in any part of the url, for example `id<number>` in the example above. This scenario is covered by the setting `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` below.
  - The path fragment can be anything, and the previous path fragment indicates that a value has to be normalized. For example `/cities/new-york` tells us that `new-york` has to be normalized as it is the name of a city. This scenario is covered by settings `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` and `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` for incoming and outgoing requests respectively.

##### `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`

This setting is a CSV of one or more regular expressions that are applied to every path fragment independently. For example, setting `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` to `^id\d+$` for a path of `/using/prefix/id123/for/id` applies the regex to each of the fragments: `using`, `prefix`, `id123`, `for`, and `id`.

| URL                          | regex     | Expected Resource Name       |
| :--------------------------- | :-------- | :--------------------------- |
| `/using/prefix/id123/for/id` | `^id\d+$` | `GET /using/prefix/?/for/id` |

Note that because the format of this variable is a CSV, the comma character `,` is not escaped and cannot be used in your regular expressions.

##### `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` and `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`

This setting is a CSV of patterns that can contain a wildcard `*`. For example, adding the pattern `cities/*` means that every time the fragment `cities` is found while analyzing a URL, then the next fragment, if any, will be replaced with `?`. Patterns are applied at any depth, so applying the following rule will both normalize `/cities/new-york` and `/nested/cities/new-york` in the table above.

Patterns can be applied to a part of a specific fragment. For example `path/*-fix` would normalize the url `/some/path/changing-fix/nested` to `/some/path/?-fix/nested`

Note that `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` applies to only incoming requests (for example web frameworks) while `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` only applies to outgoing requests (for example `curl` and `guzzle` requests).

##### `open_basedir` restrictions

When [`open_basedir`][9] setting is used, then `/opt/datadog-php` should be added to the list of allowed directories.
When the application runs in a docker container, the path `/proc/self` should also be added to the list of allowed directories.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[3]: /tracing/trace_collection/proxy_setup/?tab=nginx
[4]: /profiler/enabling/php/
[5]: https://github.com/mind04/mod-ruid2
[6]: /tracing/trace_pipeline/ingestion_mechanisms/
[7]: https://github.com/openzipkin/b3-propagation
[8]: https://github.com/openzipkin/b3-propagation#single-header
[9]: https://www.php.net/manual/en/ini.core.php#ini.open-basedir
[10]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format
[11]: /tracing/trace_collection/trace_context_propagation/
[13]: /agent/configuration/network/#configure-ports
[14]: /tracing/guide/trace-php-cli-scripts/#long-running-cli-scripts
[15]: /tracing/guide/trace-php-cli-scripts/
[16]: /tracing/configure_data_security#telemetry-collection
[17]: /tracing/other_telemetry/connect_logs_and_traces/php
[18]: /tracing/trace_collection/otel_instrumentation/php/
[19]: /tracing/trace_collection/compatibility/php/
[20]: /opentelemetry/interoperability/environment_variable_support
[21]: /tracing/trace_collection/library_config/#traces
[22]: https://www.w3.org/TR/baggage/
[23]: /tracing/trace_collection/library_config/php/
