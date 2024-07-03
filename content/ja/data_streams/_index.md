---
cascade:
  algolia:
    rank: 70
further_reading:
- link: /integrations/kafka/
  tag: Documentation
  text: Kafka Integration
- link: /integrations/amazon_sqs/
  tag: Documentation
  text: Amazon SQS Integration
- link: /tracing/service_catalog/
  tag: Documentation
  text: Service Catalog
- link: https://www.datadoghq.com/blog/data-streams-monitoring/
  tag: Blog
  text: Track and improve the performance of streaming data pipelines with Datadog
    Data Streams Monitoring
- link: https://www.datadoghq.com/blog/data-streams-monitoring-apm-integration/
  tag: Blog
  text: Troubleshoot streaming data pipelines directly from APM with Datadog Data
    Streams Monitoring
- link: https://www.datadoghq.com/blog/data-streams-monitoring-sqs/
  tag: Blog
  text: Monitor SQS with Data Streams Monitoring
title: Data Streams Monitoring
---


{{% site-region region="gov,ap1" %}}
<div class="alert alert-warning">
    Data Streams Monitoring は、{{< region-param key="dd_site_name" >}} サイトでは使用できません。
</div>
{{% /site-region %}}

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
| Java/Scala | Kafka (セルフホスティング、Amazon MSK、Confluent Cloud / Platform)、RabbitMQ、HTTP、gRPC、Amazon SQS |
| Python | Kafka (セルフホスティング、Amazon MSK、Confluent Cloud / Platform)、RabbitMQ、Amazon SQS |
| .NET | Kafka (セルフホスティング、Amazon MSK、Confluent Cloud / Platform)、RabbitMQ、Amazon SQS |
| Node.js | Kafka (セルフホスティング、Amazon MSK、Confluent Cloud / Platform)、RabbitMQ、Amazon SQS |
| Go | 全て ([手動インスツルメンテーション][1]で) |

## Data Streams Monitoring の調査

### 新しいメトリクスでエンドツーエンドのパイプラインの健全性を測定する

Data Streams Monitoring を構成すると、非同期システム内の任意の 2 点間をイベントが通過するのにかかる時間を測定することができます。

| メトリクス名 | 注目タグ | 説明 |
|---|---|-----|
| data_streams.latency | `start`、`end`、`env` | 指定された送信元から宛先までの経路のエンドツーエンドのレイテンシー。 |
| data_streams.kafka.lag_seconds | `consumer_group`、`partition`、`topic`、`env` | プロデューサーとコンシューマーとの間のラグ (秒単位)。Java Agent v1.9.0 以降が必要。 |
| data_streams.payload_size | `consumer_group`、`topic`、`env` | 着信および発信のスループット (バイト単位)。|


また、これらのメトリクスを任意のダッシュボードやノートブックでグラフ化し、視覚化することができます。

{{< img src="data_streams/data_streams_metric_monitor.png" alt="Datadog Data Streams Monitoring モニター" style="width:100%;" >}}

### あらゆる経路のエンドツーエンドのレイテンシーを監視する

イベントがシステム内をどのように通過するかによって、異なる経路でレイテンシーが増加する可能性があります。[**Measure** タブ][7]では、測定開始地点のサービスと終了地点のサービスを選択し、エンドツーエンドのレイテンシー情報を取得し、ボトルネックの特定とパフォーマンスの最適化を行うことができます。その経路のモニターを簡単に作成したり、ダッシュボードにエクスポートすることができます。

あるいは、サービスをクリックして詳細なサイドパネルを開き、**Pathways** タブを表示して、サービスとアップストリームサービス間のレイテンシーを確認します。

### イベント駆動型アプリケーションの速度低下にアラートを設定する

コンシューマーラグや古いメッセージの増加によって引き起こされる速度低下は、連鎖的な不具合につながり、ダウンタイムが増加する可能性があります。すぐに使えるアラートを利用することで、パイプラインのどこでボトルネックが発生しているかを特定し、すぐに対応することができます。補助的なメトリクスとして、Datadog は [Kafka][4] や [SQS][5] などのメッセージキューテクノロジーに対応した追加のインテグレーションを提供しています。

Data Stream Monitoring のすぐに使える推奨モニターを通じて、コンシューマーラグ、スループット、レイテンシーなどのメトリクスに関するモニターをワンクリックで設定できます。

{{< img src="data_streams/add_monitors_and_synthetic_tests.png" alt="Datadog Data Streams Monitoring 推奨モニター" style="width:100%;" caption="「Add Monitors and Synthetic Tests」をクリックすると、推奨モニターが表示されます" >}}

### 受信したメッセージを任意のキュー、サービス、クラスターに属性付けする

消費型サービスでの遅延の増加、Kafka ブローカーでのリソース使用の増加、RabbitMQ または Amazon SQS のキューサイズの増加は、隣接するサービスがこれらのエンティティに生成またはエンティティから消費する方法の変更によって、頻繁に説明されます。

Data Streams Monitoring の任意のサービスやキューで **Throughput** タブをクリックすると、スループットの変化と、その変化がどの上流または下流のサービスに起因するものかを迅速に検出できます。[サービスカタログ][2]を構成すると、対応するチームの Slack チャンネルやオンコールエンジニアにすぐにピボットすることができます。

単一の Kafka、RabbitMQ または Amazon SQS のクラスターにフィルターをかけることで、そのクラスター上で動作するすべての検出されたトピックまたはキューについて、送受信トラフィックの変化を検出することができます。

### インフラストラクチャー、ログ、トレースから根本原因を特定するために素早くピボットする

Datadog は、[統合サービスタグ付け][3]を通して、サービスを駆動するインフラストラクチャーと関連するログを自動的にリンクするので、ボトルネックを簡単に特定することができます。経路のレイテンシーやコンシューマーの遅延が増加した理由をさらにトラブルシューティングするには、**Infra**、**Logs**、または **Traces** タブをクリックします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/data_streams/go#manual-instrumentation
[2]: /ja/tracing/service_catalog/
[3]: /ja/getting_started/tagging/unified_service_tagging
[4]: /ja/integrations/kafka/
[5]: /ja/integrations/amazon_sqs/
[6]: /ja/tracing/trace_collection/runtime_config/
[7]: https://app.datadoghq.com/data-streams/measure