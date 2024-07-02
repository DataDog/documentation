---
title: Instrument Azure App Service - Linux Containers
kind: documentation
further_reading:
- link: /integrations/azure_app_services/
  tag: Documentation
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: Documentation
  text: Azure App Service Environment
---

## Overview

<div class="alert alert-info">To instrument your Azure App Service containers with a sidecar, see <a href="/serverless/guide/azure_app_service_linux_sidecar">Instrument Azure App Service - Sidecar Pattern</a>.</div>

This instrumentation method uses `serverless-init` and provides the following additional monitoring capabilities for containerized Linux Azure App Service workloads:

- 自動インスツルメンテーションを用いた完全分散型 APM トレーシング。
- カスタマイズされた APM サービスとトレースビューは、関連する Azure App Service のメトリクスとメタデータを表示します。
- スパンのカスタマイズが可能な、手動 APM インスツルメンテーション機能。
- アプリケーションログへの `Trace_ID` 挿入。
- [DogStatsD][1] を使用したカスタムメトリクス送信のサポート。

### 前提条件

[Datadog API キー][6]を取得済みであることと、[Datadog トレーシングライブラリがサポートする][2]プログラミング言語を使用していることを確認してください。

## アプリケーションをインスツルメントする

### Dockerfile

Datadog publishes new releases of the serverless-init container image to Google's gcr.io, AWS's ECR, and on Docker Hub:

| dockerhub.io | gcr.io | public.ecr.aws |
| ---- | ---- | ---- |
| datadog/serverless-init | gcr.io/datadoghq/serverless-init | public.ecr.aws/datadog/serverless-init |

イメージはセマンティックバージョニングに基づいてタグ付けされ、新しいバージョンごとに 3 つの関連タグが付与されます。

* `1`、`1-alpine`: 重大な変更がない最新のマイナーリリースを追跡する場合、これらを使用します
* `1.x.x`、`1.x.x-alpine`: ライブラリの正確なバージョンにピン留めする場合、これらを使用します
* `latest`、`latest-alpine`: 重大な変更が含まれる可能性がある最新のバージョンリリースに従う場合、これらを使用します

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
- `DD_TRACE_ENABLED`: `true` に設定してトレースを有効にします。

環境変数とその機能の詳細については、[追加の構成](#additional-configurations)を参照してください。

### 3. 結果

デプロイが完了すると、メトリクスとトレースが Datadog に送信されます。Datadog で **Infrastructure->Serverless** に移動すると、サーバーレスメトリクスとトレースを確認できます。

## デプロイ

{{% aas-workflow-linux %}}

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

## トラブルシューティング

トレースやカスタムメトリクスデータを期待通りに受信できない場合は、**App Service logs** を有効にしてデバッグログを受信してください。

{{< img src="serverless/azure_app_service/app-service-logs.png" style="width:100%;" >}}

[Datadog サポート][14]と **Log stream** の内容を共有してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /integrations/azure/#log-collection
[2]: /tracing/trace_collection/library_config
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /getting_started/site/
[5]: /getting_started/tagging/unified_service_tagging/
[6]: /account_management/api-app-keys/
[7]: https://learn.microsoft.com/en-us/azure/container-apps/manage-secrets
[8]: /metrics/distributions/
[9]: /metrics/#time-and-space-aggregation
[10]: /tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2
[11]: /tracing/other_telemetry/connect_logs_and_traces/nodejs
[12]: /tracing/other_telemetry/connect_logs_and_traces/dotnet?tab=serilog
[13]: /tracing/other_telemetry/connect_logs_and_traces/php
[14]: /tracing/other_telemetry/connect_logs_and_traces/python
[15]: /tracing/other_telemetry/connect_logs_and_traces/go
[16]: /tracing/other_telemetry/connect_logs_and_traces/ruby
