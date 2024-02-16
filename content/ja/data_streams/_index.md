---
cascade:
  algolia:
    rank: 70
further_reading:
- link: /integrations/kafka/
  tag: ドキュメント
  text: Kafka インテグレーション
- link: /integrations/amazon_sqs/
  tag: ドキュメント
  text: Amazon SQS インテグレーション
- link: /tracing/service_catalog/
  tag: Documentation
  text: サービスカタログ
- link: https://www.datadoghq.com/blog/data-streams-monitoring/
  tag: ブログ
  text: Datadog Data Streams Monitoring でストリーミングデータパイプラインのパフォーマンスを追跡し、改善する
- link: https://www.datadoghq.com/blog/data-streams-monitoring-apm-integration/
  tag: ブログ
  text: Datadog Data Streams Monitoring で APM から直接ストリーミングデータパイプラインをトラブルシューティングする
kind: documentation
title: データストリーム モニタリング
---


{{% site-region region="gov,ap1" %}}
<div class="alert alert-warning">
    Data Streams Monitoring は、{{< region-param key="dd_site_name" >}} サイトでは使用できません。
</div>
{{% /site-region %}}

{{< img src="data_streams/data_streams_hero_feature.jpg" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

Data Streams Monitoring は、大規模なパイプラインを理解し管理するための標準的な方法を提供し、以下を容易にします。
* システム内を通過するイベントのエンドツーエンドのレイテンシーでパイプラインの健全性を測定します。
* 障害のあるプロデューサー、コンシューマー、キューを特定し、関連するログやクラスターにピボットして、トラブルシューティングを迅速に行います。
* バックアップされたイベントがダウンストリームのサービスを圧倒するのを阻止するために、サービスオーナーが装備することによって、連鎖的な遅延を防止します。

## 計画と使用

まずは、インストールの説明に従って、Data Streams Monitoring でサービスを構成してください。

{{< partial name="data_streams/setup-languages.html" >}}

<br/>

| ランタイム | 対応テクノロジー |
|---|----|
| Java/Scala | Kafka (セルフホスティング、Amazon MSK、Confluent Cloud / Platform)、RabbitMQ、HTTP、gRPC、Amazon SQS |
| ブラウザエラーの収集 | Kafka (セルフホスティング、Amazon MSK、Confluent Cloud / Platform)、Amazon SQS |
| Android および AndroidTV のモニタリング | Kafka (セルフホスティング、Amazon MSK、Confluent Cloud / Platform)、RabbitMQ |
| .NET | Kafka (セルフホスティング、Amazon MSK、Confluent Cloud / Platform) |
| 収集データ | 全て ([手動インスツルメンテーション][1]で) |


## Data Streams Monitoring の調査

### 新しいメトリクスでエンドツーエンドのパイプラインの健全性を測定する

Data Streams Monitoring を構成すると、非同期システム内の任意の 2 点間をイベントが通過するのにかかる時間を測定することができます。

| メトリクス名 | 注目タグ | 説明 |
|---|---|-----|
| data_streams.latency | `start`、`end`、`env` | 指定された送信元から宛先までの経路のエンドツーエンドのレイテンシー |
| data_streams.kafka.lag_seconds | `consumer_group`、`partition`、`topic`、`env` | プロデューサーとコンシューマーとの間のラグ (秒単位)。Java Agent v1.9.0 以降が必要。 |

また、これらのメトリクスを任意のダッシュボードやノートブックでグラフ化し、視覚化することができます。

{{< img src="data_streams/data_streams_monitor.jpg" alt="Datadog Data Streams Monitoring モニター" style="width:100%;" >}}

### あらゆる経路のエンドツーエンドのレイテンシーを監視する

イベントがシステム内をどのように通過するかによって、異なる経路でレイテンシーが増加する可能性があります。**Pathways** タブでは、キュー、プロデューサー、コンシューマーを含むパイプラインの任意の 2 点間のレイテンシーを表示し、ボトルネックの特定とパフォーマンスの最適化を行うことができます。経路のモニターを簡単に作成したり、ダッシュボードにエクスポートすることができます。

{{< img src="data_streams/data_streams_pathway.jpg" alt="Datadog Data Streams Monitoring の Pathway タブ" style="width:100%;" >}}

### 受信したメッセージを任意のキュー、サービス、クラスターに属性付けする

消費型サービスでの遅延の増加、Kafka ブローカーでのリソース使用の増加、RabbitMQ または Amazon SQS のキューサイズの増加は、隣接するサービスがこれらのエンティティに生成またはエンティティから消費する方法の変更によって、頻繁に説明されます。

Data Streams Monitoring の任意のサービスやキューで **Throughput** タブをクリックすると、スループットの変化と、その変化がどの上流または下流のサービスに起因するものかを迅速に検出できます。[サービスカタログ][2]を構成すると、対応するチームの Slack チャンネルやオンコールエンジニアにすぐにピボットすることができます。

単一の Kafka、RabbitMQ または Amazon SQS のクラスターにフィルターをかけることで、そのクラスター上で動作するすべての検出されたトピックまたはキューについて、送受信トラフィックの変化を検出することができます。

{{< img src="data_streams/data_streams_throughput.jpg" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

### インフラストラクチャー、ログ、トレースから根本原因を特定するために素早くピボットする

Datadog は、[統合サービスタグ付け][3]を通して、サービスを駆動するインフラストラクチャーと関連するログを自動的にリンクするので、ボトルネックを簡単に特定することができます。経路のレイテンシーやコンシューマーの遅延が増加した理由をさらにトラブルシューティングするには、**Infra** または **Logs** タブをクリックします。経路内のトレースを表示するには、**Processing Latency** タブをクリックします。

{{< img src="data_streams/data_streams_infra.jpg" alt="Datadog Data Streams Monitoring の Infra タブ" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/data_streams/go#manual-instrumentation
[2]: /ja/tracing/service_catalog/
[3]: /ja/getting_started/tagging/unified_service_tagging