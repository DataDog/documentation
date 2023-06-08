---
further_reading:
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: GitHub
  text: GCR サービスからのトレース、ログ、カスタムメトリクスの収集
kind: documentation
title: Google Cloud Run
---

## 概要

Google Cloud Run は、コンテナベースのアプリケーションをデプロイし、スケーリングするためのフルマネージドサーバーレスプラットフォームです。Datadog は、[Google Cloud インテグレーション][1]を通して Cloud Run のモニタリングとログ収集を提供しています。また、Datadog は現在公開ベータ版として、トレース、カスタムメトリクス、直接ログ収集を可能にする専用 Agent で Cloud Run アプリケーションをインスツルメントするソリューションも提供しています。

  <div class="alert alert-warning">この機能は公開ベータ版です。<a href="https://forms.gle/HSiDGnTPvDvbzDAQA">フィードバックフォーム</a>、または標準的なサポートチャンネルを通じてフィードバックを提供することができます。ベータ期間中は、Cloud Run モニタリングと APM トレースは直接費用なしで利用できます。既存の APM のお客様は、スパンの取り込みとボリュームのコストが増加する可能性があります。</div>

## はじめに

### 前提条件

[Datadog API キー][6]を取得済みであることと、[Datadog トレーシングライブラリがサポートする][2]プログラミング言語を使用していることを確認してください。

### 1. Agent のインストール

Dockerfile またはビルドパックを使用して Agent をインストールすることができます。ビルドパックを使用する場合、最初に[トレーシングライブラリのインストール](#install-tracing-library)が必要です。

#### Dockerfile で Agent をインストールする

{{< programming-lang-wrapper langs="go,python,nodejs,java,dotnet,ruby" >}}
{{< programming-lang lang="go" >}}



Dockerfile に次の記述を追加することで、Datadog Agent を使用してアプリケーションをインスツルメントすることができます。以下の例は、既存の Dockerfile のセットアップに応じて調整が必要になる場合があります。

```
# Datadog `serverless-init` を Docker イメージにコピーします
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# アプリケーションを Datadog の serverless-init プロセスでラップするためエントリポイントを変更します
ENTRYPOINT ["/app/datadog-init"]

# オプションで Datadog のタグを追加します
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# この環境変数は、Cloud Run でトレース伝播を正しく動作させるために必要です。
# Datadog でインスツルメンテーションされたすべてのダウンストリームサービスにこの変数を設定します。
ENV DD_TRACE_PROPAGATION_STYLE=datadog

# エントリポイントにラップされたバイナリアプリケーションを実行します。必要に応じて内容を変更してください。
CMD ["/path/to/your-go-binary"]
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Dockerfile に次の記述を追加することで、Datadog Agent を使用してアプリケーションをインスツルメントします。以下の例は、既存の Dockerfile のセットアップに応じて調整が必要になる場合があります。

```
# Datadog `serverless-init` を Docker イメージにコピーします
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# python トレーシングライブラリをこちらか requirements.txt でインストールします
RUN pip install --no-cache-dir ddtrace==1.7.3

# オプションで Datadog のタグを追加します
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# この環境変数は、Cloud Run でトレース伝播を正しく動作させるために必要です。
# Datadog でインスツルメンテーションされたすべてのダウンストリームサービスにこの変数を設定します。
ENV DD_TRACE_PROPAGATION_STYLE=datadog

# アプリケーションを Datadog の serverless-init プロセスでラップするためエントリポイントを変更します
ENTRYPOINT ["/app/datadog-init"]

# Datadog トレースライブラリによって起動されるエントリポイントにラップされたバイナリアプリケーションを実行します。必要に応じて内容を変更してください。
CMD ["ddtrace-run", "python", "app.py"]
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Dockerfile に次の記述を追加することで、Datadog Agent を使用してアプリケーションをインスツルメントします。以下の例は、既存の Dockerfile のセットアップに応じて調整が必要になる場合があります。

```
# Datadog `serverless-init` を Docker イメージにコピーします
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# Datadog js トレーシングライブラリをこちらか package.json でインストールします

npm i dd-trace@2.2.0

# enable the Datadog tracing library
ENV NODE_OPTIONS="--require dd-trace/init"

# オプションで Datadog のタグを追加します
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# この環境変数は、Cloud Run でトレース伝播を正しく動作させるために必要です。
# Datadog でインスツルメンテーションされたすべてのダウンストリームサービスにこの変数を設定します。
ENV DD_TRACE_PROPAGATION_STYLE=datadog

# エントリポイントにラップされたバイナリアプリケーションを実行します。必要に応じて内容を変更してください。
ENTRYPOINT ["/app/datadog-init"]

# エントリポイントにラップされたバイナリアプリケーションを実行します。必要に応じて内容を変更してください。
CMD ["/nodejs/bin/node", "/path/to/your/app.js"]

```

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

Dockerfile に次の記述を追加することで、Datadog Agent を使用してアプリケーションをインスツルメントします。以下の例は、既存の Dockerfile のセットアップに応じて調整が必要になる場合があります。

```
# Datadog `serverless-init`  を Docker イメージにコピーします
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# オプションで Datadog のタグを追加します
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# この環境変数は、Cloud Run でトレース伝播を正しく動作させるために必要です。
# Datadog でインスツルメンテーションされたすべてのダウンストリームサービスにこの変数を設定します。
ENV DD_TRACE_PROPAGATION_STYLE=datadog

# アプリケーションを Datadog の serverless-init プロセスでラップするためエントリポイントを変更します
ENTRYPOINT ["/app/datadog-init"]

# エントリポイントにラップされたバイナリアプリケーションを実行します。必要に応じて内容を変更してください。
CMD ["./mvnw", "spring-boot:run"]

```

{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

Dockerfile に次の記述を追加することで、Datadog Agent を使用してアプリケーションをインスツルメントします。以下の例は、既存の Dockerfile のセットアップに応じて調整が必要になる場合があります。

```
# Datadog `serverless-init`  を Docker イメージにコピーします
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# オプションで Datadog のタグを追加します
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# この環境変数は、Cloud Run でトレース伝播を正しく動作させるために必要です。
# Datadog でインスツルメンテーションされたすべてのダウンストリームサービスにこの変数を設定します。
ENV DD_TRACE_PROPAGATION_STYLE=datadog

# アプリケーションを Datadog の serverless-init プロセスでラップするためエントリポイントを変更します
ENTRYPOINT ["/app/datadog-init"]

# エントリポイントにラップされたバイナリアプリケーションを実行します。必要に応じて内容を変更してください。
CMD ["dotnet", "helloworld.dll"]

```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Dockerfile に次の記述を追加することで、Datadog Agent を使用してアプリケーションをインスツルメントします。以下の例は、既存の Dockerfile のセットアップに応じて調整が必要になる場合があります。

```
# Datadog `serverless-init`  を Docker イメージにコピーします
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# オプションで Datadog のタグを追加します
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# この環境変数は、Cloud Run でトレース伝播を正しく動作させるために必要です。
# Datadog でインスツルメンテーションされたすべてのダウンストリームサービスにこの変数を設定します。
ENV DD_TRACE_PROPAGATION_STYLE=datadog

# アプリケーションを Datadog の serverless-init プロセスでラップするためエントリポイントを変更します
ENTRYPOINT ["/app/datadog-init"]

# エントリポイントにラップされたバイナリアプリケーションを実行します。
CMD ["rails", "server", "-b", "0.0.0.0"] (必要に応じて内容を変更してください)
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### ビルドパックで Agent をインストールする

[`Pack Buildpacks`][3] は、Dockerfile を使用せずにコンテナをパッケージ化する便利な方法を提供します。この例では、Google Cloud コンテナレジストリと Datadog サーバーレスビルドパックを使用しています。

**注**: ビルドパックを実行する前に、お使いの言語の[トレーシングライブラリ](#install-tracing-library)をインストールしてください。

以下のコマンドを実行して、アプリケーションを構築します。

   ```shell
   pack build --builder=gcr.io/buildpacks/builder \
   --buildpack from=builder \
   --buildpack datadog/serverless-buildpack:latest \
   gcr.io/YOUR_PROJECT/YOUR_APP_NAME
   ```

**注**: Alpine とは互換性がありません。

### 2. トレーシングライブラリのインストール {#install-tracing-library}

ビルドパックを使用した場合は、[アプリケーションの構成](#3-configure-your-application)まで読み飛ばすことができます。

{{< programming-lang-wrapper langs="go,python,nodejs,java,dotnet,ruby" >}}
{{< programming-lang lang="go" >}}
[こちらの手順][2]に従って、アプリケーションに Go トレーシングライブラリをインストールし、構成して、トレースをキャプチャして送信してください。


[シンプルな Go アプリケーションのサンプルコード][1]。


[1]: https://github.com/DataDog/crpb/tree/main/go
[2]: /ja/tracing/trace_collection/dd_libraries/ruby#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

[以下の手順][2]に従って、アプリケーションに Python トレーシングライブラリをインストールし、構成して、トレースをキャプチャして送信します。

[シンプルな Python アプリケーションのサンプルコード][1]。

[1]: https://github.com/DataDog/crpb/tree/main/python
[2]: /ja/tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

[以下の手順][2]に従って、アプリケーションに Node トレーシングライブラリをインストールし、構成して、トレースをキャプチャして送信します。

[シンプルな Node.js アプリケーションのサンプルコード][1]。

[1]: https://github.com/DataDog/crpb/tree/main/js
[2]: /ja/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

[以下の手順][2]に従って、アプリケーションに Java トレーシングライブラリをインストールし、構成して、トレースをキャプチャして送信します。

[シンプルな Java アプリケーションのサンプルコード][1]。

[1]: https://github.com/DataDog/crpb/tree/main/java
[2]: /ja/tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

#### 

指示に従って、[.NET Core トレーシングライブラリ][1]と [.NET Framework トレーシングライブラリ][2]のインストールと構成を行います。

[1]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/dotnet-core?tab=containers#custom-instrumentation
[2]: /ja/tracing/trace_collection/dd_libraries/dotnet-framework/?tab=containers#custom-instrumentation

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

[以下の手順][2]に従って、アプリケーションに Ruby トレーシングライブラリをインストールし、構成して、トレースをキャプチャして送信します。

[シンプルな Ruby アプリケーションのサンプルコード][1]。

[1]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails
[2]: /ja/tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 3. アプリケーションを構成する

コンテナが構築され、レジストリにプッシュされたら、最後の手順として Datadog Agent 用に必要な環境変数を設定します。
- `DD_API_KEY`: データを Datadog アカウントに送信するために使用する Datadog API キー。プライバシーと安全性の問題を考慮して、[Google Cloud シークレット][10]に設定する必要があります。
- `DD_SITE`: Datadog のエンドポイントと Web サイト。このページの右側で自分のサイトを選択します。あなたのサイトは {{< region-param key="dd_site" code="true" >}} です。
- `DD_TRACE_ENABLED`: `true` に設定してトレースを有効にします

環境変数とその機能の詳細については、[追加の構成](#additional-configurations)を参照してください。

次のコマンドはサービスをデプロイし、外部からの接続がサービスに到達できるようにするためのコマンドです。`DD_API_KEY` を環境変数として設定し、サービスのリスニングポートを 80 に設定します。

```shell
gcloud run deploy APP_NAME --image=gcr.io/YOUR_PROJECT/APP_NAME \
  --port=80 \
  --update-env-vars=DD_API_KEY=$DD_API_KEY \
  --update-env-vars=DD_TRACE_ENABLED=true \
  --update-env-vars=DD_SITE='datadoghq.com' \
  --allow-unauthenticated

```

### 3. 結果

デプロイが完了すると、メトリクスとトレースが Datadog に送信されます。Datadog で **Infrastructure->Serverless** に移動すると、サーバーレスメトリクスとトレースを確認できます。

## 追加の構成

- **高度なトレース:** Datadog Agent は、一般的なフレームワーク向けに基本的なトレース機能をすでにいくつか提供しています。さらに詳しい情報については、[高度なトレースガイド][2]に従ってください。

- **ログ:** [Google Cloud インテグレーション][1]を使用している場合は、すでにログが収集されています。また、環境変数 `DD_LOGS_ENABLED` を `true` に設定することで、サーバーレスインスツルメンテーションを通じて直接アプリケーションログをキャプチャすることも可能です。

- **カスタムメトリクス:** [DogStatsd クライアント][4]を使って、カスタムメトリクスを送信することができます。Cloud Run やその他のサーバーレスアプリケーションの監視には、[ディストリビューション][9]メトリクスを使用します。ディストリビューションは、デフォルトで `avg`、`sum`、`max`、`min`、`count` の集計データを提供します。Metric Summary ページでは、パーセンタイル集計 (p50、p75、p90、p95、p99) を有効にすることができ、タグの管理も可能です。ゲージメトリクスタイプの分布を監視するには、[時間集計と空間集計][11]の両方で `avg`を使用します。カウントメトリクスタイプの分布を監視するには、時間集計と空間集計の両方で `sum` を使用します。

- **トレース伝播:** 分散型トレーシングのためにトレースコンテキストを伝播させるには、Cloud Run アプリとそのダウンストリームにある Datadog インスツルメンテーションサービスに対して `DD_TRACE_PROPAGATION_STYLE` 環境変数を `'datadog'` に設定してください。

### 環境変数

| 変数 | 説明 |
| -------- | ----------- |
|`DD_API_KEY`| [Datadog API キー][7] - **必須**|
| `DD_SITE` | [Datadog サイト][5] - **必須** |
| `DD_LOGS_ENABLED` | true の場合、ログ (stdout と stderr) を Datadog に送信します。デフォルトは false です。 |
| `DD_SERVICE`      | [統合サービスタグ付け][6]を参照してください。                                  |
| `DD_VERSION`      | [統合サービスタグ付け][6]を参照してください。                                  |
| `DD_ENV`          | [統合サービスタグ付け][6]を参照してください。                                  |
| `DD_SOURCE`       | [統合サービスタグ付け][6]を参照してください。                                  |
| `DD_TAGS`         | [統合サービスタグ付け][6]を参照してください。                                  |

### OpenTelemetry

以下の手順で、OpenTelemetry (OTel) データを Datadog に送信します。

1. Datadog `serverless-init` にスパンをエクスポートするよう OTel に指示します。

   ```js
   // instrument.js

   const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
   const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
   const { Resource } = require('@opentelemetry/resources');
   const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
   const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');

   const provider = new NodeTracerProvider({
      resource: new Resource({
          [ SemanticResourceAttributes.SERVICE_NAME ]: '<your-service-name>',
      })
   });

   provider.addSpanProcessor(
      new SimpleSpanProcessor(
          new OTLPTraceExporter(
              { url: 'http://localhost:4318/v1/traces' },
          ),
      ),
   );
   provider.register();
   ```

2. Express 用の OTel のインスツルメンテーションを追加します。これは `ddtrace` を追加するのと同じようなものです。

   ```js
   // instrument.js

   const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
   const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
   const { registerInstrumentations } = require('@opentelemetry/instrumentation');

   registerInstrumentations({
      instrumentations: [
          new HttpInstrumentation(),
          new ExpressInstrumentation(),
      ],
   });

   ```

3. 実行時にインスツルメンテーションを追加します。例えば、Node.js の場合、`NODE_OPTIONS` を使用します。
   ```
   # Dockerfile

   FROM node

   WORKDIR /app
   COPY package.json index.js instrument.js /app/
   RUN npm i

   ENV NODE_OPTIONS="--require ./instrument"

   CMD npm run start
   ```

4. Datadog の `serverless-init` を追加します。
   ```
   # Dockerfile

   COPY --from=datadog/serverless-init /datadog-init /app/datadog-init
   ENTRYPOINT ["/app/datadog-init"]
   ```
5. Datadog の `serverless-init` で、`DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT`または `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` 環境変数で OTel を有効にします。

   ```
   # Dockerfile

   ENV DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT="localhost:4318"
   ```

## トラブルシューティング

このインテグレーションは、お使いのランタイムが完全な SSL を実装しているかどうかに依存します。Node の slim イメージを使用している場合、証明書を含めるために Dockerfile に次のコマンドを追加する必要があるかもしれません。

```
RUN apt-get update && apt-get install -y ca-certificates
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/integrations/google_cloud_platform/#log-collection
[2]: /ja/tracing/trace_collection/#for-setup-instructions-select-your-language
[3]: https://buildpacks.io/docs/tools/pack/
[4]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[5]: /ja/getting_started/site/
[6]: /ja/getting_started/tagging/unified_service_tagging/
[7]: /ja/account_management/api-app-keys/#api-keys
[8]: https://github.com/DataDog/crpb/tree/main
[9]: /ja/metrics/distributions/
[10]: /ja/metrics/#time-and-space-aggregation
[11]: https://cloud.google.com/run/docs/configuring/secrets