---
title: Azure Cosmos DBのServerless Monitoring
---
## 概要 {#overview}

Datadog APMは、Azure Cosmos DBのCRUD操作からトレースとトレースメトリクスを収集するために、**推論されたスパン**を使用します。これらのスパンは、フレームグラフとウォーターフォールビューに直接表示されます。Cosmos DBの分散トレーシングは、APMユーザー向けに既に提供されているインスツルメンテーションのみで機能するため、追加の設定は不要です。

{{< img src="serverless/azure_database_messaging/azure_cosmosdb/azure_cosmos_flame_graph.png" alt="Datadogフレームグラフは、分散.NETアプリケーションにおいて、Cosmos DBデータベーススパンとAPIおよびキュー処理スパンを併せて表示します。" style="width:100%;">}}

## サポート対象のランタイム{#supported-runtimes}

| ランタイム| 最小トレーサーバージョン| 最小Lambdaレイヤー| 最小Azure SDK|
|---|---|---|---|
| Python 3.10+ | dd-trace-py v4.8.0 | lambda-python v8.125.0 | azure-cosmos >= 4.9.0 |
| Node.js | dd-trace-js v5.105.0 | N/A | @azure/cosmos >= 4.4.1 |
| .NET | dd-trace-dotnet v3.36.0 | N/A | Microsoft.Azure.Cosmos.Client >= 3.12.0 |