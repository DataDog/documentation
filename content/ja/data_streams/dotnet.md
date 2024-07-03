---
title: Setup Data Streams Monitoring for .NET
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">Data Streams Monitoring は、AP1 リージョンではサポートされていません。</a></div>
{{< /site-region >}}

### 前提条件

Data Streams Monitoring を開始するには、Datadog Agent と .NET ライブラリの最新バージョンが必要です。
* [Datadog Agent v7.34.0 以降][1]
* .NET Tracer ([.NET Core][2]、[.NET Framework][3])
  * Kafka および RabbitMQ: v2.28.0 以降
  * Amazon SQS: v2.48.0

### インストール

.NET は自動インスツルメンテーションを使用して、Data Streams Monitoring がエンドツーエンドのレイテンシーやキューとサービス間の関係を測定するために必要な追加のメタデータを挿入し抽出します。Data Streams Monitoring を有効にするには、Kafka または RabbitMQ にメッセージを送信する (またはメッセージを消費する) サービス上で `DD_DATA_STREAMS_ENABLED` 環境変数を `true` に設定します。

例:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```
### サポートされるライブラリ
Data Streams Monitoring は、[confluent-kafka ライブラリ][4]をサポートしています。

### SQS パイプラインの監視
Data Streams Monitoring は、1 つの[メッセージ属性][5]を使用して、SQS キューを通過するメッセージの経路を追跡します。Amazon SQS は、メッセージごとに許可されるメッセージ属性の上限が 10 個であるため、データパイプラインを通じてストリーミングされるすべてのメッセージには、9 個以下のメッセージ属性が設定されている必要があり、残りの属性は Data Streams Monitoring に使用できます。


[1]: /ja/agent
[2]: /ja/tracing/trace_collection/dd_libraries/dotnet-core
[3]: /ja/tracing/trace_collection/dd_libraries/dotnet-framework
[4]: https://pypi.org/project/confluent-kafka/
[5]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html