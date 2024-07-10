---
title: Ruby Custom Instrumentation using Datadog API
aliases:
    - /tracing/opentracing/ruby
    - /tracing/manual_instrumentation/ruby
    - /tracing/custom_instrumentation/ruby
    - /tracing/setup_overview/custom_instrumentation/ruby
    - /tracing/trace_collection/custom_instrumentation/ruby
    - /tracing/trace_collection/custom_instrumentation/dd_libraries/ruby
description: 'Manually instrument your Ruby application to send custom traces to Datadog.'
code_lang: dd-api
type: multi-code-lang
code_lang_weight: 1
further_reading:
    - link: 'tracing/other_telemetry/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---
<div class="alert alert-info">
If you have not yet read the instructions for auto-instrumentation and setup, read the <a href="https://docs.datadoghq.com/tracing/setup/ruby/">Ruby Setup Instructions</a>.
</div>

This page details describes use cases for adding and customizing observability with Datadog APM.

## Requirements

Make sure you require the appropriate gem for your [Ruby tracer version][8]:

- For v2.x, require the `datadog` gem:
  ```ruby
  require 'datadog'
  ```

- For v1.x, require the `ddtrace` gem:
  ```ruby
  require 'ddtrace'
  ```

## Adding tags

Add custom [span tags][1] to your [spans][2] to customize your observability within Datadog. The span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, or user ID.

### Add custom span tags

Add custom tags to your spans corresponding to any dynamic value within your application code such as `customer.id`.

#### Active spans

Access the current active [span][1] from any method within your code. 

**Note**: If the method is called and there is no active span, `active_span` is `nil`.

```ruby
# get '/shopping_cart/:customer_id', to: 'shopping_cart#index'
class ShoppingCartController < ApplicationController
  # GET /shopping_cart
  def index
    # Get the active span and set customer_id -> 254889
    Datadog::Tracing.active_span&.set_tag('customer.id', params.permit([:customer_id]))

    # [...]
  end

  # POST /shopping_cart
  def create
    # [...]
  end
end
```

#### Manually instrumented spans

Add [tags][1] directly to `Datadog::Span` objects by calling `#set_tag`:

```ruby
# An example of a Sinatra endpoint,
# with Datadog tracing around the request.
get '/posts' do
  Datadog::Tracing.trace('web.request') do |span|
    span.set_tag('http.url', request.path)
    span.set_tag('<TAG_KEY>', '<TAG_VALUE>')
  end
end
```

[1]: /tracing/glossary/#span-tags


### Adding tags globally to all spans

Add [tags][1] to all [spans][2] by configuring the tracer with the `tags` option:

```ruby
Datadog.configure do |c|
  c.tags = { 'team' => 'qa' }
end
```

You can also use the `DD_TAGS` environment variable to set tags on all spans for an application. For more information on Ruby environment variables, read the [setup documentation][3].

### Setting errors on a span

There are two ways to set an error on a span:

- Call `span.set_error` and pass in the Exception Object. This automatically extracts the error type, message, and backtrace.

```ruby
require 'timeout'

def example_method
  span = Datadog::Tracing.trace('example.trace')
  puts 'some work'
  sleep(1)
  raise StandardError, "This is an exception"
rescue StandardError => error
  Datadog::Tracing.active_span&.set_error(error)
  raise
ensure
  span.finish
end

example_method()
```

- Or, use `tracer.trace` which by default sets the error type, message, and backtrace. To configure this behavior you can use the `on_error` option, which is the Handler invoked when a block is provided to `trace`, and the block raises an error. The Proc is provided `span` and `error` as arguments. By default, `on_error` sets error on the span.

Default behavior for `on_error`:

```ruby
require 'timeout'

def example_method
  puts 'some work'
  sleep(1)
  raise StandardError, "This is an exception"
end

Datadog::Tracing.trace('example.trace') do |span|
  example_method()
end
```

Custom behavior for `on_error`:

```ruby
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

Datadog::Tracing.trace('example.trace', on_error: custom_error_handler) do |span|
  example_method()
end
```

## Adding spans

If you aren't using supported library instrumentation (see [library compatibility][4]), you can manually instrument your code. Add tracing to your code by using the `Datadog::Tracing.trace` method, which you can wrap around any Ruby code.

To trace any Ruby code, you can use the `Datadog::Tracing.trace` method:

```ruby
Datadog::Tracing.trace(name, resource: resource, **options) do |span|
  # Wrap this block around the code you want to instrument
  # Additionally, you can modify the span here.
  # for example, change the resource name, or set tags
end
```

Where `name` is a `String` that describes the generic kind of operation being done (for example `'web.request'`, or `'request.parse'`).

`resource` is a `String` with the name of the action being operated on. Traces with the same resource value will be grouped together for the purpose of metrics. Resources are usually domain specific, such as a URL, query, request, etc. (e.g. 'Article#submit', http://example.com/articles/list.)

For all the available `**options`, see the [reference guide][5].

### Manually creating a new span

Programmatically create spans around any block of code. Spans created in this manner integrate with other tracing mechanisms automatically. In other words, if a trace has already started, the manual span will have its caller as its parent span. Similarly, any traced methods called from the wrapped block of code will have the manual span as its parent.

```ruby
# An example of a Sinatra endpoint,
# with Datadog tracing around the request,
# database query, and rendering steps.
get '/posts' do
  Datadog::Tracing.trace('web.request', service: '<SERVICE_NAME>', resource: 'GET /posts') do |span|
    # Trace the activerecord call
    Datadog::Tracing.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # Add some APM tags
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # Trace the template rendering
    Datadog::Tracing.trace('template.render') do
      erb :index
    end
  end
end
```

### Post-processing traces

Some applications might require that traces be altered or filtered out before they are sent to Datadog. The processing pipeline allows you to create *processors* to define such behavior.

#### Filtering

You can use the `Datadog::Tracing::Pipeline::SpanFilter` processor to remove spans, when the block evaluates as truthy:

```ruby
Datadog::Tracing.before_flush(
  # Remove spans that match a particular resource
  Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.resource =~ /PingController/ },
  # Remove spans that are trafficked to localhost
  Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.get_tag('host') == 'localhost' }
)
```

#### Processing

You can use the `Datadog::Tracing::Pipeline::SpanProcessor` processor to modify spans:

```ruby
Datadog::Tracing.before_flush(
  # Strip matching text from the resource field
  Datadog::Tracing::Pipeline::SpanProcessor.new { |span| span.resource.gsub!(/password=.*/, '') }
)
```

#### Custom processor

Processors can be any object that responds to `#call` accepting `trace` as an argument (which is an `Array` of `Datadog::Span`.)

For example, using the short-hand block syntax:

```ruby
Datadog::Tracing.before_flush do |trace|
   # Processing logic...
   trace
end
```

The following example implements a processor to achieve complex post-processing logic:

```ruby
Datadog::Tracing.before_flush do |trace|
  trace.spans.each do |span|
    originalPrice = span.get_tag('order.price'))
    discount = span.get_tag('order.discount'))
    
    # Set a tag from a calculation from other tags
    if (originalPrice != nil && discount != nil)
      span.set_tag('order.value', originalPrice - discount)
    end
  end
  trace
end
```

For a custom processor class:

```ruby
class MyCustomProcessor
  def call(trace)
    # Processing logic...
    trace
  end
end

Datadog::Tracing.before_flush(MyCustomProcessor.new)
```

In both cases, the processor method *must* return the `trace` object; this return value will be passed to the next processor in the pipeline.


## Trace client and Agent configuration

There are additional configurations possible for both the tracing client and Datadog Agent for context propagation with B3 Headers, as well as to exclude specific Resources from sending traces to Datadog in the event these traces are not wanted to count in metrics calculated, such as Health Checks.

### Propagating context with headers extraction and injection

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][6] for information.


### Resource filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog. This and other security and fine-tuning configurations can be found on the [Security][7] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#span-tags
[2]: /tracing/glossary/#spans
[3]: /tracing/setup/ruby/#environment-and-tags
[4]: /tracing/compatibility_requirements/ruby/
[5]: /tracing/trace_collection/dd_libraries/ruby/#manual-instrumentation
[6]: /tracing/trace_collection/trace_context_propagation/ruby/
[7]: /tracing/security
[8]: https://github.com/DataDog/dd-trace-rb/releases