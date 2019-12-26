---
categories:
  - languages
  - log collection
ddtype: ライブラリ
dependencies: []
description: Datadog のクライアントライブラリを使用して Ruby アプリケーションからカスタムメトリクスを送信
doc_link: 'https://docs.datadoghq.com/integrations/ruby/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitoring-rails-with-datadog/'
    tag: ブログ
    text: Datadog を使用した Rails アプリケーションの監視
git_integration_title: ruby
has_logo: true
integration_title: Ruby
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: ruby
public_title: Datadog-Ruby インテグレーション
short_description: Datadog のクライアントライブラリを使用して Ruby アプリケーションからカスタムメトリクスを送信 libraries.
version: '1.0'
---
## 概要

Ruby インテグレーションを使用すると、Ruby アプリケーションに数行のコードを追加することで、カスタムメトリクスを監視できます。たとえば、ページビューや関数呼び出しの回数を返すメトリクスです。

## セットアップ

Datadog は、Ruby アプリケーションメトリクスの実装を支援するライブラリを 2 つ提供しています。

| ライブラリ             | 説明                                                                                                                                                                                                                 |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [dogstatsd-ruby][1] | StatsD メトリクスサーバーの Datadog 拡張版である DogStatsD のクライアントです。                                                                                                                                               |
| [dogapi-rb][2]      | この Ruby クライアントは、既存の Ruby プロジェクトへの組み込みやスタンドアロンスクリプトの開発に適したライブラリです。イベントとメトリクスの報告用として、Datadog の基本 HTTP インターフェイスに抽象化を提供します。 |

### インストール

Datadog API の Ruby クライアントをインストールする。

```
gem install dogapi
```

DogStatsD の dogstatsd-ruby クライアントをインストールする。

```
gem install dogstatsd-ruby
```

### メトリクスの収集

Ruby インテグレーションでは、すべてのメトリクスが[カスタムメトリクス][3]です。カスタムメトリクスの収集の詳細については、以下を参照してください。

* [メトリクスの開発者ガイド][4]
* [dogstatsd-ruby][1] および [dogapi-rb][2] リポジトリ内のドキュメント
* [API ドキュメント][5]

以下に、Datadog API を使用してコードを実装する例を示します。

```

require 'rubygems'
require 'dogapi'

api_key = "<YOUR_DD_API_KEY>"
application_key = "<YOUR_DD_APP_KEY>"

# イベントの送信には、アプリケーションキーは必要ありません。
dog = Dogapi::Client.new(api_key)

# 新しいイベントを送信します。
dog.emit_event(Dogapi::Event.new('msg_text', :msg_title => 'Title'))
```

以下に、DogStatsD クライアントを使用してコードを実装する例を示します。

```
# dogstats モジュールをロードします。
require 'datadog/statsd'

# 統計インスタンスを作成します。
statsd = Datadog::Statsd.new('localhost', 8125)

# カウンターをインクリメントします。
statsd.increment('page.views')

# 時間の 50% ゲージを記録します。
statsd.gauge('users.online', 123, :sample_rate=>0.5)
```

### トレースの収集

[Ruby アプリケーションのトレーシング][6]に関する Datadog のドキュメントを参照してください。

### ログの収集

**Agent v6.0 以上で使用可能**

Datadog の [Ruby on Rails のログ収集に関するドキュメント][7]を参照してください。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参照先

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dogstatsd-ruby
[2]: https://github.com/DataDog/dogapi-rb
[3]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics
[4]: https://docs.datadoghq.com/ja/developers/metrics
[5]: https://docs.datadoghq.com/ja/api/?lang=ruby
[6]: https://docs.datadoghq.com/ja/tracing/setup/ruby
[7]: https://docs.datadoghq.com/ja/logs/log_collection/ruby
[8]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}