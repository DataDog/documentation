### Runtime Metrics

`DD_RUNTIME_METRICS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
**Configuration**: `runtimeMetrics` Whether to enable capturing runtime metrics. Port `8125` (or configured with `DD_DOGSTATSD_PORT`) must be opened on the Agent for UDP.

`DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
**Description**: Enables enhanced runtime metrics, providing a `runtime_id` tag along with every metric. The `runtime_id` represents the application's process identifier and allows you to directly correlate runtime metrics with individual running applications.
