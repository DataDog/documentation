---
further_reading:
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: GitHub
  text: GCR サービスからのトレース、ログ、カスタムメトリクスの収集
kind: documentation
title: Google Cloud Run
---

## 概要

Google Cloud Run は、コンテナベースのアプリケーションをデプロイし、スケーリングするためのフルマネージドサーバーレスプラットフォームです。Datadog は、[GCP インテグレーション][1]を通して Cloud Run のモニタリングとログ収集を提供しています。また、Datadog は現在公開ベータ版として、トレース、カスタムメトリクス、直接ログ収集を可能にする専用 Agent で Cloud Run アプリケーションをインスツルメントするソリューションも提供しています。

  <div class="alert alert-warning">この機能は公開ベータ版です。<a href="https://forms.gle/HSiDGnTPvDvbzDAQA">フィードバックフォーム</a>、または標準的なサポートチャンネルを通じてフィードバックを提供することができます。ベータ期間中は、Cloud Run モニタリングと APM トレースは直接費用なしで利用できます。既存の APM のお客様は、スパンの取り込みとボリュームのコストが増加する可能性があります。</div>

## はじめに

### 前提条件

[Datadog API キー][7]を取得済みであることと、[Datadog トレーシングライブラリがサポートする][2]プログラミング言語を使用していることを確認してください。

### ワンクリックでサンプルアプリケーションをデプロイする

このガイドの残りの部分に従う必要なしにサンプルアプリケーションをデプロイするには、[これらの例][8]のいずれかを使用することができます。インストールプロセスでは、Datadog API キーのような必要な詳細を尋ねられます。これらのアプリケーションは、デフォルトの Web サイトである `datadoghq.com` にデータを送信することに注意してください。

### 1. アプリケーションのインスツルメンテーション

Datadog インスツルメンテーションでコンテナをビルドするには、Dockerfile やビルドパックを使用するかどうかによって、これら 2 つの方法のいずれかに従うことができます。

#### 1.a Dockerfile を使用したインスツルメンテーション

Dockerfile に次の記述を追加することで、アプリケーションをインスツルメントすることができます。以下の記述例は、既存の Dockerfile のセットアップに応じて調整が必要になる場合があります。

{{< programming-lang-wrapper langs="go,python,nodejs,java,dotnet,ruby" >}}
{{< programming-lang lang="go" >}}

```
# Datadog `serverless-init` を Docker イメージにコピーします
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# アプリケーションを Datadog の serverless-init プロセスでラップするためエントリポイントを変更します
ENTRYPOINT ["/app/datadog-init"]

# オプションで Datadog のタグを追加します
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# エントリポイントにラップされたバイナリアプリケーションを実行します。必要に応じて内容を変更してください。
CMD ["/path/to/your-go-binary"]
```

[シンプルな Go アプリケーション用のサンプルコード][1]。
[Go トレーシングライブラリ][2]に関する詳細。

[1]: https://github.com/DataDog/crpb/tree/main/go
[2]: /ja/serverless/installation/go/?tab=serverlessframework#install-the-datadog-lambda-library

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

```
# Datadog `serverless-init` を Docker イメージにコピーします
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# python トレーシングライブラリをこちらか requirements.txt でインストールします
RUN pip install --no-cache-dir ddtrace==1.7.3

# オプションで Datadog のタグを追加します
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# アプリケーションを Datadog の serverless-init プロセスでラップするためエントリポイントを変更します
ENTRYPOINT ["/app/datadog-init"]

# Datadog トレースライブラリによって起動される、エントリポイントにラップされたバイナリアプリケーションを実行します。必要に応じて内容を変更してください。
CMD ["ddtrace-run", "python", "app.py"]
```

[シンプルな Python アプリケーション用のサンプルコード][1]。
[Python トレーシングライブラリ][2]に関する詳細。

[1]: https://github.com/DataDog/crpb/tree/main/python
[2]: /ja/tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

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

# エントリポイントにラップされたバイナリアプリケーションを実行します。必要に応じて内容を変更してください。
ENTRYPOINT ["/app/datadog-init"]

# エントリポイントにラップされたバイナリアプリケーションを実行します。必要に応じて内容を変更してください。
CMD ["/nodejs/bin/node", "/path/to/your/app.js"]

```

[シンプルな Node.js アプリケーション用のサンプルコード][1]。
[Node.js トレーシングライブラリ][2]に関する詳細。

[1]: https://github.com/DataDog/crpb/tree/main/js
[2]: /ja/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

```
# Datadog `serverless-init`  を Docker イメージにコピーします
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# オプションで Datadog のタグを追加します
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# アプリケーションを Datadog の serverless-init プロセスでラップするためエントリポイントを変更します
ENTRYPOINT ["/app/datadog-init"]

# エントリポイントにラップされたバイナリアプリケーションを実行します。必要に応じて内容を変更してください。
CMD ["./mvnw", "spring-boot:run"]

```

[シンプルな Java アプリケーション用のサンプルコード][1]。
[Java トレーシングライブラリ][2]に関する詳細。

[1]: https://github.com/DataDog/crpb/tree/main/java
[2]: /ja/tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

```
# Datadog `serverless-init`  を Docker イメージにコピーします
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# オプションで Datadog のタグを追加します
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# アプリケーションを Datadog の serverless-init プロセスでラップするためエントリポイントを変更します
ENTRYPOINT ["/app/datadog-init"]

# エントリポイントにラップされたバイナリアプリケーションを実行します。必要に応じて内容を変更してください。
CMD ["dotnet", "helloworld.dll"]

```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

```
# Datadog `serverless-init`  を Docker イメージにコピーします
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# オプションで Datadog のタグを追加します
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# アプリケーションを Datadog の serverless-init プロセスでラップするためエントリポイントを変更します
ENTRYPOINT ["/app/datadog-init"]

# エントリポイントにラップされたバイナリアプリケーションを実行します。
CMD ["rails", "server", "-b", "0.0.0.0"] (必要に応じて内容を変更してください)
```

[シンプルな Ruby アプリケーション用のサンプルコード][1]。
[Ruby トレーシングライブラリ][2]に関する詳細。

[1]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails
[2]: /ja/tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### 1.b ビルドパックを使用したインスツルメンテーション

[`Pack Buildpacks`][3] は、Dockerfile を使用せずにコンテナをパッケージ化する便利な方法を提供します。この例では、GCP コンテナレジストリと Datadog サーバーレスビルドパックを使用しています。

**注**: ビルドパックを実行する前に、お使いの言語の[トレーシングライブラリ][2]をインストールするよう、指示に従ってください。

以下のコマンドを実行して、アプリケーションを構築します。

   ```shell
   pack build --builder=gcr.io/buildpacks/builder \
   --buildpack from=builder \
   --buildpack datadog/serverless-buildpack \
   gcr.io/YOUR_PROJECT/YOUR_APP_NAME
   ```

**注**: Alpine とは互換性がありません。

### 2. アプリケーションを構成する

コンテナが構築され、レジストリにプッシュされたら、最後の手順として Datadog Agent 用に必要な環境変数を設定します。
- `DD_API_KEY`: データを Datadog アカウントに送信するために使用する Datadog API キー。プライバシーと安全性の問題を考慮して、[GCP シークレット][10]に設定する必要があります。
- `DD_SITE`: Datadog のエンドポイントと Web サイト。このページの右側で自分のサイトを選択します。あなたのサイト: {{< region-param key="dd_site" code="true" >}}.
- `DD_TRACE_ENABLED`: `true` に設定してトレーシングを有効にします

環境変数とその機能の詳細については、[追加構成](#additional-configurations)を参照してください。

次のコマンドはサービスをデプロイし、外部からの接続がサービスに到達できるようにします。`DD_API_KEY` を環境変数として設定し、サービスのリスニングポートを 80 に設定します。

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

- **高度なトレーシング:** Datadog Agent は、一般的なフレームワーク向けに基本的なトレーシング機能をすでにいくつか提供しています。さらに詳しい情報については、[高度なトレーシングガイド][2]に従ってください。

- **ログ:** [GCP インテグレーション][1]を使用している場合は、すでにログが収集されています。また、環境変数 `DD_LOGS_ENABLED` を `true` に設定することで、サーバーレスインスツルメンテーションを通じて直接アプリケーションログをキャプチャすることも可能です。

- **カスタムメトリクス:** [DogStatsd クライアント][4]を使って、カスタムメトリクスを送信することができます。Cloud Run やその他のサーバーレスアプリケーションの監視には、[ディストリビューション][9]メトリクスを使用します。ディストリビューションは、デフォルトで `avg`、`sum`、`max`、`min`、`count` の集計データを提供します。Metric Summary ページでは、パーセンタイル集計 (p50、p75、p90、p95、p99) を有効にすることができ、タグの管理も可能です。ゲージメトリクスタイプの分布を監視するには、[時間集計と空間集計][11]の両方で `avg`を使用します。カウントメトリクスタイプの分布を監視するには、時間集計と空間集計の両方で `sum` を使用します。

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