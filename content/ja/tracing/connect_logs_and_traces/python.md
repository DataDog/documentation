---
title: Python ログとトレースの接続
kind: ドキュメント
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
  - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
    tag: ブログ
    text: 自動的にリクエストログとトレースに相関性を持たせる
  - link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
    tag: ガイド
    text: クロスプロダクト相関で容易にトラブルシューティング。
---
## 自動挿入

`ddtrace-run` を使用する場合は、環境変数 `DD_LOGS_INJECTION=true` を使用して挿入を有効にします。
トレーサーを `DD_ENV`、`DD_SERVICE`、`DD_VERSION` で構成した場合、`env`、`service`、`version` も自動的に追加されます。[統合サービスタグ付け][1]の詳細をご覧ください。

**注**: 自動挿入に対しては標準ライブラリ `logging` がサポートされています。また、標準ライブラリモジュールを拡張する `json_log_formatter` などのライブラリも自動挿入に対してサポートされています。`ddtrace-run` はアプリケーションの実行前に `logging.basicConfig` を呼び出します。ルートロガーにハンドラーが構成されている場合、アプリケーションはルートロガーとハンドラーを直接変更する必要があります。

## 手動挿入

### 標準ライブラリロギング

手動で[トレース][2]とログに相関性を持たせたい場合は、ログフォーマッタを更新して `logging` モジュールにパッチを適用し、ログレコードの ``dd.trace_id`` と ``dd.span_id`` 属性を含めます。

同様に、ログレコードの属性として ``dd.env``、``dd.service``、``dd.version`` を含めます。

以下のコンフィギュレーションは自動挿入メソッドによって使用され、Python ログインテグレーションでデフォルトでサポートされています:

``` python
from ddtrace import patch_all; patch_all(logging=True)
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

**注**: [Datadog ログインテグレーション][3]を使ってログをパースしていない場合は、カスタムログパースルールによって `dd.trace_id` と `dd.span_id` が文字列としてパースされていることを確実にする必要があります。詳しくは、[このトピックの FAQ][4] を参照してください。

[Python ロギングのドキュメントを参照][3]して Python ログインテグレーションを適切に構成し、Python ログが自動的にパースされるようにしてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: /ja/tracing/visualization/#trace
[3]: /ja/logs/log_collection/python/#configure-the-datadog-agent
[4]: /ja/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom