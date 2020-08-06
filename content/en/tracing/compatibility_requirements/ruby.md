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
| Action Cable             | `action_cable`             | `>= 5.0`                 | `>= 5.0`                  | *[Link](#action-cable)*             | *[Link][1]*               |
| Action View              | `action_view`              | `>= 3.0`                 | `>= 3.0`                  | *[Link](#action-view)*              | *[Link][2]*                |
| Active Model Serializers | `active_model_serializers` | `>= 0.9`                 | `>= 0.9`                  | *[Link](#active-model-serializers)* | *[Link][3]*                |
| Action Pack              | `action_pack`              | `>= 3.0`                 | `>= 3.0`                  | *[Link](#action-pack)*              | *[Link][4]*                |
| Active Record            | `active_record`            | `>= 3.0`                 | `>= 3.0`                  | *[Link](#active-record)*            | *[Link][5]*              |
| Active Support           | `active_support`           | `>= 3.0`                 | `>= 3.0`                  | *[Link](#active-support)*           | *[Link][6]*             |
| AWS                      | `aws`                      | `>= 2.0`                 | `>= 2.0`                  | *[Link](#aws)*                      | *[Link][7]*                                  |
| Concurrent Ruby          | `concurrent_ruby`          | `>= 0.9`                 | `>= 0.9`                  | *[Link](#concurrent-ruby)*          | *[Link][8]*                  |
| Dalli                    | `dalli`                    | `>= 2.0`                 | `>= 2.0`                  | *[Link](#dalli)*                    | *[Link][9]*                              |
| DelayedJob               | `delayed_job`              | `>= 4.1`                 | `>= 4.1`                  | *[Link](#delayedjob)*               | *[Link][10]*                        |
| Elasticsearch            | `elasticsearch`            | `>= 1.0`                 | `>= 1.0`                  | *[Link](#elasticsearch)*            | *[Link][11]*                        |
| Ethon                    | `ethon`                    | `>= 0.11`                | `>= 0.11`                 | *[Link](#ethon)*                    | *[Link][12]*                                    |
| Excon                    | `excon`                    | `>= 0.50`                | `>= 0.50`                 | *[Link](#excon)*                    | *[Link][13]*                                       |
| Faraday                  | `faraday`                  | `>= 0.14`                | `>= 0.14`                 | *[Link](#faraday)*                  | *[Link][14]*                                |
| Grape                    | `grape`                    | `>= 1.0`                 | `>= 1.0`                  | *[Link](#grape)*                    | *[Link][15]*                                  |
| GraphQL                  | `graphql`                  | `>= 1.7.9`               | `>= 1.7.9`                | *[Link](#graphql)*                  | *[Link][16]*                             |
| gRPC                     | `grpc`                     | `>= 1.7`                 | *gem not available*       | *[Link](#grpc)*                     | *[Link][17]*                   |
| http.rb                  | `httprb`                   | `>= 2.0`                 | `>= 2.0`                  | *[Link](#http.rb)*                  | *[Link][18]*                                       |
| Kafka                    | `ruby-kafka`               | `>= 0.7.10`              | `>= 0.7.10`               | *[Link](#kafka)*                    | *[Link][19]*                                |
| MongoDB                  | `mongo`                    | `>= 2.1`                 | `>= 2.1`                  | *[Link](#mongodb)*                  | *[Link][20]*                         |
| MySQL2                   | `mysql2`                   | `>= 0.3.21`              | *gem not available*       | *[Link](#mysql2)*                   | *[Link][21]*                                 |
| Net/HTTP                 | `http`                     | *(Any supported Ruby)*   | *(Any supported Ruby)*    | *[Link](#nethttp)*                  | *[Link][22]* |
| Presto                   | `presto`                   | `>= 0.5.14`              | `>= 0.5.14`               | *[Link](#presto)*                   | *[Link][23]*                  |
| Racecar                  | `racecar`                  | `>= 0.3.5`               | `>= 0.3.5`                | *[Link](#racecar)*                  | *[Link][24]*                                   |
| Rack                     | `rack`                     | `>= 1.1`                 | `>= 1.1`                  | *[Link](#rack)*                     | *[Link][25]*                                         |
| Rails                    | `rails`                    | `>= 3.0`                 | `>= 3.0`                  | *[Link](#rails)*                    | *[Link][26]*                                       |
| Rake                     | `rake`                     | `>= 12.0`                | `>= 12.0`                 | *[Link](#rake)*                     | *[Link][27]*                                         |
| Redis                    | `redis`                    | `>= 3.2`                 | `>= 3.2`                  | *[Link](#redis)*                    | *[Link][28]*                                    |
| Resque                   | `resque`                   | `>= 1.0, < 2.0`          | `>= 1.0, < 2.0`           | *[Link](#resque)*                   | *[Link][29]*                                     |
| Rest Client              | `rest-client`              | `>= 1.8`                 | `>= 1.8`                  | *[Link](#rest-client)*              | *[Link][30]*                           |
| Sequel                   | `sequel`                   | `>= 3.41`                | `>= 3.41`                 | *[Link](#sequel)*                   | *[Link][31]*                                |
| Shoryuken                | `shoryuken`                | `>= 3.2`                 | `>= 3.2`                  | *[Link](#shoryuken)*                | *[Link][32]*                                   |
| Sidekiq                  | `sidekiq`                  | `>= 3.5.4`               | `>= 3.5.4`                | *[Link](#sidekiq)*                  | *[Link][33]*                                   |
| Sinatra                  | `sinatra`                  | `>= 1.4`                 | `>= 1.4`                  | *[Link](#sinatra)*                  | *[Link][34]*                                   |
| Sneakers                 | `sneakers`                 | `>= 2.12.0`              | `>= 2.12.0`               | *[Link](#sneakers)*                 | *[Link][35]*                                   |
| Sucker Punch             | `sucker_punch`             | `>= 2.0`                 | `>= 2.0`                  | *[Link](#sucker-punch)*             | *[Link][36]*                       |

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
[18]: https://github.com/httprb/http
[19]: https://github.com/zendesk/ruby-kafka
[20]: https://github.com/mongodb/mongo-ruby-driver
[21]: https://github.com/brianmario/mysql2
[22]: https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html
[23]: https://github.com/treasure-data/presto-client-ruby
[24]: https://github.com/zendesk/racecar
[25]: https://github.com/rack/rack
[26]: https://github.com/rails/rails
[27]: https://github.com/ruby/rake
[28]: https://github.com/redis/redis-rb
[29]: https://github.com/resque/resque
[30]: https://github.com/rest-client/rest-client
[31]: https://github.com/jeremyevans/sequel
[32]: https://github.com/phstc/shoryuken
[33]: https://github.com/mperham/sidekiq
[34]: https://github.com/sinatra/sinatra
[35]: https://github.com/jondot/sneakers
[36]: https://github.com/brandonhilkert/sucker_punch
