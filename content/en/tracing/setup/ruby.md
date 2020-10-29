---
aliases:
- /tracing/ruby/
- /tracing/languages/ruby/
- /agent/apm/ruby/
- /tracing/setup/ruby/
dependencies:
- https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md
kind: documentation
title: Tracing Ruby Applications
---
`ddtrace` is Datadog’s tracing client for Ruby. It is used to trace requests as they flow across web servers,
databases and microservices so that developers have high visibility into bottlenecks and troublesome requests.

## Getting started

For the general APM documentation, see our [setup documentation][setup docs].

For more information about what APM looks like once your application is sending information to Datadog, take a look at [Visualizing your APM data][visualization docs].

To contribute, check out the [contribution guidelines][contribution docs] and [development guide][development docs].

[setup docs]: https://docs.datadoghq.com/tracing/
[development docs]: https://github.com/DataDog/dd-trace-rb/blob/master/README.md#development
[visualization docs]: https://docs.datadoghq.com/tracing/visualization/
[contribution docs]: https://github.com/DataDog/dd-trace-rb/blob/master/CONTRIBUTING.md
[development docs]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/DevelopmentGuide.md

## Table of Contents

 - [Compatibility](#compatibility)
 - [Installation](#installation)
     - [Quickstart for Rails applications](#quickstart-for-rails-applications)
     - [Quickstart for Ruby applications](#quickstart-for-ruby-applications)
     - [Quickstart for OpenTracing](#quickstart-for-opentracing)
 - [Manual instrumentation](#manual-instrumentation)
 - [Integration instrumentation](#integration-instrumentation)
     - [Action Cable](#action-cable)
     - [Action View](#action-view)
     - [Active Model Serializers](#active-model-serializers)
     - [Action Pack](#action-pack)
     - [Active Record](#active-record)
     - [Active Support](#active-support)
     - [AWS](#aws)
     - [Concurrent Ruby](#concurrent-ruby)
     - [Dalli](#dalli)
     - [DelayedJob](#delayedjob)
     - [Elasticsearch](#elasticsearch)
     - [Ethon & Typhoeus](#ethon)
     - [Excon](#excon)
     - [Faraday](#faraday)
     - [Grape](#grape)
     - [GraphQL](#graphql)
     - [gRPC](#grpc)
     - [http.rb](#http-rb)
     - [MongoDB](#mongodb)
     - [MySQL2](#mysql2)
     - [Net/HTTP](#net-http)
     - [Presto](#presto)
     - [Que](#que)
     - [Racecar](#racecar)
     - [Rack](#rack)
     - [Rails](#rails)
     - [Rake](#rake)
     - [Redis](#redis)
     - [Rest Client](#rest-client)
     - [Resque](#resque)
     - [Shoryuken](#shoryuken)
     - [Sequel](#sequel)
     - [Sidekiq](#sidekiq)
     - [Sinatra](#sinatra)
     - [Sneakers](#sneakers)
     - [Sucker Punch](#sucker-punch)
 - [Advanced configuration](#advanced-configuration)
     - [Tracer settings](#tracer-settings)
     - [Custom logging](#custom-logging)
     - [Environment and tags](#environment-and-tags)
     - [Sampling](#sampling)
         - [Priority sampling](#priority-sampling)
     - [Distributed tracing](#distributed-tracing)
     - [HTTP request queuing](#http-request-queuing)
     - [Processing pipeline](#processing-pipeline)
         - [Filtering](#filtering)
         - [Processing](#processing)
     - [Trace correlation](#trace-correlation)
     - [Configuring the transport layer](#configuring-the-transport-layer)
     - [Metrics](#metrics)
         - [For application runtime](#for-application-runtime)
     - [OpenTracing](#opentracing)

## Compatibility

**Supported Ruby interpreters**:

| Type  | Documentation              | Version | Support type                         | Gem version support |
| ----- | -------------------------- | -----   | ------------------------------------ | ------------------- |
| MRI   | https://www.ruby-lang.org/ | 2.7     | Full                                 | Latest              |
|       |                            | 2.6     | Full                                 | Latest              |
|       |                            | 2.5     | Full                                 | Latest              |
|       |                            | 2.4     | Full                                 | Latest              |
|       |                            | 2.3     | Full                                 | Latest              |
|       |                            | 2.2     | Full                                 | Latest              |
|       |                            | 2.1     | Full                                 | Latest              |
|       |                            | 2.0     | Full                                 | Latest              |
|       |                            | 1.9.3   | EOL since August 6th, 2020           | < 0.27.0            |
|       |                            | 1.9.1   | EOL since August 6th, 2020           | < 0.27.0            |
| JRuby | https://www.jruby.org      | 9.2     | Full                                 | Latest              |

**Supported web servers**:

| Type      | Documentation                     | Version      | Support type |
| --------- | --------------------------------- | ------------ | ------------ |
| Puma      | http://puma.io/                   | 2.16+ / 3.6+ | Full         |
| Unicorn   | https://bogomips.org/unicorn/     | 4.8+ / 5.1+  | Full         |
| Passenger | https://www.phusionpassenger.com/ | 5.0+         | Full         |

**Supported tracing frameworks**:

| Type        | Documentation                                   | Version               | Gem version support |
| ----------- | ----------------------------------------------- | --------------------- | ------------------- |
| OpenTracing | https://github.com/opentracing/opentracing-ruby | 0.4.1+ (w/ Ruby 2.1+) | >= 0.16.0           |

*Full* support indicates all tracer features are available.

*Deprecated* indicates support will transition to *Maintenance* in a future release.

*Maintenance* indicates only critical bugfixes are backported until EOL.

*EOL* indicates support is no longer provided.

## Installation

The following steps will help you quickly start tracing your Ruby application.

### Setup the Datadog Agent

Before downloading tracing on your application, install the Datadog Agent. The Ruby APM tracer sends trace data through the Datadog Agent.

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

    You can also activate additional integrations here (see [Integration instrumentation](#integration-instrumentation))

### Quickstart for Ruby applications

1. Install the gem with `gem install ddtrace`
2. Add a configuration block to your Ruby application:

    ```ruby
    require 'ddtrace'
    Datadog.configure do |c|
      # Configure the tracer here.
      # Activate integrations, change tracer settings, etc...
      # By default without additional configuration, nothing will be traced.
    end
    ```

3. Add or activate instrumentation by doing either of the following:
    - Activate integration instrumentation (see [Integration instrumentation](#integration-instrumentation))
    - Add manual instrumentation around your code (see [Manual instrumentation](#manual-instrumentation))

### Quickstart for OpenTracing

1. Install the gem with `gem install ddtrace`
2. To your OpenTracing configuration file, add the following:

    ```ruby
    require 'opentracing'
    require 'ddtrace'
    require 'ddtrace/opentracer'

    # Activate the Datadog tracer for OpenTracing
    OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new
    ```

3. (Optional) Add a configuration block to your Ruby application to configure Datadog with:

    ```ruby
    Datadog.configure do |c|
      # Configure the Datadog tracer here.
      # Activate integrations, change tracer settings, etc...
      # By default without additional configuration,
      # no additional integrations will be traced, only
      # what you have instrumented with OpenTracing.
    end
    ```

4. (Optional) Add or activate additional instrumentation by doing either of the following:
    - Activate Datadog integration instrumentation (see [Integration instrumentation](#integration-instrumentation))
    - Add Datadog manual instrumentation around your code (see [Manual instrumentation](#manual-instrumentation))

### Final steps for installation

After setting up, your services will appear on the [APM services page][3] within a few minutes. Learn more about [using the APM UI][visualization docs].

## Manual Instrumentation

If you aren't using a supported framework instrumentation, you may want to manually instrument your code.

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

Example of manual instrumentation in action:

```ruby
get '/posts' do
  Datadog.tracer.trace('web.request', service: 'my-blog', resource: 'GET /posts') do |span|
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

### Asynchronous tracing

It might not always be possible to wrap `Datadog.tracer.trace` around a block of code. Some event or notification based instrumentation might only notify you when an event begins or ends.

To trace these operations, you can trace code asynchronously by calling `Datadog.tracer.trace` without a block:

```ruby
# Some instrumentation framework calls this after an event finishes...
def db_query(start, finish, query)
  span = Datadog.tracer.trace('database.query')
  span.resource = query
  span.start_time = start
  span.finish(finish)
end
```

Calling `Datadog.tracer.trace` without a block will cause the function to return a `Datadog::Span` that is started, but not finished. You can then modify this span however you wish, then close it `finish`.

*You must not leave any unfinished spans.* If any spans are left open when the trace completes, the trace will be discarded. You can [activate debug mode](#tracer-settings) to check for warnings if you suspect this might be happening.

To avoid this scenario when handling start/finish events, you can use `Datadog.tracer.active_span` to get the current active span.

```ruby
# e.g. ActiveSupport::Notifications calls this when an event starts
def start(name, id, payload)
  # Start a span
  Datadog.tracer.trace(name)
end

# e.g. ActiveSupport::Notifications calls this when an event finishes
def finish(name, id, payload)
  # Retrieve current active span (thread-safe)
  current_span = Datadog.tracer.active_span
  unless current_span.nil?
    current_span.resource = payload[:query]
    current_span.finish
  end
end
```
### Enriching traces from nested methods

You can tag additional information to the current active span from any method. Note however that if the method is called and there is no span currently active `active_span` will be nil.

```ruby
# e.g. adding tag to active span

current_span = Datadog.tracer.active_span
current_span.set_tag('my_tag', 'my_value') unless current_span.nil?
```

You can also get the root span of the current active trace using the `active_root_span` method. This method will return `nil` if there is no active trace.

```ruby
# e.g. adding tag to active root span

current_root_span = Datadog.tracer.active_root_span
current_root_span.set_tag('my_tag', 'my_value') unless current_root_span.nil?
```

## Integration instrumentation

Many popular libraries and frameworks are supported out-of-the-box, which can be auto-instrumented. Although they are not activated automatically, they can be easily activated and configured by using the `Datadog.configure` API:

```ruby
Datadog.configure do |c|
  # Activates and configures an integration
  c.use :integration_name, options
end
```

`options` is a `Hash` of integration-specific configuration settings.

For a list of available integrations, and their configuration options, please refer to the following:

| Name                     | Key                        | Versions Supported: MRI  | Versions Supported: JRuby | How to configure                    | Gem source                                                                     |
| ------------------------ | -------------------------- | ------------------------ | --------------------------| ----------------------------------- | ------------------------------------------------------------------------------ |
| Action Cable             | `action_cable`             | `>= 5.0`                 | `>= 5.0`                  | *[Link](#action-cable)*             | *[Link][4]*               |
| Action View              | `action_view`              | `>= 3.0`                 | `>= 3.0`                  | *[Link](#action-view)*              | *[Link][5]*                |
| Active Model Serializers | `active_model_serializers` | `>= 0.9`                 | `>= 0.9`                  | *[Link](#active-model-serializers)* | *[Link][6]*                |
| Action Pack              | `action_pack`              | `>= 3.0`                 | `>= 3.0`                  | *[Link](#action-pack)*              | *[Link][7]*                |
| Active Record            | `active_record`            | `>= 3.0`                 | `>= 3.0`                  | *[Link](#active-record)*            | *[Link][8]*              |
| Active Support           | `active_support`           | `>= 3.0`                 | `>= 3.0`                  | *[Link](#active-support)*           | *[Link][9]*             |
| AWS                      | `aws`                      | `>= 2.0`                 | `>= 2.0`                  | *[Link](#aws)*                      | *[Link][10]*                                  |
| Concurrent Ruby          | `concurrent_ruby`          | `>= 0.9`                 | `>= 0.9`                  | *[Link](#concurrent-ruby)*          | *[Link][11]*                  |
| Dalli                    | `dalli`                    | `>= 2.0`                 | `>= 2.0`                  | *[Link](#dalli)*                    | *[Link][12]*                              |
| DelayedJob               | `delayed_job`              | `>= 4.1`                 | `>= 4.1`                  | *[Link](#delayedjob)*               | *[Link][13]*                        |
| Elasticsearch            | `elasticsearch`            | `>= 1.0`                 | `>= 1.0`                  | *[Link](#elasticsearch)*            | *[Link][14]*                        |
| Ethon                    | `ethon`                    | `>= 0.11`                | `>= 0.11`                 | *[Link](#ethon)*                    | *[Link][15]*                                    |
| Excon                    | `excon`                    | `>= 0.50`                | `>= 0.50`                 | *[Link](#excon)*                    | *[Link][16]*                                       |
| Faraday                  | `faraday`                  | `>= 0.14`                | `>= 0.14`                 | *[Link](#faraday)*                  | *[Link][17]*                                |
| Grape                    | `grape`                    | `>= 1.0`                 | `>= 1.0`                  | *[Link](#grape)*                    | *[Link][18]*                                  |
| GraphQL                  | `graphql`                  | `>= 1.7.9`               | `>= 1.7.9`                | *[Link](#graphql)*                  | *[Link][19]*                             |
| gRPC                     | `grpc`                     | `>= 1.7`                 | *gem not available*       | *[Link](#grpc)*                     | *[Link][20]*                   |
| http.rb                  | `httprb`                   | `>= 2.0`                 | `>= 2.0`                  | *[Link](#http-rb)*                  | *[Link][21]*                                       |
| Kafka                    | `ruby-kafka`               | `>= 0.7.10`              | `>= 0.7.10`               | *[Link](#kafka)*                    | *[Link][22]*                                |
| MongoDB                  | `mongo`                    | `>= 2.1`                 | `>= 2.1`                  | *[Link](#mongodb)*                  | *[Link][23]*                         |
| MySQL2                   | `mysql2`                   | `>= 0.3.21`              | *gem not available*       | *[Link](#mysql2)*                   | *[Link][24]*                                 |
| Net/HTTP                 | `http`                     | *(Any supported Ruby)*   | *(Any supported Ruby)*    | *[Link](#nethttp)*                  | *[Link][25]* |
| Presto                   | `presto`                   | `>= 0.5.14`              | `>= 0.5.14`               | *[Link](#presto)*                   | *[Link][26]*                  |
| Que                      | `que`                      | `>= 1.0.0.beta2`         | `>= 1.0.0.beta2`          | *[Link](#que)*                      | *[Link][27]*                                        |
| Racecar                  | `racecar`                  | `>= 0.3.5`               | `>= 0.3.5`                | *[Link](#racecar)*                  | *[Link][28]*                                   |
| Rack                     | `rack`                     | `>= 1.1`                 | `>= 1.1`                  | *[Link](#rack)*                     | *[Link][29]*                                         |
| Rails                    | `rails`                    | `>= 3.0`                 | `>= 3.0`                  | *[Link](#rails)*                    | *[Link][30]*                                       |
| Rake                     | `rake`                     | `>= 12.0`                | `>= 12.0`                 | *[Link](#rake)*                     | *[Link][31]*                                         |
| Redis                    | `redis`                    | `>= 3.2`                 | `>= 3.2`                  | *[Link](#redis)*                    | *[Link][32]*                                    |
| Resque                   | `resque`                   | `>= 1.0`                 | `>= 1.0`                  | *[Link](#resque)*                   | *[Link][33]*                                     |
| Rest Client              | `rest-client`              | `>= 1.8`                 | `>= 1.8`                  | *[Link](#rest-client)*              | *[Link][34]*                           |
| Sequel                   | `sequel`                   | `>= 3.41`                | `>= 3.41`                 | *[Link](#sequel)*                   | *[Link][35]*                                |
| Shoryuken                | `shoryuken`                | `>= 3.2`                 | `>= 3.2`                  | *[Link](#shoryuken)*                | *[Link][36]*                                   |
| Sidekiq                  | `sidekiq`                  | `>= 3.5.4`               | `>= 3.5.4`                | *[Link](#sidekiq)*                  | *[Link][37]*                                   |
| Sinatra                  | `sinatra`                  | `>= 1.4`                 | `>= 1.4`                  | *[Link](#sinatra)*                  | *[Link][38]*                                   |
| Sneakers                 | `sneakers`                 | `>= 2.12.0`              | `>= 2.12.0`               | *[Link](#sneakers)*                 | *[Link][39]*                                   |
| Sucker Punch             | `sucker_punch`             | `>= 2.0`                 | `>= 2.0`                  | *[Link](#sucker-punch)*             | *[Link][40]*                       |

### Action Cable

The Action Cable integration traces broadcast messages and channel actions.

You can enable it through `Datadog.configure`:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :action_cable, options
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `service_name` | Service name used for `action_cable` instrumentation | `'action_cable'` |

### Action View

Most of the time, Active Support is set up as part of Rails, but it can be activated separately:

```ruby
require 'actionview'
require 'ddtrace'

Datadog.configure do |c|
  c.use :action_view, options
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| ---| --- | --- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `service_name` | Service name used for rendering instrumentation. | `action_view` |
| `template_base_path` | Used when the template name is parsed. If you don't store your templates in the `views/` folder, you may need to change this value | `'views/'` |

### Active Model Serializers

The Active Model Serializers integration traces the `serialize` event for version 0.9+ and the `render` event for version 0.10+.

```ruby
require 'active_model_serializers'
require 'ddtrace'

Datadog.configure do |c|
  c.use :active_model_serializers, options
end

my_object = MyModel.new(name: 'my object')
ActiveModelSerializers::SerializableResource.new(test_obj).serializable_hash
```

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `service_name` | Service name used for `active_model_serializers` instrumentation. | `'active_model_serializers'` |

### Action Pack

Most of the time, Action Pack is set up as part of Rails, but it can be activated separately:

```ruby
require 'actionpack'
require 'ddtrace'

Datadog.configure do |c|
  c.use :action_pack, options
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| ---| --- | --- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `service_name` | Service name used for rendering instrumentation. | `action_pack` |

### Active Record

Most of the time, Active Record is set up as part of a web framework (Rails, Sinatra...) however, it can be set up alone:

```ruby
require 'tmpdir'
require 'sqlite3'
require 'active_record'
require 'ddtrace'

Datadog.configure do |c|
  c.use :active_record, options
end

Dir::Tmpname.create(['test', '.sqlite']) do |db|
  conn = ActiveRecord::Base.establish_connection(adapter: 'sqlite3',
                                                 database: db)
  conn.connection.execute('SELECT 42') # traced!
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| ---| --- | --- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to the global setting, `false` for off. | `false` |
| `orm_service_name` | Service name used for the mapping portion of query results to ActiveRecord objects. Inherits service name from parent by default. | _parent.service_name_ (e.g. `'mysql2'`) |
| `service_name` | Service name used for database portion of `active_record` instrumentation. | Name of database adapter (e.g. `'mysql2'`) |

**Configuring trace settings per database**

You can configure trace settings per database connection by using the `describes` option:

```ruby
# Provide a `:describes` option with a connection key.
# Any of the following keys are acceptable and equivalent to one another.
# If a block is provided, it yields a Settings object that
# accepts any of the configuration options listed above.

Datadog.configure do |c|
  # Symbol matching your database connection in config/database.yml
  # Only available if you are using Rails with ActiveRecord.
  c.use :active_record, describes: :secondary_database, service_name: 'secondary-db'

  c.use :active_record, describes: :secondary_database do |second_db|
    second_db.service_name = 'secondary-db'
  end

  # Connection string with the following connection settings:
  # Adapter, user, host, port, database
  c.use :active_record, describes: 'mysql2://root@127.0.0.1:3306/mysql', service_name: 'secondary-db'

  # Hash with following connection settings
  # Adapter, user, host, port, database
  c.use :active_record, describes: {
      adapter:  'mysql2',
      host:     '127.0.0.1',
      port:     '3306',
      database: 'mysql',
      username: 'root'
    },
    service_name: 'secondary-db'
end
```

If ActiveRecord traces an event that uses a connection that matches a key defined by `describes`, it will use the trace settings assigned to that connection. If the connection does not match any of the described connections, it will use default settings defined by `c.use :active_record` instead.

### Active Support

Most of the time, Active Support is set up as part of Rails, but it can be activated separately:

```ruby
require 'activesupport'
require 'ddtrace'

Datadog.configure do |c|
  c.use :active_support, options
end

cache = ActiveSupport::Cache::MemoryStore.new
cache.read('city')
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| ---| --- | --- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `cache_service` | Service name used for caching with `active_support` instrumentation. | `active_support-cache` |

### AWS

The AWS integration will trace every interaction (e.g. API calls) with AWS services (S3, ElastiCache etc.).

```ruby
require 'aws-sdk'
require 'ddtrace'

Datadog.configure do |c|
  c.use :aws, options
end

# Perform traced call
Aws::S3::Client.new.list_buckets
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `service_name` | Service name used for `aws` instrumentation | `'aws'` |

### Concurrent Ruby

The Concurrent Ruby integration adds support for context propagation when using `::Concurrent::Future`.
Making sure that code traced within the `Future#execute` will have correct parent set.

To activate your integration, use the `Datadog.configure` method:

```ruby
# Inside Rails initializer or equivalent
Datadog.configure do |c|
  # Patches ::Concurrent::Future to use ExecutorService that propagates context
  c.use :concurrent_ruby, options
end

# Pass context into code executed within Concurrent::Future
Datadog.tracer.trace('outer') do
  Concurrent::Future.execute { Datadog.tracer.trace('inner') { } }.wait
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `service_name` | Service name used for `concurrent-ruby` instrumentation | `'concurrent-ruby'` |

### Dalli

Dalli integration will trace all calls to your `memcached` server:

```ruby
require 'dalli'
require 'ddtrace'

# Configure default Dalli tracing behavior
Datadog.configure do |c|
  c.use :dalli, options
end

# Configure Dalli tracing behavior for single client
client = Dalli::Client.new('localhost:11211', options)
client.set('abc', 123)
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `service_name` | Service name used for `dalli` instrumentation | `'memcached'` |

### DelayedJob

The DelayedJob integration uses lifecycle hooks to trace the job executions and enqueues.

You can enable it through `Datadog.configure`:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :delayed_job, options
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `service_name` | Service name used for `DelayedJob` instrumentation | `'delayed_job'` |
| `client_service_name` | Service name used for client-side `DelayedJob` instrumentation | `'delayed_job-client'` |

### Elasticsearch

The Elasticsearch integration will trace any call to `perform_request` in the `Client` object:

```ruby
require 'elasticsearch/transport'
require 'ddtrace'

Datadog.configure do |c|
  c.use :elasticsearch, options
end

# Perform a query to Elasticsearch
client = Elasticsearch::Client.new url: 'http://127.0.0.1:9200'
response = client.perform_request 'GET', '_cluster/health'
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `quantize` | Hash containing options for quantization. May include `:show` with an Array of keys to not quantize (or `:all` to skip quantization), or `:exclude` with Array of keys to exclude entirely. | `{}` |
| `service_name` | Service name used for `elasticsearch` instrumentation | `'elasticsearch'` |

### Ethon

The `ethon` integration will trace any HTTP request through `Easy` or `Multi` objects. Note that this integration also supports `Typhoeus` library which is based on `Ethon`.

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :ethon, options

  # optionally, specify a different service name for hostnames matching a regex
  c.use :ethon, describes: /user-[^.]+\.example\.com/ do |ethon|
    ethon.service_name = 'user.example.com'
    ethon.split_by_domain = false # Only necessary if split_by_domain is true by default
  end
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `distributed_tracing` | Enables [distributed tracing](#distributed-tracing) | `true` |
| `service_name` | Service name for `ethon` instrumentation. | `'ethon'` |
| `split_by_domain` | Uses the request domain as the service name when set to `true`. | `false` |

### Excon

The `excon` integration is available through the `ddtrace` middleware:

```ruby
require 'excon'
require 'ddtrace'

# Configure default Excon tracing behavior
Datadog.configure do |c|
  c.use :excon, options

  # optionally, specify a different service name for hostnames matching a regex
  c.use :excon, describes: /user-[^.]+\.example\.com/ do |excon|
    excon.service_name = 'user.example.com'
    excon.split_by_domain = false # Only necessary if split_by_domain is true by default
  end
end

connection = Excon.new('https://example.com')
connection.get
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `distributed_tracing` | Enables [distributed tracing](#distributed-tracing) | `true` |
| `error_handler` | A `Proc` that accepts a `response` parameter. If it evaluates to a *truthy* value, the trace span is marked as an error. By default only sets 5XX responses as errors. | `nil` |
| `service_name` | Service name for Excon instrumentation. When provided to middleware for a specific connection, it applies only to that connection object. | `'excon'` |
| `split_by_domain` | Uses the request domain as the service name when set to `true`. | `false` |

**Configuring connections to use different settings**

If you use multiple connections with Excon, you can give each of them different settings by configuring their constructors with middleware:

```ruby
# Wrap the Datadog tracing middleware around the default middleware stack
Excon.new(
  'http://example.com',
  middlewares: Datadog::Contrib::Excon::Middleware.with(options).around_default_stack
)

# Insert the middleware into a custom middleware stack.
# NOTE: Trace middleware must be inserted after ResponseParser!
Excon.new(
  'http://example.com',
  middlewares: [
    Excon::Middleware::ResponseParser,
    Datadog::Contrib::Excon::Middleware.with(options),
    Excon::Middleware::Idempotent
  ]
)
```

Where `options` is a Hash that contains any of the parameters listed in the table above.

### Faraday

The `faraday` integration is available through the `ddtrace` middleware:

```ruby
require 'faraday'
require 'ddtrace'

# Configure default Faraday tracing behavior
Datadog.configure do |c|
  c.use :faraday, options

  # optionally, specify a different service name for hostnames matching a regex
  c.use :faraday, describes: /user-[^.]+\.example\.com/ do |faraday|
    faraday.service_name = 'user.example.com'
    faraday.split_by_domain = false # Only necessary if split_by_domain is true by default
  end
end

# In case you want to override the global configuration for a certain client instance
connection = Faraday.new('https://example.com') do |builder|
  builder.use(:ddtrace, options)
  builder.adapter Faraday.default_adapter
end

connection.get('/foo')
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `distributed_tracing` | Enables [distributed tracing](#distributed-tracing) | `true` |
| `error_handler` | A `Proc` that accepts a `response` parameter. If it evaluates to a *truthy* value, the trace span is marked as an error. By default only sets 5XX responses as errors. | `nil` |
| `service_name` | Service name for Faraday instrumentation. When provided to middleware for a specific connection, it applies only to that connection object. | `'faraday'` |
| `split_by_domain` | Uses the request domain as the service name when set to `true`. | `false` |

### Grape

The Grape integration adds the instrumentation to Grape endpoints and filters. This integration can work side by side with other integrations like Rack and Rails.

To activate your integration, use the `Datadog.configure` method before defining your Grape application:

```ruby
# api.rb
require 'grape'
require 'ddtrace'

Datadog.configure do |c|
  c.use :grape, options
end

# Then define your application
class RackTestingAPI < Grape::API
  desc 'main endpoint'
  get :success do
    'Hello world!'
  end
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `nil` |
| `enabled` | Defines whether Grape should be traced. Useful for temporarily disabling tracing. `true` or `false` | `true` |
| `service_name` | Service name used for `grape` instrumentation | `'grape'` |

### GraphQL

The GraphQL integration activates instrumentation for GraphQL queries.

To activate your integration, use the `Datadog.configure` method:

```ruby
# Inside Rails initializer or equivalent
Datadog.configure do |c|
  c.use :graphql, schemas: [YourSchema], options
end

# Then run a GraphQL query
YourSchema.execute(query, variables: {}, context: {}, operation_name: nil)
```

The `use :graphql` method accepts the following parameters. Additional options can be substituted in for `options`:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `nil` |
| `service_name` | Service name used for `graphql` instrumentation | `'ruby-graphql'` |
| `schemas` | Required. Array of `GraphQL::Schema` objects which to trace. Tracing will be added to all the schemas listed, using the options provided to this configuration. If you do not provide any, then tracing will not be activated. | `[]` |

**Manually configuring GraphQL schemas**

If you prefer to individually configure the tracer settings for a schema (e.g. you have multiple schemas with different service names), in the schema definition, you can add the following [using the GraphQL API][41]:

```ruby
# Class-based schema
class YourSchema < GraphQL::Schema
  use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
  )
end
```

```ruby
# .define-style schema
YourSchema = GraphQL::Schema.define do
  use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
  )
end
```

Or you can modify an already defined schema:

```ruby
# Class-based schema
YourSchema.use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
)
```

```ruby
# .define-style schema
YourSchema.define do
  use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
  )
end
```

Do *NOT* `use :graphql` in `Datadog.configure` if you choose to configure manually, as to avoid double tracing. These two means of configuring GraphQL tracing are considered mutually exclusive.

### gRPC

The `grpc` integration adds both client and server interceptors, which run as middleware before executing the service's remote procedure call. As gRPC applications are often distributed, the integration shares trace information between client and server.

To setup your integration, use the `Datadog.configure` method like so:

```ruby
require 'grpc'
require 'ddtrace'

Datadog.configure do |c|
  c.use :grpc, options
end

# Server side
server = GRPC::RpcServer.new
server.add_http2_port('localhost:50051', :this_port_is_insecure)
server.handle(Demo)
server.run_till_terminated

# Client side
client = Demo.rpc_stub_class.new('localhost:50051', :this_channel_is_insecure)
client.my_endpoint(DemoMessage.new(contents: 'hello!'))
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `service_name` | Service name used for `grpc` instrumentation | `'grpc'` |

**Configuring clients to use different settings**

In situations where you have multiple clients calling multiple distinct services, you may pass the Datadog interceptor directly, like so

```ruby
configured_interceptor = Datadog::Contrib::GRPC::DatadogInterceptor::Client.new do |c|
  c.service_name = "Alternate"
end

alternate_client = Demo::Echo::Service.rpc_stub_class.new(
  'localhost:50052',
  :this_channel_is_insecure,
  :interceptors => [configured_interceptor]
)
```

The integration will ensure that the `configured_interceptor` establishes a unique tracing setup for that client instance.

### http.rb

The http.rb integration will trace any HTTP call using the Http.rb gem.

```ruby
require 'http'
require 'ddtrace'
Datadog.configure do |c|
  c.use :httprb, options
  # optionally, specify a different service name for hostnames matching a regex
  c.use :httprb, describes: /user-[^.]+\.example\.com/ do |httprb|
    httprb.service_name = 'user.example.com'
    httprb.split_by_domain = false # Only necessary if split_by_domain is true by default
  end
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `distributed_tracing` | Enables [distributed tracing](#distributed-tracing) | `true` |
| `service_name` | Service name for `httprb` instrumentation. | `'httprb'` |
| `split_by_domain` | Uses the request domain as the service name when set to `true`. | `false` |

### Kafka

The Kafka integration provides tracing of the `ruby-kafka` gem:

You can enable it through `Datadog.configure`:

```ruby
require 'active_support/notifications' # required to enable 'ruby-kafka' instrumentation
require 'kafka'
require 'ddtrace'

Datadog.configure do |c|
  c.use :kafka, options
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `service_name` | Service name used for `kafka` instrumentation | `'kafka'` |
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

### MongoDB

The integration traces any `Command` that is sent from the [MongoDB Ruby Driver][23] to a MongoDB cluster. By extension, Object Document Mappers (ODM) such as Mongoid are automatically instrumented if they use the official Ruby driver. To activate the integration, simply:

```ruby
require 'mongo'
require 'ddtrace'

Datadog.configure do |c|
  c.use :mongo, options
end

# Create a MongoDB client and use it as usual
client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'artists')
collection = client[:people]
collection.insert_one({ name: 'Steve' })

# In case you want to override the global configuration for a certain client instance
Datadog.configure(client, options)
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `quantize` | Hash containing options for quantization. May include `:show` with an Array of keys to not quantize (or `:all` to skip quantization), or `:exclude` with Array of keys to exclude entirely. | `{ show: [:collection, :database, :operation] }` |
| `service_name` | Service name used for `mongo` instrumentation | `'mongodb'` |

### MySQL2

The MySQL2 integration traces any SQL command sent through `mysql2` gem.

```ruby
require 'mysql2'
require 'ddtrace'

Datadog.configure do |c|
  c.use :mysql2, options
end

client = Mysql2::Client.new(:host => "localhost", :username => "root")
client.query("SELECT * FROM users WHERE group='x'")
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `service_name` | Service name used for `mysql2` instrumentation | `'mysql2'` |

### Net/HTTP

The Net/HTTP integration will trace any HTTP call using the standard lib Net::HTTP module.

```ruby
require 'net/http'
require 'ddtrace'

Datadog.configure do |c|
  c.use :http, options

  # optionally, specify a different service name for hostnames matching a regex
  c.use :http, describes: /user-[^.]+\.example\.com/ do |http|
    http.service_name = 'user.example.com'
    http.split_by_domain = false # Only necessary if split_by_domain is true by default
  end
end

Net::HTTP.start('127.0.0.1', 8080) do |http|
  request = Net::HTTP::Get.new '/index'
  response = http.request(request)
end

content = Net::HTTP.get(URI('http://127.0.0.1/index.html'))
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `distributed_tracing` | Enables [distributed tracing](#distributed-tracing) | `true` |
| `service_name` | Service name used for `http` instrumentation | `'net/http'` |
| `split_by_domain` | Uses the request domain as the service name when set to `true`. | `false` |

If you wish to configure each connection object individually, you may use the `Datadog.configure` as it follows:

```ruby
client = Net::HTTP.new(host, port)
Datadog.configure(client, options)
```

### Presto

The Presto integration traces any SQL command sent through `presto-client` gem.

```ruby
require 'presto-client'
require 'ddtrace'

Datadog.configure do |c|
  c.use :presto, options
end

client = Presto::Client.new(
  server: "localhost:8880",
  ssl: {verify: false},
  catalog: "native",
  schema: "default",
  time_zone: "US/Pacific",
  language: "English",
  http_debug: true,
)

client.run("select * from system.nodes")
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `service_name` | Service name used for `presto` instrumentation | `'presto'` |

### Que

The Que integration is a middleware which will trace job executions.

You can enable it through `Datadog.configure`:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :que, options
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `enabled` | Defines whether Que should be traced. Useful for temporarily disabling tracing. `true` or `false` | `true` |
| `service_name` | Service name used for `que` instrumentation | `'que'` |
| `tag_args` | Enable tagging of a job's args field. `true` for on, `false` for off. | `false` |
| `tag_data` | Enable tagging of a job's data field. `true` for on, `false` for off. | `false` |

### Racecar

The Racecar integration provides tracing for Racecar jobs.

You can enable it through `Datadog.configure`:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :racecar, options
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `service_name` | Service name used for `racecar` instrumentation | `'racecar'` |

### Rack

The Rack integration provides a middleware that traces all requests before they reach the underlying framework or application. It responds to the Rack minimal interface, providing reasonable values that can be retrieved at the Rack level.

This integration is automatically activated with web frameworks like Rails. If you're using a plain Rack application, enable the integration it to your `config.ru`:

```ruby
# config.ru example
require 'ddtrace'

Datadog.configure do |c|
  c.use :rack, options
end

use Datadog::Contrib::Rack::TraceMiddleware

app = proc do |env|
  [ 200, {'Content-Type' => 'text/plain'}, ['OK'] ]
end

run app
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `nil` |
| `application` | Your Rack application. Required for `middleware_names`. | `nil` |
| `distributed_tracing` | Enables [distributed tracing](#distributed-tracing) so that this service trace is connected with a trace of another service if tracing headers are received | `true` |
| `headers` | Hash of HTTP request or response headers to add as tags to the `rack.request`. Accepts `request` and `response` keys with Array values e.g. `['Last-Modified']`. Adds `http.request.headers.*` and `http.response.headers.*` tags respectively. | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `middleware_names` | Enable this if you want to use the middleware classes as the resource names for `rack` spans. Requires `application` option to use. | `false` |
| `quantize` | Hash containing options for quantization. May include `:query` or `:fragment`. | `{}` |
| `quantize.query` | Hash containing options for query portion of URL quantization. May include `:show` or `:exclude`. See options below. Option must be nested inside the `quantize` option. | `{}` |
| `quantize.query.show` | Defines which values should always be shown. Shows no values by default. May be an Array of strings, or `:all` to show all values. Option must be nested inside the `query` option. | `nil` |
| `quantize.query.exclude` | Defines which values should be removed entirely. Excludes nothing by default. May be an Array of strings, or `:all` to remove the query string entirely. Option must be nested inside the `query` option. | `nil` |
| `quantize.fragment` | Defines behavior for URL fragments. Removes fragments by default. May be `:show` to show URL fragments. Option must be nested inside the `quantize` option. | `nil` |
| `request_queuing` | Track HTTP request time spent in the queue of the frontend server. See [HTTP request queuing](#http-request-queuing) for setup details. Set to `true` to enable. | `false` |
| `service_name` | Service name used for `rack` instrumentation | `'rack'` |
| `web_service_name` | Service name for frontend server request queuing spans. (e.g. `'nginx'`) | `'web-server'` |

**Configuring URL quantization behavior**

```ruby
Datadog.configure do |c|
  # Default behavior: all values are quantized, fragment is removed.
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id&sort_by
  # http://example.com/path?categories[]=1&categories[]=2 --> http://example.com/path?categories[]

  # Show values for any query string parameter matching 'category_id' exactly
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id=1&sort_by
  c.use :rack, quantize: { query: { show: ['category_id'] } }

  # Show all values for all query string parameters
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id=1&sort_by=asc
  c.use :rack, quantize: { query: { show: :all } }

  # Totally exclude any query string parameter matching 'sort_by' exactly
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id
  c.use :rack, quantize: { query: { exclude: ['sort_by'] } }

  # Remove the query string entirely
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path
  c.use :rack, quantize: { query: { exclude: :all } }

  # Show URL fragments
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id&sort_by#featured
  c.use :rack, quantize: { fragment: :show }
end
```

### Rails

The Rails integration will trace requests, database calls, templates rendering, and cache read/write/delete operations. The integration makes use of the Active Support Instrumentation, listening to the Notification API so that any operation instrumented by the API is traced.

To enable the Rails instrumentation, create an initializer file in your `config/initializers` folder:

```ruby
# config/initializers/datadog.rb
require 'ddtrace'

Datadog.configure do |c|
  c.use :rails, options
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to the global setting, `false` for off. | `nil` |
| `cache_service` | Cache service name used when tracing cache activity | `'<app_name>-cache'` |
| `controller_service` | Service name used when tracing a Rails action controller | `'<app_name>'` |
| `database_service` | Database service name used when tracing database activity | `'<app_name>-<adapter_name>'` |
| `distributed_tracing` | Enables [distributed tracing](#distributed-tracing) so that this service trace is connected with a trace of another service if tracing headers are received | `true` |
| `exception_controller` | Class or Module which identifies a custom exception controller class. Tracer provides improved error behavior when it can identify custom exception controllers. By default, without this option, it 'guesses' what a custom exception controller looks like. Providing this option aids this identification. | `nil` |
| `middleware` | Add the trace middleware to the Rails application. Set to `false` if you don't want the middleware to load. | `true` |
| `middleware_names` | Enables any short-circuited middleware requests to display the middleware name as a resource for the trace. | `false` |
| `service_name` | Service name used when tracing application requests (on the `rack` level) | `'<app_name>'` (inferred from your Rails application namespace) |
| `template_base_path` | Used when the template name is parsed. If you don't store your templates in the `views/` folder, you may need to change this value | `'views/'` |
| `log_injection` | Automatically enables injection [Trace Correlation](#trace-correlation) information, such as `dd.trace_id`, into Rails logs. Supports the default logger (`ActiveSupport::TaggedLogging`) and `Lograge`. Details on the format of Trace Correlation information can be found in the [Trace Correlation](#trace-correlation) section.  | `false` |

**Supported versions**

| MRI Versions  | JRuby Versions | Rails Versions |
| ------------- | -------------- | -------------- |
|  2.0          |                |  3.0 - 3.2     |
|  2.1          |                |  3.0 - 4.2     |
|  2.2 - 2.3    |                |  3.0 - 5.2     |
|  2.4          |                |  4.2.8 - 5.2   |
|  2.5          |                |  4.2.8 - 6.0   |
|  2.6 - 2.7    |  9.2           |  5.0 - 6.0     |

### Rake

You can add instrumentation around your Rake tasks by activating the `rake` integration. Each task and its subsequent subtasks will be traced.

To activate Rake task tracing, add the following to your `Rakefile`:

```ruby
# At the top of your Rakefile:
require 'rake'
require 'ddtrace'

Datadog.configure do |c|
  c.use :rake, options
end

task :my_task do
  # Do something task work here...
end

Rake::Task['my_task'].invoke
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to the global setting, `false` for off. | `false` |
| `enabled` | Defines whether Rake tasks should be traced. Useful for temporarily disabling tracing. `true` or `false` | `true` |
| `quantize` | Hash containing options for quantization of task arguments. See below for more details and examples. | `{}` |
| `service_name` | Service name used for `rake` instrumentation | `'rake'` |

**Configuring task quantization behavior**

```ruby
Datadog.configure do |c|
  # Given a task that accepts :one, :two, :three...
  # Invoked with 'foo', 'bar', 'baz'.

  # Default behavior: all arguments are quantized.
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` tag --> { one: '?', two: '?', three: '?' }
  c.use :rake

  # Show values for any argument matching :two exactly
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` tag --> { one: '?', two: 'bar', three: '?' }
  c.use :rake, quantize: { args: { show: [:two] } }

  # Show all values for all arguments.
  # `rake.invoke.args` tag  --> ['foo', 'bar', 'baz']
  # `rake.execute.args` tag --> { one: 'foo', two: 'bar', three: 'baz' }
  c.use :rake, quantize: { args: { show: :all } }

  # Totally exclude any argument matching :three exactly
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` tag --> { one: '?', two: '?' }
  c.use :rake, quantize: { args: { exclude: [:three] } }

  # Remove the arguments entirely
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` tag --> {}
  c.use :rake, quantize: { args: { exclude: :all } }
end
```

### Redis

The Redis integration will trace simple calls as well as pipelines.

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.use :redis, options
end

# Perform Redis commands
redis = Redis.new
redis.set 'foo', 'bar'
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `service_name` | Service name used for `redis` instrumentation | `'redis'` |

You can also set *per-instance* configuration as it follows:

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.use :redis # Enabling integration instrumentation is still required
end

customer_cache = Redis.new
invoice_cache = Redis.new

Datadog.configure(customer_cache, service_name: 'customer-cache')
Datadog.configure(invoice_cache, service_name: 'invoice-cache')

# Traced call will belong to `customer-cache` service
customer_cache.get(...)
# Traced call will belong to `invoice-cache` service
invoice_cache.get(...)
```

**Configuring trace settings per connection**

You can configure trace settings per connection by using the `describes` option:

```ruby
# Provide a `:describes` option with a connection key.
# Any of the following keys are acceptable and equivalent to one another.
# If a block is provided, it yields a Settings object that
# accepts any of the configuration options listed above.

Datadog.configure do |c|
  # The default configuration for any redis client
  c.use :redis, service_name: 'redis-default'

  # The configuration matching a given unix socket
  c.use :redis, describes: { url: 'unix://path/to/file' }, service_name: 'redis-unix'

  # Connection string
  c.use :redis, describes: { url: 'redis://127.0.0.1:6379/0' }, service_name: 'redis-connection-string'
  # Client host, port, db, scheme
  c.use :redis, describes: { host: 'my-host.com', port: 6379, db: 1, scheme: 'redis' }, service_name: 'redis-connection-hash'
  # Only a subset of the connection hash
  c.use :redis, describes: { host: ENV['APP_CACHE_HOST'], port: ENV['APP_CACHE_PORT'] }, service_name: 'redis-cache'
  c.use :redis, describes: { host: ENV['SIDEKIQ_CACHE_HOST'] }, service_name: 'redis-sidekiq'
end
```

### Resque

The Resque integration uses Resque hooks that wraps the `perform` method.

To add tracing to a Resque job:

```ruby
require 'ddtrace'

class MyJob
  def self.perform(*args)
    # do_something
  end
end

Datadog.configure do |c|
  c.use :resque, options
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to the global setting, `false` for off. | `false` |
| `service_name` | Service name used for `resque` instrumentation | `'resque'` |
| `workers` | An array including all worker classes you want to trace (e.g. `[MyJob]`) | `[]` |

### Rest Client

The `rest-client` integration is available through the `ddtrace` middleware:

```ruby
require 'rest_client'
require 'ddtrace'

Datadog.configure do |c|
  c.use :rest_client, options
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `distributed_tracing` | Enables [distributed tracing](#distributed-tracing) | `true` |
| `service_name` | Service name for `rest_client` instrumentation. | `'rest_client'` |

### Sequel

The Sequel integration traces queries made to your database.

```ruby
require 'sequel'
require 'ddtrace'

# Connect to database
database = Sequel.sqlite

# Create a table
database.create_table :articles do
  primary_key :id
  String :name
end

Datadog.configure do |c|
  c.use :sequel, options
end

# Perform a query
articles = database[:articles]
articles.all
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `service_name` | Service name for `sequel` instrumentation | Name of database adapter (e.g. `'mysql2'`) |

Only Ruby 2.0+ is supported.

**Configuring databases to use different settings**

If you use multiple databases with Sequel, you can give each of them different settings by configuring their respective `Sequel::Database` objects:

```ruby
sqlite_database = Sequel.sqlite
postgres_database = Sequel.connect('postgres://user:password@host:port/database_name')

# Configure each database with different service names
Datadog.configure(sqlite_database, service_name: 'my-sqlite-db')
Datadog.configure(postgres_database, service_name: 'my-postgres-db')
```

### Shoryuken

The Shoryuken integration is a server-side middleware which will trace job executions.

You can enable it through `Datadog.configure`:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :shoryuken, options
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `service_name` | Service name used for `shoryuken` instrumentation | `'shoryuken'` |

### Sidekiq

The Sidekiq integration is a client-side & server-side middleware which will trace job queuing and executions respectively.

You can enable it through `Datadog.configure`:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :sidekiq, options
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `client_service_name` | Service name used for client-side `sidekiq` instrumentation | `'sidekiq-client'` |
| `service_name` | Service name used for server-side `sidekiq` instrumentation | `'sidekiq'` |
| `tag_args` | Enable tagging of job arguments. `true` for on, `false` for off. | `false` |

### Sinatra

The Sinatra integration traces requests and template rendering.

To start using the tracing client, make sure you import `ddtrace` and `use :sinatra` after either `sinatra` or `sinatra/base`, and before you define your application/routes:

#### Classic application

```ruby
require 'sinatra'
require 'ddtrace'

Datadog.configure do |c|
  c.use :sinatra, options
end

get '/' do
  'Hello world!'
end
```

#### Modular application

```ruby
require 'sinatra/base'
require 'ddtrace'

Datadog.configure do |c|
  c.use :sinatra, options
end

class NestedApp < Sinatra::Base
  register Datadog::Contrib::Sinatra::Tracer

  get '/nested' do
    'Hello from nested app!'
  end
end

class App < Sinatra::Base
  register Datadog::Contrib::Sinatra::Tracer

  use NestedApp

  get '/' do
    'Hello world!'
  end
end
```

Ensure you register `Datadog::Contrib::Sinatra::Tracer` as a middleware before you mount your nested applications.

#### Instrumentation options

`options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `nil` |
| `distributed_tracing` | Enables [distributed tracing](#distributed-tracing) so that this service trace is connected with a trace of another service if tracing headers are received | `true` |
| `headers` | Hash of HTTP request or response headers to add as tags to the `sinatra.request`. Accepts `request` and `response` keys with Array values e.g. `['Last-Modified']`. Adds `http.request.headers.*` and `http.response.headers.*` tags respectively. | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `resource_script_names` | Prepend resource names with script name | `false` |
| `service_name` | Service name used for `sinatra` instrumentation | `'sinatra'` |

### Sneakers

The Sneakers integration is a server-side middleware which will trace job executions.

You can enable it through `Datadog.configure`:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :sneakers, options
end
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `enabled` | Defines whether Sneakers should be traced. Useful for temporarily disabling tracing. `true` or `false` | `true` |
| `service_name` | Service name used for `sneakers` instrumentation | `'sneakers'` |
| `tag_body` | Enable tagging of job message. `true` for on, `false` for off. | `false` |

### Sucker Punch

The `sucker_punch` integration traces all scheduled jobs:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :sucker_punch, options
end

# Execution of this job is traced
LogJob.perform_async('login')
```

Where `options` is an optional `Hash` that accepts the following parameters:

| Key | Description | Default |
| --- | ----------- | ------- |
| `analytics_enabled` | Enable analytics for spans produced by this integration. `true` for on, `nil` to defer to global setting, `false` for off. | `false` |
| `service_name` | Service name used for `sucker_punch` instrumentation | `'sucker_punch'` |

## Advanced configuration

### Tracer settings

To change the default behavior of the Datadog tracer, you can provide custom options inside the `Datadog.configure` block as in:

```ruby
# config/initializers/datadog-tracer.rb

Datadog.configure do |c|
  c.tracer.enabled = true
  c.tracer.hostname = 'my-agent'
  c.tracer.port = 8126
  c.tracer.partial_flush.enabled = false
  c.tracer.sampler = Datadog::AllSampler.new

  # OR for advanced use cases, you can specify your own tracer:
  c.tracer.instance = Datadog::Tracer.new

  # To enable debug mode:
  c.diagnostics.debug = true
end
```

Available options are:

 - `enabled`: defines if the `tracer` is enabled or not. If set to `false` instrumentation will still run, but no spans are sent to the trace agent. Can be configured through the `DD_TRACE_ENABLED` environment variable. Defaults to `true`.
 - `hostname`: set the hostname of the trace agent.
 - `instance`: set to a custom `Datadog::Tracer` instance. If provided, other trace settings are ignored (you must configure it manually.)
 - `partial_flush.enabled`: set to `true` to enable partial trace flushing (for long running traces.) Disabled by default. *Experimental.*
 - `port`: set the port the trace agent is listening on.
 - `sampler`: set to a custom `Datadog::Sampler` instance. If provided, the tracer will use this sampler to determine sampling behavior.
 - `diagnostics.startup_logs.enabled`: Startup configuration and diagnostic log. Defaults to `true`. Can be configured through the `DD_TRACE_STARTUP_LOGS` environment variable.
 - `diagnostics.debug`: set to true to enable debug logging. Can be configured through the `DD_TRACE_DEBUG` environment variable. Defaults to `false`.

#### Custom logging

By default, all logs are processed by the default Ruby logger. When using Rails, you should see the messages in your application log file.

Datadog client log messages are marked with `[ddtrace]` so you should be able to isolate them from other messages.

Additionally, it is possible to override the default logger and replace it by a custom one. This is done using the `log` setting.

```ruby
f = File.new("my-custom.log", "w+") # Log messages should go there
Datadog.configure do |c|
  c.logger = Logger.new(f) # Overriding the default logger
  c.logger.level = ::Logger::INFO
end

Datadog.logger.info { "this is typically called by tracing code" }
```

### Environment and tags

By default, the trace agent (not this library, but the program running in the background collecting data from various clients) uses the tags set in the agent config file, see our [environments tutorial][42] for details.

You can configure the application to automatically tag your traces and metrics, using the following environment variables:

 - `DD_ENV`: Your application environment (e.g. `production`, `staging`, etc.)
 - `DD_SERVICE`: Your application's default service name (e.g. `billing-api`)
 - `DD_VERSION`: Your application version (e.g. `2.5`, `202003181415`, `1.3-alpha`, etc.)
 - `DD_TAGS`: Custom tags in value pairs separated by `,` (e.g. `layer:api,team:intake`)
    - If `DD_ENV`, `DD_SERVICE` or `DD_VERSION` are set, it will override any respective `env`/`service`/`version` tag defined in `DD_TAGS`.
    - If `DD_ENV`, `DD_SERVICE` or `DD_VERSION` are NOT set, tags defined in `DD_TAGS` will be used to populate `env`/`service`/`version` respectively.

These values can also be overridden at the tracer level:

```ruby
Datadog.configure do |c|
  c.service = 'billing-api'
  c.env = 'test'
  c.tags = { 'team' => 'qa' }
  c.version = '1.3-alpha'
end
```

This enables you to set this value on a per application basis, so you can have for example several applications reporting for different environments on the same host.

Tags can also be set directly on individual spans, which will supersede any conflicting tags defined at the application level.

### Environment variables

Other Environment Variables:

- `DD_TRACE_AGENT_URL`: Sets the URL endpoint where traces are sent. Has priority over `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. e.g. `DD_TRACE_AGENT_URL=http://localhost:8126`.
- `DD_TRACE_<INTEGRATION>_ENABLED`: Enables or disables an **activated** integration. Defaults to `true`.. e.g. `DD_TRACE_RAILS_ENABLED=false`. This option has no effects on integrations that have not been explicitly activated (e.g. `Datadog.configure{ |c| c.use :integration }`).on code. This environment variable can only be used to disable an integration.
- `DD_TRACE_<INTEGRATION>_ANALYTICS_ENABLED`: Enables or disable App Analytics for a specific integration. Valid values are: true or false (default). e.g. `DD_TRACE_ACTION_CABLE_ANALYTICS_ENABLED=true`.
- `DD_TRACE_<INTEGRATION>_ANALYTICS_SAMPLE_RATE`: Sets the App Analytics sampling rate for a specific integration. A floating number between 0.0 and 1.0 (default). e.g. `DD_TRACE_ACTION_CABLE_ANALYTICS_SAMPLE_RATE=0.5`.
- `DD_LOGS_INJECTION`: Automatically enables injection [Trace Correlation](#trace-correlation) information, such as `dd.trace_id`, into Rails logs. Supports the default logger (`ActiveSupport::TaggedLogging`) and `Lograge`. Details on the format of Trace Correlation information can be found in the [Trace Correlation](#trace-correlation) section. Valid values are: `true` or `false`(default). e.g. `DD_LOGS_INJECTION=true`.

### Sampling

`ddtrace` can perform trace sampling. While the trace agent already samples traces to reduce bandwidth usage, client sampling reduces the performance overhead.

`Datadog::RateSampler` samples a ratio of the traces. For example:

```ruby
# Sample rate is between 0 (nothing sampled) to 1 (everything sampled).
sampler = Datadog::RateSampler.new(0.5) # sample 50% of the traces

Datadog.configure do |c|
  c.tracer.sampler = sampler
end
```

#### Priority sampling

Priority sampling decides whether to keep a trace by using a priority attribute propagated for distributed traces. Its value indicates to the Agent and the backend about how important the trace is.

The sampler can set the priority to the following values:

 - `Datadog::Ext::Priority::AUTO_REJECT`: the sampler automatically decided to reject the trace.
 - `Datadog::Ext::Priority::AUTO_KEEP`: the sampler automatically decided to keep the trace.

Priority sampling is enabled by default. Enabling it ensures that your sampled distributed traces will be complete. Once enabled, the sampler will automatically assign a priority of 0 or 1 to traces, depending on their service and volume.

You can also set this priority manually to either drop a non-interesting trace or to keep an important one. For that, set the `context#sampling_priority` to:

 - `Datadog::Ext::Priority::USER_REJECT`: the user asked to reject the trace.
 - `Datadog::Ext::Priority::USER_KEEP`: the user asked to keep the trace.

When not using [distributed tracing](#distributed-tracing), you may change the priority at any time, as long as the trace incomplete. But it has to be done before any context propagation (fork, RPC calls) to be useful in a distributed context. Changing the priority after the context has been propagated causes different parts of a distributed trace to use different priorities. Some parts might be kept, some parts might be rejected, and this can cause the trace to be partially stored and remain incomplete.

If you change the priority, we recommend you do it as soon as possible - when the root span has just been created.

```ruby
# First, grab the active span
span = Datadog.tracer.active_span

# Indicate to reject the trace
span.context.sampling_priority = Datadog::Ext::Priority::USER_REJECT

# Indicate to keep the trace
span.context.sampling_priority = Datadog::Ext::Priority::USER_KEEP
```

### Distributed Tracing

Distributed tracing allows traces to be propagated across multiple instrumented applications so that a request can be presented as a single trace, rather than a separate trace per service.

To trace requests across application boundaries, the following must be propagated between each application:

| Property              | Type    | Description                                                                                                                 |
| --------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Trace ID**          | Integer | ID of the trace. This value should be the same across all requests that belong to the same trace.                           |
| **Parent Span ID**    | Integer | ID of the span in the service originating the request. This value will always be different for each request within a trace. |
| **Sampling Priority** | Integer | Sampling priority level for the trace. This value should be the same across all requests that belong to the same trace.     |

Such propagation can be visualized as:

```
Service A:
  Trace ID:  100000000000000001
  Parent ID: 0
  Span ID:   100000000000000123
  Priority:  1

  |
  | Service B Request:
  |   Metadata:
  |     Trace ID:  100000000000000001
  |     Parent ID: 100000000000000123
  |     Priority:  1
  |
  V

Service B:
  Trace ID:  100000000000000001
  Parent ID: 100000000000000123
  Span ID:   100000000000000456
  Priority:  1

  |
  | Service C Request:
  |   Metadata:
  |     Trace ID:  100000000000000001
  |     Parent ID: 100000000000000456
  |     Priority:  1
  |
  V

Service C:
  Trace ID:  100000000000000001
  Parent ID: 100000000000000456
  Span ID:   100000000000000789
  Priority:  1
```

**Via HTTP**

For HTTP requests between instrumented applications, this trace metadata is propagated by use of HTTP Request headers:

| Property              | Type    | HTTP Header name              |
| --------------------- | ------- | ----------------------------- |
| **Trace ID**          | Integer | `x-datadog-trace-id`          |
| **Parent Span ID**    | Integer | `x-datadog-parent-id`         |
| **Sampling Priority** | Integer | `x-datadog-sampling-priority` |

Such that:

```
Service A:
  Trace ID:  100000000000000001
  Parent ID: 0
  Span ID:   100000000000000123
  Priority:  1

  |
  | Service B HTTP Request:
  |   Headers:
  |     x-datadog-trace-id:          100000000000000001
  |     x-datadog-parent-id:         100000000000000123
  |     x-datadog-sampling-priority: 1
  |
  V

Service B:
  Trace ID:  100000000000000001
  Parent ID: 100000000000000123
  Span ID:   100000000000000456
  Priority:  1

  |
  | Service C HTTP Request:
  |   Headers:
  |     x-datadog-trace-id:          100000000000000001
  |     x-datadog-parent-id:         100000000000000456
  |     x-datadog-sampling-priority: 1
  |
  V

Service C:
  Trace ID:  100000000000000001
  Parent ID: 100000000000000456
  Span ID:   100000000000000789
  Priority:  1
```

**Activating distributed tracing for integrations**

Many integrations included in `ddtrace` support distributed tracing. Distributed tracing is enabled by default in Agent v7 and most versions of Agent v6. If needed, you can activate distributed tracing with configuration settings.

- If your application receives requests from services with distributed tracing activated, you must activate distributed tracing on the integrations that handle these requests (e.g. Rails)
- If your application send requests to services with distributed tracing activated, you must activate distributed tracing on the integrations that send these requests (e.g. Faraday)
- If your application both sends and receives requests implementing distributed tracing, it must activate all integrations that handle these requests.

For more details on how to activate distributed tracing for integrations, see their documentation:

- [Excon](#excon)
- [Faraday](#faraday)
- [Rest Client](#restclient)
- [Net/HTTP](#nethttp)
- [Rack](#rack)
- [Rails](#rails)
- [Sinatra](#sinatra)
- [http.rb](#http-rb)

**Using the HTTP propagator**

To make the process of propagating this metadata easier, you can use the `Datadog::HTTPPropagator` module.

On the client:

```ruby
Datadog.tracer.trace('web.call') do |span|
  # Inject span context into headers (`env` must be a Hash)
  Datadog::HTTPPropagator.inject!(span.context, env)
end
```

On the server:

```ruby
Datadog.tracer.trace('web.work') do |span|
  # Build a context from headers (`env` must be a Hash)
  context = HTTPPropagator.extract(request.env)
  Datadog.tracer.provider.context = context if context.trace_id
end
```

### HTTP request queuing

Traces that originate from HTTP requests can be configured to include the time spent in a frontend web server or load balancer queue before the request reaches the Ruby application.

This functionality is **experimental** and deactivated by default.

To activate this feature, you must add an `X-Request-Start` or `X-Queue-Start` header from your web server (i.e., Nginx). The following is an Nginx configuration example:

```
# /etc/nginx/conf.d/ruby_service.conf
server {
    listen 8080;

    location / {
      proxy_set_header X-Request-Start "t=${msec}";
      proxy_pass http://web:3000;
    }
}
```

Then you must enable the request queuing feature in the integration handling the request.

For Rack-based applications, see the [documentation](#rack) for details for enabling this feature.

### Processing Pipeline

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

### Trace correlation

In many cases, such as logging, it may be useful to correlate trace IDs to other events or data streams, for easier cross-referencing.

#### For logging in Rails applications

##### Automatic

For Rails applications using the default logger (`ActiveSupport::TaggedLogging`) or `lograge`, you can automatically enable trace correlation injection by setting the `rails` instrumentation configuration option `log_injection` to `true` or by setting environment variable `DD_LOGS_INJECTION=true`:

```ruby
# config/initializers/datadog.rb
require 'ddtrace'

Datadog.configure do |c|
  c.use :rails, log_injection: true
end
```

_Note:_ For `lograge` users who have also defined `lograge.custom_options` in an `initializers/lograge.rb` configuration file, due to the order that Rails loads initializers (alphabetical), automatic trace correlation may not take effect, since `initializers/datadog.rb` would be overwritten by the `initializers/lograge.rb` initializer. To support automatic trace correlation with _existing_ `lograge.custom_options`, use the [Manual (Lograge)](#manual-lograge) configuration below.

##### Manual (Lograge)

After [setting up Lograge in a Rails application][43], manually modify the `custom_options` block in your environment configuration file (e.g. `config/environments/production.rb`) to add the trace IDs.

```ruby
config.lograge.custom_options = lambda do |event|
  # Retrieves trace information for current thread
  correlation = Datadog.tracer.active_correlation

  {
    # Adds IDs as tags to log output
    :dd => {
      # To preserve precision during JSON serialization, use strings for large numbers
      :trace_id => correlation.trace_id.to_s,
      :span_id => correlation.span_id.to_s,
      :env => correlation.env.to_s,
      :service => correlation.service.to_s,
      :version => correlation.version.to_s
    },
    :ddsource => ["ruby"],
    :params => event.payload[:params].reject { |k| %w(controller action).include? k }
  }
end
```

##### Manual (ActiveSupport::TaggedLogging)

Rails applications which are configured with the default `ActiveSupport::TaggedLogging` logger can append correlation IDs as tags to log output. To enable Trace Correlation with `ActiveSupport::TaggedLogging`, in your Rails environment configuration file, add the following:

```ruby
Rails.application.configure do
  config.log_tags = [proc { Datadog.tracer.active_correlation.to_s }]
end

# Given:
# DD_ENV = 'production' (The name of the environment your application is running in.)
# DD_SERVICE = 'billing-api' (Default service name of your application.)
# DD_VERSION = '2.5.17' (The version of your application.)

# Web requests will produce:
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Started GET "/articles" for 172.22.0.1 at 2019-01-16 18:50:57 +0000
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Processing by ArticlesController#index as */*
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206]   Article Load (0.5ms)  SELECT "articles".* FROM "articles"
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Completed 200 OK in 7ms (Views: 5.5ms | ActiveRecord: 0.5ms)
```

#### For logging in Ruby applications

To add correlation IDs to your logger, add a log formatter which retrieves the correlation IDs with `Datadog.tracer.active_correlation`, then add them to the message.

To properly correlate with Datadog logging, be sure the following is present in the log message, in order as they appear:

 - `dd.env=<ENV>`: Where `<ENV>` is equal to `Datadog.tracer.active_correlation.env`. Omit if no environment is configured.
 - `dd.service=<SERVICE>`: Where `<SERVICE>` is equal to `Datadog.tracer.active_correlation.service`. Omit if no default service name is configured.
 - `dd.version=<VERSION>`: Where `<VERSION>` is equal to `Datadog.tracer.active_correlation.version`. Omit if no application version is configured.
 - `dd.trace_id=<TRACE_ID>`: Where `<TRACE_ID>` is equal to `Datadog.tracer.active_correlation.trace_id` or `0` if no trace is active during logging.
 - `dd.span_id=<SPAN_ID>`: Where `<SPAN_ID>` is equal to `Datadog.tracer.active_correlation.span_id` or `0` if no trace is active during logging.

By default, `Datadog::Correlation::Identifier#to_s` will return `dd.env=<ENV> dd.service=<SERVICE> dd.version=<VERSION> dd.trace_id=<TRACE_ID> dd.span_id=<SPAN_ID>`.

If a trace is not active and the application environment & version is not configured, it will return `dd.trace_id=0 dd.span_id=0 dd.env= dd.version=`.

An example of this in practice:

```ruby
require 'ddtrace'
require 'logger'

ENV['DD_ENV'] = 'production'
ENV['DD_SERVICE'] = 'billing-api'
ENV['DD_VERSION'] = '2.5.17'

logger = Logger.new(STDOUT)
logger.progname = 'my_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog.tracer.active_correlation}] #{msg}\n"
end

# When no trace is active
logger.warn('This is an untraced operation.')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=0 dd.span_id=0] This is an untraced operation.

# When a trace is active
Datadog.tracer.trace('my.operation') { logger.warn('This is a traced operation.') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] This is a traced operation.
```

### Configuring the transport layer

By default, the tracer submits trace data using `Net::HTTP` to `127.0.0.1:8126`, the default location for the Datadog trace agent process. However, the tracer can be configured to send its trace data to alternative destinations, or by alternative protocols.

Some basic settings, such as hostname and port, can be configured using [tracer settings](#tracer-settings).

#### Using the Net::HTTP adapter

The `Net` adapter submits traces using `Net::HTTP` over TCP. It is the default transport adapter.

```ruby
Datadog.configure do |c|
  c.tracer.transport_options = proc { |t|
    # Hostname, port, and additional options. :timeout is in seconds.
    t.adapter :net_http, '127.0.0.1', 8126, { timeout: 1 }
  }
end
```

#### Using the Unix socket adapter

The `UnixSocket` adapter submits traces using `Net::HTTP` over Unix socket.

To use, first configure your trace agent to listen by Unix socket, then configure the tracer with:

```ruby
Datadog.configure do |c|
  c.tracer.transport_options = proc { |t|
    # Provide filepath to trace agent Unix socket
    t.adapter :unix, '/tmp/ddagent/trace.sock'
  }
end
```

#### Using the transport test adapter

The `Test` adapter is a no-op transport that can optionally buffer requests. For use in test suites or other non-production environments.

```ruby
Datadog.configure do |c|
  c.tracer.transport_options = proc { |t|
    # Set transport to no-op mode. Does not retain traces.
    t.adapter :test

    # Alternatively, you can provide a buffer to examine trace output.
    # The buffer must respond to '<<'.
    t.adapter :test, []
  }
end
```

#### Using a custom transport adapter

Custom adapters can be configured with:

```ruby
Datadog.configure do |c|
  c.tracer.transport_options = proc { |t|
    # Initialize and pass an instance of the adapter
    custom_adapter = CustomAdapter.new
    t.adapter custom_adapter
  }
end
```

### Metrics

The tracer and its integrations can produce some additional metrics that can provide useful insight into the performance of your application. These metrics are collected with `dogstatsd-ruby`, and can be sent to the same Datadog agent to which you send your traces.

To configure your application for metrics collection:

1. [Configure your Datadog agent for StatsD][44]
2. Add `gem 'dogstatsd-ruby'` to your Gemfile

#### For application runtime

If runtime metrics are configured, the trace library will automatically collect and send metrics about the health of your application.

To configure runtime metrics, add the following configuration:

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'ddtrace'

Datadog.configure do |c|
  # To enable runtime metrics collection, set `true`. Defaults to `false`
  # You can also set DD_RUNTIME_METRICS_ENABLED=true to configure this.
  c.runtime_metrics.enabled = true

  # Optionally, you can configure the Statsd instance used for sending runtime metrics.
  # Statsd is automatically configured with default settings if `dogstatsd-ruby` is available.
  # You can configure with host and port of Datadog agent; defaults to 'localhost:8125'.
  c.runtime_metrics.statsd = Datadog::Statsd.new
end
```

See the [Dogstatsd documentation][45] for more details about configuring `Datadog::Statsd`.

The stats are VM specific and will include:

| Name                        | Type    | Description                                              |
| --------------------------  | ------- | -------------------------------------------------------- |
| `runtime.ruby.class_count`  | `gauge` | Number of classes in memory space.                       |
| `runtime.ruby.thread_count` | `gauge` | Number of threads.                                       |
| `runtime.ruby.gc.*`.        | `gauge` | Garbage collection statistics: collected from `GC.stat`. |

In addition, all metrics include the following tags:

| Name         | Description                                             |
| ------------ | ------------------------------------------------------- |
| `language`   | Programming language traced. (e.g. `ruby`)              |
| `service`    | List of services this associated with this metric.      |

### OpenTracing

For setting up Datadog with OpenTracing, see out [Quickstart for OpenTracing](#quickstart-for-opentracing) section for details.

**Configuring Datadog tracer settings**

The underlying Datadog tracer can be configured by passing options (which match `Datadog::Tracer`) when configuring the global tracer:

```ruby
# Where `options` is a Hash of options provided to Datadog::Tracer
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(options)
```

It can also be configured by using `Datadog.configure` described in the [Tracer settings](#tracer-settings) section.

**Activating and configuring integrations**

By default, configuring OpenTracing with Datadog will not automatically activate any additional instrumentation provided by Datadog. You will only receive spans and traces from OpenTracing instrumentation you have in your application.

However, additional instrumentation provided by Datadog can be activated alongside OpenTracing using `Datadog.configure`, which can be used to enhance your tracing further. To activate this, see [Integration instrumentation](#integration-instrumentation) for more details.

**Supported serialization formats**

| Type                           | Supported? | Additional information |
| ------------------------------ | ---------- | ---------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | Yes        |                        |
| `OpenTracing::FORMAT_RACK`     | Yes        | Because of the loss of resolution in the Rack format, please note that baggage items with names containing either upper case characters or `-` will be converted to lower case and `_` in a round-trip respectively. We recommend avoiding these characters or accommodating accordingly on the receiving end. |
| `OpenTracing::FORMAT_BINARY`   | No         |                        |
[1]: https://docs.datadoghq.com/tracing/setup
[2]: https://docs.datadoghq.com/tracing/setup/docker/
[3]: https://app.datadoghq.com/apm/services
[4]: https://github.com/rails/rails/tree/master/actioncable
[5]: https://github.com/rails/rails/tree/master/actionview
[6]: https://github.com/rails-api/active_model_serializers
[7]: https://github.com/rails/rails/tree/master/actionpack
[8]: https://github.com/rails/rails/tree/master/activerecord
[9]: https://github.com/rails/rails/tree/master/activesupport
[10]: https://github.com/aws/aws-sdk-ruby
[11]: https://github.com/ruby-concurrency/concurrent-ruby
[12]: https://github.com/petergoldstein/dalli
[13]: https://github.com/collectiveidea/delayed_job
[14]: https://github.com/elastic/elasticsearch-ruby
[15]: https://github.com/typhoeus/ethon
[16]: https://github.com/excon/excon
[17]: https://github.com/lostisland/faraday
[18]: https://github.com/ruby-grape/grape
[19]: https://github.com/rmosolgo/graphql-ruby
[20]: https://github.com/grpc/grpc/tree/master/src/rubyc
[21]: https://github.com/httprb/http
[22]: https://github.com/zendesk/ruby-kafka
[23]: https://github.com/mongodb/mongo-ruby-driver
[24]: https://github.com/brianmario/mysql2
[25]: https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html
[26]: https://github.com/treasure-data/presto-client-ruby
[27]: https://github.com/que-rb/que
[28]: https://github.com/zendesk/racecar
[29]: https://github.com/rack/rack
[30]: https://github.com/rails/rails
[31]: https://github.com/ruby/rake
[32]: https://github.com/redis/redis-rb
[33]: https://github.com/resque/resque
[34]: https://github.com/rest-client/rest-client
[35]: https://github.com/jeremyevans/sequel
[36]: https://github.com/phstc/shoryuken
[37]: https://github.com/mperham/sidekiq
[38]: https://github.com/sinatra/sinatra
[39]: https://github.com/jondot/sneakers
[40]: https://github.com/brandonhilkert/sucker_punch
[41]: http://graphql-ruby.org/queries/tracing.html
[42]: https://app.datadoghq.com/apm/docs/tutorials/environments
[43]: https://docs.datadoghq.com/logs/log_collection/ruby/
[44]: https://docs.datadoghq.com/developers/dogstatsd/#setup
[45]: https://www.rubydoc.info/github/DataDog/dogstatsd-ruby/master/frames
