---
title: Ruby Compatibility Requirements
dependencies:
- https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md
kind: documentation
description: 'Compatibility Requirements for the Ruby tracer.'
aliases:
  - /tracing/compatibility_requirements/ruby
  - /tracing/setup_overview/compatibility_requirements/ruby
code_lang: ruby
type: multi-code-lang
code_lang_weight: 20
further_reading:
    - link: 'tracing/trace_collection/dd_libraries/ruby'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

## Compatibility

The Ruby Datadog Trace library is open source - view the [GitHub repository][1] for more information.

**Supported Ruby interpreters**:

| Type  | Documentation              | Version | Support type                         | Gem version support |
| ----- | -------------------------- | -----   | ------------------------------------ | ------------------- |
| MRI   | https://www.ruby-lang.org/ | 3.1     | Full                                 | Latest              |
|       |                            | 3.0     | Full                                 | Latest              |
|       |                            | 2.7     | Full                                 | Latest              |
|       |                            | 2.6     | Full                                 | Latest              |
|       |                            | 2.5     | Full                                 | Latest              |
|       |                            | 2.4     | Full                                 | Latest              |
|       |                            | 2.3     | Full                                 | Latest              |
|       |                            | 2.2     | Full                                 | Latest              |
|       |                            | 2.1     | Full                                 | Latest              |
|       |                            | 2.0     | EOL since June 7th, 2021             | < 0.50.0            |
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

## Integration instrumentation

Many popular libraries and frameworks are supported out-of-the-box, which can be auto-instrumented. Although they are not activated automatically, they can be activated and configured by using the `Datadog.configure` API:

```ruby
Datadog.configure do |c|
  # Activates and configures an integration
  c.tracing.instrument :integration_name, options
end
```

`options` is a `Hash` of integration-specific configuration settings.

For a list of available integrations, and their configuration options, please refer to the following:

| Name                     | Key                        | Versions Supported: MRI  | Versions Supported: JRuby | How to configure                    | Gem source                                                                     |
| -------------------------- | -------------------------- |-------------------------|---------------------------|------------------|--------------|
| Action Cable             | `action_cable`             | `>= 5.0`                 | `>= 5.0`                  | *[Link][2]*              | *[Link][3]*             |
| Action Mailer              | `action_mailer`            | `>= 5.0`                | `>= 5.0`                  | *[Link][4]*      | *[Link][5]*  |
| Action Pack                | `action_pack`              | `>= 3.2`                | `>= 3.2`                  | *[Link][6]*      | *[Link][7]*  |
| Action View                | `action_view`              | `>= 3.2`                | `>= 3.2`                  | *[Link][8]*      | *[Link][9]*  |
| Active Job                 | `active_job`               | `>= 4.2`                | `>= 4.2`                  | *[Link][10]*     | *[Link][11]* |
| Active Model Serializers   | `active_model_serializers` | `>= 0.9`                | `>= 0.9`                  | *[Link][12]*     | *[Link][13]* |
| Active Record              | `active_record`            | `>= 3.2`                | `>= 3.2`                  | *[Link][14]*     | *[Link][15]* |
| Active Support             | `active_support`           | `>= 3.2`                | `>= 3.2`                  | *[Link][16]*     | *[Link][17]* |
| AWS                        | `aws`                      | `>= 2.0`                | `>= 2.0`                  | *[Link][18]*     | *[Link][19]* |
| Concurrent Ruby            | `concurrent_ruby`          | `>= 0.9`                | `>= 0.9`                  | *[Link][20]*     | *[Link][21]* |
| Dalli                      | `dalli`                    | `>= 2.0`                | `>= 2.0`                  | *[Link][22]*     | *[Link][23]* |
| DelayedJob                 | `delayed_job`              | `>= 4.1`                | `>= 4.1`                  | *[Link][24]*     | *[Link][25]* |
| Elasticsearch              | `elasticsearch`            | `>= 1.0`                | `>= 1.0`                  | *[Link][26]*     | *[Link][27]* |
| Ethon                      | `ethon`                    | `>= 0.11`               | `>= 0.11`                 | *[Link][28]*     | *[Link][29]* |
| Excon                      | `excon`                    | `>= 0.50`               | `>= 0.50`                 | *[Link][30]*     | *[Link][31]* |
| Faraday                    | `faraday`                  | `>= 0.14`               | `>= 0.14`                 | *[Link][32]*     | *[Link][33]* |
| Grape                      | `grape`                    | `>= 1.0`                | `>= 1.0`                  | *[Link][34]*     | *[Link][35]* |
| GraphQL                    | `graphql`                  | `>= 1.7.9`              | `>= 1.7.9`                | *[Link][36]*     | *[Link][37]* |
| gRPC                       | `grpc`                     | `>= 1.7`                | *gem not available*       | *[Link][38]*     | *[Link][39]* |
| http.rb                    | `httprb`                   | `>= 2.0`                | `>= 2.0`                  | *[Link][40]*     | *[Link][41]* |
| httpclient                 | `httpclient`               | `>= 2.2`                | `>= 2.2`                  | *[Link][42]*     | *[Link][43]* |
| httpx                      | `httpx`                    | `>= 0.11`               | `>= 0.11`                 | *[Link][44]*     | *[Link][45]* |
| Kafka                      | `ruby-kafka`               | `>= 0.7.10`             | `>= 0.7.10`               | *[Link][46]*     | *[Link][47]* |
| Makara (via Active Record) | `makara`                   | `>= 0.3.5`              | `>= 0.3.5`                | *[Link][14]*     | *[Link][48]* |
| MongoDB                    | `mongo`                    | `>= 2.1`                | `>= 2.1`                  | *[Link][49]*     | *[Link][50]* |
| MySQL2                     | `mysql2`                   | `>= 0.3.21`             | *gem not available*       | *[Link][51]*     | *[Link][52]* |
| Net/HTTP                   | `http`                     | *(Any supported Ruby)*  | *(Any supported Ruby)*    | *[Link][53]*     | *[Link][54]* |
| Presto                     | `presto`                   | `>= 0.5.14`             | `>= 0.5.14`               | *[Link][55]*     | *[Link][56]* |
| Qless                      | `qless`                    | `>= 0.10.0`             | `>= 0.10.0`               | *[Link][57]*     | *[Link][58]* |
| Que                        | `que`                      | `>= 1.0.0.beta2`        | `>= 1.0.0.beta2`          | *[Link][59]*     | *[Link][60]* |
| Racecar                    | `racecar`                  | `>= 0.3.5`              | `>= 0.3.5`                | *[Link][61]*     | *[Link][62]* |
| Rack                       | `rack`                     | `>= 1.1`                | `>= 1.1`                  | *[Link][63]*     | *[Link][64]* |
| Rails                      | `rails`                    | `>= 3.2`                | `>= 3.2`                  | *[Link][65]*     | *[Link][66]* |
| Rake                       | `rake`                     | `>= 12.0`               | `>= 12.0`                 | *[Link][67]*     | *[Link][68]* |
| Redis                      | `redis`                    | `>= 3.2`                | `>= 3.2`                  | *[Link][69]*     | *[Link][70]* |
| Resque                     | `resque`                   | `>= 1.0`                | `>= 1.0`                  | *[Link][71]*     | *[Link][72]* |
| Rest Client                | `rest-client`              | `>= 1.8`                | `>= 1.8`                  | *[Link][73]*     | *[Link][74]* |
| Sequel                     | `sequel`                   | `>= 3.41`               | `>= 3.41`                 | *[Link][75]*     | *[Link][76]* |
| Shoryuken                  | `shoryuken`                | `>= 3.2`                | `>= 3.2`                  | *[Link][77]*     | *[Link][78]* |
| Sidekiq                    | `sidekiq`                  | `>= 3.5.4`              | `>= 3.5.4`                | *[Link][79]*     | *[Link][80]* |
| Sinatra                    | `sinatra`                  | `>= 1.4`                | `>= 1.4`                  | *[Link][81]*     | *[Link][82]* |
| Sneakers                   | `sneakers`                 | `>= 2.12.0`             | `>= 2.12.0`               | *[Link][83]*     | *[Link][84]* |
| Sucker Punch               | `sucker_punch`             | `>= 2.0`                | `>= 2.0`                  | *[Link][85]*     | *[Link][86]* |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-rb
[2]: /tracing/trace_collection/dd_libraries/ruby/#action-cable
[3]: https://github.com/rails/rails/tree/master/actioncable
[4]: /tracing/trace_collection/dd_libraries/ruby/#action-mailer
[5]: https://github.com/rails/rails/tree/master/actionmailer
[6]: /tracing/trace_collection/dd_libraries/ruby/#action-pack
[7]: https://github.com/rails/rails/tree/master/actionpack
[8]: /tracing/trace_collection/dd_libraries/ruby/#action-view
[9]: https://github.com/rails/rails/tree/master/actionview
[10]: /tracing/trace_collection/dd_libraries/ruby/#active-job
[11]: https://github.com/rails/rails/tree/master/activejob
[12]: /tracing/trace_collection/dd_libraries/ruby/#active-model-serializers
[13]: https://github.com/rails-api/active_model_serializers
[14]: /tracing/trace_collection/dd_libraries/ruby/#active-record
[15]: https://github.com/rails/rails/tree/master/activerecord
[16]: /tracing/trace_collection/dd_libraries/ruby/#active-support
[17]: https://github.com/rails/rails/tree/master/activesupport
[18]: /tracing/trace_collection/dd_libraries/ruby/#aws
[19]: https://github.com/aws/aws-sdk-ruby
[20]: /tracing/trace_collection/dd_libraries/ruby/#concurrent-ruby
[21]: https://github.com/ruby-concurrency/concurrent-ruby
[22]: /tracing/trace_collection/dd_libraries/ruby/#dalli
[23]: https://github.com/petergoldstein/dalli
[24]: /tracing/trace_collection/dd_libraries/ruby/#delayedjob
[25]: https://github.com/collectiveidea/delayed_job
[26]: /tracing/trace_collection/dd_libraries/ruby/#elasticsearch
[27]: https://github.com/elastic/elasticsearch-ruby
[28]: /tracing/trace_collection/dd_libraries/ruby/#ethon
[29]: https://github.com/typhoeus/ethon
[30]: /tracing/trace_collection/dd_libraries/ruby/#excon
[31]: https://github.com/excon/excon
[32]: /tracing/trace_collection/dd_libraries/ruby/#faraday
[33]: https://github.com/lostisland/faraday
[34]: /tracing/trace_collection/dd_libraries/ruby/#grape
[35]: https://github.com/ruby-grape/grape
[36]: /tracing/trace_collection/dd_libraries/ruby/#graphql
[37]: https://github.com/rmosolgo/graphql-ruby
[38]: /tracing/trace_collection/dd_libraries/ruby/#grpc
[39]: https://github.com/grpc/grpc/tree/master/src/rubyc
[40]: /tracing/trace_collection/dd_libraries/ruby/#httprb
[41]: https://github.com/httprb/http
[42]: /tracing/trace_collection/dd_libraries/ruby/#httpclient
[43]: https://github.com/nahi/httpclient
[44]: /tracing/trace_collection/dd_libraries/ruby/#httpx
[45]: https://gitlab.com/honeyryderchuck/httpx
[46]: /tracing/trace_collection/dd_libraries/ruby/#kafka
[47]: https://github.com/zendesk/ruby-kafka
[48]: https://github.com/instacart/makara
[49]: /tracing/trace_collection/dd_libraries/ruby/#mongodb
[50]: https://github.com/mongodb/mongo-ruby-driver
[51]: /tracing/trace_collection/dd_libraries/ruby/#mysql2
[52]: https://github.com/brianmario/mysql2
[53]: /tracing/trace_collection/dd_libraries/ruby/#nethttp
[54]: https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html
[55]: /tracing/trace_collection/dd_libraries/ruby/#presto
[56]: https://github.com/treasure-data/presto-client-ruby
[57]: /tracing/trace_collection/dd_libraries/ruby/#qless
[58]: https://github.com/seomoz/qless
[59]: /tracing/trace_collection/dd_libraries/ruby/#que
[60]: https://github.com/que-rb/que
[61]: /tracing/trace_collection/dd_libraries/ruby/#racecar
[62]: https://github.com/zendesk/racecar
[63]: /tracing/trace_collection/dd_libraries/ruby/#rack
[64]: https://github.com/rack/rack
[65]: /tracing/trace_collection/dd_libraries/ruby/#rails
[66]: https://github.com/rails/rails
[67]: /tracing/trace_collection/dd_libraries/ruby/#rake
[68]: https://github.com/ruby/rake
[69]: /tracing/trace_collection/dd_libraries/ruby/#redis
[70]: https://github.com/redis/redis-rb
[71]: /tracing/trace_collection/dd_libraries/ruby/#resque
[72]: https://github.com/resque/resque
[73]: /tracing/trace_collection/dd_libraries/ruby/#rest-client
[74]: https://github.com/rest-client/rest-client
[75]: /tracing/trace_collection/dd_libraries/ruby/#sequel
[76]: https://github.com/jeremyevans/sequel
[77]: /tracing/trace_collection/dd_libraries/ruby/#shoryuken
[78]: https://github.com/phstc/shoryuken
[79]: /tracing/trace_collection/dd_libraries/ruby/#sidekiq
[80]: https://github.com/mperham/sidekiq
[81]: /tracing/trace_collection/dd_libraries/ruby/#sinatra
[82]: https://github.com/sinatra/sinatra
[83]: /tracing/trace_collection/dd_libraries/ruby/#sneakers
[84]: https://github.com/jondot/sneakers
[85]: /tracing/trace_collection/dd_libraries/ruby/#sucker-punch
[86]: https://github.com/brandonhilkert/sucker_punch
