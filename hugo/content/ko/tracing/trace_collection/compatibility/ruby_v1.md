---
dependencies:
- https://github.com/DataDog/dd-trace-rb/blob/release/docs/legacy/Compatibility-v1.md
title: (레거시) Ruby 호환성 요구 사항
---
<div class="alert alert-danger">이 문서는 <code>ddtrace</code> gem v1.x용입니다. <code>datadog</code> gem v2.0 이상을 사용하는 경우 최신 <a href="https://docs.datadoghq.com/tracing/trace_collection/compatibility/ruby/">Ruby 호환성 요구 사항</a> 문서를 참조하세요.</div>

## 호환성

Ruby Datadog Trace 라이브러리는 오픈 소스입니다. 자세한 내용은 [dd-trace-rb][1] GitHub 리포지토리를 참조하세요.

### 지원되는 Ruby 인터프리터

| 유형  | 설명서              | 버전 | 지원 유형                         | Gem 버전 지원 |
| ----- | -------------------------- | -----   | ------------------------------------ | ------------------- |
| MRI   | https://www.ruby-lang.org/ | 3.3     | Full                                 | 최신              |
|       |                            | 3.2     | Full                                 | 최신              |
|       |                            | 3.1     | Full                                 | 최신              |
|       |                            | 3.0     | Full                                 | 최신              |
|       |                            | 2.7     | Full                                 | 최신              |
|       |                            | 2.6     | Full                                 | 최신              |
|       |                            | 2.5     | Full                                 | 최신              |
|       |                            | 2.4     | Full                                 | 최신              |
|       |                            | 2.3     | 전체                                  | 최신              |
|       |                            | 2.2     | Full (프로파일링 제외)          | 최신              |
|       |                            | 2.1     | Full (프로파일링 제외)          | 최신              |
|       |                            | 2.0     | 2021년 6월 7일 이후 EOL             | < 0.50.0            |
|       |                            | 1.9.3   | 2020년 8월 6일 이후 EOL           | < 0.27.0            |
|       |                            | 1.9.1   | 2020년 8월 6일 이후 EOL           | < 0.27.0            |
| JRuby | https://www.jruby.org      | 9.3     | Full                                 | 최신              |
|       |                            | 9.2     | Full                                 | 최신              |

### 지원되는 웹 서버

| 유형      | 설명서                     | 버전      | 지원 유형 |
| --------- | --------------------------------- | ------------ | ------------ |
| Puma      | http://puma.io/                   | 2.16+ / 3.6+ | Full         |
| Unicorn   | https://bogomips.org/unicorn/     | 4.8+ / 5.1+  | Full         |
| Passenger | https://www.phusionpassenger.com/ | 5.0+         | Full         |

### 지원되는 추적 프레임워크

| 유형        | 설명서                                   | 버전               | Gem 버전 지원 |
| ----------- | ----------------------------------------------- | --------------------- | ------------------- |
| OpenTracing | https://github.com/opentracing/opentracing-ruby | 0.4.1+                | >= 0.16.0           |

*Full* 지원은 모든 트레이서 기능을 사용할 수 있음을 의미합니다.

*Deprecated*는 향후 릴리스에서 지원이 *Maintenance*로 전환된다는 의미입니다.

*Maintenance*는 EOL까지 중요한 버그 수정만 백포트됨을 나타냅니다.

*EOL*은 지원이 더 이상 제공되지 않음을 나타냅니다.

### Apple macOS 지원

macOS에서의 `ddtrace` 사용은 개발에는 지원되지만 프로덕션 배포에는 지원되지 않습니다.

### Microsoft Windows 지원

Microsoft Windows에서의 `ddtrace` 사용은 현재 지원되지 않습니다. 커뮤니티 기여와 이슈는 계속 접수하되 우선순위가 낮은 것으로 간주합니다.

## 통합

사용 가능한 통합 목록과 해당 구성 옵션은 다음을 참조하세요.

| 이름                       | 키                        | 지원되는 버전: MRI  | 지원되는 버전: JRuby | 구성 방법                    | Gem 소스                                                                     |
| -------------------------- | -------------------------- | ------------------------ | --------------------------| ----------------------------------- | ------------------------------------------------------------------------------ |
| Action Cable               | `action_cable`             | `>= 5.0`                 | `>= 5.0`                  | [링크][2]                           | [링크](https://github.com/rails/rails/tree/master/actioncable)               |
| Action Mailer              | `action_mailer`            | `>= 5.0`                 | `>= 5.0`                  | [링크][3]                           | [링크](https://github.com/rails/rails/tree/master/actionmailer)              |
| Action Pack                | `action_pack`              | `>= 3.2`                 | `>= 3.2`                  | [링크][4]                           | [링크](https://github.com/rails/rails/tree/master/actionpack)                |
| Action View                | `action_view`              | `>= 3.2`                 | `>= 3.2`                  | [링크][5]                           | [링크](https://github.com/rails/rails/tree/master/actionview)                |
| Active Job                 | `active_job`               | `>= 4.2`                 | `>= 4.2`                  | [링크][6]                           | [링크](https://github.com/rails/rails/tree/master/activejob)                 |
| Active Model Serializers   | `active_model_serializers` | `>= 0.9`                 | `>= 0.9`                  | [링크][7]                           | [링크](https://github.com/rails-api/active_model_serializers)                |
| Active Record              | `active_record`            | `>= 3.2`                 | `>= 3.2`                  | [링크][8]                           | [링크](https://github.com/rails/rails/tree/master/activerecord)              |
| Active Support             | `active_support`           | `>= 3.2`                 | `>= 3.2`                  | [링크][9]                           | [링크](https://github.com/rails/rails/tree/master/activesupport)             |
| AWS                        | `aws`                      | `>= 2.0`                 | `>= 2.0`                  | [링크][10]                          | [링크](https://github.com/aws/aws-sdk-ruby)                                  |
| Concurrent Ruby            | `concurrent_ruby`          | `>= 0.9`                 | `>= 0.9`                  | [링크][11]                          | [링크](https://github.com/ruby-concurrency/concurrent-ruby)                  |
| Dalli                      | `dalli`                    | `>= 2.0`                 | `>= 2.0`                  | [링크][12]                          | [링크](https://github.com/petergoldstein/dalli)                              |
| DelayedJob                 | `delayed_job`              | `>= 4.1`                 | `>= 4.1`                  | [링크][13]                          | [링크](https://github.com/collectiveidea/delayed_job)                        |
| Elasticsearch              | `elasticsearch`            | `>= 1.0`                 | `>= 1.0`                  | [링크][14]                          | [링크](https://github.com/elastic/elasticsearch-ruby)                        |
| Ethon                      | `ethon`                    | `>= 0.11`                | `>= 0.11`                 | [링크][15]                          | [링크](https://github.com/typhoeus/ethon)                                    |
| Excon                      | `excon`                    | `>= 0.50`                | `>= 0.50`                 | [링크][16]                          | [링크](https://github.com/excon/excon)                                       |
| Faraday                    | `faraday`                  | `>= 0.14`                | `>= 0.14`                 | [링크][17]                          | [링크](https://github.com/lostisland/faraday)                                |
| Grape                      | `grape`                    | `>= 1.0`                 | `>= 1.0`                  | [링크][18]                          | [링크](https://github.com/ruby-grape/grape)                                  |
| GraphQL                    | `graphql`                  | `>= 1.7.9`               | `>= 1.7.9`                | [링크][19]                          | [링크](https://github.com/rmosolgo/graphql-ruby)                             |
| gRPC                       | `grpc`                     | `>= 1.7`                 | *gem not available*       | [링크][20]                          | [링크](https://github.com/grpc/grpc/tree/master/src/rubyc)                   |
| hanami                     | `hanami`                   | `>= 1`, `< 2`            | `>= 1`, `< 2`             | [링크][21]                          | [링크](https://github.com/hanami/hanami)                                     |
| http.rb                    | `httprb`                   | `>= 2.0`                 | `>= 2.0`                  | [링크][22]                          | [Link](https://github.com/httprb/http)                                       |
| httpclient                 | `httpclient`               | `>= 2.2`                 | `>= 2.2`                  | [링크][23]                          | [링크](https://github.com/nahi/httpclient)                                   |
| httpx                      | `httpx`                    | `>= 0.11`                | `>= 0.11`                 | [링크][24]                          | [링크](https://gitlab.com/honeyryderchuck/httpx)                             |
| Kafka                      | `ruby-kafka`               | `>= 0.7.10`              | `>= 0.7.10`               | [링크][25]                          | [링크](https://github.com/zendesk/ruby-kafka)                                |
| Makara (Active Record를 통해) | `makara`                   | `>= 0.3.5`               | `>= 0.3.5`                | [링크][8]                           | [링크](https://github.com/instacart/makara)                                  |
| MongoDB                    | `mongo`                    | `>= 2.1`                 | `>= 2.1`                  | [링크][26]                          | [링크](https://github.com/mongodb/mongo-ruby-driver)                         |
| MySQL2                     | `mysql2`                   | `>= 0.3.21`              | *gem not available*       | [링크][27]                          | [링크](https://github.com/brianmario/mysql2)                                 |
| Net/HTTP                   | `http`                     | *(지원되는 모든 Ruby)*   | *(지원되는 모든 Ruby)*    | [링크][28]                          | [링크](https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html) |
| OpenSearch                 | `opensearch-ruby`          | `>= 1.0.0`               | `>= 1.0.0`                | [링크][29]                          | [링크](https://github.com/opensearch-project/opensearch-ruby)                |
| Postgres                   | `pg`                       | `>= 0.18.4`              | *gem not available*       | [링크][30]                          | [링크](https://github.com/ged/ruby-pg)                                       |
| Presto                     | `presto`                   | `>= 0.5.14`              | `>= 0.5.14`               | [링크][31]                          | [링크](https://github.com/treasure-data/presto-client-ruby)                  |
| Qless                      | `qless`                    | `>= 0.10.0`              | `>= 0.10.0`               | [링크][32]                          | [링크](https://github.com/seomoz/qless)                                      |
| Que                        | `que`                      | `>= 1.0.0.beta2`         | `>= 1.0.0.beta2`          | [링크][33]                          | [링크](https://github.com/que-rb/que)                                        |
| Racecar                    | `racecar`                  | `>= 0.3.5`               | `>= 0.3.5`                | [링크][34]                          | [링크](https://github.com/zendesk/racecar)                                   |
| Rack                       | `rack`                     | `>= 1.1`                 | `>= 1.1`                  | [링크][35]                          | [링크](https://github.com/rack/rack)                                         |
| Rails                      | `rails`                    | `>= 3.2`                 | `>= 3.2`                  | [링크][36]                          | [링크](https://github.com/rails/rails)                                       |
| Rake                       | `rake`                     | `>= 12.0`                | `>= 12.0`                 | [링크][37]                          | [링크](https://github.com/ruby/rake)                                         |
| Redis                      | `redis`                    | `>= 3.2`                 | `>= 3.2`                  | [링크][38]                          | [링크](https://github.com/redis/redis-rb)                                    |
| Resque                     | `resque`                   | `>= 1.0`                 | `>= 1.0`                  | [링크][39]                          | [링크](https://github.com/resque/resque)                                     |
| Rest Client                | `rest-client`              | `>= 1.8`                 | `>= 1.8`                  | [링크][40]                          | [링크](https://github.com/rest-client/rest-client)                           |
| Roda                       | `roda`                     | `>= 2.1, <4`             | `>= 2.1, <4`              | [링크][41]                          | [링크](https://github.com/jeremyevans/roda)                                  |
| Sequel                     | `sequel`                   | `>= 3.41`                | `>= 3.41`                 | [링크][42]                          | [링크](https://github.com/jeremyevans/sequel)                                |
| Shoryuken                  | `shoryuken`                | `>= 3.2`                 | `>= 3.2`                  | [링크][43]                          | [링크](https://github.com/phstc/shoryuken)                                   |
| Sidekiq                    | `sidekiq`                  | `>= 3.5.4`               | `>= 3.5.4`                | [링크][44]                          | [링크](https://github.com/mperham/sidekiq)                                   |
| Sinatra                    | `sinatra`                  | `>= 1.4`                 | `>= 1.4`                  | [링크][45]                          | [링크](https://github.com/sinatra/sinatra)                                   |
| Sneakers                   | `sneakers`                 | `>= 2.12.0`              | `>= 2.12.0`               | [링크][46]                          | [링크](https://github.com/jondot/sneakers)                                   |
| Stripe                     | `stripe`                   | `>= 5.15.0`              | `>= 5.15.0`               | [링크][47]                          | [링크](https://github.com/stripe/stripe-ruby)                                |
| Sucker Punch               | `sucker_punch`             | `>= 2.0`                 | `>= 2.0`                  | [링크][48]                          | [링크](https://github.com/brandonhilkert/sucker_punch)                       |

### CI Visibility 통합

사용 가능한 CI Visibility통합은 다음과 같습니다.

| 이름      | 키        | 지원되는 버전: MRI | 지원되는 버전: JRuby | 구성 방법    | Gem 소스                                          |
|-----------|------------|-------------------------|---------------------------|---------------------|-----------------------------------------------------|
| Cucumber  | `cucumber` | `>= 3.0`                | `>= 1.7.16`               | [링크][49]          | [링크](https://github.com/cucumber/cucumber-ruby)   |
| RSpec     | `rspec`    | `>= 3.0.0`              | `>= 3.0.0`                | [링크][50]          | [링크](https://github.com/rspec/rspec)              |

[1]: https://github.com/DataDog/dd-trace-rb
[2]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#action-cable
[3]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#action-mailer
[4]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#action-pack
[5]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#action-view
[6]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#active-job
[7]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#active-model-serializers
[8]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#active-record
[9]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#active-support
[10]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#aws
[11]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#concurrent-ruby
[12]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#dalli
[13]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#delayedjob
[14]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#elasticsearch
[15]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#ethon
[16]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#excon
[17]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#faraday
[18]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#grape
[19]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#graphql
[20]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#grpc
[21]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#hanami
[22]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#httprb
[23]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#httpclient
[24]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#httpx
[25]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#kafka
[26]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#mongodb
[27]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#mysql2
[28]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#nethttp
[29]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#opensearch
[30]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#postgres
[31]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#presto
[32]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#qless
[33]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#que
[34]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#racecar
[35]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#rack
[36]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#rails
[37]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#rake
[38]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#redis
[39]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#resque
[40]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#rest-client
[41]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#roda
[42]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#sequel
[43]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#shoryuken
[44]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#sidekiq
[45]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#sinatra
[46]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#sneakers
[47]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#stripe
[48]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#sucker-punch
[49]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#cucumber
[50]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#rspec