---
categories:
- cloud
- コンテナ
- google cloud
- kubernetes
- ログの収集
- ネットワーク
dependencies: []
description: GKE リソースの使用状況を監視します。
doc_link: https://docs.datadoghq.com/integrations/google_kubernetes_engine/
draft: false
git_integration_title: google_kubernetes_engine
has_logo: true
integration_id: google-kubernetes-engine
integration_title: Google Kubernetes Engine, Cloud
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_kubernetes_engine
public_title: Datadog-Google Kubernetes Engine, Cloud インテグレーション
short_description: GKE リソースの使用状況を監視します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google Kubernetes Engine (GKE)  は、Docker コンテナを実行するための強力なクラスターマネージャーおよびオーケストレーションシステムです。

Google Kubernetes Engine からメトリクスを取得して、以下のことができます。

- GKE コンテナおよび GKE コントロールプレーンのパフォーマンスを可視化する。
- GKE コンテナとアプリケーションのパフォーマンスを関連付ける。

このインテグレーションには、2 つの独立したプリセットダッシュボードが付属しています。

- 標準の GKE ダッシュボードには、Google インテグレーションから収集した GKE と GKE コントロールプレーンのメトリクスが表示されます。
- 拡張 GKE ダッシュボードには、Datadog の Agent ベースの Kubernetes インテグレーションからのメトリクスと、Google インテグレーションから収集した GKE コントロールプレーンメトリクスが表示されます。

標準のダッシュボードは、簡単なコンフィギュレーションで GKE での観測が可能です。拡張ダッシュボードは、追加のコンフィギュレーション手順が必要ですが、よりリアルタイムの Kubernetes メトリクスを提供し、本番でワークロードを監視するためのダッシュボードをクローンしてカスタマイズする際に、しばしばより良い場所から始めることができます。

セルフホスティングの Kubernetes クラスターとは異なり、GKE コントロールプレーンは Google によって管理され、クラスターで動作する Datadog Agent からはアクセスできません。そのため、クラスターの監視に Datadog Agent を主に使用している場合でも、GKE コントロールプレーンへの観測可能性は Google とのインテグレーションを必要とします。

## 計画と使用

### メトリクスの収集

#### インフラストラクチャーリスト

1. まだの方は、まず[Google Cloud Platform とのインテグレーション][1]を設定してください。標準のメトリクスとプリセットダッシュボードについては、他のインストール手順はありません。

2. 拡張ダッシュボードを表示し、APM トレース、ロギング、プロファイリング、セキュリティ、およびその他の Datadog サービスを有効にするには、[GKE クラスターに Datadog Agent をインストールします][2]。

3. コントロールプレーンメトリクスを入力するには、[GKE コントロールプレーンメトリクスを有効にする][3]必要があります。コントロールプレーンメトリクスは、Google が GKE で管理している Kubernetes コントロールプレーンの動作を可視化するものです。

### 収集データ

Google Kubernetes Engine のログは Google Cloud Logging で収集され、Cloud Pub/Sub トピックを通じて Dataflow ジョブに送信されます。まだの場合は、[Datadog Dataflow テンプレートでロギングをセットアップしてください][4]。

これが完了したら、Google Kubernetes Engine のログを Google Cloud Logging から Pub/Sub へエクスポートします。

1. [GCP Logs Explorer ページ][5]にアクセスし、Kubernetes と GKE のログをフィルタリングします。
2. **シンクを作成**し、シンクに適宜名前を付けます。
3. エクスポート先として「Cloud Pub/Sub」を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub ログを Pub Sub へエクスポート" >}}

4. **作成**をクリックし、確認メッセージが表示されるまで待ちます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "google_kubernetes_engine" >}}


### ヘルプ

Google Kubernetes Engine インテグレーションには、イベントは含まれません。

### ヘルプ

Google Kubernetes Engine インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。


[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ja/integrations/gke/?tab=standard
[3]: https://cloud.google.com/stackdriver/docs/solutions/gke/managing-metrics#enable-control-plane-metrics
[4]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[5]: https://console.cloud.google.com/logs/viewer
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/google_kubernetes_engine/google_kubernetes_engine_metadata.csv
[7]: https://docs.datadoghq.com/ja/help/