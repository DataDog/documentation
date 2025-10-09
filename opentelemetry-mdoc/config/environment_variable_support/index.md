---
title: Using OpenTelemetry Environment Variables with Datadog SDKs
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > OpenTelemetry Configuration > Using
  OpenTelemetry Environment Variables with Datadog SDKs
---

# Using OpenTelemetry Environment Variables with Datadog SDKs

Datadog SDKs implement the OpenTelemetry Tracing APIs, allowing you to use OpenTelemetry environment variables to configure Datadog tracing for your applications. Replace the OpenTelemetry SDK with the Datadog SDK in your application to receive traces and additional Datadog telemetry with minimal changes to your existing configuration. This page describes the OpenTelemetry SDK options Datadog supports.

{% alert level="info" %}
If both Datadog and OpenTelemetry environment variables are set, Datadog takes precedence. Datadog defaults also override OpenTelemetry defaults. See the relevant [SDK Configuration page](http://localhost:1313/tracing/trace_collection/library_config/) for default values and more information.
{% /alert %}

## General SDK configuration{% #general-sdk-configuration %}

Datadog SDKs support the following general OpenTelemetry SDK options. For more information, see the related [OpenTelemetry documentation](https://opentelemetry.io/docs/specs/otel/configuration/SDK-environment-variables/#general-SDK-configuration).

{% dl %}

{% dt %}
`OTEL_SERVICE_NAME`
{% /dt %}

{% dd %}
****Datadog convention****: `DD_SERVICE`Sets the service name**Notes**: If `service.name` is also provided in `OTEL_RESOURCE_ATTRIBUTES`, then `OTEL_SERVICE_NAME` takes precedence
{% /dd %}

{% dt %}
`OTEL_LOG_LEVEL`
{% /dt %}

{% dd %}
****Datadog convention****: `DD_LOG_LEVEL`Log level used by the SDK logger**Notes**: A log level of debug also maps to `DD_TRACE_DEBUG=true`In the Node.js & PHP SDKs this maps to `DD_TRACE_LOG_LEVEL`In the Go SDK only mapped values between `OTEL_LOG_LEVEL` & `DD_TRACE_DEBUG` are supported:
- `info`|`false`
- `debug`|`true`**Not Supported In**: Python, .NET, Ruby, and Go SDKs

{% /dd %}

{% dt %}
`OTEL_PROPAGATORS`
{% /dt %}

{% dd %}
****Datadog convention****: `DD_TRACE_PROPAGATION_STYLE`Propagators to be used as a comma-separated list**Notes**: The only supported values for most Datadog SDKs are `tracecontext`, `b3`, `b3multi`, `none`, `datadog`. `xray` is also supported for the Java SDKValues MUST be deduplicated in order to register a `Propagator` only once
{% /dd %}

{% dt %}
`OTEL_TRACES_SAMPLER & OTEL_TRACES_SAMPLER_ARG`
{% /dt %}

{% dd %}
****Datadog convention****: `DD_TRACE_SAMPLE_RATE``OTEL_TRACES_SAMPLER`: Sampler to be used for traces & `OTEL_TRACES_SAMPLER_ARG`: String value to be used as the sampler argument**Notes**: The specified value is only used if `OTEL_TRACES_SAMPLER` is set. Each Sampler type defines its own expected input, if any. Invalid or unrecognized input MUST be logged and MUST be otherwise ignored. In such cases, the implementation MUST behave as if `OTEL_TRACES_SAMPLER_ARG` is not setMapped values between `OTEL_TRACES_SAMPLER` & `DD_TRACE_SAMPLE_RATE`:
- `parentbased_always_on`|`1.0`
- `parentbased_always_off`|`0.0`
- `parentbased_traceidratio`|`${OTEL_TRACES_SAMPLER_ARG}`
- `always_on`|`1.0`
- `always_off`|`0.0`
- `traceidratio`|`${OTEL_TRACES_SAMPLER_ARG}`

{% /dd %}

{% dt %}
`OTEL_TRACES_EXPORTER`
{% /dt %}

{% dd %}
****Datadog convention****: `DD_TRACE_ENABLED=false`Trace exporter to be used**Notes**: Only a value of `none` is accepted
{% /dd %}

{% dt %}
`OTEL_METRICS_EXPORTER`
{% /dt %}

{% dd %}
****Datadog convention****: `DD_RUNTIME_METRICS_ENABLED=false`Metrics exporter to be used**Notes**: only a value of `none` is accepted
{% /dd %}

{% dt %}
`OTEL_RESOURCE_ATTRIBUTES`
{% /dt %}

{% dd %}
****Datadog convention****: `DD_TAGS`Key-value pairs to be used as resource attributes. See [Resource semantic conventions](https://opentelemetry.io/docs/specs/semconv/resource/#semantic-attributes-with-dedicated-environment-variable) for details**Notes**: Only the first 10 key-value pairs are used; the subsequent values are dropped`deployment.environment` and `deployment.environment.name` map to the `DD_ENV` environment variable`service.name` maps to the `DD_SERVICE` environment variable`service.version` maps to the `DD_VERSION` environment variable
{% /dd %}

{% dt %}
`OTEL_SDK_DISABLED`
{% /dt %}

{% dd %}
****Datadog convention****: `!DD_TRACE_OTEL_ENABLED`Disable the SDK for all signals**Notes**: Mapped values between `OTEL_SDK_DISABLED` & `DD_TRACE_OTEL_ENABLED`:
- `true`|`false`
- `false`|`true`**Ruby & Go SDKs**: The OpenTelemetry SDK activates automatically upon import and configuration, so this setting is not applicable.

{% /dd %}

{% /dl %}

## Java-specific configuration{% #java-specific-configuration %}

Datadog SDKs support the following Java-specific OpenTelemetry configuration options. For more information, see the [OpenTelemetry documentation on Java agent configuration](https://opentelemetry.io/docs/zero-code/java/agent/configuration/#configuring-the-agent).

{% dl %}

{% dt %}
`OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED`
{% /dt %}

{% dd %}
****Datadog convention****: `!DD_INTEGRATIONS_ENABLED`Set to `false` to disable all instrumentation in the agent**Notes**: Mapped values between `OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED` & `DD_INTEGRATIONS_ENABLED`:
- `true`|`false`
- `false`|`true`

{% /dd %}

{% dt %}
`OTEL_INSTRUMENTATION_[NAME]_ENABLED`
{% /dt %}

{% dd %}
**Description**: Enables/disables the named OTel drop-in instrumentation
{% /dd %}

{% dt %}
`OTEL_JAVAAGENT_CONFIGURATION_FILE`
{% /dt %}

{% dd %}
****Datadog convention****: `DD_TRACE_CONFIG`Path to valid Java properties file which contains the agent configuration**Notes**: When OTEL_JAVAAGENT_CONFIGURATION_FILE and DD_TRACE_CONFIG are both set we apply the configuration from both files. This is an exception to the usual rule where the Datadog setting overrides the OTel one
{% /dd %}

{% dt %}
`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_REQUEST_HEADERS`
{% /dt %}

{% dd %}
****Datadog convention****: `DD_TRACE_REQUEST_HEADER_TAGS`A comma-separated list of HTTP header names. HTTP client instrumentations capture HTTP request header values for all configured header names**Notes**: Header tagging configured using OTel environment variables follows the OTel tag name convention of `http.request.header.<header-name>` rather than the Datadog convention of `http.request.headers.<header-name>`
{% /dd %}

{% dt %}
`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_RESPONSE_HEADERS`
{% /dt %}

{% dd %}
****Datadog convention****: `DD_TRACE_RESPONSE_HEADER_TAGS`A comma-separated list of HTTP header names. HTTP client instrumentations capture HTTP response header values for all configured header names**Notes**: Header tagging configured using OTel environment variables follows the OTel tag name convention of `http.response.header.<header-name>` rather than the Datadog convention of `http.response.headers.<header-name>`
{% /dd %}

{% dt %}
`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_REQUEST_HEADERS`
{% /dt %}

{% dd %}
****Datadog convention****: `DD_TRACE_REQUEST_HEADER_TAGS`A comma-separated list of HTTP header names. HTTP server instrumentations capture HTTP request header values for all configured header names**Notes**: Header tagging configured using OTel environment variables follows the OTel tag name convention of `http.request.header.<header-name>` rather than the Datadog convention of `http.request.headers.<header-name>`
{% /dd %}

{% dt %}
`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_RESPONSE_HEADERS`
{% /dt %}

{% dd %}
****Datadog convention****: `DD_TRACE_RESPONSE_HEADER_TAGS`A comma-separated list of HTTP header names. HTTP server instrumentations capture HTTP response header values for all configured header names**Notes**: Header tagging configured using OTel environment variables follows the OTel tag name convention of `http.response.header.<header-name>` rather than the Datadog convention of `http.response.headers.<header-name>`
{% /dd %}

{% dt %}
`OTEL_JAVAAGENT_EXTENSIONS`
{% /dt %}

{% dd %}
****Datadog convention****: `DD_TRACE_EXTENSIONS_PATH`A comma-separated list of paths to extension jar files, or folders containing jar files. If pointing to a folder, every jar file in that folder is treated as a separate, independent extension.
{% /dd %}

{% /dl %}

## Further Reading{% #further-reading %}

- [.NET Core SDK Configuration](http://localhost:1313/tracing/trace_collection/library_config/dotnet-core)
- [.NET Framework SDK Configuration](http://localhost:1313/tracing/trace_collection/library_config/dotnet-framework)
- [Go SDK Configuration](http://localhost:1313/tracing/trace_collection/library_config/go)
- [Java SDK Configuration](http://localhost:1313/tracing/trace_collection/library_config/java)
- [Node.js SDK Configuration](http://localhost:1313/tracing/trace_collection/library_config/nodejs)
- [PHP SDK Configuration](http://localhost:1313/tracing/trace_collection/library_config/php)
- [Python SDK Configuration](http://localhost:1313/tracing/trace_collection/library_config/python)
- [Ruby SDK Configuration](http://localhost:1313/tracing/trace_collection/library_config/ruby)
