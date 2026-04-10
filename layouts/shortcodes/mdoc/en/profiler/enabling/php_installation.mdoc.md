<!--
Installation steps for PHP profiler (steps 2+ and closing).
Parent page provides shared step 1 (Agent).
-->

2. Download and run the `datadog-setup.php` installer:

    ```shell
    curl --proto '=https' --tlsv1.2 -sSfLO \
      https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
    ```

    ```shell
    php datadog-setup.php --enable-profiling --php-bin=all
    ```

    This script is interactive and asks which of the detected PHP locations it should install to. At the end of the script, it outputs the non-interactive version of the command arguments for future use.

3. Configure the profiler:

    ```shell
    php datadog-setup.php config set \
      -d datadog.service=app-name \
      -d datadog.env=prod \
      -d datadog.version=1.3.2
    ```

    Apache, PHP-FPM, FrankenPHP and other servers require a restart after changing the INI settings. See the [configuration docs][1] for more INI settings.

4. Validate the profiler extension is loaded by running `php -v` and checking for `datadog-profiling` in the output:

    ```text
    PHP 8.4.13 (cli) (built: Sep  5 2025 11:52:54) (ZTS)
    Copyright (c) The PHP Group
    Zend Engine v4.4.13, Copyright (c) Zend Technologies
        with Zend OPcache v8.4.13, Copyright (c), by Zend Technologies
        with datadog-profiling v1.13.0, Copyright Datadog, by Datadog
    ```

5. Optional: Set up [Source Code Integration][2] to connect your profiling data with your Git repositories.

6. After a couple of minutes, your profiles appear on the [Datadog APM > Profiler page][3]. If they do not, refer to the [Troubleshooting][4] guide.

[1]: /tracing/trace_collection/library_config/php/#environment-variable-configuration
[2]: /integrations/guide/source-code-integration/?tab=php
[3]: https://app.datadoghq.com/profiling
[4]: /profiler/profiler_troubleshooting/php/
