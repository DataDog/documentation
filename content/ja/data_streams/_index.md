---
further_reading:
- link: /integrations/kafka/
  tag: ドキュメント
  text: Kafka インテグレーション
- link: /tracing/service_catalog/
  tag: ドキュメント
  text: サービスカタログ
kind: documentation
title: データストリーム モニタリング
---

<div class="alert alert-warning">
このページで取り上げている機能は公開ベータ版です。
</div>

{{% site-region region="gov,ap1" %}}
<div class="alert alert-warning">
    Data Streams Monitoring は、{{< region-param key="dd_site_name" >}} サイトでは使用できません。
</div>
{{% /site-region %}}

{{< img src="data_streams/data_streams_hero.png" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

Data Streams Monitoring は、大規模なパイプラインを理解し管理するための標準的な方法を提供し、以下を容易にします。
* システム内を通過するイベントのエンドツーエンドのレイテンシーでパイプラインの健全性を測定します。
* 障害のあるプロデューサー、コンシューマー、キューを特定し、関連するログやクラスターにピボットして、トラブルシューティングを迅速に行います。
* バックアップされたイベントがダウンストリームのサービスを圧倒するのを阻止するために、サービスオーナーが装備することによって、連鎖的な遅延を防止します。

## セットアップ

まずは、インストールの説明に従って、Data Streams Monitoring でサービスを構成してください。

{{< partial name="data_streams/setup-languages.html" >}}

<br/>

| ランタイム | 対応テクノロジー |
|---|----|
| Java | Kafka (セルフホスティング、Amazon MSK、Confluent Cloud / Platform)、RabbitMQ、HTTP、gRPC |
| Go | 全て ([手動インスツルメンテーション][1]で) |
| .NET | Kafka (セルフホスティング、Amazon MSK) |


## Data Streams Monitoring の調査

### 新しいメトリクスでエンドツーエンドのパイプラインの健全性を測定する

Data Streams Monitoring を構成すると、非同期システム内の任意の 2 点間をイベントが通過するのにかかる時間を測定することができます。

| メトリクス名 | 注目タグ | 説明 |
|---|---|-----|
| dd.stream.edge_latency | `service`、`upstream_service`、`topic`、`partition` | クライアントでメッセージを生成してから、コンシューマーサービスでメッセージを受信するまでの経過時間。 |
| dd.stream.latency_from_origin | `service`、`upstream_service`、`hash` | メッセージを発信してから、選択したサービスでメッセージを受信するまでの経過時間。 |
| dd.stream.kafka.lag_seconds | `consumer_group`、`partition`、`topic`、`env` | コンシューマーとブローカとの間のラグ (秒単位)。Java Agent v1.9.0 以降が必要。 |

Datadog では、Data Streams Monitoring で任意のサービスの **Pipeline SLOs** タブを使用して、エンドツーエンドのレイテンシーに関する SLO またはモニターを作成することを推奨しています。

{{< img src="data_streams/data_streams_create_slo.png" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

また、これらのメトリクスを任意のダッシュボードやノートブックでグラフ化し、視覚化することができます。

{{< img src="data_streams/data_streams_edge_latency.png" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

### 受信したメッセージを任意のキュー、サービス、クラスターに属性付けする

消費型サービスでの遅延の増加、Kafka ブローカーでのリソース使用の増加、RabbitMQ キューサイズの増加は、隣接するサービスがこれらのエンティティに生成またはエンティティから消費する方法の変更によって、頻繁に説明されます。

{{< img src="data_streams/data_streams_throughput_tab.png" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

Data Streams Monitoring の任意のサービスやキューで **Throughput** タブをクリックすると、スループットの変化と、その変化がどの上流または下流のサービスに起因するものかを迅速に検出できます。[サービスカタログ][2]を構成すると、対応するチームの Slack チャンネルやオンコールエンジニアにすぐにピボットすることができます。

単一の Kafka または RabbitMQ クラスターにフィルターをかけることで、そのクラスター上で動作するすべての検出されたトピックまたはキューについて、送受信トラフィックの変化を検出することができます。

{{< img src="data_streams/data_streams_cluster_throughput.png" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

### パイプラインの健全性から最も遅い個別メッセージへのピボット

パイプラインの遅延は、コンシューマーサービス内でのメッセージ処理のレイテンシーの増大が原因である場合もあります。デプロイの欠陥やメッセージ形式の予期せぬ変更により、エンドツーエンドのレイテンシーの急上昇が引き起こされる可能性があります。

{{< img src="data_streams/data_streams_service_health_tab.png" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

Data Streams Monitoring 内の任意のサービスの **Service Health** タブをクリックすると、処理のレイテンシーの変化を素早く検知し、どのタイプのメッセージが影響を受けているかを特定し、このサービスによって処理される最も遅い個別メッセージにピボットできます。

**注:** この機能は現在 Java でのみサポートされており、Java Agent v1.6.0 以降で APM を有効にしておく必要があります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/data_streams/go#manual-instrumentation
[2]: /ja/tracing/service_catalog/