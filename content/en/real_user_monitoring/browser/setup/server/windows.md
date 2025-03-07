---
title: Instrumenting Windows IIS Server 
beta: true
code_lang: windows
type: multi-code-lang
code_lang_weight: 5
further_reading:
- link: '/real_user_monitoring/explorer/'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
- link: '/logs/log_collection/javascript/'
  tag: 'Documentation'
  text: 'Learn about the Datadog Browser SDK for Logs'
---

<div class="alert alert-info">RUM SDK Auto-Injection for Windows IIS is in Preview.</div>

{{% rum-browser-setup-limitations-prereqs %}}

## Set up your RUM application

Auto-Instrumentation leverages a Windows module that injects the RUM SDK into the response body for responses served by the IIS instance.

1. In Datadog, navigate to the [**Digital Experience > Add an Application Page**][3] and select the JavaScript (JS) application type.
2. Select **Auto-Instrumentation** and **Windows IIS**.
3. Set up the IIS module using either the GUI installer or command line as described below:

### Installation

{{< tabs >}}
{{% tab "Using the GUI installer (recommended)" %}}

1. Download the Datadog RUM installer.
2. Follow the installer as an administrator by opening the `.msi` file.
3. Follow the prompts and accept the license agreement.
4. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][1].
5. Copy and run the config command shown for each IIS site that you wish to inject RUM into.

[1]: /real_user_monitoring/guide/best-practices-for-rum-sampling/

{{% /tab %}}
{{% tab "Using the command line" %}}

1. Run the Powershell command line as an administrator.
2. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][1].
3. Copy and run the config command shown for each IIS site that you wish to inject RUM into.

[1]: /real_user_monitoring/guide/best-practices-for-rum-sampling/

{{% /tab %}}
{{< /tabs >}}

## Updating your RUM application

You can adjust your Session Sampling and Session Replay Sampling rates from the Application Management page.

To update your RUM Application:

1. Go to your RUM application from the [Application Management][3] list.
2. On the Instrument Your Application page, adjust the slider or enter a specific percentage in the input box for Session Sampling or Session Replay Sampling.
3. Copy and replace the code in the Datadog RUM config file for the IIS site that you instrumented.

## Troubleshooting

### RUM is not injected

If you notice that RUM is not being injected into HTML pages, consider the following potential causes:

- **Content-Type mismatch**: RUM is injected only into HTML pages. If the `Content-Type` header does not correctly indicate `text/html`, the injection is skipped.
- **Upstream server has end-to-end encryption or content compression**: See [Limitations][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/advanced_configuration/
[2]: /agent/
[3]: https://app.datadoghq.com/rum/list
[4]: /real_user_monitoring/browser/setup/server/windows/#limitations
