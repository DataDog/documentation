---
title: Profiling
kind: Documentation
further_reading:
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
---

<div class="alert alert-info">
Datadog Profiling is in beta. Reach out to <a href="/help/">Datadog Support</a> if you encounter any issues or have feedback to share.
</div>

## Setup

Profiling libraries are shipped within the following tracing language libraries. Select your language below to learn how to enable profiling for your application:

{{< tabs >}}
{{% tab "Java" %}}

The Datadog Profiler requires [Java Flight Recorder][1]. The Datadog Profiling library is supported in OpenJDK 11, Oracle Java 11, and Zulu Java 8. All JVM-based languages, such as Scala, Groovy, Kotlin, Clojure, etc. are supported. To begin profiling applications:

1. Download `dd-java-agent.jar`, which contains the Java Agent class files, and add the `dd-trace-java` version to your `pom.xml` or equivalent:

    ```shell
    wget -O dd-java-agent.jar 'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.datadoghq&a=dd-java-agent&v=LATEST'
    ```

     **Note**: Profiling is available in the `dd-java-agent.jar` library in versions above 0.44.

2. Update your service invocation to look like:

    ```text
    java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.api-key-file=<API_KEY_FILE> -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
    ```

3. After a minute or two, visualize your profiles on the [Datadog APM > Profiling page][2].

**Note**:

- The `-javaagent` needs to be run before the `-jar` file, adding it as a JVM option, not as an application argument. For more information, see the [Oracle documentation][3]:

    ```shell
    # Good:
    java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
    # Bad:
    java -jar my-service.jar -javaagent:dd-java-agent.jar ...
    ```

- Because profiles are sent directly to Datadog without using the Datadog Agent, you must pass a valid [Datadog API key][4].

- As an alternative to passing arguments, you can use environment variable to set those parameters:

| Arguments                     | Environment variable      | Description                                       |
| ----------------------------- | ------------------------- | ------------------------------------------------- |
| `-Ddd.profiling.enabled`      | DD_PROFILING_ENABLED      | Set to `true` to enable profiling.                |
| `-Ddd.profiling.api-key-file` | DD_PROFILING_API_KEY_FILE | File that should contain the API key as a string. |
| `-Ddd.profiling.api-key`      | DD_PROFILING_API_KEY      | Datadog API key.                                  |


[1]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[2]: https://app.datadoghq.com/profiling
[3]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[4]: /account_management/api-app-keys/#api-keys
{{% /tab %}}

{{% tab "Python" %}}

The Datadog Profiler requires Python 2.7 or above running on Linux. Memory profiling will only work on Python 3.5 and above. To begin profiling applications:

1. install `ddtrace` with the `profile` flavor, which contains both tracing and profiling:

    ```shell
    pip install ddtrace[profile]
    ```

     **Note**: Profiling is available in the `ddtrace` library in versions above 0.35.

2. Add a valid [Datadog API key][2] in your environment variable: `DD_PROFILING_API_KEY`

3. Set `env`, `service` and `version` as Datadog tags in your environment variables.

    ```shell
    export DD_PROFILING_TAGS=env:<YOUR_ENVIRONMENT>,service:<YOUR_SERVICE>,version:<YOUR_VERSION>
    ```

4. To automatically profile your code, you can import `ddtrace.profile.auto`. As soon as it is imported, the profiler will start:

    ```python
    import ddtrace.profile.auto
    ```

5. After a minute or two, visualize your profiles on the [Datadog APM > Profiling page][1].

**Note**:

- If you want to control which part of your code should be profiled, you can use the `ddtrace.profiler.profiler` object:

    ```python
    import ddtrace.profile.profiler

    prof = profiler.Profiler()
    prof.start()

    # At shutdown
    prof.stop()
    ```

- Alternatively, you can profile your service by running it with  the wrapper `pyddprofile`:

    ```shell
    $ pyddprofile server.py
    ```

- For advanced setup of the profiler or to add tags like `service` or `version`, you can use environment variable to set those parameters:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_API_KEY`                           | String        | The [Datadog API key][2] to use when uploading profiles.                                         |
| `DD_PROFILING_TAGS`                              | String        | The tags to apply to uploaded profile. Must be a list of in the `key1:value1,key2:value2`.       |
| `DD_SERVICE_NAME`                                | String        | The Datadog [service][3] name. It can be set here, or in `DD_PROFILING_TAGS`.                    |


[1]: https://app.datadoghq.com/profiling
[2]: /account_management/api-app-keys/#api-keys
[3]: /tracing/visualization/#services
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
| CPU         | Shows the time each method spent running on the CPU. It includes CPython bytecode, but not native code called from within Python.                                                                                                                                                                     |
| Allocation               | Shows the amount of heap memory allocated by each method, including allocations which were subsequently freed. Only supported on Python 3.                                                                                                                                                                                    |
| Wall | Shows the elapsed time used by each method. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the method is running. |
| Exceptions               | Shows the number of exceptions caught or uncaught for each method.                                                                                                                                                                                                                                                 |
| Lock                     | Shows the time each method spent waiting for a lock.                                                                                                                                                                                                                                               |

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
[5]: /help
