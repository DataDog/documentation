---
title: Ruby ログとトレースの接続
kind: ドキュメント
description: Ruby ログとトレースを接続して Datadog で関連付けます。
further_reading:
  - link: https://www.datadoghq.com/blog/request-log-correlation/
    tag: ブログ
    text: 自動的にリクエストログとトレースに相関性を持たせる
  - link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
    tag: ガイド
    text: クロスプロダクト相関で容易にトラブルシューティング。
---
## トレース相関

ロギングなどの多くの場合において、相互参照を容易にするために、トレース ID を他のイベントまたはデータストリームに関連付けると便利です。

### Rails アプリケーションでのロギング

#### 自動挿入

Rails アプリケーションの場合は、デフォルトのロガー (`ActiveSupport::TaggedLogging`) または `lograge` を使用し、`rails` インスツルメンテーションのコンフィギュレーションオプション `log_injection` を `true` に設定するか、環境変数を `DD_LOGS_INJECTION=true` に設定することでトレース相関インジェクションを自動的に有効化できます。

```ruby
# config/initializers/datadog.rb
require 'ddtrace'

Datadog.configure do |c|
  c.use :rails, log_injection: true
end
```

**注:** `lograge` ユーザーで `initializers/lograge.rb` コンフィギュレーションファイルに `lograge.custom_options` を定義している場合は、Rails がイニシャライザーをアルファベット順で読み込む関係で自動のトレース相関付けがうまく機能しない場合があります。これは、`initializers/datadog.rb` が `initializers/lograge.rb` イニシャライザーで上書きされてしまうためです。_既存の_ `lograge.custom_options` で自動のトレース相関付けを行う場合は、以下の[マニュアル (Lograge)](#manual-lograge) をご利用ください。

#### 手動挿入
##### Lograge

[Rails アプリケーションで Lograge をセットアップ][1]した後、環境構成ファイル (例: `config/environments/production.rb`) の `custom_options` ブロックを手動で変更してトレース ID を追加します。

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

##### `ActiveSupport::TaggedLogging`

デフォルトの `ActiveSupport::TaggedLogging` ロガーで構成された Rails アプリケーションは相関 ID をタグとしてログ出力に付加することができます。`ActiveSupport::TaggedLogging` でトレース相関を有効にするには、Rails の環境コンフィギュレーションファイルで以下を追加します。

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

### Ruby アプリケーションでのロギング

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
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_collection/ruby/