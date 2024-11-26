---
title: Browser Monitoring Server-Side (Auto) Instrumentation
beta: true
code_lang: server
type: multi-code-lang
code_lang_weight: 2
further_reading:
- link: '/real_user_monitoring/explorer/'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
- link: '/logs/log_collection/javascript/'
  tag: 'Documentation'
  text: 'Learn about the Datadog Browser SDK for Logs'
---

<div class="alert alert-info">To try the preview for RUM SDK Auto-Injection, follow the setup instructions below.</div>

## Overview

Datadog RUM Server-Side Instrumentation (Auto-Instrumentation) lets you opt into Real User Monitoring (RUM) automatically by instrumenting web applications served through a web server or proxy.

RUM Auto-Instrumentation works by injecting a RUM SDK JavaScript scriptlet into the HTML responses being served through a web server or proxy.

After your applications have been instrumented, you can configure your RUM application in Datadog.

## Prerequisites

The automatic installation method requires that you have the [Datadog Agent][2] installed.

## Set up your RUM application

<div class="alert alert-warning">To request support for a web server that is not listed here, <a href="https://www.datadoghq.com/private-beta/rum-sdk-auto-injection/">fill out this form.</a></div>

{{< tabs >}}
{{% tab "Nginx" %}}

The Auto-Instrumentation method leverages the [Nginx Dynamic Modules capability][1] to implement a response body filter. The filter injects the RUM SDK into the response body for responses identified as HTML.

To automatically instrument your RUM application:

1. In Datadog, navigate to the [**Digital Experience > Add an Application Page**][2] and select the JavaScript (JS) application type.
2. Select **Auto-Instrumentation** and **Nginx**.
3. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][3].
4. Copy and run the installer command to load the Datadog RUM SDK Injector onto your Nginx module.
5. After the installer successfully installs the SDK Injector, restart Nginx to begin collecting RUM sessions.

[1]: https://docs.nginx.com/nginx/admin-guide/dynamic-modules/dynamic-modules/
[2]: https://app.datadoghq.com/rum/list
[3]: /real_user_monitoring/guide/sampling-browser-plans/

{{% /tab %}}
{{% tab "Windows IIS" %}}

Auto-Instrumentation leverages a Windows module that injects the RUM SDK into the response body for responses served by the IIS instance.

1. In Datadog, navigate to the [**Digital Experience > Add an Application Page**][1] and select the JavaScript (JS) application type.
2. Select **Auto-Instrumentation** and **Windows IIS**.
3. Set up the IIS module using either the GUI installer or command line as described below:

{{% collapse-content title="Using the GUI installer" level="h5" %}}

1. Download the Datadog RUM installer.
2. Follow the installer as an administrator by opening the `.msi` file.
3. Follow the prompts and accept the license agreement.
4. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][1].
5. Copy and run the config command shown for each IIS site that you wish to inject RUM into.

[1]: /real_user_monitoring/guide/best-practices-for-rum-sampling/

{{% /collapse-content %}}

{{% collapse-content title="Using the command line" level="h5" %}}

1. Run the Powershell command line as an administrator.
2. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][1].
3. Copy and run the config command shown for each IIS site that you wish to inject RUM into.

[1]: /real_user_monitoring/guide/best-practices-for-rum-sampling/

{{% /collapse-content %}}

[1]: https://app.datadoghq.com/rum/list/create/

{{% /tab %}}
{{< /tabs >}}

## Updating your RUM application

You can adjust your Session Sampling and Session Replay Sampling rates from the Application Management page.

{{< tabs >}}
{{% tab "Nginx" %}}

To update your RUM Application:

1. Go to your RUM application from the [Application Management][1] list.
2. On the Instrument your application page, adjust the slider or enter a specific percentage in the input box for Session Sampling or Session Replay Sampling.
3. Copy and run the installer command in your `NGINX.conf` file.

[1]: https://app.datadoghq.com/rum/list

{{% /tab %}}

{{% tab "Windows IIS" %}}

To update your RUM Application:

1. Go to your RUM application from the [Application Management][1] list.
2. On the Instrument Your Application page, adjust the slider or enter a specific percentage in the input box for Session Sampling or Session Replay Sampling.
3. Copy and replace the code in the Datadog RUM config file for the IIS site that you instrumented.

[1]: https://app.datadoghq.com/rum/list

{{% /tab %}}
{{< /tabs >}}

## Limitations

The available functionality has the following important limitations:

- If serving compressed traffic, the Auto-Instrumentation method is not able to inject the JS scriptlet into the HTML traffic.
- This instrumentation method does not support any [advanced RUM configurations][3]. However, `allowedTracingUrls` and `excludedActivityUrls` are supported for Nginx web servers.
- Auto-Instrumentation does not inject into encrypted requests served by Nginx or IIS related to TLS.
- (Nginx only) Auto-Instrumentation does not inject encrypted requests served by the Nginx web server.
- (Windows IIS only) Configuration for Auto-Instrumentation is only available per Windows IIS site.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/setup/
[2]: /agent/
[3]: /real_user_monitoring/browser/advanced_configuration/