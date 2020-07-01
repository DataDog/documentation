---
title: Migrate your Profiling Setup
kind: faq
---

<div class="alert alert-warning">
<b>You must migrate your current setup as the agentless mode will no longer be supported when Continuous Profiling is generally available.</b>
</div>
****

As we get closer to Continuous Profiling general availability, we have made changes so onboarding your services is even easier than before. Notably, will now send profiles through the Datadog Agent, removing the need for an API key or an upload endpoint. In summary here are the benefits of switching to agent mode:

- Deprecated having to specify an API key: `DD_PROFILING_API_KEY`, `DD_API_KEY`, `DD_PROFILING_API_KEY_FILE`.
- Deprecated having to specify the uploading endpoint: `DD_SITE`.
- Added support to send profiles directly through the agent.
- Added support for including container-id header during profile collection so you can automatically get container tags.

## Migrating from Agentless to the Agent Setup

{{< tabs >}}
{{% tab "Java" %}}

Perform following steps to migrate your service to send profiles directly through the agent:

1. Upgrade your agent to version [7.20.2][1]+ or [6.20.2][1]+

2. Upgrade the tracing library to [version 0.55][2]+ or run the following command to get the latest tracer version:

    ```shell
    wget -O dd-java-agent.jar 'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.datadoghq&a=dd-java-agent&v=LATEST'
    ```

3. Clear `DD_PROFILING_API_KEY_FILE` or `DD_PROFILING_API_KEY` environment variable alongside the API key file as they were deprecated in version 0.55.

    ```shell
    unset DD_PROFILING_API_KEY_FILE

    # OR

    unset DD_PROFILING_API_KEY
    ```

    **Note** If you are using `-Ddd.profiling.api-key-file` flag, do not specify it during service invocation as it is also deprecated in version 0.55.

4. Ensure `Ddd.profiling.enabled` flag or `DD_PROFILING_ENABLED` environment variable is set to `true`. Update to your service invocation should look like:

    ```shell
    java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
    ```

5. After a minute or two, visualize your profiles on the [Datadog APM > Profiling page][1].

**NOTE** The following arguments and environment variables have been deprecated:

| Arguments                       | Environment variable        | Description                                      |
| ------------------------------- | --------------------------- | ------------------------------------------------ |
| `-Ddd.profiling.api-key-file` | DD_PROFILING_API_KEY_FILE | Deprecated in version 0.55. File that should contain the API key as a string. See above for how to configure dd-trace-java.jar to upload profiles via the Datadog Agent instead. |
| N/A                           | DD_PROFILING_API_KEY      | Deprecated in version 0.55. Datadog API key.                                  |
| `-Ddd.site`                   | DD_SITE                   | Deprecated in version 0.55. Destination site for your profiles (versions 0.48+). Valid options are `datadoghq.com` for Datadog US site (default), and `datadoghq.eu` for the Datadog EU site. See above for how to configure dd-trace-java.jar to upload profiles via the Datadog Agent instead. |
| `-Ddd.profiling.proxy.host`     | DD_PROFILING_PROXY_HOST     | Deprecated in version 0.55. Host for your proxy (`my-proxy.example.com`).    |
| `-Ddd.profiling.proxy.port`     | DD_PROFILING_PROXY_PORT     | Deprecated in version 0.55. Port used by your proxy. Default port is `8080`. |
| `-Ddd.profiling.proxy.username` | DD_PROFILING_PROXY_USERNAME | Deprecated in version 0.55. Username used by your proxy.                     |
| `-Ddd.profiling.proxy.password` | DD_PROFILING_PROXY_PASSWORD | Deprecated in version 0.55. Password used by your proxy.                     |

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/apm/install
{{% /tab %}}

{{% tab "Python" %}}

Perform following steps to migrate your service to send profiles directly through the agent:

1. Upgrade your agent to version [7.20.2][1]+ or [6.20.2][1]+

2. Upgrade the tracing library to [version 0.39][2]+ or run the following command to get the latest tracer version::

    ```shell
    pip install ddtrace
    ```

3. Clear `DD_PROFILING_API_KEY` or `DD_API_KEY` environment variable as they were deprecated in version 0.39:

    ```shell
    unset DD_PROFILING_API_KEY

    # OR

    unset DD_API_KEY
    ```

4. To automatically profile your code, import `ddtrace.profile.auto`. After import, the profiler starts:

    ```python
    import ddtrace.profiling.auto
    ```

5. After a minute or two, visualize your profiles on the [Datadog APM > Profiling page][1].

**NOTE** The following environment variables have been deprecated:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_API_KEY`                                     | String        | Deprecated in version 0.39. The [Datadog API key][1] to use when uploading profiles. See above for how to configure dd-trace-java.jar to upload profiles via the Datadog Agent instead. Supported in version 0.37.                                        |
| `DD_PROFILING_API_KEY`                           | String        | Deprecated in version 0.39. The [Datadog API key][1] to use when uploading profiles. |
| `DD_SITE`                                        | String        | Deprecated in version 0.39. If your organization is on Datadog EU site, set this to `datadoghq.eu`. See above for how to configure dd-trace-java.jar to upload profiles via the Datadog Agent instead.                          |
| `DD_PROFILING_TAGS`                              | String        | Deprecated in 0.38 in favor of `DD_TAGS`. Tags to apply to an uploaded profile. Must be a list a `key:value` comma separated list like: `<KEY1>:<VALUE1>,<KEY2>:<VALUE2>`. |
| DD_PROFILING_PROXY_HOST                          | String        | Deprecated in version 0.39. Host for your proxy (`my-proxy.example.com`).    |
| DD_PROFILING_PROXY_PORT                          | String        | Deprecated in version 0.39. Port used by your proxy. Default port is `8080`. |
| DD_PROFILING_PROXY_USERNAME                      | String        | Deprecated in version 0.39. Username used by your proxy.                     |
| DD_PROFILING_PROXY_PASSWORD                      | String        | Deprecated in version 0.39. Password used by your proxy.                     |

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/apm/install
{{% /tab %}}

{{% tab "Go" %}}

Perform following steps to migrate your service to send profiles directly through the agent:

1. Upgrade your agent to version [7.20.2][1]+ or [6.20.2][1]+

3. Clear `DD_API_KEY` or `DD_PROFILING_API_KEY` environment variables as they were deprecated in version 0.55:

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

5. To profile your code, add a [Datadog API key][2], set your environment, service, and version, then start the profiler:

    ```Go
    err := profiler.Start()
    if err != nil {
        log.Fatal(err)
    }
    defer profiler.Stop()
    ```

    **NOTE** Profilers must now be configured through environment variables instead of code. See below for deprecated methods in the tracer version 1.25.0.

5. After a minute or two, visualize your profiles on the [Datadog APM > Profiling page][1].

**NOTE** The following environment variables and methods have been deprecated:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_API_KEY`                                     | String        | Deprecated in version 0.39. Alongside `WithAPIKey` method has been deprecated as well. The [Datadog API key][1] to use when uploading profiles. See above for how to configure dd-trace-java.jar to upload profiles via the Datadog Agent instead. Supported in version 0.37.                                        |
| `DD_PROFILING_API_KEY`                           | String        | Deprecated in version 0.39. The [Datadog API key][1] to use when uploading profiles. |
| `DD_SITE`                                        | String        | Deprecated in version 0.39. If your organization is on Datadog EU site, set this to `datadoghq.eu`. See above for how to configure dd-trace-java.jar to upload profiles via the Datadog Agent instead.                          |
| `DD_PROFILING_TAGS`                              | String        | Deprecated in 0.38 in favor of `DD_TAGS`. Tags to apply to an uploaded profile. Must be a list a `key:value` comma separated list like: `<KEY1>:<VALUE1>,<KEY2>:<VALUE2>`. |
| DD_PROFILING_PROXY_HOST                          | String        | Deprecated in version 0.39. Host for your proxy (`my-proxy.example.com`).    |
| DD_PROFILING_PROXY_PORT                          | String        | Deprecated in version 0.39. Port used by your proxy. Default port is `8080`. |
| DD_PROFILING_PROXY_USERNAME                      | String        | Deprecated in version 0.39. Username used by your proxy.                     |
| DD_PROFILING_PROXY_PASSWORD                      | String        | Deprecated in version 0.39. Password used by your proxy.                     |

Deprecated code level Profiler configuration:

| Method | Type          | Description                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
|  WithAPIKey      | String        | Deprecated in version 0.39. The Datadog [Datadog API key][2]                                                                             |
|  WithService     | String        | Deprecated in version 0.39. The Datadog [service][4] name, for example `my-web-app`, which can be set here, or in `DD_TAGS`.             |
|  WithEnv         | String        | Deprecated in version 0.39. The Datadog [environment][5] name, for example `production`, which can be set here, or in `DD_TAGS`.         |
|  WithTags        | String        | Deprecated in version 0.39. The tags to apply to an uploaded profile. Must be a list of in the format `<KEY1>:<VALUE1>,<KEY2>:<VALUE2>`. |

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/apm/install
{{% /tab %}}
{{< /tabs >}}
