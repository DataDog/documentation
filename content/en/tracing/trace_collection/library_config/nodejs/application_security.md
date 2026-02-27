### Application Security

`DD_API_SECURITY_DOWNSTREAM_BODY_ANALYSIS_SAMPLE_RATE`
: **Since**: 5.87.0 <br>
**Type**: `decimal`<br>
**Default**: `0.5`<br>
Defines the probability of a downstream request body being sampled, or said differently, defines the overall number of requests for which the request and response body should be sampled / analysed.
  

`DD_API_SECURITY_ENABLED`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_EXPERIMENTAL_API_SECURITY_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether API Security features are enabled. If unset, API Security is enabled by default.

`DD_API_SECURITY_ENDPOINT_COLLECTION_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether API endpoint definitions are collected for API catalog features. If unset, endpoint collection is enabled by default.

`DD_API_SECURITY_ENDPOINT_COLLECTION_MESSAGE_LIMIT`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `300`<br>
Sets the maximum number of API endpoints included in a single endpoint-collection telemetry message. If unset, a default limit is used.

`DD_API_SECURITY_MAX_DOWNSTREAM_REQUEST_BODY_ANALYSIS`
: **Since**: 5.87.0 <br>
**Type**: `int`<br>
**Default**: `1`<br>
The maximum number of downstream requests per request for which the request and response body should be analysed.

`DD_API_SECURITY_SAMPLE_DELAY`
: **Since**: 5.83.0 <br>
**Type**: `decimal`<br>
**Default**: `30`<br>
Sets the delay (in seconds) between API Security schema samples. This setting is intended for system testing and is not meant for general use.

`DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING`<br>
**Type**: `string`<br>
**Default**: `""`<br>
Controls the automated user tracking mode for user IDs and logins collections. Possible values: * 'anonymous': will hash user IDs and user logins before collecting them * 'anon': alias for 'anonymous' * 'safe': deprecated alias for 'anonymous' * 'identification': will collect user IDs and logins without redaction * 'ident': alias for 'identification' * 'extended': deprecated alias for 'identification' * 'disabled': will not collect user IDs and logins Unknown values will be considered as 'disabled'

`DD_APPSEC_COLLECT_ALL_HEADERS`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
When enabled, AppSec collects all request headers for security analysis instead of only the default allowlisted subset. Because header values can contain sensitive information, this flag should be used carefully; header redaction and obfuscation settings still apply. The header-collection rules (which headers are always collected vs collected only on certain events) remain in effect unless this flag forces collection of every header

`DD_APPSEC_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables the AppSec product inside the tracer. When enabled the tracer initializes the AppSec module (in-app WAF, header/body collection and AppSec telemetry)

`DD_APPSEC_GRAPHQL_BLOCKED_TEMPLATE_JSON`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Path to a local JSON response template that replaces the default backend template when the tracer performs a block action for a GraphQL request. If unset or the file cannot be read the tracer falls back to the built-in default blocking template

`DD_APPSEC_HEADER_COLLECTION_REDACTION_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
When enabled the tracer applies the AppSec header/value redaction policies to any header values it collects. Header redaction uses configured regexps and obfuscation rules to replace sensitive substrings with a stable redaction token; this flag prevents accidental leak of PII in headers collected for AppSec detection or telemetry

`DD_APPSEC_HTTP_BLOCKED_TEMPLATE_HTML`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `""`<br>
Path to a local HTML template file that will be returned when a request is blocked and the response should be HTML. If unset or invalid, the tracer uses the default blocking HTML template defined by the product RFC. The tracer decides HTML or JSON according to `Accept` header or the block action's parameters.

`DD_APPSEC_HTTP_BLOCKED_TEMPLATE_JSON`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `""`<br>
Path to a local JSON template file that will be returned when a request is blocked and the response should be JSON. If unset or invalid, the tracer uses the default blocking HTML template defined by the product RFC. The tracer decides HTML or JSON according to `Accept` header or the block action's parameters.

`DD_APPSEC_MAX_COLLECTED_HEADERS`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `50`<br>
Caps the number of headers the tracer will store/forward for AppSec purposes to avoid extremely wide span/tag vectors and large payloads. Headers beyond the configured cap are handled according to tracer policy (skipped or only name-collected). This limit protects performance and privacy; use the header collection docs for guidance on safe values.

`DD_APPSEC_MAX_STACK_TRACES`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_APPSEC_MAX_STACKTRACES`<br>
**Type**: `int`<br>
**Default**: `2`<br>
Limits how many separate stacktraces are captured and attached to an AppSec/IAST event to keep payload sizes reasonable. Evidence stacktraces are useful for triage, but unbounded capture can leak sensitive data and consume excessive bandwidth; this limit balances evidence value and safety. Set to 0 to collect all.

`DD_APPSEC_MAX_STACK_TRACE_DEPTH`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_APPSEC_MAX_STACKTRACE_DEPTH`<br>
**Type**: `int`<br>
**Default**: `32`<br>
Sets the maximum number of stack frames retained for any captured stacktrace attached to AppSec events. Tracers should prioritise top-of-stack frames and truncate deeper frames when this limit is reached. The setting helps keep evidentiary stacktraces compact while preserving the most actionable frames

`DD_APPSEC_OBFUSCATION_PARAMETER_KEY_REGEXP`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `defaultWafObfuscatorKeyRegex`<br>
A regular expression used by the AppSec obfuscator to identify parameter keys that must cause full redaction. When any `key_path` string matches this regexp the entire parameter is replaced by `<redacted by datadog>`. The default key regexp matches common secret/key names (password, token, authorization, jwt, etc.) an empty string disables the key regexp

`DD_APPSEC_OBFUSCATION_PARAMETER_VALUE_REGEXP`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `defaultWafObfuscatorValueRegex`<br>
Regular expression used to find and redact sensitive substrings inside parameter values and highlights. Matches are replaced with `<redacted by datadog>`. This regexp complements the key regexp: the key regexp takes precedence; when no key match exists, the value regexp runs. The default pattern targeted at tokens, JWTs, private key blocks, and other credential shapes. Empty string disables the value regexp

`DD_APPSEC_RASP_COLLECT_REQUEST_BODY`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Controls whether the RASP (runtime exploit-prevention) collectors include the request body when performing detection or making block decisions. Request bodies can contain sensitive data and large payloads, so collection obeys size limits and obfuscation rules.

`DD_APPSEC_RASP_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Turns on the tracer's RASP / Exploit Prevention capabilities. When enabled the tracer runs synchronous, pre-execution checks and may generate block actions or exploit signals. RASP may have separate activation and implementation details per language; enabling it usually activates extra synchronous instrumentation and additional evidence capture for detections

`DD_APPSEC_RULES`
: **Since**: 5.83.0 <br>
**Type**: N/A<br>
**Default**: `""`<br>
Override the default rules file provided. Must be a path to a valid JSON rules file

`DD_APPSEC_SCA_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: N/A<br>
Enables the tracer's runtime Software Composition Analysis (Runtime SCA) capability, which reports runtime dependency/SBOM information and powers runtime vulnerability detection. Useful for testing and demonstrations as well as production runtime vulnerability workflows; SCA may have billing/usage implications and language compatibility constraints described in the SCA runbooks

`DD_APPSEC_STACK_TRACE_ENABLED`
: **Since**: 5.83.0 <br>
**Aliases**: `DD_APPSEC_STACKTRACE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables security-related stack traces generation when security events occur.

`DD_APPSEC_TRACE_RATE_LIMIT`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `100`<br>
Controls the maximum amount of AppSec traces, per second.

`DD_APPSEC_WAF_TIMEOUT`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: `5000`<br>
Limits the WAF synchronous execution time (in microseconds)
