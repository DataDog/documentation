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

Datadog SDKs support the following OpenTelemetry configuration options, allowing you to use OpenTelemetry environment variables to configure Datadog tracing for your applications.

<div class="alert alert-info">If both Datadog and OpenTelemetry environment variables are set, Datadog takes precedence. Datadog defaults also override OpenTelemetry defaults. See the relevant <a href="/tracing/trace_collection/library_config/">SDK Configuration page</a> for default values and more information.</div>

## General SDK configuration
Datadog SDKs support the following general OpenTelemetry SDK options. For more information, see the related [OpenTelemetry documentation][9].

`OTEL_SERVICE_NAME`
: ****Datadog convention****: `DD_SERVICE`<br>
Sets the service name<br>
**Notes**: If `service.name` is also provided in `OTEL_RESOURCE_ATTRIBUTES`, then `OTEL_SERVICE_NAME` takes precedence<br>

`OTEL_LOG_LEVEL`
: ****Datadog convention****: `DD_LOG_LEVEL`<br>
Log level used by the SDK logger<br>
**Notes**: A log level of debug will also map to `DD_TRACE_DEBUG=true`<br>
In the Node.js & PHP SDKs this maps to `DD_TRACE_LOG_LEVEL` <br>
In the Go SDK only mapped values between `OTEL_LOG_LEVEL` & `DD_TRACE_DEBUG` are supported:<br>
  - `info`|`false`
  - `debug`|`true`
**Not Supported In**: Python, .NET, Ruby, and Go SDKs<br>

`OTEL_PROPAGATORS`
: ****Datadog convention****: `DD_TRACE_PROPAGATION_STYLE`<br>
Propagators to be used as a comma-separated list<br>
**Notes**: the only supported values for most Datadog SDKs are `tracecontext`, `b3`, `b3multi`, `none`, `datadog`. `xray` is also supported for the Java SDK<br>
Values MUST be deduplicated in order to register a `Propagator` only once<br>

`OTEL_TRACES_SAMPLER & OTEL_TRACES_SAMPLER_ARG`
: ****Datadog convention****: `DD_TRACE_SAMPLE_RATE`<br>
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
: ****Datadog convention****: `DD_TRACE_ENABLED=false` <br>
Trace exporter to be used<br>
**Notes**: only a value of `none` is accepted<br>

`OTEL_METRICS_EXPORTER`
: ****Datadog convention****: `DD_RUNTIME_METRICS_ENABLED=false` <br>
Metrics exporter to be used<br>
**Notes**: only a value of `none` is accepted<br>

`OTEL_RESOURCE_ATTRIBUTES`
: ****Datadog convention****: `DD_TAGS` <br>
Key-value pairs to be used as resource attributes. See [Resource semantic conventions][11] for details<br>
**Notes**: Only the first 10 key-value pairs will be used, the subsequent values will be dropped<br>
`deployment.environment` maps to the `DD_ENV` environment variable<br>
`service.name` maps to the `DD_SERVICE` environment variable<br>
`service.version` maps to the `DD_VERSION` environment variable<br>


`OTEL_SDK_DISABLED`
: ****Datadog convention****: `!DD_TRACE_OTEL_ENABLED` <br>
Disable the SDK for all signals<br>
**Notes**: Mapped values between `OTEL_SDK_DISABLED` & `DD_TRACE_OTEL_ENABLED`:<br>
  - `true`|`false`
  - `false`|`true`<br>
**Ruby & Go SDKs**: The OpenTelemetry SDK activates automatically upon import and configuration, so this setting is not applicable.

## Java-specific configuration
Datadog SDKs support the following Java-specific OpenTelemetry configuration options. For more information, see the [OpenTelemetry documentation on Java agent configuration][10].


`OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED`
: ****Datadog convention****: `!DD_INTEGRATIONS_ENABLED` <br>
Set to `false` to disable all instrumentation in the agent<br>
**Notes**: Mapped values between `OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED` & `DD_INTEGRATIONS_ENABLED`:<br>
  - `true`|`false`
  - `false`|`true`

`OTEL_INSTRUMENTATION_[NAME]_ENABLED`
: **Description**: Enables/disables the named OTel drop-in instrumentation<br>

`OTEL_JAVAAGENT_CONFIGURATION_FILE`
: ****Datadog convention****: `DD_TRACE_CONFIG` <br>
Path to valid Java properties file which contains the agent configuration<br>
**Notes**: when OTEL_JAVAAGENT_CONFIGURATION_FILE and DD_TRACE_CONFIG are both set we apply the configuration from both files. This is an exception to the usual rule where the Datadog setting overrides the OTel one<br>

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_REQUEST_HEADERS`
: ****Datadog convention****: `DD_TRACE_REQUEST_HEADER_TAGS` <br>
A comma-separated list of HTTP header names. HTTP client instrumentations will capture HTTP request header values for all configured header names<br>
**Notes**: Header tagging configured using OTel environment variables follows the OTel tag name convention of `http.request.header.<header-name>` rather than the Datadog convention of `http.request.headers.<header-name>`<br>

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_RESPONSE_HEADERS`
: ****Datadog convention****: `DD_TRACE_RESPONSE_HEADER_TAGS` <br>
A comma-separated list of HTTP header names. HTTP client instrumentations will capture HTTP response header values for all configured header names<br>
**Notes**: Header tagging configured using OTel environment variables follows the OTel tag name convention of `http.response.header.<header-name>` rather than the Datadog convention of `http.response.headers.<header-name>`<br>

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_REQUEST_HEADERS`
: ****Datadog convention****: `DD_TRACE_REQUEST_HEADER_TAGS` <br>
A comma-separated list of HTTP header names. HTTP server instrumentations will capture HTTP request header values for all configured header names<br>
**Notes**: Header tagging configured using OTel environment variables follows the OTel tag name convention of `http.request.header.<header-name>` rather than the Datadog convention of `http.request.headers.<header-name>`<br>

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_RESPONSE_HEADERS`
: ****Datadog convention****: `DD_TRACE_RESPONSE_HEADER_TAGS` <br>
A comma-separated list of HTTP header names. HTTP server instrumentations will capture HTTP response header values for all configured header names<br>
**Notes**: Header tagging configured using OTel environment variables follows the OTel tag name convention of `http.response.header.<header-name>` rather than the Datadog convention of `http.response.headers.<header-name>`<br>

`OTEL_JAVAAGENT_EXTENSIONS`
: ****Datadog convention****: `DD_TRACE_EXTENSIONS_PATH` <br>
A comma-separated list of paths to extension jar files, or folders containing jar files. If pointing to a folder, every jar file in that folder will be treated as a separate, independent extension. <br>

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
[9]: https://opentelemetry.io/docs/specs/otel/configuration/SDK-environment-variables/#general-SDK-configuration
[10]: https://opentelemetry.io/docs/zero-code/java/agent/configuration/#configuring-the-agent
[11]: https://opentelemetry.io/docs/specs/semconv/resource/#semantic-attributes-with-dedicated-environment-variable
[12]: /tracing/trace_collection/library_config/_index
