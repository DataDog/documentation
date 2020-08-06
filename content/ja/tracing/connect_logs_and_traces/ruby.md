---
title: Ruby ログとトレースの接続
kind: ドキュメント
description: Ruby ログとトレースを接続して Datadog で関連付けます。
further_reading:
  - link: tracing/manual_instrumentation
    tags: トレースの加工
    text: 手動でアプリケーションのインスツルメンテーションを行いトレースを作成します。
  - link: tracing/opentracing
    tags: トレースの加工
    text: アプリケーション全体に Opentracing を実装します。
  - link: tracing/visualization/
    tag: APM の UI を利用する
    text: サービス、リソース、トレースの詳細
  - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
    tag: ブログ
    text: 自動的にリクエストログとトレースに相関性を持たせる
---
## トレースおよびスパン ID を手動で挿入する

ロギングなどの多くの場合において、相互参照を容易にするために、トレース ID を他のイベントまたはデータストリームに関連付けると便利です。トレーサーは、`active_correlation` を介して現在アクティブなトレースの相関識別子を生成できます。これは、これらの他のデータソースを修飾するために使用できます。

```ruby
# トレースがアクティブな場合...
Datadog.tracer.trace('correlation.example') do
  # #<Datadog::Correlation::Identifier> を返します
  correlation = Datadog.tracer.active_correlation
  correlation.trace_id # => 5963550561812073440
  correlation.span_id # => 2232727802607726424
  correlation.env # => 'production' (DD_ENV から派生)
  correlation.service # => 'billing-api' (DD_SERVICE から派生)
  correlation.version # => '2.5.17' (DD_VERSION から派生)
end

# トレースがアクティブでない場合...
correlation = Datadog.tracer.active_correlation
# #<Datadog::Correlation::Identifier> を返します
correlation = Datadog.tracer.active_correlation
correlation.trace_id # => 0
correlation.span_id # => 0
correlation.env # => 'production' (DD_ENV から派生)
correlation.service # => 'billing-api' (DD_SERVICE から派生)
correlation.version # => '2.5.17' (DD_VERSION から派生)
```

#### Lograge を使用して Rails アプリケーションにロギングする場合（推奨）

[Rails アプリケーションで Lograge をセットアップ][1]した後、環境構成ファイル (例: `config/environments/production.rb`) の `custom_options` ブロックを変更してトレース ID を追加します:

```ruby
config.lograge.custom_options = lambda do |event|
  # 現在のスレッドのトレース情報を取得
  correlation = Datadog.tracer.active_correlation

  {
    # ID をタグとしてログ出力に追加
    :dd => {
      # JSON シリアル化中に精度を維持するには、大きな数値に文字列を使用します
      :trace_id => correlation.trace_id.to_s,
      :span_id => correlation.span_id.to_s,
      :env => correlation.env.to_s,
      :service => correlation.service.to_s,
      :version => correlation.version.to_s
    },
    :ddsource => ["ruby"],
    :params => event.payload[:params].reject { |k| %w(controller action).include? k }
  }
end
```

#### Rails アプリケーションにロギングする場合

`ActiveSupport::TaggedLogging` ロガーで構成された Rails アプリケーションは相関 ID をタグとしてログ出力に付加することができます。デフォルトの Rails ロガーはこのタグ付けロギングを実装し、相関タグの追加を簡単にしています。

Rails 環境コンフィギュレーションファイルに、以下を追加します。

```ruby
Rails.application.configure do
  config.log_tags = [proc { Datadog.tracer.active_correlation.to_s }]
end

# 以下を前提:
# DD_ENV = 'production' (アプリケーションが実行されている環境の名前。)
# DD_SERVICE = 'billing-api' (アプリケーションのデフォルトのサービス名。)
# DD_VERSION = '2.5.17' (アプリケーションのバージョン。)

# ウェブリクエストは以下を生成します。
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Started GET "/articles" for 172.22.0.1 at 2019-01-16 18:50:57 +0000
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Processing by ArticlesController#index as */*
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206]   Article Load (0.5ms)  SELECT "articles".* FROM "articles"
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Completed 200 OK in 7ms (Views: 5.5ms | ActiveRecord: 0.5ms)
```

#### Ruby アプリケーションにロギングする場合

ロガーに相関 ID を追加するには、`Datadog.tracer.active_correlation` がある相関 ID を取得するログフォーマッタを追加し、これをメッセージに追加します。

Datadog ロギングと適切に関連付けるには、ログメッセージに次のように表示されていることを確認してください。

 - `dd.env=<環境>`: ここで、`<環境>` は `Datadog.tracer.active_correlation.env` と同じです。環境が構成されていない場合は省略します。
 - `dd.service=<サービス>`: ここで、`<サービス>` は `Datadog.tracer.active_correlation.service` と同じです。デフォルトのサービス名が構成されていない場合は省略します。
 - `dd.version=<バージョン>`: ここで、`<バージョン>` は `Datadog.tracer.active_correlation.version` と同じです。アプリケーションのバージョンが構成されていない場合は省略します。
 - `dd.trace_id=<トレース ID>`: ここで `<トレース ID>` は `Datadog.tracer.active_correlation.trace_id` か、またはロギング中にどのトレースもアクティブでない場合は `0` になります。
 - `dd.span_id=<スパン ID>`: ここで `<スパン ID>` は `Datadog.tracer.active_correlation.span_id` か、またはロギング中にどのトレースもアクティブでない場合は `0` になります。

デフォルトでは、`Datadog::Correlation::Identifier#to_s` は `dd.env=<環境> dd.service=<サービス> dd.version=<バージョン> dd.trace_id=<トレース_ID> dd.span_id=<スパン_ID>` を返します。

トレースがアクティブでなく、アプリケーション環境とバージョンが構成されていない場合、`dd.trace_id=0 dd.span_id=0 dd.env= dd.version=` が返されます。

実例:

```ruby
require 'ddtrace'
require 'logger'

ENV['DD_ENV'] = 'production'
ENV['DD_SERVICE'] = 'billing-api'
ENV['DD_VERSION'] = '2.5.17'

logger = Logger.new(STDOUT)
logger.progname = 'my_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog.tracer.active_correlation}] #{msg}\n"
end

# どのトレースもアクティブでない場合
logger.warn('これはトレースされないオペレーションです。')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=0 dd.span_id=0] これはトレースされないオペレーションです。

# トレースがアクティブな場合
Datadog.tracer.trace('my.operation') { logger.warn('これはトレースされるオペレーションです。') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] これはトレースされるオペレーションです。
```

**注**: [Datadog ログインテグレーション][2]を使ってログをパースしていない場合は、カスタムログパースルールによって `dd.trace_id` と `dd.span_id` が文字列としてパースされていることを確実にする必要があります。詳しくは、[このトピックの FAQ][3] を参照してください。

[Ruby ロギングのドキュメントを参照][2]して Ruby ログインテグレーションを適切に構成し、Ruby ログが自動的にパースされるようにしてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/logs/log_collection/ruby/
[2]: /ja/logs/log_collection/ruby/#configure-the-datadog-agent
[3]: /ja/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom