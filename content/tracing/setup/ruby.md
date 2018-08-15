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

    You can also activate additional integrations here (see [Integration instrumentation](#integration-instrumentation))

### Quickstart for other Ruby applications

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
    1. Activate integration instrumentation (see [Integration instrumentation](#integration-instrumentation))
    2. Add manual instrumentation around your code (see [Manual instrumentation](#manual-instrumentation))

### Final steps for installation

After setting up, your services will appear on the [APM services page][3] within a few minutes. Learn more about [using the APM UI][4].

## Configuration

To activate more advanced features, change tracer behavior, or trace additional code, you must add additional configuration.

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

### Processing pipeline

The processing Pipeline allows you to modify traces before they are sent to the agent. This can be useful for customizing trace content or removing unwanted traces.

It provides **filtering** for removing spans that match certain criteria, and **processing** for modifying spans.

For more details about how to activate and configure the processing pipeline, check out the [API documentation][9].

## Compatibility

### Interpreter Compatibility

Ruby APM includes support for the following Ruby interpreters:

___

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

*Full* support indicates all tracer features are available.

*Experimental* indicates most features should be available, but unverified.

### Web server compatibility

Ruby APM includes support for the following web servers:

___

| Type      | Documentation                     | Version      | Support type |
| --------- | --------------------------------- | ------------ | ------------ |
| Puma      | http://puma.io/                   | 2.16+ / 3.6+ | Full         |
| Unicorn   | https://bogomips.org/unicorn/     | 4.8+ / 5.1+  | Full         |
| Passenger | https://www.phusionpassenger.com/ | 5.0+         | Full         |

### Library compatibility

Ruby APM includes support for the following libraries and frameworks:

| Name           | Key             | Versions Supported     | How to configure | Gem source   |
| ------         | ----            | -----                  | -------          | ---------    |
| Active Record  | `active_record` | `>= 3.2, < 5.2`        | *[Link][10]*     | *[Link][11]* |
| AWS            | `aws`           | `>= 2.0`               | *[Link][12]*     | *[Link][13]* |
| Dalli          | `dalli`         | `>= 2.7`               | *[Link][14]*     | *[Link][15]* |
| Elastic Search | `elasticsearch` | `>= 6.0`               | *[Link][16]*     | *[Link][17]* |
| Excon          | `excon`         | `>= 0.62`              | *[Link][18]*     | *[Link][19]* |
| Faraday        | `faraday`       | `>= 0.14`              | *[Link][20]*     | *[Link][21]* |
| gRPC           | `grpc`          | `>= 1.10`              | *[Link][22]*     | *[Link][23]* |
| Grape          | `grape`         | `>= 1.0`               | *[Link][24]*     | *[Link][25]* |
| GraphQL        | `graphql`       | `>= 1.7.9`             | *[Link][26]*     | *[Link][27]* |
| MongoDB        | `mongo`         | `>= 2.0, < 2.5`        | *[Link][28]*     | *[Link][29]* |
| Net/HTTP       | `http`          | *(Any supported Ruby)* | *[Link][30]*     | *[Link][31]* |
| Racecar        | `racecar`       | `>= 0.3.5`             | *[Link][32]*     | *[Link][33]* |
| Rack           | `rack`          | `>= 1.4.7`             | *[Link][34]*     | *[Link][35]* |
| Rails          | `rails`         | `>= 3.2, < 5.2`        | *[Link][36]*     | *[Link][37]* |
| Rake           | `rake`          | `>= 12.0`              | *[Link][38]*     | *[Link][39]* |
| Redis          | `redis`         | `>= 3.2, < 4.0`        | *[Link][40]*     | *[Link][41]* |
| Resque         | `resque`        | `>= 1.0, < 2.0`        | *[Link][42]*     | *[Link][43]* |
| Sequel         | `sequel`        | `>= 3.41`              | *[Link][44]*     | *[Link][45]* |
| Sidekiq        | `sidekiq`       | `>= 4.0`               | *[Link][46]*     | *[Link][47]* |
| Sinatra        | `sinatra`       | `>= 1.4.5`             | *[Link][48]*     | *[Link][49]* |
| Sucker Punch   | `sucker_punch`  | `>= 2.0`               | *[Link][50]*     | *[Link][51]* |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup
[2]: /tracing/setup/docker/
[3]: https://app.datadoghq.com/apm/services
[4]: https://docs.datadoghq.com/tracing/visualization/
[6]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#tracer-settings
[7]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#priority-sampling
[9]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#processing-pipeline
[10]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#active-record
[11]: https://github.com/rails/rails/tree/master/activerecord
[12]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#aws
[13]: https://github.com/aws/aws-sdk-ruby
[14]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#dalli
[15]: https://github.com/petergoldstein/dalli
[16]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#elastic-search
[17]: https://github.com/elastic/elasticsearch-ruby
[18]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#excon
[19]: https://github.com/excon/excon
[20]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#faraday
[21]: https://github.com/lostisland/faraday
[22]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#grpc
[23]: https://github.com/grpc/grpc/tree/master/src/ruby
[24]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#grape
[25]: https://github.com/ruby-grape/grape
[26]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#graphql
[27]: https://github.com/rmosolgo/graphql-ruby
[28]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#mongodb
[29]: https://github.com/mongodb/mongo-ruby-driver
[30]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#nethttp
[31]: https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html
[32]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#racecar
[33]: https://github.com/zendesk/racecar
[34]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rack
[35]: https://github.com/rack/rack
[36]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rails
[37]: https://github.com/rails/rails
[38]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rake
[39]: https://github.com/ruby/rake
[40]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#redis
[41]: https://github.com/redis/redis-rb
[42]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#resque
[43]: https://github.com/resque/resque
[44]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sequel
[45]: https://github.com/jeremyevans/sequel
[46]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sidekiq
[47]: https://github.com/mperham/sidekiq
[48]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sinatra
[49]: https://github.com/sinatra/sinatra
[50]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sucker-punch
[51]: https://github.com/brandonhilkert/sucker_punch
