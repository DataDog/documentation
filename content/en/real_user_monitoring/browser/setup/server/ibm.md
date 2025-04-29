---
title: Instrumenting IBM Server
beta: true
code_lang: ibm
type: multi-code-lang
code_lang_weight: 4
further_reading:
- link: '/real_user_monitoring/browser/setup/server/'
  tag: 'Documentation'
  text: 'Browser Monitoring Auto-Instrumentation (Server-Side)'
---

<div class="alert alert-info">To try the preview for RUM Auto-Instrumentation, follow the instructions on this page.</div>

## Overview

RUM Auto-Instrumentation works by injecting the RUM Browser SDK into the HTML responses being served through a web server or proxy. This method leverages the [Apache httpd Modules capability][3] to implement a response body filter. The filter injects the RUM Browser SDK into the response body for responses
identified as HTML.

To understand important limitations and compatibility requirements, see [Limitations][1].

## Prerequisites

The [Datadog Agent][2] is installed and configured.

## Set up your RUM application

To automatically instrument your RUM application:

1. In Datadog, navigate to the [**Digital Experience > Add an Application Page**][4] and select the JavaScript (JS) application type.
2. Select **Auto-Instrumentation** and **Apache httpd**.
3. Configure your application parameters. See [guidance on configuring sampling][5].
   {{< img src="real_user_monitoring/browser/auto-instrumentation/auto-instrumentation-configuration.png" alt="Configure your application" style="width:90%;">}}

4. Copy and run the installer command to load the Datadog httpd Module with the RUM SDK Injector onto httpd.
   {{< img src="real_user_monitoring/browser/auto-instrumentation/httpd-code-snippet.png" alt="Auto-instrumentation Configuration" style="width:90%;">}}

5. After the installer successfully installs the SDK Injector, restart Apache HTTP Server to begin collecting RUM sessions.
6. (Optional) To verify the module is successfully injecting the RUM Browser SDK into HTML pages, check the error logs for relevant messages. The module logs important steps during the injection process. Ensure that Apache HTTP Server is configured with at least the `info` log level.

Alternatively, you can also [manually](#alternative-manual-installation) install and configure the module.

## Updating your RUM application

You can adjust your Session Sampling and Session Replay Sampling rates from the Application Management page.

To update your RUM Application:

1. Go to your RUM application from the [Application Management][4] list.
2. On the **SDK Configuration** page, adjust the slider or enter a specific percentage in the input box for Session Sampling or Session Replay Sampling.
3. Copy and paste the configuration snippet to your `/opt/datadog-httpd/datadog.conf` file.

## Troubleshooting

### RUM is not injected

If you notice that RUM is not being injected into HTML pages, consider the following potential causes:

- **Content-Type mismatch**: RUM is injected only into HTML pages. If the `Content-Type` header does not correctly indicate `text/html`, the injection is skipped.

### Limitations

See other [Limitations][1].

## Uninstall

To manually remove RUM from your auto-instrumented web server:

1. Locate the Apache (`httpd`) configuration file by running `httpd -V`. Depending on the Linux distribution used, this binary file could be named `http`, `apachectl`, `apache2` or `apache2ctl`. The following steps use `httpd` as an example. In this instance, the file location could be: `/usr/local/apache2/conf/httpd.conf`.
2. At the end of the httpd configuration file, remove the line: `Include /opt/datadog-httpd/datadog.conf`.
3. Delete the directory `/opt/datadog-httpd/` and all of its contents.
4. Restart or reload Apache httpd.

## (Alternative) Manual installation

To manually load the module onto your web server instead of running the installation script, follow the instructions below.

To manually instrument your RUM application:

### Download the module file

1. Download the [zipped module][6].
2. Extract the zip to obtain the `mod_datadog.so` file. Move it to a location that Apache HTTP Server has access to (referenced as `<RUM_MODULE_PATH>` in the steps below).

### Update Apache HTTP server configuration

1. Locate the configuration file. You can use `apachectl -V` to find the default configuration path. Add the following line to load the module:

   ```javascript
   LoadModule datadog_module <RUM_MODULE_PATH>
   ```

2. Within the appropriate **root** or **location** section, add the following:

   ```javascript
   # APM Tracing is enabled by default. The following line disables APM Tracing
   DatadogTracing Off
   DatadogRum On
   <DatadogRumSettings "v6">
       DatadogRumOption "applicationId" "<DATADOG_APPLICATION_ID>"
       DatadogRumOption "clientToken" "<DATADOG_CLIENT_TOKEN>"
       DatadogRumOption "site" "<DATADOG_SITE>"
       DatadogRumOption "service" "my-web-application"
       DatadogRumOption "env" "production"
       DatadogRumOption "version" "1.0.0"
       DatadogRumOption "sessionSampleRate" "100"
       DatadogRumOption "sessionReplaySampleRate" "100"
       DatadogRumOption "trackResources" "true"
       DatadogRumOption "trackLongTasks" "true"
       DatadogRumOption "trackUserInteractions" "true"
   </DatadogRumSettings>
   ```

### Restart your server

1. Restart the Apache HTTP Server to begin collecting data for your Datadog RUM application. By default, the RUM SDK is injected to all HTML documents. You may need to clear your browser cache.
2. (Optional) To verify the module is successfully injecting the RUM Browser SDK into HTML pages, check the httpd error logs for relevant messages. The module logs important steps during the injection process. Ensure that Apache HTTP Server is configured with at least the `info` log level.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/setup/server/#limitations
[2]: /agent/
[3]: https://httpd.apache.org/modules/
[4]: https://app.datadoghq.com/rum/list
[5]: /real_user_monitoring/guide/sampling-browser-plans/
[6]: https://rum-auto-instrumentation.s3.amazonaws.com/httpd/latest/mod_datadog-amd64.zip
