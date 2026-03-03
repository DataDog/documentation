### Application Security

`DD_API_SECURITY_ENABLED`
: **Aliases**: `DD_EXPERIMENTAL_API_SECURITY_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether API Security features are enabled. If unset, API Security is enabled by default.

`DD_API_SECURITY_ENDPOINT_COLLECTION_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether API endpoint definitions are collected for API catalog features. If unset, endpoint collection is enabled by default.

`DD_API_SECURITY_ENDPOINT_COLLECTION_MESSAGE_LIMIT`
: **Type**: `int`<br>
**Default**: `300`<br>
Sets the maximum number of API endpoints included in a single endpoint-collection telemetry message. If unset, a default limit is used.

`DD_API_SECURITY_PARSE_RESPONSE_BODY`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables the parsing of the response body in the API Security module. Defaults to true

`DD_API_SECURITY_SAMPLE_DELAY`
: **Type**: `decimal`<br>
**Default**: `30`<br>
Sets the delay (in seconds) between API Security schema samples. This setting is intended for system testing and is not meant for general use.

`DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING`
: **Type**: `string`<br>
**Default**: `identification`<br>
Deprecate. Automatic tracking of user events mode. Values can be disabled, safe or extended. This config is in the process of being deprecated. Please use DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE instead. Values will be automatically translated: disabled = disabled safe = anon extended = ident

`DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE`
: **Type**: `string`<br>
**Default**: `identification`<br>
Selects the AppSec automatic user instrumentation mode, which controls how user events are collected.

`DD_APPSEC_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables the AppSec product inside the tracer. When enabled the tracer initializes the AppSec module (in-app WAF, header/body collection and AppSec telemetry)

`DD_APPSEC_EXTRA_HEADERS`
: **Type**: `string`<br>
**Default**: N/A<br>
Comma separated of additional header names (beyond the default allowlist) that the tracer should capture. This is useful when a service requires custom authentication or application-specific headers to be analysed. Extra headers should be configured with privacy considerations in mind and are typically kept only within the customer’s org; the tracer will obey redaction/obfuscation settings for header values

`DD_APPSEC_HTTP_BLOCKED_TEMPLATE_HTML`
: **Type**: `string`<br>
**Default**: N/A<br>
Path to a local HTML template file that will be returned when a request is blocked and the response should be HTML. If unset or invalid, the tracer uses the default blocking HTML template defined by the product RFC. The tracer decides HTML or JSON according to `Accept` header or the block action's parameters.

`DD_APPSEC_HTTP_BLOCKED_TEMPLATE_JSON`
: **Type**: `string`<br>
**Default**: N/A<br>
Path to a local JSON template file that will be returned when a request is blocked and the response should be JSON. If unset or invalid, the tracer uses the default blocking HTML template defined by the product RFC. The tracer decides HTML or JSON according to `Accept` header or the block action's parameters.

`DD_APPSEC_IPHEADER`
: **Type**: `string`<br>
**Default**: N/A<br>
Specify a single HTTP header to use for client IP resolution. When set, the tracer treats that header as the authoritative source of client IP and ignores the default set of candidate headers. This helps avoid ambiguity and IP spoofing issues when proxies or CDNs provide custom client IP headers; use with caution and follow deployment best practices.

`DD_APPSEC_KEEP_TRACES`
: **Type**: `boolean`<br>
**Default**: `true`<br>
When true, the tracer marks traces that contain AppSec events (WAF triggers, RASP/IAST findings, user events) so they are retained by the sampling and ingestion pipeline. This ensures events remain available for UI analysis and backend processing even when ordinary sampling would drop the trace. For internal testing only.

`DD_APPSEC_MAX_STACK_TRACES`
: **Aliases**: `DD_APPSEC_MAX_STACKTRACES`<br>
**Type**: `int`<br>
**Default**: `2`<br>
Limits how many separate stacktraces are captured and attached to an AppSec/IAST event to keep payload sizes reasonable. Evidence stacktraces are useful for triage, but unbounded capture can leak sensitive data and consume excessive bandwidth; this limit balances evidence value and safety. Set to 0 to collect all.

`DD_APPSEC_MAX_STACK_TRACE_DEPTH`
: **Aliases**: `DD_APPSEC_MAX_STACKTRACE_DEPTH`<br>
**Type**: `int`<br>
**Default**: `32`<br>
Sets the maximum number of stack frames retained for any captured stacktrace attached to AppSec events. Tracers should prioritise top-of-stack frames and truncate deeper frames when this limit is reached. The setting helps keep evidentiary stacktraces compact while preserving the most actionable frames

`DD_APPSEC_MAX_STACK_TRACE_DEPTH_TOP_PERCENT`
: **Type**: `int`<br>
**Default**: `75`<br>
When the tracer must trim a stacktrace, this value controls how much of the top portion of the stacktrace is preserved at higher fidelity (a percentage). This lets implementations keep more of the top frames (most actionable) while trimming the less usefully deep frames

`DD_APPSEC_OBFUSCATION_PARAMETER_KEY_REGEXP`
: **Type**: `string`<br>
**Default**: `(?i)(?:p(?:ass)?w(?:or)?d|pass(?:_?phrase)?|secret|(?:api_?|private_?|public_?)key)|token|consumer_?(?:id|key|secret)|sign(?:ed|ature)|bearer|authorization`<br>
A regular expression used by the AppSec obfuscator to identify parameter keys that must cause full redaction. When any `key_path` string matches this regexp the entire parameter is replaced by `<redacted by datadog>`. The default key regexp matches common secret/key names (password, token, authorization, jwt, etc.) an empty string disables the key regexp

`DD_APPSEC_OBFUSCATION_PARAMETER_VALUE_REGEXP`
: **Type**: `string`<br>
**Default**: `(?i)(?:p(?:ass)?w(?:or)?d|pass(?:[_-]?phrase)?|secret(?:[_-]?key)?|(?:(?:api|private|public|access)[_-]?)key(?:[_-]?id)?|(?:(?:auth|access|id|refresh)[_-]?)?token|consumer[_-]?(?:id|key|secret)|sign(?:ed|ature)?|auth(?:entication|orization)?|jsessionid|phpsessid|asp\\.net(?:[_-]|-)sessionid|sid|jwt)(?:\\s*=([^;&]+)|\"\\s*:\\s*(\"[^\"]+\"|\\d+))|bearer\\s+([a-z0-9\\._\\-]+)|token\\s*:\\s*([a-z0-9]{13})|gh[opsu]_([0-9a-zA-Z]{36})|ey[I-L][\\w=-]+\\.(ey[I-L][\\w=-]+(?:\\.[\\w.+\\/=-]+)?)|[\\-]{5}BEGIN[a-z\\s]+PRIVATE\\sKEY[\\-]{5}([^\\-]+)[\\-]{5}END[a-z\\s]+PRIVATE\\sKEY|ssh-rsa\\s*([a-z0-9\\/\\.+]{100,})`<br>
No description available.

`DD_APPSEC_RASP_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Turns on the tracer's RASP / Exploit Prevention capabilities. When enabled the tracer runs synchronous, pre-execution checks and may generate block actions or exploit signals. RASP may have separate activation and implementation details per language; enabling it usually activates extra synchronous instrumentation and additional evidence capture for detections

`DD_APPSEC_RULES`
: **Type**: `string`<br>
**Default**: N/A<br>
Override the default rules file provided. Must be a path to a valid JSON rules file

`DD_APPSEC_SCA_ENABLED`
: **Type**: `boolean`<br>
**Default**: N/A<br>
Enables the tracer's runtime Software Composition Analysis (Runtime SCA) capability, which reports runtime dependency/SBOM information and powers runtime vulnerability detection. Useful for testing and demonstrations as well as production runtime vulnerability workflows; SCA may have billing/usage implications and language compatibility constraints described in the SCA runbooks

`DD_APPSEC_STACK_TRACE_ENABLED`
: **Aliases**: `DD_APPSEC_STACKTRACE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables security-related stack traces generation when security events occur.

`DD_APPSEC_TRACE_RATE_LIMIT`
: **Type**: `int`<br>
**Default**: `100`<br>
Controls the maximum amount of AppSec traces, per second.

`DD_APPSEC_WAF_DEBUG`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Turns on internal debug/trace logging for the in-app WAF. This is intended for debugging and is very verbose — it can severely impact performance. Use together with `DD_APPSEC_WAF_TIMEOUT` when debugging and prefer narrow log filters on production systems

`DD_APPSEC_WAF_TIMEOUT`
: **Type**: `int`<br>
**Default**: `100000`<br>
Limits the WAF synchronous execution time (in microseconds).
