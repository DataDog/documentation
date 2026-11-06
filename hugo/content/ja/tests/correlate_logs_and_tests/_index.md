---
description: ログをテストトレースと相関付けます。
further_reading:
- link: /tests
  tag: ドキュメント
  text: Test Optimization について
title: ログとテストの相関付け
---
## 概要 {#overview}

Test Optimization データと [Datadog に挿入されたログ][1] を相関付けることで、特定のテストケースに対するログの表示と分析が可能です。

{{< img src="continuous_integration/correlate_logs_and_tests.png"
  alt="ログとテストの相関関係とともに特定のテストケースのログを確認します。" style="width:90%" >}}

## セットアップ {#setup}

相関関係は、[テストデータを Datadog に送信する][2] 方法に応じて異なる構成ができます。

{{< tabs >}}
{{% tab "クラウド CI プロバイダー (Agentless)" %}}

### Java {#java}

エージェントレスのログ送信は、以下の言語およびフレームワークでサポートされています。

-   `dd-trace-java >= 1.35.2` および Log4j2。

エージェントレスのログ送信を有効にし、構成するためには、次の環境変数を使用します。

| 名前                                                | 説明                                 | デフォルト値 |
| --------------------------------------------------- | ------------------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (必須)    | ログ送信の有効化/無効化を設定する             | `false`       |
| `DD_AGENTLESS_LOG_SUBMISSION_LEVEL` (オプション)      | Agentless 送信のログレベルを設定する     | `INFO`        |
| `DD_AGENTLESS_LOG_SUBMISSION_QUEUE_SIZE` (オプション) | 保留中のログキューの最大サイズを設定する | `1024`        |
| `DD_AGENTLESS_LOG_SUBMISSION_URL` (オプション)        | ログ送信用のカスタム URL を設定する         | -             |

### JavaScript/TypeScript {#javascripttypescript}

Agentless ログ送信は、以下のトレーサーバージョンおよびログライブラリでサポートされています。

- `dd-trace-js v4.48.0 or later` (v4 リリースライン)、または `dd-trace-js v5.24.0 or later` (v5 リリースライン)。`winston` を使用。
- `dd-trace-js v5.124.0 or later`(v5 リリースライン)、または `dd-trace-js v6.13.0 or later` (v6 リリースライン)。`pino` または `bunyan` を使用。

エージェントレスのログ送信を有効にし、構成するためには、次の環境変数を使用します。

| 名前                                             | 説明                         | デフォルト値 |
| ------------------------------------------------ | ----------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (必須) | ログ送信の有効化/無効化を設定する     | `false`       |
| `DD_AGENTLESS_LOG_SUBMISSION_URL` (オプション)     | ログ送信用のカスタム URL を設定する | -             |

### .NET {#net}

エージェントレスのログ送信は、以下の言語およびフレームワークでサポートされています。

-   `dd-trace-dotnet >= 2.50.0` および XUnit TestOutputHelper。

エージェントレスのログ送信を有効にし、構成するためには、次の環境変数を使用します。

| 名前                                      | 説明                                   | デフォルト値 |
| ----------------------------------------- | --------------------------------------------- | ------------- |
| `DD_CIVISIBILITY_LOGS_ENABLED` (必須) | CI Visibility ログ送信の有効化/無効化を設定する | `false`       |

### Swift {#swift}

ログ送信を有効にし、構成するためには、次の環境変数を使用します。

| 名前                               | 説明                            | デフォルト値 |
| ---------------------------------- | -------------------------------------- | ------------- |
| `DD_ENABLE_STDOUT_INSTRUMENTATION` | stdout のログ送信の有効化/無効化を設定する | `false`       |
| `DD_ENABLE_STDERR_INSTRUMENTATION` | stderr のログ送信の有効化/無効化を設定する | `false`       |

### Python {#python}

要件: `ddtrace >= 4.8.0`。

ログ送信は pytest テストフレームワークでサポートされており、標準ライブラリの `logging` モジュールでログが出力される場合にのみ機能します。

エージェントレスモードでログ送信を有効にするには、次の環境変数を使用します。

| 名前                                             | 説明                     | デフォルト値 |
| ------------------------------------------------ | ------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (必須) | ログ送信の有効化/無効化を設定する | `false`       |

エージェントレスモードの代わりに **Datadog Agent** を使用する場合は、環境で `DD_LOGS_INJECTION=true` を設定してください。

#### プロセス外ログ {#out-of-process-logs}

別のプロセスがテストによってトリガーされたコードを実行する場合、そのログを関連付けるために、そのテストトレースの `trace_id` および `span_id` が必要です。`ddtrace.testing.logs.DDTestLogsHandler` (`ddtrace >= 4.11.0`) を使用して、それらのログレコードを元のテストトレースと関連付けた状態で Datadog ログインテークに送信します。

`DDTestLogsHandler`は pytest プラグインと同じ環境変数を読み取り、バックエンド (エージェントレスまたは EVP プロキシ) を検出します。これは、それらの変数が利用可能なすべてのサブプロセスで使用できます。

**Agentless モード** (`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` を設定):

| 変数     | 説明     | デフォルト         |
| ------------ | --------------- | --------------- |
| `DD_API_KEY` | Datadog API キー | (必須)      |
| `DD_SITE`    | Datadog サイト    | `datadoghq.com` |

**Agent/EVP プロキシモード** (デフォルト):

| 変数                  | 説明    | デフォルト     |
| ------------------------- | -------------- | ----------- |
| `DD_TRACE_AGENT_URL`      | 完全なエージェント URL | -           |
| `DD_TRACE_AGENT_HOSTNAME` | Agent ホスト名 | `localhost` |
| `DD_TRACE_AGENT_PORT`     | Agent ポート     | `8126`      |

##### ワーカーごとのスレッド {#thread-per-worker}

テストワーカーごとに 1 つのスレッドを使用する場合は、`ThreadLocalCorrelationFilter` を使用して各スレッドのログレコードを正しいテストトレースに関連付けます。

```python
import logging
from ddtrace.testing.logs import DDTestLogsHandler, ThreadLocalCorrelationFilter

with DDTestLogsHandler(service="my-service") as handler:
    correlation = ThreadLocalCorrelationFilter()
    handler.addFilter(correlation)
    logging.getLogger().addHandler(handler)

    while True:
        job = queue.get()  # queue and run_test are provided by your worker framework
        correlation.set_context(trace_id=job.trace_id, span_id=job.span_id)
        run_test(job.item)
```

`DDTestLogsHandler` は、コンテキストマネージャーとして使用されると、バッファリングされたレコードを自動的にフラッシュします。コンテキストマネージャー形式を使用しない場合は、`handler.close()` を呼び出してください。

##### Asyncio ワーカー {#asyncio-workers}

Asyncio ベースのワーカーの場合、スレッドローカルストレージは `asyncio.Task` 境界を越えて伝播しないため、`ThreadLocalCorrelationFilter` は Asyncio ベースのワーカーと互換性がありません。`CorrelationFilter` をサブクラス化し、代わりに `contextvars.ContextVar` を使用してください。イベントループが `await` 境界を越えて自動的に伝播します。

```python
import asyncio
import contextvars
import logging
from ddtrace.testing.logs import CorrelationFilter, DDTestLogsHandler

class ContextVarCorrelationFilter(CorrelationFilter):
    def __init__(self):
        super().__init__()
        self._trace_id = contextvars.ContextVar("dd_trace_id", default=None)
        self._span_id = contextvars.ContextVar("dd_span_id", default=None)

    def set_context(self, trace_id, span_id):
        self._trace_id.set(trace_id)
        self._span_id.set(span_id)

    def get_trace_id(self):
        return self._trace_id.get()

    def get_span_id(self):
        return self._span_id.get()

async def run_one(job, correlation):
    correlation.set_context(trace_id=job.trace_id, span_id=job.span_id)
    await run_test(job.item)

async def main(jobs):
    with DDTestLogsHandler(service="my-service") as handler:
        correlation = ContextVarCorrelationFilter()
        handler.addFilter(correlation)
        logging.getLogger().addHandler(handler)
        await asyncio.gather(*(run_one(job, correlation) for job in jobs))
```

### Ruby {#ruby}

Test Optimization を使用した Agentless ログ送信は、Rails アプリケーションでサポートされています。有効にする前に、
アプリケーションが [Datadog トレースでインスツルメントされている][1] ことを確認してください。

エージェントレスログ送信を使用するには、`datadog-ci` バージョン `0.16` 以降が必要です。以下のログライブラリがサポートされています。

-   `activesupport >= 5.0` (`ActiveSupport::TaggedLogging` を使用している場合のみ)
-   `lograge >= 0.14`
-   `semantic_logger >= 4.0`

ログ送信を有効にするには、次の環境変数を使用します。

| 名前                                             | 説明                     | デフォルト値 |
| ------------------------------------------------ | ------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (必須) | ログ送信の有効化/無効化を設定する | `false`       |

[1]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#rails-or-hanami-applications

{{% /tab %}}
{{% tab "オンプレミス CI プロバイダー (Datadog Agent)" %}}

1. Datadog Agent を使用して [ログ収集をセットアップ][1] します。
2. [ログとトレースの相関付け][2] の手順に従ってください。

[1]: /ja/logs/log_collection/
[2]: /ja/tracing/other_telemetry/connect_logs_and_traces/

{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_collection/
[2]: /ja/tests/setup/