### Profiler

`DD_PROFILING_CODEHOTSPOTS_ENABLED`
: **Aliases**: `DD_PROFILING_EXPERIMENTAL_CODEHOTSPOTS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables code hotspots collection for the continuous profiler. When disabled, profiling data is not linked to tracing context for hotspot attribution.

`DD_PROFILING_ENABLED`
: **Type**: `string`<br>
**Default**: `false`<br>
If set to `true`, enables the profiler. Defaults to `false`.

`DD_PROFILING_ENDPOINT_COLLECTION_ENABLED`
: **Aliases**: `DD_PROFILING_EXPERIMENTAL_ENDPOINT_COLLECTION_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether spans add a pprof label with the top-level request endpoint so profiles can be grouped by endpoint. Defaults to true.

`DD_PROFILING_MANAGED_ACTIVATION_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Safety kill switch to be able to deactivate hotstandby mode for profiling in of a support case
