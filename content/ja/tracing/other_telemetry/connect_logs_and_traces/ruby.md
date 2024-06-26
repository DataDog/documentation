---
aliases:
- /ja/tracing/connect_logs_and_traces/ruby
code_lang: ruby
code_lang_weight: 40
description: Ruby ログとトレースを接続して Datadog で関連付けます。
further_reading:
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: GitHub
  text: 自動的にリクエストログとトレースに相関性を持たせる
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: ガイド
  text: クロスプロダクト相関で容易にトラブルシューティング。
kind: documentation
title: Ruby ログとトレースの相関付け
type: multi-code-lang
---

## トレース相関

ロギングなどの多くの場合において、相互参照を容易にするために、トレース ID を他のイベントまたはデータストリームに関連付けると便利です。

### Rails アプリケーションでのロギング

#### 自動挿入

デフォルトのロガー (`ActiveSupport::TaggedLogging`)、`lograge` または `semantic_logger` を使用している Rails アプリケーションでは、トレース ID のインジェクションは自動的に構成されます。関連するログをトレースと接続するには、[トレースリマッパー][1]を追加する必要があります。

#### 手動挿入

ロガーに相関 ID を追加するには、`Datadog::Tracing.correlation` がある相関 ID を取得するログフォーマッタを追加し、これをメッセージに追加します。

Datadog ロギングと適切に関連付けるには、ログメッセージに次のように表示されていることを確認してください。

 - `dd.env=<ENV>`: ここで、`<ENV>` は `Datadog::Tracing.correlation.env` と同じです。環境が構成されていない場合は省略します。
 - `dd.service=<SERVICE>`: ここで、`<SERVICE>` は `Datadog::Tracing.correlation.service` と同じです。デフォルトのサービス名が構成されていない場合は省略します。
 - `dd.version=<VERSION>`: ここで、`<VERSION>` は `Datadog::Tracing.correlation.version` と同じです。アプリケーションのバージョンが構成されていない場合は省略します。
 - `dd.trace_id=<TRACE_ID>`: ここで `<TRACE_ID>` は `Datadog::Tracing.correlation.trace_id` か、またはロギング中にどのトレースもアクティブでない場合は `0` になります。
 - `dd.span_id=<SPAN_ID>`: ここで `<SPAN_ID>` は `Datadog::Tracing.correlation.span_id` か、またはロギング中にどのトレースもアクティブでない場合は `0` になります。

デフォルトで、`Datadog::Tracing.log_correlation` は `dd.env=<ENV> dd.service=<SERVICE> dd.version=<VERSION> dd.trace_id=<TRACE_ID> dd.span_id=<SPAN_ID>` を返します。

トレースがアクティブでなく、アプリケーション環境とバージョンが構成されていない場合、`dd.service= dd.trace_id=0 dd.span_id=0` が返されます。

実例:

```ruby
require 'ddtrace'
require 'logger'

Datadog.configure do |c|
  c.env = 'production'
  c.service = 'billing-api'
  c.version = '2.5.17'
end

logger = Logger.new(STDOUT)
logger.progname = 'my_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog::Tracing.log_correlation}] #{msg}\n"
end

# どのトレースもアクティブでない場合
logger.warn('これはトレースされないオペレーションです。')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=0 dd.span_id=0] これはトレースされないオペレーションです。

# トレースがアクティブな場合
Datadog::Tracing.trace('my.operation') { logger.warn('これはトレースされるオペレーションです。') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] これはトレースされるオペレーションです。
```
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/processors/?tab=ui#trace-remapper