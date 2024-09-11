---
title: Troubleshooting the .NET Profiler
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 60
further_reading:
    - link: '/tracing/troubleshooting'
      tag: 'Documentation'
      text: 'APM Troubleshooting'
---

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, here are things to check, depending on the operating system.

{{< tabs >}}

{{% tab "Linux" %}}

1. Check that the Agent is installed and running.

2. Check that the profiler has been loaded from the loader log:

   1. Open the `dotnet-native-loader-dotnet-<pid>` log file in the `/var/log/datadog` folder.

   2. Look for `CorProfiler::Initialize: Continuous Profiler initialized successfully.` near the end. If that message is not present, enable debug logs by setting the `DD_TRACE_DEBUG` environment variable for the application.

   3. Restart the application.

   4. Open the `dotnet-native-loader-dotnet-<pid>` log file in the `/var/log/datadog` folder.

   5. Look for the `#Profiler` entry.

   6. Check the following lines to ensure that the profiler library has been loaded:
      ```
      [...] #Profiler
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x64;.\Datadog.Profiler.Native.dll
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x86;.\Datadog.Profiler.Native.dll
      [...] DynamicDispatcherImpl::LoadConfiguration: [PROFILER] Loading: .\Datadog.Profiler.Native.dll [AbsolutePath=/opt/datadog/linux-x64/./Datadog.Tracer.Native.so]
      [...] [PROFILER] Creating a new DynamicInstance object
      [...] Load: /opt/datadog/linux-x64/./Datadog.Tracer.Native.so
      [...] GetFunction: DllGetClassObject
      [...] GetFunction: DllCanUnloadNow
      ```

3. Check the result of profiles export:

   1. If debug logs were not enabled in step 2.2, set the `DD_TRACE_DEBUG` environment variable to `true` for the application and restart it.

   2. Open the `DD-DotNet-Profiler-Native-<Application Name>-<pid>` log file in the `/var/log/datadog` folder.

   3. Look for `libddprof error: Failed to send profile.` entries: this message means it can't contact the agent. Ensure the `DD_TRACE_AGENT_URL` is set to the correct Agent URL. See [Enabling the .NET Profiler-Configuration][1] for more information.

   4. If the `Failed to send profile` message is not present, look for `The profile was sent. Success?` entries.

      The following message means the profile has been sent successfully:
      ```
      true, Http code: 200
      ```

   5. Check the other HTTP codes for possible errors such as 403 for invalid API key.

4. For missing CPU or Wall time profiles only, check that the Datadog signal handler for stack walk has not been replaced:

   1. Open the `DD-DotNet-Profiler-Native-<Application Name>-<pid>` log file in the `/var/log/datadog` folder.

   2. Look for these two messages:
      - `Profiler signal handler was replaced again. It will not be restored: the profiler is disabled.`
      - `Fail to restore profiler signal handler.`

   3. If one of these messages is present, it means that the application code or a third party code is repeatedly reinstalling its own signal handler over the Datadog signal handler. To avoid any further conflict, the CPU and Wall time profilers are disabled.

   Note that the following message could appear, but it does not impact Datadog profiling: `Profiler signal handler has been replaced. Restoring it.` This indicates only that the Datadog signal handler is reinstalled when it was overwritten.

[1]: /profiler/enabling/dotnet/?tab=linux#configuration

{{% /tab %}}

{{% tab "Windows" %}}

The default profiler log directory is `%ProgramData%\Datadog .NET Tracer\logs\`. Prior to v2.24, the default directory was `%ProgramData%\Datadog-APM\logs\DotNet`.

1. Check that the Agent is installed and running and is visible in the Windows Services panel.

2. Check that the profiler has been loaded from the loader log:

   1. Open the `dotnet-native-loader-<Application Name>-<pid>` log file from the default log folder.

   2. Look for `CorProfiler::Initialize: Continuous Profiler initialized successfully.` near the end. If the `initialized successfully` message is not present, enable debug logs by setting the `DD_TRACE_DEBUG` environment variable for the application.

   3. Restart the application.

   4. Open the `dotnet-native-loader-<Application Name>-<pid>` log file from the default log folder.

   5. Look for the `#Profiler` entry.

   6. Check the following lines to ensure that the profiler library has been loaded:
      ```
      [...] #Profiler
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x64;.\Datadog.Profiler.Native.dll
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x86;.\Datadog.Profiler.Native.dll
      [...] DynamicDispatcherImpl::LoadConfiguration: [PROFILER] Loading: .\Datadog.Profiler.Native.dll [AbsolutePath=C:\Program Files\Datadog\.NET Tracer\win-x64\Datadog.Profiler.Native.dll]
      [...] [PROFILER] Creating a new DynamicInstance object
      [...] Load: C:\Program Files\Datadog\.NET Tracer\win-x64\Datadog.Profiler.Native.dll
      [...] GetFunction: DllGetClassObject
      [...] GetFunction: DllCanUnloadNow
      ```

3. Check the result of profiles export:

   1. If debug logs were not enabled in step 2.2, set the `DD_TRACE_DEBUG` environment variable to `true` for the application and restart it.

   2. Open the `DD-DotNet-Profiler-Native-<Application Name>-<pid>` log file from the default log folder.

   3. Look for `libddprof error: Failed to send profile.` entries: This message means that it can't contact the agent. Ensure the `DD_TRACE_AGENT_URL` is set to the correct Agent URL. See [Enabling the .NET Profiler-Configuration][1] for more information.

   4. If the `Failed to send profile` message is not present, look for `The profile was sent. Success?` entries.

      The following message means the profile has been sent successfully:
      ```
      true, Http code: 200
      ```

   5. Check the other HTTP codes for possible errors such as 403 for invalid API key.

[1]: /profiler/enabling/dotnet/?tab=linux#configuration

{{% /tab %}}

{{< /tabs >}}

Otherwise, turn on [debug mode][1] and [open a support ticket][2] with the debug files and the following information:
- Operating system type and version (for example, Windows Server 2019 or Ubuntu 20.04).
- Runtime type and version (for example, .NET Framework 4.8 or .NET Core 6.0).
- Application type (for example, Web application running in IIS).


## Reduce overhead when using the profiler

The [different profile types][3] have a fixed CPU and memory overhead, so *the more profiled applications, the higher the overhead.*

### Avoid enabling the profiler machine-wide

Datadog does not recommend enabling the profiler at machine-level or for all IIS application pools. To reduce the amount of resources used by the profiler, you can:
- Increase the allocated resources, such as increasing CPU cores.
- Profile only specific applications by setting environment in batch files instead of directly running the application.
- Reduce the number of IIS pools being profiled (only possible in IIS 10 or later).
- Disable wall time profiling with the setting `DD_PROFILING_WALLTIME_ENABLED=0`.

### Linux Containers

The exact value can vary but the fixed overhead cost means that the relative overhead of the profiler can be significant in very small containers. To avoid this situation, the profiler is disabled in containers with less than one core. You can override the one core threshold by setting the `DD_PROFILING_MIN_CORES_THRESHOLD` environment variable to a value less than one. For example, a value of `0.5` allows the profiler to run in a container with at least 0.5 cores.
However, in that case, there will be a CPU consumption increase, even for idle services, because the profiler threads always scan the application's threads. The less available core, the more the CPU consumption increases. 

Disabling the wall time profiler with the setting `DD_PROFILING_WALLTIME_ENABLED=0` decreases the CPU consumption by the profiler. If this is not enough, increase the CPU cores available for your containers.

### Disabling the profiler

Since APM tracing also relies on the CLR Profiling API, if you want to stop collecting .NET profiles but continue receiving .NET traces, set the following environment variables to disable only profiling.

```
 DD_PROFILING_ENABLED=0 
 CORECLR_ENABLE_PROFILING=1
```

## No CPU or Wall time because the application on Linux is hung

If an application hangs, or otherwise becomes unresponsive on Linux, CPU and Wall time samples are no longer available, follow these steps:

1. Open the `DD-DotNet-Profiler-Native-<Application Name>-<pid>` log file in the `/var/log/datadog/dotnet` folder.

2. Look for `StackSamplerLoopManager::WatcherLoopIteration - Deadlock intervention still in progress for thread ...`. If this message is not present, the rest does not apply.

3. If the message is found, it means that the stack walking mechanism could be deadlocked. To investigate the issue, dump the call stacks of all threads in the application. For example, to do this with the gdb debugger:

   1. Install gdb.

   2. Run the following command:
      ```
      gdb -p <process id> -batch -ex "thread apply all bt full" -ex "detach" -ex "quit"
      ```

   3. Send the resulting output to [Datadog Support][2].


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
[3]: /profiler/profile_types/?code-lang=dotnet