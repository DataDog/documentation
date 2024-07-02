---
title: Ruby Custom Instrumentation using OpenTelemetry API
kind: documentation
description: 'Instrument your Ruby application with OpenTelemetry API to send traces to Datadog.'
code_lang: otel
type: multi-code-lang
code_lang_weight: 2
aliases:
- /tracing/trace_collection/otel_instrumentation/ruby/
- /tracing/trace_collection/custom_instrumentation/otel_instrumentation/ruby
further_reading:
    - link: tracing/glossary/
      tag: Documentation
      text: Explore your services, resources, and traces
    - link: /opentelemetry/guide/otel_api_tracing_interoperability
      tag: Documentation
      text: Interoperability of OpenTelemetry API and Datadog instrumented traces
---

{{% otel-custom-instrumentation %}}


## Requirements and limitations

- Datadog Ruby tracing library `dd-trace-rb` version 1.9.0 or greater.
- Gem version support 1.1.0 or greater.

The following OpenTelemetry features implemented in the Datadog library as noted:

| Feature                               | Support notes                       |
|---------------------------------------|--------------------------------------|
| [OpenTelemetry Context propagation][1]         | [Datadog and W3C Trace Context header formats][9] are enabled by default. | 
| [Span processors][2]                  | Unsupported                                          | 
| [Span Exporters][3]                   | Unsupported                                            |
| `OpenTelemetry.logger`                | `OpenTelemetry.logger` is set to the same object as `Datadog.logger`. Configure through [custom logging][10]. |
| Trace/span [ID generators][4]         | ID generation is performed by the tracing library, with support for [128-bit trace IDs][12].     |


## Configuring OpenTelemetry to use the Datadog tracing library

1. Add your desired manual OpenTelemetry instrumentation to your Ruby code following the [OpenTelemetry Ruby Manual Instrumentation documentation][5]. **Important!** Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

1. `datadog` gem を Gemfile に追加します。

    ```ruby
    source 'https://rubygems.org'
    gem 'datadog' # For dd-trace-rb v1.x, use the `ddtrace` gem.
    ```

1. Install the gem by running `bundle install`.
1. Add the following lines to your OpenTelemetry configuration file:

    ```ruby
    require 'opentelemetry/sdk'
    require 'datadog/opentelemetry'
    ```

1. Add a configuration block to your application where you can activate integrations and change tracer settings. Without additional configuration here, only code you have instrumented with OpenTelemetry is traced:

    ```ruby
    Datadog.configure do |c|
      ...
    end
    ```

   Using this block you can:

    - [Add additional Datadog configuration settings][6]
    - [Activate or reconfigure Datadog instrumentation][7]

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It supports [integration instrumentation][7] and [OpenTelemetry Automatic instrumentation][8] also.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/ruby/manual/#context-propagation
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/ruby/manual/
[6]: /tracing/trace_collection/dd_libraries/ruby/#additional-configuration
[7]: /tracing/trace_collection/dd_libraries/ruby#integration-instrumentation
[8]: https://opentelemetry.io/docs/instrumentation/ruby/automatic/
[9]: /tracing/trace_collection/trace_context_propagation/ruby/
[10]: /tracing/trace_collection/dd_libraries/ruby/#custom-logging
[12]: /opentelemetry/guide/otel_api_tracing_interoperability/
