---
title: Troubleshooting Data Streams Monitoring
description: Troubleshoot Data Streams Monitoring
---

{{% site-region region="gov,ap1" %}}
<div class="alert alert-warning">
    Data Streams Monitoring は、{{< region-param key="dd_site_name" >}} サイトでは使用できません。
</div>
{{% /site-region %}}


このページでは、データストリームモニタリングの設定と使用に関する一般的な問題と、その解決方法について説明します。Datadog は、各リリースに改善や修正が含まれているため、使用する Datadog トレーシングライブラリの最新版を入手することをお勧めします。

## 一般的な問題の診断
### DSM マップにサービスが表示されない

[設定方法][1]に従って設定しても、DSM マップや概要ページにサービスが表示されない場合は、以下の要件を満たしていることを確認してください。
* Datadog Agent v7.34.0 以降を実行している。
* サービスが Kafka または RabbitMQ から直接生成または消費を行っている。
* 以下のトレーシングライブラリ Agent のバージョンを実行している。
   * Java: Agent v1.9.0 以降
   * .NET: Tracer v2.28.0 以降 (.NET Core、.NET Framework)
   * Go (手動インスツルメンテーション): Data Streams Library v0.2 以降


### エンドツーエンドのレイテンシーのメトリクスが正確に見えない

経路上のレイテンシーを計算するには、経路を通過するメッセージがシングルスレッドであることが必要です。データパイプラインのメッセージがマルチスレッドである場合、手動インスツルメンテーションが必要であり、現在、[Go アプリケーション][2]と [Java アプリケーション][3]で利用できます。.NET 用の手動インスツルメンテーションが必要な場合は、[サポート][8]にお問い合わせください。

Pathways タブで、**latency values may be approximate for these pathways** (レイテンシーの値は、これらの経路の近似値である可能性があります) というメッセージが表示された場合、[インスツルメンテーションガイドライン][4]のドキュメントをご覧ください。


### Kafka メトリクスが見つからない
アプリケーションが Java で動作している場合、Java Agent のバージョン v1.9.0 以降を実行していること、およびプロデューサーとコンシューマーサービスの両方がインスツルメンテーションされていることを確認してください。

アプリケーションが .NET や Go で動作している場合、Kafka メトリクスを入力するためには、[Kafka Consumer インテグレーション][5]が必要です。

### RabbitMQ メトリクスが見つからない
[RabbitMQ インテグレーション][6]が正しく設定されていることを確認します。

### キューメトリクスが見つからない
Queue タブにメトリクスを入力するためには、セルフホスト、MSK、Confluent Platform/Cloud 環境で [Kafka インテグレーション][7]をセットアップする必要があります。

### クラスタータグが表示されない
クラスタータグは環境に応じて異なる設定になります。
* セルフホスティングの Kafka: Kafka ブローカーと同じクラスターで動作する Agent の構成に、`kafka_cluster` タグを追加し、キーに `kafka_cluster`、値にクラスター名を設定する必要があります。
* Amazon MSK: [MSK インテグレーション][9]がオンになっている場合、クラスター情報は DSM に自動的に伝播されます。MSK は DSM にクラスターを `cluster_name` として送信します。
* Confluent Cloud: DSM でインスツルメンテーションしたクラスターに [Confluent Cloud インテグレーション][10]が設定されていれば、クラスターの情報は DSM に自動的に伝播されます。
* Confluent Platform: 上記のセルフホスティング Kafka と同様に、`kafka_cluster` タグを Agent の構成に追加する必要があります。

[1]: /data_streams/#setup  
[2]: /data_streams/go/
[3]: https://github.com/DataDog/dd-trace-java/blob/76f25aedf70254cb04d55eedbed6e12921c6e509/dd-trace-api/src/main/java/datadog/trace/api/experimental/DataStreamsCheckpointer.java#L25
[4]: /data_streams/#setup
[5]: /integrations/kafka/?tab=host#kafka-consumer-integration
[6]: /integrations/rabbitmq/?tab=host
[7]: /integrations/kafka/?tab=host
[8]: /help/
[9]: https://docs.datadoghq.com/integrations/amazon_msk/ 
[10]: https://docs.datadoghq.com/integrations/confluent_cloud/
