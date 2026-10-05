---
aliases:
- /ja/serverless/google_cloud_run/containers/in_process/python
code_lang: python
code_lang_weight: 10
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
  tag: ドキュメント
  text: Python アプリケーションのトレース
- link: /tracing/other_telemetry/connect_logs_and_traces/python/
  tag: ドキュメント
  text: Python ログとトレースの相関付け
title: Python Cloud Run Container コンテナ内でのインスツルメンテーション
type: multi-code-lang
---
## セットアップ {#setup}

<div class="alert alert-info">サンプルアプリケーションは <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/in-container/python">GitHub で入手可能</a>です。</div>

1. **Datadog Python SDK をインストールします**。

   `requirements.txt` または `pyproject.toml` に `ddtrace` を追加します。最新バージョンは、[PyPI][1] から入手できます。
   {{< code-block lang="text" filename="requirements.txt" disable_copy="false" collapsible="true" >}}
ddtrace==<VERSION>
{{< /code-block >}}

   または、Dockerfile に SDK をインストールできます。
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
RUN pip install ddtrace
{{< /code-block >}}

   次に、開始コマンドを `ddtrace-run` でラップします。
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
CMD ["ddtrace-run", "python", "app.py"]
{{< /code-block >}}

   詳細については、[Python アプリケーションのトレース][2] を参照してください。

2. **serverless-init をインストールします**。

   {{% serverless-init-install mode="in-container" cmd="\"ddtrace-run\", \"python\", \"path/to/your/python/app.py\"" %}}

3. **ログを設定します**。

   ロギングを有効にするには、環境変数 `DD_LOGS_ENABLED=true` を設定します。これにより、`serverless-init` が標準出力と標準エラーからログを読み取ることができます。

   Datadog では、次の環境変数も推奨しています。
   - `ENV PYTHONUNBUFFERED=1`: Python の出力がバッファリングされずに、コンテナログにすぐ表示されるようにします。
   - `ENV DD_LOGS_INJECTION=true`: サポートされているロガーのログ/トレース相関を有効にします。
   - `ENV DD_SOURCE=python`: 高度な Datadog ログパースを有効にします。

   複数行のログを 1 つのログメッセージとして保持する場合は、JSON 形式でログを記述することをお勧めします。たとえば、`structlog` のようなサードパーティのロギングライブラリを使用できます。
   {{< code-block lang="python" disable_copy="false" >}}
import structlog

def tracer_injection(logger, log_method, event_dict):
    event_dict.update(tracer.get_log_correlation_context())
    return event_dict

structlog.configure(
    processors=[
        tracer_injection,
        structlog.processors.EventRenamer("msg"),
        structlog.processors.JSONRenderer()
    ],
    logger_factory=structlog.WriteLoggerFactory(file=sys.stdout),
)

logger = structlog.get_logger()

logger.info("Hello world!")
{{< /code-block >}}

   詳細については、[Python ログとトレースの相関付け][3] を参照してください。

4. **アプリケーションを構成します**。

{{% serverless-init-configure cloudrun="true" %}}

5. {{% gcr-service-label %}}

6. **カスタムメトリクスを送信します**。

   カスタムメトリクスを送信するには、[DogStatsD クライアントをインストール][4] し、[コード例を参照][5] してください。サーバーレスでは、*ディストリビューション*メトリクスタイプのみがサポートされます。

7. **プロファイリングを有効にします (プレビュー)**。

   [Continuous Profiler][6] を有効にするには、環境変数 `DD_PROFILING_ENABLED=true` を設定します。

   <div class="alert alert-info">Datadog の Continuous Profiler は、Google Cloud Run サービス向けにプレビュー版で利用可能です。</div>

{{% serverless-init-env-vars-in-container language="python" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Pub/Sub を使用した分散型トレーシング {#distributed-tracing-with-pubsub}

`DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED=true` を設定します。これにより、プッシュリクエストの推論 `gcp.pubsub.receive` スパンが作成されます。

Google Cloud Pub/Sub プッシュサブスクリプションのトレースには、`ddtrace` バージョン 4.8.0 以降が必要です。

{{% gcr-pubsub-push-tracing %}}

## トラブルシューティング {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" in_container="true" %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.org/project/ddtrace/
[2]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[3]: /ja/tracing/other_telemetry/connect_logs_and_traces/python/
[4]: /ja/extend/dogstatsd/?tab=python#install-the-dogstatsd-client
[5]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5
[6]: /ja/profiler/