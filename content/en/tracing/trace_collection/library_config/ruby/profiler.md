### Profiler

`DD_PROFILING_ALLOCATION_ENABLED`
: **Aliases**: `DD_PROFILING_DDPROF_ALLOC_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
If set to `true`, enables Allocation profiling (in Preview). Defaults to `false`.

`DD_PROFILING_DIR_INTERRUPTION_WORKAROUND_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables a workaround for Ruby Dir interruption issues caused by profiling signals.

`DD_PROFILING_ENABLED`
: **Aliases**: `DD_EXPERIMENTAL_PROFILING_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enable the profiler by setting `-Ddd.profiling.enabled` flag or `DD_PROFILING_ENABLED` environment variable to `true`.

`DD_PROFILING_ENDPOINT_COLLECTION_ENABLED`
: **Aliases**: `DD_PROFILING_EXPERIMENTAL_ENDPOINT_COLLECTION_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether spans add a pprof label with the top-level request endpoint so profiles can be grouped by endpoint. Defaults to true.

`DD_PROFILING_EXPERIMENTAL_HEAP_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables preview heap profiling, collecting heap profiles (requires allocation profiling).

`DD_PROFILING_EXPERIMENTAL_HEAP_SAMPLE_RATE`
: **Type**: `int`<br>
**Default**: `1`<br>
Sampling rate for heap profiling.

`DD_PROFILING_EXPERIMENTAL_HEAP_SIZE_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables collection of heap size profiles for heap profiling (requires allocation profiling and heap profiling).

`DD_PROFILING_GC_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables garbage collection profiling, collecting GC activity in profiles.

`DD_PROFILING_GVL_ENABLED`
: **Aliases**: `DD_PROFILING_PREVIEW_GVL_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables GVL profiling to report time threads spend waiting for the Global VM Lock.

`DD_PROFILING_HEAP_CLEAN_AFTER_GC_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether heap profiling performs cleanup after garbage collection, rather than just at serialization time (requires GC profiling and heap profiling).

`DD_PROFILING_MAX_FRAMES`
: **Type**: `int`<br>
**Default**: `400`<br>
Maximum number of stack frames captured per thread sample in profiles.

`DD_PROFILING_NATIVE_FILENAMES_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether the profiler uses native filenames for stack frames from native code.

`DD_PROFILING_NO_SIGNALS_WORKAROUND_ENABLED`
: **Type**: `boolean`<br>
**Default**: N/A<br>
Enables a workaround mode that reduces reliance on profiling signals to avoid interrupt-related issues in some libraries.

`DD_PROFILING_OVERHEAD_TARGET_PERCENTAGE`
: **Type**: `decimal`<br>
**Default**: `2.0`<br>
Target overhead percentage for profiling; the profiler adjusts sampling to stay near this target.

`DD_PROFILING_PREVIEW_OTEL_CONTEXT_ENABLED`
: **Type**: `string`<br>
**Default**: `false`<br>
Controls whether the profiler attempts to read context from OpenTelemetry.

`DD_PROFILING_SHUTDOWN_ON_EXEC_ENABLED`
: **Since**: N/A <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Stops profiling before an exec call to avoid profiling state leaking into the new process.

`DD_PROFILING_SIGHANDLER_SAMPLING_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether the profiler samples directly from the signal handler for improved accuracy.

`DD_PROFILING_SKIP_MYSQL2_CHECK`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Disables the profiler compatibility check of the libmysqlclient version used by mysql2.

`DD_PROFILING_TIMELINE_ENABLED`
: **Aliases**: `DD_PROFILING_EXPERIMENTAL_TIMELINE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enable the timeline profile type. Added in version `0.89.0`. **Note**: This supersedes the `DD_PROFILING_EXPERIMENTAL_TIMELINE_ENABLED` environment variable (`datadog.profiling.experimental_timeline_enabled` INI setting), which was available since `0.89` (default `0`). If both are set, this one takes precedence.

`DD_PROFILING_UPLOAD_PERIOD`
: **Type**: `int`<br>
**Default**: `60`<br>
Profiling: upload period in seconds (recording duration); controls how frequently profiles are uploaded and is used to derive per-recording sampling budgets. Default: 60s.

`DD_PROFILING_UPLOAD_TIMEOUT`
: **Type**: `decimal`<br>
**Default**: `30.0`<br>
Controls timeout behavior for tracer operations when communicating with external components.
