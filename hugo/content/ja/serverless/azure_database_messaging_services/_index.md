---
title: Azureデータベースおよびメッセージングサービス
---
## 概要 {#overview}

Datadog APMは、Azure Cosmos DB、Event Hubs、およびService Busからトレースとトレースメトリクスを収集するために、**推測されたスパン**を使用します。推測されたスパンは、Azure上で実行されているDatadogでインスツルメンテーションされたサービスのフレームグラフおよびウォーターフォールビューに自動的に表示されます。追加の設定は必要ありません。Azure Serverlessワークロードのインスツルメンテーションを設定するには、[Serverless Monitoring][1]を参照してください。

{{< card-grid card_width="170px" >}}
  {{< image-card href="azure_cosmosdb/" src="integrations_logos/azure_cosmosdb.png" alt="azure_cosmosdb" >}}
  {{< image-card href="azure_event_hubs/" src="integrations_logos/azure_event_hub.png" alt="azure_event_hubs" >}}
  {{< image-card href="azure_service_bus/" src="integrations_logos/azure_service_bus.png" alt="azure_service_bus" >}}
{{< /card-grid >}}

[1]: /ja/serverless