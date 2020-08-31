---
title: .NET Troubleshooting
kind: documentation
---

If your .NET application's traces are not showing up within Datadog UI after install, there are a few common troubleshooting items to look into.

## .NET Framework

### Compatability 

The .NET Tracer supports automatic instrumentation on .NET Framework 4.5 and above. Additionally, only [supported frameworks][1] are automatically instrumented.  

If you are are missing spans from a part of your application, please confirm the integration and version are supported and [open a support ticket][2] with this information provided to expedite our review.

### Confirm installation 

#### Datadog Agent

Verify the Datadog Agent for Windows OS been installed locally. If not, visit the [Datadog Windows Agent][3] guide.

#### Datadog .NET tracer

Verify the Datadog .NET tracer been installed locally. If not, visit our [Datadog .NET APM release page][4].

### Confirm environment variables are correct

For automatic instrumentation of IIS applications, the required environment variables must be set within the `W3SVC` & `WAS` Windows registry paths. 

#### Automatic Steps

We recommend to use the [.NET APM .msi installer][4] to repair/reinstall to restore the required environment variables. 

In order for the Windows OS to respect the newly introducted environment variables, an IIS restart must take place, please see below for IIS restart commands: 

```text
net stop was /y
net start w3svc
```

#### Manual Steps

1. Run `regedit.exe` to open the Windows Registry Editor.
2. Check the following paths: 
```text
HKLM:SYSTEM\CurrentControlSet\Services\W3SVC
HKLM:SYSTEM\CurrentControlSet\Services\WAS
```
3. Create a multi-string value: 
    * Set the value name to "Environment".
    * Ensure the value data contains the following:
{{< code-block lang="default">}}
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
{{< /code-block >}}
4. Restart IIS:
```text
net stop was /y
net start w3svc
```

### Hybrid instrumentation

When using both custom and automatic instrumentation, it is important to keep the MSI installer and NuGet package versions in sync.

If [custom instrumented][5] spans are not appearing correctly in the Datadog UI, compare your instrumentation against the provided examples.  If you have any questions about or need help with your custom instrumented spans, [create a support ticket][2] and provide the custom code written to generate the spans.


## .NET Core

### Compatability 

The .NET Tracer supports automatic instrumentation on .NET Core 2.1 and 3.1. 

The .NET Tracer works on .NET Core 2.0, 2.2, and 3.0, but these versions reached their end of life and are no longer supported by Microsoft, (please see [Microsoft's support policy][6] for more details). 

We recommend using the latest patch version of .NET Core 2.1 or 3.1.  Older versions of .NET Core on Linux/x64 have JIT compiler bugs that can cause applications to throw exceptions when using automatic instrumentation. If your application is running on .NET Core 2.0, 2.1.0-2.1.11, or 2.2.0-2.2.5, we strongly recommend you update your .NET Core runtime. If you cannot update, you may need to set the environment variable `DD_CLR_DISABLE_OPTIMIZATIONS=true` to work around the issue. See [DataDog/dd-trace-dotnet/issues/302][7] for more details.

If you are are missing spans from a part of your application, please confirm the integration and version are supported and [open a support ticket][2] with this information provided to expedite our review.

### Confirm installation 

#### Datadog Agent

Verify the Datadog Agent has installed. If not, visit the [Datadog Agent][8] guide.

#### Datadog .NET tracer

Verify the Datadog .NET tracer been installed locally. If not, visit our [Datadog .NET APM release page][4].


[1]: /tracing/compatibility_requirements/dotnet-framework/#integrations
[2]: /help/
[3]: /agent/basic_agent_usage/windows/?tab=gui
[4]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[5]: /tracing/custom_instrumentation/dotnet/
[6]: https://dotnet.microsoft.com/platform/support/policy/dotnet-core
[7]: https://github.com/DataDog/dd-trace-dotnet/issues/302#issuecomment-603269367
[8]: /agent/basic_agent_usage/?tab=agentv6v7
