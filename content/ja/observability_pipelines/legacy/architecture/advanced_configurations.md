---
title: (LEGACY) Advanced Configurations
aliases:
  - /observability_pipelines/architecture/advanced_configurations/
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

<div class="alert alert-info">
This guide is for large-scale production-level deployments.
</div>

### Multiple aggregator deployments

As covered in [Networking][1], Datadog recommends to start with one Observability Pipelines Worker aggregator per region. This is to prevent overcomplicating your initial deployment of Observability Pipelines Worker, but there are circumstances where starting with multiple deployments is ideal:

1. **Prevent sending data over the public internet.** If you have multiple clouds and regions, deploy the Observability Pipelines Worker aggregator in each of them to prevent sending large amounts of data over the internet. Your Observability Pipelines Worker aggregator should receive internal data and serve as the single point of egress for your network.

2. **Independent management.** You have teams that can operate and manage an Observability Pipelines Worker aggregator independently for their use case. For example, your Data Science team may be responsible for operating their own infrastructure and has the means to independently operate their own Observability Pipelines Worker aggregator.

### 複数のクラウドアカウント

Many users have multiple cloud accounts with VPCs and clusters inside. Datadog still recommends in this case to deploy one Observability Pipelines Worker aggregator per region. Deploy Observability Pipelines Worker into your utility or tools cluster and configure all your cloud accounts to send data to this cluster. See [Networking][1] for more information.

### Pub-Sub システム

Kafka のようなパブリッシュ・サブスクライブ (Pub-Sub) システムを使用することは、アーキテクチャを高可用性または高耐久性にするために必須ではありませんが ([高可用性と災害復旧][2]を参照)、次のような利点があります。

1. **Improved reliability.** Pub-sub systems are designed to be highly reliable and durable systems that change infrequently. They are especially reliable if you are using a managed option. The Observability Pipelines Worker is likely to change more often based on its purpose. Isolate Observability Pipelines Worker downtime behind a pub-sub system to increase availability from the perception of your clients and make recovery simpler.


2. **Load balancer not required.** Pub-sub systems eliminate the need for a load balancer. Your pub-sub system handles the coordination of consumers, making it easy to scale Observability Pipelines Worker horizontally.

#### Pub-Sub パーティショニング

パーティショニング (Kafka 用語では「トピック」) とは、Pub-Sub システム内のデータを分離することを指します。データを生成したサービスやホストなど、データの起点に沿ったパーティショニングを行う必要があります。

{{< img src="observability_pipelines/production_deployment_overview/partitioning.png" alt="A diagram showing an agent on a node, sending data to four services in a pub-sub that then sends the data to four Observability Pipelines Workers" style="width:55%;" >}}

#### Pub-Sub 構成

When using a pub-sub system, Datadog recommends the following configuration changes for Observability Pipelines Worker:

- **Enable end-to-end acknowledgments for all sinks.** This setting ensures that the pub-sub checkpoint is not advanced until data is successfully written.
- **Use memory buffers.** There is no need to use Observability Pipelines Worker's disk buffers when it sits behind a pub-sub system. Your pub-sub system is designed for long-term buffering with high durability. Observability Pipelines Worker should only be responsible for reading, processing, and routing the data (not durability).

### グローバル集計

このセクションでは、レガシーの宛先に対してグローバル計算を実行するための推奨事項を説明します。最新の宛先は、すでにグローバル計算をサポートしています。例えば、Datadog は、メトリクスデータのグローバルな観測を解決するディストリビューション (DDSketch など) をサポートしています。

Global aggregation refers to the ability to aggregate data for an entire region. For example, computing global quantiles for CPU load averages. To achieve this, a single Observability Pipelines Worker instance must have access to every node's CPU load average statistics. This is not possible with horizontal scaling; each individual Observability Pipelines Worker instance only has access to a slice of the overall data. Therefore, aggregation should be tiered.

{{< img src="observability_pipelines/production_deployment_overview/global_aggregation.png" alt="A diagram showing load balancers sending data to a tier one aggregator, which has multiple Observability Pipelines Workers, and then from tier one the data is sent to the tier two aggregator, which has one Worker" style="width:90%;" >}}

In the above diagram, the tier two aggregators receive an aggregated sub-stream of the overall data from the tier one aggregators. This allows a single instance to get a global view without processing the entire stream and introducing a single point of failure.

#### 推奨事項

- Limit global aggregation to tasks that can reduce data, such as computing global histograms. Never send all data to your global aggregators.
- 単一障害点を発生させないために、ほとんどのデータの処理と配信には、引き続きローカルアグリゲーターを使用してください。

[1]: /observability_pipelines/legacy/architecture/networking
[2]: /observability_pipelines/legacy/architecture/availability_disaster_recovery