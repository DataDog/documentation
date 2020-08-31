---
title: Troubleshooting .NET Framework Traces
kind: documentation
---

## Problem 

.NET Framework APM traces are not showing within Datadog.

## Solution

If .NET Framework APM traces are not showing within Datadog, please review the possible reasons below.

### Compatability 

The .NET Tracer supports automatic instrumentation on .NET Framework 4.5 and above. 


### Confirm Installation 

#### Datadog Agent

Has the Datadog Agent for Windows OS been installed locally? If not, please visit our [Datadog Windows agent][1] guide.

#### Datadog .NET Tracer 

Has the Datadog .NET tracer been installed locally? If not, please visit our [Datadog .NET APM release page][2].

### Automatic Instrumentation 

#### Verify Required Environment Variables

For Automatic Instrumentation for IIS application(s), the required environment variables must be set within the `W3SVC` & `WAS` Windows Registry paths. 

##### Steps

1. Run `regedit.exe` to open the Windows Registry Editor.
2. Check the following paths: 
```text
HKLM:SYSTEM\CurrentControlSet\Services\W3SVC
HKLM:SYSTEM\CurrentControlSet\Services\WAS
```
3. Create a Multi-String Value. 
    * With the Value name set to "Environment"
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
