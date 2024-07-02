---
title: Tracing PHP Applications
kind: documentation
aliases:
- /tracing/languages/php
- /agent/apm/php/
- /tracing/php/
- /tracing/setup/php
- /tracing/setup_overview/php
- /tracing/setup_overview/setup/php
- /tracing/faq/php-tracer-manual-installation/
- /tracing/trace_collection/dd_libraries/php/
code_lang: php
type: multi-code-lang
code_lang_weight: 40
further_reading:
- link: /tracing/guide/trace-php-cli-scripts/
  tag: ガイド
  text: Tracing PHP CLI Scripts
- link: "https://www.datadoghq.com/blog/monitor-php-performance/"
  tag: Blog
  text: PHP monitoring with Datadog APM and distributed tracing
- link: "https://github.com/DataDog/dd-trace-php"
  tag: ソースコード
  text: Source code
- link: "https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md"
  tag: ソースコード
  text: Contributing to the open source project
- link: /tracing/glossary/
  tag: Documentation
  text: Explore your services, resources and traces
---
## Compatibility requirements

The minimum PHP version requirement for the latest version of `dd-trace-php` is PHP 7. If you are using PHP 5, you can still use the PHP tracer up to version [0.99](https://github.com/DataDog/dd-trace-php/releases/tag/0.99.0). PHP 5 is EOL as of version 1.0 of the PHP library.

For a full list of Datadog's PHP version and framework support (including legacy and maintenance versions), see the [Compatibility Requirements][1] page.

## Getting started

Before you begin, make sure you've already [installed and configured the Agent][14].

### Install the extension

Download the official installer:

```shell
curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
```

In case you are using Alpine Linux you need to install `libgcc_s` prior to running the installer:

```shell
apk add libgcc
```

Run the installer:

```shell
# Full installation: APM + ASM + Profiling
php datadog-setup.php --php-bin=all --enable-appsec --enable-profiling

# APM only
php datadog-setup.php --php-bin=all

# APM + ASM
php datadog-setup.php --php-bin=all --enable-appsec

# APM + Profiling (Beta)
php datadog-setup.php --php-bin=all --enable-profiling
```

<div class="alert alert-danger">
<strong>Note</strong>: Windows only supports APM. Do not use the <code>--enable-appsec</code> and <code>--enable-profiling</code> flags when tracing PHP applications on Windows.
</div>

This command installs the extension to all the PHP binaries found in the host or container. If `--php-bin` is omitted, the installer runs in interactive mode and asks the user to select the binaries for installation. The value of `--php-bin` can be a path to a specific binary in case `dd-trace-php` should be installed only to such binary.

Restart PHP (PHP-FPM or the Apache SAPI) and visit a tracing-enabled endpoint of your application. To see the generated traces, go to the [APM Traces page][4].

When you do not specify `--enable-appsec`, the AppSec extension loads shortly at startup, and is not enabled by default. It immediately short-circuits, causing negligible performance overhead.

<div class="alert alert-info">
<strong>Note:</strong>
It may take a few minutes before traces appear in the UI. If traces still do not appear after a few minutes, create a <a href="/tracing/troubleshooting/tracer_startup_logs?tab=php#php-info"><code>phpinfo()</code></a> page from the host machine and scroll down to the `ddtrace`. Failed diagnostic checks appear in this section to help identify any issues.
</div>

<div class="alert alert-warning">
<strong>Apache ZTS:</strong>
If the PHP CLI binary is built as NTS (non thread-safe), while Apache uses a ZTS (Zend thread-safe) version of PHP, you need to manually change the extension load for the ZTS binary. Run <code>/path/to/php-zts --ini</code> to find where Datadog's <code>.ini</code> file is located, then add the <code>-zts</code> suffix from the file name. For example, from <code>extension=ddtrace-20210902.so</code> to <code>extension=ddtrace-20210902-zts.so</code>.
</div>

<div class="alert alert-warning">
<strong>SELinux:</strong>
If the httpd SELinux policies are configured on the host, functionality of the tracer may be limited, unless writing and executing temporary files is explicitly allowed in SELinux configuration:

`allow httpd_t httpd_tmpfs_t:file { execute execute_no_trans };`

</div>

## Automatic instrumentation

Tracing is automatically enabled by default. Once the extension is installed, **ddtrace** traces your application and sends traces to the Agent.

Datadog supports all web frameworks out of the box. Automatic instrumentation works by modifying PHP's runtime to wrap certain functions and methods to trace them. The PHP tracer supports automatic instrumentation for several libraries.

Automatic instrumentation captures:

* Method execution time
* Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
* Unhandled exceptions, including stacktraces if available
* A total count of traces (for example, web requests) flowing through the system

## 構成

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][6] for details.

## Tracing short- and long-running CLI scripts

Additional steps are required for instrumenting CLI scripts. Read [Trace PHP CLI Scripts][7] for more information.

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

If PHP was installed from the [Sury Debian DPA][8], debug symbols are already available from the DPA. For example, for PHP-FPM 7.2:

```
apt update
apt install -y php7.2-fpm-dbgsym
```

##### PHP installed from a different package

The Debian project maintains a wiki page with [instructions to install debug symbols][9].

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

If PHP was installed from the [`ppa:ondrej/php`][10], edit the apt source file `/etc/apt/sources.list.d/ondrej-*.list` by adding the `main/debug` component.

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

If the `-dbg` and `-dbgsym` packages cannot be found, enable the `ddebs` repositories. Detailed information about how to [install debug symbols][11] from the `ddebs` can be found in the Ubuntu documentation.

For example, for Ubuntu 18.04+, enable the `ddebs` repo:

```
echo "deb http://ddebs.ubuntu.com $(lsb_release -cs) main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list

echo "deb http://ddebs.ubuntu.com $(lsb_release -cs)-updates main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list
```

Import the signing key (make sure the [signing key is correct][12]):

```
apt install ubuntu-dbgsym-keyring
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys <SIGNING KEY FROM UBUNTU DOCUMENTATION>
apt update
```

Try adding the canonical package names for debug symbols. For example, if the package name is `php7.2-fpm` try:

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

### Obtaining a core dump from within a Docker container

Use the information below to assist with obtaining a core dump in a Docker container:

1. The Docker container needs to run as a privileged container, and the `ulimit` value for core files needs to be set to its maximum as shown in the examples below.
   - If you use the `docker run` command, add the `--privileged` and the `--ulimit core=99999999999` arguments
   - If you use `docker compose`, add the following to the `docker-compose.yml` file:
```yaml
privileged: true
ulimits:
  core: 99999999999
```
2. When running the container (and before starting the PHP application) you need to run the following commands:
```
ulimit -c unlimited
echo '/tmp/core' > /proc/sys/kernel/core_pattern
echo 1 > /proc/sys/fs/suid_dumpable
```

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

The resulting Valgrind trace is printed by default to the standard error, follow the [official documentation][13] to print to a different target. The expected output is similar to the example below for a PHP-FPM process:

```
==322== Conditional jump or move depends on uninitialised value(s)
==322==    at 0x41EE82: zend_string_equal_val (zend_string.c:403)
==322==    ...
==322==    ...
==322==
==322== Process terminating with default action of signal 11 (SIGSEGV): dumping core
==322==    at 0x73C8657: kill (syscall-template.S:81)
==322==    by 0x1145D0F2: zif_posix_kill (posix.c:468)
==322==    by 0x478BFE: ZEND_DO_ICALL_SPEC_RETVAL_UNUSED_HANDLER (zend_vm_execute.h:1269)
==322==    by 0x478BFE: execute_ex (zend_vm_execute.h:53869)
==322==    by 0x47D9B0: zend_execute (zend_vm_execute.h:57989)
==322==    by 0x3F6782: zend_execute_scripts (zend.c:1679)
==322==    by 0x394F0F: php_execute_script (main.c:2658)
==322==    by 0x1FFE18: main (fpm_main.c:1939)
==322==
==322== Process terminating with default action of signal 11 (SIGSEGV)
==322==    ...
==322==    ...
==322==
==322== HEAP SUMMARY:
==322==     in use at exit: 3,411,619 bytes in 22,428 blocks
==322==   total heap usage: 65,090 allocs, 42,662 frees, 23,123,409 bytes allocated
==322==
==322== LEAK SUMMARY:
==322==    definitely lost: 216 bytes in 3 blocks
==322==    indirectly lost: 951 bytes in 32 blocks
==322==      possibly lost: 2,001,304 bytes in 16,840 blocks
==322==    still reachable: 1,409,148 bytes in 5,553 blocks
==322==                       of which reachable via heuristic:
==322==                         stdstring          : 384 bytes in 6 blocks
==322==         suppressed: 0 bytes in 0 blocks
==322== Rerun with --leak-check=full to see details of leaked memory
==322==
==322== Use --track-origins=yes to see where uninitialised values come from
==322== For lists of detected and suppressed errors, rerun with: -s
==322== ERROR SUMMARY: 18868 errors from 102 contexts (suppressed: 0 from 0)
```

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
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /tracing/glossary/
[4]: https://app.datadoghq.com/apm/traces
[5]: https://github.com/DataDog/dd-trace-php/releases
[6]: /tracing/trace_collection/library_config/php/
[7]: /tracing/guide/trace-php-cli-scripts/
[8]: https://packages.sury.org/php/
[9]: https://wiki.debian.org/HowToGetABacktrace
[10]: https://launchpad.net/~ondrej/+archive/ubuntu/php
[11]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages
[12]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages#Getting_-dbgsym.ddeb_packages
[13]: https://valgrind.org/docs/manual/manual-core.html#manual-core.comment
[14]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
