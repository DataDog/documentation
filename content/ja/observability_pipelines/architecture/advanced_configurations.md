---
kind: Documentation
title: 高度なコンフィギュレーション
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines は US1-FED の Datadog サイトでは利用できません。</div>
{{< /site-region >}}

<div class="alert alert-info">このガイドは、大規模な本番環境レベルのデプロイメントを対象としています。</div>

### 複数のアグリゲーターのデプロイメント

[ネットワーキング][1]で説明したように、Datadog では、1 つのリージョンにつき 1 つの Observability Pipelines Worker アグリゲーターで始めることを推奨しています。これは、Observability Pipelines Worker の最初のデプロイを複雑にしすぎないためですが、複数のデプロイで開始することが理想的な場合もあります。

1. **公衆インターネット上でのデータ送信を防止する。**複数のクラウドやリージョンがある場合、インターネット上に大量のデータを送信しないように、それぞれのクラウドやリージョンに Observability Pipelines Worker アグリゲーターをデプロイしてください。Observability Pipelines Worker アグリゲーターは、内部データを受け取り、そして、ネットワークの単一の出口点として機能する必要があります。

2. **独立した管理。**それぞれのユースケースに対して Observability Pipelines Worker アグリゲーターを独立して運用・管理できるチームがある場合です。例えば、データサイエンスチームは、独自のインフラストラクチャーを運用する責任があり、独自の Observability Pipelines Worker アグリゲーターを独立して運用する手段を持っている場合があります。

### 複数のクラウドアカウント

多くのユーザーは、VPC とクラスターを内部に持つ複数のクラウドアカウントを持っています。Datadog はこのような場合でも、1 つのリージョンに 1 つの Observability Pipelines Worker アグリゲーターを導入することを推奨しています。Observability Pipelines Worker をユーティリティやツールのクラスターにデプロイし、すべてのクラウドアカウントがこのクラスターにデータを送信するように構成します。詳細については、[ネットワーキング][1]を参照してください。

### Pub-Sub システム

Kafka のようなパブリッシュ・サブスクライブ (Pub-Sub) システムを使用することは、アーキテクチャを高可用性または高耐久性にするために必須ではありませんが ([高可用性と災害復旧][2]を参照)、次のような利点があります。

1. **信頼性の向上。**Pub-Sub システムは、高い信頼性と耐久性を持ち、頻繁に変更されることのないシステムとして設計されています。マネージドオプションを使用している場合は特に信頼性が高くなります。Observability Pipelines Worker は、その目的から頻繁に変更される可能性があります。Observability Pipelines Worker のダウンタイムを Pub-Sub システムの背後に分離することで、クライアントの認識から可用性を高め、復旧をよりシンプルにすることができます。


2. **ロードバランサーが不要。**Pub-Sub システムは、ロードバランサーを必要としません。Pub-Sub システムがコンシューマーの調整を行うため、Observability Pipelines Worker を簡単に水平にスケールすることができます。

#### Pub-Sub パーティショニング

パーティショニング (Kafka 用語では「トピック」) とは、Pub-Sub システム内のデータを分離することを指します。データを生成したサービスやホストなど、データの起点に沿ったパーティショニングを行う必要があります。

{{< img src="observability_pipelines/production_deployment_overview/partitioning.png" alt="ノード上の Agent が、Pub-Sub の 4 つのサービスにデータを送信し、そのデータを 4 つの Observability Pipelines Worker に送信する図" style="width:55%;" >}}

#### Pub-Sub 構成

Pub-Sub システムを使用する場合、Datadog は、Observability Pipelines Worker の以下の構成変更を推奨しています。

- **すべてのシンクでエンドツーエンドの確認応答を有効にする。**この設定により、データの書き込みが成功するまで Pub-Sub チェックポイントを進めないようにします。
- **メモリバッファを使用する。**Observability Pipelines Worker が Pub-Sub システムの背後にある場合、Observability Pipelines Worker のディスクバッファを使用する必要はありません。Pub-Sub システムは、高い耐久性を持つ長期的なバッファリングのために設計されています。Observability Pipelines Worker は、データの読み取り、処理、ルーティングのみを担当する必要があります (耐久性ではありません)。

### グローバル集計

このセクションでは、レガシーの宛先に対してグローバル計算を実行するための推奨事項を説明します。最新の宛先は、すでにグローバル計算をサポートしています。例えば、Datadog は、メトリクスデータのグローバルな観測を解決するディストリビューション (DDSketch など) をサポートしています。

グローバル集計とは、リージョン全体のデータを集計する機能です。例えば、CPU 負荷平均のグローバル分位を計算することができます。これを実現するには、1 つの Observability Pipelines Worker インスタンスが、すべてのノードの CPU 負荷平均統計にアクセスできる必要があります。これは水平スケーリングでは不可能です。個々の Observability Pipelines Worker インスタンスは、全体のデータのスライスにしかアクセスすることができません。したがって、集計は階層化する必要があります。

{{< img src="observability_pipelines/production_deployment_overview/global_aggregation.png" alt="ロードバランサーが、複数の Observability Pipelines Worker のある第 1 層のアグリゲーターにデータを送り、第 1 層から 1 つの Worker を持つ第 2 層のアグリゲーターにデータを送る様子を示した図" style="width:90%;" >}}

上の図では、第 2 層のアグリゲーターは、第 1 層のアグリゲーターから全体データの集計されたサブストリームを受け取っています。これにより、単一のインスタンスが、ストリーム全体を処理することなく、また単一障害点を導入することなく、グローバルビューを取得することができます。

#### 推奨事項

- グローバルヒストグラムの計算など、データを削減できるタスクにグローバル集計を限定します。すべてのデータをグローバルアグリゲーターに送りません。
- 単一障害点を発生させないために、ほとんどのデータの処理と配信には、引き続きローカルアグリゲーターを使用してください。

[1]: /ja/observability_pipelines/architecture/networking
[2]: /ja/observability_pipelines/architecture/availability_disaster_recovery