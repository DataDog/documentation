---
code_lang: python
code_lang_weight: 10
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
  tag: ドキュメント
  text: Python アプリケーションのトレース
- link: /tracing/other_telemetry/connect_logs_and_traces/python/
  tag: ドキュメント
  text: Python ログとトレースの相関付け
title: Python Cloud Run 関数のインスツルメンテーション
type: multi-code-lang
---
<div class="alert alert-info">サンプルアプリケーションは <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-functions/python">GitHub で入手可能</a>です。</div>

## セットアップ {#setup}

1. **Datadog Python SDK をインストールします**。

   `requirements.txt` または `pyproject.toml` に `ddtrace` を追加します。これにより、コンテナイメージのビルドおよびデプロイ時に SDK が確実に含まれるようになります。最新バージョンは、[PyPI][1] から入手できます。
   {{< code-block lang="text" filename="requirements.txt" disable_copy="false" collapsible="true" >}}
ddtrace==<VERSION>
{{< /code-block >}}

   詳細については、[Python アプリケーションのトレース][2] を参照してください。

2. **serverless-init をサイドカーとしてインストールします**。

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% gcr-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% gcr-install-sidecar-terraform function="true" %}}
   {{% /tab %}}

   {{% tab "その他" %}}
   {{% gcr-install-sidecar-other function="true" %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **ログを設定します**。

   前のステップで、共有ボリュームを作成しました。`DD_SERVERLESS_LOG_PATH` 環境変数を設定している場合もありますが、デフォルトは `/shared-volume/logs/app.log` です。

   このステップでは、`DD_SERVERLESS_LOG_PATH` で設定したファイルにログを書き込むようにログライブラリを構成します。ログ/トレースの相関付けやその他の機能のために、カスタム形式を設定することもできます。Datadog では、次の環境変数を設定することを推奨しています。
   - `PYTHONUNBUFFERED=1`: メインコンテナ内。Python の出力がバッファリングされずに、コンテナログにすぐ表示されるようにします。
   - `DD_LOGS_INJECTION=true`: メインコンテナ内。サポートされているロガーのログ/トレース相関を有効にします。
   - `DD_SOURCE=python`: サイドカーコンテナ内。高度な Datadog ログパースを有効にします。

   次に、ログライブラリを更新します。例えば、Python のネイティブ `logging` ライブラリを使用できます。
   {{< code-block lang="python" disable_copy="false" >}}
LOG_FILE = "/shared-volume/logs/app.log"
os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
        '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
        '- %(message)s')

logging.basicConfig(
    level=logging.INFO,
    format=FORMAT,
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)
logger.level = logging.INFO

logger.info('Hello world!')
{{< /code-block >}}

   詳細については、[Python ログとトレースの相関付け][3] を参照してください。

4. {{% gcr-service-label %}}

5. **カスタムメトリクスを送信します**。

   カスタムメトリクスを送信するには、[DogStatsD クライアントをインストール][4] し、[コード例を参照][5] してください。Serverless Monitoring では、*ディストリビューション*メトリクスタイプのみがサポートされます。

6. **プロファイリングを有効にします (プレビュー)**。

   [Continuous Profiler][6] を有効にするには、アプリケーションコンテナで環境変数 `DD_PROFILING_ENABLED=true` を設定し、関数ファイルの先頭に `import ddtrace.auto` を追加します。

   {{< code-block lang="python" disable_copy="false" >}}
import ddtrace.auto

# ... rest of your function code
{{< /code-block >}}

   <div class="alert alert-info">Datadog の Continuous Profiler は、第 2 世代 Cloud Run 関数でプレビュー版として利用可能です。</div>

{{% serverless-init-env-vars-sidecar language="python" function="true" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Pub/Sub を使用した分散型トレーシング {#distributed-tracing-with-pubsub}

アプリケーションコンテナで `DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED=true` を設定します。これにより、プッシュリクエストの推論 `gcp.pubsub.receive` スパンが作成されます。

Google Cloud Pub/Sub プッシュサブスクリプションのトレースには、`ddtrace` バージョン 4.8.0 以降が必要です。

{{% gcr-pubsub-push-tracing %}}

## トラブルシューティング {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.org/project/ddtrace/
[2]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[3]: /ja/tracing/other_telemetry/connect_logs_and_traces/python/
[4]: /ja/extend/dogstatsd/?tab=python#install-the-dogstatsd-client
[5]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5
[6]: /ja/profiler/