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
- link: "tracing/advanced_usage/"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---

## Installation and Getting Started

For configuration instructions, and details about using the API, check out Datadog's [API documentation][api docs] and [gem documentation][gem docs].

For descriptions of terminology used in APM, take a look at the [official documentation][visualization docs].

For details about contributing, check out the [development guide][development docs].

[api docs]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md
[gem docs]: http://gems.datadoghq.com/trace/docs/
[visualization docs]: https://docs.datadoghq.com/tracing/visualization/
[development docs]: https://github.com/DataDog/dd-trace-rb/blob/master/README.md#development

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

## Compatibility

### Integrations

#### Interpreter Compatibility

Ruby APM includes support for the following Ruby interpreters:


| Type                               | Version | Support type    |
| ---------------------------------- | -----   | --------------- |
| [MRI](https://www.ruby-lang.org/)  | 1.9.1   | Experimental    |
|                                    | 1.9.3   | Fully Supported |
|                                    | 2.0     | Fully Supported |
|                                    | 2.1     | Fully Supported |
|                                    | 2.2     | Fully Supported |
|                                    | 2.3     | Fully Supported |
|                                    | 2.4     | Fully Supported |
|                                    | 2.5     | Fully Supported |
| [JRuby](http://jruby.org/)         | 9.1.5   | Experimental    |

#### Web Server Compatibility

Ruby APM includes support for the following web servers:

| Type                                           | Version      | Support type    |
| ---------------------------------------------- | ------------ | --------------- |
| [Puma](http://puma.io/)                        | 2.16+ / 3.6+ | Fully Supported |
| [Unicorn](https://bogomips.org/unicorn/)       | 4.8+ / 5.1+  | Fully Supported |
| [Passenger](https://www.phusionpassenger.com/) | 5.0+         | Fully Supported |

#### Library Compatibility

Ruby APM includes support for the following libraries and frameworks:

| Name                 | Versions Supported     | Support type    | How to configure |
| -------------------- | ---------------------- | --------------- | ---------------- |
| [Active Record][11]  | `>= 3.2, < 6.0`        | Fully Supported | *[Link][10]*     |
| [AWS][13]            | `>= 2.0`               | Fully Supported | *[Link][12]*     |
| [Dalli][15]          | `>= 2.7`               | Fully Supported | *[Link][14]*     |
| [DelayedJob][53]     | `>= 4.1`               | Fully Supported | *[Link][52]*     |
| [Elastic Search][17] | `>= 6.0`               | Fully Supported | *[Link][16]*     |
| [Excon][19]          | `>= 0.62`              | Fully Supported | *[Link][18]*     |
| [Faraday][21]        | `>= 0.14`              | Fully Supported | *[Link][20]*     |
| [gRPC][23]           | `>= 1.10`              | Fully Supported | *[Link][22]*     |
| [Grape][25]          | `>= 1.0`               | Fully Supported | *[Link][24]*     |
| [GraphQL][27]        | `>= 1.7.9`             | Fully Supported | *[Link][26]*     |
| [MongoDB][29]        | `>= 2.0, < 2.5`        | Fully Supported | *[Link][28]*     |
| [MySQL2][55]         | `>= 0.5`               | Fully Supported | *[Link][54]*     |
| [Net/HTTP][31]       | *(Any Supported Ruby)* | Fully Supported | *[Link][30]*     |
| [Racecar][33]        | `>= 0.3.5`             | Fully Supported | *[Link][32]*     |
| [Rack][35]           | `>= 1.4.7`             | Fully Supported | *[Link][34]*     |
| [Rails][37]          | `>= 3.2, < 6.0`        | Fully Supported | *[Link][36]*     |
| [Rake][39]           | `>= 12.0`              | Fully Supported | *[Link][38]*     |
| [Redis][41]          | `>= 3.2, < 4.0`        | Fully Supported | *[Link][40]*     |
| [Resque][43]         | `>= 1.0, < 2.0`        | Fully Supported | *[Link][42]*     |
| [RestClient][57]     | `>= 1.8`               | Fully Supported | *[Link][56]*     |
| [Sequel][45]         | `>= 3.41`              | Fully Supported | *[Link][44]*     |
| [Sidekiq][47]        | `>= 4.0`               | Fully Supported | *[Link][46]*     |
| [Sinatra][49]        | `>= 1.4.5`             | Fully Supported | *[Link][48]*     |
| [Sucker Punch][51]   | `>= 2.0`               | Fully Supported | *[Link][50]*     |

*Fully Supported* support indicates all tracer features are available.

*Experimental* indicates most features should be available, but unverified.

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
[52]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#delayedjob
[53]: https://github.com/collectiveidea/delayed_job
[54]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#mysql2
[55]: https://github.com/brianmario/mysql2
[56]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#restclient
[57]: https://github.com/rest-client/rest-client

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

For more tracer settings, check out the [API documentation][6].

### Processing pipeline

The processing pipeline allows you to modify traces before they are sent to the Agent. This can be useful for customizing trace content or removing unwanted traces.

It provides **filtering** for removing spans that match certain criteria, and **processing** for modifying spans.

For more details about how to activate and configure the processing pipeline, check out the [API documentation][9].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup
[2]: /tracing/setup/docker/
[3]: https://app.datadoghq.com/apm/services
[4]: https://docs.datadoghq.com/tracing/visualization/
[6]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#tracer-settings
[7]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#priority-sampling
[9]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#processing-pipeline
