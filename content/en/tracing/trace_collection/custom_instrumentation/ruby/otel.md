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

## Overview

There are a few reasons to manually instrument your applications with the OpenTelemetry API:

- You are not using Datadog supported library instrumentation.
- You want to extend the Datadog SDK's functionality.
- You need finer control over instrumenting your applications.

The Datadog SDK provides several techniques to help you achieve these goals. The following sections demonstrate how to use the OpenTelemetry API for custom instrumentation to use with Datadog.

## Requirements and limitations

- Datadog Ruby tracing library `dd-trace-rb` version 1.9.0 or greater.
- Gem version support 1.1.0 or greater.

The following OpenTelemetry features implemented in the Datadog library as noted:

| Feature                               | Support notes                       |
|---------------------------------------|--------------------------------------|
| OpenTelemetry Context propagation         | Datadog and W3C Trace Context header formats are enabled by default. |
| Span processors                  | Unsupported                                          |
| Span Exporters                   | Unsupported                                            |
| `OpenTelemetry.logger`                | `OpenTelemetry.logger` is set to the same object as `Datadog.logger`. Configure through custom logging. |
| Trace/span ID generators         | ID generation is performed by the tracing library, with support for 128-bit trace IDs.     |

## Configuring OpenTelemetry to use the Datadog tracing library

1. Add your desired manual OpenTelemetry instrumentation to your Ruby code following the [OpenTelemetry Ruby Manual Instrumentation documentation][140]. **Important!** Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

2. Add the `datadog` gem to your Gemfile:
    ```ruby
    source 'https://rubygems.org'
    gem 'datadog' # For dd-trace-rb v1.x, use the `ddtrace` gem.
    ```

3. Install the gem by running `bundle install`.

4. Add the following lines to your OpenTelemetry configuration file:
    ```ruby
    require 'opentelemetry/sdk'
    require 'datadog/opentelemetry'
    ```

5. Add a configuration block to your application:
    ```ruby
    Datadog.configure do |c|
      ...
    end
    ```

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It supports [integration instrumentation][141] and [OpenTelemetry Automatic instrumentation][142] also.

## Adding span events

<div class="alert alert-info">Adding span events requires SDK version 2.3.0 or higher.</div>

You can add span events using the `add_event` API:

```ruby
span.add_event('Event With No Attributes')
span.add_event(
  'Event With All Attributes',
  attributes: { 'int_val' => 1, 'string_val' => 'two', 'int_array' => [3, 4], 'string_array' => ['5', '6'], 'bool_array' => [false, true]}
)
```

Read the [OpenTelemetry specification for adding events][103] for more information.

### Recording exceptions

To record exceptions, use the `record_exception` API:

```ruby
span.record_exception(
  StandardError.new('Error Message')
)
span.record_exception(
  StandardError.new('Error Message'),
  attributes: { 'status' => 'failed' }
)
```

Read the [OpenTelemetry specification for recording exceptions][104] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[103]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[104]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception
[140]: https://opentelemetry.io/docs/instrumentation/ruby/manual/
[141]: /tracing/trace_collection/dd_libraries/ruby#integration-instrumentation
[142]: https://opentelemetry.io/docs/languages/ruby/libraries/
