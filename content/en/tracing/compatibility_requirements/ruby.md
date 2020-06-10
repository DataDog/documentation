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

The Ruby Datadog Trace library is open source - view the [Github repository][1] for more information.

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

*Maintenance* indicates that only critical bugfixes are being made.

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
| Action Cable             | `action_cable`             | `>= 5.0`                 | *[Link][2]*             | *[Link][3]*               |
| Action View              | `action_view`              | `>= 3.0`                 | *[Link][4]*              | *[Link][5]*                |
| Active Model Serializers | `active_model_serializers` | `>= 0.9`                 | *[Link][6]* | *[Link][7]*                |
| Action Pack              | `action_pack`              | `>= 3.0`                 | *[Link][8]*              | *[Link][9]*                |
| Active Record            | `active_record`            | `>= 3.0`                 | *[Link][10]*            | *[Link][11]*              |
| Active Support           | `active_support`           | `>= 3.0`                 | *[Link][12]*           | *[Link][13]*             |
| AWS                      | `aws`                      | `>= 2.0`                 | *[Link][14]*                      | *[Link][15]*                                  |
| Concurrent Ruby          | `concurrent_ruby`          | `>= 0.9`                 | *[Link][16]*          | *[Link][17]*                  |
| Dalli                    | `dalli`                    | `>= 2.0`                 | *[Link][18]*                    | *[Link][19]*                              |
| DelayedJob               | `delayed_job`              | `>= 4.1`                 | *[Link][20]*               | *[Link][21]*                        |
| Elasticsearch            | `elasticsearch`            | `>= 1.0`                 | *[Link][22]*            | *[Link][23]*                        |
| Ethon                    | `ethon`                    | `>= 0.11`                | *[Link][24]*                    | *[Link][25]*                                    |
| Excon                    | `excon`                    | `>= 0.50`                | *[Link][26]*                    | *[Link][27]*                                       |
| Faraday                  | `faraday`                  | `>= 0.14`                | *[Link][28]*                  | *[Link][29]*                                |
| Grape                    | `grape`                    | `>= 1.0`                 | *[Link][30]*                    | *[Link][31]*                                  |
| GraphQL                  | `graphql`                  | `>= 1.7.9`               | *[Link][32]*                  | *[Link][33]*                             |
| gRPC                     | `grpc`                     | `>= 1.7`                 | *[Link][34]*                     | *[Link][35]*                   |
| MongoDB                  | `mongo`                    | `>= 2.1`                 | *[Link][36]*                  | *[Link][37]*                         |
| MySQL2                   | `mysql2`                   | `>= 0.3.21`              | *[Link][38]*                   | *[Link][39]*                                 |
| Net/HTTP                 | `http`                     | *(Any supported Ruby)*   | *[Link][40]*                  | *[Link][41]* |
| Presto                   | `presto`                   | `>= 0.5.14`              | *[Link][42]*                   | *[Link][43]*                  |
| Racecar                  | `racecar`                  | `>= 0.3.5`               | *[Link][44]*                  | *[Link][45]*                                   |
| Rack                     | `rack`                     | `>= 1.1`                 | *[Link][46]*                     | *[Link][47]*                                         |
| Rails                    | `rails`                    | `>= 3.0`                 | *[Link][48]*                    | *[Link][49]*                                       |
| Rake                     | `rake`                     | `>= 12.0`                | *[Link][50]*                     | *[Link][51]*                                         |
| Redis                    | `redis`                    | `>= 3.2`                 | *[Link][52]*                    | *[Link][53]*                                    |
| Resque                   | `resque`                   | `>= 1.0, < 2.0`          | *[Link][54]*                   | *[Link][55]*                                     |
| Rest Client              | `rest-client`              | `>= 1.8`                 | *[Link][56]*              | *[Link][57]*                           |
| Sequel                   | `sequel`                   | `>= 3.41`                | *[Link][58]*                   | *[Link][59]*                                |
| Shoryuken                | `shoryuken`                | `>= 3.2`                 | *[Link][60]*                | *[Link][61]*                                   |
| Sidekiq                  | `sidekiq`                  | `>= 3.5.4`               | *[Link][62]*                  | *[Link][63]*                                   |
| Sinatra                  | `sinatra`                  | `>= 1.4`                 | *[Link][64]*                  | *[Link][65]*                                   |
| Sucker Punch             | `sucker_punch`             | `>= 2.0`                 | *[Link][66]*             | *[Link][67]*                       |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-rb
[2]: /tracing/setup/ruby/#action-cable
[3]: https://github.com/rails/rails/tree/master/actioncable
[4]: /tracing/setup/ruby/#action-view
[5]: https://github.com/rails/rails/tree/master/actionview
[6]: /tracing/setup/ruby/#active-model-serializers
[7]: https://github.com/rails-api/active_model_serializers
[8]: /tracing/setup/ruby/#action-pack
[9]: https://github.com/rails/rails/tree/master/actionpack
[10]: /tracing/setup/ruby/#active-record
[11]: https://github.com/rails/rails/tree/master/activerecord
[12]: /tracing/setup/ruby/#active-support
[13]: https://github.com/rails/rails/tree/master/activesupport
[14]: /tracing/setup/ruby/#aws
[15]: https://github.com/aws/aws-sdk-ruby
[16]: /tracing/setup/ruby/#concurrent-ruby
[17]: https://github.com/ruby-concurrency/concurrent-ruby
[18]: /tracing/setup/ruby/#dalli
[19]: https://github.com/petergoldstein/dalli
[20]: /tracing/setup/ruby/#delayedjob
[21]: https://github.com/collectiveidea/delayed_job
[22]: /tracing/setup/ruby/#elasticsearch
[23]: https://github.com/elastic/elasticsearch-ruby
[24]: /tracing/setup/ruby/#ethon
[25]: https://github.com/typhoeus/ethon
[26]: /tracing/setup/ruby/#excon
[27]: https://github.com/excon/excon
[28]: /tracing/setup/ruby/#faraday
[29]: https://github.com/lostisland/faraday
[30]: /tracing/setup/ruby/#grape
[31]: https://github.com/ruby-grape/grape
[32]: /tracing/setup/ruby/#graphql
[33]: https://github.com/rmosolgo/graphql-ruby
[34]: /tracing/setup/ruby/#grpc
[35]: https://github.com/grpc/grpc/tree/master/src/rubyc
[36]: /tracing/setup/ruby/#mongodb
[37]: https://github.com/mongodb/mongo-ruby-driver
[38]: /tracing/setup/ruby/#mysql2
[39]: https://github.com/brianmario/mysql2
[40]: /tracing/setup/ruby/#nethttp
[41]: https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html
[42]: /tracing/setup/ruby/#presto
[43]: https://github.com/treasure-data/presto-client-ruby
[44]: /tracing/setup/ruby/#racecar
[45]: https://github.com/zendesk/racecar
[46]: /tracing/setup/ruby/#rack
[47]: https://github.com/rack/rack
[48]: /tracing/setup/ruby/#rails
[49]: https://github.com/rails/rails
[50]: /tracing/setup/ruby/#rake
[51]: https://github.com/ruby/rake
[52]: /tracing/setup/ruby/#redis
[53]: https://github.com/redis/redis-rb
[54]: /tracing/setup/ruby/#resque
[55]: https://github.com/resque/resque
[56]: /tracing/setup/ruby/#rest-client
[57]: https://github.com/rest-client/rest-client
[58]: /tracing/setup/ruby/#sequel
[59]: https://github.com/jeremyevans/sequel
[60]: /tracing/setup/ruby/#shoryuken
[61]: https://github.com/phstc/shoryuken
[62]: /tracing/setup/ruby/#sidekiq
[63]: https://github.com/mperham/sidekiq
[64]: /tracing/setup/ruby/#sinatra
[65]: https://github.com/sinatra/sinatra
[66]: /tracing/setup/ruby/#sucker-punch
[67]: https://github.com/brandonhilkert/sucker_punch
