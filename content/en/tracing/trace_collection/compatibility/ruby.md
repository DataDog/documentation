---
aliases:
- /tracing/compatibility_requirements/ruby
- /tracing/setup_overview/compatibility_requirements/ruby
code_lang: ruby
code_lang_weight: 20
further_reading:
- link: tracing/trace_collection/dd_libraries/ruby
  tag: Documentation
  text: Instrument Your Application
kind: documentation
title: Ruby Compatibility Requirements
type: multi-code-lang
---
## Compatibility

The Ruby Datadog Trace library is open source. See the [dd-trace-rb][1] GitHub repository for more information.

### Supported Ruby interpreters

| Type  | Documentation              | Version | Support type                         | Gem version support |
| ----- | -------------------------- | -----   | ------------------------------------ | ------------------- |
| MRI   | https://www.ruby-lang.org/ | 3.2     | Full                                 | Latest              |
|       |                            | 3.1     | Full                                 | Latest              |
|       |                            | 3.0     | Full                                 | Latest              |
|       |                            | 2.7     | Full                                 | Latest              |
|       |                            | 2.6     | Full                                 | Latest              |
|       |                            | 2.5     | Full                                 | Latest              |
|       |                            | 2.4     | Full                                 | Latest              |
|       |                            | 2.3     | Full                                 | Latest              |
|       |                            | 2.2     | Full (except for Profiling)          | Latest              |
|       |                            | 2.1     | Full (except for Profiling)          | Latest              |
|       |                            | 2.0     | EOL since June 7th, 2021             | < 0.50.0            |
|       |                            | 1.9.3   | EOL since August 6th, 2020           | < 0.27.0            |
|       |                            | 1.9.1   | EOL since August 6th, 2020           | < 0.27.0            |
| JRuby | https://www.jruby.org      | 9.3     | Full                                 | Latest              |
|       |                            | 9.2     | Full                                 | Latest              |

### Supported web servers

| Type      | Documentation                     | Version      | Support type |
| --------- | --------------------------------- | ------------ | ------------ |
| Puma      | http://puma.io/                   | 2.16+ / 3.6+ | Full         |
| Unicorn   | https://bogomips.org/unicorn/     | 4.8+ / 5.1+  | Full         |
| Passenger | https://www.phusionpassenger.com/ | 5.0+         | Full         |

### Supported tracing frameworks

| Type        | Documentation                                   | Version               | Gem version support |
| ----------- | ----------------------------------------------- | --------------------- | ------------------- |
| OpenTracing | https://github.com/opentracing/opentracing-ruby | 0.4.1+                | >= 0.16.0           |

*Full* support indicates all tracer features are available.

*Deprecated* indicates support will transition to *Maintenance* in a future release.

*Maintenance* indicates only critical bugfixes are backported until EOL.

*EOL* indicates support is no longer provided.

### Apple macOS support

Use of `ddtrace` on macOS is supported for development, but not for production deployments.

### Microsoft Windows support

Using `ddtrace` on Microsoft Windows is currently unsupported. We'll still accept community contributions and issues,
but will consider them as having low priority.

## Integrations

For a list of available integrations, and their configuration options, refer to the following:

| Name                       | Key                        | Versions Supported: MRI  | Versions Supported: JRuby | How to configure                    | Gem source                                                                     |
| -------------------------- | -------------------------- | ------------------------ | --------------------------| ----------------------------------- | ------------------------------------------------------------------------------ |
| Action Cable               | `action_cable`             | `>= 5.0`                 | `>= 5.0`                  | *[Link](#action-cable)*             | *[Link](https://github.com/rails/rails/tree/master/actioncable)*               |
| Action Mailer              | `action_mailer`            | `>= 5.0`                 | `>= 5.0`                  | *[Link](#action-mailer)*            | *[Link](https://github.com/rails/rails/tree/master/actionmailer)*              |
| Action Pack                | `action_pack`              | `>= 3.2`                 | `>= 3.2`                  | *[Link](#action-pack)*              | *[Link](https://github.com/rails/rails/tree/master/actionpack)*                |
| Action View                | `action_view`              | `>= 3.2`                 | `>= 3.2`                  | *[Link](#action-view)*              | *[Link](https://github.com/rails/rails/tree/master/actionview)*                |
| Active Job                 | `active_job`               | `>= 4.2`                 | `>= 4.2`                  | *[Link](#active-job)*               | *[Link](https://github.com/rails/rails/tree/master/activejob)*                 |
| Active Model Serializers   | `active_model_serializers` | `>= 0.9`                 | `>= 0.9`                  | *[Link](#active-model-serializers)* | *[Link](https://github.com/rails-api/active_model_serializers)*                |
| Active Record              | `active_record`            | `>= 3.2`                 | `>= 3.2`                  | *[Link](#active-record)*            | *[Link](https://github.com/rails/rails/tree/master/activerecord)*              |
| Active Support             | `active_support`           | `>= 3.2`                 | `>= 3.2`                  | *[Link](#active-support)*           | *[Link](https://github.com/rails/rails/tree/master/activesupport)*             |
| AWS                        | `aws`                      | `>= 2.0`                 | `>= 2.0`                  | *[Link](#aws)*                      | *[Link](https://github.com/aws/aws-sdk-ruby)*                                  |
| Concurrent Ruby            | `concurrent_ruby`          | `>= 0.9`                 | `>= 0.9`                  | *[Link](#concurrent-ruby)*          | *[Link](https://github.com/ruby-concurrency/concurrent-ruby)*                  |
| Dalli                      | `dalli`                    | `>= 2.0`                 | `>= 2.0`                  | *[Link](#dalli)*                    | *[Link](https://github.com/petergoldstein/dalli)*                              |
| DelayedJob                 | `delayed_job`              | `>= 4.1`                 | `>= 4.1`                  | *[Link](#delayedjob)*               | *[Link](https://github.com/collectiveidea/delayed_job)*                        |
| Elasticsearch              | `elasticsearch`            | `>= 1.0`                 | `>= 1.0`                  | *[Link](#elasticsearch)*            | *[Link](https://github.com/elastic/elasticsearch-ruby)*                        |
| Ethon                      | `ethon`                    | `>= 0.11`                | `>= 0.11`                 | *[Link](#ethon)*                    | *[Link](https://github.com/typhoeus/ethon)*                                    |
| Excon                      | `excon`                    | `>= 0.50`                | `>= 0.50`                 | *[Link](#excon)*                    | *[Link](https://github.com/excon/excon)*                                       |
| Faraday                    | `faraday`                  | `>= 0.14`                | `>= 0.14`                 | *[Link](#faraday)*                  | *[Link](https://github.com/lostisland/faraday)*                                |
| Grape                      | `grape`                    | `>= 1.0`                 | `>= 1.0`                  | *[Link](#grape)*                    | *[Link](https://github.com/ruby-grape/grape)*                                  |
| GraphQL                    | `graphql`                  | `>= 1.7.9`               | `>= 1.7.9`                | *[Link](#graphql)*                  | *[Link](https://github.com/rmosolgo/graphql-ruby)*                             |
| gRPC                       | `grpc`                     | `>= 1.7`                 | *gem not available*       | *[Link](#grpc)*                     | *[Link](https://github.com/grpc/grpc/tree/master/src/rubyc)*                   |
| hanami                     | `hanami`                   | `>= 1`, `< 2`            | `>= 1`, `< 2`             | *[Link](#hanami)*                   | *[Link](https://github.com/hanami/hanami)*                                     |
| http.rb                    | `httprb`                   | `>= 2.0`                 | `>= 2.0`                  | *[Link](#httprb)*                   | *[Link](https://github.com/httprb/http)*                                       |
| httpclient                 | `httpclient`               | `>= 2.2`                 | `>= 2.2`                  | *[Link](#httpclient)*               | *[Link](https://github.com/nahi/httpclient)*                                   |
| httpx                      | `httpx`                    | `>= 0.11`                | `>= 0.11`                 | *[Link](#httpx)*                    | *[Link](https://gitlab.com/honeyryderchuck/httpx)*                             |
| Kafka                      | `ruby-kafka`               | `>= 0.7.10`              | `>= 0.7.10`               | *[Link](#kafka)*                    | *[Link](https://github.com/zendesk/ruby-kafka)*                                |
| Makara (via Active Record) | `makara`                   | `>= 0.3.5`               | `>= 0.3.5`                | *[Link](#active-record)*            | *[Link](https://github.com/instacart/makara)*                                  |
| MongoDB                    | `mongo`                    | `>= 2.1`                 | `>= 2.1`                  | *[Link](#mongodb)*                  | *[Link](https://github.com/mongodb/mongo-ruby-driver)*                         |
| MySQL2                     | `mysql2`                   | `>= 0.3.21`              | *gem not available*       | *[Link](#mysql2)*                   | *[Link](https://github.com/brianmario/mysql2)*                                 |
| Net/HTTP                   | `http`                     | *(Any supported Ruby)*   | *(Any supported Ruby)*    | *[Link](#nethttp)*                  | *[Link](https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html)* |
| OpenSearch                 | `opensearch-ruby`          | `>= 1.0.0`               | `>= 1.0.0`                | *[Link](#opensearch)*               | *[Link](https://github.com/opensearch-project/opensearch-ruby)*                |
| Postgres                   | `pg`                       | `>= 0.18.4`              | *gem not available*       | *[Link](#postgres)*                   | *[Link](https://github.com/ged/ruby-pg)*                                       |
| Presto                     | `presto`                   | `>= 0.5.14`              | `>= 0.5.14`               | *[Link](#presto)*                   | *[Link](https://github.com/treasure-data/presto-client-ruby)*                  |
| Qless                      | `qless`                    | `>= 0.10.0`              | `>= 0.10.0`               | *[Link](#qless)*                    | *[Link](https://github.com/seomoz/qless)*                                      |
| Que                        | `que`                      | `>= 1.0.0.beta2`         | `>= 1.0.0.beta2`          | *[Link](#que)*                      | *[Link](https://github.com/que-rb/que)*                                        |
| Racecar                    | `racecar`                  | `>= 0.3.5`               | `>= 0.3.5`                | *[Link](#racecar)*                  | *[Link](https://github.com/zendesk/racecar)*                                   |
| Rack                       | `rack`                     | `>= 1.1`                 | `>= 1.1`                  | *[Link](#rack)*                     | *[Link](https://github.com/rack/rack)*                                         |
| Rails                      | `rails`                    | `>= 3.2`                 | `>= 3.2`                  | *[Link](#rails)*                    | *[Link](https://github.com/rails/rails)*                                       |
| Rake                       | `rake`                     | `>= 12.0`                | `>= 12.0`                 | *[Link](#rake)*                     | *[Link](https://github.com/ruby/rake)*                                         |
| Redis                      | `redis`                    | `>= 3.2`                 | `>= 3.2`                 | *[Link](#redis)*                    | *[Link](https://github.com/redis/redis-rb)*                                    |
| Resque                     | `resque`                   | `>= 1.0`                 | `>= 1.0`                  | *[Link](#resque)*                   | *[Link](https://github.com/resque/resque)*                                     |
| Rest Client                | `rest-client`              | `>= 1.8`                 | `>= 1.8`                  | *[Link](#rest-client)*              | *[Link](https://github.com/rest-client/rest-client)*                           |
| Roda                       | `roda`                     | `>= 2.1, <4`             | `>= 2.1, <4`              | *[Link](#roda)*                     | *[Link](https://github.com/jeremyevans/roda)*                                  |
| Sequel                     | `sequel`                   | `>= 3.41`                | `>= 3.41`                 | *[Link](#sequel)*                   | *[Link](https://github.com/jeremyevans/sequel)*                                |
| Shoryuken                  | `shoryuken`                | `>= 3.2`                 | `>= 3.2`                  | *[Link](#shoryuken)*                | *[Link](https://github.com/phstc/shoryuken)*                                   |
| Sidekiq                    | `sidekiq`                  | `>= 3.5.4`               | `>= 3.5.4`                | *[Link](#sidekiq)*                  | *[Link](https://github.com/mperham/sidekiq)*                                   |
| Sinatra                    | `sinatra`                  | `>= 1.4`                 | `>= 1.4`                  | *[Link](#sinatra)*                  | *[Link](https://github.com/sinatra/sinatra)*                                   |
| Sneakers                   | `sneakers`                 | `>= 2.12.0`              | `>= 2.12.0`               | *[Link](#sneakers)*                 | *[Link](https://github.com/jondot/sneakers)*                                   |
| Stripe                     | `stripe`                   | `>= 5.15.0`              | `>= 5.15.0`               | *[Link](#stripe)*                   | *[Link](https://github.com/stripe/stripe-ruby)*                                |
| Sucker Punch               | `sucker_punch`             | `>= 2.0`                 | `>= 2.0`                  | *[Link](#sucker-punch)*             | *[Link](https://github.com/brandonhilkert/sucker_punch)*                       |

[1]: https://github.com/DataDog/dd-trace-rb
