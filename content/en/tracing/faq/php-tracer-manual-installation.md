---
title: PHP tracer manual Installation
kind: faq
---

## Before you start

Datadog strongly encourages you to install the PHP extension through the [official installer][1]. If you still prefer to use alternative installation methods, follow the steps below.

<div class="alert alert-info">
<strong>Note:</strong>
It might take a few minutes before traces appear in the UI. If traces still do not appear after a few minutes, create a <a href="/tracing/troubleshooting/tracer_startup_logs?tab=php#php-info"><code>phpinfo()</code></a> page from the host machine and scroll down to the "ddtrace" section. Failed diagnostic checks will appear here to help identify any issues.
</div>

### Install from .deb, .rpm, .apk

Download one of the [precompiled packages for supported distributions][2].

Install the package with one of the commands below.

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

### Install from the .tar.gz archive

Download the latest `.tar.gz` from the [release page][3].

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
|-------------|-----------------------|
| `5.4`       | `20100412`            |
| `5.5`       | `20121113`            |
| `5.6`       | `20131106`            |
| `7.0`       | `20151012`            |
| `7.1`       | `20160303`            |
| `7.2`       | `20170718`            |
| `7.3`       | `20180731`            |
| `7.4`       | `20190902`            |
| `8.0`       | `20200930`            |
| `8.1`       | `20210902`            |

### Install from source

[Download the source code `tar.gz` or `.zip` file][2] from the releases page and unzip the file. Then compile and install the extension with the commands below.

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

Depending on how you manually installed the PHP tracer, you also need to add this line to the `php.ini` file.

```ini
# If you installed from .tar.gz
ddtrace.request_init_hook=<PATH_TO_EXTRACTED_TAR_GZ>/dd-trace-sources/bridge/dd_wrap_autoloader.php

# If you installed from source
ddtrace.request_init_hook=<PATH_TO_SOURCES>/bridge/dd_wrap_autoloader.php
```

After restarting the web server/PHP SAPI (for example, `$ sudo apachectl restart`, `$ sudo service php-fpm restart`, etc.) the extension is enabled. To confirm that the extension is loaded, run:

```bash
$ php --ri=ddtrace

ddtrace

Datadog PHP tracer extension
...
```

Visit a tracing-enabled endpoint of your application and view the [APM UI][4] to see the [traces][5].

**Note**: It might take a few minutes before traces appear in the UI.

[1]: /tracing/setup/php/#install-the-extension
[2]: https://github.com/DataDog/dd-trace-php/releases/latest
[3]: https://github.com/DataDog/dd-trace-php/releases
[4]: https://app.datadoghq.com/apm/services
[5]: /tracing/visualization/#trace
