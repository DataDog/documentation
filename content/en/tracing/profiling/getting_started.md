---
title: Getting Started
kind: Documentation
further_reading:
    - link: 'tracing/profiling/trace_profile'
      tag: 'Documentation'
      text: 'Connect traces and profiles.'
    - link: 'tracing/profiling/code_level_metrics'
      tag: 'Documentation'
      text: 'View code level metrics.'  
    - link: 'tracing/profiling/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types.'
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
---

Profiling libraries are shipped within the following tracing language libraries. Select your language below to learn how to enable profiling for your application:

{{< tabs >}}
{{% tab "Java" %}}

The Datadog Profiler requires [Java Flight Recorder][1]. The Datadog Profiling library is supported in OpenJDK 11+, Oracle Java 11+, and Zulu Java 8+ (minor version 1.8.0_212+). All JVM-based languages, such as Scala, Groovy, Kotlin, Clojure, etc. are supported. To begin profiling applications:

1. If you are already using Datadog, upgrade your agent to version [7.20.2][2] or [6.20.2][2].

2. Download `dd-java-agent.jar`, which contains the Java Agent class files:

    ```shell
    wget -O dd-java-agent.jar 'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.datadoghq&a=dd-java-agent&v=LATEST'
    ```

     **Note**: Profiling is available in the `dd-java-agent.jar` library in versions 0.44+.

3. Set `Ddd.profiling.enabled` flag or `DD_PROFILING_ENABLED` environment variable to `true`. Update to your service invocation should look like:

    ```diff
    java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
    ```

**Note**:

- The `-javaagent` needs to be run before the `-jar` file, adding it as a JVM option, not as an application argument. For more information, see the [Oracle documentation][3]:

    ```shell
    # Good:
    java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
    # Bad:
    java -jar my-service.jar -javaagent:dd-java-agent.jar ...
    ```

- It is strongly recommended to add tags like `service` or `version` as it provides the ability to slice and dice your profiles across these dimensions, enhancing your overall product experience. Use environment variables to set the parameters:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_ENABLED`                           | Boolean       | Alternate for `-Ddd.profiling.enabled` argument. Set to `true` to enable profiling.               |
| `DD_SERVICE`                                     | String        | The Datadog [service][2] name.     |
| `DD_ENV`                                         | String        | The Datadog [environment][4] name, for example `production`.|
| `DD_VERSI0ON`                                     | String        | The version of your application.                             |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api, team:intake`.  |


[1]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[4]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.55.1
{{% /tab %}}

{{% tab "Python" %}}

The Datadog Profiler requires Python 2.7+. Memory profiling only works on Python 3.5+. To begin profiling applications:

1. If you are already using Datadog, upgrade your agent to version [7.20.2][1] or [6.20.2][1].

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

- It is strongly recommended to add tags like `service` or `version` as it provides the ability to slice and dice your profiles across these dimensions, enhancing your overall product experience. Use environment variables to set the parameters:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_SERVICE`                                     | String        | The Datadog [service][3] name.     |
| `DD_ENV`                                         | String        | The Datadog [environment][4] name, for example `production`, which can be set here, or in `DD_PROFILING_TAGS` with `DD_PROFILING_TAGS="env:production"`. |
| `DD_VERSION`                                     | String        | The version of your application.                             |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api, team:intake`.   |

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

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/profiling
[3]: /tracing/visualization/#services
[4]: /tracing/guide/setting_primary_tags_to_scope/#environment
{{% /tab %}}

{{% tab "Go" %}}

The Datadog Profiler requires Go 1.12+. To begin profiling applications:

1. If you are already using Datadog, upgrade your agent to version [7.20.2][1] or [6.20.2][1].

2. Get `dd-trace-go` using the command:

    ```shell
    go get gopkg.in/DataDog/dd-trace-go.v1
    ```

     **Note**: Profiling is available in the `dd-trace-go` library for versions 1.23.0+.

3. Import the [profiler][2] at the start of your application:

    ```Go
    import "gopkg.in/DataDog/dd-trace-go.v1/profiler"
    ```

4. Add the following snippet to start the profiler:

    ```Go
    err := profiler.Start()
    if err != nil {
        log.Fatal(err)
    }
    defer profiler.Stop()
    ```

4. After a minute or two, visualize your profiles in the [Datadog APM > Profiling page][3].

**Note**:

- It is strongly recommended to add tags like `service` or `version` as it provides the ability to slice and dice your profiles across these dimensions, enhancing your overall product experience. Use environment variables to set the parameters:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_SERVICE`                                     | String        | The Datadog [service][4] name.     |
| `DD_ENV`                                         | String        | The Datadog [environment][5] name, for example `production`.|
| `DD_VERSION`                                     | String        | The version of your application.                              |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api, team:intake`.  |

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/profiler#pkg-constants
[3]: https://app.datadoghq.com/profiling
[4]: /tracing/visualization/#services
[5]: /tracing/guide/setting_primary_tags_to_scope/#environment
{{% /tab %}}

{{% tab "Node" %}}

The Datadog Profiler requires Node 10.5+. To begin profiling applications:

1. If you are already using Datadog, upgrade your agent to version [7.20.2][1] or [6.20.2][1].  

2. Install `ddtrace` which contains both tracing and profiling:

    ```shell
    npm install --save dd-trace
    ```

    **Note**: Profiling is available in the `dd-trace` library in versions 0.23+.

3. To automatically profile your code, import and initialize `dd-trace` with profiling enabled:

    ```javascript
    require('dd-trace').init({
      profiling: true
    })
    ```

4. After a minute or two, visualize your profiles on the [Datadog APM > Profiling page][2].

**Note**:

- It is strongly recommended to add tags like `service` or `version` as it provides the ability to slice and dice your profiles across these dimensions, enhancing your overall product experience. Use environment variables to set the parameters:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_SERVICE`                                     | String        | The Datadog [service][3] name.     |
| `DD_ENV`                                         | String        | The Datadog [environment][4] name, for example `production`.|
| `DD_VERSION`                                     | String        | The version of your application.                              |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api, team:intake`.  |

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/profiling
[3]: /tracing/visualization/#services
[4]: /tracing/guide/setting_primary_tags_to_scope/#environment
{{% /tab %}}

{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
