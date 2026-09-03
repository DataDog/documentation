---
further_reading:
- link: https://www.datadoghq.com/blog/monitor-azure-functions-hosting-plans/
  tag: ブログ
  text: Datadogを使用して、すべてのホスティングプランにわたってAzure Functionsを監視します。
title: Azure データベースおよびメッセージングサービス
---
## 概要 {#overview}

Datadog APM は、Azure Cosmos DB、Event Hubs、および Service Bus からトレースとトレースメトリクスを収集するために、**推定されたスパン**を使用します。推定されたスパンは、Azure 上で実行される Datadog でインスツルメンテーションされたサービスのフレームグラフおよびウォーターフォールビューに自動的に表示されます。追加の設定は必要ありません。Azure Serverless ワークロードのインスツルメンテーションをセットアップするには、[Serverless Monitoring][1] を参照してください。

{{< card-grid card_width="170px" >}}
  {{< image-card href="/serverless/azure_database_messaging_services/azure_cosmosdb/" src="integrations_logos/azure_cosmosdb.png" alt="azure_cosmosdb" >}}
  {{< image-card href="/serverless/azure_database_messaging_services/azure_event_hubs/" src="integrations_logos/azure_event_hub.png" alt="azure_event_hubs" >}}
  {{< image-card href="/serverless/azure_database_messaging_services/azure_service_bus/" src="integrations_logos/azure_service_bus.png" alt="azure_service_bus" >}}
{{< /card-grid >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless