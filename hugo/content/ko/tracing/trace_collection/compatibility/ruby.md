---
aliases:
- /ko/tracing/compatibility_requirements/ruby
- /ko/tracing/setup_overview/compatibility_requirements/ruby
code_lang: 루비(Ruby)
code_lang_weight: 20
dependencies:
- https://github.com/DataDog/dd-trace-rb/blob/release/docs/Compatibility.md
further_reading:
- link: tracing/trace_collection/dd_libraries/ruby
  tag: 설명서
  text: 애플리케이션 계측
title: 루비(Ruby) 호환성 요구 사항
type: multi-code-lang
---
<div class="alert alert-info">이 설명서는 <code>Datadog</code>gem v2.x를 위한 것입니다. <code>ddtrace</code> gem v1.x 설명서를 찾고 있다면 레거시 <a href="https://docs.datadoghq.com/tracing/trace_collection/compatibility/ruby_v1/">루비(Ruby) 호환성 요구 사항</a> 
 설명서를 참조하세요.</div>

## 호환성

Ruby Datadog Trace 라이브러리는 오픈 소스입니다. 자세한 내용은 [dd-trace-rb][1] GitHub 리포지토리를 참조하세요.

### 지원되는 Ruby 인터프리터

| 유형  | 설명서              | 버전   | 지원 유형              | Gem 버전 지원 |
|-------|----------------------------|-----------|---------------------------|---------------------|
| MRI   | https://www.ruby-lang.org/ | 3.3       | [최신](#support-latest) | Latest              |
|       |                            | 3.2       | [최신](#support-latest) | Latest              |
|       |                            | 3.1       | [최신](#support-latest) | Latest              |
|       |                            | 3.0       | [최신](#support-latest) | Latest              |
|       |                            | 2.7       | [최신](#support-latest) | Latest              |
|       |                            | 2.6       | [최신](#support-latest) | Latest              |
|       |                            | 2.5       | [최신](#support-latest) | Latest              |
|       |                            | 2.4       | [EOL](#support-eol)       | < 2.0.0             |
|       |                            | 2.3       | [EOL](#support-eol)       | < 2.0.0             |
|       |                            | 2.2       | [EOL](#support-eol)       | < 2.0.0             |
|       |                            | 2.1       | [EOL](#support-eol)       | < 2.0.0             |
|       |                            | 2.0       | [EOL](#support-eol)       | < 0.50.0            |
|       |                            | 1.9       | [EOL](#support-eol)       | < 0.27.0            |
| JRuby | https://www.jruby.org      | 9.3       | [최신](#support-latest) | Latest              |
|       |                            | 9.2.21.0+ | [최신](#support-latest) | Latest              |

### 지원되는 웹 서버

| 유형      | 설명서                     | 버전      | 지원 유형              |
|-----------|-----------------------------------|--------------|---------------------------|
| Puma      | http://puma.io/                   | 2.16+ / 3.6+ | [최신](#support-latest) |
| Unicorn   | https://bogomips.org/unicorn/     | 4.8+ / 5.1+  | [최신](#support-latest) |
| Passenger | https://www.phusionpassenger.com/ | 5.0+         | [최신](#support-latest) |

### 지원되는 추적 프레임워크

| 유형        | 설명서                                   | 버전 | 지원 유형        | Gem 버전 지원 |
|-------------|-------------------------------------------------|---------|---------------------|---------------------|
| OpenTracing | https://github.com/opentracing/opentracing-ruby | 0.4.1+  | [EOL](#support-eol) | < 2.0.0             |

### 지원되는 운영 체제

| OS            | 지원 유형                            | 패키지 버전 |
|---------------|-----------------------------------------|-----------------|
| Linux x86_64  | [최신](#support-latest)               | Latest          |
| Linux aarch64 | [최신](#support-latest)               | Latest          |
| macOS         | 개발 환경 전용                   | Latest          |
| MS 윈도우즈(Windows)    | [구현되지 않음](#support-unimplemented) | Latest          |

목록에 없는 CPU 아키텍처에 대한 Linux 지원이 필요하신가요? [특별 요청은 고객 지원팀에 문의하세요.][49]

### 지원되는 Datadog 에이전트 버전

| Datadog 에이전트 버전 | 지원 유형              | 패키지 버전 |
|-----------------------|---------------------------|-----------------|
| [7.x][53]             | [최신](#support-latest) | Latest          |
| [6.x][53]             | [최신](#support-latest) | Latest          |
| [5.x][54]             | [최신](#support-latest) | Latest          |

## 통합

사용 가능한 통합 목록과 해당 구성 옵션은 다음을 참조하세요.

| 이름                       | 키                        | 지원되는 버전: MRI                     | 지원되는 : JRuby                   | 구성 방법 | Gem 소스                                                                   |
|----------------------------|----------------------------|---------------------------------------------|---------------------------------------------|------------------|------------------------------------------------------------------------------|
| Action Cable               | `action_cable`             | `>= 5.0`                                    | `>= 5.0`                                    | [링크][2]        | [링크](https://github.com/rails/rails/tree/master/actioncable)               |
| Action Mailer              | `action_mailer`            | `>= 5.0`                                    | `>= 5.0`                                    | [링크][3]        | [Link](https://github.com/rails/rails/tree/master/actionmailer)              |
| Action Pack                | `action_pack`              | `>= 4.0`                                    | `>= 4.0`                                    | [링크][4]        | [Link](https://github.com/rails/rails/tree/master/actionpack)                |
| Action View                | `action_view`              | `>= 4.0`                                    | `>= 4.0`                                    | [링크][5]        | [Link](https://github.com/rails/rails/tree/master/actionview)                |
| Active Job                 | `active_job`               | `>= 4.2`                                    | `>= 4.2`                                    | [링크][6]        | [Link](https://github.com/rails/rails/tree/master/activejob)                 |
| Active Model Serializers   | `active_model_serializers` | `>= 0.9`                                    | `>= 0.9`                                    | [링크][7]        | [Link](https://github.com/rails-api/active_model_serializers)                |
| Active Record              | `active_record`            | `>= 4.0`                                    | `>= 4.0`                                    | [링크][8]        | [Link](https://github.com/rails/rails/tree/master/activerecord)              |
| Active Support             | `active_support`           | `>= 4.0`                                    | `>= 4.0`                                    | [링크][9]        | [Link](https://github.com/rails/rails/tree/master/activesupport)             |
| AWS                        | `aws`                      | `>= 2.0`                                    | `>= 2.0`                                    | [링크][10]       | [Link](https://github.com/aws/aws-sdk-ruby)                                  |
| Concurrent Ruby            | `concurrent_ruby`          | `>= 0.9`                                    | `>= 0.9`                                    | [링크][11]       | [Link](https://github.com/ruby-concurrency/concurrent-ruby)                  |
| Dalli                      | `dalli`                    | `>= 2.0`                                    | `>= 2.0`                                    | [링크][12]       | [Link](https://github.com/petergoldstein/dalli)                              |
| DelayedJob                 | `delayed_job`              | `>= 4.1`                                    | `>= 4.1`                                    | [링크][13]       | [Link](https://github.com/collectiveidea/delayed_job)                        |
| Elasticsearch              | `elasticsearch`            | `>= 1.0`                                    | `>= 1.0`                                    | [링크][14]       | [Link](https://github.com/elastic/elasticsearch-ruby)                        |
| Ethon                      | `ethon`                    | `>= 0.11`                                   | `>= 0.11`                                   | [링크][15]       | [Link](https://github.com/typhoeus/ethon)                                    |
| Excon                      | `excon`                    | `>= 0.50`                                   | `>= 0.50`                                   | [링크][16]       | [Link](https://github.com/excon/excon)                                       |
| Faraday                    | `faraday`                  | `>= 0.14`                                   | `>= 0.14`                                   | [링크][17]       | [Link](https://github.com/lostisland/faraday)                                |
| Grape                      | `grape`                    | `>= 1.0`                                    | `>= 1.0`                                    | [링크][18]       | [Link](https://github.com/ruby-grape/grape)                                  |
| GraphQL                    | `graphql`                  | `>= 2.2.6`, `2.1.11+`,`2.0.28+`, `1.13.21+` | `>= 2.2.6`, `2.1.11+`,`2.0.28+`, `1.13.21+` | [링크][19]       | [Link](https://github.com/rmosolgo/graphql-ruby)                             |
| gRPC                       | `grpc`                     | `>= 1.7`                                    | *gem not available*                         | [링크][20]       | [Link](https://github.com/grpc/grpc/tree/master/src/rubyc)                   |
| hanami                     | `hanami`                   | `>= 1`, `< 2`                               | `>= 1`, `< 2`                               | [링크][21]       | [Link](https://github.com/hanami/hanami)                                     |
| http.rb                    | `httprb`                   | `>= 2.0`                                    | `>= 2.0`                                    | [링크][22]       | [Link](https://github.com/httprb/http)                                       |
| httpclient                 | `httpclient`               | `>= 2.2`                                    | `>= 2.2`                                    | [링크][23]       | [Link](https://github.com/nahi/httpclient)                                   |
| httpx                      | `httpx`                    | `>= 0.11`                                   | `>= 0.11`                                   | [링크][24]       | [Link](https://gitlab.com/honeyryderchuck/httpx)                             |
| Kafka                      | `ruby-kafka`               | `>= 0.7.10`                                 | `>= 0.7.10`                                 | [링크][25]       | [Link](https://github.com/zendesk/ruby-kafka)                                |
| Makara (via Active Record) | `makara`                   | `>= 0.3.5`                                  | `>= 0.3.5`                                  | [링크][8]        | [Link](https://github.com/instacart/makara)                                  |
| MongoDB                    | `mongo`                    | `>= 2.1`                                    | `>= 2.1`                                    | [링크][26]       | [Link](https://github.com/mongodb/mongo-ruby-driver)                         |
| MySQL2                     | `mysql2`                   | `>= 0.3.21`                                 | *gem not available*                         | [링크][27]       | [Link](https://github.com/brianmario/mysql2)                                 |
| Net/HTTP                   | `http`                     | *(지원되는 모든 Ruby)*                      | *(지원되는 모든 Ruby)*                      | [링크][28]       | [Link](https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html) |
| OpenSearch                 | `opensearch-ruby`          | `>= 1.0.0`                                  | `>= 1.0.0`                                  | [링크][29]       | [Link](https://github.com/opensearch-project/opensearch-ruby)                |
| Postgres                   | `pg`                       | `>= 0.18.4`                                 | *gem not available*                         | [링크][30]       | [Link](https://github.com/ged/ruby-pg)                                       |
| Presto                     | `presto`                   | `>= 0.5.14`                                 | `>= 0.5.14`                                 | [링크][31]       | [Link](https://github.com/treasure-data/presto-client-ruby)                  |
| Que                        | `que`                      | `>= 1.0.0.beta2`                            | `>= 1.0.0.beta2`                            | [링크][33]       | [Link](https://github.com/que-rb/que)                                        |
| Racecar                    | `racecar`                  | `>= 0.3.5`                                  | `>= 1.3.5`                                  | [링크][34]       | [Link](https://github.com/zendesk/racecar)                                   |
| Rack                       | `rack`                     | `>= 1.1`                                    | `>= 1.1`                                    | [링크][35]       | [Link](https://github.com/rack/rack)                                         |
| Rails                      | `rails`                    | `>= 4.0`                                    | `>= 4.0`                                    | [링크][36]       | [Link](https://github.com/rails/rails)                                       |
| Rake                       | `rake`                     | `>= 12.0`                                   | `>= 12.0`                                   | [링크][37]       | [Link](https://github.com/ruby/rake)                                         |
| Redis                      | `redis`                    | `>= 3.2`                                    | `>= 3.2`                                    | [링크][38]       | [Link](https://github.com/redis/redis-rb)                                    |
| Resque                     | `resque`                   | `>= 1.0`                                    | `>= 1.0`                                    | [링크][39]       | [Link](https://github.com/resque/resque)                                     |
| Rest Client                | `rest-client`              | `>= 1.8`                                    | `>= 1.8`                                    | [링크][40]       | [Link](https://github.com/rest-client/rest-client)                           |
| Roda                       | `roda`                     | `>= 2.1, <4`                                | `>= 2.1, <4`                                | [링크][41]       | [Link](https://github.com/jeremyevans/roda)                                  |
| Sequel                     | `sequel`                   | `>= 3.41`                                   | `>= 3.41`                                   | [링크][42]       | [Link](https://github.com/jeremyevans/sequel)                                |
| Shoryuken                  | `shoryuken`                | `>= 3.2`                                    | `>= 3.2`                                    | [링크][43]       | [Link](https://github.com/phstc/shoryuken)                                   |
| Sidekiq                    | `sidekiq`                  | `>= 3.5.4`                                  | `>= 3.5.4`                                  | [링크][44]       | [Link](https://github.com/mperham/sidekiq)                                   |
| Sinatra                    | `sinatra`                  | `>= 1.4`                                    | `>= 1.4`                                    | [링크][45]       | [Link](https://github.com/sinatra/sinatra)                                   |
| Sneakers                   | `sneakers`                 | `>= 2.12.0`                                 | `>= 2.12.0`                                 | [링크][46]       | [Link](https://github.com/jondot/sneakers)                                   |
| Stripe                     | `stripe`                   | `>= 5.15.0`                                 | `>= 5.15.0`                                 | [링크][47]       | [Link](https://github.com/stripe/stripe-ruby)                                |
| Sucker Punch               | `sucker_punch`             | `>= 2.0`                                    | `>= 2.0`                                    | [링크][48]       | [Link](https://github.com/brandonhilkert/sucker_punch)                       |

### 지원 정책

루비(Ruby)용 Datadog는 특정 버전의 호스트 운영 체제 루비(Ruby)
런타임, 특정 루비(Ruby) 라이브러리 , Datadog 에이전트/API의 특정 버전에 정의된 종속성에 따라 빌드됩니다. 이러한 버전이 해당 관리자에 의해 더 이상 지원되지 않으면
루비(Ruby)용 Datadog도 지원을 제한합니다.

#### 지원 수준

| **레벨**                                             | **제공 지원**                                                                                                                      |
|-------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">지원되지 않음</span>     | 기능적일 수 있지만 테스트 또는 지원되지 않습니다. [특별 요청은 고객 지원팀에 문의하세요.][49]                           |
| <span id="support-unimplemented">미구현됨</span> | 구현 안 함. [특별 요청은 고객 지원팀에 문의하세요.][49]                                                          |
| <span id="support-prerelease">사전 릴리스</span>      | 초기 구현. 아직 모든 기능이 포함되어 있지 않을 수 있습니다. 새로운 기능, 버그 및 보안 수정에 대한 지원은 최선의 노력을 기반으로 제공됩니다. |
| <span id="support-latest">최신</span>               | 모든 기능을 완전히 구현합니다. 새로운 기능, 버그 및 보안 수정에 대한 완벽한 지원을 제공합니다.                                                 |
| <span id="support-maintenance">유지 관리</span>     | 기존 기능을 완전히 구현합니다. 새로운 기능은 제공되지 않습니다. 중요한 버그 및 보안 수정만 지원됩니다.                  |
| <span id="support-eol">서비스 종료 (EOL)</span>       | 지원되지 않습니다. 해당 버전은 계속 사용할 수 있지만 버그 수정은 제공되지 않습니다.                                                               |

#### 패키지 버전 관리

루비(Ruby)용 Datadog 사례[시맨틱 버전 관리][50].

런타임 지원 다운그레이드와 관련되어 있기 때문에, 다음을 의미합니다.

- **주요 버전 업데이트** (예: `1.0.0` 에서 `2.0.0`)로 인해 모든 런타임에 대한 지원이 변경될 수 있습니다.
  [베타](#support-prerelease)/[최신](#support-latest)에서
  [유지 관리](#support-maintenance)/[EOL](#support-eol)로 변경될 수 있습니다.
- **부 버전 업데이트**(예: `1.0.0` 에서 `1.1.0` 로 변경)로 인해 모든 런타임에 대한 지원이 변경될 수 있습니다.
  [베타](#support-prerelease)/[최신](#support-latest)에서 [유지 관리](#support-maintenance)로의 지원 변경이 발생할 수 있습니다.
- **패치 버전 업데이트**(예: `1.0.0`에서 `1.0.1`)는 모든 런타임에 대한 지원을 변경하지 않습니다.

#### 라이브러리 버전 지원

루비(Ruby)용 Datadog의 최신 주 버전에 대한 GA 지원과 이전 주 버전에 대한 유지 관리 지원을 제공합니다.
라이브러리이 지원은 주 버전의 최신 부 버전 또는 패치 버전을 통해 제공됩니다.
예를 들어 1.21.0이 유지 관리 지원이 포함된 라이브러리의 최신 버전인 경우 버그 수정은 1.21.0(또는 1.20.1)의 신규 릴리스를 통해 제공됩니다.
이러한 버그 수정은 이전 1.x 부 버전에 패치로 백포트되지 않습니다.

| Gem 주 버전 | 지원 유형                        |
|-------------------|-------------------------------------|
| 2.x               | [최신](#support-latest)           |
| 1.x               | [유지 관리](#support-maintenance) |
| 0.x               | [EOL](#support-eol)                 |

#### 추가 지원 리소스

- [Datadog 고객 지원][49]
- [루비(Ruby)용 Datadog 설정 설명서][51]
- [루비(Ruby)용 Datadog GitHub 리포지토리][52]

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

[49]: https://www.datadoghq.com/support

[50]: https://semver.org

[51]: https://docs.datadoghq.com/ko/tracing/setup_overview/setup/ruby

[52]: https://github.com/DataDog/dd-trace-rb

[53]: https://docs.datadoghq.com/ko/agent/basic_agent_usage/?tab=agentv6v7

[54]: https://docs.datadoghq.com/ko/agent/basic_agent_usage/?tab=agentv5