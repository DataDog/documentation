---
title: Tracing PHP Applications (Coming Soon)
kind: Documentation
further_reading:
- link: "https://github.com/DataDog/dd-trace-php"
  tag: "Github"
  text: Source code
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "https://goo.gl/forms/rKjH2J6nJ585KXri2"
  tag: "Survey"
  text: Request Beta Access
---

<div class="alert alert-warning">
The APM tracer for PHP applications is in Open Public Beta.
</div>

## Installation and Getting Started



Next, install the Datadog Tracing library, `ddtrace`, using pip:

```python
pip install ddtrace
```

Then to instrument your Python application use the included `ddtrace-run` command. To use it, prefix your Python entry-point command with `ddtrace-run`.

For example, if your application is started with `python app.py` then:
---

To begin tracing applications written in PHP, first [install and configure the Datadog Agent][1] (see additional documentation for [tracing Docker applications](/tracing/setup/docker/)).

Next, install the Datadog PHP extension using one of precompiled packages for supported distributions - or from source[3]
Packages for latest release can be found on GitHub release page[4] https://github.com/DataDog/dd-trace-rb/releases/latest

Installing the precompiled extension using RPM package (RHEL/Centos 6+, Fedora 20+)

```bash
rpm -ivh ddtrace.rpm
```

Installing the precompiled extension using DEB package (Debian Jessie + , Ubuntu 14.04+)

```bash
deb -i ddtrace.deb
```

Installing the precompiled package from tar.gz archive (Other distributions using glibc)

```bash
tar -xf ddtrace.tar.gz -C /
/opt/datadog-php/bin/post_install.sh
```

## Compatibility

PHP APM includes support for the following PHP versions:

| Version | Support type |
| -----   | ------------ |
| 5.6.x   | Coming Soon  |
| 7.0.x   | Public Beta  |
| 7.1.x   | Public Beta  |
| 7.2.x   | Public Beta  |

## Automatic Instrumentation

Automatic instrumentation uses `ddtrace` extension to modify runtime and inject custom PHP code around specific methods. With tiny bit of configuration the PHP tracer is able to automatically instrument all supported libraries out of the box.

Automatic instrumentation captures:

* Method execution time
* Relevant trace data such as URL and status response codes for web requests or SQL query for database access
* Unhandled exceptions, including stacktraces if available
* A total count of traces (e.g. web requests) flowing through the system

### Integrations

#### Framework Compatibility

| Module         | Versions    | Support Type       |
| :-----------   | :---------- | :----------------- |
| Laravel        | 5.x         | Public Beta        |
| Symfony        | 3.x         | Public Beta        |
| Magento        | 2.x         | Coming Soon        |
| Zend Framework | 3.x         | Coming Soon        |
| CakePHP        | 3.x         | Coming Soon        |
| Drupal         | 7.x         | Coming Soon        |
| Wordpress      | 4.x         | Coming Soon        |
| Slim           | 3.x         | Coming Soon        |

#### Library Compatibility

| Module        | Versions              | Support Type       |
| :------------ | :-------------------- | :----------------- |
| Memcached     | *(Any Supported PHP)* | Public Beta        |
| Mysqli        | *(Any Supported PHP)* | Public Beta        |
| PDO           | *(Any Supported PHP)* | Public Beta        |
| Predis        | 1.1                   | Public Beta        |
| pgsql         | *(Any Supported PHP)* | Coming Soon        |
| MongoDB       | 1.x                   | Coming Soon        |
| Doctrine      | 2.6                   | Coming Soon        |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/tracing/setup
[2]: https://github.com/DataDog/dd-trace-php
