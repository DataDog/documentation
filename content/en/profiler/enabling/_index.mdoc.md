---
title: Enabling the Profiler
content_filters:
  - trait_id: prog_lang
    option_group_id: profiler_language_options
    label: "Language"
  - trait_id: runtime
    option_group_id: <PROG_LANG>_profiler_runtime_options
    label: "Runtime"
aliases:
  - /tracing/faq/profiling_migration/
  - /tracing/profiler/enabling/
  - /tracing/profiler/enabling/java/
  - /tracing/profiler/enabling/python/
  - /tracing/profiler/enabling/go/
  - /tracing/profiler/enabling/ruby/
  - /tracing/profiler/enabling/nodejs/
  - /tracing/profiler/enabling/dotnet/
  - /tracing/profiler/enabling/php/
  - /profiler/enabling/java/
  - /profiler/enabling/python/
  - /profiler/enabling/go/
  - /profiler/enabling/ruby/
  - /profiler/enabling/nodejs/
  - /profiler/enabling/dotnet/
  - /profiler/enabling/php/
  - /profiler/enabling/graalvm/
  - /tracing/profiler/enabling/linux/
  - /tracing/profiler/enabling/ddprof/
  - /profiler/enabling/ddprof/
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'profiler/profile_visualizations'
      tag: 'Documentation'
      text: 'Learn more about available profile visualizations'
    - link: 'profiler/profiler_troubleshooting'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
---

<!-- Java -->
{% if equals($prog_lang, "java") %}

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

<!-- JVM -->
{% if equals($runtime, "jvm") %}

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][2].

{% tabs %}

{% tab label="Linux" %}

**Available profile types**:
- CPU
- Wallclock (latency)
- Allocations
- Live heap (memory leak detection)
- Exception profiling
- I/O profiling

| JDK Distribution | Minimum Version | Notes |
|------------------|-----------------|-------|
| OpenJDK | 8u352+, 11.0.17+, 17.0.5+, 21+ | Includes builds from Amazon Corretto, Azul Zulu, Eclipse Temurin, BellSoft Liberica, and other OpenJDK-based distributions |
| Oracle JDK | 8u351+, 11.0.17+, 17.0.5+, 21+ | |
| OpenJ9 JDK | 8u372+, 11.0.18+, 17.0.6+ | Includes Eclipse OpenJ9, IBM JDK, and IBM Semeru Runtime |
| Azul Platform Prime | 23.05.0.0+ | |

{% /tab %}

{% tab label="Windows" %}

**Available profile types**:
- CPU
- Allocations
- I/O profiling
- Exception

| JDK Distribution | Minimum Version | Notes |
|------------------|-----------------|-------|
| OpenJDK | 8u282+, 11.0.17+, 17.0.5+, 21.0.3+ | Includes builds from Amazon Corretto, Azul Zulu, Eclipse Temurin, BellSoft Liberica, and other OpenJDK-based distributions |
| Oracle JDK | 11.0.17+, 17.0.5+, 21.0.3+ | JFR may require commercial license. Oracle JDK 8u40+ supported with limited features (CPU profiling only) |
| Azul Zulu | 8u212+, 11.0.17+, 17.0.5+, 21.0.3+ | |
| GraalVM | 17.0.11+, 21.0.3+ | JIT mode and native-image(AOT) |

{% /tab %}

{% /tabs %}

- All JVM-based languages, such as Java, Scala, Groovy, Kotlin, and Clojure are supported.

- The profiler supports only actively maintained LTS JDK versions and the most recent General Availability (GA) JDK releases.

- Java Profiler is not supported on serverless environments.

## Installation

To begin profiling applications:

1. Install and run Datadog Agent v6+. Datadog recommends using [Datadog Agent v7+][3]. If you don't have APM enabled to set up your application to send data to Datadog, in your Agent, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.

2. Download `dd-java-agent.jar`, which contains the Java Agent class files:

   {% tabs %}

   {% tab label="Wget" %}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
   {% /tab %}

   {% tab label="cURL" %}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
   {% /tab %}

   {% tab label="Dockerfile" %}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
   {% /tab %}

   {% /tabs %}

3. Enable the profiler by setting `-Ddd.profiling.enabled` flag or `DD_PROFILING_ENABLED` environment variable to `true`. Specify `dd.service`, `dd.env`, and `dd.version` so you can filter and group your profiles across these dimensions:

   {% tabs %}

   {% tab label="Command arguments" %}
   ```shell
   java \
       -javaagent:dd-java-agent.jar \
       -Ddd.service=<YOUR_SERVICE> \
       -Ddd.env=<YOUR_ENVIRONMENT> \
       -Ddd.version=<YOUR_VERSION> \
       -Ddd.profiling.enabled=true \
       -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
   ```
   {% /tab %}

   {% tab label="Environment variables" %}
   ```shell
   export DD_SERVICE=<YOUR_SERVICE>
   export DD_ENV=<YOUR_ENV>
   export DD_VERSION=<YOUR_VERSION>
   export DD_PROFILING_ENABLED=true
   java \
       -javaagent:dd-java-agent.jar \
       -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
   ```
   {% /tab %}

   {% /tabs %}

   {% alert %}
   The `-javaagent` argument needs to be before `-jar`. This adds it as a JVM option rather than an application argument. For more information, see the [Oracle documentation][4].
   {% /alert %}

   Optional: Set up [Source Code Integration][5] to connect your profiling data with your Git repositories.

4. After a couple of minutes, your profiles appear on the [Datadog APM > Profiling page][6].

5. For more information on available profile types, see [Profile Types][38].

{% alert %}
For GraalVM native-image applications, switch the **Runtime** filter above to **GraalVM Native Image**.
{% /alert %}

## Configuration

In addition to the environment, service, and version variables shown in the installation steps, you can apply custom tags to uploaded profiles with `DD_TAGS` (a comma-separated list of `<key>:<value>` pairs such as `layer:api, team:intake`).

For additional configuration options, see the [Configuration reference][39] in the troubleshooting guide.

{% /if %}
<!-- end JVM -->

<!-- GraalVM Native Image -->
{% if equals($runtime, "graalvm_native_image") %}

{% alert level="warning" %}
Datadog Profiler support for GraalVM native-image is in Preview. Datadog recommends evaluating the profiler in a non-sensitive environment before deploying in production.
{% /alert %}

This page describes how to enable profiling for applications compiled as GraalVM native images. For standard JVM applications, switch the **Runtime** filter above to **JVM**.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][2].

Minimum version
: GraalVM 17+

Supported platforms
: Linux, Windows, macOS

Available profile types
: CPU, Allocations

## Installation

### 1. Build your native image with the Datadog tracer

Follow the [Tracer Setup Instructions][40] to build your GraalVM native image with the Datadog Java Profiler instrumentation.

### 2. Run with profiling enabled

After the service binary is built, enable the profiler using environment variables:

```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_PROFILING_ENABLED=true
export DD_PROFILING_DIRECTALLOCATION_ENABLED=true
./my_service
```

### 3. Verify profiles are collected

After a couple of minutes, your profiles appear on the [Datadog APM > Profiler page][6].

## Configuration

In addition to the environment, service, and version variables shown in the installation steps, you can apply custom tags to uploaded profiles with `DD_TAGS` (a comma-separated list of `<key>:<value>` pairs such as `layer:api, team:intake`).

For profile type configuration options, see the [Configuration reference][39] in the Java profiler troubleshooting guide.

## Limitations

- Only JFR-based profiling is supported for GraalVM native-image applications.
- Wallclock and live heap profiling are not available.

{% /if %}
<!-- end GraalVM Native Image -->

{% /if %}
<!-- end Java -->

<!-- Python -->
{% if equals($prog_lang, "python") %}

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

To use profiling, make sure the following requirements are met:
- Enable profiling through the Datadog tracing library. Using the latest stable release is recommended.
- Verify your Python and tracing library versions are compatible by reviewing the [Python Compatibility Requirements][10].

{% alert %}
Some features depend on newer Python versions than the minimum required version for the tracing library. For more details, read [Profile Types][11].
{% /alert %}

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][2].

The installation requires pip version 18 or above.

Continuous Profiler support is in Preview for some serverless platforms, such as [AWS Lambda][12].

## Installation

Make sure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][3].

Install `ddtrace`, which provides both tracing and profiling functionalities:

```shell
pip install ddtrace
```

If you are using a platform where `ddtrace` binary distribution is not available, first install a development environment.

For example, on Alpine Linux, this can be done with:
```shell
apk install gcc musl-dev linux-headers
```

## Usage

To automatically profile your code, set the `DD_PROFILING_ENABLED` environment variable to `true` when you use `ddtrace-run`:

```shell
DD_PROFILING_ENABLED=true \
DD_ENV=prod \
DD_SERVICE=my-web-app \
DD_VERSION=1.0.3 \
ddtrace-run python app.py
```

See [Configuration](#configuration) for more advanced usage.

Optionally, set up [Source Code Integration][13] to connect your profiling data with your Git repositories.

A couple of minutes after you start your application, your profiles appear on the [Datadog APM > Profiler page][6]. If they do not, refer to the [Troubleshooting][14] guide.

If you want to manually control the lifecycle of the profiler, use the `ddtrace.profiling.Profiler` object:

```python
from ddtrace.profiling import Profiler

prof = Profiler(
    env="prod",  # if not specified, falls back to environment variable DD_ENV
    service="my-web-app",  # if not specified, falls back to environment variable DD_SERVICE
    version="1.0.3",   # if not specified, falls back to environment variable DD_VERSION
)
prof.start()  # Should be as early as possible, eg before other imports, to ensure everything is profiled
```

## Caveats

When your process forks using `os.fork`, the profiler is automatically restarted
in the child process on supported Python versions. No manual restart is required.

## Configuration

You can configure the profiler using the [environment variables][15].

### Code provenance

The Python profiler supports code provenance reporting, which provides
insight into the library that is running the code. While this is
enabled by default, you can turn it off by setting
`DD_PROFILING_ENABLE_CODE_PROVENANCE=0`.

{% /if %}
<!-- end Python -->

<!-- Go -->
{% if equals($prog_lang, "go") %}

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][2].

The Datadog Profiler requires one of the latest two major Go releases. These are the major Go releases [supported by the Go project][16].

For the [Trace to Profiling integration][17] and [Endpoint Profiling][18], use `dd-trace-go` version 1.51.0+.

Continuous Profiler is not supported on some serverless platforms, such as AWS Lambda.

## Installation

To begin profiling applications:

1. Make sure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][3].

2. Get `dd-trace-go` using the command:

    ```shell
    go get github.com/DataDog/dd-trace-go/v2/profiler
    ```

    {% alert %}
    If you are using v1 of the Go tracer,
    see the [migration guide][19]
    to upgrade to v2 and for all future updates and features.
    {% /alert %}

3. Import the [profiler][20] at the start of your application:

    ```go
    import "github.com/DataDog/dd-trace-go/v2/profiler"
    ```

4. Add the following snippet to start the profiler:

    ```go
    err := profiler.Start(
        profiler.WithService("<SERVICE_NAME>"),
        profiler.WithEnv("<ENVIRONMENT>"),
        profiler.WithVersion("<APPLICATION_VERSION>"),
        profiler.WithTags("<KEY1>:<VALUE1>", "<KEY2>:<VALUE2>"),
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

4. Optional: Enable the [timeline feature][21], see [prerequisites][22].

5. Optional: Set up [Source Code Integration][23] to connect your profiling data with your Git repositories.

6. A couple of minutes after you start your application, your profiles appear on the [Datadog APM > Profiler page][6]. If they do not, refer to the [Troubleshooting][41] guide.

{% alert %}
By default, only the CPU and Heap profiles are enabled. Use [profiler.WithProfileTypes][24] and [profile types][25]. For legacy v1 documentation, view [profiler.WithProfileTypes][26] to enable additional [profile types][27].
{% /alert %}

If you automatically instrument your Go application with [Orchestrion][28], it adds the continuous profiler code to your application. To enable the profiler at run time, set the environment variable `DD_PROFILING_ENABLED=true`.

## Configuration

You can set profiler parameters in code with these functions:

| Function | Type          | Description                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
|  WithService     | String        | The Datadog [service][29] name, for example, `my-web-app`.             |
|  WithEnv         | String        | The Datadog [environment][29] name, for example, `production`.         |
|  WithVersion     | String        | The version of your application.                                                                             |
|  WithTags        | List of strings        | A list of tags to apply to an uploaded profile. Tags must be of the format `<KEY>:<VALUE>`. |

Alternatively you can set profiler configuration using environment variables:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_ENV`                                         | String        | The [environment][29] name, for example, `production`. |
| `DD_SERVICE`                                     | String        | The [service][29] name, for example, `web-backend`. |
| `DD_VERSION`                                     | String        | The [version][29] of your service. |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.   |

### Showing C function calls in CPU profiles

By default, Go's CPU profiler only shows detailed information for Go code. If your program calls C code, the time spent running C code is reflected in the profile, but the call stacks only show Go function calls.

To add detailed C function call information to CPU profiles, you may opt to use library such as [ianlancetaylor/cgosymbolizer][30]. To use this library:

1. Download the package:

    ```shell
    go get github.com/ianlancetaylor/cgosymbolizer@latest
    ```

2. Add the following import anywhere in your program:

    ```go
    import _ "github.com/ianlancetaylor/cgosymbolizer"
    ```

{% alert level="warning" %}
This library is considered experimental. It can cause (infrequent) deadlocks in programs that use C++ exceptions, or that use libraries such as `tcmalloc`, which also collect call stacks.
{% /alert %}

## Save up to 14% CPU in production with PGO

Starting [Go 1.21][31], the Go compiler supports Profile-Guided Optimization (PGO). PGO enables additional optimizations on code identified as hot by CPU profiles of production workloads. This is compatible with Datadog Go Continuous Profiler and can be used for production builds.

Follow [this guide][32] to set it up.

{% /if %}
<!-- end Go -->

<!-- Ruby -->
{% if equals($prog_lang, "ruby") %}

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][2].

The Datadog Profiler requires Ruby 2.5+ (Ruby 3.2.3+ or later is recommended). JRuby and TruffleRuby are not supported.

The following operating systems and architectures are supported:
- Linux (GNU libc) x86-64, aarch64
- Alpine Linux (musl libc) x86-64, aarch64

You also need either the [`pkg-config`][33] or the [`pkgconf`][34] system utility installed.
This utility is available on the software repositories of most Linux distributions. For example:

- The `pkg-config` package is available for [Homebrew][42], and [Debian][43]- and [Ubuntu][44]-based Linux
- The `pkgconf` package is available for [Arch][45]- and [Alpine][46]-based Linux
- The `pkgconf-pkg-config` package is available for [Fedora][47]- and [Red-Hat][48]-based Linux

Continuous Profiler is not supported on serverless platforms, such as AWS Lambda. Additionally, [Single Step APM Instrumentation][49] cannot be used to set up the Ruby Profiler.

## Installation

To begin profiling applications:

1. Make sure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][3].

2. Add the `datadog` gem to your `Gemfile` or `gems.rb` file:

    ```ruby
    gem 'datadog', '~> 2.18'
    ```
3. Install the gems with `bundle install`.

4. Enable the profiler using **one** of the following approaches:

   {% tabs %}

   {% tab label="Environment variables" %}
   ```shell
   export DD_PROFILING_ENABLED=true
   export DD_ENV=prod
   export DD_SERVICE=my-web-app
   export DD_VERSION=1.0.3
   ```
   {% /tab %}

   {% tab label="In code" %}
   ```ruby
   Datadog.configure do |c|
     c.profiling.enabled = true
     c.env = 'prod'
     c.service = 'my-web-app'
     c.version = '1.0.3'
   end
   ```

   {% alert %}
   For Rails applications, create a `config/initializers/datadog.rb` file with the code configuration above.
   {% /alert %}
   {% /tab %}

   {% /tabs %}

5. Add the `ddprofrb exec` command to your Ruby application start command:

    ```shell
    bundle exec ddprofrb exec ruby myapp.rb
    ```

    Rails example:

    ```shell
    bundle exec ddprofrb exec bin/rails s
    ```

    If you're running a version of the gem older than 1.21.0, replace `ddprofrb exec` with `ddtracerb exec`.

    {% alert %}
    If starting the application with `ddprofrb exec` is not an option (for example, when using the Phusion Passenger web server), you can alternatively start the profiler by adding the following to your application entry point (such as `config.ru`, for a web application):

    ```ruby
    require 'datadog/profiling/preload'
    ```
    {% /alert %}

6. Optional: Set up [Source Code Integration][35] to connect your profiling data with your Git repositories.

7. A couple of minutes after you start your application, your profiles appear on the [Datadog APM > Profiler page][6]. If they do not, refer to the [Troubleshooting][50] guide.

## Configuration

These settings apply to the latest profiler release.

You can configure the profiler using the following environment variables:

| Environment variable                          | Type    | Description                                                                                                                             |
| --------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_PROFILING_ENABLED`                        | Boolean | If set to `true`, enables the profiler. Defaults to `false`.                                                                            |
| `DD_PROFILING_ALLOCATION_ENABLED`             | Boolean | Set to `true` to enable allocation profiling. It requires the profiler to be enabled already. Defaults to `false`.                      |
| `DD_PROFILING_MAX_FRAMES`                     | Integer | Maximum backtrace (stack) depth gathered by the profiler. Stacks deeper than this value get truncated. Defaults to `400`.               |
| `DD_PROFILING_EXPERIMENTAL_HEAP_ENABLED`      | Boolean | Set to `true` to enable heap live objects profiling. It requires that allocation profiling is enabled as well. Defaults to `false`.     |
| `DD_PROFILING_EXPERIMENTAL_HEAP_SIZE_ENABLED` | Boolean | Set to `true` to enable heap live size profiling. It requires that heap live objects profiling is enabled as well. Defaults to the same value as `DD_PROFILING_EXPERIMENTAL_HEAP_ENABLED`. |
| `DD_PROFILING_NO_SIGNALS_WORKAROUND_ENABLED`  | Boolean | Automatically enabled when needed, can be used to force enable or disable this feature. See [Profiler Troubleshooting][51] for details. |
| `DD_PROFILING_PREVIEW_OTEL_CONTEXT_ENABLED`   | String  | Set to `only` when using profiling directly with `opentelemetry-sdk`, or `true` for auto-detection of the correct context to read from. Defaults to `false`. |
| `DD_ENV`                                      | String  | The [environment][29] name, for example: `production`.                                                                                  |
| `DD_SERVICE`                                  | String  | The [service][29] name, for example, `web-backend`.                                                                                     |
| `DD_VERSION`                                  | String  | The [version][29] of your service.                                                                                                      |
| `DD_TAGS`                                     | String  | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api, team:intake`.          |

Alternatively, you can set profiler parameters in code with these functions, inside a `Datadog.configure` block. Parameters provided in code take precedence over those provided as environment variables.

| Environment variable                                  | Type    | Description                                                                                                                             |
| ----------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `c.profiling.enabled`                                 | Boolean | If set to `true`, enables the profiler. Defaults to `false`.                                                                            |
| `c.profiling.allocation_enabled`                      | Boolean | Set to `true` to enable allocation profiling. It requires the profiler to be enabled already. Defaults to `false`.                      |
| `c.profiling.advanced.max_frames`                     | Integer | Maximum backtrace (stack) depth gathered by the profiler. Stacks deeper than this value get truncated. Defaults to `400`.               |
| `c.profiling.advanced.experimental_heap_enabled`      | Boolean | Set to `true` to enable heap live objects profiling. It requires that allocation profiling is enabled as well. Defaults to `false`.     |
| `c.profiling.advanced.experimental_heap_size_enabled` | Boolean | Set to `true` to enable heap live size profiling. It requires that heap live objects profiling is enabled as well. Defaults to the same value as `experimental_heap_size_enabled`. |
| `c.profiling.advanced.no_signals_workaround_enabled`  | Boolean | Automatically enabled when needed, can be used to force enable or disable this feature. See [Profiler Troubleshooting][51] for details. |
| `c.profiling.advanced.preview_otel_context_enabled`   | String  | Set to `only` when using profiling directly with `opentelemetry-sdk`, or `true` for auto-detection of the correct context to read from. Defaults to `false`. |
| `c.env`                                               | String  | The [environment][29] name, for example: `production`.                                                                                  |
| `c.service`                                           | String  | The [service][29] name, for example, `web-backend`.                                                                                     |
| `c.version`                                           | String  | The [version][29] of your service.                                                                                                      |
| `c.tags`                                              | Hash    | Tags to apply to an uploaded profile.                                                                                                   |

{% /if %}
<!-- end Ruby -->

<!-- Node.js -->
{% if equals($prog_lang, "node_js") %}

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][2].

The Datadog Profiler requires at least Node.js 18.

Continuous Profiler support is in Preview for some serverless platforms, such as [AWS Lambda][12].

Continuous Profiler support is in Preview for Google Cloud Run.

## Installation

To begin profiling applications:

1. Make sure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][3].

2. Run `npm install --save dd-trace@latest` to add a dependency on the `dd-trace` module which includes the profiler.

3. Enable the profiler using **one** of the following approaches:

   {% tabs %}

   {% tab label="Environment variables" %}
   ```shell
   export DD_PROFILING_ENABLED=true
   export DD_ENV=prod
   export DD_SERVICE=my-web-app
   export DD_VERSION=1.0.3
   ```

   {% alert %}
   If you're already using Datadog APM, you are already calling `init` and don't need to do so again. If you are not, make sure the tracer and the profiler are loaded together:

   ```javascript
   node -r dd-trace/init app.js
   ```
   {% /alert %}
   {% /tab %}

   {% tab label="In code" %}
   ```js
   const tracer = require('dd-trace').init({
     profiling: true,
     env: 'prod',
     service: 'my-web-app',
     version: '1.0.3'
   })
   ```

   {% alert %}
   If you're already using Datadog APM, you are already calling `init` and don't need to do so again. If you are not, make sure the tracer and the profiler are loaded together:

   ```javascript
   const tracer = require('dd-trace/init')
   ```
   {% /alert %}
   {% /tab %}

   {% /tabs %}

4. Optional: Set up [Source Code Integration][36] to connect your profiling data with your Git repositories.

5. A couple of minutes after you start your application, your profiles appear on the [APM > Profiler page][6]. If they do not, refer to the [Troubleshooting][52] guide.

{% /if %}
<!-- end Node.js -->

<!-- .NET -->
{% if equals($prog_lang, "dot_net") %}

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][2].

Supported operating systems for .NET Framework
: Windows 10{% br /%}
Windows Server starting from version 2012

Supported operating systems for .NET Core and .NET 5+
: Linux with glibc 2.17+ (for example, CentOS 7+) and musl-based (Alpine){% br /%}
Windows 10{% br /%}
Windows Server starting from version 2012

Serverless
: Azure App Service Windows and Linux - Web Apps only, Function Apps are not supported

Supported .NET runtimes (64-bit applications)
: .NET Framework 4.6.1+{% br /%}
.NET Core 2.1, 3.1{% br /%}
.NET 5{% br /%}
.NET 6{% br /%}
.NET 7{% br /%}
.NET 8{% br /%}
.NET 9{% br /%}
.NET 10

{% alert level="danger" %}
For containers, **more than one core** is required. Read the [Troubleshooting documentation][53] for more details.
{% /alert %}

Supported languages
: Any language that targets the .NET runtime, such as C#, F#, and Visual Basic.

The following profiling features are available in the following minimum versions of the `dd-trace-dotnet` library:

| Feature                    | Required `dd-trace-dotnet` version | Required .NET Runtime versions                                                           |
|----------------------------|------------------------------------|------------------------------------------------------------------------------------------|
| Wall time profiling        | 2.7.0+                             | All supported runtime versions.                                                          |
| CPU profiling              | 2.15.0+                            | All supported runtime versions.                                                          |
| GC CPU consumption         | 3.19.0+                            | .NET 5+                                                          |
| Exceptions profiling       | 2.31.0+                            | All supported runtime versions.                                                          |
| Allocations profiling      | 3.12.0+ / 3.28.0+                  | .NET Framework (requires Datadog Agent 7.51+ and 3.12.0+) / .NET 6+ (requires 2.18.0+ but Datadog recommends .NET10 with 3.28+).   |
| Lock Contention profiling  | 2.49.0+                            | .NET Framework (requires Datadog Agent 7.51+) and .NET 5+                                |
| Live heap profiling        | 3.28.0+                            | .NET 7+ but Datadog recommends .NET 10+.                                                                                  |
| [Trace to Profiling integration][54]         | 2.30.0+                            | All supported runtime versions.                                                          |
| [Endpoint Profiling][55]  | 2.15.0+                            | All supported runtime versions.                                                          |
| Timeline                  | 2.30.0+ (and 3.19.0+ for outgoing HTTP requests longer than 50 ms in beta and thread start/end events)     | All supported runtime versions (except .NET 5+ required for garbage collection details and .NET 7+ required for outgoing HTTP requests). |
| [Memory Leak investigation][56] | 3.33.0+      | .NET 6+ (in preview)  |

- Allocations and Lock Contention profiling for .NET Framework requires that the Datadog Agent and the profiled applications are running on the same machine.
- Due to a limitation of the .NET Framework, Allocations profiling does not show the size of the allocations. Instead, it only shows the count.
- Allocations and Live Heap profiling are available in .NET 10. For other previous versions of .NET, the statistical distribution of allocations sampling might not be accurate, so expect larger objects to be represented more often
- Continuous Profiler is not supported for AWS Lambda.
- Continuous Profiler does not support ARM64.

{% alert level="danger" %}
Unlike APM, Continuous Profiler is not activated by default when the APM package is installed. You must explicitly enable it for the applications you want to profile.
{% /alert %}

## Installation

Make sure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][3]. The profiler ships together with the tracing library (beginning with v2.8.0), so if you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to [Enabling the Profiler](#enabling-the-profiler).

Otherwise, install the profiler using the following steps, depending on your operating system.

{% alert level="danger" %}
Datadog's automatic instrumentation relies on the .NET CLR Profiling API. Since this API allows only one subscriber, run only one APM solution in your application environment.
{% /alert %}

You can install the Datadog .NET Profiler machine-wide so that any services on the machine can be instrumented, or you can install it on a per-application basis to allow developers to manage the instrumentation through the application's dependencies. To see machine-wide installation instructions, click the **Windows** or **Linux** tab. To see per-application installation instructions, click the **NuGet** tab.

{% tabs %}

{% tab label="Linux with Single Step APM Instrumentation" %}
1. With [Single Step APM Instrumentation][57], there is nothing else to install. Go to [Enabling the Profiler](#enabling-the-profiler) to see how to activate the profiler for an application.

{% alert level="danger" %}
If APM was already manually installed, you must uninstall it by removing the following environment variables:{% br /%}
- `CORECLR_ENABLE_PROFILING`{% br /%}
- `CORECLR_PROFILER`{% br /%}
- `CORECLR_PROFILER_PATH`{% br /%}
- The value that points to `Datadog.Linux.ApiWrapper.x64.so` in `LD_PRELOAD`{% br /%}
{% br /%}
For example, if you are setting these environment variables in your dockerfile for a service, you should remove them to avoid conflicts with Single Step Instrumentation.
If these environment variables are still set, the corresponding previously installed version is silently used instead of the one installed with Single Step Instrumentation.
{% /alert %}
{% /tab %}

{% tab label="Linux" %}
To install the .NET Profiler machine-wide:

1. Download the latest [.NET Tracer package][58] that supports your operating system and architecture.

2. Run one of the following commands to install the package and create the .NET log directory `/var/log/datadog/dotnet` with the appropriate permissions:

   Debian or Ubuntu
   : `sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb && sudo /opt/datadog/createLogPath.sh`

   CentOS 7+ or Fedora
   : `sudo rpm -Uvh datadog-dotnet-apm<TRACER_VERSION>-1.x86_64.rpm && sudo /opt/datadog/createLogPath.sh`

   Alpine or other musl-based distributions
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm<TRACER_VERSION>-musl.tar.gz && sudo sh /opt/datadog/createLogPath.sh`

   Other distributions
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz && sudo /opt/datadog/createLogPath.sh`
{% /tab %}

{% tab label="Windows" %}
To install the .NET Profiler machine-wide:

1. Install or upgrade to the latest version, using the [.NET Monitoring MSI installer][58]. Continuous Profiler supports 64-bit Windows, so you need the file like `datadog-dotnet-apm-<VERSION>-x64.msi`.

2. Run the installer with administrator privileges.
{% /tab %}

{% tab label="NuGet" %}
{% alert level="danger" %}
This installation does not instrument applications running in IIS. For applications running in IIS, follow the Windows machine-wide installation process.
{% /alert %}

To install the .NET Profiler per-application:

1. Add the `Datadog.Trace.Bundle` [NuGet package][59] to your application.
{% /tab %}

{% tab label="Azure App Service" %}
{% alert level="danger" %}
Only Web Apps are supported. Functions are not supported.
{% /alert %}

To install the .NET Profiler per-webapp:
1. Install the Azure App Service Datadog APM Extension [for Windows][60] or use the [Linux setup][61] for your webapp.
{% /tab %}

{% /tabs %}

## Enabling the Profiler

{% alert level="danger" %}
Datadog does not recommend enabling the profiler at machine-level or for all IIS applications. If you have enabled it machine-wide, read the [Troubleshooting documentation][62] for information about reducing the overhead that is associated with enabling the profiler for all system applications.
{% /alert %}

{% tabs %}

{% tab label="Linux with Single Step APM Instrumentation" %}
With [Single Step APM Instrumentation][57], only `DD_PROFILING_ENABLED` must be set to activate the profiler for an application.

```text
DD_PROFILING_ENABLED=1

# other optional environment variables
DD_ENV=production
DD_VERSION=1.2.3
```

Here are the supported values for `DD_PROFILING_ENABLED` environment variable:

| Value                         | Description                                                                                                           |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `1` or `true`                 | Activate the profiler.                                                                                                |
| `Auto`                        | Activate the profiler if and only if (1) a trace has been created and (2) the application lasts more than 30 seconds. |
| `0` or `false`                | Disable the profiler.                                                                                                 |

{% alert %}
The Auto value is aimed to avoid short lived processes without any trace. This feature is in Preview.
{% /alert %}
{% /tab %}

{% tab label="Linux" %}
Set the following required environment variables for automatic instrumentation to attach to your application:

```text
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
DD_DOTNET_TRACER_HOME=/opt/datadog
LD_PRELOAD=/opt/datadog/continuousprofiler/Datadog.Linux.ApiWrapper.x64.so
DD_PROFILING_ENABLED=1

# other optional environment variables
DD_ENV=production
DD_VERSION=1.2.3
```

For standalone applications, manually restart the application as you normally would.

Optional: Set up [Source Code Integration][63] to connect your profiling data with your Git repositories.

A couple of minutes after you start your application, your profiles appear on the [Datadog APM > Profiler page][6]. If they do not, refer to the [Troubleshooting][64] guide.
{% /tab %}

{% tab label="Internet Information Services (IIS)" %}
Set needed environment variables to configure and enable Profiler.
To enable the Profiler for IIS applications, it is required to set the `DD_PROFILING_ENABLED` environment variable in the Registry under `HKLM\System\CurrentControlSet\Services\WAS` and `HKLM\System\CurrentControlSet\Services\W3SVC` nodes.

{% alert %}
Starting v2.14.0, you don't need to set `CORECLR_PROFILER` or `COR_PROFILER` if you installed the tracer using the MSI.
{% /alert %}

**With the Registry Editor:**

In the Registry Editor, modify the multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\WAS` and `HKLM\System\CurrentControlSet\Services\W3SVC` nodes and set the value data as follows:

For .NET Core and .NET 5+:
```text
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
DD_PROFILING_ENABLED=1

# other optional environment variables
DD_ENV=production
DD_VERSION=1.2.3
```

{% img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Using the Registry Editor to create environment variables for a .NET Core application in IIS" style="width:90%" /%}

For .NET Framework:
```text
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
DD_PROFILING_ENABLED=1

# other optional environment variables
DD_ENV=production
DD_VERSION=1.2.3
```

{% img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Using the Registry Editor to create environment variables for a .NET Framework application in IIS" style="width:90%" /%}

The environment variables are applied for *all* IIS applications. Starting with IIS 10, you can set environment variables for each IIS application in the [`C:\Windows\System32\inetsrv\config\applicationhost.config` file][65]. Read the [Microsoft documentation][66] for more details.

Completely stop and start IIS by running the following commands as an administrator:

```shell
net stop /y was
net start w3svc
```

{% alert level="danger" %}
Use `stop` and `start` commands. A reset or restart does not always work.
{% /alert %}

Optional: Set up [Source Code Integration][63] to connect your profiling data with your Git repositories.

A couple of minutes after you start your application, your profiles appear on the [Datadog APM > Profiler page][6]. If they do not, refer to the [Troubleshooting][64] guide.
{% /tab %}

{% tab label="Windows services" %}
Set needed environment variables to configure and enable Profiler. To enable the Profiler for your service, it is required to set the `DD_PROFILING_ENABLED` environment variable in the Registry key associated to the service. If the profiler is running alone (the tracer is deactivated), you can optionally add the `DD_SERVICE`, `DD_ENV` and `DD_VERSION` environment variables.

{% alert %}
Starting v2.14.0, you don't need to set `CORECLR_PROFILER` or `COR_PROFILER` if you installed the tracer using the MSI.
{% /alert %}

**With the Registry Editor:**

In the Registry Editor, create a multi-string value called `Environment` in the  `HKLM\System\CurrentControlSet\Services\MyService` key and set the value data to:

For .NET Core and .NET 5+:
```text
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
DD_PROFILING_ENABLED=1
DD_SERVICE=MyService

# other optional environment variables
DD_ENV=production
DD_VERSION=1.2.3
```

{% img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Using the Registry Editor to create environment variables for a Windows service" style="width:90%" /%}

For .NET Framework:
```text
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
DD_PROFILING_ENABLED=1
DD_SERVICE=MyService

# other optional environment variables
DD_ENV=production
DD_VERSION=1.2.3
```

{% img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Using the Registry Editor to create environment variables for a Windows service" style="width:90%" /%}

**With a PowerShell script:**

For .NET Core and .NET 5+:
```powershell
[string[]] $v = @(
    "CORECLR_ENABLE_PROFILING=1",
    "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}",
    "DD_PROFILING_ENABLED=1",
    "DD_SERVICE=MyService",
    "DD_ENV=production",
    "DD_VERSION=1.2.3"
)
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\MyService -Name Environment -Value $v
```

For .NET Framework:
```powershell
[string[]] $v = @(
    "COR_ENABLE_PROFILING=1",
    "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}",
    "DD_PROFILING_ENABLED=1",
    "DD_SERVICE=MyService",
    "DD_ENV=production",
    "DD_VERSION=1.2.3"
)
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\MyService -Name Environment -Value $v
```

Optional: Set up [Source Code Integration][63] to connect your profiling data with your Git repositories.

A couple of minutes after you start your application, your profiles appear on the [Datadog APM > Profiler page][6]. If they do not, refer to the [Troubleshooting][64] guide.
{% /tab %}

{% tab label="Windows Standalone applications" %}
{% alert %}
Starting v2.14.0, you don't need to set `CORECLR_PROFILER` or `COR_PROFILER` if you installed the tracer using the MSI.
{% /alert %}

Set needed environment variables to configure and enable Profiler for a non-service application, such as console, ASP.NET (Core), Windows Forms, or WPF. To enable the Profiler for Standalone applications, it is required to set the `DD_PROFILING_ENABLED` environment variable. If the profiler is running alone (the tracer is deactivated), you can optionally set the `DD_SERVICE`, `DD_ENV` and `DD_VERSION` environment variables. The recommended approach is to create a batch file that sets these and starts the application, and run your application using the batch file.

For .NET Core and .NET 5+:
```shell
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
SET DD_PROFILING_ENABLED=1
SET DD_SERVICE=MyService

REM other optional environment variables
SET DD_ENV=production
SET DD_VERSION=1.2.3

REM start the application here
```

For .NET Framework:
```shell
SET COR_ENABLE_PROFILING=1
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
SET DD_PROFILING_ENABLED=1
SET DD_SERVICE=MyService

REM other optional environment variables
SET DD_ENV=production
SET DD_VERSION=1.2.3

REM start the application here
```

Optional: Set up [Source Code Integration][63] to connect your profiling data with your Git repositories.

A couple of minutes after you start your application, your profiles appear on the [Datadog APM > Profiler page][6]. If they do not, refer to the [Troubleshooting][64] guide.
{% /tab %}

{% tab label="NuGet" %}
Set the following required environment variables for profiling to attach to your application:

```text
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_PROFILER_PATH=<System-dependent path>
DD_PROFILING_ENABLED=1
LD_PRELOAD=<System-dependent path>
DD_SERVICE=MyService

# other optional environment variables
DD_ENV=production
DD_VERSION=1.2.3
DD_DOTNET_TRACER_HOME=<APP_DIRECTORY>/datadog
```

The value for the `<APP_DIRECTORY>` placeholder is the path to the directory containing the application's `.dll` files. The value for the `CORECLR_PROFILER_PATH` environment variable varies based on the system where the application is running:

| Operating System and Process Architecture | CORECLR_PROFILER_PATH Value | LD_PRELOAD Value |
|------------------------------------------|-------------------------------------|---------------------------|
| Alpine Linux x64 | `<APP_DIRECTORY>/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so`| `<APP_DIRECTORY>/datadog/linux-musl-x64/Datadog.Linux.ApiWrapper.x64.so`|
| Linux x64        | `<APP_DIRECTORY>/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so` | `<APP_DIRECTORY>/datadog/linux-x64/Datadog.Linux.ApiWrapper.x64.so`|
| Linux ARM64      | `<APP_DIRECTORY>/datadog/linux-arm64/Datadog.Trace.ClrProfiler.Native.so`| `<APP_DIRECTORY>/datadog/linux-arm64/Datadog.Linux.ApiWrapper.x64.so`|
| Windows x64      | `<APP_DIRECTORY>\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll` | N/A |
| Windows x86      | `<APP_DIRECTORY>\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll` | N/A |

For Docker images running on Linux, configure the image to run the `createLogPath.sh` script:

```text
RUN /<APP_DIRECTORY>/datadog/createLogPath.sh
```

Docker examples are available in the [`dd-trace-dotnet` repository][67].

For standalone applications, manually restart the application.
{% /tab %}

{% tab label="Azure App Service" %}
Follow these installation guidelines ([Windows][60] or [Linux][61]) to set `DD_PROFILING_ENABLED=1` to enable the profiler.
{% /tab %}

{% /tabs %}

## Configuration

You can configure the profiler using the following environment variables. Most of these settings also apply to the Tracer configuration. Restart the application after any of these settings is changed.

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_ENV`                   | String        | The [environment][29] name, for example, `production`. If not set, will be `unspecified-environment` |
| `DD_SERVICE`               | String        | The [service][29] name, for example, `web-backend`. If this is not specified, the .NET Profiler tries to determine the service name automatically from the application name (process entry assembly or process name).    |
| `DD_VERSION`               | String        | The [version][29] of your service. If not set, will be `unspecified-version` |
| `DD_TAGS`                  | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.   |
| `DD_AGENT_HOST`            | String        | Sets the host where profiles are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set. Defaults to `localhost`.  |
| `DD_TRACE_AGENT_PORT`      | String        | Sets the port where profiles are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. Defaults to`8126`.  |
| `DD_TRACE_AGENT_URL`       | String        | Sets the URL endpoint where profiles are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. Defaults to `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.  |
| `DD_TRACE_DEBUG`           | Boolean        | Enables or disables debug logging (Could help in case of troubleshooting investigation). Valid values are: `true` or `false`. Defaults to `false`.  |
| `DD_PROFILING_LOG_DIR`     | String        | Sets the directory for .NET Profiler logs. Defaults to `%ProgramData%\Datadog .NET Tracer\logs\`. (Prior to v2.24, the default directory was `%ProgramData%\Datadog-APM\logs\`)  |
| `DD_PROFILING_ENABLED`     | Boolean        | If set to `true`, enables the .NET Profiler. Defaults to `false`.  |
| `DD_PROFILING_WALLTIME_ENABLED` | Boolean        | If set to `false`, disables the Wall time profiling. Defaults to `true`.  |
| `DD_PROFILING_CPU_ENABLED` | Boolean        | If set to `false`, disables the CPU profiling. Defaults to `true`.  |
| `DD_PROFILING_EXCEPTION_ENABLED` | Boolean        | If set to `true`, enables Exception profiling. Defaults to `false`.  |
| `DD_PROFILING_ALLOCATION_ENABLED` | Boolean        | If set to `true`, enables Allocation profiling (in Preview). Defaults to `false`.  |
| `DD_PROFILING_LOCK_ENABLED` | Boolean        | If set to `true`, enables Lock Contention profiling. Defaults to `false`.  |
| `DD_PROFILING_HEAP_ENABLED` | Boolean        | If set to `true`, enables Live Heap profiling (in Preview). Defaults to `false`.  |
| `DD_PROFILING_GC_ENABLED` | Boolean        | If set to `false`, disables Garbage Collection profiling used in Timeline user interface. Defaults to `true`.  |
| `DD_PROFILING_HTTP_ENABLED` | Boolean        | If set to `true`, enables outgoing HTTP request profiling used in Timeline user interface. Defaults to `false`.  |
| `DD_PROFILING_HEAPSNAPSHOT_ENABLED` | Boolean        | If set to `true`, enables the regular generation of a heap snapshot when an increase in memory consumption is detected. This is used in the [Memory Leak user interface][56]. Defaults to `false`.  |

{% alert level="danger" %}
For IIS applications, you must set environment variables in the Registry (under `HKLM\System\CurrentControlSet\Services\WAS` and `HKLM\System\CurrentControlSet\Services\W3SVC` nodes) as shown in the Windows Service tab, above. The environment variables are applied for *all* IIS applications.
Starting with IIS 10, you can set environment variables for each IIS application in the [`C:\Windows\System32\inetsrv\config\applicationhost.config` file][65]. Read the [Microsoft documentation][66] for more details.
{% /alert %}

{% /if %}
<!-- end .NET -->

<!-- PHP -->
{% if equals($prog_lang, "php") %}

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][2].

The Datadog Profiler requires at least PHP 7.1, on 64-bit Linux.

PHP ZTS builds are supported since `dd-trace-php` version 0.99+, while PHP debug builds are **not** supported.

{% tabs %}

{% tab label="GNU C Linux" %}
An operating system with glibc 2.17 or newer is required. The following versions or newer meet this requirement:
  - CentOS 7
  - Debian 8
  - Ubuntu 14.04

{% alert %}
The operating system versions above have all reached end of life (EOL), Datadog recommends running more recent versions.
{% /alert %}
{% /tab %}

{% tab label="Alpine Linux" %}
Version 3.13 or newer of Alpine Linux is required because the profiler is built against musl v1.2.

Additionally you need to install `libgcc_s` with:

```shell
apk add libgcc
```
{% /tab %}

{% /tabs %}

The following profiling features are available in the following minimum versions of the `dd-trace-php` library:

| Feature                              | Required `dd-trace-php` version |
|--------------------------------------|---------------------------------|
| [Trace to Profiling integration][68] | 0.89.0+                           |
| [Endpoint Profiling][69]             | 0.79.0+                         |
| [Timeline][70]                       | 0.98.0+                         |
| [Source Code Integration][71]        | 1.13.0+                         |

Continuous Profiler is not supported on some serverless platforms, such as AWS Lambda.

## Installation

To begin profiling applications:

1. Make sure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][3].

2. Download the `datadog-setup.php` script from the [GitHub release page][72]. Version 0.69.0 is the first tracer release to include this installer.

    ```shell
    curl --proto '=https' --tlsv1.2 -sSfLO \
      https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
    ```

3. Run the installer to install both the tracer and profiler. This script is interactive and asks which of the detected PHP locations it should install to. At the end of the script, it outputs the non-interactive version of the command arguments for future use.

    ```shell
    php datadog-setup.php --enable-profiling --php-bin=all
    ```

4. **Optional:** Configure the profiler using config mode through the `datadog-setup.php`:

    ```shell
    php datadog-setup.php config set \
      -d datadog.service=app-name \
      -d datadog.env=prod \
      -d datadog.version=1.3.2
    ```

    Apache, PHP-FPM, FrankenPHP and other servers require a restart after changing the INI settings.

    See the [configuration docs][73] for more INI settings.

5. Validate the profiler extension is loaded and enabled by executing `php -v` and validate that you see `datadog-profiling` in the output.

    ```shell
    php -v
    ```

    ```text
    PHP 8.4.13 (cli) (built: Sep  5 2025 11:52:54) (ZTS)
    Copyright (c) The PHP Group
    Zend Engine v4.4.13, Copyright (c) Zend Technologies
        with Zend OPcache v8.4.13, Copyright (c), by Zend Technologies
        with datadog-profiling v1.13.0, Copyright Datadog, by Datadog
    ```

6. Optional: Set up [Source Code Integration][71] to connect your profiling data with your Git repositories.

7. A couple of minutes after receiving a request, your profiles appear on the [APM > Profiler page][6]. If they do not, refer to the [Troubleshooting][74] guide.

{% /if %}
<!-- end PHP -->

<!-- C / C++ / Rust (ddprof) -->
{% if includes($prog_lang, ["c", "cpp", "rust"]) %}

{% alert level="danger" %}
`ddprof` is in Preview. Datadog recommends evaluating the profiler in a non-sensitive environment before deploying in production.
{% /alert %}

The native profiler for compiled languages (`ddprof`) uses OS level APIs to collect profiling data. It is ideally suited for applications written in compiled languages, such as C, C++, or Rust.
Profiles sent from `ddprof` show up under the _native_ runtime in the Datadog web app.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][2].

Supported operating systems
: Linux (glibc or musl)

Supported architecture
: `amd64` or `arm64` processors

Serverless
: `ddprof` is not supported on serverless platforms, such as AWS Lambda.

OS Settings
: `perf_event_paranoid` kernel setting is 2 or less (see [Troubleshooting][75])

Debugging information
: Symbols should be available. The profiler cannot provide human-readable function names if the symbol table is stripped.

## Installation

The profiler can be used either as a standalone executable or as a library. Skip to [library installation instructions](#library) if you want to use it as a library.

### Standalone

1. Download the latest [`ddprof` release][76]. For example, here is one way to pull the latest release for an `amd64` (also known as `x86_64`) platform:

   ```bash
   curl -Lo ddprof-linux.tar.xz https://github.com/DataDog/ddprof/releases/latest/download/ddprof-amd64-linux.tar.xz
   tar xvf ddprof-linux.tar.xz
   mv ddprof/bin/ddprof INSTALLATION_TARGET
   ```

   Where `INSTALLATION_TARGET` specifies the location you'd like to store the `ddprof` binary. The examples that follow assume `INSTALLATION_TARGET` is set to `./ddprof`.

   Use `arm64` instead of `amd64` for `aarch64` platform.

2. Modify your service invocation to include the profiler. Your usual command is passed as the last arguments to the `ddprof` executable.

   {% tabs %}

   {% tab label="Environment variables" %}
   ```bash
   export DD_ENV=prod
   export DD_SERVICE=my-web-app
   export DD_VERSION=1.0.3
   ./ddprof myapp --arg1 --arg2
   ```

   {% alert %}
   If you usually launch your application using a shell builtin, for example:

   ```bash
   exec myapp --arg1 --arg2
   ```

   Then you must invoke `ddprof` with that builtin instead:

   ```bash
   export DD_ENV=prod
   export DD_SERVICE=my-web-app
   export DD_VERSION=1.0.3
   exec ./ddprof myapp --arg1 --arg2
   ```
   {% /alert %}
   {% /tab %}

   {% tab label="Parameters" %}
   ```bash
   ./ddprof --environment prod --service my-web-app --service_version 1.0.3 myapp --arg1 --arg2
   ```

   {% alert %}
   If you usually launch your application using a shell builtin, for example:

   ```bash
   exec myapp --arg1
   ```

   Then you must invoke `ddprof` with that builtin instead:

   ```bash
   exec ./ddprof --environment prod --service my-web-app --service_version 1.0.3 myapp --arg1 --arg2
   ```
   {% /alert %}
   {% /tab %}

   {% /tabs %}

3. A couple of minutes after you start your application, your profiles appear on the [Datadog APM > Profiler page][6]. If they do not, refer to the [Troubleshooting][77] guide.

### Library

The library exposes a C API.

1. Download a release of [ddprof][76] with library support (v0.8.0 or later) and extract the tarball. For example:

   ```bash
   curl -Lo ddprof-linux.tar.xz https://github.com/DataDog/ddprof/releases/latest/download/ddprof-amd64-linux.tar.xz
   tar xvf ddprof-linux.tar.xz --directory /tmp
   ```

2. In your code, start the profiler using the `ddprof_start_profiling()` interface, defined in the `_dd_profiling.h_` header provided by the release. The profiler stops automatically when your program closes. To stop the profiler manually, use `ddprof_stop_profiling(ms)` with the `ms` parameter indicating the maximum block time of the function in milliseconds. Here is a standalone example (`profiler_demo.c`) in C:

   ```cpp
   #include <stdlib.h>
   #include "dd_profiling.h"

   int foo(void) {
     int n = 0;
     for (int i = 0; i < 1000; i++) {
       n += 1;
     }
     return n;
   }

   int main(void) {
     // Initialize and start the Datadog profiler. Uses agent defaults if not
     // specified
     setenv("DD_ENV", "prod", 1);
     setenv("DD_SERVICE", "c_testservice", 1);
     setenv("DD_VERSION", "1.0.3", 1);
     ddprof_start_profiling();

     // Do some work
     for (int i = 0; i < 1e6; i++) {
       foo();
     }
     return 0;
   }
   ```

3. Pass the `include` and `lib` subdirectories of the extracted directory to your build system and link against `libdd_profiling`. For the above example:

   ```bash
   gcc -I/tmp/ddprof/include -L/tmp/ddprof/lib profiler_demo.c -o profiler_demo -ldd_profiling
   ```

### Deploying the shared library

The shared library must be present in the system's library search path. Otherwise, the application will fail to start. Using the example from before:

```bash
./profiler_demo
./profiler_demo: error while loading shared libraries: libdd_profiling.so: cannot open shared object file: No such file or directory
```

Avoid this by linking against the static library.

#### Installing the library

Add the library to the search path by copying it to any existing search directory. To find out what your search directories are, on Linux systems, run:

```bash
ld --verbose | grep SEARCH_DIR | tr -s ' ;' \\n
```

#### Appending a search directory

Use the `LD_LIBRARY_PATH` environment variable to add additional search paths to the runtime linker. For example, using the directory layout from before:

```bash
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/tmp/ddprof/lib
```

## Configuration

The `environment`, `service`, and `service_version` settings are recommended, as they are used by the Profiling UI.

See the [full list of parameters][78] or use the command line.

```bash
ddprof --help
```

### Logging

You can configure logging to one of several endpoints:
- `stdout` prints the logs to standard output stream (the default).
- `stderr` prints the logs to the standard error stream.
- `syslog` publishes the logs to syslog, attempting to adhere to the specification in RFC 3164.
- `disable` disables the logs entirely.
- Any other value is treated as a file path, with a leading `/` designating an absolute path.

### Global

If you want to instrument all running process, you can try out the `--global` option.
Global mode is intended for debug purposes. This requires elevated permissions. Depending on your setup, this can mean running as root, granting `CAP_PERFMON`, `CAP_SYSADMIN`, or setting `perf_event_paranoid` to `-1`.

```bash
./ddprof --environment staging --global --service_version full-host-profile
```

For most configurations, this consists of all processes visible within the profiler's PID namespace.

{% /if %}
<!-- end C / C++ / Rust -->

## Not sure what to do next?

The [Getting Started with Profiler][7] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

[1]: /tracing/trace_collection/
[2]: /profiler/enabling/supported_versions/
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[4]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[5]: /integrations/guide/source-code-integration/?tab=java
[6]: https://app.datadoghq.com/profiling
[7]: /getting_started/profiler/
[10]: /tracing/trace_collection/compatibility/python
[11]: /profiler/profile_types/?tab=python
[12]: /serverless/aws_lambda/profiling/
[13]: /integrations/guide/source-code-integration/?tab=python
[14]: /profiler/profiler_troubleshooting/python/
[15]: https://ddtrace.readthedocs.io/en/stable/configuration.html#configuration
[16]: https://go.dev/doc/devel/release
[17]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[18]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[19]: /tracing/trace_collection/custom_instrumentation/go/migration
[20]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/profiler#pkg-constants
[21]: /profiler/connect_traces_and_profiles/#span-execution-timeline-view
[22]: /profiler/connect_traces_and_profiles/#prerequisites
[23]: /integrations/guide/source-code-integration/?tab=go
[24]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/profiler#WithProfileTypes
[25]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/profiler#ProfileType
[26]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#WithProfileTypes
[27]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#ProfileType
[28]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[29]: /getting_started/tagging/unified_service_tagging
[30]: https://pkg.go.dev/github.com/ianlancetaylor/cgosymbolizer#pkg-overview
[31]: https://tip.golang.org/doc/go1.21
[32]: /profiler/guide/save-cpu-in-production-with-go-pgo
[33]: https://www.freedesktop.org/wiki/Software/pkg-config/
[34]: https://github.com/pkgconf/pkgconf
[35]: /integrations/guide/source-code-integration/?tab=ruby
[36]: /integrations/guide/source-code-integration/?tab=nodejs
[38]: /profiler/profile_types/?tab=java
[39]: /profiler/profiler_troubleshooting/java/#configuration-reference
[40]: /tracing/trace_collection/compatibility/java/?tab=graalvm#setup
[41]: /profiler/profiler_troubleshooting/go/
[42]: https://formulae.brew.sh/formula/pkgconf
[43]: https://packages.debian.org/search?keywords=pkg-config
[44]: https://packages.ubuntu.com/search?keywords=pkg-config
[45]: https://archlinux.org/packages/?q=pkgconf
[46]: https://pkgs.alpinelinux.org/packages?name=pkgconf
[47]: https://packages.fedoraproject.org/pkgs/pkgconf/pkgconf-pkg-config
[48]: https://rpmfind.net/linux/rpm2html/search.php?query=pkgconf-pkg-config
[49]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
[50]: /profiler/profiler_troubleshooting/ruby/
[51]: /profiler/profiler_troubleshooting/ruby/#unexpected-failures-or-errors-from-ruby-gems-that-use-native-extensions
[52]: /profiler/profiler_troubleshooting/nodejs/
[53]: /profiler/profiler_troubleshooting/dotnet#linux-containers
[54]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[55]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[56]: /profiler/guide/solve-memory-leaks/
[57]: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm
[58]: https://github.com/DataDog/dd-trace-dotnet/releases
[59]: https://www.nuget.org/packages/Datadog.Trace.Bundle
[60]: /serverless/azure_app_services/azure_app_services_windows/?tab=net#installation
[61]: /serverless/azure_app_services/azure_app_services_linux/?tab=nodenetphppython#setup
[62]: /profiler/profiler_troubleshooting/?code-lang=dotnet#avoid-enabling-the-profiler-machine-wide
[63]: /integrations/guide/source-code-integration/?tab=net
[64]: /profiler/profiler_troubleshooting/dotnet/
[65]: https://docs.microsoft.com/en-us/iis/get-started/planning-your-iis-architecture/introduction-to-applicationhostconfig
[66]: https://docs.microsoft.com/en-us/iis/configuration/system.applicationhost/applicationpools/add/environmentvariables/
[67]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
[68]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[69]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[70]: /profiler/profile_visualizations/#timeline-view
[71]: /integrations/guide/source-code-integration/?tab=php
[72]: https://github.com/DataDog/dd-trace-php/releases
[73]: /tracing/trace_collection/library_config/php/#environment-variable-configuration
[74]: /profiler/profiler_troubleshooting/php/
[75]: /profiler/profiler_troubleshooting
[76]: https://github.com/DataDog/ddprof/releases
[77]: /profiler/profiler_troubleshooting/ddprof/
[78]: https://github.com/DataDog/ddprof/blob/main/docs/Commands.md
