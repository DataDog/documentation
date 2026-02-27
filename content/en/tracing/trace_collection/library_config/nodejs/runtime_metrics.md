### Runtime Metrics

`DD_RUNTIME_METRICS_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables the collection of runtime metrics (such as garbage collection stats, memory usage, and thread counts) for the application.

`DD_RUNTIME_METRICS_EVENT_LOOP_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables runtime metrics event loop behavior in the tracer. When disabled, related data collection and processing are skipped.

`DD_RUNTIME_METRICS_FLUSH_INTERVAL`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `10000`<br>
Sets how often runtime metrics are flushed, affecting metric freshness and reporting overhead.

`DD_RUNTIME_METRICS_GC_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables runtime metrics gc behavior in the tracer. When disabled, related data collection and processing are skipped.

`DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_TRACE_EXPERIMENTAL_RUNTIME_ID_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
When enabled, adds a runtime-id tag to runtime metrics to distinguish individual processes.
