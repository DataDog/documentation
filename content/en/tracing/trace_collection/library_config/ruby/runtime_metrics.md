### Runtime Metrics

`DD_RUNTIME_METRICS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables the collection of runtime metrics (such as garbage collection stats, memory usage, and thread counts) for the application.

`DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED`
: **Aliases**: `DD_TRACE_EXPERIMENTAL_RUNTIME_ID_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
When enabled, adds a runtime-id tag to runtime metrics to distinguish individual processes.
