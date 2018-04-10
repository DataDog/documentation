---
title: Tracing Ruby Applications
kind: Documentation
aliases:
- /tracing/ruby/
- /tracing/languages/ruby/
further_reading:
- link: "https://github.com/DataDog/dd-trace-rb"
  tag: "Github"
  text: Source code
- link: "https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md"
  tag: "Documentation"
  text: API documentation
- link: "http://gems.datadoghq.com/trace/docs/"
  tag: "Rubydoc"
  text: Gem documentation
- link: "tracing/visualization/"
  tag: "Use the APM UI"
  text: "Explore your services, resources and traces"
---

## Getting started

For configuration instructions, and details about using the API, check out our [API documentation][api docs] and [gem documentation][gem docs].

For descriptions of terminology used in APM, take a look at the [official documentation][visualization docs].

For details about contributing, check out the [development guide][development docs].

[api docs]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md
[gem docs]: http://gems.datadoghq.com/trace/docs/
[visualization docs]: https://docs.datadoghq.com/tracing/visualization/
[development docs]: https://github.com/DataDog/dd-trace-rb/blob/master/README.md#development

## Installation

The following steps will help you quickly start tracing your Ruby application.

### Setup the Datadog Agent

The Ruby APM tracer sends trace data through the Datadog Agent.

[Install and configure the Datadog Agent][1], see additional documentation for [tracing Docker applications][2].

### Quickstart for Rails applications

1. Add the `ddtrace` gem to your Gemfile:
    
    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace'
    ```

2. Install the gem with `bundle install`
3. Create a `config/initializers/datadog.rb` file containing:

    ```ruby
    Datadog.configure do |c|
      # This will activate auto-instrumentation for Rails
      c.use :rails
    end
    ```

### Quickstart for other Ruby applications

1. Install the gem with `gem install ddtrace`
2. Include the Ruby application with:

    ```ruby
    require 'ddtrace'
    Datadog.configure do |c|
      # Configure the tracer here.
      # Activate integrations, change tracer settings, etc...
      # By default without additional configuration, nothing will be traced.
    end
    ```

3. Add manual instrumentation around your code (see [Manual instrumentation](#manual-instrumentation))

### Final steps for installation

After setting up, your services will appear on the [APM services page][3] within a few minutes. Learn more about [using the APM UI][4].

## Configuration

To activate more advanced features, change tracer behavior, or trace additional code, you must add additional configuration.

### Manual instrumentation

If you aren't using supported library instrumentation (see [Library compatibility](#library-compatibility)), you may want to to manually instrument your code. Adding tracing to your code is easy using the `Datadog.tracer.trace` method, which you can wrap around any Ruby code.

**Example**

```ruby
require 'ddtrace'
require 'sinatra'
require 'active_record'

get '/home' do
  # Wrap around the code you'd like to trace
  # Provide a name for the trace (usually a generic kind of action) (required)
  # Yields a Datadog::Span object which describes the action being traced
  Datadog.tracer.trace('web.request') do |span|

    # Name of the service the trace should be categorized under.
    # Required.
    span.service = 'my-web-site'

    # Name of the application-specific action being traced (usually a path, or job)
    # Required.
    span.resource = '/home'

    # Add any metadata tags to the span
    # Optional.
    span.set_tag('http.method', request.request_method)

    # Trace a database request
    # This span will be nested within the parent trace.
    tracer.trace('posts.fetch') do |database_span|
      span.service = 'my-database'
      span.resource = 'Posts'
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # Trace template rendering
    # This span will be a sibling to the database span.
    tracer.trace('template.render') do |template_span|
      span.service = 'my-template'
      span.resource = 'index'
      erb :index
    end
  end
end
```

For more details about manual instrumentation, check out the [API documentation][5].

### Integration instrumentation

APM provides out-of-the-box support for many popular integrations. Although none are active by default, you can easily activate them in `Datadog.configure`.

**Example**

```ruby
require 'ddtrace'
require 'sinatra'
require 'active_record'

Datadog.configure do |c|
  c.use :sinatra
  c.use :active_record
end

# Now write your code naturally, it's traced automatically.
get '/home' do
  @posts = Posts.order(created_at: :desc).limit(10)
  erb :index
end
```

For list of available integrations, see [Library compatibility](#library-compatibility).

### Tracer settings

**Enabling/disabling**

Tracing is enabled by default. To disable it (i.e. in a test environment):

```ruby
Datadog.configure do |c|
  c.tracer enabled: false
end
```

**Debug mode**

Debug mode is disabled by default. To enable:

```ruby
Datadog.configure do |c|
  c.tracer debug: true
end
```

For more tracer settings, check out the [API documentation][6].

### Priority sampling

Priority sampling allows you to configure which traces are most important and should be kept after sampling.

Priority sampling is disabled by default. For more details about how to activate and configure priority sampling, check out the [API documentation][7].

### Distributed tracing

Distributed tracing allows you to propagate a single trace across multiple services, so you can see performance end-to-end.

Distributed tracing is disabled by default. For more details about how to activate and configure distributed tracing, check out the [API documentation][8].

### Processing pipeline

The processing pipeline allows you to modify traces before they are sent to the agent. This can be useful for customizing trace content or removing unwanted traces.

It provides **filtering** for removing spans that match certain criteria, and **processing** for modifying spans.

For more details about how to activate and configure the processing pipeline, check out the [API documentation][9].

## Compatibility

### Interpreter Compatibility

Ruby APM includes support for the following Ruby interpreters:

___

{{% table responsive="true" %}}
| Type  | Documentation              | Version | Support type |
| ----- | -------------------------- | -----   | ------------ |
| MRI   | https://www.ruby-lang.org/ | 1.9.1   | Experimental |
|       |                            | 1.9.3   | Full         |
|       |                            | 2.0     | Full         |
|       |                            | 2.1     | Full         |
|       |                            | 2.2     | Full         |
|       |                            | 2.3     | Full         |
|       |                            | 2.4     | Full         |
| JRuby | http://jruby.org/          | 9.1.5   | Experimental |
{{% /table %}}

*Full* support indicates all tracer features are available.

*Experimental* indicates most features should be available, but unverified.

### Web server compatibility

Ruby APM includes support for the following web servers:

___

{{% table responsive="true" %}}
| Type      | Documentation                     | Version      | Support type |
| --------- | --------------------------------- | ------------ | ------------ |
| Puma      | http://puma.io/                   | 2.16+ / 3.6+ | Full         |
| Unicorn   | https://bogomips.org/unicorn/     | 4.8+ / 5.1+  | Full         |
| Passenger | https://www.phusionpassenger.com/ | 5.0+         | Full         |
{{% /table %}}

### Library compatibility

Ruby APM includes support for the following libraries and frameworks:

___

{{% table responsive="true" %}}
| Library       | Library Documentation                                                | Datadog Instrumentation Documentation                                                    |
|---------------|----------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| ActiveRecord  | https://github.com/rails/rails/tree/master/activerecord              | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#active-record  |
| AWS           | https://aws.amazon.com/sdk-for-ruby/                                 | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#aws            |
| Dalli         | https://github.com/petergoldstein/dalli                              | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#dalli          |
| Elasticsearch | https://www.elastic.co/products/elasticsearch                        | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#elastic-search |
| Faraday       | https://github.com/lostisland/faraday                                | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#faraday        |
| Grape         | http://www.ruby-grape.org/                                           | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#grape          |
| GraphQL       | https://github.com/rmosolgo/graphql-ruby                             | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#graphql        |
| MongoDB       | http://api.mongodb.com/ruby/current/                                 | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#mongodb        |
| Net/HTTP      | https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#nethttp        |
| Racecar       | https://github.com/zendesk/racecar                                   | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#racecar        |
| Rack          | https://rack.github.io/                                              | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rack           |
| Rails         | http://rubyonrails.org/                                              | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rails          |
| Redis         | https://github.com/redis/redis-rb                                    | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#redis          |
| Resque        | https://github.com/resque/resque                                     | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#resque         |
| Sidekiq       | https://sidekiq.org/                                                 | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sidekiq        |
| Sinatra       | http://www.sinatrarb.com/                                            | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sinatra        |
| SuckerPunch   | https://github.com/brandonhilkert/sucker_punch                       | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sucker-punch   |
{{% /table %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup
[2]: /tracing/setup/docker/
[3]: https://app.datadoghq.com/apm/services
[4]: https://docs.datadoghq.com/tracing/visualization/
[5]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#manual-instrumentation
[6]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#tracer-settings
[7]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#priority-sampling
[8]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#distributed-tracing
[9]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#processing-pipeline
