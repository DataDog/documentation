---
code_lang: nodejs
code_lang_weight: 20
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
  tag: ドキュメント
  text: Node.js アプリケーションのトレース
- link: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
  tag: ドキュメント
  text: Node.js ログとトレースの相関付け
title: Node.js Cloud Run 関数のインスツルメンテーション
type: multi-code-lang
---
<div class="alert alert-info">サンプルアプリケーションは <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-functions/node">GitHub で入手可能</a>です。</div>

## セットアップ {#setup}

1. **Datadog Node.js SDK をインストールします**。

   1. メインアプリケーションで、`dd-trace` パッケージをインストールします。

      {{< code-block lang="shell" disable_copy="false" >}}
npm install dd-trace
{{< /code-block >}}

   2. `NODE_OPTIONS` 環境変数を使用して Node.js トレーサーを初期化します。
   {{< code-block lang="dockerfile" disable_copy="false" >}}
ENV NODE_OPTIONS="--require dd-trace/init"
{{< /code-block >}}

   詳細については、[Node.js アプリケーションのトレース][1] を参照してください。

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

   このステップでは、`DD_SERVERLESS_LOG_PATH` で設定したファイルにログを書き込むようにログライブラリを構成します。Node.js では、Datadog はログを JSON 形式で書き込むことを推奨しています。たとえば、`winston` のようなサードパーティのロギングライブラリを使用できます。
   {{< code-block lang="javascript" disable_copy="false" >}}
const { createLogger, format, transports } = require('winston');

const LOG_FILE = "/shared-volume/logs/app.log"

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: LOG_FILE }),
    new transports.Console()
  ],
});

logger.info('Hello world!');
{{< /code-block >}}

   Datadog は、高度な Datadog ログパースを有効にするために、環境変数 `DD_LOGS_INJECTION=true` (メインコンテナ内) と `DD_SOURCE=nodejs` (サイドカーコンテナ内) を設定することを推奨しています。

   詳細については、[Node.js ログとトレースの相関付け][2] を参照してください。

4. {{% gcr-service-label %}}

5. **カスタムメトリクスを送信します**。

   カスタムメトリクスを送信するには、[コード例を表示][3] してください。Serverless Monitoring では、*ディストリビューション*メトリクスタイプのみがサポートされます。

6. **プロファイリングを有効にします (プレビュー)**。

   [Continuous Profiler][6] を有効にするには、アプリケーションコンテナで環境変数 `DD_PROFILING_ENABLED=true` を設定してください。

   <div class="alert alert-info">Datadog の Continuous Profiler は、第 2 世代 Cloud Run 関数でプレビュー版として利用可能です。</div>

{{% serverless-init-env-vars-sidecar language="nodejs" function="true" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Pub/Sub を使用した分散型トレーシング {#distributed-tracing-with-pubsub}

{{% gcr-pubsub-push-tracing %}}

## トラブルシューティング {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[2]: /ja/tracing/other_telemetry/connect_logs_and_traces/nodejs/
[3]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=nodejs#code-examples-5
[6]: /ja/profiler/