---
aliases:
- /ja/tracing/compatibility_requirements/ruby
- /ja/tracing/setup_overview/compatibility_requirements/ruby
code_lang: ruby
code_lang_weight: 20
dependencies:
- https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md
description: Ruby トレーサーの互換性要件です。
further_reading:
- link: tracing/trace_collection/dd_libraries/ruby
  tag: Documentation
  text: アプリケーションのインスツルメンテーション
kind: documentation
title: Ruby 互換性要件
type: multi-code-lang
---

## 互換性

Ruby Datadog Trace ライブラリはオープンソースです。詳細については、[GitHub リポジトリ][1]をご覧ください。

**サポートされている Ruby インタープリター**:

| タイプ  | Documentation              | バージョン | サポートの種類                         | Gem バージョンのサポート |
| ----- | -------------------------- | -----   | ------------------------------------ | ------------------- |
| MRI   | https://www.ruby-lang.org/ | 3.1     | フル                                 | 最新              |
|       |                            | 3.0     | フル                                 | 最新              |
|       |                            | 2.7     | フル                                 | 最新              |
|       |                            | 2.6     | フル                                 | 最新              |
|       |                            | 2.5     | フル                                 | 最新              |
|       |                            | 2.4     | フル                                 | 最新              |
|       |                            | 2.3     | フル                                 | 最新              |
|       |                            | 2.2     | フル                                 | 最新              |
|       |                            | 2.1     | フル                                 | 最新              |
|       |                            | 2.0     | 2021 年 6 月 7 日以降 EOL             | < 0.50.0            |
|       |                            | 1.9.3   | 2020 年 8 月 6 日以降 EOL           | < 0.27.0            |
|       |                            | 1.9.1   | 2020 年 8 月 6 日以降 EOL           | < 0.27.0            |
| JRuby | https://www.jruby.org      | 9.2     | フル                                 | 最新              |

**サポートされるウェブサーバー**:

| タイプ      | Documentation                     | バージョン      | サポートの種類 |
| --------- | --------------------------------- | ------------ | ------------ |
| Puma      | http://puma.io/                   | 2.16+ / 3.6+ | フル         |
| Unicorn   | https://bogomips.org/unicorn/     | 4.8+ / 5.1+  | フル         |
| Passenger | https://www.phusionpassenger.com/ | 5.0+         | フル         |

**サポートされるトレースフレームワーク**:

| タイプ        | Documentation                                   | バージョン               | Gem バージョンのサポート |
| ----------- | ----------------------------------------------- | --------------------- | ------------------- |
| OpenTracing | https://github.com/opentracing/opentracing-ruby | 0.4.1+ (w/ Ruby 2.1+) | >= 0.16.0           |

*フル*サポートは、すべてのトレーサー機能が利用可能であることを示します。

*非推奨*は、将来のリリースでサポートが*メンテナンス*に移行することを示します。

*メンテナンス*は、重大なバグ修正のみが EOL までバックポートされることを示します。

*EOL* は、サポートが提供されなくなったことを示します。

## インテグレーションインスツルメンテーション

多くの一般的なライブラリとフレームワークがそのまま使用でき、自動インスツルメンテーションできます。これは自動的にはアクティブ化されませんが、`Datadog.configure` API を使用してアクティブ化および構成できます。

```ruby
Datadog.configure do |c|
  # インテグレーションをアクティブ化、構成します
  c.tracing.instrument :integration_name, options
end
```

`options` はインテグレーション固有のコンフィギュレーション設定の `Hash` です。

利用可能なインテグレーションとそのコンフィギュレーションオプションのリストについては、以下を参照してください。

| 名前                     | キー                        | 対応バージョン: MRI  | 対応バージョン: JRuby | 構成方法                    | Gem ソース                                                                     |
| -------------------------- | -------------------------- |-------------------------|---------------------------|------------------|--------------|
| Action Cable             | `action_cable`             | `>= 5.0`                 | `>= 5.0`                  | *[リンク][2]*              | *[リンク][3]*             |
| Action Mailer              | `action_mailer`            | `>= 5.0`                | `>= 5.0`                  | *[リンク][4]*      | *[リンク][5]*  |
| Action Pack                | `action_pack`              | `>= 3.2`                | `>= 3.2`                  | *[リンク][6]*      | *[リンク][7]*  |
| Action View                | `action_view`              | `>= 3.2`                | `>= 3.2`                  | *[リンク][8]*      | *[リンク][9]*  |
| Active Job                 | `active_job`               | `>= 4.2`                | `>= 4.2`                  | *[リンク][10]*     | *[リンク][11]* |
| Active Model Serializers   | `active_model_serializers` | `>= 0.9`                | `>= 0.9`                  | *[リンク][12]*     | *[リンク][13]* |
| Active Record              | `active_record`            | `>= 3.2`                | `>= 3.2`                  | *[リンク][14]*     | *[リンク][15]* |
| Active Support             | `active_support`           | `>= 3.2`                | `>= 3.2`                  | *[リンク][16]*     | *[リンク][17]* |
| AWS                        | `aws`                      | `>= 2.0`                | `>= 2.0`                  | *[リンク][18]*     | *[リンク][19]* |
| Concurrent Ruby            | `concurrent_ruby`          | `>= 0.9`                | `>= 0.9`                  | *[リンク][20]*     | *[リンク][21]* |
| Dalli                      | `dalli`                    | `>= 2.0`                | `>= 2.0`                  | *[リンク][22]*     | *[リンク][23]* |
| DelayedJob                 | `delayed_job`              | `>= 4.1`                | `>= 4.1`                  | *[リンク][24]*     | *[リンク][25]* |
| Elasticsearch              | `elasticsearch`            | `>= 1.0`                | `>= 1.0`                  | *[リンク][26]*     | *[リンク][27]* |
| Ethon                      | `ethon`                    | `>= 0.11`               | `>= 0.11`                 | *[リンク][28]*     | *[リンク][29]* |
| Excon                      | `excon`                    | `>= 0.50`               | `>= 0.50`                 | *[リンク][30]*     | *[リンク][31]* |
| Faraday                    | `faraday`                  | `>= 0.14`               | `>= 0.14`                 | *[リンク][32]*     | *[リンク][33]* |
| Grape                      | `grape`                    | `>= 1.0`                | `>= 1.0`                  | *[リンク][34]*     | *[リンク][35]* |
| GraphQL                    | `graphql`                  | `>= 1.7.9`              | `>= 1.7.9`                | *[リンク][36]*     | *[リンク][37]* |
| gRPC                       | `grpc`                     | `>= 1.7`                | *gem の利用不可*       | *[リンク][38]*     | *[リンク][39]* |
| http.rb                    | `httprb`                   | `>= 2.0`                | `>= 2.0`                  | *[リンク][40]*     | *[リンク][41]* |
| httpclient                 | `httpclient`               | `>= 2.2`                | `>= 2.2`                  | *[リンク][42]*     | *[リンク][43]* |
| httpx                      | `httpx`                    | `>= 0.11`               | `>= 0.11`                 | *[リンク][44]*     | *[リンク][45]* |
| Kafka                      | `ruby-kafka`               | `>= 0.7.10`             | `>= 0.7.10`               | *[リンク][46]*     | *[リンク][47]* |
| Makara (Active Record 経由) | `makara`                   | `>= 0.3.5`              | `>= 0.3.5`                | *[リンク][14]*     | *[リンク][48]* |
| MongoDB                    | `mongo`                    | `>= 2.1`                | `>= 2.1`                  | *[リンク][49]*     | *[リンク][50]* |
| MySQL2                     | `mysql2`                   | `>= 0.3.21`             | *gem の利用不可*       | *[リンク][51]*     | *[リンク][52]* |
| Net/HTTP                   | `http`                     | *（サポートされているすべての Ruby）*  | *（サポートされているすべての Ruby）*    | *[リンク][53]*     | *[リンク][54]* |
| Presto                     | `presto`                   | `>= 0.5.14`             | `>= 0.5.14`               | *[リンク][55]*     | *[リンク][56]* |
| Qless                      | `qless`                    | `>= 0.10.0`             | `>= 0.10.0`               | *[リンク][57]*     | *[リンク][58]* |
| Que                        | `que`                      | `>= 1.0.0.beta2`        | `>= 1.0.0.beta2`          | *[リンク][59]*     | *[リンク][60]* |
| Racecar                    | `racecar`                  | `>= 0.3.5`              | `>= 0.3.5`                | *[リンク][61]*     | *[リンク][62]* |
| Rack                       | `rack`                     | `>= 1.1`                | `>= 1.1`                  | *[リンク][63]*     | *[リンク][64]* |
| Rails                      | `rails`                    | `>= 3.2`                | `>= 3.2`                  | *[リンク][65]*     | *[リンク][66]* |
| Rake                       | `rake`                     | `>= 12.0`               | `>= 12.0`                 | *[リンク][67]*     | *[リンク][68]* |
| Redis                      | `redis`                    | `>= 3.2`                | `>= 3.2`                  | *[リンク][69]*     | *[リンク][70]* |
| Resque                     | `resque`                   | `>= 1.0`                | `>= 1.0`                  | *[リンク][71]*     | *[リンク][72]* |
| Rest Client                | `rest-client`              | `>= 1.8`                | `>= 1.8`                  | *[リンク][73]*     | *[リンク][74]* |
| Sequel                     | `sequel`                   | `>= 3.41`               | `>= 3.41`                 | *[リンク][75]*     | *[リンク][76]* |
| Shoryuken                  | `shoryuken`                | `>= 3.2`                | `>= 3.2`                  | *[リンク][77]*     | *[リンク][78]* |
| Sidekiq                    | `sidekiq`                  | `>= 3.5.4`              | `>= 3.5.4`                | *[リンク][79]*     | *[リンク][80]* |
| Sinatra                    | `sinatra`                  | `>= 1.4`                | `>= 1.4`                  | *[リンク][81]*     | *[リンク][82]* |
| Sneakers                   | `sneakers`                 | `>= 2.12.0`             | `>= 2.12.0`               | *[リンク][83]*     | *[リンク][84]* |
| Sucker Punch               | `sucker_punch`             | `>= 2.0`                | `>= 2.0`                  | *[リンク][85]*     | *[リンク][86]* |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-rb
[2]: /ja/tracing/trace_collection/dd_libraries/ruby/#action-cable
[3]: https://github.com/rails/rails/tree/master/actioncable
[4]: /ja/tracing/trace_collection/dd_libraries/ruby/#action-mailer
[5]: https://github.com/rails/rails/tree/master/actionmailer
[6]: /ja/tracing/trace_collection/dd_libraries/ruby/#action-pack
[7]: https://github.com/rails/rails/tree/master/actionpack
[8]: /ja/tracing/trace_collection/dd_libraries/ruby/#action-view
[9]: https://github.com/rails/rails/tree/master/actionview
[10]: /ja/tracing/trace_collection/dd_libraries/ruby/#active-job
[11]: https://github.com/rails/rails/tree/master/activejob
[12]: /ja/tracing/trace_collection/dd_libraries/ruby/#active-model-serializers
[13]: https://github.com/rails-api/active_model_serializers
[14]: /ja/tracing/trace_collection/dd_libraries/ruby/#active-record
[15]: https://github.com/rails/rails/tree/master/activerecord
[16]: /ja/tracing/trace_collection/dd_libraries/ruby/#active-support
[17]: https://github.com/rails/rails/tree/master/activesupport
[18]: /ja/tracing/trace_collection/dd_libraries/ruby/#aws
[19]: https://github.com/aws/aws-sdk-ruby
[20]: /ja/tracing/trace_collection/dd_libraries/ruby/#concurrent-ruby
[21]: https://github.com/ruby-concurrency/concurrent-ruby
[22]: /ja/tracing/trace_collection/dd_libraries/ruby/#dalli
[23]: https://github.com/petergoldstein/dalli
[24]: /ja/tracing/trace_collection/dd_libraries/ruby/#delayedjob
[25]: https://github.com/collectiveidea/delayed_job
[26]: /ja/tracing/trace_collection/dd_libraries/ruby/#elasticsearch
[27]: https://github.com/elastic/elasticsearch-ruby
[28]: /ja/tracing/trace_collection/dd_libraries/ruby/#ethon
[29]: https://github.com/typhoeus/ethon
[30]: /ja/tracing/trace_collection/dd_libraries/ruby/#excon
[31]: https://github.com/excon/excon
[32]: /ja/tracing/trace_collection/dd_libraries/ruby/#faraday
[33]: https://github.com/lostisland/faraday
[34]: /ja/tracing/trace_collection/dd_libraries/ruby/#grape
[35]: https://github.com/ruby-grape/grape
[36]: /ja/tracing/trace_collection/dd_libraries/ruby/#graphql
[37]: https://github.com/rmosolgo/graphql-ruby
[38]: /ja/tracing/trace_collection/dd_libraries/ruby/#grpc
[39]: https://github.com/grpc/grpc/tree/master/src/rubyc
[40]: /ja/tracing/trace_collection/dd_libraries/ruby/#httprb
[41]: https://github.com/httprb/http
[42]: /ja/tracing/trace_collection/dd_libraries/ruby/#httpclient
[43]: https://github.com/nahi/httpclient
[44]: /ja/tracing/trace_collection/dd_libraries/ruby/#httpx
[45]: https://gitlab.com/honeyryderchuck/httpx
[46]: /ja/tracing/trace_collection/dd_libraries/ruby/#kafka
[47]: https://github.com/zendesk/ruby-kafka
[48]: https://github.com/instacart/makara
[49]: /ja/tracing/trace_collection/dd_libraries/ruby/#mongodb
[50]: https://github.com/mongodb/mongo-ruby-driver
[51]: /ja/tracing/trace_collection/dd_libraries/ruby/#mysql2
[52]: https://github.com/brianmario/mysql2
[53]: /ja/tracing/trace_collection/dd_libraries/ruby/#nethttp
[54]: https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html
[55]: /ja/tracing/trace_collection/dd_libraries/ruby/#presto
[56]: https://github.com/treasure-data/presto-client-ruby
[57]: /ja/tracing/trace_collection/dd_libraries/ruby/#qless
[58]: https://github.com/seomoz/qless
[59]: /ja/tracing/trace_collection/dd_libraries/ruby/#que
[60]: https://github.com/que-rb/que
[61]: /ja/tracing/trace_collection/dd_libraries/ruby/#racecar
[62]: https://github.com/zendesk/racecar
[63]: /ja/tracing/trace_collection/dd_libraries/ruby/#rack
[64]: https://github.com/rack/rack
[65]: /ja/tracing/trace_collection/dd_libraries/ruby/#rails
[66]: https://github.com/rails/rails
[67]: /ja/tracing/trace_collection/dd_libraries/ruby/#rake
[68]: https://github.com/ruby/rake
[69]: /ja/tracing/trace_collection/dd_libraries/ruby/#redis
[70]: https://github.com/redis/redis-rb
[71]: /ja/tracing/trace_collection/dd_libraries/ruby/#resque
[72]: https://github.com/resque/resque
[73]: /ja/tracing/trace_collection/dd_libraries/ruby/#rest-client
[74]: https://github.com/rest-client/rest-client
[75]: /ja/tracing/trace_collection/dd_libraries/ruby/#sequel
[76]: https://github.com/jeremyevans/sequel
[77]: /ja/tracing/trace_collection/dd_libraries/ruby/#shoryuken
[78]: https://github.com/phstc/shoryuken
[79]: /ja/tracing/trace_collection/dd_libraries/ruby/#sidekiq
[80]: https://github.com/mperham/sidekiq
[81]: /ja/tracing/trace_collection/dd_libraries/ruby/#sinatra
[82]: https://github.com/sinatra/sinatra
[83]: /ja/tracing/trace_collection/dd_libraries/ruby/#sneakers
[84]: https://github.com/jondot/sneakers
[85]: /ja/tracing/trace_collection/dd_libraries/ruby/#sucker-punch
[86]: https://github.com/brandonhilkert/sucker_punch