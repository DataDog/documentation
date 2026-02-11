---
code_lang: python
code_lang_weight: 10
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
  tag: Documentation
  text: Pythonアプリケーションのトレース
- link: /tracing/other_telemetry/connect_logs_and_traces/python/
  tag: Documentation
  text: Pythonのログとトレースを関連付ける
title: Python Cloud Runジョブの計測
type: multi-code-lang
---

## セットアップ

<div class="alert alert-info">サンプルアプリケーションは<a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-jobs/python">GitHubで公開</a>されています。</div>
<div class="alert alert-info">
Cloud Run JobsのすべてのDatadog機能の完全な可視化とアクセスのためには、
<a href="http://localhost:1313/integrations/google_cloud_platform/">Google Cloud連携</a>を確実にインストール
および<a href="https://hub.docker.com/r/datadog/serverless-init">serverless-initバージョン</a>1.9.0以降を使用している。
</div>

1. **Datadog Pythonトレーサをインストール**します。

   `requirements.txt`や`pyproject.toml`に`ddtrace`を追加できます。[PyPI][1]の最新バージョンは、
   {{< code-block lang="text" filename="requirements.txt" disable_copy="false" collapsible="true" >}}
ddtrace==<VERSION>
{{< /code-block >}}

   または、Dockerファイルにトレーサをインストールできます。
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
RUN pip install ddtrace
{{< /code-block >}}

   次に、開始コマンドを`ddtrace-run`でラップします。
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
CMD ["ddtrace-run", "python", "app.py"]
{{< /code-block >}}

   **注意**:Cloud Run Jobsはリクエストを処理するのではなく完了まで実行されるため、自動計測ではトップレベルの「ジョブ」スパンは作成されません。エンドツーエンドで可視化するには、独自のルートスパンを作成します。[Python Custom Instrumentation][2]の手順を参照してください。

   詳細は、「 [Python アプリケーションの][3]トレース 」を参照してください。

2. **serverless-initをインストール**します。

   {{% serverless-init-install mode="in-container" cmd="\"ddtrace-run\", \"python\", \"path/to/your/python/app.py\"" cloudservice="jobs" %}}

3. **ログを設定**します。

   ロギングを有効にするには、環境変数`DD_LOGS_ENABLED=true`を設定します。これにより、`serverless-init`は標準出力と標準エラーからログを読み取ることができます。

   Datadogでは、次の環境変数も推奨しています。
   - `ENV PYTHONUNBUFFERED=1`:Pythonの出力がバッファリングされる代わりにコンテナログにすぐに表示されるようにします。
   - `ENV DD_LOGS_INJECTION=true`:サポートされているロガーのログ/トレース相関を有効にします。
   - `ENV DD_SOURCE=python`:高度なDatadogログ解析を有効にします。

   複数行のログを1つのログメッセージに保持したい場合は、JSON形式でログを記述することをお勧めします。たとえば、`structlog`のようなサードパーティのロギングライブラリを使用できます。
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

   詳細は、「[Pythonログとトレース][4]の相関」を参照してください。

4. **アプリケーションを構成**します。

{{% serverless-init-configure %}}

5. {{% gcr-service-label %}}

6. {{% gcr-jobs-retention-filter %}}

7. **カスタムメトリックを送信**します。

   カスタムメトリックを送信するには、[DogStatsDクライアントをインストール][5]し、[コード例を表示][6]します。サーバレスでは、*配信*メトリックタイプのみがサポートされます。

{{% serverless-init-env-vars-in-container language="python" defaultSource="cloudrun" %}}

## トラブルシューティング

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## さらに読む

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.org/project/ddtrace/
[2]: /ja/tracing/trace_collection/custom_instrumentation/python/dd-api?tab=decorator
[3]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[4]: /ja/tracing/other_telemetry/connect_logs_and_traces/python/
[5]: /ja/developers/dogstatsd/?tab=python#install-the-dogstatsd-client
[6]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5