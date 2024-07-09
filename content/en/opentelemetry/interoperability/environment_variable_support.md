---
title: Using OpenTelemetry Environment Variables with Datadog SDKs
further_reading:
    - link: '/tracing/trace_collection/library_config/dotnet-core'
      tag: 'Documentation'
      text: '.NET Core SDK Configuration'
    - link: '/tracing/trace_collection/library_config/dotnet-framework'
      tag: 'Documentation'
      text: '.NET Framework SDK Configuration'
    - link: '/tracing/trace_collection/library_config/go'
      tag: 'Documentation'
      text: 'Go SDK Configuration'
    - link: '/tracing/trace_collection/library_config/java'
      tag: 'Documentation'
      text: 'Java SDK Configuration'
    - link: '/tracing/trace_collection/library_config/nodejs'
      tag: 'Documentation'
      text: 'Node.js SDK Configuration'
    - link: '/tracing/trace_collection/library_config/php'
      tag: 'Documentation'
      text: 'PHP SDK Configuration'
    - link: '/tracing/trace_collection/library_config/python'
      tag: 'Documentation'
      text: 'Python SDK Configuration'
    - link: '/tracing/trace_collection/library_config/ruby'
      tag: 'Documentation'
      text: 'Ruby SDK Configuration'
---

Since the Datadog SDKs implement the OpenTelemetry Tracing APIs and are continually being updated to further implement additional OpenTelemetry APIs, you can replace the OpenTelemetry SDK in your application with the Datadog SDK to receive traces and additional Datadog-supported signals with minimal changes to SDK configuration when using the OpenTelemetry SDK configurations outline below.

SDK settings can be configured with the following environment variables with their equivalent Datadog environment variable mapping:

Note: If both set, Datadog environment variables take precedence over OpenTelemetry environment variables, Likewise Datadog defaults take precedence over OpenTelemetry defaults. Please refer to the configuration page for the relevant SDK for more information on default values.

[for more info, see the OpenTelemetry documentation][9]
## General SDK Configuration

`OTEL_SERVICE_NAME`
: **Corresponding Datadog Environment Variable**: `DD_SERVICE`<br>
Sets the service name<br>
**Notes**: If `service.name` is also provided in `OTEL_RESOURCE_ATTRIBUTES`, then `OTEL_SERVICE_NAME` takes precedence<br>

`OTEL_LOG_LEVEL`
: **Corresponding Datadog Environment Variable**: `DD_LOG_LEVEL`<br>
Log level used by the SDK logger<br>
**Notes**: A log level of debug will also map to `DD_TRACE_DEBUG=true`<br>
This maps to `DD_TRACE_LOG_LEVEL` in `nodejs` & `php` sdk's<br>
**Not Supported In**: `python`, `dotnet`, `ruby`, & `golang` sdk's<br>

`OTEL_PROPAGATORS`
: **Corresponding Datadog Environment Variable**: `DD_TRACE_PROPAGATION_STYLE`<br>
Propagators to be used as a comma-separated list<br>
**Notes**: the only supported values are `tracecontext`, `b3`, `b3multi`, `none`, `datadog` along with `xray` for the `java` sdk<br>
Values MUST be deduplicated in order to register a `Propagator` only once<br>

`OTEL_TRACES_SAMPLER & OTEL_TRACES_SAMPLER_ARG`
: **Corresponding Datadog Environment Variable**: `DD_TRACE_SAMPLE_RATE`<br>
`OTEL_TRACES_SAMPLER`: Sampler to be used for traces & `OTEL_TRACES_SAMPLER_ARG`: String value to be used as the sampler argument<br>
**Notes**: The specified value will only be used if `OTEL_TRACES_SAMPLER` is set. Each Sampler type defines its own expected input, if any. Invalid or unrecognized input MUST be logged and MUST be otherwise ignored, i.e. the implementation MUST behave as if `OTEL_TRACES_SAMPLER_ARG` is not set<br>
Mapped values between `OTEL_TRACES_SAMPLER` & `DD_TRACE_SAMPLE_RATE`:<br>
  - `parentbased_always_on`|`1.0`
  - `parentbased_always_off`|`0.0`
  - `parentbased_traceidratio`|`${OTEL_TRACES_SAMPLER_ARG}`
  - `always_on`|`1.0`
  - `always_off`|`0.0`
  - `traceidratio`|`${OTEL_TRACES_SAMPLER_ARG}`

`OTEL_TRACES_EXPORTER`
: **Corresponding Datadog Environment Variable**: `DD_TRACE_ENABLED=false` <br>
Trace exporter to be used<br>
**Notes**: only a value of `none ` is accepted<br>

`OTEL_METRICS_EXPORTER`
: **Corresponding Datadog Environment Variable**: `DD_RUNTIME_METRICS_ENABLED=false` <br>
Metrics exporter to be used<br>
**Notes**: only a value of `none` is accepted<br>
**Not Supported In**: `php` sdk<br>

`OTEL_RESOURCE_ATTRIBUTES`
: **Corresponding Datadog Environment Variable**: `DD_TAGS` <br>
Key-value pairs to be used as resource attributes. See [Resource semantic conventions][11] for details<br>
**Notes**: `deployment.environment` maps to the `DD_ENV` environment variable<br>
`service.name` maps to the `DD_SERVICE` environment variable<br>
`service.version` maps to the `DD_VERSION` environment variable

`OTEL_SDK_DISABLED`
: **Corresponding Datadog Environment Variable**: `!DD_TRACE_OTEL_ENABLED` <br>
Disable the SDK for all signals<br>
**Notes**: Mapped values between `OTEL_SDK_DISABLED` & `DD_TRACE_OTEL_ENABLED`:<br>
  - `true`|`false`
  - `false`|`true`<br>
**Not Supported In**: `ruby` & `golang` sdk's<br>

[for more info, see the OpenTelemetry documentation][10]
## Java Specific Configuration

`OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED`
: **Corresponding Datadog Environment Variable**: `!DD_INTEGRATIONS_ENABLED` <br>
Set to `false` to disable all instrumentation in the agent<br>
**Notes**: Mapped values between `OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED` & `DD_INTEGRATIONS_ENABLED`:<br>
  - `true`|`false`
  - `false`|`true`

`OTEL_INSTRUMENTATION_[NAME]_ENABLED`
: **Description**: Enables/disables the named OTel drop-in instrumentation<br>

`OTEL_JAVAAGENT_CONFIGURATION_FILE`
: **Corresponding Datadog Environment Variable**: `DD_TRACE_CONFIG` <br>
Path to valid Java properties file which contains the agent configuration<br>

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_REQUEST_HEADERS`
: **Corresponding Datadog Environment Variable**: `DD_TRACE_REQUEST_HEADER_TAGS` <br>
A comma-separated list of HTTP header names. HTTP client instrumentations will capture HTTP request header values for all configured header names<br>
**Notes**: Note there is a difference in the generated request tag name:<br>
  - Datadog:	 `http.request.headers.<header-name>`
  - OTel:		   `http.request.header.<header-name>`

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_RESPONSE_HEADERS`
: **Corresponding Datadog Environment Variable**: `DD_TRACE_RESPONSE_HEADER_TAGS` <br>
A comma-separated list of HTTP header names. HTTP client instrumentations will capture HTTP response header values for all configured header names<br>
**Notes**: there is a difference in the generated response tag name:<br>
  - Datadog:	`http.response.headers.<header-name>`
  - OTel:		  `http.response.header.<header-name>`

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_REQUEST_HEADERS`
: **Corresponding Datadog Environment Variable**: `DD_TRACE_REQUEST_HEADER_TAGS` <br>
A comma-separated list of HTTP header names. HTTP server instrumentations will capture HTTP request header values for all configured header names<br>
**Notes**: Note there is a difference in the generated request tag name:<br>
  - Datadog:	 `http.request.headers.<header-name>`
  - OTel:		   `http.request.header.<header-name>`

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_RESPONSE_HEADERS`
: **Corresponding Datadog Environment Variable**: `DD_TRACE_RESPONSE_HEADER_TAGS` <br>
A comma-separated list of HTTP header names. HTTP server instrumentations will capture HTTP response header values for all configured header names<br>
**Notes**: there is a difference in the generated response tag name:<br>
  - Datadog:	`http.response.headers.<header-name>`
  - OTel:		  `http.response.header.<header-name>`

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/library_config/dotnet-core
[2]: /tracing/trace_collection/library_config/dotnet-framework
[3]: /tracing/trace_collection/library_config/go
[4]: /tracing/trace_collection/library_config/java
[5]: /tracing/trace_collection/library_config/nodejs
[6]: /tracing/trace_collection/library_config/php
[7]: /tracing/trace_collection/library_config/python
[8]: /tracing/trace_collection/library_config/ruby
[9]: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/#general-sdk-configuration
[10]: https://opentelemetry.io/docs/zero-code/java/agent/configuration/#configuring-the-agent
[11]: https://opentelemetry.io/docs/specs/semconv/resource/#semantic-attributes-with-dedicated-environment-variable

