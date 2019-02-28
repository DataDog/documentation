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

Install the PHP extension using one of the [precompiled packages for supported distributions][7].

Once downloaded, install the package with one of the commands below.

```bash
# using RPM package (RHEL/Centos 6+, Fedora 20+)
$ rpm -ivh datadog-php-tracer.rpm

# using DEB package (Debian Jessie+ , Ubuntu 14.04+)
$ dpkg -i datadog-php-tracer.deb

# using APK package (Alpine)
$ apk add datadog-php-tracer.apk --allow-untrusted
```

You are all set, now visit a tracing-enabled endpoint of your application and view the [APM UI][8] to see the traces.

**Note**: It might take a few minutes before traces appear in the UI.

If you can't find your distribution, you can [manually install][9] the PHP extension.

## Automatic Instrumentation

Tracing is automatically instrumented by default. Once the extension is installed, **ddtrace** traces your application and sends traces to the Agent.

Even if we do not officially support your web framework, most probably you won't need any manual instrumentation as we record
generic web request and create generic traces for them. On the other hand, if you use one of the frameworks that we support,
we will set more relevant metadata which makes easier to navigate through your services.

Automatic instrumentation works by modifying PHP's runtime to wrap certain functions and methods in order to trace them. The PHP tracer supports automatic instrumentation for [several libraries][10].

Automatic instrumentation captures:

* Method execution time
* Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
* Unhandled exceptions, including stacktraces if available
* A total count of traces (e.g., web requests) flowing through the system

## Compatibility

PHP APM supports the following PHP versions:

| Version | Support type |
| :------ | :----------- |
| 7.2.x   | Beta         |
| 7.1.x   | Beta         |
| 7.0.x   | Beta         |
| 5.6.x   | Beta         |
| 5.4.x   | Beta         |

### Integrations

#### Web Framework Compatibility

Please not that if the web framework that you use is not listed below you will still see traces for your web requests
in the UI. The only caveat is that some metadata and spans which are very specific to a particular web fr

| Module         | Versions | Support Type |
| :------------- | :------- | :----------- |
| Laravel        | 5.x      | Beta         |
| Laravel        | 4.2      | Beta         |
| Symfony        | 4.x      | Beta         |
| Symfony        | >= 3.3   | Beta         |
| Zend Framework | 1.12     | Beta         |

Don't see your desired web frameworks? Let Datadog know more about your needs through [this survey][11].

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

Don't see your desired libraries? Let Datadog know more about your needs through [this survey][11].

## Configuration

The PHP tracer can be configured using environment variables.

**Note**: If you use code auto-instrumentation (the recommended approach) be aware that the instrumenting code is executed before any user code. As a result, the environment variables below must be set at the server level and be available to the PHP runtime before any user code is executed. For example, `putenv()` and `.env` files would not work.

### Apache

Set using [`SetEnv`][12] from the server config, virtual host,
directory, or **.htaccess** file.

```
SetEnv DD_TRACE_DEBUG true
```

### nginx

Set using [`fastcgi_param`][13] from the `http`,
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
| `DD_TRACE_DEBUG`           | `false`     | Enable [debug mode][16] for the tracer                              |
| `DD_TRACE_ENABLED`         | `true`      | Enable the tracer globally                                          |
| `DD_TRACE_GLOBAL_TAGS`     | ``          | Tags to be set on all spans: e.g.: `key1:value1,key2:value2`        |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization
[2]: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
[3]: /agent/?tab=agentv6
[4]: /tracing/setup/docker
[5]: /agent/kubernetes/daemonset_setup/#trace-collection
[6]: /agent/apm/?tab=agent630#agent-configuration
[7]: https://github.com/DataDog/dd-trace-php/releases/latest
[8]: https://app.datadoghq.com/apm/services
[9]: /tracing/languages/php/manual-installation
[10]: #library-compatibility
[11]: https://docs.google.com/forms/d/e/1FAIpQLSemTVTCdqzXkfzemJSr8wuEllxfqbGVj00flmRvKA17f0lyFg/viewform
[12]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[13]: http://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_param
[14]: /tracing/advanced_usage/?tab=php#distributed-tracing
[15]: /tracing/advanced_usage/?tab=php#priority-sampling
[16]: /tracing/advanced_usage/?tab=php#debugging
