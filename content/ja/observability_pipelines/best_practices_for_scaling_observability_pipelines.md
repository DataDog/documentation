---
title: Best Practices for Scaling Observability Pipelines
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

<div class="alert alert-info">
This guide is for large-scale production-level deployments.
</div>

## 概要

Deploy Observability Pipelines Worker into your infrastructure like any other service to intercept and manipulate data, and then forward it to your destinations. Each Observability Pipelines Worker instance operates independently, so that you can scale the architecture with a simple load balancer.

This guide walks you through the recommended aggregator architecture for new Observability Pipelines Worker users. Specifically these topics:

- [Optimizing the instance](#optimize-the-instance) so you can horizontally scale the Observability Pipelines Worker aggregator.
- Starting points to estimate your resource capacity for [capacity planning and scaling](#capacity-planning-and-scaling) the Observability Pipelines Worker.

## Optimize the instance

### インスタンスサイジング

Use compute optimized instances with at least 8 vCPUs and 16 GiB of memory. These are ideal units for horizontally scaling the Observability Pipelines Worker aggregator. Observability Pipelines Worker can vertically scale and automatically take advantage of additional resources if you choose larger instances. To improve availability, choose a size that allows for at least two Observability Pipelines Worker instances for your data volume.

| クラウドプロバイダー| 推奨事項                                        |
| ------------- | ----------------------------------------------------- |
| AWS           | c6i.2xlarge (推奨) または c6g.2xlarge              |
| Azure         | f8                                                    |
| Google Cloud  | c2 (8 vCPU、16 GiB メモリ)                           |
| プライベート       | 8 vCPUs, 16 GiB of memory                             |

### CPU サイジング

観測可能性パイプラインワーカーワークロードの多くは、CPU に制約があり、最新の CPU の恩恵を受けることができます。

| クラウドプロバイダー| 推奨事項                                                        |
| ------------- | --------------------------------------------------------------------- |
| AWS           | 最新世代の Intel Xeon、8 vCPU (推奨)、最低 4 vCPU |
| Azure         | 最新世代の Intel Xeon、8 vCPU (推奨)、最低 4 vCPU |
| Google Cloud  | 最新世代の Intel Xeon、8 vCPU (推奨)、最低 4 vCPU |
| プライベート       | 最新世代の Intel Xeon、8 vCPU (推奨)、最低 4 vCPU |

### CPU アーキテクチャ

観測可能性パイプラインワーカーは、最新の CPU アーキテクチャで動作します。X86_64 アーキテクチャは、観測可能性パイプラインワーカーに最も適したパフォーマンスを提供します。

### メモリサイジング

Due to Observability Pipelines Worker's affine type system, memory is rarely constrained for Observability Pipelines Worker workloads. Therefore, Datadog recommends ≥2 GiB of memory per vCPU minimum. Memory usage increases with the number of destinations due to the in-memory buffering and batching. If you have a lot of destinations, consider increasing the memory.

### ディスクサイジング

You need 500MB of disk space to install the Observability Pipelines Worker.

## Capacity planning and scaling

### 試算の単位

以下の単位は、リソースの容量を見積もるための出発点ですが、ワークロードによって異なる場合があります。

| 単位                  | サイズ      | 観測可能性パイプラインワーカースループット*|
| ----------------------| --------- | ----------------------------------------- |
| 非構造化ログイベント| ~512 バイト| ~10 MiB/s/vCPU                            |
| 構造化ログイベント  | ~1.5 KB   | ~25 MiB/s/vCPU                            |

*この数値は試算のための保守的なものです。1 vCPU = ARM 物理 CPU × 1、Intel 物理 CPU × 0.5。

### スケーリング

#### 水平スケーリング

水平スケーリングとは、複数の観測可能性パイプラインワーカーインスタンスにトラフィックを分散させることです。観測可能性パイプラインワーカーはシェアードナッシングのアーキテクチャを採用しており、リーダーノードやスケーリングを複雑にするような調整を必要としません。

プッシュベースのソースの場合、観測可能性パイプラインワーカーインスタンスをネットワークロードバランサーで前面化し、必要に応じてスケールアップ/ダウンしてください。

{{< img src="observability_pipelines/production_deployment_overview/horizontal_scaling_push.png" alt="クラウドリージョンを Agent、ネットワークロードバランサー、観測可能性パイプラインワーカーアグリゲーターに分解し、Agent からのデータをロードバランサー、観測可能性パイプラインワーカー、そして他の宛先に送る様子を示した図" style="width:60%;" >}}

プルベースのソースの場合、ロードバランサーは必要ありません。観測可能性パイプラインワーカーをデプロイし、必要に応じてスケールアップ/ダウンしてください。観測可能性パイプラインワーカーがデータの読み取りを要求したときに、パブリッシュサブスクリプションシステムがデータへの排他的なアクセスを調整します。

{{< img src="observability_pipelines/production_deployment_overview/horizontal_scaling_pull.png" alt="クラウドリージョンを Agent、ブローカー、観測可能性パイプラインアグリゲーターに分解して示した図。Agent からのデータはブローカーに送られ、ブローカーと観測可能性パイプラインワーカーとの間で送受信され、ワーカーから他の宛先に送信される" style="width:60%;" >}}

##### ロードバランシング

ロードバランサーは、Agent のようなプッシュベースのソースにのみ必要です。Kafka のようなプルベースのソースのみを使用する場合は、ロードバランサーは必要ありません。

###### クライアント側のロードバランシング

クライアント側のロードバランシングは推奨されません。クライアント側のロードバランシングとは、複数の観測可能性パイプラインワーカーインスタンスにまたがるトラフィックのロードバランシングをクライアントが行うことを指します。このアプローチはよりシンプルに聞こえますが、以下のため信頼性が低く、より複雑になる可能性があります。

- 適切なフェイルオーバーを伴うロードバランシングは複雑です。この分野の問題は、データの損失やサービスを停止させるインシデントにつながる可能性があるため、デリケートな問題です。複数のタイプのクライアントを取り扱っている場合は、さらに悪化します。
- The point of the Observability Pipelines Worker aggregator is to shift responsibility away from your agents, and taking on load balancing helps to do that.

###### ロードバランサーの種類

Datadog recommends Layer 4 (L4) load balancers (network load balancers) since they support Observability Pipelines Worker's protocols (TCP, UDP, and HTTP). Even if you're exclusively sending HTTP traffic (Layer 7), Datadog recommends L4 load balancers for their performance and simplicity.

| クラウドプロバイダー| 推奨事項                                                |
| ------------- | --------------------------------------------------------------|
| AWS           | AWS ネットワークロードバランサー (NLB)                               |
| Azure         | 内部 Azure ロードバランサー                                  |
| Google Cloud  | 内部 TCP/UDP ネットワークロードバランサー                        |
| プライベート       | HAProxy, NGINX, or another load balancer with layer-4 support |

###### ロードバランサーの構成

クライアントとロードバランサーを構成する場合、Datadog は以下の一般的な設定を推奨しています。

- シンプルなラウンドロビンのロードバランシング戦略を使用します。
- ゾーン間のトラフィックが非常に不均衡である場合を除き、クロスゾーンのロードバランシングを有効にしません。
- 観測可能性パイプラインワーカーのヘルス API エンドポイントを使用して、ターゲットのヘルスを確認するようにロードバランサーを構成します。
- Ensure that your Observability Pipelines Worker instances automatically register or de-register as they scale.
- クライアントとロードバランサーの両方で、1 分以内のアイドルタイムアウトでキープアライブを有効にします。
- サポートされている場合は、Agent で接続の同時実行とプーリングを有効にします。サポートされていない場合は、エッジに観測可能性パイプラインワーカーをデプロイする統合アーキテクチャを検討してください。接続プーリングは、大量のデータを複数の接続に分散させ、トラフィックのバランスを取ることを可能にします。

###### ロードバランサーのホットスポット

ロードバランシングホットスポットは、1 つまたは複数の観測可能性パイプラインワーカーインスタンスが不均衡なトラフィックを受け取る場合に発生します。ホットスポットは通常、2 つの理由のうちの 1 つによって発生します。

1. 1 つの接続でかなりの量のトラフィックが送信されている。
2. あるアベイラビリティゾーンのトラフィックが、他のゾーンよりはるかに多い。

このような場合、以下のようなそれぞれの緩和策をとることをお勧めします。

1. 大きな接続を複数の接続に分割します。ほとんどのクライアントでは、複数の接続にデータを分散させる接続の同時実行とプーリングが可能です。この戦術により、ロードバランサーは複数の観測可能性パイプラインワーカーインスタンスに接続を分散させることができます。クライアントがこれをサポートしていない場合は、観測可能性パイプラインワーカーをエッジに追加でデプロイできる統一アーキテクチャを検討してください。
2. ロードバランサーでクロスゾーンのロードバランシングを有効にします。クロスゾーンバランシングは、すべての観測可能性パイプラインワーカーインスタンスですべてのアベイラビリティゾーンのトラフィックをバランスさせます。

#### 垂直スケーリング

観測可能性パイプライン ワーカーの同時実行モデルは、すべての vCPU を活用するために自動的にスケーリングされます。同時実行の設定や構成の変更は必要ありません。Datadog では、垂直スケーリングを行う場合、インスタンスのサイズを総ボリュームの 50% 以下に抑え、高可用性のために最低 2 つの観測可能性パイプラインワーカーインスタンスをデプロイすることを推奨しています。

#### Auto-scaling

Auto-scaling should be based on average CPU utilization. For the vast majority of workloads, Observability Pipelines Worker is CPU constrained. CPU utilization is the strongest signal for auto-scaling since it does not produce false positives. Datadog recommends you use the following settings, adjusting as necessary:

- 使用率 85% を目標とした平均的な CPU。
- スケールアップとスケールダウンのための 5 分間の安定時間。