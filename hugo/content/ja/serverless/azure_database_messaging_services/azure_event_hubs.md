---
title: Azure Event HubsのServerless Monitoring
---
## 概要 {#overview}

Datadog APMは**推測されたスパン**を使用して、Azure Event Hubsからトレースとトレースメトリクスを収集します。これらのスパンはDatadogトレーサーSDKによって生成され、フレームグラフおよびウォーターフォールビューに直接表示されます。

PythonとNode.jsはプロデューサーをサポートし、.NETはプロデューサーとコンシューマーの両方をサポートします。Event Hubsの分散トレーシングでは、APMユーザーが既に実施しているインスツルメンテーション以外に追加の設定は不要です。

## サポートされているランタイム{#supported-runtimes}

| ランタイム| 最小トレーサーバージョン| 最小Lambdaレイヤー| 最小Azure SDK|
|---|---|---|---|
| Python 3.8/3.9（プロデューサーのみ）| dd-trace-py v3.17.0| lambda-python v3.19.6| azure-eventhub >= 5.12.2|
| Python 3.10+（プロデューサーのみ）| dd-trace-py v3.17.0| lambda-python v4.8.1| azure-eventhub >= 5.12.2|
| Node.js（プロデューサーのみ）| dd-trace-js v5.72.0| lambda-js v12.129.0| @azure/event-hubs >= 6.0.0|
| .NET（プロデューサー＆コンシューマー）| dd-trace-dotnet v3.30.0| N/A| Azure.Messaging.EventHubs >= 5.9.2|