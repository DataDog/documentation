---
title: Profiling
kind: Documentation
further_reading:
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
    - link: 'tracing/profiling/proxy'
      tag: 'Documentation'
      text: 'Configure your Proxy to forward your profiles to Datadog.'
---

<div class="alert alert-info">
Datadog Profiling is in beta. Reach out to <a href="/help/">Datadog Support</a> if you encounter any issues or have feedback to share.
</div>

## Setup

Profiling libraries are shipped within the following tracing language libraries. Select your language below to learn how to enable profiling for your application:

{{< tabs >}}
{{% tab "Java" %}}

The Datadog Profiler requires [Java Flight Recorder][1]. The Datadog Profiling library is supported in OpenJDK 11+, Oracle Java 11+, and Zulu Java 8+ (minor version 1.8.0_212+). All JVM-based languages, such as Scala, Groovy, Kotlin, Clojure, etc. are supported. To begin profiling applications:

1. If you are already using Datadog, please upgrade your agent to version [7.20.2][2] or [6.20.2][2]. 

2. Download `dd-java-agent.jar`, which contains the Java Agent class files, and add the `dd-trace-java` version to your `pom.xml` or equivalent:

    ```shell
    wget -O dd-java-agent.jar https://dtdg.co/latest-java-tracer
    ```

     **Note**: Profiling is available in the `dd-java-agent.jar` library in versions 0.44+.

3. Update your service invocation to look like:

    ```text
    java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
    ```

    **Notes**: From `dd-java-agent.jar` library [versions 0.55][3]+ profiles are sent through the Datadog agent, deprecating the need to specify `-Ddd.profiling.api-key-file` and `-Ddd.site` (requires **[Agent 7.20.2][4]**+ or **6.20.2**+). With `dd-java-agent.jar` library versions 0.48-0.54, if your organization is on Datadog EU site, add `-Ddd.site=datadoghq.eu` or set `DD_SITE=datadoghq.eu` as environment variable.

4. After a minute or two, visualize your profiles on the [Datadog APM > Profiling page][5].

**Note**:

- The `-javaagent` needs to be run before the `-jar` file, adding it as a JVM option, not as an application argument. For more information, see the [Oracle documentation][6]:

    ```shell
    # Good:
    java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
    # Bad:
    java -jar my-service.jar -javaagent:dd-java-agent.jar ...
    ```

- As an alternative to passing arguments, you can use environment variable to set those parameters:

| Arguments                     | Environment variable      | Description                                       |
| ----------------------------- | ------------------------- | ------------------------------------------------- |
| `-Ddd.profiling.enabled`      | DD_PROFILING_ENABLED      | Set to `true` to enable profiling.                |
| `-Ddd.profiling.api-key-file` | DD_PROFILING_API_KEY_FILE | Deprecated in version 0.55. File that should contain the API key as a string. See above for how to configure dd-trace-java.jar to upload profiles via the Datadog Agent instead. |
|                               | DD_PROFILING_API_KEY      | Datadog API key.                                  |
| `-Ddd.site`                   | DD_SITE                   | Deprecated in version 0.55. Destination site for your profiles (versions 0.48+). Valid options are `datadoghq.com` for Datadog US site (default), and `datadoghq.eu` for the Datadog EU site. See above for how to configure dd-trace-java.jar to upload profiles via the Datadog Agent instead. |


[1]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.55.1
[4]: https://docs.datadoghq.com/agent/versions/upgrade_to_agent_v7/?tab=linux
[5]: https://app.datadoghq.com/profiling
[6]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
{{% /tab %}}

{{% tab "Python" %}}

The Datadog Profiler requires Python 2.7+. Memory profiling only works on Python 3.5+. To begin profiling applications:

1. If you are already using Datadog, please upgrade your agent to version [7.20.2][1] or [6.20.2][1].

2. Install `ddtrace` which contains both tracing and profiling:

    ```shell
    pip install ddtrace
    ```

     **Note**: Profiling is available in the `ddtrace` library for versions 0.36+.

3. To automatically profile your code, import `ddtrace.profile.auto`. After import, the profiler starts:

    ```python
    import ddtrace.profiling.auto
    ```

4. After a minute or two, visualize your profiles on the [Datadog APM > Profiling page][2].

**Note**:

- Alternatively, profile your service by running it with the wrapper `pyddprofile`:

    ```shell
    $ pyddprofile server.py
    ```

- For advanced setup of the profiler or to add tags like `service` or `version`, use environment variables to set the parameters:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_SERVICE`                                     | String        | The Datadog [service][3] name.     |
| `DD_ENV`                                         | String        | The Datadog [environment][4] name, for example `production`, which can be set here, or in `DD_TAGS` with `DD_TAGS="env:production"`. |
| `DD_VERSION`                                     | String        | The version of your application, which can be set here, or in `DD_TAGS` with `DD_TAGS="version:<APPLICATION_VERSION>"`                              |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list a `key:value` comma separated list like: `<KEY1>:<VALUE1>,<KEY2>:<VALUE2>`. New in version 0.38.   |
| `DD_API_KEY`                                     | String        | Deprecated in version 0.39. The [Datadog API key][2] to use when uploading profiles. See above for how to configure dd-trace-java.jar to upload profiles via the Datadog Agent instead. Supported in version 0.37.                                        |
| `DD_PROFILING_API_KEY`                           | String        | Deprecated in version 0.39. The [Datadog API key][2] to use when uploading profiles. |
| `DD_SITE`                                        | String        | Deprecated in version 0.39. If your organization is on Datadog EU site, set this to `datadoghq.eu`. See above for how to configure dd-trace-py to upload profiles via the Datadog Agent instead.                          |
| `DD_PROFILING_TAGS`                              | String        | Deprecated in 0.38 in favor of `DD_TAGS`. Tags to apply to an uploaded profile. Must be a list a `key:value` comma separated list like: `<KEY1>:<VALUE1>,<KEY2>:<VALUE2>`. |

<div class="alert alert-info">
Recommended for advanced usage only.
</div>

- If you want to manually control the lifecycle of the profiler, use the `ddtrace.profiling.profiler.Profiler` object:

    ```python
    from ddtrace.profiling import Profiler

    prof = Profiler()
    prof.start()

    # At shutdown
    prof.stop()
    ```

-  When your process forks using `os.fork`, the profiler is stopped in the
   child process.

   For Python 3.7+ on POSIX platforms, a new profiler is started
   if you enabled the profiler via `pyddprofile` or `ddtrace.profiling.auto`.

   If you manually instrument the profiler, or if you rely on Python < 3.6 or a
   non-POSIX platform, manually restart the profiler in your
   child with:

   ```python
   ddtrace.profiling.auto.start_profiler()
   ```


[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/profiling
[3]: /tracing/visualization/#services
[4]: /tracing/guide/setting_primary_tags_to_scope/#environment
{{% /tab %}}

{{% tab "Go" %}}

The Datadog Profiler requires Go 1.12+. To begin profiling applications:

1. Get `dd-trace-go` using the command:

    ```shell
    go get gopkg.in/DataDog/dd-trace-go.v1/profiler
    ```

     **Note**: Profiling is available in the `dd-trace-go` library for versions 1.23.0+.

2. Import the [profiler][1] at the start of your application:

    ```Go
    import "gopkg.in/DataDog/dd-trace-go.v1/profiler"
    ```

3. To profile your code, add a [Datadog API key][2], set your environment, service, and version, then start the profiler:

    ```Go
    err := profiler.Start(
        profiler.WithAPIKey("<DATADOG_API_KEY>")
        profiler.WithService("<SERVICE_NAME>"),
        profiler.WithEnv("<ENVIRONMENT>"),
        profiler.WithTags("version:<APPLICATION_VERSION>"),
    )
    if err != nil {
        log.Fatal(err)
    }
    defer profiler.Stop()
    ```

4. After a minute or two, visualize your profiles in the [Datadog APM > Profiling page][3].

Profiler configuration:

| Method | Type          | Description                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
|  WithAPIKey      | String        | The Datadog [Datadog API key][2]                                                                             |
|  WithService     | String        | The Datadog [service][4] name, for example `my-web-app`, which can be set here, or in `DD_TAGS`.             |
|  WithEnv         | String        | The Datadog [environment][5] name, for example `production`, which can be set here, or in `DD_TAGS`.         |
|  WithTags        | String        | The tags to apply to an uploaded profile. Must be a list of in the format `<KEY1>:<VALUE1>,<KEY2>:<VALUE2>`. |


[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/profiler#pkg-constants
[2]: /account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/profiling
[4]: /tracing/visualization/#services
[5]: /tracing/guide/setting_primary_tags_to_scope/#environment
{{% /tab %}}

{{< /tabs >}}

## Profiles

Once profiling is set up, profiles are available in the [APM > Profiling][1] page within Datadog:

{{< img src="tracing/profiling/profiling_main_page.png" alt="Profiling main page">}}

Each row is a profile of a process for a short amount of time. By default profiles are uploaded once a minute. Depending on the language, these processes are profiled between 15s and 60s.

### Search

You can filter according to infrastructure tags or application tags set up from your [environment tracing configuration][2]. By default the following facets are available:

| Facet    | Definition                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------ |
| Env      | The environment your application is running on (`prod`, `staging`).                                    |
| Service  | The name of the [service][3] your code is running.                                                     |
| Version  | The version of your code.                                                                              |
| Host     | The host name your profiled process is running on. If running in Kubernetes, it's the name of the pod. |
| Runtime  | The type of runtime the profiled process is running (`JVM`, `CPython`).                                |
| Language | The language of your code (`Java`, `Python`).                                                          |

The following measures are available:

| Measure           | Definition                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CPU cores              | CPU load summed on all cores of the process. This metric can go above `100%`, and the theoretical limit is `nCores` \* `100%`.                                                    |
| Memory Allocation | Memory allocation rate in `Bytes/s` over the course of the profile. This value can be above the maximum amount of RAM memory because it can be garbage collected during the profile. |

## Profile

Click on a line to view a specific profile:

{{< img src="tracing/profiling/profile.png" alt="A specic profile">}}

The profile header contains information associated with your profile, like the service that generated it, or the environment and code version associated to it.

Four tabs are below the profile header:

| Tab          | Definition                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Profiles     | Flame graph and summary table of the profile you are looking at. You can switch between multiple profile types (`CPU`, `Memory allocation`) |
| Analysis     | A set of heuristics that suggest potential issues or areas of improvement in your code                                                      |
| Metrics      | Profiling metrics coming from all profiles of the same service                                                                              |
| Runtime Info | Text dump of all the runtime properties                                                                                                     |

**Note**: In the upper right corner of each profile, there are options to:

- Download the profile
- Switch the profile to full screen

### Profile types

In the **Profiles** tab you can see all profile types available for a given language. Depending on the language, the information collected about your profile differs.

{{< tabs >}}
{{% tab "Java" %}}

{{< img src="tracing/profiling/profile.png" alt="A specific profile">}}

Once enabled, the following profile types are collected:

| Profile type             | Definition                                                                                                                                                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU in Java Code         | Shows the time each method spent running on the CPU. It includes JVM bytecode, but not native code called from within the JVM.                                                                                                                                                                     |
| Allocation               | Shows the amount of heap memory allocated by each method, including allocations which were subsequently freed.                                                                                                                                                                                     |
| Wall Time in Native Code | Shows the elapsed time spent in native code. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the method is running. This profile does not include time spent running JVM bytecode, which is typically most of your application code. |
| Class load               | Shows the number of classes loaded by each method.                                                                                                                                                                                                                                                 |
| Error                    | Shows the number of errors thrown by each method.                                                                                                                                                                                                                                                  |
| File I/O                 | Shows the time each method spent reading and writing files.                                                                                                                                                                                                                                        |
| Lock                     | Shows the time each method spent waiting for a lock.                                                                                                                                                                                                                                               |
| Socket I/O               | Shows the time each method spent handling socket I/O.                                                                                                                                                                                                                                              |


{{% /tab %}}

{{% tab "Python" %}}

Once enabled, the following profile types are collected:

| Profile type             | Definition                                                                                                                                                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU         | Shows the time each function spent running on the CPU. It includes CPython bytecode, including native code called from within Python.                                                                                                                                                                     |
| Allocation               | Shows the amount of heap memory allocated by each function, including allocations which were subsequently freed. Only supported on Python 3.                                                                                                                                                                                    |
| Wall | Shows the elapsed time used by each function. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the function is running. |
| Exceptions               | Shows the number of caught or uncaught exceptions raised by each function.                                                                                                                                                                                                                                                 |
| Lock                     | Shows the time each function spent waiting for a lock.                                                                                                                                                                                                                                               |

{{% /tab %}}

{{% tab "Go" %}}

Once enabled, the following profile types are collected:

| Profile type             | Definition                                                                                                                                                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU                      | Shows the time each function spent running on the CPU.                                                                          |
| Allocation               | Shows the amount of heap memory allocated by each function, including allocations which were subsequently freed. Go calls this `alloc_space`. This is useful for investigating garbage collection load.              |
| Allocation Count         | Shows the number of objects allocated in heap memory by each function, including allocations which were subsequently freed. This is useful for investigating garbage collection load.     |
| Heap                     | Shows the amount of heap memory allocated by each function that remained allocated. Go calls this `inuse_space`. This is useful for investigating the overall memory usage of your service.               |
| Heap Count               | Shows the number of objects allocated in heap memory by each function and that remained allocated. This is useful for investigating the overall memory usage of your service.                              |

{{% /tab %}}

{{< /tabs >}}

## Troubleshooting

In case you have done all the necessary configuration steps and do not see profiles in the [profile search page](#search-profiles), turn on [debug mode][4] and [open a support ticket][5] with debug files and the following information:

- OS type and version (e.g Linux Ubuntu 14.04.3)
- Runtime type, version and vendor (e.g Java OpenJDK 11 AdoptOpenJDK)

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/profiling
[2]: /tracing/send_traces/#configure-your-environment
[3]: /tracing/visualization/#services
[4]: /tracing/troubleshooting/#tracer-debug-mode
[5]: /help/
