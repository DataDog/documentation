---
title: Profiler Troubleshooting
kind: documentation
further_reading:
    - link: '/tracing/troubleshooting'
      tag: 'Documentation'
      text: 'APM Troubleshooting'
aliases:
  - /tracing/profiler/profiler_troubleshooting/
---

{{< programming-lang-wrapper langs="java,python,go,ruby,dotnet,php,ddprof" >}}
{{< programming-lang lang="java" >}}

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, turn on [debug mode][1] and [open a support ticket][2] with debug files and the following information:

- Operating system type and version (for example, Linux Ubuntu 20.04)
- Runtime type, version, and vendor (for example, Java OpenJDK 11 AdoptOpenJDK)


## Reduce overhead from default setup

If the default setup overhead is not acceptable, you can use the profiler with minimal configuration settings. Minimal configuration has the following changes compared to the default:

- Increases sampling threshold to 500ms for `ThreadSleep`, `ThreadPark`, and `JavaMonitorWait` events compared to 100ms default
- Disables `ObjectAllocationInNewTLAB`, `ObjectAllocationOutsideTLAB`, `ExceptionSample`, `ExceptionCount` events

To use the minimal configuration ensure you have `dd-java-agent` version `0.70.0` then change your service invocation to the following:

```
java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.jfr-template-override-file=minimal -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

## Increase profiler information granularity

If you want more granularity in your profiling data, you can specify the `comprehensive` configuration. Note that this approach will increase your profiler overhead at the cost of further granularity. Comprehensive configuration has the following changes compared to the default:

- Reduces sampling threshold to 10ms for `ThreadSleep`, `ThreadPark`, and `JavaMonitorWait` events compared to 100ms default
- Enables `ObjectAllocationInNewTLAB`, `ObjectAllocationOutsideTLAB`, `ExceptionSample`, `ExceptionCount` events

To use the comprehensive configuration ensure you have `dd-trace-java` version `0.70.0` then change your service invocation to the following:

```
java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.jfr-template-override-file=comprehensive -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

## Enabling the allocation profiler

On Java 15 and lower, the allocation profiler is turned off by default because it can overwhelm the profiler in allocation-heavy applications.

To enable the allocation profiler, start your application with the `-Ddd.profiling.allocation.enabled=true` JVM setting or the `DD_PROFILING_ALLOCATION_ENABLED=true` environment variable.

Alternatively, you can enable the following events in your `jfp` [override template file](#creating-and-using-a-jfr-template-override-file):

```
jdk.ObjectAllocationInNewTLAB#enabled=true
jdk.ObjectAllocationOutsideTLAB#enabled=true
```

[Learn how to use override templates.](#creating-and-using-a-jfr-template-override-file)

## Enabling the heap profiler
<div class="alert alert-info">The Java heap profiler feature is in beta.</div>
<div class="aler alert-info">This feature requires at least Java 11.0.12, 15.0.4, 16.0.2, 17.0.3 or 18 and newer</div>
To enable the heap profiler, start your application with the `-Ddd.profiling.heap.enabled=true` JVM setting or the `DD_PROFILING_HEAP_ENABLED=true` environment variable.

Alternatively, you can enable the following events in your `jfp` [override template file](#creating-and-using-a-jfr-template-override-file):

```
jdk.OldObjectSample#enabled=true
```

[Learn how to use override templates.](#creating-and-using-a-jfr-template-override-file)

## Removing sensitive information from profiles

If your system properties contain sensitive information such as user names or passwords, turn off the system property event by creating a `jfp` [override template file](#creating-and-using-a-jfr-template-override-file) with `jdk.InitialSystemProperty` disabled:

```
jdk.InitialSystemProperty#enabled=false
```

[Learn how to use override templates.](#creating-and-using-a-jfr-template-override-file)

## Large allocation events overwhelming the profiler

To turn off allocation profiling, disable the following events in your `jfp` [override template file](#creating-and-using-a-jfr-template-override-file):

```
jdk.ObjectAllocationInNewTLAB#enabled=false
jdk.ObjectAllocationOutsideTLAB#enabled=false
```

[Learn how to use override templates.](#creating-and-using-a-jfr-template-override-file)

## Memory leak detection slowing down garbage collector

To turn off memory leak detection, disable the following event in your `jfp` [override template file](#creating-and-using-a-jfr-template-override-file):

```
jdk.OldObjectSample#enabled=false
```

[Learn how to use override templates.](#creating-and-using-a-jfr-template-override-file)

## Exceptions overwhelming the profiler

The Datadog exception profiler has a small footprint and overhead under normal conditions. If a lot of exceptions are created and thrown, it can cause significant overhead for the profiler. This can happen when you use exceptions for control flow. If you have an unusually high exception rate, turn off exception profiling temporarily until you fix the cause.

To disable exception profiling, start the tracer with the `-Ddd.integration.throwables.enabled=false` JVM setting.

Remember to turn this setting back on after you've returned to a more typical rate of exceptions.

## Java 8 support

The following OpenJDK 8 vendors are supported for Continuous Profiling because they include JDK Flight Recorder in their latest versions:

| Vendor                      | JDK version that includes Flight Recorder |
| --------------------------- | ----------------------------------------- |
| Azul                        | u212 (u262 is recommended)                |
| AdoptOpenJDK                | u262                                      |
| RedHat                      | u262                                      |
| Amazon (Corretto)           | u262                                      |
| Bell-Soft (Liberica)        | u262                                      |
| All vendors upstream builds | u272                                      |

If your vendor is not on the list, [open a support ticket][2], as other vendors may be in development or available for beta support.

## Creating and using a JFR template override file

Override templates let you specify profiling properties to override. However, the default settings are balanced for a good tradeoff between overhead and data density that cover most use cases. To use an override file, perform the following steps:

1. Create an override file in a directory accessible by `dd-java-agent` at service invocation:
    ```
    touch dd-profiler-overrides.jfp
    ```

2. Add your desired overrides to the jfp file. For example, to disable allocation profiling and JVM system properties, your `dd-profiler-overrides.jfp` file would look like the following:

    ```
    jdk.ObjectAllocationInNewTLAB#enabled=false
    jdk.ObjectAllocationOutsideTLAB#enabled=false
    jdk.InitialSystemProperty#enabled=false
    ```

3. When running your application with `dd-java-agent`, your service invocation must point to the override file with `-Ddd.profiling.jfr-template-override-file=</path/to/override.jfp>`, for example:

    ```
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.profiling.jfr-template-override-file=</path/to/override.jfp> -jar path/to/your/app.jar
    ```

[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, turn on [debug mode][1] and [open a support ticket][2] with debug files and the following information:

- Operating system type and version (for example, Linux Ubuntu 20.04)
- Runtime type, version, and vendor (for example, Python 3.9.5)

Refer to the python APM client [troubleshooting documentation][3] for additional guidance.  

[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
[3]: https://ddtrace.readthedocs.io/en/stable/troubleshooting.html
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, turn on [debug mode][1] and [open a support ticket][2] with debug files and the following information:

- Operating system type and version (for example, Linux Ubuntu 20.04)
- Runtime type, version, and vendor (for example, Go 1.16.5)


[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, turn on [debug mode][1] and [open a support ticket][2] with debug files and the following information:

- Operating system type and version (for example, Linux Ubuntu 20.04)
- Runtime type, version, and vendor (for example, Ruby 2.7.3)

## Application triggers "stack level too deep (SystemStackError)" errors

This issue is not expected to happen since [`dd-trace-rb` version `0.54.0`][3].
If you're still running into it, [open a support ticket][2] taking care to include the full backtrace leading to the error.

Prior to version `0.54.0`, the profiler needed to instrument the Ruby VM to track thread creation, which clashed
with similar instrumentation from other gems.

If you're using any of the below gems:

* `rollbar`: Ensure you're using version 3.1.2 or newer.
* `logging`: Disable `logging`'s thread context inheritance by setting the `LOGGING_INHERIT_CONTEXT` environment
  variable to `false`.

## Missing profiles for Resque jobs

When profiling [Resque][4] jobs, you should set the `RUN_AT_EXIT_HOOKS` environment
variable to `1`, as described in the
[Resque documentation][5].

Without this flag, profiles for short-lived Resque jobs will be unavailable.

## Profiling does not turn on because compilation of the Ruby VM just-in-time header failed

There is a known incompatibility between Ruby 2.7 and older GCC versions (4.8 and below) that impacts the profiler ([upstream Ruby report][6], [`dd-trace-rb` bug report][7]). This can result in the following error message: "Your ddtrace installation is missing support for the Continuous Profiler because compilation of the Ruby VM just-in-time header failed. Your C compiler or Ruby VM just-in-time compiler seem to be broken."

To fix this, update your operating system or Docker image so that the GCC version is something more recent than v4.8.

For further help with this issue, [contact support][2] and include the output of running `DD_PROFILING_FAIL_INSTALL_IF_MISSING_EXTENSION=true gem install ddtrace` and the resulting `mkmf.log` file.

## Frames omitted when backtraces are very deep

The Ruby profiler truncates deep backtraces when collecting profiling data. Truncated backtraces are missing some of their caller functions, making it impossible to link them to the root call frame. As a result, truncated backtraces are grouped together under a `N frames omitted` frame.

You can increase the maximum depth with the `DD_PROFILING_MAX_FRAMES` environment variable, or in code:

```ruby
Datadog.configure do |c|
  c.profiling.advanced.max_frames = 500
end
```

[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
[3]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.54.0
[4]: https://github.com/resque/resque
[5]: https://github.com/resque/resque/blob/v2.0.0/docs/HOOKS.md#worker-hooks
[6]: https://bugs.ruby-lang.org/issues/18073
[7]: https://github.com/DataDog/dd-trace-rb/issues/1799
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

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

1. Check that the Agent is installed and running and is visible in the Windows Services panel.

2. Check that the profiler has been loaded from the loader log:

   1. Open the `dotnet-native-loader-<Application Name>-<pid>` log file in the `%ProgramData%\Datadog-APM\logs\DotNet` folder.

   2. Look for `CorProfiler::Initialize: Continuous Profiler initialized successfully.` near the end. If the `initialized successfully` message is not present, enable debug logs by setting the `DD_TRACE_DEBUG` environment variable for the application.

   3. Restart the application.

   4. Open the `dotnet-native-loader-<Application Name>-<pid>` log file in the `%ProgramData%\Datadog-APM\logs\DotNet` folder.

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

   2. Open the `DD-DotNet-Profiler-Native-<Application Name>-<pid>` log file in the `%ProgramData%\Datadog-APM\logs\DotNet` folder.

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

### Enabling the profiler machine-wide

Datadog does not recommend enabling the profiler at machine-level or for all IIS application pools, as the profiler has fixed overhead per profiled application. In order to reduce the amount of resources used by the profiler, you can:
- Increase the allocated resources, such as increasing CPU cores.
- Profile only specific applications by setting environment in batch files instead of directly running the application.
- Reduce the number of IIS pools being profiled (only possible in IIS 10 or later).
- Disable wall time profiling with the setting `DD_PROFILING_WALLTIME_ENABLED=0`.

### Linux Containers

The profiler has a fixed overhead. The exact value can vary but this fixed cost means that the relative overhead of the profiler can be significant in very small containers. To avoid this situation, the profiler is disabled in containers with less than one core. You can override the one core threshold by setting the `DD_PROFILING_MIN_CORES_THRESHOLD` environment variable to a value less than one. For example, a value of `0.5` allows the profiler to run in a container with at least 0.5 cores.

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


[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, run the `phpinfo()` function. The profiler hooks into `phpinfo()` to run diagnostics. If the webserver is having problems, run `phpinfo()` from the webserver and not from the command line as each Server API (SAPI) can be configured independently.

[Open a support ticket][1] with the following information:

- Operating system type and version (for example, Linux Ubuntu 20.04)
- The output from `phpinfo()`, which includes PHP version, SAPI type, Datadog library versions, and the profiler diagnostics.


[1]: /help/
{{< /programming-lang >}}

{{< programming-lang lang="ddprof" >}}

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, turn on [verbose logging][1] and [open a support ticket][2] with log files and the following information:

- Linux kernel version (`uname -r`)
- libc version (`ldd --version`)
- Value of `/proc/sys/kernel/perf_event_paranoid`
- Complete command line, including both profiler and application arguments

If you prefer, you can also troubleshoot the problem by enabling verbose logs and reviewing the sections below.

### "\<ERROR\> Error calling perfopen on watcher"

This error typically occurs when you do not have sufficient permission to engage the profiler. The most common reason for this is that required operating system features have been disabled, which causes profiling to fail. This is typically a host-level configuration, which cannot be set at the level of an individual pod or container.

Setting `perf_event_paranoid` so that it persists across restarts depends on your distribution. As a diagnostic step, try the following:

```shell
echo 1 | sudo tee /proc/sys/kernel/perf_event_paranoid

```

**Note**: This must be executed from a mount namespace in which the `/proc/sys/kernel/perf_event_paranoid` object exists and is writable. Within a container, this setting is inherited from the host.

There are two capabilities you can use to override the value of `perf_event_paranoid`:
- `CAP_SYS_ADMIN`: adds many permissions and thus may be discouraged
- `CAP_PERFMON`: adds BPF and `perf_event_open` capabilities (available on Linux v5.8 or later)

There are a few less common permissions issues:
- The profiler is not always able to instrument processes that change their UID on startup. This is common for many webservers and databases.
- The profiler relies upon the `perf_event_open()` syscall, which is disallowed by some container runtimes. Check the appropriate documentation to see whether this might be the case.
- Some seccomp profiles forbid `perf_event_open()`. If your system runs such a configuration, you may not be able to run the profiler.

### "\<WARNING\> Could not finalize watcher"

You can encounter this warning when the system is unable to allocate sufficient locked memory for the profiler. This most commonly happens when too many instances of the profiler are active on a given host, as when many containerized services are instrumented individually on the same host. You can resolve this by increasing the `mlock()` memory limit or decreasing the number of instrumented applications.

Other profiling tools may contribute to the same limit.

### "\<WARNING\> Failure to establish connection"

This error usually means that the profiler is unable to connect to the Datadog Agent. Enable [configuration logging][3] to identify the hostname and port number used by the profiler for uploads. Additionally, the content of the error message may relay the hostname and port used. Compare these values to your Agent configuration. See [Enabling the profiler][4] for details on profiler input parameters and default values.

## Profiles are empty or sparse

Your profiles may be empty ("No CPU time reported") or contain few frames. Sometimes this is caused when applications have poor symbolization information. This may also be expected--the profiler activates only when the instrumented application is scheduled on the CPU, and applications may be predominately off-CPU for many reasons, such as low user load or high application wait time.

The root of your profile is the frame annotated with the application name in parentheses. If this frame shows a significant amount of CPU time, but no child frames, your application may have poor profiling fidelity. Consider the following:
- Stripped binaries do not have symbols available. Try using a non-stripped binary or a non-minified container image.
- Certain applications and libraries benefit from their debug packages being installed. This is true for services installed through your repo's package manager or similar.

## Error while loading shared libraries

When using the Continuous Profiler for compiled languages as a dynamic library, your application may fail to launch with the following error:

```
error while loading shared libraries: libdd_profiling.so: cannot open shared object file: No such file or directory
```

This happens when your application is built with `libdd_profiling.so` as a dependency, but it cannot be found at runtime during dependency reconciliation. You can fix this by doing one of the following:

- Rebuild your application using the static library. In some build systems the choice between dynamic and static libraries can be ambiguous, so use `ldd` to check whether the resulting binary includes an unwanted dynamic dependency on `libdd_profiling.so`.
- Copy `libdd_profiling.so` to one of the directories in the search path for the dynamic linker. You can get a list of these directories by running `ld --verbose | grep SEARCH_DIR | tr -s ' ;' \\n` on most Linux systems.

[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
[3]: /profiler/enabling/ddprof/?tab=environmentvariables#configuration
[4]: /profiler/enabling/ddprof/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
