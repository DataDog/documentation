---
title: Ruby OpenTelemetry Instrumentation
kind: documentation
description: 'Instrument your Ruby application with OTel API to send traces to Datadog.'
code_lang: ruby
type: multi-code-lang
code_lang_weight: 20
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

{{% otel-custom-instrumentation %}}


## Requirements and limitations

- Datadog Ruby tracing library `dd-trace-rb` version 1.9.0 or greater
- Gem version support 1.1.0 or greater

The following OTel features implemented in the Datadog library as noted:

| Feature                               | Support notes                       |
|---------------------------------------|-------------|-----------------------------|
| [OTel Context propagation][1]         | [Datadog distributed header format][9] is used instead. | 
| [Span processors][2]                  | Unsupported                                          | 
| [Span Exporters][3]                   | Unsupported                                            |
| `OpenTelemetry.logger`                | `OpenTelemetry.logger` is set to the same object as `Datadog.logger`. Configure through [custom logging][10]. |
| Trace/span [ID generators][4]         | ID generation is performed by `ddtrace`.           |


## Configuring OTel to use the Datadog trace provider

1. Add your desired manual OTel instrumentation to your Ruby code following the [OTel Ruby Manual Instrumentation documentation][5].
1. Add the `ddtrace` gem to your Gemfile:

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace'
    ```

1. Install the gem by running `bundle install`.
1. Add the following lines to your OpenTelemetry configuration file:

    ```ruby
    require 'opentelemetry'
    require 'datadog/opentelemetry'
    ```

1. Add a configuration block to your application where you can activate integrations and change tracer settings. Without additional configuration here, only code you have instrumented with OTel is traced:

    ```ruby
    Datadog.configure do |c|
      ...
    end
    ```

   Using this block you can:

    - [Add additional Datadog configuration settings][6]
    - [Activate or reconfigure Datadog instrumentation][7]

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It supports [integration instrumentation][7] and [OpenTelemetry Automatic instrumentation][8] also.


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