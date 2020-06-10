---
title: Ruby Compatibility Requirements
dependencies:
- https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md
kind: documentation
description: 'Compatibility Requirements for the Ruby tracer.'
further_reading:
    - link: 'tracing/setup/ruby'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

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
|       |                            | 1.9.3   | Maintenance (until August 6th, 2020) | < 0.27.0            |
|       |                            | 1.9.1   | Maintenance (until August 6th, 2020) | < 0.27.0            |
| JRuby | http://jruby.org/          | 9.2.0.0 | Alpha                                | Latest              |

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

| Name                     | Key                        | Versions Supported       | How to configure                    | Gem source                                                                     |
| ------------------------ | -------------------------- | ------------------------ | ----------------------------------- | ------------------------------------------------------------------------------ |
| Action Cable             | `action_cable`             | `>= 5.0`                 | *[Link](#action-cable)*             | *[Link][1]*               |
| Action View              | `action_view`              | `>= 3.0`                 | *[Link](#action-view)*              | *[Link][2]*                |
| Active Model Serializers | `active_model_serializers` | `>= 0.9`                 | *[Link](#active-model-serializers)* | *[Link][3]*                |
| Action Pack              | `action_pack`              | `>= 3.0`                 | *[Link](#action-pack)*              | *[Link][4]*                |
| Active Record            | `active_record`            | `>= 3.0`                 | *[Link](#active-record)*            | *[Link][5]*              |
| Active Support           | `active_support`           | `>= 3.0`                 | *[Link](#active-support)*           | *[Link][6]*             |
| AWS                      | `aws`                      | `>= 2.0`                 | *[Link](#aws)*                      | *[Link][7]*                                  |
| Concurrent Ruby          | `concurrent_ruby`          | `>= 0.9`                 | *[Link](#concurrent-ruby)*          | *[Link][8]*                  |
| Dalli                    | `dalli`                    | `>= 2.0`                 | *[Link](#dalli)*                    | *[Link][9]*                              |
| DelayedJob               | `delayed_job`              | `>= 4.1`                 | *[Link](#delayedjob)*               | *[Link][10]*                        |
| Elasticsearch            | `elasticsearch`            | `>= 1.0`                 | *[Link](#elasticsearch)*            | *[Link][11]*                        |
| Ethon                    | `ethon`                    | `>= 0.11`                | *[Link](#ethon)*                    | *[Link][12]*                                    |
| Excon                    | `excon`                    | `>= 0.50`                | *[Link](#excon)*                    | *[Link][13]*                                       |
| Faraday                  | `faraday`                  | `>= 0.14`                | *[Link](#faraday)*                  | *[Link][14]*                                |
| Grape                    | `grape`                    | `>= 1.0`                 | *[Link](#grape)*                    | *[Link][15]*                                  |
| GraphQL                  | `graphql`                  | `>= 1.7.9`               | *[Link](#graphql)*                  | *[Link][16]*                             |
| gRPC                     | `grpc`                     | `>= 1.7`                 | *[Link](#grpc)*                     | *[Link][17]*                   |
| MongoDB                  | `mongo`                    | `>= 2.1`                 | *[Link](#mongodb)*                  | *[Link][18]*                         |
| MySQL2                   | `mysql2`                   | `>= 0.3.21`              | *[Link](#mysql2)*                   | *[Link][19]*                                 |
| Net/HTTP                 | `http`                     | *(Any supported Ruby)*   | *[Link](#nethttp)*                  | *[Link][20]* |
| Presto                   | `presto`                   | `>= 0.5.14`              | *[Link](#presto)*                   | *[Link][21]*                  |
| Racecar                  | `racecar`                  | `>= 0.3.5`               | *[Link](#racecar)*                  | *[Link][22]*                                   |
| Rack                     | `rack`                     | `>= 1.1`                 | *[Link](#rack)*                     | *[Link][23]*                                         |
| Rails                    | `rails`                    | `>= 3.0`                 | *[Link](#rails)*                    | *[Link][24]*                                       |
| Rake                     | `rake`                     | `>= 12.0`                | *[Link](#rake)*                     | *[Link][25]*                                         |
| Redis                    | `redis`                    | `>= 3.2`                 | *[Link](#redis)*                    | *[Link][26]*                                    |
| Resque                   | `resque`                   | `>= 1.0, < 2.0`          | *[Link](#resque)*                   | *[Link][27]*                                     |
| Rest Client              | `rest-client`              | `>= 1.8`                 | *[Link](#rest-client)*              | *[Link][28]*                           |
| Sequel                   | `sequel`                   | `>= 3.41`                | *[Link](#sequel)*                   | *[Link][29]*                                |
| Shoryuken                | `shoryuken`                | `>= 3.2`                 | *[Link](#shoryuken)*                | *[Link][30]*                                   |
| Sidekiq                  | `sidekiq`                  | `>= 3.5.4`               | *[Link](#sidekiq)*                  | *[Link][31]*                                   |
| Sinatra                  | `sinatra`                  | `>= 1.4`                 | *[Link](#sinatra)*                  | *[Link][32]*                                   |
| Sucker Punch             | `sucker_punch`             | `>= 2.0`                 | *[Link](#sucker-punch)*             | *[Link][33]*                       |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |
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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `orm_service_name` | Service name used for the Ruby ORM portion of `active_record` instrumentation. Overrides service name for ORM spans if explicitly set, which otherwise inherit their service from their parent. | `'active_record'` |
| `service_name` | Service name used for database portion of `active_record` instrumentation. | Name of database adapter (e.g. `'mysql2'`) |
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually, you don't need to set this. | `Datadog.tracer` |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

### DelayedJob

The DelayedJob integration uses lifecycle hooks to trace the job executions.

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `distributed_tracing` | Enables [distributed tracing][34] | `true` |
| `service_name` | Service name for `ethon` instrumentation. | `'ethon'` |
| `split_by_domain` | Uses the request domain as the service name when set to `true`. | `false` |
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `distributed_tracing` | Enables [distributed tracing][34] | `true` |
| `error_handler` | A `Proc` that accepts a `response` parameter. If it evaluates to a *truthy* value, the trace span is marked as an error. By default only sets 5XX responses as errors. | `nil` |
| `service_name` | Service name for Excon instrumentation. When provided to middleware for a specific connection, it applies only to that connection object. | `'excon'` |
| `split_by_domain` | Uses the request domain as the service name when set to `true`. | `false` |
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `distributed_tracing` | Enables [distributed tracing][34] | `true` |
| `error_handler` | A `Proc` that accepts a `response` parameter. If it evaluates to a *truthy* value, the trace span is marked as an error. By default only sets 5XX responses as errors. | `nil` |
| `service_name` | Service name for Faraday instrumentation. When provided to middleware for a specific connection, it applies only to that connection object. | `'faraday'` |
| `split_by_domain` | Uses the request domain as the service name when set to `true`. | `false` |
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually, you don't need to set this. | `Datadog.tracer` |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

**Manually configuring GraphQL schemas**

If you prefer to individually configure the tracer settings for a schema (e.g. you have multiple schemas with different service names), in the schema definition, you can add the following [using the GraphQL API][35]:

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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

### MongoDB

The integration traces any `Command` that is sent from the [MongoDB Ruby Driver][18] to a MongoDB cluster. By extension, Object Document Mappers (ODM) such as Mongoid are automatically instrumented if they use the official Ruby driver. To activate the integration, simply:

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `distributed_tracing` | Enables [distributed tracing][34] | `true` |
| `service_name` | Service name used for `http` instrumentation | `'net/http'` |
| `split_by_domain` | Uses the request domain as the service name when set to `true`. | `false` |
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `distributed_tracing` | Enables [distributed tracing][34] so that this service trace is connected with a trace of another service if tracing headers are received | `true` |
| `headers` | Hash of HTTP request or response headers to add as tags to the `rack.request`. Accepts `request` and `response` keys with Array values e.g. `['Last-Modified']`. Adds `http.request.headers.*` and `http.response.headers.*` tags respectively. | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `middleware_names` | Enable this if you want to use the middleware classes as the resource names for `rack` spans. Requires `application` option to use. | `false` |
| `quantize` | Hash containing options for quantization. May include `:query` or `:fragment`. | `{}` |
| `quantize.query` | Hash containing options for query portion of URL quantization. May include `:show` or `:exclude`. See options below. Option must be nested inside the `quantize` option. | `{}` |
| `quantize.query.show` | Defines which values should always be shown. Shows no values by default. May be an Array of strings, or `:all` to show all values. Option must be nested inside the `query` option. | `nil` |
| `quantize.query.exclude` | Defines which values should be removed entirely. Excludes nothing by default. May be an Array of strings, or `:all` to remove the query string entirely. Option must be nested inside the `query` option. | `nil` |
| `quantize.fragment` | Defines behavior for URL fragments. Removes fragments by default. May be `:show` to show URL fragments. Option must be nested inside the `quantize` option. | `nil` |
| `request_queuing` | Track HTTP request time spent in the queue of the frontend server. See [HTTP request queuing](#http-request-queuing) for setup details. Set to `true` to enable. | `false` |
| `service_name` | Service name used for `rack` instrumentation | `'rack'` |
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |
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
| `distributed_tracing` | Enables [distributed tracing][34] so that this service trace is connected with a trace of another service if tracing headers are received | `true` |
| `exception_controller` | Class or Module which identifies a custom exception controller class. Tracer provides improved error behavior when it can identify custom exception controllers. By default, without this option, it 'guesses' what a custom exception controller looks like. Providing this option aids this identification. | `nil` |
| `middleware` | Add the trace middleware to the Rails application. Set to `false` if you don't want the middleware to load. | `true` |
| `middleware_names` | Enables any short-circuited middleware requests to display the middleware name as a resource for the trace. | `false` |
| `service_name` | Service name used when tracing application requests (on the `rack` level) | `'<app_name>'` (inferred from your Rails application namespace) |
| `template_base_path` | Used when the template name is parsed. If you don't store your templates in the `views/` folder, you may need to change this value | `'views/'` |
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually, you don't need to set this. | `Datadog.tracer` |

**Supported versions**

| Ruby Versions | Supported Rails Versions |
| ------------- | ------------------------ |
|  2.0          |  3.0 - 3.2               |
|  2.1          |  3.0 - 4.2               |
|  2.2 - 2.3    |  3.0 - 5.2               |
|  2.4          |  4.2.8 - 5.2             |
|  2.5          |  4.2.8 - 6.0             |
|  2.6 - 2.7    |  5.0 - 6.0               |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually, you don't need to set this. | `Datadog.tracer` |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

You can also set *per-instance* configuration as it follows:

```ruby
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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually, you don't need to set this. | `Datadog.tracer` |
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
| `distributed_tracing` | Enables [distributed tracing][34] | `true` |
| `service_name` | Service name for `rest_client` instrumentation. | `'rest_client'` |
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `distributed_tracing` | Enables [distributed tracing][34] so that this service trace is connected with a trace of another service if tracing headers are received | `true` |
| `headers` | Hash of HTTP request or response headers to add as tags to the `sinatra.request`. Accepts `request` and `response` keys with Array values e.g. `['Last-Modified']`. Adds `http.request.headers.*` and `http.response.headers.*` tags respectively. | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `resource_script_names` | Prepend resource names with script name | `false` |
| `service_name` | Service name used for `sinatra` instrumentation | `'sinatra'` |
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |

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
| `tracer` | `Datadog::Tracer` used to perform instrumentation. Usually you don't need to set this. | `Datadog.tracer` |



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/rails/rails/tree/master/actioncable
[2]: https://github.com/rails/rails/tree/master/actionview
[3]: https://github.com/rails-api/active_model_serializers
[4]: https://github.com/rails/rails/tree/master/actionpack
[5]: https://github.com/rails/rails/tree/master/activerecord
[6]: https://github.com/rails/rails/tree/master/activesupport
[7]: https://github.com/aws/aws-sdk-ruby
[8]: https://github.com/ruby-concurrency/concurrent-ruby
[9]: https://github.com/petergoldstein/dalli
[10]: https://github.com/collectiveidea/delayed_job
[11]: https://github.com/elastic/elasticsearch-ruby
[12]: https://github.com/typhoeus/ethon
[13]: https://github.com/excon/excon
[14]: https://github.com/lostisland/faraday
[15]: https://github.com/ruby-grape/grape
[16]: https://github.com/rmosolgo/graphql-ruby
[17]: https://github.com/grpc/grpc/tree/master/src/rubyc
[18]: https://github.com/mongodb/mongo-ruby-driver
[19]: https://github.com/brianmario/mysql2
[20]: https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html
[21]: https://github.com/treasure-data/presto-client-ruby
[22]: https://github.com/zendesk/racecar
[23]: https://github.com/rack/rack
[24]: https://github.com/rails/rails
[25]: https://github.com/ruby/rake
[26]: https://github.com/redis/redis-rb
[27]: https://github.com/resque/resque
[28]: https://github.com/rest-client/rest-client
[29]: https://github.com/jeremyevans/sequel
[30]: https://github.com/phstc/shoryuken
[31]: https://github.com/mperham/sidekiq
[32]: https://github.com/sinatra/sinatra
[33]: https://github.com/brandonhilkert/sucker_punch
[34]: tracing/setup/ruby/#distributed-tracing
[35]: http://graphql-ruby.org/queries/tracing.html
