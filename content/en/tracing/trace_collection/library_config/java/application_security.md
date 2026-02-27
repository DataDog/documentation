### Application Security

`DD_API_SECURITY_DOWNSTREAM_REQUEST_ANALYSIS_SAMPLE_RATE`
: **Since**: 1.55.0 <br>
**Type**: `decimal`<br>
**Default**: `0.0`<br>
Legacy/alternate name for the API Security downstream request body analysis sampling rate. Sets a 0.0-1.0 sample rate used to decide which downstream (HTTP client) request bodies are analyzed for API Security.

`DD_API_SECURITY_DOWNSTREAM_REQUEST_BODY_ANALYSIS_SAMPLE_RATE`
: **Since**: 1.55.0 <br>
**Aliases**: `DD_API_SECURITY_DOWNSTREAM_REQUEST_ANALYSIS_SAMPLE_RATE`<br>
**Type**: `decimal`<br>
**Default**: `0.5`<br>
Defines the probability of a downstream request body being sampled, or said differently, defines the overall number of requests for which the request and response body should be sampled / analysed.

`DD_API_SECURITY_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_EXPERIMENTAL_API_SECURITY_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether API Security features are enabled. If unset, API Security is enabled by default.

`DD_API_SECURITY_ENDPOINT_COLLECTION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether API endpoint definitions are collected for API catalog features. If unset, endpoint collection is enabled by default.

`DD_API_SECURITY_ENDPOINT_COLLECTION_MESSAGE_LIMIT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `300`<br>
Sets the maximum number of API endpoints included in a single endpoint-collection telemetry message. If unset, a default limit is used.

`DD_API_SECURITY_MAX_DOWNSTREAM_REQUEST_BODY_ANALYSIS`
: **Since**: 1.55.0 <br>
**Type**: `int`<br>
**Default**: `1`<br>
The maximum number of downstream requests per request for which the request and response body should be analysed.

`DD_API_SECURITY_SAMPLE_DELAY`
: **Since**: 1.54.0 <br>
**Type**: `decimal`<br>
**Default**: `30`<br>
Sets the delay (in seconds) between API Security schema samples. This setting is intended for system testing and is not meant for general use.

`DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Controls automated user event tracking mode used by AppSec when `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` is not set. Values like `safe` map to anonymization, `extended` maps to identification, and other values disable automated user events.

`DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Sets AppSec automated user instrumentation mode (user ID collection mode). Supported values include `identification`/`ident`, `anonymization`/`anon`, and `disabled`.

`DD_APPSEC_BODY_PARSING_SIZE_LIMIT`
: **Since**: 1.55.0 <br>
**Type**: `int`<br>
**Default**: `10000000`<br>
Maximum size of the bodies to be processed in bytes. If set to `0`, the bodies are not processed. (Recommended value: `10000000` (10MB))

`DD_APPSEC_ENABLED`
: **Since**: 1.57.0 <br>
**Type**: `string`<br>
**Default**: `inactive`<br>
Enables or disables the AppSec product inside the tracer. When enabled the tracer initializes the AppSec module (in-app WAF, header/body collection and AppSec telemetry)

`DD_APPSEC_HTTP_BLOCKED_TEMPLATE_HTML`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Path to a local HTML template file that will be returned when a request is blocked and the response should be HTML. If unset or invalid, the tracer uses the default blocking HTML template defined by the product RFC. The tracer decides HTML or JSON according to `Accept` header or the block action's parameters.

`DD_APPSEC_HTTP_BLOCKED_TEMPLATE_JSON`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Path to a local JSON template file that will be returned when a request is blocked and the response should be JSON. If unset or invalid, the tracer uses the default blocking HTML template defined by the product RFC. The tracer decides HTML or JSON according to `Accept` header or the block action's parameters.

`DD_APPSEC_IPHEADER`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Specify a single HTTP header to use for client IP resolution. When set, the tracer treats that header as the authoritative source of client IP and ignores the default set of candidate headers. This helps avoid ambiguity and IP spoofing issues when proxies or CDNs provide custom client IP headers; use with caution and follow deployment best practices.

`DD_APPSEC_MAX_STACKTRACES`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `0`<br>
Legacy name for the AppSec max stack traces setting. See DD_APPSEC_MAX_STACK_TRACES

`DD_APPSEC_MAX_STACKTRACE_DEPTH`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `0`<br>
Legacy/alternate name for the AppSec max stack trace depth setting. See DD_APPSEC_MAX_STACK_TRACE_DEPTH

`DD_APPSEC_MAX_STACK_TRACES`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_APPSEC_MAX_STACKTRACES`<br>
**Type**: `int`<br>
**Default**: `2`<br>
Limits how many separate stacktraces are captured and attached to an AppSec/IAST event to keep payload sizes reasonable. Evidence stacktraces are useful for triage, but unbounded capture can leak sensitive data and consume excessive bandwidth; this limit balances evidence value and safety. Set to 0 to collect all.

`DD_APPSEC_MAX_STACK_TRACE_DEPTH`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_APPSEC_MAX_STACKTRACE_DEPTH`<br>
**Type**: `int`<br>
**Default**: `32`<br>
Sets the maximum number of stack frames retained for any captured stacktrace attached to AppSec events. Tracers should prioritise top-of-stack frames and truncate deeper frames when this limit is reached. The setting helps keep evidentiary stacktraces compact while preserving the most actionable frames

`DD_APPSEC_OBFUSCATION_PARAMETER_KEY_REGEXP`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
A regular expression used by the AppSec obfuscator to identify parameter keys that must cause full redaction. When any `key_path` string matches this regexp the entire parameter is replaced by `<redacted by datadog>`. The default key regexp matches common secret/key names (password, token, authorization, jwt, etc.) an empty string disables the key regexp

`DD_APPSEC_OBFUSCATION_PARAMETER_VALUE_REGEXP`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Regular expression used to find and redact sensitive substrings inside parameter values and highlights. Matches are replaced with `<redacted by datadog>`. This regexp complements the key regexp: the key regexp takes precedence; when no key match exists, the value regexp runs. The default pattern targeted at tokens, JWTs, private key blocks, and other credential shapes. Empty string disables the value regexp

`DD_APPSEC_RASP_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Turns on the tracer's RASP / Exploit Prevention capabilities. When enabled the tracer runs synchronous, pre-execution checks and may generate block actions or exploit signals. RASP may have separate activation and implementation details per language; enabling it usually activates extra synchronous instrumentation and additional evidence capture for detections

`DD_APPSEC_REPORTING_INBAND`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
No description available.

`DD_APPSEC_REPORT_TIMEOUT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `60`<br>
No description available.

`DD_APPSEC_RULES`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `""`<br>
Override the default rules file provided. Must be a path to a valid JSON rules file

`DD_APPSEC_SCA_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: N/A<br>
Enables the tracer's runtime Software Composition Analysis (Runtime SCA) capability, which reports runtime dependency/SBOM information and powers runtime vulnerability detection. Useful for testing and demonstrations as well as production runtime vulnerability workflows; SCA may have billing/usage implications and language compatibility constraints described in the SCA runbooks

`DD_APPSEC_STACKTRACE_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
See `DD_APPSEC_STACK_TRACE_ENABLED`

`DD_APPSEC_STACK_TRACE_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_APPSEC_STACKTRACE_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables security-related stack traces generation when security events occur.

`DD_APPSEC_TRACE_RATE_LIMIT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `100`<br>
Controls the maximum amount of AppSec traces, per second.

`DD_APPSEC_WAF_METRICS`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables AppSec WAF metrics reporting. When enabled, the tracer adds WAF statistics reporting (for example, via the WAF stats reporter); when disabled, WAF metrics are not reported.

`DD_APPSEC_WAF_TIMEOUT`
: **Since**: 1.57.0 <br>
**Type**: `int`<br>
**Default**: `100000`<br>
Limits the WAF synchronous execution time (in microseconds).
