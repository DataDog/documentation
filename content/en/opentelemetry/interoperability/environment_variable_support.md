---
title: Configuring Tracing Libraries Using OpenTelemetry Environment Variables
further_reading:
    - link: '/tracing/trace_collection/library_config/dotnet-core'
      tag: 'Documentation'
      text: '.NET Core Tracing Configuration'
    - link: '/tracing/trace_collection/library_config/dotnet-framework'
      tag: 'Documentation'
      text: '.NET Framework Tracing Configuration'
    - link: '/tracing/trace_collection/library_config/go'
      tag: 'Documentation'
      text: 'Go Tracing Configuration'
    - link: '/tracing/trace_collection/library_config/java'
      tag: 'Documentation'
      text: 'Java Tracing Configuration'
    - link: '/tracing/trace_collection/library_config/nodejs'
      tag: 'Documentation'
      text: 'Node.js Tracing Configuration'
    - link: '/tracing/trace_collection/library_config/php'
      tag: 'Documentation'
      text: 'PHP Tracing Configuration'
    - link: '/tracing/trace_collection/library_config/python'
      tag: 'Documentation'
      text: 'Python Tracing Configuration'
    - link: '/tracing/trace_collection/library_config/ruby'
      tag: 'Documentation'
      text: 'Ruby Tracing Configuration'
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired using OpenTelemetry environment variables

Tracer settings can be configured with the following environment variables to their equivalent Datadog environment variable mapping:

`OTEL_SERVICE_NAME`
: **Mapping**: `DD_SERVICE`<br>

`OTEL_LOG_LEVEL`
: **Mapping**: `DD_LOG_LEVEL`<br>
**Notes**: A log level of debug will also map to `DD_TRACE_DEBUG=true`<br>
This maps to `DD_TRACE_LOG_LEVEL` in `node.js`<br>
**Not Supported In**: `python`, `dotnet`, `ruby`, & `golang` tracers<br>

`OTEL_PROPAGATORS`
: **Mapping**: `DD_TRACE_PROPAGATION_STYLE`<br>
**Notes**: `datadog` along with `xray` for the `java` tracer is also accepted<br>

`OTEL_TRACES_SAMPLER & OTEL_TRACES_SAMPLER_ARG`
: **Mapping**: `DD_TRACE_SAMPLE_RATE`<br>
**Notes**: Here are what the values passed in map to for `DD_TRACE_SAMPLE_RATE`:<br>
  - OTEL_TRACES_SAMPLER=`parentbased_always_on`		  DD_TRACE_SAMPLE_RATE=`1.0`
  - OTEL_TRACES_SAMPLER=`parentbased_always_off`		DD_TRACE_SAMPLE_RATE=`0.0`
  - OTEL_TRACES_SAMPLER=`parentbased_traceidratio`	DD_TRACE_SAMPLE_RATE=`${OTEL_TRACES_SAMPLER_ARG}`
  - OTEL_TRACES_SAMPLER=`always_on`				          DD_TRACE_SAMPLE_RATE=`1.0`
  - OTEL_TRACES_SAMPLER=`always_off`				        DD_TRACE_SAMPLE_RATE=`0.0`
  - OTEL_TRACES_SAMPLER=`traceidratio`			        DD_TRACE_SAMPLE_RATE=`${OTEL_TRACES_SAMPLER_ARG}`

`OTEL_TRACES_EXPORTER`
: **Mapping**: `DD_TRACE_ENABLED=false` <br>
**Notes**: only a value of `none ` is accepted<br>

`OTEL_METRICS_EXPORTER`
: **Mapping**: `DD_RUNTIME_METRICS_ENABLED=false` <br>
**Notes**: only a value of `none` is accepted<br>
**Not Supported In**: `php` tracer<br>

`OTEL_RESOURCE_ATTRIBUTES`
: **Mapping**: `DD_TAGS` <br>
**Notes**: `deployment.environment` maps to the `DD_ENV` environment variable<br>
`service.name` maps to the `DD_SERVICE` environment variable<br>
`service.version` maps to the `DD_VERSION` environment variable

`OTEL_SDK_DISABLED`
: **Mapping**: `!DD_TRACE_OTEL_ENABLED` <br>
**Not Supported In**: `ruby`, & `golang` tracers<br>

### Java Specific Configuration

`OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED`
: **Mapping**: `!DD_INTEGRATIONS_ENABLED` <br>

`OTEL_INSTRUMENTATION_[NAME]_ENABLED`
: **Notes**: Enables/disables the named OTel drop-in instrumentation <br>

`OTEL_JAVAAGENT_CONFIGURATION_FILE`
: **Mapping**: `DD_TRACE_CONFIG` <br>

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_REQUEST_HEADERS`
: **Mapping**: `DD_TRACE_REQUEST_HEADER_TAGS` <br>
**Notes**: Note there is a difference in the generated request tag name:<br>
  - Datadog:	 `http.request.headers.<header-name>`
  - OTel:		   `http.request.header.<header-name>`

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_RESPONSE_HEADERS`
: **Mapping**: `DD_TRACE_RESPONSE_HEADER_TAGS` <br>
**Notes**: there is a difference in the generated response tag name:<br>
  - Datadog:	`http.response.headers.<header-name>`
  - OTel:		  `http.response.header.<header-name>`

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_REQUEST_HEADERS`
: **Mapping**: `DD_TRACE_REQUEST_HEADER_TAGS` <br>
**Notes**: Note there is a difference in the generated request tag name:<br>
  - Datadog:	 `http.request.headers.<header-name>`
  - OTel:		   `http.request.header.<header-name>`

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_RESPONSE_HEADERS`
: **Mapping**: `DD_TRACE_RESPONSE_HEADER_TAGS` <br>
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
