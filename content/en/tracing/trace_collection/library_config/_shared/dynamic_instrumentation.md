### Dynamic Instrumentation

`DD_DYNAMIC_INSTRUMENTATION_CAPTURE_TIMEOUT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `100`<br>
Timeout (milliseconds) used when capturing/freezing context for snapshots and serializing captured values

`DD_DYNAMIC_INSTRUMENTATION_CAPTURE_TIMEOUT_MS`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `15`<br>
Timeout in milliseconds for capturing variable values during snapshot collection.

`DD_DYNAMIC_INSTRUMENTATION_CLASSFILE_DUMP_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
When enabled, dumps original and instrumented `.class` files to disk during transformation (for debugging live instrumentation)

`DD_DYNAMIC_INSTRUMENTATION_DIAGNOSTICS_INTERVAL`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `3600`<br>
Interval (seconds) at which probe diagnostic/status messages (received/installed/emitting/errors) may be re-emitted

`DD_DYNAMIC_INSTRUMENTATION_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables Dynamic Instrumentation.

`DD_DYNAMIC_INSTRUMENTATION_EXCLUDE_FILES`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Comma-separated list of file paths containing exclude rules (class/package prefixes ending with `*`, fully-qualified classes, or `Class::method` entries)

`DD_DYNAMIC_INSTRUMENTATION_INCLUDE_FILES`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Comma-separated list of file paths containing include rules (same format as exclude files)

`DD_DYNAMIC_INSTRUMENTATION_INSTRUMENT_THE_WORLD`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Enables broad instrumentation mode. Valid values are method or line, which controls what probes are generated. When active, uploads/diagnostics are suppressed and include/exclude files are used to scope instrumentation.

`DD_DYNAMIC_INSTRUMENTATION_LOCALVAR_HOISTING_LEVEL`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `1`<br>
Local variable hoisting level used when instrumenting methods for captured context. 0 disables hoisting; higher levels hoist more locals to the top of the method.

`DD_DYNAMIC_INSTRUMENTATION_MAX_DEPTH_TO_SERIALIZE`
: **Type**: `int`<br>
**Default**: `3`<br>
Maximum object depth to serialize for probe snapshots

`DD_DYNAMIC_INSTRUMENTATION_MAX_PAYLOAD_SIZE`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `1024`<br>
Maximum size in bytes of a single configuration payload that can be handled per request.

`DD_DYNAMIC_INSTRUMENTATION_MAX_TIME_TO_SERIALIZE`
: **Type**: `int`<br>
**Default**: `200`<br>
Maximum duration (in milliseconds) to run serialization for probe snapshots.

`DD_DYNAMIC_INSTRUMENTATION_METRICS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables diagnostic metrics reporting for the debugger agent.

`DD_DYNAMIC_INSTRUMENTATION_POLL_INTERVAL`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `1`<br>
Poll interval (seconds) for configuration updates.

`DD_DYNAMIC_INSTRUMENTATION_PROBE_FILE`
: **Type**: `string`<br>
**Default**: `false`<br>
Path to a local probe definition JSON file. When set, the tracer loads probe definitions from this file at startup instead of subscribing to remote configuration.

`DD_DYNAMIC_INSTRUMENTATION_REDACTED_EXCLUDED_IDENTIFIERS`
: **Type**: `string`<br>
**Default**: N/A<br>
Set of identifiers that are excluded from redaction decisions.

`DD_DYNAMIC_INSTRUMENTATION_REDACTED_IDENTIFIERS`
: **Type**: `array`<br>
**Default**: `""`<br>
Comma-separated list of additional identifier keywords to redact in captured snapshot data

`DD_DYNAMIC_INSTRUMENTATION_REDACTED_TYPES`
: **Type**: `array`<br>
**Default**: `""`<br>
Comma-separated list of object types to redact from dynamic logs and snapshots. Supports * wildcards (e.g. Secret* matches SecretKey).

`DD_DYNAMIC_INSTRUMENTATION_REDACTION_EXCLUDED_IDENTIFIERS`
: **Since**: 2.28.0 <br>
**Type**: `array`<br>
**Default**: `[]`<br>
Comma-separated list of identifier keywords to exclude from the default redaction list. Useful to prevent common keywords like password from being treated as sensitive for your use case.

`DD_DYNAMIC_INSTRUMENTATION_SNAPSHOT_URL`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Overrides the debugger snapshot/log intake URL used by the tracer. When set, it replaces the default debugger diagnostics URL

`DD_DYNAMIC_INSTRUMENTATION_SOURCE_FILE_TRACKING_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables source-file tracking. When enabled (default), installs a transformer that maps source files to loaded classes so retransformation of all classes associated with a source file is possible.

`DD_DYNAMIC_INSTRUMENTATION_UPLOAD_BATCH_SIZE`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `100`<br>
Upload batch size (number of snapshots/diagnostic messages per request). Controls how many snapshots are serialized and sent per flush. Default: 100.

`DD_DYNAMIC_INSTRUMENTATION_UPLOAD_FLUSH_INTERVAL`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `0`<br>
Low-rate upload flush interval in milliseconds. 0 (default) enables an adaptive flush interval; any other value uses a fixed interval. Deprecated in favor of DD_DYNAMIC_INSTRUMENTATION_UPLOAD_INTERVAL_SECONDS.

`DD_DYNAMIC_INSTRUMENTATION_UPLOAD_INTERVAL_SECONDS`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `1`<br>
Interval in seconds between uploads of probe data.

`DD_DYNAMIC_INSTRUMENTATION_UPLOAD_TIMEOUT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `30`<br>
HTTP request timeout in seconds for uploads (snapshots/logs/diagnostics).

`DD_DYNAMIC_INSTRUMENTATION_VERIFY_BYTECODE`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
When enabled (default), verifies generated instrumented bytecode and throws if verification fails.
