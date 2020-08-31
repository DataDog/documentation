---
title: Troubleshooting .NET Framework Traces
kind: documentation
---

## Problem 

.NET Framework APM traces are not showing within Datadog.

## Solution

If .NET Framework APM traces are not showing within Datadog, review the possible reasons below.

### Compatability 

The .NET Tracer supports automatic instrumentation on .NET Framework 4.5 and above.   Additionally, only [supported frameworks][3] are automatically instrumented.  If you are are missing spans from a part of your application, please confirm the integration and version are supported and [open a support ticket][4] with this information provided to expedite our review.


### Confirm installation 

#### Datadog Agent

Verify the Datadog Agent for Windows OS been installed locally. If not, visit the [Datadog Windows Agent][1] guide.

#### Datadog .NET tracer

Verify the Datadog .NET tracer been installed locally. If not, visit our [Datadog .NET APM release page][2].

### Automatic instrumentation 

#### Environment variables

For automatic instrumentation of IIS applications, the required environment variables must be set within the `W3SVC` & `WAS` Windows registry paths. 

##### Steps

1. Run `regedit.exe` to open the Windows Registry Editor.
2. Check the following paths: 
```text
HKLM:SYSTEM\CurrentControlSet\Services\W3SVC
HKLM:SYSTEM\CurrentControlSet\Services\WAS
```
3. Create a multi-string value: 
    * Set the value name to "Environment".
    * Ensure the Value data contains the following:
{{< code-block lang="default">}}
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
{{< /code-block >}}
4. Restart IIS via: 
```text
net stop was /y
net start w3svc
```

### Hybrid Instrumentation, (Custom & Automatic)

When using both custom and automatic instrumentation, it is important to keep the MSI installer and NuGet package versions in sync.


[1]:/agent/basic_agent_usage/windows/?tab=gui
[2]:https://github.com/DataDog/dd-trace-dotnet/releases/latest
