### Profiler

`DD_PROFILING_AGENTLESS`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables agentless profile upload, sending profiles directly to the profiling intake instead of through a local agent.

`DD_PROFILING_ALLOCATION_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_PROFILING_DDPROF_ALLOC_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
If set to `true`, enables Allocation profiling (in Preview). Defaults to `false`.

`DD_PROFILING_APIKEY`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Deprecated: legacy profiling API key environment variable (`DD_PROFILING_APIKEY`). Used as a fallback to populate the Datadog API key when `DD_API_KEY` / `DD_API_KEY_FILE` are not set.

`DD_PROFILING_APIKEY_FILE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Deprecated: legacy profiling API key file path (`DD_PROFILING_APIKEY_FILE`). If set, the tracer reads the API key from this file as a fallback when `DD_API_KEY` / `DD_API_KEY_FILE` are not set.

`DD_PROFILING_API_KEY`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Deprecated: legacy profiling API key environment variable (`DD_PROFILING_API_KEY`). Used as a fallback to populate the Datadog API key when `DD_API_KEY` / `DD_API_KEY_FILE` are not set.

`DD_PROFILING_API_KEY_FILE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Deprecated: legacy profiling API key file path (`DD_PROFILING_API_KEY_FILE`). If set, the tracer reads the API key from this file as a fallback when `DD_API_KEY` / `DD_API_KEY_FILE` are not set.

`DD_PROFILING_ASYNC_ALLOC_INTERVAL`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `262144`<br>
Datadog native profiler (legacy `async` key): allocation/memory sampling interval in bytes used for allocation and live-heap profiling (`memory=<interval>b`). This is a legacy alias of `DD_PROFILING_DDPROF_ALLOC_INTERVAL`. Default: 262144 (256KB).

`DD_PROFILING_ASYNC_CPU_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Datadog native profiler (legacy `async` key): enables/disables CPU profiling. This is a legacy alias of `DD_PROFILING_DDPROF_CPU_ENABLED`. Default: true.

`DD_PROFILING_ASYNC_CPU_INTERVAL_MS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `10`<br>
Datadog native profiler (legacy `async` key): CPU sampling interval in milliseconds (used as `cpu=<interval>m`). This is a legacy alias of `DD_PROFILING_DDPROF_CPU_INTERVAL_MS`. Default: 10ms.

`DD_PROFILING_ASYNC_CSTACK`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `vm`<br>
Datadog native profiler (legacy `async` key): configures how native stack traces are collected (for example `vm`, `dwarf`, `fp`, `no`), passed as `cstack=<mode>`. On non-HotSpot VMs, `vm*` modes fall back to `dwarf`. This is a legacy alias of `DD_PROFILING_DDPROF_CSTACK`. Default: `vm`.

`DD_PROFILING_ASYNC_DEBUG_LIB`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Datadog native profiler (legacy `async` key): path to the Datadog profiler native library debug build. This is a legacy alias of `DD_PROFILING_DDPROF_DEBUG_LIB`.

`DD_PROFILING_ASYNC_LINENUMBERS`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Datadog native profiler (legacy `async` key): controls whether line numbers are included in stack traces. When disabled, the profiler omits line numbers (`linenumbers=f`). This is a legacy alias of `DD_PROFILING_DDPROF_LINENUMBERS`. Default: true.

`DD_PROFILING_ASYNC_LIVEHEAP_CAPACITY`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `1024`<br>
Datadog native profiler (legacy `async` key): live-heap (memory leak) tracking capacity (maximum number of entries tracked), clamped to an upper bound (8192). This is a legacy alias of `DD_PROFILING_DDPROF_LIVEHEAP_CAPACITY`. Default: 1024.

`DD_PROFILING_ASYNC_LIVEHEAP_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Datadog native profiler (legacy `async` key): enables live-heap (memory leak) profiling. This is a legacy alias of `DD_PROFILING_DDPROF_LIVEHEAP_ENABLED`. Default: false.

`DD_PROFILING_ASYNC_LIVEHEAP_INTERVAL`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `1048576`<br>
Datadog native profiler (legacy `async` key): live-heap (memory leak) profiling interval parameter. This is a legacy alias of `DD_PROFILING_DDPROF_LIVEHEAP_INTERVAL` and controls the underlying live-heap/memleak tracking interval used by the native profiler. Default is computed from max heap size and live-heap capacity (roughly `maxHeap / capacity`; falls back to 1048576 when max heap is unknown).

`DD_PROFILING_ASYNC_LIVEHEAP_SAMPLE_PERCENT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `50`<br>
Datadog native profiler (legacy `async` key): live-heap (memory leak) profiling sample percentage. This is a legacy alias of `DD_PROFILING_DDPROF_LIVEHEAP_SAMPLE_PERCENT` and is used to compute the sampling fraction passed to the profiler (`<percent>/100`). Default: 50.

`DD_PROFILING_ASYNC_LOGLEVEL`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `NONE`<br>
Datadog native profiler (legacy `async` key): profiler log level (passed as `loglevel=<value>` to the native profiler). This is a legacy alias of `DD_PROFILING_DDPROF_LOGLEVEL`. Default: `NONE`.

`DD_PROFILING_ASYNC_SAFEMODE`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `20`<br>
Datadog native profiler (legacy `async` key): native profiler safemode bitmask. This is a legacy alias of `DD_PROFILING_DDPROF_SAFEMODE`; overriding it is not recommended and may cause instability/crashes. Passed as `safemode=<value>` to the profiler. Default: 20.

`DD_PROFILING_ASYNC_WALL_COLLAPSING`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Datadog native profiler (legacy `async` key): wall-clock collapsing toggle. This is a legacy alias of `DD_PROFILING_DDPROF_WALL_COLLAPSING`. When enabled, the wall-clock profiler command uses `wall=~<interval>m` (collapsed wall-time stacks). Default: true.

`DD_PROFILING_ASYNC_WALL_CONTEXT_FILTER`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Datadog native profiler (legacy `async` key): wall-clock context-filter toggle. This is a legacy alias of `DD_PROFILING_DDPROF_WALL_CONTEXT_FILTER`. When enabled, wall-clock sampling is restricted to threads with attached tracing context (passed as `filter=0`); when disabled, sampling is not context-filtered (`filter=`). If tracing is disabled, the tracer forces this off to avoid zero samples. Default: true (but disabled when tracing is off).

`DD_PROFILING_ASYNC_WALL_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Datadog native profiler (legacy `async` key): enables wall-clock profiling mode. This is a legacy alias of `DD_PROFILING_DDPROF_WALL_ENABLED`. When enabled, the profiler command includes a `wall=` configuration. Default is true unless disabled by ultra-minimal mode, tracing disabled, or on IBM J9.

`DD_PROFILING_ASYNC_WALL_INTERVAL_MS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `50`<br>
Datadog native profiler (legacy `async` key): wall-clock sampling interval in milliseconds (used as `wall=<interval>m`). This is a legacy alias of `DD_PROFILING_DDPROF_WALL_INTERVAL_MS`. Default: 50ms.

`DD_PROFILING_AUXILIARY`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `none`<br>
Profiling: selects which auxiliary profiler implementation to use (for example `ddprof`, `async`, or `none`). Defaults to `ddprof` when the Datadog native profiler is enabled, otherwise `none`.

`DD_PROFILING_BACKPRESSURE_SAMPLING_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Profiling (JFR): enables backpressure profiling/sampling. When enabled, the tracer starts `BackpressureProfiling` and may emit `datadog.BackpressureSample` events when instrumented code observes backpressure/rejections. Default: false.

`DD_PROFILING_CONTEXT_ATTRIBUTES`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Datadog native profiler (ddprof): set of context attribute names to attach to profiling samples (passed as `attributes=a;b;c` to the profiler). This list is combined with optional span-name/resource-name attributes depending on their toggles.

`DD_PROFILING_CONTEXT_ATTRIBUTES_RESOURCE_NAME_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Datadog native profiler (ddprof): when enabled, includes the span resource name as an additional context attribute in profiling samples (adds `RESOURCE` to the ddprof `attributes=` list). Default: false.

`DD_PROFILING_CONTEXT_ATTRIBUTES_SPAN_NAME_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Datadog native profiler (ddprof): when enabled, includes the span operation name as an additional context attribute in profiling samples (adds `OPERATION` to the ddprof `attributes=` list). Default: true.

`DD_PROFILING_DDPROF_ALLOC_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Datadog native profiler (ddprof): enables allocation profiling (JVMTI allocation sampler). This is an alias of `DD_PROFILING_ALLOCATION_ENABLED` and may be considered unstable on some JVM versions (will warn if enabled when not considered safe).

`DD_PROFILING_DDPROF_ALLOC_INTERVAL`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `262144`<br>
Datadog native profiler (ddprof): allocation/memory sampling interval in bytes used for allocation and live-heap profiling (`memory=<interval>b`). Default: 262144 (256KB).

`DD_PROFILING_DDPROF_CPU_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Datadog native profiler (ddprof): enables CPU profiling mode. When enabled, the profiler command includes either `cpu=<interval>m` or a hardware event (`event=...`). Default: true.

`DD_PROFILING_DDPROF_CPU_INTERVAL_MS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `10`<br>
Datadog native profiler (ddprof): CPU sampling interval in milliseconds (used as `cpu=<interval>m` when not using a custom scheduling event). Default: 10ms (50ms on J9 when using the default).

`DD_PROFILING_DDPROF_CSTACK`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `vm`<br>
Datadog native profiler (ddprof): configures how native stack traces are collected (for example `vm`, `dwarf`, `fp`, `no`), passed as `cstack=<mode>`. On non-HotSpot VMs, `vm*` modes fall back to `dwarf`. Default: `vm`.

`DD_PROFILING_DDPROF_DEBUG_LIB`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Datadog native profiler (ddprof): path to a debug build of the native profiler library. If set, the loader passes this path to `JavaProfiler.getInstance(...)` instead of using the bundled library extraction.

`DD_PROFILING_DDPROF_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Profiling: enables the Datadog native profiler (ddprof) implementation. When enabled (and supported by OS/JVM), the profiling system instantiates `DatadogProfilerController` and enables ddprof-based context labeling; when disabled, profiling falls back to JFR-based profilers only. Default depends on environment safety checks.

`DD_PROFILING_DDPROF_LINENUMBERS`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Datadog native profiler (ddprof): controls whether line numbers are included in stack traces. When disabled, the profiler omits line numbers (`linenumbers=f`). Default: true.

`DD_PROFILING_DDPROF_LIVEHEAP_CAPACITY`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_PROFILING_DDPROF_MEMLEAK_CAPACITY`<br>
**Type**: `int`<br>
**Default**: `1024`<br>
Datadog native profiler (ddprof): live-heap (memory leak) tracking capacity (maximum number of entries tracked), clamped to an upper bound (8192). Default: 1024. Deprecated alias: `DD_PROFILING_DDPROF_MEMLEAK_CAPACITY`.

`DD_PROFILING_DDPROF_LIVEHEAP_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_PROFILING_DDPROF_MEMLEAK_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Datadog native profiler (ddprof): enables live-heap (memory leak) profiling mode. Default: false. Deprecated alias: `DD_PROFILING_DDPROF_MEMLEAK_ENABLED`.

`DD_PROFILING_DDPROF_LIVEHEAP_INTERVAL`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_PROFILING_DDPROF_MEMLEAK_INTERVAL`<br>
**Type**: `string`<br>
**Default**: N/A<br>
Datadog native profiler (ddprof): live-heap (memory leak) profiling interval parameter. Default is computed from max heap size and live-heap capacity (roughly `maxHeap / capacity`; falls back to 1048576 when max heap is unknown). Deprecated alias: `DD_PROFILING_DDPROF_MEMLEAK_INTERVAL`.

`DD_PROFILING_DDPROF_LIVEHEAP_SAMPLE_PERCENT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `50`<br>
Datadog native profiler (ddprof): live-heap (memory leak) profiling sample percentage, used to compute the sampling fraction passed to the profiler (`<percent>/100`). Default: 50.

`DD_PROFILING_DDPROF_LIVEHEAP_TRACK_SIZE_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Datadog native profiler (ddprof): when enabled, live-heap profiling also tracks heap size (uses `L` mode vs `l` mode in the profiler `memory=` configuration). Default: true.

`DD_PROFILING_DDPROF_LOGLEVEL`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `NONE`<br>
Datadog native profiler (ddprof): profiler log level, passed as `loglevel=<value>` to the native profiler. Default: `NONE`.

`DD_PROFILING_DDPROF_MEMLEAK_CAPACITY`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Deprecated alias for `DD_PROFILING_DDPROF_LIVEHEAP_CAPACITY` (live-heap/memory leak tracking capacity).

`DD_PROFILING_DDPROF_MEMLEAK_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Deprecated alias for `DD_PROFILING_DDPROF_LIVEHEAP_ENABLED` (enables live-heap/memory leak profiling mode).

`DD_PROFILING_DDPROF_MEMLEAK_INTERVAL`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Deprecated alias for `DD_PROFILING_DDPROF_LIVEHEAP_INTERVAL` (live-heap/memory leak profiling interval parameter).

`DD_PROFILING_DDPROF_SAFEMODE`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `20`<br>
Datadog native profiler (ddprof): native profiler safemode bitmask; overriding it is not recommended and may cause instability/crashes. Passed as `safemode=<value>` to the profiler. Default: 20.

`DD_PROFILING_DDPROF_SCRATCH`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Datadog native profiler (ddprof): scratch directory used to extract and load native profiler components. If unset, defaults to `<profiling.tempdir>/scratch` (TempLocationManager temp dir + `/scratch`).

`DD_PROFILING_DDPROF_STACKDEPTH`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Profiling: maximum stack depth for profiling stack traces (used by ddprof as `jstackdepth=<depth>`). This is an alias for `DD_PROFILING_STACKDEPTH`. Default: 512.

`DD_PROFILING_DDPROF_WALL_COLLAPSING`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Datadog native profiler (ddprof): wall-clock collapsing toggle. When enabled, the wall-clock profiler command uses `wall=~<interval>m` (collapsed wall-time stacks). Default: true.

`DD_PROFILING_DDPROF_WALL_CONTEXT_FILTER`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Datadog native profiler (ddprof): wall-clock context-filter toggle. When enabled, wall-clock sampling is restricted to threads with attached tracing context (passed as `filter=0`); when disabled, sampling is not context-filtered (`filter=`). If tracing is disabled, the tracer forces this off to avoid zero samples. Default: true (but disabled when tracing is off).

`DD_PROFILING_DDPROF_WALL_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Datadog native profiler (ddprof): enables wall-clock profiling mode. When enabled, the profiler command includes a `wall=` configuration. Default is true unless disabled by ultra-minimal mode, tracing disabled, or on IBM J9.

`DD_PROFILING_DDPROF_WALL_INTERVAL_MS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `50`<br>
Datadog native profiler (ddprof): wall-clock sampling interval in milliseconds (used as `wall=<interval>m`). Default: 50ms.

`DD_PROFILING_DEBUG_DUMP_PATH`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Profiling debug: directory path where the profiler dumps recorded data to disk for debugging (writes `.jfr` files like `dd-profiler-debug-*.jfr`). If the directory does not exist it will be created; if unset or invalid, dumping is disabled.

`DD_PROFILING_DEBUG_JFR_DISABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Profiling debug: disables JFR-based profiling controllers, even when JFR is available. When set, the profiling system will not use OpenJDK/Oracle JFR controllers and will only use ddprof if enabled/supported.

`DD_PROFILING_DEBUG_UPLOAD_COMPRESSION`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_PROFILING_UPLOAD_COMPRESSION`<br>
**Type**: `string`<br>
**Default**: `zstd`<br>
Profiling upload: compression type for profile uploads. Supported values: `on` (equivalent to `zstd`), `off`, `lz4`, `gzip`, `zstd`. Default: `zstd`.

`DD_PROFILING_DETAILED_DEBUG_LOGGING`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Datadog native profiler (ddprof): when enabled, emits extra debug logs with stack traces when setting/clearing the profiling trace context (helps debug context propagation/correlation). Default: false.

`DD_PROFILING_DIRECTALLOCATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Profiling (JFR): enables direct allocation profiling, emitting JFR events for direct byte buffer allocations and memory mappings (for example `ByteBuffer.allocateDirect`, `DirectByteBuffer` allocations, and `FileChannel.map`). Requires Java 11+ and JFR. Default: false.

`DD_PROFILING_DIRECT_ALLOCATION_SAMPLE_LIMIT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `2000`<br>
Profiling (JFR): sampling budget for direct allocation profiling events per profiling upload period (recording). Used to compute a per-window sample rate; in addition, the first time a caller/source pair is seen it is recorded even if not sampled. Default: 2000.

`DD_PROFILING_DISABLED_EVENTS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Profiling (JFR): comma-separated list of JFR event names to force-disable (for example `jdk.FileWrite,jdk.ExecutionSample`). Each entry is applied as `<event>#enabled=false` in the JFR recording settings after applying the template/override file. Default: unset.

`DD_PROFILING_ENABLED`
: **Since**: 1.57.0 <br>
**Type**: `string`<br>
**Default**: `false`<br>
If set to `true`, enables the profiler. Defaults to `false`.

`DD_PROFILING_ENABLED_EVENTS`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Profiling (JFR): comma-separated list of JFR event names to force-enable. Each entry is applied as `<event>#enabled=true` in the JFR recording settings after applying the template/override file. Default: unset.

`DD_PROFILING_ENDPOINT_COLLECTION_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_PROFILING_EXPERIMENTAL_ENDPOINT_COLLECTION_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether spans add a pprof label with the top-level request endpoint so profiles can be grouped by endpoint. Defaults to true.

`DD_PROFILING_EXCEPTION_HISTOGRAM_MAX_COLLECTION_SIZE`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `10000`<br>
Profiling (JFR exception profiling): maximum number of distinct exception types tracked in the exception histogram between emits. When the limit is reached, new types are recorded under a clipped placeholder type (`TOO-MANY-EXCEPTIONS`). Default: 10000.

`DD_PROFILING_EXCEPTION_HISTOGRAM_TOP_ITEMS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `50`<br>
Profiling (JFR exception profiling): maximum number of exception types emitted per histogram interval (top-N by count). Set to 0 for unlimited. Default: 50.

`DD_PROFILING_EXCEPTION_RECORD_MESSAGE`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Profiling (JFR exception profiling): when enabled, records the exception message (`Throwable.getMessage()`) on exception sample events; when disabled, the message field is omitted. Default: true.

`DD_PROFILING_EXCEPTION_SAMPLE_LIMIT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `10000`<br>
Profiling (JFR exception profiling): sampling budget for exception sample events per profiling upload period (recording). First occurrences of an exception type are always recorded; additional events are rate-limited using this budget. Default: 10000.

`DD_PROFILING_EXCLUDE_AGENT_THREADS`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Profiling (JFR exception profiling): when enabled, excludes internal tracer threads from exception profiling (skips creating exception sample events on threads in the agent thread group). Default: true.

`DD_PROFILING_EXPERIMENTAL_ASYNC_SCHEDULING_EVENT`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Datadog native profiler (legacy alias): alias of `DD_PROFILING_EXPERIMENTAL_DDPROF_SCHEDULING_EVENT`. Sets a hardware scheduling event name (for example `L1-dcache-load-misses`) for CPU profiling instead of CPU-time sampling. Used as a fallback when the ddprof key is not set.

`DD_PROFILING_EXPERIMENTAL_ASYNC_SCHEDULING_EVENT_INTERVAL`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `-1`<br>
Datadog native profiler (legacy alias): alias of `DD_PROFILING_EXPERIMENTAL_DDPROF_SCHEDULING_EVENT_INTERVAL`. When using a custom scheduling event, sets the event sampling interval (passed as `interval=<n>`). Used as a fallback when the ddprof key is not set.

`DD_PROFILING_EXPERIMENTAL_ASYNC_WALL_JVMTI`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Datadog native profiler (legacy alias): alias of `DD_PROFILING_EXPERIMENTAL_DDPROF_WALL_JVMTI`. When enabled, uses the JVMTI-based wall-clock sampler (adds `wallsampler=jvmti` to the profiler configuration). Used as a fallback when the ddprof key is not set. Default: false.

`DD_PROFILING_EXPERIMENTAL_DDPROF_SCHEDULING_EVENT`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Datadog native profiler (ddprof): hardware scheduling event name for CPU profiling (for example `L1-dcache-load-misses`). When set, ddprof uses `event=<name>` (and optional `interval=<n>`) instead of CPU-time sampling (`cpu=<interval>m`). Default: unset.

`DD_PROFILING_EXPERIMENTAL_DDPROF_SCHEDULING_EVENT_INTERVAL`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Datadog native profiler (ddprof): when using a custom scheduling event (`DD_PROFILING_EXPERIMENTAL_DDPROF_SCHEDULING_EVENT`), sets the event sampling interval (passed as `interval=<n>`). Values <= 0 are ignored. Default: unset.

`DD_PROFILING_EXPERIMENTAL_DDPROF_WALL_JVMTI`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Datadog native profiler (ddprof): when enabled, uses the JVMTI-based wall-clock sampler (adds `wallsampler=jvmti` to the profiler `wall=` configuration). Experimental. Default: false.

`DD_PROFILING_EXPERIMENTAL_PROCESS_CONTEXT_ENABLED`
: **Since**: 1.56.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Whether or not to register process context for OTel provider.

`DD_PROFILING_HEAP_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
If set to `true`, enables Live Heap profiling (in Preview). Defaults to `false`.

`DD_PROFILING_HEAP_HISTOGRAM_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
To enable the heap histogram metrics, start your application with the `-Ddd.profiling.heap.histogram.enabled=true` JVM setting or the `DD_PROFILING_HEAP_HISTOGRAM_ENABLED=true` environment variable.

`DD_PROFILING_HEAP_HISTOGRAM_MODE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `aftergc`<br>
Profiling (JFR heap histogram): selects how heap histogram events are collected when heap histogram is enabled. `periodic` enables `jdk.ObjectCount`; otherwise (default `aftergc`) enables `jdk.ObjectCountAfterGC`.

`DD_PROFILING_HEAP_TRACK_GENERATIONS`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Datadog native profiler (ddprof): when enabled, includes generation tracking in heap profiling configuration (passed as `generations=true` to the profiler). Default: false.

`DD_PROFILING_HOTSPOTS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Profiling: enables the "hotspots" feature flag. In this codebase it is currently read and reported in profiler settings, but no runtime behavior change was found beyond recording the setting. Default: false.

`DD_PROFILING_JFR_REPOSITORY_BASE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `/dd/jfr`<br>
Deprecated: legacy JFR repository base directory setting. If set to a non-default value it only triggers a warning and is otherwise ignored; use `DD_PROFILING_TEMP_DIR` (`profiling.tempdir`) instead. JFR repository is created under the per-process temp directory as `<tempdir>/jfr`.

`DD_PROFILING_JFR_REPOSITORY_MAXSIZE`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `67108864`<br>
Profiling (JFR): maximum size (in bytes) of the JFR repository used for recordings. Default: 67108864 (64MB).

`DD_PROFILING_JFR_TEMPLATE_OVERRIDE_FILE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Profiling (JFR): path to a `.jfp` template override file whose settings are applied to the JFR recording configuration (merged on top of the base template). If unset, no override file is applied.

`DD_PROFILING_PROXY_HOST`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Profiling upload: proxy host to use for profile upload HTTP requests (used by the profiling uploader's HTTP client). If unset, no proxy is used.

`DD_PROFILING_PROXY_PASSWORD`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Profiling upload: proxy password for proxy authentication (used together with `DD_PROFILING_PROXY_USERNAME`).

`DD_PROFILING_PROXY_PORT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `8080`<br>
Profiling upload: proxy port to use for profile upload HTTP requests. Default: 8080.

`DD_PROFILING_PROXY_USERNAME`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Profiling upload: proxy username for proxy authentication.

`DD_PROFILING_QUEUEING_TIME_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Profiling: enables queue time tracking/profiling (records queueing delays via profiling integrations such as JFR events and/or ddprof queue time events, depending on the active profiler). Default: true.

`DD_PROFILING_QUEUEING_TIME_THRESHOLD_MILLIS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `50`<br>
Profiling: minimum queue time (in milliseconds) required before recording a queue time event. Default: 50ms.

`DD_PROFILING_SMAP_AGGREGATION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Profiling (JFR): enables aggregated smaps collection (emits `datadog.AggregatedSmapEntry` periodic events). Default: false.

`DD_PROFILING_SMAP_COLLECTION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Profiling (JFR): enables smaps collection (emits `datadog.SmapEntry` periodic events). Default: false.

`DD_PROFILING_STACKDEPTH`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_PROFILING_DDPROF_STACKDEPTH`<br>
**Type**: `boolean`<br>
**Default**: `512`<br>
Profiling: maximum stack depth for collected stack traces. Used for JFR stack depth configuration and as the base setting that ddprof can alias (`DD_PROFILING_DDPROF_STACKDEPTH`). Default: 512.

`DD_PROFILING_START_DELAY`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `10`<br>
Profiling: delay (in seconds) before starting profiling after the tracer starts. Default: 10s.

`DD_PROFILING_START_FORCE_FIRST`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Profiling: when enabled, attempts to start profiling immediately at JVM startup (premain) instead of waiting for the normal start time. Default: false.

`DD_PROFILING_TAGS`
: **Since**: 1.54.0 <br>
**Type**: `map`<br>
**Default**: N/A<br>
Profiling: user-provided tags to attach to uploaded profiles (merged with global and runtime tags) as key/value pairs. These tags are included in the payload sent by the profiling uploader.

`DD_PROFILING_TEMPDIR`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `System.getProperty("java.io.tmpdir")`<br>
Profiling: base directory used for profiling temporary files (per-process temp dirs, JFR repository, ddprof scratch/recordings). Must exist. Default: `java.io.tmpdir`.

`DD_PROFILING_TIMELINE_EVENTS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Profiling: enables timeline events-based profiling context labeling using JFR (`JFREventContextIntegration`). If disabled, the tracer does not use JFR timeline events for profiling context integration. Default: true.

`DD_PROFILING_ULTRA_MINIMAL`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Profiling: ultra-minimal mode that disables profiling-related instrumentations and changes the default JFR template selection (uses the safer `SAFEPOINTS_JFP` template). Default: false.

`DD_PROFILING_UPLOAD_COMPRESSION`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Deprecated: profile upload compression setting (fallback for `DD_PROFILING_DEBUG_UPLOAD_COMPRESSION`). Supported values include `on`, `off`, `lz4`, `gzip`, `zstd` (`on` `zstd`).

`DD_PROFILING_UPLOAD_PERIOD`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `60`<br>
Profiling: upload period in seconds (recording duration); controls how frequently profiles are uploaded and is used to derive per-recording sampling budgets. Default: 60s.

`DD_PROFILING_UPLOAD_SUMMARY_ON_413`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Profiling upload: when enabled and an upload fails with HTTP 413 (payload too large), dumps a summary of the profile to logs to help troubleshoot. Default: false.

`DD_PROFILING_UPLOAD_TIMEOUT`
: **Since**: 1.57.0 <br>
**Type**: `int`<br>
**Default**: `30`<br>
Profiling upload: HTTP request timeout in seconds for profile uploads (used by the profiling uploader HTTP client). Default: 30s.

`DD_PROFILING_URL`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Profiling: explicit profiling intake URL. If set, the tracer uses this URL regardless of agentless/agent-based profiling settings; otherwise it targets the agentless intake (`https://intake.profile.<site>/api/v2/profile`) when agentless, or the Datadog Agent endpoint (`<agentUrl>/profiling/v1/input`) when not agentless.
