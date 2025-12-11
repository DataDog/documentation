---
title: Single Step APM Instrumentation on Windows
code_lang: windows
type: multi-code-lang
code_lang_weight: 30
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
---

## Overview

With Single Step Instrumentation (SSI), you can enable APM for your Java and .NET applications on Windows VMs using a single Datadog Agent installation command.

## Enable APM on Windows

<div class="alert alert-info">Before proceeding, confirm that your environment is compatible by reviewing the <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">SSI compatibility guide.</a></div>

You can enable APM on Windows in the following ways:
* Instrument only .NET applications on IIS
* Instrument all Java and .NET applications across your entire Windows host

{{< callout url="https://www.datadoghq.com/product-preview/single-step-instrumentation-on-windows-vms/"
 btn_hidden="false" header="Join the Preview!">}}
Host-wide instrumentation for Windows is in Preview.
{{< /callout >}}

{{< tabs >}}
{{% tab "IIS" %}}

To instrument only .NET applications running on IIS:

1. In Datadog, go to [Install the Datadog Agent on Windows][1].
1. In the **Customize your observability coverage** section, toggle **Application Performance Monitoring (APM)**.
1. (Optional) Set your SDK version:
   
   By default, Single Step Instrumentation installs the latest supported version of the Datadog .NET SDK. If you need to pin a specific version:

   1. Under **Instrumentation Configuration**, select **Customize Library Versions**.
   1. Under .NET, choose the version you want to use.
   
1. Copy and run the provided MSI install command on your Windows host.
1. Restart the IIS applications you want instrumented. (You do not need to restart the entire IIS server.)

After installation, the Agent automatically loads the Datadog .NET SDK into supported application processes to enable distributed tracing.

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows

{{% /tab %}}

{{% tab "Host-wide (Preview)" %}}

To instrument Java and .NET applications across your entire Windows host:

1. In Datadog, go to [Install the Datadog Agent on Windows][1].
1. In the **Customize your observability coverage** section, toggle **Application Performance Monitoring (APM)**.
1. (Optional) Set your SDK version:
   
   By default, Single Step Instrumentation installs the latest supported version of the Datadog .NET and Java SDK. If you need to pin a specific version:

   1. Under **Instrumentation Configuration**, select **Customize Library Versions**.
   1. Under .NET, choose the version you want to use.
   
1. Copy and run the provided MSI install command on your Windows host.
1. Restart the services you want instrumented.

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

## Configure Unified Service Tags

Unified Service Tags (USTs) apply consistent tags across traces, metrics, and logs, making it easier to navigate and correlate your observability data. Learn how to [set USTs for Windows services][2].

## Enable SDK-dependent products and features

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK. These include capabilities such as [Continuous Profiler][5], [Application Security Monitoring][6], and [trace ingestion controls][7].

To enable products, [set environment variables][3] in your application configuration.

## Remove Single Step APM instrumentation from your Agent

To disable SSI for .NET on your host, run:

```shell
&"C:\Program Files\Datadog\Datadog Agent\bin\datadog-installer.exe" remove datadog-apm-library-dotnet
```

## Troubleshooting

If you encounter problems enabling APM with SSI, see the [SSI troubleshooting guide][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: /integrations/windows-service/#tags
[3]: /tracing/trace_collection/library_config/
[4]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[5]: /profiler/
[6]: /security/application_security/
[7]: /tracing/trace_pipeline/ingestion_controls/