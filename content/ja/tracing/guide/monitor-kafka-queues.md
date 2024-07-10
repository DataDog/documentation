---
further_reading:
- link: /tracing/trace_collection
  tags: ドキュメント
  text: トレース収集の設定
- link: /integrations/kafka
  tags: ドキュメント
  text: Kafka インテグレーション
- link: /data_streams/
  tags: ドキュメント
  text: データストリーム モニタリング
title: Kafka キューの監視
---

## 概要

イベント駆動型パイプラインでは、Kafka のようなキューイングやストリーミングの技術は、システムの正常な演算子として不可欠です。このような環境では、多くのテクノロジーやチームが関与しているため、メッセージの信頼性とサービス間の迅速な伝達を確保することが困難な場合があります。Datadog Kafka インテグレーションと APM は、インフラストラクチャーとパイプラインの健全性と効率性を監視することを可能にします。

### Kafka インテグレーション

[Datadog Kafka インテグレーション][1]を使用して、クラスターのパフォーマンスをリアルタイムで視覚化し、Kafka のパフォーマンスを他のアプリケーションと相関させることができます。Datadog は、[MSK インテグレーション][2]も提供しています。

{{< img src="tracing/guide/monitor_kafka_queues/kafka_dashboard.png" alt="Kafka ダッシュボード">}}

### Data Stream Monitoring

[Datadog Data Streams Monitoring][3] は、パイプラインの健全性と、システムを通過するイベントのエンドツーエンドのレイテンシーを測定するための標準的な方法を提供します。Data Streams Monitoring が提供する深い可視性により、パイプラインの遅延や遅れを引き起こしている不良のプロデューサー、コンシューマー、またはキューを正確に特定することが可能になります。ブロックされたメッセージ、ホットパーティション、オフラインのコンシューマーなど、デバッグが困難なパイプラインの問題を発見することができます。また、関連するインフラストラクチャーやアプリのチーム間でシームレスに連携することができます。

{{< img src="tracing/guide/monitor_kafka_queues/dash-2022-data-streams-compressed-blurb.mp4" alt="Data Streams Monitoring のデモ" video="true">}}

### 分散型トレース

APM の分散型トレーシングは、リクエスト量とレイテンシーを測定することにより、サービスのパフォーマンスに対する可視性を拡大します。グラフやアラートを作成して APM データを監視し、下図のようなフレームグラフで 1 つのリクエストのアクティビティを視覚化して、レイテンシーやエラーの原因をより深く理解することができます。

{{< img src="tracing/guide/monitor_kafka_queues/kafka_trace.png" alt="Kafka コンシューマースパン" >}} 

APM は、Kafka クライアントとのリクエストを自動的にトレースすることができます。これは、ソースコードを変更することなくトレースを収集できることを意味します。Datadog は、プロデューサーからコンシューマーにトレースのコンテキストを伝播するように、Kafka メッセージのヘッダーを挿入します。

対応する Kafka ライブラリは、[互換性ページ][4]でご確認ください。

#### セットアップ

Kafka アプリケーションをトレースするために、Datadog は Kafka SDK 内のプロデュースおよびコンシューマーコールをトレースします。そのため、Kafka を監視するためには、サービス上で APM をセットアップする必要があるだけです。APM と分散型トレーシングを始めるためのガイダンスとして、[APM トレース収集ドキュメント][5]を参照してください。

## APM でアプリケーションを監視する

古典的な Kafka のセットアップでは、プロデューサースパン、および子としてコンシューマースパンを持つトレースが表示されます。消費側でトレースを生成するすべての作業は、コンシューマースパンの子スパンによって表現されます。各スパンは `messaging` というプレフィックスを持つタグのセットを持っています。次の表は、Kafka スパンで見つけることができるタグを説明しています。

<div class="alert alert-info">
  <div class="alert-info">
    <div>Datadog のスパンメタデータをよりグローバルに理解するには、<a href="/tracing/trace_collection/tracing_naming_convention">スパンタグのセマンティクス</a>をお読みください</strong>。</div>
  </div>
</div>

| **名前**                         | **型** | **説明**                                                                                                     |
|----------------------------------|----------|---------------------------------------------------------------------------------------------------------------------|
| `messaging.system`               | `string` | `Kafka`                                                                                                             |
| `messaging.destination`          | `string` | メッセージの送信先となるトピック。                                                                                   |
| `messaging.destination_kind`     | `string` | `Queue`                                                                                                             |
| `messaging.protocol`             | `string` | トランスポートプロトコルの名前。                                                                                 |
| `messaging.protocol_version`     | `string` | トランスポートプロトコルのバージョン。                                                                              |
| `messaging.url`                  | `string` | メッセージングシステムへの接続文字列。                                                                      |
| `messaging.message_id`           | `string` | メッセージングシステムがメッセージの識別子として使用する値で、文字列として表される。                     |
| `messaging.conversation_id`      | `string` | メッセージが属する会話の ID で、文字列として表現される。             |
| `messaging.message_payload_size` | `number` | 圧縮されていないメッセージペイロードのサイズ (バイト数)。                                                              |
| `messaging.operation`            | `string` | 消費メッセージの種類を示す文字列。 <br>例: `send` (プロデューサーに送るメッセージ)、`receive` (コンシューマーが受け取るメッセージ)、または `process` (以前に受け取ったメッセージをコンシューマーが処理する)。                                                                |
| `messaging.consumer_id`          | `string` | 両方が存在する場合は `{messaging.kafka.consumer_group} - {messaging.kafka.client_id}`。<br>両方が存在しない場合は `messaging.kafka.consumer_group`。                                                                                                                                                                |
| `messaging.kafka.message_key`    | `string` |  Kafka のメッセージキーは、同じメッセージをグループ化し、同じパーティションで処理されるようにするために使用されます。<br>メッセージキーは `messaging.message_id` とは異なり、一意ではありません。                                                                                                             |
| `messaging.kafka.consumer_group` | `string` |  メッセージを処理する Kafka コンシューマーグループの名前。コンシューマーにのみ適用され、プロデューサーには適用されない。
| `messaging.kafka.client_id`      | `string` |  メッセージを処理するコンシューマーまたはプロデューサーのクライアント ID。                                               |
| `messaging.kafka.partition`      | `string` |  メッセージの送信先となるパーティション。                                                                                  |
| `messaging.kafka.tombstone`      | `string` |  メッセージが tombstone である場合に真となるブール値。                                                              |
| `messaging.kafka.client_id`      | `string` |  メッセージを処理するコンシューマーまたはプロデューサーのクライアント ID。                                               |

## 特殊な使用例

{{< tabs >}}

{{% tab "Java" %}}

Datadog Kafka インテグレーションは、Header API をサポートする Kafka バージョン 0.11+ で動作します。この API は、トレースコンテキストの挿入と抽出に使用されます。バージョンが混在する環境を実行する場合、Kafka ブローカーは、Kafka の新しいバージョンを誤って報告することがあります。これは、トレーサーがローカルプロデューサーによってサポートされていないヘッダーを挿入しようとしたときに問題が発生します。さらに、ヘッダーが存在するため、古いコンシューマーはメッセージを消費することができません。これらの問題を防ぐには、0.11 より古いバージョンの Kafka が混在する環境を実行する場合、環境変数 `DD_KAFKA_CLIENT_PROPAGATION_ENABLED=false` でコンテキストの伝搬を無効化します。

{{< /tabs >}}

{{% tab ".NET" %}}

[Kafka .NET Client ドキュメント][1]によると、典型的な Kafka コンシューマーアプリケーションは、Consume ループが中心で、Consume メソッドを繰り返し呼び出してレコードを 1 つずつ取得するとあります。`Consume` メソッドは、システムに対してメッセージをポーリングします。したがって、デフォルトでは、コンシューマースパンはメッセージが返されたときに作成され、次のメッセージを消費する前に終了します。スパンの長さは、あるメッセージを消費してから次のメッセージを消費するまでの計算を代表するものです。

メッセージを完全に処理してから次のメッセージを消費する場合、あるいは複数のメッセージを一度に消費する場合、消費するアプリケーションで `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` を `false` に設定することができます。この設定が `false` の場合、コンシューマースパンが作成され、すぐに閉じられます。トレースする子スパンがある場合は、[.NET カスタムインストルメンテーションのヘッダー抽出と挿入のドキュメント][2]に従って、トレースコンテキストを抽出してください。

.NET トレーサーは [v1.27.0][3] から Confluent.Kafka をトレースできるようになりました。トレースコンテキスト伝搬 API は [v2.7.0][4] から利用可能です。

[1]: https://docs.confluent.io/kafka-clients/dotnet/current/overview.html#the-consume-loop
[2]: /ja/tracing/trace_collection/custom_instrumentation/dotnet/#headers-extraction-and-injection
[3]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.27.0
[4]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.7.0
{{< /tabs >}}

{{% tab "Ruby" %}}

Kafka インテグレーションでは、`ruby-kafka` gem のトレーシング機能を提供しています。[Ruby のトレーサードキュメント][1]に従って有効化してください。

[1]: /ja/tracing/trace_collection/dd_libraries/ruby/#kafka
{{< /tabs >}}

{{< /tabs >}}

### Kafka のトレースを無効にする

アプリケーションの Kafka トレースを無効にしたい場合は、`DD_TRACE_KAFKA_ENABLED` 設定を `false` に設定します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/kafka
[2]: /ja/integrations/amazon_msk/
[3]: https://app.datadoghq.com/data-streams/onboarding
[4]: /ja/tracing/trace_collection/compatibility/
[5]: /ja/tracing/trace_collection/