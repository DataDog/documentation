---
title: Getting Started
kind: Documentation
aliases:
    - /tracing/profiling/getting_started
further_reading:
    - link: 'tracing/profiler/intro_to_profiling'
      tag: 'Documentation'
      text: 'Intro to profiling.'
    - link: 'tracing/profiler/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types.'
    - link: 'tracing/profiler/profiler_troubleshooting'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
---

Profiler is shipped within the following tracing libraries. Select your language below to learn how to enable profiler for your application:

To get notified when a private beta is available for the **Node**, **Ruby**, **PHP**, or **.NET** Profiler, [sign up here][1].

{{< programming-lang-wrapper langs="java,python,go" >}}
{{< programming-lang lang="java" >}}

The Datadog Profiler requires [JDK Flight Recorder][1]. The Datadog Profiler library is supported in OpenJDK 11+, Oracle Java 11+, [OpenJDK 8 (version 8u262+)][2] and Zulu Java 8+ (minor version 1.8.0_212+). All JVM-based languages, such as Scala, Groovy, Kotlin, and Clojure are supported. To begin profiling applications:

1. If you are already using Datadog, upgrade your agent to version [7.20.2][3]+ or [6.20.2][3]+. If you don't have APM enabled to set up your application to send data to Datadog, in your Agent, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.

2. Download `dd-java-agent.jar`, which contains the Java Agent class files:

    ```shell
    wget -O dd-java-agent.jar 'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.datadoghq&a=dd-java-agent&v=LATEST'
    ```

     **Note**: Profiler is available in the `dd-java-agent.jar` library in versions 0.55+.

3. Set `-Ddd.profiling.enabled` flag or `DD_PROFILING_ENABLED` environment variable to `true`. Update to your service invocation should look like:

    ```diff
    java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -XX:FlightRecorderOptions=stackdepth=256 -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
    ```

4. After a minute or two, visualize your profiles on the [Datadog APM > Profiling page][4].


**Note**:

- The `-javaagent` argument needs to be before `-jar`, adding it as a JVM option rather than an application argument. For more information, see the [Oracle documentation][5]:

    ```shell
    # Good:
    java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
    # Bad:
    java -jar my-service.jar -javaagent:dd-java-agent.jar ...
    ```

- We strongly recommend that you specify the `service` and `version` as this gives you the ability to slice and dice your profiles across these dimensions. Use environment variables to set the parameters:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_ENABLED`                           | Boolean       | Alternate for `-Ddd.profiling.enabled` argument. Set to `true` to enable profiler.               |
| `DD_SERVICE`                                     | String        | Your [service][3] name, for example, `web-backend`.     |
| `DD_ENV`                                         | String        | Your [environment][6] name, for example: `production`.|
| `DD_VERSION`                                     | String        | The version of your service.                             |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api, team:intake`.  |

[1]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[2]: /tracing/profiler/profiler_troubleshooting/#java-8-support
[3]: https://app.datadoghq.com/account/settings#agent/overview
[4]: https://app.datadoghq.com/profiling
[5]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[6]: /tracing/guide/setting_primary_tags_to_scope/#environment
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

### Requirements

The Datadog Profiler requires Python 2.7+ and agent to version [7.20.2][1]+ or
[6.20.2][1]+.

Those profiling features are available depending on your Python version:

|      Feature         | Supported Python Versions          |
|----------------------|------------------------------------|
| Wall time profiling  | Python >= 2.7                      |
| CPU time profiling   | Python >= 2.7 on POSIX platforms   |
| Exception profiling  | Python >= 3.7 on POSIX platforms   |
| Lock profiling       | Python >= 2.7                      |
| Memory profiling     | Python >= 3.5                      |

### Installation

Install `ddtrace` which provides both tracing and profiling functionalities:

```shell
pip install ddtrace
```

**Note**: Profiling requires the `ddtrace` library versions 0.40+.

If you're using a platform where `ddtrace` binary distribution is not
available, you will need to install a development environment.

For example, on Alpine Linux, this can be done with:
```shell
apk install gcc musl-dev linux-headers
```

### Usage

To automatically profile your code, set `DD_PROFILING_ENABLED` environment
variable to `true` when you use `ddtrace-run`:

    DD_PROFILING_ENABLED=true ddtrace-run python app.py

It is strongly recommended to add tags like `service` or `version` as it
provides the ability to slice and dice your profiles across these dimensions,
enhancing your overall product experience. See Configuration below.

After a couple of minutes, visualize your profiles on the [Datadog APM > Profiler page][2].

If you want to manually control the lifecycle of the profiler, use the
`ddtrace.profiling.profiler.Profiler` object:

```python
from ddtrace.profiling import Profiler

prof = Profiler()
prof.start()

# At shutdown
prof.stop()
```

<div class="alert alert-warning">
The profiler has been designed to be turned on continuously. Only use the
`start` and `stop` method to start and stop the profiler at the beginning and
end of your program, not to selectively profile parts of your program.
</div>

#### Caveats

When your process forks using `os.fork`, the profiler is actually stopped in
the child process and needs to be restarted. For Python 3.7+ on Unix platforms,
a new profiler is automatically started.

If you use Python < 3.7, or run on a non-Unix platform, you need to manually
start a new profiler in your child.

```python
# For ddtrace-run users, call this in your child process
ddtrace.profiling.auto.start_profiler()

# Alternatively, for manual instrumentation,
# create a new profiler in your child process:
from ddtrace.profiling import Profiler

prof = Profiler()
prof.start()
```

### Configuration

You can configure the profiler using the following environment variable:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_ENABLED`                           | Boolean       | Set to `true` to enable profiler. |
| `DD_SERVICE`                                     | String        | The Datadog [service][3] name.     |
| `DD_ENV`                                         | String        | The Datadog [environment][4] name, for example, `production`. |
| `DD_VERSION`                                     | String        | The version of your application.                             |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.   |

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/profiling
[3]: /tracing/visualization/#services
[4]: /tracing/guide/setting_primary_tags_to_scope/#environment
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}


The Datadog Profiler requires Go 1.12+. To begin profiling applications:

1. If you are already using Datadog, upgrade your agent to version [7.20.2][1]+ or [6.20.2][1]+.

2. Get `dd-trace-go` using the command:

    ```shell
    go get gopkg.in/DataDog/dd-trace-go.v1
    ```

     **Note**: Profiler is available in the `dd-trace-go` library for versions 1.23.0+.

3. Import the [profiler][2] at the start of your application:

    ```Go
    import "gopkg.in/DataDog/dd-trace-go.v1/profiler"
    ```

4. Add the following snippet to start the profiler:

    ```Go
    err := profiler.Start(
        profiler.WithService("<SERVICE_NAME>"),
        profiler.WithEnv("<ENVIRONMENT>"),
        profiler.WithVersion("<APPLICATION_VERSION>"),
        profiler.WithTags("<KEY1>:<VALUE1>,<KEY2>:<VALUE2>"),
    )
    if err != nil {
        log.Fatal(err)
    }
    defer profiler.Stop()
    ```

4. After a minute or two, visualize your profiles in the [Datadog APM > Profiler page][3].

**Note**:

- By default only the CPU and Heap profile are enabled. Use [profiler.WithProfileTypes][4] to enable additional [profile types][5].

- You can set profiler parameters in code with these functions:

| Function | Type          | Description                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
|  WithService     | String        | The Datadog [service][6] name, for example `my-web-app`.             |
|  WithEnv         | String        | The Datadog [environment][7] name, for example, `production`.         |
|  WithVersion     | String        | The version of your application.                                                                             |
|  WithTags        | String        | The tags to apply to an uploaded profile. Must be a list of in the format `<KEY1>:<VALUE1>,<KEY2>:<VALUE2>`. |

- Alternatively you can set profiler configuration using environment variables:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_SERVICE`                                     | String        | The Datadog [service][6] name.     |
| `DD_ENV`                                         | String        | The Datadog [environment][7] name, for example, `production`. |
| `DD_VERSION`                                     | String        | The version of your application.                             |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.   |

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/profiler#pkg-constants
[3]: https://app.datadoghq.com/profiling
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#WithProfileTypes
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#ProfileType
[6]: /tracing/visualization/#services
[7]: /tracing/guide/setting_primary_tags_to_scope/#environment
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.google.com/forms/d/e/1FAIpQLScb9GKmKfSoY6YNV2Wa5P8IzUn02tA7afCahk7S0XHfakjYQw/viewform
