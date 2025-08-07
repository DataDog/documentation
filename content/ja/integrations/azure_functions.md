---
app_id: azure_functions
categories:
- azure
- クラウド
- プロビジョニング
custom_kind: インテグレーション
description: Azure Functions のキーメトリクスを追跡。
title: Microsoft Azure Functions
---
## 概要

Azure Functions は、イベント駆動型のサーバーレスコンピューティングプラットフォームです。複雑なオーケストレーション問題も解決します。追加のセットアップなしでローカルでビルドおよびデバッグし、クラウドで大規模にデプロイおよび運用が可能なうえ、トリガーとバインドによりサービスを統合します。

Azure Functions からメトリクスを取得すると、以下のことができます。

- 関数のパフォーマンスと使用状況を視覚化。
- Azure Functions のパフォーマンスを他のアプリと関連付け。

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration](https://docs.datadoghq.com/integrations/azure/) first. There are no other installation steps.

## 収集データ

### メトリクス

| | |
| --- | --- |
| **azure.functions.average_memory_working_set** <br>(gauge) | Average memory working set<br>_Shown as byte_ |
| **azure.functions.average_response_time** <br>(gauge) | The average time taken for the app to serve requests, in seconds.<br>_Shown as second_ |
| **azure.functions.bytes_received** <br>(gauge) | Data In<br>_Shown as byte_ |
| **azure.functions.bytes_sent** <br>(gauge) | Data Out<br>_Shown as byte_ |
| **azure.functions.connections** <br>(gauge) | Connections<br>_Shown as connection_ |
| **azure.functions.current_assemblies** <br>(gauge) | Current Assemblies|
| **azure.functions.function_execution_count** <br>(count) | Function Execution Count|
| **azure.functions.function_execution_units** <br>(count) | Function Execution Units|
| **azure.functions.function_execution_units.max** <br>(count) | Maximum Function Execution Units (Max Aggregated)|
| **azure.functions.gen_0_garbage_collections** <br>(gauge) | Gen 0 Garbage Collections|
| **azure.functions.gen_1_garbage_collections** <br>(gauge) | Gen 1 Garbage Collections|
| **azure.functions.gen_2_garbage_collections** <br>(gauge) | Gen 2 Garbage Collections|
| **azure.functions.handle_count** <br>(count) | Handle Count|
| **azure.functions.http101** <br>(count) | The count of requests resulting in an HTTP status code 101.|
| **azure.functions.http2xx** <br>(count) | The count of requests resulting in an HTTP status code = 200 but \< 300.|
| **azure.functions.http3xx** <br>(count) | The count of requests resulting in an HTTP status code = 300 but \< 400.|
| **azure.functions.http401** <br>(count) | The count of requests resulting in HTTP 401 status code.|
| **azure.functions.http403** <br>(count) | The count of requests resulting in HTTP 403 status code.|
| **azure.functions.http404** <br>(count) | The count of requests resulting in HTTP 404 status code.|
| **azure.functions.http406** <br>(count) | The count of requests resulting in HTTP 406 status code.|
| **azure.functions.http4xx** <br>(count) | The count of requests resulting in an HTTP status code = 400 but \< 500.|
| **azure.functions.http5xx** <br>(count) | Http Server Errors|
| **azure.functions.io_other_bytes_per_second** <br>(rate) | IO Other Bytes Per Second<br>_Shown as byte_ |
| **azure.functions.io_other_operations_per_second** <br>(rate) | IO Other Operations Per Second|
| **azure.functions.io_read_bytes_per_second** <br>(rate) | IO Read Bytes Per Second<br>_Shown as byte_ |
| **azure.functions.io_read_operations_per_second** <br>(rate) | IO Read Operations Per Second|
| **azure.functions.io_write_bytes_per_second** <br>(rate) | IO Write Bytes Per Second<br>_Shown as byte_ |
| **azure.functions.io_write_operations_per_second** <br>(rate) | IO Write Operations Per Second|
| **azure.functions.memory_working_set** <br>(gauge) | Memory working set<br>_Shown as byte_ |
| **azure.functions.private_bytes** <br>(gauge) | Private Bytes<br>_Shown as byte_ |
| **azure.functions.requests_in_application_queue** <br>(count) | Requests In Application Queue<br>_Shown as request_ |
| **azure.functions.thread_count** <br>(count) | Thread Count|
| **azure.functions.total_app_domains** <br>(gauge) | Total App Domains|
| **azure.functions.total_app_domains_unloaded** <br>(gauge) | Total App Domains Unloaded|
| **azure.functions.file_system_usage** <br>(gauge) | Percentage of filesystem quota consumed by the app.<br>_Shown as byte_ |
| **azure.functions.health_check_status** <br>(gauge) | Health check status.|
| **azure.functions.response_time** <br>(gauge) | The time taken for the app to serve requests, in seconds.<br>_Shown as second_ |
| **azure.functions.requests** <br>(count) | The total number of requests regardless of their resulting HTTP status code.|
| **azure.functions.count** <br>(gauge) | The count of azure functions resources|

### イベント

Azure Functions インテグレーションには、イベントは含まれません。

### サービス チェック

Azure Functions インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。