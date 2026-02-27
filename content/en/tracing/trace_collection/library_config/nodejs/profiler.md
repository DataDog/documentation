### Profiler

`DD_PROFILING_ASYNC_CONTEXT_FRAME_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables profiling async context frame behavior in the tracer. When disabled, related data collection and processing are skipped.

`DD_PROFILING_CODEHOTSPOTS_ENABLED`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_PROFILING_EXPERIMENTAL_CODEHOTSPOTS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables code hotspots collection for the continuous profiler. When disabled, profiling data is not linked to tracing context for hotspot attribution.

`DD_PROFILING_CPU_ENABLED`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_PROFILING_EXPERIMENTAL_CPU_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
If set to `false`, disables the CPU profiling. Defaults to `true`.

`DD_PROFILING_DEBUG_SOURCE_MAPS`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables profiling source-map debug diagnostics to troubleshoot source-map lookup and symbolization behavior.

`DD_PROFILING_DEBUG_UPLOAD_COMPRESSION`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_PROFILING_UPLOAD_COMPRESSION`<br>
**Type**: `string`<br>
**Default**: `zstd`<br>
Profiling upload: compression type for profile uploads. Supported values: `on` (equivalent to `zstd`), `off`, `lz4`, `gzip`, `zstd`. Default: `zstd`.

`DD_PROFILING_ENABLED`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_EXPERIMENTAL_PROFILING_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enable the profiler by setting `-Ddd.profiling.enabled` flag or `DD_PROFILING_ENABLED` environment variable to `true`.

`DD_PROFILING_ENDPOINT_COLLECTION_ENABLED`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_PROFILING_EXPERIMENTAL_ENDPOINT_COLLECTION_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether spans add a pprof label with the top-level request endpoint so profiles can be grouped by endpoint. Defaults to true.

`DD_PROFILING_EXPERIMENTAL_OOM_EXPORT_STRATEGIES`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `process`<br>
Sends a heap profile on OOM with async callback

`DD_PROFILING_EXPERIMENTAL_OOM_HEAP_LIMIT_EXTENSION_SIZE`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `0`<br>
Sends a heap profile on OOM with async callback

`DD_PROFILING_EXPERIMENTAL_OOM_MAX_HEAP_EXTENSION_COUNT`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `0`<br>
Sends a heap profile on OOM with async callback

`DD_PROFILING_EXPERIMENTAL_OOM_MONITORING_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Support OOM heap profiler configuration

`DD_PROFILING_EXPORTERS`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `agent`<br>
Code hotspots and endpoint tracing works

`DD_PROFILING_HEAP_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
If set to `true`, enables Live Heap profiling (in Preview). Defaults to `false`.

`DD_PROFILING_HEAP_SAMPLING_INTERVAL`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `524288`<br>
Sets the heap profiler sampling interval, affecting memory profiling granularity and runtime overhead.

`DD_PROFILING_PPROF_PREFIX`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Sets a filename prefix for generated pprof profile files to control profiler output naming.

`DD_PROFILING_PROFILERS`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `space,wall`<br>
Support profiler config with DD_PROFILING_PROFILERS

`DD_PROFILING_SOURCE_MAP`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Configures source-map resolution used by the profiler to map generated stack frames back to original source locations.

`DD_PROFILING_TIMELINE_ENABLED`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_PROFILING_EXPERIMENTAL_TIMELINE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enable the timeline profile type. Added in version `0.89.0`. **Note**: This supersedes the `DD_PROFILING_EXPERIMENTAL_TIMELINE_ENABLED` environment variable (`datadog.profiling.experimental_timeline_enabled` INI setting), which was available since `0.89` (default `0`). If both are set, this one takes precedence.

`DD_PROFILING_UPLOAD_PERIOD`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `60`<br>
Profiling: upload period in seconds (recording duration); controls how frequently profiles are uploaded and is used to derive per-recording sampling budgets. Default: 60s.

`DD_PROFILING_UPLOAD_TIMEOUT`
: **Since**: 5.83.0 <br>
**Type**: `decimal`<br>
**Default**: `30.0`<br>
Controls timeout behavior for tracer operations when communicating with external components.

`DD_PROFILING_V8_PROFILER_BUG_WORKAROUND`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Support profiler config with DD_PROFILING_PROFILERS

`DD_PROFILING_WALLTIME_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: N/A<br>
If set to `false`, disables the Wall time profiling. Defaults to `true`.
