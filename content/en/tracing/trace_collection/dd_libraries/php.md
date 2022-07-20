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
- link: "/tracing/glossary/"
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
{{< site-region region="us3,us5,eu,gov" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][1] documentation.


[1]: /tracing/serverless_functions/
{{% /tab %}}
{{% tab "Other Environments" %}}

Tracing is available for a number of other environments, such as  [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3], and [Azure App Service][4].

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

Download the official installer:

```shell
curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
```

Run the installer:

```shell
# Full installation: APM + ASM + Profiling (Beta)
php datadog-setup.php --php-bin=all --enable-appsec --enable-profiling

# APM only
php datadog-setup.php --php-bin=all

# APM + ASM
php datadog-setup.php --php-bin=all --enable-appsec

# APM + Profiling (Beta)
php datadog-setup.php --php-bin=all --enable-profiling
```

This command installs the extension to all the PHP binaries found in the host or container. If `--php-bin` is omitted, the installer runs in interactive mode and asks the user to select the binaries for installation. The value of `--php-bin` can be a path to a specific binary in case `dd-trace-php` should be installed only to such binary.

Restart PHP (PHP-FPM or the Apache SAPI) and visit a tracing-enabled endpoint of your application. For traces, see the [APM Service List][5].

<div class="alert alert-info">
<strong>Note:</strong>
It may take a few minutes before traces appear in the UI. If traces still do not appear after a few minutes, create a <a href="/tracing/troubleshooting/tracer_startup_logs?tab=php#php-info"><code>phpinfo()</code></a> page from the host machine and scroll down to the `ddtrace`. Failed diagnostic checks appear in this section to help identify any issues.
</div>

<div class="alert alert-warning">
<strong>Apache ZTS:</strong>
If the PHP CLI binary is built as NTS (non thread-safe), while Apache uses a ZTS (Zend thread-safe) version of PHP, you need to manually change the extension load for the ZTS binary. Run <code>/path/to/php-zts --ini</code> to find where Datadog's <code>.ini</code> file is located, then add the <code>-zts</code> suffix from the file name. For example, from <code>extension=ddtrace-20210902.so</code> to <code>extension=ddtrace-20210902-zts.so</code>.
</div>


## Automatic instrumentation

Tracing is automatically enabled by default. Once the extension is installed, **ddtrace** traces your application and sends traces to the Agent.

Datadog supports all web frameworks out of the box. Automatic instrumentation works by modifying PHP's runtime to wrap certain functions and methods to trace them. The PHP tracer supports automatic instrumentation for several libraries.

Automatic instrumentation captures:

* Method execution time
* Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
* Unhandled exceptions, including stacktraces if available
* A total count of traces (for example, web requests) flowing through the system

## Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][6] for details.

## Tracing CLI scripts

### Short-running CLI scripts

A short-running script typically runs for a few seconds or minutes and the expected behavior is to receive one trace each time the script is executed.

By default, tracing is disabled for PHP scripts that run from the command line. Opt in by setting `DD_TRACE_CLI_ENABLED` to `1`.

```
$ export DD_TRACE_CLI_ENABLED=1

# Optionally, set the agent host and port if different from localhost and 8126, respectively
$ export DD_AGENT_HOST=agent
$ export DD_TRACE_AGENT_PORT=8126
```

For example, assume the following `script.php` runs a Curl request:

```php
<?php

sleep(1);

$ch = curl_init('https://httpbin.org/delay/1');
curl_exec($ch);

sleep(1);

```

Run the script:

```
$ php script.php
```

Once run, the trace is generated and sent to the Datadog backend when the script terminates.

{{< img src="tracing/setup/php/short-running-cli.jpg" alt="Trace for a short running PHP CLI script" >}}

### Long-running CLI scripts

A long-running script runs for hours or days. Typically, such scripts repetitively execute a specific task, for example processing new incoming messages or new lines added to a table in a database. The expected behavior is that one trace is generated for each "unit of work", for example the processing of a message.

By default, tracing is disabled for PHP scripts that run from the command line. Opt in by setting `DD_TRACE_CLI_ENABLED` to `1`.

```
$ export DD_TRACE_CLI_ENABLED=1
# With this pair of settings, traces for each "unit of work" is sent as soon as the method execution terminates.
$ export DD_TRACE_GENERATE_ROOT_SPAN=0
$ export DD_TRACE_AUTO_FLUSH_ENABLED=1

# Optionally, set service name, env, etc...
$ export DD_SERVICE=my_service

# Optionally, set the agent host and port if different from localhost and 8126, respectively
$ export DD_AGENT_HOST=agent
$ export DD_TRACE_AGENT_PORT=8126
```

For example, assume the following `long_running.php` script:

```php
<?php


/* Datadog specific code. It can be in a separate files and required in this script */
use function DDTrace\trace_method;
use function DDTrace\trace_function;
use DDTrace\SpanData;

trace_function('processMessage', function(SpanData $span, $args) {
    // Access method arguments and change resource name
    $span->resource =  'message:' . $args[0]->id;
    $span->meta['message.content'] = $args[0]->content;
    $span->service = 'my_service';
});

trace_method('ProcessingStage1', 'process', function (SpanData $span, $args) {
    $span->service = 'my_service';
    // Resource name defaults to the fully qualified method name.
});

trace_method('ProcessingStage2', 'process', function (SpanData $span, $args) {
    $span->service = 'my_service';
    $span->resource = 'message:' . $args[0]->id;
});
/* Enf of Datadog code */

/** Represents a message to be received and processed */
class Message
{
    public $id;
    public $content;

    public function __construct($id, $content)
    {
        $this->id   = $id;
        $this->content = $content;
    }
}

/** One of possibly many processing stages, each of which should have a Span */
class ProcessingStage1
{
    public function process(Message $message)
    {
        sleep(1);
        $ch = curl_init('https://httpbin.org/delay/1');
        curl_exec($ch);
    }
}

/** One of possibly many processing stages, each of which should have a Span */
class ProcessingStage2
{
    public function process(Message $message)
    {
        sleep(1);
    }
}

/** In a real world application, this will read new messages from a source, for example a queue */
function waitForNewMessages()
{
    return [
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
        new Message($id = (time() + rand(1, 1000)), 'content of a message: ' . $id),
    ];
}

/** This function is the "unit of work", each execution of it will generate one single trace */
function processMessage(Message $m, array $processors)
{
    foreach ($processors as $processor) {
        $processor->process($m);
        usleep(100000);
    }
}

$processors = [new ProcessingStage1(), new ProcessingStage2()];

/** A loop that runs forever waiting for new messages */
while (true) {
    $messages = waitForNewMessages();
    foreach ($messages as $message) {
        processMessage($message, $processors);
    }
}
```

Run the script:

```
$ php long_running.php
```

Once run, one trace is generated and sent to the Datadog backend every time a new message is processed.

{{< img src="tracing/setup/php/long-running-cli.jpg" alt="Trace for a long running PHP CLI script" >}}

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

If PHP was installed from the [Sury Debian DPA][7], debug symbols are already available from the DPA. For example, for PHP-FPM 7.2:

```
apt update
apt install -y php7.2-fpm-dbgsym
```

##### PHP installed from a different package

The Debian project maintains a wiki page with [instructions to install debug symbols][8].

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

If PHP was installed from the [`ppa:ondrej/php`][9], edit the apt source file `/etc/apt/sources.list.d/ondrej-*.list` by adding the `main/debug` component.

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

If the `-dbg` and `-dbgsym` packages cannot be found, enable the `ddebs` repositories. Detailed information about how to [install debug symbols][10] from the `ddebs` can be found in the Ubuntu documentation.

For example, for Ubuntu 18.04+, enable the `ddebs` repo:

```
echo "deb http://ddebs.ubuntu.com $(lsb_release -cs) main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list

echo "deb http://ddebs.ubuntu.com $(lsb_release -cs)-updates main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list
```

Import the signing key (make sure the [signing key is correct][11]):

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

The resulting Valgrind trace is printed by default to the standard error, follow the [official documentation][12] to print to a different target. The expected output is similar to the example below for a PHP-FPM process:

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
[2]: https://app.datadoghq.com/apm/docs
[3]: /tracing/glossary/
[4]: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
[5]: https://app.datadoghq.com/apm/services
[6]: /tracing/trace_collection/library_config/php/
[7]: https://packages.sury.org/php/
[8]: https://wiki.debian.org/HowToGetABacktrace
[9]: https://launchpad.net/~ondrej/+archive/ubuntu/php
[10]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages
[11]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages#Getting_-dbgsym.ddeb_packages
[12]: https://valgrind.org/docs/manual/manual-core.html#manual-core.comment
