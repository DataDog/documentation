<!--
Configuration for Ruby profiler.
-->

These settings apply to the latest profiler release.

You can configure the profiler using the following environment variables:

| Environment variable                          | Type    | Description                                                                                                                             |
| --------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_PROFILING_ENABLED`                        | Boolean | If set to `true`, enables the profiler. Defaults to `false`.                                                                            |
| `DD_PROFILING_ALLOCATION_ENABLED`             | Boolean | Set to `true` to enable allocation profiling. It requires the profiler to be enabled already. Defaults to `false`.                      |
| `DD_PROFILING_MAX_FRAMES`                     | Integer | Maximum backtrace (stack) depth gathered by the profiler. Stacks deeper than this value get truncated. Defaults to `400`.               |
| `DD_PROFILING_EXPERIMENTAL_HEAP_ENABLED`      | Boolean | Set to `true` to enable heap live objects profiling. It requires that allocation profiling is enabled as well. Defaults to `false`.     |
| `DD_PROFILING_EXPERIMENTAL_HEAP_SIZE_ENABLED` | Boolean | Set to `true` to enable heap live size profiling. It requires that heap live objects profiling is enabled as well. Defaults to the same value as `DD_PROFILING_EXPERIMENTAL_HEAP_ENABLED`. |
| `DD_PROFILING_NO_SIGNALS_WORKAROUND_ENABLED`  | Boolean | Automatically enabled when needed, can be used to force enable or disable this feature. See [Profiler Troubleshooting][1] for details. |
| `DD_PROFILING_PREVIEW_OTEL_CONTEXT_ENABLED`   | String  | Set to `only` when using profiling directly with `opentelemetry-sdk`, or `true` for auto-detection of the correct context to read from. Defaults to `false`. |
| `DD_ENV`                                      | String  | The [environment][2] name, for example: `production`.                                                                                  |
| `DD_SERVICE`                                  | String  | The [service][2] name, for example, `web-backend`.                                                                                     |
| `DD_VERSION`                                  | String  | The [version][2] of your service.                                                                                                      |
| `DD_TAGS`                                     | String  | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api, team:intake`.          |

Alternatively, you can set profiler parameters in code with these functions, inside a `Datadog.configure` block. Parameters provided in code take precedence over those provided as environment variables.

| Environment variable                                  | Type    | Description                                                                                                                             |
| ----------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `c.profiling.enabled`                                 | Boolean | If set to `true`, enables the profiler. Defaults to `false`.                                                                            |
| `c.profiling.allocation_enabled`                      | Boolean | Set to `true` to enable allocation profiling. It requires the profiler to be enabled already. Defaults to `false`.                      |
| `c.profiling.advanced.max_frames`                     | Integer | Maximum backtrace (stack) depth gathered by the profiler. Stacks deeper than this value get truncated. Defaults to `400`.               |
| `c.profiling.advanced.experimental_heap_enabled`      | Boolean | Set to `true` to enable heap live objects profiling. It requires that allocation profiling is enabled as well. Defaults to `false`.     |
| `c.profiling.advanced.experimental_heap_size_enabled` | Boolean | Set to `true` to enable heap live size profiling. It requires that heap live objects profiling is enabled as well. Defaults to the same value as `experimental_heap_size_enabled`. |
| `c.profiling.advanced.no_signals_workaround_enabled`  | Boolean | Automatically enabled when needed, can be used to force enable or disable this feature. See [Profiler Troubleshooting][1] for details. |
| `c.profiling.advanced.preview_otel_context_enabled`   | String  | Set to `only` when using profiling directly with `opentelemetry-sdk`, or `true` for auto-detection of the correct context to read from. Defaults to `false`. |
| `c.env`                                               | String  | The [environment][2] name, for example: `production`.                                                                                  |
| `c.service`                                           | String  | The [service][2] name, for example, `web-backend`.                                                                                     |
| `c.version`                                           | String  | The [version][2] of your service.                                                                                                      |
| `c.tags`                                              | Hash    | Tags to apply to an uploaded profile.                                                                                                   |

[1]: /profiler/profiler_troubleshooting/ruby/#unexpected-failures-or-errors-from-ruby-gems-that-use-native-extensions
[2]: /getting_started/tagging/unified_service_tagging
