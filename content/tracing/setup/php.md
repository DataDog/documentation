---
title: Tracing PHP Applications
kind: Documentation
further_reading:
- link: "https://github.com/DataDog/dd-trace-php"
  tag: "Github"
  text: "Source code"
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "tracing/advanced_usage/?tab=php"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---

<div class="alert alert-warning">
The APM tracer for PHP applications is in Open Public Beta.
</div>

## Installation and Getting Started

To begin tracing applications written in PHP, first [install and configure the Datadog Agent][1] (see additional documentation for [tracing Docker applications][2]).

Next, install the Datadog PHP extension using one of the precompiled packages for supported distributions. The latest packages can be found on GitHub's [releases page][3]. If you don't find your distribution, you can install the PHP extension [from source][4]

```bash
# using RPM package (RHEL/Centos 6+, Fedora 20+)
rpm -ivh datadog-php-tracer.rpm

# using DEB package (Debian Jessie+ , Ubuntu 14.04+)
deb -i datadog-php-tracer.deb

# using APK package (Alpine)
apk add datadog-php-tracer.apk --allow-untrusted

# using tar.gz archive (Other distributions using libc6)
tar -xf datadog-php-tracer.tar.gz -C /
/opt/datadog-php/bin/post-install.sh
```

Finally, install the Datadog tracing library using composer:

```bash
composer config minimum-stability beta # required to install opentracing 1.0.0-beta5
composer require opentracing/opentracing
composer require datadog/dd-trace
```

**Note:** You can [install the Datadog library without changing minimum-stability][5]

## Compatibility

PHP APM includes support for the following PHP versions:

| Version | Support type |
| -----   | ------------ |
| 7.0.x   | Public Beta  |
| 7.1.x   | Public Beta  |
| 7.2.x   | Public Beta  |
| 5.6.x   | Public Beta  |

## Automatic Instrumentation

Automatic instrumentation uses the `ddtrace` extension to modify PHP's runtime and inject custom PHP code around specific methods. When [tracing is enabled][6] the PHP tracer is able to automatically instrument all supported libraries out of the box.

Automatic instrumentation captures:

* Method execution time.
* Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access.
* Unhandled exceptions, including stacktraces if available.
* A total count of traces (e.g. web requests) flowing through the system.

### Integrations

#### Framework Compatibility

| Module         | Versions    | Support Type       |
| :-----------   | :---------- | :----------------- |
| Laravel        | 5.x         | Public Beta        |
| Laravel        | 4.2         | Coming Soon        |
| Symfony        | 4.x         | Public Beta        |
| Symfony        | 3.x         | Coming Soon        |
| Magento        | 2.x         | Coming Soon        |
| Zend Framework | 3.x         | Coming Soon        |
| CakePHP        | 3.x         | Coming Soon        |
| Drupal         | 7.x         | Coming Soon        |
| Wordpress      | 4.x         | Coming Soon        |
| Yii            | 2.0.x       | Coming Soon        |
| Slim           | 3.x         | Coming Soon        |

Don't see your desired web frameworks? Let Datadog know more about your needs through [this survey][7]

#### Library Compatibility

| Module        | Versions                   | Support Type |
| :------------ | :------------------------- | :----------- |
| Curl          | *(Any Supported PHP)*      | Public Beta  |
| Doctrine      | 2.6                        | Coming Soon  |
| Elasticsearch | 1.x                        | Public Beta  |
| Eloquent      | Laravel supported versions | Public Beta  |
| Guzzle        | 5.x                        | Public Beta  |
| Memcached     | *(Any Supported PHP)*      | Public Beta  |
| MongoDB       | 1.4.x                      | Public Beta  |
| Mysqli        | *(Any Supported PHP)*      | Public Beta  |
| PDO           | *(Any Supported PHP)*      | Public Beta  |
| pgsql         | *(Any Supported PHP)*      | Coming Soon  |
| Predis        | 1.1                        | Public Beta  |

Don't see your desired libraries? Let Datadog know more about your needs through [this survey][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup
[2]: /tracing/setup/docker
[3]: https://github.com/DataDog/dd-trace-php/releases/latest
[4]: https://github.com/DataDog/dd-trace-php/blob/master/docs/getting_started.md#compiling-and-installing-the-extension-manually
[5]: https://github.com/DataDog/dd-trace-php/blob/master/docs/getting_started.md#alternative-install-datadogdd-trace-package-without-changing-minimum-stability
[6]: https://github.com/DataDog/dd-trace-php/blob/master/docs/getting_started.md#enabling-tracing
[7]: https://goo.gl/forms/rKjH2J6nJ585KXri2
