---
title: Ruby 互換性要件
dependencies:
  - 'https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md'
kind: ドキュメント
description: Ruby トレーサーの互換性要件です。
further_reading:
  - link: tracing/setup/ruby
    tag: Documentation
    text: アプリケーションのインスツルメンテーション
---
## 互換性

Ruby Datadog Trace ライブラリはオープンソースです。詳細については、[GitHub リポジトリ][1]をご覧ください。

**サポートされている Ruby インタープリター**:

| タイプ  | Documentation              | バージョン | サポートの種類                         | Gem バージョンのサポート |
| ----- | -------------------------- | -----   | ------------------------------------ | ------------------- |
| MRI   | https://www.ruby-lang.org/ | 2.7     | フル                                 | 最新              |
|       |                            | 2.6     | フル                                 | 最新              |
|       |                            | 2.5     | フル                                 | 最新              |
|       |                            | 2.4     | フル                                 | 最新              |
|       |                            | 2.3     | フル                                 | 最新              |
|       |                            | 2.2     | フル                                 | 最新              |
|       |                            | 2.1     | フル                                 | 最新              |
|       |                            | 2.0     | フル                                 | 最新              |
|       |                            | 1.9.3   | メンテナンス（2020 年 8 月 6 日まで） | < 0.27.0            |
|       |                            | 1.9.1   | メンテナンス（2020 年 8 月 6 日まで） | < 0.27.0            |
| JRuby | https://www.jruby.org      | 9.2     | フル                                | 最新              |

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

*フル*サポートは、Datadog がすべてのトレーサー機能をサポートすることを示します。

*非推奨*は、将来のリリースで Datadog サポートが*メンテナンス*に移行することを示します。

*メンテナンス*は、Datadog が重大なバグ修正のみにパッチを適用することを示します。

*EOL* は、Datadog がサポートを提供しなくなったことを示します。

## インテグレーションインスツルメンテーション

多くの一般的なライブラリとフレームワークがそのまま使用でき、自動インスツルメンテーションできます。これは自動的にはアクティブ化されませんが、`Datadog.configure` API を使用して簡単にアクティブ化および構成できます。

```ruby
Datadog.configure do |c|
  # インテグレーションをアクティブ化、構成します
  c.use :integration_name, options
end
```

`options` はインテグレーション固有のコンフィギュレーション設定の `Hash` です。

利用可能なインテグレーションとそのコンフィギュレーションオプションのリストについては、以下を参照してください。

| 名前                     | キー                        | 対応バージョン: MRI  | 対応バージョン: JRuby | 構成方法                    | Gem ソース                                                                     |
| ------------------------ | -------------------------- | ------------------------ | --------------------------| ----------------------------------- | ------------------------------------------------------------------------------ |
| Action Cable             | `action_cable`             | `>= 5.0`                 | `>= 5.0`                  | *[リンク][2]*              | *[リンク][3]*             |
| Action View              | `action_view`              | `>= 3.0`                 | `>= 3.0`                  | *[リンク][4]*              | *[リンク][5]*             |
| Active Model Serializers | `active_model_serializers` | `>= 0.9`                 | `>= 0.9`                  | *[リンク][6]*              |  *[リンク][7]*            |
| Action Pack              | `action_pack`              | `>= 3.0`                 | `>= 3.0`                  | *[リンク][8]*              | *[リンク][9]*             |
| Active Record            | `active_record`            | `>= 3.0`                 | `>= 3.0`                  | *[リンク][10]*             | *[リンク][11]*            |
| Active Support           | `active_support`           | `>= 3.0`                 | `>= 3.0`                  | *[リンク][12]*             | *[リンク][13]*            |
| AWS                      | `aws`                      | `>= 2.0`                 | `>= 2.0`                  | *[リンク][14]*             | *[リンク][15]*            |
| Concurrent Ruby          | `concurrent_ruby`          | `>= 0.9`                 | `>= 0.9`                  | *[リンク][16]*             | *[リンク][17]*            |
| Dalli                    | `dalli`                    | `>= 2.0`                 | `>= 2.0`                  | *[リンク][18]*             | *[リンク][19]*            |
| DelayedJob               | `delayed_job`              | `>= 4.1`                 | `>= 4.1`                  | *[リンク][20]*             | *[リンク][21]*            |
| Elasticsearch            | `elasticsearch`            | `>= 1.0`                 | `>= 1.0`                  | *[リンク][22]*             | *[リンク][23]*            |
| Ethon                    | `ethon`                    | `>= 0.11`                | `>= 0.11`                 | *[リンク][24]*             | *[リンク][25]*            |
| Excon                    | `excon`                    | `>= 0.50`                | `>= 0.50`                 | *[リンク][26]*             | *[リンク][27]*            |
| Faraday                  | `faraday`                  | `>= 0.14`                | `>= 0.14`                 | *[リンク][28]*             | *[リンク][29]*            |
| Grape                    | `grape`                    | `>= 1.0`                 | `>= 1.0`                  | *[リンク][30]*             | *[リンク][31]*            |
| GraphQL                  | `graphql`                  | `>= 1.7.9`               | `>= 1.7.9`                | *[リンク][32]*             | *[リンク][33]*            |
| gRPC                     | `grpc`                     | `>= 1.7`                 | *gem の利用不可*       | *[リンク][34]*             | *[リンク][35]*            |
| http.rb                  | `httprb`                   | `>= 2.0`                 | `>= 2.0`                  | *[リンク][36]*             | *[リンク][37]*            |
| Kafka                    | `ruby-kafka`               | `>= 0.7.10`              | `>= 0.7.10`               | *[リンク][38]*             | *[リンク][39]*            |
| MongoDB                  | `mongo`                    | `>= 2.1`                 | `>= 2.1`                  | *[リンク][40]*             | *[リンク][41]*            |
| MySQL2                   | `mysql2`                   | `>= 0.3.21`              | *gem の利用不可*       | *[リンク][42]*             | *[リンク][43]*            |
| Net/HTTP                 | `http`                     | *（サポートされているすべての Ruby）*   | *（サポートされているすべての Ruby）*    | *[リンク][44]*             | *[リンク][45]*            |
| Presto                   | `presto`                   | `>= 0.5.14`              | `>= 0.5.14`               | *[リンク][46]*             | *[リンク][47]*            |
| Racecar                  | `racecar`                  | `>= 0.3.5`               | `>= 0.3.5`                | *[リンク][48]*             | *[リンク][49]*            |
| Rack                     | `rack`                     | `>= 1.1`                 | `>= 1.1`                  | *[リンク][50]*             | *[リンク][51]*            |
| Rails                    | `rails`                    | `>= 3.0`                 | `>= 3.0`                  | *[リンク][52]*             | *[リンク][53]*            |
| Rake                     | `rake`                     | `>= 12.0`                | `>= 12.0`                 | *[リンク][54]*             | *[リンク][55]*            |
| Redis                    | `redis`                    | `>= 3.2`                 | `>= 3.2`                  | *[リンク][56]*             | *[リンク][57]*            |
| Resque                   | `resque`                   | `>= 1.0, < 2.0`          | `>= 1.0, < 2.0`           | *[リンク][58]*             | *[リンク][59]*            |
| Rest Client              | `rest-client`              | `>= 1.8`                 | `>= 1.8`                  | *[リンク][60]*             | *[リンク][61]*            |
| Sequel                   | `sequel`                   | `>= 3.41`                | `>= 3.41`                 | *[リンク][62]*             | *[リンク][63]*            |
| Shoryuken                | `shoryuken`                | `>= 3.2`                 | `>= 3.2`                  | *[リンク][64]*             | *[リンク][65]*            |
| Sidekiq                  | `sidekiq`                  | `>= 3.5.4`               | `>= 3.5.4`                | *[リンク][66]*             | *[リンク][67]*            |
| Sinatra                  | `sinatra`                  | `>= 1.4`                 | `>= 1.4`                  | *[リンク][68]*             | *[リンク][69]*            |
| Sneakers                 | `sneakers`                 | `>= 2.12.0`              | `>= 2.12.0`               | *[リンク][70]*             | *[リンク][71]*            |
| Sucker Punch             | `sucker_punch`             | `>= 2.0`                 | `>= 2.0`                  | *[リンク][72]*             | *[リンク][73]*            |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-rb
[2]: /ja/tracing/setup/ruby/#action-cable
[3]: https://github.com/rails/rails/tree/master/actioncable
[4]: /ja/tracing/setup/ruby/#action-view
[5]: https://github.com/rails/rails/tree/master/actionview
[6]: /ja/tracing/setup/ruby/#active-model-serializers
[7]: https://github.com/rails-api/active_model_serializers
[8]: /ja/tracing/setup/ruby/#action-pack
[9]: https://github.com/rails/rails/tree/master/actionpack
[10]: /ja/tracing/setup/ruby/#active-record
[11]: https://github.com/rails/rails/tree/master/activerecord
[12]: /ja/tracing/setup/ruby/#active-support
[13]: https://github.com/rails/rails/tree/master/activesupport
[14]: /ja/tracing/setup/ruby/#aws
[15]: https://github.com/aws/aws-sdk-ruby
[16]: /ja/tracing/setup/ruby/#concurrent-ruby
[17]: https://github.com/ruby-concurrency/concurrent-ruby
[18]: /ja/tracing/setup/ruby/#dalli
[19]: https://github.com/petergoldstein/dalli
[20]: /ja/tracing/setup/ruby/#delayedjob
[21]: https://github.com/collectiveidea/delayed_job
[22]: /ja/tracing/setup/ruby/#elasticsearch
[23]: https://github.com/elastic/elasticsearch-ruby
[24]: /ja/tracing/setup/ruby/#ethon
[25]: https://github.com/typhoeus/ethon
[26]: /ja/tracing/setup/ruby/#excon
[27]: https://github.com/excon/excon
[28]: /ja/tracing/setup/ruby/#faraday
[29]: https://github.com/lostisland/faraday
[30]: /ja/tracing/setup/ruby/#grape
[31]: https://github.com/ruby-grape/grape
[32]: /ja/tracing/setup/ruby/#graphql
[33]: https://github.com/rmosolgo/graphql-ruby
[34]: /ja/tracing/setup/ruby/#grpc
[35]: https://github.com/grpc/grpc/tree/master/src/rubyc
[36]: https://github.com/httprb/http
[37]: /ja/tracing/setup/ruby/#http-rb
[38]: https://github.com/zendesk/ruby-kafka
[39]: /ja/tracing/setup/ruby/#kafka
[40]: /ja/tracing/setup/ruby/#mongodb
[41]: https://github.com/mongodb/mongo-ruby-driver
[42]: /ja/tracing/setup/ruby/#mysql2
[43]: https://github.com/brianmario/mysql2
[44]: /ja/tracing/setup/ruby/#nethttp
[45]: https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html
[46]: /ja/tracing/setup/ruby/#presto
[47]: https://github.com/treasure-data/presto-client-ruby
[48]: /ja/tracing/setup/ruby/#racecar
[49]: https://github.com/zendesk/racecar
[50]: /ja/tracing/setup/ruby/#rack
[51]: https://github.com/rack/rack
[52]: /ja/tracing/setup/ruby/#rails
[53]: https://github.com/rails/rails
[54]: /ja/tracing/setup/ruby/#rake
[55]: https://github.com/ruby/rake
[56]: /ja/tracing/setup/ruby/#redis
[57]: https://github.com/redis/redis-rb
[58]: /ja/tracing/setup/ruby/#resque
[59]: https://github.com/resque/resque
[60]: /ja/tracing/setup/ruby/#rest-client
[61]: https://github.com/rest-client/rest-client
[62]: /ja/tracing/setup/ruby/#sequel
[63]: https://github.com/jeremyevans/sequel
[64]: /ja/tracing/setup/ruby/#shoryuken
[65]: https://github.com/phstc/shoryuken
[66]: /ja/tracing/setup/ruby/#sidekiq
[67]: https://github.com/mperham/sidekiq
[68]: /ja/tracing/setup/ruby/#sinatra
[69]: https://github.com/sinatra/sinatra
[70]: https://github.com/jondot/sneakers
[71]: /ja/tracing/setup/ruby/#sneakers
[72]: /ja/tracing/setup/ruby/#sucker-punch
[73]: https://github.com/brandonhilkert/sucker_punch