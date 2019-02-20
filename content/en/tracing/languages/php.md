---
title: Tracing PHP Applications
kind: Documentation
aliases:
- /tracing/setup/php
- /agent/apm/php/
further_reading:
- link: "https://github.com/DataDog/dd-trace-php"
  tag: "GitHub"
  text: "Source code"
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "tracing/advanced_usage/?tab=php"
  tag: "Documentation"
  text: "Advanced Usage"
---

<div class="alert alert-warning">
The APM tracer for PHP applications is in Open Public Beta.
</div>

## Installation and Getting Started

For descriptions of terminology used in APM, take a look at the [official documentation][1].

For details about open-source contributions to the PHP tracer, refer to the [contributing guide][2].

### Setup the Datadog Agent

The PHP APM tracer sends trace data through the Datadog Agent.

[Install and configure the Datadog Agent][3]. See the additional documentation for [tracing Docker applications][4] or [Kubernetes applications][5].

Make sure the Agent has **[APM enabled][6]**.

### Install the extension

Install the PHP extension using one of the [precompiled packages for supported distributions][7]. If you can't find your distribution, install the PHP extension [from PECL][8] or [from source][9].

Once downloaded, install the package with one of the commands below.

```bash
# using RPM package (RHEL/Centos 6+, Fedora 20+)
$ rpm -ivh datadog-php-tracer.rpm

# using DEB package (Debian Jessie+ , Ubuntu 14.04+)
$ dpkg -i datadog-php-tracer.deb

# using APK package (Alpine)
$ apk add datadog-php-tracer.apk --allow-untrusted

# using tar.gz archive (Other distributions using libc6)
$ tar -xf datadog-php-tracer.tar.gz -C /
  /opt/datadog-php/bin/post-install.sh
```

### Install from PECL

<div class="alert alert-warning">
Installing the PHP tracer via PECL is an experimental feature.
</div>

Alternatively install the extension from the [PECL package **datadog_trace**][10].

```bash
$ sudo pecl install datadog_trace-beta
```

Next, [modify the `php.ini` file][11] to add the extension to the PHP runtime.

### Install from source

[Download the source code `tar.gz` or `.zip` file][7] from the releases page and unzip the file. Then compile and install the extension with the commands below.

```bash
$ cd /path/to/dd-trace-php
$ phpize
$ ./configure --enable-ddtrace
$ make
$ sudo make install
```

#### Modify the INI file

Modify the `php.ini` configuration file to make the **ddtrace** extension available in the PHP runtime. To find out where the INI file is, run the following command:

```bash
$ php --ini

Configuration File (php.ini) Path: /usr/local/etc/php/7.2
Loaded Configuration File:         /usr/local/etc/php/7.2/php.ini
...
```

Add the following line to the `php.ini` file.

```ini
extension=ddtrace.so
```

After restarting the web server/PHP SAPI (e.g., `$ sudo apachectl restart`, `$ sudo service php-fpm restart`, etc.) the extension is enabled. To confirm that the extension is loaded, run:

```bash
$ php --ri=ddtrace

ddtrace


Datadog PHP tracer extension
...
```

## Compatibility

PHP APM supports the following PHP versions:

| Version | Support type |
| :------ | :----------- |
| 7.2.x   | Beta         |
| 7.1.x   | Beta         |
| 7.0.x   | Beta         |
| 5.6.x   | Beta         |
| 5.4.x   | Beta         |

## Automatic Instrumentation

Tracing is automatically instrumented by default. Once the extension is installed, **ddtrace** traces your application and sends traces to the Agent.

Automatic instrumentation works by modifying PHP's runtime to wrap certain functions and methods in order to trace them. The PHP tracer supports automatic instrumentation for [several libraries][12].

Automatic instrumentation captures:

* Method execution time
* Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
* Unhandled exceptions, including stacktraces if available
* A total count of traces (e.g., web requests) flowing through the system

## Manual instrumentation

Although automatic instrumentation works in most cases, there are some special bootstrapping contexts where automatic instrumentation does not work as expected. In these cases, disable automatic instrumentation and manually enable it.

First, install the PHP tracer dependency with Composer:

```bash
$ composer require datadog/dd-trace
```

Then, include the PHP tracer boostrap file right after the Composer autoloader and start the first span in the trace.

```php
// The existing Composer autoloader
require '<APP_ROOT>/vendor/autoload.php';

// Add the PHP tracer bootstrap
// Don't add this line if you have also installed the dd tracer 
// in another way than with Composer 
require '<APP_ROOT>/vendor/datadog/dd-trace/bridge/dd_init.php';

// Create the first span in the trace
\DDTrace\GlobalTracer::get()->startRootSpan('web.request');
```

### Zend Framework 1 integration

Zend Framework 1 is automatically instrumented by default, so you are not required to modify your ZF1 project. However, if automatic instrumentation is disabled, enable the tracer manually.

First, [download the latest source code from the releases page][7]. Extract the zip file and copy the `src/DDTrace` folder to your application's `/library` folder. Then add the following to your `application/configs/application.ini` file:

```ini
autoloaderNamespaces[] = "DDTrace_"
pluginPaths.DDTrace = APPLICATION_PATH "/../library/DDTrace/Integrations/ZendFramework/V1"
resources.ddtrace = true
```

## View the trace

Assuming the Agent is running with APM enabled and it is configured with your API key, and assuming the **ddtrace** extension is installed and instrumented properly into your application, visit a tracing-enabled endpoint of your application and view the [APM UI][13] to see the traces.

**Note**: It might take a few minutes before traces appear in the UI.

## Trace a custom function or method

The `dd_trace()` function hooks into existing functions and methods to:

* Open a span before the code executes
* Set additional tags or errors on the span
* Close the span when it is done
* Modify the arguments or the return value

For example, the following snippet traces the `CustomDriver::doWork()` method, adds custom tags, reports any exceptions as errors on the span, and then re-throws the exceptions.

```php
dd_trace("CustomDriver", "doWork", function (...$args) {
    // Start a new span
    $scope = GlobalTracer::get()->startActiveSpan('CustomDriver.doWork');
    $span = $scope->getSpan();

    // Access object members via $this
    $span->setTag(Tags\RESOURCE_NAME, $this->workToDo);
    
    try {
        // Execute the original method
        $result = $this->doWork(...$args);
        // Set a tag based on the return value
        $span->setTag('doWork.size', count($result));
        return $result;
    } catch (Exception $e) {
        // Inform the tracer that there was an exception thrown
        $span->setError($e);
        // Bubble up the exception
        throw $e
    } finally {
        // Close the span
        $span->finish();
    }
});
```

## Configuration

The PHP tracer can be configured using environment variables.

**Note**: If you use code auto-instrumentation (the recommended approach) be aware that the instrumenting code is executed before any user code. As a result, the environment variables below must be set at the server level and be available to the PHP runtime before any user code is executed. For example, `putenv()` and `.env` files would not work.

### Apache

Set using [`SetEnv`](https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv) from the server config, virtual host,
directory, or **.htaccess** file.

```
SetEnv DD_TRACE_DEBUG true
```

### nginx

Set using [`fastcgi_param`](http://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_param) from the `http`,
`server`, or `location` contexts.

```
fastcgi_param DD_TRACE_DEBUG true;
```

### PHP CLI server

Set in the command line to start the server.

```
DD_TRACE_DEBUG=true php -S localhost:8888
```

| Env variable               | Default     | Note                                                                |
| :------------------------- | :---------- | :------------------------------------------------------------------ |
| `DD_AGENT_HOST`            | `localhost` | The Agent host name                                                 |
| `DD_AUTOFINISH_SPANS`      | `false`     | Whether spans are automatically finished when the tracer is flushed |
| `DD_DISTRIBUTED_TRACING`   | `true`      | Whether to enable [distributed tracing][14]                         |
| `DD_INTEGRATIONS_DISABLED` | `null`      | CSV list of disabled extensions; e.g., `curl,mysqli`                |
| `DD_PRIORITY_SAMPLING`     | `true`      | Whether to enable [priority sampling][15]                           |
| `DD_SAMPLING_RATE`         | `1.0`       | The sampling rate for the traces. Between `0.0` and `1.0` (default) |
| `DD_TRACE_AGENT_PORT`      | `8126`      | The Agent port number                                               |
| `DD_TRACE_APP_NAME`        | ``          | The default app name                                                |
| `DD_TRACE_DEBUG`           | `false`     | Enable [debug mode][17] for the tracer                              |
| `DD_TRACE_ENABLED`         | `true`      | Enable the tracer globally                                          |
| `DD_TRACE_GLOBAL_TAGS`     | ``          | Tags to be set on all spans: e.g.: `key1:value1,key2:value2`        |

### Integrations

#### Framework Compatibility

| Module         | Versions | Support Type |
| :------------- | :------- | :----------- |
| Laravel        | 5.x      | Beta         |
| Laravel        | 4.2      | Beta         |
| Symfony        | 4.x      | Beta         |
| Symfony        | >= 3.4   | Beta         |
| Zend Framework | 1.12     | Beta         |

Don't see your desired web frameworks? Let Datadog know more about your needs through [this survey][16].

#### Library Compatibility

| Module        | Versions                   | Support Type |
| :------------ | :------------------------- | :----------- |
| Curl          | *(Any Supported PHP)*      | Beta         |
| Elasticsearch | 1.x                        | Beta         |
| Eloquent      | Laravel supported versions | Beta         |
| Guzzle        | 6.x                        | Beta         |
| Guzzle        | 5.x                        | Beta         |
| Memcached     | *(Any Supported PHP)*      | Beta         |
| MongoDB       | 1.4.x                      | Beta         |
| Mysqli        | *(Any Supported PHP)*      | Beta         |
| PDO           | *(Any Supported PHP)*      | Beta         |
| Predis        | 1.1                        | Beta         |

Don't see your desired libraries? Let Datadog know more about your needs through [this survey][16].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization
[2]: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
[3]: /agent/?tab=agentv6
[4]: /tracing/setup/docker
[5]: /agent/kubernetes/daemonset_setup/#trace-collection
[6]: /agent/apm/?tab=agent630#agent-configuration
[7]: https://github.com/DataDog/dd-trace-php/releases/latest
[8]: #install-from-pecl
[9]: #install-from-source
[10]: https://pecl.php.net/package/datadog_trace
[11]: #modify-the-ini-file
[12]: #library-compatibility
[13]: https://app.datadoghq.com/apm/services
[14]: /tracing/advanced_usage/?tab=php#distributed-tracing
[15]: /tracing/advanced_usage/?tab=php#priority-sampling
[16]: https://docs.google.com/forms/d/e/1FAIpQLSemTVTCdqzXkfzemJSr8wuEllxfqbGVj00flmRvKA17f0lyFg/viewform
[17]: /tracing/advanced_usage/?tab=php#debugging
