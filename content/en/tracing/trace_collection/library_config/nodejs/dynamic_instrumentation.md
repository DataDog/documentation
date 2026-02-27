### Dynamic Instrumentation

`DD_DYNAMIC_INSTRUMENTATION_CAPTURE_TIMEOUT_MS`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `15`<br>
Timeout in milliseconds for capturing variable values during snapshot collection.

`DD_DYNAMIC_INSTRUMENTATION_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables Dynamic Instrumentation.

`DD_DYNAMIC_INSTRUMENTATION_PROBE_FILE`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `false`<br>
Path to a local probe definition JSON file. When set, the tracer loads probe definitions from this file at startup instead of subscribing to remote configuration.

`DD_DYNAMIC_INSTRUMENTATION_REDACTED_IDENTIFIERS`
: **Since**: 5.83.0 <br>
**Type**: `array`<br>
**Default**: `""`<br>
Comma-separated list of additional identifier keywords to redact in captured snapshot data

`DD_DYNAMIC_INSTRUMENTATION_REDACTION_EXCLUDED_IDENTIFIERS`
: **Since**: 5.83.0 <br>
**Type**: `array`<br>
**Default**: `[]`<br>
Comma-separated list of identifier keywords to exclude from the default redaction list. Useful to prevent common keywords like password from being treated as sensitive for your use case.

`DD_DYNAMIC_INSTRUMENTATION_UPLOAD_INTERVAL_SECONDS`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `1`<br>
Interval in seconds between uploads of probe data.
