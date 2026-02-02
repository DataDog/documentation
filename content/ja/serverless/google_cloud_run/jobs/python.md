---
title: Python Cloud Run ジョブのインスツルメンテーション
code_lang: python
type: multi-code-lang
code_lang_weight: 10
further_reading:
  - link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/python/'
    tag: 'Documentation'
    text: 'Python アプリケーションのトレース'
  - link: '/tracing/other_telemetry/connect_logs_and_traces/python/'
    tag: 'Documentation'
    text: 'Python ログとトレースの相関付け'
---

## セットアップ

<div class="alert alert-info">サンプルアプリケーションは <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-jobs/python">GitHub で入手可能</a>です。</div>
<div class="alert alert-info">
Cloud Run Jobs で Datadog のすべての機能を表示し、利用するには、
<a href="http://localhost:1313/integrations/google_cloud_platform/">Google Cloud インテグレーションがインストール</a>され、
<a href="https://hub.docker.com/r/datadog/serverless-init">serverless-init バージョン 1.9.0 以降</a>を使用していることを確認してください。
</div>

1. **Datadog Python トレーサーをインストールします**。

   `requirements.txt` または `pyproject.toml` に `ddtrace` を追加します。最新バージョンは、[PyPI][1] から入手できます。
   {{< code-block lang="text" filename="requirements.txt" disable\_copy="false" collapsible="true" >}}
ddtrace==<VERSION>
{{< /code-block >}}

   または、Dockerfile にトレーサーをインストールできます。
   {{< code-block lang="dockerfile" filename="Dockerfile" disable\_copy="false" collapsible="true" >}}
RUN pip install ddtrace
{{< /code-block >}}

   次に、開始コマンドを `ddtrace-run` でラップします。
   {{< code-block lang="dockerfile" filename="Dockerfile" disable\_copy="false" collapsible="true" >}}
CMD \["ddtrace-run", "python", "app.py"]
{{< /code-block >}}

   **注**:Cloud Run Jobs はリクエストを処理するのではなく、完了まで実行するため、自動インスツルメンテーションではトップレベルの「ジョブ」スパンは作成されません。エンドツーエンドで可視化するには、独自のルートスパンを作成します。[Python カスタムインスツルメンテーション][2]の手順を参照してください。

   詳細については、[Python アプリケーションのトレース][3]を参照してください。

2. **serverless-init をインストールします**。

   { { % serverless-init-install mode="in-container" cmd="\\"ddtrace-run \\ " , \\"python \\ " , \\"path/to/your/python/app.py\\"" cloudservice="jobs" %}}

3. **ログを設定します**。

   ロギングを有効にするには、環境変数 `DD_LOGS_ENABLED=true` を設定します。これにより、`serverless-init` が標準出力と標準エラーからログを読み取ることができます。

   Datadog では、次の環境変数も推奨しています。
   - `ENV PYTHONUNBUFFERED=1`:Python の出力がバッファリングされずに、コンテナログにすぐ表示されるようにします。
   - `ENV DD_LOGS_INJECTION=true`:サポートされているロガーのログ/トレース相関を有効にします。
   - `ENV DD_SOURCE=python`:高度な Datadog ログパースを有効にします。

   複数行のログを 1 つのログメッセージとして保持する場合は、JSON 形式でログを記述することをお勧めします。たとえば、`structlog` のようなサードパーティのロギングライブラリを使用できます。
   {{< code-block lang="python" disable\_copy="false" >}}
import structlog

def tracer\_injection(logger, log\_method, event\_dict):
    event\_dict.update(tracer.get\_log\_correlation\_context())
    return event\_dict

structlog.configure(
    processors=\[
            tracer\_injection,
        structlog.processors.EventRenamer("msg"),
        structlog.processors.JSONRenderer()
    ],
logger\_factory=structlog.WriteLoggerFactory(file=sys.stdout),
)

logger = structlog.get\_logger()

logger.info("Hello world!")
{{< /code-block >}}

   詳細については、[Python ログとトレースの相関付け][4]を参照してください。

4. **アプリケーションを構成します**。

{{% serverless-init-configure %}}

5. {{% gcr-service-label %}}

6. {{% gcr-jobs-retention-filter %}}

7. **カスタムメトリクスを送信します**。

   カスタムメトリクスを送信するには、[DogStatsD クライアントをインストール][5]します。[コード例を参照][6]してください。サーバレスでは、*ディストリビューション*メトリクスタイプのみがサポートされます。

{{% serverless-init-env-vars-in-container language="python" defaultSource="cloudrun" %}}

## トラブルシューティング

{ { % serverless-init-Troubleshooting productNames="Cloud Run services" % }

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.org/project/ddtrace/
[2]: /tracing/trace_collection/custom_instrumentation/python/dd-api?tab=decorator
[3]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[4]: /tracing/other_telemetry/connect_logs_and_traces/python/
[5]: /developers/dogstatsd/?tab=python#install-the-dogstatsd-client
[6]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5

