---
aliases:
- /ja/observability_pipelines/best_practices_for_scaling_observability_pipelines/
description: 大規模なデプロイメントで Observability Pipelines Worker をスケーリングするための、アグリゲーターアーキテクチャ、インスタンス最適化、キャパシティプランニングのベストプラクティスを学びます。
further_reading:
- link: https://www.datadoghq.com/architecture/op-vm-deployment/
  tag: アーキテクチャセンター
  text: Observability Pipelines VM デプロイメント
- link: https://www.datadoghq.com/architecture/observability-pipelines-kubernetes-deployment/
  tag: アーキテクチャセンター
  text: Observability Pipelines Kubernetes デプロイメント
title: Observability Pipelines のスケーリングのベストプラクティス
---
<div class="alert alert-info">
このガイドは、大規模な本番環境レベルのデプロイメントを対象としています。
</div>

## 概要{#overview}

Observability Pipelines Worker を他のサービスと同様にインフラストラクチャーにデプロイし、データをインターセプトして操作し、宛先に転送します。各 Observability Pipelines Worker インスタンスは独立して動作するように設計されているため、ロードバランシングによってアーキテクチャをスケーリングできます。

このガイドでは、Observability Pipelines Worker を初めて利用するユーザー向けに、推奨されるアグリゲーターパターンについて説明します。具体的な内容は次のとおりです。

- [アーキテクチャモデルとアプローチ](#architecture)
Observability Pipelines Worker アグリゲーターを水平方向にスケーリングするための- [インスタンスの最適化](#optimize-the-instance)
- Observability Pipelines Worker の[キャパシティプランニングとスケーリング](#capacity-planning-and-scaling)に向けたリソース容量の見積もりの出発点

## アーキテクチャ{#architecture}

このセクションでは、以下について説明します。

- アーキテクチャモデル:
	- [VM ベースのモデル](#vm-based-architecture)
	- [Kubernetes ベースのモデル](#kubernetes-based-architecture)
- [集中型アプローチと分散型アプローチ](#centralized-vs-decentralized-approach)
- [VM ベースのアーキテクチャか Kubernetes ベースのアーキテクチャかの選択](#choosing-a-vm-based-vs-kubernetes-based-architecture)

### アーキテクチャモデル{#architecture-models}

一般的なアーキテクチャモデルには、次の 2 つがあります。

- **仮想マシンベース (VM ベース) のアーキテクチャ**: ロードバランサーを前面に配置したホストベースのモデル。
- **Kubernetes ベースのアーキテクチャ**: Ingress コントローラーまたはロードバランサーをオプションで前面に配置できる (クラスター外部のソースの場合。クラスター内部のリクエストは Kubernetes Service が処理します) コンテナベースのモデル。

どちらのモデルも、集中型または分散型のアプローチに適用できます。集中型アプローチでは、Worker はデータセンターやリージョンをまたいでグローバルな規模で動作します。分散型アプローチでは、Worker はローカルな規模、つまりデータソースが存在するリージョン、データセンター、またはクラスター内で動作します。多くのデータセンター、リージョン、またはクラウドプロバイダーアカウントにまたがる大規模な環境では、ハイブリッドモデルが適している場合があります。

一般的に、Datadog では Worker をデータソースのできるだけ近くで運用することを推奨しています。管理およびインフラストラクチャーのオーバーヘッドが増加する場合がありますが、ネットワーク転送の問題や単一障害点に関する懸念が軽減されるからです。

両方のモデルについて、Datadog では、負荷の増加に対応し、高可用性を維持するために、Worker を[水平方向に][1]スケーリングすることを推奨しています。これは、マネージドインスタンスグループ (オートスケーリンググループなど) や水平 Pod オートスケーリングを使用して実現できます。

Worker は、[垂直方向に][2]スケーリングすることもできます。この場合、追加の設定なしで追加のコアとメモリを活用できます。一部のプロセッサ (多くのルールが有効になっている Sensitive Data Scanner プロセッサなど) や、負荷の高い処理のユースケースでは、並列スレッド実行を可能にするために Worker に追加のコアを割り当てることが有効です。垂直方向にスケーリングする場合、Datadog では、1 つのインスタンスが処理する量を全体の 33% 以下に制限することを推奨しています。これにより、ノード障害が発生した場合でも高可用性を維持できます。

#### VM ベースのアーキテクチャ{#vm-based-architecture}

以下のアーキテクチャ図は、ロードバランサーがプッシュベースのソースからのトラフィックを受け入れる、ホストベースのアーキテクチャのものです。プルベースのソースのみを使用している場合は、ロードバランサーは不要です。この図の Worker は、処理ニーズに基づいてスケーリングするマネージドインスタンスグループの一部となっています。詳細については、[Observability Pipelines VM デプロイメント][9]を参照してください。

{{< img src="observability_pipelines/scaling_best_practices/vm-infra.png" alt="マネージドインスタンスグループの一部としての Worker を示す図" style="width:100%;" >}}


#### Kubernetes ベースのアーキテクチャ {#kubernetes-based-architecture}

以下のアーキテクチャ図は、Kubernetes Service が StatefulSet へのルーターとしてプッシュベースのソースからのトラフィックを受け入れる、コンテナベースのアーキテクチャのものです。クラスターの外部からテレメトリを送信する場合は、[service.type を `LoadBalancer` に設定][3]するか、[Ingress コントローラー][4]をインストールしてルーティング用の [Ingress][5] を構成してください。Worker は StatefulSet の一部として実行され、処理ニーズに基づいて容量を調整するための水平 Pod オートスケーリングをサポートします。VM ベースのアーキテクチャと同様に、Worker を垂直方向にスケーリングして、複数のコアを並列処理に活用することもできます。詳細については、[Observability Pipelines Kubernetes デプロイメント][10]を参照してください。

{{< img src="observability_pipelines/scaling_best_practices/containerized-infra.png" alt="StatefulSet の一部としての Worker を示す図" style="width:100%;" >}}

### VM ベースのアーキテクチャか Kubernetes ベースのアーキテクチャかの選択 {#choosing-a-vm-based-vs-kubernetes-based-architecture}

次のような場合は、Kubernetes ベースのアーキテクチャを選択してください。

- ログソースが Kubernetes クラスター内にあり、分散型アプローチを使用したい場合
- 組織で Kubernetes を多用しており、すでに習熟している場合

組織がより VM 中心であり、Kubernetes に習熟していない場合は、VM ベースのアーキテクチャを選択してください。

どちらのモデルを選択するかは、インフラストラクチャーの観点から見た組織の適性によって決まります。どちらのモデルも、CPU 使用率に基づいて自動的にスケーリングする機能を提供しています。CPU 使用率は一般的に、Observability Pipelines の主要な制約となります。詳細については、[インスタンスを最適化する][6]を参照してください。

### 集中型アプローチと分散型アプローチ {#centralized-vs-decentralized-approach}

Datadog では、Worker をデータソースのできるだけ近くにデプロイする分散型アプローチを推奨しています。これは、リージョン、クラスター、データセンターなど、データが発生する場所ごとに Worker を配置することを意味します。分散型モデルは、以下の理由から、データ量が多い環境に適しています。

- リージョン間またはデータセンター間のネットワーク転送が最小限に抑えられる
- リージョン間またはアカウント間のデータ転送に関連する潜在的なパフォーマンスの問題が回避される
- データソースの近くで処理が行われるため、データ転送コストの削減に役立つ
- 転送前にデータソースでデータが処理されるため、ログ配信のレイテンシが削減される

集中型デプロイメントでは、単一の場所で Worker を実行して、複数のリージョン、クラスター、またはデータセンターのデータを集約します。単一の Worker プールで、複数の Kubernetes クラスターや AWS アカウントからデータを受信できます。このアプローチは、データ量が少ない場合や、それらの環境の間にすでにネットワークピアリングが存在する場合に最適です。リージョン間やアカウント間で大量にデータを転送すると追加コストが発生する可能性があることに注意してください。

ハイブリッドモデルは、分散型アプローチと集中型アプローチの妥協点として優れており、特に、広範囲に分散した大規模なインフラストラクチャーのデプロイメントに適しています。たとえば、6 つのリージョンがあり、各リージョンに 10 個の Kubernetes クラスターがある場合、以下の方法よりも適しています。

- 各クラスターに Worker をデプロイする (これでは 60 個のデプロイメントが必要になります)
- 1 つのリージョンに Worker をデプロイし、リージョン間でトラフィックをルーティングする (これでは単一障害点が発生します)

ハイブリッドアプローチでは、各リージョンで専用の Kubernetes クラスターまたはマネージドインスタンスグループを使用します。その結果、デプロイメントは 6 つだけで済みます。各リージョン内の 10 個のクラスターは、そのリージョンの Observability Pipelines Worker (OPW) デプロイメントにデータを送信します。

## インスタンスを最適化する {#optimize-the-instance}

### インスタンスのサイジング {#instance-sizing}

12 個のプロセッサを使用してデータを変換するパイプラインのパフォーマンスベンチマークに基づくと、Observability Pipelines Worker は vCPU ごとに 1 日あたり約 1 TB を処理できます。たとえば、1 日あたり 4 TB のイベントがある場合、そのデータ量に対応できるよう、十分なコンピューティングリソースとある程度の余裕を確保する必要があります。これは、2 コアのマシンまたはコンテナを 3 台、あるいは 6 コアのマシンまたはコンテナを 1 台使用することで実現できます。

Observability Pipelines Worker は、ほぼ常に CPU の制約を受けています。CPU 使用率のメトリクスは誤検知が発生しないため、オートスケーリングの最も強力なシグナルとなります。Datadog では、Observability Pipelines Worker をオートスケーリンググループの一部としてデプロイするか、[水平 Pod オートスケーリング][7]を有効にしてデプロイすることを推奨しています。静的に構成された VM 数やコンテナ数に依存しないでください。これにより、トラフィックが急増してもデータを損失することなく安全に対処でき、Worker がダウンした場合でも高可用性を維持できます。

高スループット環境にはより大きなマシンタイプを推奨します。一般にネットワーク帯域幅が広いためです。詳細については、クラウドプロバイダーのドキュメント (例: [Amazon EC2 instance network bandwith][8]) を参照してください。

| クラウドプロバイダー| 推奨 (最小) |
| ------------- | ------------------------ |
| AWS           | c7i.xlarge               |
| Azure         | F4s v2       	           |
| Google Cloud  | c2-standard-4            |

**注**: 1 vCPU = 1 ARM 物理 CPU または 0.5 Intel 物理 CPU (ハイパースレッディング対応)。

### CPU のサイジング {#cpu-sizing}

Observability Pipelines Worker のほとんどのワークロードは CPU の制約を受けるため、最新の CPU を使用することでメリットが得られます。

| クラウドプロバイダー| 推奨                                                        |
| ------------- | --------------------------------------------------------------------- |
| AWS           | 最新世代の Intel Xeon、8 vCPU (推奨) 、最低 4 vCPU |
| Azure         | 最新世代の Intel Xeon、8 vCPU (推奨)、最低 4 vCPU |
| Google Cloud  | 最新世代の Intel Xeon、8 vCPU (推奨)、最低 4 vCPU |
| プライベート       | 最新世代の Intel Xeon、8 vCPU (推奨)、最低 4 vCPU |

### CPU アーキテクチャ {#cpu-architectures}

Observability Pipelines Worker は、最新の x86 および ARM CPUアーキテクチャ上で動作します。

### メモリのサイジング {#memory-sizing}

Observability Pipelines Worker のアフィン型システムにより、Observability Pipelines Worker のワークロードでメモリの制約を受けることはほとんどありません。そのため、Datadog では vCPU あたり最低 2 GiB 以上のメモリを推奨しています。メモリ使用量は、メモリ内でのバッファリングとバッチ処理により、宛先の数が増えるにつれて増加します。宛先が多い場合は、メモリの増設を検討するとよいでしょう。

### ディスクのサイジング {#disk-sizing}

Observability Pipelines Worker をインストールするには 500 MB のディスク容量が必要です。

## キャパシティプランニングとスケーリング {#capacity-planning-and-scaling}

### 見積もりの単位 {#units-for-estimations}

以下の単位は、リソース容量を見積もるための出発点ですが、ワークロードによって異なる場合があります。

| 単位                  | サイズ      | Observability Pipelines Worker のスループット*|
| ----------------------| --------- | ----------------------------------------- |
| 非構造化ログイベント| ~512 バイト| ~10 MiB/s/vCPU                            |
| 構造化ログイベント  | ~1.5 KB   | ~25 MiB/s/vCPU                            |

*これらの数値は、見積もりを目的とした控えめな値です。1 vCPU = 1 ARM 物理 CPU および 0.5 Intel 物理 CPU です。

### スケーリング {#scaling}

#### 水平スケーリング {#horizontal-scaling}

水平スケーリングとは、複数の Observability Pipelines Worker インスタンス間でトラフィックを分散させることを指します。Observability Pipelines Worker はシェアードナッシングアーキテクチャを採用しているため、スケーリングを複雑にする可能性のあるリーダーノードなどの調整は必要ありません。

プッシュベースのソースの場合は、Observability Pipelines Worker インスタンスの前にネットワークロードバランサーを配置し、必要に応じてスケールアップ/スケールダウンします。

プルベースのソースの場合は、ロードバランサーは不要です。Observability Pipelines Worker をデプロイし、必要に応じてスケールアップ/スケールダウンします。Observability Pipelines Worker がデータの読み取りを要求すると、パブリッシュ/サブスクライブシステムがそのデータへの排他的アクセスを調整します。

##### 負荷分散 {#load-balancing}

ロードバランサーは、エージェントなどのプッシュベースのソースに対してのみ必要です。Kafka などのプルベースのソースのみを使用している場合は、ロードバランサーは不要です。

###### クライアントサイドの負荷分散 {#client-side-load-balancing}

クライアントサイドの負荷分散は推奨されません。クライアントサイドの負荷分散とは、クライアントが複数の Observability Pipelines Worker インスタンス間でトラフィックの負荷分散を行うことを指します。このアプローチは単純に聞こえますが、以下の理由から、信頼性が低く、複雑になる可能性があります。

- 適切なフェイルオーバーを伴う負荷分散は複雑になります。この領域の問題は、データの損失や、サービスの停止を招くインシデントにつながる可能性があるため、慎重を要します。複数の種類のクライアントを扱う場合、この問題はさらに深刻になります。
- Observability Pipelines Worker アグリゲーターの目的は、エージェントの責任を軽減することであり、負荷分散を引き受けることはその実現に役立ちます。

###### ロードバランサーの種類 {#load-balancer-types}

Datadog では、Observability Pipelines Worker のプロトコル (TCP、UDP、HTTP) をサポートしているレイヤー4 (L4) ロードバランサー (ネットワークロードバランサー) を推奨しています。HTTP トラフィック (レイヤー 7) のみを送信している場合でも、パフォーマンスとシンプルさの観点から L4 ロードバランサーを推奨します。

| クラウドプロバイダー| 推奨                                                |
| ------------- | --------------------------------------------------------------|
| AWS           | AWS Network Load Balancer (NLB)                               |
| Azure         | 内部 Azure Load Balancer                                  |
| Google Cloud  | 内部 TCP/UDP ネットワークロードバランサー                        |
| プライベート       | HAProxy、NGINX、またはレイヤー 4 をサポートするその他のロードバランサー |

###### ロードバランサーの設定 {#load-balancer-configurations}

クライアントとロードバランサーを設定する際に Datadog が推奨する一般的な設定は次のとおりです。

- シンプルなラウンドロビン方式の負荷分散戦略を使用する。
- クロスゾーン負荷分散は、ゾーン間のトラフィックが非常に不均衡でない限り有効にしない。
- ターゲットの健全性に Observability Pipelines Worker のヘルス API エンドポイントを使用するようにロードバランサーを設定する。
- Observability Pipelines Worker インスタンスがスケーリング時に自動的に登録/登録解除されるようにする。
- クライアントとロードバランサーの両方で、アイドルタイムアウトを 1 分以内にしてキープアライブを有効にする。
- サポートされている場合は、エージェントでコネクションの同時実行とプーリングを有効にする。サポートされていない場合は、Observability Pipelines Worker をエッジにデプロイする統合アーキテクチャを検討してください。コネクションプーリングは、大量のデータを複数のコネクションに分散するため、トラフィックの負荷分散に役立ちます。

###### ロードバランサーのホットスポット {#load-balancer-hot-spots}

ロードバランサーのホットスポットは、1 つ以上の Observability Pipelines Worker インスタンスが不均衡なトラフィックを受信した場合に発生します。ホットスポットは通常、次の 2 つのいずれかの理由で発生します。

1. 単一のコネクションを介して大量のトラフィックが送信されている。
2. 1 つの Availability Zone のトラフィックが他の Availability Zone よりもはるかに多い。

これらのケースでは、それぞれ以下の緩和策が推奨されます。

1. 大きなコネクションを複数のコネクションに分割する。ほとんどのクライアントは、データを複数のコネクションに分散させるコネクションの同時実行とプーリングに対応しています。この戦術により、ロードバランサーは複数の Observability Pipelines Worker インスタンス間でコネクションを分散させることができます。クライアントがこれに対応していない場合は、追加の Observability Pipelines Worker をエッジにでデプロイできる統合アーキテクチャを検討してください。
2. ロードバランサーでクロスゾーン負荷分散を有効にします。クロスゾーン負荷分散は、すべての Availability Zone のトラフィックを、すべての Observability Pipelines Worker インスタンス間で分散させます。

#### 垂直スケーリング {#vertical-scaling}

Observability Pipelines Worker の同時実行モデルは、すべての vCPU を活用するように自動的にスケーリングします。同時実行の設定や構成の変更は必要ありません。垂直方向にスケーリングする場合、Datadog では、1 つのインスタンスが処理する量を全体の 50% 以下に制限し、高可用性のために少なくとも 2 つの Observability Pipelines Worker インスタンスをデプロイすることを推奨しています。

#### オートスケーリング {#auto-scaling}

オートスケーリングは、平均 CPU 使用率に基づいて行う必要があります。Observability Pipelines Worker は、大半のワークロードで CPU の制約を受けます。CPU 使用率は誤検知が発生しないため、オートスケーリングの最も強力なシグナルとなります。Datadog では、以下の設定を使用して、必要に応じて調整することを推奨しています。

- 平均 CPU 使用率のターゲットを 85% に設定。
- スケールアップ/スケールダウンの安定化期間を 5 分間に設定。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/#horizontal-scaling
[2]: /ja/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/#vertical-scaling
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L208-L209
[4]: https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/
[5]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L238
[6]: /ja/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/#optimize-the-instance
[7]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L70-L85
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-network-bandwidth.html
[9]: https://www.datadoghq.com/architecture/op-vm-deployment/
[10]: https://www.datadoghq.com/architecture/observability-pipelines-kubernetes-deployment/