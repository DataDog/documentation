### Dynamic Instrumentation

`DD_DYNAMIC_INSTRUMENTATION_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables Dynamic Instrumentation.

`DD_DYNAMIC_INSTRUMENTATION_PROBE_FILE`
: **Type**: `string`<br>
**Default**: `false`<br>
Path to a local probe definition JSON file. When set, the tracer loads probe definitions from this file at startup instead of subscribing to remote configuration.

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
