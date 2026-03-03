### Tracing

`DD_TRACE_AGENT_PORT`
: **Type**: `int`<br>
**Default**: `8126`<br>
The port of the Trace Agent that the tracer submits to. If the Agent configuration sets receiver_port or DD_APM_RECEIVER_PORT to something other than the default 8126, then DD_TRACE_AGENT_PORT or DD_TRACE_AGENT_URL must match it.

`DD_TRACE_AGENT_URL`
: **Aliases**: `DD_TRACE_URL`<br>
**Type**: `string`<br>
**Default**: `""`<br>
Sets the URL endpoint where profiles are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. Defaults to `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.

`DD_TRACE_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
**Default**: true Enable web framework and library instrumentation. When false, the application code doesn't generate any traces. See also DD_APM_TRACING_ENABLED.

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables incrementally flushing large traces to the Datadog Agent, reducing the chance of rejection by the Agent. Use only when you have long-lived traces or traces with many spans.

`DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`
: **Type**: `int`<br>
**Default**: `300`<br>
Minimum number of spans in a trace before partial flush is triggered.

`DD_TRACE_PROPAGATION_EXTRACT_FIRST`
: **Type**: `boolean`<br>
**Default**: `false`<br>
When set to true, stops extracting after the first successful trace context extraction.

`DD_TRACE_PROPAGATION_STYLE`
: **Type**: `array`<br>
**Default**: `datadog,tracecontext`<br>
A comma-separated list of header formats from which to attempt to inject and extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue. The more specific DD_TRACE_PROPAGATION_STYLE_INJECT and DD_TRACE_PROPAGATION_STYLE_EXTRACT configurations take priority when present.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **Type**: `array`<br>
**Default**: `""`<br>
A comma-separated list of header formats from which to attempt to extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **Type**: `array`<br>
**Default**: `""`<br>
A comma-separated list of header formats to include to propagate distributed traces between services.

`DD_TRACE_RATE_LIMIT`
: **Type**: `int`<br>
**Default**: `100`<br>
Sets the maximum number of traces to sample per second; applies only when either DD_TRACE_SAMPLING_RULES or DD_TRACE_SAMPLE_RATE is set.

`DD_TRACE_SAMPLING_RULES`
: **Type**: `array`<br>
**Default**: `""`<br>
Configures custom sampling rules for traces. Rules are evaluated in order, and the first matching rule determines the sampling rate. If no rules match, the default sampling rate is used. For more information about how these configurations affect trace ingestion, see Ingestion Mechanisms.

`DD_TRACE_STATS_COMPUTATION_ENABLED`
: **Aliases**: `DD_TRACE_TRACER_METRICS_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Controls whether client-side trace statistics computation is enabled. Defaults to true.

`DD_TRACE_X_DATADOG_TAGS_MAX_LENGTH`
: **Type**: `int`<br>
**Default**: `512`<br>
Maximum length of the `x-datadog-tags` header for trace tag propagation. Set to 0 to disable.
