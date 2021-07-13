---
title: Enabling the Profiler
kind: Documentation
aliases:
    - /tracing/profiling/getting_started
    - /tracing/profiler/getting_started
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'tracing/profiler/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types'
    - link: 'tracing/profiler/profiler_troubleshooting'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog'
---

Profiler is shipped within the following tracing libraries. Select your language below to learn how to enable profiler for your application:

To get notified when a private beta is available for the **Node**, **PHP**, or **.NET** Profiler, [sign up here][1].

{{< programming-lang-wrapper langs="java,python,go,ruby" >}}
{{< programming-lang lang="java" >}}

The Datadog Profiler requires [JDK Flight Recorder][1]. The Datadog Profiler library is supported in OpenJDK 11+, Oracle Java 11+, [OpenJDK 8 (version 8u262+)][2] and Zulu Java 8+ (minor version 1.8.0_212+). All JVM-based languages, such as Scala, Groovy, Kotlin, and Clojure are supported. To begin profiling applications:

1. If you are already using Datadog, upgrade your Agent to version [7.20.2][3]+ or [6.20.2][4]+. If you don't have APM enabled to set up your application to send data to Datadog, in your Agent, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.

2. Download `dd-java-agent.jar`, which contains the Java Agent class files:

    ```shell
    wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
    ```

     **Note**: Profiler is available in the `dd-java-agent.jar` library in versions 0.55+.

3. Set `-Ddd.profiling.enabled` flag or `DD_PROFILING_ENABLED` environment variable to `true`. The update to your service invocation should look like:

    ```diff
    java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -XX:FlightRecorderOptions=stackdepth=256 -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
    ```

4. After a minute or two, you can visualize your profiles on the [Datadog APM > Profiling page][5].


**Note**:

- The `-javaagent` argument needs to be before `-jar`, adding it as a JVM option rather than an application argument. For more information, see the [Oracle documentation][6]:

    ```shell
    # Good:
    java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
    # Bad:
    java -jar my-service.jar -javaagent:dd-java-agent.jar ...
    ```

- Datadog strongly recommends that you specify the `service` and `version` as this gives you the ability to slice and dice your profiles across these dimensions. Use environment variables to set the parameters:

## Enabling the allocation profiler

In dd-java-agent v0.83.0+ and Java 15 and lower, the allocation profiler is opt-in because it can use excessive CPU in allocation-heavy applications. This isn't common, so you may want to try it in a staging environment to see if it affects your application. To enable it, see [Enabling the allocation profiler][8].

## Environment variables

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_ENABLED`                           | Boolean       | Alternate for `-Ddd.profiling.enabled` argument. Set to `true` to enable profiler.               |
| `DD_PROFILING_ALLOCATION_ENABLED`                | Boolean       | Alternate for `-Ddd.profiling.allocation.enabled` argument. Set to `true` to enable the allocation profiler. It requires the profiler to be enabled already. |
| `DD_SERVICE`                                     | String        | Your [service][3] name, for example, `web-backend`.     |
| `DD_ENV`                                         | String        | Your [environment][7] name, for example: `production`.|
| `DD_VERSION`                                     | String        | The version of your service.                             |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api, team:intake`.  |

[1]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[2]: /tracing/profiler/profiler_troubleshooting/#java-8-support
[3]: https://app.datadoghq.com/account/settings#agent/overview
[4]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[5]: https://app.datadoghq.com/profiling
[6]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[7]: /tracing/guide/setting_primary_tags_to_scope/#environment
[8]: /tracing/profiler/profiler_troubleshooting/#enabling-the-allocation-profiler
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

**Requirements**

The Datadog Profiler requires Python 2.7+ and Agent version [7.20.2][1]+ or
[6.20.2][2]+.

The following profiling features are available depending on your Python version:

|      Feature         | Supported Python versions          |
|----------------------|------------------------------------|
| Wall time profiling  | Python >= 2.7                      |
| CPU time profiling   | Python >= 2.7 on POSIX platforms   |
| Exception profiling  | Python >= 3.7 on POSIX platforms   |
| Lock profiling       | Python >= 2.7                      |
| Memory profiling     | Python >= 3.5                      |

**Installation**

Install `ddtrace`, which provides both tracing and profiling functionalities:

```shell
pip install ddtrace
```

**Note**: Profiling requires the `ddtrace` library version 0.40+.

If you are using a platform where `ddtrace` binary distribution is not available, install a development environment.

For example, on Alpine Linux, this can be done with:
```shell
apk install gcc musl-dev linux-headers
```

**Usage**

To automatically profile your code, set the `DD_PROFILING_ENABLED` environment variable to `true` when you use `ddtrace-run`:

    DD_PROFILING_ENABLED=true \
    DD_ENV=prod \
    DD_SERVICE=my-web-app \
    DD_VERSION=1.0.3 \
    ddtrace-run python app.py

It is strongly recommended that you add tags like `service` or `version`, as they provide the ability to slice and dice your profiles across these dimensions. See [Configuration] below.

After a couple of minutes, visualize your profiles on the [Datadog APM > Profiler page][3].

If you want to manually control the lifecycle of the profiler, use the `ddtrace.profiling.profiler.Profiler` object:

```python
from ddtrace.profiling import Profiler

prof = Profiler(
    env="prod",  # if not specified, falls back to environment variable DD_ENV
    service="my-web-app",  # if not specified, falls back to environment variable DD_SERVICE
    version="1.0.3",   # if not specified, falls back to environment variable DD_VERSION
)
prof.start()
```

**Caveats**

When your process forks using `os.fork`, the profiler is actually stopped in
the child process and needs to be restarted. For Python 3.7+ on Unix platforms,
a new profiler is automatically started.

If you use Python < 3.7, or run on a non-Unix platform, you need to manually
start a new profiler in your child process.

```python
# For ddtrace-run users, call this in your child process
ddtrace.profiling.auto.start_profiler()

# Alternatively, for manual instrumentation,
# create a new profiler in your child process:
from ddtrace.profiling import Profiler

prof = Profiler()
prof.start()
```

**Configuration**

You can configure the profiler using the following environment variables:

| Environment Variable    | Keyword Argument to `Profiler` | Type                       | Description                                                         |
| ------------------------|------------------------------- | -------------------------- | --------------------------------------------------------------------|
| `DD_PROFILING_ENABLED`  |                                | Boolean                    | Set to `true` to enable profiler.                                   |
| `DD_PROFILING_HEAP_ENABLED` |                            | Boolean                    | Set to `true` to enable memory heap profiling. (ddtrace 0.50+)      |
| `DD_SERVICE`            | `service`                      | String                     | The Datadog [service][4] name.                                      |
| `DD_ENV`                | `env`                          | String                     | The Datadog [environment][5] name, for example, `production`.       |
| `DD_VERSION`            | `version`                      | String                     | The version of your application.                                    |
| `DD_TAGS`               | `tags`                         | String / Dictionary        | Tags to apply to an uploaded profile. If set with an environment variable, it must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`. If set with keyword argument, it must be a dictionary where keys are tag names and values are tag values such as:`{"layer": "api", "team": "intake"}`.  |



[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[3]: https://app.datadoghq.com/profiling
[4]: /tracing/visualization/#services
[5]: /tracing/guide/setting_primary_tags_to_scope/#environment
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}


The Datadog Profiler requires Go 1.12+. To begin profiling applications:

1. If you are already using Datadog, upgrade your agent to version [7.20.2][1]+ or [6.20.2][2]+.

2. Get `dd-trace-go` using the command:

    ```shell
    go get gopkg.in/DataDog/dd-trace-go.v1/profiler
    ```

     **Note**: Profiler is available in the `dd-trace-go` library for versions 1.23.0+.

3. Import the [profiler][3] at the start of your application:

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
        profiler.WithProfileTypes(
          profiler.CPUProfile,
          profiler.HeapProfile,
          // The profiles below are disabled by default to keep overhead
          // low, but can be enabled as needed.

          // profiler.BlockProfile,
          // profiler.MutexProfile,
          // profiler.GoroutineProfile,
        ),
    )
    if err != nil {
        log.Fatal(err)
    }
    defer profiler.Stop()
    ```

4. After a minute or two, visualize your profiles in the [Datadog APM > Profiler page][4].

**Note**:

- By default only the CPU and Heap profile are enabled. Use [profiler.WithProfileTypes][5] to enable additional [profile types][6].

- You can set profiler parameters in code with these functions:

| Function | Type          | Description                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
|  WithService     | String        | The Datadog [service][7] name, for example `my-web-app`.             |
|  WithEnv         | String        | The Datadog [environment][8] name, for example, `production`.         |
|  WithVersion     | String        | The version of your application.                                                                             |
|  WithTags        | String        | The tags to apply to an uploaded profile. Must be a list of in the format `<KEY1>:<VALUE1>,<KEY2>:<VALUE2>`. |

- Alternatively you can set profiler configuration using environment variables:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_SERVICE`                                     | String        | The Datadog [service][7] name.     |
| `DD_ENV`                                         | String        | The Datadog [environment][8] name, for example, `production`. |
| `DD_VERSION`                                     | String        | The version of your application.                             |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.   |



[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[3]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/profiler#pkg-constants
[4]: https://app.datadoghq.com/profiling
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#WithProfileTypes
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#ProfileType
[7]: /tracing/visualization/#services
[8]: /tracing/guide/setting_primary_tags_to_scope/#environment
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

<div class="alert alert-warning">
Datadog Ruby Profiler is currently in public beta. Datadog recommends evaluating the profiler in a non-sensitive environment before deploying in production.
</div>

The Datadog Profiler requires MRI Ruby 2.1+. **Wall time profiling is available for users on every platform (including macOS and Windows), but CPU time profiles are currently only available on Linux platforms**. To begin profiling applications:

1. If you are already using Datadog, upgrade your agent to version [7.20.2][1]+ or [6.20.2][2]+.

2. Add the `ddtrace` and `google-protobuf` gems to your `Gemfile` or `gems.rb` file:

    ```ruby
    gem 'ddtrace', '>= 0.49.0'
    gem 'google-protobuf', '~> 3.0'
    ```

2. Install the gems with `bundle install`.

3. You can auto-enable the profiler with environment variables:

    ```shell
    export DD_PROFILING_ENABLED=true
    export DD_ENV=prod
    export DD_SERVICE=my-web-app
    export DD_VERSION=1.0.3
    ```

    or in code:

    ```ruby
    Datadog.configure do |c|
      c.profiling.enabled = true
      c.env = 'prod'
      c.service = 'my-web-app'
      c.version = '1.0.3'
    end
    ```

    **Note**: For Rails applications you can create a `config/initializers/datadog.rb` file with the code configuration above.


4. Add the `ddtracerb exec` command to your Ruby application start command:

    ```shell
    bundle exec ddtracerb exec ruby myapp.rb
    ```

    Rails example:

    ```shell
    bundle exec ddtracerb exec bin/rails s
    ```

    **Note**

    If starting the application via `ddtracerb exec` is not an option (eg. when using the Phusion Passenger web server), you can alternatively start the profiler by adding the following to your application entry point such as `config.ru` for a web application:

    ```ruby
    require 'ddtrace/profiling/preload'
    ```


4. A minute or two after starting your Ruby application, your profiles will show up on the [Datadog APM > Profiler page][3].

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[3]: https://app.datadoghq.com/profiling
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Not sure what to do next?

The [Getting Started with Profiler][2] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.google.com/forms/d/e/1FAIpQLScb9GKmKfSoY6YNV2Wa5P8IzUn02tA7afCahk7S0XHfakjYQw/viewform
[2]: /getting_started/profiler/
