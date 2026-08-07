---
aliases:
- /ja/tracing/compatibility_requirements/ruby
- /ja/tracing/setup_overview/compatibility_requirements/ruby
code_lang: ruby
code_lang_weight: 20
dependencies:
- https://github.com/DataDog/dd-trace-rb/blob/release/docs/Compatibility.md
further_reading:
- link: tracing/trace_collection/dd_libraries/ruby
  tag: ドキュメント
  text: アプリケーションのインスツルメンテーション
title: Ruby 互換性要件
type: multi-code-lang
---
<div class="alert alert-info">このドキュメントは <code>datadog</code> gem v2.x 向けです。<code>ddtrace</code> gem v1.x のドキュメントをお探しの場合は、従来の <a href="https://docs.datadoghq.com/tracing/trace_collection/compatibility/ruby_v1/">Ruby Compatibility Requirements</a> のドキュメントを参照してください。</div>

## 互換性

Ruby Datadog Trace ライブラリはオープンソースです。詳細については [dd-trace-rb][1] GitHub リポジトリを参照してください。

### サポート対象の Ruby インタープリタ

| タイプ  | ドキュメント              | バージョン   | サポートの種類              | Gem バージョンのサポート |
|-------|----------------------------|-----------|---------------------------|---------------------|
| MRI   | https://www.ruby-lang.org/ | 3.3       | [最新](#support-latest) | 最新              |
|       |                            | 3.2       | [最新](#support-latest) | 最新              |
|       |                            | 3.1       | [最新](#support-latest) | 最新              |
|       |                            | 3.0       | [最新](#support-latest) | 最新              |
|       |                            | 2.7       | [最新](#support-latest) | 最新              |
|       |                            | 2.6       | [最新](#support-latest) | 最新              |
|       |                            | 2.5       | [最新](#support-latest) | 最新              |
|       |                            | 2.4       | [EOL](#support-eol)       | < 2.0.0             |
|       |                            | 2.3       | [EOL](#support-eol)       | < 2.0.0             |
|       |                            | 2.2       | [EOL](#support-eol)       | < 2.0.0             |
|       |                            | 2.1       | [EOL](#support-eol)       | < 2.0.0             |
|       |                            | 2.0       | [EOL](#support-eol)       | < 0.50.0            |
|       |                            | 1.9       | [EOL](#support-eol)       | < 0.27.0            |
| JRuby | https://www.jruby.org      | 9.3       | [最新](#support-latest) | 最新              |
|       |                            | 9.2.21.0+ | [最新](#support-latest) | 最新              |

### サポートされる Web サーバー

| タイプ      | ドキュメント                     | バージョン      | サポートの種類              |
|-----------|-----------------------------------|--------------|---------------------------|
| Puma      | http://puma.io/                   | 2.16+ / 3.6+ | [最新](#support-latest) |
| Unicorn   | https://bogomips.org/unicorn/     | 4.8+ / 5.1+  | [最新](#support-latest) |
| Passenger | https://www.phusionpassenger.com/ | 5.0+         | [最新](#support-latest) |

### サポート対象のトレーシングフレームワーク

| タイプ        | ドキュメント                                   | バージョン | サポートの種類        | Gem バージョンのサポート |
|-------------|-------------------------------------------------|---------|---------------------|---------------------|
| OpenTracing | https://github.com/opentracing/opentracing-ruby | 0.4.1+  | [EOL](#support-eol) | < 2.0.0             |

### サポート対象のオペレーティングシステム

| OS            | サポートの種類                            | パッケージバージョン |
|---------------|-----------------------------------------|-----------------|
| Linux x86_64  | [最新](#support-latest)               | 最新          |
| Linux aarch64 | [最新](#support-latest)               | 最新          |
| macOS         | Dev 環境のみ                   | 最新          |
| MS Windows    | [未実装](#support-unimplemented) | 最新          |

リストにない CPU アーキテクチャ向けの Linux サポートが必要ですか？[特別なリクエストについてはカスタマーサポートにお問い合わせください。][49]

### サポート対象の Datadog Agent バージョン

| Datadog Agent バージョン | サポートの種類              | パッケージバージョン |
|-----------------------|---------------------------|-----------------|
| [7.x][53]             | [最新](#support-latest) | 最新          |
| [6.x][53]             | [最新](#support-latest) | 最新          |
| [5.x][54]             | [最新](#support-latest) | 最新          |

## インテグレーション

利用可能なインテグレーションとそのコンフィギュレーションオプションのリストについては、以下を参照してください。

| 名前                       | キー                        | 対応バージョン: MRI                     | 対応バージョン: JRuby                   | 構成方法 | Gem ソース                                                                   |
|----------------------------|----------------------------|---------------------------------------------|---------------------------------------------|------------------|------------------------------------------------------------------------------|
| Action Cable               | `action_cable`             | `>= 5.0`                                    | `>= 5.0`                                    | [リンク][2]        | [リンク](https://github.com/rails/rails/tree/master/actioncable)               |
| Action Mailer              | `action_mailer`            | `>= 5.0`                                    | `>= 5.0`                                    | [リンク][3]        | [リンク](https://github.com/rails/rails/tree/master/actionmailer)              |
| Action Pack                | `action_pack`              | `>= 4.0`                                    | `>= 4.0`                                    | [リンク][4]        | [リンク](https://github.com/rails/rails/tree/master/actionpack)                |
| Action View                | `action_view`              | `>= 4.0`                                    | `>= 4.0`                                    | [リンク][5]        | [リンク](https://github.com/rails/rails/tree/master/actionview)                |
| Active Job                 | `active_job`               | `>= 4.2`                                    | `>= 4.2`                                    | [リンク][6]        | [リンク](https://github.com/rails/rails/tree/master/activejob)                 |
| Active Model Serializers   | `active_model_serializers` | `>= 0.9`                                    | `>= 0.9`                                    | [リンク][7]        | [リンク](https://github.com/rails-api/active_model_serializers)                |
| Active Record              | `active_record`            | `>= 4.0`                                    | `>= 4.0`                                    | [リンク][8]        | [リンク](https://github.com/rails/rails/tree/master/activerecord)              |
| Active Support             | `active_support`           | `>= 4.0`                                    | `>= 4.0`                                    | [リンク][9]        | [リンク](https://github.com/rails/rails/tree/master/activesupport)             |
| AWS                        | `aws`                      | `>= 2.0`                                    | `>= 2.0`                                    | [リンク][10]       | [リンク](https://github.com/aws/aws-sdk-ruby)                                  |
| Concurrent Ruby            | `concurrent_ruby`          | `>= 0.9`                                    | `>= 0.9`                                    | [リンク][11]       | [リンク](https://github.com/ruby-concurrency/concurrent-ruby)                  |
| Dalli                      | `dalli`                    | `>= 2.0`                                    | `>= 2.0`                                    | [リンク][12]       | [リンク](https://github.com/petergoldstein/dalli)                              |
| DelayedJob                 | `delayed_job`              | `>= 4.1`                                    | `>= 4.1`                                    | [リンク][13]       | [リンク](https://github.com/collectiveidea/delayed_job)                        |
| Elasticsearch              | `elasticsearch`            | `>= 1.0`                                    | `>= 1.0`                                    | [リンク][14]       | [リンク](https://github.com/elastic/elasticsearch-ruby)                        |
| Ethon                      | `ethon`                    | `>= 0.11`                                   | `>= 0.11`                                   | [リンク][15]       | [リンク](https://github.com/typhoeus/ethon)                                    |
| Excon                      | `excon`                    | `>= 0.50`                                   | `>= 0.50`                                   | [リンク][16]       | [リンク](https://github.com/excon/excon)                                       |
| Faraday                    | `faraday`                  | `>= 0.14`                                   | `>= 0.14`                                   | [リンク][17]       | [リンク](https://github.com/lostisland/faraday)                                |
| Grape                      | `grape`                    | `>= 1.0`                                    | `>= 1.0`                                    | [リンク][18]       | [リンク](https://github.com/ruby-grape/grape)                                  |
| GraphQL                    | `graphql`                  | `>= 2.2.6`, `2.1.11+`,`2.0.28+`, `1.13.21+` | `>= 2.2.6`, `2.1.11+`,`2.0.28+`, `1.13.21+` | [リンク][19]       | [リンク](https://github.com/rmosolgo/graphql-ruby)                             |
| gRPC                       | `grpc`                     | `>= 1.7`                                    | *gem の利用不可*                         | [リンク][20]       | [リンク](https://github.com/grpc/grpc/tree/master/src/rubyc)                   |
| hanami                     | `hanami`                   | `>= 1`、`< 2`                               | `>= 1`、`< 2`                               | [リンク][21]       | [リンク](https://github.com/hanami/hanami)                                     |
| http.rb                    | `httprb`                   | `>= 2.0`                                    | `>= 2.0`                                    | [リンク][22]       | [リンク](https://github.com/httprb/http)                                       |
| httpclient                 | `httpclient`               | `>= 2.2`                                    | `>= 2.2`                                    | [リンク][23]       | [リンク](https://github.com/nahi/httpclient)                                   |
| httpx                      | `httpx`                    | `>= 0.11`                                   | `>= 0.11`                                   | [リンク][24]       | [リンク](https://gitlab.com/honeyryderchuck/httpx)                             |
| Kafka                      | `ruby-kafka`               | `>= 0.7.10`                                 | `>= 0.7.10`                                 | [リンク][25]       | [リンク](https://github.com/zendesk/ruby-kafka)                                |
| Makara (Active Record 経由) | `makara`                   | `>= 0.3.5`                                  | `>= 0.3.5`                                  | [リンク][8]        | [リンク](https://github.com/instacart/makara)                                  |
| MongoDB                    | `mongo`                    | `>= 2.1`                                    | `>= 2.1`                                    | [リンク][26]       | [リンク](https://github.com/mongodb/mongo-ruby-driver)                         |
| MySQL2                     | `mysql2`                   | `>= 0.3.21`                                 | *gem の利用不可*                         | [リンク][27]       | [リンク](https://github.com/brianmario/mysql2)                                 |
| Net/HTTP                   | `http`                     | *（サポートされているすべての Ruby）*                      | *（サポートされているすべての Ruby）*                      | [リンク][28]       | [リンク](https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html) |
| OpenSearch                 | `opensearch-ruby`          | `>= 1.0.0`                                  | `>= 1.0.0`                                  | [リンク][29]       | [リンク](https://github.com/opensearch-project/opensearch-ruby)                |
| Postgres                   | `pg`                       | `>= 0.18.4`                                 | *gem の利用不可*                         | [リンク][30]       | [リンク](https://github.com/ged/ruby-pg)                                       |
| Presto                     | `presto`                   | `>= 0.5.14`                                 | `>= 0.5.14`                                 | [リンク][31]       | [リンク](https://github.com/treasure-data/presto-client-ruby)                  |
| Que                        | `que`                      | `>= 1.0.0.beta2`                            | `>= 1.0.0.beta2`                            | [リンク][33]       | [リンク](https://github.com/que-rb/que)                                        |
| Racecar                    | `racecar`                  | `>= 0.3.5`                                  | `>= 1.3.5`                                  | [リンク][34]       | [リンク](https://github.com/zendesk/racecar)                                   |
| Rack                       | `rack`                     | `>= 1.1`                                    | `>= 1.1`                                    | [リンク][35]       | [リンク](https://github.com/rack/rack)                                         |
| Rails                      | `rails`                    | `>= 4.0`                                    | `>= 4.0`                                    | [リンク][36]       | [リンク](https://github.com/rails/rails)                                       |
| Rake                       | `rake`                     | `>= 12.0`                                   | `>= 12.0`                                   | [リンク][37]       | [リンク](https://github.com/ruby/rake)                                         |
| Redis                      | `redis`                    | `>= 3.2`                                    | `>= 3.2`                                    | [リンク][38]       | [リンク](https://github.com/redis/redis-rb)                                    |
| Resque                     | `resque`                   | `>= 1.0`                                    | `>= 1.0`                                    | [リンク][39]       | [リンク](https://github.com/resque/resque)                                     |
| Rest Client                | `rest-client`              | `>= 1.8`                                    | `>= 1.8`                                    | [リンク][40]       | [リンク](https://github.com/rest-client/rest-client)                           |
| Roda                       | `roda`                     | `>= 2.1, <4`                                | `>= 2.1, <4`                                | [リンク][41]       | [リンク](https://github.com/jeremyevans/roda)                                  |
| Sequel                     | `sequel`                   | `>= 3.41`                                   | `>= 3.41`                                   | [リンク][42]       | [リンク](https://github.com/jeremyevans/sequel)                                |
| Shoryuken                  | `shoryuken`                | `>= 3.2`                                    | `>= 3.2`                                    | [リンク][43]       | [リンク](https://github.com/phstc/shoryuken)                                   |
| Sidekiq                    | `sidekiq`                  | `>= 3.5.4`                                  | `>= 3.5.4`                                  | [リンク][44]       | [リンク](https://github.com/mperham/sidekiq)                                   |
| Sinatra                    | `sinatra`                  | `>= 1.4`                                    | `>= 1.4`                                    | [リンク][45]       | [リンク](https://github.com/sinatra/sinatra)                                   |
| Sneakers                   | `sneakers`                 | `>= 2.12.0`                                 | `>= 2.12.0`                                 | [リンク][46]       | [リンク](https://github.com/jondot/sneakers)                                   |
| Stripe                     | `stripe`                   | `>= 5.15.0`                                 | `>= 5.15.0`                                 | [リンク][47]       | [リンク](https://github.com/stripe/stripe-ruby)                                |
| Sucker Punch               | `sucker_punch`             | `>= 2.0`                                    | `>= 2.0`                                    | [リンク][48]       | [リンク](https://github.com/brandonhilkert/sucker_punch)                       |

### サポートポリシー

Datadog for Ruby は、ホストオペレーティングシステム、Ruby ランタイム、一部の Ruby ライブラリ、および Datadog Agent/API の特定バージョンで定義された依存関係を基盤として構築されています。これらのバージョンがメンテナによってサポート終了になると、Datadog for Ruby においても対応が制限されます。

#### サポートのレベル

| **レベル**                                             | **サポート内容**                                                                                                                      |
|-------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">非対応</span>     | 動作する可能性はありますが、テストもサポートも行われていません。[特別なリクエストについてはカスタマーサポートにお問い合わせください。][49]                           |
| <span id="support-unimplemented">未実装</span> | 実装されていません。[特別なリクエストについてはカスタマーサポートにお問い合わせください。][49]                                                          |
| <span id="support-prerelease">プレリリース</span>      | 初期実装です。まだすべての機能が含まれていない可能性があります。新機能のサポート、バグやセキュリティの修正は、ベストエフォートで提供されます。 |
| <span id="support-latest">最新</span>               | 全機能の完全実装。新機能、バグ、セキュリティフィックスを完全サポート。                                                 |
| <span id="support-maintenance">メンテナンス</span>     | 既存の機能を完全に実装。新機能は追加されません。重大なバグとセキュリティ修正のみ対応します。                  |
| <span id="support-eol">サポート終了 (EOL)</span>       | サポートなし。バージョンは引き続き使用できますが、バグ修正は提供されません。                                                               |

#### パッケージのバージョニング

Datadog for Ruby は [セマンティックバージョニング][50]を採用しています。

これがランタイムサポートのダウングレードに関連する場合、次のことを意味します。

- **メジャーバージョンアップ** (例: `1.0.0` から `2.0.0`) では、ランタイムのサポートを
  [ベータ版](#support-prerelease)/[最新版](#support-latest)から
  [メンテナンス](#support-maintenance)/[EOL](#support-eol) に変更する場合があります。
- **マイナーバージョンアップ** (例: `1.0.0` から `1.1.0`) では、ランタイムのサポートを
  [ベータ版](#support-prerelease)/[最新版](#support-latest)から[メンテナンス](#support-maintenance)に変更する場合があります。
- **パッチバージョンアップ** (例: `1.0.0` から `1.0.1`) では、ランタイムのサポートは変更されません。

#### ライブラリバージョンのサポート

Datadog for Ruby は、ライブラリの最新メジャーバージョンについて GA サポートを提供し、前のメジャーバージョンについてメンテナンスサポートを提供します。このサポートは、当該メジャーバージョンの最新のマイナーまたはパッチバージョンを通じて行われます。たとえば、1.21.0 がライブラリの最新バージョンでメンテナンスサポート対象である場合、バグ修正は 1.21.0 (または 1.20.1) の新しいリリースによって提供されます。これらのバグ修正が 1.x の以前のマイナーバージョンにパッチとしてバックポートされることはありません。

| Gem メジャーバージョン | サポートの種類                        |
|-------------------|-------------------------------------|
| 2.x               | [最新](#support-latest)           |
| 1.x               | [メンテナンス](#support-maintenance) |
| 0.x               | [EOL](#support-eol)                 |

#### 追加のサポートリソース

- [Datadog カスタマーサポート][49]
- [Datadog for Ruby セットアップドキュメント][51]
- [Datadog for Ruby GitHub リポジトリ][52]

[1]: https://github.com/DataDog/dd-trace-rb

[2]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#action-cable

[3]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#action-mailer

[4]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#action-pack

[5]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#action-view

[6]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#active-job

[7]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#active-model-serializers

[8]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#active-record

[9]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#active-support

[10]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#aws

[11]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#concurrent-ruby

[12]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#dalli

[13]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#delayedjob

[14]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#elasticsearch

[15]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#ethon

[16]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#excon

[17]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#faraday

[18]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#grape

[19]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#graphql

[20]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#grpc

[21]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#hanami

[22]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#httprb

[23]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#httpclient

[24]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#httpx

[25]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#kafka

[26]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#mongodb

[27]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#mysql2

[28]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#nethttp

[29]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#opensearch

[30]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#postgres

[31]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#presto

[33]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#que

[34]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#racecar

[35]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#rack

[36]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#rails

[37]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#rake

[38]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#redis

[39]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#resque

[40]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#rest-client

[41]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#roda

[42]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#sequel

[43]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#shoryuken

[44]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#sidekiq

[45]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#sinatra

[46]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#sneakers

[47]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#stripe

[48]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#sucker-punch

[49]: https://www.datadoghq.com/support

[50]: https://semver.org

[51]: https://docs.datadoghq.com/ja/tracing/setup_overview/setup/ruby

[52]: https://github.com/DataDog/dd-trace-rb

[53]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/?tab=agentv6v7

[54]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/?tab=agentv5