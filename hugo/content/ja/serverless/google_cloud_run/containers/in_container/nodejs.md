---
aliases:
- /ja/serverless/google_cloud_run/containers/in_process/nodejs
code_lang: nodejs
code_lang_weight: 20
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
  tag: ドキュメント
  text: Node.js アプリケーションのトレース
- link: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
  tag: ドキュメント
  text: Node.js ログとトレースの相関付け
title: Node.js Cloud Run Container コンテナ内でのインスツルメンテーション
type: multi-code-lang
---
## セットアップ {#setup}

<div class="alert alert-info">サンプルアプリケーションは <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/in-container/node">GitHub で入手可能</a>です。</div>

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

2. **serverless-init をインストールします**。

   {{% serverless-init-install mode="in-container" cmd="\"/nodejs/bin/node", "/path/to/your/app.js"s\"" %}}

3. **ログを設定します**。

   ロギングを有効にするには、環境変数 `DD_LOGS_ENABLED=true` を設定します。これにより、`serverless-init` が標準出力と標準エラーからログを読み取ることができます。

   Datadog は、高度な Datadog ログパースを有効にするために、環境変数 `DD_LOGS_INJECTION=true` および `DD_SOURCE=nodejs` を設定することも推奨しています。

   複数行のログを 1 つのログメッセージとして保持する場合は、JSON 形式でログを記述することをお勧めします。たとえば、`winston` のようなサードパーティのロギングライブラリを使用できます。
   {{< code-block lang="javascript" disable_copy="false" >}}
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Console()
  ],
});

logger.info('Hello world!');
{{< /code-block >}}

   詳細については、[Node.js ログとトレースの相関付け][2] を参照してください。

4. **アプリケーションを構成します**。

{{% serverless-init-configure cloudrun="true" %}}

5. {{% gcr-service-label %}}

6. **カスタムメトリクスを送信します**。

   カスタムメトリクスを送信するには、[コード例を表示][3] してください。サーバーレスでは、*ディストリビューション*メトリクスタイプのみがサポートされます。

7. **プロファイリングを有効にします (プレビュー)**。

   [Continuous Profiler][6] を有効にするには、環境変数 `DD_PROFILING_ENABLED=true` を設定します。

   <div class="alert alert-info">Datadog の Continuous Profiler は、Google Cloud Run サービス向けにプレビュー版で利用可能です。</div>

{{% serverless-init-env-vars-in-container language="nodejs" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Pub/Sub を使用した分散型トレーシング {#distributed-tracing-with-pubsub}

{{% gcr-pubsub-push-tracing %}}

## トラブルシューティング {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" in_container="true" %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[2]: /ja/tracing/other_telemetry/connect_logs_and_traces/nodejs/
[3]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=nodejs#code-examples-5
[6]: /ja/profiler/