---
further_reading:
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: GitHub
  text: GCR サービスからのトレース、ログ、カスタムメトリクスの収集
kind: documentation
title: Google Cloud Run
---

## 概要
Google Cloud Run は、コンテナベースのアプリケーションをデプロイし、スケーリングするためのフルマネージドサーバーレスプラットフォームです。Datadog は、[GCP インテグレーション][1]を通して Cloud Run のモニタリングとログ収集を提供しています。また、Datadog は現在公開ベータ版として、トレース、カスタムメトリクス、直接ログ収集を可能にする専用 Agent で Cloud Run 実行アプリケーションをインスツルメントするソリューションも提供しています。

  <div class="alert alert-warning">この機能は公開ベータ版です。<a href="https://forms.gle/HSiDGnTPvDvbzDAQA">フィードバックフォーム</a>、または標準的なサポートチャンネルを通じてフィードバックを提供することができます。ベータ期間中は、Cloud Run モニタリングと APM トレースは直接費用なしで利用できます。既存の APM のお客様は、スパンの取り込みとボリュームのコストが増加する可能性があります。</div>

## トレースとカスタムメトリクス
### コンテナの構築

Dockerfile を使用してアプリケーションを構築する場合は、以下を完了してください。

1. [サポートされている Datadog トレーシングライブラリ][8]を使用して、アプリケーションをインスツルメントする

2. [Datadog `serverless-init` バイナリ][2] を `COPY` 命令を使用して、Docker イメージにコピーします。

3. `ENTRYPOINT` 命令を使用して、Docker コンテナが開始されるときに `serverless-init` バイナリを実行します。

4. `CMD` 命令を使用して、既存のアプリケーションやその他の必要なコマンドを引数として実行します。

以下は、これらの 3 つのステップを完了する方法の例です。これらの例は、既存の Dockerfile のセットアップに応じて調整する必要があるかもしれません。


{{< programming-lang-wrapper langs="go,python,nodejs,java,dotnet,ruby" >}}
{{< programming-lang lang="go" >}}
```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["/path/to/your-go-binary"] (adapt this line to your needs)
```
詳しくは [Go アプリケーションのトレース][1]を参照してください。[簡単な Go アプリケーションのサンプルコード][2]をご覧ください。


[1]: /ja/tracing/setup_overview/setup/go/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/go
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["ddtrace-run", "python", "app.py"] (adapt this line to your needs)
```

詳しくは [Python アプリケーションのトレース][1]を参照してください。[簡単な Python アプリケーションのサンプルコード][2]をご覧ください。

[1]: /ja/tracing/setup_overview/setup/python/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/python
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}
```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["/nodejs/bin/node", "/path/to/your/app.js"] (adapt this line to your needs)

```

詳しくは [Node.js アプリケーションのトレース][1]を参照してください。[簡単な Node.js アプリケーションのサンプルコード][2]をご覧ください。

[1]: /ja/tracing/setup_overview/setup/nodejs/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/js
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}
```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["./mvnw", "spring-boot:run"] (adapt this line to your needs)

```

詳しくは [Java アプリケーションのトレース][1]を参照してください。[簡単な Java アプリケーションのサンプルコード][2]をご覧ください。

[1]: /ja/tracing/setup_overview/setup/java/?tabs=containers
[2]: https://github.com/DataDog/crpb/tree/main/java
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}
```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["dotnet", "helloworld.dll"] (adapt this line to your needs)

```

詳しくは [.NET アプリケーションのトレース][1]を参照してください。[簡単な .NET アプリケーションのサンプルコード][2]をご覧ください。

[1]: /ja/tracing/trace_collection/dd_libraries/dotnet-core?tab=containers
[2]: https://github.com/DataDog/crpb/tree/main/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
```
COPY --from=datadog/serverless-init:beta4 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["rails", "server", "-b", "0.0.0.0"] (この行はあなたのニーズに合わせてください)

```

詳しくは [Ruby アプリケーションのトレース][1]を参照してください。[簡単な Ruby アプリケーションのサンプルコード][2]をご覧ください。

[1]: /ja/tracing/trace_collection/dd_libraries/ruby/
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### トラブルシューティング
このインテグレーションは、お使いのランタイムが完全な SSL を実装しているかどうかに依存します。Node の slim イメージを使用している場合、証明書を含めるために Dockerfile に次のコマンドを追加する必要があるかもしれません。

```
RUN apt-get update && apt-get install -y ca-certificates
```

#### Datadog のビルドパックで構築する

1. 以下を実行して、アプリケーションを構築します。
   ```
   pack build --builder=gcr.io/buildpacks/builder \
   --buildpack from=builder \
   --buildpack datadog/serverless-buildpack:beta4 \
   gcr.io/YOUR_PROJECT/YOUR_APP_NAME

   ```

   **注**: Alpine とは互換性がありません。

 2. GCP にイメージをプッシュします。
    ```
    docker push gcr.io/YOUR_PROJECT/YOUR_APP_NAME
    ```

### Cloud Run へのデプロイ
以下は、標準的な GCP ツールを使用して Cloud Run サービスをデプロイするための手順です。コンテナイメージ、シークレット、デプロイメントを管理するための他のシステムがある場合は、それを代わりに使用することができます。

3. このコマンドを実行すると、GCP にビルドが送信されます。

   ```
   gcloud builds submit --tag gcr.io/YOUR_PROJECT/YOUR_APP_NAME
   ```
4. Datadog API キーからシークレットを作成します。
   GCP コンソールの[シークレットマネージャー][3]から、**Create secret** をクリックします。

   **Name** フィールドに名前 (例えば、`datadog-api-key`) を設定します。次に、Datadog API キーを **Secret value** フィールドに貼り付けます。
5. サービスをデプロイします。
   GCP コンソールの [Cloud Run][4] から、**Create service** をクリックします。

   **Deploy one revision from an existing container image** (既存のコンテナイメージから 1 つのリビジョンをデプロイする) を選択します。以前にビルドしたイメージを選択します。

   認証方法を選択します。

   以前に作成したシークレットを参照します。**Container, Variables & Secrets, Connections, Security** (コンテナ、変数とシークレット、接続、セキュリティ) セクションに移動し、**Variables & Secrets** タブを選択します。

   **Secrets** で、**Reference a secret** をクリックし、Datadog API キーから作成したシークレットを選択します。ユーザーにシークレットへのアクセス権を付与する必要があるかもしれません。

   **Reference method** で、**Exposed as environment variable** を選択します。

   **Environment variables** セクションで、名前が `DD_API_KEY` に設定されていることを確認します。

### カスタムメトリクス
[DogStatsd クライアント][5]を使って、カスタムメトリクスの送信を行うことができます。

**注**: `DISTRIBUTION` メトリクスのみを使用してください。

### 高度なオプションと構成

#### 環境変数

| 変数 | 説明 |
| -------- | ----------- |
| `DD_SITE` | [Datadog サイト][6]。 |
| `DD_LOGS_ENABLED` | true の場合、ログ (stdout と stderr) を Datadog に送信します。デフォルトは false です。 |
| `DD_SERVICE` | [統合サービスタグ付け][7]を参照してください。 |
| `DD_VERSION` | [統合サービスタグ付け][7]を参照してください。 |
| `DD_ENV` | [統合サービスタグ付け][7]を参照してください。 |
| `DD_SOURCE` | [統合サービスタグ付け][7]を参照してください。 |
| `DD_TAGS` | [統合サービスタグ付け][7]を参照してください。 |

## ログの収集

[GCP インテグレーション][1]を使用してログを収集することができます。また、環境変数 `DD_LOGS_ENABLED` を true に設定することで、Agent を通じてアプリケーションログをキャプチャすることも可能です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/integrations/google_cloud_platform/#log-collection
[2]: https://registry.hub.docker.com/r/datadog/serverless-init
[3]: https://console.cloud.google.com/security/secret-manager
[4]: https://console.cloud.google.com/run
[5]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[6]: /ja/getting_started/site/
[7]: /ja/getting_started/tagging/unified_service_tagging/
[8]: /ja/tracing/trace_collection/#for-setup-instructions-select-your-language