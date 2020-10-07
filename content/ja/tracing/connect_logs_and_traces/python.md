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
---
## トレースおよびスパン ID を自動的に挿入します

`ddtrace-run` を使用する場合は、環境変数 `DD_LOGS_INJECTION=true` を使用して挿入を有効にします。
トレーサーを `DD_ENV`、`DD_SERVICE`、`DD_VERSION` で構成した場合、`env`、`service`、`version` も自動的に追加されます。[統合サービスタグ付け][1]の詳細をご覧ください。

**注**: 自動挿入に対しては標準ライブラリ `logging` がサポートされています。また、標準ライブラリモジュールを拡張する `json_log_formatter` などのライブラリも自動挿入に対してサポートされています。`ddtrace-run` はアプリケーションの実行前に `logging.basicConfig` を呼び出します。ルートロガーにハンドラーが構成されている場合、アプリケーションはルートロガーとハンドラーを直接変更する必要があります。

## トレースおよびスパン ID を手動で挿入する

### 標準ライブラリロギングあり

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

標準ライブラリ `logging` モジュールを使っていない場合は、`ddtrace.helpers.get_correlation_ids()` を使ってトレーサー情報をログに挿入することができます。
このアプローチの説明として、次の例では関数を `structlog` の*プロセッサー*として定義し、トレーサーフィールドをログ出力に追加しています:

``` python
import ddtrace
from ddtrace.helpers import get_correlation_ids

import structlog

def tracer_injection(logger, log_method, event_dict):
    # 現在のトレーサーコンテキストから相関 ID を取得
    trace_id, span_id = get_correlation_ids()

    # ID を structlog イベントディクショナリーに追加
    event_dict['dd.trace_id'] = trace_id or 0
    event_dict['dd.span_id'] = span_id or 0

    # トレーサー用に構成された環境、サービス、バージョンを追加
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
{"event": "In tracer context", "dd": {"trace_id": 9982398928418628468, "span_id": 10130028953923355146, "env": "dev", "service": "hello", "version": "abc123"}}
```

**注**: [Datadog ログインテグレーション][3]を使ってログをパースしていない場合は、カスタムログパースルールによって `dd.trace_id` と `dd.span_id` が文字列としてパースされていることを確実にする必要があります。詳しくは、[このトピックの FAQ][4] を参照してください。

[Python ロギングのドキュメントを参照][3]して Python ログインテグレーションを適切に構成し、Python ログが自動的にパースされるようにしてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: /ja/tracing/visualization/#trace
[3]: /ja/logs/log_collection/python/#configure-the-datadog-agent
[4]: /ja/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom