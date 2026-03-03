### Profiler

`DD_PROFILING_AGENTLESS`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables agentless profile upload, sending profiles directly to the profiling intake instead of through a local agent.

`DD_PROFILING_CODE_HOTSPOTS_COLLECTION_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `true`<br>
Controls whether spans add pprof labels used to link profiles to trace code hotspots (span id and local root span id). Defaults to true.

`DD_PROFILING_DEBUG_COMPRESSION_SETTINGS`
: **Since**: 2.3.0 <br>
**Default**: `zstd`<br>
Controls the compression algorithm and level used when preparing profiles for upload (for example, legacy, gzip, or zstd-<level>). Defaults to zstd.

`DD_PROFILING_DELTA`
: **Since**: 2.3.0 <br>
**Default**: `true`<br>
Controls whether delta profiles are enabled. When enabled, profile values are reported as changes since the previous profile instead of absolute values.

`DD_PROFILING_ENABLED`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: `true`<br>
**Configuration**: profiling **Default**: false Whether to enable profiling.

`DD_PROFILING_ENDPOINT_COLLECTION_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `true`<br>
Controls whether spans add a pprof label with the top-level request endpoint so profiles can be grouped by endpoint. Defaults to true.

`DD_PROFILING_ENDPOINT_COUNT_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables counting endpoint hits while the profiler is running and includes those counts with uploaded profiling data. Defaults to false.

`DD_PROFILING_EXECUTION_TRACE_ENABLED`
: **Since**: 2.3.0 <br>
**Default**: `true`<br>
Controls whether runtime execution traces are collected and uploaded. Defaults to enabled on amd64 and arm64.

`DD_PROFILING_EXECUTION_TRACE_LIMIT_BYTES`
: **Since**: 2.3.0 <br>
**Default**: `5242880`<br>
Sets the approximate maximum size, in bytes, of a collected execution trace. Defaults to 5MB.

`DD_PROFILING_EXECUTION_TRACE_PERIOD`
: **Since**: 2.3.0 <br>
**Default**: `15m`<br>
Sets the time between execution trace collections. Defaults to 15m.

`DD_PROFILING_FLUSH_ON_EXIT`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Controls whether the profiler attempts to finish uploading buffered profiles when the process is stopping. When disabled, pending uploads are cancelled on shutdown.

`DD_PROFILING_OUTPUT_DIR`
: **Since**: 2.3.0 <br>
**Default**: N/A<br>
Writes a copy of collected profiles to the specified directory for debugging. No cleanup is performed, so the directory can grow over time.

`DD_PROFILING_UPLOAD_TIMEOUT`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: `10s`<br>
Sets the timeout for profile upload HTTP requests. Defaults to 10s and must be greater than 0.

`DD_PROFILING_URL`
: **Since**: 2.3.0, 2.6.0 <br>
**Default**: `https://intake.profile.datadoghq.com/v1/input`<br>
Overrides the profiling intake URL used for agentless uploads. This is primarily intended for testing or debugging.

`DD_PROFILING_WAIT_PROFILE`
: **Since**: 2.3.0 <br>
**Default**: `false`<br>
Enables an experimental goroutine wait profile when set. This collects stack traces and wait durations for goroutines that remain blocked for more than a minute.

`DD_PROFILING_WAIT_PROFILE_MAX_GOROUTINES`
: **Since**: 2.3.0 <br>
**Default**: `1000`<br>
Sets the maximum number of goroutines allowed when collecting the goroutine wait profile. If the process exceeds this limit, the wait profile is skipped.
