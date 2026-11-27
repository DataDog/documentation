---
title: Instrumenting Windows IIS Server
description: "Configure Windows IIS server to automatically inject RUM Browser SDK into HTML responses using the Datadog module installer."
code_lang: windows_iis
type: multi-code-lang
code_lang_weight: 6
site_support_id: rum_server_windows_iis
aliases:
  - /real_user_monitoring/browser/setup/server/windows_iis
further_reading:
- link: '/real_user_monitoring/application_monitoring/browser/setup/server/'
  tag: 'Documentation'
  text: 'Browser Monitoring Auto-Instrumentation'
---

## Overview

RUM Auto-Instrumentation works by injecting the RUM Browser SDK into the HTML responses being served through a web server or proxy. This method uses a Windows module that injects the RUM SDK into the response body for responses served by the IIS instance. After auto-instrumentation is set up, you can manage configurations from the UI.

{{% rum-browser-auto-instrumentation-limitations %}}

## Prerequisites

The [Datadog Agent][2] is installed and configured.

## Setup

Choose your preferred setup method.

{{< tabs >}}
{{% tab "Single-Step Instrumentation" %}}

Enables RUM Browser monitoring with [Single Step Instrumentation (SSI)][101].
When you run the Agent installation with RUM enabled, Datadog:
- Loads the Datadog RUM module into your IIS server through SSI
- Creates a RUM application for you
- Configures the IIS module with the required RUM settings

**This approach requires no code changes and no manual IIS configuration.**

1. Go to the [**Agent Installation**][102] page.
2. Select **Windows** as your platform.
3. In the **Customize your observability coverage** section, enable **Real User Monitoring** under **Application Observability**.

   A RUM application is automatically created for you when you enable this option.

4. Copy the generated installation command and run it in PowerShell as an administrator on your host.
5. Restart IIS to begin collecting RUM sessions.

[101]: /tracing/trace_collection/single-step-apm/windows/
[102]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows

{{% /tab %}}
{{% tab "Fleet Automation" %}}

Use this method to enable RUM on hosts that already run the Datadog Agent, without running installers or editing configuration files on the host. [Fleet Automation][101] uses [Remote Configuration][102] to install the Datadog RUM module for IIS and push the RUM configuration to the Agent.

**Prerequisite**: Remote Configuration is enabled on the Agent.

1. In Datadog, go to [**Fleet Automation**][103].
2. Select the Windows hosts running IIS where you want to enable RUM.
3. Enable **Real User Monitoring** and select or create the RUM application to use.
4. Apply the changes. Fleet Automation installs the Datadog RUM module for IIS and pushes the RUM configuration to the selected hosts.
5. Restart IIS to begin collecting RUM sessions.

[101]: /agent/fleet_automation/
[102]: /remote_configuration/
[103]: https://app.datadoghq.com/fleet

{{% /tab %}}
{{% tab "Managed Instrumentation" %}}

Use this method if you need to configure sampling rates or application settings before deploying.

1. In Datadog, navigate to {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}, click [{{< ui >}}New Application{{< /ui >}}][101], and select the JavaScript (JS) application type.
2. Select {{< ui >}}Auto-Instrumentation{{< /ui >}} and {{< ui >}}Windows IIS{{< /ui >}}.
3. Configure your application parameters. See [guidance on configuring sampling][102].
4. Set up the IIS module using either the GUI installer or the command line:

   **Using the GUI installer (recommended)**

   1. Download the [Datadog RUM installer][103].
   2. Open the `.msi` file as an administrator to run the installer.
   3. Follow the prompts and accept the license agreement.
   4. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][102].
   5. Copy and run the config command shown for each IIS site that you want to inject RUM into.

   **Using the command line**

   1. Run PowerShell as an administrator.
   2. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][102].
   3. Copy and run the config command shown for each IIS site that you want to inject RUM into.

[101]: https://app.datadoghq.com/rum/list/create/
[102]: /real_user_monitoring/guide/best-practices-for-rum-sampling/
[103]: https://rum-auto-instrumentation.s3.us-east-1.amazonaws.com/iis/latest/x64/injector_IIS.msi

{{% /tab %}}
{{< /tabs >}}

## Updating your RUM application

You can update your RUM application settings at any time. From the [Application Management][3] list, select your RUM application and navigate to the {{< ui >}}SDK Configuration{{< /ui >}} page. Click {{< ui >}}Save Changes{{< /ui >}} after making updates.

### Sampling rates

Adjust the slider or enter a specific percentage in the input box for Session Sampling or Session Replay Sampling. Copy and replace the code in the Datadog RUM config file for the IIS site that you instrumented. 

{{% rum-browser-auto-instrumentation-update-user-attributes %}}

## Manual configuration

### Log Level

You can configure the log level in the IIS `applicationHost.config` file:

```
<configuration>
  <system.applicationHost>
    <datadogRumServer logLevel="debug" />
  </system.applicationHost>
</configuration>
```

 The possible `logLevel` values are:
- `debug`
- `info` (default)
- `error`

### Allowed tracing URLs

To connect RUM sessions and APM traces, you can configure `allowedTracingUrls` in the site's `web.config` file with comma-separated fixed URLs in the `datadogRum` section. Regular expressions and JavaScript functions are unsupported. See [more information about trace correlation][1].

```
<datadogRum>
  ...
  <option name="allowedTracingUrls" value="https://api.example.com,https://other.example.com" />
</datadogRum>
```

[1]: https://docs.datadoghq.com/tracing/other_telemetry/rum

## Troubleshooting

### RUM is not injected

If you notice that RUM is not being injected into HTML pages, consider the following potential causes:

- **Content-Type mismatch**: RUM is injected only into HTML pages. If the `Content-Type` header does not correctly indicate `text/html`, the injection is skipped.


## Uninstall

To completely remove RUM Auto-Instrumentation, uninstall Datadog RUM using the {{< ui >}}Windows Apps & Features{{< /ui >}} tool.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/browser/setup/server/#limitations
[2]: /agent/
[3]: https://app.datadoghq.com/rum/list/create/
