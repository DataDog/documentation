---
title: Migrate your Profiling Setup for GA
kind: faq
---

<div class="alert alert-warning">
<b>Agentless profiling will no longer be supported from August 15th, 2020.</b>
</div>

Benefits of switching to agent mode:

- Deprecated having to specify an API key: `DD_PROFILING_API_KEY`, `DD_API_KEY`, `DD_PROFILING_API_KEY_FILE`, `DD_API_KEY_FILE` (or corresponding system property flags).
- Deprecated having to specify the uploading endpoint: `DD_SITE`.
- Added support to send profiles directly through the agent.
- Added support for including container-id header during profile collection so you can automatically get container tags.

## Migrating from Agentless to the Agent Setup
{{< programming-lang-wrapper langs="java,python,go" >}}
{{< programming-lang lang="java" >}}

Perform the following steps to migrate your service to send profiles directly through the Datadog Agent:

1. Upgrade your Agent to version [7.20.2][1]+ or [6.20.2][1]+.

2. Upgrade the tracing library to [version 0.55][2]+ or run the following command to get the latest tracer version:

    ```shell
    wget -O dd-java-agent.jar 'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.datadoghq&a=dd-java-agent&v=LATEST'
    ```

3. Clear the `DD_PROFILING_API_KEY_FILE`, `DD_PROFILING_API_KEY`, `DD_API_KEY_FILE` or `DD_API_KEY` environment variables or equivalent system property flags. The API key files are deprecated as of version 0.55.

    ```shell
    unset DD_PROFILING_API_KEY_FILE
    unset DD_PROFILING_API_KEY
    unset DD_API_KEY_FILE
    unset DD_API_KEY
    ```

4. Ensure the `-Ddd.profiling.enabled` flag or `DD_PROFILING_ENABLED` environment variable is set to `true`. For example, you can run:

    ```shell
    java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
    ```

### Results

Within a few minutes of migrating, you can see the data on the [Datadog APM > Profiling page][1].

### Deprecated arguments

The following arguments and environment variables have been deprecated:

| Arguments                       | Environment variable        | Description                                      |
| ------------------------------- | --------------------------- | ------------------------------------------------ |
| `-Ddd.profiling.api-key-file` | DD_PROFILING_API_KEY_FILE | Deprecated in version 0.55. File that should contain the API key as a string. See above for how to configure dd-trace-java.jar to upload profiles via the Datadog Agent instead. |
| `-Ddd.profiling.api-key`                           | DD_PROFILING_API_KEY      | Deprecated in version 0.55. Datadog API key.
| `-Ddd.api-key-file` | DD_API_KEY_FILE | Deprecated in version 0.55. File that should contain the API key as a string. |
| `-Ddd.api-key`                           | DD_API_KEY      | Deprecated in version 0.55. Datadog API key.   |
| `-Ddd.site`                   | DD_SITE                   | Deprecated in version 0.55. Destination site for your profiles (versions 0.48+). Valid options are `datadoghq.com` for Datadog US site (default), and `datadoghq.eu` for the Datadog EU site. See above for how to configure dd-trace-java.jar to upload profiles via the Datadog Agent instead. |
| `-Ddd.profiling.proxy.host`     | DD_PROFILING_PROXY_HOST     | Deprecated in version 0.55. Host for your proxy (`my-proxy.example.com`).    |
| `-Ddd.profiling.proxy.port`     | DD_PROFILING_PROXY_PORT     | Deprecated in version 0.55. Port used by your proxy. Default port is `8080`. |
| `-Ddd.profiling.proxy.username` | DD_PROFILING_PROXY_USERNAME | Deprecated in version 0.55. Username used by your proxy.                     |
| `-Ddd.profiling.proxy.password` | DD_PROFILING_PROXY_PASSWORD | Deprecated in version 0.55. Password used by your proxy.                     |


[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/apm/docs
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Perform the following steps to migrate your service to send profiles directly through the Datadog Agent:

1. Upgrade your Agent to version [7.20.2][1]+ or [6.20.2][1]+.

2. Upgrade the tracing library to [version 0.39][2]+ or run the following command to get the latest tracer version:

    ```shell
    pip install ddtrace
    ```

3. Clear the `DD_PROFILING_API_KEY` or `DD_API_KEY` environment variable. The API key files are deprecated as of version 0.39:

    ```shell
    unset DD_PROFILING_API_KEY

    # OR

    unset DD_API_KEY
    ```

4. To automatically profile your code, import `ddtrace.profile.auto`. After import, the profiler starts:

    ```python
    import ddtrace.profiling.auto
    ```

### Results

Within a few minutes of migrating, you can see the data on the [Datadog APM > Profiling page][1].

### Deprecated arguments

The following arguments and environment variables have been deprecated:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_API_KEY`                                     | String        | Deprecated in version 0.39. The [Datadog API key][1] to use when uploading profiles. See above for how to configure dd-trace-java.jar to upload profiles via the Datadog Agent instead. Supported in version 0.37.                                        |
| `DD_PROFILING_API_KEY`                           | String        | Deprecated in version 0.39. The [Datadog API key][1] to use when uploading profiles. |
| `DD_SITE`                                        | String        | Deprecated in version 0.39. If your organization is on the Datadog EU site, set this to `datadoghq.eu`. See above for how to configure dd-trace-java.jar to upload profiles via the Datadog Agent instead.                          |
| `DD_PROFILING_TAGS`                              | String        | Deprecated in 0.38 in favor of `DD_TAGS`. Tags to apply to an uploaded profile. Must be a list a `key:value` comma-separated list like: `<KEY1>:<VALUE1>,<KEY2>:<VALUE2>`. |




[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/apm/docs
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Perform the following steps to migrate your service to send profiles directly through the Datadog Agent:

1. Upgrade your Agent to version [7.20.2][1]+ or [6.20.2][1]+.

3. Clear the `DD_API_KEY` or `DD_PROFILING_API_KEY` environment variable. The API key files are deprecated as of version 0.55:

    ```shell
    unset DD_PROFILING_API_KEY

    # OR

    unset DD_API_KEY
    ```

2. Upgrade the tracing library to [version 1.25.0][2]+:

    ```shell
    go get gopkg.in/DataDog/dd-trace-go.v1
    ```

4. Ensure that you have imported the [profiler][1] at the start of your application:

    ```Go
    import "gopkg.in/DataDog/dd-trace-go.v1/profiler"
    ```

5. To profile your code, set your environment, service, and version, then start the profiler:

    ```Go
    err := profiler.Start(
        profiler.WithService("<SERVICE_NAME>"),
        profiler.WithEnv("<ENVIRONMENT>"),
        profiler.WithTags("version:<APPLICATION_VERSION>"),
    )
    if err != nil {
        log.Fatal(err)
    }
    defer profiler.Stop()
    ```

    **NOTE** See below for deprecated methods in the tracer version 1.25.0.

### Results

Within a few minutes of migrating, you can see the data on the [Datadog APM > Profiling page][1].

### Deprecated arguments

The following arguments and environment variables have been deprecated:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_API_KEY`                                     | String        | Deprecated in version 0.39. Alongside `WithAPIKey` method has been deprecated as well. The [Datadog API key][1] to use when uploading profiles. See above for how to configure dd-trace-java.jar to upload profiles via the Datadog Agent instead. Supported in version 0.37.                                        |
| `DD_PROFILING_API_KEY`                           | String        | Deprecated in version 0.39. The [Datadog API key][1] to use when uploading profiles. |
| `DD_SITE`                                        | String        | Deprecated in version 0.39. If your organization is on the Datadog EU site, set this to `datadoghq.eu`. See above for how to configure dd-trace-java.jar to upload profiles via the Datadog Agent instead.                          |
| `DD_PROFILING_TAGS`                              | String        | Deprecated in 0.38 in favor of `DD_TAGS`. Tags to apply to an uploaded profile. Must be a list a `key:value` comma-separated list like: `<KEY1>:<VALUE1>,<KEY2>:<VALUE2>`. |
| DD_PROFILING_PROXY_HOST                          | String        | Deprecated in version 0.39. Host for your proxy (`my-proxy.example.com`).    |
| DD_PROFILING_PROXY_PORT                          | String        | Deprecated in version 0.39. Port used by your proxy. Default port is `8080`. |
| DD_PROFILING_PROXY_USERNAME                      | String        | Deprecated in version 0.39. Username used by your proxy.                     |
| DD_PROFILING_PROXY_PASSWORD                      | String        | Deprecated in version 0.39. Password used by your proxy.                     |

Deprecated code level Profiler configuration:

| Method | Type          | Description                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
|  WithAPIKey      | String        | Deprecated in version 0.39. The Datadog [Datadog API key][2].                                                                             |



[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/apm/docs
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

