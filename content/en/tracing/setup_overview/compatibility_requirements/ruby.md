---
title: Ruby Compatibility Requirements
dependencies:
- https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md
kind: documentation
description: 'Compatibility Requirements for the Ruby tracer.'
aliases:
  - /tracing/compatibility_requirements/ruby
code_lang: ruby
type: multi-code-lang
code_lang_weight: 20
further_reading:
    - link: 'tracing/setup/ruby'
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
| Makara (via Active Record) | `makara`                   | `>= 0.3.5`              | `>= 0.3.5`                | *[Link][48]*     | *[Link][49]* |
| MongoDB                    | `mongo`                    | `>= 2.1`                | `>= 2.1`                  | *[Link][50]*     | *[Link][51]* |
| MySQL2                     | `mysql2`                   | `>= 0.3.21`             | *gem not available*       | *[Link][52]*     | *[Link][53]* |
| Net/HTTP                   | `http`                     | *(Any supported Ruby)*  | *(Any supported Ruby)*    | *[Link][54]*     | *[Link][55]* |
| Presto                     | `presto`                   | `>= 0.5.14`             | `>= 0.5.14`               | *[Link][56]*     | *[Link][57]* |
| Qless                      | `qless`                    | `>= 0.10.0`             | `>= 0.10.0`               | *[Link][58]*     | *[Link][59]* |
| Que                        | `que`                      | `>= 1.0.0.beta2`        | `>= 1.0.0.beta2`          | *[Link][60]*     | *[Link][61]* |
| Racecar                    | `racecar`                  | `>= 0.3.5`              | `>= 0.3.5`                | *[Link][62]*     | *[Link][63]* |
| Rack                       | `rack`                     | `>= 1.1`                | `>= 1.1`                  | *[Link][64]*     | *[Link][65]* |
| Rails                      | `rails`                    | `>= 3.2`                | `>= 3.2`                  | *[Link][66]*     | *[Link][67]* |
| Rake                       | `rake`                     | `>= 12.0`               | `>= 12.0`                 | *[Link][68]*     | *[Link][69]* |
| Redis                      | `redis`                    | `>= 3.2`                | `>= 3.2`                  | *[Link][70]*     | *[Link][71]* |
| Resque                     | `resque`                   | `>= 1.0`                | `>= 1.0`                  | *[Link][72]*     | *[Link][73]* |
| Rest Client                | `rest-client`              | `>= 1.8`                | `>= 1.8`                  | *[Link][74]*     | *[Link][75]* |
| Sequel                     | `sequel`                   | `>= 3.41`               | `>= 3.41`                 | *[Link][76]*     | *[Link][77]* |
| Shoryuken                  | `shoryuken`                | `>= 3.2`                | `>= 3.2`                  | *[Link][78]*     | *[Link][79]* |
| Sidekiq                    | `sidekiq`                  | `>= 3.5.4`              | `>= 3.5.4`                | *[Link][80]*     | *[Link][81]* |
| Sinatra                    | `sinatra`                  | `>= 1.4`                | `>= 1.4`                  | *[Link][82]*     | *[Link][83]* |
| Sneakers                   | `sneakers`                 | `>= 2.12.0`             | `>= 2.12.0`               | *[Link][84]*     | *[Link][85]* |
| Sucker Punch               | `sucker_punch`             | `>= 2.0`                | `>= 2.0`                  | *[Link][86]*     | *[Link][87]* |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-rb
[2]: /tracing/setup_overview/setup/ruby/#action-cable
[3]: https://github.com/rails/rails/tree/master/actioncable
[4]: /tracing/setup_overview/setup/ruby/#action-mailer
[5]: https://github.com/rails/rails/tree/master/actionmailer
[6]: /tracing/setup_overview/setup/ruby/#action-pack
[7]: https://github.com/rails/rails/tree/master/actionpack
[8]: /tracing/setup_overview/setup/ruby/#action-view
[9]: https://github.com/rails/rails/tree/master/actionview
[10]: /tracing/setup_overview/setup/ruby/#active-job
[11]: https://github.com/rails/rails/tree/master/activejob
[12]: /tracing/setup_overview/setup/ruby/#active-model-serializers
[13]: https://github.com/rails-api/active_model_serializers
[14]: /tracing/setup_overview/setup/ruby/#active-record
[15]: https://github.com/rails/rails/tree/master/activerecord
[16]: /tracing/setup_overview/setup/ruby/#active-support
[17]: https://github.com/rails/rails/tree/master/activesupport
[18]: /tracing/setup_overview/setup/ruby/#aws
[19]: https://github.com/aws/aws-sdk-ruby
[20]: /tracing/setup_overview/setup/ruby/#concurrent-ruby
[21]: https://github.com/ruby-concurrency/concurrent-ruby
[22]: /tracing/setup_overview/setup/ruby/#dalli
[23]: https://github.com/petergoldstein/dalli
[24]: /tracing/setup_overview/setup/ruby/#delayedjob
[25]: https://github.com/collectiveidea/delayed_job
[26]: /tracing/setup_overview/setup/ruby/#elasticsearch
[27]: https://github.com/elastic/elasticsearch-ruby
[28]: /tracing/setup_overview/setup/ruby/#ethon
[29]: https://github.com/typhoeus/ethon
[30]: /tracing/setup_overview/setup/ruby/#excon
[31]: https://github.com/excon/excon
[32]: /tracing/setup_overview/setup/ruby/#faraday
[33]: https://github.com/lostisland/faraday
[34]: /tracing/setup_overview/setup/ruby/#grape
[35]: https://github.com/ruby-grape/grape
[36]: /tracing/setup_overview/setup/ruby/#graphql
[37]: https://github.com/rmosolgo/graphql-ruby
[38]: /tracing/setup_overview/setup/ruby/#grpc
[39]: https://github.com/grpc/grpc/tree/master/src/rubyc
[40]: /tracing/setup_overview/setup/ruby/#httprb
[41]: https://github.com/httprb/http
[42]: /tracing/setup_overview/setup/ruby/#httpclient
[43]: https://github.com/nahi/httpclient
[44]: /tracing/setup_overview/setup/ruby/#httpx
[45]: https://gitlab.com/honeyryderchuck/httpx
[46]: /tracing/setup_overview/setup/ruby/#kafka
[47]: https://github.com/zendesk/ruby-kafka
[48]: /tracing/setup_overview/setup/ruby/#active-record
[49]: https://github.com/instacart/makara
[50]: /tracing/setup_overview/setup/ruby/#mongodb
[51]: https://github.com/mongodb/mongo-ruby-driver
[52]: /tracing/setup_overview/setup/ruby/#mysql2
[53]: https://github.com/brianmario/mysql2
[54]: /tracing/setup_overview/setup/ruby/#nethttp
[55]: https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html
[56]: /tracing/setup_overview/setup/ruby/#presto
[57]: https://github.com/treasure-data/presto-client-ruby
[58]: /tracing/setup_overview/setup/ruby/#qless
[59]: https://github.com/seomoz/qless
[60]: /tracing/setup_overview/setup/ruby/#que
[61]: https://github.com/que-rb/que
[62]: /tracing/setup_overview/setup/ruby/#racecar
[63]: https://github.com/zendesk/racecar
[64]: /tracing/setup_overview/setup/ruby/#rack
[65]: https://github.com/rack/rack
[66]: /tracing/setup_overview/setup/ruby/#rails
[67]: https://github.com/rails/rails
[68]: /tracing/setup_overview/setup/ruby/#rake
[69]: https://github.com/ruby/rake
[70]: /tracing/setup_overview/setup/ruby/#redis
[71]: https://github.com/redis/redis-rb
[72]: /tracing/setup_overview/setup/ruby/#resque
[73]: https://github.com/resque/resque
[74]: /tracing/setup_overview/setup/ruby/#rest-client
[75]: https://github.com/rest-client/rest-client
[76]: /tracing/setup_overview/setup/ruby/#sequel
[77]: https://github.com/jeremyevans/sequel
[78]: /tracing/setup_overview/setup/ruby/#shoryuken
[79]: https://github.com/phstc/shoryuken
[80]: /tracing/setup_overview/setup/ruby/#sidekiq
[81]: https://github.com/mperham/sidekiq
[82]: /tracing/setup_overview/setup/ruby/#sinatra
[83]: https://github.com/sinatra/sinatra
[84]: /tracing/setup_overview/setup/ruby/#sneakers
[85]: https://github.com/jondot/sneakers
[86]: /tracing/setup_overview/setup/ruby/#sucker-punch
[87]: https://github.com/brandonhilkert/sucker_punch
