<!--
Configuration for Go profiler.
-->

You can set profiler parameters in code with these functions:

| Function | Type          | Description                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
|  WithService     | String        | The Datadog [service][1] name, for example, `my-web-app`.             |
|  WithEnv         | String        | The Datadog [environment][1] name, for example, `production`.         |
|  WithVersion     | String        | The version of your application.                                                                             |
|  WithTags        | List of strings        | A list of tags to apply to an uploaded profile. Tags must be of the format `<KEY>:<VALUE>`. |

Alternatively you can set profiler configuration using environment variables:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_ENV`                                         | String        | The [environment][1] name, for example, `production`. |
| `DD_SERVICE`                                     | String        | The [service][1] name, for example, `web-backend`. |
| `DD_VERSION`                                     | String        | The [version][1] of your service. |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.   |

### Showing C function calls in CPU profiles

By default, Go's CPU profiler only shows detailed information for Go code. If your program calls C code, the time spent running C code is reflected in the profile, but the call stacks only show Go function calls.

To add detailed C function call information to CPU profiles, you may opt to use library such as [ianlancetaylor/cgosymbolizer][2]. To use this library:

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

[1]: /getting_started/tagging/unified_service_tagging
[2]: https://pkg.go.dev/github.com/ianlancetaylor/cgosymbolizer#pkg-overview
