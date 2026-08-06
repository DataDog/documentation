---
description: アプリケーションを再インスツルメンテーションすることなく、Azure Application Insights の分散トレースを Datadog
  APM に取り込みます。
further_reading:
- link: /integrations/azure/
  tag: ドキュメント
  text: Microsoft Azure インテグレーション
private: true
title: Azure App Insights インテグレーション
---
{{< callout url="https://www.datadoghq.com/product-preview/azure-app-insights-integration/" header="プレビューに参加しましょう" >}}
Azure App Insights インテグレーションはプレビュー版です。このフォームを使用してアクセスをリクエストしてください。
{{< /callout >}}

## 概要 {#overview}

Azure Application Insights の分散トレースを Datadog APM に取り込みます。Datadog は App Insights トレースを APM スパンに変換し、サポートされているサービスからのスパンを Azure リソースメタデータでエンリッチします。

{{< img src="tracing/guide/serverless_enable_azure_app_insights/app-insights-azure-fn-example.png" alt="Datadog APM フレームグラフに表示された Azure Application Insights トレース。選択したスパンには Azure リソースメタデータが表示されています。" style="width:100%;" >}}

このインテグレーションは、Datadog にログとして転送された App Insights レコードを読み取り、それらから APM スパンを生成します。アプリケーションコードやインスツルメンテーションの変更は不要です。

## 仕組み {#how-it-works}

ワークロードで Application Insights が有効になり、Azure ログが Datadog に送信されている場合、Datadog は以下の処理を行います。

1. 転送された Azure ログから App Insights レコードを読み取ります。
2. 各 App Insights 操作を Datadog APM スパンに変換し、従来の階層型 Request-Id 形式と W3C Trace Context の両方で親子関係を保持します。
3. [サポートされている Azure サービス](#supported-azure-services)のスパンを、リソースグループ、サブスクリプション、リージョン、リソースタグなどの Azure リソースメタデータでエンリッチします。

変換後、スパンは他の Datadog APM スパンと同様に動作します。これらは同じウォーターフォールビューに表示され、トレース検索をサポートし、ログやメトリクスと関連付けられます。

## 前提条件 {#prerequisites}

Azure App Insights インテグレーションを使用する前に、以下を設定します。

1. **Azure Application Insights を有効にする**: トレース対象の Azure ワークロードで、従来の Application Insights SDK を使用して Azure Application Insights を有効にします。ワークロードで [Azure Monitor OpenTelemetry Distro][5] を使用している場合は、代わりに [Datadog の OpenTelemetry][6] を参照してください。
2. **[Azure Automated Log Forwarding][2] を構成し**、Azure App Insights ログを Datadog に転送します。[Microsoft Azure インテグレーション][1] でメトリクスとリソースの収集が有効になっていることを確認し、スパンを Azure リソースメタデータでエンリッチできるようにします。

{{% serverless/log_to_trace_indexing_note %}}

## サポートされている Azure サービス {#supported-azure-services}

Datadog は、変換されたスパンに以下のサービスの Azure リソースメタデータを付加します。

- Azure Functions
- Azure App Service
- Azure Storage
- Azure Cosmos DB
- Azure API Management
- Azure Cache for Redis

他の Azure サービスからのトレースは APM スパンに変換されますが、Azure リソースメタデータによるエンリッチメントは行われません。

## アクセスをリクエストする {#request-access}

Azure App Insights インテグレーションはプレビュー版です。アクセスをリクエストするには、[プレビューフォーム][4] からサインアップしてください。Datadog チームが 1 週間以内に回答し、アクセスを確認します。

## 制限事項 {#limitations}

- **プレビューのステータス**このインテグレーションはプレビュー段階であり、限定されたデザインパートナーのグループを対象としています。アクセス権は、プレビューフォームからサインアップした後に付与されます。
- **リソースメタデータのエンリッチメントはサービス固有です。**[サポート対象リスト](#supported-azure-services)に含まれていない Azure サービスのスパンは変換されますが、Azure リソースメタデータによるエンリッチメントは行われません。
- **混合形式のトレース階層はスパンリンクに依存します。**一部の Azure ワークロードは、従来の階層型 Request-Id 形式と W3C Trace Context を混在させて出力します。Datadog は [スパンリンク][3] を使用してこれら 2 つの形式を接続するため、関連するトレース間を移動できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/azure/
[2]: /ja/logs/guide/azure-automated-log-forwarding/
[3]: /ja/tracing/trace_collection/span_links/
[4]: https://www.datadoghq.com/product-preview/azure-app-insights-integration/
[5]: https://learn.microsoft.com/en-us/azure/azure-monitor/app/opentelemetry-enable
[6]: /ja/opentelemetry/