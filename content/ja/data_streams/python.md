---
further_reading:
- link: /integrations/kafka/
  tag: Documentation
  text: Kafka インテグレーション
- link: /tracing/service_catalog/
  tag: Documentation
  text: サービスカタログ
title: Data Streams Monitoring for Python のセットアップ
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">Data Streams Monitoring は、AP1 リージョンではサポートされていません。</a></div>
{{< /site-region >}}

### 前提条件

Data Streams Monitoring を開始するには、Datadog Agent と Python ライブラリの最新バージョンが必要です。
* [Datadog Agent v7.34.0 以降][1]
* [Python Tracer][2]
  * Kafka: v1.16.0 以上
  * Amazon SQS および Amazon Kinesis: v1.20.0
  * RabbitMQ: v2.6.0 以上

### インストール

Python は自動インスツルメンテーションを使用して、Data Streams Monitoring がエンドツーエンドのレイテンシーやキューとサービス間の関係を測定するために必要な追加のメタデータを挿入し抽出します。Data Streams Monitoring を有効にするには、Kafka にメッセージを送信する (またはメッセージを消費する) サービス上で `DD_DATA_STREAMS_ENABLED` 環境変数を `true` に設定します。

例:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

### サポートされるライブラリ
Data Streams Monitoring は、[confluent-kafka ライブラリ][3]と [kombu パッケージ][5]をサポートしています。

### SQS パイプラインの監視
Data Streams Monitoring は、SQS キューを通るメッセージのパスを追跡するために 1 つの[メッセージ属性][4]を使用します。Amazon SQS にはメッセージごとに許可されるメッセージ属性が最大 10 個という制限があるため、すべてのメッセージをデータパイプラインを通じてストリーミングする際には、設定するメッセージ属性を 9 個以下にして、残りの 1 つの属性を Data Streams Monitoring のために残しておく必要があります。

### Kinesis パイプラインの監視
Kinesis にはメッセージ属性がないため、コンテキストを伝播してメッセージが Kinesis ストリームを通る完全なパスを追跡することができません。その結果、Data Streams Monitoring のエンドツーエンドのレイテンシーメトリクスは、メッセージのパス上のセグメントごとのレイテンシー (プロデューサーサービスから Kinesis ストリームを経由し、コンシューマーサービスに至るまでのレイテンシー) を合計して近似されます。スループットメトリクスも、プロデューサーサービスから Kinesis ストリームを経てコンシューマーサービスに至るまでのセグメントに基づいています。それでも、サービスにインスツルメンテーションを施すことで、データストリームの完全なトポロジーを視覚化することが可能です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent
[2]: /ja/tracing/trace_collection/dd_libraries/python
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[5]: https://pypi.org/project/kombu/