---
title: Tracing Ruby Applications
kind: Documentation
aliases:
- /tracing/ruby/
- /tracing/languages/ruby/
further_reading:
- link: "https://github.com/DataDog/dd-trace-rb"
  tag: "Github"
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

[Install and configure the Datadog Agent][5], see additional documentation for [tracing Docker applications][6].

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

After setting up, your services will appear on the [APM services page][7] within a few minutes. Learn more about [using the APM UI][8].

## Compatibility

### Integrations

#### Interpreter Compatibility

Ruby APM includes support for the following Ruby interpreters:


| Type                               | Version | Support type    |
| ---------------------------------- | -----   | --------------- |
| [MRI][9]  | 1.9.1   | Experimental    |
|                                    | 1.9.3   | Fully Supported |
|                                    | 2.0     | Fully Supported |
|                                    | 2.1     | Fully Supported |
|                                    | 2.2     | Fully Supported |
|                                    | 2.3     | Fully Supported |
|                                    | 2.4     | Fully Supported |
|                                    | 2.5     | Fully Supported |
| [JRuby][10]         | 9.1.5   | Experimental    |

#### Web Server Compatibility

Ruby APM includes support for the following web servers:

| Type                                           | Version      | Support type    |
| ---------------------------------------------- | ------------ | --------------- |
| [Puma][11]                        | 2.16+ / 3.6+ | Fully Supported |
| [Unicorn][12]       | 4.8+ / 5.1+  | Fully Supported |
| [Passenger][13] | 5.0+         | Fully Supported |

#### Library Compatibility

Ruby APM includes support for the following libraries and frameworks:

| Name                           | Versions Supported     | Support type    | How to configure |
| ------------------------------ | ---------------------- | --------------- | ---------------- |
| [Active Model Serializers][14] | `>= 0.9`               | Fully Supported | *[Link][15]*     |
| [Active Record][16]            | `>= 3.2, < 6.0`        | Fully Supported | *[Link][17]*     |
| [AWS][18]                      | `>= 2.0`               | Fully Supported | *[Link][19]*     |
| [Concurrent Ruby][20]          | `>= 0.9`               | Fully Supported | *[Link][21]*     |
| [Dalli][22]                    | `>= 2.7`               | Fully Supported | *[Link][23]*     |
| [DelayedJob][24]               | `>= 4.1`               | Fully Supported | *[Link][25]*     |
| [Elastic Search][26]           | `>= 6.0`               | Fully Supported | *[Link][27]*     |
| [Excon][28]                    | `>= 0.62`              | Fully Supported | *[Link][29]*     |
| [Faraday][30]                  | `>= 0.14`              | Fully Supported | *[Link][31]*     |
| [Grape][32]                    | `>= 1.0`               | Fully Supported | *[Link][33]*     |
| [GraphQL][34]                  | `>= 1.7.9`             | Fully Supported | *[Link][35]*     |
| [gRPC][36]                     | `>= 1.10`              | Fully Supported | *[Link][37]*     |
| [MongoDB][38]                  | `>= 2.0, < 2.5`        | Fully Supported | *[Link][39]*     |
| [MySQL2][40]                   | `>= 0.3.10`            | Fully Supported | *[Link][41]*     |
| [Net/HTTP][42]                 | *(Any Supported Ruby)* | Fully Supported | *[Link][43]*     |
| [Racecar][44]                  | `>= 0.3.5`             | Fully Supported | *[Link][45]*     |
| [Rack][46]                     | `>= 1.4.7`             | Fully Supported | *[Link][47]*     |
| [Rails][48]                    | `>= 3.2, < 6.0`        | Fully Supported | *[Link][49]*     |
| [Rake][50]                     | `>= 12.0`              | Fully Supported | *[Link][51]*     |
| [Redis][52]                    | `>= 3.2, < 4.0`        | Fully Supported | *[Link][53]*     |
| [Resque][54]                   | `>= 1.0, < 2.0`        | Fully Supported | *[Link][55]*     |
| [RestClient][56]               | `>= 1.8`               | Fully Supported | *[Link][57]*     |
| [Sequel][58]                   | `>= 3.41`              | Fully Supported | *[Link][59]*     |
| [Sidekiq][60]                  | `>= 4.0`               | Fully Supported | *[Link][61]*     |
| [Sinatra][62]                  | `>= 1.4.5`             | Fully Supported | *[Link][63]*     |
| [Sucker Punch][64]             | `>= 2.0`               | Fully Supported | *[Link][65]*     |

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

For more tracer settings, check out the [API documentation][66].

### Processing pipeline

The processing pipeline allows you to modify traces before they are sent to the Agent. This can be useful for customizing trace content or removing unwanted traces.

It provides **filtering** for removing spans that match certain criteria, and **processing** for modifying spans.

For more details about how to activate and configure the processing pipeline, check out the [API documentation][67].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md
[2]: http://gems.datadoghq.com/trace/docs
[3]: /tracing/visualization
[4]: https://github.com/DataDog/dd-trace-rb/blob/master/README.md#development
[5]: /tracing/setup
[6]: /tracing/setup/docker
[7]: https://app.datadoghq.com/apm/services
[8]: /tracing/visualization
[9]: https://www.ruby-lang.org
[10]: http://jruby.org
[11]: http://puma.io
[12]: https://bogomips.org/unicorn
[13]: https://www.phusionpassenger.com
[14]: https://github.com/rails-api/active_model_serializers
[15]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#active-model-serializers
[16]: https://github.com/rails/rails/tree/master/activerecord
[17]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#active-record
[18]: https://github.com/aws/aws-sdk-ruby
[19]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#aws
[20]: https://github.com/ruby-concurrency/concurrent-ruby
[21]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#concurrent-ruby
[22]: https://github.com/petergoldstein/dalli
[23]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#dalli
[24]: https://github.com/collectiveidea/delayed_job
[25]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#delayedjob
[26]: https://github.com/elastic/elasticsearch-ruby
[27]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#elastic-search
[28]: https://github.com/excon/excon
[29]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#excon
[30]: https://github.com/lostisland/faraday
[31]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#faraday
[32]: https://github.com/ruby-grape/grape
[33]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#grape
[34]: https://github.com/rmosolgo/graphql-ruby
[35]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#graphql
[36]: https://github.com/grpc/grpc/tree/master/src/ruby
[37]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#grpc
[38]: https://github.com/mongodb/mongo-ruby-driver
[39]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#mongodb
[40]: https://github.com/brianmario/mysql2
[41]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#mysql2
[42]: https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html
[43]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#nethttp
[44]: https://github.com/zendesk/racecar
[45]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#racecar
[46]: https://github.com/rack/rack
[47]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rack
[48]: https://github.com/rails/rails
[49]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rails
[50]: https://github.com/ruby/rake
[51]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rake
[52]: https://github.com/redis/redis-rb
[53]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#redis
[54]: https://github.com/resque/resque
[55]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#resque
[56]: https://github.com/rest-client/rest-client
[57]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rest-client
[58]: https://github.com/jeremyevans/sequel
[59]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sequel
[60]: https://github.com/mperham/sidekiq
[61]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sidekiq
[62]: https://github.com/sinatra/sinatra
[63]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sinatra
[64]: https://github.com/brandonhilkert/sucker_punch
[65]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sucker-punch
[66]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#tracer-settings
[67]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#processing-pipeline
