---
title: メトリクスとタグ
---

このドキュメントでは、以下の Data Streams Monitoring メトリクスとそのタグについて説明します。

- `data_streams.latency`
- `data_streams.kafka.lag_seconds`
- `data_streams.kafka.lag_messages`

### data_streams.latency

このメトリクスは、パイプライン内の 2 点間のレイテンシーを測定します。値は、そのタグに応じて、異なるタイプのレイテンシーを表すことができます。

`pathway_type`
: メトリクスの値が表す情報。経路の種類は以下のとおりです。
  <br/>
  - `full`: パイプライン内のデータの起点 (`start`) と別のポイント (`end`) の間のエンド ツー エンドのレイテンシー
     - `start` タグ: データの起点
     - `end` タグ: データが最後に追跡された任意のポイント
  - `edge`: キュー経由、または HTTP/gRPC で直接接続された 2 つのサービス間のレイテンシー。プロデューサーにおける生成時刻 (`start`) とコンシューマーにおける消費時刻 (`end`) の間の経過時間を測定します。
     - `start` タグ: アップストリームのプロデューサー サービス
     - `end` タグ: ダウンストリームのコンシューマー サービス
  - `partial_edge`: プロデューサーまたはコンシューマーが不明な場合 (つまり、Data Streams Monitoring でインスツルメントされていない場合) における、サービスとキューの間のレイテンシー。
     - `start` タグ: アップストリームのプロデューサー サービス/キュー
     - `end` タグ: ダウンストリームのコンシューマー サービス/キュー
  - `internal`: サービス内のレイテンシー。_消費_オペレーションと次の_生成_オペレーションまでの時間を測定します。

`start`
: Data Streams Monitoring が最初にペイロードを検出したノードの名前。このノードは、サービス (元のプロデューサー) またはキュー (元のプロデューサーが Data Streams Monitoring に知られていない場合) になります。
  <br/><br/>
  `pathway_type` タグが `full` (エンド ツー エンドのレイテンシー) に設定されている場合、`start` は常にパイプラインの起点を指します。 
  <br/><br/>
  例: 
  <br/>
  {{< img src="data_streams/dsm_pipeline.png" alt="「サービス A」から「キュー A」→「サービス  B」→「キュー B」→「サービス C」と流れるパイプラインの図。" >}}
  <br/>
  クエリ `start:serviceA and end:serviceC and pathway_type:full` は、このパイプラインのエンドツーエンドのレイテンシーを測定します。
  <br/>
  サービス B を起点とするデータがないため、クエリ `start:serviceB and end:serviceC and pathway_type:full` は、このパイプラインのレイテンシーを測定**しません**。

`end`
: パイプラインが終了するノードの名前。`end` を使用して、部分的なパイプラインのデータを取得できます。
  <br/><br/>
  例: 
  <br/>
  {{< img src="data_streams/dsm_pipeline.png" alt="「サービス A」から「キュー A」→「サービス B」→「キュー B」→「サービス C」と流れるパイプラインの図。" >}}
  <br/>
  `start:serviceA and end:serviceB and pathway_type:full` を使用することで、このパイプラインの前半部分を測定することができます。
  <br/>

`service`
: データが収集されるサービスの名前。

`type`
: データ生成の対象となるキューイング技術の名前 (例: Kafka、RabbitMQ、SQS)。HTTP および gRPC の場合、`type` は `http` または `grpc` に設定されます。

`topic`
: データが生成または消費されるトピックの名前 (トピックが存在する場合のみ)。

`direction`
: 特定の `service` に対するデータフローの方向。取り得る値: 
  <br/>
  - `in`: 消費オペレーション、または HTTP/gRPC におけるデータ提供
  - `out`: 生成オペレーション、または HTTP/gRPC におけるデータ送信

`env`
: サービスが動作している環境

`pathway`
:`/` で区切られた、データが通過するサービスの順序付きリスト。データが同じサービスを複数回連続して通過する場合、サービス名は一度しか追加されません。

`detailed_pathway`
: `/` で区切られた、データが通過するサービスとキューの順序付きリスト。`pathway` と同じですが、サービスに加えてキューが含まれます。

`visited_queues`
: データが通過するすべてのキューを表します。(パイプラインの先頭または末尾にあるキューは除外されます。) データが複数のキューを通過する場合、このタグを使用してクエリをより具体的にできます。
  <br/><br/>
  次のパイプラインを考えてみましょう。
  <br/>
  {{< img src="data_streams/visited-queues-disambiguation.png" alt="「サービス A」から 2 つ (「キュー A」と「キュー B」) に分岐し、「サービス B」で統合されるパイプラインの図。" >}}
  <br/><br/>
  サービス A からキュー A 経由でサービス B に流れるデータ フローを測定するには、クエリ `start:serviceA and end:serviceB and visited_queues:queueA` を使用します。
  <br/>
  サービス A からキュー B 経由でサービス B に流れるデータ フローを測定するには、クエリ `start:serviceA and end:serviceB and visited_queues:queueB` を使用します。

`visited_services`
: データが通過するすべてのサービスを表します。(パイプラインの先頭または末尾にあるサービスは除外されます。)

`upstream_service`
: 特定の `service` のアップストリーム側にあるサービス名。

`exchange`
: RabbitMQ の場合、データの送信先のエクスチェンジ名。

`hash`
: さまざまなタグの値 (`type`、`service`、`direction`、`parent_hash` など) を用いて計算される一意の識別子。

`parent_hash`
: 経路上の当該ノードのアップストリーム側にあるノードの `hash`。

### data_streams.kafka.lag_seconds

このメトリクスは、最後の生成オペレーションと消費オペレーションの間のラグ (秒単位) を表します。

`partition`
: Kafka のパーティション。

`env`
: コンシューマー サービスが実行されている環境。

`topic`
: Kafka のトピック。

`consumer_group`
: Kafka のコンシューマー グループ。

### data_streams.kafka.lag_messages

このメトリクスは、最後の生成オペレーションと消費オペレーションの間のラグ (オフセット単位) を表します。

`partition`
: Kafka のパーティション

`env`
: コンシューマーサービスが実行されている環境。

`topic`
: Kafka のトピック。

`consumer_group`
: Kafka のコンシューマーグループ。