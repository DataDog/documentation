---
further_reading:
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: GitHub
  text: Container Apps サービスからのトレース、ログ、カスタムメトリクスの収集
title: Azure Container Apps
---

## 概要
Azure Container Apps は、コンテナベースのアプリケーションをデプロイし、スケーリングするためのフルマネージドサーバーレスプラットフォームです。Datadog は、[Azure インテグレーション][1]を通して Container Apps のモニタリングとログ収集を提供しています。また、Datadog は現在ベータ版として、トレース、カスタムメトリクス、直接ログ収集を可能にする専用 Agent で Container Apps アプリケーションをインスツルメントするソリューションも提供しています。

### 前提条件

[Datadog API キー][6]を取得済みであることと、[Datadog トレーシングライブラリがサポートする][2]プログラミング言語を使用していることを確認してください。

## アプリケーションをインスツルメントする

アプリケーションをインスツルメンテーションするには、[Dockerfile](#dockerfile) と[ビルドパック](#buildpack)の 2 つの方法があります。

### Dockerfile

Datadog は、serverless-init コンテナイメージの新しいリリースを Google の gcr.io、AWS の ECR、および Docker Hub に公開しています。

| hub.docker.com | gcr.io | public.ecr.aws |
| ---- | ---- | ---- |
| datadog/serverless-init | gcr.io/datadoghq/serverless-init | public.ecr.aws/datadog/serverless-init |

イメージはセマンティックバージョニングに基づいてタグ付けされ、新しいバージョンごとに 3 つの関連タグが付与されます。

* `1`、`1-alpine`: 重大な変更を加えることなく、最新のマイナーリリースを追跡するために使用します。
* `1.x.x`、`1.x.x-alpine`: ライブラリの正確なバージョンにピン留めするために使用します。
* `latest`、`latest-alpine`: 重大な変更が含まれる可能性がある最新のバージョンリリースに従う場合、これらを使用します

## `serverless-init` の動作

`serverless-init` アプリケーションはプロセスをラップし、サブプロセスとしてこれを実行します。このアプリケーションはメトリクス用の DogStatsD リスナーとトレース用の Trace Agent リスナーを起動します。アプリケーションの stdout/stderr ストリームをラップすることでログを収集します。ブートストラップの後、serverless-init はサブプロセスとしてコマンドを起動します。

完全なインスツルメンテーションを得るには、Docker コンテナ内で実行する最初のコマンドとして `datadog-init` を呼び出していることを確認します。これを行うには、エントリーポイントとして設定するか、CMD の最初の引数として設定します。

{{< programming-lang-wrapper langs="nodejs,python,java,go,dotnet,ruby,php" >}}
{{< programming-lang lang="nodejs" >}}

{{% svl-init-nodejs %}}

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

{{% svl-init-python %}}

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

{{% svl-init-java %}}

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

{{% svl-init-go %}}

{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

{{% svl-init-dotnet %}}

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

{{% svl-init-ruby %}}

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

{{% svl-init-php %}}

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 2. アプリケーションを構成する

コンテナが構築され、レジストリにプッシュされたら、最後の手順として Datadog Agent 用に必要な環境変数を設定します。
- `DD_API_KEY`: データを Datadog アカウントに送信するために使用する Datadog API キー。プライバシーと安全性の問題を考慮して、[Azure シークレット][7]に設定する必要があります。
- `DD_SITE`: Datadog のエンドポイントと Web サイト。このページの右側で自分のサイトを選択します。あなたのサイトは {{< region-param key="dd_site" code="true" >}} です。
- **`DD_AZURE_SUBSCRIPTION_ID`**: コンテナアプリリソースに関連付けられた Azure サブスクリプション ID (必須)。
- **`DD_AZURE_RESOURCE_GROUP`**: コンテナアプリリソースに関連付けられた Azure リソースグループ (必須)。

- `DD_TRACE_ENABLED`: `true` に設定してトレースを有効にします。

環境変数とその機能の詳細については、[追加の構成](#additional-configurations)を参照してください。

次のコマンドはサービスをデプロイし、外部からの接続がサービスに到達できるようにするためのコマンドです。`DD_API_KEY` を環境変数として設定し、サービスのリスニングポートを 80 に設定します。

```shell
az containerapp up \
  --name APP_NAME \
  --resource-group RESOURCE_GROUP \
  --ingress external \
  --target-port 80 \
  --env-vars "DD_API_KEY=$DD_API_KEY" "DD_TRACE_ENABLED=true" "DD_SITE='datadoghq.com'" \
  --image YOUR_REGISTRY/YOUR_PROJECT
```

### 3. 結果

デプロイが完了すると、メトリクスとトレースが Datadog に送信されます。Datadog で **Infrastructure->Serverless** に移動すると、サーバーレスメトリクスとトレースを確認できます。

## 追加の構成

- **高度なトレース:** Datadog Agent は、一般的なフレームワーク向けに基本的なトレース機能をすでにいくつか提供しています。さらに詳しい情報については、[高度なトレースガイド][2]に従ってください。

- **ログ:** [Azure インテグレーション][1]を使用している場合は、すでにログが収集されています。また、環境変数 `DD_LOGS_ENABLED` を `true` に設定することで、サーバーレスインスツルメンテーションを通じて直接アプリケーションログをキャプチャすることも可能です。

- **カスタムメトリクス:** [DogStatsd クライアント][3]を使って、カスタムメトリクスを送信することができます。Cloud Run やその他のサーバーレスアプリケーションの監視には、[ディストリビューション][8]メトリクスを使用します。ディストリビューションは、デフォルトで `avg`、`sum`、`max`、`min`、`count` の集計データを提供します。Metric Summary ページでは、パーセンタイル集計 (p50、p75、p90、p95、p99) を有効にすることができ、タグの管理も可能です。ゲージメトリクスタイプの分布を監視するには、[時間集計と空間集計][9]の両方で `avg` を使用します。カウントメトリクスタイプの分布を監視するには、時間集計と空間集計の両方で `sum` を使用します。

- **トレースサンプリング:** サーバーレスアプリケーションの APM トレースリクエストサンプリングレートを管理するには、関数の DD_TRACE_SAMPLE_RATE 環境変数を 0.000 (コンテナアプリのリクエストをトレースしない) から 1.000 (すべてのコンテナアプリのリクエストをトレースする) の間の値に設定します。

メトリクスは、アプリケーションの 100% のトラフィックに基づいて計算され、どのようなサンプリング構成であっても正確な値を維持します。

### 環境変数

| 変数 | 説明 |
| -------- | ----------- |
|`DD_API_KEY`| [Datadog API キー][6] - **必須**|
| `DD_SITE` | [Datadog サイト][4] - **必須** |
| `DD_LOGS_ENABLED` | true の場合、ログ (stdout と stderr) を Datadog に送信します。デフォルトは false です。 |
| `DD_LOGS_INJECTION`| true の場合、[Java][10]、[Node.js][11]、[.NET][12]、および [PHP][13] でサポートされているロガーのトレースデータですべてのログをリッチ化します。[Python][14]、[Go][15]、[Ruby][16] については追加のドキュメントを参照してください。 |
| `DD_TRACE_SAMPLE_RATE`|  トレース取り込みのサンプルレート `0.0` と `1.0` をコントロールします|
| `DD_SERVICE`      | [統合サービスタグ付け][5]を参照してください。                                       |
| `DD_VERSION`      | [統合サービスタグ付け][5]を参照してください。                                       |
| `DD_ENV`          | [統合サービスタグ付け][5]を参照してください。                                       |
| `DD_SOURCE`       | [統合サービスタグ付け][5]を参照してください。                                       |
| `DD_TAGS`         | [統合サービスタグ付け][5]を参照してください。                                       |

## ヘルプ

このインテグレーションは、お使いのランタイムが完全な SSL を実装しているかどうかに依存します。Node の slim イメージを使用している場合、証明書を含めるために Dockerfile に次のコマンドを追加する必要があるかもしれません。

```
RUN apt-get update && apt-get install -y ca-certificates
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/integrations/azure/#log-collection
[2]: /ja/tracing/trace_collection/#for-setup-instructions-select-your-language
[3]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /ja/getting_started/site/
[5]: /ja/getting_started/tagging/unified_service_tagging/
[6]: /ja/account_management/api-app-keys/
[7]: https://learn.microsoft.com/en-us/azure/container-apps/manage-secrets
[8]: /ja/metrics/distributions/
[9]: /ja/metrics/#time-and-space-aggregation
[10]: /ja/tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2
[11]: /ja/tracing/other_telemetry/connect_logs_and_traces/nodejs
[12]: /ja/tracing/other_telemetry/connect_logs_and_traces/dotnet?tab=serilog
[13]: /ja/tracing/other_telemetry/connect_logs_and_traces/php
[14]: /ja/tracing/other_telemetry/connect_logs_and_traces/python
[15]: /ja/tracing/other_telemetry/connect_logs_and_traces/go
[16]: /ja/tracing/other_telemetry/connect_logs_and_traces/ruby