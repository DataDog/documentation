---
title: Ruby Custom Instrumentation using the OpenTelemetry API
description: 'Instrument your Ruby application with the OpenTelemetry API to send traces to Datadog.'
code_lang: otel
type: multi-code-lang
code_lang_weight: 1
aliases:
- /tracing/trace_collection/otel_instrumentation/ruby/
- /tracing/trace_collection/custom_instrumentation/otel_instrumentation/ruby
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
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

1. Add the `datadog` gem to your Gemfile:

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
   
   OpenTelemetry configuration can be changed separately, using the [`OpenTelemetry::SDK.configure` block][15].

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It supports [integration instrumentation][7] and [OpenTelemetry Automatic instrumentation][8] also.

## Adding span events

<div class="alert alert-info">Adding span events requires SDK version 2.3.0 or higher.</div>

You can add span events using the `add_event` API. This method requires a `name` parameter and optionally accepts `attributes` and `timestamp` parameters. The method creates a new span event with the specified properties and associates it with the corresponding span.

- **Name** [_required_]: A string representing the event's name.
- **Attributes** [_optional_]: Zero or more key-value pairs with the following properties:
  - The key must be a non-empty string.
  - The value can be either:
    - A primitive type: string, Boolean, or number.
    - A homogeneous array of primitive type values (for example, an array of strings).
  - Nested arrays and arrays containing elements of different data types are not allowed.
- **Timestamp** [_optional_]: A UNIX timestamp representing the event's occurrence time. Expects `seconds(Float)`.

The following examples demonstrate different ways to add events to a span:

```ruby
span.add_event('Event With No Attributes')
span.add_event(
  'Event With All Attributes',
  attributes: { 'int_val' => 1, 'string_val' => 'two', 'int_array' => [3, 4], 'string_array' => ['5', '6'], 'bool_array' => [false, true]}
)
```

Read the [OpenTelemetry][13] specification for more information.

### Recording exceptions

To record exceptions, use the `record_exception` API. This method requires an `exception` parameter and optionally accepts a UNIX `timestamp` parameter. It creates a new span event that includes standardized exception attributes and associates it with the corresponding span.

The following examples demonstrate different ways to record exceptions:

```ruby
span.record_exception(
  StandardError.new('Error Message')
)
span.record_exception(
  StandardError.new('Error Message'),
  attributes: { 'status' => 'failed' }
)
```

Read the [OpenTelemetry][14] specification for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/ruby/manual/#context-propagation
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/ruby/manual/
[6]: /tracing/trace_collection/dd_libraries/ruby/#additional-configuration
[7]: /tracing/trace_collection/dd_libraries/ruby#integration-instrumentation
[8]: https://opentelemetry.io/docs/languages/ruby/libraries/
[9]: /tracing/trace_collection/trace_context_propagation/
[10]: /tracing/trace_collection/dd_libraries/ruby/#custom-logging
[12]: /opentelemetry/guide/otel_api_tracing_interoperability/
[13]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[14]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception
[15]: https://opentelemetry.io/docs/languages/ruby/getting-started/#instrumentation
