---
title: Ruby Open Standards
kind: documentation
description: 'Open Standards for Ruby'
code_lang: ruby
type: multi-code-lang
code_lang_weight: 20
---

## OpenTracing

To set up Datadog with OpenTracing, see the Ruby [Quickstart for OpenTracing][1] for details.

### Configuring Datadog tracer settings

The underlying Datadog tracer can be configured by passing options (which match `Datadog::Tracer`) when configuring the global tracer:

```ruby
# Where `options` is a Hash of options provided to Datadog::Tracer
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(options)
```

It can also be configured by using `Datadog.configure` as described in the [Ruby tracer settings][2] section.

### Activating and configuring integrations

By default, configuring OpenTracing with Datadog does not automatically activate any additional instrumentation provided by Datadog. You will only receive [spans][3] and [traces][4] from OpenTracing instrumentation you have in your application.

However, additional instrumentation provided by Datadog can be activated alongside OpenTracing using `Datadog.configure`, which can be used to enhance your tracing further. To enable this, see [Ruby integration instrumentation][5] for more details.

### Supported serialization formats

| Type                           | Supported? | Additional information                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | Yes        |                                                                                                                                                                                                                                                                                                               |
| `OpenTracing::FORMAT_RACK`     | Yes        | Because of the loss of resolution in the Rack format, note that baggage items with names containing either upper case characters or `-` are be converted to lower case and `_` in a round-trip, respectively. Datadog recommends avoiding these characters or accommodating accordingly on the receiving end. |
| `OpenTracing::FORMAT_BINARY`   | No         |                                                                                                                                                                                                                                                                                                               |

## OpenTelemetry

<div class="alert alert-warning">
This exporter is deprecated. To export your OTLP traces from OpenTelemetry SDK directly to Datadog Agent, see <a href="/tracing/setup_overview/open_standards/#otlp-ingest-in-datadog-agent">OTLP Ingest in the Agent</a>. <a href="/help/">Reach out to support</a> for questions.
</div>

OpenTelemetry support is available by using the `opentelemetry-exporters-datadog` gem to export traces from OpenTelemetry to Datadog.

### Installation

- If you use [bundler][6], include the following in your `Gemfile`:

```
gem 'opentelemetry-exporters-datadog'
gem 'opentelemetry-api', '~> 0.5'
gem 'opentelemetry-sdk', '~> 0.5'
```

- Or install the gems directly using:

```
gem install opentelemetry-api
gem install opentelemetry-sdk
gem install opentelemetry-exporters-datadog
```

### Usage

Install the Datadog processor and exporter in your application and configure the options. Then use the OpenTelemetry interfaces to produce traces and other information:

```ruby
require 'opentelemetry/sdk'
require 'opentelemetry-exporters-datadog'

# Configure the SDK with custom export
OpenTelemetry::SDK.configure do |c|
  c.add_span_processor(
    OpenTelemetry::Exporters::Datadog::DatadogSpanProcessor.new(
      OpenTelemetry::Exporters::Datadog::Exporter.new(
        service_name: 'my_service', agent_url: 'http://localhost:8126'
      )
    )
  )
end

# For propagation of Datadog-specific distributed tracing headers,
# set HTTP propagation to the Composite Propagator
OpenTelemetry::Exporters::Datadog::Propagator.auto_configure

# To start a trace, get a Tracer from the TracerProvider
tracer = OpenTelemetry.tracer_provider.tracer('my_app_or_gem', '0.1.0')

# create a span
tracer.in_span('foo') do |span|
  # set an attribute
  span.set_attribute('platform', 'osx')
  # add an event
  span.add_event(name: 'event in bar')
  # create bar as child of foo
  tracer.in_span('bar') do |child_span|
    # inspect the span
    pp child_span
  end
end
```

### Configuration options

The Datadog Agent URL and span tag values can be configured if necessary or desired based upon your environment and Agent location.

#### Datadog Agent URL

By default, the OpenTelemetry Datadog Exporter sends traces to `http://localhost:8126`. Send traces to a different URL by configuring the following environment variables:

- `DD_TRACE_AGENT_URL`: The `<host>:<port>` where Datadog Agent is listening for traces, for example, `http://agent-host:8126`.

You can override these values at the trace exporter level:

```ruby
# Configure the SDK with custom export
OpenTelemetry::SDK.configure do |c|
  c.add_span_processor(
    OpenTelemetry::Exporters::Datadog::DatadogSpanProcessor.new(
      OpenTelemetry::Exporters::Datadog::Exporter.new(
        service_name: 'my_service',
        agent_url: 'http://dd-agent:8126',
      )
    )
  )
end
```

#### Tagging

Configure the application to automatically tag your Datadog exported traces by setting the following environment variables:

- `DD_ENV`: Your application environment, for example `production`, `staging`.
- `DD_SERVICE`: Your application's default service name, for example, `billing-api`.
- `DD_VERSION`: Your application version, for example, `2.5`, `202003181415`, or `1.3-alpha`.
- `DD_TAGS`: Custom tags in value pairs, separated by commas, for example, `layer:api,team:intake`.
- If `DD_ENV`, `DD_SERVICE`, or `DD_VERSION` is set, it will override any corresponding `env`, `service`, or `version` tag defined in `DD_TAGS`.
- If `DD_ENV`, `DD_SERVICE` and `DD_VERSION` are _not_ set, you can configure environment, service, and version by using corresponding tags in `DD_TAGS`.

Tag values can also be overridden at the trace exporter level. This lets you set values on a per-application basis, so you can have multiple applications reporting for different environments on the same host:

```ruby
# Configure the SDK with custom export
OpenTelemetry::SDK.configure do |c|
  c.add_span_processor(
    OpenTelemetry::Exporters::Datadog::DatadogSpanProcessor.new(
      OpenTelemetry::Exporters::Datadog::Exporter.new(
        service_name: 'my_service',
        agent_url: 'http://localhost:8126',
        env: 'prod',
        version: '1.5-alpha',
        tags: 'team:ops,region:west'
      )
    )
  )
end
```

Tags that are set directly on individual spans supersede conflicting tags defined at the application level.

### OpenTelemetry links

- See [rubygems][7] or [github][8] for more OpenTelemetry Ruby Datadog Exporter usage.

[1]: /tracing/setup/ruby/#quickstart-for-opentracing
[2]: /tracing/setup/ruby/#tracer-settings
[3]: /tracing/visualization/#spans
[4]: /tracing/visualization/#trace
[5]: /tracing/setup/ruby/#integration-instrumentation
[6]: https://bundler.io
[7]: https://rubygems.org/gems/opentelemetry-exporters-datadog
[8]: https://github.com/DataDog/dd-opentelemetry-exporter-ruby
