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

With Single Step Instrumentation (SSI), you can automatically enable APM for your .NET Framework and .NET Core applications running on Windows IIS, using a single MSI command during the Datadog Agent installation. No separate SDK installation or code changes are required.

## Enable APM on Windows

**Note:** Only .NET applications running in IIS are supported for Single Step Instrumentation on Windows.

To enable APM with Single Step Instrumentation on Windows:

1. In Datadog, go to the Install Datadog [Windows Agent page][1] .
1. In the **Customize your observability coverage** section, toggle **Application Performance Monitoring (APM)**.
1. (Optional) Set your SDK tracer version:
   
   By default, Single Step Instrumentation installs the latest supported version of the Datadog .NET Tracer. If you need to pin a specific version:

   1. Under **Application Performance Monitoring (APM)**, select **Customize library versions**.
   1. Under .NET, choose the version you want to use.
   
1. Copy and run the provided MSI install command on your Windows host.
1. Restart the IIS applications you want instrumented. (You do not need to restart the entire IIS server.)

After installation, the Agent automatically loads the Datadog .NET SDK into supported application processes to enable distributed tracing.

## Configure Unified Service Tags

Unified Service Tags (USTs) connect traces, metrics, and logs by applying consistent tags across your telemetry. This makes it easier to navigate your observability data. Learn how to [set USTs for Windows services][2].

## Enable SDK-dependent products and features

Once SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK. These include capabilities such as Continuous Profiler, Application Security Monitoring, and trace ingestion controls.

To enable products, [set environment variables][3] in your application configuration.

## Remove Single Step APM instrumentation from your Agent

To disable SSI for .NET on your host, run:

```shell
&"C:\Program Files\Datadog\Datadog Agent\bin\datadog-installer.exe" remove datadog-apm-library-dotnet
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: /integrations/windows_service/#tags
[3]: /tracing/trace_collection/library_config/