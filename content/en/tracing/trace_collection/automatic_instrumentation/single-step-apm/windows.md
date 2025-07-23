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
1. Copy and run the provided MSI install command on your Windows host.
1. Restart the IIS applications you want instrumented. (You do not need to restart the entire IIS server.)

After installation, the Agent automatically loads the Datadog .NET SDK into supported application processes to enable distributed tracing.

## Set SDK Tracer Versions

By default, Single Step Instrumentation installs the latest supported version of the Datadog .NET Tracer.

If you need to pin a specific version:

1. From the Windows Agent install page, after toggling **Application Performance Monitoring (APM)** instrumentation, select Customize library versions.
1. Under .NET, choose the version you want to use.
1. Copy the updated MSI command and run it on your host.

## Remove Single Step APM instrumentation from your Agent


To disable SSI for .NET on your host, run:

```shell
&"C:\Program Files\Datadog\Datadog Agent\bin\datadog-installer.exe" remove datadog-apm-library-dotnet
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows