---
title: Tracing Ruby Applications
kind: Documentation
aliases:
- /tracing/ruby/
- /tracing/languages/ruby/
- /agent/apm/ruby/
further_reading:
- link: "https://github.com/DataDog/dd-trace-rb"
  tag: "GitHub"
  text: "Source code"
- link: "https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md"
  tag: "Documentation"
  text: "API documentation"
- link: "http://gems.datadoghq.com/trace/docs/"
  tag: "Rubydoc"
  text: "Gem documentation"
- link: "tracing/visualization/"
  tag: "Use the APM UI"
  text: "Explore your services, resources and traces"
- link: "tracing/advanced_usage/?tab=ruby"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---

## Installation and Getting Started

For configuration instructions, and details about using the API, check out Datadog's [API documentation][1] and [gem documentation][2].

For descriptions of terminology used in APM, take a look at the [official documentation][3].

For details about contributing, check out the [development guide][4].

### Setup the Datadog Agent

The Ruby APM tracer sends trace data through the Datadog Agent.

[Install and configure the Datadog Agent][5], see the additional documentation for [tracing Docker applications][6] or [Kubernetes applications][7].

### Quickstart for Rails applications

1. Add the `ddtrace` gem to your Gemfile:
    
    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace'
    ```

2. Install the gem with `bundle install`
3. Create a `config/initializers/datadog.rb` file containing:

    ```ruby
    require 'ddtrace'
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

After setting up, your services will appear on the [APM services page][8] within a few minutes. Learn more about [using the APM UI][9].

## Change Agent Hostname

Configure your application level tracers to submit traces to a custom Agent hostname:

The Ruby Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`

```ruby
Datadog.configure do |c|
  c.tracer hostname: ENV['DD_AGENT_HOST'],
           port: ENV['DD_TRACE_AGENT_PORT']
end
```

## Compatibility

### Integrations

#### Interpreter Compatibility

Ruby APM includes support for the following Ruby interpreters:


| Type                               | Version | Support type    |
| ---------------------------------- | -----   | --------------- |
| [MRI][10]  | 1.9.1   | Experimental    |
|                                    | 1.9.3   | Fully Supported |
|                                    | 2.0     | Fully Supported |
|                                    | 2.1     | Fully Supported |
|                                    | 2.2     | Fully Supported |
|                                    | 2.3     | Fully Supported |
|                                    | 2.4     | Fully Supported |
|                                    | 2.5     | Fully Supported |
| [JRuby][11]         | 9.1.5   | Experimental    |

#### Web Server Compatibility

Ruby APM includes support for the following web servers:

| Type                                           | Version      | Support type    |
| ---------------------------------------------- | ------------ | --------------- |
| [Puma][12]                        | 2.16+ / 3.6+ | Fully Supported |
| [Unicorn][13]       | 4.8+ / 5.1+  | Fully Supported |
| [Passenger][14] | 5.0+         | Fully Supported |

#### Library Compatibility

Ruby APM includes support for the following libraries and frameworks:

| Name                           | Versions Supported     | Support type    | How to configure |
| ------------------------------ | ---------------------- | --------------- | ---------------- |
| [Active Model Serializers][15] | `>= 0.9`               | Fully Supported | *[Link][16]*     |
| [Active Record][17]            | `>= 3.2, < 6.0`        | Fully Supported | *[Link][18]*     |
| [AWS][19]                      | `>= 2.0`               | Fully Supported | *[Link][20]*     |
| [Concurrent Ruby][21]          | `>= 0.9`               | Fully Supported | *[Link][22]*     |
| [Dalli][23]                    | `>= 2.7`               | Fully Supported | *[Link][24]*     |
| [DelayedJob][25]               | `>= 4.1`               | Fully Supported | *[Link][26]*     |
| [Elastic Search][27]           | `>= 6.0`               | Fully Supported | *[Link][28]*     |
| [Excon][29]                    | `>= 0.62`              | Fully Supported | *[Link][30]*     |
| [Faraday][31]                  | `>= 0.14`              | Fully Supported | *[Link][32]*     |
| [Grape][33]                    | `>= 1.0`               | Fully Supported | *[Link][34]*     |
| [GraphQL][35]                  | `>= 1.7.9`             | Fully Supported | *[Link][36]*     |
| [gRPC][37]                     | `>= 1.10`              | Fully Supported | *[Link][38]*     |
| [MongoDB][39]                  | `>= 2.0, < 2.5`        | Fully Supported | *[Link][40]*     |
| [MySQL2][41]                   | `>= 0.3.10`            | Fully Supported | *[Link][42]*     |
| [Net/HTTP][43]                 | *(Any Supported Ruby)* | Fully Supported | *[Link][44]*     |
| [Racecar][45]                  | `>= 0.3.5`             | Fully Supported | *[Link][46]*     |
| [Rack][47]                     | `>= 1.4.7`             | Fully Supported | *[Link][48]*     |
| [Rails][49]                    | `>= 3.2, < 6.0`        | Fully Supported | *[Link][50]*     |
| [Rake][51]                     | `>= 12.0`              | Fully Supported | *[Link][52]*     |
| [Redis][53]                    | `>= 3.2, < 4.0`        | Fully Supported | *[Link][54]*     |
| [Resque][55]                   | `>= 1.0, < 2.0`        | Fully Supported | *[Link][56]*     |
| [RestClient][57]               | `>= 1.8`               | Fully Supported | *[Link][58]*     |
| [Sequel][59]                   | `>= 3.41`              | Fully Supported | *[Link][60]*     |
| [Shoryuken][61]                | `>= 4.0.2`             | Fully Supported | *[Link][62]*     |
| [Sidekiq][63]                  | `>= 4.0`               | Fully Supported | *[Link][64]*     |
| [Sinatra][65]                  | `>= 1.4.5`             | Fully Supported | *[Link][66]*     |
| [Sucker Punch][67]             | `>= 2.0`               | Fully Supported | *[Link][68]*     |

*Fully Supported* support indicates all tracer features are available.

*Experimental* indicates most features should be available, but unverified.

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

For more tracer settings, check out the [API documentation][61].

### Processing pipeline

The processing pipeline allows you to modify traces before they are sent to the Agent. This can be useful for customizing trace content or removing unwanted traces.

It provides **filtering** for removing spans that match certain criteria, and **processing** for modifying spans.

For more details about how to activate and configure the processing pipeline, check out the [API documentation][62].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md
[2]: http://gems.datadoghq.com/trace/docs
[3]: /tracing/visualization
[4]: https://github.com/DataDog/dd-trace-rb/blob/master/README.md#development
[5]: /tracing/setup
[6]: /tracing/setup/docker
[7]: /agent/kubernetes/daemonset_setup/#trace-collection
[8]: https://app.datadoghq.com/apm/services
[9]: /tracing/visualization
[10]: https://www.ruby-lang.org
[11]: http://jruby.org
[12]: http://puma.io
[13]: https://bogomips.org/unicorn
[14]: https://www.phusionpassenger.com
[15]: https://github.com/rails-api/active_model_serializers
[16]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#active-model-serializers
[17]: https://github.com/rails/rails/tree/master/activerecord
[18]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#active-record
[19]: https://github.com/aws/aws-sdk-ruby
[20]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#aws
[21]: https://github.com/ruby-concurrency/concurrent-ruby
[22]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#concurrent-ruby
[23]: https://github.com/petergoldstein/dalli
[24]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#dalli
[25]: https://github.com/collectiveidea/delayed_job
[26]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#delayedjob
[27]: https://github.com/elastic/elasticsearch-ruby
[28]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#elastic-search
[29]: https://github.com/excon/excon
[30]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#excon
[31]: https://github.com/lostisland/faraday
[32]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#faraday
[33]: https://github.com/ruby-grape/grape
[34]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#grape
[35]: https://github.com/rmosolgo/graphql-ruby
[36]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#graphql
[37]: https://github.com/grpc/grpc/tree/master/src/ruby
[38]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#grpc
[39]: https://github.com/mongodb/mongo-ruby-driver
[40]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#mongodb
[41]: https://github.com/brianmario/mysql2
[42]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#mysql2
[43]: https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html
[44]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#nethttp
[45]: https://github.com/zendesk/racecar
[46]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#racecar
[47]: https://github.com/rack/rack
[48]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rack
[49]: https://github.com/rails/rails
[50]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rails
[51]: https://github.com/ruby/rake
[52]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rake
[53]: https://github.com/redis/redis-rb
[54]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#redis
[55]: https://github.com/resque/resque
[56]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#resque
[57]: https://github.com/rest-client/rest-client
[58]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rest-client
[59]: https://github.com/jeremyevans/sequel
[60]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sequel
[61]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#tracer-settings
[62]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#processing-pipeline
[63]: https://github.com/mperham/sidekiq
[64]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sidekiq
[65]: https://github.com/sinatra/sinatra
[66]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sinatra
[67]: https://github.com/brandonhilkert/sucker_punch
[68]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sucker-punch
