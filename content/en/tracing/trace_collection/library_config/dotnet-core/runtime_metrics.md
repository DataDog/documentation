### Runtime Metrics

`DD_RUNTIME_METRICS_DIAGNOSTICS_METRICS_API_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables the .NET runtime metrics collector which uses the System.Diagnostics.Metrics API instead of the EventListener based API

`DD_RUNTIME_METRICS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables the collection of runtime metrics (such as garbage collection stats, memory usage, and thread counts) for the application.
