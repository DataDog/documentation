---
title: Profiler Troubleshooting
kind: documentation
further_reading:
    - link: '/tracing/troubleshooting'
      tag: 'Documentation'
      text: 'APM Troubleshooting'
---

{{< programming-lang-wrapper langs="java,python,go,ruby,dotnet,php,linux" >}}
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

| Vendor                      | JDK version that includes Flight Recorder                      |
| --------------------------- | -------------------------------------------------------------- |
| Azul                        | u212 (u262 is recommended)                                     |
| AdoptOpenJDK                | u262                                                           |
| RedHat                      | u262                                                           |
| Amazon (Corretto)           | u262                                                           |
| Bell-Soft (Liberica)        | u262                                                           |
| All vendors upstream builds | u272                                                           |

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
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.trace.sample.rate=1 -Ddd.profiling.jfr-template-override-file=</path/to/override.jfp> -jar path/to/your/app.jar
    ```

[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, turn on [debug mode][1] and [open a support ticket][2] with debug files and the following information:

- Operating system type and version (for example, Linux Ubuntu 20.04)
- Runtime type, version, and vendor (for example, Python 3.9.5)


[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
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

The profiler instruments the Ruby VM to track thread creation.
This instrumentation is compatible with most other Ruby gems that also instrument thread creation, with a few exceptions.

If you're using any of the below gems:

* `rollbar`: Ensure you're using version 3.1.2 or newer.
* `logging`: Disable `logging`'s thread context inheritance by setting the `LOGGING_INHERIT_CONTEXT` environment
  variable to `false`.

If you're still experiencing `SystemStackError` errors after following the above instructions,
[open a support ticket][2] taking care to include the full backtrace leading to the error.

## Missing profiles for Resque jobs

When profiling [Resque][3] jobs, you should set the `RUN_AT_EXIT_HOOKS` environment
variable to `1`, as described in the
[Resque documentation][4].

Without this flag, profiles for short-lived Resque jobs will be unavailable.


[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
[3]: https://github.com/resque/resque
[4]: https://github.com/resque/resque/blob/v2.0.0/docs/HOOKS.md#worker-hooks
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, here are a few settings to check:

1. Check that the Agent is installed and running and is visible in the Windows Services panel.

2. Check the result of profiles export:

   1. Enable debug logs by setting the `DD_TRACE_DEBUG` environment variable for the application.

   2. Restart the application.

   3. Open the `DD-Dotnet-Profiler.<Application Name>` log file in the `%ProgramData%\Datadog-APM\logs\` folder.

   4. Look for `Profile data was NOT successfully exported via HTTP POST` entries.

   5. Check the following fields for errors:
      ```
      ["response.StatusCode"]=...,
      ["response.Error"]="...",
      ```

   6. Check the following field to ensure that the right url is used:
      ```
      ["_profilesIngestionEndpoint_url"]="https://intake.profile.datadoghq.com/v1/input",
      ```

Otherwise, turn on [debug mode][1] and [open a support ticket][2] with the debug files and the following information:
- Operating system type and version (for example, Windows Server 2019).
- Runtime type and version (for example, .NET Core 6.0).
- Application type (for example, Web application running in IIS).


[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, run the `phpinfo()` function. The profiler hooks into `phpinfo()` to run diagnostics. If the webserver is having problems, run `phpinfo()` from the webserver and not from the command line as each Server API (SAPI) can be configured indepenently.

[Open a support ticket][1] with the following information:

- Operating system type and version (for example, Linux Ubuntu 20.04)
- The output from `phpinfo()`, which includes PHP version, SAPI type, Datadog library versions, and the profiler diagnostics.


[1]: /help/
{{< /programming-lang >}}

{{< programming-lang lang="linux" >}}

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

**Note**: This must be executed from a mount namespace in which the `/proc/sys/kernel/perf_event_paranoid` object exists and is writable. Typically, this would be the root mount namespace--in other words, the host rather than any normal container. 

There are two capabilities you can use to override the value of `perf_event_paranoid`:
- `CAP_SYS_ADMIN` (adds many permissions and thus may be discouraged by some organizations)
- `CAP_PERFMON` (available on Linux v5.8 or later)

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

When using the Continuous Profiler for Linux as a dynamic library, your application may fail to launch with the following error:

```
error while loading shared libraries: libdd_profiling.so: cannot open shared object file: No such file or directory
```

This happens when your application is built with `libdd_profiling.so` as a dependency, but it cannot be found at runtime during dependency reconciliation. You can fix this by doing one of the following:

- Rebuild your application using the static library. In some build systems the choice between dynamic and static libraries can be ambiguous, so use `ldd` to check whether the resulting binary includes an unwanted dynamic dependency on `libdd_profiling.so`.
- Copy `libdd_profiling.so` to one of the directories in the search path for the dynamic linker. You can get a list of these directories by running `ld --verbose | grep SEARCH_DIR | tr -s ' ;' \\n` on most Linux systems.

[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
[3]: /tracing/profiler/enabling/linux/?tab=environmentvariables#configuration
[4]: /tracing/profiler/enabling/linux/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
