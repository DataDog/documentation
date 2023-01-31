---
description: Python ログとトレースを接続して Datadog で関連付けます。
further_reading:
- link: /tracing/manual_instrumentation/
  tag: ドキュメント
  text: 手動でアプリケーションのインスツルメンテーションを行いトレースを作成します。
- link: /tracing/opentracing/
  tag: ドキュメント
  text: アプリケーション全体に Opentracing を実装します。
- link: /tracing/visualization/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: ブログ
  text: 自動的にリクエストログとトレースに相関性を持たせる
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: ガイド
  text: クロスプロダクト相関で容易にトラブルシューティング。
kind: ドキュメント
title: Python ログとトレースの接続
---

## 挿入可否

### 標準ライブラリロギング

[トレース][2]とログを相関付けるには、ログレコードから必要な属性を含むようにログフォーマットを更新し、`ddtrace.patch(logging=True)` を呼び出します。

ログレコードの ``dd.env``、``dd.service``、``dd.version``、``dd.trace_id``、``dd.span_id`` 属性を、フォーマット文字列に含めます。

以下は、`logging.basicConfig` を使用して、ログ挿入の構成を行う例です。

``` python
from ddtrace import patch; patch(logging=True)
import logging
from ddtrace import tracer

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
          '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
          '- %(message)s')
logging.basicConfig(format=FORMAT)
log = logging.getLogger(__name__)
log.level = logging.INFO

@tracer.wrap()
def hello():
    log.info('Hello, World!')

hello()
```

### 標準ライブラリロギングなし

標準ライブラリの `logging` モジュールを使用していない場合は、以下のコードスニペットを使用してトレーサー情報をログに挿入することができます。

```python
from ddtrace import tracer

span = tracer.current_span()
correlation_ids = (span.trace_id, span.span_id) if span else (None, None)
```
以下の例では、ログ出力にトレーサーフィールドを追加するために、`structlog` 内で *processor* として関数を定義しています。

``` python
import ddtrace
from ddtrace import tracer

import structlog

def tracer_injection(logger, log_method, event_dict):
    # 現在のトレーサーコンテキストから相関 ID を取得
    span = tracer.current_span()
    trace_id, span_id = (span.trace_id, span.span_id) if span else (None, None)

    # structlog イベントの辞書に ID を追加
    event_dict['dd.trace_id'] = str(trace_id or 0)
    event_dict['dd.span_id'] = str(span_id or 0)

    # トレーサー用に構成された env、service、version を追加
    event_dict['dd.env'] = ddtrace.config.env or ""
    event_dict['dd.service'] = ddtrace.config.service or ""
    event_dict['dd.version'] = ddtrace.config.version or ""

    return event_dict

structlog.configure(
    processors=[
        tracer_injection,
        structlog.processors.JSONRenderer()
    ]
)
log = structlog.get_logger()
```

ロガーが構成されたら、イベントのログを取るトレースされた関数を実行すると、挿入されたトレーサー情報が得られます:

```text
>>> traced_func()
{"event": "In tracer context", "dd.trace_id": 9982398928418628468, "dd.span_id": 10130028953923355146, "dd.env": "dev", "dd.service": "hello", "dd.version": "abc123"}
```

**注**: [Datadog ログインテグレーション][3]を使ってログをパースしていない場合は、カスタムログパースルールによって `dd.trace_id` と `dd.span_id` が文字列としてパースされ、[トレースリマッパー][4]を使って再マップされていることを確実にする必要があります。詳細については、[トレース ID パネルに相関ログが表示されないのはなぜですか？][5]を参照してください。

[Python ロギングのドキュメントを参照][3]して Python ログインテグレーションを適切に構成し、Python ログが自動的にパースされるようにしてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: /ja/tracing/visualization/#trace
[3]: /ja/logs/log_collection/python/#configure-the-datadog-agent
[4]: /ja/logs/log_configuration/processors/#trace-remapper
[5]: /ja/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom