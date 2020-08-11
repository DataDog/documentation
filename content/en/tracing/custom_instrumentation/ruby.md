---
title: Ruby Custom Instrumentation
kind: documentation
aliases:
    - /tracing/opentracing/ruby
    - /tracing/manual_instrumentation/ruby
description: 'Manually instrument your Ruby application to send custom traces to Datadog.'
further_reading:
    - link: 'tracing/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---
<div class="alert alert-info">
If you have not yet read the instructions for auto-instrumentation and setup, please start with the <a href="https://docs.datadoghq.com/tracing/setup/ruby/">Ruby Setup Instructions</a>.
</div>

This page details common use cases for adding and customizing observability with Datadog APM.

## Adding Tags

Add custom [span tags][1] to your [spans][2] to customize your observability within Datadog.  The span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, or user ID.

### Add custom span tags

Add custom tags to your spans corresponding to any dynamic value within your application code such as `customer.id`.

{{< tabs >}}
{{% tab "Active Span" %}}
Access the current active [span][1] from any method within your code. **Note**: If the method is called and there is no span currently active, `active_span` is `nil`.

```ruby
require 'ddtrace'

# get '/shopping_cart/:customer_id', to: 'shopping_cart#index'
class ShoppingCartController < ApplicationController
  # GET /shopping_cart
  def index
    # Get the active span
    current_span = Datadog.tracer.active_span
    # customer_id -> 254889
    current_span.set_tag('customer.id', params.permit([:customer_id])) unless current_span.nil?

    # [...]
  end

  # POST /shopping_cart
  def create
    # [...]
  end
end
```

[1]: /tracing/visualization/#spans
{{% /tab %}}

{{% tab "Manually Instrumented Spans" %}}

Add [tags][1] directly to `Datadog::Span` objects by calling `#set_tag`:

```ruby
# An example of a Sinatra endpoint,
# with Datadog tracing around the request.
get '/posts' do
  Datadog.tracer.trace('web.request') do |span|
    span.set_tag('http.url', request.path)
    span.set_tag('<TAG_KEY>', '<TAG_VALUE>')
  end
end
```


[1]: /tracing/visualization/#span-tags
{{% /tab %}}
{{< /tabs >}}

### Adding tags globally to all spans

Add [tags][1] to all [spans][2] by configuring the tracer with the `tags` option:

```ruby
Datadog.configure do |c|
  c.tags = { 'team' => 'qa' }
end
```

You can also use the `DD_TAGS` environment variable to set tags on all spans for an application. For more information on Ruby environment variables, refer to the [setup documentation][3].

### Setting Errors on a Span

There are two ways to set an error on a span

- The first is to simply call `span.set_error` and pass in the Exception Object.
- This will automatically extract the error type, message, and backtrace.

```ruby
require 'ddtrace'
require 'timeout'

def example_method
  span = Datadog.tracer.trace('example.trace')
  puts 'some work'
  sleep(1)
  raise StandardError.new "This is an exception"
rescue StandardError => error
  span = Datadog.tracer.active_span
  span.set_error(error) unless span.nil?
  raise error
ensure
  span.finish
end

example_method()
```

- The second is to use `tracer.trace` which will by default set the error type, message, and backtrace.
- To configure this behavior you can use the `on_error` option, which is the Handler invoked when a block is provided to `trace`, and the block raises an error.
- The Proc is provided `span` and `error` as arguments.
- By default, `on_error` Sets error on the span.

Default Behavior: `on_error`

```ruby
require 'ddtrace'
require 'timeout'

def example_method
  puts 'some work'
  sleep(1)
  raise StandardError.new "This is a exception"
end

Datadog.tracer.trace('example.trace', on_error: custom_error_handler) do |span|
  example_method()
end
```

Custom Behavior: `on_error`

```ruby
require 'ddtrace'
require 'timeout'

def example_method
  puts 'some work'
  sleep(1)
  raise StandardError.new "This is a special exception"
end

custom_error_handler = proc do |span, error|
  span.set_tag('custom_tag', 'custom_value')
  span.set_error(error) unless error.message.include?("a special exception")
end

Datadog.tracer.trace('example.trace', on_error: custom_error_handler) do |span|
  example_method()
end
```


## Adding Spans

If you aren't using supported library instrumentation (see [library compatibility][4]), you may want to to manually instrument your code. Adding tracing to your code is easy using the `Datadog.tracer.trace` method, which you can wrap around any Ruby code:

To trace any Ruby code, you can use the `Datadog.tracer.trace` method:

```ruby
Datadog.tracer.trace(name, options) do |span|
  # Wrap this block around the code you want to instrument
  # Additionally, you can modify the span here.
  # e.g. Change the resource name, set tags, etc...
end
```

Where `name` should be a `String` that describes the generic kind of operation being done (e.g. `'web.request'`, or `'request.parse'`)

And `options` is an optional `Hash` that accepts the following parameters:

| Key | Type | Description | Default |
| --- | --- | --- | --- |
| `service`     | `String` | The service name which this span belongs (e.g. `'my-web-service'`) | Tracer `default-service`, `$PROGRAM_NAME` or `'ruby'` |
| `resource`    | `String` | Name of the resource or action being operated on. Traces with the same resource value will be grouped together for the purpose of metrics (but still independently viewable.) Usually domain specific, such as a URL, query, request, etc. (e.g. `'Article#submit'`, `http://example.com/articles/list`.) | `name` of Span. |
| `span_type`   | `String` | The type of the span (such as `'http'`, `'db'`, etc.) | `nil` |
| `child_of`    | `Datadog::Span` / `Datadog::Context` | Parent for this span. If not provided, will automatically become current active span. | `nil` |
| `start_time`  | `Integer` | When the span actually starts. Useful when tracing events that have already happened. | `Time.now.utc` |
| `tags`        | `Hash` | Extra tags which should be added to the span. | `{}` |
| `on_error`    | `Proc` | Handler invoked when a block is provided to trace, and it raises an error. Provided `span` and `error` as arguments. Sets error on the span by default. | `proc { |span, error| span.set_error(error) unless span.nil? }` |

It's highly recommended you set both `service` and `resource` at a minimum. Spans without a `service` or `resource` as `nil` will be discarded by the Datadog agent.


### Manually creating a new span

Programmatically create spans around any block of code.  Spans created in this manner integrate with other tracing mechanisms automatically. In other words, if a trace has already started, the manual span will have its caller as its parent span. Similarly, any traced methods called from the wrapped block of code will have the manual span as its parent.

```ruby
# An example of a Sinatra endpoint,
# with Datadog tracing around the request,
# database query, and rendering steps.
get '/posts' do
  Datadog.tracer.trace('web.request', service: '<SERVICE_NAME>', resource: 'GET /posts') do |span|
    # Trace the activerecord call
    Datadog.tracer.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # Add some APM tags
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # Trace the template rendering
    Datadog.tracer.trace('template.render') do
      erb :index
    end
  end
end
```


### Post-Processing Traces

Some applications might require that traces be altered or filtered out before they are sent upstream. The processing pipeline allows users to create *processors* to define such behavior.

Processors can be any object that responds to `#call` accepting `trace` as an argument (which is an `Array` of `Datadog::Span`s.)

For example:

```ruby
lambda_processor = ->(trace) do
  # Processing logic...
  trace
end

class MyCustomProcessor
  def call(trace)
    # Processing logic...
    trace
  end
end
custom_processor = MyFancyProcessor.new
```

`#call` blocks of processors *must* return the `trace` object; this return value will be passed to the next processor in the pipeline.

These processors must then be added to the pipeline via `Datadog::Pipeline.before_flush`:

```ruby
Datadog::Pipeline.before_flush(lambda_processor, custom_processor)
```

You can also define processors using the short-hand block syntax for `Datadog::Pipeline.before_flush`:

```ruby
Datadog::Pipeline.before_flush do |trace|
  trace.delete_if { |span| span.name =~ /forbidden/ }
end
```

#### Filtering

You can use the `Datadog::Pipeline::SpanFilter` processor to remove spans, when the block evaluates as truthy:

```ruby
Datadog::Pipeline.before_flush(
  # Remove spans that match a particular resource
  Datadog::Pipeline::SpanFilter.new { |span| span.resource =~ /PingController/ },
  # Remove spans that are trafficked to localhost
  Datadog::Pipeline::SpanFilter.new { |span| span.get_tag('host') == 'localhost' }
)
```

#### Processing

You can use the `Datadog::Pipeline::SpanProcessor` processor to modify spans:

```ruby
Datadog::Pipeline.before_flush(
  # Strip matching text from the resource field
  Datadog::Pipeline::SpanProcessor.new { |span| span.resource.gsub!(/password=.*/, '') }
)
```

## Trace Client & Agent Configuration

There are additional configurations possible for both the tracing client and Datadog Agent for context propagation with B3 Headers, as well as to exclude specific Resources from sending traces to Datadog in the event these traces are not wanted to count in metrics calculated, such as Health Checks.


### B3 Headers Extraction and Injection

Datadog APM tracer supports [B3 headers extraction][5] and injection for distributed tracing.

Distributed headers injection and extraction is controlled by configuring injection/extraction styles. Currently two styles are supported:

- Datadog: `Datadog`
- B3: `B3`

Injection styles can be configured using:

- Environment Variable: `DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

The value of the environment variable is a comma separated list of header styles that are enabled for injection. By default only Datadog injection style is enabled.

Extraction styles can be configured using:

- Environment Variable: `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

The value of the environment variable is a comma separated list of header styles that are enabled for extraction. By default only Datadog extraction style is enabled.

If multiple extraction styles are enabled extraction attempt is done on the order those styles are configured and first successful extracted value is used.

### Resource Filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog.  This and other security and fine-tuning configurations can be found on the [Security][6] page.

## OpenTracing

To set up Datadog with OpenTracing, see the Ruby [Quickstart for OpenTracing][7] for details.

### Configuring Datadog tracer settings

The underlying Datadog tracer can be configured by passing options (which match `Datadog::Tracer`) when configuring the global tracer:

```ruby
# Where `options` is a Hash of options provided to Datadog::Tracer
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(options)
```

It can also be configured by using `Datadog.configure` as described in the [Ruby tracer settings][8] section.

### Activating and configuring integrations

By default, configuring OpenTracing with Datadog does not automatically activate any additional instrumentation provided by Datadog. You will only receive [spans][2] and [traces][9] from OpenTracing instrumentation you have in your application.

However, additional instrumentation provided by Datadog can be activated alongside OpenTracing using `Datadog.configure`, which can be used to enhance your tracing further. To enable this, see [Ruby integration instrumentation][10] for more details.

### Supported serialization formats

| Type                           | Supported? | Additional information                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | Yes        |                                                                                                                                                                                                                                                                                                               |
| `OpenTracing::FORMAT_RACK`     | Yes        | Because of the loss of resolution in the Rack format, note that baggage items with names containing either upper case characters or `-` are be converted to lower case and `_` in a round-trip, respectively. Datadog recommends avoiding these characters or accommodating accordingly on the receiving end. |
| `OpenTracing::FORMAT_BINARY`   | No         |                                                                                                                                                                                                                                                                                                               |

## OpenTelemetry

OpenTelemetry support is available by using the `opentelemetry-exporters-datadog` gem to export traces from OpenTelemetry to Datadog.

<div class="alert alert-warning">
This feature is currently in beta. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> if it doesn't work as you expect.
</div>

### Installation

- If you use [bundler][11], include the following in your `Gemfile`:

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

### Configuration Options

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

### OpenTelemetry Links

- See [rubygems][12] or [github][13] for more OpenTelemetry Ruby Datadog Exporter usage.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
[3]: /tracing/setup/ruby/#environment-and-tags
[4]: /tracing/compatibility_requirements/ruby/
[5]: https://github.com/openzipkin/b3-propagation
[6]: /tracing/security
[7]: /tracing/setup/ruby/#quickstart-for-opentracing
[8]: /tracing/setup/ruby/#tracer-settings
[9]: /tracing/visualization/#trace
[10]: /tracing/setup/ruby/#integration-instrumentation
[11]: https://bundler.io
[12]: https://rubygems.org/gems/opentelemetry-exporters-datadog
[13]: https://github.com/DataDog/dd-opentelemetry-exporter-ruby
