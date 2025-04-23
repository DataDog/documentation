---
title: Instrumenting Windows IIS Server
beta: true
code_lang: windows_iis
type: multi-code-lang
code_lang_weight: 6
further_reading:
- link: '/real_user_monitoring/browser/setup/server/'
  tag: 'Documentation'
  text: 'Browser Monitoring Auto-Instrumentation (Server-Side)'
---

<div class="alert alert-info">To try the preview for RUM Auto-Instrumentation, follow the instructions on this page.</div>

## Overview

RUM Auto-Instrumentation works by injecting the RUM Browser SDK into the HTML responses being served through a web server or proxy.

To understand important limitations and compatibility requirements, see [Limitations][1].

## Prerequisites

The [Datadog Agent][2] is installed and configured.

## Set up your RUM application

The auto-instrumentation method leverages a Windows module that injects the RUM SDK into the response body for responses served by the IIS instance.

1. In Datadog, navigate to the [**Digital Experience > Add an Application Page**][3] and select the JavaScript (JS) application type.
2. Select **Auto-Instrumentation** and **Windows IIS**.
3. Set up the IIS module using either the GUI installer or command line as described below:

{{% collapse-content title="Using the GUI installer (recommended)" level="h5" %}}

1. Download the [Datadog RUM installer][1].
2. Follow the installer as an administrator by opening the `.msi` file.
3. Follow the prompts and accept the license agreement.
4. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][4].
5. Copy and run the config command shown for each IIS site that you wish to inject RUM into.

[1]: https://rum-auto-instrumentation.s3.us-east-1.amazonaws.com/iis/latest/x64/injector_IIS.msi

{{% /collapse-content %}}

{{% collapse-content title="Using the command line" level="h5" %}}

1. Run the Powershell command line as an administrator.
2. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][4].
3. Copy and run the config command shown for each IIS site that you wish to inject RUM into.

[1]: /real_user_monitoring/guide/best-practices-for-rum-sampling/

{{% /collapse-content %}}

## Updating your RUM application

You can adjust your Session Sampling and Session Replay Sampling rates from the Application Management page.

To update your RUM Application:

1. Go to your RUM application from the [Application Management][3] list.
2. On the **SDK Configuration** page, adjust the slider or enter a specific percentage in the input box for Session Sampling or Session Replay Sampling.
3. Copy and replace the code in the Datadog RUM config file for the IIS site that you instrumented.

## Troubleshooting

### RUM is not injected

If you notice that RUM is not being injected into HTML pages, consider the following potential causes:

- **Content-Type mismatch**: RUM is injected only into HTML pages. If the `Content-Type` header does not correctly indicate `text/html`, the injection is skipped.

### Limitations
See other [Limitations][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/setup/server/#limitations
[2]: /agent/
[3]: https://app.datadoghq.com/rum/list/create/
[4]: /real_user_monitoring/guide/best-practices-for-rum-sampling/
