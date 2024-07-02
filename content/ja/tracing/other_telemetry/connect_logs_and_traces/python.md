---
aliases:
- /ja/tracing/connect_logs_and_traces/python
code_lang: python
code_lang_weight: 20
description: Python ログとトレースを接続して Datadog で関連付けます。
further_reading:
- link: /tracing/manual_instrumentation/
  tag: ドキュメント
  text: 手動でアプリケーションのインスツルメンテーションを行いトレースを作成します。
- link: /tracing/opentracing/
  tag: ドキュメント
  text: アプリケーション全体に Opentracing を実装します。
- link: /tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: GitHub
  text: 自動的にリクエストログとトレースに相関性を持たせる
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: ガイド
  text: クロスプロダクト相関で容易にトラブルシューティング。
title: Python ログとトレースの相関付け
type: multi-code-lang
---

## 挿入可否

### 標準ライブラリロギング

[トレース][1]とログを相関付けるには、以下の手順を実行します。

  1. [自動インスツルメンテーションを有効にする](#step-1---activate-automatic-instrumentation).
  2. [ログレコードから必要な属性を含める](#step-2---include-required-attributes).

#### ステップ 1 - 自動インスツルメンテーションを有効にする

以下のいずれかのオプションを使用して、自動インスツルメンテーションを有効にします。

オプション 1: [ライブラリインジェクション][5]:
  1. アプリケーションの `deployment/manifest` ファイルで環境変数 `DD_LOGS_INJECTION=true` を設定します。
  2. [ライブラリインジェクション][5]の手順に従って、トレーシングを設定します。

オプション 2: `ddtrace-run`:
  1. アプリケーションを実行している環境で環境変数 `DD_LOGS_INJECTION=true` を設定します。
  2. **ddtrace** をアプリケーションにインポートします。
  3. `ddtrace-run` でアプリケーションを実行します (例: `ddtrace-run python appname.py`)。

オプション 3: `patch`:
  1. **ddtrace** をアプリケーションにインポートします。
  2. `ddtrace.patch(logging=True)` をアプリケーションコードの先頭に追加します。

#### ステップ 2 - 必要な属性を含める

ログレコードから必要な属性を含むように、ログフォーマットを更新します。


ログレコードの ``dd.env``、``dd.service``、``dd.version``、``dd.trace_id``、``dd.span_id`` 属性を、フォーマット文字列に含めます。

以下は、`logging.basicConfig` を使用して、ログ挿入の構成を行う例です。

``` python
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

ログインジェクションの詳細については、[ddtrace のドキュメント][6]をお読みください。

### 標準ライブラリロギングなし

標準ライブラリの `logging` モジュールを使用していない場合は、以下のコードスニペットを使用してトレーサー情報をログに挿入することができます。

```python
from ddtrace import tracer

span = tracer.current_span()
correlation_ids = (str((1 << 64) - 1 & span.trace_id), span.span_id) if span else (None, None)
```
以下の例では、ログ出力にトレーサーフィールドを追加するために、`structlog` 内で *processor* として関数を定義しています。

``` python
import ddtrace
from ddtrace import tracer

import structlog

def tracer_injection(logger, log_method, event_dict):
    # 現在のトレーサーコンテキストから相関 ID を取得
    span = tracer.current_span()
    trace_id, span_id = (str((1 << 64) - 1 & span.trace_id), span.span_id) if span else (None, None)

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

**注**: [Datadog ログインテグレーション][2]を使ってログをパースしていない場合は、カスタムログパースルールによって `dd.trace_id` と `dd.span_id` が文字列としてパースされ、[トレースリマッパー][3]を使って再マップされていることを確実にする必要があります。詳細については、[関連するログがトレース ID パネルに表示されない][4]を参照してください。

[Python ロギングのドキュメントを参照][2]して Python ログインテグレーションを適切に構成し、Python ログが自動的にパースされるようにしてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#trace
[2]: /ja/logs/log_collection/python/#configure-the-datadog-agent
[3]: /ja/logs/log_configuration/processors/#trace-remapper
[4]: /ja/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[5]: /ja/tracing/trace_collection/library_injection_local/
[6]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#logs-injection