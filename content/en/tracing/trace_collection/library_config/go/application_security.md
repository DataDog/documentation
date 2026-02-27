### Application Security

`DD_API_SECURITY_DOWNSTREAM_REQUEST_BODY_ANALYSIS_SAMPLE_RATE`
: **Since**: 2.4.0 <br>
**Aliases**: `DD_API_SECURITY_DOWNSTREAM_REQUEST_ANALYSIS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `0.5`<br>
Defines the probability of a downstream request body being sampled, or said differently, defines the overall number of requests for which the request and response body should be sampled / analysed.

`DD_API_SECURITY_ENDPOINT_COLLECTION_ENABLED`
: **Since**: 2.6.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether API endpoint definitions are collected for API catalog features. If unset, endpoint collection is enabled by default.

`DD_API_SECURITY_ENDPOINT_COLLECTION_MESSAGE_LIMIT`
: **Since**: 2.6.0 <br>
**Type**: `int`<br>
**Default**: `300`<br>
Sets the maximum number of API endpoints included in a single endpoint-collection telemetry message. If unset, a default limit is used.

`DD_API_SECURITY_MAX_DOWNSTREAM_REQUEST_BODY_ANALYSIS`
: **Since**: 2.4.0 <br>
**Type**: `int`<br>
**Default**: `1`<br>
The maximum number of downstream requests per request for which the request and response body should be analysed.

`DD_APPSEC_BODY_PARSING_SIZE_LIMIT`
: **Since**: 2.6.0 <br>
**Type**: `int`<br>
**Default**: `10485760`<br>
Sets the maximum number of bytes of HTTP request and response bodies to buffer and analyze for security features when running behind a proxy/external processing integration. Values of 0 or less disable body analysis, and bodies larger than the limit are truncated.

`DD_APPSEC_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables the AppSec product inside the tracer. When enabled the tracer initializes the AppSec module (in-app WAF, header/body collection and AppSec telemetry)

`DD_APPSEC_HTTP_BLOCKED_TEMPLATE_HTML`
: **Since**: 2.3.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Path to a local HTML template file that will be returned when a request is blocked and the response should be HTML. If unset or invalid, the tracer uses the default blocking HTML template defined by the product RFC. The tracer decides HTML or JSON according to `Accept` header or the block action's parameters.

`DD_APPSEC_HTTP_BLOCKED_TEMPLATE_JSON`
: **Since**: 2.3.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Path to a local JSON template file that will be returned when a request is blocked and the response should be JSON. If unset or invalid, the tracer uses the default blocking HTML template defined by the product RFC. The tracer decides HTML or JSON according to `Accept` header or the block action's parameters.

`DD_APPSEC_MAX_STACK_TRACE_DEPTH`
: **Aliases**: `DD_APPSEC_MAX_STACKTRACE_DEPTH`<br>
**Type**: `int`<br>
**Default**: `32`<br>
Sets the maximum number of stack frames retained for any captured stacktrace attached to AppSec events. Tracers should prioritise top-of-stack frames and truncate deeper frames when this limit is reached. The setting helps keep evidentiary stacktraces compact while preserving the most actionable frames

`DD_APPSEC_OBFUSCATION_PARAMETER_KEY_REGEXP`
: **Since**: 2.6.0 <br>
**Type**: `string`<br>
**Default**: `(?i)pass|pw(?:or)?d|secret|(?:api|private|public|access)[_-]?key|token|consumer[_-]?(?:id|key|secret)|sign(?:ed|ature)|bearer|authorization|jsessionid|phpsessid|asp\.net[_-]sessionid|sid|jwt`<br>
A regular expression used by the AppSec obfuscator to identify parameter keys that must cause full redaction. When any `key_path` string matches this regexp the entire parameter is replaced by `<redacted by datadog>`. The default key regexp matches common secret/key names (password, token, authorization, jwt, etc.) an empty string disables the key regexp

`DD_APPSEC_OBFUSCATION_PARAMETER_VALUE_REGEXP`
: **Since**: 2.6.0 <br>
**Type**: `string`<br>
**Default**: `(?i)(?:p(?:ass)?w(?:or)?d|pass(?:[_-]?phrase)?|secret(?:[_-]?key)?|(?:(?:api|private|public|access)[_-]?)key(?:[_-]?id)?|(?:(?:auth|access|id|refresh)[_-]?)?token|consumer[_-]?(?:id|key|secret)|sign(?:ed|ature)?|auth(?:entication|orization)?|jsessionid|phpsessid|asp\\.net(?:[_-]|-)sessionid|sid|jwt)(?:\\s*=([^;&]+)|\"\\s*:\\s*(\"[^\"]+\"|\\d+))|bearer\\s+([a-z0-9\\._\\-]+)|token\\s*:\\s*([a-z0-9]{13})|gh[opsu]_([0-9a-zA-Z]{36})|ey[I-L][\\w=-]+\\.(ey[I-L][\\w=-]+(?:\\.[\\w.+\\/-=]+)?)|[\\-]{5}BEGIN[a-z\\s]+PRIVATE\\sKEY[\\-]{5}([^\\-]+)[\\-]{5}END[a-z\\s]+PRIVATE\\sKEY|ssh-rsa\\s*([a-z0-9\\/\\.+]{100,})`<br>
Regular expression used to find and redact sensitive substrings inside parameter values and highlights. Matches are replaced with `<redacted by datadog>`. This regexp complements the key regexp: the key regexp takes precedence; when no key match exists, the value regexp runs. The default pattern targeted at tokens, JWTs, private key blocks, and other credential shapes. Empty string disables the value regexp

`DD_APPSEC_RULES`
: **Since**: 2.3.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Override the default rules file provided. Must be a path to a valid JSON rules file

`DD_APPSEC_SCA_ENABLED`
: **Since**: 2.3.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables the tracer's runtime Software Composition Analysis (Runtime SCA) capability, which reports runtime dependency/SBOM information and powers runtime vulnerability detection. Useful for testing and demonstrations as well as production runtime vulnerability workflows; SCA may have billing/usage implications and language compatibility constraints described in the SCA runbooks

`DD_APPSEC_STACK_TRACE_ENABLE`
: **Type**: N/A<br>
**Default**: N/A<br>
No description available.

`DD_APPSEC_STACK_TRACE_ENABLED`
: **Since**: 2.6.0 <br>
**Aliases**: `DD_APPSEC_STACK_TRACE_ENABLE`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables security-related stack traces generation when security events occur.

`DD_APPSEC_WAF_TIMEOUT`
: **Since**: 2.6.0 <br>
**Type**: `string`<br>
**Default**: `2ms`<br>
Limits the WAF synchronous execution time (in microseconds).
