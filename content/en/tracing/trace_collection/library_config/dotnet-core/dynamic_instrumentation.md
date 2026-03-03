### Dynamic Instrumentation

`DD_DYNAMIC_INSTRUMENTATION_DIAGNOSTICS_INTERVAL`
: **Type**: `int`<br>
**Default**: `3600`<br>
Interval (seconds) at which probe diagnostic/status messages (received/installed/emitting/errors) may be re-emitted

`DD_DYNAMIC_INSTRUMENTATION_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables Dynamic Instrumentation.

`DD_DYNAMIC_INSTRUMENTATION_MAX_DEPTH_TO_SERIALIZE`
: **Type**: `int`<br>
**Default**: `3`<br>
Maximum object depth to serialize for probe snapshots

`DD_DYNAMIC_INSTRUMENTATION_MAX_TIME_TO_SERIALIZE`
: **Type**: `int`<br>
**Default**: `200`<br>
Maximum duration (in milliseconds) to run serialization for probe snapshots.

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
: **Type**: `string`<br>
**Default**: N/A<br>
Comma-separated list of identifier keywords to exclude from the default redaction list. Useful to prevent common keywords like password from being treated as sensitive for your use case.

`DD_DYNAMIC_INSTRUMENTATION_UPLOAD_BATCH_SIZE`
: **Type**: `int`<br>
**Default**: `100`<br>
Upload batch size (number of snapshots/diagnostic messages per request). Controls how many snapshots are serialized and sent per flush. Default: 100.

`DD_DYNAMIC_INSTRUMENTATION_UPLOAD_FLUSH_INTERVAL`
: **Type**: `int`<br>
**Default**: `0`<br>
Low-rate upload flush interval in milliseconds. 0 (default) enables an adaptive flush interval; any other value uses a fixed interval. Deprecated in favor of DD_DYNAMIC_INSTRUMENTATION_UPLOAD_INTERVAL_SECONDS.
