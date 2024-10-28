---
title: RUM Browser Monitoring Automatic Instrumentation
further_reading:
- link: '/real_user_monitoring/explorer/'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
- link: '/logs/log_collection/javascript/'
  tag: 'Documentation'
  text: 'Learn about the Datadog Browser SDK for Logs'
---

{{< callout url="<LINK TK>" btn_hidden="false" header="Access the Preview!">}}
RUM Auto-Injection in Preview. Sign up for access!
{{< /callout >}}

## Overview

Datadog RUM Auto-Instrumentation lets you opt into Real User Monitoring before automatically instrumenting all of your applications with Real User Monitoring. If you are interested in manual instrumentation per application, see [Custom Instrumentation][1].

RUM Auto-Instrumentation works by injecting a RUM SDK JS scriptlet into the headers of the HTML responses being served through a web server/proxy.

Once your applications have been instrumented, you can begin managing your RUM configurations per RUM application in Datadog or through Terraform.

## Prerequisites

The automatic installation method requires that you have the [Datadog Agent][] installed.

## Setup your RUM application

{{< tabs >}}
{{% tab "Nginx" %}}

The Datadog RUM Injector leverages the [Nginx Dynamic Modules capability][1] to implement a response body filter. The filter injects the RUM SDK into the response body for responses identified as HTML.

To automatically instrument your RUM application:

1. In Datadog, navigate to the [**Digital Experience > Add an Application Page**][2] and select the JavaScript (JS) application type.
2. Select **Auto-Instrumentation** and **NGINX**.
3. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][3].
4. Copy and run the installer command to load the Datadog RUM SDK Injector onto your Nginx module.

[1]: https://docs.nginx.com/nginx/admin-guide/dynamic-modules/dynamic-modules/
[2]: https://app.datadoghq.com/rum/list
[3]: /real_user_monitoring/guide/sampling-browser-plans/

**Note**: All [initialization parameters][2] are supported except for `allowedTracingUrls` and `excludedActivityUrls`.

{{% /tab %}}
{{% tab "Windows IIS" %}}

The Datadog RUM Injector leverages a [Windows module][TK] that injects the RUM SDK into the response body for responses served by the IIS instance. Currently only supports Windows IIS Sites.

1. In Datadog, navigate to the [**Digital Experience > Add an Application Page**][2] and select the JavaScript (JS) application type.
2. Select **Auto-Instrumentation** and **Windows IIS**.
3. Choose to set up the IIS module using either the GUI installer or command line.

   **Using the GUI installer**

   1. Download the Datadog RUM installer.
   2. Follow the installer as an administrator by opening the `.msi` file.
   3. Follow the prompts and accept the license agreement.
   4. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][3].
   5. Copy and run the config command shown for each IIS site that you wish to inject RUM into.

   **Using the command line**
   1. Run the Powershell command line as an administrator.
   2. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][3].
   3. Copy and run the config command shown for each IIS site that you wish to inject RUM into.

{{% /tab %}}
{{< /tabs >}}

## Updating your RUM application

{{< tabs >}}
{{% tab "Nginx" %}}

To update your RUM Application, update your Datadog RUM configs in your `NGINX.conf` file.

{{% /tab %}}

{{% tab "Windows IIS" %}}

To update your RUM application, update the Datadog RUM configs file for the IIS site that you instrumented.

{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

{{< tabs >}}
{{% tab "Nginx" %}}



{{% /tab %}}

{{% tab "Windows IIS" %}}

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/custom_setup
[2]: /real_user_monitoring/browser/custom_setup/#initialization-parameters