---
title: Tracing PHP Applications
kind: documentation
aliases:
- /tracing/languages/php
- /agent/apm/php/
- /tracing/php/
- /tracing/setup/php
- /tracing/setup_overview/php
code_lang: php
type: multi-code-lang
code_lang_weight: 40
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
## Compatibility requirements

For a full list of supported libraries and language versions, visit the [Compatibility Requirements][1] page.

## Installation and getting started

### Follow the in-app documentation (recommended)

Follow the [Quickstart instructions][2] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env`, and `version` tags.
- Enable ingesting 100% of traces during setup.

For descriptions of terminology used in APM, take a look at the [official documentation][3].

For details about open-source contributions to the PHP tracer, refer to the [contributing guide][4].

### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your now instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace traffic at `localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

{{< tabs >}}
{{% tab "Containers" %}}

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][1].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. After having instrumented your application, the tracing client sends traces to `localhost:8126` by default.  If this is not the correct host and port change it by setting the below env variables:

    `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`.

    See [environment variable configuration](#environment-variable-configuration) for more information on how to set these variables.
{{< site-region region="us3,eu,gov" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][1] documentation.


[1]: /tracing/serverless_functions/
{{% /tab %}}
{{% tab "Other Environments" %}}

Tracing is available for a number of other environments, such as  [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3], and [Azure App Services Extension][4].

For other environments, please refer to the [Integrations][5] documentation for that environment and [contact support][6] if you are encountering any setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[4]: /infrastructure/serverless/azure_app_services/#overview
[5]: /integrations/
[6]: /help/
{{% /tab %}}
{{< /tabs >}}


### Install the extension

Install the PHP extension using one of the [precompiled packages for supported distributions][5].

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

Restart PHP (PHP-FPM or the Apache SAPI) and then visit a tracing-enabled endpoint of your application. View the [APM UI][6] to see the traces.

**Note**: It might take a few minutes before traces appear in the UI. If traces still do not appear after a few minutes, [create a `phpinfo()` page][7] from the host machine and scroll down to the "ddtrace" section. Failed diagnostic checks will appear here to help identify any issues.

If you can't find your distribution, you can [manually install][8] the PHP extension.

## Automatic instrumentation

Tracing is automatically enabled by default. Once the extension is installed, **ddtrace** traces your application and sends traces to the Agent.

Datadog supports all web frameworks out of the box. Automatic instrumentation works by modifying PHP's runtime to wrap certain functions and methods to trace them. The PHP tracer supports automatic instrumentation for several libraries.

Automatic instrumentation captures:

* Method execution time
* Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
* Unhandled exceptions, including stacktraces if available
* A total count of traces (e.g., web requests) flowing through the system

**Note**: If your application does not use Composer nor an autoloader registered with `spl_autoload_register()`, set the environment variable, `DD_TRACE_NO_AUTOLOADER=true`, to enable automatic instrumentation.

## Configuration

The PHP tracer can be configured using environment variables.

**Note**: If you use code auto-instrumentation (the recommended approach) be aware that the instrumenting code is executed before any user code. As a result, the environment variables below must be set at the server level and be available to the PHP runtime before any user code is executed. For example, `putenv()` and `.env` files would not work.

### Apache

For Apache with php-fpm, use the `env` directory in your `www.conf` configuration file to configure the php tracer, for example:

```
; Example of passing the host environment variable SOME_ENV
; to the PHP process as DD_AGENT_HOST
env[DD_AGENT_HOST] = $SOME_ENV
; Example of passing the value 'my-app' to the PHP
; process as DD_SERVICE
env[DD_SERVICE] = my-app
```

Alternatively, you can use [`SetEnv`][9] from the server config, virtual host, directory, or `.htaccess` file.

```text
SetEnv DD_TRACE_DEBUG true
```

### NGINX

For NGINX, use the `env` directive in the php-fpm's `www.conf` file, for example:

```
; Example of passing the host environment variable SOME_ENV
; to the PHP process as DD_AGENT_HOST
env[DD_AGENT_HOST] = $SOME_ENV
; Example of passing the value 'my-app' to the PHP
; process as DD_SERVICE
env[DD_SERVICE] = my-app
```

**Note**: If you have enabled APM for your NGINX server, make sure you have properly configured the `opentracing_fastcgi_propagate_context` setting for distributed tracing to properly work. See [NGINX APM configuration][10] for more details.

### PHP CLI server

Set in the command line to start the server.

```text
DD_TRACE_DEBUG=true php -S localhost:8888
```

### Environment variable configuration

`DD_AGENT_HOST`
: **Default**: `localhost` <br>
The Agent host name

`DD_AUTOFINISH_SPANS`
: **Default**: `false`<br>
Whether spans are automatically finished when the tracer is flushed

`DD_DISTRIBUTED_TRACING`
: **Default**: `true`<br>
Whether to enable distributed tracing

`DD_ENV`
: **Default**: `null`<br>
Set an application’s environment, for example: `prod`, `pre-prod`, `stage`. Added in version `0.47.0`.

`DD_PRIORITY_SAMPLING`
: **Default**: `true`<br>
Whether to enable priority sampling

`DD_SERVICE`
: **Default**: `null`<br>
The default app name. For versions <0.47.0 this is `DD_SERVICE_NAME`.

`DD_SERVICE_MAPPING`
: **Default**: `null`<br>
Change the default name of an APM integration. Rename one or more integrations at a time, for example: `DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db` (see [Integration names](#integration-names)).

`DD_TRACE_AGENT_ATTEMPT_RETRY_TIME_MSEC`
: **Default**: `5000`<br>
IPC-based configurable circuit breaker retry time (in milliseconds)

`DD_TRACE_AGENT_CONNECT_TIMEOUT`
: **Default**: `100`<br>
Maximum time the allowed for Agent connection setup (in milliseconds)

`DD_TRACE_AGENT_CONNECT_TIMEOUT`
: **Default**: `100`<br>
The Agent connection timeout (in milliseconds)

`DD_TRACE_AGENT_MAX_CONSECUTIVE_FAILURES`
: **Default**: `3`<br>
IPC-based configurable circuit breaker max consecutive failures

`DD_TRACE_AGENT_PORT`
: **Default**: `8126`<br>
The Agent port number

`DD_TRACE_AGENT_TIMEOUT`
: **Default**: `500`<br>
The Agent request transfer timeout (in milliseconds)

`DD_TRACE_AGENT_URL`
: **Default**: `null`<br>
The Agent URL; takes precedence over `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`; for example: `https://localhost:8126`. Added in version `0.47.1`.

`DD_TRACE_AUTO_FLUSH_ENABLED`
: **Default**: `false`<br>
Automatically flush the tracer when all the spans are closed; set to `true` in conjunction with `DD_TRACE_GENERATE_ROOT_SPAN=0` to trace long-running processes

`DD_TRACE_CLI_ENABLED`
: **Default**: `false`<br>
Enable tracing of PHP scripts from the CLI

`DD_TRACE_DEBUG`
: **Default**: `false`<br>
Enable [debug mode](#custom-url-to-resource-mapping) for the tracer

`DD_TRACE_ENABLED`
: **Default**: `true`<br>
Enable the tracer globally

`DD_TRACE_GENERATE_ROOT_SPAN`
: **Default**: `true`<br>
Automatically generate a top-level span; set to `false` in conjunction with `DD_TRACE_AUTO_FLUSH_ENABLED=1` to trace long-running processes

`DD_TAGS`
: **Default**: `null`<br>
Tags to be set on all spans, for example: `key1:value1,key2:value2`. Added in version `0.47.0`

`DD_TRACE_HEADER_TAGS`
: **Default**: `null`<br>
CSV of header names that are reported on the root span as tags.

`DD_TRACE_HTTP_CLIENT_SPLIT_BY_DOMAIN`
: **Default**: `false`<br>
Set the service name of HTTP requests to `host-<hostname>`, for example a `curl_exec()` call to `https://datadoghq.com` has the service name `host-datadoghq.com` instead of the default service name of `curl`.

`DD_TRACE_REDIS_CLIENT_SPLIT_BY_HOST`
: **Default**: `false`<br>
Set the service name of Redis clients operations to `redis-<hostname>`. Added in version `0.51.0`

`DD_TRACE_<INTEGRATION>_ENABLED`
: **Default**: `true`<br>
Enable or disable an integration; all integrations are enabled by default (see [Integration names](#integration-names)). For versions < `0.47.1`, this parameter is `DD_INTEGRATIONS_DISABLED` which takes a CSV list of integrations to disable, for example: `curl,mysqli`.

`DD_TRACE_MEASURE_COMPILE_TIME`
: **Default**: `true`<br>
Record the compile time of the request (in milliseconds) onto the top-level span

`DD_TRACE_NO_AUTOLOADER`
: **Default**: `false`<br>
Set to `true` to enable auto instrumentation for applications that do not use an autoloader

`DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`
: **Default**: `null`<br>
CSV of regexes that identifies path fragments corresponding to IDs (see [Map resource names to normalized URI](#map-resource-names-to-normalized-uri)).

`DD_TRACE_RESOURCE_URI_MAPPING_INCOMING`
: **Default**: `null`<br>
CSV of URI mappings to normalize resource naming for incoming requests (see [Map resource names to normalized URI](#map-resource-names-to-normalized-uri)).

`DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`
: **Default**: `null`<br>
CSV of URI mappings to normalize resource naming for outgoing requests (see [Map resource names to normalized URI](#map-resource-names-to-normalized-uri)).

`DD_TRACE_RETAIN_THREAD_CAPABILITIES`
: **Default**: `false`<br>
Works for Linux. Set to `true` to retain capabilities on Datadog background threads when you change the effective user ID. This option does not affect most setups, but some modules - to date Datadog is only aware of [Apache's mod-ruid2][11] - may invoke `setuid()` or similar syscalls, leading to crashes or loss of functionality as it loses capabilities.

**Note:** Enabling this option may compromise security. This option, standalone, does not pose a security risk. However, an attacker being able to exploit a vulnerability in PHP or web server may be able to escalate privileges with relative ease, if the web server or PHP were started with full capabilities, as the background threads will retain their original capabilities. Datadog recommends restricting the capabilities of the web server with the `setcap` utility.

`DD_TRACE_SAMPLE_RATE`
: **Default**: `1.0`<br>
The sampling rate for the traces (defaults to: between `0.0` and `1.0`). For versions < `0.36.0`, this parameter is `DD_SAMPLING_RATE`.

`DD_TRACE_SAMPLING_RULES`
: **Default**: `null`<br>
A JSON encoded string to configure the sampling rate. Examples: Set the sample rate to 20%: `'[{"sample_rate": 0.2}]'`. Set the sample rate to 10% for services starting with 'a' and span name 'b' and set the sample rate to 20% for all other services: `'[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]'` (see [Integration names](#integration-names)). Note that the JSON object **must** be included in single quotes (`'`) to avoid problems with escaping of the double quote (`"`) character.|

`DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED`
: **Default**: `true`<br>
Enable URL's as resource names (see [Map resource names to normalized URI](#map-resource-names-to-normalized-uri)).

`DD_VERSION`
: **Default**: `null`<br>
Set an application’s version in traces and logs, for example: `1.2.3`, `6c44da20`, `2020.02.13`. Added in version `0.47.0`.

#### Integration names

The table below specifies the default service names for each integration. Change the service names with `DD_SERVICE_MAPPING`.

Use the name when setting integration-specific configuration such as, `DD_TRACE_<INTEGRATION>_ENABLED`, for example: Laravel is `DD_TRACE_LARAVEL_ENABLED`.

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
| PhpRedis          | `phpredis`        |
| Predis            | `predis`          |
| Slim              | `slim`            |
| Symfony           | `symfony`         |
| WordPress         | `wordpress`       |
| Yii               | `yii`             |
| ZendFramework     | `zendframework`   |

#### Map resource names to normalized URI

<div class="alert alert-warning">
<strong>Deprecation notice:</strong> As of version <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.47.0">0.47.0</a> the legacy setting <code>DD_TRACE_RESOURCE_URI_MAPPING</code> is deprecated. It still works for the foreseeable future but it is strongly encouraged that you use the new settings outlined in this paragraph to avoid issues when legacy support is removed.

Note that setting any of the following: <code>DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX</code>, <code>DD_TRACE_RESOURCE_URI_MAPPING_INCOMING</code>, and <code>DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING</code> will opt-in to the new resource normalization approach and any value in <code>DD_TRACE_RESOURCE_URI_MAPPING</code> will be ignored.
</div>

For HTTP server and client integrations, the URL is used to form the trace resource name in the format `<HTTP_REQUEST_METHOD> <NORMALIZED_URL>`, with the query string removed from the URL. This allows better visibility in any custom framework that is not automatically instrumented by normalizing the URLs and grouping together generic endpoints under one resource.

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

##### Custom URL-to-resource mapping

There are a few cases that are not covered by the automatic normalization that is applied.

| URL (GET request)                | Expected Resource Name        |
|:---------------------------------|:------------------------------|
| `/using/prefix/id123/for/id`    | `GET /using/prefix/?/for/id`  |
| `/articles/slug-of-title`        | `GET /articles/?`             |
| `/cities/new-york/rivers`        | `GET /cities/?/rivers`        |
| `/nested/cities/new-york/rivers` | `GET /nested/cities/?/rivers` |

There are two classes of scenarios that are not covered by automatic normalization:

  - The path fragment to normalize has a reproducible pattern and can be present in any part of the url, for example `id<number>` in the example above. This scenario is covered by the setting `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` below.
  - The path fragment can be anything, and the previous path fragment indicates that a value has to be normalized. For example `/cities/new-york` tells us that `new-york` has to be normalized as it is the name of a city. This scenario is covered by settings `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` and `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` for incoming and outgoing requests respectively.

###### `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`

This setting is a CSV of one or more regular expressions that are applied to every path fragment independently. For example, setting `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` to `^id\d+$` for a path of `/using/prefix/id123/for/id` applies the regex to each of the fragments: `using`, `prefix`, `id123`, `for`, and `id`.

| URL                          | regex     | Expected Resource Name       |
|:-----------------------------|:----------|:-----------------------------|
| `/using/prefix/id123/for/id` | `^id\d+$` | `GET /using/prefix/?/for/id` |

Note that because the format of this variable is a CSV, the comma character `,` is not escaped and cannot be used in your regular expressions.

###### `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` and `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`

This setting is a CSV of patterns that can contain a wildcard `*`. For example, adding the pattern `cities/*` means that every time the fragment `cities` is found while analyzing a URL, then the next fragment, if any, will be replaced with `?`. Patterns are applied at any depth, so applying the following rule will both normalize `/cities/new-york` and `/nested/cities/new-york` in the table above.

Patterns can be applied to a part of a specific fragment. For example `path/*-fix` would normalize the url `/some/path/changing-fix/nested` to `/some/path/?-fix/nested`

Note that `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` applies to only incoming requests (for example web frameworks) while `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` only applies to outgoing requests (for example `curl` and `guzzle` requests).

### `open_basedir` restrictions

When [`open_basedir`][12] setting is used, then `/opt/datadog-php` should be added to the list of allowed directories.
When the application runs in a docker container, the path `/proc/self` should also be added to the list of allowed directories.

## Upgrading

To upgrade the PHP tracer, [download the latest release][5] and follow the same steps as [installing the extension](#install-the-extension).

Once the installation is completed restart PHP (PHP-FPM or the Apache SAPI).

**Note**: If you are using second level caching in OPcache by setting the parameter `opcache.file_cache`, remove the cache folder.

## Removing

To remove the PHP tracer:

1. For php-fpm, stop the php-fpm service, otherwise stop the Apache web server.
2. Unlink files `98-ddtrace.ini` and `99-ddtrace-custom.ini` from your php configuration folder.
3. For php-fpm, restart php-fpm service, otherwise restart the Apache web server.

**Note**: If you are using second level caching in OPcache by setting the parameter `opcache.file_cache`, remove the cache folder.

## Troubleshooting an application crash

In the unusual event of an application crash caused by the PHP tracer, typically because of a segmentation fault, the best thing to do is obtain a core dump or a Valgrind trace and contact Datadog support.

### Install debug symbols

For the core dumps to be readable, debug symbols for the PHP binaries have to be installed on the system that runs PHP.

To check if debug symbols are installed for PHP or PHP-FPM, use `gdb`.

Install `gdb`:

```
apt|yum install -y gdb
```

Run `gdb` with the binary of interest. For example for PHP-FPM:

```
gdb php-fpm
```

If the `gdb` output contains a line similar to the text below, then debug symbols are already installed.

```
...
Reading symbols from php-fpm...Reading symbols from /usr/lib/debug/path/to/some/file.debug...done.
...
```

If the `gdb` output contains a line similar to the text below, then debug symbols need to be installed:

```
...
Reading symbols from php-fpm...(no debugging symbols found)...done.
...
```


#### Centos

Install package `yum-utils` that provides the program `debuginfo-install`:

```
yum install -y yum-utils
```

Find the package name for your PHP binaries, it can vary depending on the PHP installation method:

```
yum list installed | grep php
```

Install debug symbols. For example for package `php-fpm`:

```
debuginfo-install -y php-fpm
```

**Note**: If the repository that provides the PHP binaries is not enabled by default, it can be enabled when running the `debuginfo-install` command. For example:

```
debuginfo-install --enablerepo=remi-php74 -y php-fpm
```

#### Debian

##### PHP installed from the Sury Debian DPA

If PHP was installed from the [Sury Debian DPA][13], debug symbols are already available from the DPA. For example, for PHP-FPM 7.2:

```
apt update
apt install -y php7.2-fpm-dbgsym
```

##### PHP installed from a different package

The Debian project maintains a wiki page with [instructions to install debug symbols][14].

Edit the file `/etc/apt/sources.list`:

```
# ... leave here all the pre-existing packages

# add a `deb` deb http://deb.debian.org/debian-debug/ $RELEASE-debug main
# For example for buster
deb http://deb.debian.org/debian-debug/ buster-debug main
```

Update `apt`:

```
apt update
```

Try canonical package names for debug symbols, first. For example, if the package name is `php7.2-fpm` try:

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

If debug symbols cannot be found, use the utility tool `find-dbgsym-packages`. Install the binary:

```
apt install -y debian-goodies
```

Attempt finding debug symbols from either the full path to the binary or the process id of a running process:

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

Install the resulting package name, if found:

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

#### Ubuntu

##### PHP installed from `ppa:ondrej/php`

If PHP was installed from the [`ppa:ondrej/php`][15], edit the apt source file `/etc/apt/sources.list.d/ondrej-*.list` by adding the `main/debug` component.

Before:

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main```

After:

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main main/debug```

Update and install the debug symbols. For example, for PHP-FPM 7.2:

```
apt update
apt install -y php7.2-fpm-dbgsym
```
##### PHP installed from a different package

Find the package name for your PHP binaries, it can vary depending on the PHP installation method:

```
apt list --installed | grep php
```

**Note**: In some cases `php-fpm` can be a metapackage that refers to the real package, for example `php7.2-fpm` in case of PHP-FPM 7.2. In this case the package name is the latter.

Try canonical package names for debug symbols, first. For example, if the package name is `php7.2-fpm` try:

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

If the `-dbg` and `-dbgsym` packages cannot be found, enable the `ddebs` repositories. Detailed information about how to [install debug symbols][16] from the `ddebs` can be found in the Ubuntu documentation.

For example, for Ubuntu 18.04+, enable the `ddebs` repo:

```
echo "deb http://ddebs.ubuntu.com $(lsb_release -cs) main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list

echo "deb http://ddebs.ubuntu.com $(lsb_release -cs)-updates main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list
```

Import the signing key (make sure the [signing key is correct][17]):

```
apt install ubuntu-dbgsym-keyring
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys <SIGNING KEY FROM UBUNTU DOCUMENTATION>
apt update
```

Try againg the canonical package names for debug symbols. For example, if the package name is `php7.2-fpm` try:

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

In case debug symbols cannot be found, use the utility tool `find-dbgsym-packages`. Install the binary:

```
apt install -y debian-goodies
```

Attempt finding debug symbols from either the full path to the binary or the process id of a running process:

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

Install the resulting package name, if found:

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

### Obtaining a core dump

Obtaining a core dump for PHP applications can be tricky, especially on PHP-FPM. Here are a few tips to help you obtain a core dump:

1. Determine whether the PHP-FPM generated a core dump by looking in the application error log:
   - Search for `(SIGSEGV - core dumped)` because a message like this means it has been dumped: `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV - core dumped) after <duration> seconds from start`.
   - Search for `(SIGSEGV)` because a message like this indicates that the core was not dumped: `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV) after <duration> seconds from start`.
1. Locate the core dump by running `cat /proc/sys/kernel/core_pattern`. The default value is typically `core`, meaning that a file named `core` will be generated in the web root folder.

If no core dump was generated, check the following configurations and change them as needed:

1. If `/proc/sys/kernel/core_pattern` contains a path including nested directories, ensure the full directory path exists.
1. If the user running the PHP-FPM pool workers is something other than `root` (a common user name is `www-data`) give that user write permissions to the core dumps directory.
1. Ensure that the value of `/proc/sys/fs/suid_dumpable` is not `0`. Set it to `1` or `2` unless you run PHP-FPM workers pool as `root`. Check your options with your system administrator.
1. Ensure you have a suitable `rlimit_core` in the PHP-FPM pool configuration section. You can set it to unlimited: `rlimit_core = unlimited`.
1. Ensure you have a suitable `ulimit` set in your system. You can set it to unlimited: `ulimit -c unlimited`.
1. If your application runs in a Docker container, changes to `/proc/sys/*` have to be done to the host machine. Contact your system administrator to know the options available to you. If you are able to, try recreating the issue in your testing or staging environments.

### Obtaining a Valgrind trace

To gain more details about the crash, run the application with Valgrind. Unlike core dumps, this approach always works in an unprivileged container.

<div class="alert alert-danger">
<strong>Note</strong>: An application that runs through Valgrind is orders of magnitude slower than when running natively. This method is recommended for non-production environments.
</div>

Install Valgrind with your package manager. Run the application with Valgrind enough to generate a few requests.

For a CLI application, run:
{{< code-block lang=shell >}}
USE_ZEND_ALLOC=0 valgrind -- php path/to/script.php
{{< /code-block >}}
When running `php-fpm` run:
{{< code-block lang="shell" >}}
USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- php-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
{{< /code-block >}}
When using Apache, run:
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- apache2 -X)`
{{< /code-block >}}

### Obtaining a strace

Some issues are caused by external factors, so it can be valuable to have a `strace`.

<div class="alert alert-danger">
<strong>Note</strong>: An application that runs through <code>strace</code> is orders of magnitude slower than when running natively. This method is recommended for non-production environments.
</div>

Install `strace` with your package manager. When generating a `strace` to send to Datadog Support, ensure you use the `-f` option to follow child processes.

For a CLI application, run:
{{< code-block lang="shell" >}}
strace -f php path/to/script.php
{{< /code-block >}}

For `php-fpm`, run:
{{< code-block lang="shell" >}}
strace -f php-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
{{< /code-block >}}

For Apache, run:
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; strace -f apache2 -X)
{{< /code-block >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/php
[2]: https://app.datadoghq.com/apm/docs
[3]: /tracing/visualization/
[4]: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
[5]: https://github.com/DataDog/dd-trace-php/releases/latest
[6]: https://app.datadoghq.com/apm/services
[7]: /tracing/troubleshooting/tracer_startup_logs?tab=php#php-info
[8]: /tracing/faq/php-tracer-manual-installation
[9]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[10]: /tracing/setup/nginx/#nginx-and-fastcgi
[11]: https://github.com/mind04/mod-ruid2
[12]: https://www.php.net/manual/en/ini.core.php#ini.open-basedir
[13]: https://packages.sury.org/php/
[14]: https://wiki.debian.org/HowToGetABacktrace
[15]: https://launchpad.net/~ondrej/+archive/ubuntu/php
[16]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages
[17]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages#Getting_-dbgsym.ddeb_packages
