---
title: Instrumenting Apache Server
description: "Configure Apache httpd server to automatically inject RUM Browser SDK into HTML responses using the Datadog module."
code_lang: apache
type: multi-code-lang
code_lang_weight: 3
site_support_id: rum_server_apache
aliases:
  - /real_user_monitoring/browser/setup/server/apache/
further_reading:
- link: '/real_user_monitoring/application_monitoring/browser/setup/server'
  tag: 'Documentation'
  text: 'Browser Monitoring Auto-Instrumentation'
---

## Overview

RUM Auto-Instrumentation works by injecting the RUM Browser SDK into the HTML responses being served through a web server or proxy. This method uses the [Apache httpd Modules capability][3] to implement a response body filter. The filter injects the RUM Browser SDK into the response body for responses identified as HTML. After auto-instrumentation is set up, you can manage configurations from the UI.

{{% rum-browser-auto-instrumentation-limitations %}}

## Prerequisites

The [Datadog Agent][2] is installed and configured.

## Setup

Choose your preferred setup method.

**Note**: Apache HTTP Server must be restarted regardless of which instrumentation method is used.

{{< tabs >}}
{{% tab "Single-Step Instrumentation" %}}

Enables RUM Browser monitoring with [Single Step Instrumentation (SSI)][101].
When you run the Agent installation with RUM enabled, Datadog:
- Loads the Datadog httpd module into your Apache HTTP Server through SSI
- Creates a RUM application for you
- Configures the httpd module with the required RUM settings

**This approach requires no code changes and no manual Apache configuration.**

1. Go to the [**Agent Installation**][102] page.
2. Select your platform (for example, Linux).
3. In the **Customize your observability coverage** section, enable **Real User Monitoring** under **Application Observability**.

   A RUM application is automatically created for you when you enable this option.

4. Copy the generated installation command and run it on your host.
5. Restart Apache HTTP Server to begin collecting RUM sessions.

[101]: /tracing/trace_collection/single-step-apm/
[102]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview

{{% /tab %}}
{{% tab "Fleet Automation" %}}

Use this method to enable RUM on hosts that already run the Datadog Agent, without running installation commands or editing configuration files on the host. [Fleet Automation][101] uses [Remote Configuration][102] to install the Datadog httpd module and push the RUM configuration to the Agent.

**Prerequisite**: Remote Configuration is enabled on the Agent.

1. In Datadog, go to [**Fleet Automation**][103].
2. Select the hosts running Apache HTTP Server where you want to enable RUM.
3. Enable **Real User Monitoring** and select or create the RUM application to use.
4. Apply the changes. Fleet Automation installs the Datadog httpd module and pushes the RUM configuration to the selected hosts.
5. Restart Apache HTTP Server to begin collecting RUM sessions.

[101]: /agent/fleet_automation/
[102]: /remote_configuration/
[103]: https://app.datadoghq.com/fleet

{{% /tab %}}
{{% tab "Managed Instrumentation" %}}

Use this method if you need to configure sampling rates or application settings before deploying.

1. In Datadog, navigate to {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}, click [{{< ui >}}New Application{{< /ui >}}][101], and select the JavaScript (JS) application type.
2. Select {{< ui >}}Auto-Instrumentation{{< /ui >}} and {{< ui >}}Apache httpd{{< /ui >}}.
3. Configure your application parameters. See [guidance on configuring sampling][102].
4. Copy and run the installer command to load the Datadog httpd module with the RUM SDK Injector onto httpd.
5. After the installer successfully installs the SDK Injector, restart Apache HTTP Server to begin collecting RUM sessions.
6. (Optional) To verify the module is successfully injecting the RUM Browser SDK into HTML pages, check the error logs for relevant messages. The module logs important steps during the injection process. Confirm that Apache HTTP Server is configured with at least the `info` log level.

[101]: https://app.datadoghq.com/rum/list
[102]: /real_user_monitoring/guide/sampling-browser-plans/

{{% /tab %}}
{{% tab "Manual Instructions" %}}

Use this method if you cannot run the installation script or need full control over the Apache HTTP Server configuration.

### Download the module file

1. Download the [zipped module][101].
2. Extract the zip to obtain the `mod_datadog.so` file. Move it to a location that Apache HTTP Server has access to (referenced as `<RUM_MODULE_PATH>` in the steps below).

### Update Apache HTTP Server configuration

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

### Restart Apache HTTP Server

1. Restart Apache HTTP Server to begin collecting data for your Datadog RUM application. By default, the RUM SDK is injected into all HTML documents. You may need to clear your browser cache.
2. (Optional) To verify the module is successfully injecting the RUM Browser SDK into HTML pages, check the httpd error logs for relevant messages. The module logs important steps during the injection process. Confirm that Apache HTTP Server is configured with at least the `info` log level.

[101]: https://rum-auto-instrumentation.s3.amazonaws.com/httpd/latest/mod_datadog-amd64.zip

{{% /tab %}}
{{< /tabs >}}

## Updating your RUM application

You can update your RUM application settings at any time. From the [Application Management][4] list, select your RUM application and navigate to the {{< ui >}}SDK Configuration{{< /ui >}} page. Click {{< ui >}}Save Changes{{< /ui >}} after making updates.

### Sampling rates

Adjust the slider or enter a specific percentage in the input box for Session Sampling or Session Replay Sampling. Copy and paste the configuration snippet to your `/opt/datadog-httpd/datadog.conf` file.

{{% rum-browser-auto-instrumentation-update-user-attributes %}}

## Troubleshooting

### RUM is not injected

If you notice that RUM is not being injected into HTML pages, consider the following potential causes:

- **Content-Type mismatch**: RUM is injected only into HTML pages. If the `Content-Type` header does not correctly indicate `text/html`, the injection is skipped.


## Uninstall

To manually remove RUM from your auto-instrumented web server:

1. Locate the Apache (`httpd`) configuration file by running `httpd -V`. Depending on the Linux distribution used, this binary file could be named `http`, `apachectl`, `apache2` or `apache2ctl`. The following steps use `httpd` as an example. In this instance, the file location could be: `/usr/local/apache2/conf/httpd.conf`.
2. At the end of the httpd configuration file, remove the line: `Include /opt/datadog-httpd/datadog.conf`.
3. Delete the directory `/opt/datadog-httpd/` and all of its contents.
4. Restart or reload Apache httpd.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /agent/
[3]: https://httpd.apache.org/modules/
[4]: https://app.datadoghq.com/rum/list
