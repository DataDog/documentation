---
title: PHP tracer manual Installation
kind: faq
---

## Before you start

Datadog strongly encourages you to install the PHP extension through the [pre-built packages][1]. If you still prefer to manually install the PHP tracer, follow the steps below.

### Install from the .tar.gz archive

Download the latest `.tar.gz` from the [release page][2].

From the location you downloaded the package:

```bash
$ tar -xf datadog-php-tracer.tar.gz -C /
```

#### Automatic INI file setup

In case of a standard PHP installation, the command below will automatically install and configure the extension.

```
$ /opt/datadog-php/bin/post-install.sh
```

Verify that the extension has been correctly installed

```bash
$ php --ri=ddtrace

ddtrace

Datadog PHP tracer extension
...
```

If the PHP installation is not standard the above steps might fail. In this case proceed with the [manual steps below](#manual-ini-file-setup).

#### Manual INI file setup

Steps in this paragraph are only required if the [Automatic INI file setup](#automatic-ini-file-setup) did not work.

Modify the `php.ini` configuration file to make the **ddtrace** extension available in the PHP runtime. To find out where the INI file is, run the following command:

```bash
$ php --ini

Configuration File (php.ini) Path: /usr/local/etc/php/7.2
Loaded Configuration File:         /usr/local/etc/php/7.2/php.ini
...
```

Add the following lines to the `php.ini` file.

```ini
extension=/opt/datadog-php/extensions/ddtrace-<PHP_EXTENSION_VERSION>.so
ddtrace.request_init_hook=/opt/datadog-php/dd-trace-sources/bridge/dd_wrap_autoloader.php
```

The correct value for `PHP_EXTENSION_VERSION` depends on the PHP version.

| PHP Version | PHP_EXTENSION_VERSION |
| ----------- | --------------------- |
| `5.4`       | `20100412`            |
| `5.5`       | `20121113`            |
| `5.6`       | `20131106`            |
| `7.0`       | `20151012`            |
| `7.1`       | `20160303`            |
| `7.2`       | `20170718`            |
| `7.3`       | `20180731`            |
| `7.4`       | `20190902`            |
| `8.0`       | `20200930`            |

### Install from source

Installation from source is only recommended if the provided installers do not work in a specific platform. For example on arm64 machines.

#### Centos example

Follow the instructions below to build the PHP extension in a Centos container. Paths might vary depending on the PHP installation method, but the `Dockerfile` below should be easily adaptable to any environment.

```
FROM centos:8

# required dependencies
RUN yum install -y php php-fpm php-devel php-json git gcc make which curl-devel


# install composer (https://getcomposer.org/download/)
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php -r "if (hash_file('sha384', 'composer-setup.php') === '756890a4488ce9024fc62c56153228907f1545c228516cbf63f885e036d37e9a59d27d63f46af1d4d07ee0f76181c7d3') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" && \
    php composer-setup.php --install-dir=/usr/bin --filename=composer

ENV DD_TRACE_VERSION 0.65.1

# clone dd-trace-php repo (https://github.com/DataDog/dd-trace-php)
WORKDIR /tmp
RUN git clone --single-branch --branch=${DD_TRACE_VERSION} --depth 1 https://github.com/DataDog/dd-trace-php.git
WORKDIR /tmp/dd-trace-php

# build
RUN make all CFLAGS="-std=gnu11 -O2 -g -Wall -Wextra" ECHO_ARG="-e"
RUN make generate

# install
# 1) copy the bridge folder to some location
RUN mkdir -p /opt/datadog/dd-trace-php && \
    cp -r bridge/ /opt/datadog/dd-trace-php/

# 2) copy ./tmp/build_extension/modules/ddtrace.so to your extension directory.
#    You can find your extension directory running:
#       - for `php` --> `php -i | grep -i extension_dir`
#       - for `php-fpm` --> `php-fpm -i | grep -i extension_dir`
#    in this specific example it results to be /usr/lib64/php/modules/
RUN cp ./tmp/build_extension/modules/ddtrace.so /usr/lib64/php/modules/

# 3) add the following lines to 98-ddtrace.ini in your ini settings directory.
#    You can find your ini settings directory running:
#       - for `php` --> `php -i | grep -i 'Scan this dir for additional .ini files'`
#       - for `php-fpm` --> `php-fpm -i | grep -i 'Scan this dir for additional .ini files'`
#    in this specific example it results to be /etc/php.d
RUN echo "extension=ddtrace.so" >> /etc/php.d/98-ddtrace.ini
RUN echo "datadog.trace.request_init_hook=/opt/datadog/dd-trace-php/bridge/dd_wrap_autoloader.php" >> /etc/php.d/98-ddtrace.ini
```

#### Ubuntu example

Follow the instructions below to build the PHP extension in a Ubuntu container. Paths might vary depending on the PHP installation method, but the `Dockerfile` below should be easily adaptable to any environment.

```
FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

# required dependencies
RUN apt update; \
    apt install -y build-essential git libcurl4-openssl-dev php7.4-cli php7.4-fpm php7.4-dev

# install composer (https://getcomposer.org/download/)
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php -r "if (hash_file('sha384', 'composer-setup.php') === '756890a4488ce9024fc62c56153228907f1545c228516cbf63f885e036d37e9a59d27d63f46af1d4d07ee0f76181c7d3') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" && \
    php composer-setup.php --install-dir=/usr/bin --filename=composer

ENV DD_TRACE_VERSION 0.65.1

# clone dd-trace-php repo (https://github.com/DataDog/dd-trace-php)
WORKDIR /tmp
RUN git clone --single-branch --branch=${DD_TRACE_VERSION} --depth 1 https://github.com/DataDog/dd-trace-php.git
WORKDIR /tmp/dd-trace-php

# build
RUN make all CFLAGS="-std=gnu11 -O2 -g -Wall -Wextra" ECHO_ARG="-e"
RUN make generate

# install
# 1) copy the bridge folder to some location
RUN mkdir -p /opt/datadog/dd-trace-php && \
    cp -r bridge/ /opt/datadog/dd-trace-php/

# 2) copy ./tmp/build_extension/modules/ddtrace.so to your extension directory.
#    You can find your extension directory running:
#       - for `php` --> `php -i | grep -i extension_dir`
#       - for `php-fpm` --> `php-fpm7.4 -i | grep -i extension_dir`
#    in this specific example it results to be /usr/lib/php/20190902
RUN cp ./tmp/build_extension/modules/ddtrace.so /usr/lib/php/20190902/

# 3) add the following lines to 98-ddtrace.ini in your ini settings directory.
#    You can find your ini settings directory running:
#       - for `php` --> `php -i | grep -i 'Scan this dir for additional .ini files'`
#       - for `php-fpm` --> `php-fpm7.4 -i | grep -i 'Scan this dir for additional .ini files'`
#    in this specific example it results to be /etc/php/7.4/cli/conf.d and /etc/php/7.4/fpm/conf.d respectively
RUN echo "extension=ddtrace.so" >> /etc/php/7.4/cli/conf.d/98-ddtrace.ini
RUN echo "datadog.trace.request_init_hook=/opt/datadog/dd-trace-php/bridge/dd_wrap_autoloader.php" >> /etc/php/7.4/cli/conf.d/98-ddtrace.ini
RUN echo "extension=ddtrace.so" >> /etc/php/7.4/fpm/conf.d/98-ddtrace.ini
RUN echo "datadog.trace.request_init_hook=/opt/datadog/dd-trace-php/bridge/dd_wrap_autoloader.php" >> /etc/php/7.4/fpm/conf.d/98-ddtrace.ini
```

#### Final steps

After restarting the web server/PHP SAPI (for example, `$ sudo apachectl restart`, `$ sudo service php-fpm restart`, etc.) the extension is enabled. To confirm that the extension is loaded, run:

```bash
$ php --ri=ddtrace

ddtrace

Datadog PHP tracer extension
...
```

Visit a tracing-enabled endpoint of your application and view the [APM UI][3] to see the [traces][4].

**Note**: It might take a few minutes before traces appear in the UI.

[1]: /tracing/setup/php/#install-the-extension
[2]: https://github.com/DataDog/dd-trace-php/releases
[3]: https://app.datadoghq.com/apm/services
[4]: /tracing/visualization/#trace
